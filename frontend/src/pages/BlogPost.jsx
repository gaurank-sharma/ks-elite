import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, ExternalLink, Tag } from "lucide-react";
import Layout from "../components/Layout";
import Reveal from "../components/Reveal";
import { fetchPostBySlug, resolveImageUrl } from "../lib/api";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setPost(null);
    setError("");
    fetchPostBySlug(slug)
      .then(setPost)
      .catch(() => setError("This post couldn't be found."));
  }, [slug]);

  return (
    <Layout>
      <section className="pt-32 sm:pt-40 pb-24 sm:pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>

          {error && <p className="text-sm text-[var(--fg-muted)]">{error}</p>}
          {!error && !post && <p className="text-sm text-[var(--fg-muted)] font-mono uppercase tracking-wide">Loading…</p>}

          {post && (
            <Reveal>
              <div className="flex items-center gap-4 mb-4 font-mono text-[11px] uppercase tracking-wide text-[var(--fg-muted)]">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5" style={{ color: "var(--accent)" }}>
                  <Tag size={13} />
                  {post.category}
                </span>
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-5xl leading-tight mb-6">{post.title}</h1>

              {post.authorName && (
                <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)] mb-8">
                  <span>
                    By <span className="font-medium text-[var(--fg)]">{post.authorName}</span>
                  </span>
                  {post.authorLinkedIn && (
                    <a
                      href={post.authorLinkedIn}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
                    >
                      <ExternalLink size={14} />
                      LinkedIn
                    </a>
                  )}
                </div>
              )}

              {post.heroImage && (
                <div className="rounded-2xl overflow-hidden mb-10 border" style={{ borderColor: "var(--line)" }}>
                  <img src={resolveImageUrl(post.heroImage)} alt={post.title} className="w-full h-auto" />
                </div>
              )}

              <div className="prose-blog text-[var(--fg)] leading-relaxed">
                {post.sections?.map((section, i) => (
                  <div key={i}>
                    {section.text && <div dangerouslySetInnerHTML={{ __html: section.text }} />}
                    {section.image && (
                      <div className="rounded-xl overflow-hidden my-6 border" style={{ borderColor: "var(--line)" }}>
                        <img src={resolveImageUrl(section.image)} alt="" className="w-full h-auto" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </Layout>
  );
}
