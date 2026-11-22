import React, { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import { CaptchaErrorBoundary } from "@/components/CaptchaErrorBoundary";
import { PageCard } from "@/components/PageCard";
import { PageContent } from "@/components/PageContent";
import { PageTitle } from "@/components/PageSection";
import { useLanguage } from "@/components/useLanguage";
import { Button } from "@/components/ui/button";
import { getAttribution } from "@/lib/attribution";
import { trackGenerateLead } from "@/lib/google-analytics";

const Contact = () => {
  const { t } = useLanguage();
  const captchaRef = useRef<HCaptcha>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Bloqueia envios simultâneos antes da atualização de estado do React.
  const submittingRef = useRef(false);
  const captchaSiteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY?.trim();
  const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL?.trim();
  const isLocalDevelopment =
    import.meta.env.DEV && ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);

  const formAvailable = Boolean(captchaSiteKey && formspreeUrl && !isLocalDevelopment);
  const attribution = getAttribution();

  /** Preserva o envio sem redirecionamento, UTMs, hCaptcha e registro de conversão. */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submittingRef.current || submitStatus === "success") {
      return;
    }

    if (!formAvailable || !formspreeUrl || !captchaToken) {
      setSubmitStatus("error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("h-captcha-response", captchaToken);

    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(formspreeUrl, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error(`Formspree HTTP ${response.status}`);
      }

      // Conversão registrada somente após confirmação do Formspree.
      trackGenerateLead();
      form.reset();
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      // O token hCaptcha não pode ser reutilizado.
      captchaRef.current?.resetCaptcha();
      setCaptchaToken("");
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <PageContent size="form">
      <header className="mb-10 space-y-4">
        <PageTitle>{t("contact.title")}</PageTitle>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {t("contact.subtitle")}
        </p>
      </header>

      <PageCard className="p-6 sm:p-8">
        <h2 className="mb-6 text-2xl font-bold">{t("contact.form.title")}</h2>

        <form
          action={formspreeUrl || undefined}
          method="POST"
          acceptCharset="UTF-8"
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          {/* Dados de atribuição da visita. */}
          <input type="hidden" name="utm_source" value={attribution?.utm_source ?? ""} />
          <input type="hidden" name="utm_medium" value={attribution?.utm_medium ?? ""} />
          <input type="hidden" name="utm_campaign" value={attribution?.utm_campaign ?? ""} />
          <input type="hidden" name="utm_content" value={attribution?.utm_content ?? ""} />
          <input type="hidden" name="utm_term" value={attribution?.utm_term ?? ""} />
          <input type="hidden" name="landing_page" value={attribution?.landing_page ?? ""} />
          <input type="hidden" name="referrer" value={attribution?.referrer ?? ""} />
          <input type="hidden" name="captured_at" value={attribution?.captured_at ?? ""} />
          <input type="hidden" name="contact_page" value={window.location.pathname} />

          {/* Campo honeypot. */}
          <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} />

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("contact.form.name")}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              minLength={2}
              maxLength={100}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder={t("contact.form.namePlaceholder")}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("contact.form.email")}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              maxLength={254}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder={t("contact.form.emailPlaceholder")}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("contact.form.message")}
            </label>
            <textarea
              name="message"
              id="message"
              required
              minLength={10}
              maxLength={5000}
              rows={5}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder={t("contact.form.messagePlaceholder")}
            />
          </div>

          <CaptchaErrorBoundary fallbackMessage={t("contact.captcha.error")}>
            {isLocalDevelopment ? (
              <p role="status" className="text-sm text-amber-600 dark:text-amber-400">
                {t("contact.captcha.local")}
              </p>
            ) : captchaSiteKey ? (
              <HCaptcha
                sitekey={captchaSiteKey}
                onVerify={setCaptchaToken}
                onExpire={() => setCaptchaToken("")}
                onError={() => setCaptchaToken("")}
                ref={captchaRef}
              />
            ) : (
              <p role="status" className="text-sm text-amber-600 dark:text-amber-400">
                {t("contact.captcha.unavailable")}
              </p>
            )}
          </CaptchaErrorBoundary>

          <input type="hidden" name="h-captcha-response" value={captchaToken} />

          <Button
            type="submit"
            disabled={!formAvailable || !captchaToken || isSubmitting || submitStatus === "success"}
            className="w-full bg-red-700 text-white hover:bg-red-800"
          >
            {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
          </Button>

          {submitStatus === "success" && (
            <p role="status" className="text-sm text-green-600 dark:text-green-400">
              {t("contact.form.success")}
            </p>
          )}

          {submitStatus === "error" && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {t("contact.form.error")}
            </p>
          )}
        </form>
      </PageCard>
    </PageContent>
  );
};

export default Contact;
