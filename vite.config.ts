import { spawn } from "node:child_process";
import { existsSync, watch } from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";

/**
 * Observa o HTML externo do EI DataBot apenas no desenvolvimento local.
 * Não executa ETL nem altera o repositório de origem.
 */
function acompanharMapaEnade(): Plugin {
  return {
    name: "acompanhar-mapa-enade",
    apply: "serve",
    configureServer(server) {
      const caminho = path.resolve(
        __dirname,
        "..",
        "ei_databot",
        "data",
        "educacao",
        "dashboards",
        "educacao.html"
      );
      const pasta = path.dirname(caminho);
      const arquivo = path.basename(caminho).toLowerCase();

      if (!existsSync(pasta)) {
        console.warn(`[ENADE] Pasta de origem ainda não existe: ${pasta}`);
        return;
      }

      let timer: ReturnType<typeof setTimeout> | undefined;
      let executando = false;
      let pendente = false;
      let encerrando = false;

      const sincronizar = () => {
        if (encerrando) return;
        if (executando) {
          pendente = true;
          return;
        }

        executando = true;
        const processo = spawn(
          process.execPath,
          [path.resolve(__dirname, "scripts", "sync-enade.mjs")],
          { cwd: __dirname, stdio: "inherit", windowsHide: true }
        );

        processo.on("error", (erro) => {
          console.error(`[ENADE] Erro ao executar sincronização: ${erro.message}`);
        });
        processo.on("close", (codigo) => {
          executando = false;
          if (pendente) {
            pendente = false;
            sincronizar();
          } else if (codigo === 0 && !encerrando) {
            server.ws.send({ type: "full-reload" });
          }
        });
      };

      const observador = watch(pasta, (_evento, nome) => {
        if (nome && String(nome).toLowerCase() !== arquivo) return;
        if (timer) clearTimeout(timer);
        timer = setTimeout(sincronizar, 900);
      });

      server.httpServer?.once("close", () => {
        encerrando = true;
        if (timer) clearTimeout(timer);
        observador.close();
      });
    }
  };
}

export default defineConfig({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [react(), acompanharMapaEnade()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
