'use client';

import React from "react";

const ResumeButton = () => {
  const handleDownload = () => {
    const resumeUrl = "/Manish_Patil_Resume.pdf";
//  const resumeUrl = "/Manish_Kakulde_Resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Manish_Patil_Resume.pdf";
//  link.download = "Manish_Kakulde_Resume.pdf";  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-max">
      <button
        onClick={handleDownload}
        className="group relative text-[15px] font-semibold rounded-[12px] border-0"
      >
        {/* White front Resume section */}
        <div className="flex items-center justify-between gap-2 min-h-[40px] px-3 py-2 rounded-[12px] bg-white border border-[#e8e8e82d] z-10 relative transition-all duration-[500ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:shadow-[rgba(0,0,0,0.25)_0px_54px_55px,rgba(0,0,0,0.12)_0px_-12px_30px,rgba(0,0,0,0.12)_0px_4px_6px,rgba(0,0,0,0.17)_0px_12px_13px,rgba(0,0,0,0.09)_0px_-3px_5px]">
          <svg
            viewBox="0 0 24 24"
            width={20}
            height={20}
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1={16} y1={13} x2={8} y2={13} />
            <line x1={16} y1={17} x2={8} y2={17} />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Resume
        </div>

        {/* Green sliding background with download icon */}
        <div className="absolute inset-0 flex items-center justify-center max-w-[80%] mx-auto rounded-b-[15px] z-0 transition-all duration-[500ms] ease-[cubic-bezier(0.77,0,0.175,1)] bg-[#01e056] border border-[#01e0572d] translate-y-0 group-hover:translate-y-[90%]">
          <svg
            viewBox="0 0 24 24"
            width={24}
            height={24}
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-docs"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1={12} y1={15} x2={12} y2={3} />
          </svg>
        </div>
      </button>

      {/* Custom animation for the icon */}
      <style jsx>{`
        @keyframes docs {
          0% {
            transform: translateY(0%);
          }
          50% {
            transform: translateY(-15%);
          }
          100% {
            transform: translateY(0%);
          }
        }
        .animate-docs {
          animation: docs 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default ResumeButton;
