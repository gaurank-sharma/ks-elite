export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

// Local-dev uploads return a path relative to the backend ("/uploads/x.jpg"); in
// production (Vercel Blob) they're already absolute URLs and pass through unchanged.
export function resolveImageUrl(url) {
  return url?.startsWith("/uploads/") ? `${API_ORIGIN}${url}` : url;
}

// Best-effort lead capture: the WhatsApp deep link is the real submission path,
// so a failed/offline API call must never block or throw for the caller.
export function submitLead(path, payload) {
  fetch(`${API_BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

// Internship applications include an optional resume file, so this sends
// multipart form data instead of JSON (submitLead's shape). Same best-effort
// contract as submitLead — the WhatsApp flow is the real submission path.
export function submitInternshipApplication(formData) {
  fetch(`${API_BASE}/internship`, { method: "POST", body: formData }).catch(() => {});
}

export async function sendChatMessage(messages) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
  return data.reply;
}

export async function fetchPublishedPosts() {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error("Failed to load posts.");
  return res.json();
}

export async function fetchPostBySlug(slug) {
  const res = await fetch(`${API_BASE}/posts/${slug}`);
  if (!res.ok) throw new Error("Post not found.");
  return res.json();
}

export async function fetchTeam() {
  const res = await fetch(`${API_BASE}/team`);
  if (!res.ok) throw new Error("Failed to load team.");
  return res.json();
}

export async function fetchTestimonials() {
  const res = await fetch(`${API_BASE}/testimonials`);
  if (!res.ok) throw new Error("Failed to load testimonials.");
  return res.json();
}
