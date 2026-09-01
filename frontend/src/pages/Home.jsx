import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import Reveal from "../components/Reveal";
import SplitReveal from "../components/SplitReveal";
import { fetchTeam, resolveImageUrl } from "../lib/api";

const AREAS_PREVIEW = [
  { image: "/images/practice-areas/criminal-law.jpg", title: "Criminal Law", desc: "FIRs, bail, trials, appeals, cheque bounce, and special statutes." },
  { image: "/images/practice-areas/family-law.jpg", title: "Family Law", desc: "Matrimonial disputes, family trusts, settlement deeds, and wills." },
  { image: "/images/practice-areas/taxation-laws.jpg", title: "Taxation Laws", desc: "Direct and indirect taxes — corporate, transfer pricing, GST, customs." },
  { image: "/images/practice-areas/nclt-nclat.jpg", title: "NCLT / NCLAT", desc: "Quasi-judicial matters relating to Indian companies." },
  { image: "/images/practice-areas/debt-recovery-tribunal.jpg", title: "Debt Recovery Tribunal", desc: "Loan recovery representation for banks and financial institutions." },
  { image: "/images/practice-areas/adr.jpg", title: "Alternate Dispute Resolution", desc: "Resolving disputes efficiently outside traditional litigation." },
];

const FALLBACK_TEAM_PREVIEW = [
  { name: "Chirag Mittal", title: "Experienced Advocate", image: "/images/team/team_1.jpg" },
  { name: "Abhay Kumar", title: "Senior Associate Partner", image: "/images/team/team_3.jpg" },
  { name: "Amrit Rai Gupta", title: "Former MHA Officer", image: "/images/team/team_2.jpg" },
];

export default function Home() {
  const [teamPreview, setTeamPreview] = useState(FALLBACK_TEAM_PREVIEW);

  useEffect(() => {
    fetchTeam()
      .then((data) => {
        if (data.length) setTeamPreview(data.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <Hero />

      <section className="py-24 sm:py-32 px-6 border-t" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-14 items-center">
          <Reveal className="relative mx-auto lg:mx-0 w-56 sm:w-64">
            <div className="hover-pop relative aspect-square rounded-3xl overflow-hidden border" style={{ borderColor: "var(--line)" }}>
              <img src="/images/founder.png" alt="Founder, Sharma & Associates" className="absolute inset-0 h-full w-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(160deg, rgba(6,10,19,0.15) 0%, rgba(6,10,19,0.55) 100%)" }}
              />
            </div>
            <div
              className="absolute -bottom-5 -right-5 rounded-2xl border px-5 py-3"
              style={{ background: "var(--color-navy)", borderColor: "var(--color-gold)" }}
            >
              <div className="font-display font-bold text-2xl" style={{ color: "var(--color-gold)" }}>24+</div>
              <div className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "var(--color-ivory)" }}>Years of Practice</div>
            </div>
          </Reveal>

          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">About the Founder</span>
            <SplitReveal
              text="24+ years of courtroom precision."
              className="font-display font-bold uppercase leading-[1.02] text-[clamp(1.8rem,4.5vw,3rem)] mt-2"
            />
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--fg-muted)] max-w-xl">
              Founded by Mr. K.S. Sharma, an advocate before the Supreme Court of India, High Courts,
              District Courts, and Tribunals — built on a client-centric philosophy of protecting
              rights, not just winning cases.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-display font-semibold text-sm mt-6"
              style={{ color: "var(--accent)" }}
            >
              Meet the founder <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 px-6 border-t" style={{ borderColor: "var(--line)", background: "var(--bg-alt)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">What We Do</span>
              <SplitReveal
                text="17 areas of practice."
                className="font-display font-bold uppercase leading-[1.02] text-[clamp(1.8rem,4.5vw,3rem)] mt-2"
              />
            </div>
            <Link
              to="/practice-areas"
              className="hover-pop hidden sm:flex items-center gap-2 rounded-full border px-6 py-3 font-display font-semibold text-sm"
              style={{ borderColor: "var(--line)" }}
            >
              View all areas <ArrowRight size={16} />
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AREAS_PREVIEW.map(({ image, title, desc }, i) => (
              <Reveal key={title} delay={(i % 3) * 0.08}>
                <Link
                  to="/practice-areas"
                  className="hover-pop group relative block h-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-2xl"
                >
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ background: "linear-gradient(to top, rgba(6,10,19,0.96) 0%, rgba(6,10,19,0.6) 42%, rgba(6,10,19,0.12) 100%)" }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7">
                    <span className="self-start font-mono text-xs tracking-[0.3em]" style={{ color: "var(--color-gold-soft)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div
                        className="h-[2px] w-9 mb-4 transition-all duration-500 group-hover:w-14"
                        style={{ background: "var(--color-gold)" }}
                      />
                      <h3 className="font-display font-semibold text-2xl leading-[1.1]" style={{ color: "var(--color-ivory)" }}>
                        {title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(247,244,236,0.72)" }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Link
            to="/practice-areas"
            className="hover-pop sm:hidden mt-6 flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-display font-semibold text-sm"
            style={{ borderColor: "var(--line)" }}
          >
            View all 17 areas <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-24 sm:py-32 px-6 border-t" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]">Our Team</span>
              <SplitReveal
                text="The people behind the practice."
                className="font-display font-bold uppercase leading-[1.02] text-[clamp(1.8rem,4.5vw,3rem)] mt-2"
              />
            </div>
            <Link
              to="/attorneys"
              className="hover-pop hidden sm:flex items-center gap-2 rounded-full border px-6 py-3 font-display font-semibold text-sm"
              style={{ borderColor: "var(--line)" }}
            >
              Meet the team <ArrowRight size={16} />
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-5">
            {teamPreview.map((p, i) => (
              <Reveal key={p.id ?? p.name} delay={i * 0.08}>
                <Link
                  to="/attorneys"
                  className="hover-pop group relative block h-full aspect-[3/4] overflow-hidden rounded-2xl"
                >
                  <img
                    src={resolveImageUrl(p.image)}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(6,10,19,0.94) 0%, rgba(6,10,19,0.35) 55%, rgba(6,10,19,0) 100%)" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="h-[2px] w-9 mb-3" style={{ background: "var(--color-gold)" }} />
                    <h3 className="font-display font-semibold text-xl" style={{ color: "var(--color-ivory)" }}>
                      {p.name}
                    </h3>
                    <p className="text-xs mt-1 tracking-wide" style={{ color: "var(--color-gold-soft)" }}>
                      {p.title}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-24 sm:py-32 px-6 border-t text-center" style={{ borderColor: "var(--line)", background: "var(--color-navy)" }}>
        <Reveal className="max-w-2xl mx-auto">
          <SplitReveal
            text="Speak with an advocate today."
            className="font-display font-bold uppercase leading-[1.02] text-[clamp(1.8rem,5vw,3.2rem)]"
            style={{ color: "var(--color-ivory)" }}
          />
          <p className="mt-5 text-base sm:text-lg" style={{ color: "rgba(247,244,236,0.7)" }}>
            Consultations available 24/7 — by phone, WhatsApp, or in person at any of our three Delhi offices.
          </p>
          <Link
            to="/contact"
            className="hover-pop inline-flex items-center gap-2 font-display font-semibold text-sm rounded-full px-8 py-4 mt-8"
            style={{ background: "var(--color-gold)", color: "var(--color-navy)" }}
          >
            Get in touch <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </Layout>
  );
}
