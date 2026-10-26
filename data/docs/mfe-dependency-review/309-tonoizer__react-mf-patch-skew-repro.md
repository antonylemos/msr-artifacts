---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 309 — tonoizer/react-mf-patch-skew-repro

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| host/package.json:15 | devDependencies | @module-federation/vite | 1.21.6 | module-federation | Yes | host/vite.config.js:3 (`import { federation } from '@module-federation/vite'`); host/vite.config.js:19-36 (configuração padrão do Vite invoca `federation({ name: 'host', remotes: { remote_a, remote_b }, shared, ... })` em plugins); host/package.json:6 (build executa `vite build` sem configuração alternativa) |
| remote_a/package.json:15 | devDependencies | @module-federation/vite | 1.21.6 | module-federation | Yes | remote_a/vite.config.js:3 (`import { federation } from '@module-federation/vite'`); remote_a/vite.config.js:19-35 (configuração padrão do Vite invoca `federation({ name: 'remote_a', filename: 'remoteEntry.js', exposes: { './App' }, remotes: { remote_c }, shared, ... })`); remote_a/package.json:6 (build executa `vite build` sem configuração alternativa) |
| remote_b/package.json:15 | devDependencies | @module-federation/vite | 1.21.6 | module-federation | Yes | remote_b/vite.config.js:3 (`import { federation } from '@module-federation/vite'`); remote_b/vite.config.js:19-28 (configuração padrão do Vite invoca `federation({ name: 'remote_b', filename: 'remoteEntry.js', exposes: { './App' }, shared, ... })`); remote_b/package.json:6 (build executa `vite build` sem configuração alternativa) |
| remote_c/package.json:15 | devDependencies | @module-federation/vite | 1.21.6 | module-federation | Yes | remote_c/vite.config.js:3 (`import { federation } from '@module-federation/vite'`); remote_c/vite.config.js:19-28 (configuração padrão do Vite invoca `federation({ name: 'remote_c', filename: 'remoteEntry.js', exposes: { './App' }, shared, ... })`); remote_c/package.json:6 (build executa `vite build` sem configuração alternativa) |

## Notas

- As listas da inspeção citam as linhas 5-10 de cada `vite.config.js`, que são o objeto `shared` (singletons de React), e não o import; o import está na linha 3, fora das listas.
- Fora dos `vite.config.js`, o nome do escopo só aparece em `README.md:1` e `:24`, em `evidence/RESULT.json` e como chave de `Symbol.for('module-federation.shared-cache-owners')` em `host/src/App.jsx:11` e `scripts/capture.mjs:62`; nenhum desses importa o pacote.
- O repositório é uma reprodução de defeito: o build de produção é o objeto do experimento e, segundo `evidence/RESULT.json`, falha em runtime. Isso não muda o julgamento da linha, que só pergunta se o plugin está configurado e em uso no build.
