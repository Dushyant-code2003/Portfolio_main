import { techNodes } from "../../data/skills";
import "./TechMarquee.css";

export default function TechMarquee() {
  const labels = [...techNodes.map((t) => t.label), ...techNodes.map((t) => t.label)];

  return (
    <div className="tech-marquee" aria-hidden>
      <div className="tech-marquee__track">
        {labels.map((label, index) => (
          <span key={`${label}-${index}`} className="tech-marquee__item">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
