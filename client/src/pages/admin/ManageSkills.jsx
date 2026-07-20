import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiPlus, HiTrash } from "react-icons/hi";
import api from "../../api/axios";
import Loader from "../../components/Loader";

const categoryOptions = [
  "Programming Languages",
  "Frontend",
  "Backend",
  "Database",
  "Mobile Development",
  "Tools",
];

const ManageSkills = () => {
  const [skills, setSkills] = useState(null);
  const [form, setForm] = useState({ name: "", category: categoryOptions[0] });
  const [saving, setSaving] = useState(false);

  const fetchSkills = () => {
    api.get("/skills").then((res) => setSkills(res.data));
  };

  useEffect(fetchSkills, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      await api.post("/skills", form);
      setForm({ name: "", category: form.category });
      fetchSkills();
      toast.success("Skill added");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add skill");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      fetchSkills();
      toast.success("Skill removed");
    } catch (err) {
      toast.error("Failed to remove skill");
    }
  };

  const grouped = (skills || []).reduce((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <div>
      <span className="eyebrow">// Skills</span>
      <h1 className="section-title mt-2 mb-6">Manage Skills</h1>

      <form onSubmit={handleAdd} className="card flex flex-col sm:flex-row gap-3 mb-8">
        <input
          placeholder="Skill name (e.g. Docker)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="flex-1 bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
        >
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button disabled={saving} className="btn-primary shrink-0 justify-center">
          <HiPlus /> Add
        </button>
      </form>

      {!skills ? (
        <Loader />
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {Object.entries(grouped).map(([category, list]) => (
            <div key={category} className="card">
              <span className="eyebrow">// {category}</span>
              <div className="flex flex-wrap gap-2 mt-4">
                {list.map((s) => (
                  <span
                    key={s._id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-ink"
                  >
                    {s.name}
                    <button onClick={() => handleDelete(s._id)} className="text-ink-muted hover:text-red-400">
                      <HiTrash size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSkills;
