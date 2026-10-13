/**
 * Single source of truth for all landing-page copy.
 * Sections import from here; never hard-code copy inside components.
 */

export const site = {
  name: "Valentisys",
  legalName: "Valentisys Technologies",
  tagline: "AI-native technology partner for growing businesses",
  phone: "+1 (571) 555-0188",
  email: "hello@valentisys.com",
  blurb:
    "Valentisys is an award-winning global technology partner helping businesses modernize systems, integrate AI, and build custom software that drives lasting business impact.",
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
    { label: "YouTube", href: "#" },
  ],
};

export type NavChild = { label: string; href: string; description: string };
export type NavLink = { label: string; href: string; children?: NavChild[] };

export const nav: { links: NavLink[]; cta: { label: string; href: string } } = {
  links: [
    {
      label: "Services",
      href: "#services",
      children: [
        { label: "AI & Data Innovation", href: "#services", description: "Strategy, agents, data and governance." },
        { label: "Engineering", href: "#services", description: "Products, platforms and modernization." },
        { label: "Cloud & Security", href: "#services", description: "DevOps, migration, cost and security." },
        { label: "Advisory & Strategy", href: "#services", description: "Roadmaps, workshops and emerging tech." },
        { label: "Optimization & Quality", href: "#services", description: "Audits, FinOps and support." },
        { label: "Solution Implementation", href: "#services", description: "Dynamics, Salesforce, AWS, Power BI." },
      ],
    },
    { label: "Customers", href: "#customers" },
    { label: "Company", href: "#company" },
    { label: "Resources", href: "#insights" },
    { label: "Careers", href: "#careers" },
  ],
  cta: { label: "Talk to an expert", href: "#contact" },
};

export type HeroSlide = {
  eyebrow: string;
  /** Rich title; the segment wrapped in <strong> is highlighted. Use `highlight` to mark it. */
  title: string;
  highlight: string;
  description: string;
  cta: { label: string; href: string };
  pills?: string[];
  card:
    | { kind: "guide"; eyebrow: string; title: string; cta: string }
    | { kind: "stat"; value: string; label: string; client: string };
};

export const hero: { slides: HeroSlide[] } = {
  slides: [
    {
      eyebrow: "AI-native technology partner",
      title: "Your business, rebuilt around AI.",
      highlight: "AI.",
      description:
        "Valentisys connects AI to the workflows that actually run your company — strategy, engineering, cloud and security delivered by one accountable team.",
      cta: { label: "Explore AI services", href: "#services" },
      pills: [
        "AI Discovery, Strategy & Roadmap",
        "AI Workflow Automation",
        "AI Agents",
        "AI Pods",
        "AI Ops, Governance & Gateway",
        "AI for the Office of the CFO",
      ],
      card: { kind: "guide", eyebrow: "White paper", title: "The C-Suite Guide to AI for Businesses in 2026", cta: "Get the free guide" },
    },
    {
      eyebrow: "Customer story",
      title: "AI built to close — 25% faster sales for Halden.",
      highlight: "25% faster",
      description:
        "We unified Halden's field operations and sales pipeline on one AI-native platform, cutting missed opportunities by 35% and accelerating lead-to-close by a quarter.",
      cta: { label: "See our work in AI", href: "#customers" },
      card: { kind: "stat", value: "25%", label: "faster lead-to-close", client: "Halden Security" },
    },
    {
      eyebrow: "Engineering partner",
      title: "Engineering the future, together.",
      highlight: "together.",
      description:
        "We work as your strategic technology partner to modernize systems, integrate AI and build custom software that drives real business impact.",
      cta: { label: "How we work", href: "#company" },
      card: { kind: "stat", value: "18+", label: "years shipping software", client: "Since 2008" },
    },
  ],
};

export const clients = [
  "Halden",
  "Tenexa",
  "Northwind Labs",
  "Kestrel Health",
  "Marlowe & Co",
  "Orion Freight",
  "Bluegrass Capital",
  "Solace Retail",
  "Pinecrest Energy",
  "Vantage Logistics",
];

export type ServiceGlyph = "spark" | "ring" | "quad" | "wave";
export type Service = { title: string; glyph: ServiceGlyph; summary: string; items: string[] };

export const services: { eyebrow: string; title: string; action: { label: string; href: string }; items: Service[] } = {
  eyebrow: "What we do",
  title: "Our services",
  action: { label: "View all services", href: "#services" },
  items: [
    {
      title: "AI & Data Innovation",
      glyph: "spark",
      summary: "From discovery to production agents, with the data foundations to make them trustworthy.",
      items: [
        "AI Pods",
        "AI Discovery, Strategy & Roadmap",
        "AI Agents, Workflows & Agentic OS",
        "AI Development Services",
        "Data Analytics",
        "AI Ops, Governance & Gateway",
      ],
    },
    {
      title: "Engineering",
      glyph: "ring",
      summary: "Senior product teams that ship: proofs of concept, platforms and modernization at pace.",
      items: ["POC Development", "Product Development", "App Development", "App Modernization", "UI/UX Design"],
    },
    {
      title: "Cloud & Security",
      glyph: "quad",
      summary: "Resilient, cost-efficient infrastructure with security designed in rather than bolted on.",
      items: [
        "DevOps & CloudOps",
        "Cloud Cost Optimization",
        "Cloud Engineering & Migration",
        "Cloud Security",
        "Application Security",
        "Data Security",
      ],
    },
    {
      title: "Digital Strategy Consulting",
      glyph: "wave",
      summary: "Clear roadmaps and decision-ready advice for leaders betting on technology.",
      items: [
        "Digital Transformation Consulting",
        "Cloud Strategy",
        "Product Strategy",
        "Emerging Tech Advisory",
        "Discovery Workshops",
      ],
    },
  ],
};

export const stats = {
  eyebrow: "Partnering on your AI journey",
  title: "Nearly two decades of building scalable software, with a dedicated AI practice at the core.",
  items: [
    { value: 18, suffix: "+", label: "Years on market" },
    { value: 800, suffix: "+", label: "Professionals on board" },
    { value: 150, suffix: "+", label: "AI specialists" },
    { value: 73, suffix: "%", label: "Clients return for long-term partnerships" },
  ],
};

export type CaseStudy = {
  metric: string;
  headline: string;
  tags: string[];
  quote: string;
  author: { name: string; role: string; initials: string };
  accent: "blue" | "navy" | "sky";
};

export const caseStudies: { eyebrow: string; title: string; action: { label: string; href: string }; items: CaseStudy[] } = {
  eyebrow: "Our AI success",
  title: "Featured success stories.",
  action: { label: "All case studies", href: "#customers" },
  items: [
    {
      metric: "35%",
      headline: "reduction in missed opportunities with AI-powered lead enrichment and routing",
      tags: ["Security Services", "AI Agents", "Workflows & Agentic Delivery"],
      quote: "Valentisys doesn't just deliver solutions — they take the time to deeply understand the problem first.",
      author: { name: "Reed Halden", role: "Founder, Halden Security", initials: "RH" },
      accent: "blue",
    },
    {
      metric: "9+",
      headline: "AI agents unifying content workflows across five integrations for a martech platform",
      tags: ["Martech", "AI Agents", "Agentic OS"],
      quote: "We had the expertise — we just didn't have the system to prove it at scale. Now we do.",
      author: { name: "Nick Pereira", role: "Founder, Tenexa", initials: "NP" },
      accent: "navy",
    },
    {
      metric: "60%",
      headline: "reduction in response times through AI-automated email workflows in hospitality",
      tags: ["Hospitality & Travel", "Artificial Intelligence"],
      quote: "They took a complex vision and turned it into a real platform we can build on.",
      author: { name: "Dana Sgouris", role: "CIO, Latavola Hospitality", initials: "DS" },
      accent: "sky",
    },
    {
      metric: "50%",
      headline: "reduction in support workload with AI-powered document retrieval for agriculture",
      tags: ["Agriculture", "Artificial Intelligence"],
      quote: "Valentisys built an AI assistant that delivers accurate guidance fast and cuts manual work in half.",
      author: { name: "Priya Natarajan", role: "Director of Operations, Pinecrest", initials: "PN" },
      accent: "blue",
    },
    {
      metric: "3×",
      headline: "faster underwriting decisions with an AI-native SaaS platform for distribution finance",
      tags: ["Distribution", "Agentic Workflow", "AI Agents"],
      quote: "Awesome work and great progress — they shipped what the roadmap promised, on time.",
      author: { name: "Marcus Lind", role: "COO, Orion Freight", initials: "ML" },
      accent: "navy",
    },
  ],
};

export const webinar = {
  eyebrow: "Webinar",
  date: "November 12, 2026",
  time: "10:00 AM EST",
  title: "FinOps for AI Workflows: Controlling Cloud Costs for Growing Businesses",
  description:
    "A practical hour on where AI spend hides, which guardrails pay for themselves, and how to keep inference costs predictable as adoption grows.",
  speakers: [
    { name: "Benjamin Ortiz", role: "Director, FinOps & AI Advisory", initials: "BO" },
    { name: "Adeel Rashid", role: "Head of DevOps", initials: "AR" },
  ],
  cta: { label: "Save your seat", href: "#" },
  secondary: { label: "View all webinars", href: "#insights" },
};

export type Award = { name: string; issuer: string; kind: "award" | "cert" };

export const awards: { title: string; items: Award[] } = {
  title: "We've been recognized by the best, year after year",
  items: [
    { name: "Fastest-Growing Companies", issuer: "Americas 2026", kind: "award" },
    { name: "Top 15 Inspiring Workplaces", issuer: "2026 Ranking", kind: "award" },
    { name: "Platinum Award — AI & Automation", issuer: "Titan Business Awards", kind: "award" },
    { name: "High-Growth Companies", issuer: "Financial Review", kind: "award" },
    { name: "People Leader of the Year", issuer: "Mogul Awards", kind: "award" },
    { name: "Technology Council", issuer: "Executive Member", kind: "award" },
    { name: "ISO 27001", issuer: "Information Security", kind: "cert" },
    { name: "ISO 20000", issuer: "IT Service Management", kind: "cert" },
    { name: "ISO 9001", issuer: "Quality Management", kind: "cert" },
    { name: "CMMI Level 3", issuer: "Development Maturity", kind: "cert" },
  ],
};

export const partners = {
  title: "Our partnerships with industry leaders",
  items: [
    { name: "Microsoft", label: "Solutions Partner", mono: "M" },
    { name: "Google Cloud", label: "Partner", mono: "G" },
    { name: "Salesforce", label: "Consulting Partner", mono: "S" },
    { name: "AWS", label: "Partner Network", mono: "A" },
  ],
};

export type Podcast = {
  episode: string;
  title: string;
  duration: string;
  guest: { name: string; role: string; initials: string };
  host: { name: string; initials: string };
};

export const podcasts: { eyebrow: string; title: string; action: { label: string; href: string }; items: Podcast[] } = {
  eyebrow: "Podcast",
  title: "Conversations that go beyond the code",
  action: { label: "All podcasts", href: "#insights" },
  items: [
    {
      episode: "EP 48",
      title: "Manufacturing AI in Action: From Maintenance to Production Intelligence",
      duration: "42 min",
      guest: { name: "Kenny Mullican", role: "CIO, Paragon Industrial", initials: "KM" },
      host: { name: "Umair Javed", initials: "UJ" },
    },
    {
      episode: "EP 47",
      title: "C-Suite at Crossroads: Leading Through AI Hype and Digital Transformation",
      duration: "38 min",
      guest: { name: "Antonio Marin", role: "CTO, Northwind Labs", initials: "AM" },
      host: { name: "Umair Javed", initials: "UJ" },
    },
    {
      episode: "EP 46",
      title: "Corporate Innovation, Agentic AI and Product Building: How AI Products Scale",
      duration: "51 min",
      guest: { name: "Taylor Black", role: "VP Product, Kestrel Health", initials: "TB" },
      host: { name: "Umair Javed", initials: "UJ" },
    },
    {
      episode: "EP 45",
      title: "AI Transformation for Growing Businesses: Scaling Adoption Beyond Pilots",
      duration: "44 min",
      guest: { name: "Utpal Mangla", role: "Partner, Bluegrass Capital", initials: "UM" },
      host: { name: "Haseeb Khan", initials: "HK" },
    },
  ],
};

export type Insight = { type: "Webinar" | "White paper" | "Article"; title: string; readTime: string };

export const insights: { eyebrow: string; title: string; action: { label: string; href: string }; items: Insight[] } = {
  eyebrow: "Resources",
  title: "Latest insights & resources",
  action: { label: "View all resources", href: "#insights" },
  items: [
    { type: "Webinar", title: "How Businesses Can Move Past the AI Pilot Phase", readTime: "58 min watch" },
    { type: "White paper", title: "The C-Suite Guide to AI for Businesses in 2026", readTime: "24 page guide" },
    { type: "Article", title: "AI Agent Guardrails: Allowlists, Blocklists and Negative Instructions", readTime: "9 min read" },
    { type: "White paper", title: "A Practical Roadmap to AI-Ready Legacy System Modernization", readTime: "18 page guide" },
    { type: "Article", title: "The Executive Guide to Cloud Cost Optimization", readTime: "11 min read" },
    { type: "Webinar", title: "How Agentic AI Is Changing Business Workflows", readTime: "47 min watch" },
  ],
};

export const testimonials = [
  {
    quote:
      "Valentisys completely transformed the way we manage customer relationships. Their customized platform streamlined our processes and lifted customer satisfaction measurably.",
    name: "Nick Drogo",
    role: "Global Director IT, Knowles Group",
    initials: "ND",
  },
  {
    quote:
      "They helped us build a docketing app with an intuitive interface, letting our attorneys track more than 10,000 U.S. and international patent matters.",
    name: "Robert Burger",
    role: "COO, Sterne & Kessler",
    initials: "RB",
  },
  {
    quote:
      "Valentisys builds at a level on par with any U.S. development team. Working with them is one of the best decisions we have made.",
    name: "Umair Bashir",
    role: "CTO, Replenium",
    initials: "UB",
  },
  {
    quote:
      "They shared our vision from the start and helped us achieve the unthinkable through perseverance and attention to detail.",
    name: "Pam Chitwood",
    role: "Product Manager, ABB",
    initials: "PC",
  },
];

export const cta = {
  eyebrow: "Let's talk",
  title: "Power your next AI transformation.",
  description:
    "Tell us where AI should make a difference. A senior consultant — not a sales rep — will come back within one business day with a point of view.",
  topics: [
    "AI Strategy & Readiness Assessment",
    "AI Adoption & Change Management",
    "Technology & Data Modernization Roadmap",
    "Finance & Accounting Automation",
    "Operations & Workflow Automation",
    "Sales & Marketing Automation",
    "Customer Support Automation",
    "Custom AI Agents & Copilots",
    "AI-Native Application Development",
    "Data, Integrations & Knowledge Management",
    "Cloud & Infrastructure",
    "Cybersecurity",
    "AI Governance, Risk & Compliance",
    "Engineering & Dedicated Teams",
    "Other",
  ],
  consent: "I agree to receive insights and updates from Valentisys by email. Unsubscribe any time.",
  legal: "By submitting this form you agree to our Terms of Use and Privacy Policy. We never sell or trade personal information.",
  submit: "Send message",
};

export const footer = {
  columns: [
    {
      heading: "AI & Data Innovation",
      links: [
        "AI Pods",
        "AI Discovery, Strategy & Roadmap",
        "AI PoC & MVP Development",
        "AI Agents",
        "Machine Learning Solutions",
        "Intelligent Automation",
        "Data Engineering & Integration",
        "MLOps & AI Infrastructure",
        "Data Governance & BI",
        "AI for CFOs",
      ],
    },
    {
      heading: "Digital Product Engineering",
      links: [
        "UI/UX Design",
        "POC Development",
        "Product Development",
        "Application Development",
        "Application Modernization",
        "AI Development Services",
        "Quality Assurance & Continuous Delivery",
      ],
    },
    {
      heading: "Cloud & Infrastructure",
      links: [
        "Cloud Strategy & Architecture",
        "Cloud Migration",
        "Infrastructure Modernization",
        "Cloud Engineering",
        "CloudOps & DevOps",
        "Managed Cloud Operations",
        "Cloud Cost Optimization",
        "Multi-Cloud Security & Compliance",
      ],
    },
    {
      heading: "Cybersecurity",
      links: [
        "Consulting & Risk Assessment",
        "Governance, Risk & Compliance",
        "Application Security & Pen Testing",
        "Data Security & Encryption",
        "Cloud Security",
        "Security Automation",
      ],
    },
    {
      heading: "Optimization & Quality",
      links: ["Software Audit", "UX Audit", "Process Optimization", "FinOps", "Support & Maintenance"],
    },
    {
      heading: "Solution Implementation",
      links: [
        "Microsoft Dynamics 365",
        "Salesforce Implementation",
        "AWS Cloud Solutions",
        "Power BI Analytics Enablement",
        "MuleSoft & ServiceNow Integrations",
      ],
    },
    {
      heading: "Business Enablement",
      links: [
        "Accounts & Finance Outsourcing",
        "HR & Recruitment Outsourcing",
        "Digital Marketing & Branding",
        "Back-Office Process Automation",
      ],
    },
    {
      heading: "Engagement Models",
      links: ["Dedicated Team", "Offshore Development Center", "Fixed Price Projects", "Hybrid Delivery Model"],
    },
  ],
  quickLinks: ["All Services", "Our Customers", "Careers"],
  offices: [
    { country: "USA", address: "1890 Reston Metro Plaza, Suite 400, Reston, VA 20190" },
    { country: "United Kingdom", address: "20 Farringdon Road, London EC1M 3HE" },
    { country: "Portugal", address: "Av. D. João II 50, 1990-095 Lisbon" },
    { country: "Pakistan", address: "One Valentisys Place, Gulberg III, Lahore 54660" },
  ],
  legal: ["Company", "Resources", "Customers", "Sitemap", "Terms", "Privacy", "AI Usage Policy", "AI Principles"],
  copyright: "© 2026 Valentisys Technologies. All rights reserved.",
};
