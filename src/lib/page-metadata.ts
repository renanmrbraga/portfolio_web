import { eiDataBotCopy } from "@/content/ei-databot";

export type PageMetadata = {
  title: string;
  description: string;
  indexable: boolean;
};

/**
 * Centraliza os metadados utilizados pelo SEO e pelo GA4.
 *
 * Mantém os títulos e as descrições consistentes
 * entre as páginas e os eventos analíticos.
 */
export function getPageMetadata(
  path: string,
  isPt: boolean,
  t: (key: string) => string
): PageMetadata {
  switch (path) {
    case "/":
      return {
        title: t("seo.title"),
        description: t("seo.description"),
        indexable: true
      };

    case "/projects/ei-databot": {
      const content = eiDataBotCopy[isPt ? "pt" : "en"];

      return {
        title: `${content.title} | Renan Braga`,
        description: content.cardDescription,
        indexable: true
      };
    }

    case "/contact":
      return {
        title: isPt ? "Contato | Renan Braga" : "Contact | Renan Braga",
        description: isPt
          ? "Entre em contato com Renan Braga para projetos, parcerias e oportunidades profissionais."
          : "Contact Renan Braga for projects, partnerships and professional opportunities.",
        indexable: true
      };

    case "/privacy-policy":
      return {
        title: isPt ? "Política de Privacidade | Renan Braga" : "Privacy Policy | Renan Braga",
        description: isPt
          ? "Conheça a Política de Privacidade do portfólio de Renan Braga."
          : "Read the Privacy Policy of Renan Braga's portfolio.",
        indexable: true
      };

    case "/terms-of-use":
      return {
        title: isPt ? "Termos de Uso | Renan Braga" : "Terms of Use | Renan Braga",
        description: isPt
          ? "Consulte os Termos de Uso do portfólio de Renan Braga."
          : "Read the Terms of Use of Renan Braga's portfolio.",
        indexable: true
      };

    default:
      return {
        title: isPt ? "Página não encontrada | Renan Braga" : "Page Not Found | Renan Braga",
        description: isPt
          ? "A página solicitada não foi encontrada."
          : "The requested page could not be found.",
        indexable: false
      };
  }
}
