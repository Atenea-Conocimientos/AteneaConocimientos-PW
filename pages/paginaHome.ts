import { Locator, Page } from '@playwright/test';

export class PaginaHome {
    readonly page: Page;
    readonly botonCrearCuenta: Locator;
    readonly urlHome = process.env.BASE_URL;

    constructor(page: Page) {
        this.page = page;
        this.botonCrearCuenta = page.getByRole('link', { name: 'Crear cuenta' });
    }

    async navegarAHome() {
        await this.page.goto(this.urlHome!);
    }

    async navegarARegistro() {
        await this.botonCrearCuenta.click();
    }
}
