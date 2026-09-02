import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Pointer {
  x: number;
  y: number;
}

export function useSmoothPointer(strength = 0.12) {
  const target = useRef<Pointer>({ x: 0, y: 0 });
  const current = useRef<Pointer>({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      current.current.x = gsap.utils.interpolate(current.current.x, target.current.x, strength);
      current.current.y = gsap.utils.interpolate(current.current.y, target.current.y, strength);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [strength]);

  return current;
}

export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}
