import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiPlus, HiTrash } from "react-icons/hi";
import api from "../../api/axios";
import Loader from "../../components/Loader";

const ManageAbout = () => {
  const [about, setAbout] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/about").then((res) => setAbout(res.data));
  }, []);

  if (!about) return <Loader full />;

  const updateField = (field, value) => setAbout({ ...about, [field]: value });

  const updateListItem = (listName, index, key, value) => {
    const list = [...about[listName]];
    list[index] = { ...list[index], [key]: value };
    setAbout({ ...about, [listName]: list });
  };

  const addListItem = (listName, emptyItem) => {
    setAbout({ ...about, [listName]: [...(about[listName] || []), emptyItem] });
  };

  const removeListItem = (listName, index) => {
    setAbout({ ...about, [listName]: about[listName].filter((_, i) => i !== index) });
  };

  const addAchievement = () => setAbout({ ...about, achievements: [...(about.achievements || []), ""] });
  const updateAchievement = (i, value) => {
    const list = [...about.achievements];
    list[i] = value;
    setAbout({ ...about, achievements: list });
  };
  const removeAchievement = (i) =>
    setAbout({ ...about, achievements: about.achievements.filter((_, idx) => idx !== i) });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", about.name);
      fd.append("title", about.title);
      fd.append("summary", about.summary);
      fd.append("resumeLink", about.resumeLink || "");
      fd.append("education", JSON.stringify(about.education || []));
      fd.append("experience", JSON.stringify(about.experience || []));
      fd.append("achievements", JSON.stringify(about.achievements || []));
      fd.append("socialLinks", JSON.stringify(about.socialLinks || {}));
      if (profileFile) fd.append("profilePicture", profileFile);

      const res = await api.put("/about", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAbout(res.data);
      setProfileFile(null);
      toast.success("About section updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <span className="eyebrow">// About</span>
      <h1 className="section-title mt-2 mb-6">Manage About Section</h1>

      <div className="card space-y-4 mb-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-ink-muted block mb-1.5">Name</label>
            <input
              value={about.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
          </div>
          <div>
            <label className="text-sm text-ink-muted block mb-1.5">Title</label>
            <input
              value={about.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-ink-muted block mb-1.5">Professional Summary</label>
          <textarea
            rows={4}
            value={about.summary}
            onChange={(e) => updateField("summary", e.target.value)}
            className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-ink-muted block mb-1.5">Resume Link (URL)</label>
            <input
              value={about.resumeLink || ""}
              onChange={(e) => updateField("resumeLink", e.target.value)}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
          </div>
          <div>
            <label className="text-sm text-ink-muted block mb-1.5">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileFile(e.target.files[0])}
              className="text-sm text-ink-muted"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {["github", "linkedin", "email"].map((key) => (
            <div key={key}>
              <label className="text-sm text-ink-muted block mb-1.5 capitalize">{key}</label>
              <input
                value={about.socialLinks?.[key] || ""}
                onChange={(e) =>
                  setAbout({ ...about, socialLinks: { ...about.socialLinks, [key]: e.target.value } })
                }
                className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-white">Education</h2>
          <button
            type="button"
            onClick={() => addListItem("education", { degree: "", institution: "", duration: "", details: "" })}
            className="text-sm text-accent-cyan flex items-center gap-1"
          >
            <HiPlus /> Add
          </button>
        </div>
        {(about.education || []).map((e, i) => (
          <div key={i} className="grid sm:grid-cols-2 gap-3 mb-3 pb-3 border-b border-white/10 last:border-0">
            <input
              placeholder="Degree"
              value={e.degree}
              onChange={(ev) => updateListItem("education", i, "degree", ev.target.value)}
              className="bg-base-bg border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <input
              placeholder="Institution"
              value={e.institution}
              onChange={(ev) => updateListItem("education", i, "institution", ev.target.value)}
              className="bg-base-bg border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <input
              placeholder="Duration"
              value={e.duration}
              onChange={(ev) => updateListItem("education", i, "duration", ev.target.value)}
              className="bg-base-bg border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <div className="flex gap-2">
              <input
                placeholder="Details"
                value={e.details}
                onChange={(ev) => updateListItem("education", i, "details", ev.target.value)}
                className="flex-1 bg-base-bg border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
              />
              <button type="button" onClick={() => removeListItem("education", i)} className="text-ink-muted hover:text-red-400">
                <HiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-white">Experience</h2>
          <button
            type="button"
            onClick={() => addListItem("experience", { role: "", company: "", duration: "", details: "" })}
            className="text-sm text-accent-cyan flex items-center gap-1"
          >
            <HiPlus /> Add
          </button>
        </div>
        {(about.experience || []).map((e, i) => (
          <div key={i} className="grid sm:grid-cols-2 gap-3 mb-3 pb-3 border-b border-white/10 last:border-0">
            <input
              placeholder="Role"
              value={e.role}
              onChange={(ev) => updateListItem("experience", i, "role", ev.target.value)}
              className="bg-base-bg border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <input
              placeholder="Company"
              value={e.company}
              onChange={(ev) => updateListItem("experience", i, "company", ev.target.value)}
              className="bg-base-bg border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <input
              placeholder="Duration"
              value={e.duration}
              onChange={(ev) => updateListItem("experience", i, "duration", ev.target.value)}
              className="bg-base-bg border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <div className="flex gap-2">
              <input
                placeholder="Details"
                value={e.details}
                onChange={(ev) => updateListItem("experience", i, "details", ev.target.value)}
                className="flex-1 bg-base-bg border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
              />
              <button type="button" onClick={() => removeListItem("experience", i)} className="text-ink-muted hover:text-red-400">
                <HiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-white">Achievements</h2>
          <button type="button" onClick={addAchievement} className="text-sm text-accent-cyan flex items-center gap-1">
            <HiPlus /> Add
          </button>
        </div>
        {(about.achievements || []).map((a, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              value={a}
              onChange={(e) => updateAchievement(i, e.target.value)}
              className="flex-1 bg-base-bg border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <button type="button" onClick={() => removeAchievement(i)} className="text-ink-muted hover:text-red-400">
              <HiTrash />
            </button>
          </div>
        ))}
      </div>

      <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ManageAbout;
