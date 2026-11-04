// src/components/Seo.tsx
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/components/useLanguage";

export function Seo() {
  const { t } = useLanguage();

  const canonical = "https://renanmrbraga.vercel.app";
  const ogImage = `${canonical}/og-image.png`;

  const lang = t("seo.locale") === "pt_BR" ? "pt" : "en";

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{t("seo.title")}</title>
      <meta name="description" content={t("seo.description")} />
      <meta name="author" content="Renan Braga" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={t("seo.ogTitle")} />
      <meta property="og:description" content={t("seo.ogDescription")} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={t("seo.locale")} />
      <meta property="og:site_name" content="Renan Braga" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t("seo.ogTitle")} />
      <meta name="twitter:description" content={t("seo.ogDescription")} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@renanmrbraga" />
    </Helmet>
  );
}
