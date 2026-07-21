import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload, FaEnvelope } from "react-icons/fa";
import api from "../api/axios";
import profileFallback from "../assets/profile.jpg";
import HomeSkeleton from "../components/HomeSkeleton";
import HomeSectionHeading from "../components/HomeSectionHeading";
import FeaturedProjectCard from "../components/FeaturedProjectCard";
import SkillPill from "../components/SkillPill";
import AnimatedCounter from "../components/AnimatedCounter";
import { resolvePublicEmail } from "../utils/publicContact";

const heroTypeText = "const engineer = buildFullStackSolutions();";

const Home = () => {
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadHomeData = async () => {
      setLoading(true);

      try {
        const [aboutRes, skillsRes, projectsRes] = await Promise.all([
          api.get("/about"),
          api.get("/skills"),
          api.get("/projects"),
        ]);

        if (!mounted) return;

        setAbout(aboutRes.data);
        setSkills(skillsRes.data || []);
        setProjects(projectsRes.data || []);
      } catch {
        if (!mounted) return;
        setAbout(null);
        setSkills([]);
        setProjects([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadHomeData();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTyped(heroTypeText.slice(0, index + 1));
      index += 1;
      if (index === heroTypeText.length) clearInterval(interval);
    }, 42);

    return () => clearInterval(interval);
  }, []);

  const topSkills = useMemo(() => skills.slice(0, 10), [skills]);

  const featuredProjects = useMemo(() => {
    const sorted = [...projects].sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
    const featured = sorted.filter((project) => project.featured);
    return (featured.length >= 3 ? featured : sorted).slice(0, 3);
  }, [projects]);

  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const technologies = new Set(skills.map((skill) => skill.name.trim().toLowerCase())).size;
    const liveProjects = projects.filter((project) => project.liveLink).length;
    const earliestProjectYear = projects.length
      ? Math.min(...projects.map((project) => new Date(project.createdAt || Date.now()).getFullYear()))
      : new Date().getFullYear();

    return [
      { value: totalProjects, label: "Total Projects" },
      { value: technologies, label: "Technologies" },
      { value: Math.max(1, new Date().getFullYear() - earliestProjectYear + 1), label: "Years of Learning", suffix: "+" },
      { value: liveProjects, label: "Live Demos" },
    ];
  }, [projects, skills]);

  const profileImage = about?.profilePicture?.url || profileFallback;
  const intro = about?.summary || "I build reliable web applications and polished digital experiences from idea to deployment.";
  const introSnippet = intro.length > 320 ? `${intro.slice(0, 320).trim()}...` : intro;
  const publicEmail = resolvePublicEmail(about?.socialLinks?.email);

  if (loading) return <HomeSkeleton />;

  return (
    <>
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[-6rem] h-72 w-72 rounded-full bg-accent-cyan/10 blur-3xl" />
          <div className="absolute bottom-0 right-[-8rem] h-80 w-80 rounded-full bg-accent-violet/10 blur-3xl" />
        </div>

        <div className="container-app relative z-10 grid lg:grid-cols-[1.12fr_0.88fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="font-mono text-sm text-accent-cyan mb-4 h-5">
              {typed}
              <span className="animate-pulse">▍</span>
            </div>

            <span className="eyebrow">// Full Stack Portfolio</span>
            <h1 className="text-4xl md:text-6xl font-display font-semibold text-white leading-tight mt-2">
              Hi, I'm {about?.name?.split(" ")[0] || "Zeeshan"}
              <span className="text-accent-cyan">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-ink-muted font-display mt-4">
              {about?.title || "Full Stack Developer & AI/ML Specialist"}
            </p>
            <p className="text-ink-muted mt-5 max-w-2xl leading-relaxed text-base md:text-lg">
              {introSnippet}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              {about?.resumeLink && (
                <a href={about.resumeLink} target="_blank" rel="noreferrer" className="btn-primary">
                  <FaDownload /> Download Resume
                </a>
              )}
              <Link to="/projects" className="btn-outline">
                View Projects
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Me
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-8 text-xl text-ink-muted">
              {about?.socialLinks?.github && (
                <a
                  href={about.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent-cyan transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              )}
              {about?.socialLinks?.linkedin && (
                <a
                  href={about.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent-cyan transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              )}
              {publicEmail && (
                <a
                  href={`mailto:${publicEmail}`}
                  className="hover:text-accent-cyan transition-colors"
                  aria-label="Email"
                >
                  <FaEnvelope />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative mx-auto w-full max-w-[24rem] md:max-w-[30rem]"
          >
            <div className="absolute inset-0 bg-gradient-accent blur-3xl opacity-20 rounded-full" />
            <div className="relative rounded-[2rem] glass p-3 shadow-[0_28px_90px_rgba(8,15,30,0.42)] border-white/10 overflow-hidden">
              <div className="absolute inset-0 rounded-[1.6rem] bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
              <img
                src={profileImage}
                alt={about?.name || "Profile"}
                loading="eager"
                decoding="async"
                className="relative z-10 w-full aspect-[3/4] md:aspect-[4/5] object-cover object-[center_18%] md:object-[center_14%] rounded-[1.6rem] border border-white/10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 container-app">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </section>

      <section className="pb-20 container-app">
        <HomeSectionHeading
          eyebrow="About Preview"
          title="A short introduction"
          description={introSnippet}
          action={
            <Link to="/about" className="btn-outline">
              Read More
            </Link>
          }
        />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="card"
          >
            <h3 className="font-display font-semibold text-white text-xl">Who I am</h3>
            <p className="text-ink-muted mt-4 leading-relaxed whitespace-pre-line">{about?.summary || intro}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="card"
          >
            <h3 className="font-display font-semibold text-white text-xl">Featured skills</h3>
            <div className="flex flex-wrap gap-3 mt-5">
              {topSkills.map((skill, index) => (
                <SkillPill key={skill._id} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 container-app">
        <HomeSectionHeading
          eyebrow="Featured Projects"
          title="Latest work from the dashboard"
          description="These projects come directly from MongoDB, so anything you update in the admin panel appears here automatically."
          action={
            <Link to="/projects" className="btn-primary">
              View All Projects
            </Link>
          }
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>

      <section className="pb-20 container-app">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="glass rounded-3xl p-7 md:p-10 border-white/10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow">// CTA</span>
              <h2 className="section-title mt-2">Interested in working together?</h2>
              <p className="text-ink-muted mt-4 text-base md:text-lg leading-relaxed">
                Let's build something amazing. I’m available for full-stack work, polished UI builds, and product-focused engineering.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Contact Me
              </Link>
              {about?.resumeLink && (
                <a href={about.resumeLink} target="_blank" rel="noreferrer" className="btn-outline">
                  <FaDownload /> Download Resume
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;