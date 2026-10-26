---
schema: 1
id: 970061359
full_name: pierrekasongo/bahmni-drc
commit: 80390077a0a2375568289d01bcde52a082dc28e0
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 102 — pierrekasongo/bahmni-drc

## Leitura do repositório

É uma distribuição local de Bahmni/OpenMRS. A única unidade frontend do snapshot é o host AngularJS
`openmrs-module-bahmniapps/ui` (#28). A composição está numa ponte React com Module Federation
(`openmrs-module-bahmniapps/micro-frontends`). Essa ponte não é unidade: o build dela escreve dentro
da `ui` (#27). O remote consumido, `bahmni_ipd`, não tem fontes aqui e vem de uma imagem externa.

A cadeia que sustenta a arquitetura:
- **Dependência:** nenhuma linha na 3.4.2. A cadeia começa na configuração.
- **Configuração:** o `ModuleFederationPlugin` do host declara o remote `@openmrs-mf/ipd` → `bahmni_ipd`, com `exposes: {}`. A URL do `remoteEntry.js` é montada em runtime na origem da página (#1).
- **Código:** a declaração do remote (#16) e a injeção do script (#2). Os dois `lazy(() => import(...))` dos módulos `IpdDashboard` e `CareViewDashboard` (#17, #18). O registro deles como componentes AngularJS com `react2angular` (#19, #20). As rotas e tags do host que os montam nas aplicações clinical, adt e bedmanagement (#22–#25).
- **Relação:** host → remote `bahmni_ipd`, ativa, com destino fora do snapshot (#29).

Build e deploy: o host tem build Grunt e imagem Apache próprios (#32). O remote sai em outro serviço, o
que a observação #29 registra pelo Compose e pelo proxy.

Sinais que enganam:
- **Comunicação:** as oito ocorrências de `dispatchEvent` são `KeyboardEvent` sintéticos em testes unitários (#8–#15).
- **Iframes:** os da galeria, da impressão e da biblioteca vendorizada não carregam unidades (#4–#6). O helper de script carrega um arquivo de validação da configuração (#3).
- **Bundles:** a carga dos bundles da ponte pelas páginas é interna ao host (#21).
- **Documentação:** o README da ponte chama de micro-frontends os bundles locais `ipd`, `next-ui` e `shared`. Por isso quatro afirmações são contraditas (#39, #40, #42, #43). O histórico mostra que esse texto veio com a cópia do upstream (#51).

Fica ambíguo o ponto de extensão do registro: um iframe com `src` vindo da configuração e um
listener de `message` (#7, #26, #30, #31). Nenhuma configuração declara esse ponto. O histórico
mostra que ele nunca foi declarado neste repositório (#50).

## Observações

### 1. openmrs-module-bahmniapps/micro-frontends/webpack.config.js:16-25, 34-67, 113-138

**Observação:** A configuração Webpack da ponte define as entradas `ipd`, `next-ui` e `shared`, com saída em `../ui/app/micro-frontends-dist`. O `ModuleFederationPlugin` declara `name: "bahmni_mfe_host"` e o remote `"@openmrs-mf/ipd": remoteProxiedAtHostDomain({ name: "bahmni_ipd", path: "ipd" })`, com `exposes: {}`. Compartilha `carbon-components-react`, `carbon-components`, `bahmni-carbon-ui`, `react` e `react-dom` como `singleton` e `eager`. A função `remoteProxiedAtHostDomain` monta `/<path>/remoteEntry.js` sobre `window.location.href`, injeta o script e devolve um proxy de `get`/`init` de `window['<name>']`.

**Interpretação:** É a configuração do host que nomeia o remote `bahmni_ipd` e resolve o endereço dele em runtime, na mesma origem da página. O host não expõe nada.

**Nota:** A 3.4.5 #1 também cita, na coluna Configuração, `bahmni-proxy/resources/bahmni-proxy.conf:31-33`, `docker-compose.yml:586-593` e `.env:193`. São caminho de publicação, serviço e tag de imagem, ou seja, deploy. Ficam nas observações #29 e #32, e não aqui.

### 2. openmrs-module-bahmniapps/micro-frontends/webpack.config.js:119

**Observação:** `const script = document.createElement('script')`, dentro do texto que `remoteProxiedAtHostDomain` (`:113`) devolve. O `src` é `/<path>/remoteEntry.js` na origem atual (`:115-120`).

**Interpretação:** É a carga do bundle de entrada do remote. O remote chega pelos parâmetros `name` e `path` da função, usada com `bahmni_ipd` em `:38`.

### 3. openmrs-module-bahmniapps/ui/app/common/util/dynamicResourceLoader.js:6

**Observação:** O helper `includeJs` cria um `<script>` com o `src` recebido. O único chamador monta `<configBaseUrl>/registration/fieldValidation.js` (`openmrs-module-bahmniapps/ui/app/registration/initialization.js:29-31`).

**Interpretação:** É a carga de um script de validação da configuração da própria aplicação, e não de outra unidade. É um falso positivo da busca por carga de script.

### 4. openmrs-module-bahmniapps/ui/app/common/gallery/views/gallery.html:29

**Observação:** `<iframe ng-src="{{image.src}}" class="pdf-frame">` no ramo `isPdf(image)` da galeria de imagens.

**Interpretação:** O iframe exibe o PDF de um documento do paciente. Não é unidade frontend.

### 5. openmrs-module-bahmniapps/ui/app/common/ui-helper/printer.js:8

**Observação:** O factory `printer` cria um iframe oculto, escreve nele um HTML gerado localmente, imprime e o remove (`:6-20`).

**Interpretação:** É um recurso de impressão da aplicação. O iframe não carrega outra unidade.

### 6. openmrs-module-bahmniapps/ui/app/lib/magnific-popup/jquery.magnific-popup.js:1593

**Observação:** É o template de iframe do módulo `iframe` da biblioteca magnific-popup, vendorizada em `ui/app/lib`. Nenhum HTML ou build do snapshot referencia a biblioteca.

**Interpretação:** É código de terceiros inativo. Não participa da composição.

### 7. openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html:93; openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:21, 35-37

**Observação:** `<iframe id="extension-popup">`, mostrado por `controllerScope.showExtIframe`. O controller atribui o `src` em runtime a partir do ponto de extensão `org.bahmni.registration.identifier`. Nenhuma configuração do snapshot declara esse ponto.

**Interpretação:** O mecanismo de embutir conteúdo está implementado e ativo. Pode carregar uma unidade frontend externa ou apenas uma página de apoio, e o snapshot não decide entre as duas.

### 8. openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:63

**Observação:** `$window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape', 'metaKey': true, 'ctrlKey': false}))` num teste unitário.

**Interpretação:** O teste exercita o atalho de saída do controller. Não é comunicação entre unidades.

### 9. openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:69

**Observação:** O mesmo `dispatchEvent` de `KeyboardEvent`, com `ctrlKey: true`.

**Interpretação:** É um evento sintético de teste. Não é comunicação entre unidades.

### 10. openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:75

**Observação:** O mesmo `dispatchEvent` de `KeyboardEvent`, sem modificadores.

**Interpretação:** É um evento sintético de teste. Não é comunicação entre unidades.

### 11. openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:82

**Observação:** O mesmo `dispatchEvent` de `KeyboardEvent`, no caso em que o atalho não deve agir.

**Interpretação:** É um evento sintético de teste. Não é comunicação entre unidades.

### 12. openmrs-module-bahmniapps/ui/test/unit/bedmanagement/controllers/careViewController.spec.js:62

**Observação:** `$window.dispatchEvent(new KeyboardEvent('keydown', ...))` de Escape no teste do `CareViewController` de bedmanagement.

**Interpretação:** É um evento sintético de teste. Não é comunicação entre unidades.

### 13. openmrs-module-bahmniapps/ui/test/unit/bedmanagement/controllers/careViewController.spec.js:69

**Observação:** O mesmo `dispatchEvent` de `KeyboardEvent`, com `ctrlKey: true`.

**Interpretação:** É um evento sintético de teste. Não é comunicação entre unidades.

### 14. openmrs-module-bahmniapps/ui/test/unit/bedmanagement/controllers/careViewController.spec.js:76

**Observação:** O mesmo `dispatchEvent` de `KeyboardEvent`, sem modificadores.

**Interpretação:** É um evento sintético de teste. Não é comunicação entre unidades.

### 15. openmrs-module-bahmniapps/ui/test/unit/clinical/common/controllers/visitController.spec.js:171

**Observação:** `window.dispatchEvent(new KeyboardEvent('keydown', ...))` de Escape no teste do `VisitController`.

**Interpretação:** É um evento sintético de teste. Não é comunicação entre unidades.

### 16. openmrs-module-bahmniapps/micro-frontends/webpack.config.js:38

**Observação:** `"@openmrs-mf/ipd": remoteProxiedAtHostDomain({ name: "bahmni_ipd", path: "ipd" })`, na entrada `remotes` do `ModuleFederationPlugin`.

**Interpretação:** O host nomeia o remote `bahmni_ipd` e o caminho pelo qual o resolve.

### 17. openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6; openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:10-15

**Observação:** `const LazyApp = lazy(() => import("@openmrs-mf/ipd/IpdDashboard"))`, renderizado sob `Suspense` com `hostData` e `hostApi`.

**Interpretação:** O host importa sob demanda o módulo `IpdDashboard` do remote, pelo alias declarado, e lhe passa dados e callbacks.

### 18. openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:6; openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:10-12

**Observação:** `const LazyApp = lazy(() => import("@openmrs-mf/ipd/CareViewDashboard"))`, renderizado sob `Suspense` com `hostData` e `hostApi`.

**Interpretação:** O host importa sob demanda um segundo módulo do mesmo remote.

### 19. openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:21; openmrs-module-bahmniapps/ui/app/clinical/init.js:7-9

**Observação:** `.component("mfeIpdDashboard", react2angular(IpdDashboard), ...)` no módulo AngularJS `bahmni.mfe.ipd`. A aplicação clínica inclui esse módulo.

**Interpretação:** Registra o wrapper do módulo remoto `IpdDashboard` como componente AngularJS, montável nas páginas do host.

### 20. openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:31

**Observação:** `.component("mfeIpdCareViewDashboard", react2angular(CareViewDashboard), ...)` no mesmo módulo `bahmni.mfe.ipd`.

**Interpretação:** Registra o wrapper da segunda exposição do remote como componente AngularJS.

### 21. openmrs-module-bahmniapps/ui/app/clinical/index.html:95

**Observação:** `<script src="../micro-frontends-dist/ipd.min.js">`, depois de `shared.min.js` (`:92`) e antes de `next-ui.min.js` (`:96`). As mesmas cargas aparecem nas páginas de adt, bedmanagement e ot.

**Interpretação:** A página carrega o bundle da ponte, que é parte do próprio host. Não liga duas unidades.

### 22. openmrs-module-bahmniapps/ui/app/clinical/app.js:328-337

**Observação:** O estado `patient.dashboard.ipdVisit`, com URL `/dashboard/visit/ipd/:visitUuid?source`, usa o `templateUrl` `common/views/visitIpd.html`.

**Interpretação:** A tabela de rotas do host liga um caminho à tela que monta a UI do remote IPD.

### 23. openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1

**Observação:** `<mfe-ipd-dashboard ... host-data="ipdDashboard.hostData" host-api="ipdDashboard.hostApi">`.

**Interpretação:** O host monta a tag do componente que renderiza o `IpdDashboard` do remote.

### 24. openmrs-module-bahmniapps/ui/app/adt/app.js:51-58

**Observação:** O estado `careViewDashboard`, na URL `/home/careViewDashboard`, tem `template` inline com `<mfe-ipd-care-view-dashboard ... host-data="hostData" host-api="hostApi">`.

**Interpretação:** A rota da aplicação adt liga um caminho à UI `CareViewDashboard` do remote.

### 25. openmrs-module-bahmniapps/ui/app/bedmanagement/app.js:133-140

**Observação:** O estado `careViewDashboard` de bedmanagement tem a mesma tag `<mfe-ipd-care-view-dashboard>` no `template` inline.

**Interpretação:** A rota da aplicação bedmanagement liga um caminho à mesma UI do remote.

### 26. openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39-54

**Observação:** `$window.addEventListener("message", ...)`, registrado ao abrir o popup de identificador. Com o `patient` ou o `patientUuid` recebido, preenche o formulário ou navega. O handler não confere `source` nem `origin`.

**Interpretação:** É o canal pelo qual o conteúdo embutido em #7 devolveria dados ao host. Quem envia não se identifica no snapshot.

### 27. openmrs-module-bahmniapps/micro-frontends; openmrs-module-bahmniapps/micro-frontends/package.json:57; openmrs-module-bahmniapps/micro-frontends/webpack.config.js:16-25; openmrs-module-bahmniapps/ui/app/clinical/index.html:92-96

**Observação:** Tem manifesto e build Webpack próprios (`webpack --mode production`). A saída vai para `../ui/app/micro-frontends-dist`, que as páginas da `ui` carregam. Não inicia UI própria.

**Interpretação:** É uma ponte React do host, construída para dentro dele, e não uma unidade frontend separada.

### 28. openmrs-module-bahmniapps/ui; openmrs-module-bahmniapps/ui/package.json:117; openmrs-module-bahmniapps/ui/Gruntfile.js:215-229, 600-620; openmrs-module-bahmniapps/ui/app/clinical/index.html:29; openmrs-module-bahmniapps/package/docker/Dockerfile:12-13

**Observação:** São páginas AngularJS com `ng-app` próprio (por exemplo, `consultation`), build Grunt próprio e saída `dist` copiada para uma imagem Apache.

**Interpretação:** É uma unidade frontend com limite próprio: o host Bahmni.

### 29. openmrs-module-bahmniapps/micro-frontends/webpack.config.js:38; openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34-40, 113-135; openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6; openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:6; openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1; bahmni-proxy/resources/bahmni-proxy.conf:31-33; docker-compose.yml:586-593

**Observação:** O host carrega `IpdDashboard` e `CareViewDashboard` do remote `bahmni_ipd` e os monta nas aplicações clinical, adt e bedmanagement. O proxy encaminha `/ipd` ao serviço `ipd`, que roda a imagem `bahmni/microfrontend-ipd:${IPD_TAG}`. O volume de fontes locais está comentado. O remote não está no snapshot.

**Interpretação:** É uma relação host → remote ativa, com destino externo.

### 30. openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html:93; openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:21, 35-37

**Observação:** O host abre num iframe o `src` do ponto de extensão `org.bahmni.registration.identifier`. Nenhum arquivo do snapshot declara esse ponto.

**Interpretação:** Pode ser uma relação página → frontend embutido. O destino pode ser uma unidade externa, uma página local ou nada, e o snapshot não decide.

### 31. openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39

**Observação:** O host recebe `message` da janela, sem conferir remetente, e não envia `postMessage` ao iframe.

**Interpretação:** Pode ser comunicação por eventos com o conteúdo de #30. Nem o remetente nem a direção estão estabelecidos.

### 32. openmrs-module-bahmniapps/ui/package.json:117; openmrs-module-bahmniapps/ui/Gruntfile.js:600-620; openmrs-module-bahmniapps/package/docker/Dockerfile:1-13; docker-compose.yml:366-377; start.sh:6-8; bahmni-proxy/resources/bahmni-proxy.conf:40-41

**Observação:** `grunt build` gera `dist`. A imagem Apache copia `ui/dist/` para `htdocs/bahmni`. O serviço `bahmni-web` constrói a imagem local `bahmni-web-drc:latest` e monta `ui/app/` por volume. O proxy publica a aplicação em `/bahmni`. A tag de versão do `.env` não é usada.

**Interpretação:** Há fronteiras de build e de deploy próprias, separadas da imagem do remote IPD, sem versionamento independente.

### 33. README.md:41-44

**Observação:** "Run these commands from within the `micro-frontends` sub-folder […] the `../ui/app/micro-frontends-dist` folder has the set of files which can be used by the angular modules for their build".

**Interpretação:** Descreve o build da ponte para dentro da `ui`. A afirmação é corroborada.

### 34. README.md:46-50

**Observação:** "Run these commands from within the `ui` sub-folder […] `yarn ci` (will internally trigger grunt) […] the `dist` folder has the set of files to be deployed in Apache (or in Vagrant)."

**Interpretação:** Descreve o build Grunt e o deploy Apache do host. A afirmação é corroborada.

### 35. README.md:68

**Observação:** "Docker images for [Bahmniapps] is built using [Github Actions]."

**Interpretação:** Fala da imagem publicada pelo upstream. O snapshot não tem workflow de CI. A afirmação fica sem corroboração.

### 36. README.md:70

**Observação:** "Resources to build the following docker images can be found in the [package] directory."

**Interpretação:** Aponta o Dockerfile da imagem do host. A afirmação é corroborada.

### 37. README.md:112-116

**Observação:** "Building local images […] `docker build -t bahmni-web-drc:latest -f package/docker/Dockerfile .`"

**Interpretação:** Descreve a imagem local do host que o `start.sh` e o Compose usam. A afirmação é corroborada.

### 38. bahmni-proxy/README.md:5

**Observação:** "Proxy rules for different components of the application is configured."

**Interpretação:** Fala das regras do proxy, entre elas a de `/ipd`, que põe o remote na origem do host. A afirmação é corroborada.

### 39. openmrs-module-bahmniapps/micro-frontends/README.md:3-4

**Observação:** "a webpack build system to package the various react micro-frontends (mfe) available".

**Interpretação:** Chama de micro-frontends os bundles que o build gera. Os bundles são parte do host, e o único remote não sai desse build. A afirmação é contradita.

### 40. openmrs-module-bahmniapps/micro-frontends/README.md:36-37

**Observação:** "shared.min.js // Contains shared JS across microfrontends. should be loaded first"; "shared.min.css // Contains shared CSS across microfrontends including the carbon stylesheet. should be loaded first".

**Interpretação:** A ordem de carga se confirma, mas o recurso é compartilhado entre bundles de uma só unidade. A afirmação é contradita.

### 41. openmrs-module-bahmniapps/micro-frontends/README.md:39-40

**Observação:** "<mfe-name>.min.js // angular module containing components from a single mfe".

**Interpretação:** Descreve a forma do bundle: um módulo AngularJS com componentes registrados pela ponte. A afirmação é corroborada.

### 42. openmrs-module-bahmniapps/micro-frontends/README.md:45

**Observação:** "`next-ui.min.js`: A local micro-fontend containing next gen react components to be used by bahmniapps".

**Interpretação:** Chama de micro-frontend um bundle de componentes locais, sem build, deploy ou entrada próprios. A afirmação é contradita.

### 43. openmrs-module-bahmniapps/micro-frontends/README.md:46

**Observação:** "`ipd.min.js`: The IPD micro-frontend".

**Interpretação:** Chama de micro-frontend a ponte do host para o IPD. O micro-frontend IPD é o remote de outra imagem. A afirmação é contradita.

### 44. openmrs-module-bahmniapps/micro-frontends/README.md:46

**Observação:** "[`ipd.min.js`] talking to the remote IPD repository".

**Interpretação:** Afirma que a ponte carrega um remote IPD mantido fora daqui. A afirmação é corroborada.

### 45. openmrs-module-bahmniapps/micro-frontends/package.json:4

**Observação:** `"description": "Hosting microfrontends for openmrs"`.

**Interpretação:** Atribui o papel de host ao pacote, que configura um container sem exposições e com um remote. A afirmação é corroborada.

### 46. openmrs-module-bahmniapps/micro-frontends/webpack.config.js:104-105

**Observação:** "An alternative to providing build time URLs. We need to do this string promise stuff because we need to resolve the host at run-time."

**Interpretação:** Explica que a URL do remote é resolvida em runtime, e não fixada no build. A afirmação é corroborada.

### 47. openmrs-module-bahmniapps/ui/app/adt/index.html:60

**Observação:** "Adding react since micro-frontends will be used".

**Interpretação:** Liga a carga global de React às necessidades da ponte, que trata `react` e `react-dom` como `externals`. A afirmação é corroborada.

### 48. openmrs-module-bahmniapps/ui/app/adt/index.html:64

**Observação:** "polyfill to add angular feature which will allow easy loading of mfe into angular component".

**Interpretação:** Descreve o `shared.min.js` como polyfill de `angular.module.component`, recurso que a ponte usa para registrar a UI remota. A afirmação é corroborada.

### 49. f710945 2025-04-22 (openmrs-module-bahmniapps/ui/app/lib/magnific-popup); f3ee559 2025-04-23 (openmrs-module-bahmniapps/ui/app/admin/index.html, openmrs-module-bahmniapps/ui/app/home/index.html, openmrs-module-bahmniapps/ui/app/home/views/dashboard.html); 1ed2b99 2025-05-01 (openmrs-module-bahmniapps/ui/app/registration/views/patientcommon.html)

**Observação:** A biblioteca chega com a cópia da árvore do Bahmni e não muda até o snapshot. O `Gruntfile.js` também não muda, e nenhum arquivo de `ui/app` é removido. Só quatro páginas mudam depois da cópia, e as versões anteriores delas não estão disponíveis.

**Interpretação:** A biblioteca é parte do conteúdo copiado. A distribuição não a ligou nem a desligou. O ponto foi esclarecido.

### 50. f710945 2025-04-22 (openmrs-module-bahmniapps/ui/app/registration, default-config/openmrs/apps/registration/extension.json); f3ee559 2025-04-23, 1ed2b99 2025-05-01, f44767d 2025-05-01 (default-config/openmrs/apps/registration/app.json)

**Observação:** O iframe, a diretiva e o controller chegam na cópia e não mudam. O `extension.json` do registro tem o mesmo objeto em todos os commits e nunca declara `org.bahmni.registration.identifier`. Só o `app.json` muda, com mensagens de traduções, dados mestres e visita padrão.

**Interpretação:** O ponto de extensão nunca foi declarado neste histórico. O iframe e o listener são código herdado que a configuração da distribuição não aciona. O ponto foi esclarecido, mas o histórico não exclui uma configuração externa.

### 51. ee1e6fc 2025-04-21 (openmrs-module-bahmniapps); f710945 2025-04-22 (openmrs-module-bahmniapps/micro-frontends); d1faead 2025-06-12 (openmrs-module-bahmniapps/micro-frontends/public/i18n/locale_fr.json)

**Observação:** O primeiro commit tem `openmrs-module-bahmniapps` só como gitlink. O README, a configuração, o manifesto e o `src/` da ponte chegam juntos na cópia seguinte e não mudam. O único commit posterior na pasta altera uma tradução.

**Interpretação:** O texto que chama os bundles de micro-frontends e o código que o contradiz são do mesmo estágio. A redação veio com a cópia do upstream. O ponto foi esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (openmrs-module-bahmniapps/micro-frontends, Marcadores, Entrada e Build); 3.4.4 (openmrs-module-bahmniapps/micro-frontends/webpack.config.js:119, :38, Arquivo:linha); 3.4.4 (openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6; openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:6; openmrs-module-bahmniapps/ui/app/clinical/index.html:95, Observação); 3.4.5 #1 (Configuração, Código); 3.4.7 #14 (Documento); 3.4.7 #1, #7, #11, #12, #13, #14, #15 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #28; configura #29 |
| 2 | 3.4.4 (openmrs-module-bahmniapps/micro-frontends/webpack.config.js:119) | 3 código | configuração | module-federation | tecnológica | moderada | implementa #29 |
| 3 | 3.4.4 (openmrs-module-bahmniapps/ui/app/common/util/dynamicResourceLoader.js:6) | 3 código | código-fonte | — | contexto | fraca | — |
| 4 | 3.4.4 (openmrs-module-bahmniapps/ui/app/common/gallery/views/gallery.html:29) | 3 código | código-fonte | — | contexto | fraca | — |
| 5 | 3.4.4 (openmrs-module-bahmniapps/ui/app/common/ui-helper/printer.js:8) | 3 código | código-fonte | — | contexto | fraca | — |
| 6 | 3.4.4 (openmrs-module-bahmniapps/ui/app/lib/magnific-popup/jquery.magnific-popup.js:1593) | 3 código | código-fonte | — | contexto | fraca | — |
| 7 | 3.4.4 (openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html:93) | 3 código | código-fonte | iframe | tecnológica | ambígua | implementa #30 |
| 8 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:63) | 3 código | código-fonte | — | contexto | fraca | — |
| 9 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:69) | 3 código | código-fonte | — | contexto | fraca | — |
| 10 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:75) | 3 código | código-fonte | — | contexto | fraca | — |
| 11 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/adt/controllers/careViewController.spec.js:82) | 3 código | código-fonte | — | contexto | fraca | — |
| 12 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/bedmanagement/controllers/careViewController.spec.js:62) | 3 código | código-fonte | — | contexto | fraca | — |
| 13 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/bedmanagement/controllers/careViewController.spec.js:69) | 3 código | código-fonte | — | contexto | fraca | — |
| 14 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/bedmanagement/controllers/careViewController.spec.js:76) | 3 código | código-fonte | — | contexto | fraca | — |
| 15 | 3.4.4 (openmrs-module-bahmniapps/ui/test/unit/clinical/common/controllers/visitController.spec.js:171) | 3 código | código-fonte | — | contexto | fraca | — |
| 16 | 3.4.4 (openmrs-module-bahmniapps/micro-frontends/webpack.config.js:38) | 3 código | configuração | module-federation | arquitetural | forte | implementa #29 |
| 17 | 3.4.4 (openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #29 |
| 18 | 3.4.4 (openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:6) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #29 |
| 19 | 3.4.4 (openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:21) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #29 |
| 20 | 3.4.4 (openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:31) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #29 |
| 21 | 3.4.4 (openmrs-module-bahmniapps/ui/app/clinical/index.html:95) | 3 código | código-fonte | — | contexto | fraca | — |
| 22 | 3.4.4 (openmrs-module-bahmniapps/ui/app/clinical/app.js:328) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #29 |
| 23 | 3.4.4 (openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #29 |
| 24 | 3.4.4 (openmrs-module-bahmniapps/ui/app/adt/app.js:55) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #29 |
| 25 | 3.4.4 (openmrs-module-bahmniapps/ui/app/bedmanagement/app.js:137) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #29 |
| 26 | 3.4.4 (openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39) | 3 código | código-fonte | events | tecnológica | ambígua | implementa #31 |
| 27 | 3.4.3 (openmrs-module-bahmniapps/micro-frontends) | 4 estrutura | diretório | — | contexto | fraca | — |
| 28 | 3.4.3 (openmrs-module-bahmniapps/ui) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 29 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #28 |
| 30 | 3.4.5 #2 | 5 composição | código-fonte | iframe | arquitetural | ambígua | liga #28 |
| 31 | 3.4.5 #3 | 5 composição | código-fonte | events | arquitetural | ambígua | liga #28 |
| 32 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #28 |
| 33 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1; corrobora #32 |
| 34 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #32 |
| 35 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 36 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #32 |
| 37 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #32 |
| 38 | 3.4.7 #6 | 7 documentação | documentação | — | contexto | fraca | corrobora #29; corrobora #32 |
| 39 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #27; contradiz #29 |
| 40 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #27 |
| 41 | 3.4.7 #9 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #19; corrobora #20 |
| 42 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #27 |
| 43 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #27; contradiz #29 |
| 44 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #29; corrobora #1 |
| 45 | 3.4.7 #13 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #29; corrobora #1 |
| 46 | 3.4.7 #14 | 7 documentação | comentário | — | tecnológica | fraca | corrobora #2; corrobora #1; corrobora #29 |
| 47 | 3.4.7 #15 | 7 documentação | comentário | — | tecnológica | fraca | corrobora openmrs-module-bahmniapps/ui/app/adt/index.html:61-62; corrobora #1 |
| 48 | 3.4.7 #16 | 7 documentação | comentário | — | tecnológica | fraca | corrobora openmrs-module-bahmniapps/micro-frontends/src/shared.js:1-2; corrobora #19 |
| 49 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #6 |
| 50 | 3.4.8 #2 | 8 histórico | histórico | iframe | arquitetural | fraca | explica #7; explica #26; explica #30; explica #31 |
| 51 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #39; explica #40; explica #42; explica #43 |

## Resumo

Observações: 51. Dimensões (tecnologia: 0, configuração: 1, código: 25, estrutura: 2, composição: 3, build-deploy: 1, documentação: 16, histórico: 3). Força (forte: 11, moderada: 3, fraca: 33, ambígua: 4). Evidência (tecnológica: 7, arquitetural: 28, contexto: 16).
