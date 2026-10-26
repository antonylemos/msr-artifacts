---
schema: 1
id: 997062622
full_name: charger17/mfe
url: https://github.com/charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react, vue]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 197 — charger17/mfe

## Contexto

Monorepo webpack 5 com Module Federation e quatro pacotes em `packages/`:
- `container` (React), que consome os três remotos;
- `marketing` e `auth` (React), que expõem `mount`;
- `dashboard` (Vue 3), também com `mount`.

Cada pacote tem workflow de deploy em S3/CloudFront. Não há README; `readme.txt` tem 2 bytes (uma linha vazia). A estrutura é a mesma dos rascunhos 174 e 177; a hipótese de que seguem um roteiro de curso comum não é verificada. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:198` registra rank 197, ID 997062622, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:198` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14785` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:14791` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `…#size:800..899` | `packages/container/config/webpack.prod.js` | 2026-10-07T22:24:34.518Z / 2026-10-08T16:06:49.049Z |
| idem | idem | `packages/container/config/webpack.dev.js` | 2026-10-07T22:24:45.226Z / 2026-10-08T16:06:54.346Z |

Os arquivos casados têm 855 e 864 bytes no SHA, dentro da faixa, e contêm `ModuleFederationPlugin` com `remotes` (`packages/container/config/webpack.prod.js:2`, `15–23`; `webpack.dev.js:2`, `18–26`). Os metadados do hit de código não trazem descrição, tópicos nem datas. Não há README com grafias a citar; a entrada é só por código.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 47 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há quatro pacotes (`container`, `marketing`, `auth`, `dashboard`), cada um com `package.json`, `config/webpack.{common,dev,prod}.js`, `public/index.html` e `src/` com `index.js` → `bootstrap.js`. Há também quatro workflows e `readme.txt` vazio. Não há workspace na raiz. | contexto |
| Configuração (host) | `packages/container/config/webpack.dev.js:18–26`: `remotes` `marketing`, `auth` e `dashboard` em `localhost:8081/8082/8083`. `packages/container/config/webpack.prod.js:15–23`: os mesmos em `${domain}/<pacote>/latest/remoteEntry.js`. | forte |
| Configuração (remotos) | `packages/marketing/config/webpack.dev.js:19–26`: `exposes: { './MarketingApp': './src/bootstrap' }`. `packages/auth/config/webpack.dev.js:19–26`: `./AuthApp`. `packages/dashboard/config/webpack.dev.js:22–29`: `./DashboardApp`. Os `webpack.prod.js` têm os mesmos `exposes`, com `publicPath` `/<pacote>/latest/`. | forte |
| Código-fonte (composição) | `packages/container/src/App.js:11–13`, `41–56`: `lazy` dos wrappers e rotas `/auth`, `/dashboard` (com redirecionamento se não autenticado) e `/`. `src/components/MarketingApp.js:1`, `10–20`, `AuthApp.js:1`, `10–24` e `DashboardApp.js:1`, `8`: `import { mount }` dos remotos e chamada com sincronização de histórico e `onSignIn`. `packages/dashboard/src/bootstrap.js:4–17`: `mount` cria um app Vue 3. | forte |
| Código-fonte (fronteiras) | A busca por imports `../../` no SHA não retorna nada; os pacotes só se ligam pelos módulos federados. | contexto |
| Build/deploy | `.github/workflows/container.yml:1–54`: build com `PRODUCTION_DOMAIN`, `aws s3 sync dist …/container/latest` e invalidação do CloudFront, disparado por `packages/container/**`. Há workflows análogos para `auth`, `dashboard` e `marketing`, com `paths` e destinos próprios. | forte |

## Autoria e histórico

Clone não raso; 44 commits, nenhum merge. São 42 de Carlos Perez (noreply) e 2 de “Carlos” `<cps172779@gmail.com>`, de 2025-06-05 (`c353631`, “Create readme.txt”) a 2025-06-16 (SHA `c04d19e`, “Add files via upload”). Os arquivos foram enviados pela interface web em vários commits de upload e edição, sem que o histórico mostre o desenvolvimento local. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects --all` termina com erro de blob histórico ausente (`e5ad16d…`), de modo que a completude de todos os blobs históricos não é afirmada; a árvore do SHA e os trechos citados foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Quatro unidades no repositório, referenciadas pela configuração de composição do container (`packages/container/config/webpack.dev.js:20–24`). |
| Q2 | Yes | Cada pacote tem entrada, build e deploy próprios (`config/webpack.*.js`; workflows com `paths` por pacote), sem imports de código-fonte entre eles. |
| Q3 | Yes | O container monta os três remotos por rota (`packages/container/src/App.js:41–56`). |
| Q4 | Yes | Module Federation configurado no host e nos remotos, consumido por `import { mount }` e chamado nos wrappers. |
| Q5 | Yes | Q1–Q4 são Yes: shell com três remotos (React e Vue) e deploy independente. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”.
- A cadeia está completa no snapshot, como em 076/084/096/106/109. Os remotos expõem aplicações montadas por rota, não componentes compartilhados (089/100).
- A estrutura segue o mesmo roteiro de curso de 174 e 177 (`container`/`marketing`/`auth`/`dashboard` com `mount` e deploy S3/CloudFront `latest`). Como lá, a composição está implementada e não se reduz a conteúdo (023/094).
- `approaches: [module-federation]`, `ui_technologies: [react, vue]`, `build_tools: [webpack]`, `frontend_units: 4`, `unit_organization: monorepo`, `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** integração por `mount(el, { initialPath, onNavigate, onSignIn })` entre container React e remotos React/Vue, com memory history nos remotos.
- **Protocolo (amostra):** terceiro repositório da amostra com essa mesma arquitetura de curso (ver 174 e 177).
- **Protocolo (busca):** entrada só por busca de código nos dois `webpack.*.js` do container. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, `[react, vue]`, `webpack`, quatro unidades e `monorepo`; sem decisão aberta (`draft`). A cadeia está comprovada: o host declara três remotes (`packages/container/config/webpack.dev.js:18–26`; `webpack.prod.js:15–23`), cada remote expõe seu módulo (`./MarketingApp`, `./AuthApp`, `./DashboardApp`) e os wrappers do container importam esses specifiers (`packages/container/src/App.js:11–13,41–56`); os workflows publicam cada pacote em prefixo próprio do S3. Não há README (só `readme.txt` de 2 bytes), então não há README posterior às buscas. Lacunas de forma: Q2 deve citar manifests e configs por pacote, e Q4 e Q5 devem apontar a cadeia `remotes`/`exposes` e os imports dos wrappers. Comparáveis finais: 009 e 052; 174 e 177 têm o mesmo formato de quatro pacotes React/Vue, mas estão em `draft`.
