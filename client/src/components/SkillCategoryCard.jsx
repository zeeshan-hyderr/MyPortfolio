import React from "react";
import { motion } from "framer-motion";

const SkillCategoryCard = ({ category, skills }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5 }}
    className="card"
  >
    <span className="eyebrow">// {category}</span>
    <div className="flex flex-wrap gap-2 mt-4">
      {skills.map((s) => (
        <span
          key={s._id}
          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-ink"
        >
          {s.name}
        </span>
      ))}
    </div>
  </motion.div>
);

export default SkillCategoryCard;
