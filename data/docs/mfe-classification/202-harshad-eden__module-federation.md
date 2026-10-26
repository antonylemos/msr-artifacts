---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
url: https://github.com/harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 202 — harshad-eden/module-federation

## Contexto

“Module Federation Insurance Platform” (`README.md:1–7`; `package.json:2–4`): monorepo pnpm (`pnpm-workspace.yaml:1–3`) com quatro aplicações React/Vite em `apps/`. São um `shell` (host, porta 3000) e três remotos, `sales-portal` (3001), `underwriter-portal` (3002) e `product-config` (3004), todos com `@originjs/vite-plugin-federation`. Há também dois pacotes compartilhados em `packages/`, `shared-ui` (componentes shadcn/ui) e `shared-types`. A documentação descreve seis aplicações (`README.md:11–19`, `85–88`), mas `employer-portal` e `service-provider` não existem no snapshot. Os dados são fictícios (“Mock Data”, `README.md:172`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:203` registra rank 202, ID 1015183048, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main` (e também de `origin/dev`). Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:203` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:16055` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:16059` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-07` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:41:51.271Z / 2026-10-08T15:38:43.455Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:08:32.515Z / 2026-10-08T15:47:41.994Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:18:34.983Z / 2026-10-08T16:15:11.909Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 83;
- criação em 2025-07-07T06:07:40Z, push em 2025-07-07T15:54:46Z.

Grafias no README:
- “microfrontend”: `README.md:7` (“to create a microfrontend architecture”), também em `254` (“Each microfrontend exposes”) e, com maiúscula, em `227`;
- “microfrontends”: `README.md:164` (“Dynamically loads all microfrontends”);
- “Module Federation”: `README.md:1`, `3`, `7` e outras.

A última alteração do README é o próprio SHA, `dde74e6` (2025-07-07), que acrescenta `# module-federation` ao fim do arquivo (`README.md:447`). Isso é anterior às coletas de outubro de 2026, então o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 84 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há quatro apps, cada um com `package.json`, `vite.config.ts`, `index.html` e `src/`, mais dois pacotes em `packages/` e cinco documentos Markdown na raiz (`README.md`, `ARCHITECTURE_DOCUMENTATION.md`, `DEPLOYMENT_GUIDE.md`, `NAVIGATION_AND_EMBEDDING.md`, `TODO.md`), além de `context.md`. Não há workflows. | contexto |
| Configuração (host) | `apps/shell/vite.config.ts:8–16`: `federation({ name: "shell", remotes: { salesPortal, underwriterPortal, productConfig } })` em `http://localhost:3001/3002/3004/dist/assets/remoteEntry.js`, com `shared` de `react`, `react-dom` e `react-router-dom`. | forte |
| Configuração (remotos) | `apps/sales-portal/vite.config.ts:8–15` (`salesPortal`, porta 3001), `apps/underwriter-portal/vite.config.ts:8–15` (`underwriterPortal`, 3002) e `apps/product-config/vite.config.ts:8–15` (`productConfig`, 3004): `filename: "remoteEntry.js"` e `exposes: { "./App": "./src/App.tsx" }`. Os nomes e portas coincidem com os do host. | forte |
| Código-fonte (composição) | `apps/shell/src/App.tsx:13–16`: rotas `/sales/*`, `/underwriter/*` e `/products/*`. `apps/shell/src/components/SalesPortal.tsx:4–28`, `67–87`: `lazy(() => import("salesPortal/App"))` com fallback, `Suspense` e `ErrorBoundary`. `UnderwriterPortal.tsx:5` e `ProductConfig.tsx:5` fazem o mesmo. `apps/shell/src/types/remotes.d.ts:1–14` declara os três módulos. | forte |
| Código-fonte (fronteiras) | A busca por `from '../`, `import('../` e `require('../` em `apps` e `packages` só acha imports internos de `packages/shared-ui` (`src/components/ui/*.tsx` → `../../lib/utils`, `../../hooks/use-mobile`). Os apps usam `@insurance/shared-ui` e `@insurance/shared-types` como dependências `workspace:*` (por exemplo `apps/sales-portal/package.json:14–15`; `apps/sales-portal/src/App.tsx:3`), e o host chega aos remotos só pelos especificadores federados. | contexto |
| Build/deploy | Cada app tem `dev`, `build` e `preview` próprios (`apps/shell/package.json:5–9`; `apps/sales-portal/package.json:5–9`). A raiz os orquestra com `concurrently` (`package.json:11–27`). `DEPLOYMENT_GUIDE.md:35–46`, `136–141` recomenda um projeto Vercel por app, com URLs dos remotos por variáveis `VITE_*` (`:54–63`, `80–84`), mas a configuração do SHA usa só URLs `localhost`. | moderada |
| Documentação | `NAVIGATION_AND_EMBEDDING.md:5–25`: o shell renderiza o portal de vendas dentro do layout por Module Federation, sem redirecionamento. | contexto |

## Autoria e histórico

Clone não raso; 2 commits, nenhum merge, de Harshad `<harshad@edencaremedical.com>`, ambos em 2025-07-07: `ac5fbbc` (“mono repo with single deployement”), que adiciona todo o conteúdo, e o SHA `dde74e6` (“first commit”), que só modifica `README.md`. `origin/dev` aponta para o mesmo SHA. O blob anterior do README (`f6de22a`) está ausente no clone parcial e não foi buscado; não houve leitura de outro blob histórico. A mensagem “single deployement” não corresponde ao que o snapshot mostra, que são builds por app e um guia de deploy por app.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Quatro unidades no repositório, referenciadas pela configuração de composição do host (`apps/shell/vite.config.ts:10–14`). |
| Q2 | Yes | Cada app tem entrada, `vite.config.ts` e scripts de build próprios. Não há imports de código-fonte entre apps; o código comum vem de pacotes de workspace. |
| Q3 | Yes | O shell monta os três remotos por rota dentro do seu layout (`apps/shell/src/App.tsx:11–18`; `SalesPortal.tsx:67–87`). |
| Q4 | Yes | Module Federation configurado no host (`remotes`) e nos remotos (`exposes`), consumido por `import("salesPortal/App")` e equivalentes. |
| Q5 | Yes | Q1–Q4 são Yes: shell com três remotos compostos em runtime. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- Os remotos expõem aplicações inteiras montadas por rota, não componentes compartilhados (diferente de 089/100). Os pacotes `shared-ui`/`shared-types` são bibliotecas de workspace, não unidades frontend, e não entram em `frontend_units`.
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 4`, `unit_organization: monorepo`. `repo_type: example`: plataforma de demonstração com dados fictícios, URLs só em `localhost` e documentação de seis apps, das quais três não existem.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** `@originjs/vite-plugin-federation` com `remotes` apontando para `…/dist/assets/remoteEntry.js` no servidor de desenvolvimento de cada remoto. Os remotos montam o próprio `Routes` sob o roteador do host, com `react-router-dom` compartilhado.
- **RQ1 (sinais enganosos):** a documentação promete seis domínios e deploy separado com variáveis de ambiente, enquanto o código tem três remotos e URLs fixas em `localhost`.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, React/Vite, quatro unidades e `monorepo`; sem decisão aberta (`draft`). Correções: seis apps documentadas menos quatro presentes resultam em duas apps apenas documentadas (e não três); o blob anterior do README (`f6de22a…`) está ausente do clone parcial, de modo que não é verificável que a linha final `# module-federation` (`README.md:447`) tenha sido a única adição textual do último commit (o README é de julho de 2025, anterior às buscas). Ressalva operacional a registrar: os remotes do host usam `http://localhost:<porta>/dist/assets/remoteEntry.js` (`apps/shell/vite.config.ts:11–13`), os scripts `dev` das apps só iniciam o Vite e o `dev` da raiz constrói só as bibliotecas (`package.json:11–15`), e não há `dist` na árvore; o fluxo de desenvolvimento a partir do clone, portanto, precisa construir os remotos e expor o diretório `dist` (o README sugere servir `dist` como raiz, `README.md:392–395`, o que dá `/assets/remoteEntry.js` sem o prefixo `/dist`), e não há base, proxy ou rewrite nos configs para reconciliar os dois modos. As variáveis `VITE_*` do guia são instrução de alteração futura, não configuração consumida. Isso limita a afirmação de executabilidade imediata, sem tornar incerto o mecanismo configurado e consumido. As linhas Q2, Q4 e Q5 devem citar manifests e entries, imports e configs.
