# Micro-frontends

Compor aplicações que possuem artefatos de build separados. Bloco 10, slides 67–72 da [apresentação](../../aula-arquitetura-front-end.html).

## Executar

Na raiz do material, depois de `npm ci`:

```bash
npm run aula -- 10
```

http://127.0.0.1:4300. O comando inicia os serviços necessários e Ctrl+C encerra o conjunto.

## Responsabilidades

```text
Shell → manifesto → módulo ESM remoto → mount(host) → cleanup()
```

Catálogo React e Checkout Angular são compilados separadamente e servidos em 4301 e 4302.

O shell em 4300 carrega um remoto por vez, trata falha de carregamento e chama a limpeza antes de desmontar. O Angular remoto usa AOT: ngc compila os componentes e o linker finaliza as bibliotecas antes do bundle ESM.

## Arquivos para acompanhar

- [Shell: apps/shell/src/main.ts](apps/shell/src/main.ts)
- [React: apps/catalogo-react/src/mount.tsx](apps/catalogo-react/src/mount.tsx)
- [Angular: apps/checkout-angular/src/mount.ts](apps/checkout-angular/src/mount.ts)

## Estrutura implementada

```text
├── apps/
│   ├── catalogo-react/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   └── mount.tsx
│   │   └── tsconfig.json
│   ├── checkout-angular/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── checkout-app.ts
│   │   │   └── mount.ts
│   │   └── tsconfig.json
│   └── shell/
│       ├── index.html
│       ├── package.json
│       ├── public/
│       │   └── remotes.json
│       ├── src/
│       │   └── main.ts
│       └── tsconfig.json
└── packages/
    └── contracts/
        └── mount.ts
```

## Trecho do exemplo

[apps/shell/src/main.ts](apps/shell/src/main.ts)

```ts
import type { Cleanup, Manifest, Remote } from '../../../packages/contracts/mount';
import '../../../../../material/estilos.css';
const host = document.querySelector<HTMLElement>('#remote')!;
const status = document.querySelector<HTMLElement>('#status')!;
let cleanup: Cleanup | undefined;
let revision = 0;
function desmontar() { cleanup?.(); cleanup = undefined; host.replaceChildren(); }
async function abrir(nome: 'catalogo' | 'checkout') {
  const atual = ++revision;
  desmontar(); status.textContent = 'Carregando';
  // Cada montagem possui um elemento próprio, evitando corrida entre carregamentos.
  const slot = document.createElement('div');
  host.append(slot);
  let dispose: Cleanup | undefined;
  try {
    const r = await fetch('/remotes.json', { cache: 'no-store', signal: AbortSignal.timeout(3000) });
    if (!r.ok) throw new Error('Manifesto indisponível');
    const manifesto: Manifest = await r.json();
    if (manifesto.version !== 1 || typeof manifesto[nome] !== 'string') throw new Error('Manifesto incompatível');
    const url = new URL(manifesto[nome]);
    // Lista de origens confiáveis deste laboratório; não aceite uma URL arbitrária do usuário.
    if (!['http://127.0.0.1:4301', 'http://127.0.0.1:4302'].includes(url.origin)) throw new Error('Origem não autorizada');
    const remote: Remote = await import(/* @vite-ignore */ url.href);
    if (atual !== revision) { slot.remove(); return; }
    if (typeof remote.mount !== 'function') throw new Error('Contrato incompatível');
    dispose = await remote.mount(slot);
    if (atual !== revision) { dispose(); slot.remove(); return; }
    cleanup = dispose;
    status.textContent = `Aplicação carregada: ${nome}`;
  } catch {
    dispose?.(); slot.remove();
    if (atual === revision) status.textContent = 'Aplicação indisponível. Tente abrir novamente.';
  }
}
document.querySelector('#catalogo')!.addEventListener('click', () => void abrir('catalogo'));
document.querySelector('#checkout')!.addEventListener('click', () => void abrir('checkout'));
document.querySelector('#desmontar')!.addEventListener('click', () => { ++revision; desmontar(); status.textContent = 'Aplicação desmontada'; });
```

## Exercício

Abra catálogo, checkout e desmonte; depois pare um servidor remoto e observe o fallback. Recompile apenas catálogo e confirme que o shell continua sem novo build.

## Decisão e custo

A composição usa ESM por URL e manifesto. Há bundles separados e um caminho de publicação independente; o laboratório não provisiona um pipeline de deploy.

## Referências

[Documentação ou artigo de referência](https://martinfowler.com/articles/micro-frontends.html). As demais fontes estão nos slides e no [guia do aluno](../../material/guia-do-aluno.md).

## Builds e publicação

```bash
npm run build --workspace 10-catalogo-react
npm run build --workspace 10-checkout-angular
npm run build --workspace 10-shell
```

Publique cada `dist/` separadamente e ajuste as URLs em `apps/shell/public/remotes.json` e a lista de origens permitidas do shell. Neste laboratório o shell fornece os estilos; o contrato é de montagem, sem comunicação de seleção entre catálogo e checkout. Cada remoto embute seu framework. Em produção, defina versionamento, rollback, cache e observabilidade.

Para observar a falha local sem encerrar toda a aula, abra os remotos em terminais separados pelos scripts `dev` dos seus workspaces depois de construir cada um. Pare apenas o remoto escolhido.
