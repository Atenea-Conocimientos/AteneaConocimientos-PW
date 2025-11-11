import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Helpers } from '@utils/helpers';
import { PaginaLogin } from '@pages/paginaLogin';

let helpers: Helpers;
let paginaLogin: PaginaLogin;

dotenv.config();

test.beforeEach(({ page }) => {
    helpers = new Helpers(page);
    paginaLogin = new PaginaLogin(page);
});

test('TC-1: Login Exitoso', { tag: '@smoke' }, async ({ page }) => {
    const email = `estudiante${Date.now()}@automation.com`;
    await helpers.crearNuevoEstudiantePorApi('Juan', 'Pérez', email, 'Password123');
    await paginaLogin.navegarALogin();
    await paginaLogin.iniciarSesion(email, 'Password123');
    await helpers.esperarPorRespuestaAPI('/api/students/login', 'POST', 200);
    await expect(page).toHaveURL('dashboard');
});
