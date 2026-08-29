import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };
    window.addEventListener("mousemove", move);

    const onEnter = () => gsap.to(ring, { width: 54, height: 54, borderColor: "var(--accent)", duration: 0.25 });
    const onLeave = () => gsap.to(ring, { width: 34, height: 34, borderColor: "color-mix(in srgb, var(--fg) 55%, transparent)", duration: 0.25 });

    // Delegated so it keeps working as React Router swaps page content in and out.
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor="link"]')) onEnter();
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor="link"]')) onLeave();
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}
