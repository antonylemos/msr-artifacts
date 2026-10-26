---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
url: https://github.com/Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 185 — Marcel-b-velop/vue-mf

## Contexto

“Vue Module Federation” (`README.md:1–11`), com README em alemão: monorepo pnpm de experimento com quatro projetos Vue 3 + Vite, ligados por `@originjs/vite-plugin-federation`.
- `host` mantém navegação, cabeçalho e rodapé e carrega as páginas como módulos remotos.
- `app-1` e `app-2` são remotos de páginas e formulários de login/registro.
- `lib` é um remoto com um diálogo `Confirm`, um `apiClient` e tipos compartilhados.

Há também uma API .NET e um IdentityServer em `Api/`. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:186` registra rank 185, ID 1101991974, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:186` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:21375` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:21381` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-11` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T23:21:18.809Z / 2026-10-08T16:16:23.699Z |

Metadados do hit:
- descrição “Vue Mf Example”, sem a frase;
- sem tópicos, linguagem HTML, `fork: false`, tamanho 2.628;
- criação em 2025-11-22T16:09:15Z, push em 2025-12-27T18:56:06Z.

O acerto vem de `README.md:1`, “# Vue Module Federation”, única ocorrência. A última alteração do README no histórico do SHA é `312d8f3` (2025-11-23), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 141 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há quatro projetos frontend (`host/`, `app-1/`, `app-2/`, `lib/`), cada um com `package.json` e `vite.config.ts`, um workspace pnpm na raiz (`pnpm-workspace.yaml:1–5`; `package.json:1–14`), o diretório `Api/` (.NET) e artefatos versionados de testes (`lib/playwright-report/`, `lib/test-results/`, 20 arquivos: 18 em `playwright-report/` e 2 em `test-results/`), além de `.DS_Store`. | contexto |
| Configuração (host) | `host/vite.config.ts:11–26`: `federation({ name: "host-app", remotes: { "remote-app1": "http://localhost:5174/assets/remoteEntry.js", "remote-app2": "…:5175/…", "remote-lib": "…:5177/…" }, shared: vue, pinia, primevue, axios })`. | forte |
| Configuração (remotos) | `app-1/vite.config.ts:11–27`: `exposes` `./App1` e `remotes` `remote-lib`. `app-2/vite.config.ts:11–30`: `exposes` `./App2`, `./Home`, `./LoginForm`, `./RegisterForm`, e `remotes` `remote-lib`; porta 5175 (`:40`). `lib/vite.config.ts:17–32`: `exposes` `./Confirm`, `./apiClient` e `./types`. Portas de preview: `app-1/package.json:10` (5174), `app-2/package.json:10` (5175), `lib/package.json:9` (5177). | forte |
| Código-fonte (consumo) | `host/src/main.ts:12–21`: `defineAsyncComponent(() => import("remote-app1/App1"))`, `remote-app2/App2` e `remote-lib/Confirm`, registrados como componentes globais. `host/src/views/Home.vue:1`: `<AppOne />` na rota `/`. `host/src/router/index.ts:7–8`: rotas `/login` e `/register` com `import('remote-app2/LoginForm')` e `RegisterForm`. `app-1/src/main.ts:8–11` e `app-1/src/composables/api.ts:1`: consumo de `remote-lib/apiClient` e `Confirm`. | forte |
| Código-fonte (fronteiras) | A busca por imports `../../` e `../<projeto>` no SHA não retorna nada. Entre projetos só há imports federados (`remote-*/…`) e declarações de módulo em `vite-env.d.ts`. | contexto |
| Documentação | `README.md:3–11`: objetivo de páginas carregadas como “Remote Module” pelo host. `README.md:20–56`: problemas resolvidos (compartilhamento de Vue, Pinia e PrimeVue; Tailwind; declarações de tipos). `README.md:58–62`: host, App1 e Lib funcionam localmente; comportamento em produção ainda não testado. | moderada |
| Build/CI | `.github/workflows/node.js.yml:1–34`: `pnpm install` e `pnpm build` do workspace e build/teste da API .NET. Cada projeto tem `vite build` próprio. | moderada |

## Autoria e histórico

Clone não raso. Há 29 commits alcançáveis a partir do SHA (4 merges; 52 em todos os refs), todos de Marcel Benders, sob três e-mails: `b-velop.com`, `outlook.de` e noreply.
- **Datas:** de 2025-11-22 (`9ab7627`, “Initial commit”) a 2025-11-30.
- **SHA:** `ed270d3`, “Merge pull request #3 from Marcel-b-velop/feature/wip”.
- **Fora do snapshot:** o branch `origin/feature/wip` tem commits posteriores (até 2025-12-27, por exemplo “Anmeldung usw”); o `pushed_at` corresponde a ele.

Nenhum blob histórico foi lido. O clone é parcial (`blob:none`): o `git log --name-status` de `host/` e `Api/` emite erros ao tentar obter objetos ausentes (`git cat-file` não os encontra), enquanto os de `app-1/`, `app-2/` e `lib/` completam; a reconstrução histórica de `host/` e `Api/` é limitada, sem afetar a árvore e o código do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Quatro unidades no repositório, referenciadas pelas configurações de composição (`host/vite.config.ts:15–19`; `app-1/vite.config.ts:18–20`; `app-2/vite.config.ts:21–23`). |
| Q2 | Yes | Cada unidade tem entrada, build e porta de preview próprias (`*/vite.config.ts`; `*/package.json`), sem imports de código-fonte entre elas. |
| Q3 | Yes | O host monta `App1` na rota `/` e os formulários de `app-2` em `/login` e `/register` (`host/src/views/Home.vue:1`; `host/src/router/index.ts:7–8`). |
| Q4 | Yes | Module Federation configurado e consumido no host e nos remotos (`host/src/main.ts:12–14`; `app-1/src/main.ts:8–11`). |
| Q5 | Yes | Q1–Q4 são Yes: host Vue com três remotos, um deles uma biblioteca compartilhada de componentes e serviços. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”.
- A cadeia está completa no snapshot, como em 076/084/096/106/109.
- **Code sharing:** a `lib` remota (diálogo, `apiClient`, tipos) tem caráter de compartilhamento de código, como na dúvida de 089/100. Mas a composição de aplicações não depende dela: o host monta `app-1` e as telas de `app-2` por rota.
- **Produção:** o README diz que só se testou localmente (`README.md:62`). As URLs são `localhost`, mas a composição está configurada e consumida.
- **Campos:** `approaches: [module-federation]`, `ui_technologies: [vue]`, `build_tools: [vite]`, `frontend_units: 4` (host, app-1, app-2, lib), `unit_organization: monorepo`, `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** Module Federation em Vite com `@originjs/vite-plugin-federation`. Usa `shared` com `generate: false, import: false` nos remotos para delegar Vue, Pinia, PrimeVue e axios ao host, e um remoto “lib” como canal de componentes e serviços compartilhados em runtime.
- **RQ3:** o README registra problemas práticos de integração: compartilhamento de PrimeVue com `version`/`requiredVersion`, CSS do Tailwind que exige `cssCodeSplit: false`, declarações de módulos remotos.
- **Protocolo (snapshot):** a evolução posterior (autenticação, “Wichteln”) está em `feature/wip`, fora do snapshot.
- **Protocolo (busca):** entrada só pela consulta `"module federation"`. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, Vue/Vite, quatro unidades e `monorepo`; sem decisão aberta (`draft`). Host (`host-app`) e remotes (`remote-app1`, `remote-app2`, `remote-lib`) têm nomes, exposições e URLs alinhados (`host/vite.config.ts:11–19`; `app-1/vite.config.ts:11–20`; `app-2/vite.config.ts:11–23,33–47`; `lib/vite.config.ts:17–32`), e a cadeia de composição é observável no código. Correções adotadas, verificadas: 20 artefatos de teste versionados (e não 18); citação do workflow ampliada a `:1–34`; objetos ausentes no clone parcial. O README diz que só foi testado localmente (`README.md:62`) e está defasado sobre `App2`, o que não afeta a classe. Comparáveis finais: 017 e 046.
