---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
url: https://github.com/Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react, vue]
build_tools: [webpack]
frontend_units: 7
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 177 — Varshithknaik/mfe-lect

## Contexto

“MFE learning project” (`README.md:1–5`): projeto de aprendizado de Module Federation com webpack 5, com shell React (`container`), remotos React `marketing` e `auth` e um dashboard Vue “legado”. O snapshot tem duas árvores paralelas:
- na raiz, `container/`, `marketing/` e `auth/`, desenvolvidos incrementalmente pelo autor, com workflows de deploy; `dashboard/` tem só `package.json`;
- `packages/`, uma cópia completa com `container`, `marketing`, `auth` e `dashboard`, adicionada num único commit e nunca alterada.

O README remete a `docs/README.md` (`README.md:7`), que não existe no snapshot. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:178` registra rank 177, ID 1063353073, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:178` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:19183` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:19189` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-09` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-09-01..2025-09-30` | 2026-10-07T23:20:08.640Z / 2026-10-08T16:15:51.112Z |

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 185;
- criação em 2025-09-24T14:04:39Z, push em 2026-07-26T16:44:32Z.

O acerto vem de `README.md:3`, “…a webpack Module Federation learning project…”, única ocorrência. O README foi reescrito no próprio SHA, `deea335` (2026-07-26), que só altera `README.md` e `.gitignore` (`git diff-tree`). É anterior às coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 89 entradas, todas arquivos regulares `100644` (inclui `.DS_Store` e `.vscode/settings.json`); zero symlinks e zero gitlinks. Na raiz há `container/`, `marketing/` e `auth/`, cada um com `package.json`, `config/webpack.{common,dev,prod}.js` e `src/`; `dashboard/` tem só `package.json`; há três workflows em `.github/workflows/`. Em `packages/` há quatro pacotes completos. Não há workspace na raiz. | contexto |
| Configuração (host, raiz) | `container/config/webpack.dev.js:17–25`: `remotes` `marketing` (`localhost:8081`) e `auth` (`localhost:8082`). `container/config/webpack.prod.js:15–23`: as mesmas em `${domain}/<pacote>/latest/remoteEntry.js`, com `dashboard` comentado (`:20`). | forte |
| Configuração (remotos, raiz) | `marketing/config/webpack.dev.js:17–25`: `exposes: { './MarketingApp': './src/bootstrap' }`. `auth/config/webpack.dev.js:17–25`: `exposes: { './AuthApp': './src/bootstrap' }`. | forte |
| Código-fonte (composição, raiz) | `container/src/App.js:14–15`, `34–46`: `lazy` dos wrappers e rotas `/auth/*` e `/*`; `dashboard` comentado (`:16`, `40–43`). `container/src/components/MarketingApp.js:1`, `12–27` e `AuthApp.js:1`, `11–27`: `import { mount }` dos remotos e sincronização de navegação. `marketing/src/bootstrap.js:7–19`: `mount` com memory history e `createRoot`. | forte |
| Build/deploy | `.github/workflows/container.yml:7–12`, `25–30`, `auth.yml:7–12`, `23–28` e `marketing.yml:7–12`, `23–28`: um workflow por pacote da raiz, com filtro de `paths`, `aws s3 sync` para `/<pacote>/latest` e invalidação do CloudFront. | forte |
| Cópia `packages/` | `packages/container/config/webpack.dev.js:17–25`: `remotes` `marketing`, `auth` e `dashboard`. `packages/container/src/App.js:8–10`, `29–37`: três `lazy`, inclusive Dashboard. Os blobs diferem dos da raiz (por exemplo, `container/config/webpack.dev.js` versus `packages/container/config/webpack.dev.js`), exceto `auth/src/bootstrap.js`, que é idêntico. A árvore entrou em `9584f06` (2025-10-05) e não foi mais alterada. Nenhum workflow a referencia. | contexto |
| Código-fonte (fronteiras) | A busca por imports `../../` no SHA não retorna nada. As duas árvores não se importam mutuamente; os imports entre pacotes são só os federados. | contexto |

## Autoria e histórico

Clone não raso; 40 commits, 1 merge (`2710964`), todos de `Varshith K <varshithknaik@gmail.com>`.
- **Datas:** de 2025-09-24 (`256e049`, “first commit”) a 2025-11-06 (`b3e0b20`), mais o SHA `deea335` (2026-07-26).
- **Evolução na raiz:** pelo `git log`, há 23 commits em `container/`, 13 em `marketing/` e 8 em `auth/`. Neles entram navegação, `initialPath`, workflows e `onSignIn`, com mensagens no padrão de commits convencionais.
- **Cópia `packages/`:** tem um único commit, `9584f06`, junto com o `dashboard/` da raiz.
- **SHA:** a mensagem é “Please provide the changes or files you would like summarized so I can generate the commit message for you.”, compatível com gerador automático de mensagens.

Nenhum blob histórico foi lido. O `git show --stat` do SHA não completou por blob ausente no clone parcial (`195ea731…`), que não foi buscado; o clone ficou inalterado.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Na árvore da raiz, o `container` e os remotos `marketing` e `auth` são referenciados pela configuração de composição (`container/config/webpack.dev.js:20–23`). |
| Q2 | Yes | Cada pacote tem entrada, build e deploy próprios (`config/webpack.*.js`; workflows por pacote com `paths`), sem imports de código-fonte entre eles. |
| Q3 | Yes | O container monta os remotos por rota (`container/src/App.js:34–46`). |
| Q4 | Yes | Module Federation configurado no host e nos remotos, consumido por `import { mount }` e chamado nos wrappers (`MarketingApp.js:13`; `AuthApp.js:12`). |
| Q5 | Yes | Q1–Q4 são Yes: shell com dois remotos e deploy independente. A cópia `packages/` repete o padrão com quatro pacotes. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”.
- A cadeia está completa no snapshot, como em 076/084/096/106/109. Os remotos expõem aplicações montadas por rota, não componentes compartilhados (089/100). Como em 174, a estrutura segue um roteiro de curso (container/marketing/auth/dashboard com `mount` e deploy S3/CloudFront), mas a composição está implementada. Não se reduz a conteúdo ou exercício sem composição (023/094).
- `frontend_units: 7` conta as sete unidades buildáveis: três na árvore da raiz (container, marketing e auth) e quatro em `packages/` (container, marketing, auth e o dashboard Vue, que participam de uma composição configurada e consumida, `packages/container/config/webpack.dev.js:17–25`; `packages/container/src/App.js:8–10`, `29–37`). O `dashboard/` da raiz só tem manifesto, sem entrada nem fonte, e não conta. Segue a convenção de agregação do final 007 (cinco unidades ao avaliar dois exemplos independentes no mesmo repositório). A versão inicial do rascunho contava 3, tratando `packages/` como cópia paralela fora dos workflows; adotou-se a contagem do revisor. `ui_technologies: [react, vue]`, `build_tools: [webpack]`, `unit_organization: monorepo`, `repo_type: example`.
- Não há decisão aberta sobre a classe.

## Notas para análise

- **RQ2:** integração por `mount(el, { onNavigate, initialPath, onSignIn })` com React Router 6 no shell e memory history nos remotos.
- **RQ3:** duas versões da mesma arquitetura no mesmo snapshot: a do autor, em evolução e com CI, e uma cópia de referência estática em `packages/`. O README atual aponta para documentação (`docs/README.md`) ausente.
- **Protocolo (busca):** entrada só pela consulta `"module federation"`. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented e Q1–Q5 Yes; sem decisão aberta (`draft`). Divergência de campos adotada: `frontend_units: 7` e `ui_technologies: [react, vue]`, pela convenção de agregação do final 007 e porque os quatro pacotes de `packages/` formam uma composição configurada e consumida (o final 006 só exclui a quinta aplicação por não participar da composição); a duplicação de nomes e implementações é contexto e não torna a segunda árvore código morto. Registros: `git show --stat` falha por blob ausente do clone parcial (`195ea73…`), o que afeta só a estatística histórica; `README.md:7` aponta para `docs/README.md`, ausente no SHA.
