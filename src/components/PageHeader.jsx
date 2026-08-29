import SplitReveal from "./SplitReveal";

export default function PageHeader({ kicker, title, note }) {
  return (
    <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 px-6 overflow-hidden" style={{ background: "var(--color-navy)" }}>
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-gold) 18%, transparent), transparent 70%)" }}
      />
      <div className="relative max-w-5xl mx-auto text-center">
        <span className="seal" style={{ borderColor: "rgba(247,244,236,0.3)", color: "var(--color-gold-soft)" }}>
          {kicker}
        </span>
        <SplitReveal
          text={title}
          className="font-display font-bold uppercase leading-[1.02] text-[clamp(2.2rem,6.5vw,4.6rem)] mt-5"
          style={{ color: "var(--color-ivory)" }}
        />
        {note && (
          <p className="mt-5 text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "rgba(247,244,236,0.7)" }}>
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
