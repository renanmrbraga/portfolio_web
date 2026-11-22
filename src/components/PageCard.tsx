import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "figure" | "li";
};

/** Superfície visual compartilhada entre páginas e componentes. */
export function PageCard({ children, className, as: Component = "div" }: PageCardProps) {
  return (
    <Component
      className={cn(
        "rounded-xl border bg-transparent transition-all",
        "hover:shadow-lg hover:shadow-black/10",
        className
      )}
    >
      {children}
    </Component>
  );
}
