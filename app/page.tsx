import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main id="main-content">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Experience Section */}
      <Experience />

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <Skills />

      <section id="contact" className="min-h-screen flex items-center justify-center bg-[var(--color-border)]">
        <h2 className="text-display text-4xl">Contact Section</h2>
      </section>
    </main>
  );
}
