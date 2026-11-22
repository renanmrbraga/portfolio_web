import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/useLanguage";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent as ConsentValue
} from "@/lib/analytics-consent";

/**
 * Exibe o aviso de consentimento ou permite revisar
 * as preferências de privacidade do visitante.
 */
export function AnalyticsConsent() {
  const { language } = useLanguage();

  const [consent, setConsent] = useState<ConsentValue>(getAnalyticsConsent);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openPreferences = () => {
      setConsent(getAnalyticsConsent());
      setIsOpen(true);
    };

    window.addEventListener("analytics-consent-open", openPreferences);

    return () => {
      window.removeEventListener("analytics-consent-open", openPreferences);
    };
  }, []);

  const handleChoice = (choice: "granted" | "denied") => {
    setAnalyticsConsent(choice);
    setConsent(getAnalyticsConsent());
    setIsOpen(false);
  };

  if (consent !== "unset" && !isOpen) {
    return null;
  }

  const isEnglish = language === "en";

  return (
    <section
      role="region"
      aria-label={isEnglish ? "Privacy preferences" : "Preferências de privacidade"}
      className="
        fixed inset-x-4 bottom-4 z-[100]
        mx-auto w-auto max-w-3xl
        rounded-xl border border-border
        bg-background p-5
        text-foreground shadow-xl
        transition-colors
        sm:p-6
      "
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <h2 className="mb-2 text-base font-bold text-foreground">
            {isEnglish ? "Privacy and analytics" : "Privacidade e análise de visitas"}
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {isEnglish
              ? "This portfolio uses Google Analytics only with your permission to analyze visits and improve the experience. You can decline without affecting navigation."
              : "Este portfólio utiliza o Google Analytics apenas com sua autorização para analisar visitas e melhorar a experiência. Você pode recusar sem prejudicar a navegação."}
          </p>

          <Link
            to="/privacy-policy"
            className="
              mt-2 inline-block
              rounded-sm text-sm
              text-red-700
              underline-offset-2
              transition-colors
              hover:text-red-800
              hover:underline
              dark:text-red-400
              dark:hover:text-red-300
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-4
            "
          >
            {isEnglish ? "Privacy Policy" : "Política de Privacidade"}
          </Link>
        </div>

        <div className="flex shrink-0 gap-2 sm:flex-col">
          <Button
            type="button"
            onClick={() => handleChoice("granted")}
            className="flex-1 bg-red-700 text-white hover:bg-red-800 sm:flex-none"
          >
            {isEnglish ? "Accept" : "Aceitar"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleChoice("denied")}
            className="flex-1 sm:flex-none"
          >
            {isEnglish ? "Decline" : "Recusar"}
          </Button>
        </div>
      </div>
    </section>
  );
}
