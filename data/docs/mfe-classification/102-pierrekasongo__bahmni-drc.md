---
schema: 1
id: 970061359
full_name: pierrekasongo/bahmni-drc
url: https://github.com/pierrekasongo/bahmni-drc
commit: 80390077a0a2375568289d01bcde52a082dc28e0
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [module-federation]
ui_technologies: [angularjs, react]
build_tools: [webpack]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 102 — pierrekasongo/bahmni-drc

## Contexto

Distribuição/customização local de Bahmni/OpenMRS, com fontes do host Bahmni, configurações clínicas, traduções e serviços Docker. O host inclui AngularJS e uma ponte React que carrega um remote IPD externo por Module Federation. Não se trata de mera menção MFE: existem configuração, imports, registro de componentes, template clínico e encaminhamento pelo proxy.

A decisão aberta é a aplicação da regra de plugins de plataforma. Bahmni/OpenMRS é produto de terceiros; os manifests e READMEs identificam o upstream. Por outro lado, o candidato inclui o host completo, configura imagem local/volumes e entrega uma distribuição, não somente uma unidade para instalação em host alheio. Não se presume que copiar/customizar o host o torne aplicação autoral, nem que qualquer distribuição de uma plataforma seja automaticamente um plugin. Q5 fica em revisão para resolver esse limite com 037/051 e o comparador OpenMRS 074.

O clone é `pierrekasongo__bahmni-drc`; SHA conforme `data/samples/mfe-sample-001/clones.csv:103`. Inventário integral por `git ls-tree -r` no SHA: **4.537 entradas**, sendo **4.535 arquivos regulares** (4.470 modo `100644`, 65 modo `100755`), **2 symlinks** e **0 gitlinks**. Os links são `openmrs-module-bahmniapps/ui/app/app`, cujo blob aponta a `/bahmni/openmrs-module-bahmniapps/ui/app/`, e `openmrs-module-bahmniapps/ui/app/components`, apontando a `../node_modules/@bower_components`. Foram lidos como blobs, sem segui-los; não são aplicações adicionais. Não há `node_modules/` versionado nem submódulos.

As subárvores são `openmrs-module-bahmniapps` (2.854 entradas), `bahmni-core` (1.067), `default-config` (337), `bahmni-java-utils` (149), `openmrs-db` (101), `bahmni-proxy` (17) e 12 arquivos na raiz. Há dependências/artefatos de terceiros em `ui/dist/components`, código compilado e metadados Yarn/PnP; não foram contados como unidades próprias. Nenhum arquivo de PnP foi executado.

`frontend_units: 2` registra o **host local reempacotado** pela distribuição e o **remote IPD explicitamente referenciado e implantado separadamente**. Não conta cada aplicação/página AngularJS, componente React, bundle `ipd`/`next-ui`/`shared`, backend ou fonte upstream copiada como unidade adicional. O remote não tem fontes próprias neste clone, mas conta por referência explícita de composição; `unit_organization: multi-repo` descreve essa relação, não os módulos Java. A aceitação desses alvos no fenômeno, diante da plataforma de terceiros, continua aberta em Q5.

## Proveniência na amostra

- `data/samples/mfe-sample-001/sample.csv:103`: rank 102, id 970061359, `strategies: terminology;technology`, elegibilidade `pass`. O manifesto aponta à rodada `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:13210` e `data/discovery/mfe-round-002/candidates.csv:13215`: descrição nula, tópicos vazios, linguagem JavaScript, licença nula, branch padrão `master`, criação em 2025-04-21, último push em 2025-06-19 e mesmas estratégias da amostra. Esses dados não confirmam arquitetura.
- Consulta `sqlite3 -readonly` aos dois `discovery.sqlite`, relacionando `hits` e `queries` por `query_id` e filtrando `hits.repository_id = 970061359`: em ambas as rodadas há hits de endpoint `repositories` em `terminology-micro-frontend-repositories` e `terminology-micro-frontends-repositories`, consultas `"micro frontend" in:name,description,readme` e `"micro frontends" in:name,description,readme`, sem caminho localizado.
- **Eliminação dos campos:** o nome não contém as expressões; descrição/tópicos registrados estão vazios. O README raiz contém referências a micro-frontends e seu build (`README.md:40–44`), sendo o campo temático compatível observado. Não se atribui ao banco uma linha ou versão indexada que ele não informa, e o nome não é usado como evidência arquitetural.
- Há também hit de código, em cada rodada, na consulta `technology-module-federation-plugin-js-code`, texto `ModuleFederationPlugin remotes extension:js`, caminho `openmrs-module-bahmniapps/micro-frontends/webpack.config.js`. A configuração desse arquivo foi lida e ligada aos consumidores, não contada isoladamente.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação / Proveniência de plataforma | `README.md:3–15` referencia o upstream Bahmni e descreve frontend AngularJS/React. O manifesto da UI aponta ao repositório `Bahmni/openmrs-module-bahmniapps` e ao autor Bahmni (`openmrs-module-bahmniapps/ui/package.json:129–140`); o host React também tem autoria Bahmni (`openmrs-module-bahmniapps/micro-frontends/package.json:2–7`). Isso impede presumir autoria da arquitetura pelo titular deste clone. | contexto |
| Configuração (host de federação) | `openmrs-module-bahmniapps/micro-frontends/webpack.config.js:16–24` define entradas ipd, next-ui e shared e output na árvore da UI. `:34–40` instancia ModuleFederationPlugin com `@openmrs-mf/ipd`, container esperado `bahmni_ipd`, caminho `ipd` e `exposes: {}`. O host não é um remote exposto a outro host. | forte |
| Configuração (URL e protocolo) | `openmrs-module-bahmniapps/micro-frontends/webpack.config.js:113–138` constrói URL da origem atual em `/ipd/remoteEntry.js`, injeta script e devolve proxy dos métodos `get` e `init` de `window.bahmni_ipd`. É composição em runtime; os bundles locais da ponte não tornam essa carga externa apenas composição em build time. | forte |
| Configuração (resolução estática) | Os requires do config (`openmrs-module-bahmniapps/micro-frontends/webpack.config.js:1–6`) correspondem a Webpack, MiniCssExtractPlugin e CopyWebpackPlugin declarados (`openmrs-module-bahmniapps/micro-frontends/package.json:18`, `:27–33`). O lock resolve Webpack **5.99.5** para a faixa `^5.86.0` (`openmrs-module-bahmniapps/micro-frontends/yarn.lock:16928–16930`), MiniCssExtractPlugin 2.9.2 (`:11878–11880`) e CopyWebpackPlugin 11.0.0 (`:6497–6499`). O Webpack 4 também presente no lock é outra entrada, não a resolução da faixa do projeto. | moderada |
| Configuração / Tecnologia (ponte) | Babel/presets e loaders usados no config estão declarados (`openmrs-module-bahmniapps/micro-frontends/package.json:9–16`, `:19–33`); Babel usa presets env/react e transform-runtime (`openmrs-module-bahmniapps/micro-frontends/.babelrc:1–11`). react2angular está declarado (`openmrs-module-bahmniapps/micro-frontends/package.json:47–50`) e resolvido no lock (`openmrs-module-bahmniapps/micro-frontends/yarn.lock:13974–13976`). O build chama Webpack (`openmrs-module-bahmniapps/micro-frontends/package.json:56–58`), não um CLI que encapsule o bundler. São referências estáticas coerentes; não se afirma instalação bem-sucedida. | moderada |
| Código-fonte (consumo remoto) | `openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:5–15` faz import lazy de `@openmrs-mf/ipd/IpdDashboard` e renderiza sob Suspense com `hostData`/`hostApi`. `openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:5–14` consome `@openmrs-mf/ipd/CareViewDashboard` do mesmo container. São duas exposições esperadas de um remote, não duas unidades contadas separadamente. | forte |
| Código-fonte (ponte e contrato) | `openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:4–24` importa os wrappers e registra `mfeIpdDashboard` em `bahmni.mfe.ipd` com react2angular; `:29–34` faz o mesmo para CareView. As props e callbacks esperados estão em `openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:20–28` e `openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:17–25`. Existe contrato de UI, não somente dados ou texto compartilhados. | forte |
| Composição (entrada e tela clínica) | A página clínica tem `ng-app="consultation"` (`openmrs-module-bahmniapps/ui/app/clinical/index.html:29`), carrega React/ReactDOM e os bundles locais (`:83–96`). `consultation` depende de `bahmni.clinical` (`openmrs-module-bahmniapps/ui/app/clinical/app.js:3`), que depende de `bahmni.mfe.ipd` (`openmrs-module-bahmniapps/ui/app/clinical/init.js:7–9`). A rota IPD usa `visitIpd.html` (`openmrs-module-bahmniapps/ui/app/clinical/app.js:328–337`), e esse template monta a tag com host-data/host-api (`openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1`). | forte |
| Build/deploy (unidades separadas) | `docker-compose.yml:366–377` configura imagem local `bahmni-web-drc`, build da árvore Bahmni e volume da UI. O caminho local é definido em `.env:110`. O IPD tem serviço/imagem externos separados (`docker-compose.yml:586–593`), com tag 1.0.0 (`.env:193`). O proxy encaminha `/ipd` ao serviço ipd (`bahmni-proxy/resources/bahmni-proxy.conf:31–33`), e o Dockerfile inclui essa configuração (`bahmni-proxy/Dockerfile:7–8`). Corrobora implantação separada e ligação da URL do remote à origem do host. | forte |
| Build/deploy (artefatos locais) | `openmrs-module-bahmniapps/package/docker/Dockerfile:1–13` entrega `ui/dist` por Apache; o Compose também prevê o volume de `ui/app` (`docker-compose.yml:375–377`). O README explica o build React seguido do build Grunt da UI (`README.md:38–50`). Os nomes ipd/next-ui/shared são entradas no mesmo config/build, não prova de três unidades independentes. | contexto |
| Código-fonte (componentes locais) | `openmrs-module-bahmniapps/micro-frontends/src/next-ui/index.js:1–39` importa containers locais e registra componentes com a ponte; não usa import remoto. O wrapper IPD importa Loader desse código local (`openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:3`). Portanto não se atribui independência entre next-ui e a ponte IPD nem se multiplica a contagem por bundle. | contexto |
| Documentação de arquitetura | `openmrs-module-bahmniapps/micro-frontends/README.md:3–8` descreve o build e referencia arquitetura/guia no wiki Bahmni, não acessado. `:27–46` descreve o output e distingue next-ui local de IPD remoto. Não foi encontrado ADR específico da distribuição no inventário. O texto corrobora a cadeia lida; não substitui a inspeção do consumidor. | contexto |
| Estrutura / Configuração (limites e buscas negativas) | Procurados no inventário arquivos do produtor IPD, configurações adicionais de federação, exposições IPD, manifests de alvos autorais adicionais e gitlinks: há apenas o config do host já citado, com `exposes: {}`; o produtor vem da imagem externa. Não há fontes/config de `bahmni_ipd` ou `exposes` de `./IpdDashboard`/`./CareViewDashboard` para conferir nesse clone. Os imports esperados são observáveis, mas a compatibilidade interna da imagem 1.0.0 não foi inspecionada. Artefatos compilados de terceiros e symlinks não acrescentam unidades. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Host local e remote IPD explicitamente configurados (`openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34–40`, `docker-compose.yml:586–593`). São os dois alvos técnicos observados; sua aceitação no escopo de aplicação autoral fica em Q5. |
| Q2 | Yes | O host local tem build próprio, incluindo ponte Webpack (`openmrs-module-bahmniapps/micro-frontends/package.json:56–58`), enquanto o remote é entregue por serviço/imagem separados (`docker-compose.yml:586–593`). O host usa imports federados (`openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6`), não fontes do remote. Não se afirma independência entre bundles locais da mesma ponte. |
| Q3 | Yes | A tela clínica do host monta o wrapper IPD (`openmrs-module-bahmniapps/ui/app/clinical/app.js:328–337`, `openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1`), que renderiza a UI remota com dados/API do host (`openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:5–15`). |
| Q4 | Yes | Config e consumidor se ligam por alias/container/URL; o loader usa init/get (`openmrs-module-bahmniapps/micro-frontends/webpack.config.js:113–138`), o proxy encaminha a URL (`bahmni-proxy/resources/bahmni-proxy.conf:31–33`) e os wrappers consomem os módulos na tela. A resposta registra integração implementada do lado observável, como nos casos de host com remotes externos; não presume execução ou inspeção das exposições internas da imagem. |
| Q5 | Yes | O candidato entrega o host Bahmni configurado, a ponte que consome o remote, a rota clínica, o proxy e os serviços da distribuição. A origem upstream não elimina a implementação concreta de composição presente no snapshot. |

## Motivo

- Aplica-se a regra `MFE-implemented`: Q1–Q5 são Yes após a revisão conjunta.
- Não é MFE-unit nem plugin isolado: o snapshot entrega o host completo, sua configuração de composição, a rota consumidora, o proxy e o serviço remoto da distribuição.
- Não se classificou cada fonte upstream, página AngularJS ou componente empacotado como unidade própria. A contagem de dois alvos representa o host configurado/reempacotado pela distribuição e o remote explicitamente referenciado, sem contar dependências vendorizadas. Não se afirma arquitetura original do titular do repositório.
- Não se reduz a code sharing genérico de 089: o elemento remoto é uma interface de dashboard clínico com dados/callbacks de integração. A questão aberta é a plataforma de terceiros, não tamanho mínimo de UI, links/iframe ou composição somente em build time.

## Notas para análise

- **RQ1:** o mesmo candidato aparece nas duas rodadas por terminologia no README e por código de configuração de federação. A confirmação técnica exigiu seguir config → imports React → registro AngularJS → template/rota → proxy/serviço. Isso não decide sozinho a inclusão no fenômeno pelo critério de plataforma.
- **RQ2:** Module Federation com remote baseado em Promise e URL relativa à origem; react2angular integra o consumidor ao host AngularJS. `build_tools: [webpack]` decorre do config explícito e lock; Grunt/Maven/Docker não são registrados como bundlers. `ui_technologies: [angularjs, react]` descreve o código do host observado, não tecnologia inferida da imagem externa. O slug angularjs já aparece no caso 055.
- **Protocolo (comparador 074):** LIME-EMR também distribui OpenMRS de terceiros, mas contém configuração de módulos/import maps e scripts de montagem sem o carregador local. Aqui há fontes da ponte e do carregador federado, página consumidora e serviço IPD separado; por isso Q2/Q4 têm evidência mais direta. Não se atribui import-maps, single-spa ou os 42 módulos de 074 a este candidato. A situação de plataforma deve ser confrontada entre os dois casos, sem transferir automaticamente a classe ou quantidade de unidades.
- **Protocolo (famílias):** buscas nas anotações por `pierrekasongo` e `bahmni-drc` não encontraram irmão. A relação upstream Bahmni é declarada nos manifests/README e observada nos prefixos; a relação com 074 é de ecossistema OpenMRS, não duplicação demonstrada ou template comum. Nenhum upstream foi acessado.
- **Histórico:** clone não raso; **42 commits alcançáveis**, **0 merges**, **1 commit-raiz**, `ee1e6fcc03d5a2cda53470bb5ae610b80a44f2ea` (2025-04-21, “First commit”), contados por `git rev-list --count`, `--count --merges` e `--max-parents=0`. Metadados do log registram adição de subpastas em `f710945`, build no Compose em `5cd61e6`, dist em `f445aea`, traduções de micro-frontends em `d1faead` e correção de locais no SHA avaliado (2025-06-19). Esses assuntos contextualizam customização/empacotamento; não se inferiu conteúdo de versões antigas nem se pediu blob histórico.
- **Protocolo (branches):** `master`, `origin/master` e `origin/HEAD` apontam ao SHA fixado; `origin/santu-branche` aponta a `d040cbf2f65d20120c713e1fea6931b0c4bc7b75`. Referências registradas, sem inspecionar outro branch para completar o snapshot.
- **Protocolo (limites):** todos os comandos Git do clone foram executados com `GIT_NO_LAZY_FETCH=1`; somente blobs do SHA fixado e metadados de histórico foram lidos. Nenhuma rede, submódulo, dependência instalada, PnP, build, contêiner ou aplicação executados. As referências a wiki, imagem Docker e pacotes não foram consultadas fora do clone. Configuração estática não comprova execução clínica ou sucesso de implantação.

## Decisão registrada

Promover para **MFE-implemented**. O snapshot entrega o host Bahmni completo, a configuração e o carregador de Module Federation, os wrappers inseridos na rota clínica, o proxy e o serviço remoto separado. A origem upstream da plataforma não elimina a composição MFE concretamente implementada e entregue pela distribuição.
