---
schema: 1
id: 1210733898
full_name: maithoa/microfe-host-app
url: https://github.com/maithoa/microfe-host-app
commit: 996ff4545e180a5c5464b2c578bba05e48929745
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 226 — maithoa/microfe-host-app

## Contexto

Aplicação React 19 + Vite 8 gerada pelo template oficial (o README é o padrão “React + TypeScript + Vite”, `README.md:1–75`). A configuração de host Module Federation com `@originjs/vite-plugin-federation` (`vite.config.ts:10–16`) consome um remoto externo, `remote_app`, em `http://localhost:5174/assets/remoteEntry.js`. O host carrega dois componentes desse remoto, `Header` e `Button` (`src/components/RemoteComponentWrapper.tsx:5–6`), na página inicial do template (`src/App.tsx:22–28`). O remoto não está no repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:227` registra rank 226, ID 1210733898, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:227` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:28441` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:28447` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna o mesmo hit em cada rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta / consulta efetiva | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | `technology-vite-federation-package-code#size:900..999` / `"@originjs/vite-plugin-federation" filename:package.json size:900..999` | `package.json` | 2026-10-07T22:05:11.216Z / 2026-10-08T15:48:17.420Z |

O `package.json` tem 959 bytes no SHA, dentro da faixa, e declara `"@originjs/vite-plugin-federation": "^1.4.1"` (`:20`). Os metadados do hit de código trazem só a descrição “Micro FE Host App”, sem tópicos nem datas. A entrada é só por código; o README é o do template e não contém os termos buscados.

Nas duas rodadas, a mesma conta tem outro candidato, `maithoa/microfe-remote-app` (ID 1210735523; `data/discovery/mfe-round-002/candidates.csv`), fora da amostra (`sample.csv:227` é o único da conta) e não inspecionado.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 21 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único projeto Vite (`index.html`, `src/`, `public/`, `vite.config.ts`, tsconfigs, ESLint). | contexto |
| Configuração (host) | `vite.config.ts:10–16`: `federation({ name: 'host-app', remotes: { remote_app: 'http://localhost:5174/assets/remoteEntry.js' }, shared: ['react', 'react-dom'] })`; `build` com `target: "esnext"` e `modulePreload: false` (`:18–23`). | forte |
| Código-fonte (consumo) | `src/components/RemoteComponentWrapper.tsx:5–6`: `React.lazy(() => import('remote_app/Header'))` e `import('remote_app/Button')`. `:15–33`: renderiza ambos sob `Suspense`, passando `text` e `onClick` ao botão. `src/types/remote-app.d.ts:2–13` declara os módulos. `src/App.tsx:8`, `28`: montado na página. | forte |
| Natureza do que é consumido | `Header` (sem props) e `Button` (`text`, `onClick`) são componentes genéricos de interface, não fatias funcionais de aplicação. O restante da página é o conteúdo do template Vite (`src/App.tsx:15–122`). | ambígua |
| Unidade externa | O remoto não está no snapshot; está em URL fixa `localhost:5174`, sem documentação. | ambígua |
| Código-fonte (fronteiras) | Imports relativos só dentro de `src/`; não há código do remoto. | contexto |

## Autoria e histórico

Clone não raso; 1 commit, `996ff45` (2026-04-14, “First repo init & commit”), de maithoa (noreply). Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | O snapshot demonstra um host e componentes remotos genéricos, não uma segunda unidade frontend funcional. |
| Q2 | No | A separação de build do remoto serve ao compartilhamento de componentes, não a unidades de frontend compostas. |
| Q3 | No | A página do host apenas renderiza `Header` e `Button`, sem integrar uma fatia funcional externa. |
| Q4 | No | Module Federation é usado como mecanismo de distribuição de componentes de UI, não de composição de aplicações. |
| Q5 | No | Q1–Q4 caracterizam code sharing, não microfrontends. |

## Motivo

- Classificado como `Non-MFE`: Module Federation distribui apenas componentes de UI genéricos (`Header`, `Button`) para uma página de template, o que caracteriza code sharing.
- **Campos:** `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 1`, `unit_organization: multi-repo`, `repo_type: example` (template Vite com demonstração de federação).

## Notas para análise

- **RQ2:** host `@originjs/vite-plugin-federation` em Vite 8 com remoto em `localhost`, padrão de tutorial host/remote.
- **Protocolo (amostra):** a mesma conta tem outro candidato nas rodadas, fora da amostra e não inspecionado; o snapshot não indica onde está o remoto além de `localhost:5174`.
- **Protocolo (busca):** entrada só por busca de código; a elegibilidade muda de `unknown` (001) para `pass` (002).

## Decisão registrada

Classificado como `Non-MFE`. O host consome apenas um cabeçalho e um botão genéricos de um remoto externo, numa página padrão do Vite. Isso é compartilhamento de componentes de UI, não composição de unidades frontend.
