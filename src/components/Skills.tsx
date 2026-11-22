import { ShowcaseCard, ShowcaseSection } from "@/components/Showcase";
import { useLanguage } from "@/components/useLanguage";
import { skillLists } from "@/content/skills";

// Categorias e respectivas traduções.
const skillSections = [
  { titleKey: "skills.section.etl", id: "etl" },
  { titleKey: "skills.section.bi", id: "bi" },
  { titleKey: "skills.section.ml", id: "ml" },
  { titleKey: "skills.section.ai", id: "ai" },
  { titleKey: "skills.section.db", id: "db" },
  { titleKey: "skills.section.web", id: "web" },
  { titleKey: "skills.section.marketing", id: "marketing" }
] as const;

const Skills = () => {
  const { language, t } = useLanguage();

  // Seleciona as competências conforme o idioma.
  const skills = skillLists[language];

  return (
    <ShowcaseSection id="skills" title={t("skills.title")}>
      {skillSections.map(({ titleKey, id }) => (
        <ShowcaseCard key={id} title={t(titleKey)} tags={skills[id]} />
      ))}
    </ShowcaseSection>
  );
};

export default Skills;
