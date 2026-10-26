---
schema: 1
id: 1408068032
full_name: israelmeinert/fiap-aula-arquitetura-no-front
commit: e1c6fb92488afd39e2c1d704ee1243ed52d862b6
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 283 — israelmeinert/fiap-aula-arquitetura-no-front

## Leitura do repositório

Material de aula de arquitetura front-end com 14 blocos de exemplos do mesmo domínio ("EventFlow"). Só o bloco `exemplos/10-micro-frontends/` compõe unidades. Os outros blocos são aplicações isoladas, cada uma com entrada e build próprios. A revisão estrutural conta 29 unidades, e 26 delas ficam fora de todas as relações. No bloco 10, o shell Vite/TypeScript (porta 4300, `exemplos/10-micro-frontends/apps/shell/package.json:7`) carrega em runtime um remoto por vez: o Catálogo React ou o Checkout Angular. O README resume o fluxo como "Shell → manifesto → módulo ESM remoto → mount(host) → cleanup()" (`exemplos/10-micro-frontends/README.md:18`).

Nenhuma biblioteca de MFE é usada (a revisão de dependências não encontrou nenhuma). A composição é feita à mão. O shell busca o manifesto `/remotes.json` e confere a versão e a origem da URL contra uma lista fixa (`exemplos/10-micro-frontends/apps/shell/src/main.ts:16-22`). Depois importa o módulo ESM remoto com `import(/* @vite-ignore */ url.href)` (`:23`), verifica se ele exporta `mount` (`:25`) e o monta num `div` próprio (`:12-13`, `:26`). Guarda o cleanup e o chama ao trocar de remoto ou ao desmontar (`:7`, `:28`, `:38`). Cada remoto é empacotado pelo script comum `scripts/build-remoto.mjs` como `dist/microfrontend.js` em formato ESM (`scripts/build-remoto.mjs:21-22`). O Angular passa antes pelo `ngc` (`exemplos/10-micro-frontends/apps/checkout-angular/package.json:7`). Os dois remotos são servidos por `scripts/servir-remoto.mjs`, com CORS liberado para o shell em 4300 (`scripts/servir-remoto.mjs:4-6`).

O contrato entre as unidades é só de tipos: `Mount`, `Remote` e `Manifest` em `exemplos/10-micro-frontends/packages/contracts/mount.ts:1-5`, que o comentário descreve como "sem componentes ou estado global compartilhados". `packages/contracts` não é unidade. Não há comunicação entre catálogo e checkout ("o contrato é de montagem, sem comunicação de seleção entre catálogo e checkout", `exemplos/10-micro-frontends/README.md:125`), por isso não há linha `communication`. Os `postMessage`, o `iframe` e o custom element registrados em `aula-arquitetura-front-end.html` são scripts internos do deck de slides e ficaram `No` na revisão de código-fonte. O teste e2e cobre montagem, troca, desmontagem e falha de remoto (`tests/e2e/aula.spec.ts:142-154`). O deploy independente é descrito, mas não provisionado (`exemplos/10-micro-frontends/README.md:111`, `:125`).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | exemplos/10-micro-frontends/apps/shell | exemplos/10-micro-frontends/apps/catalogo-react | host → remote | origem → destino | script | Yes | Yes | exemplos/10-micro-frontends/apps/shell/public/remotes.json:3 (`catalogo` → `http://127.0.0.1:4301/microfrontend.js`); exemplos/10-micro-frontends/apps/catalogo-react/package.json:7-8 (`build` com `build-remoto.mjs react`; `dev` serve na porta 4301); scripts/build-remoto.mjs:21-22 (entrada `src/mount.tsx`, saída `dist/microfrontend.js`, formato `esm`); scripts/servir-remoto.mjs:4-6 (CORS para `http://127.0.0.1:4300`, serve `dist`, `/microfrontend.js`) | exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3; exemplos/10-micro-frontends/apps/shell/src/main.ts:16; exemplos/10-micro-frontends/apps/shell/src/main.ts:23; exemplos/10-micro-frontends/apps/shell/src/main.ts:26 |
| 2 | exemplos/10-micro-frontends/apps/shell | exemplos/10-micro-frontends/apps/checkout-angular | host → remote | origem → destino | script | Yes | Yes | exemplos/10-micro-frontends/apps/shell/public/remotes.json:4 (`checkout` → `http://127.0.0.1:4302/microfrontend.js`); exemplos/10-micro-frontends/apps/checkout-angular/package.json:7-8 (`build` com `ngc` e `build-remoto.mjs angular`; `dev` serve na porta 4302); scripts/build-remoto.mjs:21-22 (entrada `dist/compiled/mount.js`, saída `dist/microfrontend.js`, formato `esm`); scripts/servir-remoto.mjs:4-6 (CORS para `http://127.0.0.1:4300`, serve `dist`, `/microfrontend.js`) | exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4; exemplos/10-micro-frontends/apps/shell/src/main.ts:16; exemplos/10-micro-frontends/apps/shell/src/main.ts:23; exemplos/10-micro-frontends/apps/shell/src/main.ts:26 |

## Observações

**1. exemplos/10-micro-frontends/apps/shell → exemplos/10-micro-frontends/apps/catalogo-react.** O manifesto liga a chave `catalogo` a `http://127.0.0.1:4301/microfrontend.js` (`exemplos/10-micro-frontends/apps/shell/public/remotes.json:3`). O destino é resolvido pelo nome do arquivo junto com a porta. O `build` do catalogo-react gera `dist/microfrontend.js` a partir de `src/mount.tsx` (`exemplos/10-micro-frontends/apps/catalogo-react/package.json:7`; `scripts/build-remoto.mjs:21-22`). O `dev` dele serve esse `dist` na porta 4301 (`exemplos/10-micro-frontends/apps/catalogo-react/package.json:8`; `scripts/servir-remoto.mjs:5-6`). O nome do arquivo sozinho não distingue os dois remotos, porque ambos geram `microfrontend.js`. Quem faz a distinção é a porta que cada `package.json` declara, e a chave do manifesto coincide com o nome da pasta. O tipo é `host → remote` porque o shell carrega o módulo exposto pelo destino com `import()` remoto (`exemplos/10-micro-frontends/apps/shell/src/main.ts:23`). O mecanismo é `script`: não há runtime de federação nem orquestrador, e o shell carrega por URL o bundle ESM gerado à parte, como na classificação (`approaches: [runtime-script]`). A diferença é que o bundle entra por `import()` dinâmico, sem `<script>` injetado nem global em `window`. A linha está ativa: as quatro construções da revisão de código-fonte são `Yes`. O `mount` exportado pelo remoto (`exemplos/10-micro-frontends/apps/catalogo-react/src/mount.tsx:3-5`) entra nesta relação, a do consumidor. As linhas 16, 23 e 26 de `main.ts` valem para as duas relações, porque `abrir(nome)` atende os dois botões (`exemplos/10-micro-frontends/apps/shell/src/main.ts:36-37`).

**2. exemplos/10-micro-frontends/apps/shell → exemplos/10-micro-frontends/apps/checkout-angular.** A resolução segue a da relação 1: a chave `checkout` aponta para `http://127.0.0.1:4302/microfrontend.js` (`exemplos/10-micro-frontends/apps/shell/public/remotes.json:4`). O checkout-angular gera `dist/microfrontend.js` a partir de `dist/compiled/mount.js`, que sai do `ngc` (`exemplos/10-micro-frontends/apps/checkout-angular/package.json:7`; `scripts/build-remoto.mjs:21-22`). O `dev` dele serve esse `dist` na porta 4302 (`exemplos/10-micro-frontends/apps/checkout-angular/package.json:8`). O `mount` cria uma aplicação Angular própria com `createApplication` e `createComponent`, e devolve um cleanup que destrói a view e a aplicação (`exemplos/10-micro-frontends/apps/checkout-angular/src/mount.ts:4-12`). Assim, o Angular roda dentro do shell sem ser o framework do shell. A origem `http://127.0.0.1:4302` está na lista de origens permitidas (`exemplos/10-micro-frontends/apps/shell/src/main.ts:22`).

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: exemplos/01-componentes/angular, exemplos/01-componentes/react, exemplos/02-atomic-design/angular, exemplos/02-atomic-design/react, exemplos/03-camadas/angular, exemplos/03-camadas/react, exemplos/04-feature-based/angular, exemplos/04-feature-based/react, exemplos/05-clean-architecture/angular, exemplos/05-clean-architecture/react, exemplos/06-hexagonal/angular, exemplos/06-hexagonal/react, exemplos/07-feature-sliced-design/angular, exemplos/07-feature-sliced-design/react, exemplos/08-mvvm/angular, exemplos/08-mvvm/react, exemplos/09-flux/angular, exemplos/09-flux/react, exemplos/11-renderizacao/angular, exemplos/11-renderizacao/next, exemplos/12-ilhas/angular, exemplos/12-ilhas/astro, exemplos/13-bff/apps/web-angular, exemplos/13-bff/next, exemplos/14-escolha-e-evolucao/angular, exemplos/14-escolha-e-evolucao/react.
