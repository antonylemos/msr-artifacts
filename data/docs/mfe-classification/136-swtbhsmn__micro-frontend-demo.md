---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
url: https://github.com/swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 136 — swtbhsmn/micro-frontend-demo

## Contexto

Demonstração mínima de Webpack Module Federation com duas aplicações React no mesmo repositório: `app1` (host, porta 3001) e `app2` (remote, porta 3002). Cada uma tem `package.json`, lockfile, `webpack.config.js` e entrada próprios, e o host carrega o componente exposto pelo remote (`README.txt:1–14`). O nome do repositório não é usado como evidência da classificação.

`data/samples/mfe-sample-001/clones.csv:137` registra rank 136, ID 1036507333, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:137` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:17569` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:17574` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada, todos com subconsulta `#created:2025-08` e `path` vazio:

| Consulta (`q`) | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `… pushed:>=2025-04-01 created:2025-08-01..2025-08-31` | 2026-10-07T23:19:32.698Z / 2026-10-08T16:15:35.461Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | idem | 2026-10-07T22:24:30.125Z / 2026-10-08T15:55:23.048Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | idem | 2026-10-07T18:50:58.228Z / 2026-10-08T15:39:06.213Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | idem | 2026-10-07T22:08:50.096Z / 2026-10-08T15:47:52.921Z |

Metadados do hit: descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, criação em 2025-08-12T07:14:51Z, push em 2025-08-12T07:17:26Z. O README do repositório é `README.txt`. `README.txt:1` (“Microfrontend Webpack Module Federation demo”) contém a grafia unida “Microfrontend” e a frase “Module Federation”. A forma separada “micro frontend” não está no README e corresponde ao nome do repositório (`in:name`), registrado aqui só como origem do acerto. A forma plural “microfrontends” não aparece em nenhum dos campos; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O `README.txt` vem da raiz `46f21b9` (2025-08-12) e não foi alterado no SHA, que só modifica `.gitignore`. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 19 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há dois diretórios de aplicação, `app1/` e `app2/`, cada um com `package.json`, `package-lock.json`, `webpack.config.js`, `public/index.html` e `src/`, além de `README.txt`, `.gitignore` e três `.DS_Store`. Não há manifesto raiz nem workspaces. | contexto |
| Configuração (host) | `app1/webpack.config.js:28–34`: `ModuleFederationPlugin` com `name: "app1"`, `remotes: { app2: "app2@http://localhost:3002/remoteEntry.js" }` e `react`/`react-dom` como singletons compartilhados. | forte |
| Configuração (remote) | `app2/webpack.config.js:28–35`: `name: "app2"`, `filename: "remoteEntry.js"`, `exposes: { "./RemoteApp": "./src/RemoteApp" }` e os mesmos `shared`. `app2/webpack.config.js:8–14`: `devServer.port: 3002` e `publicPath: "auto"`, coerentes com a URL do host. | forte |
| Código-fonte (consumo) | `app1/src/App.jsx:2`: `React.lazy(() => import('app2/RemoteApp'))`, renderizado em `Suspense` (`app1/src/App.jsx:8–10`). O especificador `app2/RemoteApp` coincide com a chave do remote e a chave exposta. | forte |
| Código-fonte (exposição) | `app2/src/RemoteApp.jsx:3–5`: export default do componente exposto. `app2/src/bootstrap.js:1–6` permite rodar o remote isolado. | moderada |
| Código-fonte (fronteiras) | Leitura de todos os fontes: `app1/src/index.js:1` e `app2/src/index.js:1` fazem `import('./bootstrap')`; `app1/src/bootstrap.js:3` importa `./App`; `app2/src/bootstrap.js:3` importa `./RemoteApp`. Busca por `../` nos fontes e configs: nenhuma ocorrência. `app1` só acessa `app2` pelo módulo federado `app2/RemoteApp`, sem import de caminho relativo. | contexto |
| Build/deploy | Builds e servidores separados: `app1/package.json:5–7` (`webpack serve … --port 3001`) e `app2/package.json:5–7` (`--port 3002`). Cada app tem `entry: "./src/index.js"` e `HtmlWebpackPlugin` próprios (`app1/webpack.config.js:6`, `35–37`; `app2/webpack.config.js:6`, `36–38`). Não há configuração de produção; os dois rodam em `mode: "development"` (`app1/webpack.config.js:7`; `app2/webpack.config.js:7`). | moderada |
| Tecnologia | Webpack, React e React DOM declarados (`app1/package.json:9–10`, `17`; `app2/package.json:9–10`, `17`) e resolvidos em ambos os lockfiles: `app1/package-lock.json:3690–3691`, `3702–3703` e `4634–4635`, e as mesmas linhas em `app2/package-lock.json` (react/react-dom 18.3.1; webpack 5.101.0). O `ModuleFederationPlugin` vem do próprio webpack (`app1/webpack.config.js:2`; `app2/webpack.config.js:2`). | contexto |
| Documentação | `README.txt:3–14`: `app1` host em 3001, `app2` remote em 3002; subir primeiro o `app2`, depois o `app1`, que “will open at http://localhost:3001 and load remote component from app2”. | moderada |

## Autoria e histórico

Clone não raso; 2 commits, nenhum merge, ambos de Swetabh Suman `<swtbhsmn@gmail.com>` em 2025-08-12. A raiz `46f21b9` (“microfrontend-demo”, 12:44:15+05:30) adiciona os 19 arquivos de uma vez, incluindo host, remote, lockfiles e README. O SHA `9cb91ce` (“Update-Code”, 12:46:40+05:30) só altera `.gitignore` (`git log --no-renames --name-status`). Os metadados não indicam origem de terceiros, e o histórico não registra evolução separada das unidades. Uma tentativa de exibir o patch de `.gitignore` encontrou um blob histórico ausente (`7129f3d`); com `GIT_NO_LAZY_FETCH=1`, ele não foi buscado. Nenhum conteúdo histórico foi usado como evidência.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades frontend no repositório, `app1` e `app2`, cada uma com entrada própria (`app1/webpack.config.js:6`; `app2/webpack.config.js:6`). A configuração de composição do host referencia `app2` (`app1/webpack.config.js:30–32`). |
| Q2 | Yes | Cada unidade tem entry point, manifesto, lockfile e build/servidor próprios (`app1/package.json:5–7`; `app2/package.json:5–7`). Nenhum import direto de código-fonte entre elas: o host usa só o módulo federado (`app1/src/App.jsx:2`). |
| Q3 | Yes | O host `app1` carrega e renderiza o remote em sua aplicação (`app1/src/App.jsx:2`, `8–10`; `README.txt:14`). |
| Q4 | Yes | Module Federation configurado nos dois lados, com nome, arquivo, chave exposta e porta coerentes (`app1/webpack.config.js:28–34`; `app2/webpack.config.js:8–10`, `28–35`) e efetivamente consumido (`app1/src/App.jsx:2`). |
| Q5 | Yes | Q1–Q4 são Yes: cadeia host → remote completa e conectável. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “examples, templates, and proofs of concept that actually compose frontend units”, com `repo_type: example` (`README.txt:1`, `17`: “minimal demo”). É a mesma cadeia completa host/remote de 076/084/096/106/109.
- Diferentemente de 097/103/104, nomes, `filename`, porta e chave exposta fecham sem lacuna. Diferentemente de 089/100, a federação monta uma unidade de UI no host, não só compartilha código.
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]` (`app1/webpack.config.js:1–2`; `app2/webpack.config.js:1–2`). `frontend_units: 2`.
- `unit_organization: monorepo`: as duas unidades ficam no mesmo repositório, sem workspaces ou ferramenta de monorepo, como pastas independentes. O vocabulário do template não distingue esse caso, e `monorepo` é o valor que registra as duas unidades num único repositório.
- Não há decisão aberta: a composição é runtime por Module Federation, sem iframe, links ou build-time packages.

## Notas para análise

- **RQ2:** Module Federation do webpack 5 em sua forma mínima: `remotes` estático por URL, `exposes` de um componente, `shared` singleton e o padrão `index.js` → `import('./bootstrap')` nos dois lados (`app1/src/index.js:1`; `app2/src/index.js:1`).
- **RQ3:** o remote também roda isolado pelo próprio `bootstrap` (`app2/src/bootstrap.js:1–6`). A relação entre as unidades fica só na URL do host (`app1/webpack.config.js:31`) e no especificador `app2/RemoteApp`.
- **Protocolo (busca):** o hit de `"micro frontend"` tem a grafia separada só no nome do repositório; o README usa a forma unida “Microfrontend” (`README.txt:1`). O hit no plural não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, duas unidades, `module-federation` e `monorepo` (não há ferramenta formal de monorepo: são duas aplicações independentes no mesmo repositório, e `monorepo` é o valor disponível no vocabulário do template); sem decisão aberta. A execução só foi demonstrada em modo development, o que limita a validação runtime e de produção, não a evidência estática de composição. O blob `7129f3d` (`.gitignore` histórico) não está no clone parcial, o que é confirmado com `GIT_NO_LAZY_FETCH=1`, e não é necessário para classificar o snapshot. Proveniência: quatro hits por rodada (`created:2025-08`); a atribuição a README.txt:1 ("Webpack Module Federation", "Microfrontend") e ao nome `micro-frontend-demo` é eliminação plausível, e as formas plurais dependem do processamento textual da busca, não registrado localmente. O README.txt entrou na raiz `46f21b9` (2025-08-12), anterior às buscas.
