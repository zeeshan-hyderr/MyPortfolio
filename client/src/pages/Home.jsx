import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import api from "../api/axios";
import profileFallback from "../assets/profile.jpg";

const Home = () => {
  const [about, setAbout] = useState(null);
  const [typed, setTyped] = useState("");
  const fullText = "const engineer = buildFullStackSolutions();";

  useEffect(() => {
    api.get("/about").then((res) => setAbout(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-24 pb-16">
      <div className="container-app grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-sm text-accent-cyan mb-4 h-5">
            {typed}
            <span className="animate-pulse">▍</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-white leading-tight">
            Hi, I'm {about?.name?.split(" ")[0] || "Zeeshan"}
            <span className="text-accent-cyan">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-ink-muted font-display mt-3">
            {about?.title || "Full Stack Developer & AI/ML Specialist"}
          </p>
          <p className="text-ink-muted mt-5 max-w-xl leading-relaxed">
            {about?.summary?.slice(0, 180) ||
              "I build reliable web applications and AI-powered tools, from idea to deployment."}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            {about?.resumeLink && (
              <a href={about.resumeLink} target="_blank" rel="noreferrer" className="btn-primary">
                <FaDownload /> Download Resume
              </a>
            )}
            <Link to="/contact" className="btn-outline">
              Get in Touch
            </Link>
          </div>

          <div className="flex items-center gap-5 mt-8 text-xl text-ink-muted">
            {about?.socialLinks?.github && (
              <a href={about.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-accent-cyan">
                <FaGithub />
              </a>
            )}
            {about?.socialLinks?.linkedin && (
              <a href={about.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent-cyan">
                <FaLinkedin />
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-accent blur-3xl opacity-20 rounded-full" />
          <img
            src={about?.profilePicture?.url || profileFallback}
            alt={about?.name || "Profile"}
            className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl border border-white/10 shadow-glow"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
