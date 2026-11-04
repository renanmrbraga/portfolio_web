/**
 * Conteúdo bilíngue do projeto EI DataBot.
 * Indicadores representam uma execução validada da v0.1.0-alpha.1,
 * publicada em 03/11/2026. Não são métricas em tempo real.
 */

export const EI_DATABOT_GITHUB = "https://github.com/renanmrbraga/ei_databot";
export const EI_DATABOT_RELEASE = `${EI_DATABOT_GITHUB}/tree/v0.1.0-alpha.1`;
export const EI_DATABOT_PREVIEW = "/dashboards/mapa-enade.png";

export type EIDataBotStatus = "implemented" | "evolving" | "planned";

type ArchitectureItem = {
  title: string;
  description: string;
  status: EIDataBotStatus;
};

type EIDataBotCopy = {
  title: string;
  category: string;
  version: string;
  cardDescription: string;
  headline: string;
  introduction: string;
  note: string;
  back: string;
  github: string;
  release: string;
  architectureTitle: string;
  technologiesTitle: string;
  sourcesTitle: string;
  workflowTitle: string;
  roadmapTitle: string;
  dashboardTitle: string;
  dashboardDescription: string;
  dashboardCaption: string;
  dashboardAlt: string;
  dashboardFallback: string;
  implementedLabel: string;
  evolvingLabel: string;
  plannedLabel: string;
  statsTitle: string;
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
    category: "Engenharia de Dados · Analytics · IA Aplicada",
    version: "v0.1.0-alpha.1 · 03/11/2026",
    cardDescription:
      "Engenharia de dados educacionais com ETL em Python/Polars, PostgreSQL, modelagem dimensional, dashboards HTML e chatbot com Gemini e RAG. Alpha 1 validada com 2,7 milhões de registros Gold.",
    headline: "Dados educacionais transformados em análises e consultas inteligentes",
    introduction:
      "O EI DataBot integra bases públicas brasileiras, principalmente do INEP e do IBGE/SIDRA, em um fluxo de engenharia de dados que organiza, transforma, modela e disponibiliza indicadores educacionais. A solução reúne dashboards analíticos, API e recursos conversacionais de IA.",
    note:
      "Projeto em versão Alpha, voltado ao desenvolvimento e à validação técnica. Os números destacados refletem uma execução validada; a aplicação não é anunciada como serviço público em produção.",
    back: "Voltar ao portfólio",
    github: "Código no GitHub",
    release: "Código da Alpha 1",
    architectureTitle: "Arquitetura e componentes",
    technologiesTitle: "Tecnologias principais",
    sourcesTitle: "Fontes de dados",
    workflowTitle: "Jornada dos dados",
    roadmapTitle: "Próximas evoluções",
    dashboardTitle: "Dashboard Educação: Mapa do Enade",
    dashboardDescription:
      "Prévia do mapa de conceitos do Enade por município de oferta, com volumes de ingressantes obtidos do Censo da Educação Superior. Os indicadores respeitam recortes e anos-base distintos.",
    dashboardCaption:
      "Captura somente leitura, gerada a partir do HTML local do EI DataBot. A imagem é atualizada ao sincronizar o projeto no computador; a versão pública muda após a próxima publicação do portfólio.",
    dashboardAlt: "Prévia estática da página Mapa do Enade do dashboard Educação",
    dashboardFallback:
      "Prévia ainda não gerada. No computador de desenvolvimento, gere o dashboard Educação e execute npm run sync:enade no portfólio.",
    implementedLabel: "Implementado",
    evolvingLabel: "Em evolução",
    plannedLabel: "Planejado",
    statsTitle: "Resultados validados da Alpha 1",
    stats: [
      { value: "2.702.972", label: "Registros em 10 tabelas Gold no PostgreSQL" },
      { value: "27/27", label: "Etapas concluídas na execução integral do ETL" },
      { value: "5 + 5", label: "Dimensões e tabelas fato na camada Gold" },
      { value: "56", label: "Testes Python aprovados na validação" }
    ],
    architecture: [
      {
        title: "ETL em camadas",
        description:
          "Raw, Bronze, Silver e Gold com Python 3.13, Polars e Parquet. Validações estruturais e preparação de indicadores para análise.",
        status: "implemented"
      },
      {
        title: "PostgreSQL e modelagem dimensional",
        description:
          "Dez tabelas Gold (cinco dimensões e cinco fatos), além dos schemas app para histórico JSONB e rag para recuperação documental com pgvector.",
        status: "implemented"
      },
      {
        title: "Dashboards analíticos",
        description:
          "Geração de relatórios HTML/CSS/JavaScript independentes de conexão contínua ao banco, com rankings, gráficos, mapas e evolução de indicadores.",
        status: "implemented"
      },
      {
        title: "API, chatbot e IA",
        description:
          "Backend FastAPI integrado a serviços de análise, Google Gemini, RAG e persistência de sessões. A homologação funcional completa da integração permanece em evolução.",
        status: "evolving"
      },
      {
        title: "Frontend e infraestrutura",
        description:
          "React, TypeScript, Vite e npm no frontend; Docker Compose para PostgreSQL, API e aplicação no ambiente local.",
        status: "implemented"
      }
    ],
    workflow: [
      "Obtenção e organização de fontes oficiais de educação básica e superior.",
      "Tratamento com Python/Polars em Raw, Bronze, Silver e Gold.",
      "Modelagem dimensional e publicação dos resultados no PostgreSQL.",
      "Exploração em dashboards HTML e serviços analíticos via FastAPI.",
      "Consulta conversacional com Gemini e recuperação de contexto por RAG."
    ],
    sources: [
      "INEP: Censo Escolar e Censo da Educação Superior",
      "INEP: Enade, CPC, IDD e IGC",
      "IBGE / SIDRA: referências territoriais e indicadores complementares"
    ],
    technologies: [
      "Python 3.13", "Polars", "Parquet", "PostgreSQL 17", "SQL", "pgvector",
      "JSONB", "FastAPI", "Gemini", "RAG", "HTML", "CSS", "JavaScript",
      "React", "TypeScript", "Vite", "Docker Compose", "Ruff"
    ],
    roadmap: [
      "Concluir revisões humanas dos documentos do RAG e verificar a sincronização dos embeddings.",
      "Ampliar os testes de integração e a validação funcional do chatbot.",
      "Reforçar autenticação, autorização e segurança antes de qualquer exposição pública da aplicação.",
      "Evoluir os dashboards e acompanhar as dependências da versão Alpha."
    ]
  },
  en: {
    title: "EI DataBot",
    category: "Data Engineering · Analytics · Applied AI",
    version: "v0.1.0-alpha.1 · Nov 3, 2026",
    cardDescription:
      "Educational data engineering with Python/Polars ETL, PostgreSQL, dimensional modeling, HTML dashboards, and a Gemini/RAG chatbot. Alpha 1 validation covered 2.7 million Gold records.",
    headline: "Turning education datasets into analytics and intelligent queries",
    introduction:
      "EI DataBot brings together Brazilian public datasets, primarily from INEP and IBGE/SIDRA, in a data engineering workflow that organizes, transforms, models, and serves education indicators. The solution includes analytical dashboards, an API, and conversational AI capabilities.",
    note:
      "An Alpha-stage project focused on development and technical validation. Featured numbers come from a validated pipeline run; the application is not presented as a publicly deployed production service.",
    back: "Back to portfolio",
    github: "Source code on GitHub",
    release: "Alpha 1 source",
    architectureTitle: "Architecture and components",
    technologiesTitle: "Core technologies",
    sourcesTitle: "Data sources",
    workflowTitle: "Data journey",
    roadmapTitle: "Next improvements",
    dashboardTitle: "Education Dashboard: Enade Map",
    dashboardDescription:
      "Preview of Enade scores mapped by the municipalities offering programs, alongside incoming-student volumes from the Higher Education Census. Indicators follow their respective reference-year definitions.",
    dashboardCaption:
      "Read-only screenshot generated from EI DataBot's local HTML. It refreshes when the projects are synchronized on the development computer; the public version changes after the next portfolio deployment.",
    dashboardAlt: "Static preview of the Enade Map page in the Education Dashboard",
    dashboardFallback:
      "Preview not generated yet. On the development computer, generate the Education dashboard and run npm run sync:enade in the portfolio.",
    implementedLabel: "Implemented",
    evolvingLabel: "Evolving",
    plannedLabel: "Planned",
    statsTitle: "Alpha 1 validated results",
    stats: [
      { value: "2,702,972", label: "Records in ten PostgreSQL Gold tables" },
      { value: "27/27", label: "Stages completed in the full ETL run" },
      { value: "5 + 5", label: "Dimensions and fact tables in the Gold layer" },
      { value: "56", label: "Python tests passed during validation" }
    ],
    architecture: [
      {
        title: "Layered ETL",
        description:
          "Raw, Bronze, Silver, and Gold with Python 3.13, Polars, and Parquet. Structural checks and preparation of analytical metrics.",
        status: "implemented"
      },
      {
        title: "PostgreSQL and dimensional modeling",
        description:
          "Ten Gold tables (five dimensions and five facts), plus app for JSONB-based history and rag for pgvector-backed document retrieval.",
        status: "implemented"
      },
      {
        title: "Analytical dashboards",
        description:
          "HTML/CSS/JavaScript reports that work without continuous database requests, including rankings, charts, maps, and trends.",
        status: "implemented"
      },
      {
        title: "API, chatbot, and AI",
        description:
          "FastAPI backend with analytical services, Google Gemini, RAG, and persistent sessions. Complete functional integration testing is still ongoing.",
        status: "evolving"
      },
      {
        title: "Frontend and infrastructure",
        description:
          "React, TypeScript, Vite, and npm for the frontend; Docker Compose for PostgreSQL, the API, and local application services.",
        status: "implemented"
      }
    ],
    workflow: [
      "Collect and organize official basic and higher education datasets.",
      "Process with Python/Polars through Raw, Bronze, Silver, and Gold.",
      "Model dimensions and facts, then publish to PostgreSQL.",
      "Explore indicators through HTML dashboards and FastAPI services.",
      "Support conversational queries with Gemini and RAG-based context retrieval."
    ],
    sources: [
      "INEP: School Census and Higher Education Census",
      "INEP: Enade, CPC, IDD, and IGC",
      "IBGE / SIDRA: geographic references and supplementary indicators"
    ],
    technologies: [
      "Python 3.13", "Polars", "Parquet", "PostgreSQL 17", "SQL", "pgvector",
      "JSONB", "FastAPI", "Gemini", "RAG", "HTML", "CSS", "JavaScript",
      "React", "TypeScript", "Vite", "Docker Compose", "Ruff"
    ],
    roadmap: [
      "Finish human review of RAG documents and verify embedding synchronization.",
      "Expand integration tests and full chatbot functional validation.",
      "Strengthen authentication, authorization, and security before any public application exposure.",
      "Improve dashboards and monitor Alpha-stage dependencies."
    ]
  }
};
