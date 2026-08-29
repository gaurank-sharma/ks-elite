import { Calendar, Tag } from "lucide-react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";

const CATEGORY_IMAGES = {
  Technology: "/images/blog/technology.jpg",
  "Inter-State Dispute": "/images/blog/inter-state-dispute.jpg",
  Courts: "/images/blog/courts.jpg",
  Laws: "/images/blog/laws.jpg",
  Divorce: "/images/blog/divorce.jpg",
};

const POSTS = [
  {
    title: "Legal Technology and Court Modernisation: Reimagining Justice in the Digital Age",
    date: "Dec 26, 2025",
    category: "Technology",
    excerpt: "How digital infrastructure is reshaping case management, filings, and access to Indian courts.",
  },
  {
    title: "Rivers in Conflict: Legal Battles Over Water and Ecology in India",
    date: "Jul 22, 2025",
    category: "Inter-State Dispute",
    excerpt: "Examining the legal frameworks governing India's inter-state river water disputes.",
  },
  {
    title: "Legal Challenges Over Inter-State Water Dispute and Ecology",
    date: "Jul 21, 2025",
    category: "Inter-State Dispute",
    excerpt: "A closer look at the tribunals and constitutional provisions shaping water-sharing conflicts.",
  },
  {
    title: "The Robe Less Traveled: How a New Rule Could Reshape India's Judicial Landscape",
    date: "Jun 19, 2025",
    category: "Courts",
    excerpt: "The Supreme Court's 3-year bar rule for judiciary exams faces backlash for harming marginalized, women, and first-generation aspirants.",
  },
  {
    title: "Honest Concurrent User",
    date: "Apr 22, 2025",
    category: "Laws",
    excerpt: "Understanding the doctrine of honest concurrent use in Indian trademark law.",
  },
  {
    title: "The Law of Dying Declaration in India",
    date: "Apr 13, 2025",
    category: "Laws",
    excerpt: "How Indian courts evaluate the evidentiary value of a dying declaration in criminal trials.",
  },
  {
    title: "Contempt of Court: When Respect for Justice Hangs in the Balance",
    date: "Mar 18, 2025",
    category: "Courts",
    excerpt: "What is contempt of court, and why is it important?",
  },
  {
    title: "Reasons behind Divorce",
    date: "Mar 3, 2025",
    category: "Divorce",
    excerpt: "A look at the most common grounds for divorce recognized under Indian matrimonial law.",
  },
  {
    title: "Social Media: The Double-edged Sword for Minors",
    date: "Feb 3, 2025",
    category: "Technology",
    excerpt: "Social media has transformed how we connect, learn, and share ideas — and the legal risks facing minors online.",
  },
];

export default function Blog() {
  const [featured, ...rest] = POSTS;

  return (
    <Layout>
      <PageHeader
        kicker="Insights"
        title="From the Blog"
        note="Commentary on courts, technology, and the law — written by the K.S. Elite Attorneys team."
      />

      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Featured post */}
          <Reveal>
            <article className="hover-pop group relative block overflow-hidden rounded-3xl aspect-[16/9] sm:aspect-[21/9] mb-16">
              <img
                src={CATEGORY_IMAGES[featured.category]}
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(6,10,19,0.95) 0%, rgba(6,10,19,0.5) 55%, rgba(6,10,19,0.15) 100%)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-12">
                <div className="flex items-center gap-4 mb-4 font-mono text-[11px] uppercase tracking-wide" style={{ color: "rgba(247,244,236,0.75)" }}>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5" style={{ color: "var(--color-gold-soft)" }}>
                    <Tag size={13} />
                    {featured.category}
                  </span>
                </div>
                <h2
                  className="font-display font-bold text-2xl sm:text-4xl leading-snug max-w-3xl"
                  style={{ color: "var(--color-ivory)" }}
                >
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed" style={{ color: "rgba(247,244,236,0.72)" }}>
                  {featured.excerpt}
                </p>
              </div>
            </article>
          </Reveal>

          {/* Remaining posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <Reveal key={post.title} delay={(i % 3) * 0.06} y={20}>
                <article
                  className="hover-pop group relative block h-full rounded-2xl border overflow-hidden flex flex-col"
                  style={{ borderColor: "var(--line)", background: "var(--card)" }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={CATEGORY_IMAGES[post.category]}
                      alt={post.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <span
                      className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: "var(--color-navy)", color: "var(--color-gold-soft)" }}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-[var(--fg-muted)] mb-2">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                    <h3 className="font-display font-bold text-lg leading-snug flex-1">{post.title}</h3>
                    <p className="text-[var(--fg-muted)] text-sm mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
