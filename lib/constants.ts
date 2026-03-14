// ============================================================================
// SITE CONFIGURATION
// ============================================================================
// TODO: Update all placeholder data with real information

export const SITE_CONFIG = {
  name: "Yash Oza", // TODO: Verify name
  role: "Full Stack Developer", // TODO: Update with actual role
  tagline: "I build experiences that live on the web.", // TODO: Write custom tagline
  email: "yoyashoza@gmail.com",
  location: "City, Country", // TODO: Add location
  social: {
    github: "https://github.com/yashoza19",
    linkedin: "https://linkedin.com/in/yourusername", // TODO: Add LinkedIn
    twitter: "https://twitter.com/yourusername", // TODO: Add Twitter or remove
  },
  resume: "/resume.pdf", // TODO: Add resume PDF to /public
};

// ============================================================================
// WORK EXPERIENCE
// ============================================================================
// TODO: Add real work experience

export const EXPERIENCES = [
  {
    company: "Company Name", // TODO: Add company
    role: "Senior Developer", // TODO: Add role
    period: "2024 – Present", // TODO: Add dates
    description: "Brief description of the role and responsibilities.", // TODO: Add description
    highlights: [
      "Key achievement or project #1", // TODO: Add real achievements
      "Key achievement or project #2",
      "Key achievement or project #3",
    ],
  },
  {
    company: "Previous Company", // TODO: Add company
    role: "Full Stack Developer",
    period: "2022 – 2024",
    description: "Built and maintained web applications.",
    highlights: [
      "Developed features used by X users",
      "Improved performance by X%",
      "Led migration to new tech stack",
    ],
  },
  // TODO: Add more experiences as needed
];

// ============================================================================
// PROJECTS
// ============================================================================
// TODO: Add real projects with actual images

export const PROJECTS = [
  {
    title: "Project Name", // TODO: Add project
    description: "A brief description of what this project does and the problem it solves.", // TODO: Add description
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL"], // TODO: Add tech stack
    liveUrl: "https://project.com", // TODO: Add live URL
    repoUrl: "https://github.com/yashoza19/project", // TODO: Add repo URL
    image: "/images/projects/project-1.jpg", // TODO: Add project image to /public/images/projects/
    featured: true,
  },
  {
    title: "Another Project",
    description: "Another interesting project that showcases different skills.",
    tech: ["Next.js", "Tailwind CSS", "Firebase"],
    liveUrl: "https://another-project.com",
    repoUrl: "https://github.com/yashoza19/another-project",
    image: "/images/projects/project-2.jpg",
    featured: true,
  },
  {
    title: "Side Project",
    description: "A side project built to explore new technologies.",
    tech: ["Vue.js", "Express", "MongoDB"],
    liveUrl: "https://side-project.com",
    repoUrl: "https://github.com/yashoza19/side-project",
    image: "/images/projects/project-3.jpg",
    featured: false,
  },
  // TODO: Add more projects
];

// ============================================================================
// SKILLS & TECH STACK
// ============================================================================
// TODO: Update with actual skills

export const SKILLS = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Vue.js",
    "GSAP",
    "Framer Motion",
  ], // TODO: Update frontend skills
  backend: [
    "Node.js",
    "Express",
    "Python",
    "Django",
    "PostgreSQL",
    "MongoDB",
    "Redis",
  ], // TODO: Update backend skills
  tools: [
    "Git",
    "Docker",
    "AWS",
    "Vercel",
    "Figma",
    "Jest",
    "Playwright",
  ], // TODO: Update tools
};

// ============================================================================
// STATS (for About section)
// ============================================================================
// TODO: Update with real stats

export const STATS = {
  yearsExperience: 3, // TODO: Update
  projectsCompleted: 25, // TODO: Update
  technologiesMastered: 20, // TODO: Update
  coffeeConsumed: "∞", // TODO: Update or keep as is
};

// ============================================================================
// NAVIGATION
// ============================================================================

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

// ============================================================================
// FOOTER LINKS
// ============================================================================

export const FOOTER_LINKS = {
  social: [
    { label: "GitHub", href: SITE_CONFIG.social.github },
    { label: "LinkedIn", href: SITE_CONFIG.social.linkedin },
    { label: "Twitter", href: SITE_CONFIG.social.twitter },
    { label: "Email", href: `mailto:${SITE_CONFIG.email}` },
  ],
  legal: [
    // TODO: Add legal pages if needed
    // { label: "Privacy", href: "/privacy" },
    // { label: "Terms", href: "/terms" },
  ],
};
