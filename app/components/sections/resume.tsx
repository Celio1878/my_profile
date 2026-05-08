import { useI18n } from "~/i18n";
import { Section } from "~/components/section";
import { Reveal } from "~/components/reveal";
import { FileText } from "lucide-react";

export function Resume() {
  const { dict } = useI18n();

  return (
    <Section
      id="resume"
      title={dict.resume.heading}
      icon={<FileText size={18} />}
    >
      <Reveal>
        <p className="mb-5 text-gray-700 dark:text-gray-300">
          {dict.resume.description}
        </p>
      </Reveal>
      <Reveal delay={100}>
        <div className="flex flex-wrap gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary text-primary hover:bg-primary/5 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105"
          >
            <FileText size={15} aria-hidden="true" />
            {dict.resume.viewLabel}
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 shadow-md"
          >
            <FileText size={15} aria-hidden="true" />
            {dict.resume.downloadLabel}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
