import React from "react";

const HomeSectionHeading = ({ eyebrow, title, description, action }) => (
  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-8">
    <div className="max-w-2xl">
      <span className="eyebrow">// {eyebrow}</span>
      <h2 className="section-title mt-2">{title}</h2>
      {description && <p className="text-ink-muted mt-3 leading-relaxed">{description}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default HomeSectionHeading;