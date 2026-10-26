---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 185 — Marcel-b-velop/vue-mf

## Leitura do repositório

Workspace pnpm com quatro aplicações Vue 3 + Vite (pnpm-workspace.yaml:1-5: `lib`, `app-1`,
`app-2`, `host`). Cada uma tem `package.json` com `build` próprio, `vue-tsc -b && vite build`
(app-1/package.json:8; app-2/package.json:8; host/package.json:8; lib/package.json:11), e
`vite.config.ts` próprio com o plugin de Module Federation, que gera um `remoteEntry.js` por
aplicação (app-1/vite.config.ts:11-13; app-2/vite.config.ts:11-13; lib/vite.config.ts:17-19). O
`build` da raiz só delega aos membros (package.json:8, `pnpm -r run build`); cada `vite build`
gera o `dist` da sua pasta, ignorado pelo git (.gitignore:2).

O único workflow, "Build UI" (.github/workflows/node.js.yml:1-3), roda em todo push, instala o
workspace e chama `pnpm build` da raiz (.github/workflows/node.js.yml:20-23), e depois restaura,
constrói e testa a solução .NET em `Api/` (.github/workflows/node.js.yml:25-34). É integração
contínua: não guarda os `dist` nem os publica em lugar nenhum. Não há Dockerfile, compose,
manifesto de deploy nem configuração de hospedagem no snapshot.

O que existe para servir as aplicações é de desenvolvimento. Os remotes são vistos pelo host em
endereços `localhost` fixos (host/vite.config.ts:16-18: portas 5174, 5175 e 5177), que
correspondem ao `vite preview` de cada remote (app-1/package.json:10; app-2/package.json:10;
lib/package.json:9) ou, no caso de app-2, também ao `server.port` (app-2/vite.config.ts:40). Os
scripts `dev:all` combinam `vite build --watch` e `vite preview` com `concurrently`
(app-1/package.json:9-11; app-2/package.json:9-11; lib/package.json:8-10), e o README descreve
esse arranjo como a forma de ver lib e app-1 dentro do host (README.md:22). As oito ocorrências
`ops-cors` são os cabeçalhos `Access-Control-Allow-Origin: "*"` do `server` de desenvolvimento
de cada aplicação (app-1/vite.config.ts:37-39; app-2/vite.config.ts:41-43;
host/vite.config.ts:43-45; lib/vite.config.ts:52-54), não artefatos de deploy.

Fora das aplicações frontend: a API e o IdentityServer .NET em `Api/` são construídos pelo mesmo
workflow (.github/workflows/node.js.yml:30-34) e têm tarefas `build`/`publish` do VS Code
(.vscode/tasks.json:5-27) e perfis de execução em `localhost:5282` e `localhost:5283`
(Api/Api/Properties/launchSettings.json:9; Api/IdentityServer/Properties/launchSettings.json:9),
também de desenvolvimento. O `playwright.config.ts` de lib sobe `pnpm dev` para os testes e2e
(lib/playwright.config.ts:11, 21-22), e há um relatório Playwright versionado em
`lib/playwright-report/`, saída de teste e não de build.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | app-1 | separado | não observado | `http://localhost:5174` em desenvolvimento (app-1/package.json:10; host/vite.config.ts:16) | No | app-1/package.json:8 (`vue-tsc -b && vite build`); app-1/vite.config.ts:7-44 (configuração Vite com federation, gera `remoteEntry.js`); package.json:8 (`pnpm -r run build`); .github/workflows/node.js.yml:20-23 (CI instala e constrói o workspace, sem publicar) |
| 2 | app-2 | separado | não observado | `http://localhost:5175` em desenvolvimento (app-2/vite.config.ts:40; app-2/package.json:10; host/vite.config.ts:17) | No | app-2/package.json:8 (`vue-tsc -b && vite build`); app-2/vite.config.ts:7-48 (configuração Vite com federation, gera `remoteEntry.js`); package.json:8 (`pnpm -r run build`); .github/workflows/node.js.yml:20-23 (CI instala e constrói o workspace, sem publicar) |
| 3 | host | separado | não observado | — | No | host/package.json:8 (`vue-tsc -b && vite build`); host/vite.config.ts:7-50 (configuração Vite com os remotes); package.json:8 (`pnpm -r run build`); .github/workflows/node.js.yml:20-23 (CI instala e constrói o workspace, sem publicar) |
| 4 | lib | separado | não observado | `http://localhost:5177` em desenvolvimento (lib/package.json:9; host/vite.config.ts:18) | No | lib/package.json:11 (`vue-tsc -b && vite build`); lib/vite.config.ts:8-59 (configuração Vite com federation, gera `remoteEntry.js`); package.json:8 (`pnpm -r run build`); .github/workflows/node.js.yml:20-23 (CI instala e constrói o workspace, sem publicar) |

## Observações

**1. app-1.** Build próprio, que gera o `dist` de app-1 com o `remoteEntry.js` do remote
`remote-app1` (app-1/vite.config.ts:12-13); o workflow só o dispara pelo `pnpm build` da raiz,
junto com os demais (.github/workflows/node.js.yml:22-23; package.json:8). Nenhum artefato
publica esse `dist`: o endereço `localhost:5174` que o host usa (host/vite.config.ts:16) vem do
`vite preview --port 5174` (app-1/package.json:10), comando local. A versão `0.0.0`
(app-1/package.json:4) não é usada em publicação; o pacote é `private` (app-1/package.json:3).

**2. app-2.** Mesmo arranjo, com remote `remote-app2` (app-2/vite.config.ts:12-13). É a única
aplicação que fixa a porta também no `server` de desenvolvimento (app-2/vite.config.ts:40), igual
à do `preview` (app-2/package.json:10) e à que o host usa (host/vite.config.ts:17). Diferente das
outras, não tem `.gitignore` próprio, mas o da raiz exclui `dist/` (.gitignore:2). Versão `0.0.0`
sem uso na publicação (app-2/package.json:4).

**3. host.** Build próprio, que embute as URLs `localhost` dos três remotes
(host/vite.config.ts:15-19), ou seja, o `dist` do host só funciona com os remotes servidos nessas
portas locais. Não fixa porta: `dev` e `preview` usam os padrões do Vite (host/package.json:7, 10),
por isso "Onde é servida" fica `—`. O `filename: "remoteEntry.js"` (host/vite.config.ts:13) não
tem `exposes`. Versão `0.0.0` sem uso na publicação (host/package.json:4).

**4. lib.** Build próprio do remote `remote-lib` (lib/vite.config.ts:18-19), sem minificação e com
sourcemap (lib/vite.config.ts:42-44). Além do build, tem testes unitários e e2e (lib/package.json:12-17),
estes contra o servidor de desenvolvimento (lib/playwright.config.ts:11, 21-22); o workflow não
roda esses testes. Servida em `localhost:5177` pelo `vite preview` (lib/package.json:9), endereço
que host, app-1 e app-2 usam (host/vite.config.ts:18; app-1/vite.config.ts:19;
app-2/vite.config.ts:22). Versão `0.0.0` sem uso na publicação (lib/package.json:4).

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (não observado: 4). Versionamento independente: 0.
