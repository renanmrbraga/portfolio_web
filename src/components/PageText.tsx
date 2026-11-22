import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

// Padrão único para textos de leitura do portfólio.
const bodyClasses =
  "text-base leading-7 text-left md:text-justify hyphens-auto text-gray-700 dark:text-gray-300";

type PageTextProps = {
  children: ReactNode;
  tone?: "default" | "muted";
  className?: string;
};

type PageBulletListProps = {
  items: readonly string[];
};

/**
 * Texto padronizado para páginas internas.
 *
 * Mantém leitura confortável no celular e
 * alinhamento justificado em telas maiores.
 */
export function PageText({ children, tone = "default", className }: PageTextProps) {
  return (
    <p
      className={cn(bodyClasses, tone === "muted" && "text-gray-600 dark:text-gray-300", className)}
    >
      {children}
    </p>
  );
}

/**
 * Lista textual com a mesma tipografia dos parágrafos.
 */
export function PageBulletList({ items }: PageBulletListProps) {
  return (
    <ul className={cn(bodyClasses, "list-disc space-y-3 pl-6")}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
