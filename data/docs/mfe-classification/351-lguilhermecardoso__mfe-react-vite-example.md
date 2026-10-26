---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
url: https://github.com/lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 351 — lguilhermecardoso/mfe-react-vite-example

## Contexto

Exemplo de micro-frontends com React, Vite e `@originjs/vite-plugin-federation` (`README.md:1–3`): um container (`root-app/`) e quatro remotes (`mf-login`, `mf-navbar`, `mf-dashboard`, `mf-personagem-detalhe`), cada um projeto independente com `package.json` próprio (`README.md:33`), publicados juntos no GitHub Pages em subpastas. O repositório versiona também a saída de build (`dist/`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:352` registra rank 351, ID 1019893852, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:352` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:16376` (`terminology;technology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:16380` (`terminology;technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos oito hits em cada rodada:

| Consulta (`q`) | Endpoint | Subconsulta | `path` |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `repositories` | `…#created:2025-07` | vazio |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `repositories` | `…#created:2025-07` | vazio |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `repositories` | `…#created:2025-07` | vazio |
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | `code` | `…#size:800..899` | `mf-login/package.json`, `mf-dashboard/package.json`, `mf-navbar/package.json`, `root-app/package.json`, `mf-personagem-detalhe/package.json` (um hit por arquivo) |

Coletas: rodada 001 entre 2026-10-07T18:38:09.546Z e 2026-10-07T23:18:44.074Z; rodada 002 entre 2026-10-08T15:38:32.098Z e 2026-10-08T16:15:15.681Z. As consultas de repositório acrescentam `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Metadados do hit: descrição nula, sem tópicos, linguagem TypeScript, sem licença, `fork: false`, tamanho 347, criação em 2025-07-15T03:34:19Z, push em 2025-07-17T23:37:09Z.

Correspondência textual no README: “MicroFrontend” (singular) em `README.md:1`; “Microfrontends” (plural) em `README.md:3`; “Module Federation” em `README.md:1`, `3`, `24` e `90`. Os cinco `package.json` casados têm entre 834 e 899 bytes no SHA (dentro da faixa). O README vem do commit-raiz `6cdaf6f` (2025-07-15) e não foi alterado depois; não é posterior às buscas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 157 entradas, 156 arquivos regulares `100644` e 1 executável `100755` (`build-all.sh`); zero symlinks e zero gitlinks. Cinco projetos Vite com `package.json`, `vite.config.ts`, `index.html` e `src/` próprios; `dist/` versionado com a saída de cada um. | forte |
| Configuração (container) | `root-app/vite.config.ts:11–24`: `remotes` `mf_login`, `mf_dashboard`, `mf_personagem_detalhe` e `mf_navbar`, com URL local (`localhost:4173–4176/assets/remoteEntry.js`) ou de produção (`https://lguilhermecardoso.github.io/mfe-react-vite-example/<mf>/assets/remoteEntry.js`), conforme `IS_LOCAL` (`root-app/.env:1`, `false`); `:31–35`: `federation({ name: "root_app", remotes, shared: ["react","react-dom"] })`. | forte |
| Configuração (remotes) | `mf-login/vite.config.ts:10–17` (`name: "mf_login"`, `exposes: { "./Login": "./src/App.tsx" }`), `mf-navbar/vite.config.ts:10–17` (`./Navbar`), `mf-dashboard/vite.config.ts:10–17` (`./Dashboard`) e `mf-personagem-detalhe/vite.config.ts:10–17` (`./PersonagemDetalhe`), todos com `filename: "remoteEntry.js"` e saída em `../dist/<mf>` (`:22–23`). | forte |
| Código-fonte (composição) | `root-app/src/App.tsx:5–8`: `React.lazy(() => import("mf_navbar/Navbar"))`, `mf_login/Login`, `mf_dashboard/Dashboard` e `mf_personagem_detalhe/PersonagemDetalhe`; `:56–99`: navbar condicional e rotas `/login`, `/dashboard`, `/personagem/:id`, com props e callbacks entre container e remotes (`onAuthSuccess`, `onCharacterClick`, `onBack`). `root-app/src/declarations.d.ts:1–4`: tipos dos módulos remotos. | forte |
| Build/deploy | `build-all.sh:8–23`: build separado de cada unidade para `dist/<unidade>` e cópia do container para a raiz; `.github/workflows/deploy.yml:19–27`: publica `dist` no GitHub Pages. O bundle versionado do container contém as quatro URLs de produção (`dist/root-app/assets/index-DVv4evQ9.js:33`), e o `remoteEntry.js` gerado carrega os chunks expostos por caminho relativo (`dist/mf-login/assets/remoteEntry.js`, `"./__federation_expose_Login-…"`). | moderada |
| Código-fonte (fronteiras) | Busca por `from '../'`/`import('../'` em `*.ts` e `*.tsx`: nenhuma ocorrência. Os remotes não importam o container nem uns aos outros; o estado do usuário passa por props e `localStorage` (`root-app/src/App.tsx:10–13`, `36–46`). | forte |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 14 commits alcançáveis (15 em todos os refs, incluindo o ref remoto `gh-pages`, não considerado), nenhum merge, todos de `Guilherme Cardoso <guilherme.cardoso@furk.tech>`, de 2025-07-15 (`6cdaf6f`, “first commit”) a 2025-07-17 (SHA `ddf4741`, “trigger deploy”). `git rev-list --objects $SHA --missing=print` identifica 29 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `root-app` e os quatro remotes, referenciados pela configuração de composição (`root-app/vite.config.ts:11–24`). |
| Q2 | Yes | `package.json`, `vite.config.ts`, entrada e build próprios por unidade (`build-all.sh:8–21`), sem import de código-fonte entre elas. |
| Q3 | Yes | O container carrega e roteia os remotes (`root-app/src/App.tsx:5–8`, `56–99`). |
| Q4 | Yes | Module Federation configurado nos dois lados, com nomes e chaves expostas coincidentes e URLs de produção que correspondem às pastas publicadas, consumido por `import()` federado. |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- Q1–Q5 são Yes, o que satisfaz a regra de `MFE-implemented`. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units” (`repo_type: example`).
- Cadeia completa e coerente para os quatro remotes (contraste com 097/103/104); comparável aos casos de cadeia completa (076/084/096/106/109). Os remotes expõem telas e a barra de navegação, não utilitários (contraste com 089/100).
- O deploy é conjunto (um `dist` no GitHub Pages), mas os builds são separados e o container carrega os remotes em runtime por URL, como na nota de deploy do final 059.
- `frontend_units: 5`, `unit_organization: monorepo`, `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** `@originjs/vite-plugin-federation` com troca de URLs dos remotes entre ambiente local e GitHub Pages por variável de ambiente (`root-app/vite.config.ts:9–24`).
- **RQ1:** saída de build versionada (`dist/`, com `remoteEntry.js` e `__federation_*`), que gera sinais adicionais em buscas por código.
- **Protocolo:** o README remete a `ROADMAP.md` (`README.md:106`), mas o arquivo versionado é `roadmap.md`.
