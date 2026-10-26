import { test, expect, type Page } from '@playwright/test';
import { spawn, type ChildProcess } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const npmCli = process.env.npm_execpath ?? path.join(path.dirname(process.execPath), '../lib/node_modules/npm/bin/npm-cli.js');
const children: ChildProcess[] = [];
let output = '';
function iniciar(numero: string, framework: string) {
  output = '';
  const child = spawn(process.execPath, [npmCli, 'run', 'aula', '--', numero, framework], {
    cwd: root, env: { ...process.env, NG_CLI_ANALYTICS: 'false' }, stdio: 'pipe', detached: process.platform !== 'win32',
  });
  child.stdout?.on('data', b => { output = (output + b.toString()).slice(-12000); });
  child.stderr?.on('data', b => { output = (output + b.toString()).slice(-12000); });
  children.push(child); return child;
}
async function pronto(child: ChildProcess, url: string) {
  const fim = Date.now() + 45000;
  while (Date.now() < fim) {
    if (child.exitCode !== null) throw new Error(`A aula encerrou: ${output}`);
    try { if ((await fetch(url, { signal: AbortSignal.timeout(1000) })).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error(`A aula não iniciou: ${url}\n${output}`);
}
async function cenario(page: Page, modo: string) {
  const r = await page.request.post('http://127.0.0.1:4010/__cenario', { data: { modo } });
  expect(r.ok()).toBe(true);
}
test.afterEach(async ({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) await testInfo.attach('servidor', { body: output, contentType: 'text/plain' });
  for (const child of children.splice(0)) {
    if (child.exitCode !== null) continue;
    if (process.platform === 'win32') spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    else { try { process.kill(-child.pid, 'SIGTERM'); } catch {} }
    await Promise.race([new Promise<void>(resolve => child.once('exit', () => resolve())), new Promise<void>(resolve => setTimeout(resolve, 1500))]);
  }
});
for (const framework of ['react', 'angular']) {
  for (const numero of ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14']) {
    test(`${numero} ${framework}: interação e fronteiras observáveis`, async ({ page }) => {
      const port = framework === 'angular' ? 4200 : ['11', '13'].includes(numero) ? 3000 : numero === '12' ? 4321 : 5173;
      const url = `http://127.0.0.1:${port}`;
      const aula = iniciar(numero, framework);
      await pronto(aula, url);
      const errors: string[] = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(url);
      if (numero === '01') {
        await page.getByRole('button', { name: 'Selecionar evento' }).click();
        await expect(page.getByRole('status')).toContainText('react-day');
      } else if (numero === '02') {
        await page.getByRole('searchbox').fill('angular');
        await expect(page.getByRole('heading', { name: 'Angular Day', exact: true })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'React Day', exact: true })).toHaveCount(0);
        await page.getByRole('searchbox').fill('inexistente');
        await expect(page.getByText('Nenhum evento encontrado')).toBeVisible();
        await page.getByRole('button', { name: 'Limpar busca' }).click();
        await expect(page.getByRole('heading', { name: 'React Day', exact: true })).toBeVisible();
      } else if (numero === '03') {
        await page.getByRole('button', { name: 'Consultar eventos' }).click();
        await expect(page.getByRole('status')).toHaveText('2 eventos disponíveis');
        await expect(page.getByRole('heading', { name: 'Workshop esgotado' })).toHaveCount(0);
        for (const modo of ['invalido', 'erro']) {
          await cenario(page, modo); await page.getByRole('button', { name: 'Consultar eventos' }).click();
          await expect(page.getByRole('status')).toContainText('Falha ao carregar');
        }
        await cenario(page, 'esgotado'); await page.getByRole('button', { name: 'Consultar eventos' }).click();
        await expect(page.getByRole('status')).toHaveText('0 eventos disponíveis');
        await cenario(page, 'normal'); await page.getByRole('button', { name: 'Consultar eventos' }).click();
        await expect(page.getByRole('status')).toHaveText('2 eventos disponíveis');
      } else if (numero === '04' || numero === '14') {
        await page.getByRole('button', { name: 'Consultar eventos' }).click();
        if (framework === 'react') {
          await page.getByRole('button', { name: 'Selecionar Angular Day' }).click();
          if (numero === '04') {
            await page.getByRole('button', { name: 'Adicionar ingresso' }).click();
            await expect(page.getByText('2 ingresso(s) · 24000 centavos')).toBeVisible();
          } else {
            await page.getByRole('button', { name: 'Simular compra' }).click();
            await expect(page.getByText('Total: 24000 centavos')).toBeVisible();
          }
        } else {
          await page.getByRole('link', { name: 'Simular Angular Day' }).click();
          await page.getByRole('button', { name: numero === '04' ? 'Simular 2 ingressos' : 'Simular compra' }).click();
          await expect(page.getByText('Total: 24000 centavos')).toBeVisible();
        }
      } else if (numero === '05' || numero === '06') {
        await page.getByRole('button', { name: 'Simular compra' }).click();
        await expect(page.getByText('Total: 30000 centavos')).toBeVisible();
        await page.getByRole('spinbutton').fill('7'); await page.getByRole('button', { name: 'Simular compra' }).click();
        await expect(page.getByText('Não foi possível simular')).toBeVisible();
        await page.getByRole('spinbutton').fill('2');
        await cenario(page, 'erro');
        if (numero === '06') {
          await page.getByRole('button', { name: 'Simular compra' }).click(); await expect(page.getByText('Total: 30000 centavos')).toBeVisible();
          await page.getByRole('button', { name: 'Trocar adaptador' }).click();
        }
        await page.getByRole('button', { name: 'Simular compra' }).click();
        await expect(page.getByText('Não foi possível simular')).toBeVisible();
      } else if (['07', '08', '09'].includes(numero)) {
        const button = page.getByRole('button', { name: 'Adicionar ingresso' });
        for (let i = 0; i < 5; i++) await button.click();
        await expect(button).toBeDisabled(); await expect(page.getByRole('status')).toContainText('6 ingresso(s)');
        if (numero !== '07') { await page.getByRole('button', { name: 'Reiniciar' }).click(); await expect(page.getByRole('status')).toContainText('1 ingresso(s)'); }
      } else if (numero === '11') {
        const raw = await page.request.get(url + '/evento');
        expect(await raw.text()).toContain('React Day');
        await page.getByRole('button', { name: 'Adicionar ingresso' }).click();
        await expect(page.getByRole('status')).toHaveText('2 ingresso(s)');
        await page.goto(url + '/sobre'); await expect(page.getByRole('heading', { name: 'Sobre o EventFlow' })).toBeVisible();
        const csr = await page.request.get(url + '/painel'); expect(await csr.text()).not.toMatch(/<h1[^>]*>Painel renderizado no navegador/);
        await page.goto(url + '/painel'); await expect(page.getByRole('heading', { name: 'Painel renderizado no navegador' })).toBeVisible();
      } else if (numero === '12') {
        const js: string[] = []; page.on('request', r => { if (r.resourceType() === 'script') js.push(r.url()); });
        await page.reload(); await page.waitForTimeout(400);
        const initial = new Set(js);
        if (framework === 'react') await expect(page.locator('astro-island')).toHaveAttribute('ssr', '');
        else await expect(page.getByRole('heading', { name: 'Mapa de assentos' })).toHaveCount(0);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        if (framework === 'react') await expect(page.locator('astro-island')).not.toHaveAttribute('ssr', '');
        await page.getByRole('button', { name: 'Adicionar ingresso' }).click();
        await expect(page.getByRole('status')).toHaveText('2 ingresso(s)');
        expect(js.some(url => !initial.has(url))).toBe(true);
        if (framework === 'react') await expect(page.locator('astro-island')).not.toHaveAttribute('ssr', '');
      } else if (numero === '13') {
        const button = page.getByRole('button', { name: 'Carregar resumo' });
        await button.click(); await expect(page.getByText('Ingressos disponíveis')).toBeVisible();
        await cenario(page, 'esgotado'); await button.click(); await expect(page.getByText('Evento esgotado')).toBeVisible();
        for (const modo of ['erro', 'invalido']) {
          await cenario(page, modo); await button.click(); await expect(page.getByRole('status')).toContainText('Resumo indisponível');
          const r = await page.request.get(url + (framework === 'angular' ? '/bff/resumo' : '/api/resumo')); expect(r.status()).toBe(502);
        }
        await cenario(page, 'normal'); await button.click(); await expect(page.getByText('Ingressos disponíveis')).toBeVisible();
      }
      expect(errors).toEqual([]);
    });
  }
}
test('10 micro-frontends: montagem, limpeza, remontagem e falha de remoto', async ({ page }) => {
  const aula = iniciar('10', 'react'); await pronto(aula, 'http://127.0.0.1:4300');
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:4300');
  await page.getByRole('button', { name: 'Abrir catálogo' }).click();
  await page.getByRole('button', { name: 'Selecionar evento' }).click(); await expect(page.getByText('Evento selecionado: react-day')).toBeVisible();
  await page.getByRole('button', { name: 'Abrir checkout' }).click();
  await expect(page.getByRole('heading', { name: 'Catálogo React' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Adicionar ingresso' }).click(); await expect(page.getByText('2 ingresso(s) · 30000 centavos')).toBeVisible();
  await page.getByRole('button', { name: 'Desmontar aplicação' }).click(); await expect(page.getByRole('heading', { name: 'Checkout Angular' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Abrir checkout' }).click(); await expect(page.getByText('1 ingresso(s) · 15000 centavos')).toBeVisible();
  // Altera apenas o manifesto para uma URL ausente na origem confiável. O shell permanece disponível.
  await page.route('**/remotes.json', route => route.fulfill({ json: { version: 1, catalogo: 'http://127.0.0.1:4301/inexistente.js', checkout: 'http://127.0.0.1:4302/microfrontend.js' } }));
  await page.getByRole('button', { name: 'Abrir catálogo' }).click();
  await expect(page.getByText('Aplicação indisponível. Tente abrir novamente.')).toBeVisible();
  expect(errors).toEqual([]);
});
