import React from "react";

const CertificationSkeleton = () => (
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10 animate-pulse">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="card">
        <div className="w-full aspect-[4/3] rounded-xl bg-white/10" />
        <div className="h-4 w-20 rounded-full bg-white/10 mt-4" />
        <div className="h-6 w-3/4 rounded-full bg-white/10 mt-3" />
        <div className="h-4 w-1/2 rounded-full bg-white/10 mt-3" />
        <div className="h-4 w-full rounded-full bg-white/10 mt-4" />
        <div className="h-4 w-5/6 rounded-full bg-white/10 mt-2" />
      </div>
    ))}
  </div>
);

export default CertificationSkeleton;