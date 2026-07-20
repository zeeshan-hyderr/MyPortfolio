import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiPlus, HiPencil, HiTrash, HiX } from "react-icons/hi";
import api from "../../api/axios";
import Loader from "../../components/Loader";

const emptyForm = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  githubLink: "",
  liveLink: "",
  techStack: "",
  category: "Web",
  challenges: "",
  features: "",
  featured: false,
};

const ManageProjects = () => {
  const [projects, setProjects] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [featuredFile, setFeaturedFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [saving, setSaving] = useState(false);

  const fetchProjects = () => {
    api.get("/projects").then((res) => setProjects(res.data));
  };

  useEffect(fetchProjects, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFeaturedFile(null);
    setGalleryFiles([]);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      githubLink: p.githubLink || "",
      liveLink: p.liveLink || "",
      techStack: (p.techStack || []).join(", "),
      category: p.category,
      challenges: p.challenges || "",
      features: (p.features || []).join("\n"),
      featured: p.featured,
    });
    setFeaturedFile(null);
    setGalleryFiles([]);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("shortDescription", form.shortDescription);
      fd.append("fullDescription", form.fullDescription);
      fd.append("githubLink", form.githubLink);
      fd.append("liveLink", form.liveLink);
      fd.append("category", form.category);
      fd.append("challenges", form.challenges);
      fd.append("featured", form.featured);
      fd.append(
        "techStack",
        JSON.stringify(form.techStack.split(",").map((t) => t.trim()).filter(Boolean))
      );
      fd.append(
        "features",
        JSON.stringify(form.features.split("\n").map((f) => f.trim()).filter(Boolean))
      );
      if (featuredFile) fd.append("featuredImage", featuredFile);
      galleryFiles.forEach((f) => fd.append("images", f));

      if (editingId) {
        await api.put(`/projects/${editingId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Project updated");
      } else {
        if (!featuredFile) {
          toast.error("A featured image is required");
          setSaving(false);
          return;
        }
        await api.post("/projects", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Project created");
      }
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success("Project deleted");
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="eyebrow">// Projects</span>
          <h1 className="section-title mt-2">Manage Projects</h1>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <HiPlus /> Add Project
        </button>
      </div>

      {!projects ? (
        <Loader />
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div key={p._id} className="card flex gap-4">
              <img
                src={p.featuredImage?.url}
                alt={p.title}
                className="w-24 h-24 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{p.title}</p>
                <p className="text-xs text-accent-cyan font-mono">{p.category}</p>
                <p className="text-sm text-ink-muted line-clamp-2 mt-1">{p.shortDescription}</p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-sm text-ink-muted hover:text-accent-cyan flex items-center gap-1"
                  >
                    <HiPencil /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-sm text-ink-muted hover:text-red-400 flex items-center gap-1"
                  >
                    <HiTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <form onSubmit={handleSave} className="glass rounded-2xl max-w-xl w-full my-8 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-xl text-white">
                {editingId ? "Edit Project" : "Add Project"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-2xl text-ink-muted hover:text-white">
                <HiX />
              </button>
            </div>

            <input
              required
              placeholder="Project title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
            <textarea
              required
              placeholder="Short description (shown on card)"
              rows={2}
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
            <textarea
              required
              placeholder="Full description (shown in modal)"
              rows={4}
              value={form.fullDescription}
              onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="GitHub link"
                value={form.githubLink}
                onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
                className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
              />
              <input
                placeholder="Live demo link"
                value={form.liveLink}
                onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
                className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
              >
                {["Web", "Mobile", "AI/ML", "IoT", "Other"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-sm text-ink-muted">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Featured project
              </label>
            </div>
            <input
              placeholder="Tech stack, comma separated (React, Node.js, MongoDB)"
              value={form.techStack}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
            <textarea
              placeholder="Features, one per line"
              rows={3}
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
            <textarea
              placeholder="Challenges faced"
              rows={2}
              value={form.challenges}
              onChange={(e) => setForm({ ...form, challenges: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />

            <div>
              <label className="text-sm text-ink-muted block mb-1.5">
                Featured image {editingId ? "(leave empty to keep current)" : "*"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFeaturedFile(e.target.files[0])}
                className="text-sm text-ink-muted"
              />
            </div>
            <div>
              <label className="text-sm text-ink-muted block mb-1.5">
                Gallery screenshots (adds to existing gallery)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setGalleryFiles(Array.from(e.target.files))}
                className="text-sm text-ink-muted"
              />
            </div>

            <button type="submit" disabled={saving} className="btn-primary w-full justify-center disabled:opacity-60">
              {saving ? "Saving..." : editingId ? "Update Project" : "Create Project"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
