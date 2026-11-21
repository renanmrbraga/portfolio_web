import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Gera arquivos HTML com metadados individuais.
 *
 * Executado após o build do Vite.
 * Não modifica os componentes React nem o código-fonte HTML.
 */

const DIST_DIR = path.resolve("dist");
const SITE_URL = "https://renanmrbraga.vercel.app";

const pages = [
  {
    route: "/",
    file: "index.html",
    title: "Renan Braga • Portfólio",
    description: "Portfólio profissional de Renan Braga - Analista de Dados."
  },
  {
    route: "/projects/ei-databot",
    file: "_seo/ei-databot.html",
    title: "EI DataBot | Renan Braga",
    description:
      "Plataforma de engenharia e análise de dados educacionais com Python, Polars, PostgreSQL, dashboards e inteligência artificial."
  },
  {
    route: "/contact",
    file: "_seo/contact.html",
    title: "Contato | Renan Braga",
    description:
      "Entre em contato com Renan Braga para projetos, parcerias e oportunidades profissionais."
  },
  {
    route: "/privacy-policy",
    file: "_seo/privacy-policy.html",
    title: "Política de Privacidade | Renan Braga",
    description: "Conheça a Política de Privacidade do portfólio de Renan Braga."
  },
  {
    route: "/terms-of-use",
    file: "_seo/terms-of-use.html",
    title: "Termos de Uso | Renan Braga",
    description: "Consulte os Termos de Uso do portfólio de Renan Braga."
  }
];

/**
 * Substitui uma metatag existente.
 * Interrompe o build se a estrutura esperada não for encontrada.
 */
function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`Metadado não encontrado: ${label}`);
  }

  return html.replace(pattern, replacement);
}

/**
 * Atualiza os metadados do HTML compilado.
 */
function generatePageHtml(template, page) {
  const canonical = `${SITE_URL}${page.route}`;

  const replacements = [
    [/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`, "title"],
    [
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${page.description}" />`,
      "description"
    ],
    [
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${canonical}" />`,
      "canonical"
    ],
    [
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${page.title}" />`,
      "og:title"
    ],
    [
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${page.description}" />`,
      "og:description"
    ],
    [
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${canonical}" />`,
      "og:url"
    ],
    [
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${page.title}" />`,
      "twitter:title"
    ],
    [
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${page.description}" />`,
      "twitter:description"
    ]
  ];

  let html = template;

  for (const [pattern, replacement, label] of replacements) {
    html = replaceTag(html, pattern, replacement, label);
  }

  return html;
}

/**
 * Gera as páginas após o build.
 */
async function main() {
  const templatePath = path.join(DIST_DIR, "index.html");
  const template = await readFile(templatePath, "utf8");

  for (const page of pages) {
    const outputPath = path.join(DIST_DIR, page.file);
    const html = generatePageHtml(template, page);

    await mkdir(path.dirname(outputPath), {
      recursive: true
    });

    await writeFile(outputPath, html, "utf8");

    console.log(`[SEO] Gerado: ${page.file}`);
  }

  console.log("[SEO] Metadados estáticos gerados.");
}

main().catch((error) => {
  console.error("[SEO] Erro:", error);
  process.exitCode = 1;
});
