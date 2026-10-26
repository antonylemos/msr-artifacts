---
schema: 1
id: 1343187191
full_name: ANTONIOALGMAR/StudyAgent
url: https://github.com/ANTONIOALGMAR/StudyAgent
commit: 2799940125ce682f451fcda1a72fc3e507cd52f5
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 116 — ANTONIOALGMAR/StudyAgent

## Contexto

Aplicação local de tutoria multimodal, com frontend React/Vite e backend Python/FastAPI/Ollama. Chat, avatar 3D, exercícios, flashcards, documentos e painéis são funcionalidades do mesmo frontend (`README.md:3`; `frontend/src/App.tsx:3–5`; `frontend/src/components/Chat.tsx:1–20`). `repo_type: production` registra aplicativo voltado a uso funcional local, com instalação, permissões e empacotamento, sem afirmar maturidade ou sucesso de execução.

## Proveniência na amostra

- Rank 116, ID, identidade e estratégia `broader`: `data/samples/mfe-sample-001/sample.csv:117`. Clone, branch `main` e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:117`. Origem da amostra na rodada 002: `data/samples/mfe-sample-001/manifest.json:2–5`.
- `data/discovery/mfe-round-001/candidates.csv:35930` registra elegibilidade `unknown`; `data/discovery/mfe-round-002/candidates.csv:35935`, `pass`. Ambas têm descrição `agente de estudo`, tópicos vazios, linguagem Python, licença nula, `fork: false` e último push `2026-10-06T21:25:42Z`.
- Consulta `sqlite3 -readonly` aos bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, unindo `hits`, `queries` e `subqueries`, por `repository_id=1343187191`: ambas têm um hit `broader-frontend-decomposition`, estratégia `broader`, endpoint `repositories`, consulta exata `"frontend decomposition" in:name,description,readme`. A subconsulta também se chama `broader-frontend-decomposition`, com `q_effective` exato `"frontend decomposition" in:name,description,readme pushed:>=2025-04-01`, `partition_label` e `path` vazios. São chaves SQLite, sem linhas textuais artificiais.
- `fetched_at`: `2026-10-07T23:39:32.932Z` na rodada 001 e `2026-10-08T16:22:51.991Z` na 002. Por eliminação, nome/descrição não contêm a expressão e tópicos estão vazios; o README apresenta literalmente `Frontend Decomposition: Chat.tsx 993→357 lines, 3 hooks, 4 components` em `README.md:548`. A expressão coincide com a consulta, desconsiderando capitalização, e descreve refatoração interna. O banco não identifica o trecho exato que originou o hit. Nome e recuperação não confirmam arquitetura.
- O README do SHA **não é posterior às buscas**: os metadados do último commit que o altera, `c65588caf6cbf39123fac27120a0aadd0bfee7c6`, registram `2026-10-06T15:13:26-03:00` (`2026-10-06T18:13:26Z`), anterior às duas coletas. HEAD é de `2026-10-06T18:25:40-03:00`. A cronologia foi conferida sem ler blobs históricos.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário completo por `git ls-tree -r` do SHA: 222 arquivos regulares, 213 modo 100644 e nove modo 100755; zero symlinks e zero gitlinks. São 132 em `backend/`, 54 em `frontend/`, sete em `scripts/`, seis em `docs/`, três em `data/`, dois em `config/`, um em `.github/` e 17 na raiz. Não há `node_modules`, submódulos ou árvore de aplicações terceiras vendorizadas. Um único manifesto npm, em `frontend/`. Contagens da árvore Git, sem linhas textuais artificiais. | contexto |
| Build/deploy / Configuração | O único frontend tem scripts Vite de dev/build/preview (`frontend/package.json:1–9`) e configuração explícita com plugin React, porta 5173 e configuração de testes (`frontend/vite.config.ts:1–13`). O HTML contém `#root` e `/src/main.tsx` (`frontend/index.html:8–10`); essa entrada importa o App local e o renderiza (`frontend/src/main.tsx:1–10`). Não há entrada/build próprio para cada painel. | contrária |
| Código-fonte (consumo) | App importa Chat e Notifications locais e os renderiza no mesmo root (`frontend/src/App.tsx:3–5`; `frontend/src/App.tsx:108–114`). Chat importa componentes e hooks locais, incluindo PanelManager (`frontend/src/components/Chat.tsx:1–17`). Isso é composição convencional de componentes React do mesmo build. | contrária |
| Código-fonte (painéis) | `PanelManager` importa os painéis de um barrel local (`frontend/src/components/PanelManager.tsx:1–9`); `panels.ts` reexporta seis arquivos locais (`frontend/src/components/panels.ts:1–6`). O gerenciador renderiza esses componentes sob Suspense (`frontend/src/components/PanelManager.tsx:38–63`), sem remote, lifecycle ou aplicação independente por painel. | contrária |
| Código-fonte (lazy loading) | Os imports lazy observados carregam `./PdfViewer` e `./StudyAgent3D/StudyAgentAvatar` (`frontend/src/components/Chat.tsx:19–20`). São destinos locais existentes do mesmo aplicativo, não unidades externas de composição. O avatar e o conteúdo de exercícios gerado pelo agente não acrescentam unidades frontend. | contrária |
| Código-fonte (busca de fronteiras) | Executado `git grep -n -F -e '../../' -e '../../../'` em todo `frontend/src` do SHA. Dois resultados: `getVoiceLevel` em `AgentRealisticHead` e `setVoiceSensitivity` em `StudyAgentAvatar`, ambos de `../../lib/audioReactive` (`frontend/src/components/StudyAgent3D/AgentRealisticHead.tsx:9`; `frontend/src/components/StudyAgent3D/StudyAgentAvatar.tsx:7`). São utilitários locais da mesma árvore; não se afirma independência por amostra ou ausência fictícia de imports. | contexto |
| Código-fonte / Composição (iframe) | `PdfViewer` recebe documento como prop e importa funções locais da API (`frontend/src/components/PdfViewer.tsx:1–9`). Seu iframe aponta a `documentFileUrl(doc.id)` com parâmetros de visualização PDF (`frontend/src/components/PdfViewer.tsx:144–148`); a função retorna `/api/documents/<id>/file` (`frontend/src/api.ts:458–460`). É exibição de documento, sem contrato de integração entre unidades frontend. A existência do iframe não foi ignorada nem elevada automaticamente a mecanismo MFE. | contrária |
| Tecnologia / Resolução | React/ReactDOM, Vite e plugin estão declarados (`frontend/package.json:14–15`; `frontend/package.json:24–28`). Lockfile resolve React/ReactDOM 18.3.1 (`frontend/package-lock.json:3034–3037`; `frontend/package-lock.json:3058–3061`), Vite 6.4.3 (`frontend/package-lock.json:3606–3609`) e plugin React 4.7.0 (`frontend/package-lock.json:1940–1943`), cujo peer registrado admite Vite 6. Config/entrada/imports locais existem; resolução estática básica conferida, sem instalação ou execução de build. | contexto |
| Build/deploy | Dockerfile copia o único manifesto/lockfile, executa build e serve o dist em nginx (`frontend/Dockerfile:1–10`). Backend/API é dependência de dados/serviço, não outra UI: o cliente central aponta a `http://localhost:8000` (`frontend/src/api.ts:1`). Não há empacotamento independente de painéis como aplicações. | contrária |
| Tecnologia / Configuração / Composição | Busca textual no SHA, excluído o lockfile frontend, por `ModuleFederation`, `remoteEntry`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `importmap`, `loadRemote` e `micro.?frontend`: único resultado foi o iframe do PDF. Inventário de manifests/configs/entradas não encontra cadeia remotes ↔ exposes ↔ consumo ou preparação de unidade para host externo. | ausente |
| Documentação / Arquitetura | `architecture-map.md:9–11` declara UI React com “shell único, sem roteador” ligada por HTTP à API; descreve componentes/serviços (`architecture-map.md:15–35`). A auditoria define “Frontend Decomposition” como extrair ChatInput/ChatMessages/ChatVoice e hooks de Chat (`docs/ARCHITECTURE_AUDIT.md:276–282`), coerente com os imports atuais. O README marca esse trabalho como concluído (`README.md:548`). São documentos de arquitetura observados; não há ADR separado no inventário. | contrária |

## Autoria e histórico

Metadados no SHA: 98 commits alcançáveis, um merge, um commit-raiz `a290e64349b7f31f072942bf1b20559b4460e9ca`, clone não shallow. Todos registram autor e committer `ANTONIOALGMAR`. O raiz, de 22/08/2026, descreve a V1 com chat/voz/visão/permissões; HEAD é de 06/10/2026, sobre resolução de questões de tela.

`git log --no-renames --name-status` por `frontend/`, `backend/` e `architecture-map.md`, sempre com `GIT_NO_LAZY_FETCH=1`, mostra adição das duas árvores no raiz e alterações incrementais. `65c31f0e2d012c1e5dc857c832235ac13f2e6521` unifica sidebars/ajusta frontend; `889404ec92693709be9e2bfe9cd2651b5f96e98b` modifica API cliente, painel ao vivo e estilos; `b50c791e34fdc5a379a051f267a8dacf0675ba15` modifica hook/teste de tela. HEAD altera código e testes do backend, sem acrescentar outro frontend. `22d44f23d50040b435564680da6b6c9a83c39c25` adiciona o mapa de arquitetura. Não houve objeto ausente nas consultas e não foram necessários blobs históricos.

As identidades e a adição inicial não provam autoria intelectual original de todos os componentes/modelos/dependências. Não há indicação observada de cópia vendorizada separada sendo contada como alvo próprio. `main`, `origin/main` e `origin/HEAD` apontam ao SHA; a ref `origin/feature/identity-centralization` foi apenas registrada, sem leitura de conteúdo alternativo.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um frontend com root, manifesto/build e fontes próprios (`frontend/package.json:1–9`; `frontend/src/main.tsx:1–10`). Painéis, avatar, backend e documento no iframe não são unidades adicionais. |
| Q2 | No | Não há duas unidades com entradas/builds próprios: painéis são importados de fontes locais do mesmo aplicativo (`frontend/src/components/PanelManager.tsx:1–9`; `frontend/src/components/panels.ts:1–6`). A varredura completa de imports relativos não revela outra unidade; ausência de fronteiras não é prova positiva de independência. |
| Q3 | No | App/Chat renderizam componentes do mesmo root, não unidades frontend distintas (`frontend/src/App.tsx:108–114`; `frontend/src/components/Chat.tsx:1–20`). O mapa descreve shell único (`architecture-map.md:9–11`). |
| Q4 | No | Não há mecanismo configurado e usado para conectar unidades frontend. Imports lazy são locais (`frontend/src/components/Chat.tsx:19–20`); iframe aponta a documento da API (`frontend/src/components/PdfViewer.tsx:144–148`; `frontend/src/api.ts:458–460`). |
| Q5 | No | Aplicativo React convencional, com refatoração interna chamada “Frontend Decomposition”, sem arquitetura MFE ou MFE-unit implementada. |

## Motivo

- `Non-MFE`: Q1–Q5 No, sem exceção MFE-unit. `frontend_units: 1` decorre do inventário completo. A observabilidade é suficiente; não se usa `null` nem se conta backend Python como frontend.
- Q1 exige alvos de composição concretos ou referenciados pela configuração. Q2 exige entrada/build próprios e independência entre fontes; os painéis compartilham bootstrap, build e imports locais. Q4 exige mecanismo de composição efetivamente conectando unidades, não imports de componentes, Suspense ou extração de hooks.
- O iframe foi inspecionado: exibe arquivo PDF, sem segunda aplicação ou contrato de integração UI entre unidades. Como na separação de conteúdo dos casos 023/081, não há decisão geral de iframe a arbitrar. Ferramentas de código e exercícios gerados pelo agente também não são unidades presentes/configuradas para composição, conforme a cautela de 075/105.
- Não é perfil pessoal como 011/064/068/073/077/101/111. A aplicação é concreta, mas difere das cadeias completas 076/084/096/106/109 e do final 007. Também não é configuração MFE não conectável (097/103/104), federação de code sharing a arbitrar (089/100), ou distribuição/plugin de plataforma como discutido em 074/102/080.
- Sem unidade preparada para host externo, Q2–Q4 ficam No. A tecnologia observada é React, com Vite explicitamente configurado; Three.js/R3F são recursos do mesmo frontend, sem novo framework/unidade independente no registro.
- Não há decisão classificatória aberta de composição por pacotes em build time, link/iframe ou imperfeição de execução. Não foram executados scripts, instalação, build, testes, modelos ou aplicação; a classificação não confirma as alegações funcionais do produto.

## Notas para análise

- **RQ1 (famílias):** busca por `ANTONIOALGMAR` e `StudyAgent` nas anotações disponíveis não localizou irmão/template já anotado. Os comparadores citados são metodológicos, sem evidência de origem comum.
- **RQ1 (sinal enganoso):** a expressão de busca “Frontend Decomposition” corresponde à extração de componentes/hooks de um arquivo grande, não à decomposição de aplicação em unidades com builds próprios. O efeito é demonstrado por documentação e fontes, sem depender apenas do README.
- **RQ3:** cadeia conferida: HTML → main → App → Chat → componentes/painéis/serviços locais. A API fornece dados/documentos; o iframe apresenta PDF. Nenhum elo adiciona um frontend remoto.
- **Protocolo:** consulta e subconsulta únicas da estratégia `broader` foram preservadas, assim como a linha exata do README e a anterioridade às coletas. O banco não fornece localização textual do casamento; nome e hit não confirmam MFE.
