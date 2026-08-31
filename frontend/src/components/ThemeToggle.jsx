import { Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-11 h-6 rounded-full border transition-colors flex items-center px-0.5"
      style={{ borderColor: "var(--line)", background: isDark ? "var(--bg-alt)" : "var(--card)" }}
    >
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center transition-transform"
        style={{
          background: "var(--accent)",
          transform: isDark ? "translateX(18px)" : "translateX(0)",
        }}
      >
        {isDark ? <Moon size={11} color="#0b1220" /> : <Sun size={11} color="#0b1220" />}
      </span>
    </button>
  );
}
