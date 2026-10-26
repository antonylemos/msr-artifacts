---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 378 — cMancillaValle/ARGOS-SiVIA

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| frontend | frontend/index.html | — | frontend/index.html:23-24 (página HTML com UI, Tailwind por CDN); frontend/dashboard.html:366-369 (carrega `js/api.js`, `js/rbac.js`, `js/router.js` e o widget por URL) | — (estático, sem build) | — | — | Yes | Páginas HTML próprias que carregam só scripts estáticos e CDNs, sem imports de pacotes npm; não precisa de build. |
| frontend-hermes | frontend-hermes/index.html;frontend-hermes/package.json;frontend-hermes/vite.config.ts | frontend-hermes/package.json:1-31 (pacote próprio) | frontend-hermes/vite.config.ts:11-12 (entrada de build `src/hermes-widget.tsx`); frontend-hermes/src/hermes-widget.tsx:6, 27, 57-58 (monta React com `createRoot` e registra `hermes-widget`) | frontend-hermes/vite.config.ts:10-16 (build de biblioteca IIFE `hermes-widget.js`); frontend-hermes/package.json:8 (`tsc -b && vite build`) | — | — | Yes | Aplicação React encapsulada em custom element, com entrada e build Vite próprios. |

## Resumo

Aplicações frontend no snapshot: 2 (frontend, frontend-hermes).

## Notas

- O resumo (2) coincide com `frontend_units: 2` da classificação.
- `frontend-hermes/index.html:11` aponta para `/src/main.tsx`, que não existe no snapshot. Esse HTML só serve ao `vite` de desenvolvimento; o build usa a entrada de biblioteca `src/hermes-widget.tsx` (`frontend-hermes/vite.config.ts:11-12`), que existe. Por isso a linha fica `Yes`.
- Sem deploy separado: o mesmo FastAPI serve as páginas de `frontend/` (`backend/main.py:257-278`, `292-293`) e o build do widget em `/hermes/` (`backend/main.py:92`, `281-282`); `ngrok_tunnel.py:52-62` roda `npm run build` em `frontend-hermes` antes de subir. O único artefato `ops-*` (`docker-compose.yml:3-5`) é o serviço do backend Python, que monta o repositório inteiro.
- `package-lock.json` na raiz não tem `package.json` correspondente e lista `"packages": {}`; não é workspace.
