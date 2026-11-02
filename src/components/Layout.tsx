// src/components/Layout.tsx
import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Seo } from "./Seo";
import { useLanguage } from "./useLanguage";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { t } = useLanguage();

  return (
    <>
      <Helmet htmlAttributes={{ lang: t("seo.locale") === "pt_BR" ? "pt" : "en" }} />
      <Seo />
      <main className="pt-20">{children}</main>
    </>
  );
}
