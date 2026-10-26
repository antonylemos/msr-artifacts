---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
url: https://github.com/UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 8
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 355 — UserTharushi/companion-disease-risk-ai

## Contexto

Projeto acadêmico de apoio à decisão sobre risco de doenças em animais de companhia (`README.md:1–3`; pasta `docs/coursework/`): monorepo npm/Turbo com um shell e sete micro-frontends React/Vite com `@originjs/vite-plugin-federation` (`apps/`), microsserviços Node.js e Python e pacotes compartilhados de tipos e utilitários. O próprio README afirma que a aplicação efetivamente usada é `apps/mfe-auth`, executada isoladamente, e que “The shell + other MFEs are scaffold” (`README.md:80`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:356` registra rank 355, ID 1174301349, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:356` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:25945` (`terminology;technology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:25952` (`terminology;technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos onze hits em cada rodada:

| Consulta (`q`) | Endpoint | Subconsulta | `path` |
|---|---|---|---|
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | `code` | `…#size:800..899` | `apps/mfe-admin`, `apps/mfe-vet-discovery`, `apps/mfe-vaccination`, `apps/shell`, `apps/mfe-pet-profile`, `apps/mfe-risk-results`, `apps/mfe-symptom-checker` (`/package.json`, um hit por arquivo) |
| idem | `code` | `…#size:1600..1799` | `apps/mfe-auth/package.json` |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `repositories` | `…#created:2026-03` | vazio |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `repositories` | `…#created:2026-03` | vazio |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `repositories` | `…#created:2026-03` | vazio |

Coletas: rodada 001 entre 2026-10-07T22:04:45.444Z e 2026-10-07T23:24:16.712Z; rodada 002 entre 2026-10-08T15:47:47.202Z e 2026-10-08T16:17:28.504Z.

Metadados do hit: descrição nula, sem tópicos, linguagem TypeScript, sem licença, `fork: false`, tamanho 17638, criação em 2026-03-06T09:35:58Z, push em 2026-08-03T07:34:15Z.

Correspondência no README: `README.md:7` (“React + Tailwind + Module Federation micro-frontends + PWA”) contém literalmente “Module Federation” e o plural hifenizado “micro-frontends”, que casa “micro frontends” com o hífen como separador; o singular “micro frontend” não aparece isolado, e esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é `46d7f21` (2026-07-18), anterior às coletas de 7 e 8 de outubro de 2026; não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 354 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Oito projetos frontend em `apps/` (`shell` e sete `mfe-*`), cada um com `package.json`, `vite.config.ts`, `index.html` e `src/`; backends em `backend/services/`; `packages/shared-types` e `packages/shared-utils`; workspaces npm e Turbo na raiz (`package.json:5–18`). | forte |
| Configuração (shell) | `apps/shell/vite.config.ts:9–21`: `federation({ name: "shell", remotes: { mfeAuth, mfePetProfile, mfeSymptom, mfeRiskResults, mfeVetDiscover, mfeVaccination, mfeAdmin } })`, com `http://localhost:3001` a `3007` `/assets/remoteEntry.js`, e `shared` React, ReactDOM, React Router e Zustand. | forte |
| Configuração (remotes) | Cada `apps/mfe-*/vite.config.ts` declara `name` igual à chave do shell e `exposes` `./App` (além de páginas), por exemplo `apps/mfe-pet-profile/vite.config.ts:9–15`, `apps/mfe-admin/vite.config.ts:9–17`; os scripts usam as mesmas portas (`apps/mfe-pet-profile/package.json`: `vite --port 3002` e `vite preview --port 3002`, até `mfe-admin` em 3007). `apps/mfe-auth/vite.config.ts:9–17`: `name: "mfeAuth"`, `exposes` `./App`, `./LoginPage`, `./RegisterPage`. | forte |
| Código-fonte (composição) | `apps/shell/src/App.tsx:18–23`: `lazy(() => import("mfePetProfile/App"))` e os demais cinco remotes; `:47–54`: rotas sob `ShellLayout` com navegação comum (`apps/shell/src/layouts/ShellLayout.tsx:11–16`, `51–65`). O `mfeAuth` não é importado: `apps/shell/src/App.tsx:8–15`, `44` redirecionam `/auth/*` para `http://localhost:3001` (“Auth MFE runs standalone… redirect to it instead of federating”). | moderada |
| Documentação / Build/deploy (uso efetivo) | `README.md:80`: “The primary user-facing app is `apps/mfe-auth` (port 3001)… The shell + other MFEs are scaffold.” `docker-compose.yml:11–34`: só os serviços `shell` e `mfe-auth`; os outros seis remotes não sobem. `apps/shell/Dockerfile:15`: o shell roda `vite` em modo dev. Várias páginas dos remotes são placeholders (por exemplo, `apps/mfe-symptom-checker/src/pages/ChatbotPage.tsx:5`, “Symptom Checker MFE scaffold page.”), enquanto `mfe-auth` concentra os painéis completos (por exemplo, `apps/mfe-auth/src/pages/PetOwnerDashboardPage.tsx`, 112863 bytes). | ambígua |
| Código-fonte (fronteiras) | Varredura dos 281 especificadores relativos em `apps/**` e `packages/**` (`*.ts`, `*.tsx`), resolvidos contra a raiz de cada projeto: nenhum sai do projeto de origem. Os apps compartilham só tipos do pacote de workspace `@companion-ai/shared-types` (por exemplo, `apps/mfe-pet-profile/src/lib/api.ts:1`, `import type`). | forte |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 65 commits alcançáveis (65 em todos os refs), 4 merges, de 2026-03-06 (`f3cfb0e`, “Initial commit”) a 2026-08-03 (SHA `373de0e`). Autoria: a titular com três identidades (`UserTharushi`, 39; `MGTE Ranasinghe`, 24; `Tharushi Ranasinghe` pela interface web, 2), mesmo e-mail noreply em duas delas. Refs remotos `import/local-initial-2026-04-09` e `pr/import-into-main` não considerados à parte. A configuração federada do shell existe desde `1d5c716` (2026-03-25, “project setup”). Há `CLAUDE.md` na raiz, indício de uso de assistente de código. `git rev-list --objects $SHA --missing=print` identifica 309 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Shell e sete micro-frontends no repositório, seis deles referenciados e importados pelo shell (`apps/shell/vite.config.ts:11–19`; `apps/shell/src/App.tsx:18–23`). |
| Q2 | Yes | `package.json`, `vite.config.ts`, porta e build próprios por app; nenhum import de código-fonte entre eles (só tipos de pacote compartilhado). |
| Q3 | Yes | O shell roteia os seis remotes sob um layout com navegação comum (`apps/shell/src/App.tsx:47–54`). |
| Q4 | Yes | O shell configura os seis remotes com nomes, chaves `./App` e portas correspondentes e os consome por imports federados. O README descrevê-los como scaffold limita a evidência de produção, mas não invalida a composição implementada no snapshot. |
| Q5 | Yes | Q1–Q4 demonstram uma arquitetura de shell e remotes implementada; o caráter de scaffold é registrado como ressalva de maturidade. |

## Motivo

- Classificado como `MFE-implemented`: o shell e seis remotes formam uma cadeia federada completa, com configuração e consumo coerentes.
- A declaração de que shell e remotes são scaffold é uma ressalva de maturidade e uso em produção, não ausência da arquitetura implementada.
- `frontend_units: 8` (shell e sete `mfe-*`), `unit_organization: monorepo`, `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: example` (trabalho de curso, `docs/coursework/`).

## Notas para análise

- **RQ1 (sinais enganosos):** oito `package.json` com `@originjs/vite-plugin-federation` e uma configuração de shell coerente, mas o README declara que a composição é scaffold e que o produto é `mfe-auth` isolado.
- **RQ2:** `@originjs/vite-plugin-federation` com shell que mistura federação (seis remotes) e redirecionamento por URL (auth).
- **Protocolo:** projeto de curso com relatórios e apresentações em `docs/` e múltiplas identidades da mesma autora.

## Decisão registrada

Promovido para `MFE-implemented`. O shell declara e consome seis remotes por Module Federation, com nomes, portas e módulos expostos coerentes. O README caracteriza essa parte como scaffold e o deploy local não a executa integralmente; isso registra maturidade limitada, mas não elimina a composição implementada no código.
