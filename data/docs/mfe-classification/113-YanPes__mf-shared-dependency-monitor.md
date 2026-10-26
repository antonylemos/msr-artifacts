---
schema: 1
id: 1013293028
full_name: YanPes/mf-shared-dependency-monitor
url: https://github.com/YanPes/mf-shared-dependency-monitor
commit: 44678aa4bee65e7156ae9492a7528843c3b43894
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 113 — YanPes/mf-shared-dependency-monitor

## Contexto

Extensão de navegador que inspeciona metadados de Module Federation da página ativa e apresenta remotes e divergências de dependências num popup React. A extensão lê uma aplicação externa já executando; não configura, inicializa ou monta os remotes dessa aplicação (`README.md:2`; `README.md:51–56`; `src/components/popup/popup.tsx:35–59`). `repo_type: other` registra ferramenta de inspeção, com uma UI própria; não é biblioteca/plugin de federação nem repositório de exemplos host/remotes.

## Proveniência na amostra

- Rank 113, identidade, ID e estratégias `terminology;technology`: `data/samples/mfe-sample-001/sample.csv:114`. Clone, branch `main` e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:114`. A amostra deriva da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:15953` registra elegibilidade `unknown`; `data/discovery/mfe-round-002/candidates.csv:15957`, `pass`. Ambas têm descrição de ferramenta para detectar versões divergentes no runtime Module Federation, tópicos vazios, linguagem TypeScript, licença MIT e `fork: false`.
- Consulta `sqlite3 -readonly` nos bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, unindo `hits`, `queries` e `subqueries`, por `repository_id=1013293028`: ambas registram os mesmos três hits, endpoint `repositories`, `path` vazio, `partition_label: created:2025-07`.

| Consulta | Estratégia | Grafia de `q` | Subconsulta | Grafia de `q_effective` |
|---|---|---|---|---|
| `technology-module-federation-repositories` | `technology` | `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-07` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-07-01..2025-07-31` |
| `terminology-micro-frontend-repositories` | `terminology` | `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2025-07` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-07-01..2025-07-31` |
| `terminology-micro-frontends-repositories` | `terminology` | `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2025-07` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2025-07-01..2025-07-31` |

Em ordem das três linhas, os `fetched_at` são `2026-10-07T23:18:34.983Z`, `2026-10-07T22:23:54.666Z` e `2026-10-07T22:55:30.340Z` na rodada 001; `2026-10-08T16:15:11.909Z`, `2026-10-08T15:55:10.597Z` e `2026-10-08T16:06:12.739Z` na rodada 002. Identificadores SQLite não recebem números de linha artificiais.

O README contém `Module Federation` em `README.md:1–2` e `micro-frontends` — plural hifenizado — em `README.md:11`. Para a tecnologia, descrição e README são ambos compatíveis; não se atribui campo único. Para terminologia, nome/descrição não contêm a expressão micro frontend e tópicos estão vazios, tornando o README o campo compatível por eliminação. As consultas usam espaços, e a menção observada é plural hifenizada; os hits não informam trecho ou normalização exatos. O nome do repositório não é evidência arquitetural.

O README do SHA **não é posterior às buscas**: metadados do último commit que o altera, `c92394b0b04467f2271a86bb10e33e2905e1b8f1`, registram `2026-06-05T19:13:19+02:00` (`2026-06-05T17:13:19Z`), anterior às coletas de outubro. O HEAD é de 13/06/2026. Não foram necessários README/blobs históricos para estabelecer a cronologia.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r` do SHA: 31 arquivos regulares, todos modo 100644; zero symlinks e zero gitlinks. Nove arquivos em `src/`, quatro em `icons/`, três em `docs/`, três screenshots em `public/` e 12 na raiz. Não há `node_modules`, submódulo, código vendorizado de host/remotes, outro manifesto npm ou configuração de composição de aplicações. Contagens da árvore Git, sem linhas textuais artificiais. | contexto |
| Configuração / Estrutura | Manifesto de extensão v3 declara permissões `scripting`, `activeTab`, `tabs` e `default_popup: popup.html` (`manifest.json:1–19`). Não define remotes/exposes; o host de execução da extensão é o navegador, não uma aplicação frontend composta pelo titular. | contrária |
| Código-fonte (entrada UI) | `popup.html` contém `#root` e carrega `src/popup/index.tsx` (`popup.html:44–46`). Essa entrada importa o componente local Popup e o renderiza com React `createRoot` (`src/popup/index.tsx:1–4`; `src/popup/index.tsx:30–36`). É o único alvo UI de aplicação observado. | contrária |
| Código-fonte (diagnóstico) | O popup obtém a aba ativa e usa `chrome.scripting.executeScript`, `allFrames: true`, função `createExtractor()` e contexto `MAIN` (`src/components/popup/popup.tsx:35–59`). Essa API executa extração na página inspecionada; não carrega uma aplicação remota no popup. O extrator é função autocontida exportada (`src/extractor.ts:1–4`; `src/extractor.ts:32–48`). | contrária |
| Código-fonte (runtime externo) | O extrator lê `window.__FEDERATION__`, suas instâncias e opções de remotes (`src/extractor.ts:48–82`), e consulta entradas de performance para URLs `remoteEntry.js`/`mf-manifest.json` já carregadas (`src/extractor.ts:112–128`). São dados da página inspecionada, sem configuração própria com nomes/URLs de unidades do candidato. A palavra remoteEntry é critério de detecção, não output de um build MF neste repositório. | contrária |
| Código-fonte (apresentação) | O popup agrega os resultados e atualiza estado local (`src/components/popup/popup.tsx:67–117`). `RemoteCard` recebe um objeto de metadados e apresenta a URL como link externo (`src/components/remote-card/remote-card.tsx:5–11`; `src/components/remote-card/remote-card.tsx:23–32`), enquanto SharedDepsTab apresenta divergências (`src/components/shared-deps-tab/shared-deps-tab.tsx:3–16`). Nenhum desses componentes importa ou monta o módulo remoto detectado. | contrária |
| Código-fonte (fronteiras) | Executado `git grep -n -F -e '../../' -e '../../../'` em todo `src/` do SHA. Três resultados: import de `createExtractor` e seu tipo no Popup (`src/components/popup/popup.tsx:5–6`) e import do tipo em SharedDepsTab (`src/components/shared-deps-tab/shared-deps-tab.tsx:3`). Todos resolvem ao mesmo `src/extractor.ts`, parte da extensão. Não se generaliza ausência a partir de amostra: os vínculos existem, mas não são entre unidades frontend independentes. | contexto |
| Build/deploy / Tecnologia | Scripts chamam Extension.js para dev/build por navegador (`package.json:5–14`); `extension.config.js:1–15` configura comandos, polyfill, navegadores e zip. React/ReactDOM são dependências (`package.json:16–18`); lockfile fixa ambos em 18.3.1 (`package-lock.json:6214–6218`; `package-lock.json:6227–6231`) e Extension.js 3.18.2 (`package-lock.json:3839–3843`). Entradas e imports locais existem. Resolução estática básica conferida, sem instalar/executar build; `build_tools: []` porque não há configuração/hook de bundler explícito além do wrapper Extension.js. | contexto |
| Tecnologia / Configuração / Composição | Busca textual no SHA, excluindo lockfile, por `ModuleFederationPlugin`, `withModuleFederation`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `importmap`, `loadRemote` e `exposes:`: nenhum resultado. Inventário de arquivos e inspeção da configuração não encontram cadeia remotes ↔ exposes ↔ consumo, SDK/runtime MF usado para compor ou preparação de frontend para host externo. Ler metadados MF não equivale a configurar MF. | ausente |
| Estrutura / Documentação | `docs/index.html:15–18` é página estática de apresentação com link de privacidade; `docs/privacy-policy/index.html:15–16` identifica a política da extensão. São documentação auxiliar, sem build/aplicação independente ou relação de composição com o popup; não são unidades adicionais de Q1. README explica escaneamento e uso do navegador (`README.md:51–72`). Não há ADR/documento adicional de arquitetura no inventário. | contexto |

## Autoria e histórico

Metadados no SHA: 36 commits alcançáveis, quatro merges, um commit-raiz `93a070fb3313d2142bc4b5bbbe704064c93f501e`, clone não shallow. Pares autor/committer: 21 `YanPes`/`YanPes`, 11 `Yannik Peschke`/`GitHub`, três `yanpes`/`yanpes` e um `Yannik Peschke`/`Yannik Peschke`. Não se presume equivalência entre identidades ou autoria intelectual integral a partir desses registros.

`git log --no-renames --name-status` por `src/`, `docs/`, `manifest.json` e `extension.config.js`, sempre com `GIT_NO_LAZY_FETCH=1`, mostra evolução incremental. `2dd421d0f1612f915cfe8280b9e6ffab03b82faa` acrescenta a entrada/UI React no fluxo Rsbuild; `902c372df3c71de932df50fc769fb1ffa5ef3fdf` acrescenta páginas de documentação; `c92394b0b04467f2271a86bb10e33e2905e1b8f1` adiciona a configuração Extension.js e altera componentes/manifesto; HEAD ajusta o tamanho/apresentação Firefox em `src/popup/index.tsx` e estilos. Não houve objeto ausente nessas consultas, e não foram necessários blobs históricos. A menção histórica a Rsbuild não autoriza contar configuração de bundler ausente do snapshot.

As refs `main`, `origin/main` e `origin/HEAD` apontam ao SHA avaliado; há também branches de UI/README e `feature/module-graph-visualization`. Apenas seus nomes/metadados foram registrados, sem incorporar conteúdo de outra branch. O histórico não indica importação integral de plataforma terceira como alvo próprio; a ferramenta usa APIs do navegador e bibliotecas, sem que isso atribua ao titular a autoria dessas dependências.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma UI de extensão, com entrada e root React (`manifest.json:11–19`; `popup.html:44–46`; `src/popup/index.tsx:30–36`). Remotes encontrados são dados de páginas arbitrárias, não unidades presentes/referenciadas por configuração de composição do candidato (`src/extractor.ts:48–82`). |
| Q2 | No | Não há conjunto de unidades frontend com entradas/builds próprios. Popup, componentes e extrator são partes do mesmo alvo, com imports diretos locais (`src/components/popup/popup.tsx:3–6`; `package.json:5–14`). A varredura de caminhos relativos foi integral em `src/`. |
| Q3 | No | A página inspecionada fornece dados ao popup por API de scripting, sem host que carregue/monte/roteie suas unidades na UI da extensão (`src/components/popup/popup.tsx:55–59`; `src/components/popup/popup.tsx:67–117`). |
| Q4 | No | A configuração é de extensão de navegador e seu código lê runtime/performance externos (`manifest.json:1–19`; `src/extractor.ts:48–82`; `src/extractor.ts:112–128`), sem mecanismo próprio configurado e usado para conectar unidades frontend. |
| Q5 | No | Ferramenta de diagnóstico para ambientes MFE, sem implementar arquitetura MFE nem fornecer uma unidade frontend federada para host externo. |

## Motivo

- `Non-MFE`: Q1–Q5 No, sem exceção MFE-unit. `repo_type: other` registra ferramenta, como a distinção de 075; `frontend_units: 1` conta seu popup React, após inventário completo. Não se contam componentes, extrator sem UI, páginas auxiliares ou unidades de sites arbitrários que a ferramenta venha a inspecionar.
- Q1 exige unidades concretas ou referências da configuração de composição, não metadados coletados em execução. Q2 exige entrada/build próprios por unidade: serializar uma função para execução na aba não cria segunda unidade frontend. Q4 exige composição configurada e conectada; detector de arquivos federados não satisfaz esse critério.
- Os nomes `RemoteInfo`, `remoteEntry` e `__FEDERATION__` foram confrontados com seu uso, em vez de usados como confirmação. A extensão lê e apresenta esses dados; não faz import de aplicação detectada. Os links de RemoteCard abrem URLs como informação, sem contrato de composição de aplicação entre unidades.
- Não é cenário de host externo ausente ou configuração não conectável como 097/103/104: inexiste unidade preparada para composição externa. Q2–Q4 são No. Não surge a decisão de code sharing em 089/100, pois o candidato não usa MF nem para compartilhar seus componentes.
- 076/084/096/106/109 e o final 007 contêm cadeias de aplicação/host/remotes; aqui as aplicações externas são objetos de inspeção. A plataforma navegador é terceira, mas não é preciso override de Q5 como em 037: não há sequer remote/widget MF registrado para ela. Os cuidados de 074/102/080 com terceiros impedem contar a aplicação inspecionada como código próprio, sem negar a existência do popup implementado.
- Não é perfil pessoal como 011/064/068/073/077/101/111 nem simples conteúdo didático. Como em 023/075/081/094/105, screenshots, documentação e código apenas exibido não acrescentam unidades. O nome da ferramenta é irrelevante para confirmar MFE.
- Não há questão aberta de integração por link/iframe ou composição em build time. React está observado nas fontes; o bundler fica encapsulado em Extension.js no SHA, por isso `build_tools: []`. Não foram executados builds, testes ou navegador.

## Notas para análise

- **RQ1 (famílias):** buscas por `YanPes`, `dependency monitor` e referências a extensões de navegador nas anotações disponíveis não localizaram irmão/template já anotado. Comparação funcional com ferramentas como 075, sem afirmar origem comum.
- **RQ3:** cadeia real: clique/abertura do popup → aba ativa → extrator autocontido no contexto da página → retorno de dados → estado React → apresentação. Não é cadeia host → remote → UI montada.
- **Protocolo:** README é anterior às buscas; consultas/subconsultas e grafias foram preservadas. Hits de recuperação sobre tecnologia MFE podem corresponder a ferramenta de inspeção dessa tecnologia, sem arquitetura MFE implementada no próprio candidato.
- **Protocolo (lockfile):** a busca textual exclui o lockfile. `package-lock.json` contém seis pacotes `@module-federation/*` (runtime, runtime-core, runtime-tools, sdk e webpack-bundler-runtime), transitivos de `@rspack/core` via `extension-develop` (Extension.js); nenhum é dependência direta (`package.json:16–28`) nem é importado em `src`. É o runtime interno do bundler encapsulado, não uso de Module Federation pelo candidato, o que reforça `build_tools: []`.
- **Protocolo (cronologia):** o `pushed_at` do hit (2026-09-09T13:41:58Z) é posterior ao HEAD de `main` (2026-06-13). Os metadados de refs mostram que o push foi em `origin/feature/module-graph-visualization` (`c17f76c`, 2026-09-09T13:41:39Z); a `main` avaliada não mudou. O conteúdo dessa branch não foi lido.
