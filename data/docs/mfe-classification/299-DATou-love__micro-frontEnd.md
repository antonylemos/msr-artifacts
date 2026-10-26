---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
url: https://github.com/DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [qiankun]
ui_technologies: [vue]
build_tools: [vite, webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 299 — DATou-love/micro-frontEnd

## Contexto

Exemplo mínimo de qiankun: um host Vue 3/Vite (`main-vue3/`) registra duas sub-aplicações; uma delas, Vue 2/Vue CLI (`sub-vue2/`), está no repositório e exporta os lifecycles do qiankun; a outra (`sub-react16`, `//localhost:3000`) é só referenciada pela configuração e não existe no snapshot. Os READMEs das pastas são os boilerplates dos geradores; não há README na raiz. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:300` registra rank 299, ID 1088828444, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:300` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:20640` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:20646` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2025-11` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T22:27:42.863Z / 2026-10-08T15:56:36.768Z |

Metadados do hit: descrição “微前端” (“micro-frontend” em chinês), sem tópicos, linguagem Vue, sem licença, `fork: false`, tamanho 129, criação em 2025-11-03T14:10:37Z, push em 2025-11-03T14:13:02Z.

Não há README na raiz do SHA, e os READMEs de `main-vue3/README.md:1–5` e `sub-vue2/README.md:1–24` não contêm “micro frontend”. A descrição não traz a grafia latina. O único campo pesquisado compatível é o nome do repositório (`micro-frontEnd`), o que é registrado apenas como explicação do acerto, não como evidência arquitetural; o processamento textual da busca não está registrado. Como os READMEs vêm do único commit (2025-11-03), não são posteriores às buscas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 36 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Dois projetos: `main-vue3/` (`package.json`, `vite.config.ts`, `index.html`, `src/`) e `sub-vue2/` (`package.json`, `vue.config.js`, `public/index.html`, `src/`); `.gitignore:1` exclui `node_modules/`. | forte |
| Configuração (host) | `main-vue3/package.json:11–15`: `qiankun` ^2.10.16 (resolvido para 2.10.16 em `main-vue3/package-lock.json:1263–1265`). `main-vue3/src/main.ts:10–23`: `registerMicroApps` com `sub-vue2` (`entry: '//localhost:8081'`, `container: '#subapp-viewport'`, `activeRule: '/sub-vue2'`) e `sub-react16` (`//localhost:3000`, `/sub-react16`); `:26–36`: `start({ sandbox: { strictStyleIsolation: true } })`. `main-vue3/vite.config.ts:8–11`: porta 7100. | forte |
| Código-fonte (host) | `main-vue3/src/App.vue:4–11`: links `/sub-vue2` e `/sub-react16` e o contêiner `<div id="subapp-viewport">`; `:26–32`: oculta o `router-view` próprio nas rotas das sub-apps. | forte |
| Configuração (sub-app) | `sub-vue2/vue.config.js:5–10`: `port: 8081` e CORS `*`, coincidindo com o `entry` do host; `:12–20`: saída `library: 'subVue2'`, `libraryTarget: 'umd'`, `chunkLoadingGlobal` próprio, como exige o qiankun. `sub-vue2/public/index.html:8`: `<base href="/sub-vue2/">`; `:16–17`: `#subapp-viewport` e `#app`. | forte |
| Código-fonte (sub-app) | `sub-vue2/src/main.js:19–29`: detecta `window.__POWERED_BY_QIANKUN__`, ajusta `__webpack_public_path__` e só monta sozinho fora do qiankun; `:32–46`: exporta `bootstrap`, `mount(props)` e `unmount`. `sub-vue2/src/router/index.js:10–13`: `mode: 'history'`, `base: '/sub-vue2'`, coerente com o `activeRule`. | forte |
| Código-fonte (montagem) | `sub-vue2/src/main.js:10–16`: `render` monta em `container.querySelector('#app')`. Com `strictStyleIsolation: true` (`main-vue3/src/main.ts:30`), o qiankun isola o conteúdo da sub-app em shadow DOM; se o `container` recebido for o hospedeiro da shadow root, essa consulta não encontra `#app` e a montagem não apareceria. O comportamento interno da biblioteca não está no snapshot e não foi executado. | ambígua |
| Composição (unidade externa) | `sub-react16` (`main-vue3/src/main.ts:17–22`) não tem código no repositório; busca por `react` e `3000` fora dos lockfiles só encontra essas linhas e `App.vue:7`, `29`. | contexto |
| Código-fonte (fronteiras) | Busca por especificadores `../` em `*.ts`, `*.js`, `*.vue` e `*.json` (exceto lockfiles): só `main-vue3/src/router/index.ts:4–5` e `sub-vue2/src/router/index.js:3–4`, internos a cada projeto. Nenhum import atravessa `main-vue3` ↔ `sub-vue2`; o host só alcança a sub-app pela URL de `entry`. | forte |
| Build/deploy | Builds separados: `main-vue3/package.json:6–10` (`vite`, `vue-tsc -b && vite build`) e `sub-vue2/package.json:5–9` (`vue-cli-service serve/build`); só configuração de desenvolvimento em `localhost`, sem pipeline nem deploy. | moderada |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 1 commit (1 em todos os refs), nenhum merge: o próprio SHA `8e52e7d` (2025-11-03T22:12:39+08:00, “主应用vue3，子应用vue2”, “app principal Vue 3, sub-app Vue 2”), autor e committer `zhou_hmeng <zhou_hmeng@cvicse.com>`, adicionando os 36 arquivos em bloco. Não há sequência de desenvolvimento; os metadados não separam autoria intelectual. `git rev-list --objects $SHA --missing=print` não identifica objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `main-vue3` e `sub-vue2` no repositório, mais `sub-react16` referenciada pela configuração de composição (`main-vue3/src/main.ts:10–23`). |
| Q2 | Yes | Entrada e build próprios (`main-vue3/index.html:11`, `vite.config.ts`; `sub-vue2/src/main.js`, `vue.config.js`), porta própria e nenhum import de código-fonte entre os projetos. |
| Q3 | Yes | O host registra e roteia as sub-apps por `activeRule` e as monta em `#subapp-viewport` (`main-vue3/src/main.ts:10–23`; `App.vue:4–11`). |
| Q4 | Yes | qiankun configurado nos dois lados: `entry` coincide com a porta da sub-app (`main.ts:13` × `vue.config.js:6`), saída UMD e lifecycles exportados (`vue.config.js:12–20`; `sub-vue2/src/main.js:32–46`), `base` coerente com `activeRule`. Ver ponto de revisão sobre a montagem sob `strictStyleIsolation`. |
| Q5 | Yes | Q1–Q4 convergem, sujeito ao ponto de revisão. |

## Motivo

- `MFE-implemented` (decisão registrada abaixo). Corresponde a “examples… that actually compose frontend units” e a “monorepos containing a host and its remotes” (aqui, host qiankun e uma sub-app no repositório, mais uma externa referenciada).
- A cadeia de configuração é completa para `sub-vue2`: registro, porta, contêiner, formato UMD, lifecycles e base de rota coincidem; não há divergência de nome ou endereço como em 097/103/104. É comparável aos casos de cadeia completa (076/084/096/106/109) e ao final 029 (qiankun).
- Não é code sharing (089/100): a sub-app é uma aplicação inteira com rotas próprias, montada pelo host.
- `frontend_units: 3` conta as duas unidades presentes e a `sub-react16` referenciada pela configuração (critério de Q1); só duas são observáveis. `approaches: [qiankun]`, `ui_technologies: [vue]`, `build_tools: [vite, webpack]` (Vite no host; Vue CLI/webpack na sub-app, `vue.config.js:12–20`), `repo_type: example`.

## Notas para análise

- **RQ2:** qiankun com host Vue 3 e sub-app Vue 2 (versões diferentes de framework), `strictStyleIsolation` ligado e uma terceira sub-app (`sub-react16`) declarada sem código.
- **RQ1:** a evidência está toda em `main.ts`/`vue.config.js`/`main.js`; READMEs são boilerplate e o acerto da busca não vem de nenhum artefato arquitetural do snapshot.
- **Protocolo (busca):** sem grafia correspondente em README ou descrição latina; a elegibilidade muda de `unknown` (001) para `pass` (002).

## Decisão registrada

- **Questão:** a configuração conecta host e sub-app, mas a montagem pode falhar em execução: com `strictStyleIsolation: true` (`main-vue3/src/main.ts:30`), a sub-app procura `#app` com `container.querySelector` (`sub-vue2/src/main.js:16`), o que não alcança conteúdo dentro de uma shadow root. Isso depende do comportamento interno do qiankun 2.10.16 e não é verificável no snapshot sem executar.
- **Alternativa escolhida:** defeito de execução não altera Q4; o mecanismo está configurado e liga as unidades (carregamento, lifecycles, rota), e existe uma estratégia real de composição. Mantém-se `MFE-implemented`.
- **Regra nova:** não se propõe.
