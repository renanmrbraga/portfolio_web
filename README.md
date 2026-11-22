# Portfolio Web | Renan Braga

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**[Acessar o portfólio](https://renanmrbraga.vercel.app/?utm_source=github&utm_medium=social&utm_campaign=portfolio&utm_content=portfolio_web)**

## Sobre o projeto

O **Portfolio Web** é meu portfólio profissional, desenvolvido como uma **Single Page Application (SPA)** para apresentar minha atuação como Analista de Dados, minhas competências técnicas e projetos relacionados à engenharia de dados, ciência de dados, automação e inteligência artificial.

A aplicação utiliza **React, TypeScript, Vite e Tailwind CSS**, com componentes reutilizáveis, navegação por rotas, interface responsiva e conteúdo em português e inglês.

A interface utiliza uma arquitetura de componentes compartilhados para padronizar layout, tipografia, cards, badges e espaçamentos em todas as páginas. Essa organização permite modificar a identidade visual centralmente, preservando as funcionalidades específicas de cada seção.

Os projetos apresentados são o próprio **Portfolio Web** e o **EI DataBot**, uma plataforma de engenharia e análise de dados educacionais brasileiros, com pipelines ETL, arquitetura Medallion, PostgreSQL, dashboards e funcionalidades de inteligência artificial em evolução.

O desenvolvimento prioriza simplicidade, desempenho, acessibilidade, privacidade e facilidade de manutenção.

## Funcionalidades

- **Apresentação profissional:** perfil, competências técnicas e projetos em destaque.
- **Projetos:** informações técnicas, tecnologias utilizadas e links para repositórios.
- **EI DataBot:** página dedicada à arquitetura, aos recursos implementados e à evolução da plataforma.
- **Internacionalização:** interface e conteúdo em português e inglês.
- **Temas:** alternância entre modo claro e escuro, com persistência local.
- **Responsividade:** adaptação para dispositivos móveis e desktop.
- **Contato:** formulário com Formspree, hCaptcha, honeypot e prevenção de envios simultâneos.
- **Atribuição de contatos:** captura de parâmetros UTM e informações de origem da visita.
- **Google Analytics 4:** eventos de navegação e conversão condicionados ao consentimento.
- **Privacidade:** preferência explícita para coleta analítica, com possibilidade de recusa e revogação.
- **SEO:** metadados por página, URLs canônicas, sitemap XML, Open Graph, Twitter Cards e dados estruturados.
- **Navegação:** rotas para início, EI DataBot, contato, política de privacidade e termos de uso.

## Tecnologias e arquitetura

| Camada               | Tecnologias                       | Responsabilidade                             |
| -------------------- | --------------------------------- | -------------------------------------------- |
| Interface            | React, TypeScript                 | Componentes e páginas                        |
| Build                | Vite, SWC                         | Desenvolvimento e compilação                 |
| Estilização          | Tailwind CSS, shadcn/ui, Radix UI | Layout, temas e componentes de interface     |
| Navegação            | React Router DOM                  | Roteamento da SPA                            |
| Estado compartilhado | Context API e hooks               | Idioma, tema e preferências                  |
| SEO                  | React Helmet Async, Node.js       | Metadados dinâmicos e HTML estático por rota |
| Contato              | Formspree, hCaptcha               | Recebimento de mensagens e proteção antispam |
| Atribuição           | TypeScript, sessionStorage        | Captura e preservação de UTMs                |
| Analytics            | Google Analytics 4                | Eventos de navegação e conversão             |
| Hospedagem           | Vercel                            | Publicação estática e regras de roteamento   |

### Arquitetura visual

A aplicação utiliza componentes reutilizáveis para manter a identidade visual consistente entre as páginas.

| Componente             | Responsabilidade                                     |
| ---------------------- | ---------------------------------------------------- |
| `Layout.tsx`           | Estrutura global, Navbar, Footer e SEO               |
| `PageContent.tsx`      | Centralização e larguras padronizadas                |
| `PageSection.tsx`      | Títulos e espaçamento das seções                     |
| `PageCard.tsx`         | Bordas, superfícies e efeitos dos cards              |
| `PageText.tsx`         | Tipografia e formatação dos textos                   |
| `Showcase.tsx`         | Apresentação de projetos, competências e tecnologias |
| `AnalyticsConsent.tsx` | Interface de consentimento analítico                 |

O layout utiliza diferentes larguras conforme a finalidade do conteúdo, mantendo a centralização e a responsividade.

Os textos corridos possuem formatação compartilhada, com alinhamento adequado a dispositivos móveis e desktops. Os temas claro e escuro utilizam uma identidade visual baseada em cores neutras e detalhes em vermelho.

### Fluxo da aplicação

1. O Vite executa o ambiente de desenvolvimento e compila os arquivos de produção.
2. O React Router identifica a rota acessada e renderiza a página correspondente.
3. Os providers compartilham preferências de idioma e tema.
4. O React Helmet Async atualiza os metadados da página.
5. O processo de build gera arquivos HTML com metadados específicos para as rotas principais.
6. O sistema de atribuição registra informações de origem da visita durante a sessão.
7. O formulário encaminha mensagens ao Formspree após a verificação antispam.
8. O Google Analytics registra eventos apenas quando existe consentimento e o site está no domínio autorizado.

O portfólio **não possui backend próprio**. O processamento de mensagens e a coleta analítica utilizam serviços externos.

## Estrutura do projeto

```text
portfolio_web/
├── .github/                  # Configurações do repositório
├── public/
│   ├── dashboards/           # Imagens e recursos dos dashboards
│   ├── favicon.ico
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── generate-seo.mjs      # Geração de HTML com metadados por rota
│   └── sync-enade.mjs        # Atualização da prévia do ENADE
├── src/
│   ├── components/
│   │   ├── ui/               # Componentes de interface
│   │   ├── Layout.tsx        # Estrutura global das páginas
│   │   ├── PageContent.tsx   # Contêineres compartilhados
│   │   ├── PageSection.tsx   # Títulos e seções
│   │   ├── PageCard.tsx      # Cards reutilizáveis
│   │   ├── PageText.tsx      # Tipografia compartilhada
│   │   └── Showcase.tsx      # Projetos, competências e badges
│   ├── content/              # Conteúdos estruturados dos projetos e competências
│   ├── hooks/                # Hooks reutilizáveis
│   ├── lib/                  # Atribuição, analytics e utilitários
│   ├── pages/                # Páginas da aplicação
│   ├── App.tsx               # Providers e rotas
│   ├── main.tsx              # Inicialização
│   └── global.css            # Estilos globais
├── .env.example              # Exemplo de configuração
├── eslint.config.js          # Configuração do ESLint
├── package.json              # Dependências e comandos
├── package-lock.json         # Dependências resolvidas
├── tailwind.config.ts        # Configuração do Tailwind CSS
├── tsconfig.app.json         # Configuração do TypeScript
├── vercel.json               # Regras de publicação e roteamento
└── vite.config.ts            # Configuração do Vite
```

## Executar localmente

### 1. Pré-requisitos

- Node.js compatível com o projeto e npm.
- Git.

### 2. Clonar o repositório

```bash
git clone https://github.com/renanmrbraga/portfolio_web.git
cd portfolio_web
```

### 3. Instalar as dependências

```bash
npm ci
```

O comando utiliza o `package-lock.json` para uma instalação reproduzível.

### 4. Configurar as variáveis de ambiente

No PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Edite `.env.local`:

```dotenv
VITE_FORMSPREE_URL=https://formspree.io/f/seu-formulario
VITE_HCAPTCHA_SITE_KEY=sua-chave-publica-do-hcaptcha
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Importante:** variáveis com prefixo `VITE_` são incorporadas ao código disponibilizado ao navegador. Não utilize esse prefixo para senhas, tokens privados ou chaves secretas.

O identificador do Google Analytics é público. A proteção contra manipulação das métricas não depende de manter esse identificador em segredo.

### 5. Iniciar o ambiente de desenvolvimento

```bash
npm run dev
```

Acesse:

http://localhost:8080/

**Limitações intencionais do ambiente local:**

- O Google Analytics não é inicializado em `localhost`.
- O hCaptcha é desativado localmente.
- O formulário de contato permanece indisponível para envio nesse ambiente.

Essas restrições evitam a contaminação das métricas de produção e problemas de inicialização do hCaptcha durante o desenvolvimento.

### 6. Gerar a versão de produção

```bash
npm run build
npm run preview
```

O build executa a sincronização da prévia do ENADE, compila o projeto com Vite e gera os arquivos HTML específicos para SEO.

A atualização da prévia do ENADE depende das ferramentas de navegador necessárias ao script de sincronização.

## SEO e indexação

O SEO combina **metadados dinâmicos** com arquivos HTML gerados durante o build.

### Metadados dinâmicos

Os componentes utilizam:

- `src/components/Seo.tsx`
- `src/lib/page-metadata.ts`

A configuração centralizada fornece títulos e descrições consistentes para a aplicação e os eventos do Google Analytics.

### Metadados estáticos

O script `scripts/generate-seo.mjs` gera HTML específico para as páginas principais.

As regras do `vercel.json` direcionam essas rotas para seus respectivos arquivos HTML, preservando o funcionamento do React Router no navegador.

### Recursos adicionais

- `public/sitemap.xml`: URLs indexáveis.
- `public/robots.txt`: orientações para rastreadores.
- `public/og-image.png`: imagem de compartilhamento.
- JSON-LD: dados estruturados do proprietário do portfólio.
- URLs canônicas: endereços sem UTMs ou fragmentos.
- `noindex`: páginas inexistentes.

O endereço canônico utilizado é:

https://renanmrbraga.vercel.app/

## Contato e atribuição de origem

O formulário utiliza **Formspree** para o recebimento de mensagens e **hCaptcha** como mecanismo de proteção antispam.

Também inclui:

- Campo honeypot.
- Validação de campos obrigatórios.
- Prevenção de envios simultâneos.
- Tratamento de falhas de envio.
- Confirmação sem redirecionar o visitante.
- Reinicialização do token hCaptcha após a tentativa.
- Isolamento de erros de renderização do widget.

### Parâmetros UTM

A aplicação reconhece:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Também registra, quando disponíveis, informações como página de entrada, referência da visita e data de captura.

Os dados de atribuição são preservados durante a sessão e encaminhados ao Formspree junto com o formulário.

Essas informações permitem identificar a origem dos contatos recebidos por links divulgados em diferentes plataformas e campanhas.

## Google Analytics 4 e privacidade

A integração analítica foi desenvolvida para respeitar a decisão do visitante.

### Consentimento

- O consentimento analítico é negado por padrão.
- A tag do GA4 só é carregada após autorização.
- O visitante pode aceitar ou recusar a coleta.
- A preferência é armazenada no navegador.
- O rodapé permite reabrir as preferências.
- A revogação interrompe novos envios analíticos pela aplicação.

### Eventos

| Evento          | Quando é enviado                                  |
| --------------- | ------------------------------------------------- |
| `page_view`     | Navegação autorizada entre páginas                |
| `generate_lead` | Confirmação de envio do formulário pelo Formspree |

Os eventos de visualização são controlados manualmente para evitar duplicações decorrentes da navegação da SPA.

O `page_view` utiliza o título correspondente à página e preserva somente os parâmetros UTM permitidos na URL enviada.

O evento `generate_lead` não transmite nome, e-mail ou conteúdo da mensagem.

### Restrição por domínio

A aplicação só inicializa a coleta no domínio:

```text
renanmrbraga.vercel.app
```

Isso exclui o ambiente local e os endereços de preview.

O GA4 também permite configurar filtros de hostname para restringir os dados coletados pela tag Web.

**Limitação:** restrições de hostname não representam proteção antifraude absoluta. Eventos falsificados e determinadas requisições externas podem exigir mecanismos adicionais de monitoramento.

## Qualidade e manutenção

O projeto utiliza **TypeScript** e **ESLint** para validação estática.

```bash
# Verificação do código
npx eslint . --max-warnings 0

# Verificação de tipos
npx tsc --noEmit -p tsconfig.app.json

# Compilação de produção
npm run build

# Auditoria de dependências
npm audit
```

Para verificar problemas de formatação antes de um commit:

```bash
git diff --check
```

O build não substitui a verificação de tipos, e a ausência de avisos no ESLint não garante que todos os recursos estejam livres de problemas funcionais.

## Publicação

O projeto é publicado pela **Vercel**, com o Vite responsável pela geração dos arquivos estáticos.

A configuração de publicação utiliza:

- Build de produção com geração de metadados por rota.
- Regras de reescrita para os arquivos HTML de SEO.
- Fallback para rotas da aplicação React.
- Variáveis de ambiente configuradas na plataforma.

As credenciais privadas de serviços externos não devem ser incluídas no repositório.

**Site:** https://renanmrbraga.vercel.app/

## Versionamento

O projeto utiliza [Versionamento Semântico](https://semver.org/lang/pt-BR/) para identificar suas versões.

O formato adotado é `MAJOR.MINOR.PATCH`:

- **MAJOR:** alterações incompatíveis com versões anteriores.
- **MINOR:** novas funcionalidades e melhorias relevantes.
- **PATCH:** correções e pequenos ajustes.

Durante a fase inicial (`0.x.x`), a aplicação poderá passar por mudanças estruturais significativas.

As versões são identificadas por tags Git e documentadas no [histórico de alterações](CHANGELOG.md).

**Primeira versão registrada:** `v0.1.0`.

## Melhorias futuras

- [x] Estrutura React, TypeScript e Vite.
- [x] Interface responsiva e temas claro/escuro.
- [x] Conteúdo em português e inglês.
- [x] Página técnica do EI DataBot.
- [x] Formulário com Formspree e hCaptcha.
- [x] Proteção contra envios simultâneos.
- [x] Rastreamento de origem por UTMs.
- [x] Integração com Google Analytics 4.
- [x] Consentimento analítico e possibilidade de revogação.
- [x] Restrição de coleta analítica ao domínio oficial.
- [x] SEO por página, sitemap e dados estruturados.
- [x] Revisão de código legado e dependências.
- [x] Arquitetura visual com componentes reutilizáveis.
- [x] Padronização de layouts e contêineres entre páginas.
- [x] Tipografia compartilhada e responsiva.
- [x] Unificação de cards e badges.
- [x] Padronização visual dos temas claro e escuro.
- [x] Revisão da responsividade do rodapé.
- [x] Estrutura de versionamento e histórico de alterações.
- [ ] Ampliar os testes automatizados.
- [ ] Expandir as verificações de acessibilidade.
- [ ] Monitorar indicadores de desempenho e experiência de navegação.

## Licença

Distribuído sob a [Licença MIT](LICENSE).

## Contato

- [Portfólio](https://renanmrbraga.vercel.app/)
- [GitHub](https://github.com/renanmrbraga)
- [LinkedIn](https://www.linkedin.com/in/renanmrbraga)

---

© 2026 Renan Braga. Todos os direitos reservados.
