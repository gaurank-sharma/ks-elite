import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Practice Areas", to: "/practice-areas" },
  { label: "Attorneys", to: "/attorneys" },
  { label: "Internship", to: "/internship" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const PHONE = "+91 98919 67200";
const PHONE_TEL = "+919891967200";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("noscroll", open);
    return () => document.documentElement.classList.remove("noscroll");
  }, [open]);

  return (
    <>
      <header
        className="sticky top-0 z-40 backdrop-blur border-b"
        style={{ background: "color-mix(in srgb, var(--bg) 88%, transparent)", borderColor: "var(--line)" }}
      >
        <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display font-bold text-xl tracking-tight" style={{ color: "var(--fg)" }}>
              K.S. <span style={{ color: "var(--accent)" }}>Elite Attorneys</span>
            </span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--fg-muted)] mt-0.5">
              Sharma &amp; Associates
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {LINKS.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `relative font-mono text-[11px] tracking-[0.15em] uppercase transition-colors pb-1 ${
                    isActive ? "" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? { color: "var(--fg)", borderBottom: "2px solid var(--accent)" }
                    : undefined
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2 font-display font-semibold text-sm rounded-full px-5 py-2.5 transition-colors"
              style={{ background: "var(--accent)", color: "var(--color-navy)" }}
            >
              <Phone size={15} strokeWidth={2.4} />
              {PHONE}
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="p-2 -mr-2"
              style={{ color: "var(--fg)" }}
            >
              <Menu size={26} />
            </button>
          </div>
        </nav>
      </header>

      <div
        className="fixed inset-0 z-50 flex flex-col transition-transform duration-500"
        style={{
          background: "var(--bg)",
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transitionTimingFunction: "var(--ease-out-quart)",
        }}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b shrink-0" style={{ borderColor: "var(--line)" }}>
          <span className="font-display font-bold text-xl" style={{ color: "var(--fg)" }}>
            K.S. <span style={{ color: "var(--accent)" }}>Elite Attorneys</span>
          </span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2" style={{ color: "var(--fg)" }}>
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col justify-center flex-1 px-8 gap-1 overflow-y-auto py-6">
          {LINKS.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className="font-display font-bold uppercase text-3xl py-2.5 border-b"
              style={({ isActive }) => ({
                color: isActive ? "var(--accent)" : "var(--fg)",
                borderColor: "var(--line)",
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="px-8 pb-10 shrink-0">
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center justify-center gap-2 font-display font-semibold text-base rounded-full px-6 py-4 w-full"
            style={{ background: "var(--accent)", color: "var(--color-navy)" }}
          >
            <Phone size={17} strokeWidth={2.4} />
            Call {PHONE}
          </a>
        </div>
      </div>
    </>
  );
}
