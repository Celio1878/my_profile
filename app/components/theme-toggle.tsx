import { useContext, useMemo } from "react";
import { ThemeContext } from "~/lib/theme-context";
import { Button } from "~/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "~/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const next = useMemo(() => (isDark ? "light" : "dark"), [isDark]);

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        isDark ? "bg-muted" : "bg-slate-950",
        "cursor-pointer transition-colors duration-500",
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(next)}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-yellow-300" />
      ) : (
        <Moon className="h-4 w-4 text-gray-300" />
      )}
    </Button>
  );
}
