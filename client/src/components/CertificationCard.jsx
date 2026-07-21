import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaFilePdf, FaImage } from "react-icons/fa";
import { formatCertificationDate, isPdfFile } from "../utils/certifications";

const CertificationCard = ({ certification, onOpen }) => {
  const previewUrl = certification.certificateFile?.url?.trim();
  const pdfPreview = isPdfFile(certification);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="card group cursor-pointer flex flex-col overflow-hidden"
      onClick={() => onOpen(certification)}
    >
      <div className="rounded-xl overflow-hidden bg-black/20 aspect-[4/3] relative">
        {previewUrl ? (
          pdfPreview ? (
            <iframe
              src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              title={certification.title}
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <img
              src={previewUrl}
              alt={certification.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )
        ) : (
          <div className="w-full h-full grid place-items-center bg-base-surface text-ink-muted text-sm">
            No preview available
          </div>
        )}

        <div className="absolute top-3 left-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/55 text-xs text-white backdrop-blur-md border border-white/10">
          {pdfPreview ? <FaFilePdf /> : <FaImage />}
          {certification.category}
        </div>
      </div>

      <div className="pt-5 flex flex-col flex-1">
        <span className="eyebrow">// {certification.organization}</span>
        <h3 className="font-display font-semibold text-xl text-white mt-2">{certification.title}</h3>
        <p className="text-xs text-accent-cyan font-mono mt-2">Issued {formatCertificationDate(certification.issueDate)}</p>
        <p className="text-sm text-ink-muted mt-3 leading-relaxed line-clamp-3">{certification.shortDescription}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {certification.skills?.slice(0, 4).map((skill) => (
            <span key={skill} className="font-mono text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-ink-muted">
              {skill}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(certification);
            }}
            className="text-ink-muted hover:text-accent-cyan text-sm inline-flex items-center gap-1.5"
          >
            View Details
          </button>
          {certification.verificationLink && (
            <a
              href={certification.verificationLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-ink-muted hover:text-accent-cyan text-sm inline-flex items-center gap-1.5"
            >
              <FaExternalLinkAlt /> Verify Certificate
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default CertificationCard;