---
schema: 1
id: 1048938294
full_name: xokaji/PatientPrep-ExpoGo-Full
url: https://github.com/xokaji/PatientPrep-ExpoGo-Full
commit: 6bcb12fdef92fe62697c21a7f9897bd4c9a3bf55
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react-native]
build_tools: [metro]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 363 — xokaji/PatientPrep-ExpoGo-Full

## Contexto

Aplicação mobile de preparação de pacientes (Expo/React Native) num monorepo Nx com uma API Node.js (Express), uma API FastAPI com Neo4j para chatbot e bibliotecas internas em `libs/` (descrição do repositório; `README.md:1–4`). O README afirma “a micro-frontend approach for the frontend” (`README.md:4`), mas há um único aplicativo cliente, que importa as bibliotecas por caminhos relativos. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:364` registra rank 363, ID 1048938294, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:364` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:18334` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:18339` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2025-09` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-09-01..2025-09-30` | 2026-10-07T22:26:02.618Z / 2026-10-08T15:55:54.999Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2025-09` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2025-09-01..2025-09-30` | 2026-10-07T22:56:53.972Z / 2026-10-08T16:06:44.857Z |

Metadados do hit: descrição “PatientPrep – Mobile-first healthcare prep app with Expo frontend, FastAPI + Neo4j chatbot, and modular Node.js backend in an Nx monorepo.”, tópicos `expo`, `expressjs`, `fastapi`, `neo4j`, `nx-workspace`, `typescript`, linguagem TypeScript, sem licença, `fork: false`, tamanho 5085, criação em 2025-09-02T08:48:56Z, push em 2025-09-22T05:36:53Z.

A única ocorrência do termo é `README.md:4`: “…with a micro-frontend approach for the frontend and modular backend services.”, no singular e hifenizado (hífen como separador). O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é o próprio SHA `6bcb12f` (2025-09-21, “Update README.md”), anterior às coletas de 7 e 8 de outubro de 2026; não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 122 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único app cliente (`apps/mobile-app`), dois backends (`apps/patient-prep-api`, `apps/chatbot-api`, com arquivos `__pycache__` versionados), testes e2e e bibliotecas em `libs/` (`ui`, `auth`, `appointment`, `utils`). | contrária |
| Configuração | `apps/mobile-app/project.json:4`, `8–27`: projeto Nx `application` com executores `@nx/expo` (`start`, `build`, `run-ios`, `run-android`); `apps/mobile-app/package.json:8–23`: Expo e React Native, sem dependência de composição. `libs/ui/project.json:5`, `8`: `projectType: "library"` sem alvos. | contrária |
| Código-fonte | `apps/mobile-app/src/app/App.tsx:1–56`: um navegador de pilha único com as telas de login, cadastro, abas, consultas, formulário e chatbot; desativa a regra de fronteiras do Nx (`:1`, `eslint-disable @nx/enforce-module-boundaries`). | contrária |
| Código-fonte (fronteiras) | Imports relativos que saem do app para as bibliotecas: `apps/mobile-app/src/app/App.tsx:7`, `9` (`../../../../libs/ui/src/lib/BottomTabs`, `../../../../libs/appointment/AppointmentForm`), `apps/mobile-app/src/screens/AppointmentScreen.tsx:13–17`, `ChatBotScreen.tsx:13`, `LoginScreen.tsx:12`. As `libs` são código compilado dentro do app, não unidades com entrada e build próprios. | contrária |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA (exceto `.pyc`) por `micro.?front`, `federation`, `single.?spa`, `import.?map`, `webview` e `iframe`: só `README.md:4`. | ausente |
| Documentação | `README.md:4`: autodescrição “micro-frontend approach”, sem artefato correspondente. | fraca |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 65 commits alcançáveis a partir do SHA (92 em todos os refs), 32 merges, de 2025-09-02 (`ae291b5`, “Initial Commit with Nx + Expo”) a 2025-09-21 (SHA). Todos os commits alcançáveis têm o autor `RaVindu Mahiti <142285997+xokaji@users.noreply.github.com>` (35 pela interface web). Há 14 refs remotos de branches além de `main`, vários com nomes de pessoas (`authSetup/Ravindu`, `bottomTabs/Thirandi`, `homeTab/Dewnaka` etc.), sugerindo trabalho em equipe integrado por merges do titular; não foram considerados à parte. `git rev-list --objects $SHA --missing=print` identifica 131 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`apps/mobile-app`); as `libs` não têm entrada nem build próprios (`libs/ui/project.json:5–8`); nenhuma configuração de composição. |
| Q2 | No | Não há duas unidades; o app importa o código-fonte das bibliotecas diretamente (`apps/mobile-app/src/app/App.tsx:7`, `9`). |
| Q3 | No | Um único navegador interno compõe telas e componentes da mesma aplicação (`App.tsx:14–56`). |
| Q4 | No | Nenhum mecanismo de composição; “micro-frontend approach” é autodescrição (`README.md:4`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” (modularização interna em `libs/` dentro de um único app) e a “repositories mentioning micro-frontends without implementing them”.
- Mesmo critério do final 042: código de outras pastas compilado dentro do único bundle não forma unidades independentes; aqui nem há segunda aplicação.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react-native]` (Expo), `build_tools: [metro]` (`apps/mobile-app/metro.config.js:1–23`, configuração do Metro via `withNxMetro` com transformador SVG), `repo_type: example` (projeto de equipe acadêmico/demonstrativo, `README.md:4`, “demonstrates”).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** monorepo Nx com `apps/` e `libs/` descrito como “micro-frontend approach”, mas com um só app cliente e imports relativos para as bibliotecas.
- **Protocolo:** o repositório versiona uma credencial de serviço do Firebase (`apps/patient-prep-api/patientprepsl-…-firebase-adminsdk-….json`) e arquivos `__pycache__`; o conteúdo não é reproduzido aqui.
