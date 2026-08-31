import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SplitReveal({
  text,
  className = "",
  style,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.05,
  start = "top 85%",
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll(".sr-word-inner");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.85,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em]">
          <span className="sr-word-inner inline-block will-change-transform">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
