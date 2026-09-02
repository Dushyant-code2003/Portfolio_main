import { useState, useCallback } from "react";
import gsap from "gsap";
import "./CodeExperience.css";

const CODE_LINES = [
  { id: 0, content: <>const <span className="code-experience__prop">developer</span> = {"{"}</> },
  { id: 1, content: <>  <span className="code-experience__prop">curiosity</span>: <span className="code-experience__num">Infinity</span>,</> },
  { id: 2, content: <>  <span className="code-experience__prop">bugs</span>: <span className="code-experience__str">"inevitable"</span>,</> },
  { id: 3, content: <>  <span className="code-experience__prop">learning</span>: <span className="code-experience__str">"continuous"</span></> },
  { id: 4, content: "};" },
  { id: 5, content: <><span className="code-experience__fn">run</span>(developer);</> },
];

const OUTPUT_STATES = [
  { label: "CURIOSITY → ∞", emoji: "∞" },
  { label: "BUGS → DEBUGGING...", emoji: "🐛" },
  { label: "LEARNING → ACTIVE", emoji: "📡" },
  { label: "DEVELOPER → ONLINE", emoji: "◉" },
];

export default function CodeExperience() {
  const [running, setRunning] = useState(false);
  const [activeLine, setActiveLine] = useState(-1);
  const [outputIndex, setOutputIndex] = useState(-1);
  const [complete, setComplete] = useState(false);

  const runCode = useCallback(() => {
    if (running) return;
    setRunning(true);
    setComplete(false);
    setActiveLine(-1);
    setOutputIndex(-1);

    const tl = gsap.timeline({
      onComplete: () => {
        setComplete(true);
        setRunning(false);
      },
    });

    CODE_LINES.forEach((_, i) => {
      tl.call(() => setActiveLine(i), undefined, i * 0.35);
    });

    OUTPUT_STATES.forEach((_, i) => {
      tl.call(() => setOutputIndex(i), undefined, 2 + i * 0.6);
    });
  }, [running]);

  return (
    <section id="code" className="code-experience section" aria-label="Code is alive">
      <p className="section-label">CHAPTER 07 — CODE IS ALIVE</p>
      <h2 className="section-title">
        Code<br />Is Alive
      </h2>

      <div className="code-experience__layout">
        <div className="code-experience__editor" role="code" aria-label="Interactive code snippet">
          {CODE_LINES.map((line) => (
            <span
              key={line.id}
              className={`code-experience__line ${activeLine >= line.id ? "highlight" : ""} ${running && activeLine === line.id ? "run" : ""}`}
            >
              {line.content}
            </span>
          ))}
          <button
            className={`code-experience__run-btn ${running ? "running" : ""}`}
            onClick={runCode}
            disabled={running}
          >
            {running ? "EXECUTING..." : "RUN()"}
          </button>
        </div>

        <div className="code-experience__output" aria-live="polite">
          <div className={`code-experience__viz ${outputIndex >= 0 ? "active" : ""}`}>
            {outputIndex >= 0 ? OUTPUT_STATES[outputIndex].emoji : "—"}
          </div>
          <p className="code-experience__viz-label">
            {outputIndex >= 0
              ? OUTPUT_STATES[outputIndex].label
              : complete
                ? "EXECUTION COMPLETE"
                : "AWAITING INPUT..."}
          </p>
        </div>
      </div>
    </section>
  );
}
