import { Locator, Page } from '@playwright/test';

export class PaginaLogin {
    readonly page: Page;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly botonIniciarSesion: Locator;
    readonly linkOlvideMiPassword: Locator;
    readonly linkRegistrarse: Locator;
    readonly mostrarPassword: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputEmail = page.getByRole('textbox', { name: 'Correo Electrónico' });
        this.inputPassword = page.getByRole('textbox', { name: 'Contraseña' });
        this.botonIniciarSesion = page.getByRole('button', { name: 'Ingresar' });
        this.linkOlvideMiPassword = page.getByRole('link', { name: '¿Olvidaste tu contraseña?' });
        this.linkRegistrarse = page.getByRole('link', { name: '¿No tienes cuenta? Crea tu' });
        this.mostrarPassword = page.getByRole('button', { name: 'Mostrar contraseña' });
    }

    async navegarALogin() {
        await this.page.goto('/login');
        await this.page.waitForLoadState('load');
        // Wait for the email input to be ready (avoids networkidle which hangs with tsparticles/WS)
        await this.inputEmail.waitFor({ state: 'visible', timeout: 15000 });
    }

    async iniciarSesion(email: string, password: string) {
        // Do NOT use networkidle — tsparticles keeps the network active indefinitely
        await this.inputEmail.waitFor({ state: 'visible', timeout: 15000 });
        await this.inputEmail.fill(email);
        // Brief pause for React to re-render after email fill
        await this.page.waitForTimeout(400);
        await this.inputPassword.waitFor({ state: 'visible', timeout: 10000 });
        await this.inputPassword.fill(password);
        await this.botonIniciarSesion.click({ force: true });
    }
}
