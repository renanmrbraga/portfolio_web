import { ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/components/useLanguage";
import { Button } from "@/components/ui/button";
import { EI_DATABOT_GITHUB, eiDataBotCopy } from "@/content/ei-databot";
import { ShowcaseCard, ShowcaseSection } from "@/components/Showcase";

// Preserva a implementação de demos sem exibir botões enquanto não houver demo ativa.
const SHOW_DEMO = false;

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  detailsPath?: string;
  demoUrl?: string;
};

const ProjectsGrid = () => {
  const { language, t } = useLanguage();
  const dataBot = eiDataBotCopy[language];

  const projects: Project[] = [
    {
      id: "portfolio-web",
      title: t("projects.PortfolioWeb.title"),
      description: t("projects.PortfolioWeb.desc"),
      tags: ["React", "Vite", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/renanmrbraga/portfolio_web"
    },
    {
      id: "ei-databot",
      title: dataBot.title,
      description: dataBot.cardDescription,
      tags: ["Python", "Polars", "Parquet", "PostgreSQL", "JSONB", "FastAPI", "React"],
      githubUrl: EI_DATABOT_GITHUB,
      detailsPath: "/projects/ei-databot"
    }
  ];

  return (
    <ShowcaseSection id="projects" title={t("projects.title")}>
      {projects.map((project, index) => (
        <AnimatedProjectCard key={project.id} project={project} delay={index * 100} />
      ))}
    </ShowcaseSection>
  );
};

const AnimatedProjectCard = ({ project, delay }: { project: Project; delay: number }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`h-full project-card-enter ${visible ? "project-card-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <ProjectCard project={project} />
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => (
  <ShowcaseCard
    title={project.title}
    titleHref={project.detailsPath}
    description={project.description}
    tags={project.tags}
    footer={
      <>
        <Button asChild variant="outline" size="sm" className="w-full">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub: ${project.title}`}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </Button>

        {SHOW_DEMO && project.demoUrl && (
          <Button
            asChild
            size="sm"
            className="mt-3 w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </a>
          </Button>
        )}
      </>
    }
  />
);

export default ProjectsGrid;
