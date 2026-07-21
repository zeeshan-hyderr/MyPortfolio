import React from "react";

const HomeSkeleton = () => (
  <section className="pt-24 pb-20 container-app">
    <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
      <div className="space-y-4 animate-pulse">
        <div className="h-4 w-40 rounded-full bg-white/10" />
        <div className="h-14 w-[85%] rounded-2xl bg-white/10" />
        <div className="h-8 w-[70%] rounded-2xl bg-white/10" />
        <div className="h-5 w-[90%] rounded-full bg-white/10" />
        <div className="h-5 w-[82%] rounded-full bg-white/10" />
        <div className="flex gap-3 pt-4">
          <div className="h-11 w-36 rounded-lg bg-white/10" />
          <div className="h-11 w-32 rounded-lg bg-white/10" />
          <div className="h-11 w-32 rounded-lg bg-white/10" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[22rem] aspect-square rounded-[2rem] glass border-white/10 animate-pulse" />
    </div>
  </section>
);

export default HomeSkeleton;