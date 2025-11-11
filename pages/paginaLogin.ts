import { Locator, Page } from '@playwright/test';

export class PaginaLogin {
    readonly page: Page;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator
    readonly bottonIniciarSesion: Locator;
    readonly linkOlvideMiPassword: Locator;
    readonly linkRegistrarse: Locator;
    readonly mostrarPassword: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputEmail = page.getByRole('textbox', { name: 'Correo Electrónico' });
        this.inputPassword = page.getByRole('textbox', { name: 'Contraseña' });
        this.bottonIniciarSesion = page.getByRole('button', { name: 'Ingresar' });
        this.linkOlvideMiPassword = page.getByRole('link', { name: '¿Olvidaste tu contraseña?' });
        this.linkRegistrarse = page.getByRole('link', { name: '¿No tienes cuenta? Crea tu' });
        this.mostrarPassword = page.getByRole('button', { name: 'Mostrar contraseña' });
    }

    async navegarALogin() {
        await this.page.goto('/login');
    }

    async iniciarSesion(email: string, password: string) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.bottonIniciarSesion.click();
    }
}
