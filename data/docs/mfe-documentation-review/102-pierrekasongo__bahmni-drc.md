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

A documentação é toda em inglês e quase toda herdada do upstream Bahmni. O `README.md` da raiz é
cópia do README do módulo `openmrs-module-bahmniapps/README.md`, com as mesmas 124 primeiras linhas
(inclusive a seção "Building local images", README.md:112-124, que nomeia as imagens locais
`bahmni-web-drc`, `bahmni-config-drc` e `bahmni-proxy-drc`) e só um acréscimo, o link da wiki de PACS
(README.md:126-127). Por isso cada afirmação desses dois arquivos aparece numa linha ancorada no
`README.md` da raiz, e a repetição no README do módulo vai no parágrafo. Copiado para a raiz, o
texto perde a referência de caminho: "Run these commands from within the `micro-frontends`
sub-folder" (README.md:41) não existe na raiz, só em `openmrs-module-bahmniapps/micro-frontends`.
O README descreve o frontend Bahmni como AngularJS, "with only the Form viewer part utilising
_React_" (README.md:7-8). Essa frase fala da tecnologia dentro da única aplicação e não das unidades
como conjunto, por isso não virou linha; o snapshot, porém, usa React também na ponte
`openmrs-module-bahmniapps/micro-frontends` (componentes `next-ui` e wrappers IPD,
openmrs-module-bahmniapps/micro-frontends/src/next-ui/index.js:1-39;
openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:1-34), não só no visualizador de formulários.

O texto mais arquitetural é o `openmrs-module-bahmniapps/micro-frontends/README.md`. Ele chama de
"micro-frontends" os bundles que o Webpack da ponte gera (`next-ui`, `ipd`, mais o `shared`) e diz que
`ipd` fala com o "remote IPD repository". As revisões anteriores mostram um quadro diferente na
contagem: a única aplicação frontend do snapshot é `openmrs-module-bahmniapps/ui` (3.4.3), a ponte é
parte dela e escreve seus bundles em `ui/app/micro-frontends-dist` (3.4.3; 3.4.6 Leitura), e a
segunda unidade da classificação é o remote `bahmni_ipd`, que vem da imagem externa
`bahmni/microfrontend-ipd` e não tem fontes aqui (3.4.5 #1). A composição em si (Module Federation
com URL do `remoteEntry.js` resolvida em runtime na origem da página, componentes React registrados
como componentes AngularJS) é a que o README e os comentários descrevem, e se confirma. O que não se
confirma é a identidade dos bundles locais como micro-frontends.

Ocorrências `doc-*` (todas `doc-mfe-term`) que não viraram linha: o título
openmrs-module-bahmniapps/micro-frontends/README.md:1 ("# Bahmni Micro-Frontends"); os links da wiki
em :7 e :8 (arquitetura e guia de implementação, não acessados, sem afirmação no snapshot); :48, cópia
das traduções de `public` para `micro-frontends-dist`, detalhe interno do build
(openmrs-module-bahmniapps/micro-frontends/webpack.config.js:31-33); :51, instrução de teste sobre
mocks. As demais ocorrências estão nas linhas 1 (README.md:41, :44; openmrs-module-bahmniapps/README.md:41,
:44; openmrs-module-bahmniapps/micro-frontends/README.md:27), 7 (:4), 8 (:36, :37), 9 (:39, :40),
10 e 11 (:43, :46) e 12 (:46).

Trechos dos READMEs que não viraram linha por serem instrução, infraestrutura ou negócio: instalação
de Node, Yarn, Grunt e Compass (README.md:19-36); "To Run Bahmni locally you should use Docker option"
(README.md:15); hot deploy por Docker (wiki) e por Vagrant (README.md:52-58); indexação por buscadores
(README.md:72-106); integração SNOMED (README.md:108-110); as imagens locais de configuração e de proxy
(README.md:118-124), que não são de aplicação frontend; PACS (README.md:126-127). Os READMEs de
`bahmni-core`, `bahmni-java-utils`, `bahmni-java-utils/form2-utils` e `default-config` tratam de
módulos Java, utilitários e configuração clínica, sem afirmação sobre as unidades frontend. Do
`bahmni-proxy/README.md`, só a linha das regras de proxy virou afirmação (linha 6); o resto é
servir a página índice, SSL, build local da imagem e websocket do speech-assistant
(bahmni-proxy/README.md:3-4, :6, :8-19).

Comentários e campos descritivos lidos: `description` dos dois `package.json`
(openmrs-module-bahmniapps/micro-frontends/package.json:4, linha 13;
openmrs-module-bahmniapps/ui/package.json:4, "Bahmni Apps", sem afirmação); comentários de
openmrs-module-bahmniapps/micro-frontends/webpack.config.js (o docblock de `remoteProxiedAtHostDomain`,
linha 14; os de `externals` em :98-99 e do script injetado em :122-123, :136, internos); comentários
de carga nas páginas do host, openmrs-module-bahmniapps/ui/app/adt/index.html:60, :64, :67 (linhas 15,
16 e 9), repetidos em clinical/index.html:83, :91, :94, bedmanagement/index.html:63, :66 e
ot/index.html:59, :63, :66, além de clinical/index.html:20 ("All styles from the microfrontends
available"), rótulo do bloco de CSS sem afirmação própria; os docblocks de
openmrs-module-bahmniapps/micro-frontends/src/utils/bridge-builder.js:2-10, :25-35, :47-59, :90-99,
:110-113, que descrevem o embrulho interno dos componentes React; os rótulos `# IPD` e `#Bahmni Web` de
bahmni-proxy/resources/bahmni-proxy.conf:31, :39; `# Copy BahmniApps` de
openmrs-module-bahmniapps/package/docker/Dockerfile:12; os `echo` de start.sh:7, :13, :18, :23; e os
trechos comentados do Compose (docker-compose.yml:370, :591-592), que são configuração desativada e
não texto. Nenhum deles acrescenta afirmação além das linhas.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:41-44 | "Run these commands from within the `micro-frontends` sub-folder […] the `../ui/app/micro-frontends-dist` folder has the set of files which can be used by the angular modules for their build" | build-deploy | corroborada | 3.4.6 (Leitura); openmrs-module-bahmniapps/micro-frontends/webpack.config.js:21-25; openmrs-module-bahmniapps/ui/Gruntfile.js:24-26, 77-79 |
| 2 | README.md:46-50 | "Run these commands from within the `ui` sub-folder […] `yarn ci` (will internally trigger grunt) […] the `dist` folder has the set of files to be deployed in Apache (or in Vagrant)." | build-deploy | corroborada | 3.4.6 #1; openmrs-module-bahmniapps/ui/package.json:127; openmrs-module-bahmniapps/ui/Gruntfile.js:10; openmrs-module-bahmniapps/package/docker/Dockerfile:1, 12-13 |
| 3 | README.md:68 | "Docker images for [Bahmniapps] is built using [Github Actions]." | build-deploy | sem corroboração | — |
| 4 | README.md:70 | "Resources to build the following docker images can be found in the [package] directory." | build-deploy | corroborada | 3.4.6 #1; openmrs-module-bahmniapps/package/docker/Dockerfile:1-13; docker-compose.yml:367-369 |
| 5 | README.md:112-116 | "Building local images […] `docker build -t bahmni-web-drc:latest -f package/docker/Dockerfile .`" | build-deploy | corroborada | 3.4.6 #1; start.sh:6-8; docker-compose.yml:366-371 |
| 6 | bahmni-proxy/README.md:5 | "Proxy rules for different components of the application is configured." | build-deploy | corroborada | 3.4.5 #1; 3.4.6 (Leitura); bahmni-proxy/resources/bahmni-proxy.conf:31-33, 39-41; bahmni-proxy/Dockerfile:7-8 |
| 7 | openmrs-module-bahmniapps/micro-frontends/README.md:3-4 | "a webpack build system to package the various react micro-frontends (mfe) available" | build-deploy | contradita | 3.4.3 (linha openmrs-module-bahmniapps/micro-frontends); 3.4.5 #1; openmrs-module-bahmniapps/micro-frontends/webpack.config.js:16-25, 34-40; docker-compose.yml:586-592 |
| 8 | openmrs-module-bahmniapps/micro-frontends/README.md:36-37 | "shared.min.js // Contains shared JS across microfrontends. should be loaded first"; "shared.min.css // Contains shared CSS across microfrontends including the carbon stylesheet. should be loaded first" | composição | contradita | 3.4.3 (linha openmrs-module-bahmniapps/micro-frontends); openmrs-module-bahmniapps/micro-frontends/src/shared.js:1-5; openmrs-module-bahmniapps/ui/app/adt/index.html:15-17, 65-69; openmrs-module-bahmniapps/ui/Gruntfile.js:24-26, 77-79 |
| 9 | openmrs-module-bahmniapps/micro-frontends/README.md:39-40 | "<mfe-name>.min.js // angular module containing components from a single mfe" | composição | corroborada | 3.4.4 (linhas openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:21 e :31); openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:8-34; openmrs-module-bahmniapps/micro-frontends/src/next-ui/index.js:7-14 |
| 10 | openmrs-module-bahmniapps/micro-frontends/README.md:45 | "`next-ui.min.js`: A local micro-fontend containing next gen react components to be used by bahmniapps" | estrutura | contradita | 3.4.3 (linha openmrs-module-bahmniapps/micro-frontends); 3.4.4 (Notas); classificação (`frontend_units: 2`); openmrs-module-bahmniapps/micro-frontends/src/next-ui/index.js:1-39; openmrs-module-bahmniapps/ui/app/adt/index.html:69 |
| 11 | openmrs-module-bahmniapps/micro-frontends/README.md:46 | "`ipd.min.js`: The IPD micro-frontend" | estrutura | contradita | 3.4.3 (linha openmrs-module-bahmniapps/micro-frontends); 3.4.5 #1; classificação (`frontend_units: 2`); openmrs-module-bahmniapps/micro-frontends/webpack.config.js:17, 21-23 |
| 12 | openmrs-module-bahmniapps/micro-frontends/README.md:46 | "[`ipd.min.js`] talking to the remote IPD repository" | composição | corroborada | 3.4.5 #1; openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34-40; openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6; docker-compose.yml:586-592 |
| 13 | openmrs-module-bahmniapps/micro-frontends/package.json:4 | "description": "Hosting microfrontends for openmrs" | estrutura | corroborada | 3.4.5 #1; openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34-40 |
| 14 | openmrs-module-bahmniapps/micro-frontends/webpack.config.js:104-105 | "An alternative to providing build time URLs. We need to do this string promise stuff because we need to resolve the host at run-time." | composição | corroborada | 3.4.4 (linha src-dynamic-script openmrs-module-bahmniapps/micro-frontends/webpack.config.js:119); 3.4.5 #1; openmrs-module-bahmniapps/micro-frontends/webpack.config.js:38, 113-138 |
| 15 | openmrs-module-bahmniapps/ui/app/adt/index.html:60 | "Adding react since micro-frontends will be used" | composição | corroborada | openmrs-module-bahmniapps/ui/app/adt/index.html:61-62; openmrs-module-bahmniapps/micro-frontends/webpack.config.js:57-66, 97-100 |
| 16 | openmrs-module-bahmniapps/ui/app/adt/index.html:64 | "polyfill to add angular feature which will allow easy loading of mfe into angular component" | composição | corroborada | openmrs-module-bahmniapps/micro-frontends/src/shared.js:1-2; openmrs-module-bahmniapps/ui/app/adt/index.html:65; openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:19-21 |

## Observações

**1. README.md:41-44.** O README manda construir a ponte React antes e diz que a saída em
`../ui/app/micro-frontends-dist` serve ao build dos módulos AngularJS. O Webpack da ponte escreve
nessa pasta (openmrs-module-bahmniapps/micro-frontends/webpack.config.js:21-25), e o Grunt da `ui`
põe os bundles `shared`, `ipd` e `next-ui` nas listas de CSS e JS da aplicação
(openmrs-module-bahmniapps/ui/Gruntfile.js:24-26, :77-79), como a revisão de build e deploy descreve
(3.4.6 Leitura). Nada no snapshot dispara os dois builds juntos, e o snapshot não tem os `.min.js`
na pasta, só CSS, traduções e licenças (3.4.6 Leitura), o que não desmente a afirmação. A mesma
afirmação está em openmrs-module-bahmniapps/README.md:41-44 e em
openmrs-module-bahmniapps/micro-frontends/README.md:27-28 ("This is done so that the main
bahmni-apps can reference the built files from there"). Na raiz, a pasta `micro-frontends` só
existe como `openmrs-module-bahmniapps/micro-frontends` (ver Leitura).

**2. README.md:46-50.** O build da `ui` é Grunt: o script `ci` roda `grunt bundle`,
`uglify-and-rename` e `web` (openmrs-module-bahmniapps/ui/package.json:127), e a saída é `dist`
(openmrs-module-bahmniapps/ui/Gruntfile.js:10). O Dockerfile da imagem Apache copia `ui/dist/` para
`htdocs/bahmni` (openmrs-module-bahmniapps/package/docker/Dockerfile:1, :12-13), o que confirma o
"deployed in Apache" (3.4.6 #1). A revisão de build e deploy nota que o Compose monta por volume
`ui/app/` sobre esse diretório (docker-compose.yml:376), de modo que a stack local serve o código
sem build, mas o artefato descrito pelo README é o que a imagem recebe. Repetida em
openmrs-module-bahmniapps/README.md:46-50.

**3. README.md:68.** O README diz que a imagem de Bahmniapps é construída por GitHub Actions. Não
há artefato: o snapshot não tem workflow de CI nem pasta `.github` (3.4.6 Leitura), e o link aponta
para `.github/workflows` do upstream. Isso não desmente a frase, que fala da imagem publicada
`bahmni/bahmni-web` do Docker Hub; o Compose deste snapshot constrói em vez dela a imagem local
(linha 5). Por isso `sem corroboração`. Separei da frase seguinte (linha 4), que recebe outra
corroboração. Repetida em openmrs-module-bahmniapps/README.md:68.

**4. README.md:70.** O README diz que os recursos para construir a imagem estão na pasta `package`.
O Dockerfile está em `openmrs-module-bahmniapps/package/docker/Dockerfile:1-13`, parte de uma imagem
`httpd` que recebe `ui/dist/` (:1, :12-13), e o serviço `bahmni-web` o usa
(docker-compose.yml:367-369; 3.4.6 #1). O link `/package` é relativo à raiz do upstream; aqui a
pasta só existe dentro de `openmrs-module-bahmniapps` (ver Leitura). Repetida em
openmrs-module-bahmniapps/README.md:70.

**5. README.md:112-116.** É o acréscimo próprio desta distribuição ao README do upstream: construir a
imagem web local `bahmni-web-drc:latest` a partir de `package/docker/Dockerfile`, dentro de
`openmrs-module-bahmniapps`. O `start.sh` roda exatamente esse comando (start.sh:6-8), e o serviço
`bahmni-web` do Compose usa a imagem com esse nome, construída do mesmo contexto e Dockerfile, no
lugar da imagem publicada, que ficou comentada (docker-compose.yml:366-371; 3.4.6 #1). Repetida em
openmrs-module-bahmniapps/README.md:112-116. Os comandos das imagens de configuração e de proxy
(README.md:118-124) estão na Leitura.

**6. bahmni-proxy/README.md:5.** O README do proxy diz que nele se configuram as regras de proxy dos
componentes da aplicação. O `bahmni-proxy.conf` encaminha `/bahmni` ao serviço `bahmni-web`
(bahmni-proxy/resources/bahmni-proxy.conf:39-41) e `/ipd` ao serviço `ipd`
(bahmni-proxy/resources/bahmni-proxy.conf:31-33), e o Dockerfile inclui essa configuração no Apache
(bahmni-proxy/Dockerfile:7-8). É essa regra de `/ipd` que põe o `remoteEntry.js` do remote na mesma
origem da página do host (3.4.5 #1). As demais regras são de backends e serviços de terceiros
(3.4.6 Leitura).

**7. openmrs-module-bahmniapps/micro-frontends/README.md:3-4.** O README diz que esta pasta tem um
build Webpack que empacota os vários micro-frontends React disponíveis. O build Webpack existe e
gera um bundle por entrada, `ipd`, `next-ui` e `shared`
(openmrs-module-bahmniapps/micro-frontends/webpack.config.js:16-25). O que ele empacota, porém, é
código do próprio host: a revisão estrutural julga a pasta `No`, parte de
`openmrs-module-bahmniapps/ui` (3.4.3). O único micro-frontend além do host, o remote `bahmni_ipd`,
não sai deste build: o host o declara em `remotes` e não expõe nada
(openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34-40), e ele vem da imagem externa
`bahmni/microfrontend-ipd`, com o volume de fontes locais comentado (docker-compose.yml:586-592;
3.4.5 #1). Pela regra, `contradita`; o que se confirma é o build Webpack dos bundles React. É a
ocorrência `doc-mfe-term` de :4.

**8. openmrs-module-bahmniapps/micro-frontends/README.md:36-37.** A árvore comentada da saída diz que
`shared.min.js` e `shared.min.css` são compartilhados entre os micro-frontends e devem ser carregados
primeiro. A ordem se confirma: as páginas carregam `shared` antes de `ipd` e `next-ui`
(openmrs-module-bahmniapps/ui/app/adt/index.html:15-17, :65-69), e o Grunt os lista nessa ordem
(openmrs-module-bahmniapps/ui/Gruntfile.js:24-26, :77-79). O conteúdo é o polyfill
`angular-component` e o CSS do `bahmni-carbon-ui`
(openmrs-module-bahmniapps/micro-frontends/src/shared.js:1-5). Mas os bundles entre os quais ele é
compartilhado são da mesma unidade, o host (3.4.3), e nada no snapshot liga `shared.min.js` ao remote
`bahmni_ipd`, que não tem fontes aqui. A regra pede ao menos duas unidades usando o recurso; os
artefatos mostram uma só. Pela regra, `contradita`, e se confirma a parte de carregar primeiro. O
compartilhamento de `carbon-components`, `bahmni-carbon-ui`, `react` e `react-dom` como singletons do
Module Federation (openmrs-module-bahmniapps/micro-frontends/webpack.config.js:41-67) é outro
mecanismo, que o README não menciona e cujo lado do remote não está no snapshot. São as ocorrências
`doc-mfe-term` de :36 e :37.

**9. openmrs-module-bahmniapps/micro-frontends/README.md:39-40.** Cada bundle `<mfe-name>.min.js` é um
módulo AngularJS com os componentes de um micro-frontend. O bundle `ipd` cria o módulo
`bahmni.mfe.ipd` e registra os componentes `mfeIpdDashboard` e `mfeIpdCareViewDashboard` com
`react2angular` (openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:8-34; 3.4.4 linhas de
`index.js:21` e `:31`); o `next-ui` cria `bahmni.mfe.nextUi` e registra seus componentes pela ponte
(openmrs-module-bahmniapps/micro-frontends/src/next-ui/index.js:7-14). O `.min.css` por bundle (:40)
também existe (`ipd.min.css`, `next-ui.min.css` em `ui/app/micro-frontends-dist`). A mesma
afirmação está no comentário "load the ipd mfe as angular components"
(openmrs-module-bahmniapps/ui/app/adt/index.html:67), repetido em bedmanagement/index.html:66,
clinical/index.html:94 e ot/index.html:66. Se os bundles são micro-frontends é o que as linhas 10 e
11 julgam; aqui a afirmação é a forma do bundle, e ela se confirma.

**10. openmrs-module-bahmniapps/micro-frontends/README.md:45.** Sob "Currently, we have the following
micro-frontends" (:43), o README põe `next-ui.min.js` como micro-frontend local. Os componentes React
existem e são usados pelo host: o bundle registra cinco componentes locais
(openmrs-module-bahmniapps/micro-frontends/src/next-ui/index.js:1-39), e as páginas o carregam
(openmrs-module-bahmniapps/ui/app/adt/index.html:69). Mas ele não é unidade separada: não tem build,
deploy nem entrada próprios, sai do mesmo Webpack que os outros bundles e vai para dentro da `ui`
(3.4.3), não usa import remoto (3.4.4 Notas), e a classificação não o conta entre as duas unidades.
Pela regra, `contradita`; o que se confirma são os componentes React locais usados pelo host.

**11. openmrs-module-bahmniapps/micro-frontends/README.md:46.** Na mesma lista, `ipd.min.js` é "The
IPD micro-frontend". O bundle é a ponte do host para o IPD, construído da entrada `ipd` do mesmo
Webpack e escrito em `ui/app/micro-frontends-dist`
(openmrs-module-bahmniapps/micro-frontends/webpack.config.js:17, :21-23); a revisão estrutural o põe
dentro do host (3.4.3), e a revisão de código-fonte deixa as linhas dele com Unidade `—`. O
micro-frontend IPD que a classificação conta é o remote `bahmni_ipd`, de outra imagem (3.4.5 #1).
Dividi a frase porque a segunda parte recebe outra corroboração (linha 12). Pela regra, `contradita`.
É a ocorrência `doc-mfe-term` de :46, junto com :43.

**12. openmrs-module-bahmniapps/micro-frontends/README.md:46.** O bundle `ipd` fala com o remote
IPD, cujo código fica em outro repositório. O host declara o remote `@openmrs-mf/ipd` → `bahmni_ipd`
(openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34-40), e o wrapper o carrega por
`lazy(() => import("@openmrs-mf/ipd/IpdDashboard"))`
(openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6); é a relação host → remote
ativa da revisão de composição (3.4.5 #1). O remote vem da imagem `bahmni/microfrontend-ipd`, sem
fontes no snapshot (docker-compose.yml:586-592), o que é compatível com "remote IPD repository"; o
repositório em si não está nomeado em nenhum artefato.

**13. openmrs-module-bahmniapps/micro-frontends/package.json:4.** A `description` diz que o pacote
hospeda micro-frontends. O Webpack dele configura o container `bahmni_mfe_host` com um remote e
`exposes: {}` (openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34-40): é o lado host da
relação com `bahmni_ipd` (3.4.5 #1). O plural vai além do snapshot, que tem um só remote, mas não
muda o papel. A revisão estrutural põe a pasta dentro de `openmrs-module-bahmniapps/ui`, e a
revisão de composição registra o host como `ui` (3.4.5 Leitura); o papel de host é o mesmo.

**14. openmrs-module-bahmniapps/micro-frontends/webpack.config.js:104-105.** O docblock de
`remoteProxiedAtHostDomain` diz que a URL do remote não é fixada no build, e sim resolvida em
runtime a partir do host. A função monta `/ipd/remoteEntry.js` sobre `window.location.href`,
injeta o script e devolve um proxy de `get`/`init`
(openmrs-module-bahmniapps/micro-frontends/webpack.config.js:113-138), e é usada no remote
`@openmrs-mf/ipd` (:38); a revisão de código-fonte marca `:119` como composição (3.4.4), e a de
composição registra a relação (3.4.5 #1). O resto do docblock descreve os parâmetros: o sub-caminho
"as set-up in the proxy configuration" (:109) confere com `ProxyPass /ipd`
(bahmni-proxy/resources/bahmni-proxy.conf:32), e o nome "as given in it's ModuleFederationPlugin
configuration" (:108) não pode ser conferido, porque a configuração do remote não está no snapshot.

**15. openmrs-module-bahmniapps/ui/app/adt/index.html:60.** O comentário diz que a página carrega
React porque usará micro-frontends. As linhas seguintes carregam React e ReactDOM globais
(openmrs-module-bahmniapps/ui/app/adt/index.html:61-62), e a ponte declara `react` e `react-dom` como
`externals` resolvidos para os globais `React` e `ReactDOM`
(openmrs-module-bahmniapps/micro-frontends/webpack.config.js:97-100), além de compartilhá-los como
singletons no Module Federation (:57-66). Repetido em clinical/index.html:83 e ot/index.html:59
("since an micro-frontend will be used"). O "micro-frontends" do comentário são os bundles da ponte
(linhas 10 e 11); o que se afirma aqui, a dependência deles do React da página, se confirma.

**16. openmrs-module-bahmniapps/ui/app/adt/index.html:64.** O comentário diz que `shared.min.js` é um
polyfill que acrescenta ao AngularJS o recurso de carregar um micro-frontend num componente. O
`shared.js` importa `angular-component`, com o comentário "polyfill the angular.module.component
function for angular v1.4" (openmrs-module-bahmniapps/micro-frontends/src/shared.js:1-2); a página o
carrega antes dos bundles (openmrs-module-bahmniapps/ui/app/adt/index.html:65), e o bundle `ipd`
usa exatamente `.component(...)` para registrar a UI remota
(openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:19-21). Repetido em
bedmanagement/index.html:63, clinical/index.html:91 e ot/index.html:63.

## Resumo

Afirmações: 16 (corroborada: 11, parcial: 0, contradita: 4, sem corroboração: 1). Temas: (estrutura: 3, composição: 6, build-deploy: 7).
