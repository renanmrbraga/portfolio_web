import { useState } from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/components/useLanguage";
import { Button } from "@/components/ui/button";
import { EI_DATABOT_GITHUB, EI_DATABOT_PREVIEW, EI_DATABOT_RELEASE } from "@/content/ei-databot";

const PAGE_URL = "https://renanmrbraga.vercel.app/projects/ei-databot";

type Language = "pt" | "en";
type Status = "validated" | "implemented" | "limited" | "pending";

type Feature = {
  title: string;
  description: string;
  status: Status;
};

type PageContent = {
  back: string;
  category: string;
  title: string;
  version: string;
  headline: string;
  introduction: string;
  note: string;
  github: string;
  release: string;
  statsTitle: string;
  statsNote: string;
  stats: { value: string; label: string }[];
  dashboardTitle: string;
  dashboardDescription: string;
  dashboardAlt: string;
  dashboardFallback: string;
  dashboardCaption: string;
  architectureTitle: string;
  architectureDescription: string;
  architecture: string[];
  featuresTitle: string;
  features: Feature[];
  statusLabels: Record<Status, string>;
  chatbotTitle: string;
  chatbotDescription: string;
  indicators: { code: string; name: string; period: string }[];
  chatbotLimitations: string;
  ragTitle: string;
  ragDescription: string;
  ragNote: string;
  sourcesTitle: string;
  sources: string[];
  technologiesTitle: string;
  technologies: string[];
  roadmapTitle: string;
  roadmap: string[];
  securityTitle: string;
  securityDescription: string;
};

const pageCopy: Record<Language, PageContent> = {
  pt: {
    back: "Voltar ao portfólio",
    category: "Engenharia de Dados · Analytics · IA Aplicada",
    title: "EI DataBot",
    version: "v0.1.0-alpha.1 · Referência: 03/11/2026",
    headline: "Da engenharia de dados à consulta analítica com IA",
    introduction:
      "Plataforma experimental que integra dados públicos do INEP e do IBGE/SIDRA. " +
      "Um pipeline Raw → Bronze → Silver → Gold prepara dados analíticos em Parquet e PostgreSQL. " +
      "Dashboards independentes exploram a camada Gold, enquanto um chatbot React consulta uma API FastAPI " +
      "com interpretação Gemini, SQL autorizado e contexto documental recuperado por RAG.",
    note:
      "Alpha 1 em desenvolvimento local. Os resultados e as verificações apresentados correspondem " +
      "a execuções registradas, não à disponibilidade contínua de um serviço em produção. " +
      "A aplicação não está preparada para exposição pública sem controles de acesso.",
    github: "Repositório no GitHub",
    release: "Código da Alpha 1",
    statsTitle: "Resultados validados da Alpha 1",
    statsNote: "Números da última execução; não são métricas em tempo real.",
    stats: [
      { value: "2.702.972", label: "Registros publicados nas 10 tabelas Gold do PostgreSQL" },
      { value: "27/27", label: "Etapas concluídas na execução integral do ETL educacional" },
      { value: "5 + 5", label: "Dimensões e tabelas fato na camada Gold" },
      { value: "151", label: "Fragmentos RAG ativos, provenientes de 5 documentos elegíveis" }
    ],
    dashboardTitle: "Dashboard Educação · Mapa do Enade",
    dashboardDescription:
      "Prévia da sétima página do dashboard Educação. O mapa mostra conceitos Enade por município " +
      "de oferta e dimensiona as bolhas com ingressantes históricos do Censo da Educação Superior. " +
      "Os recortes e os anos-base das duas fontes podem ser diferentes.",
    dashboardAlt:
      "Página completa do Mapa do Enade, com visão do Brasil, indicadores, ranking municipal e gráficos",
    dashboardFallback: "A prévia estática do dashboard ainda não está disponível nesta publicação.",
    dashboardCaption:
      "Captura estática do dashboard Educação em desenvolvimento, gerada a partir dos arquivos Parquet Gold. " +
      "Indicadores e critérios de filtragem sujeitos a revisão.",
    architectureTitle: "Arquitetura e fluxo de dados",
    architectureDescription:
      "Os fluxos abaixo representam componentes conectados, não uma execução linear única. " +
      "O chatbot consulta o PostgreSQL, enquanto os dashboards usam Parquet Gold.",
    architecture: [
      "INEP e IBGE/SIDRA → Raw → Bronze → Silver → Gold em Parquet",
      "Gold → PostgreSQL (schema gold) → consultas parametrizadas pela API FastAPI",
      "Gold em Parquet → dashboards HTML/CSS/JavaScript independentes",
      "Documentos de negócio → indexação incremental → PostgreSQL (rag / pgvector)",
      "React/TypeScript → FastAPI → Gemini + validação Python + RAG + histórico (app / JSONB)"
    ],
    featuresTitle: "Componentes e estágio de implementação",
    features: [
      {
        title: "ETL Medallion e qualidade de dados",
        description:
          "Pipeline Python 3.13/Polars, armazenamento Parquet, orquestração e publicação Gold. " +
          "Uma execução completa concluiu 27 etapas.",
        status: "validated"
      },
      {
        title: "PostgreSQL e modelagem dimensional",
        description:
          "Schema gold com cinco dimensões e cinco fatos; schema rag com documentos e vetores; " +
          "schema app com sessões UUID e mensagens em JSONB.",
        status: "validated"
      },
      {
        title: "Dashboards educacionais",
        description:
          "Dashboards em desenvolvimento, gerados a partir dos dados Gold em Parquet, " +
          "sem depender de conexão contínua ao PostgreSQL. Já incluem indicadores, " +
          "mapas, rankings e gráficos, mas ainda passam por melhorias e validação funcional.",
        status: "limited"
      },
      {
        title: "API e chatbot analítico",
        description:
          "Integração funcional entre FastAPI, Gemini, PostgreSQL e RAG, " +
          "com consultas SQL controladas. A capacidade conversacional " +
          "ainda é limitada, com poucos indicadores disponíveis e " +
          "necessidade de ampliar a interpretação de perguntas, " +
          "os testes e a validação funcional.",
        status: "limited"
      },
      {
        title: "RAG documental incremental",
        description:
          "Cinco documentos elegíveis e 151 fragmentos ativos na última conferência. " +
          "Embeddings pgvector com cache e atualização incremental; revisão manual ainda pendente.",
        status: "limited"
      },
      {
        title: "Segurança e disponibilização pública",
        description:
          "Autenticação, autorização por identidade, isolamento de sessões, rate limiting e " +
          "política de retenção ainda não estão concluídos ou validados.",
        status: "pending"
      }
    ],
    statusLabels: {
      validated: "Validado",
      implemented: "Implementado",
      limited: "Com ressalvas",
      pending: "Pendente"
    },
    chatbotTitle: "O que o chatbot consulta nesta Alpha",
    chatbotDescription:
      "A LLM interpreta a solicitação e explica resultados, mas não gera SQL livre nem fornece os números. " +
      "A aplicação valida indicadores, geografia, período e operação antes de executar consultas autorizadas.",
    indicators: [
      { code: "CAT-EB-001", name: "Matrículas da educação básica", period: "2018–2025" },
      { code: "CAT-ES-023", name: "Matrículas da educação superior", period: "2018–2024" }
    ],
    chatbotLimitations:
      "Operações habilitadas: soma e série anual. Por enquanto, não há comparação direta de dois municípios " +
      "em uma solicitação, geração de gráficos ou arquivos pelo chatbot, nem liberação automática " +
      "de todos os indicadores documentados. Consultas municipais exigem UF.",
    ragTitle: "Contexto metodológico por RAG",
    ragDescription:
      "Cinco documentos de regras educacionais participam da indexação incremental. " +
      "Na última verificação, havia 151 fragmentos ativos e nenhuma pendência no dry-run. " +
      "A recuperação usa pgvector e embeddings gemini-embedding-001 de 768 dimensões.",
    ragNote:
      "A sincronização não significa aprovação das regras: a revisão segue pendente. " +
      "O RAG não concede permissões para consultas SQL.",
    sourcesTitle: "Fontes e regras de interpretação",
    sources: [
      "INEP: Censo Escolar e Censo da Educação Superior",
      "INEP: Enade, CPC, IDD e IGC",
      "IBGE/SIDRA: referências territoriais e indicadores complementares",
      "Regras documentadas de granularidade, EAD, séries históricas e anos-base"
    ],
    technologiesTitle: "Tecnologias principais",
    technologies: [
      "Python 3.13",
      "Polars",
      "Parquet",
      "PostgreSQL",
      "SQL",
      "pgvector",
      "JSONB",
      "FastAPI",
      "Gemini",
      "RAG",
      "React",
      "TypeScript",
      "Vite",
      "HTML",
      "CSS",
      "JavaScript",
      "Docker Compose",
      "Ruff"
    ],
    roadmapTitle: "Próximas evoluções",
    roadmap: [
      "Concluir a revisão das regras documentais e validar a recuperação RAG.",
      "Ampliar os testes funcionais: séries, educação superior/EAD, geografia e ausência de dados.",
      "Implementar autenticação, autorização, isolamento de sessões e demais controles de segurança.",
      "Auditar dependências, credenciais, privilégios PostgreSQL e histórico do Git antes de publicar.",
      "Expandir o catálogo de indicadores e evoluir os dashboards e a experiência conversacional."
    ],
    securityTitle: "Estado de disponibilização",
    securityDescription:
      "Esta Alpha é uma demonstração técnica em desenvolvimento local. O frontend e a API não devem " +
      "ser tratados como serviço público: o UUID da sessão não é controle de acesso e a integração " +
      "com Gemini depende de um serviço externo sujeito a cotas e indisponibilidade."
  },
  en: {
    back: "Back to portfolio",
    category: "Data Engineering · Analytics · Applied AI",
    title: "EI DataBot",
    version: "v0.1.0-alpha.1 · Reference: Nov 3, 2026",
    headline: "From education data engineering to AI-assisted analytics",
    introduction:
      "An experimental platform integrating public data from Brazil's INEP and IBGE/SIDRA. " +
      "A Raw → Bronze → Silver → Gold pipeline prepares analytical data in Parquet and PostgreSQL. " +
      "Standalone dashboards explore the Gold layer, while a React chatbot uses FastAPI, " +
      "Gemini-based interpretation, authorized SQL, and document context retrieved through RAG.",
    note:
      "Alpha 1 is under local development. Reported figures and checks come from recorded validation " +
      "runs, not a continuously available production service. The application is not ready for public access.",
    github: "GitHub repository",
    release: "Alpha 1 source code",
    statsTitle: "Alpha 1 validated results",
    statsNote: "Figures from the last validated run during refactoring, not live metrics.",
    stats: [
      { value: "2,702,972", label: "Records published across 10 PostgreSQL Gold tables" },
      { value: "27/27", label: "Steps completed in the full education ETL run" },
      { value: "5 + 5", label: "Dimension and fact tables in the Gold layer" },
      { value: "151", label: "Active RAG chunks from 5 eligible documents" }
    ],
    dashboardTitle: "Education dashboard · Enade Map",
    dashboardDescription:
      "Preview of the seventh page of the Education dashboard. The map colors Brazilian municipalities " +
      "by Enade assessment concepts and sizes bubbles using historical entrants from the Higher Education Census. " +
      "The two sources may use different reference years and analytical scopes.",
    dashboardAlt: "Full Enade Map page showing Brazil, key figures, municipal ranking, and charts",
    dashboardFallback: "The static dashboard preview is not available in this release.",
    dashboardCaption:
      "Static capture of the Education dashboard under development, generated from Gold Parquet files. " +
      "Indicators and filtering criteria are subject to review.",
    architectureTitle: "Architecture and data flow",
    architectureDescription:
      "These are interconnected flows, not a single sequential pipeline. " +
      "The chatbot queries PostgreSQL, while dashboards use Gold Parquet files.",
    architecture: [
      "INEP and IBGE/SIDRA → Raw → Bronze → Silver → Gold in Parquet",
      "Gold → PostgreSQL (gold schema) → parameterized FastAPI queries",
      "Gold Parquet → standalone HTML/CSS/JavaScript dashboards",
      "Business documents → incremental indexing → PostgreSQL (rag / pgvector)",
      "React/TypeScript → FastAPI → Gemini + Python validation + RAG + history (app / JSONB)"
    ],
    featuresTitle: "Components and implementation status",
    features: [
      {
        title: "Medallion ETL and data quality",
        description:
          "Python 3.13/Polars pipeline, Parquet storage, orchestration, and Gold publication. " +
          "A complete validated run finished 27 steps.",
        status: "validated"
      },
      {
        title: "PostgreSQL and dimensional modeling",
        description:
          "The gold schema has five dimensions and five facts; rag stores documents and vectors; " +
          "app holds UUID sessions and JSONB messages.",
        status: "validated"
      },
      {
        title: "Education dashboards",
        description:
          "Dashboards under development, built from Gold Parquet data without requiring " +
          "a persistent PostgreSQL connection. They already include indicators, maps, " +
          "rankings, and charts, but further improvements and functional validation are ongoing.",
        status: "limited"
      },
      {
        title: "Analytical API and chatbot",
        description:
          "Functional integration between FastAPI, Gemini, PostgreSQL, and RAG, " +
          "with controlled SQL queries. Conversational capabilities remain limited, " +
          "with only a few available indicators; question interpretation, " +
          "testing, and functional validation still need improvement.",
        status: "limited"
      },
      {
        title: "Incremental document RAG",
        description:
          "Five eligible documents and 151 active chunks at the last review. " +
          "pgvector embeddings use caching and incremental updates; review remains pending.",
        status: "limited"
      },
      {
        title: "Security and public availability",
        description:
          "Identity-based authentication and authorization, session isolation, rate limiting, " +
          "and retention controls have not yet been completed or validated.",
        status: "pending"
      }
    ],
    statusLabels: {
      validated: "Validated",
      implemented: "Implemented",
      limited: "With caveats",
      pending: "Pending"
    },
    chatbotTitle: "What the chatbot can query in this Alpha",
    chatbotDescription:
      "The LLM interprets requests and explains results, but does not generate unrestricted SQL or source " +
      "the numbers. The application validates indicators, geography, periods, and operations before queries.",
    indicators: [
      { code: "CAT-EB-001", name: "Basic education enrollments", period: "2018–2025" },
      { code: "CAT-ES-023", name: "Higher education enrollments", period: "2018–2024" }
    ],
    chatbotLimitations:
      "Enabled operations: annual sum and annual series. Direct comparison of two municipalities in " +
      "one request, chart/file generation, and automatic access to every documented indicator " +
      "are not yet supported. Municipality requests require a state abbreviation.",
    ragTitle: "Methodological context through RAG",
    ragDescription:
      "Five education-rule documents participate in incremental indexing. At the last verification, " +
      "151 chunks were active and the dry-run reported no outstanding synchronization work. " +
      "Retrieval uses pgvector and 768-dimensional gemini-embedding-001 embeddings.",
    ragNote:
      "Synchronization does not mean the rules have been approved: document review is still " +
      "pending. RAG never grants SQL permissions.",
    sourcesTitle: "Sources and interpretation rules",
    sources: [
      "INEP: School Census and Higher Education Census",
      "INEP: Enade, CPC, IDD, and IGC",
      "IBGE/SIDRA: territorial references and supplementary indicators",
      "Documented rules on granularity, distance learning, time series, and reference years"
    ],
    technologiesTitle: "Core technologies",
    technologies: [
      "Python 3.13",
      "Polars",
      "Parquet",
      "PostgreSQL",
      "SQL",
      "pgvector",
      "JSONB",
      "FastAPI",
      "Gemini",
      "RAG",
      "React",
      "TypeScript",
      "Vite",
      "HTML",
      "CSS",
      "JavaScript",
      "Docker Compose",
      "Ruff"
    ],
    roadmapTitle: "Next steps",
    roadmap: [
      "Finish review of business rules and validate RAG retrieval.",
      "Expand functional tests for time series, higher education, geography, and missing data.",
      "Implement identity-based authentication, authorization, session isolation, and security controls.",
      "Audit dependencies, secrets, PostgreSQL privileges, and Git history before deployment.",
      "Expand the indicator catalog and improve dashboards and the conversational experience."
    ],
    securityTitle: "Availability status",
    securityDescription:
      "This Alpha is a technical demonstration under local development. Neither the frontend nor API " +
      "should be treated as a public service: session UUIDs are not access controls, and Gemini " +
      "is an external service with usage quotas and possible outages."
  }
};

/** Presents Alpha 1 capabilities and limitations without implying production readiness. */
const EIDataBotPage = () => {
  const { language } = useLanguage();
  const content = pageCopy[language === "en" ? "en" : "pt"];
  const [previewAvailable, setPreviewAvailable] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground theme-transition">
      <Helmet htmlAttributes={{ lang: language === "pt" ? "pt-BR" : "en" }}>
        <title>{`${content.title} | Renan Braga`}</title>
        <meta name="description" content={content.introduction} />
        <meta property="og:title" content={`${content.title} | Renan Braga`} />
        <meta property="og:description" content={content.introduction} />
        <meta property="og:url" content={PAGE_URL} />
        <link rel="canonical" href={PAGE_URL} />
      </Helmet>

      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" />
          {content.back}
        </Link>

        <header className="mb-12 space-y-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {content.category}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {content.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{content.version}</p>
          <h2 className="max-w-3xl text-xl font-medium text-gray-700 dark:text-gray-200">
            {content.headline}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {content.introduction}
          </p>
          <p className="max-w-3xl border-l-2 border-blue-500 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {content.note}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href={EI_DATABOT_GITHUB} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                {content.github}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={EI_DATABOT_RELEASE} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                {content.release}
              </a>
            </Button>
          </div>
        </header>

        <section className="mb-14" aria-labelledby="results-heading">
          <h2 id="results-heading" className="mb-2 text-2xl font-bold">
            {content.statsTitle}
          </h2>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">{content.statsNote}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.stats.map(({ label, value }) => (
              <div key={label} className="rounded-xl border p-5">
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{value}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14" aria-labelledby="dashboard-heading">
          <h2 id="dashboard-heading" className="mb-4 text-2xl font-bold">
            {content.dashboardTitle}
          </h2>
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {content.dashboardDescription}
          </p>
          <figure className="overflow-hidden rounded-xl border bg-gray-50 dark:bg-gray-900">
            {previewAvailable ? (
              <a
                href={EI_DATABOT_PREVIEW}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={content.dashboardAlt}
                className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <img
                  src={EI_DATABOT_PREVIEW}
                  alt={content.dashboardAlt}
                  className="block h-auto w-full"
                  loading="lazy"
                  decoding="async"
                  onError={() => setPreviewAvailable(false)}
                />
              </a>
            ) : (
              <p className="px-6 py-12 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {content.dashboardFallback}
              </p>
            )}
            <figcaption className="border-t px-5 py-4 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
              {content.dashboardCaption}
            </figcaption>
          </figure>
        </section>

        <section className="mb-14" aria-labelledby="architecture-heading">
          <h2 id="architecture-heading" className="mb-2 text-2xl font-bold">
            {content.architectureTitle}
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {content.architectureDescription}
          </p>
          <ol className="space-y-3">
            {content.architecture.map((step, index) => (
              <li key={step} className="flex items-start gap-3 rounded-lg border p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14" aria-labelledby="components-heading">
          <h2 id="components-heading" className="mb-6 text-2xl font-bold">
            {content.featuresTitle}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {content.features.map(({ title, description, status }) => (
              <article key={title} className="rounded-xl border p-5">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <span className="rounded-full border px-3 py-1 text-xs text-gray-600 dark:text-gray-300">
                    {content.statusLabels[status]}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14" aria-labelledby="chatbot-heading">
          <h2 id="chatbot-heading" className="mb-4 text-2xl font-bold">
            {content.chatbotTitle}
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {content.chatbotDescription}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.indicators.map(({ code, name, period }) => (
              <article key={code} className="rounded-xl border p-5">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">{code}</p>
                <h3 className="mt-2 font-semibold">{name}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{period}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 border-l-2 border-amber-500 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {content.chatbotLimitations}
          </p>
        </section>

        <section className="mb-14" aria-labelledby="rag-heading">
          <h2 id="rag-heading" className="mb-4 text-2xl font-bold">
            {content.ragTitle}
          </h2>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {content.ragDescription}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {content.ragNote}
          </p>
        </section>

        <section className="mb-14" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="mb-5 text-2xl font-bold">
            {content.sourcesTitle}
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {content.sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </section>

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

        <section className="mb-14" aria-labelledby="roadmap-heading">
          <h2 id="roadmap-heading" className="mb-5 text-2xl font-bold">
            {content.roadmapTitle}
          </h2>
          <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {content.roadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="security-heading">
          <h2 id="security-heading" className="mb-4 text-2xl font-bold">
            {content.securityTitle}
          </h2>
          <p className="border-l-2 border-blue-500 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {content.securityDescription}
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EIDataBotPage;
