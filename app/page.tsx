import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main id="main-content">
      {/* Hero Section */}
      <Hero />

      {/* Temporary sections to test scrolling */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-[var(--color-border)]">
        <h2 className="text-display text-4xl">About Section</h2>
      </section>

      <section id="experience" className="min-h-screen flex items-center justify-center">
        <h2 className="text-display text-4xl">Experience Section</h2>
      </section>

      <section id="projects" className="min-h-screen flex items-center justify-center bg-[var(--color-border)]">
        <h2 className="text-display text-4xl">Projects Section</h2>
      </section>

      <section id="skills" className="min-h-screen flex items-center justify-center">
        <h2 className="text-display text-4xl">Skills Section</h2>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center bg-[var(--color-border)]">
        <h2 className="text-display text-4xl">Contact Section</h2>
      </section>
    </main>
  );
}
