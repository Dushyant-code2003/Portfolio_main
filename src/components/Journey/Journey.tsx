import { useEffect, useRef } from "react";
import gsap from "gsap";
import { journeyMilestones } from "../../data/journey";
import "./Journey.css";

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track || window.innerWidth < 768) return;

    const totalScroll = track.scrollWidth - window.innerWidth + 200;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: ".journey__pin",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      if (progress) {
        gsap.to(progress, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalScroll}`,
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="journey section" aria-label="Career journey">
      <p className="section-label">CHAPTER 03 — THE TIMELINE</p>
      <h2 className="section-title" style={{ marginBottom: "3rem" }}>
        Time<br />Tunnel
      </h2>

      <div className="journey__pin">
        <div ref={trackRef} className="journey__track">
          {journeyMilestones.map((m) => (
            <article key={m.id} className="journey__milestone">
              <p className="journey__number">
                {m.number} — {m.label}
              </p>
              <h3 className="journey__label">{m.label}</h3>
              <p className="journey__title">{m.title}</p>
              <p className="journey__desc">{m.description}</p>
              {m.year && <p className="journey__year">{m.year}</p>}
            </article>
          ))}
        </div>
        <div className="journey__progress">
          <div ref={progressRef} className="journey__progress-fill" />
        </div>
      </div>

      <div className="journey__mobile-list">
        {journeyMilestones.map((m) => (
          <article key={m.id} className="journey__milestone active">
            <p className="journey__number">
              {m.number} — {m.label}
            </p>
            <h3 className="journey__label">{m.label}</h3>
            <p className="journey__title">{m.title}</p>
            <p className="journey__desc">{m.description}</p>
            {m.year && <p className="journey__year">{m.year}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
