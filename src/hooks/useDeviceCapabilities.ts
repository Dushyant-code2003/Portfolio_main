import { useEffect, useState } from "react";
import { getDeviceTier, isTouchDevice, prefersReducedMotion } from "../utils/device";

export function useDeviceCapabilities() {
  const [caps, setCaps] = useState({
    isTouch: false,
    reducedMotion: false,
    tier: "medium" as "low" | "medium" | "high",
    isMobile: false,
  });

  useEffect(() => {
    const update = () => {
      setCaps({
        isTouch: isTouchDevice(),
        reducedMotion: prefersReducedMotion(),
        tier: getDeviceTier(),
        isMobile: window.innerWidth < 768,
      });
    };
    update();
    window.addEventListener("resize", update);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, []);

  return caps;
}
