import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const StatCard = ({ label, value, to }) => (
  <Link to={to} className="card block hover:border-accent-cyan/40">
    <p className="text-sm text-ink-muted">{label}</p>
    <p className="text-3xl font-display font-semibold text-white mt-2">{value}</p>
  </Link>
);

const DashboardHome = () => {
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0 });

  useEffect(() => {
    Promise.all([
      api.get("/projects"),
      api.get("/skills"),
      api.get("/contact/messages"),
    ]).then(([p, s, m]) => {
      setStats({ projects: p.data.length, skills: s.data.length, messages: m.data.length });
    });
  }, []);

  return (
    <div>
      <span className="eyebrow">// Overview</span>
      <h1 className="section-title mt-2 mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-3 gap-5">
        <StatCard label="Total Projects" value={stats.projects} to="/admin/projects" />
        <StatCard label="Total Skills" value={stats.skills} to="/admin/skills" />
        <StatCard label="Unread Messages" value={stats.messages} to="/admin/messages" />
      </div>

      <div className="card mt-8">
        <h2 className="font-semibold text-white mb-2">Quick tips</h2>
        <ul className="text-sm text-ink-muted list-disc list-inside space-y-1">
          <li>Add projects with a featured image plus optional gallery screenshots.</li>
          <li>Group skills into categories — they'll auto-organize on the public Skills page.</li>
          <li>Update your About section any time; changes reflect immediately on the site.</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
