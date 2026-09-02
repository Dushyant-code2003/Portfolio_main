import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../../data/profile";
import { useAppContext } from "../../context/AppContext";
import HeroScene from "../../scenes/HeroScene/HeroScene";
import "./Hero.css";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { bootComplete } = useAppContext();

  useEffect(() => {
    if (!bootComplete) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero__name .line-inner", {
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3,
      });
      gsap.from(".hero__role", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1,
        ease: "power2.out",
      });
      gsap.from(".hero__scroll-hint", {
        opacity: 0,
        duration: 0.6,
        delay: 1.4,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [bootComplete]);

  const [first, ...rest] = profile.name.split(" ");

  return (
    <section
      ref={sectionRef}
      id="intro"
      className={`hero section${bootComplete ? "" : " boot-pending"}`}
      aria-label="Introduction"
    >
      <HeroScene />
      <div className="hero__content">
        <p className="hero__chapter">CHAPTER 01 — THE FIRST ENCOUNTER</p>
        <h1 className="hero__name">
          <span>
            <span className="line-inner">{first}</span>
          </span>
          <span>
            <span className="line-inner">{rest.join(" ")}</span>
          </span>
        </h1>
        <p className="hero__role">
          SOFTWARE DEVELOPER · B.TECH CSE · BML MUNJAL UNIVERSITY
        </p>
      </div>
      <div className="hero__scroll-hint" aria-hidden>
        <span>SCROLL</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
