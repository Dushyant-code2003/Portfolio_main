import { useState, useCallback } from "react";
import { projects, type Project } from "../../data/projects";
import { useAppContext } from "../../context/AppContext";
import "./Lab.css";

const STORY_STEPS = [
  { key: "problem", label: "THE PROBLEM" },
  { key: "idea", label: "THE IDEA" },
  { key: "build", label: "THE BUILD" },
  { key: "challenge", label: "THE CHALLENGE" },
  { key: "solution", label: "THE SOLUTION" },
  { key: "result", label: "THE RESULT" },
  { key: "lesson", label: "THE LESSON" },
] as const;

function ProjectActions({
  project,
  className = "",
  onLiveClick,
}: {
  project: Project;
  className?: string;
  onLiveClick?: () => void;
}) {
  const handleLive = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    } else {
      onLiveClick?.();
    }
  };

  const handleSource = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.githubUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`lab__actions ${className}`}>
      <button
        type="button"
        className={`lab__action lab__action--live ${project.liveUrl ? "is-live" : "is-soon"}`}
        onClick={handleLive}
        aria-label={
          project.liveUrl
            ? `View live site for ${project.title}`
            : `Live site for ${project.title} coming soon`
        }
        title={project.liveUrl ? "View live site" : "Live deployment coming soon"}
      >
        {project.liveUrl ? "LIVE" : "LIVE · SOON"}
      </button>
      <button
        type="button"
        className="lab__action lab__action--code"
        onClick={handleSource}
        aria-label={`View source code for ${project.title}`}
      >
        CODE
      </button>
    </div>
  );
}

function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="lab__detail-overlay open"
      role="dialog"
      aria-modal
      aria-labelledby="lab-detail-title"
      onClick={onClose}
    >
      <button className="lab__close" onClick={onClose} aria-label="Close project detail">
        CLOSE ✕
      </button>
      <article className="lab__detail" onClick={(e) => e.stopPropagation()}>
        <ProjectActions project={project} className="lab__actions--detail" />
        <p className="lab__exp-number">EXPERIMENT {project.experimentNumber}</p>
        <h2 id="lab-detail-title" className="lab__exp-title">
          {project.title}
        </h2>
        <p className="lab__exp-subtitle">{project.subtitle}</p>
        <p className="lab__exp-status">STATUS: {project.status}</p>

        {STORY_STEPS.map(({ key, label }) => (
          <div key={key} className="lab__story-step">
            <p className="lab__story-label">{label}</p>
            <p className="lab__story-text">{project.story[key]}</p>
          </div>
        ))}

        <div className="lab__detail-links">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lab__detail-link lab__detail-link--live"
            >
              VIEW LIVE →
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lab__detail-link"
          >
            VIEW SOURCE →
          </a>
        </div>
      </article>
    </div>
  );
}

export default function Lab() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { setMode } = useAppContext();

  const handleHover = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mx",
      `${((e.clientX - rect.left) / rect.width) * 100}%`
    );
    e.currentTarget.style.setProperty(
      "--my",
      `${((e.clientY - rect.top) / rect.height) * 100}%`
    );
  }, []);

  return (
    <section id="lab" className="lab section" aria-label="Project laboratory">
      <p className="section-label">CHAPTER 05 — THE LAB</p>
      <h2 className="section-title">
        Developer<br />Laboratory
      </h2>

      <div className="lab__grid">
        {projects.map((project) => (
          <article
            key={project.id}
            className="lab__experiment"
            onMouseMove={handleHover}
            onMouseEnter={() => setMode("view")}
            onMouseLeave={() => setMode("default")}
            onClick={() => setSelected(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setSelected(project)}
            aria-label={`Open ${project.title} case study`}
          >
            <ProjectActions project={project} className="lab__actions--card" />
            <p className="lab__exp-number">EXPERIMENT {project.experimentNumber}</p>
            <h3 className="lab__exp-title">{project.title}</h3>
            <p className="lab__exp-subtitle">{project.subtitle}</p>
            <p className="lab__exp-status">STATUS: {project.status}</p>
            <div className="lab__metrics">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <p className="lab__metric-label">{m.label}</p>
                  <p className="lab__metric-value">{m.value}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <ProjectDetail project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
