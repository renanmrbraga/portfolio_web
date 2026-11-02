import { ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "@/components/useLanguage";
import { Button } from "@/components/ui/button";
import { EI_DATABOT_GITHUB, eiDataBotCopy } from "@/content/ei-databot";

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
    <section className="py-16" id="projects">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          {t("projects.title")}
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((project, index) => (
            <AnimatedProjectCard
              key={project.id}
              project={project}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


const AnimatedProjectCard = ({
  project,
  delay
}: {
  project: Project;
  delay: number;
}) => {
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
      className={`h-full project-card-enter ${
        visible ? "project-card-visible" : ""
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <ProjectCard project={project} />
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => (
  <article className="flex h-full flex-col overflow-hidden rounded-xl border transition-all hover:shadow-lg hover:shadow-blue-500/20">
    <div className="flex h-full flex-col p-6">
      <h3 className="mb-2 text-xl font-bold text-blue-700 dark:text-blue-400">
        {project.detailsPath ? (
          <Link
            to={project.detailsPath}
            className="rounded-sm hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {project.title}
          </Link>
        ) : (
          project.title
        )}
      </h3>

      <p className="mb-4 text-gray-700 dark:text-gray-300">{project.description}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto border-t border-gray-200 pt-4 dark:border-gray-700">
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
          <Button asChild size="sm" className="mt-3 w-full bg-blue-600 text-white hover:bg-blue-700">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </a>
          </Button>
        )}
      </div>
    </div>
  </article>
);

export default ProjectsGrid;
