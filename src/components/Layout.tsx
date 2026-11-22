import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Seo } from "@/components/Seo";

type LayoutProps = {
  children: ReactNode;
};

/**
 * Estrutura global do portfólio.
 *
 * Centraliza navegação, SEO, conteúdo e rodapé.
 * Todas as rotas compartilham este layout.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground theme-transition">
      <Seo />

      <Navbar />

      <main className="site-container w-full flex-1 pt-32">{children}</main>

      <div className="site-container-wide mt-16">
        <Footer />
      </div>
    </div>
  );
}
