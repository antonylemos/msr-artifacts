---
schema: 1
id: 1144802780
full_name: chethan2/geniAi_promo_services
url: https://github.com/chethan2/geniAi_promo_services
commit: 8e093776c0b89b5cd8c5b291fed29e47ce380efd
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 210 — chethan2/geniAi_promo_services

## Contexto

“GenAI Marketing Assistant” (`README.md:1–3`): aplicação full-stack gerada no Replit (React + Express + PostgreSQL/Drizzle, `README.md:45–51`; `.replit:1–43`). O snapshot contém só arquivos de configuração da raiz (`package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `drizzle.config.ts`, `.replit` e outros). As pastas `client/`, `server/`, `shared/` e `docs/` descritas no README (`README.md:88–106`) não existem.

O README chama a arquitetura de “micro-frontend” (`README.md:51`, `124`), mas descreve com isso níveis de design atômico (átomos, moléculas, organismos, layouts; `README.md:124–129`), não unidades frontend compostas. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:211` registra rank 210, ID 1144802780, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:211` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:24093` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:24100` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-01` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:30:19.747Z / 2026-10-08T15:57:32.444Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:59:35.430Z / 2026-10-08T16:07:45.338Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Metadados do hit:
- descrição “GenAI Marketing Assistant - AI-powered promotional content and code generation platform”, sem o termo;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 88;
- criação em 2026-01-29T04:10:53Z, push em 2026-01-29T05:17:59Z.

Grafias no README:
- “Micro-frontend”: `README.md:51` (“**Architecture**: Micro-frontend with atomic design patterns”);
- “micro-frontend”: `README.md:124` (“follows a **micro-frontend architecture** with **atomic design principles**”).

A busca de frase trata o hífen como separador. O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O README foi criado em `511fb34` e substituído no SHA `8e09377`, ambos em 2026-01-29, antes das coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 11 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks: `.gitignore`, `.replit`, `README.md`, `components.json`, `drizzle.config.ts`, `package-lock.json`, `package.json`, `postcss.config.js`, `tailwind.config.ts`, `tsconfig.json` e `vite.config.ts`. Não há código-fonte. | contrária |
| Configuração / Build | `vite.config.ts:6–40`: uma única aplicação com `root` em `client` (ausente), plugins React e Replit, sem federação. `package.json:6–12`: `dev` roda `tsx server/index.ts` (ausente) e `build` roda `tsx script/build.ts` (ausente). Não há dependência de composição de frontends (`package.json:13–107`). | contrária |
| Documentação | `README.md:122–129`: “micro-frontend architecture” explicada como atomic design (atoms, molecules, organisms, layouts), isto é, organização de componentes de uma única aplicação. | contrária |
| Busca | `git grep -i` no SHA por `micro.?front`, `federation` e `single.?spa`: só `README.md:51` e `124`. | ausente |

## Autoria e histórico

Clone não raso; 2 commits, nenhum merge, de chethan2 (noreply) pela interface web, ambos em 2026-01-29: `511fb34` (“Create README.md”) e o SHA `8e09377` (“Add files via upload”), que adiciona os 10 arquivos de configuração e substitui o README. O upload não incluiu as pastas de código. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no snapshot; só arquivos de configuração. A aplicação configurada seria uma só (`vite.config.ts:29`). |
| Q2 | No | Sem duas unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz compondo unidades. |
| Q4 | No | Nenhum mecanismo de composição configurado (`vite.config.ts:6–40`; `package.json:13–107`). |
| Q5 | No | Q1–Q4 são No: “micro-frontend” usado como rótulo para atomic design, num upload sem código. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Sem código no snapshot, como 196 (só documentação): `frontend_units: 0`, `unit_organization: none`. `ui_technologies: []` e `build_tools: []`, pois a aplicação React/Vite está só configurada, sem fonte observável. `repo_type: other`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “micro-frontend architecture” usado para descrever atomic design dentro de uma SPA única.
- **Protocolo (busca):** o hit plural `"micro frontends"` não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Protocolo (snapshot):** o repositório publicado contém só a configuração da raiz de um projeto Replit; o código não foi enviado.
