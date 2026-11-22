import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { PageContent } from "@/components/PageContent";
import { PageTitle } from "@/components/PageSection";
import { useLanguage } from "@/components/useLanguage";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageContent className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="space-y-4">
        <PageTitle>{t("notfound.title")}</PageTitle>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t("notfound.message")}</p>
        <Link
          to="/"
          className="inline-block rounded-sm text-red-700 underline hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {t("notfound.return")}
        </Link>
      </div>
    </PageContent>
  );
};

export default NotFound;
