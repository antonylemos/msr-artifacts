---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 335 — AstroSoup/web-lab-4

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| frontend/vite/host | frontend/vite/host/package.json;frontend/vite/host/vite.config.js | frontend/vite/host/package.json | frontend/vite/host/index.html:11 (`<script type="module" src="/src/main.js">`); frontend/vite/host/src/main.js:24-40 (`createApp(App)` com router e `app.mount('#app')`) | frontend/vite/host/vite.config.js:5-40 (configuração Vite própria com `vue()` e `federation`); frontend/vite/host/package.json:8 (`vite build`) | — | config/nginx/Dockerfile:5 (copia `frontend/vite/host/dist`); config/nginx/nginx.conf:18-35 (servidor na porta 3000 com `root /usr/share/nginx/html/host`) | Yes | Entrada que monta a UI Vue e build Vite próprio. |
| frontend/vite/remote-inputs | frontend/vite/remote-inputs/package.json;frontend/vite/remote-inputs/vite.config.js | frontend/vite/remote-inputs/package.json | frontend/vite/remote-inputs/index.html:11 (`<script type="module" src="/src/main.js">`; `src/main.js` tem 0 bytes); frontend/vite/remote-inputs/vite.config.js:16-18 (`exposes` `./InputsContainer`) | frontend/vite/remote-inputs/vite.config.js:5-32 (configuração Vite própria com `vue()` e `federation`); frontend/vite/remote-inputs/package.json:8 (`vite build`) | — | config/nginx/Dockerfile:6 (copia `frontend/vite/remote-inputs/dist`); config/nginx/nginx.conf:37-53 (servidor na porta 3001 com `root /usr/share/nginx/html/remote-inputs`) | Undetermined | Build próprio, mas a entrada do `index.html` é um arquivo vazio e nada no diretório inicia a UI sozinho; a UI só sai pelo módulo exposto. |
| frontend/vite/remote-results | frontend/vite/remote-results/package.json;frontend/vite/remote-results/vite.config.js | frontend/vite/remote-results/package.json | frontend/vite/remote-results/index.html:11 (`<script type="module" src="/src/main.js">`; `src/main.js` tem 0 bytes); frontend/vite/remote-results/vite.config.js:16-18 (`exposes` `./ResultsContainer`) | frontend/vite/remote-results/vite.config.js:5-32 (configuração Vite própria com `vue()` e `federation`); frontend/vite/remote-results/package.json:8 (`vite build`) | — | config/nginx/Dockerfile:7 (copia `frontend/vite/remote-results/dist`); config/nginx/nginx.conf:55-71 (servidor na porta 3002 com `root /usr/share/nginx/html/remote-results`) | Undetermined | Build próprio, mas a entrada do `index.html` é um arquivo vazio e nada no diretório inicia a UI sozinho; a UI só sai pelo módulo exposto. |

## Resumo

Aplicações frontend no snapshot: 1 (frontend/vite/host).

## Notas

- A classificação registra `frontend_units: 3` (host e dois remotes). A diferença vem dos remotes: o host monta `InputsContainer` e `ResultsContainer` pelos imports federados (frontend/vite/host/src/pages/MainPage.vue:6-7 e :23-24), mas nos remotes não há `createApp`/`mount` (grep em `src/` e `index.html`) e os `src/main.js` estão vazios. O `Undetermined` segue o caso de módulo de entrada vazio sem início standalone (039, 272) e diz respeito a construir/servir o diretório sozinho, não ao papel de remote, que é assunto da revisão de composição (seção 3.4.5 do protocolo).
- O deploy é um único contêiner nginx para as três unidades (config/docker-compose.yaml:38-52), com um `dist` e um servidor por unidade; `config/frontend/Dockerfile` está vazio (0 bytes).
- Os três `package.json` são marcados `workspace-config` no `artifacts.csv`, mas nenhum declara `workspaces`; cada pacote tem `package-lock.json` próprio.
