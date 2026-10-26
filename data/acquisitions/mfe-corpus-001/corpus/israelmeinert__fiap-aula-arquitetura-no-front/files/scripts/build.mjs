import fs from 'node:fs';
import { npm, root } from './processos.mjs';
const numero = process.argv[2]?.padStart(2, '0'); const framework = process.argv[3];
const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const { globSync } = await import('node:fs');
const workspaces = pkg.workspaces.flatMap(pattern => [...globSync(pattern, { cwd: root })])
  .map(dir => JSON.parse(fs.readFileSync(`${root}/${dir}/package.json`, 'utf8')).name)
  .sort()
  .filter(name => (!numero || name.startsWith(numero + '-')) && (!framework || name.endsWith('-' + framework)));
if (!workspaces.length) throw new Error('Nenhum exemplo corresponde aos filtros');
for (const workspace of workspaces) await npm(['run', 'build', '--workspace', workspace], { wait: true });
console.log(`${workspaces.length} builds concluídos.`);
