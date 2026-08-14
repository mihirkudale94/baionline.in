"""List a sponsor who paid offline (Demand Draft / NEFT / cheque).

The website shows only sponsors with a payment on file. Online payers get there
through Razorpay; this script is the equivalent door for money that arrived in
the bank instead. It writes the same `sponsors` table, so an offline sponsor is
indistinguishable from an online one on the banner — the difference is only that
the reference is a DD or UTR number rather than a Razorpay payment id.

Run it from the backend directory:

    python add_sponsor.py --company "Acme Cement" --tier gold \
        --reference "NEFT UTR 123456789" --amount 250000 \
        --website acmecement.com --logo ./acme.png

    python add_sponsor.py --list
    python add_sponsor.py --unlist 4        # pull a listing off the banner
    python add_sponsor.py --relist 4

Amount is in RUPEES here (the table stores paise). With --tier and no --amount
the tier's catalogue price is used.
"""

import argparse
import datetime
import json
import os
import shutil
import sqlite3
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from routers.sponsors import (  # noqa: E402  (path set up above)
    DB_PATH,
    LOGO_DIR,
    LOGO_MAX_BYTES,
    LOGO_TYPES,
    SPONSORSHIP_TIERS,
    _clean_website,
)


def _now():
    return datetime.datetime.now(datetime.timezone.utc).isoformat()


def _store_logo(sponsor_id, source_path):
    """Copy a logo into place, applying the same checks the upload route uses."""
    if not os.path.exists(source_path):
        raise SystemExit(f"No such file: {source_path}")
    if os.path.getsize(source_path) > LOGO_MAX_BYTES:
        raise SystemExit("Logo must be 512 KB or smaller.")

    with open(source_path, "rb") as handle:
        head = handle.read(16)

    ext = next((name for name, (magic, _m) in LOGO_TYPES.items() if head.startswith(magic)), "")
    if ext == "webp" and head[8:12] != b"WEBP":
        ext = ""
    if not ext:
        raise SystemExit("Logo must be a PNG, JPEG or WebP image (SVG is not accepted).")

    os.makedirs(LOGO_DIR, exist_ok=True)
    shutil.copyfile(source_path, os.path.join(LOGO_DIR, f"{sponsor_id}.{ext}"))
    return ext


def add(args):
    tier = SPONSORSHIP_TIERS.get(args.tier)
    if not tier:
        raise SystemExit(
            f"Unknown tier '{args.tier}'. Choose from: {', '.join(SPONSORSHIP_TIERS)}"
        )

    amount_paise = int(args.amount * 100) if args.amount is not None else tier["amount_paise"]
    order_id = f"offline-{args.reference.strip()}"

    conn = sqlite3.connect(DB_PATH)
    existing = conn.execute("SELECT id FROM sponsors WHERE order_id = ?", (order_id,)).fetchone()
    if existing:
        conn.close()
        raise SystemExit(f"A sponsor with reference '{args.reference}' is already listed (id {existing[0]}).")

    cursor = conn.execute(
        """INSERT INTO sponsors
           (order_id, payment_id, tier, amount_paise, company_name, website, contact,
            status, listed, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, 'paid', 1, ?, ?)""",
        (
            order_id,
            args.reference.strip(),
            args.tier,
            amount_paise,
            args.company.strip(),
            _clean_website(args.website),
            json.dumps({"contact_name": args.contact or "", "email": args.email or "", "phone": args.phone or ""}),
            _now(),
            _now(),
        ),
    )
    sponsor_id = cursor.lastrowid

    if args.logo:
        ext = _store_logo(sponsor_id, args.logo)
        conn.execute("UPDATE sponsors SET logo_ext = ? WHERE id = ?", (ext, sponsor_id))

    conn.commit()
    conn.close()
    print(f"Listed '{args.company}' as {tier['label']} (id {sponsor_id}).")
    if not args.logo:
        print("No logo attached — the banner will show the name on its own until one is added.")


def show(_args):
    conn = sqlite3.connect(DB_PATH)
    rows = conn.execute(
        """SELECT id, company_name, tier, status, listed, logo_ext, payment_id
           FROM sponsors ORDER BY id"""
    ).fetchall()
    conn.close()

    if not rows:
        print("No sponsors on file. The banner is hidden until one is listed.")
        return

    print(f"{'id':>4}  {'company':<38} {'tier':<10} {'status':<16} {'live':<5} {'logo':<5} reference")
    for sponsor_id, company, tier, status, listed, logo_ext, payment_id in rows:
        live = "yes" if (status == "paid" and listed) else "no"
        print(
            f"{sponsor_id:>4}  {company[:38]:<38} {tier:<10} {status:<16} "
            f"{live:<5} {(logo_ext or '-'):<5} {payment_id or '-'}"
        )


def set_listed(sponsor_id, listed):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.execute(
        "UPDATE sponsors SET listed = ?, updated_at = ? WHERE id = ?",
        (1 if listed else 0, _now(), sponsor_id),
    )
    conn.commit()
    conn.close()
    if cursor.rowcount == 0:
        raise SystemExit(f"No sponsor with id {sponsor_id}.")
    print(f"Sponsor {sponsor_id} is now {'listed' if listed else 'hidden'}.")


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--list", action="store_true", help="show every sponsor row and whether it is live")
    parser.add_argument("--unlist", type=int, metavar="ID", help="hide a listing without deleting it")
    parser.add_argument("--relist", type=int, metavar="ID", help="put a hidden listing back on the banner")

    parser.add_argument("--company", help="company name as it should appear on the banner")
    parser.add_argument("--tier", choices=list(SPONSORSHIP_TIERS), help="sponsorship tier")
    parser.add_argument("--reference", help="DD number / NEFT UTR / cheque number")
    parser.add_argument("--amount", type=float, help="amount received in RUPEES (defaults to the tier price)")
    parser.add_argument("--website", default="", help="company website (http(s) only)")
    parser.add_argument("--logo", help="path to a PNG, JPEG or WebP logo file")
    parser.add_argument("--contact", default="", help="contact person")
    parser.add_argument("--email", default="", help="contact e-mail")
    parser.add_argument("--phone", default="", help="contact phone")

    args = parser.parse_args()

    if args.list:
        return show(args)
    if args.unlist is not None:
        return set_listed(args.unlist, False)
    if args.relist is not None:
        return set_listed(args.relist, True)

    missing = [flag for flag, value in (("--company", args.company), ("--tier", args.tier), ("--reference", args.reference)) if not value]
    if missing:
        parser.error(f"adding a sponsor needs {', '.join(missing)}")

    add(args)


if __name__ == "__main__":
    main()
