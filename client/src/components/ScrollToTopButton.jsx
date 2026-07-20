import React, { useState, useEffect } from "react";
import { HiArrowUp } from "react-icons/hi";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gradient-accent text-base-bg flex items-center justify-center shadow-glow"
      aria-label="Scroll to top"
    >
      <HiArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
