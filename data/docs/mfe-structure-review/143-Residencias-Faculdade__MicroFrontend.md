---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 143 — Residencias-Faculdade/MicroFrontend

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | index.html;package.json;vite.config.ts | package.json | index.html:34 (`<script type="module" src="/src/main.ts">`, entrada Vite do diretório) | vite.config.ts:5-14 (`defineConfig`, `outDir: 'dist'`) + package.json:8 (`"build": "tsc && vite build"`) | — | Dockerfile:1-18 (`npm run build` e serve `dist/` com Nginx); docker-compose.yml:4-7 (serviço `shell`, `context: .`) | Yes | Casca Vite com entrada própria em `index.html` e build próprio. |

## Resumo

Aplicações frontend no snapshot: 1 (.).

## Notas

- A classificação registra `frontend_units: 2`: a casca da raiz e a unidade externa `member-manager`, carregada de `https://crud-member-manager.vercel.app/main.js` (public/microfrontends.json:4-6). A unidade externa não está no snapshot e não vira linha.
- `docker-compose.yml:19-22` declara o serviço `posts-crud` com `context: ../Caio/aprendendo/primeiro-projeto`, fora do repositório; não é unidade do snapshot.
- `Dockerfile.keycloak` e o serviço `keycloak` (docker-compose.yml:34-35) são do provedor de identidade, não de frontend.
- `package.json` e `tsconfig.json` aparecem como `workspace-config` no `artifacts.csv`, mas `package.json:1-24` não declara `workspaces`; a única ocorrência `ws-*` é o alias de caminho `tsconfig.json:11` (`paths`), que não é declaração de workspace.
