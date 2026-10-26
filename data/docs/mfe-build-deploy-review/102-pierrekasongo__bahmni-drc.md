---
schema: 1
id: 970061359
full_name: pierrekasongo/bahmni-drc
commit: 80390077a0a2375568289d01bcde52a082dc28e0
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

# 102 — pierrekasongo/bahmni-drc

## Leitura do repositório

O repositório é uma distribuição local de Bahmni/OpenMRS montada por Docker Compose. Não há
workspace nem workflow de CI, e o `matches.csv` não tem ocorrência `ci-*` nem `cfg-public-path`.
A única aplicação frontend da revisão estrutural é `openmrs-module-bahmniapps/ui`, as páginas
AngularJS do Bahmni. O build dela é Grunt: `yarn build` chama `grunt build`
(openmrs-module-bahmniapps/ui/package.json:117), que roda `yarn-install` e a task `bundle`
(openmrs-module-bahmniapps/ui/Gruntfile.js:600-620), com saída em `dist`
(openmrs-module-bahmniapps/ui/Gruntfile.js:9-10). A ponte React/Module Federation
(`openmrs-module-bahmniapps/micro-frontends`, `No` na revisão estrutural) tem build Webpack próprio
(`"build": "webpack --mode production"`, openmrs-module-bahmniapps/micro-frontends/package.json:57),
mas a saída vai para dentro da `ui`, em `ui/app/micro-frontends-dist`, e o Grunt da `ui` inclui
esses bundles nas listas de CSS e JS da aplicação (openmrs-module-bahmniapps/ui/Gruntfile.js:24-26,
:77-79). Nada no snapshot dispara os dois builds juntos; o README do módulo descreve rodar o build
da ponte antes (openmrs-module-bahmniapps/README.md:41-44). No snapshot,
`ui/app/micro-frontends-dist` só tem CSS, traduções e arquivos de licença, sem os `.min.js`, e não
há `ui/dist`. O `ui/scripts/package.sh` empacota `dist` num ZIP `bahmniapps.zip`
(openmrs-module-bahmniapps/ui/scripts/package.sh:13-15, :31), forma de distribuição herdada do
upstream que nenhum outro artefato do snapshot usa.

O empacotamento é uma imagem Apache. O Dockerfile `openmrs-module-bahmniapps/package/docker/Dockerfile`
parte de `httpd:2.4-alpine`, copia `httpd.conf` (que escuta na porta 8091,
openmrs-module-bahmniapps/package/docker/httpd.conf:53) e páginas estáticas de apoio, e copia
`ui/dist/` para `/usr/local/apache2/htdocs/bahmni/`
(openmrs-module-bahmniapps/package/docker/Dockerfile:1-13). O serviço `bahmni-web` do
`docker-compose.yml` constrói essa imagem como `bahmni-web-drc:latest`, no lugar da imagem
publicada `bahmni/bahmni-web`, que ficou comentada (docker-compose.yml:366-371). O mesmo serviço,
porém, monta por volume o código-fonte `${BAHMNI_APPS_PATH}/ui/app/` sobre
`/usr/local/apache2/htdocs/bahmni` e os componentes Bower sobre `bahmni/components`
(docker-compose.yml:375-377, com `BAHMNI_APPS_PATH='./openmrs-module-bahmniapps'` em .env:110). Com
esse volume, o que o Compose serve é `ui/app` como está no disco, e não o `dist` copiado na imagem:
é uma montagem de distribuição local com características de desenvolvimento. O `start.sh` constrói as três
imagens locais (`bahmni-web-drc`, `bahmni-config-drc`, `bahmni-proxy-drc`) e sobe o Compose
(start.sh:6-24), sem rodar o build Grunt. O proxy Apache (`bahmni-proxy/Dockerfile:1-8`) publica a
aplicação em `/bahmni`, encaminhando a `bahmni-web:8091` (bahmni-proxy/resources/bahmni-proxy.conf:40-41),
e redireciona `/home` para `/bahmni/home/` (bahmni-proxy/resources/bahmni-proxy.conf:6).

O remote IPD consumido pelo host não tem fontes aqui: o serviço `ipd` usa a imagem externa
`bahmni/microfrontend-ipd:${IPD_TAG}` (docker-compose.yml:586-594; `IPD_TAG=1.0.0` em .env:193),
com o volume de fontes locais comentado (docker-compose.yml:591-592), e o proxy encaminha `/ipd` a
ele (bahmni-proxy/resources/bahmni-proxy.conf:32-33). O host e o remote saem, portanto, em
imagens e serviços diferentes.

Os demais artefatos `ops-*` não cobrem aplicação frontend. `bahmni-proxy/Dockerfile` é o proxy
reverso. `default-config/package/docker/Dockerfile` copia a configuração clínica para
`/etc/bahmni_config` (default-config/package/docker/Dockerfile:1-10), e o chart
`default-config/package/helm/` (Chart.yaml, values.yaml e os templates `deployment.yaml`,
`rbac.yaml`, `restart-dependencies-script-configmap.yaml`, `serviceaccount.yaml`,
`volumes/bahmni-config.yaml`) implanta essa imagem de configuração (`bahmni/default-config:latest`,
default-config/package/helm/values.yaml:13-16). `openmrs-db/Dockerfile` é o MySQL do OpenMRS
(openmrs-db/Dockerfile:2). As outras ocorrências `ops-compose-service` do `docker-compose.yml` são
backends e serviços de terceiros por imagem publicada (OpenELIS, Odoo, OpenMRS, Metabase, Mart,
relatórios, PACS etc.). O chart `openmrs-module-bahmniapps/package/helm/` (Chart.yaml,
values.yaml, `deployment.yaml`, `service.yaml`, `hpa.yaml`) é o chart do Bahmni Web, mas aponta a
imagem publicada `bahmni/bahmni-web:latest`
(openmrs-module-bahmniapps/package/helm/values.yaml:12-15;
openmrs-module-bahmniapps/package/helm/templates/deployment.yaml:53), não a imagem local, e nenhum
script do snapshot o aplica. `docker-compose copy.yml` é uma cópia antiga do Compose: o serviço
`bahmni-web` dela usa como contexto `./openmrs-module-bahmniapps/package/docker`
(docker-compose copy.yml:362-367), onde não existem os `package/docker/...` e `ui/...` que o
Dockerfile copia, e o `start.sh` usa o `docker compose up` padrão (start.sh:24), que lê
`docker-compose.yml`.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | openmrs-module-bahmniapps/ui | separado | separado | `/bahmni` (bahmni-proxy/resources/bahmni-proxy.conf:40-41); porta 8091 do serviço `bahmni-web` (openmrs-module-bahmniapps/package/docker/httpd.conf:53) | No | openmrs-module-bahmniapps/ui/package.json:117 (`grunt build`); openmrs-module-bahmniapps/ui/Gruntfile.js:600-620 (tasks `bundle` e `build`, saída em `dist`); openmrs-module-bahmniapps/package/docker/Dockerfile:1-13 (imagem Apache com `ui/dist/` em `htdocs/bahmni`); docker-compose.yml:366-377 (serviço `bahmni-web`, imagem local `bahmni-web-drc:latest`, volume de `ui/app/`); start.sh:6-8 (build da imagem `bahmni-web-drc`); bahmni-proxy/resources/bahmni-proxy.conf:40-41 (`ProxyPass /bahmni`) |

## Observações

**1. openmrs-module-bahmniapps/ui.** Build `separado`: o Grunt da `ui` gera um artefato só dela em
`dist` (openmrs-module-bahmniapps/ui/Gruntfile.js:9-10, :600-620). Os bundles da ponte
`micro-frontends` entram nesse artefato (openmrs-module-bahmniapps/ui/Gruntfile.js:24-26, :77-79),
mas a ponte não é aplicação na revisão estrutural, e sim parte do mesmo host; o remote IPD não sai
desse build. Deploy `separado`: a aplicação tem imagem e serviço próprios (`bahmni-web`,
docker-compose.yml:366-371; openmrs-module-bahmniapps/package/docker/Dockerfile:13), à parte da
imagem externa que serve o remote IPD (docker-compose.yml:586-594). O volume de `ui/app/`
(docker-compose.yml:376) muda o que o serviço serve, o código-fonte em vez do `dist`, mas não muda
que a publicação da aplicação é própria. O chart Helm do Bahmni Web
(openmrs-module-bahmniapps/package/helm/values.yaml:12-15) também a implanta à parte, mas pela
imagem publicada do upstream, não pela deste snapshot. Versionamento `No`: `ui/package.json` declara
`"version": "1.1.0"` (openmrs-module-bahmniapps/ui/package.json:3), e o `.env` tem
`BAHMNI_WEB_IMAGE_TAG=1.1.0` (.env:109), mas a linha que usaria essa tag está comentada
(docker-compose.yml:370) e a imagem local sai com `latest` (docker-compose.yml:371; start.sh:8). A
versão `1.0.0` do chart (openmrs-module-bahmniapps/package/helm/Chart.yaml:5) é do chart, e a imagem
dele também usa `tag: latest` (openmrs-module-bahmniapps/package/helm/values.yaml:15).

## Resumo

Aplicações: 1. Build (separado: 1). Deploy (separado: 1). Versionamento independente: 0.
