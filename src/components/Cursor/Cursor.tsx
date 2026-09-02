import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAppContext } from "../../context/AppContext";
import { useDeviceCapabilities } from "../../hooks/useDeviceCapabilities";
import "./Cursor.css";

const MODE_LABELS: Record<string, string> = {
  view: "VIEW",
  explore: "EXPLORE",
  secret: "???",
  connect: "SEND",
};

export default function CustomCursor() {
  const { mode, label } = useAppContext();
  const { isTouch } = useDeviceCapabilities();
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isTouch]);

  if (isTouch) return null;

  const displayLabel = label || MODE_LABELS[mode] || "";

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor mode-${mode}`}
      aria-hidden
    >
      <div className="custom-cursor__ring" />
      <div className="custom-cursor__dot" />
      {displayLabel && (
        <span className="custom-cursor__label">{displayLabel}</span>
      )}
    </div>
  );
}
