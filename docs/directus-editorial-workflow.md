# Directus maintenance notes

## Scope

Keep the schema recovery package in [johnengleman/saints-server](https://github.com/johnengleman/saints-server) (recovery commit `e879f0b`). Its bootstrap script and schema snapshot rebuild structure, not lost content. They are unchanged.

The owner canceled visual editing and backups. No visual-editing package, frontend draft-preview credential, backup service, or MCP integration is included. Saint drafts are managed inside Directus; the frontend continues reading published content.

## Packages

Updated on 2026-09-01: Next.js 16.3.4, React 19.2.8, and the remaining direct dependencies to their latest compatible releases.

Compatibility exceptions:

- GraphQL 16.14.2: graphql-request 7.4.0 supports GraphQL 14–16, not 17.
- ESLint 9.39.5: Next's bundled parser and React lint integration do not work with ESLint 10.9.1.
- Node types remain on 22.x to match the runtime.
- TypeScript 7.0.2 provides the native compiler through `@typescript/native`; the official TypeScript 6.0.2 alias supplies the JavaScript API needed by Next and ESLint. See [Microsoft's integration instructions](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).

Next's flat ESLint configuration replaces the deprecated config. Hook compatibility fixes are limited to what the updated linter requires.

## Verification

Use Node 22, configure the public endpoints shown in `.env.example`, then run `npm ci`, `npm run lint`, and `npm run build`. Lint, TypeScript, production build, and sitemap generation passed against the Railway Directus endpoint.

## Directus

In Settings → Data Model → Saints, enable Versioning. Drafts are edited and published within Directus. No website preview URL is required.

Enable the Deployments module, connect Vercel using the owner-approved credential, and select only the `saints` project. No administrator or preview token belongs in the frontend environment.

MCP and the URL-to-saint ingestion pipeline remain future work after the site is ready for content.
