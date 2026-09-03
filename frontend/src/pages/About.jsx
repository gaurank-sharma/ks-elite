import { GraduationCap, Landmark, Quote, Scale } from "lucide-react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import SplitReveal from "../components/SplitReveal";

const CREDENTIALS = [
  { icon: Landmark, text: "25+ years before the Supreme Court, High Courts, District Courts & Tribunals" },
  { icon: Scale, text: "Head — Dispute Resolution, Criminal Litigation Specialist" },
  { icon: GraduationCap, text: "Law graduate, Lucknow University" },
];

const VALUES = [
  {
    title: "Client-Centric",
    desc: "Every matter is handled with meticulous preparation and a results-driven mindset, built around the client's actual goals.",
  },
  {
    title: "Precision Over Volume",
    desc: "We take on the matters we can give real attention to — not the most cases, the best-argued ones.",
  },
  {
    title: "Protect, Then Win",
    desc: "The goal is not merely to win but to protect rights and resolve disputes efficiently along the way.",
  },
];

export default function About() {
  return (
    <Layout>
      <PageHeader
        kicker="Our Story"
        title="About K.S. Elite Attorneys"
        note="A premier litigation firm headquartered in Delhi, built on 25+ years of courtroom experience and a client-first philosophy."
        image="/images/practice-areas/business-law.jpg"
      />

      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
          <Reveal className="relative mx-auto lg:mx-0 w-64 sm:w-80">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border" style={{ borderColor: "var(--line)" }}>
              <img src="/images/founder.png" alt="Founder, K.S. Elite Attorneys" className="absolute inset-0 h-full w-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(160deg, rgba(6,10,19,0.1) 0%, rgba(6,10,19,0.5) 100%)" }}
              />
            </div>
            <div
              className="absolute -bottom-6 -right-6 rounded-2xl border px-5 py-4 shadow-lg"
              style={{ background: "var(--color-navy)", borderColor: "var(--color-gold)" }}
            >
              <div className="font-display font-bold text-2xl" style={{ color: "var(--color-gold)" }}>
                25+
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--color-ivory)" }}>
                Years of Practice
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">
                The Founder
              </span>
              <h2 className="font-display font-bold uppercase leading-[1.02] text-[clamp(2rem,5vw,3.4rem)] mt-2">
                Mr. K.S. Sharma
              </h2>
              <p className="text-[var(--fg-muted)] mt-2 font-mono text-xs tracking-[0.15em] uppercase">
                Founder, K.S. Elite Attorneys
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--fg-muted)]">
                An advocate before the Supreme Court of India, multiple High Courts, District Courts,
                and Tribunals across Delhi, Haryana, and other jurisdictions — with a practice spanning
                criminal law, banking &amp; financial disputes, corporate and commercial law, arbitration,
                civil litigation, and matrimonial &amp; family law.
              </p>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--fg-muted)]">
                His leadership is collaborative, solution-oriented, and client-focused — ensuring that
                every case is handled with meticulous preparation, legal precision, and a results-driven
                mindset.
              </p>
            </Reveal>

            <Reveal delay={0.14} className="mt-8 flex flex-col gap-4">
              {CREDENTIALS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
                  >
                    <Icon size={17} style={{ color: "var(--accent)" }} />
                  </div>
                  <p className="text-sm sm:text-base pt-1.5">{text}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.2}>
              <blockquote
                className="hover-pop mt-8 rounded-2xl border p-6 sm:p-7 relative"
                style={{ borderColor: "var(--line)", background: "var(--card)" }}
              >
                <Quote size={28} style={{ color: "var(--accent)" }} className="mb-3 opacity-60" />
                <p className="font-display text-lg sm:text-xl italic leading-snug">
                  &ldquo;My goal is not merely to win cases but to protect rights, resolve disputes
                  efficiently, and support my clients through their most challenging legal battles.&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 px-6 border-t" style={{ borderColor: "var(--line)", background: "var(--bg-alt)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-2xl mb-14 text-center mx-auto">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">
              How We Work
            </span>
            <SplitReveal
              text="What we stand for."
              className="font-display font-bold uppercase leading-[1.02] text-[clamp(2rem,5vw,3.4rem)] mt-2"
            />
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6">
            {VALUES.map(({ title, desc }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div
                  className="hover-pop h-full rounded-2xl border p-7"
                  style={{ borderColor: "var(--line)", background: "var(--card)" }}
                >
                  <div className="font-mono text-xs mb-3" style={{ color: "var(--accent)" }}>
                    0{i + 1}
                  </div>
                  <h3 className="font-display font-bold text-lg">{title}</h3>
                  <p className="text-[var(--fg-muted)] text-sm mt-2 leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
