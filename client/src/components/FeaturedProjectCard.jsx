import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import TechBadge from "./TechBadge";

const FeaturedProjectCard = ({ project, onOpen }) => {
  const imageUrl = project?.featuredImage?.url?.trim();

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className={`card group flex flex-col overflow-hidden ${onOpen ? "cursor-pointer" : ""}`}
      onClick={onOpen ? () => onOpen(project) : undefined}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen(project);
              }
            }
          : undefined
      }
    >
      <div className="rounded-xl overflow-hidden bg-black/20 aspect-video">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full grid place-items-center bg-base-surface text-ink-muted text-sm">
            No preview image
          </div>
        )}
      </div>

      <div className="pt-5 flex flex-col flex-1">
        <span className="eyebrow">// {project.category}</span>
        <h3 className="font-display font-semibold text-xl text-white mt-2">{project.title}</h3>
        <p className="text-sm text-ink-muted mt-3 leading-relaxed line-clamp-3">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack?.slice(0, 4).map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-white/10">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-ink-muted hover:text-accent-cyan text-sm inline-flex items-center gap-1.5"
            >
              <FaGithub /> GitHub
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
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default FeaturedProjectCard;