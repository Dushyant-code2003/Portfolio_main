import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "../../animations/gsapSetup";
import { profile, identityWords } from "../../data/profile";
import "./About.css";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeWord, setActiveWord] = useState(-1);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      identityWords.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: `${15 + i * 8}% center`,
          end: `${23 + i * 8}% center`,
          onEnter: () => setActiveWord(i),
          onEnterBack: () => setActiveWord(i),
        });
      });

      ScrollTrigger.create({
        trigger: section,
        start: "75% center",
        onEnter: () => setShowIntro(true),
        onLeaveBack: () => setShowIntro(false),
      });

      gsap.from(".about__opener", {
        scrollTrigger: { trigger: section, start: "top 70%" },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about__tagline span", {
        scrollTrigger: { trigger: ".about__tagline", start: "top 85%" },
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.8,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const taglineParts = profile.tagline.split(" ");

  return (
    <section ref={sectionRef} id="about" className="about section" aria-label="About">
      <p className="section-label">CHAPTER 02 — THE HUMAN BEHIND THE CODE</p>
      <p className="about__opener">Behind every interface is a person.</p>

      <div className="about__words" aria-hidden>
        {identityWords.map((word, i) => (
          <div
            key={word}
            className={`about__word ${activeWord >= i ? "active" : ""}`}
          >
            {word === "PROBLEM SOLVER" ? (
              <>
                PROBLEM <span className="accent">SOLVER</span>
              </>
            ) : (
              word
            )}
          </div>
        ))}
      </div>

      <p className={`about__intro ${showIntro ? "visible" : ""}`}>
        {profile.intro}
      </p>

      <div className="about__tagline" aria-label={profile.tagline}>
        {taglineParts.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </div>
    </section>
  );
}
