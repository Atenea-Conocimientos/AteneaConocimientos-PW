import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { PaginaHome } from '@pages/paginaHome';
import { PaginaRegistro } from '@pages/paginaRegistro';
import { Helpers } from '@utils/helpers';

let paginaHome: PaginaHome;
let paginaRegistro: PaginaRegistro;
let helpers: Helpers;

dotenv.config();

test.beforeEach(({ page }) => {
    paginaHome = new PaginaHome(page);
    paginaRegistro = new PaginaRegistro(page);
    helpers = new Helpers(page);
});

test('TC-3: Registro de estudiante (Sign up)', async ({ page }) => {
    const email = `estudiante${Date.now()}@automation.com`;
    await paginaHome.navegarAHome();
    await paginaHome.navegarARegistro();
    await paginaRegistro.registrarEstudiante('Juan', 'Pérez', email, 'Password123');
    // Verificar que el registro fue exitoso
    // Verificar que el request a /api/students/register de tipo post devuelva un 201 antes de continuar
    await helpers.esperarPorRespuestaAPI('/api/students/register', 'POST', 201);
    await expect(page).toHaveURL(/.*dashboard.*/);
    await helpers.verificarTextoVisible('Hola, Juan Pérez');
});
