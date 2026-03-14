# CLAUDE.md — Portfolio Website Build Guide

## Project Overview

Build a personal developer portfolio website with a blog system. The design is inspired by [raxx21/rajesh-portfolio](https://github.com/raxx21/rajesh-portfolio) — a React + TypeScript + GSAP + Three.js portfolio — but must have its OWN distinct visual identity. Do NOT clone or replicate that repo. Use it only as a reference for the *level of polish and interactivity* expected.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 14+** (App Router) |
| Language | **TypeScript** (strict mode) |
| Styling | **Tailwind CSS v4** + CSS Modules for complex animations |
| Animation | **GSAP** (ScrollTrigger, SplitText-style effects) + **Framer Motion** for layout/page transitions |
| 3D / Visual | **Three.js** via `@react-three/fiber` + `@react-three/drei` — used sparingly for a hero scene or interactive background element |
| Blog | **MDX** via `next-mdx-remote` or `contentlayer` — markdown files in `/content/blog/` |
| Deployment | Vercel (or any static host) |
| Package Manager | pnpm preferred, npm acceptable |

---

## Design Direction

### Aesthetic: "Cinematic Minimalism"

This is NOT a generic developer portfolio. Think editorial design meets motion graphics.

- **Color palette**: Deep charcoal/near-black background (`#0a0a0a`), warm off-white text (`#f0ece2`), one bold accent color (electric amber `#f59e0b` OR vivid coral `#f43f5e` — pick one and commit). No gradients-on-white. No purple-blue AI slop.
- **Typography**: Use a distinctive display font (e.g., `Clash Display`, `Satoshi`, `Cabinet Grotesk`, `General Sans`, or `Space Grotesk`) paired with a clean body font (`Inter` is acceptable for body only). Import from Google Fonts or Fontshare.
- **Layout**: Full-viewport sections. Generous whitespace. Asymmetric grid compositions. Text that bleeds off-edge. Oversized section numbers or labels as decorative elements.
- **Motion philosophy**: Every animation must serve a purpose. Use GSAP ScrollTrigger for scroll-linked reveals. Staggered text animations on section entries. Smooth magnetic cursor effects on interactive elements. NO bouncy/springy animations — use `power3.out` or `expo.out` easing. Page transitions via Framer Motion `AnimatePresence`.
- **3D element**: ONE tasteful Three.js element — a slowly rotating geometric form, particle field, or noise-distorted sphere in the hero. Keep it subtle and performant. It should feel like atmosphere, not a tech demo.

### What to AVOID
- Cookie-cutter card grids with drop shadows
- Rainbow gradient text
- Roboto / Arial / system font stacks as display fonts
- Generic hero text like "Hi, I'm [Name]. I build things."
- Overly busy particle systems or distracting 3D
- Fixed navbar hamburger menus (use a creative navigation approach)

---

## Site Structure & Pages

```
/                   → Home (single-page scroll experience)
/blog               → Blog listing page
/blog/[slug]        → Individual blog post (MDX)
```

### Home Page Sections (scroll-based, single page)

1. **Hero**
   - Full viewport height
   - Name displayed large (120px+ on desktop) with GSAP SplitText-style character animation on load
   - One-liner role/tagline below (typed or revealed with stagger)
   - Subtle Three.js background element (particles, noise sphere, or abstract geometry)
   - Scroll indicator (animated down-arrow or "scroll" text that fades on scroll)

2. **About**
   - Split layout: text on one side, a stylized photo or abstract visual on the other
   - Brief professional summary (2–3 paragraphs max)
   - Key stats or highlights (years of experience, projects count, etc.) revealed with GSAP counter animation
   - Text reveals on scroll via ScrollTrigger

3. **Experience / Timeline**
   - Vertical or horizontal scrolling timeline
   - Each role: Company, title, date range, 2–3 bullet accomplishments
   - GSAP-driven progressive reveal as user scrolls through
   - Consider a horizontal scroll section pinned with ScrollTrigger for a unique feel

4. **Projects**
   - 4–6 featured projects
   - Each project: title, description, tech stack tags, link to live/repo
   - Grid or stacked layout with hover effects (image parallax tilt, color shift)
   - GSAP stagger animation on scroll entry
   - Project images/thumbnails with a subtle zoom or parallax on hover

5. **Skills / Tech Stack**
   - NOT a boring grid of logos
   - Creative visualization: orbital layout, interactive constellation, categorized with motion, or a marquee/ticker strip
   - Group by category (Frontend, Backend, Tools, etc.)

6. **Blog Preview**
   - Show latest 3 blog posts
   - Each with title, date, short excerpt, reading time
   - "View all posts →" link to `/blog`
   - Minimal card design that matches overall aesthetic

7. **Contact**
   - Working contact form (use Formspree, Web3Forms, or similar)
   - Social links (GitHub, LinkedIn, Twitter/X, Email)
   - Large display text CTA like "Let's work together" or "Say hello"
   - Links with magnetic hover effect

---

## Blog System

### Architecture
- Blog posts stored as `.mdx` files in `/content/blog/`
- Each post has frontmatter:

```yaml
---
title: "Post Title"
date: "2026-03-10"
description: "Short description for SEO and listing page"
tags: ["react", "typescript", "webdev"]
published: true
readingTime: "5 min"
coverImage: "/images/blog/post-slug/cover.jpg"  # optional
---
```

### Blog Listing Page (`/blog`)
- Grid or list of all published posts, sorted by date (newest first)
- Filter by tag (client-side filtering with animation)
- Each card: title, date, tags, reading time, excerpt
- Page entrance animation

### Blog Post Page (`/blog/[slug]`)
- Clean reading experience (max-width ~720px for text)
- MDX support: can embed React components, code blocks with syntax highlighting (use `rehype-pretty-code` or `shiki`)
- Table of contents (generated from headings)
- Previous / Next post navigation
- Reading progress bar at top
- Estimated reading time in header
- Share buttons (optional)
- Back to blog link

### MDX Components to Support
- Custom `<CodeBlock>` with copy button and syntax highlighting
- `<Callout>` for tips/warnings/notes
- `<Image>` with lazy loading and optional caption
- Embedded YouTube, CodePen, etc.

---

## Animation Specifications

### GSAP Usage
```
Dependencies: gsap, @gsap/react, ScrollTrigger
Register: gsap.registerPlugin(ScrollTrigger)
```

- **Page load**: Hero text splits into chars, animates in with stagger (0.03s per char), `y: 30, opacity: 0` → `y: 0, opacity: 1`, ease: `power3.out`
- **Scroll reveals**: Each section content fades up (`y: 60 → 0, opacity: 0 → 1`) triggered at `top: 80%`
- **Pinned horizontal scroll**: Experience/timeline section pins and scrolls horizontally
- **Counter animations**: Stats/numbers count up when scrolled into view
- **Parallax**: Subtle parallax on images and decorative elements (`speed: 0.5`)
- **Magnetic cursor**: Interactive elements (buttons, links) subtly pull toward cursor on hover
- **Smooth scroll**: Use `Lenis` for smooth scrolling (integrates well with GSAP ScrollTrigger)

### Framer Motion Usage
- Page transitions between routes (`/` ↔ `/blog` ↔ `/blog/[slug]`)
- Layout animations for blog tag filtering
- Exit animations on navigation

---

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout, fonts, global providers
│   ├── page.tsx                # Home page (all sections)
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx        # Individual blog post
│   └── globals.css             # Tailwind + custom CSS variables
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation (creative, not generic)
│   │   ├── Footer.tsx
│   │   ├── SmoothScroll.tsx    # Lenis wrapper
│   │   └── PageTransition.tsx  # Framer Motion transitions
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── BlogPreview.tsx
│   │   └── Contact.tsx
│   ├── three/
│   │   └── HeroScene.tsx       # Three.js hero background
│   ├── ui/
│   │   ├── MagneticButton.tsx
│   │   ├── TextReveal.tsx      # GSAP text animation wrapper
│   │   ├── AnimatedCounter.tsx
│   │   └── ScrollProgress.tsx
│   └── blog/
│       ├── BlogCard.tsx
│       ├── TableOfContents.tsx
│       ├── MDXComponents.tsx   # Custom MDX component overrides
│       └── CodeBlock.tsx
├── content/
│   └── blog/
│       ├── first-post.mdx
│       └── second-post.mdx
├── lib/
│   ├── blog.ts                 # MDX parsing utilities
│   ├── constants.ts            # Site metadata, social links, project data
│   └── utils.ts
├── public/
│   ├── images/
│   ├── fonts/                  # Self-hosted fonts (if not using Google Fonts)
│   └── resume.pdf
├── CLAUDE.md                   # This file
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## Data Management

All personal data lives in `/lib/constants.ts` so it's easy to update:

```typescript
export const SITE_CONFIG = {
  name: "Your Name",
  role: "Full Stack Developer",
  tagline: "I build experiences that live on the web.",
  email: "you@email.com",
  location: "City, Country",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  },
  resume: "/resume.pdf",
};

export const EXPERIENCES = [
  {
    company: "Company Name",
    role: "Senior Developer",
    period: "2024 – Present",
    description: "What you did there.",
    highlights: ["Highlight 1", "Highlight 2"],
  },
  // ...
];

export const PROJECTS = [
  {
    title: "Project Name",
    description: "Brief description of the project.",
    tech: ["React", "TypeScript", "Node.js"],
    liveUrl: "https://project.com",
    repoUrl: "https://github.com/you/project",
    image: "/images/projects/project-name.jpg",
    featured: true,
  },
  // ...
];

export const SKILLS = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  backend: ["Node.js", "Python", "PostgreSQL", "Redis"],
  tools: ["Git", "Docker", "AWS", "Figma"],
};
```

---

## Performance & SEO Requirements

- Lighthouse score ≥ 90 on all categories
- Proper `<meta>` tags and Open Graph for all pages
- Dynamic OG images for blog posts (use `next/og` or static)
- Semantic HTML throughout
- Images optimized via `next/image`
- Font preloading with `next/font`
- Three.js scene must be lazy-loaded and respect `prefers-reduced-motion`
- Responsive: mobile-first, tested at 320px, 768px, 1024px, 1440px breakpoints
- Blog posts generate static pages at build time

---

## Accessibility

- All animations respect `prefers-reduced-motion: reduce`
- Keyboard navigable
- Skip-to-content link
- Proper heading hierarchy (h1 → h2 → h3, no skips)
- Alt text on all images
- Sufficient color contrast (4.5:1 minimum for body text)
- Focus indicators visible on all interactive elements

---

## Visual QA — Browser MCP (REQUIRED)

Claude Code cannot see the rendered website by default. A Browser MCP server is **required** so Claude Code can open the site in a real browser, take screenshots, scroll, interact, and verify that design, animations, and layout actually look correct.

### Setup — Choose One

**Option A: Playwright MCP (Recommended — easiest setup)**

```bash
claude mcp add playwright -- npx @playwright/mcp@latest
```

Or add to `~/.claude/settings.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Capabilities: `browser_navigate`, `browser_snapshot`, `browser_take_screenshot`, `browser_click`, `browser_scroll`, viewport resizing for responsive testing.

**Option B: Chrome DevTools MCP (More powerful — console, network, performance)**

1. **QUIT Chrome completely first** (Cmd+Q on macOS, or close all windows). Chrome must be launched fresh with the debugging flag — you cannot add it to an already-running instance.

2. Launch Chrome with remote debugging:
```bash
# macOS (IMPORTANT: use this exact path, NOT "google-chrome")
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

# Linux
google-chrome --remote-debugging-port=9222

# Windows
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
```

3. Add the MCP server (skip if already added):
```bash
claude mcp add chrome-devtools -- npx -y @anthropic-ai/mcp-server-chrome-devtools
```

4. **Restart Claude Code** after Chrome is running with debugging enabled.

**Troubleshooting:**
- `zsh: command not found: google-chrome` → You're on macOS. Use the full `/Applications/...` path above.
- `MCP server chrome-devtools already exists` → The server is already registered. Just make sure Chrome is running with `--remote-debugging-port=9222` and restart Claude Code.
- MCP connects but tools fail → Quit Chrome, relaunch with the flag, restart Claude Code.
- If all else fails, use **Option A (Playwright MCP)** instead — it's self-contained and doesn't need Chrome launched separately.

Or add to `~/.claude/settings.json`:
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-chrome-devtools"]
    }
  }
}
```

Additional capabilities: real-time console error monitoring, network request inspection, performance traces, Core Web Vitals measurement, full DOM inspection.

### Visual QA Protocol — Run After EVERY Phase (NON-NEGOTIABLE)

**CRITICAL: Do NOT skip visual QA. Do NOT commit without visual verification.**

If the Browser MCP is available, use it. If the Browser MCP is NOT available or fails to connect:
1. **STOP and tell the user** — say: "Browser MCP is not connected. I cannot verify the design visually. Please set it up before I continue."
2. **Do NOT commit, push, or create a PR.** Wait for the user to either fix the MCP connection or explicitly tell you to proceed without visual QA.
3. **Never say "I'll skip visual QA for now" or "I'll proceed without visual verification."** The whole point of this project is that the design must look correct. Blind commits produce broken designs.

**When the Browser MCP IS available**, after completing each phase and before committing:

1. Ensure the dev server is running (`pnpm dev`)
2. Use the Browser MCP to navigate to `http://localhost:3000`
3. Take a full-page screenshot at **desktop (1440px)**, **tablet (768px)**, and **mobile (375px)**
4. Scroll through the entire page slowly, taking a screenshot of each section
5. Check for console errors and warnings
6. Test hover states on interactive elements (buttons, project cards, nav links)
7. Verify scroll-triggered GSAP animations fire correctly by scrolling into each section
8. Compare what is rendered against the design spec in this file
9. **Fix any visual issues found before proceeding**
10. Only after ALL issues are resolved: commit, push, and create PR

### Visual QA Checklist

Use this checklist at each phase. Claude Code should verify each item visually:

**Global**
- [ ] Background is `#0a0a0a` (near-black), no white flashes on load or route change
- [ ] Text color is `#f0ece2` (warm off-white), not pure white
- [ ] Accent color is consistent throughout (amber or coral, not both)
- [ ] Display font is distinctive (NOT Inter, Roboto, Arial, or system fonts for headings)
- [ ] Body font is clean and readable at 16px+
- [ ] No horizontal overflow at any breakpoint
- [ ] Smooth scrolling via Lenis is active

**Hero Section**
- [ ] Name text is 120px+ on desktop, scales down appropriately on mobile
- [ ] GSAP character stagger animation plays on page load
- [ ] Three.js background element is visible but subtle — not distracting
- [ ] Scroll indicator is visible and fades on scroll
- [ ] Full viewport height, no content cut off

**About Section**
- [ ] Asymmetric split layout (not centered or symmetric)
- [ ] Text reveals on scroll via ScrollTrigger
- [ ] Counter animations count up when scrolled into view
- [ ] Generous whitespace, not cramped

**Experience Section**
- [ ] Timeline or horizontal scroll is functional
- [ ] Progressive reveal works as user scrolls
- [ ] If pinned horizontal scroll: pin engages and releases cleanly
- [ ] Content is readable and properly spaced

**Projects Section**
- [ ] Project cards have hover effects (parallax tilt, color shift, image zoom)
- [ ] GSAP stagger animation triggers on scroll entry
- [ ] Tech stack tags are visible and styled
- [ ] Links to live/repo are functional

**Skills Section**
- [ ] NOT a flat grid of logos — uses creative visualization
- [ ] Motion/animation is present and purposeful
- [ ] Categories are visually distinct

**Blog Preview Section**
- [ ] Shows latest 3 posts with title, date, excerpt, reading time
- [ ] "View all posts →" link navigates to `/blog`
- [ ] Cards match overall dark aesthetic

**Contact Section**
- [ ] Large CTA text is prominent
- [ ] Contact form fields are styled and functional
- [ ] Social links have magnetic hover effect
- [ ] Links are clickable and correctly targeted

**Blog Pages**
- [ ] `/blog` listing page renders with all published posts
- [ ] Tag filtering works with animation
- [ ] `/blog/[slug]` renders MDX content correctly
- [ ] Code blocks have syntax highlighting and copy button
- [ ] Reading progress bar works
- [ ] Table of contents generates from headings
- [ ] Previous/Next navigation links work
- [ ] Max-width ~720px for reading content

**Responsive**
- [ ] At 375px: everything stacks, no horizontal scroll, text is readable
- [ ] At 768px: layout adapts, grid shifts to fewer columns
- [ ] At 1440px: full layout with generous whitespace
- [ ] Navigation works at all breakpoints

**Performance**
- [ ] No console errors or warnings
- [ ] Three.js does not cause jank or frame drops
- [ ] Page load feels fast (no visible layout shifts)
- [ ] Images are not oversized or missing

### QA Prompt — Copy/Paste After Each Phase

Use this prompt to tell Claude Code to run a full visual review:

```
Use the browser MCP to visually QA http://localhost:3000. Do the following:

1. Navigate to the site and take a desktop screenshot (1440px wide)
2. Slowly scroll from top to bottom, pausing at each section. Take a screenshot of each section.
3. Check every item in the Visual QA Checklist from CLAUDE.md
4. Resize to 768px and take a full-page screenshot
5. Resize to 375px and take a full-page screenshot
6. Check for any console errors
7. Test hover effects on buttons, project cards, and navigation links
8. Navigate to /blog and take a screenshot
9. Navigate to a blog post and take a screenshot

Report what passes, what fails, and fix all failures before we proceed.
```

---

## Git Configuration & Version Control

### CRITICAL: Authorship Rules

All Git commits MUST be authored solely by the user. Claude Code must NEVER appear as a co-author or committer.

**Before any commits, run these commands at the project root:**

```bash
# Set Git user identity (replace with actual values)
git config user.name "YOUR_FULL_NAME"
git config user.email "YOUR_EMAIL@example.com"
```

**Disable Claude co-authorship — add this to your environment or Claude Code config:**

```bash
# Prevent Claude from being added as co-author in commit trailers
export CLAUDE_CO_AUTHOR=false
```

Also, when using Claude Code, pass the `--no-co-author` flag or set the config:
```bash
claude config set --global gitCommitCoAuthor false
```

### Repository Initialization

Initialize Git immediately after scaffolding the project:

```bash
git init
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### .gitignore

Ensure the `.gitignore` includes at minimum:

```
node_modules/
.next/
out/
.env
.env.local
.vercel
*.tsbuildinfo
.DS_Store
```

### Commit Strategy

**IMPORTANT: All work must be done on feature branches with Pull Requests. NEVER commit directly to main.**

For each phase or feature:

1. Create a new feature branch from main
2. Make changes and commit with conventional commit messages
3. Push the branch to origin
4. Open a Pull Request to main
5. User will manually review and merge the PR

Use conventional commits for all commits:

```
feat: scaffold Next.js project with Tailwind and TypeScript
feat: add global styles, fonts, and CSS variables
feat: build navbar and footer layout
feat: implement hero section with GSAP animations
feat: add Three.js background scene
feat: build about section with scroll reveals
feat: add experience timeline with horizontal scroll
feat: implement projects section with hover effects
feat: create skills visualization
feat: build contact section with form
feat: set up MDX blog infrastructure
feat: add blog listing and post pages
feat: implement blog preview on home page
feat: add page transitions with Framer Motion
fix: responsive design pass for all breakpoints
feat: add SEO meta tags and Open Graph
chore: accessibility and performance polish
```

### Branch Workflow (REQUIRED)

For each feature or phase:

```bash
# 1. Create a feature branch
git checkout main
git pull origin main
git checkout -b feature/phase-name

# 2. Build the feature, make commits
git add .
git commit -m "feat: description of what was built"

# 3. Push the branch
git push -u origin feature/phase-name

# 4. Open a PR using GitHub CLI
gh pr create --title "feat: Phase name" --body "Description of changes"

# 5. User will manually merge the PR on GitHub
```

Branch naming convention:
- `feature/phase-1-foundation` - Phase 1
- `feature/hero-section` - Hero section
- `feature/about-section` - About section
- `feature/blog-system` - Blog system
- `fix/responsive-navbar` - Bug fixes
- `chore/update-dependencies` - Maintenance

### Pull Request Guidelines

**CRITICAL: NO Claude Attribution**
- NEVER include "Generated with Claude Code" or any similar attribution in PR descriptions
- NEVER include emojis or checkmark icons in PR descriptions
- Keep PR descriptions professional and concise
- Focus on what was changed and why
- Include a test plan section

PR description template:
```
## Summary
- List of changes made
- One item per line

## Configuration (if applicable)
Key settings or decisions

## Next Steps
What comes after this PR

## Test Plan
- How to verify the changes work
- Steps taken to test
```

---

## Deployment & Publishing

### Option A: Vercel (Recommended)

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com), import the GitHub repo
3. Vercel auto-detects Next.js — no config needed
4. Every push to `main` triggers an automatic deployment
5. Custom domain: Add in Vercel dashboard → Settings → Domains

```bash
# Or deploy via CLI
pnpm i -g vercel
vercel --prod
```

### Option B: GitHub Pages (Static Export)

Add to `next.config.mjs`:
```javascript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
```

Then set up GitHub Actions (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### Option C: Netlify, Cloudflare Pages, Railway

All support Next.js out of the box. Connect your GitHub repo and they auto-deploy on push.

### Local Development

```bash
pnpm install
pnpm dev          # Local development at localhost:3000
pnpm build        # Production build
pnpm start        # Preview production build
```

---

## Implementation Order

Follow this order to build incrementally. **Run the Visual QA Protocol after each step before creating a PR.**

0. **Git Init**: Initialize repo, set user config, create remote, first commit
1. **Scaffold**: `create-next-app` with TypeScript + Tailwind + App Router → **Visual QA: verify dark background, fonts load**
2. **Globals**: Fonts, CSS variables, color palette, Tailwind config → **Visual QA: verify typography and colors**
3. **Layout**: Root layout, Navbar, Footer, SmoothScroll provider → **Visual QA: verify nav, footer, smooth scroll**
4. **Hero section**: Display text + GSAP animations + Three.js background → **Visual QA: verify animation timing, 3D subtlety, text size**
5. **About section**: Content + scroll reveal animations → **Visual QA: verify scroll triggers, layout asymmetry**
6. **Experience section**: Timeline + horizontal scroll → **Visual QA: verify pin/unpin, progressive reveal**
7. **Projects section**: Grid + hover effects → **Visual QA: verify hover states, stagger animation**
8. **Skills section**: Creative visualization → **Visual QA: verify it's NOT a logo grid, motion works**
9. **Contact section**: Form + social links → **Visual QA: verify form, magnetic hover, CTA prominence**
10. **Blog system**: MDX setup, listing page, post page, components → **Visual QA: verify listing, post rendering, code highlighting**
11. **Blog preview section**: On home page → **Visual QA: verify latest 3 posts appear, links work**
12. **Page transitions**: Framer Motion AnimatePresence → **Visual QA: verify transitions between / and /blog**
13. **Polish**: Responsive, a11y, performance, SEO meta tags → **Visual QA: full responsive pass at 375px, 768px, 1440px**
14. **Content**: Replace placeholder data with real content

---

## Key Reminders

- This is a DARK-themed site. Background is near-black, text is warm off-white.
- Every section transition should feel cinematic — no jarring jumps.
- The site should feel like a curated experience, not a template.
- GSAP is the primary animation engine for scroll-based effects. Framer Motion is for page/layout transitions only.
- The Three.js element is an accent, not the main show. If it hurts performance, simplify it.
- Blog is a first-class feature, not an afterthought. The reading experience should be excellent.
- All data is centralized in `/lib/constants.ts` for easy customization.
- Use `placeholder` content with clear TODO comments where personal data needs to be filled in.
- **After every phase, use the Browser MCP to visually verify the output.** Do NOT commit, push, or create a PR until the current phase looks correct visually.
- **All work on feature branches with PRs. Never commit directly to main.**
- **No Claude attribution anywhere — not in commits, not in PR descriptions, not in code comments.**