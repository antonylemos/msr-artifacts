---
schema: 1
id: 124905930
full_name: scality/metalk8s
commit: f19004e899c78360d3a43d5f60047b140f29c909
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

# 272 — scality/metalk8s

## Leitura do repositório

MetalK8s é uma distribuição Kubernetes em produção, e o frontend é só uma parte do repositório: duas unidades, o shell `shell-ui` e a UI da plataforma `ui`, compostas por Module Federation (`@module-federation/enhanced/rspack`) através de uma camada própria da organização, `@scality/module-federation` (`FederatedComponent`, `ComponentWithFederatedImports`, `ShellHooksProvider`). O shell é o host: declara `name: 'shell'` (shell-ui/rspack.config.ts:131) e não tem `remotes`. Ele não conhece as UIs no build. Em runtime, lê a lista de UIs implantadas em `discoveryUrl` (shell-ui/src/initFederation/UIListProvider.tsx:70; shell-ui/public/config.json:15), busca para cada uma o `.well-known/micro-app-configuration` (shell-ui/src/initFederation/ConfigurationProviders.tsx:395), e dele tira `remoteEntryPath`, views, `scope` e `module`. As views viram rotas (shell-ui/src/FederatedApp.tsx:97-98), cada uma montada por `FederatedComponent` com a URL da UI mais o `remoteEntryPath` (shell-ui/src/FederatedApp.tsx:85-92). O mesmo mecanismo carrega os "navbar updaters" headless de cada UI (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51-69) e, quando declarado, um módulo de ferramentas MCP (shell-ui/src/mcp/MCPRegistrar.tsx:195-211).

No snapshot, a única UI listada é `metalk8s-ui` (shell-ui/public/deployed-ui-apps.json:3-6), cuja configuração está em `ui/public/.well-known/micro-app-configuration` e casa com o `name: 'metalk8s'` e os `exposes` de ui/rspack.config.ts:118-126. Em produção, a ligação é feita por recursos Kubernetes aplicados por Salt: o `ScalityUI` `shell-ui-cp` põe as views `platform` e `alerts` de `metalk8s-ui` na navbar (salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:41-50), e o `ScalityUIComponentExposer` liga o componente `metalk8s-ui` a esse `ScalityUI` (salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:52-63). A `ui` não se monta sozinha (a revisão estrutural a deixa `Undetermined`): sai só como módulo exposto `./FederableApp`, que recebe do shell `shellHooks` e `shellAlerts` por props (shell-ui/src/FederatedApp.tsx:73-76; ui/src/FederableApp.tsx:120-122). Essas props são callbacks e hooks entregues pelo host, não uma relação própria. Por elas a `ui` também consulta as views descobertas pelo shell (ui/src/containers/ConfigProvider.tsx:7-9) e, por sua vez, carrega uma UI de outro kind, `vm-management-ui`, que não está no repositório (ui/src/containers/Layout.tsx:100-103, 246-260).

Não viraram relação: o `remotes: { shell }` só de desenvolvimento da `ui` virou relação apenas de configuração (relação 4), mas o código da `ui` não importa módulos `shell/...`, e o único vínculo com o shell é por tipos gerados em `ui/@mf-types/` (ui/src/FederableApp.tsx:21). Também não viraram relação o adaptador de nome de instância (`InstanceName`, inativo, `No` na revisão de código-fonte), o hook `./platformLibrary` e os demais `exposes` da `ui` sem consumidor no código lido, o iframe e o `postMessage` do Guardian (assistente externo desligado por `canUseGuardian: false`, shell-ui/public/config.json:18) e o `CustomEvent` de idioma, que nunca é disparado. Os três últimos estão `No` na revisão de código-fonte.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell-ui | ui | host → remote | origem → destino | module-federation | Yes | Yes | shell-ui/public/config.json:2-15 (navbar com as views `platform` e `alerts` do kind `metalk8s-ui`; `discoveryUrl: "/shell/deployed-ui-apps.json"`); shell-ui/public/deployed-ui-apps.json:2-8 (UI `metalk8s-ui`, `url: "http://localhost:3000"`); ui/public/.well-known/micro-app-configuration:1-49 (kind `metalk8s-ui`, `remoteEntryPath: "/mf-manifest.json"`, views com `module: "./FederableApp"` e `scope: "metalk8s"`, `navbarUpdaterComponents` `./AlertsNavbarUpdater`, `publicPath: "/metalk8s"`); ui/rspack.config.ts:118-126 (`name: 'metalk8s'`, `filename` do remoteEntry, `exposes` `./FederableApp`, `./AlertsNavbarUpdater` e outros); ui/rspack.config.ts:42 (`publicPath: '/metalk8s/'`); ui/rspack.config.ts:209 (porta 3000); salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:41-50 (navbar do `ScalityUI` `shell-ui-cp` com as views de `metalk8s-ui`); salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:52-63 (`ScalityUIComponentExposer` liga `metalk8s-ui` a `shell-ui-cp`) | shell-ui/src/initFederation/UIListProvider.tsx:70; shell-ui/src/FederatedApp.tsx:85; shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51 |
| 2 | shell-ui | mcpTools | host → remote | origem → destino | module-federation | Undetermined | Undetermined | — | shell-ui/src/mcp/MCPRegistrar.tsx:201 |
| 3 | ui | vm-management-ui | host → remote | origem → destino | module-federation | Undetermined | Undetermined | — | ui/src/containers/Layout.tsx:251 |
| 4 | ui | shell-ui | host → remote | origem → destino | module-federation | Yes | No | ui/rspack.config.ts:128-132 (`remotes: { shell: 'shell@http://localhost:8084/shell/mf-manifest.json' }` só com `!isProduction`); shell-ui/rspack.config.ts:131 (`name: 'shell'`); shell-ui/rspack.config.ts:54 (`publicPath: '/shell/'`) | — |

## Observações

**1. shell-ui → ui.** O código do shell é genérico: não nomeia `metalk8s` nem `ui`. O destino é resolvido pelas configurações. A lista de UIs implantadas tem uma única entrada, de kind `metalk8s-ui` (shell-ui/public/deployed-ui-apps.json:3-6). A configuração `.well-known` desse kind está em `ui/public/` (ui/public/.well-known/micro-app-configuration:5) e aponta views e navbar updater para o escopo `metalk8s` (:16-17, :26-27, :44-45). Esse escopo e esses módulos são o `name` e os `exposes` de ui/rspack.config.ts:119-124. Daí No snapshot = `Yes`. A URL da lista (`http://localhost:3000`) coincide com a porta do dev server da `ui` (ui/rspack.config.ts:209), mas a correspondência vem do nome e dos `exposes`, não da porta. As três linhas `Yes` da revisão de código-fonte sustentam Ativa = `Yes`: a descoberta (shell-ui/src/initFederation/UIListProvider.tsx:70), a montagem das views por rota (shell-ui/src/FederatedApp.tsx:85) e a carga dos navbar updaters (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51). Em produção, a lista não é o arquivo de `public/` do shell, e sim a gerada a partir dos recursos `ScalityUI`/`ScalityUIComponentExposer` aplicados por Salt (salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:52-63), com o mesmo `discoveryUrl` (salt/metalk8s/addons/ui/config/metalk8s-shell-ui-config.yaml.j2:33). A `ui` publica o remoteEntry com a versão no nome (ui/rspack.config.ts:120), e o shell pede o `mf-manifest.json` com `?version=` (shell-ui/src/FederatedApp.tsx:86).

**2. shell-ui → mcpTools.** O `MCPRegistrar` lê `spec.mcpTools` da configuração de build de cada UI implantada e importa esse módulo do remoteEntry da UI (shell-ui/src/mcp/MCPRegistrar.tsx:186, 197-210). Sem `mcpTools`, ele retorna `null` (:195). A configuração da única UI do snapshot não declara `mcpTools` (ui/public/.well-known/micro-app-configuration:7-49), e nenhum outro arquivo de configuração do snapshot o declara: o nome só aparece no código do shell e nos testes. Não há, portanto, unidade ou módulo identificado como destino: fica o nome do campo como aparece no artefato, com No snapshot = `Undetermined`. A única linha da revisão de código-fonte é `Undetermined`, daí Ativa = `Undetermined`. O registrador é montado sempre que a descoberta tem sucesso (shell-ui/src/FederatedApp.tsx:172).

**3. ui → vm-management-ui.** A `ui` procura, entre as views descobertas pelo shell (ui/src/containers/ConfigProvider.tsx:7-9, que lê `useDiscoveredViews` dos `shellHooks`), uma view federada de kind `vm-management-ui` (ui/src/containers/Layout.tsx:100-103) e a monta em `virtual-machines/*` com `FederatedComponent` sobre `${vmView.app.url}/mf-manifest.json` (ui/src/containers/Layout.tsx:246-258). Sem ela, a rota cai no 404 (:262). O kind só aparece nesse arquivo do snapshot: nenhuma unidade o declara, nem `deployed-ui-apps.json` ou os recursos Salt o listam. A URL só vem da descoberta em runtime. O nome identifica a UI, mas nada no snapshot diz onde ela está ou se é de outro repositório. Por isso No snapshot = `Undetermined`, e não `No`. Ativa = `Undetermined` pela única linha `Undetermined` da revisão de código-fonte. É uma relação aninhada: a origem é ela mesma um remote montado pelo shell (relação 1).

**4. ui → shell-ui.** O `ModuleFederationPlugin` da `ui` declara o remote `shell` em `http://localhost:8084/shell/mf-manifest.json` só fora de produção (ui/rspack.config.ts:128-132). O nome `shell` é o `name` do plugin de shell-ui/rspack.config.ts:131, e o caminho `/shell/` é o `publicPath` de shell-ui/rspack.config.ts:54 (a porta 8084, shell-ui/rspack.config.ts:225, só confirma). Daí No snapshot = `Yes`. Nenhuma linha da revisão de código-fonte sustenta a relação: a `ui` não importa `shell/...`, e o uso do shell em ui/src/FederableApp.tsx:21 é um import de tipos de `ui/@mf-types/shell/App`, gerado pelo MF e anotado `No`. Por isso Ativa = `No`. O remote serve, no desenvolvimento, para gerar e baixar esses tipos e permitir rodar a `ui` contra o shell local. Os hooks do shell chegam à `ui` em runtime pelas props da relação 1, não por esse remote.

## Resumo

Relações: 4 (host → remote: 4). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
