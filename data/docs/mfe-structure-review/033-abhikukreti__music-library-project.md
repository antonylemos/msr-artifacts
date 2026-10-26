---
schema: 1
id: 1304607643
full_name: abhikukreti/music-library-project
commit: 4fdce67023d92745fe1212c84509efe1054a8a49
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 033 — abhikukreti/music-library-project

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| main-app | main-app/index.html;main-app/package.json;main-app/vite.config.js | main-app/package.json:1-11 (manifesto próprio) | main-app/index.html:10-11 (entrada main.jsx); main-app/src/main.jsx:10-18 (monta React) | main-app/vite.config.js:5-20 (configuração própria); main-app/package.json:8 (`vite build`) | — | — | Yes | Aplicação React com entrada e build Vite próprios. |
| music-library | music-library/index.html;music-library/package.json;music-library/vite.config.js | music-library/package.json:1-11 (manifesto próprio) | music-library/index.html:10-11 (entrada main.jsx); music-library/src/main.jsx:9-22 (inicia e monta React) | music-library/vite.config.js:5-21 (configuração própria); music-library/package.json:8 (`vite build`) | — | music-library/public/_headers:1-2 (cabeçalhos de hospedagem dos assets desta aplicação) | Yes | Aplicação React com entrada standalone e build Vite próprios. |

## Resumo

Aplicações frontend no snapshot: 2 (main-app, music-library).

## Notas

- README.md:6-7 e README.md:29-35 descrevem dois sites Netlify e seus diretórios de build. O snapshot não contém configuração de hospedagem do main-app; sua célula Deploy fica —. Para music-library há o arquivo _headers, sem workflow de publicação.
