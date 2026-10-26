---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
url: https://github.com/cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [web-components]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 378 — cMancillaValle/ARGOS-SiVIA

## Contexto

Plataforma acadêmica de segurança por visão computacional (“ARGOS - SiViA”; descrição do repositório): backend FastAPI com módulos de IA, um frontend principal em HTML/JS sem framework (`frontend/`) e um assistente de chat (“Hermes IA”) desenvolvido à parte em React/TypeScript/Vite (`frontend-hermes/`), compilado como Web Component e embutido no dashboard (`README.md:58–64`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:379` registra rank 378, ID 1255336417, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:379` registra a estratégia `terminology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:31029` e `data/discovery/mfe-round-002/candidates.csv:31037`, ambos com `terminology` e `unknown` (regra `recent-human-commit` com `activity_incomplete`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-05` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T22:36:26.100Z / 2026-10-08T15:59:43.953Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-05` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T23:05:10.076Z / 2026-10-08T16:09:15.173Z |

Metadados do hit: descrição em espanhol sobre a plataforma de segurança (sem os termos), sem tópicos, linguagem HTML, sem licença, `fork: false`, tamanho 406, criação em 2026-05-31T17:49:59Z, push em 2026-09-28T02:36:30Z.

**README posterior às buscas.** O README do SHA foi alterado em `221f58c` (2026-10-09T23:39:47-05:00, “Migración de Flask a FastAPI completada.”), e o próprio SHA `4f6ef7f` é de 2026-10-10, ambos depois das coletas de 7 e 8 de outubro de 2026. A versão vigente nas buscas é a de `6fc3f39` (2026-09-15), cujo blob (`754b795…`) está ausente no clone parcial e não foi buscado; não é possível citar a linha exata que casou. No README do SHA, o singular hifenizado aparece em `README.md:63` (“Micro-frontend independiente construido en **React + TypeScript** con **Vite**”), `:70`, `:101`, `:208` e `:312`; o plural “micro frontends” não aparece literalmente.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 144 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Duas unidades frontend: `frontend/` (HTML/CSS/JS estático com `dashboard.html`, `views/`, `js/router.js`) e `frontend-hermes/` (projeto Vite/React com `package.json`, `vite.config.ts`, `src/`); backend Python em `backend/`. | forte |
| Configuração (unidade Hermes) | `frontend-hermes/vite.config.ts:10–16`: build de biblioteca com entrada `src/hermes-widget.tsx`, formato `iife`, arquivo `hermes-widget.js`, React embutido (`:17–23`) e CSS injetado por JS (`:3`, `8`). `frontend-hermes/package.json:6–11`: build próprio (`tsc -b && vite build`). | forte |
| Código-fonte (contrato) | `frontend-hermes/src/hermes-widget.tsx:6–59`: custom element `hermes-widget` com Shadow DOM, atributos observados `token`, `api-base` e `modulo` (`:10–12`), montagem de `App` React (`:37–46`) e `customElements.define` (`:57–58`). `frontend-hermes/src/App.tsx:35–40`: escuta os eventos `toggle-hermes` e `close-hermes` em `window`. | forte |
| Código-fonte (host) | `frontend/dashboard.html:359–361`: `<hermes-widget id="hermes-ai-widget" api-base="/api" modulo="dashboard">`; `:366`: `<script src="/hermes/hermes-widget.js">`; `:726–730`: injeta o token no atributo após o boot do router. `frontend/components/topbar.html:25–26` e `frontend/dashboard.html:421`: disparam `toggle-hermes`/`close-hermes`. | forte |
| Build/deploy | `backend/main.py:92`: `HERMES_DIST` aponta para `frontend-hermes/dist`; `:281–287`: rota `/hermes/{filename}` serve o build do widget; `:291–293`: o resto de `frontend/` como estáticos. `ngrok_tunnel.py:50–62`: compila o widget antes de expor o servidor. `.gitignore:59`: `frontend-hermes/dist/` não é versionado. Deploy conjunto no mesmo servidor, com builds separados. | moderada |
| Código-fonte (fronteiras) | Busca por `../` em `frontend-hermes/src` e configs: só imports internos (`HermesChat.tsx:6–7`, `useChat.ts:5–6` etc.). O host não importa código do widget; carrega o bundle por URL e se comunica por atributos e eventos. | forte |
| Documentação | `README.md:58–64`, `101–108`, `208–214`: Hermes descrito como “micro-frontend independiente” e “Widget embebible del chatbot”. | moderada |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 12 commits alcançáveis (12 em todos os refs), nenhum merge, de 2026-09-15 (`cdc871d`) a 2026-10-10 (SHA). Autoria: `cMancillaValle` (10 commits) e `evallejog` (2), ambos com e-mail institucional da mesma universidade. O widget Hermes já existe em `6fc3f39` (2026-09-15, “Finalizar merge con repositorio remoto”); a migração para FastAPI (`221f58c`) e o SHA são posteriores às buscas. Ref remoto `fastAPIpoc` não considerado à parte. `git rev-list --objects $SHA --missing=print` identifica 51 objetos históricos ausentes, entre eles o blob do README vigente nas buscas; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades no repositório: o frontend estático e o widget Hermes, referenciado pelo host (`frontend/dashboard.html:361`, `366`). |
| Q2 | Yes | O widget tem entrada e build próprios (`frontend-hermes/vite.config.ts:10–16`); o host é estático sem build; nenhum import de código-fonte entre eles. |
| Q3 | Yes | O dashboard carrega e monta o widget e lhe passa sessão e contexto (`frontend/dashboard.html:359–366`, `726–730`). |
| Q4 | Yes | Web Component com contrato explícito (atributos e eventos) carregado por `<script>` a partir do build servido em `/hermes/` (`backend/main.py:281–287`). |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- Q1–Q5 são Yes, o que satisfaz a regra de `MFE-implemented`. Segue o padrão do final 043: unidade construída à parte e composta em runtime como custom element por um host, não um pacote de componentes importado em build (não é “component library using Web Components”).
- A ligação é resolvível no snapshot (entrada → `hermes-widget.js` → rota `/hermes/` → `<script>` no host), ao contrário de 328 e 103. O widget é uma funcionalidade completa com estado e API próprios, não utilitário (contraste com 089/100).
- O deploy é conjunto (o mesmo FastAPI serve os dois), mas os builds são separados e o carregamento é em runtime, como na nota de deploy do final 059.
- `frontend_units: 2`, `unit_organization: monorepo`, `approaches: [web-components]`, `ui_technologies: [react]` (o host não usa biblioteca de UI), `build_tools: [vite]`, `repo_type: example` (projeto acadêmico).
- Não há decisão aberta que mude a classe.

## Notas para análise

- **Protocolo (README posterior às buscas):** o README e o SHA são de 9–10 de outubro de 2026, depois das coletas; a versão do README vigente nas buscas não está no clone parcial. A classificação usa o SHA fixado; a correspondência textual do hit não foi verificada linha a linha.
- **RQ2:** Web Component React empacotado como IIFE com Shadow DOM e CSS injetado, embutido num frontend vanilla; contrato por atributos (`token`, `api-base`, `modulo`) e eventos globais.
- **RQ3:** comunicação host→widget por atributos e `CustomEvent` em `window`; o widget consome a mesma API do backend (`api-base`).
- **Protocolo (elegibilidade):** `unknown` nas duas rodadas (`activity_incomplete`).
