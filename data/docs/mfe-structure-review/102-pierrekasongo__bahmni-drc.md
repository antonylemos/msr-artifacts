---
schema: 1
id: 970061359
full_name: pierrekasongo/bahmni-drc
commit: 80390077a0a2375568289d01bcde52a082dc28e0
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 102 — pierrekasongo/bahmni-drc

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| openmrs-module-bahmniapps/micro-frontends | openmrs-module-bahmniapps/micro-frontends/package.json;openmrs-module-bahmniapps/micro-frontends/webpack.config.js | openmrs-module-bahmniapps/micro-frontends/package.json | openmrs-module-bahmniapps/micro-frontends/webpack.config.js:16-20 (`entry` `ipd`, `next-ui`, `shared`; `src/ipd/index.js:8-34` só registra componentes AngularJS via `react2angular`) | openmrs-module-bahmniapps/micro-frontends/webpack.config.js + openmrs-module-bahmniapps/micro-frontends/package.json:57 (`webpack --mode production`), saída em `../ui/app/micro-frontends-dist` (`webpack.config.js:21-25`) | — | — | No | Bundles da ponte React escritos em `ui/app/micro-frontends-dist` e consumidos pelo build e pelas páginas da linha `openmrs-module-bahmniapps/ui` (`ui/Gruntfile.js:24-26`, `:77-79`; `ui/app/clinical/index.html:92-96`); não inicia UI própria |
| openmrs-module-bahmniapps/ui | openmrs-module-bahmniapps/ui/package.json | openmrs-module-bahmniapps/ui/package.json | openmrs-module-bahmniapps/ui/Gruntfile.js:215-229 (`useminPrepare.html` sobre `app/**/*.html`), p. ex. openmrs-module-bahmniapps/ui/app/home/index.html:34 (`ng-app="bahmni.home"`) e openmrs-module-bahmniapps/ui/app/clinical/index.html:29 (`ng-app="consultation"`) | openmrs-module-bahmniapps/ui/Gruntfile.js:600-620 (tasks `bundle` e `build`) + openmrs-module-bahmniapps/ui/package.json:117 (`grunt build`) | — | openmrs-module-bahmniapps/package/docker/Dockerfile:12-13 (`COPY ui/dist/` para o Apache); docker-compose.yml:366-372 (serviço `bahmni-web`, build da imagem local `bahmni-web-drc`) | Yes | Páginas AngularJS com entrada própria e build Grunt próprio, empacotadas em imagem Apache |

## Resumo

Aplicações frontend no snapshot: 1 (openmrs-module-bahmniapps/ui).

## Notas

- A classificação registra `frontend_units: 2`: o host Bahmni local e o remote IPD (`bahmni_ipd`), que vem de imagem/serviço externo (`docker-compose.yml:586-593`) e não tem fontes neste snapshot. Aqui o host aparece como uma só fronteira (`ui`); `micro-frontends` é a ponte React/Module Federation do mesmo host, construída para dentro de `ui/app/micro-frontends-dist` (`openmrs-module-bahmniapps/micro-frontends/README.md:27-28`), e não conta como aplicação separada.
- O `artifacts.csv` marca os dois `package.json` como `workspace-config`, mas nenhum tem campo `workspaces`, e o `matches.csv` não tem ocorrência `ws-*`. Não há `pnpm-workspace.yaml`, `lerna.json`, `nx.json`, `angular.json` nem `project.json` no snapshot.
- Os demais Dockerfiles (`bahmni-proxy/`, `openmrs-db/`, `default-config/package/docker/`) e serviços do Compose são de proxy, banco, configuração e serviços de terceiros, não de `micro-frontends`. Não há workflow de CI no snapshot. O chart em `openmrs-module-bahmniapps/package/helm/values.yaml:12-15` aponta a imagem `bahmni/bahmni-web`, não a imagem local.
- Os symlinks `ui/app/app` e `ui/app/components` citados na classificação não estão em `files/` do snapshot; não alteram as linhas.
