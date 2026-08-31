import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { fetchTeam, resolveImageUrl } from "../lib/api";

// Used if the API is unreachable or the team collection is empty — the site
// should never show a blank team page.
const FALLBACK_TEAM = [
  {
    name: "Chirag Mittal",
    title: "Experienced Advocate",
    exp: "6 years",
    education: "LL.M · All India Bar Examination",
    bio: "Excels at client conferences, contract drafting, and legal pleadings, with results delivered before the Delhi High Court and subordinate courts.",
    tags: ["Bail", "Cheque Bounce", "Civil", "Criminal", "Family", "Writ"],
    image: "/images/team/team_1.jpg",
  },
  {
    name: "Abhay Kumar",
    title: "Senior Associate Partner",
    exp: "7 years",
    education: "COP, Bar Council of India",
    bio: "Handles cases across all courts and tribunals. Worked with a Senior Counsel of the Supreme Court (2017–2019). Member of the Supreme Court Bar Association and an active RTI transparency advocate.",
    tags: ["Supreme Court", "High Court", "Tribunals", "RTI"],
    image: "/images/team/team_3.jpg",
  },
  {
    name: "Amrit Rai Gupta",
    title: "Former Ministry of Home Affairs Officer",
    exp: "30 years",
    education: "Prior government service",
    bio: "Represents clients before the Supreme Court, High Courts, and tribunals in civil, criminal, service, matrimonial, banking, and corporate matters.",
    tags: ["Civil", "Corporate", "Banking", "Service Matters"],
    image: "/images/team/team_2.jpg",
  },
];

export default function Attorneys() {
  const [team, setTeam] = useState(FALLBACK_TEAM);

  useEffect(() => {
    fetchTeam()
      .then((data) => {
        if (data.length) setTeam(data);
      })
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <PageHeader
        kicker="Our Team"
        title="Attorneys"
        note="Meticulous preparation, legal precision, and a results-driven mindset — across every matter, every court."
        image="/images/practice-areas/criminal-law.jpg"
      />

      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {team.map((p, i) => (
            <Reveal key={p.id ?? p.name} delay={i * 0.08} className="h-full">
              <div
                className="hover-pop h-full rounded-2xl border overflow-hidden flex flex-col"
                style={{ borderColor: "var(--line)", background: "var(--card)" }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={resolveImageUrl(p.image)} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(6,10,19,0) 60%, rgba(6,10,19,0.65) 100%)" }}
                  />
                </div>

                <div className="p-7 flex flex-col flex-1">
                <h3 className="font-display font-bold text-xl">{p.name}</h3>
                <p className="text-sm mt-1" style={{ color: "var(--accent)" }}>
                  {p.title}
                </p>

                <div className="flex flex-col gap-1.5 mt-3 font-mono text-[11px] uppercase tracking-wide text-[var(--fg-muted)]">
                  <span>{p.exp} exp.</span>
                  <span className="flex items-start gap-1.5">
                    <GraduationCap size={13} className="mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{p.education}</span>
                  </span>
                </div>

                <p className="text-sm text-[var(--fg-muted)] leading-relaxed mt-4 flex-1">{p.bio}</p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-wide rounded-full border px-2.5 py-1"
                      style={{ borderColor: "var(--line)", color: "var(--fg-muted)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}
