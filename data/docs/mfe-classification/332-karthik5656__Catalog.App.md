---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
url: https://github.com/karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 332 — karthik5656/Catalog.App

## Contexto

Projeto de catálogo com backends .NET (`src/backend/`: Gateway, App, Chat, Rag, por enquanto com o template `WeatherForecast`), documentação de arquitetura e planos (`documents/`) e três frontends React + Vite em `src/frontend/apps/`:
- `ui-catalog` (shell, porta 3000);
- `ui-catalog-merchant` (remoto, 3001);
- `ui-catalog-consumer` (remoto, 3002).

O shell lê `remotes.json`, monta o mapa de `remotes` do `@originjs/vite-plugin-federation` e gera um arquivo com `React.lazy(() => import("<scope>/App"))` por remoto, roteado em `/<route>/*`. Não há README na raiz. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:333` registra rank 332, ID 1350705751, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:333` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:36329` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:36337` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, todos do endpoint `code`, consulta `technology-vite-federation-package-code` (`"@originjs/vite-plugin-federation" filename:package.json`), subconsulta `…#size:800..899`:

| `path` | Coleta 001 / 002 (UTC) |
|---|---|
| `src/frontend/apps/ui-catalog-consumer/package.json` | 2026-10-07T22:04:57.516Z / 2026-10-08T15:47:59.312Z |
| `src/frontend/apps/ui-catalog/package.json` | 2026-10-07T22:04:57.516Z / 2026-10-08T15:47:59.312Z |
| `src/frontend/apps/ui-catalog-merchant/package.json` | 2026-10-07T22:05:05.207Z / 2026-10-08T15:48:11.108Z |

Os metadados do hit de código não trazem descrição, tópicos nem datas. A entrada é só por código: os três `package.json` declaram `@originjs/vite-plugin-federation`. Não há README na raiz para avaliar.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 152 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Na raiz há `Agents.md`, `documents/` (planos, incluindo `06_shell_mfe.md`), `docker/`, `wireframes/` e workflows de CI. Há quatro soluções .NET em `src/backend/` e três apps Vite em `src/frontend/apps/`, cada uma com `package.json`, `pnpm-lock.yaml`, `vite.config.ts`, `Dockerfile` e `src/`. | contexto |
| Shell | `src/frontend/apps/ui-catalog/remotes.json:1–16`: `merchantApp` → `http://localhost:3001/assets/remoteEntry.js` e `consumerApp` → `http://localhost:3002/assets/remoteEntry.js`, ambos com `module: "./App"`. `vite.config.ts:10–17`, `85–89`: monta `remotes` a partir do JSON. `:26–51`: plugin que gera `src/remoteApps.generated.tsx` com `React.lazy(() => import("<scope>/App"))` no início do build; o arquivo gerado é ignorado no Git (`.gitignore:15–16`). | forte |
| Montagem | `src/frontend/apps/ui-catalog/src/App.tsx:3`, `11–31`: uma rota `/<route>/*` por remoto, com `Suspense`. `src/components/ShellLayout.tsx:27–31`: links de navegação. `src/main.tsx:9`: `BrowserRouter` com `basename="/ui-catalog"`. | forte |
| Remotos | `ui-catalog-merchant/vite.config.ts:16–23` e `ui-catalog-consumer/vite.config.ts:16–23`: `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App" }`, portas 3001 e 3002. Os `App.tsx` são `Routes` aninhados (`ui-catalog-merchant/src/App.tsx:7–15`; `ui-catalog-consumer/src/App.tsx:5–11`). Ambos avisam o shell em rebuild (`/__fullReload`, `:24–45`). | forte |
| Inconsistência | Os dois remotos se declaram `name: "consumerApp"` (`ui-catalog-merchant/vite.config.ts:17` e `ui-catalog-consumer/vite.config.ts:17`), enquanto o shell usa o scope `merchantApp` para a porta 3001. O plugin resolve os remotos pela URL; o efeito disso não foi verificado por execução. | ambígua |
| Código-fonte (fronteiras) | Busca por imports com `../../` em `src/frontend`: nenhum. Cada app só importa os próprios arquivos e pacotes. | contexto |

## Autoria e histórico

Clone não raso; 10 commits, 1 merge local, todos de `karthik5656`, de 2026-08-29 (`f843c7d`, “initial commit”) a 2026-09-01 (SHA `1982e0f`, que adiciona `Agents.md`). Cinco commits foram criados via PR (`#1`–`#5`) na interface do GitHub, com committer `GitHub`. A configuração de federação chega em `ab5770d` (“MFE Configuration (#5)”). Só há o branch `master`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Shell e dois remotos no repositório, referenciados pela configuração de composição (`remotes.json:1–16`, convertido em `remotes` em `vite.config.ts:14–17`). |
| Q2 | Yes | Cada app tem `package.json`, lockfile, `vite.config.ts`, Dockerfile e porta próprios, sem import de código entre apps. |
| Q3 | Yes | O shell roteia e monta cada remoto em `/<route>/*` (`App.tsx:11–31`). |
| Q4 | Yes | `@originjs/vite-plugin-federation` com `remotes` gerados de `remotes.json` e `import("<scope>/App")` gerados no build, coerentes com o `exposes` (`./App`) e as portas dos remotos. |
| Q5 | Yes | Q1–Q4 são Yes: shell e remotos compostos em runtime, com a cadeia definida no snapshot. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso “monorepos containing a host and its remotes”.
- O arquivo de rotas é gerado no build, mas o gerador (`vite.config.ts:26–51`) e sua entrada (`remotes.json`) estão no snapshot, então a cadeia é observável.
- **Campos:**
  - `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`;
  - `frontend_units: 3`, `unit_organization: monorepo`;
  - `repo_type: production`: projeto com backends, CI, Docker e planos de produto, ainda em estágio inicial.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** registro declarativo de remotos (`remotes.json`) como fonte única do mapa de federação e das rotas do shell, gerados por plugin Vite, com recarga do shell em rebuild dos remotos (`/__fullReload`).
- **RQ3:** os dois remotos usam o mesmo `name` (`consumerApp`) nas configs de federação, diferente do scope `merchantApp` usado pelo shell para a porta 3001.
- **Protocolo (busca):** entrada só por código. Não há README na raiz; a documentação MFE está em `documents/`. A elegibilidade muda de `unknown` (001) para `pass` (002).
