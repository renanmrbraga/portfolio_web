import type { ReactNode } from "react";

type PageSectionProps = {
  id?: string;
  headingId?: string;
  title: string;
  align?: "start" | "center";
  children: ReactNode;
};

type PageTitleProps = {
  children: ReactNode;
};

/**
 * Título principal das páginas internas.
 */
export function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
      {children}
    </h1>
  );
}

/**
 * Seção reutilizável.
 * Padroniza títulos e espaçamentos internos.
 */
export function PageSection({ id, headingId, title, align = "start", children }: PageSectionProps) {
  const centered = align === "center";

  return (
    <section id={id} aria-labelledby={headingId} className={centered ? "space-y-8" : "space-y-6"}>
      <h2
        id={headingId}
        className={
          centered
            ? "text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl"
            : "text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl"
        }
      >
        {title}
      </h2>

      {children}
    </section>
  );
}
