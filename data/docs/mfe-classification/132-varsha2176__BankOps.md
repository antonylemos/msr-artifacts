---
schema: 1
id: 1350569560
full_name: varsha2176/BankOps
url: https://github.com/varsha2176/BankOps
commit: 8f6f93226ae6124eaf6a971a0b364697b54dff7f
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 132 — varsha2176/BankOps

## Contexto

Plataforma demonstrativa de monitoramento e gestão de incidentes bancários: backend FastAPI, scripts de batch em Python e uma única SPA React/Vite, orquestrados por Docker Compose (`README.md:1–4`; `README.md:10`; `README.md:27–38`). Os “microservices” do README são serviços bancários simulados e monitorados pelo backend, não unidades frontend. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:133` registra rank 132, ID 1350569560, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:133` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:36318` (`broader`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:36326` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q3` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-09-30` | 2026-10-07T23:45:57.379Z / 2026-10-08T16:25:31.230Z |

Metadados do hit: descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, criação em 2026-08-29T12:34:43Z, push em 2026-08-29T12:40:48Z. Por eliminação, o acerto vem do README. `README.md:138` contém a frase literal na árvore de diretórios: “docker-compose.yml          # Postgres + Backend + Frontend orchestration”. `README.md:51` tem a variante “orchestrating database, backend, and frontend”. Nos dois casos, “orchestration” descreve contêineres do Compose.

O README do SHA vem do único commit, `8f6f932` (2026-08-29T18:08:20+05:30), anterior às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 92 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto frontend (`frontend/`, com `package.json`, `vite.config.js`, `index.html`, `src/`), `backend/` (FastAPI), `batch/`, `database/`, `logs/` e `tests/`. Sem `node_modules` versionado e sem segundo manifesto frontend. | contrária |
| Código-fonte (UI) | `frontend/index.html:13–14`: uma raiz `#root` carregando `/src/main.jsx`. `frontend/src/main.jsx:3–9` renderiza `App`. `frontend/src/App.jsx:3–19` importa contexto, componentes e as 12 páginas locais; `frontend/src/App.jsx:56–89` define todas as rotas num único `Router`, com layout protegido e `Sidebar` (`frontend/src/App.jsx:21–40`). | contrária |
| Código-fonte (fronteiras) | Busca por todos os imports em `frontend/src`: os `../` (por exemplo, `frontend/src/pages/Alerts.jsx:15–20`, `frontend/src/components/Sidebar.jsx:19–20` e `frontend/src/context/AuthContext.jsx:2`) apontam para `components/`, `context/` e `services/` dentro do mesmo `frontend/src`. Não há segunda unidade cuja fronteira pudesse ser atravessada. | contexto |
| Configuração / Build/deploy | `frontend/package.json:6–10`: um ciclo `vite`/`vite build`. `frontend/vite.config.js:5–17` usa só o plugin React e o proxy `/api` para o backend. `frontend/Dockerfile:1–20` gera um único `dist` servido por nginx, e `frontend/nginx.conf:5–18` faz fallback SPA e proxy `/api/` para o backend. `docker-compose.yml:3–55`: serviços `postgres`, `backend` e `frontend`. | contrária |
| Tecnologia | React/React DOM e Vite declarados (`frontend/package.json:14–15`, `26`) e resolvidos em `frontend/package-lock.json:2775–2776`, `2788–2789` e `3298–3299` (18.3.1; 5.4.21). | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfile, por `orchestrat`, `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun` e `wujie`: só `README.md:51` e `README.md:138`. O lockfile não contém `federation` nem `single-spa`. | ausente |
| Documentação (arquitetura) | `README.md:27–38`: diagrama com um cliente “React 18 + Vite Frontend” falando REST com o backend. `README.md:91–116`: estrutura de um único frontend com páginas e componentes. `README.md:14` e `README.md:315` usam “microservices” para os serviços bancários monitorados (tabela `applications`). | contexto |

## Autoria e histórico

Clone não raso. Há um único commit, que é o SHA avaliado e a raiz: “Initial commit - BankOps production support platform”, de `varsha2176 <aaruna.varshhh0760@gmail.com>`, em 2026-08-29T18:08:20+05:30. Não há merges nem outros branches remotos. Com um único commit, o histórico não permite distinguir evolução ou autoria por pasta: todos os 92 arquivos entram juntos. `README.md:173` traz um caminho local do Windows (`c:\Users\aarun\OneDrive\Desktop\BankOps\frontend`), indicando cópia de um diretório de trabalho. Não há indício de código de terceiros além das dependências declaradas. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend, a SPA de `frontend/` (`frontend/index.html:13–14`; `frontend/package.json:6–10`). Não existe configuração de composição que referencie unidades externas (busca registrada). |
| Q2 | No | Sem duas unidades, não há entradas ou builds independentes; páginas e componentes são módulos do mesmo `src` (`frontend/src/App.jsx:3–19`). |
| Q3 | No | O `App` roteia páginas locais num único `Router` (`frontend/src/App.jsx:56–89`), sem host ou shell montando unidades distintas. |
| Q4 | No | `frontend/vite.config.js:5–17` não configura composição. O Compose orquestra banco, backend e frontend (`docker-compose.yml:3–55`), não unidades de UI. |
| Q5 | No | Q1–Q4 são No: aplicação full-stack com SPA monolítica, captada pela frase “Frontend orchestration” sobre Docker Compose. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”. Não há preparo para host externo, então `MFE-unit` não se aplica.
- Mesmo padrão lexical de 130 e 066: “orchestration” descreve contêineres ou serviços, não composição de frontend. “Microservices” (`README.md:10`, `14`) se refere aos serviços simulados do backend.
- `repo_type: example`: o README se apresenta como plataforma “engineered to demonstrate” práticas de suporte de produção (`README.md:10`), com segredo JWT de exemplo no Compose (`docker-compose.yml:34`) e um único commit. Não há implantação operacional observada.
- `ui_technologies: [react]`, `build_tools: [vite]` (`frontend/vite.config.js:1–6`), `frontend_units: 1`, `single-unit`.
- Não há decisão aberta: nenhum iframe, link entre aplicações ou composição em build time.

## Notas para análise

- **RQ1 (sinais enganosos):** a consulta ampla `"frontend orchestration"` casou um comentário da árvore de diretórios do README (`README.md:138`) sobre Docker Compose. É o segundo caso seguido dessa consulta captando orquestração de contêineres (ver 130).
- **Protocolo (busca/elegibilidade):** o repositório não tem descrição, então o acerto só pode vir do README. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `example`, React/Vite, uma unidade e `single-unit`; sem decisão aberta. A frase "Frontend orchestration" (`README.md:138`) descreve Docker Compose, não composição de unidades. Precisões, sem efeito na classe: (1) o caminho local Windows no tutorial é apenas constatação, e não demonstra a procedência do código; (2) o log por pasta confirma a adição conjunta e não permite evolução granular, e a ausência de upstream declarado não comprova autoria original; (3) a origem do acerto em `README.md:138` é inferência por eliminação com frase literal, sem posição textual devolvida pela API; `example` se sustenta principalmente na apresentação demonstrativa, e não no segredo nem no número de commits.
