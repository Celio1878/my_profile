type knowledge_list = {
  id: string;
  title: string;
  link: string;
  items: { name: string }[];
};

export const knowledge_list: knowledge_list[] = [
  {
    id: "patterns",
    title: "Patterns",
    link: "",
    items: [
      { name: "*DD" },
      { name: "OOP/FP" },
      { name: "SOLID" },
      { name: "YAGNI" },
      { name: "DRY" },
      { name: "Well Architected Framework" },
      { name: "Structural" },
      { name: "Behavioral" },
    ],
  },
  {
    id: "code",
    title: "Code",
    link: "",
    items: [{ name: "JS/TS" }, { name: "Python" }, { name: "Golang" }],
  },
  {
    id: "infra",
    title: "Infra",
    link: "",
    items: [
      { name: "Cloud" },
      { name: "Terraform" },
      { name: "Serverless Framework" },
      { name: "Git/Github" },
      { name: "Docker" },
      { name: "Kafka" },
    ],
  },
  {
    id: "back",
    title: "Backend",
    link: "",
    items: [
      { name: "NodeJS" },
      { name: "FastAPI" },
      { name: "Go Standard Library" },
    ],
  },
  {
    id: "data",
    title: "Data",
    link: "",
    items: [
      { name: "NoSQL" },
      { name: "SQL" },
      { name: "Data Structure" },
      { name: "ML" },
      { name: "AI" },
      { name: "LLM" },
    ],
  },
  {
    id: "front",
    title: "Frontend",
    link: "",
    items: [{ name: "ReactJS" }, { name: "NextJS" }],
  },
];
