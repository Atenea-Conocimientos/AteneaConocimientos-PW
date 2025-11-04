import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const resolveEnvFile = (): string | undefined => {
    const testEnv = process.env.TEST_ENV ?? 'qa';
    const candidateFiles = [
        path.resolve(__dirname, `.env.${testEnv}`),
        path.resolve(__dirname, '.env'),
    ];

    return candidateFiles.find((filePath) => fs.existsSync(filePath));
};

const envFile = resolveEnvFile();
if (envFile) {
    dotenv.config({ path: envFile });
}

const baseURL = process.env.BASE_URL ?? 'http://localhost:3000';
const isCI = !!process.env.CI;

const baseProjects = [
    {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
    },
    {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
    },
    {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
    },
];

const projects = isCI
    ? baseProjects.filter((project) => project.name === 'chromium')
    : baseProjects;

export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        baseURL,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on',
    },

    /* Configure projects for major browsers */
    projects,

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
