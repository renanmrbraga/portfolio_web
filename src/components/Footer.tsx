// src/components/Footer.tsx
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/useLanguage";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-10 border-t dark:border-gray-800 border-gray-200" id="contact">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://github.com/renanmrbraga"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-gray-400 text-gray-500 hover:text-purple-400 transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/renanmrbraga"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-gray-400 text-gray-500 hover:text-purple-400 transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:renanmbraga@outlook.com"
            className="dark:text-gray-400 text-gray-500 hover:text-purple-400 transition-colors"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>

        <p className="dark:text-gray-400 text-gray-600 text-sm">
          &copy; 2025 Renan Martins Braga - {t("footer.rights")}
        </p>
        <div className="mt-4 space-x-4">
          <Link
            to="/privacy-policy"
            className="dark:text-gray-500 text-gray-500 hover:text-purple-400 transition-colors"
          >
            {t("footer.privacy")}
          </Link>
          <span className="dark:text-gray-700 text-gray-400">•</span>
          <Link
            to="/terms-of-use"
            className="dark:text-gray-500 text-gray-500 hover:text-purple-400 transition-colors"
          >
            {t("footer.terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
