import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { useLanguage } from "@/components/useLanguage";
import { getPageMetadata } from "@/lib/page-metadata";

const SITE_URL = "https://renanmrbraga.vercel.app";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Gerencia os metadados de todas as páginas.
 *
 * O endereço canônico não inclui UTMs nem fragmentos.
 * Páginas inexistentes recebem a diretiva noindex.
 */
export function Seo() {
  const { language, t } = useLanguage();
  const { pathname } = useLocation();

  const isPt = language !== "en";

  // Normaliza barras finais.
  const path = pathname.replace(/\/+$/, "") || "/";

  const metadata = getPageMetadata(path, isPt, t);

  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet htmlAttributes={{ lang: isPt ? "pt-BR" : "en" }}>
      <title>{metadata.title}</title>

      <meta name="description" content={metadata.description} />

      <meta name="author" content="Renan Braga" />

      <meta name="robots" content={metadata.indexable ? "index, follow" : "noindex, follow"} />

      {metadata.indexable && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={metadata.title} />

      <meta property="og:description" content={metadata.description} />

      <meta property="og:type" content="website" />

      {metadata.indexable && <meta property="og:url" content={canonical} />}

      <meta property="og:image" content={OG_IMAGE} />

      <meta property="og:locale" content={isPt ? "pt_BR" : "en_US"} />

      <meta property="og:site_name" content="Renan Braga" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={metadata.title} />

      <meta name="twitter:description" content={metadata.description} />

      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:creator" content="@renanmrbraga" />
    </Helmet>
  );
}
