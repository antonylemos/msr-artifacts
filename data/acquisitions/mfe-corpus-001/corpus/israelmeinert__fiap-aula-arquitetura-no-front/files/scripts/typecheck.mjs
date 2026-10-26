import ts from 'typescript';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { root } from './processos.mjs';
const configs = [...fs.globSync('exemplos/**/tsconfig.json', { cwd: root })].filter(p => !/node_modules|dist|\.next/.test(p));
let errors = 0;
for (const config of configs) {
  const angular = config.includes('/angular/') || config.includes('/web-angular/') || config.includes('/checkout-angular/');
  if (angular) {
    const result = spawnSync(process.execPath, [`${root}/node_modules/@angular/compiler-cli/bundles/src/bin/ngc.js`, '-p', config, '--noEmit'], { cwd: root, stdio: 'inherit' });
    if (result.status !== 0) errors++;
  } else {
    const file = ts.readConfigFile(config, ts.sys.readFile);
    const parsed = ts.parseJsonConfigFileContent(file.config, ts.sys, `${root}/${config.slice(0, config.lastIndexOf('/'))}`);
    const program = ts.createProgram(parsed.fileNames, { ...parsed.options, noEmit: true, incremental: false });
    const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)];
    if (diagnostics.length) { errors++; console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, { getCanonicalFileName: n => n, getCurrentDirectory: () => root, getNewLine: () => '\n' })); }
  }
}
if (errors) process.exit(1);
console.log(`${configs.length} projetos: tipos e templates verificados.`);
