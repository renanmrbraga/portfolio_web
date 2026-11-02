import { useLanguage } from "@/components/useLanguage";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="pb-10 pt-16 md:pb-16 md:pt-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-6xl">
          Renan Martins Braga
        </h1>

        <p className="text-xl font-medium text-gray-800 dark:text-gray-200 md:text-4xl">
          {t("hero.title")}
        </p>
      </div>
    </section>
  );
};

export default Hero;
