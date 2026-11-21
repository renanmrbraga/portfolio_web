/**
 * Gerencia a preferência de consentimento para o Google Analytics.
 *
 * O consentimento é negado por padrão.
 * Nenhuma preferência é interpretada como autorização.
 */

const STORAGE_KEY = "portfolio_analytics_consent";

export type AnalyticsConsent = "granted" | "denied" | "unset";

/**
 * Recupera a preferência armazenada.
 *
 * Retorna "unset" quando não existe uma escolha válida
 * ou quando o armazenamento não está disponível.
 */
export function getAnalyticsConsent(): AnalyticsConsent {
  try {
    const value = localStorage.getItem(STORAGE_KEY);

    if (value === "granted" || value === "denied") {
      return value;
    }
  } catch {
    // Falhas de armazenamento não autorizam a coleta.
  }

  return "unset";
}

/**
 * Salva uma decisão explícita do visitante.
 *
 * Não permite persistir "unset" como consentimento.
 */
export function setAnalyticsConsent(consent: "granted" | "denied"): void {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // O site continua funcionando sem armazenamento local.
  }

  window.dispatchEvent(
    new CustomEvent("analytics-consent-change", {
      detail: consent
    })
  );
}

/**
 * Indica se o visitante autorizou a coleta analítica.
 */
export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsent() === "granted";
}
