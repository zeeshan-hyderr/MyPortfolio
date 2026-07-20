import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import TechBadge from "./TechBadge";

const ProjectModal = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <motion.div
        className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className="glass rounded-2xl max-w-2xl w-full my-8 p-6 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="eyebrow">// {project.category}</span>
              <h2 className="font-display font-semibold text-2xl text-white mt-1">
                {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-ink-muted hover:text-white text-2xl shrink-0"
              aria-label="Close"
            >
              <HiX />
            </button>
          </div>

          <img
            src={project.featuredImage?.url}
            alt={project.title}
            className="w-full rounded-lg my-5 aspect-video object-cover"
          />

          {project.images?.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-5">
              {project.images.map((img) => (
                <img
                  key={img.publicId}
                  src={img.url}
                  alt=""
                  className="w-full aspect-video object-cover rounded-md"
                />
              ))}
            </div>
          )}

          <p className="text-ink-muted text-sm leading-relaxed whitespace-pre-line">
            {project.fullDescription}
          </p>

          {project.features?.length > 0 && (
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-white mb-2">Features</h4>
              <ul className="list-disc list-inside text-sm text-ink-muted space-y-1">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {project.challenges && (
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-white mb-2">Challenges</h4>
              <p className="text-sm text-ink-muted leading-relaxed">{project.challenges}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-5">
            {project.techStack?.map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>

          <div className="flex items-center gap-3 mt-6">
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-outline">
                <FaGithub /> View Code
              </a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="btn-primary">
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ProjectModal;
