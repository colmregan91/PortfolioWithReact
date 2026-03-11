// src/components/BackToTopButton.jsx
import { useState, useEffect } from "react";
import "../backtotop.css";
export default function Backtotop() {
  const [visible, setVisible] = useState(false);

  // Show the button once the user has scrolled _n_ pixels
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200); // 200-px threshold
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null; // nothing in the DOM until needed

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="back-to-top" // replace with Tailwind version if you prefer
    >
      ↑
    </button>
  );
}
