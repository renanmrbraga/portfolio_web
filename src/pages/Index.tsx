import Hero from "@/components/Hero";
import Projects from "@/components/ProjectsGrid";
import Skills from "@/components/Skills";

/**
 * Página inicial.
 * Navbar, Footer e contêiner externo são fornecidos pelo Layout.
 */
const Index = () => {
  return (
    <div className="space-y-16">
      <Hero />
      <Projects />
      <Skills />
    </div>
  );
};

export default Index;
