---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
url: https://github.com/andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
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

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Contexto

Tutorial de micro-frontends em Angular com Native Federation (`@angular-architects/native-federation`). São três projetos Angular independentes na raiz do repositório: `test-base`, host dinâmico na porta 4200, e os remotes `tea-tracker` (4222) e `sticky-notes` (4333) (`README.md:1`; `README.md:30–38`; `README.md:141–183`). O host carrega cada remote por rota usando um manifesto de federação. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:140` registra rank 139, ID 1134331975, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:140` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:23372` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:23379` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-01` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T22:29:39.577Z / 2026-10-08T15:57:17.577Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-01` | `"micro frontends" … created:2026-01-01..2026-01-31` | 2026-10-07T22:59:16.743Z / 2026-10-08T16:07:38.509Z |

Metadados do hit: descrição nula, sem tópicos, linguagem HTML, `fork: false`, criação em 2026-01-14T15:18:44Z, push em 2026-01-14T16:09:49Z. O README contém as duas grafias literais: o singular “micro frontend” em `README.md:24` (“(or micro frontend)”) e em `README.md:93`, e o plural “micro frontends” em `README.md:1` (“# Micro frontends in Angular”), `README.md:15` e `README.md:17`.

A última alteração do README é o próprio SHA, `7050669` (2026-01-14T18:09:45+02:00), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 96 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há três projetos Angular irmãos, `test-base/`, `tea-tracker/` e `sticky-notes/`, cada um com `package.json`, `package-lock.json`, `angular.json`, `federation.config.js`, `tsconfig*` e `src/`, e um `README.md` na raiz. Não há manifesto raiz nem workspaces. | contexto |
| Configuração (host) | `test-base/federation.config.js:3–8`: `withNativeFederation({ name: 'test-base', shared: shareAll(...) })`, sem `exposes`. `test-base/public/federation.manifest.json:1–4`: `"tea-tracker": "http://localhost:4222/remoteEntry.json"` e `"sticky-notes": "http://localhost:4333/remoteEntry.json"`. `test-base/src/main.ts:1–6`: `initFederation('federation.manifest.json')` antes do bootstrap. `public/` é copiado como asset (`test-base/angular.json:48–53`). | forte |
| Configuração (remotes) | `tea-tracker/federation.config.js:3–8` e `sticky-notes/federation.config.js:3–8`: `name` igual à chave do manifesto e `exposes: { './App': './src/app/app.ts' }`. Portas de dev 4222 e 4333 em `serve-original` (`tea-tracker/angular.json:97`; `sticky-notes/angular.json:96–98`), iguais às URLs do manifesto. Cada remote também chama `initFederation()` (`tea-tracker/src/main.ts:1–6`; `sticky-notes/src/main.ts:1–6`). | forte |
| Código-fonte (consumo) | `test-base/src/app/app.routes.ts:11–19`: rotas `tea-tracker` e `sticky-notes` com `loadComponent: () => loadRemoteModule('<remote>', './App').then((m) => m.App)`. `test-base/src/app/app.html:5–27`: menu com `routerLink` para as rotas e `<router-outlet>`. Os módulos expostos exportam `App` (`tea-tracker/src/app/app.ts:11–13`; `sticky-notes/src/app/app.ts:11–13`), que renderiza o componente da feature (`<app-tea-tracker/>` e `<app-sticky-notes/>` na linha 1 de cada `src/app/app.html`). | forte |
| Código-fonte (fronteiras) | Busca por `../` em `*.ts`, `*.js` e `*.json` (exceto lockfiles): nenhuma ocorrência. Os imports são locais a cada projeto (por exemplo, `tea-tracker/src/app/app.ts:3`; `test-base/src/app/app.routes.ts:2`). O host acessa os remotes só via `loadRemoteModule`. | contexto |
| Build/deploy | Cada projeto tem builder `@angular-architects/native-federation:build` envolvendo `@angular/build:application` (esbuild) e seu `dev-server` (`test-base/angular.json:16–99`; `tea-tracker/angular.json:17`, `31`, `44`, `86`; `sticky-notes/angular.json:16–99`), com `browser: src/main.ts` e polyfill `es-module-shims`. Os scripts `ng serve`/`ng build` são próprios de cada `package.json` (`test-base/package.json:4–10`). | moderada |
| Tecnologia | Nos três lockfiles: `@angular-architects/native-federation` 21.0.4, `@angular/build` 21.0.5 e `@angular/core` 21.0.8 (`*/package-lock.json:264–265`, `994–995`, `1191–1192`). | contexto |
| Documentação | `README.md:91–208`: criação do remote `tea-tracker` com `ng g @angular-architects/native-federation:init --type remote --port 4222`. `README.md:288–331`: criação do host como `dynamic-host` na porta 4200. `README.md:336–357`: rotas com `loadRemoteModule`. `README.md:364–431`: manifesto e execução (`ng serve --port 4222`, `ng serve --port 4200`). O tutorial usa `src/assets/federation.manifest.json` (`README.md:366–395`), mas o código usa `public/federation.manifest.json` e `initFederation('federation.manifest.json')`, coerentes entre si. | moderada |

## Autoria e histórico

Clone não raso; 3 commits, nenhum merge, todos de `andreea <andreea.alexandra.lipan@gmail.com>` em 2026-01-14. A raiz `6e2d0ab` (“first commit”, 17:20) adiciona os três projetos, o README e as imagens do tutorial; `0a2cc14` e o SHA `7050669` (“update readme”, 18:05 e 18:09) só alteram `README.md` (`git log --no-renames --name-status`). Como host e remotes entram juntos, o histórico não registra evolução separada das unidades. Os metadados não indicam código de terceiros além dos scaffolds Angular e Native Federation descritos no tutorial. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades frontend no repositório, `test-base`, `tea-tracker` e `sticky-notes`, cada uma com entrada própria (`*/angular.json`, `browser: src/main.ts`). O manifesto do host referencia os dois remotes (`test-base/public/federation.manifest.json:1–4`). |
| Q2 | Yes | Cada unidade tem `package.json`, lockfile, `angular.json`, `federation.config.js`, porta e build próprios. Nenhum import de código-fonte entre elas (busca por `../` sem ocorrências); o host só usa `loadRemoteModule`. |
| Q3 | Yes | O host roteia e monta os remotes em seu `router-outlet` (`test-base/src/app/app.routes.ts:11–19`; `test-base/src/app/app.html:5–27`). |
| Q4 | Yes | Native Federation configurado nos dois lados, com nomes, chave `./App`, export `App` e portas coerentes (`test-base/public/federation.manifest.json:1–4`; `tea-tracker/federation.config.js:3–8`; `sticky-notes/federation.config.js:3–8`; `tea-tracker/angular.json:97`; `sticky-notes/angular.json:97`), inicializado (`test-base/src/main.ts:3`) e consumido em código (`test-base/src/app/app.routes.ts:14`, `18`). |
| Q5 | Yes | Q1–Q4 são Yes: cadeia host dinâmico → dois remotes completa e conectável. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “examples, templates, and proofs of concept that actually compose frontend units”, com `repo_type: example` (tutorial passo a passo; `README.md:84–88`). Tem a mesma abordagem de 059 (Native Federation) e a cadeia completa de 076/084/096/106/109.
- Diferentemente de 097/103/104, nomes, URLs, portas e exposes fecham. Diferentemente de 089/100, cada remote expõe seu componente de aplicação inteiro (`App`), montado como rota do host, e não um componente de apresentação isolado.
- `approaches: [native-federation]`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (`@angular/build:application` envolvido pelo builder Native Federation), seguindo a convenção de 059. `frontend_units: 3`. `unit_organization: monorepo`: projetos irmãos no mesmo repositório, sem ferramenta de workspace, como em 136.
- Não há decisão aberta: composição runtime por Native Federation, sem iframe, links entre aplicações ou pacotes em build time.

## Notas para análise

- **RQ2:** Native Federation (Angular 21) com host `dynamic-host` usando manifesto em `public/` e `loadRemoteModule` em rotas `loadComponent`. Os remotes expõem o componente raiz da aplicação.
- **RQ1:** o tutorial no README diverge do código em detalhe de caminho (`src/assets/` vs `public/`) e omite a porta do `sticky-notes`. Os artefatos versionados devem prevalecer sobre o texto.
- **Protocolo (busca):** o README contém literalmente as grafias singular e plural buscadas. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, três unidades, `native-federation` e `esbuild`; sem decisão aberta. Comparável final mais direto: 059 (Angular 21, Native Federation, esbuild, host e dois remotes, MFE-implemented com Q1–Q5 Yes); 076 também é exemplo com shell e remotes, mas está em `draft`. O caso difere de 059 por ser tutorial/example e não produção. O primeiro commit (`6e2d0ab`, 2026-01-14) introduz host e remotes juntos, sem evolução separada das unidades, e as divergências entre o texto do tutorial do README e o código do snapshot, já registradas, não alteram a classe. O README é anterior às buscas (último commit no próprio SHA, 2026-01-14).
