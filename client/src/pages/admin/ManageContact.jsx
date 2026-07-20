import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import Loader from "../../components/Loader";

const ManageContact = () => {
  const [info, setInfo] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/contact/info").then((res) => setInfo(res.data));
  }, []);

  if (!info) return <Loader full />;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put("/contact/info", info);
      setInfo(res.data);
      toast.success("Contact info updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "location", label: "Location" },
    { key: "github", label: "GitHub URL" },
    { key: "linkedin", label: "LinkedIn URL" },
  ];

  return (
    <form onSubmit={handleSave}>
      <span className="eyebrow">// Contact</span>
      <h1 className="section-title mt-2 mb-6">Manage Contact Info</h1>

      <div className="card space-y-4 max-w-lg">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-sm text-ink-muted block mb-1.5">{f.label}</label>
            <input
              value={info[f.key] || ""}
              onChange={(e) => setInfo({ ...info, [f.key]: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
          </div>
        ))}
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default ManageContact;
