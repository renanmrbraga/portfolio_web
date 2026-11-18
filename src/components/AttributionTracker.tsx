import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { captureAttribution } from "@/lib/attribution";

/**
 * Atualiza a atribuição sempre que a URL muda.
 *
 * O módulo de atribuição preserva os dados anteriores
 * quando a nova URL não contém UTMs.
 */
export function AttributionTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    captureAttribution();
  }, [pathname, search]);

  return null;
}
