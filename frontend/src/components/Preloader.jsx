import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);
  const wordRef = useRef(null);
  const tlRef = useRef(null);
  const reducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion.current) {
      onDone?.();
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        document.body.style.overflow = prevOverflow;
        onDone?.();
      },
    });
    tlRef.current = tl;

    tl.fromTo(
      logoRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.85, ease: "back.out(1.6)" }
    )
      .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .fromTo(wordRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
      .to({}, { duration: 0.6 })
      .to(rootRef.current, { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" })
      .to(logoRef.current, { scale: 1.06, duration: 0.7, ease: "power2.inOut" }, "<");

    return () => {
      document.body.style.overflow = prevOverflow;
      tl.kill();
    };
  }, [onDone]);

  if (reducedMotion.current) return null;

  return (
    <div
      ref={rootRef}
      onClick={() => tlRef.current?.progress(1)}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center cursor-pointer"
      style={{ background: "var(--color-ivory)" }}
      role="status"
      aria-label="K.S. Elite Attorneys"
    >
      <img
        ref={logoRef}
        src="/images/logo.png"
        alt="K.S. Elite Attorneys"
        width={168}
        height={168}
        className="object-contain"
      />

      <div ref={lineRef} className="w-10 h-px mt-7 origin-center" style={{ background: "var(--color-gold)" }} />

      <p
        ref={wordRef}
        className="font-mono text-[10px] tracking-[0.35em] uppercase mt-4"
        style={{ color: "var(--color-navy)" }}
      >
        K.S. Elite Attorneys
      </p>
    </div>
  );
}
