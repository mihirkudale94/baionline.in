import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the element named by the URL hash.
 *
 * Uses an explicit window.scrollTo with behavior "instant" rather than
 * scrollIntoView: `html` carries `scroll-behavior: smooth`, and
 * scrollIntoView's default `behavior: "auto"` defers to that CSS value, which
 * makes the call a silent no-op here. "instant" overrides the stylesheet.
 *
 * The target is offset by the sticky header so the heading isn't hidden
 * underneath it. Pages that fetch their content should pass `ready` so the
 * scroll waits for the anchor to exist.
 */
const useHashScroll = (ready = true) => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash || !ready) return;
    const id = decodeURIComponent(hash.slice(1));

    const headerOffset = () => {
      const header = document.querySelector(".navbar-header");
      return (header ? header.getBoundingClientRect().height : 0) + 16;
    };

    // The layout keeps moving for a beat after mount — lazy images resolve and
    // the Committees accordions collapse, which can shrink the page by hundreds
    // of pixels under us. Re-align until the target holds still across several
    // consecutive frames rather than stopping at the first stable reading.
    const TICK = 100;
    const STABLE_TICKS = 4;
    const MAX_TICKS = 40; // ~4s ceiling
    let ticks = 0;
    let stable = 0;
    let lastTop = null;

    const timer = setInterval(() => {
      const el = document.getElementById(id);
      if (!el) {
        if (++ticks > MAX_TICKS) clearInterval(timer);
        return;
      }

      // Scroll-position independent: rect.top + scrollY is the absolute offset.
      const top = Math.max(
        Math.round(el.getBoundingClientRect().top + window.scrollY - headerOffset()),
        0
      );
      if (Math.abs(window.scrollY - top) > 1) {
        window.scrollTo({ top, left: 0, behavior: "instant" });
      }

      stable = top === lastTop ? stable + 1 : 0;
      lastTop = top;

      if (stable >= STABLE_TICKS || ++ticks > MAX_TICKS) clearInterval(timer);
    }, TICK);

    return () => clearInterval(timer);
  }, [hash, ready]);
};

export default useHashScroll;
