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
- `npm run lint` / `npm run lint:fix`: analiza el codigo y corrige problemas de estilo.
- `npm run format` / `npm run format:check`: aplica o verifica formato Prettier.
- `npm run typecheck`: valida tipos sin emitir JS.

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
- En GitHub Actions, el reporte se adjunta como artefacto descargable (`playwright-report.zip`).

## Integracion continua

El workflow `.github/workflows/playwright.yml` ejecuta:

1. `npm ci` para instalar dependencias limpias.
2. `npx playwright install --with-deps` para asegurar navegadores.
3. `npx playwright test` con `TEST_ENV=qa`.
4. Subida del reporte como artefacto con retencion de 30 dias.

## Recursos adicionales

- Consultar `docs/config-entornos-playwright.md` para un detalle ampliado de configuracion.
- Revisar `docs/resumen-escenario-signup.md` para entender el escenario principal cubierto por la prueba actual.
- El roadmap de mejoras se encuentra en `docs/roadmap-framework-playwright.md`.

## Siguiente pasos sugeridos

- Habilitar ganchos de `husky` (`npm run prepare`) para asegurar linting automatizado.
- Agregar pruebas adicionales cubriendo flujos alternativos (validaciones de formularios, errores API).
- Configurar matrices de navegadores o entornos si se requiere mayor cobertura.
