import fs from 'node:fs';
import { npm, parar, aguardar, root } from './processos.mjs';
const exemplos = JSON.parse(fs.readFileSync(new URL('./exemplos.json', import.meta.url), 'utf8'));
const numero = process.argv[2]?.padStart(2, '0');
const escolha = process.argv[3] ?? 'react';
const exemplo = exemplos.find(e => e.numero === numero);
if (!exemplo) {
  console.log('Use: npm run aula -- NUMERO react|angular');
  exemplos.forEach(e => console.log(`${e.numero} · ${e.titulo}`));
  process.exit(numero ? 1 : 0);
}
if (!['react', 'angular'].includes(escolha) && numero !== '10') throw new Error('Escolha react ou angular');
const children = [];
let encerrando = false;
function encerrar(code = 0) { if (encerrando) return; encerrando = true; children.forEach(parar); process.exit(code); }
process.on('SIGINT', () => encerrar()); process.on('SIGTERM', () => encerrar());
function iniciar(workspace, script = 'dev') {
  const child = npm(['run', script, '--workspace', workspace]); children.push(child);
  child.on('error', error => { console.error(error); encerrar(1); });
  child.on('exit', code => { if (!encerrando) encerrar(code ?? 1); });
  return child;
}
try {
  const precisaApi = ['03', '04', '05', '06', '13', '14'].includes(numero) || (numero === '11' && escolha === 'react');
  if (precisaApi) { const child = npm(['run', 'api']); children.push(child); child.on('exit', code => { if (!encerrando) encerrar(code ?? 1); }); await aguardar('http://127.0.0.1:4010/health'); }
  if (numero === '10') {
    await Promise.all([npm(['run', 'build', '--workspace', '10-catalogo-react'], { wait: true }), npm(['run', 'build', '--workspace', '10-checkout-angular'], { wait: true })]);
    iniciar('10-catalogo-react'); iniciar('10-checkout-angular');
    await Promise.all([aguardar('http://127.0.0.1:4301/microfrontend.js'), aguardar('http://127.0.0.1:4302/microfrontend.js')]);
    iniciar('10-shell'); console.log('Abra http://127.0.0.1:4300');
  } else {
    if (numero === '13' && escolha === 'angular') iniciar('13-web-bff');
    const framework = escolha === 'angular' ? 'angular' : ['11', '13'].includes(numero) ? 'next' : numero === '12' ? 'astro' : 'react';
    iniciar(`${numero}-${framework}`);
    console.log(`Abra http://127.0.0.1:${framework === 'angular' ? 4200 : framework === 'next' ? 3000 : framework === 'astro' ? 4321 : 5173}`);
  }
} catch (error) { console.error(error); encerrar(1); }
