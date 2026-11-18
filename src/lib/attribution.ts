const STORAGE_KEY = "portfolio_attribution";

const MAX_UTM_LENGTH = 120;
const MAX_PATH_LENGTH = 300;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

type UtmKey = (typeof UTM_KEYS)[number];

export type Attribution = Partial<Record<UtmKey, string>> & {
  landing_page: string;
  referrer: string;
  captured_at: string;
};

/**
 * Normaliza os parâmetros, remove caracteres de controle
 * e limita o tamanho dos valores recebidos.
 */
function sanitizeValue(value: string | null, maxLength = MAX_UTM_LENGTH): string {
  if (!value) {
    return "";
  }

  return Array.from(value)
    .filter((character) => {
      const code = character.codePointAt(0) ?? 0;

      return !(code <= 31 || (code >= 127 && code <= 159));
    })
    .join("")
    .trim()
    .slice(0, maxLength);
}

/**
 * Retorna somente a origem do endereço de referência.
 * Não armazena caminhos ou parâmetros externos.
 */
function getReferrer(): string {
  if (!document.referrer) {
    return "";
  }

  try {
    const url = new URL(document.referrer);

    if (!["http:", "https:"].includes(url.protocol)) {
      return "";
    }

    return url.origin === window.location.origin ? "" : url.origin;
  } catch {
    return "";
  }
}

/**
 * Recupera os dados da sessão com validação de tipos.
 */
export function getAttribution(): Attribution | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return null;
    }

    const data: unknown = JSON.parse(stored);

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return null;
    }

    const record = data as Record<string, unknown>;

    if (
      typeof record.landing_page !== "string" ||
      typeof record.referrer !== "string" ||
      typeof record.captured_at !== "string"
    ) {
      return null;
    }

    const capturedAt = new Date(record.captured_at);

    if (Number.isNaN(capturedAt.getTime())) {
      return null;
    }

    const attribution: Attribution = {
      landing_page: sanitizeValue(record.landing_page, MAX_PATH_LENGTH),
      referrer: sanitizeValue(record.referrer, 300),
      captured_at: capturedAt.toISOString()
    };

    for (const key of UTM_KEYS) {
      const value = record[key];

      if (typeof value === "string") {
        const sanitized = sanitizeValue(value);

        if (sanitized) {
          attribution[key] = sanitized;
        }
      }
    }

    return attribution;
  } catch {
    return null;
  }
}

/**
 * Captura a atribuição da visita.
 *
 * Uma nova campanha substitui a anterior.
 * Sem novas UTMs, preserva os dados da sessão.
 */
export function captureAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const previous = getAttribution();

  const utms: Partial<Record<UtmKey, string>> = {};

  for (const key of UTM_KEYS) {
    const value = sanitizeValue(params.get(key));

    if (value) {
      utms[key] = value;
    }
  }

  const hasCampaign = Object.keys(utms).length > 0;

  if (previous && !hasCampaign) {
    return previous;
  }

  const attribution: Attribution = {
    ...utms,
    landing_page: sanitizeValue(window.location.pathname, MAX_PATH_LENGTH),
    referrer: getReferrer(),
    captured_at: new Date().toISOString()
  };

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // O rastreamento não deve impedir o uso do site.
  }

  return attribution;
}
