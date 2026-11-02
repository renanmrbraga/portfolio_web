/**
 * Textos oficiais do EI DataBot no portfólio.
 * Mantidos em um único arquivo para evitar divergências entre card e página.
 */

export const EI_DATABOT_GITHUB = "https://github.com/renanmrbraga/ei_databot";

export type EIDataBotStatus = "implemented" | "evolving" | "planned";

type ArchitectureItem = {
  title: string;
  description: string;
  status: EIDataBotStatus;
};

type EIDataBotCopy = {
  title: string;
  cardDescription: string;
  headline: string;
  introduction: string;
  note: string;
  back: string;
  github: string;
  architectureTitle: string;
  technologiesTitle: string;
  sourcesTitle: string;
  workflowTitle: string;
  roadmapTitle: string;
  implementedLabel: string;
  evolvingLabel: string;
  plannedLabel: string;
  stats: { value: string; label: string }[];
  architecture: ArchitectureItem[];
  workflow: string[];
  sources: string[];
  technologies: string[];
  roadmap: string[];
};

export const eiDataBotCopy: Record<"pt" | "en", EIDataBotCopy> = {
  pt: {
    title: "EI DataBot",
    cardDescription:
      "Plataforma de dados educacionais com ETL em Python/Polars, arquitetura Medallion e aproximadamente 2,7 milhões de registros processados. Modelo dimensional com 10 tabelas no PostgreSQL; FastAPI e IA/RAG em evolução.",
    headline: "Engenharia de dados e inteligência analítica para a educação brasileira",
    introduction:
      "O EI DataBot integra dados públicos do IBGE/SIDRA e do INEP em uma base analítica estruturada. O pipeline em Python e Polars prepara dimensões e fatos para consultas, comparativos e visualizações, com PostgreSQL como fonte central de dados.",
    note:
      "O pipeline e a sincronização dos dados estão implementados. A integração da API, das consultas assistidas por LLM e do RAG de metadados e regras de negócio continua em desenvolvimento.",
    back: "Voltar ao portfólio",
    github: "Ver código no GitHub",
    architectureTitle: "Arquitetura e situação atual",
    technologiesTitle: "Tecnologias",
    sourcesTitle: "Fontes oficiais",
    workflowTitle: "Fluxo dos dados",
    roadmapTitle: "Evoluções em andamento",
    implementedLabel: "Implementado",
    evolvingLabel: "Em evolução",
    plannedLabel: "Planejado",
    stats: [
      { value: "~2,7 milhões", label: "Registros processados na etapa reportada" },
      { value: "5 + 5", label: "Dimensões e tabelas fato" },
      { value: "PostgreSQL", label: "Base central para análise e persistência" }
    ],
    architecture: [
      {
        title: "Pipeline Medallion",
        description:
          "Raw, Bronze, Silver e Gold com Python, Polars e Parquet, incluindo normalização, qualidade e modelagem dimensional.",
        status: "implemented"
      },
      {
        title: "Persistência e governança",
        description:
          "Sincronização com PostgreSQL, estruturas relacionais, JSONB, índices GIN, auditoria e controles de alterações.",
        status: "implemented"
      },
      {
        title: "API e interface",
        description:
          "Backend FastAPI e frontend React/TypeScript existentes, com integração e visualizações sendo aperfeiçoadas.",
        status: "evolving"
      },
      {
        title: "Consultas assistidas por LLM",
        description:
          "Interpretação de perguntas e consultas SQL controladas, mantendo os números oficiais no PostgreSQL.",
        status: "evolving"
      },
      {
        title: "RAG de documentação",
        description:
          "Recuperação de metadados, definições e regras de negócio; pgvector é parte da arquitetura-alvo.",
        status: "planned"
      }
    ],
    workflow: [
      "Coleta de dados públicos do IBGE/SIDRA e INEP.",
      "Ingestão e transformação com Polars nas camadas Raw, Bronze, Silver e Gold.",
      "Modelagem dimensional, auditoria e sincronização com PostgreSQL.",
      "Consumo por APIs e dashboards; integração com IA em desenvolvimento."
    ],
    sources: [
      "IBGE / SIDRA: população e indicadores socioeconômicos municipais",
      "INEP / Censo Escolar: educação básica, escolas e matrículas",
      "INEP / Censo da Educação Superior: instituições e cursos",
      "INEP / ENADE, CPC, IDD e IGC: indicadores de qualidade"
    ],
    technologies: [
      "Python",
      "Polars",
      "Parquet",
      "PostgreSQL",
      "SQL",
      "JSONB",
      "FastAPI",
      "React",
      "TypeScript",
      "Vite",
      "Docker"
    ],
    roadmap: [
      "Consolidar agentes e consultas SQL assistidas por LLM.",
      "Incorporar RAG de regras de negócio com PostgreSQL/pgvector.",
      "Integrar dashboards e respostas contextualizadas ao frontend."
    ]
  },
  en: {
    title: "EI DataBot",
    cardDescription:
      "Educational data platform with Python/Polars ETL, Medallion architecture, and approximately 2.7 million processed records. Ten-table dimensional model in PostgreSQL; FastAPI and AI/RAG are in development.",
    headline: "Data engineering and analytics for Brazilian education",
    introduction:
      "EI DataBot integrates public data from IBGE/SIDRA and INEP into a structured analytical database. Its Python and Polars pipeline prepares dimensions and fact tables for queries, comparisons, and visualizations, using PostgreSQL as the central data store.",
    note:
      "The data pipeline and PostgreSQL synchronization are implemented. API integration, LLM-assisted queries, and metadata/business-rule RAG are still under development.",
    back: "Back to portfolio",
    github: "View source on GitHub",
    architectureTitle: "Architecture and implementation status",
    technologiesTitle: "Technologies",
    sourcesTitle: "Official data sources",
    workflowTitle: "Data workflow",
    roadmapTitle: "Ongoing development",
    implementedLabel: "Implemented",
    evolvingLabel: "In progress",
    plannedLabel: "Planned",
    stats: [
      { value: "~2.7 million", label: "Records processed at the reported stage" },
      { value: "5 + 5", label: "Dimensions and fact tables" },
      { value: "PostgreSQL", label: "Central analytical and operational store" }
    ],
    architecture: [
      {
        title: "Medallion pipeline",
        description:
          "Raw, Bronze, Silver, and Gold layers with Python, Polars, and Parquet, covering normalization, quality, and dimensional modeling.",
        status: "implemented"
      },
      {
        title: "Storage and governance",
        description:
          "PostgreSQL synchronization, relational structures, JSONB, GIN indexes, audit trails, and change controls.",
        status: "implemented"
      },
      {
        title: "API and frontend",
        description:
          "Existing FastAPI backend and React/TypeScript frontend, with integrations and visualizations being refined.",
        status: "evolving"
      },
      {
        title: "LLM-assisted queries",
        description:
          "Question interpretation and constrained SQL queries, with official numeric data retained in PostgreSQL.",
        status: "evolving"
      },
      {
        title: "Documentation RAG",
        description:
          "Retrieval of metadata, metric definitions, and business rules; pgvector is part of the target architecture.",
        status: "planned"
      }
    ],
    workflow: [
      "Collect public IBGE/SIDRA and INEP datasets.",
      "Ingest and transform data in Raw, Bronze, Silver, and Gold layers using Polars.",
      "Build dimensional models, audit, and synchronize with PostgreSQL.",
      "Serve APIs and dashboards; AI integration remains under development."
    ],
    sources: [
      "IBGE / SIDRA: municipal population and socioeconomic indicators",
      "INEP / School Census: basic education, schools, and enrollment",
      "INEP / Higher Education Census: institutions and programs",
      "INEP / ENADE, CPC, IDD, and IGC: quality indicators"
    ],
    technologies: [
      "Python",
      "Polars",
      "Parquet",
      "PostgreSQL",
      "SQL",
      "JSONB",
      "FastAPI",
      "React",
      "TypeScript",
      "Vite",
      "Docker"
    ],
    roadmap: [
      "Consolidate agents and LLM-assisted SQL queries.",
      "Add PostgreSQL/pgvector RAG for business rules.",
      "Integrate dashboards and contextual answers into the frontend."
    ]
  }
};
