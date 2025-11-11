import { Locator, Page } from '@playwright/test';

export class PaginaHeader {
    readonly page: Page;
    readonly logoAtenea: Locator;
    readonly misTalleresTab: Locator;
    readonly desafiosTab: Locator
    readonly misCertificadosTab: Locator;
    readonly topAteniensesTab: Locator;
    readonly ticketsComunidadTab: Locator;
    readonly cantidadDeVidas: Locator;
    readonly nivelUsuario: Locator;
    readonly puntosUsuario: Locator;
    readonly saludoUsuario: Locator;
    readonly botonNotificaciones: Locator;
    readonly botonPerfilUsuario: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoAtenea = page.getByRole('img', { name: 'Atenea Logo' });
        this.misTalleresTab = page.getByRole('link', { name: 'Mis Talleres' });
        this.desafiosTab = page.getByRole('link', { name: 'Desafíos' })
        this.misCertificadosTab = page.getByRole('link', { name: 'Mis Certificados' });
        this.topAteniensesTab = page.getByRole('link', { name: 'Top Atenienses' });
        this.ticketsComunidadTab = page.getByRole('link', { name: 'Tickets Comunidad' });
        this.cantidadDeVidas = page.getByTestId('lives-count');
        this.nivelUsuario = page.getByTestId('user-level');
        this.puntosUsuario = page.getByTestId('user-points');
        this.saludoUsuario = page.getByTestId('user-greeting');
        this.botonNotificaciones = page.getByRole('button', { name: 'Notificaciones' });
        this.botonPerfilUsuario = page.getByRole('button', { name: 'Perfil de Usuario' });
    }

}
