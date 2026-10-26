---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
url: https://github.com/marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [single-spa]
ui_technologies: [vue]
build_tools: [vite, webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Contexto

Prova de conceito single-spa com Vue 3 e Vite, em quatro pastas independentes, sem README na raiz:
- `content-app` e `topbar-app`: micro-frontends que exportam os ciclos de vida `bootstrap`/`mount`/`unmount` via `single-spa-vue`;
- `root-app`: “custom root” em Vue que monta os dois como parcels single-spa (`mountRootParcel`), resolvidos por import map nativo;
- `root-classic`: root config single-spa clássica (webpack, `single-spa-layout`, import map injetado) que registra os mesmos dois apps.

O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:255` registra rank 254, ID 1131085284, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:255` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:23091` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:23098` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada, todos do endpoint `code` e da consulta `technology-single-spa-package-code`: `"single-spa" filename:package.json`.

| Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|
| `…#size:500..599` | `content-app/package.json` | 2026-10-07T22:14:11.747Z / 2026-10-08T15:57:41.924Z |
| `…#size:500..599` | `root-app/package.json` | 2026-10-07T22:14:11.747Z / 2026-10-08T15:57:41.924Z |
| `…#size:500..599` | `topbar-app/package.json` | 2026-10-07T22:14:11.747Z / 2026-10-08T15:57:41.924Z |
| `…#size:1450..1599` | `root-classic/package.json` | 2026-10-07T22:16:50.452Z / 2026-10-08T16:00:17.579Z |

Os arquivos declaram `single-spa`:
- `content-app/package.json:12` e `topbar-app/package.json:12`, com `single-spa-vue`;
- `root-app/package.json:12–14`, com `single-spa-vue` e `vite-plugin-single-spa`;
- `root-classic/package.json:45–47`, com `single-spa-layout`.

Os metadados do hit de código trazem apenas o objeto de repositório resumido (ID, nome, dono, `description` nula, `fork` falso, URLs), sem campos de enriquecimento; não são um objeto vazio. Os READMEs das pastas são o template “Vue 3 + TypeScript + Vite” (`root-app/README.md:1–3`); a entrada é só por código.

Nas duas rodadas, a mesma conta tem outro candidato, `marcos-roberto-dev/poc-web-components` (ID 1068467110), fora da amostra e não inspecionado.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 72 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Quatro projetos (`content-app`, `topbar-app`, `root-app`, `root-classic`), cada um com `package.json`, lockfile e configuração de build própria (Vite nos três primeiros, webpack no `root-classic`). Não há workspace na raiz. | contexto |
| Remotos | `content-app/src/main.ts:8–22` e `topbar-app/src/main.ts:8–22`: `singleSpaVue({ createApp, appOptions })` e exportação de `bootstrap`, `mount` e `unmount`. `topbar-app/vite.config.ts:8–18`: build em formato `system` com saída `app.js`. | forte |
| Host customizado | `root-app/index.html:11–18`: `<script type="importmap">` com `@org/content-app` → `http://127.0.0.1:5174/src/main.ts` e `@org/header-app` → `http://127.0.0.1:5175/src/main.ts`; SystemJS e `import-map-overrides` (`:21`, `33–41`). `root-app/src/App.vue:6–9`: dois `ParcelWrapper`. `root-app/src/components/ParcelWrapper.vue:10–46`: carrega o módulo por `dynamicImport(appName)` (`root-app/src/utils/dynamicImport.ts:10–38`, `import()` nativo com fallback `System.import`) e monta com `Parcel` de `single-spa-vue/parcel` e `mountRootParcel`. | forte |
| Host clássico | `root-classic/src/org-root-config.ts:1–20`: `constructRoutes`/`constructApplications` a partir de `microfrontend-layout.html` e `registerApplication` + `start`. `root-classic/src/microfrontend-layout.html:20–25`: rota padrão com `@org/topbar-app` e `@org/content-app`. `root-classic/src/index.ejs:29–38`: import map local com os mesmos apps em 5174/5175. | forte |
| Código-fonte (fronteiras) | Não há import de código entre projetos. `content-app/tsconfig.app.json:15` e `root-app/tsconfig.app.json:15` incluem arquivos de declaração de tipos do outro projeto, alguns inexistentes no snapshot (`content-app/src/@types/…`); é tipagem, não código executado. `root-app/src/modules/Topbar/` tem uma cópia local do topbar, cujo import está comentado (`root-app/src/App.vue:3`, `7`). | contexto |
| Configuração (inconsistências) | O nome do topbar varia entre hosts (`@org/header-app` no `root-app`, `@org/topbar-app` no `root-classic`). As portas 5174/5175 não estão fixadas nos `vite.config.ts` dos remotos e dependem da ordem de inicialização. `root-app/mfe-app.json:1–7` lista outra porta (5173) para o content. | ambígua |

## Autoria e histórico

Clone não raso; 4 commits lineares, nenhum merge, de Marcos Roberto em 2026-01-09:
- `546aa27` (“tada: start poc project MFE”, 67 arquivos), com e-mail pessoal;
- `0cccd59`, `f2f2494` e o SHA `6ae6565`, com e-mail corporativo, sobre o componente topbar e formatação.

Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects $SHA --missing=print` enumera 11 objetos históricos ausentes; a detecção de renames falha por depender de blob histórico ausente, e os logs por pasta foram repetidos com `--no-renames`. Os blobs atuais usados como evidência estavam acessíveis.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Quatro unidades no repositório; os remotos são referenciados pelos import maps e pelo layout dos hosts (`root-app/index.html:11–18`; `root-classic/src/microfrontend-layout.html:20–25`). |
| Q2 | Yes | Cada projeto tem `package.json`, lockfile, configuração de build e servidor próprios, sem imports de código entre eles. |
| Q3 | Yes | Os hosts montam os remotos: parcels no `root-app` (`App.vue:6–9`) e aplicações registradas no `root-classic` (`org-root-config.ts:10–20`). |
| Q4 | Yes | single-spa com import maps: ciclos de vida exportados nos remotos e montagem por `mountRootParcel`/`registerApplication`. |
| Q5 | Yes | Q1–Q4 são Yes: dois remotos single-spa compostos por dois hosts alternativos. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “single-spa root configuration together with its applications” e a “examples… that actually compose frontend units”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- As inconsistências de nome e porta entre os hosts são próprias de uma PoC em andamento, e cada host tem seu import map coerente com o próprio layout, o que demonstra composição implementada em desenvolvimento; a execução dos dois hosts não foi comprovada, nem há cadeia de produção completa.
- `approaches: [single-spa]`, com import maps como mecanismo de resolução, como nos outros casos single-spa. `ui_technologies: [vue]`. `build_tools: [vite, webpack]` (Vite nos apps Vue, webpack na root config). `frontend_units: 4` (dois hosts e dois remotos), `unit_organization: monorepo`, `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** compara um root single-spa customizado em Vue, com parcels resolvidos por import map nativo e fallback SystemJS, com a root config clássica do `create-single-spa`, com `single-spa-layout` e import map injector.
- **Protocolo (busca):** entrada só por busca de código nos quatro `package.json`. A elegibilidade muda de `unknown` (001) para `pass` (002). O branch padrão é `master`.
- **Contribuição da revisão independente (Lupa):** concordância com MFE-implemented, Q1–Q5 Yes, quatro projetos frontend, `monorepo`, Vue, Vite/webpack e `single-spa`; sem decisão aberta (`draft`). Diverge da garantia de que as inconsistências não impedem a composição nos dois hosts: os fontes demonstram composição implementada em desenvolvimento, sem comprovar a execução de ambos nem uma cadeia de produção. Os remotos deixam `createApp(App).mount('#app')` comentado e apenas exportam lifecycles, então não têm modo standalone ativo. Há dependência cruzada de tipagem (`content-app` inclui os shims de `root-app`; `root-app` inclui caminhos ausentes em `content-app/src/@types`), que limita o isolamento de typecheck do `content-app` fora do monorepo, mas não é importação em runtime, e `vue-tsc` não foi executado. O mapa alternativo `mfe-app.json:1–7` (content em 5173, `vue.global.js`) não é importado pela entrada ativa inspecionada; o `vite.config.ts:8–18` do topbar (formato `system`, entry `app.js`) não é a URL ESM de desenvolvimento dos mapas ativos. O e-mail pessoal da raiz e os corporativos dos demais commits não provam dois autores humanos. Q2, Q4 e Q5 devem citar as evidências e registrar condições de porta, formato e produção.
