import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm">
        <span className="eyebrow">// Admin</span>
        <h1 className="font-display font-semibold text-2xl text-white mt-1 mb-6">Sign In</h1>

        <div className="mb-4">
          <label className="text-sm text-ink-muted block mb-1.5">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
          />
        </div>
        <div className="mb-6">
          <label className="text-sm text-ink-muted block mb-1.5">Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-base-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </section>
  );
};

export default AdminLogin;
