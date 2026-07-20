import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import Loader from "../components/Loader";

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    api.get("/about").then((res) => setAbout(res.data));
  }, []);

  if (!about) return <Loader full />;

  return (
    <section className="pt-32 pb-20 container-app">
      <span className="eyebrow">// About</span>
      <h1 className="section-title mt-2">Professional Summary</h1>
      <p className="text-ink-muted mt-4 max-w-2xl leading-relaxed">{about.summary}</p>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card"
        >
          <h2 className="font-display font-semibold text-white text-xl mb-4">Education</h2>
          <div className="space-y-4">
            {about.education?.map((e, i) => (
              <div key={i} className="border-l-2 border-accent-cyan/40 pl-4">
                <p className="font-medium text-white">{e.degree}</p>
                <p className="text-sm text-ink-muted">{e.institution}</p>
                <p className="text-xs text-accent-cyan font-mono">{e.duration}</p>
                {e.details && <p className="text-sm text-ink-muted mt-1">{e.details}</p>}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h2 className="font-display font-semibold text-white text-xl mb-4">Experience</h2>
          <div className="space-y-4">
            {about.experience?.map((e, i) => (
              <div key={i} className="border-l-2 border-accent-violet/40 pl-4">
                <p className="font-medium text-white">
                  {e.role} · {e.company}
                </p>
                <p className="text-xs text-accent-violet font-mono">{e.duration}</p>
                {e.details && <p className="text-sm text-ink-muted mt-1">{e.details}</p>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {about.achievements?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card mt-6"
        >
          <h2 className="font-display font-semibold text-white text-xl mb-4">Achievements</h2>
          <ul className="space-y-2">
            {about.achievements.map((a, i) => (
              <li key={i} className="text-sm text-ink-muted flex items-start gap-2">
                <span className="text-accent-cyan mt-1">▹</span> {a}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </section>
  );
};

export default About;
