# Portfolio Web | Renan Martins Braga

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## Sobre o projeto

O **Portfolio Web** é meu portfólio profissional, desenvolvido como uma **Single Page Application (SPA)** para apresentar minha atuação como Analista de Dados, minhas competências técnicas e projetos de engenharia de dados, ciência de dados, automação e inteligência artificial.

A aplicação foi construída com **React, TypeScript e Vite**, utilizando componentes reutilizáveis, estilização responsiva, navegação por rotas e gerenciamento de preferências no navegador. A proposta é manter uma interface leve, organizada e de fácil evolução, com conteúdo disponível em **português e inglês**.

Atualmente, os projetos em destaque são o próprio **Portfolio Web** e o **EI DataBot**, uma plataforma voltada à engenharia e análise de dados educacionais brasileiros.

## Funcionalidades

- **Apresentação profissional:** resumo, competências técnicas e projetos em destaque.
- **Projetos:** cards com tecnologias utilizadas e links para os repositórios no GitHub.
- **Páginas dos Projetos:** descrição técnica de cada projeto, arquitetura e etapas de evolução.
- **Internacionalização:** conteúdo em português e inglês por meio da React Context API.
- **Tema claro e escuro:** alternância visual com persistência da preferência no `localStorage`.
- **Layout responsivo:** adaptação para dispositivos móveis e desktop com Tailwind CSS.
- **Contato:** formulário integrado ao Formspree, com hCaptcha e campo honeypot.
- **SEO:** metadados dinâmicos, Open Graph e Twitter Cards.
- **Navegação:** rotas para página inicial, projeto, contato, privacidade e termos de uso.

## Arquitetura e métodos utilizados

O projeto segue uma **arquitetura de componentes React**, com responsabilidades distribuídas entre interface, conteúdo, navegação, estado compartilhado e serviços externos.

| Camada                  | Implementação                       | Responsabilidade                                           |
| ----------------------- | ----------------------------------- | ---------------------------------------------------------- |
| Interface               | React + TypeScript                  | Componentes e páginas tipadas                              |
| Build e desenvolvimento | Vite + SWC                          | Servidor local e geração de arquivos de produção           |
| Estilização             | Tailwind CSS + shadcn/ui + Radix UI | Layout, temas e componentes acessíveis                     |
| Navegação               | React Router DOM                    | Roteamento da SPA                                          |
| Estado compartilhado    | Context API + hooks                 | Idioma e tema, com persistência local                      |
| Animações | CSS e IntersectionObserver | Animações sem dependência adicional |
| SEO                     | React Helmet Async                  | Título, descrição e metadados por idioma                   |
| Formulário              | Formspree + hCaptcha                | Envio de mensagens e verificação de desafio                |
| Hospedagem              | Configuração Vercel                 | Build estático e fallback de rotas da SPA                  |

### Fluxo da aplicação

1. O **Vite** entrega a aplicação React durante o desenvolvimento e gera os recursos estáticos de produção.
2. O **React Router** seleciona a página correspondente à URL acessada.
3. Componentes de **layout e interface** renderizam as seções, os projetos e a navegação.
4. Os **providers de idioma e tema** disponibilizam preferências aos componentes, preservando-as no navegador.
5. O **React Helmet Async** atualiza os metadados utilizados por navegadores e plataformas de compartilhamento.
6. Na página de contato, o formulário encaminha os dados ao **Formspree** e utiliza **hCaptcha** como mecanismo adicional contra envios automatizados.

O portfólio **não possui backend próprio**: a interface é uma aplicação cliente, e o recebimento de mensagens depende do serviço externo configurado.

## Estrutura do projeto

```text
portfolio_web/
├── .github/                 # Configurações de automação do repositório
├── public/                  # Favicon, imagem de compartilhamento e robots.txt
├── src/
│   ├── components/          # Navbar, Hero, ProjectsGrid, Skills, Seo e providers
│   │   └── ui/              # Componentes de interface reutilizáveis
│   ├── content/             # Conteúdo estruturado, incluindo o EI DataBot
│   ├── hooks/               # Hooks reutilizáveis
│   ├── lib/                 # Funções utilitárias
│   ├── pages/               # Home, EI DataBot, Contato e páginas institucionais
│   ├── App.tsx              # Providers e configuração de rotas
│   ├── main.tsx             # Inicialização da aplicação
│   └── global.css           # Estilos globais e temas
├── .env.example             # Modelo de variáveis públicas do frontend
├── eslint.config.js         # Regras de análise estática
├── package.json             # Dependências e comandos npm
├── package-lock.json        # Versões resolvidas das dependências
├── tailwind.config.ts       # Configuração do Tailwind CSS
├── tsconfig.app.json        # Configuração TypeScript da aplicação
├── vercel.json              # Configuração de hospedagem e rotas
└── vite.config.ts           # Configuração do Vite
```

## Executar localmente

### 1. Pré-requisitos

- Node.js e npm instalados.
- Git para clonar o repositório.

### 2. Clonar o repositório

```bash
git clone https://github.com/renanmrbraga/portfolio_web.git
cd portfolio_web
```

### 3. Instalar as dependências

```bash
npm ci
```

O comando `npm ci` utiliza o `package-lock.json` para realizar uma instalação reproduzível das dependências.

### 4. Configurar o formulário de contato

Copie o arquivo de exemplo para `.env.local`. No PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Preencha as variáveis no arquivo local:

```dotenv
VITE_FORMSPREE_URL=https://formspree.io/f/seu-formulario
VITE_HCAPTCHA_SITE_KEY=sua-chave-publica-do-hcaptcha
```

**Importante:** variáveis com prefixo `VITE_` são incorporadas ao código do navegador. Não armazene senhas, tokens privados ou chaves secretas nesses campos. O funcionamento seguro do captcha depende também da validação feita pelo serviço que recebe o formulário.

### 5. Iniciar o ambiente de desenvolvimento

```bash
npm run dev
```

Acesse **http://localhost:8080/**, porta configurada em `vite.config.ts`.

### 6. Gerar e visualizar a versão de produção

```bash
npm run build
npm run preview
```

## Qualidade e manutenção

O projeto utiliza **ESLint** e **TypeScript** para manter o código padronizado.

```bash
# Análise estática
npm run lint

# Verificação de tipos
npx --no-install tsc --noEmit -p tsconfig.app.json
npx --no-install tsc --noEmit -p tsconfig.node.json

# Validação da compilação
npm run build

# Auditoria das dependências
npm audit
```

A execução do build **não substitui** a verificação de tipos nem a auditoria de dependências. Atualizações de bibliotecas devem ser avaliadas quanto à compatibilidade antes de serem aplicadas.

## SEO e publicação

A aplicação inclui metadados configurados em `src/components/Seo.tsx`, além de imagem de compartilhamento e `robots.txt` em `public/`.

O arquivo `vercel.json` contém a configuração de **fallback de rotas**, necessária para acessar diretamente páginas internas de uma SPA na hospedagem configurada.

Antes da publicação, confirme que o endereço efetivamente utilizado corresponde aos valores de **URL canônica** e **Open Graph** definidos no componente de SEO.

## Próximas melhorias

- [x] Estrutura com React, TypeScript e Vite.
- [x] Tema claro/escuro e conteúdo em português/inglês.
- [x] Formulário de contato e metadados de compartilhamento.
- [x] Página técnica para apresentar o EI DataBot.
- [x] Revisar dependências não utilizadas e vulnerabilidades de produção.
- [x] Otimizar o tamanho do bundle e o carregamento das rotas.
- [ ] Ampliar os testes automatizados e as verificações de acessibilidade.

## Licença

Distribuído sob a [Licença MIT](LICENSE).

## Contato

- [GitHub](https://github.com/renanmrbraga)
- [LinkedIn](https://www.linkedin.com/in/renanmrbraga)

---

© 2026 Renan Martins Braga. Todos os direitos reservados.
