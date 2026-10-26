---
schema: 1
id: 1150753074
full_name: lorem98/mfe
url: https://github.com/lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
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

# 174 — lorem98/mfe

## Contexto

“Micro Frontend PoC — Webpack Module Federation” (`README.md:1–5`): monorepo com quatro pacotes webpack 5.
- `container` (React 17): shell que consome os três remotos.
- `marketing` e `auth` (React 17): remotos que expõem `mount`.
- `dashboard` (Vue 3): remoto montado dentro do React sem biblioteca de interop.

Cada pacote tem workflow próprio de deploy em S3/CloudFront. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:175` registra rank 174, ID 1150753074, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:175` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:24472` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:24479` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada:

| Consulta (`q`) | Endpoint | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | code | `…#size:700..799` | `packages/container/config/webpack.dev.js` | 2026-10-07T22:23:51.937Z / 2026-10-08T16:06:18.116Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | repositories | `…#created:2026-02` | vazio | 2026-10-07T22:32:05.378Z / 2026-10-08T15:58:08.819Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | repositories | `…#created:2026-02` | vazio | 2026-10-07T23:00:40.387Z / 2026-10-08T16:08:10.841Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | repositories | `…#created:2026-02` | vazio | 2026-10-07T23:23:04.794Z / 2026-10-08T16:17:03.151Z |

As consultas de repositórios acrescentam `pushed:>=2025-04-01 created:2026-02-01..2026-02-28`; a de código, `size:700..799`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 245;
- criação em 2026-02-05T16:44:19Z, push em 2026-05-21T13:57:41Z.

Grafias e linhas:
- **Código:** o arquivo casado tem 771 bytes no SHA, dentro da faixa, e contém `ModuleFederationPlugin` e `remotes` (`packages/container/config/webpack.dev.js:2`, `15–21`).
- **README:** “Micro Frontend” em `README.md:1`, “micro frontend” em `README.md:3` e “Module Federation” em `README.md:1`, `3`, `5`, `32` e outras.
- **Sem grafia literal:** o plural “micro frontends” não aparece no README nem na descrição; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O README foi criado em `91feee5` (2026-05-11) e não foi alterado depois, sendo anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 51 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há quatro pacotes em `packages/` (`container`, `marketing`, `auth`, `dashboard`), cada um com `package.json`, `config/webpack.{common,dev,prod}.js`, `public/index.html` e `src/` com `index.js` → `bootstrap.js`. Há quatro workflows em `.github/workflows/`. Não há workspace na raiz. | contexto |
| Configuração (host) | `packages/container/config/webpack.dev.js:15–23`: `remotes` `marketing`, `auth` e `dashboard` em `localhost:8081/8082/8083/remoteEntry.js`. `packages/container/config/webpack.prod.js:15–23`: as mesmas remotes em `${PRODUCTION_DOMAIN}/<pacote>/latest/remoteEntry.js`. | forte |
| Configuração (remotos) | `packages/marketing/config/webpack.dev.js:16–22` e `webpack.prod.js:13–20`: `exposes: { './MarketingApp': './src/bootstrap' }`. `packages/auth/config/webpack.dev.js:15–23`: `exposes: { './AuthApp' }`. `packages/dashboard/config/webpack.dev.js:16–30` e `webpack.prod.js:15–27`: `exposes: { './DashboardApp' }`, com `vue` singleton. | forte |
| Código-fonte (composição) | `packages/container/src/App.js:13–49`: rotas `/auth`, `/dashboard` (protegida por `signedIn`) e `/`, cada uma renderizando um wrapper. `src/components/MarketingApp.js:1–25`, `AuthApp.js:21–41` e `DashboardApp.js:15–26`: `import { mount } from "<remote>/<App>"` e `mount(ref.current, …)`, com sincronização bidirecional de histórico (`onNavigate`/`onParentNavigate`) e callback `onSignIn`. `packages/marketing/src/bootstrap.js:7–46` e `packages/dashboard/src/bootstrap.js:12–36`: `mount` exportado, com memory history embutido e execução isolada em desenvolvimento. | forte |
| Código-fonte (fronteiras) | A busca por imports `../../` em `packages` não retorna nada. Os imports entre pacotes são só os federados (`marketing/MarketingApp`, `auth/AuthApp`, `dashboard/DashboardApp`). | contexto |
| Build/deploy | `.github/workflows/container.yml:1–36`: build com `PRODUCTION_DOMAIN`, `aws s3 sync dist s3://…/container/latest` e invalidação do CloudFront, disparado só por mudanças em `packages/container/**`. Há workflows análogos para `marketing`, `auth` e `dashboard`. As versões de webpack 5 são declaradas por pacote (por exemplo, `packages/container/package.json:26`; `packages/dashboard/package.json:29`). | forte |

## Autoria e histórico

Clone não raso; 17 commits, nenhum merge, todos de `lorem98 <lorenzo.medda24@gmail.com>`, de 2026-02-05 (`ba3fc6f`, “Initial commit”) a 2026-05-21 (SHA `44eb295`, “Revert previous temp commit”).
- **Marketing:** o `container` e o `marketing` com workflows vêm de fevereiro.
- **Navegação:** a navegação bidirecional entra em `2be6f54` (2026-03-24).
- **Auth e dashboard:** `6af9f6d` cria o auth e `91feee5` cria o dashboard e o README (2026-05-11); os workflows de auth e dashboard vêm em `60008a4`.

A estrutura (`container`, `marketing`, `auth` e `dashboard` com `mount`, memory history e deploy S3/CloudFront `latest`) lembra um roteiro de curso, mas essa origem é hipótese não verificada: nem as citações nem o histórico local identificam curso, fonte comum ou grau de replicação. O histórico incremental e as extensões (Vue 3 com Chart.js, README próprio) mostram a evolução do autor `lorem98`, sem provar autoria intelectual. O `git diff` do commit temporário `d1cf5a5` não completou por blob ausente no clone parcial (`9aaa14e3…`), que não foi buscado; o clone ficou inalterado.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Quatro unidades no repositório, referenciadas pela configuração de composição do container (`packages/container/config/webpack.dev.js:17–21`). |
| Q2 | Yes | Cada pacote tem entrada, build e deploy próprios (`config/webpack.*.js`; workflows por pacote com `paths` próprios), sem imports de código-fonte entre eles. |
| Q3 | Yes | O container monta os três remotos por rota no mesmo shell (`packages/container/src/App.js:25–44`). |
| Q4 | Yes | Module Federation configurado no host e nos remotos, consumido por `import { mount }` e chamado nos wrappers (`MarketingApp.js:1`, `10`; `AuthApp.js:1`, `26`; `DashboardApp.js:1`, `21`). |
| Q5 | Yes | Q1–Q4 são Yes: shell com três remotos (React e Vue) e deploy independente. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”.
- A cadeia está completa no snapshot, como em 076/084/096/106/109, com deploy independente por pacote. Os módulos expostos são aplicações inteiras montadas por rota, não componentes compartilhados, por isso não cabe a dúvida de code sharing de 089/100.
- Mesmo que haja origem em roteiro de curso (hipótese não verificada), isso não reduz o caso a conteúdo ou exercício sem composição (023/094): o checklist inclui “examples… that actually compose frontend units”, e a composição está implementada.
- `approaches: [module-federation]`, `ui_technologies: [react, vue]`, `build_tools: [webpack]`, `frontend_units: 4`, `unit_organization: monorepo`, `repo_type: example` (“PoC”, `README.md:1`).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** integração por função `mount(el, props)` exposta por cada remoto, independente de framework (React e Vue 3), com sincronização de roteamento entre memory history e browser history e estado de autenticação passado por callback.
- **RQ3:** um workflow de CI/CD por unidade, com filtro de `paths`, publicando em `/<pacote>/latest/` no S3 e invalidando o CloudFront. É deploy independente explícito.
- **Protocolo (busca):** quatro consultas casam, inclusive a busca de código no `webpack.dev.js` do container. O hit plural `"micro frontends"` não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, `[react, vue]`, `webpack`, quatro unidades e `monorepo`; sem decisão aberta (`draft`). A cadeia container → três remotos (cada remote expõe um bootstrap com `mount`, montado pelo container em uma rota, inclusive a unidade Vue 3) está confirmada em nomes, arquivos, entradas e código. Ressalva operacional verificada: `auth.yml:32` e `dashboard.yml:32` invalidam apenas `/auth/latest/index.html` e `/dashboard/latest/index.html`, enquanto o host consome `remoteEntry.js`; a atualização de cache dos remotes pode não ocorrer, o que limita a alegação de deploy produtivo plenamente operacional, sem desfazer a composição nem o deploy por pacote. Q2 deve usar `src/index.js` e `package.json:4–6` de cada pacote, e não o curinga `config/webpack.*.js`; as buscas negativas por imports devem registrar escopo e termos. A árvore (`git ls-tree`) e os resultados SQLite são dados estruturados, sem linhas de texto.
