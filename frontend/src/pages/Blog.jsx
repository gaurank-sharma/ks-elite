import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Tag } from "lucide-react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { fetchPublishedPosts } from "../lib/api";

const CATEGORY_IMAGES = {
  Technology: "/images/blog/technology.jpg",
  "Inter-State Dispute": "/images/blog/inter-state-dispute.jpg",
  Courts: "/images/blog/courts.jpg",
  Laws: "/images/blog/laws.jpg",
  Divorce: "/images/blog/divorce.jpg",
};

function coverImage(post) {
  return post.heroImage || CATEGORY_IMAGES[post.category] || "/images/blog/laws.jpg";
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Blog() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPublishedPosts()
      .then(setPosts)
      .catch(() => setError("Couldn't load posts right now — please check back shortly."));
  }, []);

  const [featured, ...rest] = posts || [];

  return (
    <Layout>
      <PageHeader
        kicker="Insights"
        title="From the Blog"
        note="Commentary on courts, technology, and the law — written by the K.S. Elite Attorneys team."
        image="/images/practice-areas/property-law.jpg"
      />

      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {error && <p className="text-sm text-[var(--fg-muted)] text-center">{error}</p>}

          {!error && posts === null && (
            <p className="text-sm text-[var(--fg-muted)] text-center font-mono uppercase tracking-wide">Loading…</p>
          )}

          {!error && posts?.length === 0 && (
            <p className="text-sm text-[var(--fg-muted)] text-center">No posts published yet — check back soon.</p>
          )}

          {featured && (
            <>
              {/* Featured post */}
              <Reveal>
                <Link to={`/blog/${featured.slug}`}>
                  <article className="hover-pop group relative block overflow-hidden rounded-3xl aspect-[16/9] sm:aspect-[21/9] mb-16">
                    <img
                      src={coverImage(featured)}
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
                          {formatDate(featured.date)}
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
                </Link>
              </Reveal>

              {/* Remaining posts */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post, i) => (
                  <Reveal key={post.id} delay={(i % 3) * 0.06} y={20}>
                    <Link to={`/blog/${post.slug}`}>
                      <article
                        className="hover-pop group relative block h-full rounded-2xl border overflow-hidden flex flex-col"
                        style={{ borderColor: "var(--line)", background: "var(--card)" }}
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={coverImage(post)}
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
                            {formatDate(post.date)}
                          </span>
                          <h3 className="font-display font-bold text-lg leading-snug flex-1">{post.title}</h3>
                          <p className="text-[var(--fg-muted)] text-sm mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
                        </div>
                      </article>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
