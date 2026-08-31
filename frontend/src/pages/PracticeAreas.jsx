import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import SplitReveal from "../components/SplitReveal";

const CATEGORIES = [
  {
    label: "Litigation & Disputes",
    areas: [
      { image: "/images/practice-areas/criminal-law.jpg", title: "Criminal Law", desc: "FIRs, bail, trials, appeals, cheque bounce, and special statutes." },
      { image: "/images/practice-areas/consumer-forum.jpg", title: "Consumer Forum", desc: "Disputes before district, state, and national consumer forums." },
      { image: "/images/practice-areas/motor-vehicles.jpg", title: "Motor Vehicles", desc: "Licensing, registration, permits, and accident claim disputes." },
      { image: "/images/practice-areas/negotiable-instruments.jpg", title: "Negotiable Instruments", desc: "Cheque bounce and disputes over signed payment instruments." },
    ],
  },
  {
    label: "Corporate & Commercial",
    areas: [
      { image: "/images/practice-areas/business-law.jpg", title: "Business Law", desc: "Rules governing dealings between persons in commercial matters." },
      { image: "/images/practice-areas/taxation-laws.jpg", title: "Taxation Laws", desc: "Direct and indirect taxes — corporate, transfer pricing, GST, customs." },
      { image: "/images/practice-areas/nclt-nclat.jpg", title: "NCLT / NCLAT", desc: "Quasi-judicial matters relating to Indian companies." },
      { image: "/images/practice-areas/debt-recovery-tribunal.jpg", title: "Debt Recovery Tribunal", desc: "Loan recovery representation for banks and financial institutions." },
      { image: "/images/practice-areas/ip-rights.jpg", title: "Intellectual Property Rights", desc: "Copyright, design, patent, and trademark protection." },
    ],
  },
  {
    label: "Family & Personal",
    areas: [
      { image: "/images/practice-areas/family-law.jpg", title: "Family Law", desc: "Matrimonial disputes, family trusts, settlement deeds, and wills." },
      { image: "/images/practice-areas/insurance-law.jpg", title: "Insurance Law", desc: "Disclosure obligations and disputes arising from insurance claims." },
      { image: "/images/practice-areas/property-law.jpg", title: "Property Law", desc: "Due diligence, registration, title verification, and conveyancing." },
    ],
  },
  {
    label: "Regulatory & Specialized",
    areas: [
      { image: "/images/practice-areas/labour-law.jpg", title: "Labour Law", desc: "Employment contracts, statutory benefits, HR audits, workplace policy." },
      { image: "/images/practice-areas/drug-offenses.jpg", title: "Drug Offenses", desc: "Defence in cases arising under narcotics and drug-control statutes." },
      { image: "/images/practice-areas/sexual-offences.jpg", title: "Sexual Offences", desc: "Representation in cases of assault and exploitation." },
      { image: "/images/practice-areas/cyber-crimes.jpg", title: "Cyber Crimes", desc: "Fraud, data theft, and offences committed through computer systems." },
      { image: "/images/practice-areas/adr.jpg", title: "Alternate Dispute Resolution", desc: "Resolving disputes efficiently outside traditional litigation." },
    ],
  },
];

export default function PracticeAreas() {
  return (
    <Layout>
      <PageHeader
        kicker="What We Do"
        title="Practice Areas"
        note="Seventeen areas of legal practice, handled with the same meticulous preparation and results-driven mindset — from a single cheque bounce notice to Supreme Court appeals."
        image="/images/blog/technology.jpg"
      />

      {CATEGORIES.map((cat, ci) => (
        <section
          key={cat.label}
          className="py-16 sm:py-20 px-6 border-t"
          style={{ borderColor: "var(--line)", background: ci % 2 === 1 ? "var(--bg-alt)" : "var(--bg)" }}
        >
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-10 flex items-baseline gap-4">
              <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
                0{ci + 1}
              </span>
              <SplitReveal
                text={cat.label}
                as="h2"
                className="font-display font-bold uppercase text-[clamp(1.5rem,3.5vw,2.2rem)]"
              />
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.areas.map(({ image, title, desc }, i) => (
                <Reveal key={title} delay={(i % 3) * 0.05} y={20}>
                  <div className="hover-pop group relative h-full aspect-[4/5] overflow-hidden rounded-2xl">
                    <img
                      src={image}
                      alt={title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(6,10,19,0.96) 0%, rgba(6,10,19,0.58) 45%, rgba(6,10,19,0.15) 100%)" }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div
                        className="h-[2px] w-9 mb-4 transition-all duration-500 group-hover:w-14"
                        style={{ background: "var(--color-gold)" }}
                      />
                      <h3 className="font-display font-semibold text-xl leading-tight" style={{ color: "var(--color-ivory)" }}>
                        {title}
                      </h3>
                      <p className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(247,244,236,0.72)" }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </Layout>
  );
}
