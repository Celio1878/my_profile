import { useContext, useMemo } from "react";
import { ThemeContext } from "~/lib/theme-context";
import { Button } from "~/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "~/lib/utils";
import { useI18n } from "~/i18n";

export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { dict } = useI18n();
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
      title={isDark ? dict.ui.theme.titleLight : dict.ui.theme.titleDark}
      aria-label={isDark ? dict.ui.theme.titleLight : dict.ui.theme.titleDark}
      aria-pressed={isDark}
      onClick={() => setTheme(next)}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-yellow-300" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 text-gray-300" aria-hidden="true" />
      )}
      <span className="sr-only">
        {isDark ? dict.ui.theme.srLightMode : dict.ui.theme.srDarkMode}
      </span>
    </Button>
  );
}
