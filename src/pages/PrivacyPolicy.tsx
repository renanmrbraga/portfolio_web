import { PageContent } from "@/components/PageContent";
import { PageSection, PageTitle } from "@/components/PageSection";
import { useLanguage } from "@/components/useLanguage";

/** Conteúdo jurídico da política, com navegação global fornecida pelo Layout. */
const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <PageContent size="reading" className="space-y-8">
      <PageTitle>{t("privacy.title")}</PageTitle>

      <div className="space-y-10 text-base leading-relaxed text-gray-700 dark:text-gray-300">
        <p>{t("privacy.updated")}</p>

        <PageSection headingId="privacy-section1" title={t("privacy.section1")}>
          <p>{t("privacy.section1.desc")}</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>{t("privacy.section1.item1")}</li>
            <li>{t("privacy.section1.item2")}</li>
            <li>{t("privacy.section1.item3")}</li>
          </ul>
        </PageSection>

        <PageSection headingId="privacy-section2" title={t("privacy.section2")}>
          <p>{t("privacy.section2.desc")}</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>{t("privacy.section2.item1")}</li>
            <li>{t("privacy.section2.item2")}</li>
            <li>{t("privacy.section2.item3")}</li>
            <li>{t("privacy.section2.item4")}</li>
          </ul>
        </PageSection>

        <PageSection headingId="privacy-section3" title={t("privacy.section3")}>
          <p>{t("privacy.section3.desc")}</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>{t("privacy.section3.item1")}</li>
            <li>{t("privacy.section3.item2")}</li>
            <li>{t("privacy.section3.item3")}</li>
          </ul>
        </PageSection>

        <PageSection headingId="privacy-section4" title={t("privacy.section4")}>
          <p>{t("privacy.section4.desc")}</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>{t("privacy.section4.item1")}</li>
            <li>{t("privacy.section4.item2")}</li>
            <li>{t("privacy.section4.item3")}</li>
            <li>{t("privacy.section4.item4")}</li>
          </ul>
        </PageSection>

        {/* GA4 e informações sobre consentimento mantidos integralmente. */}
        <PageSection headingId="privacy-analytics-title" title={t("privacy.analytics.title")}>
          <p>{t("privacy.analytics.desc")}</p>
          <p>{t("privacy.analytics.consent")}</p>
        </PageSection>

        <PageSection headingId="privacy-section5" title={t("privacy.section5")}>
          <p>{t("privacy.section5.desc")}</p>
        </PageSection>
      </div>
    </PageContent>
  );
};

export default PrivacyPolicy;
