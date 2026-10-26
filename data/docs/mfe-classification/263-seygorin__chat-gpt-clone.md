---
schema: 1
id: 1053862045
full_name: seygorin/chat-gpt-clone
url: https://github.com/seygorin/chat-gpt-clone
commit: f4017d3949daa6e17535d2a83377dd1e9ae7d708
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 263 — seygorin/chat-gpt-clone

## Contexto

Clone do ChatGPT em Angular 20, com chat via Gemini, autenticação e persistência no Firebase (`README.md:1–3`, `:21–31`). É uma única aplicação Angular, organizada por features. Module Federation e micro-frontends só aparecem como item futuro numa lista de otimizações do README (`README.md:428`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:264` registra rank 263, ID 1053862045, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:264` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:18623` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:18629` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-09` | 2026-10-07T22:26:15.828Z / 2026-10-08T15:56:00.250Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-09` | 2026-10-07T22:57:04.160Z / 2026-10-08T16:06:48.173Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2025-09` | 2026-10-07T23:20:17.641Z / 2026-10-08T16:15:54.936Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-09-01..2025-09-30`.

Metadados do hit (iguais nas duas rodadas): descrição sobre o clone do ChatGPT em Angular 20, sem os termos buscados; tópicos `angular`, `firebase`, `rxjs`, `signals`, `typecript`; linguagem HTML; licença MIT; `fork: false`; tamanho 751; homepage na Netlify; criação em 2025-09-10T03:28:24Z; push em 2025-10-07T18:05:42Z.

O acerto vem do README. A única linha com os termos é `README.md:428`, “Module federation for micro-frontends (future)”:
- casa literalmente “module federation” e, com o hífen como separador, “micro frontends”;
- a forma singular “micro frontend” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `64bc0db` (2025-09-28T19:28:47+05:00). O SHA, merge do PR #1 (2025-10-07T23:05:34+05:00, isto é, 18:05:34Z), coincide com o `pushed_at`. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 106 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único projeto Angular: `package.json`, `angular.json` com um projeto `chat-gpt-clone` (`angular.json:12–13`), `src/` com `core`, `features` (auth, chat, main, settings, sidebar) e `shared`, mais testes, e2e e `netlify.toml`. | contrária |
| Configuração / Build | `angular.json:21–23`: builder `@angular/build:application` com entrada `src/main.ts`. `package.json:4–9`, `:31–45`: scripts `ng serve/build` e dependências Angular, Firebase e Gemini; nenhum pacote de federação. | contrária |
| Código-fonte | `src/main.ts:1–5`: `bootstrapApplication(AppComponent, appConfig)`. `src/app/app.routes.ts:6–53`: todas as rotas usam `loadComponent` com `import('./features/…')` ou `import('./shared/…')` do mesmo projeto (lazy loading interno). | contrária |
| Código-fonte (fronteiras) | Busca ativa de imports com `../../` ou mais em `src`: só travessias entre pastas da mesma aplicação, por exemplo `src/app/features/auth/components/login.component.ts:4–5` (para `shared/`) e `src/app/core/services/gemini.service.ts:7` (para `environments/`). Isso confirma uma única unidade com módulos internos, não unidades independentes. | contrária |
| Documentação | `README.md:428`: “Module federation for micro-frontends (future)”, item de roadmap numa lista de otimização de bundle. `README.md:21–31`: stack de uma única app Angular. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfile, README e `playwright-report`, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `registerApplication` e `loadRemote`: nenhuma ocorrência. | ausente |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 24 commits (24 em todos os refs), um deles merge (o SHA, PR #1 de `develop`). Todos são do mesmo titular, com três identidades:
- `Sergey <seygorin@gmail.com>` na maior parte do desenvolvimento;
- `Sergey Gorin <s.gorin@mediana.kz>` nos três primeiros commits de código (2025-09-10 e 2025-09-11);
- `Sergey Gorin <69956633+seygorin@users.noreply.github.com>`, com committer `GitHub`, no commit-raiz e no merge.

O desenvolvimento é incremental, de 2025-09-10 (“init: start blank project”) a 2025-09-28. `git rev-list --objects $SHA --missing=print` lista 155 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend: um projeto Angular com um entry e um build (`angular.json:12–23`; `src/main.ts:1–5`). Nenhuma configuração de composição (busca registrada). |
| Q2 | No | Não há duas unidades; as features são importadas pela mesma aplicação, inclusive por caminhos relativos entre pastas (`login.component.ts:4–5`). |
| Q3 | No | Não há host que carregue unidades; o roteamento faz lazy loading de componentes internos (`app.routes.ts:6–53`). |
| Q4 | No | Nenhum mecanismo de composição; Module Federation é intenção futura (`README.md:428`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Corresponde a “conventional frontend monoliths” e a “repositories mentioning micro-frontends without implementing them”: a menção é só um item de roadmap.
- `frontend_units: 1`, `single-unit`, `ui_technologies: [angular]`. `build_tools: []`: o builder do Angular CLI encapsula o bundler, e não há configuração explícita de bundler. `README.md:30` cita “Angular CLI with Vite”, mas não se registra uma ferramenta só pela documentação.
- `repo_type: example`: projeto de portfólio/estudo (“to do some stuff” no primeiro commit de código), publicado na Netlify.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** uma única linha de roadmap (“Module federation for micro-frontends (future)”, `README.md:428`) num README extenso (452 linhas) basta para três hits terminológicos e de tecnologia.
- **Protocolo (busca):** o hit singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
