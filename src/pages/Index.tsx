import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/ProjectsGrid";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

/**
 * Página principal do portfólio.
 *
 * Metadados gerenciados pelo Layout.
 */
const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen theme-transition">
      <Navbar />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        <Hero />
        <Projects />
        <Skills />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
