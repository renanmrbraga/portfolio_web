import React, { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Github, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/useLanguage";

const Contact = () => {
  const { t } = useLanguage();
  const captchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaSiteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY?.trim();
  const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL?.trim();
  const formAvailable = Boolean(captchaSiteKey && formspreeUrl);

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
              className="space-y-4"
              onSubmit={(e) => {
                if (!captchaToken) {
                  e.preventDefault();
                  alert("Por favor, resolva o CAPTCHA antes de enviar.");
                }
              }}
            >
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

              <Button type="submit" disabled={!formAvailable} className="w-full bg-blue-600 hover:bg-blue-700">
                {t("contact.form.submit")}
              </Button>
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
