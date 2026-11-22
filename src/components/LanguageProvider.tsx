import { LanguageProviderContext, type Language } from "./language-context";
import React, { useEffect, useState } from "react";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

const translations = {
  pt: {
    // SEO
    "seo.title": "Renan Braga • Portfólio",
    "seo.description": "Portfólio profissional de Renan Braga - Analista de Dados.",
    // Navbar
    contact: "Contato",
    github: "GitHub",
    // Hero
    "hero.title": "Analista de Dados",
    // Footer
    "footer.rights": "Todos os direitos reservados",
    "footer.privacy": "Política de Privacidade",
    "footer.terms": "Termos de Uso",
    // 404 Page
    "notfound.title": "404",
    "notfound.message": "Oops! Página não encontrada",
    "notfound.return": "Voltar para a Página Inicial",
    "contact.backHome": "Voltar para a Home",
    // Contact
    "contact.title": "Entre em Contato",
    "contact.subtitle":
      "Estou disponível para novos projetos, colaborações e oportunidades. Ficarei feliz em conversar sobre como posso ajudar.",
    "contact.form.title": "Envie uma Mensagem",
    "contact.form.name": "Nome",
    "contact.form.namePlaceholder": "Seu nome",
    "contact.form.email": "E-mail",
    "contact.form.emailPlaceholder": "seu.e-mail@exemplo.com",
    "contact.form.message": "Mensagem",
    "contact.form.messagePlaceholder": "Sua mensagem aqui...",
    "contact.form.submit": "Enviar Mensagem",
    "contact.form.submitting": "Enviando...",
    "contact.form.success": "Mensagem enviada com sucesso. Obrigado pelo contato!",
    "contact.form.error":
      "Não foi possível confirmar o envio. Verifique sua conexão, resolva novamente o CAPTCHA e tente outra vez.",
    "contact.captcha.unavailable":
      "Formulário indisponível: CAPTCHA não configurado neste ambiente.",
    "contact.captcha.error":
      "Não foi possível carregar a verificação de segurança. O envio do formulário está indisponível neste ambiente.",
    // Privacy Policy
    "privacy.title": "Política de Privacidade",
    "privacy.updated": "Última atualização: 21 de novembro de 2026",
    "privacy.section1": "1. Informações Tratadas",
    "privacy.section1.desc":
      "Este portfólio utiliza recursos de navegação e contato. Conforme sua interação, as seguintes informações podem ser tratadas:",
    "privacy.section1.item1":
      "Preferências de idioma e tema armazenadas localmente no navegador (localStorage).",
    "privacy.section1.item2":
      "Parâmetros UTM, página de entrada, origem da referência e data da visita, armazenados durante a sessão (sessionStorage).",
    "privacy.section1.item3":
      "Nome, e-mail, mensagem e informações necessárias à verificação antispam quando o formulário de contato é utilizado.",
    "privacy.section2": "2. Finalidades do Tratamento",
    "privacy.section2.desc": "As informações são utilizadas para:",
    "privacy.section2.item1": "Manter as preferências de idioma e aparência do portfólio.",
    "privacy.section2.item2": "Receber e responder às mensagens enviadas pelo formulário.",
    "privacy.section2.item3":
      "Identificar a origem dos contatos por meio de parâmetros UTM, quando disponíveis.",
    "privacy.section2.item4": "Reduzir envios automatizados, abusos e tentativas de spam.",
    "privacy.section3": "3. Serviços Externos",
    "privacy.section3.desc":
      "O portfólio utiliza serviços externos que podem tratar informações necessárias ao funcionamento de seus recursos:",
    "privacy.section3.item1": "Vercel: hospedagem do site e processamento técnico das requisições.",
    "privacy.section3.item2":
      "Formspree: processamento das mensagens e dos dados de atribuição enviados pelo formulário.",
    "privacy.section3.item3":
      "hCaptcha: verificação antispam, com tratamento de dados conforme sua própria política de privacidade.",
    "privacy.section4": "4. Seus Direitos e Escolhas",
    "privacy.section4.desc":
      "Conforme a legislação aplicável, incluindo a LGPD, você pode solicitar:",
    "privacy.section4.item1":
      "Confirmação da existência de tratamento e acesso aos seus dados pessoais.",
    "privacy.section4.item2": "Correção de informações incompletas, inexatas ou desatualizadas.",
    "privacy.section4.item3":
      "Anonimização, bloqueio ou eliminação de dados nas hipóteses previstas em lei.",
    "privacy.section4.item4":
      "Revogação do consentimento, quando aplicável, e informações sobre o tratamento de dados.",
    "privacy.analytics.title": "Google Analytics 4",
    "privacy.analytics.desc":
      "Utilizamos o Google Analytics 4 para compreender a navegação no portfólio, incluindo páginas visitadas, origem das visitas e interações com o formulário de contato. A coleta analítica ocorre somente após sua autorização explícita. Não enviamos ao Google Analytics nomes, endereços de e-mail ou o conteúdo das mensagens.",
    "privacy.analytics.consent":
      "Você pode aceitar, recusar ou alterar sua preferência a qualquer momento pelo link Preferências de privacidade no rodapé. A recusa não impede a utilização do site. Ao revogar a autorização, interrompemos novos envios analíticos; isso não exclui automaticamente dados coletados anteriormente.",
    "privacy.section5": "5. Contato e Atualizações",
    "privacy.section5.desc":
      "Para dúvidas ou solicitações relacionadas aos seus dados pessoais, utilize a página de Contato ou o e-mail renanmbraga@outlook.com. Esta política poderá ser atualizada quando os recursos do portfólio forem modificados.",
    // Terms of Use
    "terms.title": "Termos de Uso",
    "terms.updated": "Última atualização: 21 de novembro de 2026",
    "terms.intro":
      "Este portfólio apresenta informações profissionais, competências técnicas e projetos de desenvolvimento. Ao utilizar o site, você deve respeitar a legislação aplicável e as condições descritas nestes termos.",
    "terms.section1": "1. Uso do Site",
    "terms.section1.desc":
      "O conteúdo está disponível para consulta e fins informativos. Ao utilizar o portfólio, você se compromete a:",
    "terms.section1.item1":
      "Não comprometer a segurança, a integridade ou a disponibilidade do site.",
    "terms.section1.item2":
      "Não tentar obter acesso não autorizado a sistemas ou recursos relacionados.",
    "terms.section1.item3":
      "Respeitar os direitos autorais e as licenças aplicáveis aos projetos apresentados.",
    "terms.section2": "2. Propriedade Intelectual e Licenças",
    "terms.section2.desc1":
      "O código-fonte do projeto Portfolio Web está disponível publicamente no GitHub sob a licença MIT, conforme o arquivo LICENSE do repositório. Essa licença permite o uso, a modificação e a distribuição do software, desde que suas condições sejam respeitadas.",
    "terms.section2.desc2":
      "A licença MIT do projeto não se estende automaticamente a conteúdos de terceiros, marcas, imagens, dados ou outros materiais sujeitos a direitos próprios. A utilização desses elementos deve respeitar as respectivas licenças e autorizações.",
    "terms.section3": "3. Limitação de Responsabilidade",
    "terms.section3.desc":
      "As informações e os projetos são apresentados para fins profissionais, educacionais e demonstrativos. O conteúdo é disponibilizado no estado em que se encontra, sem garantia de precisão, disponibilidade contínua ou adequação a uma finalidade específica. Eventuais limitações de responsabilidade estão sujeitas à legislação aplicável.",
    "terms.section4": "4. Links e Serviços de Terceiros",
    "terms.section4.desc":
      "O portfólio pode conter links para GitHub, LinkedIn e outros serviços externos. Esses serviços possuem políticas e condições próprias. Não controlo seu conteúdo, funcionamento ou disponibilidade, sendo recomendável consultar os respectivos termos antes de utilizá-los.",
    "terms.section5": "5. Atualizações dos Termos",
    "terms.section5.desc":
      "Estes Termos de Uso poderão ser atualizados para refletir alterações no portfólio, em seus recursos ou nas condições aplicáveis. A versão vigente será disponibilizada nesta página com sua respectiva data de atualização.",
    "terms.section6": "6. Contato",
    "terms.section6.desc":
      "Para dúvidas sobre estes Termos de Uso, utilize a página de Contato ou envie uma mensagem para renanmbraga@outlook.com.",
    "contact.captcha.local":
      "A verificação hCaptcha está desativada no ambiente local. O formulário poderá ser testado no site publicado.",
    // ProjectsGrid
    "projects.title": "Meus Projetos",
    // Portfolio
    "projects.PortfolioWeb.title": "Portfólio Profissional",
    "projects.PortfolioWeb.desc":
      "Design, desenvolvimento e conteúdo deste portfólio pessoal. Implementado com React, Vite, Tailwind, i18n, SEO dinâmico e deploy otimizado via Vercel.",
    // Skills
    "skills.title": "Competências Técnicas",
    "skills.section.etl": "Engenharia de Dados & ETL",
    "skills.section.bi": "BI & Análise",
    "skills.section.ml": "Estatística & Machine Learning",
    "skills.section.ai": "IA Generativa",
    "skills.section.db": "Bancos de Dados & Infra",
    "skills.section.web": "Desenvolvimento & Integrações",
    "skills.section.marketing": "Marketing Digital"
  },
  en: {
    // SEO
    "seo.title": "Renan Braga • Portfolio",
    "seo.description": "Professional portfolio of Renan Braga - Data Analyst.",
    // Navbar
    contact: "Contact",
    github: "GitHub",
    // Hero
    "hero.title": "Data Analyst",
    // Footer
    "footer.rights": "All rights reserved",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Use",
    // 404 Page
    "notfound.title": "404",
    "notfound.message": "Oops! Page not found",
    "notfound.return": "Return to Home",
    // Contact
    "contact.backHome": "Back to Home",
    "contact.title": "Get in Touch",
    "contact.subtitle":
      "I’m available for new projects, collaborations, and opportunities. Happy to talk about how I can help.",
    "contact.form.title": "Send a Message",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.email": "E-mail",
    "contact.form.emailPlaceholder": "your.e-mail@example.com",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Your message here...",
    "contact.form.submit": "Send Message",
    "contact.form.submitting": "Sending...",
    "contact.form.success": "Message sent successfully. Thank you for reaching out!",
    "contact.form.error":
      "Unable to confirm submission. Check your connection, complete the CAPTCHA again, and try once more.",
    "contact.captcha.unavailable":
      "Form unavailable: CAPTCHA is not configured in this environment.",
    "contact.captcha.error":
      "Unable to load the security verification. Form submission is unavailable in this environment.",
    // Privacy Policy
    "privacy.title": "Privacy Policy",
    "privacy.updated": "Last updated: November 21, 2026",
    "privacy.section1": "1. Information Processed",
    "privacy.section1.desc":
      "This portfolio provides navigation and contact features. Depending on your interactions, the following information may be processed:",
    "privacy.section1.item1":
      "Language and theme preferences stored locally in your browser (localStorage).",
    "privacy.section1.item2":
      "UTM parameters, landing page, referral source, and visit timestamp stored during the session (sessionStorage).",
    "privacy.section1.item3":
      "Name, email address, message, and information required for spam verification when using the contact form.",
    "privacy.section2": "2. Purposes of Processing",
    "privacy.section2.desc": "Information is used to:",
    "privacy.section2.item1": "Maintain your language and appearance preferences.",
    "privacy.section2.item2": "Receive and respond to messages submitted through the contact form.",
    "privacy.section2.item3": "Identify contact sources using UTM parameters when available.",
    "privacy.section2.item4": "Reduce automated submissions, abuse, and spam.",
    "privacy.section3": "3. External Services",
    "privacy.section3.desc":
      "This portfolio uses external services that may process information required for its features:",
    "privacy.section3.item1": "Vercel: website hosting and technical processing of requests.",
    "privacy.section3.item2":
      "Formspree: processing contact messages and attribution data submitted through the form.",
    "privacy.section3.item3":
      "hCaptcha: spam verification, with data processing governed by its own privacy policy.",
    "privacy.section4": "4. Your Rights and Choices",
    "privacy.section4.desc":
      "Under applicable legislation, including Brazil's LGPD, you may request:",
    "privacy.section4.item1": "Confirmation of data processing and access to your personal data.",
    "privacy.section4.item2": "Correction of incomplete, inaccurate, or outdated information.",
    "privacy.section4.item3":
      "Anonymization, blocking, or deletion of data where legally applicable.",
    "privacy.section4.item4":
      "Withdrawal of consent, where applicable, and information about personal data processing.",
    "privacy.analytics.title": "Google Analytics 4",
    "privacy.analytics.desc":
      "We use Google Analytics 4 to understand portfolio navigation, including visited pages, traffic sources, and contact form interactions. Analytics data collection occurs only after your explicit consent. We do not send names, email addresses, or message contents to Google Analytics.",
    "privacy.analytics.consent":
      "You can accept, decline, or change your preference at any time using the Privacy preferences link in the footer. Declining does not affect your ability to use the website. Revoking consent stops new analytics transmissions but does not automatically delete previously collected data.",
    "privacy.section5": "5. Contact and Updates",
    "privacy.section5.desc":
      "For questions or requests regarding your personal data, use the Contact page or email renanmbraga@outlook.com. This policy may be updated when portfolio features change.",
    // Terms of Use
    "terms.title": "Terms of Use",
    "terms.updated": "Last updated: November 21, 2026",
    "terms.intro":
      "This portfolio presents professional information, technical skills, and development projects. By using the website, you must comply with applicable laws and the conditions described in these terms.",
    "terms.section1": "1. Use of the Website",
    "terms.section1.desc":
      "The content is available for consultation and informational purposes. When using this portfolio, you agree to:",
    "terms.section1.item1":
      "Not compromise the security, integrity, or availability of the website.",
    "terms.section1.item2": "Not attempt unauthorized access to related systems or resources.",
    "terms.section1.item3": "Respect copyright and applicable licenses for the projects presented.",
    "terms.section2": "2. Intellectual Property and Licenses",
    "terms.section2.desc1":
      "The Portfolio Web source code is publicly available on GitHub under the MIT License, as specified in the repository's LICENSE file. This license permits the use, modification, and distribution of the software, provided its conditions are respected.",
    "terms.section2.desc2":
      "The project's MIT License does not automatically extend to third-party content, trademarks, images, data, or other materials subject to separate rights. Their use must comply with the respective licenses and permissions.",
    "terms.section3": "3. Limitation of Liability",
    "terms.section3.desc":
      "Information and projects are presented for professional, educational, and demonstration purposes. Content is provided as is, without guarantees of accuracy, continuous availability, or fitness for a particular purpose. Any limitations of liability are subject to applicable law.",
    "terms.section4": "4. Third-Party Links and Services",
    "terms.section4.desc":
      "This portfolio may contain links to GitHub, LinkedIn, and other external services. These services have their own policies and conditions. I do not control their content, operation, or availability. Reviewing their respective terms before using them is recommended.",
    "terms.section5": "5. Updates to These Terms",
    "terms.section5.desc":
      "These Terms of Use may be updated to reflect changes to the portfolio, its features, or applicable conditions. The current version will be published on this page with its corresponding update date.",
    "terms.section6": "6. Contact",
    "terms.section6.desc":
      "For questions regarding these Terms of Use, use the Contact page or send a message to renanmbraga@outlook.com.",
    "contact.captcha.local":
      "hCaptcha verification is disabled in the local environment. The form can be tested on the published website.",
    // ProjectsGrid
    "projects.title": "My Projects",
    // Portfolio
    "projects.PortfolioWeb.title": "Professional Portfolio",
    "projects.PortfolioWeb.desc":
      "Design, development, and content of this personal portfolio. Built with React, Vite, Tailwind, i18n, dynamic SEO, and optimized Vercel deployment.",
    // Skills
    "skills.title": "Technical Skills",
    "skills.section.etl": "Data Engineering & ETL",
    "skills.section.bi": "BI & Analytics",
    "skills.section.ml": "Statistics & Machine Learning",
    "skills.section.ai": "Generative AI",
    "skills.section.db": "Databases & Infrastructure",
    "skills.section.web": "Development & Integrations",
    "skills.section.marketing": "Digital Marketing"
  }
};

export function LanguageProvider({
  children,
  defaultLanguage = "pt",
  storageKey = "vite-ui-language",
  ...props
}: LanguageProviderProps) {
  const getBrowserLanguage = (): Language => {
    const lang = navigator.language || navigator.languages[0] || "pt";
    if (lang.startsWith("en")) return "en";
    if (lang.startsWith("pt")) return "pt";
    return defaultLanguage;
  };

  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || getBrowserLanguage()
  );

  useEffect(() => {
    localStorage.setItem(storageKey, language);
    document.documentElement.setAttribute("lang", language);
  }, [language, storageKey]);

  const t = (key: string): string => {
    const currentTranslations = translations[language];

    return currentTranslations[key] || key;
  };

  const value = {
    language,
    setLanguage: (language: Language) => {
      setLanguage(language);
    },
    t
  };

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}
