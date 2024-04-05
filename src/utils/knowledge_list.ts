type knowledge_list = {
  id: string;
  title: string;
  items: { name: string; link: string }[];
};

export const knowledge_list: knowledge_list[] = [
  {
    id: "patterns",
    title: "Patterns",
    items: [
      { name: "*DD", link: "" },
      { name: "OOP/FP", link: "" },
      { name: "SOLID", link: "" },
      { name: "YAGNI", link: "" },
      { name: "DRY", link: "" },
      { name: "Well Architected Framework", link: "" },
      { name: "Structural", link: "" },
      { name: "Behavioral", link: "" },
    ],
  },
  {
    id: "code",
    title: "Code",
    items: [
      { name: "JS/TS", link: "" },
      { name: "Python", link: "" },
      { name: "Golang", link: "" },
    ],
  },
  {
    id: "infra",
    title: "Infra",
    items: [
      { name: "Cloud", link: "" },
      { name: "Terraform", link: "" },
      { name: "Serverless Framework", link: "" },
      { name: "Git/Github", link: "" },
      { name: "Docker", link: "" },
      { name: "Kafka", link: "" },
    ],
  },
  {
    id: "back",
    title: "Backend",
    items: [
      { name: "NodeJS", link: "" },
      { name: "FastAPI", link: "" },
      { name: "Go Standard Library", link: "" },
    ],
  },
  {
    id: "data",
    title: "Data",
    items: [
      { name: "NoSQL", link: "" },
      { name: "SQL", link: "" },
      { name: "Data Structure", link: "" },
      { name: "ML", link: "" },
      { name: "AI", link: "" },
      { name: "LLM", link: "" },
    ],
  },
  {
    id: "front",
    title: "Frontend",
    items: [
      { name: "ReactJS", link: "" },
      { name: "NextJS", link: "" },
    ],
  },
];
