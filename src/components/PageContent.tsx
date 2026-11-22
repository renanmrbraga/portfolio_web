import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageContentProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "form" | "reading";
};

// Larguras oficiais dos contêineres do portfólio.
const contentWidths = {
  default: "max-w-5xl",
  form: "max-w-2xl",
  reading: "max-w-3xl"
} as const;

/**
 * Contêiner compartilhado.
 *
 * Mantém o conteúdo centralizado na página,
 * com larguras padronizadas conforme a finalidade.
 */
export function PageContent({ children, className, size = "default" }: PageContentProps) {
  return <div className={cn("mx-auto w-full", contentWidths[size], className)}>{children}</div>;
}
