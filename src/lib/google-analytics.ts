import { hasAnalyticsConsent } from "@/lib/analytics-consent";

/**
 * Integração do Google Analytics 4.
 *
 * A tag só é carregada após consentimento válido.
 * A coleta pode ser desativada sem recarregar a página.
 */

const MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? "").trim();

const SCRIPT_ID = "google-analytics-script";

/**
 * Permite a coleta analítica somente no domínio oficial.
 * Exclui localhost e ambientes de preview.
 */
const ALLOWED_HOSTNAMES = new Set(["renanmrbraga.vercel.app"]);

function isAllowedHostname(): boolean {
  return ALLOWED_HOSTNAMES.has(window.location.hostname);
}

type GtagArguments = IArguments;

type AnalyticsWindow = Window & {
  dataLayer?: GtagArguments[];
  gtag?: (...args: unknown[]) => void;
};

let initialized = false;

/**
 * Confirma que o ID possui o formato esperado.
 */
function hasValidMeasurementId(): boolean {
  return /^G-[A-Z0-9]+$/.test(MEASUREMENT_ID);
}

/**
 * Define o bloqueio de envio documentado pelo Google.
 */
function setAnalyticsDisabled(disabled: boolean): void {
  if (!hasValidMeasurementId()) {
    return;
  }

  const globalWindow = window as unknown as Record<string, unknown>;

  globalWindow[`ga-disable-${MEASUREMENT_ID}`] = disabled;
}

/**
 * Inicializa a camada de dados no formato oficial do Google Tag.
 */
function initializeDataLayer(): void {
  const analyticsWindow = window as AnalyticsWindow;

  analyticsWindow.dataLayer ??= [];

  analyticsWindow.gtag ??= function () {
    // O Google Tag utiliza o objeto nativo "arguments".
    // eslint-disable-next-line prefer-rest-params
    analyticsWindow.dataLayer?.push(arguments);
  };
}

/**
 * Inicializa o GA4 somente no domínio oficial e após consentimento.
 *
 * Desativa o page_view automático para evitar duplicações.
 * O React Router controla manualmente as visualizações de página.
 */
export function initializeGoogleAnalytics(): void {
  if (!isAllowedHostname() || !hasValidMeasurementId() || !hasAnalyticsConsent()) {
    return;
  }

  setAnalyticsDisabled(false);
  initializeDataLayer();

  const analyticsWindow = window as AnalyticsWindow;

  if (initialized) {
    analyticsWindow.gtag?.("consent", "update", {
      analytics_storage: "granted"
    });

    return;
  }

  analyticsWindow.gtag?.("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });

  analyticsWindow.gtag?.("consent", "update", {
    analytics_storage: "granted"
  });

  analyticsWindow.gtag?.("js", new Date());

  // Desativa a geração automática de page_view globalmente.
  analyticsWindow.gtag?.("set", "send_page_view", false);

  // Mantém a desativação específica para este fluxo GA4.
  analyticsWindow.gtag?.("config", MEASUREMENT_ID, {
    send_page_view: false
  });

  const script = document.createElement("script");

  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;

  document.head.appendChild(script);

  initialized = true;
}

/**
 * Interrompe novos envios após a revogação.
 *
 * O arquivo JavaScript já carregado não é removido,
 * mas a propriedade de bloqueio impede novos envios.
 */
export function disableGoogleAnalytics(): void {
  setAnalyticsDisabled(true);

  if (!initialized) {
    return;
  }

  const analyticsWindow = window as AnalyticsWindow;

  analyticsWindow.gtag?.("consent", "update", {
    analytics_storage: "denied"
  });
}

/**
 * Sincroniza a tag com o consentimento armazenado.
 */
export function syncGoogleAnalyticsConsent(): void {
  if (hasAnalyticsConsent()) {
    initializeGoogleAnalytics();
    return;
  }

  disableGoogleAnalytics();
}

/**
 * Registra uma visualização de página autorizada.
 *
 * Preserva apenas as UTMs presentes na URL atual.
 * A atribuição histórica continua armazenada na sessão,
 * independentemente do rastreamento do GA4.
 */
export function trackPageView(pathname: string, search: string, pageTitle: string): void {
  if (!isAllowedHostname() || !initialized || !hasValidMeasurementId() || !hasAnalyticsConsent()) {
    return;
  }

  const params = new URLSearchParams(search);
  const safeParams = new URLSearchParams();

  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

  for (const key of utmKeys) {
    const value = params.get(key)?.trim().slice(0, 120);

    if (value) {
      safeParams.set(key, value);
    }
  }

  const query = safeParams.toString();

  const pageLocation = window.location.origin + pathname + (query ? `?${query}` : "");

  const analyticsWindow = window as AnalyticsWindow;

  analyticsWindow.gtag?.("event", "page_view", {
    send_to: MEASUREMENT_ID,
    page_location: pageLocation,
    page_path: pathname,
    page_title: pageTitle
  });
}

/**
 * Registra um lead somente após confirmação do formulário.
 *
 * Não transmite nome, e-mail, mensagem ou dados pessoais.
 * Respeita o consentimento analítico do visitante.
 */
export function trackGenerateLead(): void {
  if (!isAllowedHostname() || !initialized || !hasValidMeasurementId() || !hasAnalyticsConsent()) {
    return;
  }

  const analyticsWindow = window as AnalyticsWindow;

  analyticsWindow.gtag?.("event", "generate_lead", {
    send_to: MEASUREMENT_ID
  });
}
