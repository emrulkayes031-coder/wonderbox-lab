export const site = {
  name: "Wonder Box Lab",
  legalName: "Wonder Box Lab",
  email: "emrulkayes031@gmail.com",
  // Cloudflare Pages project URL. Update this if the project name or custom domain differs.
  siteUrl: "https://wonderbox-lab.pages.dev/",
  description:
    "Wonder Box Lab is an independent product and technology brand building games today, and thoughtful apps, AI tools, and software next.",
  shortDescription:
    "An independent product and technology brand. Games today. More kinds of software next.",
  nav: [
    { label: "Home", href: "", key: "home" },
    { label: "Products", href: "products/", key: "products" },
    { label: "About", href: "about/", key: "about" },
    { label: "Support", href: "support/", key: "support" },
  ],
  categories: [
    {
      id: "games",
      label: "Games",
      icon: "gamepad",
      tone: "games",
      description:
        "Playful systems, readable rules, and worlds that invite one more run.",
      status: "Here now",
      note: "Two worlds in the lab",
    },
    {
      id: "apps",
      label: "Apps",
      icon: "apps",
      tone: "apps",
      description:
        "Useful, quiet software for the things people do every day.",
      status: "In the lab",
      note: "Exploring",
    },
    {
      id: "ai",
      label: "AI tools",
      icon: "spark",
      tone: "ai",
      description:
        "Assistive tools that keep the person in charge and the craft in view.",
      status: "In the lab",
      note: "Exploring",
    },
    {
      id: "saas",
      label: "SaaS",
      icon: "layers",
      tone: "saas",
      description:
        "Focused platforms for work that deserves less friction and more clarity.",
      status: "In the lab",
      note: "Exploring",
    },
  ],
  principles: [
    {
      title: "Start with a feeling.",
      body:
        "Every product begins with the moment we want someone to have, not the feature list.",
    },
    {
      title: "Sweat the invisible parts.",
      body:
        "Fast loads, clear words, forgiving edges. Craft is what you notice only when it is missing.",
    },
    {
      title: "Leave room to grow.",
      body:
        "We build small, deliberate systems that can become more without losing what made them work.",
    },
  ],
  updated: "November 2026",
};

export const productCategories = [
  { id: "all", label: "All" },
  { id: "games", label: "Games" },
  { id: "apps", label: "Apps" },
  { id: "ai", label: "AI Tools" },
  { id: "saas", label: "SaaS" },
];

export const legalLinks = [
  { label: "Privacy", href: "legal/privacy/" },
  { label: "Terms", href: "legal/terms/" },
];
