import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // A hash means the route targets a section, so leave the scroll alone and
    // let useHashScroll place it — otherwise the two fight and the top wins.
    if (hash) return;
    // Jump instantly — CSS `scroll-behavior: smooth` would otherwise
    // animate route changes from the previous scroll position.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
