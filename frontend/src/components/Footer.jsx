import { Link } from "react-router-dom";

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={17} height={17} {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Practice Areas", to: "/practice-areas" },
  { label: "Attorneys", to: "/attorneys" },
  { label: "Internship", to: "/internship" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-navy-deep)" }}>
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <p
          className="font-display font-bold uppercase leading-[0.85] text-[clamp(2.4rem,9vw,6rem)]"
          style={{ color: "var(--color-ivory)" }}
        >
          Sharma &amp; <span style={{ color: "var(--color-gold)" }}>Associates</span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16 pt-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: "rgba(247,244,236,0.5)" }}>
              Advocates &amp; Legal Consultants — New Delhi
            </p>
            <a
              href="https://www.linkedin.com/company/ks-elite-attorneys/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover-pop inline-flex items-center justify-center w-10 h-10 rounded-full border mt-5"
              style={{ borderColor: "rgba(247,244,236,0.2)", color: "var(--color-ivory)" }}
            >
              <LinkedinIcon />
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="font-mono text-xs tracking-[0.15em] uppercase transition-colors hover:text-[var(--color-gold)]"
                style={{ color: "rgba(247,244,236,0.65)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t" style={{ borderColor: "rgba(247,244,236,0.1)" }}>
          <p className="text-xs leading-relaxed max-w-4xl" style={{ color: "rgba(247,244,236,0.45)" }}>
            As per the rules of the Bar Council of India, advocates are not permitted to solicit
            work or advertise. This website has been designed only for informational and
            educational purposes and is not intended as an advertisement or solicitation. Access
            to this website does not create an advocate–client relationship, and no information on
            this site should be construed as legal advice.
          </p>
          <p className="text-xs mt-4" style={{ color: "rgba(247,244,236,0.4)" }}>
            © {new Date().getFullYear()} Sharma & Associates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
