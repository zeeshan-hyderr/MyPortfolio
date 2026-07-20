import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import TechBadge from "./TechBadge";

const ProjectCard = ({ project, onOpen }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5 }}
    className="card group cursor-pointer flex flex-col"
    onClick={() => onOpen(project)}
  >
    <div className="rounded-lg overflow-hidden mb-4 aspect-video bg-black/20">
      <img
        src={project.featuredImage?.url}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <span className="eyebrow">// {project.category}</span>
    <h3 className="font-display font-semibold text-lg text-white mt-1">{project.title}</h3>
    <p className="text-sm text-ink-muted mt-2 line-clamp-2">{project.shortDescription}</p>

    <div className="flex flex-wrap gap-1.5 mt-4">
      {project.techStack?.slice(0, 4).map((t) => (
        <TechBadge key={t} label={t} />
      ))}
    </div>

    <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/10">
      {project.githubLink && (
        <a
          href={project.githubLink}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-ink-muted hover:text-accent-cyan text-sm inline-flex items-center gap-1.5"
        >
          <FaGithub /> Code
        </a>
      )}
      {project.liveLink && (
        <a
          href={project.liveLink}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-ink-muted hover:text-accent-cyan text-sm inline-flex items-center gap-1.5"
        >
          <FaExternalLinkAlt /> Live
        </a>
      )}
    </div>
  </motion.div>
);

export default ProjectCard;
