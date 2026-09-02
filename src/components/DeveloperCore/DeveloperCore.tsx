import { useState } from "react";
import { CoreCanvas, NODE_INFO } from "../../scenes/CoreScene/CoreScene";
import { coreNodes, type CoreNodeId } from "../../data/skills";
import { useAppContext } from "../../context/AppContext";
import "./DeveloperCore.css";

export default function DeveloperCore() {
  const [activeNode, setActiveNode] = useState<CoreNodeId>("code");
  const { setMode } = useAppContext();
  const info = NODE_INFO[activeNode];

  return (
    <section id="core" className="developer-core section" aria-label="Developer Core">
      <p className="section-label">CHAPTER 04 — THE DEVELOPER CORE</p>
      <h2 className="section-title" style={{ marginBottom: "2rem" }}>
        Core<br />System
      </h2>

      <div className="developer-core__layout">
        <div style={{ position: "relative" }}>
          <CoreCanvas activeNode={activeNode} />
        </div>

        <div className="developer-core__info">
          <p className="developer-core__node-label">NODE SELECTED</p>
          <h3 className="developer-core__node-title">{info.title}</h3>
          <p className="developer-core__node-desc">{info.description}</p>
          <div className="developer-core__tags">
            {info.tags.map((tag) => (
              <span
                key={tag}
                className="developer-core__tag"
                onMouseEnter={() => setMode("explore")}
                onMouseLeave={() => setMode("default")}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="developer-core__nodes-list">
            {coreNodes.map((n) => (
              <button
                key={n.id}
                className={`developer-core__node-btn ${activeNode === n.id ? "active" : ""}`}
                onClick={() => setActiveNode(n.id)}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
