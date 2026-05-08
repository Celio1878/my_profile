import type { ReactNode } from "react";
import { Reveal } from "~/components/reveal";

interface SectionProps {
  id: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  title,
  icon,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 container mx-auto px-4 py-16 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mb-8">
        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 text-primary">
                {icon}
              </span>
            )}
            <h2
              id={`${id}-heading`}
              className="text-2xl font-bold tracking-tight"
            >
              {title}
            </h2>
          </div>
          <div className="section-divider" />
        </Reveal>
      </div>
      <div className="text-gray-700 dark:text-gray-200 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
