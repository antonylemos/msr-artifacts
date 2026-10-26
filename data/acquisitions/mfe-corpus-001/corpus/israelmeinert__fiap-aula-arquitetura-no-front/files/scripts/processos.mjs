import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = fileURLToPath(new URL('../', import.meta.url));
export const npmCli = process.env.npm_execpath ?? path.join(path.dirname(process.execPath), '../lib/node_modules/npm/bin/npm-cli.js');
export const env = { ...process.env, CATALOGO_URL: process.env.CATALOGO_URL ?? 'http://127.0.0.1:4010/api', NG_CLI_ANALYTICS: 'false' };
export function npm(args, { wait = false, cwd = root } = {}) {
  const child = spawn(process.execPath, [npmCli, ...args], { cwd, env, stdio: 'inherit', detached: !wait && process.platform !== 'win32' });
  if (!wait) return child;
  return new Promise((resolve, reject) => { child.on('error', reject); child.on('exit', code => code === 0 ? resolve() : reject(new Error(`Processo terminou com código ${code}`))); });
}
export function parar(child) {
  if (!child || child.exitCode !== null) return;
  if (process.platform === 'win32') spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
  else { try { process.kill(-child.pid, 'SIGTERM'); } catch {} }
}
export async function aguardar(url) {
  const fim = Date.now() + 30000;
  while (Date.now() < fim) {
    try { if ((await fetch(url, { signal: AbortSignal.timeout(1000) })).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error(`Serviço não iniciou: ${url}`);
}
