import { useEffect, useState } from "react";
import { Scale } from "lucide-react";

const KEY = "ksea-disclaimer-agreed";

export default function DisclaimerGate() {
  const [agreed, setAgreed] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(KEY) === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("noscroll", !agreed);
    return () => document.documentElement.classList.remove("noscroll");
  }, [agreed]);

  if (agreed) return null;

  const accept = () => {
    localStorage.setItem(KEY, "true");
    setAgreed(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      style={{ background: "rgba(6, 10, 19, 0.92)" }}
    >
      <div
        className="max-w-lg w-full rounded-2xl border p-8 sm:p-10"
        style={{ background: "var(--bg-alt)", borderColor: "var(--line)" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
          style={{ background: "color-mix(in srgb, var(--accent) 18%, transparent)" }}
        >
          <Scale size={22} style={{ color: "var(--accent)" }} />
        </div>

        <h2 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--fg)" }}>
          Bar Council of India Disclosure
        </h2>

        <p className="text-sm leading-relaxed text-[var(--fg-muted)] mb-4">
          The Bar Council of India does not permit advocates to solicit work or advertise. By
          clicking &ldquo;I Agree&rdquo; below, you acknowledge that:
        </p>

        <ul className="text-sm leading-relaxed text-[var(--fg-muted)] mb-6 flex flex-col gap-2 list-disc pl-5">
          <li>There has been no solicitation, invitation, or inducement by K.S. Elite Attorneys or its members.</li>
          <li>You are seeking information about the firm on your own accord, for your own information and use.</li>
          <li>This website is not intended to be a source of advertising or solicitation.</li>
        </ul>

        <button
          onClick={accept}
          className="w-full font-display font-semibold rounded-full py-3.5"
          style={{ background: "var(--accent)", color: "var(--color-navy)" }}
        >
          I Agree
        </button>
      </div>
    </div>
  );
}
