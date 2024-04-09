type knowledge_list = {
  title: string;
  link: string;
};

export function create_knowledge_list(dict: {
  aside: {
    title: {
      patterns: string;
      infrastructure: string;
      backend: string;
      frontend: string;
      data: string;
      coding: string;
    };
  };
}) {
  return [
    { title: dict.aside.title.patterns, link: "/knowledge/patterns" },
    {
      title: dict.aside.title.coding,
      link: "/knowledge/programming-languages",
    },
    {
      title: dict.aside.title.infrastructure,
      link: "/knowledge/infrastructure",
    },
    { title: dict.aside.title.backend, link: "/knowledge/backend" },
    { title: dict.aside.title.data, link: "/knowledge/data" },
    { title: dict.aside.title.frontend, link: "/knowledge/frontend" },
  ];
}
