import { useLanguage } from "@/components/useLanguage";

const skillSections = [
  {
    titleKey: "skills.section.etl",
    items: ["skills.list.etlCore", "skills.list.etlFormats"],
  },
  {
    titleKey: "skills.section.bi",
    items: ["skills.list.biTools", "skills.list.biAnalysis"],
  },
  {
    titleKey: "skills.section.ml",
    items: ["skills.list.mlMethods", "skills.list.mlLibraries"],
  },
  {
    titleKey: "skills.section.ai",
    items: ["skills.list.aiModels", "skills.list.aiTechniques"],
  },
  {
    titleKey: "skills.section.db",
    items: ["skills.list.db", "skills.list.infra"],
  },
  {
    titleKey: "skills.section.web",
    items: ["skills.list.web"],
  },
] as const;

const Skills = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="space-y-6">
      <h2 className="text-2xl font-bold">{t("skills.title")}</h2>

      <div className="grid grid-cols-1 gap-8 text-base leading-relaxed sm:grid-cols-2">
        {skillSections.map(({ titleKey, items }) => (
          <div key={titleKey}>
            <h3 className="mb-1 text-lg font-semibold">
              {t(titleKey)}
            </h3>

            <ul className="list-inside list-disc space-y-1">
              {items.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
