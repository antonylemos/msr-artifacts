---
schema: 1
id: 973277755
full_name: Hariharan-s-99/microFrontend
url: https://github.com/Hariharan-s-99/microFrontend
commit: 902273771afdb4f52006aeed0bcb3cd0e6c33cee
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 319 — Hariharan-s-99/microFrontend

## Contexto

Estudo de Module Federation com Rspack e roteamento aninhado. São três aplicações React:
- `container` (porta 8080), host com `BrowserRouter`;
- `home` (porta 8081), remoto;
- `settings` (porta 8082), remoto.

Os remotos expõem uma função `mount(element)`, que renderiza cada um com `MemoryRouter` próprio, e o host as chama a partir de rotas e abas. Há também `advancedWebpack/`, um app React + webpack independente, de experimentos de configuração, sem federação nem ligação com os demais. Não há README. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:320` registra rank 319, ID 973277755, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:320` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:13445` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:13450` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-04` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:27:20.838Z / 2026-10-08T15:37:30.638Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:07:28.833Z / 2026-10-08T15:47:09.613Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:20:43.840Z / 2026-10-08T15:53:53.171Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-04-01..2025-04-30`.

Metadados do hit:
- descrição “microFrontend using nested routing”, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 207;
- criação em 2025-04-26T16:41:11Z, push em 2025-05-11T18:02:29Z.

Não há README no SHA, nem em nenhum commit do histórico. A grafia “microFrontend” está na descrição do repositório. O plural e a frase “micro frontend” não aparecem literalmente em nenhum campo buscado; esses hits dependem do processamento textual da busca do GitHub, que não está registrado.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 51 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há quatro pastas na raiz (`advancedWebpack`, `container`, `home`, `settings`), cada uma com `package.json`, lockfile, config de build e `src/` próprios; não há `package.json` na raiz. | contexto |
| Host | `container/module-federation.config.ts:1–8`: `remotes: { settings: "settings@http://localhost:8082/remoteEntry.js", home: "home@http://localhost:8081/remoteEntry.js" }`. `container/rspack.config.ts:5`, `94`: `ModuleFederationPlugin` de `@module-federation/enhanced/rspack`; porta 8080 (`:25`). `container/src/index.ts:1`: `import("./App")`, a fronteira assíncrona. | forte |
| Remotos | `home/module-federation.config.ts:1–8` e `settings/module-federation.config.ts:1–8`: `filename: "remoteEntry.js"`, `exposes: { "./app": "./src/bootstrap.tsx" }`. `home/src/bootstrap.tsx:6–12` e `settings/src/bootstrap.tsx:6–12`: `mount(element)` com `ReactDOM.render(<App/>)`. Portas 8081 e 8082 (`*/rspack.config.ts:24–25`). | forte |
| Consumo | `container/src/Home.tsx:1`, `7–9` e `container/src/Settings.tsx:1`, `6–8`: `import { mount } from "home/app"` / `"settings/app"` e `mount(elementRef.current, {})` num `div`. `container/src/App.tsx:17–20`, `62–63`: rotas `/mf1` e `/mf2` e abas que montam cada remoto. `container/global.d.ts:1–9`: tipos dos módulos remotos. | forte |
| App não relacionado | `advancedWebpack/webpack.config.js` e `advancedWebpack/src/*`: app React + webpack (`package.json` com `"name": "webpack"`) sem federação; `git grep` por `federation` e `remoteEntry` nessa pasta não encontra nada. | contexto |
| Código-fonte (fronteiras) | Busca por imports com `../` nas quatro pastas: nenhum. O host conhece os remotos só por `home/app` e `settings/app`, via federação. | contexto |

## Autoria e histórico

Clone não raso; 22 commits lineares, nenhum merge, todos do autor `hari`, de 2025-04-26 a 2025-05-11 (SHA `9022737`, “added basename for router @settings module federation remote”). As mensagens registram experimentos de roteamento com federação: “module federation routing”, “remote federation memory router”, “shared module config”. Só há o branch `master`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Host `container` e remotos `home` e `settings`, referenciados em `remotes` (`container/module-federation.config.ts:3–6`). |
| Q2 | Yes | Cada pasta tem `package.json`, lockfile, `rspack.config.ts`, entry e porta próprios, sem import de código entre pastas. |
| Q3 | Yes | O host monta os remotos por rota e aba (`container/src/App.tsx:17–20`, `62–63`; `Home.tsx:7–9`; `Settings.tsx:6–8`). |
| Q4 | Yes | Module Federation (Rspack + `@module-federation/enhanced`) com `remotes`/`exposes` coerentes e uso efetivo de `mount`. |
| Q5 | Yes | Q1–Q4 são Yes: host e dois remotos compostos em runtime, com cadeia completa no snapshot. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso “monorepos containing a host and its remotes”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- **Campos:**
  - `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [rspack]` (como em 029 e 228);
  - `frontend_units: 3` (container, home e settings; `advancedWebpack` não participa da composição e não é contado);
  - `unit_organization: monorepo`, `repo_type: example` (estudo de roteamento).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** contrato `mount(element)` exposto pelos remotos, com `MemoryRouter` interno a cada remoto e `BrowserRouter` só no host. Os commits documentam a evolução desse arranjo.
- **RQ3:** `shared: []` nos três configs, sem compartilhamento declarado de React. `home/src/bootstrap.tsx:7` passa `history` sem declaração local, o que resolve para o global `window.history`.
- **Protocolo (busca):** sem README; o hit vem da descrição (“microFrontend”) e, nos demais, do processamento textual sem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
