import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useAppContext } from "../../context/AppContext";
import { useDeviceCapabilities } from "../../hooks/useDeviceCapabilities";
import "./SecretGame.css";

export default function SecretGame() {
  const orbRef = useRef<HTMLDivElement>(null);
  const clicks = useRef(0);
  const [visible, setVisible] = useState(false);
  const { unlockSecret, secretUnlocked, setMode, bootComplete } = useAppContext();
  const { isTouch } = useDeviceCapabilities();

  useEffect(() => {
    if (!bootComplete) return;
    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, [bootComplete]);

  useEffect(() => {
    if (!visible || isTouch) return;
    const orb = orbRef.current;
    if (!orb) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(orb, {
        x: e.clientX - 6,
        y: e.clientY - 6,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [visible, isTouch]);

  const handleClick = useCallback(() => {
    clicks.current += 1;
    if (clicks.current >= 5) {
      unlockSecret();
      clicks.current = 0;
      setVisible(false);
      setTimeout(() => setVisible(true), 10000);
    }
  }, [unlockSecret]);

  if (!bootComplete || !visible || isTouch) return null;

  return (
    <>
      <div
        ref={orbRef}
        className="secret-orb"
        onClick={handleClick}
        onMouseEnter={() => setMode("secret")}
        onMouseLeave={() => setMode("default")}
        aria-hidden
        role="presentation"
      />
      {secretUnlocked && (
        <div className="secret-banner">SECRET MODE UNLOCKED</div>
      )}
    </>
  );
}
