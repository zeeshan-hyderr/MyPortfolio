import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import api from "../api/axios";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";

const categories = ["All", "Web", "Mobile", "AI/ML", "IoT", "Other"];

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);

  useEffect(() => {
    setProjects(null);
    const params = {};
    if (category !== "All") params.category = category;
    if (search) params.search = search;

    const timeout = setTimeout(() => {
      api.get("/projects", { params }).then((res) => setProjects(res.data));
    }, 300);

    return () => clearTimeout(timeout);
  }, [category, search]);

  return (
    <section className="pt-32 pb-20 container-app">
      <span className="eyebrow">// Projects</span>
      <h1 className="section-title mt-2">Selected Work</h1>
      <p className="text-ink-muted mt-4 max-w-2xl">
        A mix of web, mobile, IoT and AI/ML projects — click any card for full details.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <div className="relative flex-1">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-base-surface border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-accent-cyan/60 outline-none"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors ${
                category === c
                  ? "bg-gradient-accent text-base-bg border-transparent"
                  : "border-white/10 text-ink-muted hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {!projects ? (
        <Loader />
      ) : projects.length === 0 ? (
        <p className="text-ink-muted mt-16 text-center">No projects match your search.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} onOpen={setActive} />
          ))}
        </div>
      )}

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
};

export default Projects;
