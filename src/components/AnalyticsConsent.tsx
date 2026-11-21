import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "@/components/useLanguage";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent as ConsentValue
} from "@/lib/analytics-consent";

/**
 * Exibe o aviso quando não existe uma decisão ou quando
 * o visitante solicita a revisão de suas preferências.
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

    const saved = getAnalyticsConsent();

    setConsent(saved);
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
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-700 dark:bg-gray-900 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <h2 className="mb-2 text-base font-semibold text-gray-900 dark:text-gray-100">
            {isEnglish ? "Privacy and analytics" : "Privacidade e análise de visitas"}
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {isEnglish
              ? "This portfolio uses Google Analytics only with your permission to analyze visits and improve the experience. You can decline without affecting navigation."
              : "Este portfólio utiliza o Google Analytics apenas com sua autorização para analisar visitas e melhorar a experiência. Você pode recusar sem prejudicar a navegação."}
          </p>

          <Link
            to="/privacy-policy"
            className="mt-2 inline-block text-sm text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
          >
            {isEnglish ? "Privacy Policy" : "Política de Privacidade"}
          </Link>
        </div>

        <div className="flex shrink-0 gap-2 sm:flex-col">
          <button
            type="button"
            onClick={() => handleChoice("granted")}
            className="flex-1 rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:flex-none"
          >
            {isEnglish ? "Accept" : "Aceitar"}
          </button>

          <button
            type="button"
            onClick={() => handleChoice("denied")}
            className="flex-1 rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 sm:flex-none"
          >
            {isEnglish ? "Decline" : "Recusar"}
          </button>
        </div>
      </div>
    </section>
  );
}
