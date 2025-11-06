# Atenea Conocimientos - Automatizacion con Playwright

## Descripcion general

Este repositorio contiene un framework de automatizacion de pruebas end-to-end construido con Playwright y TypeScript para validar flujos clave de la plataforma Atenea Conocimientos. El proyecto sigue el patron Page Object Model (POM), centraliza helpers reutilizables y soporta ejecuciones locales y en integracion continua.

## Requisitos previos

- Node.js 18 LTS o superior.
- npm 9 o superior (instalado junto con Node.js).
- Navegadores soportados por Playwright (se instalan con `npx playwright install`).

## Instalacion inicial

1. Clonar el repositorio con tus credenciales.
2. Instalar dependencias:
    ```bash
    npm ci
    ```
    Usa `npm install` solo cuando necesites actualizar el `package-lock.json`.
3. Instalar los navegadores de Playwright si nunca se ha hecho en la maquina:
    ```bash
    npx playwright install --with-deps
    ```

## Configuracion de entornos

- Las variables se cargan con `dotenv`. Por defecto se lee un archivo `.env.qa` si el valor de `TEST_ENV` es `qa`; en su ausencia se utiliza `.env`.
- En local puedes definir `BASE_URL` dentro de `.env` (ya existe un ejemplo) u otros archivos `.env.<entorno>` para futuros despliegues.
- Usa el script `test:qa` o exporta `TEST_ENV` manualmente para seleccionar el archivo de entorno correcto.

## Estructura del proyecto

- `tests/`: suites de prueba en formato `.spec.ts`. Ejemplo actual: `registro.spec.ts`.
- `pages/`: page objects tipados (`PaginaHome`, `PaginaRegistro`) que encapsulan selectores y acciones.
- `utils/`: utilidades compartidas (`Helpers`) para expectativas comunes o sincronizacion.
- `docs/`: documentos funcionales y tecnicos de apoyo para el equipo QA.
- `playwright.config.ts`: configuracion central (baseURL, proyectos de navegadores, reportes, carga de entorno).
- `.github/workflows/playwright.yml`: pipeline de GitHub Actions que ejecuta las pruebas en ramas `main` y `master`.
- `tsconfig.json`: configuracion TypeScript con aliases (`@pages/*`, `@utils/*`, `@tests/*`).

## Dependencias relevantes

- `@playwright/test`: motor de pruebas end-to-end y assertions.
- `dotenv`: carga de variables de entorno segun el archivo seleccionado por `TEST_ENV`.
- `typescript`: tipado estricto y compatibilidad con POM.
- `eslint`, `@typescript-eslint/*`, `prettier`: calidad de codigo, linting y formato.
- `husky`: punto de entrada para ganchos git (pre-commit) cuando se configuren.

## Scripts npm disponibles

- `npm test`: ejecuta todas las pruebas con configuracion por defecto.
- `npm run test:qa`: fuerza `TEST_ENV=qa` antes de lanzar Playwright (ideal para pipelines).
- `npm run test:headed`: abre los navegadores en modo visible.
- `npm run test:ci`: usa el reporter en linea pensado para integracion continua.
- `npm run report:open`: abre el ultimo reporte HTML generado.
- `npm run trace:view`: abre en el Trace Viewer un archivo `trace.zip` descargado desde GitHub Actions.
- `npm run lint` / `npm run lint:fix`: analiza el codigo y corrige problemas de estilo.
- `npm run format` / `npm run format:check`: aplica o verifica formato Prettier.
- `npm run typecheck`: valida tipos sin emitir JS.
- `npm run trace:view`: abre `trace.zip` con Playwright Trace Viewer (artefacto descargado de CI).

## Como ejecutar las pruebas desde cero

1. Configura el archivo `.env` o `.env.qa` con `BASE_URL` apuntando al entorno objetivo.
2. Instala dependencias y navegadores como se indico.
3. Lanza las pruebas:
    ```bash
    npm run test:qa
    ```
    Si necesitas depurar, utiliza `npm run test:headed` y agrega `--debug` o `--trace on` segun tus necesidades.
4. Tras la ejecucion, abre el reporte interactivo:
    ```bash
    npm run report:open
    ```

## Flujo de trabajo recomendado para nuevas pruebas

1. Crear o actualizar page objects en `pages/` encapsulando selectores y acciones reutilizables.
2. Implementar helpers especificos en `utils/` para interacciones complejas o validaciones repetitivas.
3. Escribir la prueba en `tests/` importando los page objects y helpers mediante los aliases TypeScript (`@pages/...`, `@utils/...`).
4. Usar `test.describe` y `test.step` cuando el escenario lo requiera para una mejor trazabilidad en reportes.
5. Ejecutar `npm run lint` y `npm run typecheck` antes de abrir un pull request.

## Reportes y artefactos

- Playwright genera un reporte HTML en `playwright-report/`; se sobreescribe en cada ejecucion.
- Los videos, capturas y trazas se guardan en `test-results/` cuando hay fallos o reintentos.
- En GitHub Actions, siempre se publican dos artefactos: `playwright-report` (HTML navegable) y `playwright-trace/trace.zip` que contiene las trazas (`.zip`) de la corrida. Descarga `trace.zip` y abrelo localmente con `npm run trace:view`.
- GitHub Pages conserva automaticamente los ultimos 20 reportes en directorios `run-<numero>-attempt-<n>/`. El enlace `https://atenea-conocimientos.github.io/AteneaConocimientos-PW/latest/` apunta siempre al reporte mas reciente y la pagina principal lista el historial completo.

## Integracion continua

El workflow `.github/workflows/playwright.yml` ejecuta:

1. `npm ci` para instalar dependencias limpias.
2. `npx playwright install chromium` para asegurar el navegador usado en CI.
3. Espera hasta 10 minutos a que el entorno QA (`QA_URL` y la API derivada) responda 200/3xx antes de lanzar los tests.
4. `npx playwright test` contra el entorno recibido.
5. Subida del reporte y trazas como artefactos con retencion de 30 dias.
6. Publicacion en GitHub Pages conservando los ultimos 20 historicos (`run-xxxxx-attempt-yy/` + alias `latest/`) sin importar el evento que dispare la ejecucion.
7. Actualizacion del commit status `Playwright QA` en el repositorio origen para bloquear la fusion hasta que la ejecucion termine satisfactoriamente.

## Ejecuciones manuales o contra entornos efimeros

- **workflow_dispatch**: desde la pestaña _Actions_ selecciona _Playwright Tests_ y pulsa en _Run workflow_. El parametro opcional `qa_url` permite apuntar la corrida a cualquier entorno (por ejemplo, uno efimero). Si lo dejas vacio se usara `vars.DEFAULT_QA_URL` o `https://qa.ateneaconocimientos.com`.
- **repository_dispatch**: el repositorio A puede lanzar las pruebas enviando un POST al endpoint `repos/:owner/:repo/dispatches` con `event_type: trigger-playwright-tests` y un payload como:

    ```json
    {
        "event_type": "trigger-playwright-tests",
        "client_payload": {
            "qa_url": "https://mi-entorno-efimero.example",
            "commit_sha": "abc123",
            "source_repo": "Atenea-Conocimientos/repo-a"
        }
    }
    ```

En ambos casos, la ejecucion devuelve:

- Un commit status `Playwright QA` sobre `commit_sha` (o `github.sha` por defecto), con estado `pending` al iniciar y `success`/`failure`/`failure (cancelled)` segun el resultado. El `target_url` apunta al reporte en GitHub Pages cuando existe y, en su defecto, al run de GitHub Actions.
- Artefactos descargables: `playwright-report` (HTML) y `playwright-trace/trace.zip`.
- Notificacion en Slack (si `SLACK_WEBHOOK_URL` esta configurado) con enlaces al run y al reporte.
- El workflow requiere el secret `STATUS_PAT` (token con alcance `repo` sobre el repositorio A) para poder actualizar los commit status externos.

## Recursos adicionales

- Consultar `docs/config-entornos-playwright.md` para un detalle ampliado de configuracion.
- Revisar `docs/resumen-escenario-signup.md` para entender el escenario principal cubierto por la prueba actual.
- El roadmap de mejoras se encuentra en `docs/roadmap-framework-playwright.md`.

## Siguiente pasos sugeridos

- Habilitar ganchos de `husky` (`npm run prepare`) para asegurar linting automatizado.
- Agregar pruebas adicionales cubriendo flujos alternativos (validaciones de formularios, errores API).
- Configurar matrices de navegadores o entornos si se requiere mayor cobertura.
