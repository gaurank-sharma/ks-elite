import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Gavel, Landmark, Phone, ShieldCheck } from "lucide-react";

const STATS = [
  { icon: Landmark, label: "24+ Years", sub: "of litigation practice" },
  { icon: Gavel, label: "Supreme Court", sub: "& High Courts of India" },
  { icon: ShieldCheck, label: "17 Practice", sub: "areas of expertise" },
];

const PHONE = "+91 98919 67200";
const PHONE_TEL = "+919891967200";

export default function Hero() {
  const eyebrowRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0)
        .fromTo(line1Ref.current, { yPercent: 120 }, { yPercent: 0, duration: 0.8, ease: "power3.out" }, 0.1)
        .fromTo(line2Ref.current, { yPercent: 120 }, { yPercent: 0, duration: 0.8, ease: "power3.out" }, 0.2)
        .fromTo(subRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.45)
        .fromTo(ctaRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.55)
        .fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          0.65
        );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32 px-6 overflow-hidden" style={{ background: "var(--color-navy)" }}>
      <div
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-gold) 20%, transparent), transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        <div ref={eyebrowRef} className="mb-6">
          <span className="seal" style={{ borderColor: "rgba(247,244,236,0.3)", color: "var(--color-gold-soft)" }}>
            Advocates &amp; Legal Consultants — New Delhi
          </span>
        </div>

        <div className="overflow-hidden">
          <h1
            className="font-display font-bold uppercase leading-[1.02] text-[clamp(2.4rem,8vw,5.6rem)]"
            style={{ color: "var(--color-ivory)" }}
          >
            <span ref={line1Ref} className="block">
              Justice. Integrity.
            </span>
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            className="font-display font-bold uppercase leading-[1.02] text-[clamp(2.4rem,8vw,5.6rem)]"
            style={{ color: "var(--color-gold)" }}
          >
            <span ref={line2Ref} className="block">
              Results.
            </span>
          </h1>
        </div>

        <p
          ref={subRef}
          className="mt-7 text-base sm:text-lg max-w-2xl mx-auto"
          style={{ color: "rgba(247,244,236,0.72)" }}
        >
          A premier litigation firm headquartered in Delhi, renowned for strategic legal insight
          and results before the Supreme Court, High Courts, and Tribunals of India.
        </p>

        <div ref={ctaRef} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="font-display font-semibold text-sm rounded-full px-8 py-4 w-full sm:w-auto text-center"
            style={{ background: "var(--color-gold)", color: "var(--color-navy)" }}
          >
            Book a Consultation
          </Link>
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center justify-center gap-2 font-display font-semibold text-sm rounded-full px-8 py-4 w-full sm:w-auto border"
            style={{ borderColor: "rgba(247,244,236,0.28)", color: "var(--color-ivory)" }}
          >
            <Phone size={16} strokeWidth={2.4} />
            {PHONE}
          </a>
        </div>

        <div ref={statsRef} className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {STATS.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="hover-pop flex items-center gap-3 rounded-2xl border px-5 py-4 text-left"
              style={{ borderColor: "rgba(247,244,236,0.14)", background: "rgba(247,244,236,0.04)" }}
            >
              <Icon size={22} style={{ color: "var(--color-gold)" }} strokeWidth={2} />
              <div className="leading-tight">
                <div className="font-display font-bold text-sm" style={{ color: "var(--color-ivory)" }}>
                  {label}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wide" style={{ color: "rgba(247,244,236,0.55)" }}>
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
