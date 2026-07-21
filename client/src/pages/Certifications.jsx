import React, { useEffect, useMemo, useState } from "react";
import { HiSearch } from "react-icons/hi";
import api from "../api/axios";
import CertificationCard from "../components/CertificationCard";
import CertificationModal from "../components/CertificationModal";
import CertificationSkeleton from "../components/CertificationSkeleton";

const categories = ["All", "Programming", "AI", "Cloud", "Database", "Web Development", "DevOps", "Security", "Other"];

const Certifications = () => {
  const [certifications, setCertifications] = useState(null);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);

  useEffect(() => {
    setCertifications(null);
    const params = {};
    if (category !== "All") params.category = category;
    if (search) params.search = search;

    const timeout = setTimeout(() => {
      api.get("/certifications", { params }).then((res) => setCertifications(res.data)).catch(() => setCertifications([]));
    }, 250);

    return () => clearTimeout(timeout);
  }, [category, search]);

  const filtered = useMemo(() => certifications || [], [certifications]);

  return (
    <section className="pt-32 pb-20 container-app">
      <span className="eyebrow">// Certifications</span>
      <h1 className="section-title mt-2">Professional Certifications</h1>
      <p className="text-ink-muted mt-4 max-w-2xl">
        Verified credentials, completed learning tracks, and certificates managed from the admin dashboard.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search certifications..."
            className="w-full bg-base-surface border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-accent-cyan/60 outline-none"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors ${
                category === item
                  ? "bg-gradient-accent text-base-bg border-transparent"
                  : "border-white/10 text-ink-muted hover:text-ink"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {certifications === null ? (
        <CertificationSkeleton />
      ) : filtered.length === 0 ? (
        <p className="text-ink-muted mt-16 text-center">No certifications match your search.</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">
          {filtered.map((certification) => (
            <CertificationCard key={certification._id} certification={certification} onOpen={setActive} />
          ))}
        </div>
      )}

      <CertificationModal certification={active} onClose={() => setActive(null)} />
    </section>
  );
};

export default Certifications;