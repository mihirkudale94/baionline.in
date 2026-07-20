import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} — BAI Pune Centre` : previous;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
