import { Locator, Page } from '@playwright/test';

export class PaginaRegistro {
    readonly page: Page;
    readonly inputNombre: Locator;
    readonly inputApellido: Locator;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly inputConfirmPassword: Locator;
    readonly botonRegistrarse: Locator;
    readonly linkYaTengoCuenta: Locator;
    readonly checkboxTerminos: Locator;
    readonly linkTerminos: Locator;
    readonly linkPoliticaPrivacidad: Locator;
    readonly buttonShowPassword: Locator;
    readonly buttonShowConfirmPassword: Locator;
    readonly buttonModalIrIniciarSesion: Locator;
    readonly buttonModalCerrar: Locator;    
    readonly buttonIrAIniciarSesion: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputNombre = page.getByRole('textbox', { name: 'Nombre' });
        this.inputApellido = page.getByRole('textbox', { name: 'Apellido' });
        this.inputEmail = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.inputPassword = page.getByRole('textbox', { name: 'Contraseña', exact: true });
        this.inputConfirmPassword = page.getByRole('textbox', { name: 'Confirmar contraseña' });
        this.botonRegistrarse = page.getByRole('button', { name: 'Crear cuenta' });
        this.linkYaTengoCuenta = page.getByRole('link', { name: '¿Ya tienes cuenta? Inicia' });
        this.checkboxTerminos = page.getByRole('checkbox', { name: 'Acepto los Términos y' });
        this.linkTerminos = page.getByRole('link', { name: 'Términos y Condiciones' });
        this.linkPoliticaPrivacidad = page.getByRole('link', {
            name: 'Política de Privacidad',
            exact: true,
        });
        this.buttonShowPassword = page.getByRole('button', { name: 'Mostrar contraseña' }).first();
        this.buttonShowConfirmPassword = page.getByRole('button', { name: 'Mostrar contraseña' }).last();
        this.buttonModalIrIniciarSesion = page.getByRole('button', { name: 'Ir a iniciar sesión' });        
    }

    async ingresarNombre(nombre: string) {
        await this.inputNombre.fill(nombre);
    }

    async ingresarApellido(apellido: string) {
        await this.inputApellido.fill(apellido);
    }

    async ingresarEmail(email: string) {
        await this.inputEmail.fill(email);
    }

    async ingresarPassword(password: string) {
        await this.inputPassword.fill(password);
    }

    async ingresarConfirmPassword(confirmPassword: string) {
        await this.inputConfirmPassword.fill(confirmPassword);
    }

    async clickBotonRegistrarse() {
        await this.botonRegistrarse.click();
    }

    async clickLinkYaTengoCuenta() {
        await this.linkYaTengoCuenta.click();
    }

    async checkTerminos() {
        await this.checkboxTerminos.check();
    }

    async clickLinkTerminos() {
        await this.linkTerminos.click();
    }

    async clickLinkPoliticaPrivacidad() {
        await this.linkPoliticaPrivacidad.click();
    }

    async toggleShowPassword() {
        await this.buttonShowPassword.click();
    }

    async toggleShowConfirmPassword() {
        await this.buttonShowConfirmPassword.click();
    }

    async registrarEstudiante(nombre: string, apellido: string, email: string, password: string) {
        await this.ingresarNombre(nombre);
        await this.ingresarApellido(apellido);
        await this.ingresarEmail(email);
        await this.ingresarPassword(password);
        await this.ingresarConfirmPassword(password);
        await this.checkTerminos();
        await this.clickBotonRegistrarse();
    }
    
    async clickButtonModalIrIniciarSesion() {
        await this.buttonModalIrIniciarSesion.click();
    }

};
