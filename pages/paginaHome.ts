import { Locator, Page } from '@playwright/test';

export class PaginaHome {
    readonly page: Page;
    readonly botonCrearCuenta: Locator;

    constructor(page: Page) {
        this.page = page;
        this.botonCrearCuenta = page.getByRole('link', { name: 'Crear cuenta' });
    }

    async navegarAHome() {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle');
    }

    async navegarARegistro() {
        await this.botonCrearCuenta.click({ force: true });
    }
}
