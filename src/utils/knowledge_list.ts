type knowledge_list = {
  title: string;
  items: { name: string; link: string }[];
};

export const knowledge_list: knowledge_list[] = [
  {
    title: "Languages",
    items: [
      { name: "JS/TS", link: "" },
      { name: "Python", link: "" },
      { name: "Golang", link: "" },
    ],
  },
  {
    title: "Infrastructure",
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
    title: "Backend",
    items: [
      { name: "NodeJS", link: "" },
      { name: "FastAPI", link: "" },
      { name: "Go Standard Library", link: "" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "ReactJS", link: "" },
      { name: "NextJS", link: "" },
    ],
  },
  {
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
];
