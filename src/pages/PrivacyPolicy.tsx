import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/components/useLanguage";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-background text-foreground min-h-screen theme-transition">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center space-x-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="py-16 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 dark:text-white text-gray-900">
            {t("privacy.title")}
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4 dark:text-gray-300 text-gray-700">{t("privacy.updated")}</p>

            <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-white text-gray-900">
              {t("privacy.section1")}
            </h2>
            <p className="mb-4 dark:text-gray-300 text-gray-700">{t("privacy.section1.desc")}</p>
            <ul className="list-disc pl-6 mb-6 dark:text-gray-300 text-gray-700">
              <li className="mb-2">{t("privacy.section1.item1")}</li>
              <li className="mb-2">{t("privacy.section1.item2")}</li>
              <li className="mb-2">{t("privacy.section1.item3")}</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-white text-gray-900">
              {t("privacy.section2")}
            </h2>
            <p className="mb-4 dark:text-gray-300 text-gray-700">{t("privacy.section2.desc")}</p>
            <ul className="list-disc pl-6 mb-6 dark:text-gray-300 text-gray-700">
              <li className="mb-2">{t("privacy.section2.item1")}</li>
              <li className="mb-2">{t("privacy.section2.item2")}</li>
              <li className="mb-2">{t("privacy.section2.item3")}</li>
              <li className="mb-2">{t("privacy.section2.item4")}</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-white text-gray-900">
              {t("privacy.section3")}
            </h2>
            <p className="mb-4 dark:text-gray-300 text-gray-700">{t("privacy.section3.desc")}</p>
            <ul className="list-disc pl-6 mb-6 dark:text-gray-300 text-gray-700">
              <li className="mb-2">{t("privacy.section3.item1")}</li>
              <li className="mb-2">{t("privacy.section3.item2")}</li>
              <li className="mb-2">{t("privacy.section3.item3")}</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-white text-gray-900">
              {t("privacy.section4")}
            </h2>
            <p className="mb-4 dark:text-gray-300 text-gray-700">{t("privacy.section4.desc")}</p>
            <ul className="list-disc pl-6 mb-6 dark:text-gray-300 text-gray-700">
              <li className="mb-2">{t("privacy.section4.item1")}</li>
              <li className="mb-2">{t("privacy.section4.item2")}</li>
              <li className="mb-2">{t("privacy.section4.item3")}</li>
              <li className="mb-2">{t("privacy.section4.item4")}</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 dark:text-white text-gray-900">
              {t("privacy.section5")}
            </h2>
            <p className="mb-4 dark:text-gray-300 text-gray-700">{t("privacy.section5.desc")}</p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
