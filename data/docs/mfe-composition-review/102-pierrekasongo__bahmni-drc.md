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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 102 — pierrekasongo/bahmni-drc

## Leitura do repositório

É uma distribuição local de Bahmni/OpenMRS: o snapshot traz o frontend AngularJS do Bahmni
(`openmrs-module-bahmniapps/ui`), backends, configurações e o Compose que monta os serviços. A
única unidade frontend do snapshot é `openmrs-module-bahmniapps/ui`, um conjunto de páginas
AngularJS (clinical, adt, bedmanagement, registration etc.) servido por Apache. A composição
micro frontend está numa ponte React (`openmrs-module-bahmniapps/micro-frontends`), que a revisão
estrutural não conta como unidade: o Webpack a constrói para dentro de
`ui/app/micro-frontends-dist` (`openmrs-module-bahmniapps/micro-frontends/webpack.config.js:21-25`),
e as páginas do host a carregam por `<script>` (`openmrs-module-bahmniapps/ui/app/clinical/index.html:92-96`).
Por isso a ponte não aparece como Origem: as relações partem de `openmrs-module-bahmniapps/ui`,
que é quem usa os componentes.

O host é um container Module Federation (`name: "bahmni_mfe_host"`, `exposes: {}`,
`openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34-40`) que consome um único remote,
`bahmni_ipd`, sob o alias `@openmrs-mf/ipd` (`:38`). A URL do `remoteEntry.js` é montada em
runtime na mesma origem da página, em `/ipd/remoteEntry.js` (`:113-135`); o proxy encaminha `/ipd`
ao serviço `ipd` (`bahmni-proxy/resources/bahmni-proxy.conf:31-33`), que roda a imagem externa
`bahmni/microfrontend-ipd` (`docker-compose.yml:586-593`, tag `1.0.0` em `.env:193`). O remote não
tem fontes no snapshot. Dois módulos dele são consumidos (`IpdDashboard`, `CareViewDashboard`),
embrulhados em React e registrados como componentes AngularJS com `react2angular`
(`openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:19-34`); as páginas do host montam as
tags na rota IPD da aplicação clínica e na rota `careViewDashboard` de adt e bedmanagement,
passando `host-data`/`host-api`.

Há ainda, na aplicação de registro, um ponto de extensão que abre um iframe com `src` vindo da
configuração e escuta `message` da janela embutida
(`openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:21`, `:35-54`).
Nenhuma configuração do snapshot declara esse ponto de extensão, então destino e remetente ficam
sem identidade. O que não virou relação: o bundle `next-ui` da mesma ponte registra só componentes
locais (`openmrs-module-bahmniapps/micro-frontends/src/next-ui/index.js:1-39`); a carga dos bundles
da ponte pelas páginas (`openmrs-module-bahmniapps/ui/app/clinical/index.html:95`) é interna ao
host; os demais iframes (PDF da galeria, impressão, biblioteca vendorizada) não carregam unidades.
O propósito é de produto (distribuição clínica), com a arquitetura MFE herdada do upstream Bahmni.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | openmrs-module-bahmniapps/ui | bahmni_ipd | host → remote | origem → destino | module-federation | No | Yes | openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34-40 (`ModuleFederationPlugin` `bahmni_mfe_host`, remote `@openmrs-mf/ipd` → `bahmni_ipd`, `exposes: {}`); openmrs-module-bahmniapps/micro-frontends/webpack.config.js:113-135 (URL `/ipd/remoteEntry.js` na origem da página, proxy de `get`/`init`); bahmni-proxy/resources/bahmni-proxy.conf:31-33 (`ProxyPass /ipd http://ipd/ipd`); docker-compose.yml:586-593 (serviço `ipd`, imagem `bahmni/microfrontend-ipd`); .env:193 (`IPD_TAG=1.0.0`) | openmrs-module-bahmniapps/micro-frontends/webpack.config.js:119; openmrs-module-bahmniapps/micro-frontends/webpack.config.js:38; openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6; openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:6; openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:21; openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:31; openmrs-module-bahmniapps/ui/app/clinical/app.js:328; openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1; openmrs-module-bahmniapps/ui/app/adt/app.js:55; openmrs-module-bahmniapps/ui/app/bedmanagement/app.js:137 |
| 2 | openmrs-module-bahmniapps/ui | org.bahmni.registration.identifier | page → embedded-frontend | origem → destino | iframe | Undetermined | Undetermined | — | openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html:93 |
| 3 | openmrs-module-bahmniapps/ui | org.bahmni.registration.identifier | communication | Undetermined | events | Undetermined | Undetermined | — | openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39 |

## Observações

**1. openmrs-module-bahmniapps/ui → bahmni_ipd.** O destino é nomeado como aparece na
configuração, `bahmni_ipd` (`openmrs-module-bahmniapps/micro-frontends/webpack.config.js:38`): o
snapshot não tem a configuração do remote (`name`, `exposes`) para conferir. `No snapshot = No`
porque o remote está identificado como externo: o caminho `/ipd` da URL montada em `:115-121` é
encaminhado ao serviço `ipd` (`bahmni-proxy/resources/bahmni-proxy.conf:31-33`), que usa a imagem
publicada `bahmni/microfrontend-ipd:${IPD_TAG}` (`docker-compose.yml:586-588`); o volume que
apontaria para fontes locais está comentado (`:591-592`). A Origem é `openmrs-module-bahmniapps/ui`
e não a ponte: as linhas da ponte (config, `lazy(() => import("@openmrs-mf/ipd/..."))` em
`openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6` e
`openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:6`, registro
`react2angular` em `openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:21` e `:31`) estão
num diretório `No` da revisão estrutural, e a unidade que carrega e monta o remote é o host, pelo
módulo `bahmni.mfe.ipd` incluído em `openmrs-module-bahmniapps/ui/app/clinical/init.js:7-9` e pelas
tags em `openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1`,
`openmrs-module-bahmniapps/ui/app/adt/app.js:55` e `openmrs-module-bahmniapps/ui/app/bedmanagement/app.js:137`.
As duas exposições consumidas (`IpdDashboard`, `CareViewDashboard`) são do mesmo remote e formam
uma linha. A direção é do host para o remote; o contrato `hostData`/`hostApi` passa dados e
callbacks do host para a UI remota (`openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:20-28`),
o que é parte desta carga e não comunicação por mensagens. `Ativa = Yes` pelas linhas `Yes` da
revisão de código-fonte.

**2. openmrs-module-bahmniapps/ui → org.bahmni.registration.identifier.** O iframe
`extension-popup` (`openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html:93`)
recebe `src` do ponto de extensão `org.bahmni.registration.identifier` da configuração da
aplicação (`openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:21`,
`:35-37`). O destino leva o nome do ponto de extensão, único identificador que aparece no
artefato. Nenhum arquivo do snapshot declara esse ponto (a busca só retorna o controller e seu
teste), então não se sabe se o conteúdo é unidade local ou externa: `No snapshot = Undetermined`.
`Ativa = Undetermined` porque a única linha de código é `Undetermined`.

**3. openmrs-module-bahmniapps/ui → org.bahmni.registration.identifier.** O host registra
`$window.addEventListener("message", ...)` ao abrir o popup e, com o `patient` ou `patientUuid`
recebido, preenche o formulário ou navega
(`openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39-54`). A
Origem é `openmrs-module-bahmniapps/ui`, única unidade da revisão estrutural que participa da troca;
o Destino é o conteúdo do iframe da relação 2, nomeado como lá. O host só recebe: não há
`postMessage` do host para a janela embutida em `openmrs-module-bahmniapps/ui/app/registration`, o
que descarta `bidirecional`, e a Origem, que recebe, não é quem envia, o que descarta
`origem → destino`. O remetente esperado é a janela embutida, mas o handler não confere
`source` nem `origin` da mensagem (`openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39-40`), e o conteúdo do ponto de
extensão não se resolve no snapshot, então não está estabelecido quem envia: `Direção = Undetermined`.
`No snapshot = Undetermined` porque o Destino é o mesmo ponto de extensão não resolvido da relação 2;
`Ativa = Undetermined` porque a única linha de código é `Undetermined`.

## Resumo

Relações: 3 (host → remote: 1, page → embedded-frontend: 1, communication: 1). Ativas: 1. Destino fora do snapshot: 1.
Unidades sem relação: nenhuma.
