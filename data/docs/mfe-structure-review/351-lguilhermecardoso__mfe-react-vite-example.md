---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 351 — lguilhermecardoso/mfe-react-vite-example

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| mf-dashboard | mf-dashboard/index.html;mf-dashboard/package.json;mf-dashboard/vite.config.ts | mf-dashboard/package.json:1-11 (manifesto próprio) | mf-dashboard/index.html:11 (entrada `/src/main.tsx`); mf-dashboard/src/main.tsx:6-10 (monta React) | mf-dashboard/vite.config.ts:6-34 (configuração própria, saída `../dist/mf-dashboard`); mf-dashboard/package.json:8 (`tsc -b && vite build`) | — | — | Yes | Aplicação React com entrada standalone e build Vite próprios. |
| mf-login | mf-login/index.html;mf-login/package.json;mf-login/vite.config.ts | mf-login/package.json:1-11 (manifesto próprio) | mf-login/index.html:11 (entrada `/src/main.tsx`); mf-login/src/main.tsx:6-10 (monta React) | mf-login/vite.config.ts:6-34 (configuração própria, saída `../dist/mf-login`); mf-login/package.json:8 (`tsc -b && vite build`) | — | — | Yes | Aplicação React com entrada standalone e build Vite próprios. |
| mf-navbar | mf-navbar/index.html;mf-navbar/package.json;mf-navbar/vite.config.ts | mf-navbar/package.json:1-11 (manifesto próprio) | mf-navbar/index.html:11 (entrada `/src/main.tsx`); mf-navbar/src/main.tsx:6-10 (monta React) | mf-navbar/vite.config.ts:6-34 (configuração própria, saída `../dist/mf-navbar`); mf-navbar/package.json:8 (`tsc -b && vite build`) | — | — | Yes | Aplicação React com entrada standalone e build Vite próprios. |
| mf-personagem-detalhe | mf-personagem-detalhe/index.html;mf-personagem-detalhe/package.json;mf-personagem-detalhe/vite.config.ts | mf-personagem-detalhe/package.json:1-11 (manifesto próprio) | mf-personagem-detalhe/index.html:11 (entrada `/src/main.tsx`); mf-personagem-detalhe/src/main.tsx:6-10 (monta React) | mf-personagem-detalhe/vite.config.ts:6-34 (configuração própria, saída `../dist/mf-personagem-detalhe`); mf-personagem-detalhe/package.json:8 (`tsc -b && vite build`) | — | — | Yes | Aplicação React com entrada standalone e build Vite próprios. |
| root-app | root-app/index.html;root-app/package.json;root-app/vite.config.ts | root-app/package.json:1-11 (manifesto próprio) | root-app/index.html:15 (entrada `/src/main.tsx`); root-app/src/main.tsx:7-13 (monta React com `HashRouter`) | root-app/vite.config.ts:6-45 (configuração própria, saída `../dist/root-app`); root-app/package.json:8 (`tsc -b && vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |

## Resumo

Aplicações frontend no snapshot: 5 (mf-dashboard, mf-login, mf-navbar, mf-personagem-detalhe, root-app).

## Notas

- Não há `package.json` na raiz nem outra declaração de workspace; os `tsconfig*.json` marcados como `workspace-config` no `artifacts.csv` são configurações TypeScript de cada projeto.
- Deploy fica — em todas as linhas: o único workflow, `.github/workflows/deploy.yml:19-27`, roda `build-all.sh` e publica um único `./dist` no GitHub Pages. `build-all.sh:8-21` constrói cada diretório separadamente, mas o deploy é conjunto, sem job ou artefato só de um diretório.
- O número de linhas `Yes` (5) coincide com `frontend_units: 5` da classificação.
- A saída de build `dist/` citada na classificação não está nos arquivos do snapshot.
