import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
    <span className="eyebrow">// 404</span>
    <h1 className="font-display text-7xl font-semibold text-white mt-2">Page not found</h1>
    <p className="text-ink-muted mt-4 max-w-md">
      The page you're looking for doesn't exist or was moved.
    </p>
    <Link to="/" className="btn-primary mt-8">
      Back to Home
    </Link>
  </section>
);

export default NotFound;
