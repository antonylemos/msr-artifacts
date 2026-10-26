---
schema: 1
id: 986682535
full_name: mfe-brasil/single-spa-devtools
url: https://github.com/mfe-brasil/single-spa-devtools
commit: 315f830fc0adeb55e1a8caf32d0eb3bc8b6a08c7
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
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

# 204 — mfe-brasil/single-spa-devtools

## Contexto

“single-spa-devtools” (`README.md:1–8`): ferramentas de desenvolvimento para projetos single-spa, num monorepo Nx/Bun com dois pacotes.
- `packages/webpack-plugin`: plugin de Webpack para a `root-config` de terceiros. Injeta no primeiro asset `.js` um código que abre um WebSocket local, reporta eventos `single-spa:*` e intercepta `importMapOverrides`.
- `packages/vscode-extension`: extensão do VS Code que, no SHA, só registra o comando “Hello World” do gerador.

Não há aplicação frontend nem root-config no repositório. O nome do repositório e o da organização não são usados como evidência.

`data/samples/mfe-sample-001/clones.csv:205` registra rank 204, ID 986682535, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:205` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14146` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:14152` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos cinco hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2025-05` | 2026-10-07T18:32:57.228Z / 2026-10-08T15:38:02.120Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2025-05` | 2026-10-07T22:07:46.490Z / 2026-10-08T15:47:18.495Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-05` | 2026-10-07T22:21:59.654Z / 2026-10-08T15:54:21.435Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-05` | 2026-10-07T22:53:32.599Z / 2026-10-08T16:05:43.863Z |
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `…#created:2025-Q2` | 2026-10-07T23:33:38.669Z / 2026-10-08T16:20:59.766Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01` e `created:2025-05-01..2025-05-31` (terminologia) ou `created:2025-04-01..2025-06-30` (single-spa).

Metadados do hit:
- descrição “Tool ecosystem designed to enhance the development of single-spa and microfrontend-based applications”;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 88;
- criação em 2025-05-20T01:25:46Z, push em 2026-08-08T04:38:57Z.

Grafias no README:
- “single-spa”: `README.md:1`, `5`, `7`;
- “microfrontend”: `README.md:5` (“single-spa and microfrontend-based applications”), igual à descrição;
- “microfrontends”: `README.md:23` (“debugging of microfrontends”);
- “Micro Frontends”: `README.md:7` (“active MFEs (Micro Frontends)”).

O singular “micro frontend” não aparece literalmente no README nem na descrição; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O README foi alterado pela última vez em `bf9106d` (2025-05-20), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 33 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Raiz Nx/Bun (`package.json:38–40`, `nx.json`, `bun.lock`) com `packages/webpack-plugin` e `packages/vscode-extension`, mais `.github/` (CI, dependabot, CODEOWNERS) e `.vscode/`. Não há `index.html`, root-config, `registerApplication` nem import map. | contrária |
| Código-fonte (plugin) | `packages/webpack-plugin/src/index.ts:18–62`: `SingleSpaDevtoolsWebpackPlugin` concatena código ao primeiro asset `.js`. `packages/webpack-plugin/src/injectedCodeSource.ts:4–20`, `22–42`, `63–88`: WebSocket para `ws://127.0.0.1:9764` (`index.ts:5`), patch de `window.importMapOverrides` e escuta dos eventos `single-spa:*`. É ferramenta para projetos de terceiros; não compõe unidades. | contrária |
| Código-fonte (extensão) | `packages/vscode-extension/src/extension.ts:7–23` e `package.json:14–21`: só o comando `helloWorld` do scaffold. As funções descritas no README (`README.md:12–17`) não existem no SHA. | contrária |
| Documentação | `packages/webpack-plugin/README.md:14`: “The initial implementation of the plugin only logs a message to the console…”, e o roadmap `:49–52` deixa pendentes o monitoramento do import map e o WebSocket. O código do SHA já injeta o WebSocket, então o README está desatualizado em relação ao código. | contexto |
| Busca | `git grep -i` no SHA (exceto lockfile e Markdown) por `registerApplication`, `importmap` e `.html`: só `injectedCodeSource.ts` e `global.d.ts:3` (`importMapOverrides`). A busca por imports `../..` em `packages` não retorna nada. | ausente |

## Autoria e histórico

Clone não raso; 8 commits em todos os refs, nenhum merge. São 7 de Eliseu dos Santos da Silva `<s.eliseu@proton.me>`, de 2025-05-20 (`be9286b`, “Initial commit”) a 2025-05-24 (SHA `315f830`, “chore: update configuration files and scripts…”), e 1 de `dependabot[bot]` em `origin/dependabot/npm_and_yarn/npm_and_yarn-161e398bfc` (`54e8d56`, 2026-08-08, atualização do `nx`). Esse último corresponde ao `pushed_at` e não foi considerado. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; os pacotes são um plugin de Webpack e uma extensão do VS Code. |
| Q2 | No | Sem unidades frontend, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou root-config; o plugin é feito para a root-config de outros projetos (`packages/webpack-plugin/README.md:28–38`). |
| Q4 | No | Nenhum mecanismo de composição configurado entre unidades do repositório. O código instrumenta single-spa e `import-map-overrides` de terceiros (`injectedCodeSource.ts:13–42`, `63–88`). |
| Q5 | No | Q1–Q4 são No: ferramenta de desenvolvimento para ecossistemas single-spa. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”: é ferramenta de apoio ao desenvolvimento de micro-frontends, sem implementá-los.
- Mesmo enquadramento de 015 e do rascunho 165 (biblioteca/plugin): `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`. `ui_technologies: []` e `build_tools: []`, pois não há unidades frontend; Webpack aparece como alvo do plugin e como bundler da extensão, não de uma UI.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** descrição e README com “single-spa” e “microfrontend” em repositório de tooling. O README da raiz descreve funções que o código não tem (extensão “Hello World”).
- **Protocolo (busca):** o hit `"micro frontend"` singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002). O `pushed_at` de 2026-08-08 vem de um branch do Dependabot, não do branch padrão.
