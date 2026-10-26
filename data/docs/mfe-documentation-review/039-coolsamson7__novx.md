---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
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

# 039 — coolsamson7/novx

## Leitura do repositório

Toda a documentação está em inglês. O `README.md` da raiz apresenta o repositório como um
monorepo Nx com quatro pacotes (`core`, `i18n`, `communication`, `portal`), cada um com um link
para o próprio README e para a Wiki/API docs do projeto (README.md:9-22). Cada lib tem um README
próprio e curto: `libs/communication/README.md` (introdução + exemplo de serviço Axios gerado,
`:1-51`, e um bloco de schema gerado, `:53-79`, ambos código reproduzido, sem afirmação própria);
`libs/core/README.md` (DI e AOP da lib `core`, com um exemplo de código, `:12-85`, e duas tabelas
comparativas com outras bibliotecas de DI/AOP geradas por IA, `:125-172`, nenhuma delas fala de
unidades frontend); `libs/i18n/README.md` (duas frases sobre a lib de i18n, `:1-9`, sem afirmação
arquitetural). `CHANGELOG.md` só tem três entradas de "version bump only, there were no code
changes" (`:1-11`), sem conteúdo. `apps/app/src/showcases/i18n-feature.md` e
`apps/app/src/showcases/reactive-feature.docs.md` são textos de showcase renderizados dentro da
UI do próprio app (o código que os carrega, ``import(`./showcases/${filename}?raw`)``, foi descartado
como falso positivo na revisão de código-fonte, 3.4.4, Notas); não falam de arquitetura
multi-frontend, só descrevem a feature de exemplo que ilustram.

`ui/README.md:1-16` não descreve a lib `ui`: seu título e introdução ("Novx Core... a dependency
injection solution... error handling... tracing") reproduzem, quase palavra por palavra, a
introdução de `libs/core/README.md:1-9` (mesma lista de itens), e as seções "Building"/"Running
unit tests" mandam rodar `nx build communication`/`nx test communication`, comandos da lib
`communication`, não de `core` nem de `ui`. Não é o boilerplate padrão gerado pelo Nx — essa origem
não se demonstra no snapshot —, e sim conteúdo de outra lib, copiado e desatualizado. Fica citado
aqui como não afirmação, por não dizer nada verificável sobre a `ui` nem sobre as unidades do
projeto; a revisão estrutural (3.4.3) já registra `ui/` como projeto Nx desativado.

Os campos `description` dos `package.json` das libs (`libs/communication/package.json:4`
"Communication library"; `libs/core/package.json:4` "DI and AOP library"; `libs/i18n/package.json:4`
"i18n library"; `libs/portal/package.json:4` "Portal library"; `ui/package.json:4` "ui library")
são só rótulos de categoria, sem afirmação verificável sobre composição ou implantação; foram lidos
e não entraram na tabela.

Também foram lidos os comentários dos artefatos de composição citados pelas revisões anteriores:
`apps/app/webpack.config.js` (`:3`, `:101`, `:107`, notas sobre o `CopyWebpackPlugin` copiar
`public/` para o build), `apps/microfrontend/webpack.config.js` (`:13`, `:33-34`, opções de bundle
comentadas), `apps/app/src/environments/environments.ts:2` (lista os modos "microfrontend local
service"; usado em #4), `libs/portal/src/lib/loader/remote-loader.ts:25` ("Fetch all manifests in
parallel"; mesma cadeia de #6), `libs/portal/src/lib/feature-outlet.tsx:50-55` (cache guarda o
ambiente de DI do módulo remoto para features federadas; mesma cadeia de #3) e os rótulos de seção
de `apps/app/src/module.ts`, `service-loader.ts` e `remote-component-loader.ts` (este sem
comentários). Nenhum faz afirmação arquitetural além das já tabeladas; não viraram linha.

Os documentos com afirmações sobre as unidades frontend como conjunto são `README.md` (linha 14,
sobre o pacote `portal`) e, com mais detalhe, `libs/portal/README.md`, que descreve o framework de
portal que sustenta o app de referência (`apps/app` + `apps/microfrontend`) encontrado pelas
revisões anteriores. A ocorrência `doc-mfe-term` de `libs/portal/README.md:17` ("enterprise portals
with dynamic microfrontends... as one extreme... making it a one-size-fits-all framework") repete,
em tom de marketing, a afirmação da linha 5 (framework que suporta microfrontends); mas o mesmo
trecho nomeia "server side configuration mechanisms", mecanismo diferente do de composição
host/remote já registrado, que também aparece em `:15` ("custom application configurations with
support for both client and server side logic") e `:72` ("registered via a server component");
vira linha própria (#4). O passo a passo de `libs/portal/README.md:74-200` (configuração do `ApplicationModule`,
`DeploymentManager`, `FeatureRegistry` e `RoutingManager` só com o manifesto local) é, em geral, a
mecânica interna do framework antes de introduzir o caso federado (linha 203 em diante) e não entra
na tabela. A exceção é `:140-141`, que afirma que o `FeatureRegistry` conhece todos os componentes
registrados, "local or remote", e que o `<FeatureOutlet>` renderiza qualquer feature registrada pelo
nome: é afirmação sobre composição, mas repete o sujeito e o mecanismo de #3 (outlets que cobrem
componentes locais e federados), e fica no parágrafo dela.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:9 | "NOVX is a monorepo covering a number of Typescript and React solutions in individual packages" | estrutura | corroborada | 3.4.3 (Workspace); pnpm-workspace.yaml:1-3; nx.json:18-44 |
| 2 | README.md:14 | "[portal]...a react microfrontend framework" | estrutura | corroborada | 3.4.3 (apps/app Yes; apps/microfrontend Undetermined); 3.4.5 #1 |
| 3 | libs/portal/README.md:14 | "feature outlets that cover both local and federated components and allow for custom async preloading logic" | composição | corroborada | 3.4.4 (remote-component-loader.ts, remote-resolution); libs/portal/src/lib/feature-outlet.tsx:245; 3.4.5 #1 |
| 4 | libs/portal/README.md:15 | "custom application configurations with support for both client and server side logic" | composição | parcial | apps/app/src/module.ts:221-228; libs/portal/src/lib/loader/service-loader.ts:15-16; libs/portal/src/lib/service/PortalService.ts:28-41; apps/app/src/environments/environments.ts:2-5 |
| 5 | libs/portal/README.md:36 | "A parser - as part of the build - will locate those features and generate a `manifest.json`" | build-deploy | parcial | apps/app/project.json:9-14 (`scan-metadata`: `nx run metadata:scan --moduleFolder=apps/app --outFile=apps/app/src/manifest.json`); apps/microfrontend/project.json:9-14 (idem, `--outFile=apps/microfrontend/src/manifest.json`); 3.4.3 (tools/metadata); nx.json:34-35 (`targetDefaults.build`/`test` dependem só de `^build`; nenhum target depende de `scan-metadata`) |
| 6 | libs/portal/README.md:205-212 | "Federated modules will take a similar approach... The main application will only need to change the corresponding deployment loader to integrate it" / "the manifest is fetched dynamically from the known url and merged with the local manifest" | composição | corroborada | 3.4.5 #1; apps/app/src/environments/environments.ts:2-8; libs/portal/src/lib/loader/remote-loader.ts:28 |
| 7 | libs/portal/README.md:214-216 | "in production the logic would be handed over to a server component that is aware of different microfrontends and configurations also including more sophisticated logic to filter features according to feature flags" | composição | sem corroboração | — |
| 8 | libs/portal/README.md:220 | "A showcase app shows a shell and a microfreontend" | estrutura | corroborada | 3.4.3 (apps/app Yes; apps/microfrontend Undetermined); 3.4.5 #1 |

## Observações

**1. Documento.** O `README.md` da raiz descreve o repositório como monorepo com pacotes
individuais de Typescript/React (README.md:9-14). A revisão estrutural confirma a organização em
workspace pnpm (`pnpm-workspace.yaml:1-3`, `packages: ["apps/*","libs/*"]`) com um `project.json`
Nx por pacote (3.4.3, seção Workspace); os quatro pacotes listados (`core`, `i18n`, `communication`,
`portal`) correspondem às quatro libs da tabela de unidades (3.4.3), todas `No` como unidade
frontend por serem bibliotecas publicadas, o que não contradiz a afirmação, que fala de "pacotes"
em geral, não de unidades de UI.

**2. Documento.** O `README.md` lista "portal" como "a react microfrontend framework"
(README.md:14), e `libs/portal/README.md:5` repete a mesma afirmação com mais detalhe ("a react
portal framework supporting microfrontends"); a elaboração de marketing em `libs/portal/README.md:17`
("enterprise portals with dynamic microfrontends" vs. "small local only applications") não adiciona
mecanismo verificável a esta afirmação (o mecanismo de "server side configuration" que o mesmo
trecho nomeia é afirmação própria, #4). A afirmação de que o projeto contém microfrontends é corroborada pelas
revisões anteriores: a estrutural encontra o shell `apps/app` (Yes) e o remote `apps/microfrontend`
(Undetermined para rodar sozinho, mas isso não afeta seu papel de remote, 3.4.3 Notas), e a de
composição confirma a relação host→remote por module-federation entre os dois, ativa (3.4.5 #1).

**3. Documento.** `libs/portal/README.md:14` afirma que os "feature outlets" cobrem componentes
locais e federados. No snapshot, o `FeatureOutlet` monta o componente carregado
(`libs/portal/src/lib/feature-outlet.tsx:245`, `<LoadedWrapper Component={Loaded} .../>`), e para o
caso federado esse componente vem do `RemoteComponentLoader`, que resolve `./Module` e o componente
da feature remota (3.4.4, linhas `remote-component-loader.ts:106`, `:137`, categoria
`remote-resolution`); a relação host→remote da composição cita a mesma cadeia (3.4.5 #1). A mesma
afirmação reaparece em `libs/portal/README.md:140-141`: o `FeatureRegistry` "knows about all
registered components - local or remote", e por isso o `<FeatureOutlet>` "renders any registered
feature by name"; mesmo sujeito (o outlet) e mesmo mecanismo (componentes locais e remotos
registrados), sustentada pela mesma cadeia. A afirmação é corroborada.

**4. Documento.** `libs/portal/README.md:15` afirma que a configuração de aplicação suporta lógica
tanto client quanto server side; o mesmo mecanismo aparece em `:17` ("server side configuration
mechanisms") e em `:72` ("which can either be used locally or registered via a server component").
O lado cliente do mecanismo existe no snapshot: o shell oferece um modo `service` de deployment
(`apps/app/src/module.ts:221-228`, `createDeploymentLoader` devolve um `ServiceDeploymentLoader`
quando `deployment == 'service'`, ao lado dos modos `microfrontend` e local), esse loader delega o
cálculo do deployment ao serviço (`libs/portal/src/lib/loader/service-loader.ts:15-16`,
`portalService.computeDeployment(request)`), e o `PortalService` gerado consulta o servidor por
`POST /portal/deployment` (`libs/portal/src/lib/service/PortalService.ts:28-41`). A configuração do
app lista `service` entre os modos possíveis, mas o modo ativo é `microfrontend`
(`apps/app/src/environments/environments.ts:2-5`). O resto não tem artefato: nenhuma revisão
anterior nem o snapshot contêm o servidor que responde a `/portal/deployment` nem o registro de
manifestos nele ("registered via a server component", `:72`). A afirmação é parcial.

**5. Documento.** `libs/portal/README.md:36` afirma que um parser, como parte do build, localiza as
features e gera o `manifest.json`. Os dois apps têm o target: `apps/app/project.json:9-14` e
`apps/microfrontend/project.json:9-14` definem `scan-metadata`, que roda
`nx run metadata:scan --moduleFolder=<app> --outFile=<app>/src/manifest.json`, e a revisão estrutural
já registra a ferramenta `tools/metadata` como "scan de metadata que gera o manifesto" (3.4.3, linha
`tools/metadata`). Mas "as part of the build" não se confirma: o target `build` dos dois apps não
depende de `scan-metadata`, nem `scan-metadata` depende de `build` (`apps/app/project.json`,
`apps/microfrontend/project.json`), e os `targetDefaults` do workspace só ligam `build`/`test` a
`^build` (`nx.json:34-35`); nenhum artefato mostra `scan-metadata` acionado automaticamente pelo
build. A ferramenta de geração existe e funciona isoladamente, mas a integração ao build não é
observada; a afirmação é parcial.

**6. Documento.** `libs/portal/README.md:205-212` descreve o caso federado: o shell troca o
`deployment loader` por um `RemoteDeploymentLoader` que recebe `{name, url}` dos remotes, e o
manifesto do remote é buscado dinamicamente e mesclado com o local. No snapshot, o shell declara
exatamente essa lista em `apps/app/src/environments/environments.ts:2-8`
(`deployment: "microfrontend"`, `remotes: [{name: 'microfrontend', url: 'http://localhost:3001'}]`),
e `libs/portal/src/lib/loader/remote-loader.ts:28` busca
`` `${remote.url}/manifest.json` ``. Essa cadeia é a mesma relação host→remote da composição (3.4.5
#1, Observação 1). A afirmação é corroborada.

**7. Documento.** `libs/portal/README.md:214-216` projeta, para produção, um "server component"
que filtraria features por feature flags. O snapshot tem a capacidade de filtrar por flag na lib
(`libs/portal/src/lib/manifest-filter.ts:155-156`, `libs/portal/src/lib/feature-decorator.ts:54`),
mas nenhuma revisão anterior encontrou um componente de servidor nem o uso desse filtro pelos apps
do snapshot (a revisão de build e implantação, 3.4.6, não lista Dockerfile, compose nem
configuração de servidor). Por descrever um cenário de uso em produção sem artefato que o confirme
ou contradiga no snapshot, a afirmação é sem corroboração.

**8. Documento.** `libs/portal/README.md:220` afirma que o showcase mostra um shell e um
microfrontend. Isso corresponde ao par confirmado pelas revisões anteriores: `apps/app` como shell
(estrutural, Yes) e `apps/microfrontend` como remote da relação de composição (3.4.5 #1), cujo único
feature é uma página de texto simples (3.4.5, Leitura do repositório). A afirmação é corroborada.

## Resumo

Afirmações: 8 (corroborada: 5, parcial: 2, contradita: 0, sem corroboração: 1). Temas: (estrutura: 3, composição: 4, build-deploy: 1).
