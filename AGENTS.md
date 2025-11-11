# Repository Guidelines

## Project Structure & Module Organization

- `tests/`: Playwright specs (`*.spec.ts`). Example: `tests/registro.spec.ts`.
- `pages/`: Page Objects (POM). Example: `pages/paginaRegistro.ts` (`PaginaRegistro`).
- `utils/`: Shared helpers. Example: `utils/helpers.ts` (`Helpers`).
- `playwright.config.ts`: test config, reporters, env loading.
- Path aliases: `@pages/*`, `@utils/*`, `@tests/*` (see `tsconfig.json`). Example: `import { PaginaHome } from '@pages/paginaHome';`.

## Build, Test, and Development Commands

- Install deps: `npm ci` (CI) or `npm install` (local when updating lockfile).
- Install browsers: `npx playwright install --with-deps` (first run/local).
- Run all tests: `npm test`.
- Smoke subset: `npm run test:smoke` (grep `@smoke`).
- Headed/debug: `npm run test:headed` (add `--debug` if needed).
- CI reporter: `npm run test:ci`.
- Open HTML report: `npm run report:open`.
- View trace: `npm run trace:view` (from `trace.zip`).
- Quality gates: `npm run lint`, `npm run lint:fix`, `npm run typecheck`, `npm run format`, `npm run format:check`.
- Envs: set `BASE_URL` in `.env`/`.env.qa`; choose with `TEST_ENV=qa npm test` or `npm run test:qa`.

## Coding Style & Naming Conventions

- TypeScript strict mode; 4‑space indent; semicolons on; single quotes; trailing commas (see `.prettierrc.json`).
- ESLint (`eslint.config.cjs`) with `@typescript-eslint` rules (no floating/misused promises).
- Page Objects: Spanish `Pagina*` classes with `camelCase` locators (e.g., `buttonIrAIniciarSesion`).
- Tests: `*.spec.ts`, descriptive Spanish titles like `TC-3: Registro...`.

## Testing Guidelines

- Prefer POM + helpers over inline selectors.
- Avoid fixed waits; use `Helpers.esperarPorRespuestaAPI(...)` and Playwright `expect`.
- Tag critical paths with `@smoke` for fast checks.
- No coverage threshold enforced; prioritize key user journeys and error paths.

## Commit & Pull Request Guidelines

- Commits: concise, Spanish, action‑oriented (no strict Conventional Commits required).
- Pre-commit/pre-push hooks (Husky) run lint, format check, typecheck, and tests. Enable with `npm run prepare` once.
- PRs must include: summary, scope, how to run (`BASE_URL`, command), relevant screenshots/links to `report:open` or GitHub Pages “latest”. Ensure `lint`, `typecheck`, and tests pass.

## Security & Configuration Tips

- Do not commit secrets; use `.env`/`.env.qa` locally and GitHub Secrets in CI.
- Respect path aliases and keep selectors/actions inside Page Objects to reduce flakiness.
