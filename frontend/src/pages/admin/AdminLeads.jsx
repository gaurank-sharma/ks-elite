import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { getContacts, getInternships, updateLeadStatus, deleteLead, AuthError } from "../../lib/adminApi";

const TABS = [
  { key: "contact", label: "Consultation Requests", fetcher: getContacts },
  { key: "internship", label: "Internship Applications", fetcher: getInternships },
];

const STATUS_OPTIONS = ["new", "contacted", "closed"];
const STATUS_COLORS = { new: "#c9a24b", contacted: "#2563eb", closed: "#6b7280" };

export default function AdminLeads() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("contact");
  const [leads, setLeads] = useState(null);
  const [error, setError] = useState("");

  const load = (key) => {
    setLeads(null);
    setError("");
    const fetcher = TABS.find((t) => t.key === key).fetcher;
    fetcher()
      .then(setLeads)
      .catch((err) => {
        if (err instanceof AuthError) return navigate("/admin/login", { replace: true });
        setError(err.message);
      });
  };

  useEffect(() => load(tab), [tab]);

  const setStatus = async (id, status) => {
    try {
      await updateLeadStatus(tab, id, status);
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    } catch (err) {
      if (err instanceof AuthError) return navigate("/admin/login", { replace: true });
      setError(err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this lead permanently?")) return;
    try {
      await deleteLead(tab, id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      if (err instanceof AuthError) return navigate("/admin/login", { replace: true });
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-6">Leads</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="rounded-full px-4 py-2 text-sm font-medium border"
            style={
              tab === t.key
                ? { background: "var(--accent)", borderColor: "var(--accent)", color: "var(--color-navy)" }
                : { borderColor: "var(--line)", color: "var(--fg-muted)" }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
      {leads === null && !error && <p className="text-sm text-[var(--fg-muted)]">Loading…</p>}
      {leads?.length === 0 && <p className="text-sm text-[var(--fg-muted)]">No {tab === "contact" ? "consultation requests" : "internship applications"} yet.</p>}

      {leads?.length > 0 && (
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-[var(--fg-muted)] font-mono text-[11px] uppercase tracking-wide" style={{ borderColor: "var(--line)" }}>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">{tab === "contact" ? "Matter" : "College"}</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-b last:border-0" style={{ borderColor: "var(--line)" }}>
                    <td className="px-4 py-3 whitespace-nowrap text-[var(--fg-muted)]">
                      {new Date(l.receivedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {tab === "contact" ? l.name : `${l.firstName} ${l.surname}`}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {tab === "contact" ? l.phone : (
                        <div className="flex flex-col">
                          <span>{l.email}</span>
                          <span className="text-[var(--fg-muted)]">{l.contact}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">{tab === "contact" ? l.matter || "—" : l.college}</td>
                    <td className="px-4 py-3 max-w-xs text-[var(--fg-muted)]">
                      {tab === "contact" ? l.message : `${l.mode} · Preferred: ${l.month}`}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={l.status || "new"}
                        onChange={(e) => setStatus(l.id, e.target.value)}
                        className="rounded-full border px-2.5 py-1 text-xs font-mono uppercase tracking-wide"
                        style={{ borderColor: "var(--line)", background: "var(--bg)", color: STATUS_COLORS[l.status || "new"] }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => remove(l.id)} className="text-[var(--fg-muted)] hover:text-red-500" aria-label="Delete">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
