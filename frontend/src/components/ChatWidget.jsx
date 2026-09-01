import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { sendChatMessage } from "../lib/api";

const GREETING = {
  role: "assistant",
  content: "Hi, I'm the Sharma & Associates assistant. Ask me about our practice areas or offices — or tell me your name and phone number and I'll book you a consultation right here.",
};

// Safety net: the model is told not to use markdown, but if it slips (e.g. **bold**),
// render it properly instead of showing literal asterisks. No dangerouslySetInnerHTML —
// this builds plain React nodes, so there's no HTML-injection surface.
function renderMessage(content) {
  return content.split("\n").map((line, li, lines) => (
    <span key={li}>
      {line.split(/(\*\*[^*]+\*\*)/g).map((part, pi) =>
        part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
          <strong key={pi}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
      {li < lines.length - 1 && <br />}
    </span>
  ));
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const send = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setError("");
    setSending(true);

    try {
      const reply = await sendChatMessage(next);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="hover-pop fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "var(--accent)", color: "var(--color-navy)" }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[min(360px,calc(100vw-3rem))] rounded-2xl border flex flex-col overflow-hidden shadow-2xl"
          style={{ borderColor: "var(--line)", background: "var(--card)", height: "min(520px, calc(100vh - 10rem))" }}
        >
          <div className="px-5 py-4 border-b" style={{ borderColor: "var(--line)" }}>
            <p className="font-display font-bold text-sm">Sharma & Associates</p>
            <p className="text-xs text-[var(--fg-muted)] mt-0.5">Usually replies in a few seconds</p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className="max-w-[85%] text-sm leading-relaxed rounded-2xl px-4 py-2.5"
                style={
                  m.role === "user"
                    ? { alignSelf: "flex-end", background: "var(--accent)", color: "var(--color-navy)" }
                    : { alignSelf: "flex-start", background: "var(--bg)", border: "1px solid var(--line)" }
                }
              >
                {renderMessage(m.content)}
              </div>
            ))}
            {sending && (
              <div className="self-start text-xs text-[var(--fg-muted)] font-mono uppercase tracking-wide px-1">Typing…</div>
            )}
            {error && <div className="self-start text-xs text-red-500 px-1">{error}</div>}
          </div>

          <form onSubmit={send} className="p-3 border-t flex items-center gap-2" style={{ borderColor: "var(--line)" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 rounded-full border px-4 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
              style={{ borderColor: "var(--line)", background: "var(--bg)" }}
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send"
              className="hover-pop w-10 h-10 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50"
              style={{ background: "var(--accent)", color: "var(--color-navy)" }}
            >
              <Send size={15} strokeWidth={2.4} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
