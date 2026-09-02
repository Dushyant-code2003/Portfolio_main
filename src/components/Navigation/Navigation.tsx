import { useEffect, useState } from "react";
import { navSections } from "../../data/journey";
import { useAppContext } from "../../context/AppContext";
import "./Navigation.css";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { bootComplete } = useAppContext();

  useEffect(() => {
    if (!bootComplete) return;

    const sections = navSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const section = navSections.find((s) => s.id === id);
            if (section) setActiveIndex(section.index);
          }
        });
      },
      { threshold: 0.35, rootMargin: "-10% 0px -10% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [bootComplete]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  if (!bootComplete) return null;

  const current = String(activeIndex).padStart(2, "0");
  const total = String(navSections.length - 1).padStart(2, "0");

  return (
    <nav className="radial-nav" aria-label="Chapter navigation">
      <button
        className={`radial-nav__trigger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="radial-nav-menu"
      >
        {current} / {total}
      </button>
      <div
        id="radial-nav-menu"
        className={`radial-nav__menu ${open ? "open" : ""}`}
        role="menu"
      >
        {navSections.map((section) => (
          <button
            key={section.id}
            role="menuitem"
            className={`radial-nav__item ${section.index === activeIndex ? "active" : ""}`}
            onClick={() => scrollTo(section.id)}
          >
            <span className="radial-nav__item-num">
              {String(section.index).padStart(2, "0")}
            </span>
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
