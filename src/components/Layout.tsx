import type { ReactNode } from "react";

import { Seo } from "@/components/Seo";

type LayoutProps = {
  children: ReactNode;
};

/**
 * Layout compartilhado entre as páginas.
 *
 * Centraliza o SEO e mantém a estrutura principal.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Seo />

      <main className="pt-20">{children}</main>
    </>
  );
}
