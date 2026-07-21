import React from "react";
import { motion } from "framer-motion";

const SkillPill = ({ skill, index }) => (
  <motion.span
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.35, delay: index * 0.03 }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-ink hover:text-white hover:border-accent-cyan/40 hover:bg-white/8 transition-colors"
  >
    <span className="h-2 w-2 rounded-full bg-accent-cyan" />
    {skill.name}
  </motion.span>
);

export default SkillPill;