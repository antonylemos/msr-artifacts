import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

function arquivos(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    if (['node_modules', 'dist', '.next', '.angular', '.astro'].includes(e.name)) return [];
    const p = path.join(dir, e.name);
    return e.isDirectory() ? arquivos(p) : /\.(ts|tsx|js|mjs)$/.test(p) ? [p] : [];
  });
}
function resolver(origem, spec) {
  const base = path.resolve(path.dirname(origem), spec);
  return [base, ...['.ts', '.tsx', '.js', '.mjs', '/index.ts', '/index.tsx'].map(e => base + e)].find(p => fs.existsSync(p) && fs.statSync(p).isFile());
}
function camada(p) {
  const full = p.replaceAll('\\', '/');
  // src/app é uma convenção do Angular, não a camada app do FSD.
  const marker = full.includes('/architecture/') ? '/architecture' : '/src';
  const offset = full.lastIndexOf(marker) + marker.length;
  const match = full.slice(offset).match(/\/(app|pages|widgets|features|entities|shared)\/([^/]+)/);
  if (!match) return null;
  const [_, layer, slice] = match;
  return { layer, slice, rank: ['app', 'pages', 'widgets', 'features', 'entities', 'shared'].indexOf(layer),
    base: full.slice(0, offset + match.index) + '/' + layer + '/' + slice };
}
function dependencia(origem, destino) {
  const erros = [];
  const p = origem.replaceAll('\\', '/'); const d = destino.replaceAll('\\', '/');
  if (p.includes('/07-feature-sliced-design/')) {
    const from = camada(p), to = camada(d);
    if (from && to) {
      const mesmaSlice = from.layer === to.layer && from.slice === to.slice;
      if (to.rank < from.rank || (to.rank === from.rank && !mesmaSlice && !['app', 'shared'].includes(from.layer))) erros.push('FSD: importe apenas camadas inferiores ou a própria slice');
      if (!mesmaSlice && !['app', 'shared'].includes(to.layer) && d !== to.base + '/index.ts') erros.push('FSD: consuma a API pública da slice');
    }
  }
  if (/\/(04-feature-based|14-escolha-e-evolucao)\//.test(p)) {
    const from = p.match(/\/features\/([^/]+)/), to = d.match(/\/features\/([^/]+)/);
    if (p.includes('/shared/') && to) erros.push('Shared não pode depender de features');
    if (from && to && from[1] !== to[1]) erros.push('A composição entre features pertence ao App');
    if (!from && to && !d.endsWith(`/features/${to[1]}/index.ts`)) erros.push('Consuma a API pública da feature');
  }
  if (/\/(05-clean-architecture|14-escolha-e-evolucao)\/.+\/features\/compra\//.test(p)) {
    if (p.includes('/domain/') && !d.includes('/domain/')) erros.push('O domínio deve permanecer independente');
    if (p.includes('/application/') && !/\/(application|domain)\//.test(d)) erros.push('Aplicação só importa o domínio e seus próprios contratos');
    if (p.includes('/infrastructure/') && /\/presentation\//.test(d)) erros.push('Infraestrutura não depende de apresentação');
    if (p.includes('/presentation/') && /\/infrastructure\//.test(d)) erros.push('Apresentação não importa o adaptador concreto');
  }
  if (p.includes('/06-hexagonal/') && p.includes('/core/') && !d.includes('/core/')) erros.push('O núcleo hexagonal não depende de adaptadores');
  if ((p.includes('/13-bff/') || p.includes('/11-renderizacao/')) && (p.includes('/web-angular/') || fs.readFileSync(origem, 'utf8').match(/^['"]use client['"]/))) {
    if (/\/(server|web-bff)\//.test(d)) erros.push('Código do servidor não pode chegar ao cliente');
  }
  // As alternativas devem continuar independentes: nenhum negócio atravessa exemplos.
  const exFrom = p.match(/\/exemplos\/([^/]+)/), exTo = d.match(/\/exemplos\/([^/]+)/);
  if (exFrom && exTo && exFrom[1] !== exTo[1]) erros.push('Exemplos alternativos não importam negócio uns dos outros');
  return erros;
}
export function verificarFronteiras(dir) {
  const errors = []; let count = 0;
  for (const file of arquivos(dir)) {
    const source = fs.readFileSync(file, 'utf8');
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const nucleo = /\/(domain|core)\//.test(file);
    function walk(node) {
      let spec;
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) spec = node.moduleSpecifier.text;
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) spec = node.arguments[0].text;
      if (spec) {
        count++;
        if (spec.startsWith('.')) {
          const target = resolver(file, spec);
          if (!target) errors.push(`${file}: import inexistente: ${spec}`);
          else errors.push(...dependencia(file, target).map(error => `${file}: ${error} (${spec})`));
        } else if (nucleo) errors.push(`${file}: núcleo importou biblioteca externa: ${spec}`);
      }
      if (nucleo && ts.isIdentifier(node) && ['fetch', 'window', 'document', 'localStorage'].includes(node.text)) errors.push(`${file}: núcleo conhece ${node.text}`);
      ts.forEachChild(node, walk);
    }
    walk(ast);
  }
  return { errors, count };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = verificarFronteiras(path.resolve('exemplos'));
  if (result.errors.length) { console.error(result.errors.join('\n')); process.exit(1); }
  console.log(`${result.count} imports: fronteiras verificadas.`);
}
