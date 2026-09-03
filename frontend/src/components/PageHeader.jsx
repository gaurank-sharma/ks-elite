import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitReveal from "./SplitReveal";

export default function PageHeader({ kicker, title, note, image }) {
  const eyebrowRef = useRef(null);
  const noteRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.15 })
        .fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0)
        .fromTo(noteRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.45);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32 px-6 overflow-hidden" style={{ background: "var(--color-navy)" }}>
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(6,10,19,0.90) 0%, rgba(6,10,19,0.84) 45%, rgba(6,10,19,0.96) 100%)",
            }}
          />
        </div>
      )}
      <div
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-gold) 20%, transparent), transparent 70%)" }}
      />
      <div className="relative max-w-5xl mx-auto text-center">
        <div ref={eyebrowRef} className="mb-6">
          <span className="seal" style={{ borderColor: "rgba(247,244,236,0.3)", color: "var(--color-gold-soft)" }}>
            {kicker}
          </span>
        </div>
        <SplitReveal
          text={title}
          className="font-display font-bold uppercase leading-[1.02] text-[clamp(2.4rem,8vw,5.6rem)]"
          style={{ color: "var(--color-ivory)" }}
          delay={0.25}
        />
        {note && (
          <p ref={noteRef} className="mt-7 text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgba(247,244,236,0.72)" }}>
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
