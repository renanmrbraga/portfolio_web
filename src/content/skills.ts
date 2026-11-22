export const skillLists = {
  pt: {
    etl: [
      "Python",
      "SQL",
      "Polars",
      "Pandas",
      "ETL/ELT",
      "Modelagem Dimensional",
      "PyArrow",
      "Parquet",
      "APIs REST"
    ],
    bi: [
      "Power BI (DAX)",
      "Excel Avançado",
      "Metabase",
      "Streamlit",
      "Plotly",
      "Matplotlib",
      "ECharts"
    ],
    ml: ["Análise Estatística", "Classificação", "Regressão", "Clusterização", "Scikit-learn"],
    ai: ["LLMs", "RAG", "Embeddings", "Engenharia de Prompts"],
    db: ["PostgreSQL (JSONB, pgvector)", "NoSQL", "Docker", "Git", "Cloud"],
    web: ["FastAPI", "JavaScript", "TypeScript", "HTML", "CSS", "PHP"],
    marketing: ["Google Ads", "Meta Ads", "GA4", "GTM"]
  },
  en: {
    etl: [
      "Python",
      "SQL",
      "Polars",
      "Pandas",
      "ETL/ELT",
      "Dimensional Modeling",
      "PyArrow",
      "Parquet",
      "REST APIs"
    ],
    bi: [
      "Power BI (DAX)",
      "Advanced Excel",
      "Metabase",
      "Streamlit",
      "Plotly",
      "Matplotlib",
      "ECharts"
    ],
    ml: ["Statistical Analysis", "Classification", "Regression", "Clustering", "Scikit-learn"],
    ai: ["LLMs", "RAG", "Embeddings", "Prompt Engineering"],
    db: ["PostgreSQL (JSONB, pgvector)", "NoSQL", "Docker", "Git", "Cloud"],
    web: ["FastAPI", "JavaScript", "TypeScript", "HTML", "CSS", "PHP"],
    marketing: ["Google Ads", "Meta Ads", "GA4", "GTM"]
  }
} as const;
