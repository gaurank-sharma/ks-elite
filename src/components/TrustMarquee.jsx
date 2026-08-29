const ITEMS = [
  "Supreme Court of India",
  "Delhi High Court",
  "Arbitration & ADR",
  "NCLT / NCLAT",
  "Debt Recovery Tribunal",
  "Consumer Forums",
  "District & Sessions Courts",
];

export default function TrustMarquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div
      className="marquee-paused overflow-hidden border-y py-5"
      style={{ borderColor: "var(--line)", background: "var(--bg-alt)" }}
    >
      <div className="marquee-track">
        {track.map((item, i) => (
          <div key={i} className="flex items-center gap-8 pr-8 shrink-0">
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase whitespace-nowrap text-[var(--fg-muted)]">
              {item}
            </span>
            <span aria-hidden style={{ color: "var(--accent)" }}>
              &#9670;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
