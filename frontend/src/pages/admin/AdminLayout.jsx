import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Inbox, LogOut, Newspaper } from "lucide-react";
import { clearToken } from "../../lib/adminApi";

const NAV = [
  { to: "/admin/leads", label: "Leads", icon: Inbox },
  { to: "/admin/posts", label: "Blog Posts", icon: Newspaper },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <aside
        className="w-56 shrink-0 border-r px-4 py-6 flex flex-col gap-1"
        style={{ borderColor: "var(--line)", background: "var(--card)" }}
      >
        <div className="px-2 mb-6">
          <p className="font-display font-bold text-sm">K.S. Elite</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--fg-muted)]">Admin Portal</p>
        </div>

        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? "" : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
              }`
            }
            style={({ isActive }) => (isActive ? { background: "var(--accent)", color: "var(--color-navy)" } : undefined)}
          >
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

      <main className="flex-1 min-w-0 px-8 py-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
