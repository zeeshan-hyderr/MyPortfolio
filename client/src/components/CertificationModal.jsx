import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { FaExternalLinkAlt, FaFilePdf } from "react-icons/fa";
import TechBadge from "./TechBadge";
import { formatCertificationDate, isPdfFile } from "../utils/certifications";

const CertificationModal = ({ certification, onClose }) => {
  const previewUrl = certification?.certificateFile?.url?.trim();
  const pdfPreview = isPdfFile(certification);

  return (
    <AnimatePresence>
      {certification && (
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
              aria-label="Close certification details"
            >
              <HiX className="text-xl" />
            </button>

            <div className="flex items-start justify-between gap-4 mb-4 md:mb-6 pr-14">
              <div>
                <span className="eyebrow">// {certification.category}</span>
                <h2 className="font-display font-semibold text-2xl md:text-3xl text-white mt-1">
                  {certification.title}
                </h2>
                <p className="text-ink-muted mt-2">{certification.organization}</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
              <div className="glass rounded-2xl overflow-hidden flex flex-col min-h-0">
                <div className="bg-black/20">
                  {previewUrl ? (
                    pdfPreview ? (
                      <iframe
                        src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        title={certification.title}
                        className="w-full aspect-[4/3] lg:aspect-[5/4] border-0"
                      />
                    ) : (
                      <img
                        src={previewUrl}
                        alt={certification.title}
                        className="w-full aspect-[4/3] lg:aspect-[5/4] object-cover object-center"
                      />
                    )
                  ) : (
                    <div className="w-full aspect-[4/3] lg:aspect-[5/4] grid place-items-center bg-base-surface text-ink-muted text-sm">
                      No certificate preview available
                    </div>
                  )}
                </div>

                <div className="p-4 md:p-5 border-t border-white/10">
                  <p className="text-sm font-medium text-white mb-3">Uploaded certificate</p>
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline w-fit"
                  >
                    {pdfPreview ? <FaFilePdf /> : <FaExternalLinkAlt />} Open Certificate
                  </a>
                </div>
              </div>

              <div className="glass rounded-2xl p-5 md:p-6 lg:p-7 flex flex-col gap-5 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div>
                  <p className="text-sm text-ink-muted leading-relaxed whitespace-pre-line">
                    {certification.shortDescription}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="card p-4">
                    <p className="text-ink-muted">Issue Date</p>
                    <p className="text-white font-medium mt-1">{formatCertificationDate(certification.issueDate)}</p>
                  </div>
                  <div className="card p-4">
                    <p className="text-ink-muted">Expiry Date</p>
                    <p className="text-white font-medium mt-1">
                      {certification.expiryDate ? formatCertificationDate(certification.expiryDate) : "No expiry"}
                    </p>
                  </div>
                  <div className="card p-4">
                    <p className="text-ink-muted">Credential ID</p>
                    <p className="text-white font-medium mt-1">
                      {certification.credentialId || "Not provided"}
                    </p>
                  </div>
                  <div className="card p-4">
                    <p className="text-ink-muted">Verification</p>
                    <p className="text-white font-medium mt-1">
                      {certification.verificationLink ? "Available" : "Not provided"}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Skills / Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {certification.skills?.map((skill) => (
                      <TechBadge key={skill} label={skill} />
                    ))}
                  </div>
                </div>

                {certification.verificationLink && (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a href={certification.verificationLink} target="_blank" rel="noreferrer" className="btn-primary">
                      <FaExternalLinkAlt /> Verify Certificate
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificationModal;