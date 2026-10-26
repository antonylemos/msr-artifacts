---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
url: https://github.com/mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Contexto

Sistema full-stack de “Buy Now, Pay Later” com backend Django (`backend/`, apps de conta, cliente, comerciante, plano, parcela, notificação e analytics) e frontend React + TypeScript “using **Micro-Frontend** architecture” (`README.md:10`). O frontend é um workspace pnpm (`frontend/pnpm-workspace.yaml:1–5`) com quatro pacotes:
- `shell`, o host webpack na porta 3000;
- `customer-app` (porta 3001) e `merchant-app` (porta 3002), remotos Module Federation;
- `shared` (`@bnpl/shared`), biblioteca comum de domínio, autenticação, provedores de dados e componentes de administração (react-admin).

O shell carrega dos remotos uma fábrica de configuração (`createAdminAppConfig`) que define as telas de cada área e monta cada área sob sua rota. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:236` registra rank 235, ID 989410278, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:236` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14305` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:14311` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos seis hits em cada rodada:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-topic-microfrontend`: `topic:microfrontend` | `terminology-topic-microfrontend` | — | 2026-10-07T18:18:32.629Z / 2026-10-08T15:34:17.861Z |
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `…#size:4000..5999` | `frontend/package.json` | 2026-10-07T20:52:26.866Z / 2026-10-08T15:44:06.777Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-05` | — | 2026-10-07T22:22:07.713Z / 2026-10-08T15:54:24.657Z |
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `…#size:3000..3999` | `frontend/shell/webpack.config.js` | 2026-10-07T22:36:52.447Z / 2026-10-08T16:16:07.711Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-05` | — | 2026-10-07T22:53:32.599Z / 2026-10-08T16:05:43.863Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2025-05` | — | 2026-10-07T23:17:46.435Z / 2026-10-08T16:14:17.715Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01` e, nas buscas textuais, `created:2025-05-01..2025-05-31`. `frontend/package.json` (4.631 bytes) declara `@module-federation/typescript` (`:40`). `frontend/shell/webpack.config.js` (3.229 bytes) contém `ModuleFederationPlugin` com `remotes` (`:3`, `59–94`).

Metadados do hit de repositório:
- descrição “A full-stack BNPL system … uses micro-frontends with TypeScript…”;
- tópicos `microfrontend`, `reactjs`, `typescript`, `django` e outros;
- linguagem Python, `fork: false`, tamanho 822;
- criação em 2025-05-24T03:36:54Z, push em 2025-06-14T15:44:55Z.

Grafias no README:
- “Micro-Frontend”: `README.md:10`, `391`;
- “Micro‑Frontend (Module Federation)”: `README.md:42`, com hífen não separável;
- “microfrontend”: `README.md:6`, no badge;
- o plural “micro-frontends” está na descrição.

A última alteração do README é o próprio SHA, `bf4da76` (2025-06-14), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 289 entradas, 288 arquivos regulares `100644` e 1 executável `100755` (`backend/manage.py`); zero symlinks e zero gitlinks. `frontend/` tem `shell/`, `customer-app/`, `merchant-app/` e `shared/` (113 entradas; o diretório `frontend/` inteiro tem 121), cada um com `package.json`, `webpack.config.js` (exceto `shared`), testes Jest e `src/` em camadas. `backend/` é um projeto Django; há `docker-compose.dev.yml`, `docs/` e dois workflows de backend. | contexto |
| Configuração (host) | `frontend/shell/webpack.config.js:59–94`: `ModuleFederationPlugin({ name: "shell", remotes: { customer_app: "customer_app@http://localhost:3001/remoteEntry.js", merchant_app: "merchant_app@http://localhost:3002/remoteEntry.js" }, shared: react, react-dom, react-router-dom, react-admin, @tanstack/react-query singleton })`. | forte |
| Configuração (remotos) | `frontend/customer-app/webpack.config.js:81–116`: no modo remoto, `name: "customer_app"`, `filename: "remoteEntry.js"`, `exposes: { "./createAdminAppConfig": "./src/application/services/create-admin-app-config.service.ts" }`; no modo standalone, uma entrada própria com `HtmlWebpackPlugin` (`:14–22`, `74–79`). `frontend/merchant-app/webpack.config.js:81–116` faz o mesmo com `merchant_app`, na porta 3002 (`:121`). | forte |
| Código-fonte (composição) | `frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:7–14`: `await import('customer_app/createAdminAppConfig')` e chamada com `basename` e `onBack`. `frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:34–37`, `47–66`: carrega as duas configurações e monta `<AdminApp {...props} />` sob `${customerBasePath}/*` e `${merchantBasePath}/*`, com `ErrorBoundary` e `Suspense`. `frontend/customer-app/src/application/services/create-admin-app-config.service.ts:7–25`: a configuração exportada traz as telas próprias do remoto (`InstallmentList`, `PlanList`, `PlanShow`). | forte |
| Código compartilhado | Os três apps resolvem `@bnpl/shared` para `../shared/src` por alias de webpack (`frontend/shell/webpack.config.js:35–38`; `frontend/customer-app/webpack.config.js:33–36`) e declaram `"@bnpl/shared": "workspace:*"` (`frontend/shell/package.json:11–13`; `frontend/customer-app/package.json:13–15`). É uma biblioteca de workspace integrada em build time em cada unidade, não outra unidade frontend. | contexto |
| Código-fonte (fronteiras) | Busca por imports relativos para `shell`, `customer-app`, `merchant-app` ou `shared`: nenhuma ocorrência. Shell e remotos não importam o código-fonte uns dos outros; a ligação é pelo módulo federado. | contexto |

## Autoria e histórico

Clone não raso; 170 commits ancestrais ao SHA, 12 merges (a contagem de 172 corresponde a todas as refs: `1969f9f` e `7f15b38` estão fora da ancestralidade avaliada), todos de Mojtaba Arvin `<m.arvin@live.com>`, de 2025-05-23 (`8461370`, “Initial commit”) a 2025-06-14 (SHA `bf4da76`, “docs(readme): add table of contents”). O trabalho foi feito em branches de funcionalidade (`frontend/shell`, `frontend/customer-app`, `frontend/merchant-app`, `feature/frontend-shared` e vários `feature/backend-*`), integrados em `main`. Os branches `frontend/*` não têm commits além de `main`; nenhum branch foi considerado separadamente. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects $SHA --missing=print` encontra 114 objetos históricos ausentes; os arquivos atuais que estabelecem a cadeia arquitetural estavam disponíveis, e não se buscaram objetos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades frontend no repositório, duas referenciadas pela configuração de composição do host (`frontend/shell/webpack.config.js:61–64`). |
| Q2 | Yes | Cada app tem `package.json`, `webpack.config.js`, entrada, porta e script de build próprios. Não há imports de código-fonte entre eles; o código comum vem do pacote de workspace `@bnpl/shared`. |
| Q3 | Yes | O shell monta as áreas de cliente e de comerciante por rota (`shell-app.bootstrap.tsx:47–66`). |
| Q4 | Yes | Module Federation com `remotes` no host e `exposes` nos remotos, consumido por `import('customer_app/createAdminAppConfig')` e equivalente. |
| Q5 | Yes | Q1–Q4 são Yes: shell que compõe duas áreas de administração vindas de remotos em runtime. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- O módulo exposto é uma fábrica de configuração, não um componente React. Ela carrega as telas e recursos de cada área (`create-admin-app-config.service.ts:12–24`), que o shell renderiza com o `AdminApp` da biblioteca comum. É composição de fatias funcionais, não compartilhamento de utilitários (089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 3` (a biblioteca `shared` não conta), `unit_organization: monorepo`, `repo_type: example` (projeto de portfólio com URLs `localhost` e ambiente de desenvolvimento em Docker).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** remotos expõem uma fábrica de configuração react-admin em vez de componentes; o shell injeta `basename` e `onBack`. Cada remoto tem modo standalone e modo remoto no mesmo `webpack.config.js`.
- **Protocolo (busca):** o repositório entra por seis consultas (tópico, textuais e de código). A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância com MFE-implemented, Q1–Q5 Yes, três unidades frontend em `monorepo`, React/webpack e `module-federation`; sem decisão aberta (`draft`). O contrato federado está efetivamente usado: as fábricas retornam configurações com referências a componentes das áreas e o shell as renderiza por rota. Correções verificadas: 170 commits ancestrais (e não 172); 114 objetos históricos ausentes; o diretório `frontend` tem 121 entradas e os quatro diretórios `shell`, `customer-app`, `merchant-app` e `shared` somam 113 (e não 69, como informado antes); a biblioteca `shared` e o backend não aumentam a contagem de unidades frontend; o escopo dos qualificadores das consultas de código deve ser delimitado. Ressalvas operacionais: o shell inicia os dois carregamentos em `useEffect` e espera ambos antes de renderizar, sem `catch` das promessas (`:34–40`), e `ErrorBoundary`/`Suspense` em torno de `AdminApp` não demonstram tratamento da falha assíncrona anterior; os comandos standalone do README (`:245–261`) trocam os nomes dos filtros customer e merchant. São problemas de robustez e instrução, sem tornar indeterminada a ligação federada. Q2, Q4 e Q5 devem citar as evidências, preservando as ressalvas de `shared` e da fábrica remota.
