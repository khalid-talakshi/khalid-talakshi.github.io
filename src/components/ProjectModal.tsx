import { useState } from "react";
import ProjectLinkIcon from "./ProjectLinkIcon";

interface ProjectLink {
  type: "github" | "download" | "web" | "other";
  href: string;
  label?: string;
}

interface ProjectModalProps {
  title: string;
  description: string;
  type?: "app" | "paper" | "design" | "tool" | "other";
  technologies?: string[];
  tags?: string[];
  links?: ProjectLink[];
  children?: React.ReactNode;
}

// Map project types to icons and labels
const getProjectTypeIcon = (
  type: string,
): { icon: React.ReactNode; label: string } => {
  const typeMap: Record<string, { icon: React.ReactNode; label: string }> = {
    app: {
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      label: "App",
    },
    paper: {
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      label: "Paper",
    },
    design: {
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
      label: "Design",
    },
    tool: {
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
      label: "Tool",
    },
    other: {
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      label: "Project",
    },
  };

  return typeMap[type] || typeMap.other;
};

export default function ProjectModal({
  title,
  description,
  type,
  technologies = [],
  tags = [],
  links = [],
  children,
}: ProjectModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger - wrap children with click handler */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(true);
          }
        }}
        aria-label={`Open ${title} project details`}
      >
        {children}
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop Modal */}
      <div
        className={`hidden md:flex fixed inset-0 z-50 items-center justify-center transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Desktop Modal Content */}
        <div
          className={`w-full max-w-2xl rounded-2xl border border-theme-border/30 bg-gradient-to-br from-theme-background to-theme-secondary/5 backdrop-blur-sm shadow-2xl max-h-[90vh] overflow-y-auto relative ${
            isOpen ? "scale-100" : "scale-95"
          } transition-transform duration-300`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Content */}
          <div className="p-8">
            {/* Close Button - Positioned in header area */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-2 rounded-lg text-theme-text/60 hover:text-theme-foreground hover:bg-theme-accent/10 transition-all duration-200 z-10"
              aria-label="Close modal"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex items-start gap-4 mb-6 pr-10">
              {type && (
                <div
                  className="flex items-center justify-center h-12 w-12 rounded-lg bg-theme-primary/20 text-theme-primary flex-shrink-0 mt-1"
                  title={getProjectTypeIcon(type).label}
                >
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {getProjectTypeIcon(type).icon.props.children}
                  </svg>
                </div>
              )}
              <h2 className="text-3xl font-bold text-theme-accent flex-1">
                {title}
              </h2>
            </div>

            <p className="text-lg text-theme-text/80 mb-6 leading-relaxed whitespace-pre-wrap">
              {description}
            </p>

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-theme-text/60 uppercase tracking-wide mb-3">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-3 py-1 rounded-full bg-theme-primary/20 text-sm font-medium text-theme-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-theme-text/60 uppercase tracking-wide mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 rounded-lg bg-theme-accent/20 text-sm font-medium text-theme-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {links.length > 0 && (
              <div className="mt-8 pt-6 border-t border-theme-border/20">
                <h3 className="text-sm font-semibold text-theme-text/60 uppercase tracking-wide mb-4">
                  Links
                </h3>
                <div className="flex flex-wrap gap-3">
                  {links.map((link, idx) => (
                    <ProjectLinkIcon
                      key={idx}
                      type={link.type}
                      href={link.href}
                      label={link.label}
                      className="h-6 w-6"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 w-full bg-gradient-to-br from-theme-background to-theme-secondary/5 rounded-t-3xl border border-theme-border/30 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } h-[80vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="h-1 w-12 rounded-full bg-theme-text/20" />
        </div>

        {/* Content */}
        <div className="p-6 pb-12">
          {/* Close Button - Positioned in header area */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-lg text-theme-text/60 hover:text-theme-foreground hover:bg-theme-accent/10 transition-all duration-200 z-10"
            aria-label="Close bottom sheet"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex items-start gap-3 mb-4 pr-10">
            {type && (
              <div
                className="flex items-center justify-center h-10 w-10 rounded-lg bg-theme-primary/20 text-theme-primary flex-shrink-0 mt-0.5"
                title={getProjectTypeIcon(type).label}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {getProjectTypeIcon(type).icon.props.children}
                </svg>
              </div>
            )}
            <h2 className="text-2xl font-bold text-theme-accent flex-1">
              {title}
            </h2>
          </div>

          <p className="text-base text-theme-text/80 mb-6 leading-relaxed whitespace-pre-wrap">
            {description}
          </p>

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-theme-text/60 uppercase tracking-wide mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-block px-2 py-1 rounded-full bg-theme-primary/20 text-xs font-medium text-theme-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-theme-text/60 uppercase tracking-wide mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 rounded-lg bg-theme-accent/20 text-xs font-medium text-theme-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {links.length > 0 && (
            <div className="mt-8 pt-6 border-t border-theme-border/20">
              <h3 className="text-xs font-semibold text-theme-text/60 uppercase tracking-wide mb-4">
                Links
              </h3>
              <div className="flex flex-wrap gap-3">
                {links.map((link, idx) => (
                  <ProjectLinkIcon
                    key={idx}
                    type={link.type}
                    href={link.href}
                    label={link.label}
                    className="h-6 w-6"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
