import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import TechBadge from "./TechBadge";

const ProjectModal = ({ project, onClose }) => {
  const featuredImage = project?.featuredImage?.url?.trim();
  const galleryImages = project?.images?.filter((img) => img?.url?.trim()) || [];

  return (
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
            className="glass relative rounded-2xl w-full max-w-6xl my-8 p-4 md:p-6 lg:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 md:top-5 md:right-5 h-11 w-11 rounded-full grid place-items-center bg-black/55 border border-white/10 text-white hover:bg-black/75 hover:border-white/20 transition-colors shadow-lg z-10"
              aria-label="Close project details"
            >
              <HiX className="text-xl" />
            </button>

            <div className="flex items-start justify-between gap-4 mb-4 md:mb-6 pr-14">
              <div>
                <span className="eyebrow">// {project.category}</span>
                <h2 className="font-display font-semibold text-2xl md:text-3xl text-white mt-1">
                  {project.title}
                </h2>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
              <div className="glass rounded-2xl overflow-hidden flex flex-col min-h-0">
                <div className="bg-black/20">
                  {featuredImage ? (
                    <img
                      src={featuredImage}
                      alt={project.title}
                      className="w-full aspect-[4/3] lg:aspect-[5/4] object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] lg:aspect-[5/4] grid place-items-center bg-base-surface text-ink-muted text-sm">
                      No featured image available
                    </div>
                  )}
                </div>

                <div className="p-4 md:p-5 border-t border-white/10">
                  <p className="text-sm font-medium text-white mb-3">Gallery</p>
                  {galleryImages.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {galleryImages.slice(0, 6).map((img, index) => (
                        <img
                          key={img.publicId || `${img.url}-${index}`}
                          src={img.url}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full aspect-video object-cover rounded-lg bg-black/20"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-ink-muted">No extra screenshots uploaded.</p>
                  )}
                </div>
              </div>

              <div className="glass rounded-2xl p-5 md:p-6 lg:p-7 flex flex-col gap-5 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div>
                  <p className="text-sm text-ink-muted leading-relaxed whitespace-pre-line">
                    {project.shortDescription}
                  </p>
                  <p className="mt-4 text-ink-muted text-sm leading-relaxed whitespace-pre-line">
                    {project.fullDescription}
                  </p>
                </div>

                {project.features?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Features</h4>
                    <ul className="list-disc list-inside text-sm text-ink-muted space-y-1">
                      {project.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.challenges && (
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Challenges</h4>
                    <p className="text-sm text-ink-muted leading-relaxed whitespace-pre-line">
                      {project.challenges}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((t) => (
                      <TechBadge key={t} label={t} />
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
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
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
