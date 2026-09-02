import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAppContext } from "../../context/AppContext";
import { prefersReducedMotion } from "../../utils/device";
import "./SystemBoot.css";

const BOOT_LINES = [
  "INITIALIZING...",
  "LOADING HUMAN.exe",
  "DEVELOPER DETECTED",
  "CALIBRATING INTERFACE...",
  "ENTERING WORLD",
];

export default function SystemBoot() {
  const { setBootComplete } = useAppContext();
  const [done, setDone] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [cursorActive, setCursorActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const delay = reduced ? 200 : 700;

    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setCursorActive(true);
        setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: reduced ? 0.3 : 0.9,
              ease: "power2.inOut",
              onComplete: () => {
                setDone(true);
                setBootComplete(true);
              },
            });
          }
        }, reduced ? 400 : 1200);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [setBootComplete]);

  return (
    <div
      ref={containerRef}
      className={`system-boot ${done ? "done" : ""}`}
      aria-hidden={done}
      role="status"
      aria-live="polite"
    >
      <div
        className={`system-boot__cursor-field ${cursorActive ? "active" : ""}`}
        aria-hidden
      />
      <div className="system-boot__inner">
        <div className="system-boot__indicator" />
        {lines.map((line, index) => (
          <p key={index} className="system-boot__line visible">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
