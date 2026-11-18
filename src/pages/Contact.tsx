import React, { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Linkedin, Github, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/useLanguage";
import { getAttribution } from "@/lib/attribution";

const Contact = () => {
  const { t } = useLanguage();
  const captchaRef = useRef<HCaptcha>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Bloqueio imediato para impedir envios simultâneos.
  const submittingRef = useRef(false);
  const captchaSiteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY?.trim();
  const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL?.trim();
  const formAvailable = Boolean(captchaSiteKey && formspreeUrl);
  const attribution = getAttribution();

  /**
   * Envia o formulário sem sair da página.
   * Mantém as UTMs e as proteções antispam existentes.
   */
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

    // Garante que o token atualizado seja enviado.
    formData.set("h-captcha-response", captchaToken);

    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(formspreeUrl, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Formspree HTTP ${response.status}`);
      }

      // Limpa somente após confirmação do Formspree.
      form.reset();
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      // O token hCaptcha não deve ser reutilizado.
      captchaRef.current?.resetCaptcha();
      setCaptchaToken("");

      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen theme-transition">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="p-0 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("contact.backHome")}
            </Link>
          </Button>
        </div>

        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            {t("contact.title")}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">{t("contact.infoTitle")}</h2>

            <div className="space-y-6">
              <ContactItem
                icon={<Mail className="h-5 w-5 text-blue-500" />}
                title={t("contact.email")}
              >
                <a
                  href="mailto:renanmbraga@outlook.com"
                  className="hover:text-blue-500 transition-colors"
                >
                  renanmbraga@outlook.com
                </a>
              </ContactItem>

              <ContactItem
                icon={<MapPin className="h-5 w-5 text-blue-500" />}
                title={t("contact.location")}
              >
                {t("contact.location.adress")}
              </ContactItem>

              <div className="pt-4">
                <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-200">
                  {t("contact.social")}
                </h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href="https://linkedin.com/in/renanmrbraga"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href="https://github.com/renanmrbraga"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">{t("contact.form.title")}</h2>

            <form
              action={formspreeUrl || undefined}
              method="POST"
              acceptCharset="UTF-8"
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              {/* Dados de atribuição da visita */}
              <input type="hidden" name="utm_source" value={attribution?.utm_source ?? ""} />

              <input type="hidden" name="utm_medium" value={attribution?.utm_medium ?? ""} />

              <input type="hidden" name="utm_campaign" value={attribution?.utm_campaign ?? ""} />

              <input type="hidden" name="utm_content" value={attribution?.utm_content ?? ""} />

              <input type="hidden" name="utm_term" value={attribution?.utm_term ?? ""} />

              <input type="hidden" name="landing_page" value={attribution?.landing_page ?? ""} />

              <input type="hidden" name="referrer" value={attribution?.referrer ?? ""} />

              <input type="hidden" name="captured_at" value={attribution?.captured_at ?? ""} />

              <input type="hidden" name="contact_page" value={window.location.pathname} />

              {/* Honeypot */}
              <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} />

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  maxLength={254}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder={t("contact.form.messagePlaceholder")}
                ></textarea>
              </div>

              {/* hCaptcha */}
              {captchaSiteKey ? (
                <HCaptcha
                  sitekey={captchaSiteKey}
                  onVerify={setCaptchaToken}
                  onExpire={() => setCaptchaToken("")}
                  onError={() => setCaptchaToken("")}
                  ref={captchaRef}
                />
              ) : (
                <p role="status" className="text-sm text-amber-600 dark:text-amber-400">
                  Formulario indisponivel: CAPTCHA nao configurado neste ambiente.
                </p>
              )}

              {/* Campo oculto para enviar o token ao backend/Formspree */}
              <input type="hidden" name="h-captcha-response" value={captchaToken} />

              <Button
                type="submit"
                disabled={
                  !formAvailable || !captchaToken || isSubmitting || submitStatus === "success"
                }
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Enviando..." : t("contact.form.submit")}
              </Button>
              {submitStatus === "success" && (
                <p role="status" className="text-sm text-green-600 dark:text-green-400">
                  Mensagem enviada com sucesso. Obrigado pelo contato!
                </p>
              )}

              {submitStatus === "error" && (
                <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                  Não foi possível confirmar o envio. Verifique sua conexão, resolva novamente o
                  CAPTCHA e tente outra vez.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ContactItem = ({
  icon,
  title,
  children
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex">
    <div className="mr-3">{icon}</div>
    <div>
      <h3 className="font-medium text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300">{children}</p>
    </div>
  </div>
);

export default Contact;
