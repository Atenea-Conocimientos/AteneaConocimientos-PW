import {Locator, Page} from '@playwright/test';

export class PaginaLogin {
    readonly page: Page;
    readonly txtBoxCorreo: Locator;
    readonly txtBoxPassword: Locator;
    readonly botonIniciarSesion: Locator;

    

    constructor(page: Page) {
        this.page = page;
        this.txtBoxCorreo = page.getByRole('textbox', { name: 'Correo Electrónico' });
        this.txtBoxPassword = page.getByRole('textbox', { name: 'Contraseña' });
        this.botonIniciarSesion = page.getByRole('button', { name: 'Ingresar' })
    }

    async ingresarCorreo(correo: string) {
        await this.txtBoxCorreo.fill(correo);
    }

    async ingresarPassword(password: string) {
        await this.txtBoxPassword.fill(password);
    }

    async clickBotonIniciarSesion() {
        await this.botonIniciarSesion.click();
    }

    async iniciarSesion(correo: string, password: string) {
        await this.ingresarCorreo(correo);
        await this.ingresarPassword(password);
        await this.clickBotonIniciarSesion();
    }

};