---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-20
---

# 008 — mrmechazilla/host-app

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | src/main.ts:6 | . | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap depois do manifesto; interno à unidade |
| src-load-remote | src/app/app.routes.ts:1 | . | remote-resolution | Yes | Importa `loadRemoteModule`, usado em src/app/app.routes.ts:8 |
| src-load-remote | src/app/app.routes.ts:8 | . | remote-resolution | Yes | `loadRemoteModule({ type: 'manifest', remoteName: 'users-mfe', exposedModule: './users' })` em src/app/app.routes.ts:8-12 carrega as rotas do remote externo `users-mfe`; rotas registradas por `provideRouter(routes)` em src/app/app.config.ts:13 |
| src-load-remote | src/app/shared/utils/remote-loader.ts:1 | . | remote-resolution | No | Arquivo inteiro comentado (`/*` em src/app/shared/utils/remote-loader.ts:1, `*/` na linha 28) |
| src-load-remote | src/app/shared/utils/remote-loader.ts:14 | . | remote-resolution | No | Dentro do bloco comentado de src/app/shared/utils/remote-loader.ts:1-28 |
| src-load-remote | src/main.ts:2 | . | remote-resolution | Yes | Importa `loadManifest`, usado em src/main.ts:4 |
| src-load-remote | src/main.ts:4 | . | remote-resolution | Yes | `loadManifest("mf.manifest.json")` resolve os remotes `users-mfe` (public/mf.manifest.json:2-10) e `payments-mfe` (public/mf.manifest.json:11-19) antes do bootstrap; `main` em angular.json:41 |

## Construções fora da mineração

Nenhuma construção adicional.

## Resumo

Construções com composição: 4 (remote-resolution: 4).

## Notas

- Os arquivos estão em `src`, que a revisão estrutural julgou `No` (parte da aplicação `.`); por isso a unidade é `.`.
- `payments-mfe` só é resolvido pelo manifesto; nenhuma rota ativa o carrega (o único `loadRemoteModule` ativo é o de `users-mfe`).
- A busca por construções fora da mineração (passo 4 do método) encontrou só `import()` de arquivos locais dentro do bloco comentado de src/app/shared/utils/remote-loader.ts (linhas 5 e 9) e o campo `remoteEntry` de um tipo em src/app/core/models/remote-config.ts:2; nenhum é construção de composição ativa.
