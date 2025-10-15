import { Locator, expect, Page } from '@playwright/test';


export class Helpers {
    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    //Verificar que el elemento buscado por texto esté visible en la página
    async verificarTextoVisible(texto: string) {
        const elemento = this.page.getByText(texto)
        await expect(elemento).toBeVisible();
    }

    async esperarPorRespuestaAPI(url:string, metodo: string, status: number) {
        await this.page.waitForResponse(response => response.url().includes(url) &&
            response.request().method() === metodo &&
            response.status() === status
        );
    }
}