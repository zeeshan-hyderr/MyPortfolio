import React from "react";

const TechBadge = ({ label }) => (
  <span className="font-mono text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-ink-muted">
    {label}
  </span>
);

export default TechBadge;
