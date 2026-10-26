---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
url: https://github.com/LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [native-federation]
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 349 — LaurineLeNet/microfrontend-angular-angular

## Contexto

Exemplo de Native Federation em Angular com três workspaces independentes: um shell (`shell/`) e dois remotes (`athletes/`, uma corrida simulada com lista e detalhe de atletas; `ranking/`, a classificação em tempo real). O shell carrega os remotes por manifesto apontando para deploys separados em Cloudflare Workers, e os dois remotes trocam dados por `BroadcastChannel`. Não há README na raiz; os READMEs das pastas são boilerplate do Angular CLI. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:350` registra rank 349, ID 1238664148, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:350` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:30073` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:30080` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-05` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T21:51:22.008Z / 2026-10-08T15:42:43.341Z |

Metadados do hit: descrição nula, sem tópicos, linguagem TypeScript, sem licença, `fork: false`, tamanho 257, criação em 2026-05-14T10:32:10Z, push em 2026-06-08T14:47:23Z.

Não há README na raiz do SHA, a descrição é nula e os READMEs das pastas (`shell/README.md`, `athletes/README.md`, `ranking/README.md`) não contêm o termo (busca por `microfrontend`/`micro-frontend` em `*.md`: nenhuma ocorrência). O único campo pesquisado compatível é o nome do repositório; isso só explica o acerto e não é usado como evidência arquitetural. Os READMEs das pastas vêm do commit-raiz `73c274c` (2026-05-14), anterior às coletas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 97 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Três workspaces Angular (`shell`, `athletes`, `ranking`), cada um com `angular.json`, `package.json`, `bun.lock`, `federation.config.js`, `src/main.ts` → `src/bootstrap.ts` e `wrangler.jsonc`. | forte |
| Configuração (shell) | `shell/federation.config.js:3–8`: `withNativeFederation({ name: 'shell', shared: shareAll(singleton) })`; `shell/public/federation.manifest.json:1–4`: `athletes` → `https://mf-angular-athletes.lenetlaurine.workers.dev/remoteEntry.json`, `ranking` → `https://mf-angular-ranking.lenetlaurine.workers.dev/remoteEntry.json`; `shell/src/main.ts:3–6`: `initFederation('federation.manifest.json')` antes do bootstrap. | forte |
| Configuração (remotes) | `athletes/federation.config.js:3–9`: `name: 'athletes'`, `exposes` `./Component` (`race.ts`) e `./Routes` (`shell.routes.ts`). `ranking/federation.config.js:3–8`: `name: 'ranking'`, `exposes` `./Component` (`app.ts`). `athletes/public/_headers:1–2` (e o equivalente em `ranking/public/`): CORS `*`. | forte |
| Código-fonte (composição) | `shell/src/app/app.routes.ts:10–19`: rota `athletes` com `loadRemoteModule('athletes', './Routes')` → `m.routes` e rota `ranking` com `loadRemoteModule('ranking', './Component')` → `m.App`; `shell/src/app/dashboard/dashboard.ts:54–79`: o dashboard carrega os dois `./Component` e os monta com `createComponent` em painéis lado a lado. Os nomes exportados coincidem (`athletes/src/app/shell.routes.ts:7`; `athletes/src/app/race/race.ts:19`; `ranking/src/app/app.ts:19`). `shell/src/app/app.html:1–8`: navegação comum. | forte |
| Código-fonte (comunicação) | `athletes/src/app/race/race.ts:36`, `46`, `55` publicam posições num `BroadcastChannel`; `ranking/src/app/app.ts:11`, `38–48` o assinam. Comunicação em runtime sem import de código. | moderada |
| Build/deploy | Um `wrangler.jsonc` por unidade (`shell/wrangler.jsonc:3`, `athletes/wrangler.jsonc:3`, `ranking/wrangler.jsonc:3`: `mf-angular-shell`, `mf-angular-athletes`, `mf-angular-ranking`), cada um publicando seu próprio `dist/<app>/browser`; os nomes de worker coincidem com os hosts do manifesto. Commit `342c92d`: “feat: deployment”. | forte |
| Código-fonte (fronteiras) | Busca por `../` em `*.ts`, `*.js`, `*.json`, `*.css` e `*.html` (exceto lockfiles): só `routerLink` relativos dentro de `athletes` (`athletes/src/app/athlete-detail/athlete-detail.html:2`; `athletes/src/app/athlete-list/athlete-list.html:6`). Nenhum import de código-fonte entre as três unidades. | forte |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 4 commits (4 em todos os refs), nenhum merge: três de `Laurine <lenetlaurine@gmail.com>` (2026-05-14 a 2026-05-29: “working”, “routing in athlete”, “routing”) e o SHA `342c92d` (2026-06-08, “feat: deployment”) de `HCaupert <hcaupert@takima.fr>`. A conta tem outras variações de MFE nas rodadas (`LaurineLeNet/microfrontend-gateway`, `microfrontend-single-spa`, `microfrontend-react-mod-fed`, `microfrontend-mamiejs-angularnew`; `data/discovery/mfe-round-002/candidates.csv:30075`, `30078`, `30313`, `30738`); só este está na amostra. `git rev-list --objects $SHA --missing=print` identifica 18 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `shell`, `athletes` e `ranking`, os dois remotes referenciados pelo manifesto (`shell/public/federation.manifest.json:1–4`). |
| Q2 | Yes | Entrada, `federation.config.js`, lockfile e deploy próprios por unidade (`wrangler.jsonc` de cada pasta); nenhum import de código-fonte entre elas. |
| Q3 | Yes | O shell roteia e monta os remotes (`shell/src/app/app.routes.ts:10–19`; `shell/src/app/dashboard/dashboard.ts:54–79`). |
| Q4 | Yes | Native Federation configurada nos dois lados, com nomes e chaves expostas coincidentes e manifesto apontando para os deploys separados, e usada por `initFederation` + `loadRemoteModule`. |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- Q1–Q5 são Yes, o que satisfaz a regra de `MFE-implemented`. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”; mesma abordagem do final 059 (Native Federation com manifesto), aqui com deploy separado por unidade.
- A cadeia é completa e conectável (contraste com 097/103/104), comparável aos casos de cadeia completa (076/084/096/106/109). Os remotes expõem telas e rotas, não utilitários (contraste com 089/100).
- `frontend_units: 3`, `unit_organization: monorepo`, `approaches: [native-federation]`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (Native Federation sobre o builder de aplicação do Angular), `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** Native Federation com manifesto em runtime e deploy de cada unidade como Cloudflare Worker de assets estáticos com CORS (`_headers`).
- **RQ3:** comunicação entre remotes por `BroadcastChannel` (`athletes-positions`), sem estado compartilhado pelo shell; o mesmo remote é consumido de duas formas (rotas e componente montado no dashboard).
- **Protocolo (família):** a conta mantém várias variantes de MFE nas rodadas, com nomes por tecnologia; só esta está na amostra.
