import { useI18n } from "~/i18n";
import { Section } from "~/components/section";
import { Reveal } from "~/components/reveal";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { GraduationCap } from "lucide-react";

export function Education() {
  const { dict } = useI18n();

  return (
    <Section
      id="education"
      title={dict.education.heading}
      icon={<GraduationCap size={18} />}
    >
      <ul className="space-y-4">
        {dict.education.items.map((edu, i) => (
          <Reveal as="li" key={i} delay={i * 80}>
            <Card className="card-hover">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base font-semibold">
                      {edu.degree}
                    </CardTitle>
                    <CardDescription className="mt-0.5">
                      {edu.institution}
                    </CardDescription>
                  </div>
                  {edu.period && (
                    <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full whitespace-nowrap">
                      {edu.period}
                    </span>
                  )}
                </div>
              </CardHeader>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
