---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 203 — agsosa/react-next-umd-remote-modules-poc

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| mf-1 | mf-1/next.config.ts;mf-1/package.json | mf-1/package.json | mf-1/src/pages/_app.tsx:5 (`export default function App`, Pages Router); mf-1/src/pages/index.tsx:11 (rota `/`); mf-1/vite.mf.ts:33 (`input: "src/RemoteModules/RemoteModules.ts"`, entrada do bundle UMD) | mf-1/next.config.ts:5-32 (`nextConfig`); mf-1/package.json:8 (`npm run build:vite && next build`); mf-1/package.json:11 (`vite build --config vite.mf.ts`); mf-1/vite.mf.ts:27-47 (`format: "umd"`, `outDir: "public/remote-modules"`) | — | — | Yes | App Next.js com entrada e build próprios; o mesmo build gera o bundle UMD remoto |
| shell | shell/next.config.js;shell/package.json | shell/package.json | shell/src/pages/_app.tsx:5 (`export default function App`, Pages Router); shell/src/pages/index.tsx:138 (rota `/`) | shell/next.config.js:2-18 (`nextConfig`, `publicRuntimeConfig.MF1_BASE_URL`); shell/package.json:7 (`next build`) | — | — | Yes | App Next.js com entrada e build próprios |

## Resumo

Aplicações frontend no snapshot: 2 (mf-1, shell).

## Notas

- N = 2 coincide com `frontend_units: 2` da classificação.
- Não há `workspaces` em `package.json` nem `pnpm-workspace.yaml`, `turbo.json`, `nx.json` ou `lerna.json`; a raiz não tem `package.json`, e cada diretório tem `package-lock.json` próprio. As ocorrências `ws-path-alias` (`<app>/tsconfig.json:16`) são aliases `paths` internos de cada app, não declaração de workspace.
- Nas duas apps Next.js a entrada segue a convenção do Pages Router (`src/pages/_app.tsx` + páginas), invocada por `next build`, sem declaração em configuração.
- Deploy: `README.md:7-8` cita deploys separados na Vercel (`umd-remote-modules-poc-shell`, `umd-remote-modules-poc-mf1`), mas não há `vercel.json`, Dockerfile nem workflow no snapshot. As demais ocorrências `ops-hosting` (`<app>/README.md:25-38`) são o texto padrão do create-next-app.
- `mf-1/public/remote-modules/bundle.js` é saída versionada do build Vite de `mf-1`, não uma unidade.
