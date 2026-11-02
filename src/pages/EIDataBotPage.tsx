import { ArrowLeft, Github } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import { useLanguage } from "@/components/useLanguage";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  EI_DATABOT_GITHUB,
  eiDataBotCopy,
  type EIDataBotStatus
} from "@/content/ei-databot";

const PAGE_URL = "https://renanmrbraga.vercel.app/projects/ei-databot";

const EIDataBotPage = () => {
  const { language } = useLanguage();
  const content = eiDataBotCopy[language];

  const statusLabels: Record<EIDataBotStatus, string> = {
    implemented: content.implementedLabel,
    evolving: content.evolvingLabel,
    planned: content.plannedLabel
  };

  return (
    <div className="min-h-screen bg-background text-foreground theme-transition">
      <Helmet>
        <title>{`${content.title} | Renan Martins Braga`}</title>
        <meta name="description" content={content.cardDescription} />
        <meta property="og:title" content={`${content.title} | Renan Martins Braga`} />
        <meta property="og:description" content={content.cardDescription} />
        <meta property="og:url" content={PAGE_URL} />
        <link rel="canonical" href={PAGE_URL} />
      </Helmet>

      <Navbar />

      <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {content.back}
        </Link>

        <header className="mb-12 space-y-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Educational Institution DataBot
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {content.title}
          </h1>
          <h2 className="max-w-3xl text-xl font-medium text-gray-700 dark:text-gray-200">
            {content.headline}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {content.introduction}
          </p>
          <p className="max-w-3xl border-l-2 border-blue-500 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {content.note}
          </p>
          <Button asChild variant="outline">
            <a href={EI_DATABOT_GITHUB} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              {content.github}
            </a>
          </Button>
        </header>

        <section className="mb-14 grid gap-4 sm:grid-cols-3" aria-label="Indicadores do projeto">
          {content.stats.map(({ label, value }) => (
            <div key={label} className="rounded-xl border p-5">
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{value}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {label}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-14" aria-labelledby="architecture-heading">
          <h2 id="architecture-heading" className="mb-6 text-2xl font-bold">
            {content.architectureTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {content.architecture.map(({ title, description, status }) => (
              <article key={title} className="rounded-xl border p-5">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <span className="rounded-full border px-3 py-1 text-xs text-gray-600 dark:text-gray-300">
                    {statusLabels[status]}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="mb-14 grid gap-10 md:grid-cols-2">
          <section aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" className="mb-5 text-2xl font-bold">
              {content.workflowTitle}
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-gray-700 dark:text-gray-300">
              {content.workflow.map((step) => (
                <li key={step} className="pl-1 leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="sources-heading">
            <h2 id="sources-heading" className="mb-5 text-2xl font-bold">
              {content.sourcesTitle}
            </h2>
            <ul className="list-disc space-y-3 pl-5 text-gray-700 dark:text-gray-300">
              {content.sources.map((source) => (
                <li key={source} className="pl-1 leading-relaxed">
                  {source}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mb-14" aria-labelledby="technologies-heading">
          <h2 id="technologies-heading" className="mb-5 text-2xl font-bold">
            {content.technologiesTitle}
          </h2>
          <div className="flex flex-wrap gap-2">
            {content.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded bg-blue-100 px-3 py-1.5 text-sm text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        <section aria-labelledby="roadmap-heading">
          <h2 id="roadmap-heading" className="mb-5 text-2xl font-bold">
            {content.roadmapTitle}
          </h2>
          <ul className="list-disc space-y-3 pl-5 text-gray-700 dark:text-gray-300">
            {content.roadmap.map((item) => (
              <li key={item} className="pl-1 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default EIDataBotPage;
