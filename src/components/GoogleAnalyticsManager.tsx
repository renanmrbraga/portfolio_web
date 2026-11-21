import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { getPageMetadata } from "@/lib/page-metadata";
import { useLanguage } from "@/components/useLanguage";
import { hasAnalyticsConsent } from "@/lib/analytics-consent";
import { syncGoogleAnalyticsConsent, trackPageView } from "@/lib/google-analytics";

/**
 * Sincroniza o GA4 com o consentimento e a navegação.
 *
 * Utiliza os metadados do SEO para garantir que cada
 * page_view receba o título correto da página.
 */
export function GoogleAnalyticsManager() {
  const { pathname, search } = useLocation();
  const { language, t } = useLanguage();

  // Última página registrada durante a navegação.
  const lastTrackedPage = useRef<string | null>(null);

  useEffect(() => {
    const syncAndTrack = () => {
      syncGoogleAnalyticsConsent();

      // Sem autorização, não registra eventos.
      if (!hasAnalyticsConsent()) {
        lastTrackedPage.current = null;
        return;
      }

      const pageKey = `${pathname}${search}`;

      // Evita duplicações sem uma nova navegação.
      if (lastTrackedPage.current === pageKey) {
        return;
      }

      // Aplica a mesma normalização utilizada pelo SEO.
      const normalizedPath = pathname.replace(/\/+$/, "") || "/";

      // Reutiliza o título oficial da rota e do idioma.
      const metadata = getPageMetadata(normalizedPath, language !== "en", t);

      trackPageView(pathname, search, metadata.title);

      lastTrackedPage.current = pageKey;
    };

    // Página inicial ou mudança de rota.
    syncAndTrack();

    // Nova decisão de consentimento.
    window.addEventListener("analytics-consent-change", syncAndTrack);

    return () => {
      window.removeEventListener("analytics-consent-change", syncAndTrack);
    };
  }, [pathname, search, language, t]);

  return null;
}
