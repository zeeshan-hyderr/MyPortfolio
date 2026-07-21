import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiPlus, HiPencil, HiTrash, HiX } from "react-icons/hi";
import api from "../../api/axios";
import Loader from "../../components/Loader";
import { formatCertificationDate, isPdfFile } from "../../utils/certifications";

const categories = ["Programming", "AI", "Cloud", "Database", "Web Development", "DevOps", "Security", "Other"];

const emptyForm = {
  title: "",
  organization: "",
  verificationLink: "",
  issueDate: "",
  expiryDate: "",
  credentialId: "",
  shortDescription: "",
  skills: "",
  category: "Programming",
};

const ManageCertifications = () => {
  const [certifications, setCertifications] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [certificateFile, setCertificateFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchCertifications = () => {
    api.get("/certifications").then((res) => setCertifications(res.data));
  };

  useEffect(fetchCertifications, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setCertificateFile(null);
    setShowForm(true);
  };

  const openEdit = (certification) => {
    setEditingId(certification._id);
    setForm({
      title: certification.title,
      organization: certification.organization,
      verificationLink: certification.verificationLink || "",
      issueDate: certification.issueDate ? certification.issueDate.slice(0, 10) : "",
      expiryDate: certification.expiryDate ? certification.expiryDate.slice(0, 10) : "",
      credentialId: certification.credentialId || "",
      shortDescription: certification.shortDescription,
      skills: (certification.skills || []).join(", "),
      category: certification.category,
    });
    setCertificateFile(null);
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("organization", form.organization);
      fd.append("verificationLink", form.verificationLink);
      fd.append("issueDate", form.issueDate);
      fd.append("expiryDate", form.expiryDate);
      fd.append("credentialId", form.credentialId);
      fd.append("shortDescription", form.shortDescription);
      fd.append("category", form.category);
      fd.append("skills", JSON.stringify(form.skills.split(",").map((skill) => skill.trim()).filter(Boolean)));
      if (certificateFile) fd.append("certificateFile", certificateFile);

      if (editingId) {
        await api.put(`/certifications/${editingId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Certification updated");
      } else {
        if (!certificateFile) {
          toast.error("A certificate image or PDF is required");
          setSaving(false);
          return;
        }
        await api.post("/certifications", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Certification created");
      }

      setShowForm(false);
      fetchCertifications();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this certification? This cannot be undone.")) return;
    try {
      await api.delete(`/certifications/${id}`);
      toast.success("Certification deleted");
      fetchCertifications();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="eyebrow">// Certifications</span>
          <h1 className="section-title mt-2">Manage Certifications</h1>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <HiPlus /> Add Certification
        </button>
      </div>

      {!certifications ? (
        <Loader />
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {certifications.map((certification) => (
            <div key={certification._id} className="card flex gap-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/20 shrink-0">
                {isPdfFile(certification) ? (
                  <iframe
                    src={`${certification.certificateFile?.url}#toolbar=0&navpanes=0&scrollbar=0`}
                    title={certification.title}
                    className="w-full h-full pointer-events-none"
                  />
                ) : (
                  <img
                    src={certification.certificateFile?.url}
                    alt={certification.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{certification.title}</p>
                <p className="text-xs text-accent-cyan font-mono">{certification.organization}</p>
                <p className="text-sm text-ink-muted line-clamp-2 mt-1">{certification.shortDescription}</p>
                <p className="text-xs text-ink-muted mt-2">
                  Issued {formatCertificationDate(certification.issueDate)}
                </p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => openEdit(certification)}
                    className="text-sm text-ink-muted hover:text-accent-cyan flex items-center gap-1"
                  >
                    <HiPencil /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(certification._id)}
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
          <form onSubmit={handleSave} className="glass rounded-2xl max-w-2xl w-full my-8 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-semibold text-xl text-white">
                {editingId ? "Edit Certification" : "Add Certification"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-2xl text-ink-muted hover:text-white">
                <HiX />
              </button>
            </div>

            <input
              required
              placeholder="Certificate title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
            <input
              required
              placeholder="Issuing organization / platform"
              value={form.organization}
              onChange={(e) => setForm({ ...form, organization: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                type="date"
                value={form.issueDate}
                onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
              />
              <input
                type="date"
                value={form.expiryDate}
                onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Verification link"
                value={form.verificationLink}
                onChange={(e) => setForm({ ...form, verificationLink: e.target.value })}
                className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
              />
              <input
                placeholder="Credential ID (optional)"
                value={form.credentialId}
                onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
                className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
              />
            </div>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <textarea
              required
              placeholder="Short description"
              rows={4}
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
            <input
              placeholder="Skills / technologies covered, comma separated"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />

            <div>
              <label className="text-sm text-ink-muted block mb-1.5">
                Certificate image or PDF {editingId ? "(leave empty to keep current)" : "*"}
              </label>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setCertificateFile(e.target.files[0])}
                className="text-sm text-ink-muted"
              />
            </div>

            <button type="submit" disabled={saving} className="btn-primary w-full justify-center disabled:opacity-60">
              {saving ? "Saving..." : editingId ? "Update Certification" : "Create Certification"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageCertifications;