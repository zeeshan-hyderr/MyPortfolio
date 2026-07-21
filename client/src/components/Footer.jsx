import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { resolvePublicEmail } from "../utils/publicContact";

const Footer = ({ contact }) => {
  const email = resolvePublicEmail(contact?.email);

  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="container-app py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-muted">
          © {new Date().getFullYear()} Zeeshan Hyder. Built with React & Node.js.
        </p>
        <div className="flex items-center gap-5 text-xl text-ink-muted">
          {contact?.github && (
            <a href={contact.github} target="_blank" rel="noreferrer" className="hover:text-accent-cyan" aria-label="GitHub">
              <FaGithub />
            </a>
          )}
          {contact?.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent-cyan" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="hover:text-accent-cyan" aria-label="Email">
              <FaEnvelope />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
