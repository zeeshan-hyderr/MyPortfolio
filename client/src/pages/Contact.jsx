import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import api from "../api/axios";

const Contact = () => {
  const [info, setInfo] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    api.get("/contact/info").then((res) => setInfo(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/contact/message", form);
      toast.success("Message sent — thanks for reaching out!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="pt-32 pb-20 container-app">
      <span className="eyebrow">// Contact</span>
      <h1 className="section-title mt-2">Let's Work Together</h1>
      <p className="text-ink-muted mt-4 max-w-2xl">
        Have a project in mind or just want to say hi? Send a message below.
      </p>

      <div className="grid md:grid-cols-[1fr_1.3fr] gap-8 mt-10">
        <div className="card h-fit space-y-4">
          {info?.email && (
            <a href={`mailto:${info.email}`} className="flex items-center gap-3 text-sm text-ink-muted hover:text-accent-cyan">
              <FaEnvelope /> {info.email}
            </a>
          )}
          {info?.phone && (
            <p className="flex items-center gap-3 text-sm text-ink-muted">
              <FaPhone /> {info.phone}
            </p>
          )}
          {info?.location && (
            <p className="flex items-center gap-3 text-sm text-ink-muted">
              <FaMapMarkerAlt /> {info.location}
            </p>
          )}
          {info?.github && (
            <a href={info.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-ink-muted hover:text-accent-cyan">
              <FaGithub /> GitHub
            </a>
          )}
          {info?.linkedin && (
            <a href={info.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-ink-muted hover:text-accent-cyan">
              <FaLinkedin /> LinkedIn
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="text-sm text-ink-muted block mb-1.5">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
          </div>
          <div>
            <label className="text-sm text-ink-muted block mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
          </div>
          <div>
            <label className="text-sm text-ink-muted block mb-1.5">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
            />
          </div>
          <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60">
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
