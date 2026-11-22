import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { PageCard } from "@/components/PageCard";
import { PageContent } from "@/components/PageContent";
import { PageSection } from "@/components/PageSection";
import { cn } from "@/lib/utils";

type ShowcaseSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

type ShowcaseCardProps = {
  title: ReactNode;
  titleHref?: string;
  description?: string;
  tags: readonly string[];
  footer?: ReactNode;
};

type ShowcaseTagsProps = {
  tags: readonly string[];
  className?: string;
};

/** Badges reutilizados em Projetos, Competências e EI DataBot. */
export function ShowcaseTags({ tags, className }: ShowcaseTagsProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 text-sm text-gray-700 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** Centraliza os títulos e os grids da Home. */
export function ShowcaseSection({ id, title, children }: ShowcaseSectionProps) {
  return (
    <PageContent>
      <PageSection id={id} headingId={`${id}-heading`} title={title} align="center">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>
      </PageSection>
    </PageContent>
  );
}

/** Card compartilhado com descrição, links e rodapé opcionais. */
export function ShowcaseCard({ title, titleHref, description, tags, footer }: ShowcaseCardProps) {
  return (
    <PageCard as="article" className="flex h-full flex-col overflow-hidden">
      <div className="flex h-full flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {titleHref ? (
            <Link
              to={titleHref}
              className="rounded-sm text-red-700 transition-colors hover:text-red-800 hover:underline dark:text-red-400 dark:hover:text-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        {description && (
          <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
        )}

        <ShowcaseTags tags={tags} className={footer ? "mb-4" : undefined} />

        {footer && (
          <div className="mt-auto border-t border-gray-200 pt-4 dark:border-gray-700">
            {footer}
          </div>
        )}
      </div>
    </PageCard>
  );
}
