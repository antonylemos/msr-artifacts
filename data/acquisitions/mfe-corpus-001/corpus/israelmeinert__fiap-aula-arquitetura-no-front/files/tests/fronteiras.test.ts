import { expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
// Verifica violações reais de import, incluindo imports dinâmicos.
// @ts-expect-error Ferramenta local em JavaScript, sem contrato de tipos externo.
import { verificarFronteiras } from '../scripts/fronteiras.mjs';
it('detecta domínio acoplado, slices irmãs e import profundo de módulo', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'eventflow-fronteiras-'));
  const criar = (p: string, s: string) => { const f = path.join(dir, p); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
  try {
    criar('05-clean-architecture/react/src/features/compra/domain/regra.ts', "import { api } from '../infrastructure/api';");
    criar('05-clean-architecture/react/src/features/compra/infrastructure/api.ts', 'export const api = 1;');
    criar('07-feature-sliced-design/react/src/features/a/index.ts', "export const carregar = () => import('../b');");
    criar('07-feature-sliced-design/react/src/features/b/index.ts', 'export const x = 1;');
    criar('04-feature-based/react/src/app/App.ts', "import { x } from '../features/eventos/interno';");
    criar('04-feature-based/react/src/features/eventos/interno.ts', 'export const x = 1;');
    criar('07-feature-sliced-design/angular/src/app/architecture/shared/ui/index.ts', "export const carregar = () => import('../../features/a');");
    criar('07-feature-sliced-design/angular/src/app/architecture/features/a/index.ts', 'export const x = 1;');
    const messages = verificarFronteiras(dir).errors.join('\n');
    expect(verificarFronteiras(dir).errors.filter((e: string) => e.includes('FSD: importe apenas'))).toHaveLength(2);
    expect(messages).toContain('domínio deve permanecer independente');
    expect(messages).toContain('FSD: importe apenas camadas inferiores');
    expect(messages).toContain('Consuma a API pública da feature');
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
it('aceita os imports de todos os exemplos', () => expect(verificarFronteiras(path.resolve('exemplos')).errors).toEqual([]));
