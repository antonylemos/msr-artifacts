---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
url: https://github.com/Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Contexto

Ecossistema de micro-frontends com Vue 3, Vite e `@originjs/vite-plugin-federation`, num monorepo pnpm + Turborepo (`README.mkd:1–9`; `package.json:6–10`; `pnpm-workspace.yaml:1–3`). Tem quatro aplicações em `apps/`:
- `shell` (porta 5000), host;
- `dashboard` (5001), `cms` (5002) e `kanban` (5003), remotos.

Há também a biblioteca `packages/ui-kit`. O shell declara os três remotos, mas só importa e renderiza o componente `dashboard/Widget`. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:323` registra rank 322, ID 1106098608, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:323` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:21602` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:21608` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-11` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:17:20.528Z / 2026-10-08T15:39:57.387Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:09:37.231Z / 2026-10-08T15:48:23.201Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:21:09.536Z / 2026-10-08T16:16:19.379Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 40;
- criação em 2025-11-28T16:18:12Z, push em 2025-11-29T13:08:35Z.

O README do repositório é `README.mkd`. Grafias:
- “Microfrontend”: `README.mkd:1` (“# 🚀 Vue 3 Microfrontend Ecosystem”) e `README.mkd:3`;
- “microfrontends”: `README.mkd:9`, `121`, `146`;
- “Module Federation”: `README.mkd:3`, `69`, `106` e `151`.

A última alteração do README é `94399d2` (2025-11-28), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 65 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há quatro apps Vue em `apps/` (`shell`, `dashboard`, `cms`, `kanban`), cada uma com `package.json`, `vite.config.ts`, `index.html` e `src/`. Há ainda `packages/ui-kit` e, na raiz, `package.json`, `pnpm-workspace.yaml`, `turbo.json` e `README.mkd`. | contexto |
| Host | `apps/shell/vite.config.ts:19–27`: `federation({ name: "shell", remotes: { dashboard: "http://localhost:5001/assets/remoteEntry.js", cms: "…5002…", kanban: "…5003…" }, shared: ["vue"] })`. | forte |
| Remotos | `apps/dashboard/vite.config.ts:18–25`: `name: "dashboard_app"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/components/WidgetDinero.vue" }`, porta 5001. `apps/cms/vite.config.ts:16–23` (`./Cms`, 5002) e `apps/kanban/vite.config.ts:16–23` (`./Kanban`, 5003) expõem o `App.vue` de cada app. | forte |
| Consumo | `apps/shell/src/App.vue:5–7`: `defineAsyncComponent(() => import('dashboard/Widget'))`, renderizado em `Suspense` (`:21–28`). `apps/shell/src/vite-env.d.ts:3–7` declara o tipo do módulo. `cms` e `kanban` estão em `remotes`, mas não são importados por nenhum arquivo do shell. | forte |
| Código-fonte (fronteiras) | Busca por imports com `../` em `apps/` e `packages/`: nenhum. O único import entre pastas é `apps/shell/src/App.vue:3` (`@repo/ui-kit/src/index.ts`), dependência de workspace (`apps/shell/package.json:12`), não outra app. | contexto |
| Execução | `package.json:10`: `dev:hybrid` sobe o shell em dev e os três remotos com `serve:prod` (build + preview), como recomenda o plugin. | contexto |

## Autoria e histórico

Clone não raso; 11 commits lineares, nenhum merge, de 2025-11-28 (`e3cc334`, “first commit”, autor “Steven”) a 2025-11-29 (SHA `8501b8b`). Os demais são de “Steven J. Silva Gomez”, um deles (`80a16ce`, “Delete .turbo directory”) feito na interface do GitHub. Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Shell e três remotos no repositório, referenciados em `remotes` (`apps/shell/vite.config.ts:21–25`). |
| Q2 | Yes | Cada app tem `package.json`, `vite.config.ts`, entry e porta próprios, sem import de código entre apps; o código comum vem de `@repo/ui-kit`. |
| Q3 | Yes | O shell monta o widget remoto do `dashboard` (`App.vue:5–7`, `21–28`). |
| Q4 | Yes | `@originjs/vite-plugin-federation` com `remotes` no shell e `exposes` nos remotos, efetivamente usados no import `dashboard/Widget`. |
| Q5 | Yes | Q1–Q4 são Yes: host e remoto compostos em runtime, com cadeia completa no snapshot para o `dashboard`. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso “monorepos containing a host and its remotes”. A cadeia shell → dashboard está completa no snapshot, como em 076/084/096/106/109.
- **Unidades:** `frontend_units: 4` conta as quatro apps referenciadas pela configuração de composição (critério de Q1). Só `dashboard` é consumido; `cms` e `kanban` estão declarados, mas sem import. Diferentemente de 128 e 305, aqui os remotos não estão comentados.
- **Campos:** `approaches: [module-federation]`, `ui_technologies: [vue]`, `build_tools: [vite]`, `unit_organization: monorepo`, `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** federação com `@originjs/vite-plugin-federation` em Vue 3. Os remotos devem ser servidos por build/preview (`dev:hybrid`), e o shell consome um componente isolado (`Widget`), não uma aplicação inteira.
- **RQ3:** o `name` do remoto (`dashboard_app`) difere da chave usada no host (`dashboard`). O plugin resolve pela URL; a compatibilidade não foi verificada por execução.
- **Protocolo (busca):** todas as grafias estão literalmente no `README.mkd`. A elegibilidade muda de `unknown` (001) para `pass` (002).
