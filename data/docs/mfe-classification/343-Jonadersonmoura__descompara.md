---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
url: https://github.com/Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [native-federation]
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 343 — Jonadersonmoura/descompara

## Contexto

POC de um sistema de seguros automotivos (“Descompara Seguros”) em Angular 22 + Nx com Native Federation (`@angular-architects/native-federation`) (`README.md:1–13`). Um `shell` (host, porta 4200) descobre em runtime, por manifesto, três remotes: `marAberto` (4201), `intranet` (4202) e `admin` (4203). As bibliotecas `libs/shared/*` (tipos, UI, data-access, guards, tema) são compartilhadas por path mapping (`README.md:15–31`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:344` registra rank 343, ID 1316095122, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:344` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:34410` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:34416` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos cinco hits em cada rodada:

| Consulta (`q`) | Endpoint | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | code | `…#size:2000..2249` | `package.json` | 2026-10-07T19:59:50.512Z / 2026-10-08T15:42:49.049Z |
| `technology-native-federation-package-code`: `"@angular-architects/native-federation" filename:package.json` | code | sem partição | `package.json` | 2026-10-07T22:12:44.990Z / 2026-10-08T15:55:59.759Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | repositories | `…#created:2026-07` | vazio | 2026-10-07T21:52:21.405Z / 2026-10-08T15:43:27.808Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | repositories | `…#created:2026-07` | vazio | 2026-10-07T22:13:48.430Z / 2026-10-08T15:50:19.281Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | repositories | `…#created:2026-07` | vazio | 2026-10-07T23:28:59.650Z / 2026-10-08T16:18:56.800Z |

As consultas de repositório acrescentam `pushed:>=2025-04-01 created:2026-07-01..2026-07-31`.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 307, criação em 2026-07-29T12:15:36Z, push em 2026-07-29T12:37:31Z.

Correspondências no SHA:
- **Código:** `package.json` (2.051 bytes, dentro da faixa) declara `@module-federation/enhanced` (`:18`) e `@angular-architects/native-federation` (`:58`).
- **“microfrontends” e “module federation”:** `README.md:3` (“construído como microfrontends com Angular 22 + Nx, usando Module Federation nativo”), também `:31`.
- **“microfrontend”:** o singular não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O README só existe no commit único, que é o SHA (2026-07-29T09:37:20-03:00, isto é, 12:37:20Z), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 273 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Workspace Nx com `shell/`, `marAberto/`, `intranet/` e `admin/` (cada um com `project.json`, `federation.config.mjs`, `src/main.ts`, `src/bootstrap.ts`), projetos e2e, `libs/shared/{types,ui,data-access,guards,theme}` e arquivos de skills/configuração de assistentes de código. | forte |
| Configuração (host) | `shell/federation.config.mjs:3–18`: `withNativeFederation({ name: 'shell', shared: shareAll(singleton, strictVersion) })`. `shell/public/federation.manifest.json:1–5`: `admin` → `http://localhost:4203/remoteEntry.json`, `intranet` → `:4202`, `marAberto` → `:4201`. `shell/src/main.ts:3–5`: `initFederation('/federation.manifest.json')` antes do bootstrap. | forte |
| Configuração (remotes) | `admin/federation.config.mjs:4`, `:8–10`: `name: 'admin'`, `exposes: { './Routes': './admin/src/app/remote-entry/entry.routes.ts' }`; idem `intranet/federation.config.mjs:4`, `:8–10` e `marAberto/federation.config.mjs:4`, `:8–10`. `admin/src/main.ts:3–5`: `initFederation({ admin: './remoteEntry.json' })` e bootstrap próprio (`admin/src/bootstrap.ts:1–5`). | forte |
| Código-fonte (composição) | `shell/src/app/app.routes.ts:2`, `:4–20`: rotas `''`, `intranet` e `admin` com `loadRemoteModule('<remote>', './Routes').then(m => m.remoteRoutes)`. `admin/src/app/remote-entry/entry.routes.ts:7–16` (e equivalentes de `intranet` e `marAberto`): exportam `remoteRoutes` com `RemoteEntry`, `Home` e `Login`; `admin/src/app/remote-entry/entry.ts:6–13` aplica o tema do ambiente. | forte |
| Configuração (correspondência da cadeia) | Os nomes do manifesto (`admin`, `intranet`, `marAberto`) coincidem com os `name` dos remotes; `./Routes` coincide com `exposes`; as portas 4201–4203 coincidem com `serve` de cada `project.json` (por exemplo, `admin/project.json:131`). | forte |
| Build/deploy | `shell/project.json:10`, `:26`, `:64`, `:70`, `:91`: build `@angular-architects/native-federation:build` sobre `@angular/build:application`, `outputPath: dist/shell`, entry `shell/src/main.ts`; `admin/project.json:10`, `:73`, `:79`, `:100`: idem com `dist/admin`. Dev-servers próprios (portas 4200–4203). | moderada |
| Código-fonte (fronteiras) | Busca ativa de imports relativos com `../../` em `shell`, `admin`, `intranet`, `marAberto` e `libs`: só `eslint.config.mjs` das libs para a config da raiz. Os apps usam as libs por alias (`tsconfig.base.json:22–30`, por exemplo `@descompara/shared-guards` em `admin/src/app/remote-entry/entry.routes.ts:2`) e o tema por `@use 'libs/shared/theme/src/lib/tokens'` (`admin/src/styles.scss:1`). Nenhum import direto entre apps. | contexto |
| Documentação | `README.md:48–52`: remotes expõem `./Routes`, o shell carrega cada um em runtime pelo manifesto e `shareAll` garante instância única de Angular e RxJS. `README.md:56` afirma que os guards ficam em `shell/src/app/app.routes.ts`, mas no código estão nas rotas dos remotes (`admin/src/app/remote-entry/entry.routes.ts:12`). | moderada |

## Autoria e histórico

Clone não raso. Há 1 commit (1 em todos os refs), sem merges: `3dd5146` (2026-07-29T09:37:20-03:00), autor e committer `Jonaderson\Avaya <jmoura@avaya.com>`, “inclusão do projeto”, que adiciona todo o workspace em bloco. A presença de `AGENTS.md`, `CLAUDE.md` e skills de várias ferramentas (`.agents/`, `.cursor/`, `.github/skills/` etc.) indica uso de assistentes de código; os metadados não separam autoria intelectual. `git rev-list --objects $SHA --missing=print` não lista objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Quatro unidades: `shell`, `marAberto`, `intranet` e `admin`, os remotes referenciados no manifesto de federação (`shell/public/federation.manifest.json:1–5`). As libs compartilhadas não são contadas. |
| Q2 | Yes | Cada unidade tem `federation.config.mjs`, entry, `project.json`, build e dev-server próprios (`shell/project.json:10–91`; `admin/project.json:10–131`). Não há import de código-fonte entre apps; o compartilhamento é por libs com alias (busca registrada). |
| Q3 | Yes | O shell roteia e carrega os três remotes (`shell/src/app/app.routes.ts:4–20`). |
| Q4 | Yes | Native Federation configurada nos dois lados e usada por `initFederation` + `loadRemoteModule`, com nomes, módulo exposto e portas correspondentes. |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- `MFE-implemented`: Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”.
- Mesmo padrão do final 059 (Native Federation com manifesto, `initFederation` e `loadRemoteModule` por rotas, libs compartilhadas por path mapping).
- Cadeia completa como em 076/084/096/106/109.
- Não é code sharing (089/100): os remotes expõem áreas inteiras da aplicação (rotas com home e login).
- `frontend_units: 4`, `unit_organization: monorepo`, `approaches: [native-federation]`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (builder `@angular/build:application` via Native Federation, como em 059), `repo_type: example` (“POC”, `README.md:3`, com dados mock).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** Native Federation (Angular 22) com manifesto JSON no host, `initFederation` com mapa local nos remotes para execução isolada e `shareAll` com `strictVersion`. O `package.json` também declara `@module-federation/enhanced` e `@nx/module-federation` (`package.json:18`, `:23`), não usados pelas configs de federação dos apps.
- **RQ3:** tema por ambiente via atributo `data-theme` no componente raiz de cada remote, com tokens CSS de uma lib compartilhada (`README.md:33–46`; `admin/src/app/remote-entry/entry.ts:11`).
- **RQ1:** o README diverge do código quanto ao local dos guards (`README.md:56` × `entry.routes.ts`).
- **Protocolo (busca):** o hit singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
