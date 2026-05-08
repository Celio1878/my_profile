import { useI18n } from "~/i18n";
import { Section } from "~/components/section";
import { Reveal } from "~/components/reveal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import { Award } from "lucide-react";

export function Certifications() {
  const { dict } = useI18n();

  return (
    <Section
      id="certifications"
      title={dict.certifications.heading}
      icon={<Award size={18} />}
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {dict.certifications.items.map((cert, i) => (
          <Reveal as="li" key={i} delay={i * 60}>
            <Card className="card-hover h-full">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-semibold leading-snug">
                      {cert.title}
                    </CardTitle>
                    <CardDescription className="mt-0.5 text-xs">
                      {cert.issuer}
                    </CardDescription>
                  </div>
                  {cert.issued && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                      {cert.issued}
                    </span>
                  )}
                </div>
                {cert.credentialId ? (
                  <p className="mt-1.5 text-xs text-muted-foreground font-mono truncate">
                    ID: {cert.credentialId}
                  </p>
                ) : null}
              </CardHeader>
              {cert.skills.length > 0 ? (
                <CardContent className="pt-0">
                  <Separator className="mb-3" />
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((s, j) => (
                      <Badge
                        key={j}
                        variant="outline"
                        className="text-xs skill-badge"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              ) : null}
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
