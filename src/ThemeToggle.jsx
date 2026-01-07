export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="theme-toggle-pill"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
