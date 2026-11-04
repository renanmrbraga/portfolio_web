/**
 * Sincroniza a prévia da página Mapa do Enade.
 *
 * Captura a aba completa, priorizando a visualização Brasil.
 * O dashboard original permanece inalterado.
 *
 * Dependência: playwright-core
 */

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const SOURCE = resolve(
  process.env.EI_DATABOT_DASHBOARD_PATH ||
    join(
      ROOT,
      "..",
      "ei_databot",
      "data",
      "educacao",
      "dashboards",
      "educacao.html",
    ),
);

const DESTINATION = join(
  ROOT,
  "public",
  "dashboards",
  "mapa-enade.png",
);

const HASH_FILE = join(
  ROOT,
  "public",
  "dashboards",
  ".mapa-enade.sha256",
);

const VERSION = "enade-full-page-brasil-v2";
const TIMEOUT = 120_000;

function localizarNavegador() {
  const candidatos = [
    process.env.EDGE_PATH,
    process.env.PROGRAMFILES &&
      join(
        process.env.PROGRAMFILES,
        "Microsoft",
        "Edge",
        "Application",
        "msedge.exe",
      ),
    process.env["PROGRAMFILES(X86)"] &&
      join(
        process.env["PROGRAMFILES(X86)"],
        "Microsoft",
        "Edge",
        "Application",
        "msedge.exe",
      ),
    process.env.LOCALAPPDATA &&
      join(
        process.env.LOCALAPPDATA,
        "Microsoft",
        "Edge",
        "Application",
        "msedge.exe",
      ),
  ];

  return candidatos.find(
    (caminho) => caminho && existsSync(caminho),
  );
}

/**
 * Seleciona o Brasil quando existe um controle reconhecível.
 *
 * Não escolhe uma região diferente caso o controle não exista.
 */
async function selecionarBrasil(pagina) {
  return pagina.evaluate(() => {
    const normalizar = (valor) =>
      String(valor || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();

    const painel = document.querySelector(
      "#page-enade_mapa",
    );

    if (!painel) {
      return {
        encontrado: false,
        motivo: "Página do Enade não encontrada",
      };
    }

    const selects = [
      ...painel.querySelectorAll("select"),
    ];

    for (const select of selects) {
      const opcoes = [...select.options];

      const opcaoBrasil = opcoes.find((opcao) => {
        const texto = normalizar(opcao.textContent);
        const valor = normalizar(opcao.value);

        return (
          texto === "brasil" ||
          texto === "todo o brasil" ||
          texto === "nacional" ||
          valor === "brasil" ||
          valor === "br"
        );
      });

      if (opcaoBrasil) {
        select.value = opcaoBrasil.value;

        select.dispatchEvent(
          new Event("input", { bubbles: true }),
        );

        select.dispatchEvent(
          new Event("change", { bubbles: true }),
        );

        return {
          encontrado: true,
          metodo: "select",
          valor: opcaoBrasil.value,
        };
      }
    }

    const controles = [
      ...painel.querySelectorAll(
        "button, [role='button'], [data-map-view]",
      ),
    ];

    const botaoBrasil = controles.find((controle) => {
      const texto = normalizar(
        controle.textContent ||
        controle.getAttribute("aria-label") ||
        controle.getAttribute("title"),
      );

      const valor = normalizar(
        controle.getAttribute("data-map-view"),
      );

      return (
        texto === "brasil" ||
        texto === "todo o brasil" ||
        texto === "visao brasil" ||
        texto === "visualizar brasil" ||
        valor === "brasil" ||
        valor === "br"
      );
    });

    if (botaoBrasil) {
      botaoBrasil.click();

      return {
        encontrado: true,
        metodo: "botao",
      };
    }

    return {
      encontrado: false,
      motivo: "Controle Brasil não identificado",
    };
  });
}

/**
 * Inspeciona o mapa para identificar SVG e controles ativos.
 * Não considera a presença de um SVG prova de visão nacional.
 */
async function diagnosticarMapa(pagina) {
  return pagina.evaluate(() => {
    const painel = document.querySelector(
      "#enadeMapaPainel",
    );

    if (!painel) {
      return {
        painel: false,
      };
    }

    const svg = painel.querySelector("svg");

    const botoes = [
      ...document.querySelectorAll(
        "#page-enade_mapa button",
      ),
    ]
      .map((botao) => ({
        texto: botao.textContent.trim().slice(0, 70),
        titulo: botao.title || "",
        ativo:
          botao.getAttribute("aria-pressed") === "true" ||
          botao.classList.contains("active"),
      }))
      .filter((botao) => botao.texto || botao.titulo)
      .slice(0, 30);

    return {
      painel: true,
      svg: Boolean(svg),
      viewBox: svg?.getAttribute("viewBox") || null,
      caminhos: painel.querySelectorAll(
        "svg path, svg polygon",
      ).length,
      canvas: painel.querySelectorAll("canvas").length,
      botoes,
    };
  });
}

/**
 * Oculta a navegação geral e preserva a aba do Enade.
 * O ajuste ocorre apenas no navegador temporário.
 */
async function prepararCaptura(pagina) {
  await pagina.addStyleTag({
    content: `
      html,
      body {
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
        background: #f3f6f8 !important;
      }

      .dashboard-nav,
      .dashboard-side-filters,
      .header,
      body > header,
      body > footer,
      #about,
      #toast {
        display: none !important;
      }

      .dashboard-shell,
      .dashboard-content {
        display: block !important;
        width: 100% !important;
        max-width: none !important;
        min-width: 0 !important;
        margin: 0 !important;
      }

      .dashboard-content {
        padding: 24px 32px !important;
      }

      #page-enade_mapa {
        display: block !important;
        position: relative !important;
        width: 100% !important;
        height: auto !important;
        overflow: visible !important;
      }

      #enadeMapaPainel {
        width: 100% !important;
        max-width: none !important;
      }

      #enadeMapaPainel .map-toolbar,
      #enadeMapaPainel .card-buttons,
      #enadeMapaPainel [data-map-zoom] {
        display: none !important;
      }
    `,
  });

  await pagina.evaluate(() => {
    const paginaEnade = document.querySelector(
      "#page-enade_mapa",
    );

    if (!paginaEnade) {
      throw new Error("Página do Enade não encontrada.");
    }

    // Garante que apenas a página selecionada seja capturada.
    const paginas = document.querySelectorAll(
      '[id^="page-"]',
    );

    for (const elemento of paginas) {
      if (elemento !== paginaEnade) {
        elemento.style.setProperty(
          "display",
          "none",
          "important",
        );
      }
    }

    window.scrollTo(0, 0);
  });
}

async function sincronizar() {
  if (!existsSync(SOURCE)) {
    if (existsSync(DESTINATION)) {
      console.log(
        "[ENADE] Origem ausente. Imagem existente mantida.",
      );
      return;
    }

    console.warn("[ENADE] Origem não encontrada.");
    return;
  }

  const navegadorPath = localizarNavegador();

  if (!navegadorPath) {
    throw new Error("Microsoft Edge não encontrado.");
  }

  const bytes = await readFile(SOURCE);
  const html = bytes.toString("utf8");

  if (
    !html.includes('id="dashboard-data"') ||
    !html.includes('data-tab="enade_mapa"')
  ) {
    throw new Error(
      "Estrutura esperada do dashboard não encontrada.",
    );
  }

  const hashAtual = createHash("sha256")
    .update(VERSION)
    .update(bytes)
    .digest("hex");

  const hashAnterior = existsSync(HASH_FILE)
    ? (await readFile(HASH_FILE, "utf8")).trim()
    : "";

  if (
    hashAtual === hashAnterior &&
    existsSync(DESTINATION)
  ) {
    console.log("[ENADE] Prévia já está atualizada.");
    return;
  }

  const pastaTemp = await mkdtemp(
    join(tmpdir(), "portfolio-enade-"),
  );

  const htmlTemp = join(pastaTemp, "dashboard.html");
  const pngTemp = join(pastaTemp, "mapa-enade.png");

  let navegador;

  try {
    await copyFile(SOURCE, htmlTemp);

    navegador = await chromium.launch({
      executablePath: navegadorPath,
      headless: true,
      timeout: 30_000,
    });

    const pagina = await navegador.newPage({
      viewport: {
        width: 1440,
        height: 1000,
      },
      deviceScaleFactor: 1,
    });

    pagina.setDefaultTimeout(TIMEOUT);

    pagina.on("pageerror", (erro) => {
      console.warn(
        `[ENADE] Erro na página: ${erro.message}`,
      );
    });

    await pagina.goto(
      pathToFileURL(htmlTemp).href,
      {
        waitUntil: "domcontentloaded",
        timeout: TIMEOUT,
      },
    );

    const aba = pagina.locator(
      '[data-tab="enade_mapa"]',
    ).first();

    await aba.waitFor({
      state: "attached",
    });

    await aba.click({
      force: true,
    });

    await pagina.waitForFunction(
      () =>
        window.__dashboardDiagnostics?.().aba ===
        "enade_mapa",
      null,
      { timeout: TIMEOUT },
    );

    const painel = pagina.locator(
      "#enadeMapaPainel",
    );

    await painel.waitFor({
      state: "visible",
    });

    await pagina.waitForFunction(
      () => {
        const mapa = document.querySelector(
          "#enadeMapaPainel",
        );

        return (
          mapa &&
          mapa.querySelectorAll(
            "svg path, svg polygon, canvas",
          ).length > 0
        );
      },
      null,
      { timeout: TIMEOUT },
    );

    const selecao = await selecionarBrasil(pagina);

    console.log(
      `[ENADE] Seleção geográfica: ${JSON.stringify(selecao)}`,
    );

    // Não publica uma imagem sem confirmação da visão Brasil.
    if (!selecao.encontrado) {
      const diagnostico = await diagnosticarMapa(pagina);

      console.log(
        "[ENADE] Diagnóstico do mapa:",
        JSON.stringify(diagnostico, null, 2),
      );

      throw new Error(
        "Não foi possível identificar o controle Brasil. " +
        "A imagem anterior foi preservada.",
      );
    }

    await pagina.waitForTimeout(1200);

    await prepararCaptura(pagina);

    await pagina.evaluate(
      () => new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      }),
    );

    const paginaEnade = pagina.locator(
      "#page-enade_mapa",
    );

    await paginaEnade.screenshot({
      path: pngTemp,
      animations: "disabled",
      timeout: TIMEOUT,
    });

    const imagem = await readFile(pngTemp);

    const assinaturaPng = Buffer.from(
      "89504e470d0a1a0a",
      "hex",
    );

    if (
      imagem.length < 5_000 ||
      !imagem.subarray(0, 8).equals(assinaturaPng)
    ) {
      throw new Error(
        "Captura inválida. Imagem anterior preservada.",
      );
    }

    await mkdir(dirname(DESTINATION), {
      recursive: true,
    });

    const destinoTemporario = `${DESTINATION}.tmp`;

    await writeFile(destinoTemporario, imagem);

    try {
      await rename(destinoTemporario, DESTINATION);
    } catch (erro) {
      if (
        process.platform !== "win32" ||
        !["EPERM", "EEXIST", "EACCES"].includes(erro.code)
      ) {
        throw erro;
      }

      // No Windows, a substituição por rename pode ser bloqueada.
      // Tenta copiar sobre o destino sem apagá-lo previamente.
      await copyFile(destinoTemporario, DESTINATION);
      await rm(destinoTemporario, { force: true });
    }

    await writeFile(
      HASH_FILE,
      `${hashAtual}\n`,
      "utf8",
    );

    const tamanho = await stat(DESTINATION);

    console.log(
      `[ENADE] Página completa sincronizada: ${DESTINATION}`,
    );

    console.log(
      `[ENADE] Tamanho: ${(tamanho.size / 1024).toFixed(0)} KiB`,
    );
  } finally {
    await navegador?.close();

    await rm(pastaTemp, {
      recursive: true,
      force: true,
      maxRetries: 3,
      retryDelay: 200,
    });
  }
}

sincronizar().catch((erro) => {
  console.error(
    `[ENADE] Falha: ${erro.stack || erro.message}`,
  );

  process.exitCode = 1;
});
