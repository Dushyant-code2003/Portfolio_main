import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

export function killSectionTriggers(section: HTMLElement | null) {
  if (!section) return;
  ScrollTrigger.getAll().forEach((t) => {
    if (t.trigger === section) t.kill();
  });
}
