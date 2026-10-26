---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
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

# 123 — PedroHugo11/mf-dashboard-module-federation

## Leitura do repositório

Prova de conceito com três projetos Vite independentes na raiz (`shell`, `mfe-weather` e `mfe-counter`), sem `package.json` na raiz nem workspace. Cada projeto tem manifesto, lockfile e scripts próprios, iguais nos três: `dev` (`vite`), `build` (`tsc -b && vite build`) e `preview` (`vite preview`) (shell/package.json:6-11; mfe-weather/package.json:6-11; mfe-counter/package.json:6-11). Cada `vite.config.ts` é próprio, com `build.target: "esnext"` e o plugin `@originjs/vite-plugin-federation`: os dois remotes geram `remoteEntry.js` (mfe-weather/vite.config.ts:14-21; mfe-counter/vite.config.ts:14-21) e o shell aponta para eles (shell/vite.config.ts:14-20). Nenhuma configuração define `base` ou outro caminho público, e a pasta `dist` gerada pelo build é ignorada pelo git (.gitignore:2; shell/.gitignore:11).

O snapshot não tem Dockerfile, Compose, workflow de CI nem configuração de hospedagem, e o `matches.csv` não tem ocorrências `ops-*`, `ci-*` ou `cfg-public-path`. O que existe é configuração de desenvolvimento: as portas de `server.port` (shell 5175, weather 5173, counter 5174; shell/vite.config.ts:6-8; mfe-weather/vite.config.ts:6-8; mfe-counter/vite.config.ts:6-8) e as URLs fixas em `localhost` dos remotes, nas portas 4173 e 4174 (shell/vite.config.ts:16-17), que casam com o `vite preview` padrão dos remotes. O README descreve exatamente esse roteiro local: build e preview de weather, depois de counter, e `npm run dev` no shell, aberto em `http://localhost:5175` (README.md:65-82). O README também lista "Independent builds and deployments" entre os conceitos demonstrados (README.md:43), mas nenhum artefato do snapshot faz deploy; pela regra, o README não decide a coluna Deploy.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | mfe-counter | separado | não observado | `http://localhost:5174` em desenvolvimento (mfe-counter/vite.config.ts:6-8); `http://localhost:4174` no `vite preview`, como o shell espera (shell/vite.config.ts:17) | No | mfe-counter/package.json:8 (`tsc -b && vite build`); mfe-counter/vite.config.ts:5-23 (configuração própria, gera `remoteEntry.js`); mfe-counter/package.json:10 (`vite preview`, só local) |
| 2 | mfe-weather | separado | não observado | `http://localhost:5173` em desenvolvimento (mfe-weather/vite.config.ts:6-8); `http://localhost:4173` no `vite preview`, como o shell espera (shell/vite.config.ts:16) | No | mfe-weather/package.json:8 (`tsc -b && vite build`); mfe-weather/vite.config.ts:5-23 (configuração própria, gera `remoteEntry.js`); mfe-weather/package.json:10 (`vite preview`, só local) |
| 3 | shell | separado | não observado | `http://localhost:5175` em desenvolvimento (shell/vite.config.ts:6-8) | No | shell/package.json:8 (`tsc -b && vite build`); shell/vite.config.ts:5-22 (configuração própria, consome os remotes por `localhost`) |

## Observações

**1. mfe-counter.** Build separado: o projeto tem `vite.config.ts` e script `build` próprios, que geram o `dist` só dele com o `remoteEntry.js` do remote `counter` (mfe-counter/package.json:8; mfe-counter/vite.config.ts:14-18). Deploy não observado: o único jeito de servir o build no snapshot é o `vite preview` (mfe-counter/package.json:10), comando local; a porta 4174 não está fixada na configuração do remote e só funciona se o preview de weather já ocupar a 4173, como na ordem do README (README.md:67-73). Versionamento `No`: `version: "0.0.0"` com `private: true` (mfe-counter/package.json:3-4), sem uso em publicação.

**2. mfe-weather.** Mesmo arranjo do counter: build próprio (mfe-weather/package.json:8; mfe-weather/vite.config.ts:14-18), servido só pelos comandos locais `vite` e `vite preview` (mfe-weather/package.json:7, 10). A porta 4173 da URL do shell (shell/vite.config.ts:16) é a padrão do `vite preview`, sem configuração no remote. Versionamento `No`: `version: "0.0.0"` e `private: true` (mfe-weather/package.json:3-4).

**3. shell.** Build separado: `tsc -b && vite build` com configuração própria (shell/package.json:8; shell/vite.config.ts:5-22); o código dos remotes não entra no artefato do shell, que só guarda as URLs dos `remoteEntry.js` (shell/vite.config.ts:15-18). Como essas URLs são fixas em `localhost`, um build do shell só funciona contra os remotes servidos na mesma máquina. O README roda o shell em `npm run dev`, não em preview (README.md:77-82). Deploy não observado e Versionamento `No`: `version: "0.0.0"` e `private: true` (shell/package.json:3-4).

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.
