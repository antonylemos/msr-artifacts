---
schema: 1
id: 1248756347
full_name: shreyash1086/mfe
url: https://github.com/shreyash1086/mfe
commit: b0fdd18d2ef6beb846fa0a534b9458669405fe6b
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 10
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 270 — shreyash1086/mfe

## Contexto

Plataforma React com Webpack 5 Module Federation, Docker e nginx, organizada num único repositório com:
- um `shell-app` (host);
- nove módulos remotos (`module-*`);
- um `shared-design-system`, que também é remoto federado e pacote local.

O shell carrega os remotos em runtime, por injeção de `remoteEntry.js` com URLs de uma configuração de runtime, e os monta por rota. Cada unidade tem `webpack.config.js`, `Dockerfile` e `nginx.conf` próprios, orquestrados por `docker-compose.yml` atrás de um gateway nginx. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:271` registra rank 270, ID 1248756347, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:271` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:30647` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:30654` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos 14 hits em cada rodada.

**Endpoint `repositories`** (subconsulta `…#created:2026-05`, `path` vazio):

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:36:09.969Z / 2026-10-08T15:59:38.691Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:04:49.839Z / 2026-10-08T16:09:11.654Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:26:38.626Z / 2026-10-08T16:18:13.090Z |

**Endpoint `code`** (consulta `technology-module-federation-plugin-js-code`, `ModuleFederationPlugin remotes extension:js`): 11 hits em `webpack.config.js` e `webpack.prod.config.js`.

| Subconsulta | `path` |
|---|---|
| `…#size:2000..2249` | `module-cloud-labs/webpack.config.js`, `shell-app/webpack.prod.config.js`, `module-virtual-machine/webpack.config.js`, `module-assessment/webpack.config.js`, `module-dashboard/webpack.config.js`, `module-logging/webpack.config.js` |
| `…#size:2250..2499` | `module-cloud-console/webpack.config.js`, `module-code-environment/webpack.config.js`, `module-code-module/webpack.config.js` |
| `…#size:2750..2999` | `module-content-uploading/webpack.config.js` |
| `…#size:3000..3999` | `shell-app/webpack.config.js` |

As coletas do endpoint `code` vão de 2026-10-07T22:33:27.157Z a 22:36:52.447Z (001) e de 2026-10-08T16:13:25.514Z a 16:16:07.711Z (002). As consultas efetivas de repositório acrescentam `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 3.209;
- criação em 2026-05-25T02:51:32Z, push em 2026-06-09T08:08:18Z.

Grafias no README:
- “micro frontend”: hifenizada, em `README.md:1` (“# Micro-Frontend Architecture”), `README.md:4` (“A production-ready micro-frontend setup…”) e `README.md:11`;
- “micro frontends”: o plural não aparece no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado;
- “Module Federation”: `README.md:2` (“### React + Webpack Module Federation + Docker”), `72` e `225`.

A última alteração do README é `ded9db1` (2026-06-03), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 279 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Pastas `shell-app/` (30 arquivos), nove `module-*/` (19 a 43 arquivos cada) e `shared-design-system/` (22), cada uma com `package.json`, `webpack.config.js`, `src/index.js` → `bootstrap`, `Dockerfile` e `nginx.conf`. Na raiz: `docker-compose.yml`, `nginx/nginx.conf`, `docs/ARCHITECTURE.md` e `README.md`. | contexto |
| Configuração (remotos) | Cada módulo declara `ModuleFederationPlugin` com `name`, `filename: "remoteEntry.js"` e `exposes` de `./src/App`, por exemplo `module-dashboard/webpack.config.js:29–48` (`dashboard`, `./DashboardApp`, porta 3002, `:75`). O padrão se repete em `module-cloud-labs` (3001), `module-virtual-machine` (3003), `module-cloud-console` (3004), `module-logging` (3005), `module-code-environment` (3006), `module-code-module` (3007), `module-content-uploading` (3008) e `module-assessment` (3009). | forte |
| Mecanismo (host) | `shell-app/src/remotes/remoteLoader.js:4–65`: injeta o `<script>` do `remoteEntry.js`, chama `__webpack_init_sharing__`/`container.init`, pega o módulo com `container.get` e devolve um factory para `React.lazy`. `shell-app/src/App.jsx:15–77`: nove `React.lazy(loadRemoteComponent({ remoteName, exposedModule }))` com os mesmos nomes expostos pelos módulos. `:167–277`: rotas protegidas que montam cada remoto em `RemoteWrapper` (`:128–153`), com `Suspense` e error boundary. | forte |
| Configuração de runtime | `shell-app/src/config/remoteConfig.js:8–19`: URLs padrão de cada remoto (portas 3001–3010). `shell-app/public/index.html:14–52`: define `window.__RUNTIME_REMOTE_CONFIG__` com caminhos relativos no Docker (`/dashboard-remote/remoteEntry.js` etc.) ou portas locais. `nginx/nginx.conf:18–134`: roteia cada `/<módulo>-remote/remoteEntry.js` para o container correspondente. `docker-compose.yml:5–26`, `29–165`: um serviço por unidade na rede `micro-net`. | forte |
| Design system | `shared-design-system/webpack.config.js:36–48`: remoto `sharedDesignSystem` que expõe tokens, estilos e componentes (porta 3010). Os módulos e o shell o declaram como remoto `promise` (`shell-app/webpack.config.js:34–47`; `module-dashboard/webpack.config.js:32–45`) e como `shared` singleton. Também é dependência `file:../shared-design-system` em todos os `package.json` (por exemplo, `module-dashboard/package.json:15`), copiada no build do Dockerfile (`module-dashboard/Dockerfile:6–7`). Os `tailwind.config.js` de todas as unidades fazem `require("../shared-design-system/src/tokens")` (linha 1). | moderada |
| Código-fonte (fronteiras) | Busca por imports com `../../` em JS/JSX no SHA: nenhum import entre módulos ou entre módulo e shell. A única exceção é `module-virtual-machine/src/useVmManagement.js:2` (`../../contexts/AuthContext`), que aponta para um `contexts/` inexistente na raiz e não entra em outra unidade; o arquivo não é importado por nenhum outro. O acoplamento entre pastas é só com o `shared-design-system`, como biblioteca: tokens no Tailwind, pacote `file:` e remoto federado. | contexto |
| Documentação | `README.md:4`, `11–30`, `74–114`: descreve só três módulos e exemplos com nomes antigos (`auth`, `profile`), divergentes do código atual com nove. `docs/ARCHITECTURE.md:1–7`: loader de runtime sem URLs fixadas no build. | fraca |

## Autoria e histórico

Clone não raso; 13 commits lineares, nenhum merge, todos de Shreyash Damodar, de 2026-05-25 (`68ea11f`, “Initial deployment”) a 2026-06-09 (SHA `b0fdd18`, “solving small bugs”). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Shell e nove remotos com `exposes` (`*/webpack.config.js`), referenciados pela configuração de runtime do host (`shell-app/src/config/remoteConfig.js:8–19`). |
| Q2 | Yes | Cada unidade tem entry, `webpack.config.js`, Dockerfile e container próprios. Não há import de código-fonte entre módulos ou com o shell; a relação comum é com a biblioteca `shared-design-system`. |
| Q3 | Yes | O shell roteia e monta os nove remotos (`shell-app/src/App.jsx:167–277`). |
| Q4 | Yes | Module Federation em runtime: `remoteLoader.js` com `container.init`/`get`, alimentado por `__RUNTIME_REMOTE_CONFIG__` e pelo gateway nginx. |
| Q5 | Yes | Q1–Q4 são Yes: host e remotos compostos em runtime, com cadeia completa no snapshot. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso “monorepos containing a host and its remotes”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- **Design system:** o `shared-design-system` é consumido como biblioteca, pelo pacote `file:`, pelos tokens no Tailwind e como remoto `shared`. Como em 128, onde o Tailwind das apps lê o `ui-kit`, é relação de build com uma biblioteca, não entre unidades. Também não é federação usada só para compartilhar código (089/100): os nove módulos são aplicações montadas por rota.
- **Campos:**
  - `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`;
  - `frontend_units: 10` (shell e nove remotos; o design system é biblioteca e não é contado), `unit_organization: monorepo`;
  - `repo_type: production`: o README se apresenta como “production-ready”, o código chama APIs reais (por exemplo, `module-virtual-machine/src/useVmManagement.js:4–10`) e há configuração Amplify (`shell-app/src/config/amplify-config.js`).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** loader de Module Federation manual (`__webpack_init_sharing__`, `container.init`/`get`) em vez de `remotes` estáticos, com URLs vindas de `window.__RUNTIME_REMOTE_CONFIG__` definidas no `index.html` conforme a porta, e com gateway nginx por prefixo de caminho. O design system é remoto `promise` em todas as unidades.
- **RQ3:** cada remoto replica `AuthContext.jsx` e `ThemeContext.jsx` locais em vez de recebê-los do shell.
- **Protocolo (busca):** o hit plural não tem grafia literal. O README está desatualizado em relação ao código (3 contra 9 módulos). A elegibilidade muda de `unknown` (001) para `pass` (002).
