# Portfolio Web | Renan Braga

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**[View Portfolio](https://renanmrbraga.vercel.app/?utm_source=github&utm_medium=social&utm_campaign=portfolio&utm_content=portfolio_web)**

## About the Project

**Portfolio Web** is my professional portfolio, built as a **Single Page Application (SPA)** to showcase my work as a Data Analyst, technical skills, and projects involving data engineering, data science, automation, and artificial intelligence.

The application uses **React, TypeScript, Vite, and Tailwind CSS**, with reusable components, route-based navigation, a responsive interface, and content in Portuguese and English.

Its shared-component architecture standardizes layouts, typography, cards, badges, and spacing across pages. This approach makes it possible to update the visual identity centrally while preserving each section's functionality.

The featured projects are **Portfolio Web** itself and **EI DataBot**, a Brazilian educational data engineering and analytics platform featuring ETL pipelines, Medallion Architecture, PostgreSQL, dashboards, and evolving AI capabilities.

Development prioritizes simplicity, performance, accessibility, privacy, and maintainability.

## Features

- **Professional profile:** background, technical skills, and featured projects.
- **Projects:** technical descriptions, technologies, and repository links.
- **EI DataBot:** a dedicated page covering its architecture, implemented features, and ongoing development.
- **Internationalization:** interface and content in Portuguese and English.
- **Themes:** light and dark modes with locally persisted preferences.
- **Responsive design:** layouts adapted to mobile and desktop devices.
- **Contact:** Formspree form with hCaptcha, honeypot protection, and prevention of concurrent submissions.
- **Lead attribution:** capture of UTM parameters and visit-source information.
- **Google Analytics 4:** navigation and conversion events subject to user consent.
- **Privacy:** explicit analytics consent, including rejection and withdrawal options.
- **SEO:** page-specific metadata, canonical URLs, XML sitemap, Open Graph, Twitter Cards, and structured data.
- **Navigation:** routes for Home, EI DataBot, Contact, Privacy Policy, and Terms of Use.

## Technologies & Architecture

| Layer        | Technologies                      | Responsibility                                  |
| ------------ | --------------------------------- | ----------------------------------------------- |
| Interface    | React, TypeScript                 | Components and pages                            |
| Build        | Vite, SWC                         | Development and compilation                     |
| Styling      | Tailwind CSS, shadcn/ui, Radix UI | Layout, themes, and UI components               |
| Navigation   | React Router DOM                  | SPA routing                                     |
| Shared state | Context API and hooks             | Language, theme, and preferences                |
| SEO          | React Helmet Async, Node.js       | Dynamic metadata and route-specific static HTML |
| Contact      | Formspree, hCaptcha               | Message delivery and spam protection            |
| Attribution  | TypeScript, sessionStorage        | UTM capture and persistence                     |
| Analytics    | Google Analytics 4                | Navigation and conversion events                |
| Hosting      | Vercel                            | Static deployment and routing rules             |

### Visual Architecture

The application uses reusable components to maintain a consistent visual identity across pages.

| Component              | Responsibility                            |
| ---------------------- | ----------------------------------------- |
| `Layout.tsx`           | Global structure, Navbar, Footer, and SEO |
| `PageContent.tsx`      | Centering and standardized content widths |
| `PageSection.tsx`      | Section headings and spacing              |
| `PageCard.tsx`         | Card borders, surfaces, and effects       |
| `PageText.tsx`         | Typography and text formatting            |
| `Showcase.tsx`         | Projects, skills, and technology badges   |
| `AnalyticsConsent.tsx` | Analytics consent interface               |

The layout uses different content widths according to each section's purpose while maintaining centering and responsiveness.

Body text follows shared formatting rules, with alignment adapted to mobile and desktop screens. Light and dark themes share a visual identity based on neutral colors and red accents.

### Application Flow

1. Vite starts the development environment and builds production assets.
2. React Router resolves the requested route and renders its page.
3. Providers share language and theme preferences.
4. React Helmet Async updates page metadata.
5. The build process generates HTML files with metadata for the main routes.
6. The attribution system records visit-source information during the session.
7. The contact form sends messages to Formspree after antispam verification.
8. Google Analytics records events only with consent and on the authorized domain.

The portfolio **does not have its own backend**. Message processing and analytics collection rely on external services.

## Project Structure

```text
portfolio_web/
├── .github/                  # Repository configuration
├── public/
│   ├── dashboards/           # Dashboard images and assets
│   ├── favicon.ico
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── generate-seo.mjs      # Generate route-specific metadata HTML
│   └── sync-enade.mjs        # Update the ENADE preview
├── src/
│   ├── components/
│   │   ├── ui/               # UI components
│   │   ├── Layout.tsx        # Global page structure
│   │   ├── PageContent.tsx   # Shared content containers
│   │   ├── PageSection.tsx   # Headings and sections
│   │   ├── PageCard.tsx      # Reusable cards
│   │   ├── PageText.tsx      # Shared typography
│   │   └── Showcase.tsx      # Projects, skills, and badges
│   ├── content/              # Structured project and skill content
│   ├── hooks/                # Reusable hooks
│   ├── lib/                  # Attribution, analytics, and utilities
│   ├── pages/                # Application pages
│   ├── App.tsx               # Providers and routes
│   ├── main.tsx              # Application entry point
│   └── global.css            # Global styles
├── .env.example              # Example environment configuration
├── eslint.config.js          # ESLint configuration
├── package.json              # Dependencies and scripts
├── package-lock.json         # Locked dependency versions
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.app.json         # TypeScript configuration
├── vercel.json               # Deployment and routing rules
└── vite.config.ts            # Vite configuration
```

## Running Locally

### 1. Prerequisites

- Node.js compatible with the project and npm.
- Git.

### 2. Clone the Repository

```bash
git clone https://github.com/renanmrbraga/portfolio_web.git
cd portfolio_web
```

### 3. Install Dependencies

```bash
npm ci
```

This command uses `package-lock.json` for reproducible installation.

### 4. Configure Environment Variables

In PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Edit `.env.local`:

```dotenv
VITE_FORMSPREE_URL=https://formspree.io/f/your-form-id
VITE_HCAPTCHA_SITE_KEY=your-public-hcaptcha-site-key
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important:** variables prefixed with `VITE_` are bundled into code delivered to the browser. Never use this prefix for passwords, private tokens, or secret keys.

The Google Analytics measurement ID is public. Preventing analytics manipulation does not depend on keeping this ID secret.

### 5. Start the Development Server

```bash
npm run dev
```

Open:

http://localhost:8080/

**Intentional limitations of the local environment:**

- Google Analytics is not initialized on `localhost`.
- hCaptcha is disabled locally.
- Contact form submissions are unavailable in this environment.

These restrictions prevent production analytics from being affected by development traffic and avoid hCaptcha initialization issues during local development.

### 6. Build for Production

```bash
npm run build
npm run preview
```

The build synchronizes the ENADE preview, compiles the project with Vite, and generates route-specific HTML files for SEO.

Updating the ENADE preview requires the browser tools used by the synchronization script.

## SEO & Indexing

SEO combines **dynamic metadata** with HTML files generated during the build.

### Dynamic Metadata

The application uses:

- `src/components/Seo.tsx`
- `src/lib/page-metadata.ts`

Centralized configuration provides consistent titles and descriptions for the application and Google Analytics events.

### Static Metadata

The `scripts/generate-seo.mjs` script generates dedicated HTML files for the main pages.

Rules in `vercel.json` route requests to the corresponding HTML files while preserving React Router navigation in the browser.

### Additional Resources

- `public/sitemap.xml`: indexable URLs.
- `public/robots.txt`: crawler instructions.
- `public/og-image.png`: social-sharing image.
- JSON-LD: structured data about the portfolio owner.
- Canonical URLs: addresses without UTM parameters or fragments.
- `noindex`: nonexistent pages.

The canonical domain is:

`renanmrbraga.vercel.app`

## Contact & Source Attribution

The contact form uses **Formspree** to deliver messages and **hCaptcha** for spam protection.

It also includes:

- A honeypot field.
- Required-field validation.
- Prevention of concurrent submissions.
- Submission error handling.
- Confirmation without redirecting the visitor.
- hCaptcha token reset after an attempted submission.
- Isolation of widget-rendering errors.

### UTM Parameters

The application recognizes:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

When available, it also records the landing page, referring site, and capture timestamp.

Attribution data is preserved throughout the session and submitted to Formspree with the contact form.

This makes it possible to identify the origin of leads from links shared across different platforms and campaigns.

## Google Analytics 4 & Privacy

The analytics integration respects the visitor's choice.

### Consent

- Analytics consent is denied by default.
- The GA4 tag loads only after authorization.
- Visitors can accept or reject analytics collection.
- Preferences are stored in the browser.
- The footer provides access to consent preferences.
- Withdrawing consent stops new analytics events from being sent by the application.

### Events

| Event           | When it is sent                                           |
| --------------- | --------------------------------------------------------- |
| `page_view`     | Consented navigation between pages                        |
| `generate_lead` | Successful contact form submission confirmed by Formspree |

Page-view events are managed manually to avoid duplicates during SPA navigation.

The `page_view` event uses the corresponding page title and preserves only the permitted UTM parameters in the reported URL.

The `generate_lead` event does not transmit the visitor's name, email address, or message content.

## Quality & Maintenance

The project uses **TypeScript** and **ESLint** for static validation.

```bash
# Lint checks
npx eslint . --max-warnings 0

# Type checking
npx tsc --noEmit -p tsconfig.app.json

# Production build
npm run build

# Dependency audit
npm audit
```

To check formatting issues before a commit:

```bash
git diff --check
```

A successful build does not replace type checking, and a warning-free ESLint run does not guarantee that every feature works correctly.

## Deployment

The project is deployed on **Vercel**, with Vite generating the static assets.

The deployment configuration includes:

- Production builds with route-specific metadata generation.
- Rewrite rules for SEO HTML files.
- A fallback for React application routes.
- Environment variables configured on the platform.

Private credentials for external services must not be committed to the repository.

**Website:** [Visit Portfolio](https://renanmrbraga.vercel.app/?utm_source=github&utm_medium=social&utm_campaign=portfolio&utm_content=portfolio_web)

## Versioning

The project follows [Semantic Versioning](https://semver.org/) to identify releases.

The version format is `MAJOR.MINOR.PATCH`:

- **MAJOR:** incompatible changes.
- **MINOR:** new features and significant improvements.
- **PATCH:** fixes and minor adjustments.

During the initial development phase (`0.x.x`), the application may undergo significant structural changes.

Versions are identified by Git tags and documented in the [changelog](CHANGELOG.md).

**First recorded version:** `v0.1.0`.

**Current version:** `v0.1.1`.

## Roadmap

- [x] React, TypeScript, and Vite foundation.
- [x] Responsive interface with light and dark themes.
- [x] Portuguese and English content.
- [x] Dedicated EI DataBot technical page.
- [x] Contact form with Formspree and hCaptcha.
- [x] Protection against concurrent submissions.
- [x] Source attribution with UTM parameters.
- [x] Google Analytics 4 integration.
- [x] Analytics consent and withdrawal options.
- [x] Restrict analytics collection to the official domain.
- [x] Page-level SEO, sitemap, and structured data.
- [x] Legacy-code and dependency review.
- [x] Reusable visual component architecture.
- [x] Standardized page layouts and content containers.
- [x] Shared, responsive typography.
- [x] Unified cards and badges.
- [x] Consistent visual styling across light and dark themes.
- [x] Improved footer responsiveness.
- [x] Versioning structure and changelog.
- [ ] Expand automated testing.
- [ ] Extend accessibility checks.
- [ ] Monitor performance and user-experience metrics.

## License

Distributed under the [MIT License](LICENSE).

## Contact

- [Portfolio](https://renanmrbraga.vercel.app/?utm_source=github&utm_medium=social&utm_campaign=portfolio&utm_content=portfolio_web)
- [GitHub](https://github.com/renanmrbraga)
- [LinkedIn](https://www.linkedin.com/in/renanmrbraga)

---

© 2026 Renan Braga. Licensed under MIT.
