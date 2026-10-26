---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
url: https://github.com/lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react, vue]
build_tools: [rspack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 324 — lmedhub/zephyr-microfrontends

## Contexto

Demonstração de micro-frontends com Rspack, Module Federation, React e Zephyr Cloud (`frontend/README.md:1–9`), com um backend Go de encurtador de URLs (`backend/`). Há quatro aplicações em `frontend/apps/`:
- `host` (React, porta 3000);
- `remote-header` (React, 3001);
- `remote-footer` (React, 3002);
- `url-shortener` (Vue 3, 3003).

O host renderiza o cabeçalho e o rodapé remotos com `React.lazy` e monta o componente Vue remoto com `createApp`. Todas as configs são envolvidas por `withZephyr()` (`zephyr-webpack-plugin`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:325` registra rank 324, ID 990877766, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:325` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14397` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:14403` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos seis hits em cada rodada:

| Consulta (`q`) | Endpoint / subconsulta / `path` | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `repositories` / `…#created:2025-05` / vazio | 2026-10-07T18:35:16.819Z / 2026-10-08T15:38:07.285Z |
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `code` / `…#size:3000..3999` / `frontend/package.json` | 2026-10-07T20:33:07.125Z / 2026-10-08T15:43:53.217Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `repositories` / `…#created:2025-05` / vazio | 2026-10-07T22:07:46.490Z / 2026-10-08T15:47:18.495Z |
| `technology-module-federation-plugin-ts-code`: `ModuleFederationPlugin remotes extension:ts` | `code` / `…#size:2000..2249` / `frontend/apps/remote-footer/rspack.config.ts` e `frontend/apps/remote-header/rspack.config.ts` | 2026-10-07T22:39:43.946Z / 2026-10-08T16:18:55.602Z |
| idem | `code` / `…#size:2500..2749` / `frontend/apps/host/rspack.config.ts` | 2026-10-07T22:39:55.652Z / 2026-10-08T16:19:06.277Z |

As consultas efetivas de repositório acrescentam `pushed:>=2025-04-01 created:2025-05-01..2025-05-31`.

Metadados do hit de repositório:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 436;
- criação em 2025-05-26T19:27:45Z, push em 2025-06-04T14:27:41Z.

Os arquivos dos hits de código contêm o termo buscado: `frontend/package.json:59` (`"@module-federation/enhanced"`) e `ModuleFederationPlugin` com `remotes` nos três `rspack.config.ts` (por exemplo, `frontend/apps/host/rspack.config.ts:82–88`).

O SHA não tem README na raiz (`git ls-tree`: só `.gitignore`, `backend` e `frontend`). O `README.md` da raiz foi movido, com o mesmo blob, para `frontend/README.md` em `8b5da15` (2025-06-02), anterior às coletas de outubro de 2026. `frontend/README.md:1` tem “Microfrontends” e `:7` tem “microfrontends”. Sem README na raiz no SHA, a origem dos hits de repositório (nome ou README indexado anteriormente) não pode ser determinada; o processamento da busca não está registrado.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 60 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há quatro apps em `frontend/apps/`, cada uma com `package.json`, lockfile, `rspack.config.ts`, `index.html` e `src/`. Também há `frontend/package.json`, `frontend/README.md` e o backend Go (`backend/`, com `url_shortener.db` versionado). | contexto |
| Host | `frontend/apps/host/rspack.config.ts:7`, `82–94`: `withZephyr()` e `ModuleFederationPlugin({ name: "host", remotes: { remote_header: "…3001/remoteEntry.js", remote_footer: "…3002…", url_shortener: "…3003…" }, shared: { react, "react-dom", vue } })`. | forte |
| Remotos | `frontend/apps/remote-header/rspack.config.ts:73–84`: `exposes: { "./Header" }`. `frontend/apps/remote-footer/rspack.config.ts:73–84`: `exposes: { "./Footer" }`. `frontend/apps/url-shortener/rspack.config.ts:74–87`: `exposes: { "./Shortener": "./src/Shortener.vue" }`, com Vue compartilhado. | forte |
| Consumo | `frontend/apps/host/src/App.tsx:6–7`, `12–22`: `React.lazy` de `remote_header/Header` e `remote_footer/Footer` em `Suspense`. `frontend/apps/host/src/utils/VueShortener.tsx:10–16`: `import("url_shortener/Shortener")` montado com `createApp(...).mount(containerRef.current)`. `src/types/federated-modules.d.ts:1–17` tipa os três módulos. | forte |
| Código-fonte (fronteiras) | Busca por imports com `../` em `frontend/`: nenhum. Cada app só importa arquivos locais e pacotes. | contexto |
| Zephyr | Todas as configs usam `withZephyr()`. `frontend/apps/host/package.json:4–7`: `"zephyr:dependencies"` com `remote-header` e `remote-footer`. A implantação pelo Zephyr Cloud não é verificável no snapshot; a composição local por URL `localhost` é. | contexto |

## Autoria e histórico

Clone não raso; 16 commits em todos os refs e no histórico do SHA, 5 deles merges de PR feitos na interface do GitHub, todos de `lmedhub`, de 2025-05-26 (`35e664c`, “Initial commit”) a 2025-06-04 (SHA `c6e6a9f`, “Merge pull request #5 …”). Há outros quatro branches remotos (`config/*`, `feat/zephyr-mf-integration`, `misc/basic-zephyr-app`), não considerados. Ao listar `--name-status` de `8b5da15` com detecção de renomeação, um objeto (`1954fa5`) não estava disponível e não foi buscado; a comparação de árvores sem renomeação mostrou o movimento do README.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Host e três remotos no repositório, referenciados em `remotes` (`frontend/apps/host/rspack.config.ts:84–88`). |
| Q2 | Yes | Cada app tem `package.json`, lockfile, `rspack.config.ts`, entry e porta próprios, sem import de código entre apps. |
| Q3 | Yes | O host monta header, footer e o componente Vue remoto (`App.tsx:12–22`; `VueShortener.tsx:10–16`). |
| Q4 | Yes | Module Federation do Rspack com `remotes`/`exposes` coerentes e uso efetivo dos três módulos remotos. |
| Q5 | Yes | Q1–Q4 são Yes: host e remotos, React e Vue, compostos em runtime, com cadeia completa no snapshot. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso “monorepos containing a host and its remotes”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- **Campos:**
  - `approaches: [module-federation]`, `ui_technologies: [react, vue]`, `build_tools: [rspack]`;
  - `frontend_units: 4`, `unit_organization: monorepo`;
  - `repo_type: example` (demonstração declarada em `frontend/README.md:3`).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** composição híbrida React + Vue: o host React monta um componente Vue remoto com `createApp`, com Vue compartilhado como singleton. A implantação é integrada ao Zephyr Cloud (`withZephyr`, `zephyr:dependencies`).
- **Protocolo (busca):** o README está fora da raiz no SHA; o README da raiz existia até `8b5da15`. Entrada também por três consultas de código. A elegibilidade muda de `unknown` (001) para `pass` (002).
