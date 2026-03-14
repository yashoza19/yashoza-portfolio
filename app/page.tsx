import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main id="main-content">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

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
