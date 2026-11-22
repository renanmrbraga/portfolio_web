// src/components/Footer.tsx
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/useLanguage";

const Footer = () => {
  const { t } = useLanguage();
  const openAnalyticsPreferences = () => {
    window.dispatchEvent(new Event("analytics-consent-open"));
  };

  return (
    <footer
      id="contact"
      className="w-full border-t border-gray-200 pb-10 pt-8 dark:border-gray-800"
    >
      <div className="w-full text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://github.com/renanmrbraga"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Renan Braga"
            className="dark:text-gray-400 text-gray-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/renanmrbraga"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Renan Braga"
            className="dark:text-gray-400 text-gray-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:renanmbraga@outlook.com"
            aria-label="Enviar e-mail para Renan Braga"
            className="dark:text-gray-400 text-gray-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>

        <p className="dark:text-gray-400 text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Renan Braga - {t("footer.rights")}
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-2 text-sm sm:flex-row sm:gap-4">
          <Link
            to="/privacy-policy"
            className="whitespace-nowrap text-gray-500 transition-colors hover:text-red-700 dark:hover:text-red-400"
          >
            {t("footer.privacy")}
          </Link>

          <span aria-hidden="true" className="hidden text-gray-400 dark:text-gray-700 sm:inline">
            •
          </span>

          <Link
            to="/terms-of-use"
            className="whitespace-nowrap text-gray-500 transition-colors hover:text-red-700 dark:hover:text-red-400"
          >
            {t("footer.terms")}
          </Link>

          <span aria-hidden="true" className="hidden text-gray-400 dark:text-gray-700 sm:inline">
            •
          </span>

          <button
            type="button"
            onClick={openAnalyticsPreferences}
            className="whitespace-nowrap text-gray-500 transition-colors hover:text-red-700 dark:hover:text-red-400"
          >
            {t("footer.privacy") === "Privacy Policy"
              ? "Cookie preferences"
              : "Preferências de privacidade"}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
