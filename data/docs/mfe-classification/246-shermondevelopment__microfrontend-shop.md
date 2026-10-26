---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
url: https://github.com/shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
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

# 246 — shermondevelopment/microfrontend-shop

## Contexto

“Microfrontend Challenge” (`README.md:1–38`): e-commerce em React 19 + Vite com `@module-federation/vite`, num monorepo de npm workspaces (`package.json:4–8`) com quatro aplicações:
- `host` (porta 3000), o shell;
- os remotos `header` (3001, cabeçalho com carrinho), `footer` (3002) e `products` (3003, listagem de produtos).

Há também pacotes compartilhados em `packages/` (`shared` com Zustand e React Query, `types`, `ui` e configs). O README e um workflow de CI/CD descrevem o deploy de cada app em S3 + CloudFront separados (`README.md:142–162`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:247` registra rank 246, ID 1254401059, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:247` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:30967` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:30975` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos seis hits em cada rodada:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `…#size:3000..3999` | `package.json` | 2026-10-07T20:33:04.318Z / 2026-10-08T15:43:48.071Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-05` | — | 2026-10-07T21:13:18.648Z / 2026-10-08T15:42:32.629Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-05` | — | 2026-10-07T22:12:42.392Z / 2026-10-08T15:49:48.534Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-05` | — | 2026-10-07T22:36:39.291Z / 2026-10-08T15:59:48.873Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-05` | — | 2026-10-07T23:05:29.173Z / 2026-10-08T16:09:18.306Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-05` | — | 2026-10-07T23:26:24.296Z / 2026-10-08T16:18:08.915Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01` e, nas buscas textuais, `created:2026-05-01..2026-05-31`. O `package.json` raiz (3.465 bytes) declara `"@module-federation/vite": "^1.16.0"` (`:48`).

Metadados do hit de repositório:
- descrição “Projeto de Micro Frontends com React + Vite + Module Federation, organizado em um monorepo com apps independentes e pacotes compartilhados.”;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 449;
- criação em 2026-05-30T14:15:44Z, push em 2026-08-27T21:43:31Z.

Grafias no README:
- “Microfrontend”: `README.md:1`;
- “microfrontends”: `README.md:3`, `142`;
- “Module Federation”: `README.md:3`.

“Micro Frontends” aparece na descrição. A última alteração do README é `b9fa9c4` (2026-06-17), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 102 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Quatro apps em `apps/` (`host`, `header`, `footer`, `products`), cada um com `package.json`, `vite.config.ts`, `index.html`, `src/` e configs de TS/Tailwind/ESLint; pacotes em `packages/` (`shared`, `types`, `ui`, `config/*`); `scripts/ci/affected-workspaces.mjs`; workflow `.github/workflows/ci-cd.yml`; semantic-release. | contexto |
| Configuração (host) | `apps/host/vite.config.ts:22–65`: `federation({ name: 'host', remotes: { header, footer, products } })`, cada um com `type: 'module'` e `entry` vindo de `VITE_*_REMOTE_URL`, com fallback para `http://localhost:300x/remoteEntry.js` (`:12–15`); `shared` singleton de `react`, `react-dom`, `zustand`, `@microfrontend/shared`, `@tanstack/react-query`. | forte |
| Configuração (remotos) | `apps/header/vite.config.ts:13–37`: `name: "header"`, `filename: "remoteEntry.js"`, `exposes: { "./Header": "./src/Header.tsx" }`. `apps/products/vite.config.ts:13–37`: `./ProductsList`. `apps/footer/vite.config.ts:13–21`: `./Footer`. Portas 3001/3003/3002, coincidentes com o host. | forte |
| Código-fonte (composição) | `apps/host/src/App.tsx:5–7`: `lazy(() => import('header/Header'))`, `footer/Footer` e `products/ProductsList`. `:10–32`: monta os três com `RemoteErrorBoundary` e `Suspense`, com skeletons do pacote `ui`. `apps/host/src/remotes.d.ts:1–20` declara os módulos. | forte |
| Build/deploy | `package.json:13–22`: scripts `dev:*`, `build:*`, `preview:*` por app. `.github/workflows/ci-cd.yml:31–152`: detecta workspaces afetados, testa e faz deploy por app (matriz) em S3 com invalidação do CloudFront, passando as URLs dos remotos por variáveis (`:102–104`). | forte |
| Código-fonte (fronteiras) | Os apps importam pacotes de workspace (`@microfrontend/ui`, `@microfrontend/shared`: `apps/host/src/App.tsx:2`; `apps/products/src/components/Product.tsx:1`), declarados como singletons de federação. Os únicos `../../` entre pastas são os `eslint.config.js` dos apps, que importam a config de lint de `packages/config` (`apps/host/eslint.config.js:2`), ferramenta de desenvolvimento e não código de outra unidade. | contexto |

## Autoria e histórico

Clone não raso; 66 commits, 6 merges. São 56 de Vitor shermon `<victorshermon@yahoo.com>`, 8 do mesmo autor como `66441063+shermondevelopment@users.noreply.github.com` (os oito não são todos merges: há só seis merges no total, e autor e tipo de commit não devem ser confundidos) e 2 de `semantic-release-bot`. Vão de 2026-05-27 (`08c6287`, “chore: initial commit”) a 2026-08-27; o SHA `913349b` é “chore(release): 1.1.0 [skip ci]”. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects $SHA --missing=print` identifica 167 objetos históricos ausentes; os blobs atuais necessários estavam disponíveis.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Quatro unidades no repositório, três referenciadas pela configuração de composição do host (`apps/host/vite.config.ts:25–47`). |
| Q2 | Yes | Cada app tem `vite.config.ts`, entrada, porta e deploy próprios (matriz de deploy por app no CI). Não há imports de código-fonte entre apps; o código comum vem de pacotes de workspace. |
| Q3 | Yes | O host monta header, lista de produtos e footer na página (`apps/host/src/App.tsx:10–32`). |
| Q4 | Yes | Module Federation (`@module-federation/vite`) com `remotes` no host e `exposes` nos remotos, consumido por imports federados. |
| Q5 | Yes | Q1–Q4 são Yes: shell com três remotos compostos em runtime, com deploy independente. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- Os remotos são fatias da página com estado e dados próprios (carrinho no header, listagem com React Query), não utilitários (089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 4` (pacotes não contam), `unit_organization: monorepo`, `repo_type: example` (“Challenge”, `README.md:1`, com API e produtos de demonstração).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** remotos `type: 'module'` com URLs por variável de ambiente e fallback local; estado global compartilhado como singleton federado (`@microfrontend/shared` com Zustand); deploy por app afetado em S3/CloudFront com rollback manual.
- **Protocolo (busca):** o repositório entra por seis consultas (código e textuais). A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, quatro unidades frontend, `monorepo`, React/Vite e `module-federation`; sem decisão aberta (`draft`). A configuração de host e remotos resolve para exports existentes, os imports federados são usados e as unidades são montadas juntas. Correções verificadas: 167 objetos ausentes; 66 commits ancestrais, 6 merges, 56 commits com o e-mail pessoal, 8 com o noreply e 2 do `semantic-release-bot`; a busca de código usa só `"@module-federation" filename:package.json size:3000..3999`, sem `pushed`, enquanto as buscas de repositório usam `in:name,description,readme`, `pushed:>=2025-04-01` e `created:2026-05-01..2026-05-31`. Os quatro `eslint.config.js` apontam a um `dist` da configuração comum ausente até sua geração (o script raiz `lint` roda `build:eslint-config` antes), dependência de geração prevista, não fonte ausente; `cacheDir`, `outDir` e `tsBuildInfoFile` atravessam `../../` como saídas, e não como imports de unidades. `singleton` é configuração observada, e o deploy não foi executado.
