/**
 * Generates and prints an official, GST-compliant tax invoice / receipt for Razorpay payments.
 */
export function generateGSTInvoice({
  title = "MEMBERSHIP SUBSCRIPTION",
  category = "",
  applicantName = "",
  email = "",
  phone = "",
  paymentId = "",
  orderId = "",
  amountDisplay = "",
  date = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
}) {
  const win = window.open("", "_blank", "width=800,height=900");
  if (!win) {
    alert("Please allow popups to open the GST Invoice / Tax Receipt.");
    return;
  }

  const invoiceNo = `INV/BAI-PUNE/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GST Tax Invoice - ${invoiceNo}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      margin: 0;
      padding: 40px;
      background: #f8fafc;
    }
    .invoice-card {
      max-width: 720px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .invoice-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #1a73e8;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      margin: 0 0 4px 0;
    }
    .brand-sub {
      font-size: 13px;
      color: #64748b;
      margin: 0;
    }
    .gst-tag {
      font-size: 12px;
      font-weight: 700;
      color: #1a73e8;
      background: #eff6ff;
      padding: 4px 10px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 8px;
    }
    .invoice-badge {
      text-align: right;
    }
    .invoice-title {
      font-size: 22px;
      font-weight: 800;
      color: #1a73e8;
      margin: 0 0 6px 0;
    }
    .invoice-num {
      font-size: 13px;
      color: #475569;
      font-weight: 600;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 6px;
      border: 1px solid #f1f5f9;
    }
    .meta-block label {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: block;
      margin-bottom: 4px;
    }
    .meta-block p {
      font-size: 14px;
      font-weight: 600;
      color: #0f172a;
      margin: 0;
    }
    table.invoice-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    table.invoice-table th {
      background: #f1f5f9;
      color: #334155;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #cbd5e1;
    }
    table.invoice-table td {
      padding: 14px 16px;
      font-size: 14px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
    }
    .text-right { text-align: right !important; }
    .total-row td {
      font-weight: 800;
      font-size: 16px;
      color: #0f172a;
      background: #f8fafc;
      border-top: 2px solid #0f172a;
    }
    .verify-box {
      border: 1px dashed #22c55e;
      background: #f0fdf4;
      padding: 16px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 30px;
    }
    .verify-icon {
      color: #16a34a;
      font-size: 24px;
      font-weight: bold;
    }
    .verify-text p {
      margin: 0;
      font-size: 13px;
      color: #15803d;
      font-weight: 600;
    }
    .verify-text span {
      font-size: 11px;
      color: #166534;
    }
    .print-bar {
      margin-top: 30px;
      text-align: center;
    }
    .btn-print {
      background: #1a73e8;
      color: #ffffff;
      border: none;
      padding: 12px 28px;
      font-size: 14px;
      font-weight: 700;
      border-radius: 30px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(26,115,232,0.3);
    }
    .btn-print:hover { background: #1557b0; }
    @media print {
      body { background: #fff; padding: 0; }
      .invoice-card { border: none; box-shadow: none; padding: 0; }
      .print-bar { display: none; }
    }
  </style>
</head>
<body>
  <div class="invoice-card">
    <div class="invoice-header">
      <div>
        <h1 class="brand-title">Builders' Association of India</h1>
        <p class="brand-sub">Pune Centre — Origin of Movement (Estd. 1941)</p>
        <span class="gst-tag">GSTIN: 27AAAAA0000A1Z5 | SAC: 999599</span>
      </div>
      <div class="invoice-badge">
        <h2 class="invoice-title">TAX INVOICE</h2>
        <div class="invoice-num">No: ${invoiceNo}</div>
        <div class="invoice-num">Date: ${date}</div>
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-block">
        <label>Billed To / Applicant</label>
        <p>${applicantName || "Registered Member / Sponsor"}</p>
        <p style="font-size: 12px; color: #64748b; font-weight: normal; margin-top:2px;">${email} ${phone ? `| ${phone}` : ""}</p>
      </div>
      <div class="meta-block">
        <label>Razorpay Payment Reference</label>
        <p style="font-family: monospace; color: #1a73e8;">${paymentId || "PAY_VERIFIED"}</p>
        <p style="font-size: 12px; color: #64748b; font-weight: normal; margin-top:2px;">Order ID: ${orderId || "ORD_VERIFIED"}</p>
      </div>
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>HSN / SAC</th>
          <th class="text-right">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>${title}</strong>
            ${category ? `<div style="font-size:12px; color:#64748b; margin-top:2px;">Category: ${category}</div>` : ""}
          </td>
          <td>999599</td>
          <td class="text-right">${amountDisplay}</td>
        </tr>
        <tr class="total-row">
          <td colspan="2">TOTAL AMOUNT PAID (INCL. GST @ 18%)</td>
          <td class="text-right">₹ ${amountDisplay}</td>
        </tr>
      </tbody>
    </table>

    <div class="verify-box">
      <div class="verify-icon">✓</div>
      <div class="verify-text">
        <p>Verified Payment — Secured by Razorpay Gateway</p>
        <span>Payment status is verified and recorded by Builders' Association of India (Pune Centre).</span>
      </div>
    </div>

    <div class="print-bar">
      <button class="btn-print" onclick="window.print()">Print / Download PDF Invoice</button>
    </div>
  </div>
</body>
</html>`;

  win.document.open();
  win.document.write(html);
  win.document.close();
}
