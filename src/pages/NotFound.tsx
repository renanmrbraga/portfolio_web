import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/components/useLanguage";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground theme-transition">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t("notfound.title")}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{t("notfound.message")}</p>
        <a
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
        >
          {t("notfound.return")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
