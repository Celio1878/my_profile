import { useContext, useMemo } from "react";
import { ThemeContext } from "~/libs/theme-context";
import { Button } from "~/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const next = useMemo(() => (isDark ? "light" : "dark"), [isDark]);

  return (
    <Button
      variant="outline"
      size="sm"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(next)}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
