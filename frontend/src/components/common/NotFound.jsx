import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gallery-bg text-gallery-dark dark:bg-gallery-darkBg dark:text-gallery-darkText">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-xs font-mono uppercase tracking-widest text-gallery-accent font-semibold">
          Catalog Error // 404
        </div>
        <h1 className="editorial-title text-4xl sm:text-5xl font-bold tracking-tight text-gallery-dark dark:text-gallery-darkText">
          Exhibit Not Found
        </h1>
        <p className="text-sm text-gallery-muted dark:text-gallery-darkMuted leading-relaxed">
          The requested monograph, case study, or document is not cataloged in the current exhibition archive.
        </p>
        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gallery-dark text-white dark:bg-white dark:text-gallery-dark text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Exhibition</span>
          </a>
        </div>
      </div>
    </div>
  );
};
