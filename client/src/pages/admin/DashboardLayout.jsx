import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineFolder,
  HiOutlineLightningBolt,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineChatAlt,
  HiOutlineLogout,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin", label: "Overview", icon: HiOutlineViewGrid, end: true },
  { to: "/admin/projects", label: "Projects", icon: HiOutlineFolder },
  { to: "/admin/skills", label: "Skills", icon: HiOutlineLightningBolt },
  { to: "/admin/about", label: "About", icon: HiOutlineUser },
  { to: "/admin/contact", label: "Contact Info", icon: HiOutlineMail },
  { to: "/admin/messages", label: "Messages", icon: HiOutlineChatAlt },
];

const DashboardLayout = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-base-bg">
      <aside className="w-60 shrink-0 border-r border-white/10 p-5 hidden md:flex flex-col">
        <div className="font-display font-semibold text-white mb-8">
          Admin<span className="text-accent-cyan">.</span>
        </div>
        <nav className="flex-1 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gradient-accent text-base-bg"
                    : "text-ink-muted hover:text-ink hover:bg-white/5"
                }`
              }
            >
              <l.icon className="text-lg" /> {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-ink-muted mb-3 truncate">{admin?.email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-ink-muted hover:text-red-400"
          >
            <HiOutlineLogout /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
