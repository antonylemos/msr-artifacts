---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 284 — RafaM-dev/hostRepo

## Dependências

| Manifesto:linha | Seção | Pacote | Versão | Tecnologia | Configurada | Evidência (artefato:linha) |
|---|---|---|---|---|---|---|
| package.json:26 | devDependencies | @originjs/vite-plugin-federation | ^1.4.1 | module-federation | Yes | vite.config.ts:3 (`import federation from "@originjs/vite-plugin-federation"`); vite.config.ts:8-15 (`federation({ name: "host", ... remotes: { "mf-remoteDetails": ... }, shared: ["react", "react-dom"] })` em `plugins`); package.json:7-8 (`vite` e `vite build`, que carregam o `vite.config.ts` da raiz); src/features/episodes_list/ListEpisodes.tsx:15 (`import DetailEpisode from "mf-remoteDetails/DetailEpisode"`, o remoto declarado em vite.config.ts:12), montado na rota `/episodes` em src/App.tsx:11 |

## Notas

- As três ocorrências da inspeção estão em `same_package_matches` (vite.config.ts:8, :11, :14); `other_package_matches` está vazio. O grep fora das listas acha só o import em vite.config.ts:3 e a declaração em package.json:26.
- `vite.config.ts` não é referenciado por nome: o Vite o carrega por convenção a partir da raiz, onde rodam os scripts `dev` e `build`.
