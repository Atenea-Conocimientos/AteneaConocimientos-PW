import { expect, Page } from '@playwright/test';

export class Helpers {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private getBaseURL(): string {
        const raw =
            process.env.PLAYWRIGHT_TEST_BASE_URL ||
            process.env.BASE_URL ||
            'https://qa.ateneaconocimientos.com';

        let url: URL;
        try {
            url = raw.startsWith('http') ? new URL(raw) : new URL(`https://${raw}`);
        } catch {
            url = new URL('https://qa.ateneaconocimientos.com');
        }
        url.protocol = 'https:';
        return url.origin;
    }

    //Verificar que el elemento buscado por texto esté visible en la página
    async verificarTextoVisible(texto: string) {
        const elemento = this.page.getByText(texto);
        await expect(elemento).toBeVisible();
    }

    async esperarPorRespuestaAPI(url: string, metodo: string, status: number) {
        await this.page.waitForResponse(
            (response) =>
                response.url().includes(url) &&
                response.request().method() === metodo &&
                response.status() === status,
        );
    }

    //Crear un nuevo estudiante mediante la API y verificar la respuesta
    async crearNuevoEstudiantePorApi(nombre: string, apellido: string, email: string, password: string) {
        const payload = {
            name: nombre,
            lastname: apellido, // <- minúsculas
            email,
            password,
        };

        const url = new URL('/api/students/register', this.getBaseURL()).toString();
        const response = await this.page.request.post(url, { data: payload });

        const status = response.status();
        if (status !== 201) {
            const body = await response.text();
            throw new Error(`Fallo al registrar estudiante. status=${status}. respuesta=${body}. payload=${JSON.stringify({ ...payload, password: '***' })}`);
        }
    }
}
