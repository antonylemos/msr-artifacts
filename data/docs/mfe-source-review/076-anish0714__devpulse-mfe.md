---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 076 — anish0714/devpulse-mfe

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | packages/shell/src/App.tsx:7 | packages/shell | dynamic-loading | Yes | `lazy(() => import("pdfConversion/Widget"))` carrega em runtime o módulo `./Widget` do remote `pdfConversion`, declarado em `packages/shell/webpack.config.js:53` com a URL de `remoteEntry.js` montada em `:11-13`; o alvo é `packages/pdf-conversion-remote`, que expõe `./Widget` em `packages/pdf-conversion-remote/webpack.config.js:33-43`. O componente resultante entra em `sections` (`packages/shell/src/App.tsx:45`) e é renderizado em `:164`. Cadeia ativa: `packages/shell/webpack.config.js:28` → `packages/shell/src/index.ts:3` → `packages/shell/src/bootstrap.tsx:2,7` → `App.tsx`. |
| src-remote-import | packages/shell/src/App.tsx:8 | packages/shell | dynamic-loading | Yes | `lazy(() => import("pdfManipulation/Widget"))` carrega o módulo `./Widget` do remote `pdfManipulation`, declarado em `packages/shell/webpack.config.js:54` (URL em `:14-16`); alvo `packages/pdf-manipulation-remote`, que expõe `./Widget` em `packages/pdf-manipulation-remote/webpack.config.js:33-43`. Componente usado em `packages/shell/src/App.tsx:56` e renderizado em `:164`. |
| src-remote-import | packages/shell/src/App.tsx:9 | packages/shell | dynamic-loading | Yes | `lazy(() => import("devUtils/Widget"))` carrega o módulo `./Widget` do remote `devUtils`, declarado em `packages/shell/webpack.config.js:55` (URL em `:17-19`); alvo `packages/dev-utils-remote`, que expõe `./Widget` em `packages/dev-utils-remote/webpack.config.js:33-43`. Componente usado em `packages/shell/src/App.tsx:67` e renderizado em `:164`. |
| src-remote-import | packages/shell/src/App.tsx:10 | packages/shell | dynamic-loading | Yes | `lazy(() => import("pdfFormFiller/Widget"))` carrega o módulo `./Widget` do remote `pdfFormFiller`, declarado em `packages/shell/webpack.config.js:56` (URL em `:20-22`); alvo `packages/pdf-form-filler-remote`, que expõe `./Widget` em `packages/pdf-form-filler-remote/webpack.config.js:33-43`. Componente usado em `packages/shell/src/App.tsx:78` e renderizado em `:164`. |
| src-remote-import | packages/shell/src/App.tsx:11 | packages/shell | dynamic-loading | Yes | `lazy(() => import("ocr/Widget"))` carrega o módulo `./Widget` do remote `ocr`, declarado em `packages/shell/webpack.config.js:57` (URL em `:23-25`); alvo `packages/ocr-remote`, que expõe `./Widget` em `packages/ocr-remote/webpack.config.js:33-43`. Componente usado em `packages/shell/src/App.tsx:89` e renderizado em `:164`. |
| src-async-bootstrap | packages/dev-utils-remote/src/index.ts:3 | packages/dev-utils-remote | dynamic-loading | No | `import("./bootstrap")` é o carregamento assíncrono do próprio bootstrap da unidade, exigido pelo Module Federation para inicializar o escopo compartilhado (comentário em `packages/dev-utils-remote/src/index.ts:1-2`). O alvo é interno: `packages/dev-utils-remote/src/bootstrap.tsx:4-7` monta o próprio `App`. |
| src-async-bootstrap | packages/ocr-remote/src/index.ts:3 | packages/ocr-remote | dynamic-loading | No | `import("./bootstrap")` carrega o bootstrap da própria unidade; `packages/ocr-remote/src/bootstrap.tsx:4-7` monta o próprio `App`. Construção interna. |
| src-async-bootstrap | packages/pdf-conversion-remote/src/index.ts:3 | packages/pdf-conversion-remote | dynamic-loading | No | `import("./bootstrap")` carrega o bootstrap da própria unidade; `packages/pdf-conversion-remote/src/bootstrap.tsx:4-7` monta o próprio `App`. Construção interna. |
| src-async-bootstrap | packages/pdf-form-filler-remote/src/index.ts:3 | packages/pdf-form-filler-remote | dynamic-loading | No | `import("./bootstrap")` carrega o bootstrap da própria unidade; `packages/pdf-form-filler-remote/src/bootstrap.tsx:4-7` monta o próprio `App`. Construção interna. |
| src-async-bootstrap | packages/pdf-manipulation-remote/src/index.ts:3 | packages/pdf-manipulation-remote | dynamic-loading | No | `import("./bootstrap")` carrega o bootstrap da própria unidade; `packages/pdf-manipulation-remote/src/bootstrap.tsx:4-7` monta o próprio `App`. Construção interna. |
| src-async-bootstrap | packages/shell/src/index.ts:3 | packages/shell | dynamic-loading | No | `import("./bootstrap")` carrega o bootstrap do próprio shell; `packages/shell/src/bootstrap.tsx:4-7` monta o próprio `App`. Construção interna, embora seja o passo que habilita os `lazy(() => import(...))` de `packages/shell/src/App.tsx:7-11`. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | packages/shell/src/App.tsx:34 | packages/shell | host-relationship | Yes | `const sections: Section[] = [` abre a tabela de seções do shell, que declara quais aplicações ele usa e onde: cada entrada nomeia o remote (`key`), o pacote (`packageName`) e a URL do `remoteEntry.js` — `packages/pdf-conversion-remote` em `:37-45`, `packages/pdf-manipulation-remote` em `:48-56`, `packages/dev-utils-remote` em `:59-67`, `packages/pdf-form-filler-remote` em `:70-78` e `packages/ocr-remote` em `:81-89`. A navegação em `:135-148` escolhe a seção ativa e `:97` resolve o item correspondente. |
| manual | packages/shell/src/App.tsx:164 | packages/shell | runtime-composition | Yes | `<current.Component />` renderiza no host o componente `Widget` do remote selecionado, qualquer um dos cinco (`:45,56,67,78,89`), dentro do `Suspense` de `:163` e do `RemoteErrorBoundary` de `:162`. A prop `remoteName` passada ao error boundary é só o nome do pacote usado na mensagem de falha (`packages/shell/src/RemoteErrorBoundary.tsx:21,37`). |

## Resumo

Construções com composição: 7 (dynamic-loading: 5, host-relationship: 1, runtime-composition: 1).

## Notas

- `src-async-bootstrap` é falso positivo de composição nas seis unidades: o padrão pega o `import("./bootstrap")` que o Module Federation exige em cada entrada, sempre interno à própria unidade.
- Os cinco remotes são alvos dentro do snapshot, mas as URLs de produção (`packages/shell/src/App.tsx:43,54,65,76,87` e `packages/shell/webpack.config.js:12,15,18,21,24`) apontam para `https://anish0714.github.io/devpulse-mfe/remotes/...`; não foram acessadas.
- O campo `url` das entradas de `sections` é declarado em `packages/shell/src/App.tsx:28` e preenchido em `:42-44,53-55,64-66,75-77,86-88`, mas nenhum ponto do shell o lê — a resolução efetiva dos remotes vem de `packages/shell/webpack.config.js:52-58`. Não muda a resposta da linha de `sections`.
- `packages/shell/src/types/remotes.d.ts:1-29` declara os módulos `<remote>/Widget` para o TypeScript. É declaração de tipo, não construção de composição, e não virou linha.
- Nenhuma construção de comunicação entre unidades (`CustomEvent`, `postMessage`, `BroadcastChannel`, `storage`, barramento compartilhado), `iframe`, custom element ou carga por `<script>` foi encontrada nos arquivos de código do snapshot.
