import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getTestimonial, createTestimonial, updateTestimonial, AuthError } from "../../lib/adminApi";

export default function AdminTestimonialEditor() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    getTestimonial(id)
      .then((t) => {
        setName(t.name);
        setRole(t.role || "");
        setQuote(t.quote);
      })
      .catch((err) => {
        if (err instanceof AuthError) return navigate("/admin/login", { replace: true });
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const save = async () => {
    if (!name.trim() || !quote.trim()) return setError("Name and quote are required.");
    setSaving(true);
    setError("");
    try {
      if (isEdit) {
        await updateTestimonial(id, { name, role, quote });
      } else {
        await createTestimonial({ name, role, quote });
      }
      navigate("/admin/testimonials");
    } catch (err) {
      if (err instanceof AuthError) return navigate("/admin/login", { replace: true });
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-[var(--fg-muted)]">Loading…</p>;

  return (
    <div className="max-w-xl">
      <button onClick={() => navigate("/admin/testimonials")} className="flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] mb-6">
        <ArrowLeft size={14} />
        Back to Testimonials
      </button>

      <h1 className="font-display font-bold text-2xl mb-6">{isEdit ? "Edit Testimonial" : "New Testimonial"}</h1>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <div className="flex flex-col gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Client / company name"
          className="rounded-xl border px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
          style={{ borderColor: "var(--line)", background: "var(--card)" }}
        />
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role / description (e.g. Non-Banking Financial Institution)"
          className="rounded-xl border px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
          style={{ borderColor: "var(--line)", background: "var(--card)" }}
        />
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Quote"
          rows={4}
          className="rounded-xl border px-4 py-3 text-sm outline-none focus:border-[var(--accent)] resize-y"
          style={{ borderColor: "var(--line)", background: "var(--card)" }}
        />

        <button
          onClick={save}
          disabled={saving}
          className="self-start rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-60"
          style={{ background: "var(--accent)", color: "var(--color-navy)" }}
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
