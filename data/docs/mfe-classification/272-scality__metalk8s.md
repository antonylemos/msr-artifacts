---
schema: 1
id: 124905930
full_name: scality/metalk8s
url: https://github.com/scality/metalk8s
commit: f19004e899c78360d3a43d5f60047b140f29c909
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 272 — scality/metalk8s

## Contexto

MetalK8s é uma distribuição Kubernetes on-prem da Scality (descrição do repositório: “An opinionated Kubernetes distribution with a focus on long-term on-prem deployments”). Além de Salt, charts, operators e buildchain, o repositório contém duas aplicações frontend compostas por Module Federation:
- `shell-ui`: o shell (navbar, autenticação, alertas), que descobre as UIs implantadas e monta cada uma por rota;
- `ui`: a “MetalK8s Platform UI”, um remote com views `platform` e `alerts`.

As duas têm imagens e recursos de deploy próprios (`ScalityUI` para o shell, `ScalityUIComponent` + `ScalityUIComponentExposer` para a UI). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:273` registra rank 272, ID 124905930, status `cloned`, branch `development/134.0` (a padrão) e o commit do front matter, que é o HEAD do clone e de `origin/development/134.0`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:273` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:262` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:262` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `…#size:2250..2499` | `shell-ui/package.json` | 2026-10-07T20:00:02.514Z / 2026-10-08T15:43:06.180Z |
| idem | `…#size:4000..5999` | `ui/package.json` | 2026-10-07T20:52:26.866Z / 2026-10-08T15:44:06.777Z |
| `technology-module-federation-plugin-ts-code`: `ModuleFederationPlugin remotes extension:ts` | `…#size:6000..9999` | `ui/rspack.config.ts` | 2026-10-07T22:40:28.914Z / 2026-10-08T16:19:36.642Z |

Os metadados do hit de código registram só a descrição e `fork: false`.

Correspondências no SHA:
- `shell-ui/package.json` (2.312 bytes) declara `@module-federation/enhanced` (`:20`);
- `ui/package.json` (5.342 bytes) é casado pela faixa de tamanho;
- `ui/rspack.config.ts` (6.436 bytes) contém `ModuleFederationPlugin` (`:5`, `:118`) e `remotes` (`:128–132`).

Os dois `package.json` foram alterados pela última vez em `5e3e25294` (2026-09-10) e o `rspack.config.ts` em `828adbb88` (2026-04-10), antes das coletas. O acerto não depende do README, que não menciona Module Federation nem micro-frontends (busca por `micro`, `federation`, `shell` e `ui` só encontra links de documentação e blocos `shell`).

**Snapshot posterior às buscas:** o SHA é um merge de 2026-10-08T21:10:51Z, posterior às duas coletas, mas não altera os arquivos casados.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 3.086 entradas, sendo 3.040 arquivos regulares `100644`, 45 executáveis `100755`, 1 symlink `120000` (`tests/versions.py` → `../buildchain/buildchain/versions.py`) e zero gitlinks. O frontend está em `shell-ui/` (98 entradas) e `ui/` (611); o restante é infraestrutura (`charts/`, `salt/`, `operator/`, `storage-operator/`, `buildchain/`, `docs/`, `tests/`). `ui/@mf-types/` versiona 375 arquivos de tipos gerados do shell (330 sob `node_modules/`), que não são unidade. | contexto |
| Configuração (remote) | `ui/rspack.config.ts:32–34`: entry `metalk8s_ui`; `:118–127`: `ModuleFederationPlugin({ name: 'metalk8s', filename: \`static/js/remoteEntry.${version}.js\`, exposes: { './FederableApp', './platformLibrary', './AlertsNavbarUpdater', './Metalk8sLocalVolumeProvider', './PlatformGlobalHealthBarFederated' } })`; `:128–132`: `remotes: { shell }` só em desenvolvimento; `:133–150`: `shared` singletons; `:171–206`: `MicroAppRuntimeConfigurationPlugin`. | forte |
| Configuração (contrato do remote) | `ui/public/.well-known/micro-app-configuration:1–49`: `MicroAppConfiguration` com `remoteEntryPath: /mf-manifest.json`, views `platform` (`/`) e `alerts` (`/alerts`) apontando para `./FederableApp` no escopo `metalk8s`, hook `./platformLibrary` e `navbarUpdaterComponents` `./AlertsNavbarUpdater`. | forte |
| Configuração (shell) | `shell-ui/rspack.config.ts:46`: entry `./src/index.tsx`; `:130–144`: `ModuleFederationPlugin({ name: 'shell', exposes: { './App', './lang', './auth/AuthProvider', './alerts/…', './navbar/navbarHooks', './moduleFederation/…', './useNotificationCenter' } })`; `:145–207`: `shared` singletons eager. `shell-ui/public/config.json:2–15`: navbar com views `platform` e `alerts` do kind `metalk8s-ui` e `discoveryUrl: /shell/deployed-ui-apps.json`. | forte |
| Código-fonte (composição) | `shell-ui/src/index.tsx:1–8` → `shell-ui/src/FederatedApp.tsx`. `shell-ui/src/initFederation/UIListProvider.tsx:66–79` busca a lista de UIs implantadas em `discoveryURL`. `FederatedApp.tsx:57–95` (`FederatedRoute`) monta `FederatedComponent` com `url=${app.url}${remoteEntryPath}?version=…`, `module` e `scope` vindos da configuração da micro-app. `:97–136` (`InternalRouter`) gera uma rota por view federada. | forte |
| Código-fonte (lado do remote) | `ui/src/FederableApp.tsx:120–122`: `export default function FederableApp(props: FederatedAppProps)`, que envolve a app em `ShellHooksProvider` com `shellHooks`/`shellAlerts` recebidos do shell. A app Redux/Saga da plataforma fica em `ui/src/containers/App`. | forte |
| Código-fonte (fronteiras) | Busca ativa por imports relativos que cruzem `ui/` e `shell-ui/` (`../shell-ui`, `../ui/`, `../../shell-ui`): nenhuma ocorrência fora de `@mf-types`. A única referência da UI ao shell é tipo gerado: `ui/src/FederableApp.tsx:21` importa `FederatedAppProps` de `../@mf-types/shell/App` (cópia de tipos em `ui/@mf-types`, gerada pelo MF), não de `shell-ui/src`. A busca por `'shell/` em `ui/src` não encontra imports do módulo federado; a integração com o shell é por props e `@scality/module-federation`. | contexto |
| Build/deploy | Builds próprios (`shell-ui/package.json:8–9`; `ui/package.json:38–39`) e imagens separadas: `buildchain/buildchain/image.py:418–419` (`shell-ui/Dockerfile`), `images/metalk8s-ui/Dockerfile`. `salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:15–50`: recurso `ScalityUI` `shell-ui-cp` com a imagem do shell e navbar com as views `platform`/`alerts` de `metalk8s-ui`. `salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:15–74`: `ScalityUIComponent` `metalk8s-ui` (imagem própria, montada em `.well-known`) e `ScalityUIComponentExposer` ligando-o ao `ScalityUI` `shell-ui-cp`. | forte |
| Tecnologia | `@scality/module-federation` 1.6.1 nos dois pacotes (`shell-ui/package.json:52`; `ui/package.json:11`): biblioteca da mesma organização para `FederatedComponent`, configuração de micro-apps e hooks do shell. | moderada |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 12.526 commits alcançáveis a partir do SHA (15.242 em todos os refs), 5.150 merges, de 83 identidades. As principais são o bot de merge `bert-e <wall_e@scality.com>` (4.415) e desenvolvedores com e-mail `@scality.com`, por exemplo Teddy Andrieux (1.762), YanJin (1.030), Alexandre Allard (685) e Guillaume Demonet (662). A raiz é `d77803a49` (2019-02-05, Nicolas Trangez). Por caminho: `ui/` tem 2.219 commits e `shell-ui/` 558; o shell surge em `f28782afa` (2021-02-24, “solutions-navbar: Rename to shell-ui”). Há 719 refs remotos; só o SHA da branch padrão foi considerado.

`git rev-list --objects $SHA --missing=print` lista 24.620 objetos ausentes, nenhum na árvore do SHA (comparação entre os objetos da árvore e a lista de ausentes: zero em comum). Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades próprias: `shell-ui` e `ui` (MetalK8s Platform UI), com entries próprias (`shell-ui/rspack.config.ts:46`; `ui/rspack.config.ts:32–34`). |
| Q2 | Yes | Builds, imagens e recursos de deploy separados (`shell-ui/package.json:8–9`; `ui/package.json:38–39`; os dois `ui-operator-cr.sls`). Nenhum import de código-fonte entre as unidades; a UI usa só tipos gerados em `ui/@mf-types` (`ui/src/FederableApp.tsx:21`). |
| Q3 | Yes | O shell descobre as UIs implantadas e roteia as views federadas (`UIListProvider.tsx:66–79`; `FederatedApp.tsx:57–136`). No deploy, o `ScalityUIComponentExposer` liga `metalk8s-ui` ao `ScalityUI` do shell (`salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:52–74`). |
| Q4 | Yes | Module Federation configurado nos dois lados e conectado. Os módulos `./FederableApp` e `./AlertsNavbarUpdater` e o escopo `metalk8s` da `micro-app-configuration` correspondem aos `exposes` e ao `name` de `ui/rspack.config.ts:119–126`. O shell carrega o `remoteEntryPath` por `FederatedComponent` (`FederatedApp.tsx:85–94`). |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- `MFE-implemented`: Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes”, com composição em runtime por descoberta de UIs implantadas.
- Cadeia completa como em 076/084/096/106/109, aqui com nível de produção: versão no nome do `remoteEntry`, configuração de micro-app em `.well-known`, discovery e operator Kubernetes de UI.
- Não é plugin de plataforma de terceiros (037, 258): shell, remote e biblioteca `@scality/module-federation` são da mesma organização, e o shell é parte do produto.
- Não é code sharing (089/100): o remote fornece views completas (`platform`, `alerts`) montadas por rota.
- O `remotes: shell` da UI só em desenvolvimento (`ui/rspack.config.ts:128–132`) não altera a análise.
- `frontend_units: 2` (os tipos vendorizados em `@mf-types` e o cliente gerador de CRDs em `tools/` não são unidades), `unit_organization: monorepo`, `ui_technologies: [react]`, `build_tools: [rspack]`, `approaches: [module-federation]`, `repo_type: production`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** Module Federation (`@module-federation/enhanced/rspack`) sobre uma camada própria de micro-apps (`@scality/module-federation`). O remote publica `micro-app-configuration` (build) e `runtime-app-configuration` (execução) em `.well-known`. O shell faz discovery em `deployed-ui-apps.json` e monta views e “navbar updaters” federados.
- **RQ3:** composição declarada também na infraestrutura: os CRDs `ScalityUI`, `ScalityUIComponent` e `ScalityUIComponentExposer`, aplicados por Salt, conectam as imagens das unidades no cluster.
- **RQ1:** tipos gerados do shell versionados em `ui/@mf-types/` (com cópias de `node_modules`) aparecem como dezenas de `package.json` no inventário e podem inflar contagens automáticas de unidades.
- **Protocolo (snapshot):** o SHA clonado (merge de 2026-10-08T21:10:51Z) é posterior às coletas, sem mudança nos arquivos casados.
