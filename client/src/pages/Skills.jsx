import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";
import SkillCategoryCard from "../components/SkillCategoryCard";

const Skills = () => {
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    api.get("/skills").then((res) => setSkills(res.data));
  }, []);

  if (!skills) return <Loader full />;

  const grouped = skills.reduce((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section className="pt-32 pb-20 container-app">
      <span className="eyebrow">// Skills</span>
      <h1 className="section-title mt-2">What I Work With</h1>
      <p className="text-ink-muted mt-4 max-w-2xl">
        Tools and technologies I use to design, build and ship full-stack applications.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {Object.entries(grouped).map(([category, list]) => (
          <SkillCategoryCard key={category} category={category} skills={list} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
