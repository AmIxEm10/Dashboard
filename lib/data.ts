export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: number;
  role: string;
  featured?: boolean;
  url?: string;
  repo?: string;
  accent?: string;
};

export const projects: Project[] = [
  {
    slug: "taskflow",
    title: "TaskFlow",
    description:
      "Application de gestion de projet en temps réel avec collaboration multi-utilisateurs, notifications et vue Kanban.",
    tags: ["Next.js", "tRPC", "Postgres", "WebSockets"],
    year: 2025,
    role: "Lead dev & Product",
    featured: true,
    url: "https://example.com/taskflow",
    repo: "https://github.com/example/taskflow",
    accent: "#f96e46",
  },
  {
    slug: "nova-ui",
    title: "Nova UI",
    description:
      "Bibliothèque de composants React accessibles (WCAG 2.2 AA) inspirée de Radix, publiée sur npm, 12k téléchargements/mois.",
    tags: ["React", "TypeScript", "Storybook", "Tailwind"],
    year: 2024,
    role: "Créateur & mainteneur",
    featured: true,
    repo: "https://github.com/example/nova-ui",
    accent: "#e8b84c",
  },
  {
    slug: "cashly",
    title: "Cashly",
    description:
      "Tableau de bord finance personnelle avec agrégation bancaire, catégorisation IA et budgets prédictifs.",
    tags: ["Next.js", "Python", "FastAPI", "Plaid"],
    year: 2024,
    role: "Full stack",
    featured: true,
    url: "https://example.com/cashly",
    accent: "#7bc67b",
  },
  {
    slug: "pixel-forge",
    title: "Pixel Forge",
    description:
      "Éditeur d'art pixel dans le navigateur avec layers, export GIF et collaboration en temps réel.",
    tags: ["Canvas", "React", "Supabase"],
    year: 2023,
    role: "Co-fondateur",
    url: "https://example.com/pixelforge",
    accent: "#d084ff",
  },
  {
    slug: "devradar",
    title: "DevRadar",
    description:
      "Tracker de tendances tech : analyse GitHub, Hacker News et Reddit pour repérer les technos montantes.",
    tags: ["Node.js", "Postgres", "Redis"],
    year: 2023,
    role: "Solo project",
    repo: "https://github.com/example/devradar",
    accent: "#5bb6ff",
  },
  {
    slug: "mono-cli",
    title: "mono-cli",
    description:
      "CLI zero-config pour monorepos : détection de packages affectés, cache partagé et publication orchestrée.",
    tags: ["Rust", "CLI", "Monorepo"],
    year: 2022,
    role: "Maintainer",
    repo: "https://github.com/example/mono-cli",
    accent: "#ff7eb9",
  },
];

export type SkillGroup = {
  title: string;
  summary: string;
  items: { name: string; level: number; note?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    summary:
      "Interfaces web modernes, design systems et micro-interactions qui font du bien.",
    items: [
      { name: "TypeScript", level: 95, note: "depuis 2019" },
      { name: "React / Next.js", level: 92, note: "App Router, RSC, ISR" },
      { name: "Tailwind CSS", level: 90 },
      { name: "Accessibilité (WCAG)", level: 80, note: "audits & fixes" },
      { name: "Motion / Framer Motion", level: 75 },
    ],
  },
  {
    title: "Backend & Data",
    summary:
      "Architectures type-safe, API robustes, modèles de données qui tiennent la route.",
    items: [
      { name: "Node.js", level: 88 },
      { name: "PostgreSQL", level: 82, note: "SQL, indexing, plans" },
      { name: "Python / FastAPI", level: 75 },
      { name: "tRPC / GraphQL", level: 85 },
      { name: "Prisma / Drizzle", level: 80 },
    ],
  },
  {
    title: "DevOps & Plateforme",
    summary:
      "CI, déploiements, observabilité. Moins de surprises en prod, plus de sommeil.",
    items: [
      { name: "Docker", level: 82 },
      { name: "GitHub Actions", level: 85 },
      { name: "AWS (ECS, RDS, S3)", level: 70 },
      { name: "Vercel / Cloudflare", level: 88 },
      { name: "Observability (Sentry, Otel)", level: 72 },
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  location?: string;
};

export const experiences: Experience[] = [
  {
    role: "Développeur Full Stack Senior",
    company: "Northwind SaaS",
    period: "2023 — Présent",
    location: "Paris",
    description:
      "Conception et développement de la plateforme produit (Next.js, tRPC, Postgres). Mise en place d'un design system partagé, migration progressive vers RSC, mentorat d'une équipe de 4.",
  },
  {
    role: "Développeur Full Stack",
    company: "Atlas Studio",
    period: "2021 — 2023",
    location: "Paris",
    description:
      "Applications sur mesure pour clients B2B : healthcare, fintech, media. Design system partagé entre 6 produits. +30% de vitesse de développement côté équipe.",
  },
  {
    role: "Développeur Frontend — Freelance",
    company: "Indépendant",
    period: "2019 — 2021",
    location: "Remote",
    description:
      "Missions courtes pour startups et agences : sites vitrines, e-commerce Shopify Hydrogen, applications internes. 14 clients, 0 retard majeur.",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Alex a une capacité rare à traduire des besoins flous en une interface qui clique du premier coup. On a livré notre v1 en 6 semaines au lieu des 4 mois initialement prévus.",
    author: "Clémence Varga",
    role: "CPO, Northwind",
  },
  {
    quote:
      "La qualité du code est irréprochable, mais ce qui m'a surpris c'est sa manière de pousser l'équipe à mieux penser le produit avant de coder.",
    author: "Raphaël Ibarra",
    role: "CTO, Atlas Studio",
  },
  {
    quote:
      "On lui a confié un audit d'accessibilité critique. Il a trouvé des bugs que trois audits précédents avaient manqués, et proposé des fixes en deux jours.",
    author: "Inès Moreau",
    role: "Product Lead, Cashly",
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  tag: string;
};

export const posts: Post[] = [
  {
    slug: "type-safe-fullstack-2025",
    title: "Un stack full-stack type-safe en 2025, pour de vrai",
    date: "2025-03-14",
    excerpt:
      "J'ai essayé tous les combos : GraphQL codegen, REST + OpenAPI, tRPC, Server Actions. Voici ce qui tient la route quand l'équipe grossit.",
    readTime: "9 min",
    tag: "Architecture",
  },
  {
    slug: "design-system-zero-hero",
    title: "Monter un design system de zéro en trois mois",
    date: "2025-01-22",
    excerpt:
      "Retour d'expérience sur la création d'un DS interne : tokens, composants, doc, adoption. Les pièges évités, ceux qu'on a quand même trouvés.",
    readTime: "12 min",
    tag: "Design",
  },
  {
    slug: "rsc-pragmatique",
    title: "React Server Components, sans la hype",
    date: "2024-11-07",
    excerpt:
      "RSC change la donne, mais pas partout. Un guide pragmatique pour savoir quand les utiliser, quand s'abstenir, et comment migrer sans tout casser.",
    readTime: "7 min",
    tag: "React",
  },
  {
    slug: "a11y-checklist",
    title: "Checklist d'accessibilité qui tient sur un post-it",
    date: "2024-08-30",
    excerpt:
      "Pas besoin d'un audit WCAG complet pour faire 80% du chemin. Les 12 points qui couvrent l'essentiel avant le lancement.",
    readTime: "5 min",
    tag: "Accessibilité",
  },
];
