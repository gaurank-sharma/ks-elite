import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Inbox, LogOut, Menu, Newspaper, X } from "lucide-react";
import { clearToken } from "../../lib/adminApi";

const NAV = [
  { to: "/admin/leads", label: "Leads", icon: Inbox },
  { to: "/admin/posts", label: "Blog Posts", icon: Newspaper },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? "" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
  }`;

const navLinkStyle = ({ isActive }) => (isActive ? { background: "var(--accent)", color: "var(--color-navy)" } : undefined);

export default function AdminLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    clearToken();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen md:flex" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      {/* Mobile top bar */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-3 border-b sticky top-0 z-20"
        style={{ borderColor: "var(--line)", background: "var(--card)" }}
      >
        <div>
          <p className="font-display font-bold text-sm">K.S. Elite</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-muted)]">Admin Portal</p>
        </div>
        <button onClick={() => setMobileOpen((o) => !o)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden border-b px-4 py-3 flex flex-col gap-1 sticky top-[57px] z-20"
          style={{ borderColor: "var(--line)", background: "var(--card)" }}
        >
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={navLinkClass} style={navLinkStyle} onClick={() => setMobileOpen(false)}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
          <button
            onClick={logout}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)]"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex md:w-56 md:shrink-0 border-r px-4 py-6 flex-col gap-1"
        style={{ borderColor: "var(--line)", background: "var(--card)" }}
      >
        <div className="px-2 mb-6">
          <p className="font-display font-bold text-sm">K.S. Elite</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-muted)]">Admin Portal</p>
        </div>

        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={navLinkClass} style={navLinkStyle}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)]"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </aside>

      <main className="flex-1 min-w-0 px-4 sm:px-8 py-6 sm:py-8 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
