import { Section } from "~/components/section";
import { Reveal } from "~/components/reveal";
import { Badge } from "~/components/ui/badge";
import { Code2 } from "lucide-react";
import { useI18n } from "~/i18n";

export function Skills() {
  const { dict } = useI18n();

  const skillGroups = [
    {
      label: "AI & Machine Learning",
      tags: [
        "Ollama",
        "HuggingFace",
        "RAG",
        "LLM Fine-tuning",
        "ComfyUI",
        "Prompt Engineering",
      ],
    },
    {
      label: "Data Engineering",
      tags: [
        "PySpark",
        "Apache Spark",
        "Apache Airflow",
        "Apache Iceberg",
        "Databricks",
        "DataMesh",
        "Kafka",
        "SQL",
      ],
    },
    {
      label: "Cloud & Infrastructure",
      tags: [
        "AWS",
        "AWS Glue",
        "AWS EMR",
        "AWS Athena",
        "AWS Redshift",
        "AWS Lambda",
        "AWS Kinesis",
        "Terraform",
        "Docker",
      ],
    },
    {
      label: "Backend & Languages",
      tags: ["Node.js", "Python", "Go", "TypeScript", "TDD", "SOLID", "DDD"],
    },
    {
      label: "Frontend & Mobile",
      tags: ["React", "Next.js", "React Router", "React Native", "Expo", "EAS"],
    },
    {
      label: "Platforms & Services",
      tags: ["Vercel", "Railway", "Supabase", "Firebase"],
    },
  ];

  return (
    <Section id="skills" title={dict.skills.heading} icon={<Code2 size={18} />}>
      <div className="space-y-6">
        {skillGroups.map((group, gi) => (
          <Reveal key={gi} delay={gi * 60}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((s, i) => (
                  <Badge key={i} className="text-sm skill-badge cursor-default">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
