import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import { fetchTestimonials } from "../lib/api";

const FALLBACK_QUOTES = [
  {
    name: "Jindal Fincap Limited",
    role: "Non-Banking Financial Institution",
    quote:
      "Sharma & Associates brought precision and clarity to complex financial disputes, protecting our interests at every stage.",
  },
  {
    name: "ENAR Weld",
    role: "Welding & Brazing Consumables",
    quote:
      "Meticulous preparation and a results-driven approach — exactly what we needed for our commercial matters.",
  },
];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export default function Testimonials() {
  const [quotes, setQuotes] = useState(FALLBACK_QUOTES);

  useEffect(() => {
    fetchTestimonials()
      .then((data) => {
        if (data.length) setQuotes(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 sm:py-32 px-6 border-t" style={{ borderColor: "var(--line)", background: "var(--bg-alt)" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-2xl mb-14 text-center mx-auto">
          <span className="seal" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
            Client Trust
          </span>
          <SplitReveal
            text="What clients say."
            className="font-display font-bold uppercase leading-[1.02] text-[clamp(2rem,5vw,3.4rem)] mt-4"
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {quotes.map((q, i) => (
            <Reveal key={q.id ?? q.name} delay={i * 0.1}>
              <div
                className="hover-pop relative h-full rounded-2xl border p-8 sm:p-10 overflow-hidden shadow-sm"
                style={{ borderColor: "var(--line)", background: "var(--card)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--accent)" }} />
                <Quote
                  size={120}
                  className="absolute -top-4 -right-4 opacity-[0.05] pointer-events-none"
                  style={{ color: "var(--fg)" }}
                  strokeWidth={1}
                />

                <div className="flex gap-0.5 mb-5 relative">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={15} style={{ color: "var(--accent)" }} fill="var(--accent)" strokeWidth={0} />
                  ))}
                </div>

                <p className="font-display text-xl sm:text-2xl leading-snug relative">&ldquo;{q.quote}&rdquo;</p>

                <div className="mt-8 flex items-center gap-4 relative">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold shrink-0"
                    style={{ background: "var(--color-navy)", color: "var(--color-gold)" }}
                  >
                    {initials(q.name)}
                  </div>
                  <div>
                    <div className="font-display font-bold">{q.name}</div>
                    <div className="font-mono text-[11px] uppercase tracking-wide text-[var(--fg-muted)] mt-0.5">
                      {q.role}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
