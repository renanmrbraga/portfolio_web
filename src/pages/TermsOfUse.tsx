import { PageContent } from "@/components/PageContent";
import { PageSection, PageTitle } from "@/components/PageSection";
import { useLanguage } from "@/components/useLanguage";

/** Conteúdo jurídico dos termos, com navegação global fornecida pelo Layout. */
const TermsOfUse = () => {
  const { t } = useLanguage();

  return (
    <PageContent className="max-w-3xl space-y-10">
      <PageTitle>{t("terms.title")}</PageTitle>

      <div className="space-y-10 text-base leading-relaxed text-gray-700 dark:text-gray-300">
        <div className="space-y-4">
          <p>{t("terms.updated")}</p>
          <p>{t("terms.intro")}</p>
        </div>

        <PageSection headingId="terms-section1" title={t("terms.section1")}>
          <p>{t("terms.section1.desc")}</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>{t("terms.section1.item1")}</li>
            <li>{t("terms.section1.item2")}</li>
            <li>{t("terms.section1.item3")}</li>
          </ul>
        </PageSection>

        <PageSection headingId="terms-section2" title={t("terms.section2")}>
          <p>{t("terms.section2.desc1")}</p>
          <p>{t("terms.section2.desc2")}</p>
        </PageSection>

        <PageSection headingId="terms-section3" title={t("terms.section3")}>
          <p>{t("terms.section3.desc")}</p>
        </PageSection>

        <PageSection headingId="terms-section4" title={t("terms.section4")}>
          <p>{t("terms.section4.desc")}</p>
        </PageSection>

        <PageSection headingId="terms-section5" title={t("terms.section5")}>
          <p>{t("terms.section5.desc")}</p>
        </PageSection>

        <PageSection headingId="terms-section6" title={t("terms.section6")}>
          <p>{t("terms.section6.desc")}</p>
        </PageSection>
      </div>
    </PageContent>
  );
};

export default TermsOfUse;
