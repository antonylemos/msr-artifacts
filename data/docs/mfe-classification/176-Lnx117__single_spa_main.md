---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
url: https://github.com/Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [single-spa]
ui_technologies: [vanilla]
build_tools: [vite]
frontend_units: 3
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 176 — Lnx117/single_spa_main

## Contexto

Root config single-spa em Vite (`vite-plugin-single-spa`, `type: 'root'`) que registra dois microfrontends externos, `menu` e `base`, carregados por `import()` de URLs vindas de variáveis de ambiente (`src/main.ts:1–29`; `vite.config.ts:12–16`). Os valores dessas variáveis estão versionados em `.envtest`, apontando para dev servers Vite em `localhost:9083` e `localhost:9081` (`.envtest:1–11`). A descrição do repositório é “Оркестратор main для single-spa приложения”, isto é, orquestrador main para aplicação single-spa. Os microfrontends não estão no repositório. Não há README. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:177` registra rank 176, ID 1181945275, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:177` registra a estratégia `technology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:26519` e `data/discovery/mfe-round-002/candidates.csv:26526`, ambos com `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2026-Q1` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-03-31` | 2026-10-07T23:34:35.452Z / 2026-10-08T16:21:19.095Z |

Metadados do hit:
- descrição “Оркестратор main  для single-spa приложения”, que contém “single-spa” literalmente;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 13;
- criação em 2026-03-14T20:50:39Z, push em 2026-03-29T18:47:46Z.

**Origem do acerto.** Não há README no SHA; o acerto vem da descrição. O SHA (2026-03-14) é anterior às coletas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 6 entradas, todas arquivos regulares `100644` (`.envtest`, `index.html`, `package-lock.json`, `package.json`, `src/main.ts`, `vite.config.ts`); zero symlinks e zero gitlinks. Só o root config está no repositório. | contexto |
| Código-fonte (registro) | `src/main.ts:13–29`: `registerApplication({ name: 'menu', app: () => import(env.VITE_MENU), activeWhen: '/' })`, idem para `base` com `env.VITE_BASE`, e `start()`. `index.html:10–20`: contêineres `single-spa-application:menu` (no `nav`) e `single-spa-application:base` (no `main`) e carga de `/src/main.ts`. | forte |
| Configuração (localização das unidades) | `.envtest:1–11`: comentários explicam que cada microfrontend é “отдельный Vite dev-сервер на своём порту”, isto é, um dev server Vite próprio em sua porta, e que `main.ts` faz `import()` dos lifecycles (`bootstrap`, `mount`, `unmount`). Valores: `VITE_MENU=http://localhost:9083/src/index.ts` e `VITE_BASE=http://localhost:9081/src/index.ts`, com exemplo de URL de CDN para build (`:5`). O arquivo se chama `.envtest`, nome que o Vite não carrega automaticamente; `src/main.ts:5–6` fala em `.env`/`.env.local`. | moderada |
| Configuração / Build | `vite.config.ts:12–16`: `vitePluginSingleSpa({ type: 'root', cssStrategy: 'multiMife' })`. `:17–22`: porta 9080. `package.json:15–21`: `single-spa` ^6.0.3, `vite` ^7.3.1, `vite-plugin-single-spa` ^1.1.0. | forte |
| Código-fonte (fronteiras) | Só há `src/main.ts`, sem imports relativos. As unidades são ligadas apenas por URL. | contexto |

## Autoria e histórico

Clone não raso; 3 commits, nenhum merge, todos de `Vlad <ostriakov2011@yandex.ru>`. O SHA `112c73b` (2026-03-14, “init commit”) é o único em `main`. Os branches `origin/main_2` (`3f81751`, “main + eventBus”) e `origin/main_3` (`0edafb0`, “add centarl store”, 2026-03-29) descendem linearmente dele e acrescentam `src/utils/eventBus.js` e `src/api/store.ts`. O `pushed_at` corresponde a `main_3`. Pelo procedimento, só o commit de `clones.csv` foi considerado. O `git diff` contra `main_3` não completou por blob ausente no clone parcial (`c0ca3def…`), que não foi buscado; o clone ficou inalterado.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades: o root config e os microfrontends externos `menu` e `base`, explicitamente registrados (`src/main.ts:13–25`). |
| Q2 | Yes | O root tem build próprio (`package.json:6–10`). As unidades externas têm servidores e endereços próprios (`.envtest:8`, `11`), sem import de código-fonte entre elas. |
| Q3 | Yes | O root registra, ativa e monta as duas aplicações nos contêineres da página (`src/main.ts:13–29`; `index.html:12`, `17`). |
| Q4 | Yes | single-spa está configurado como root (`vite-plugin-single-spa` `type: 'root'`) e executa `registerApplication` e `start()` (`src/main.ts:13–29`). As URLs e o contrato de lifecycle dos remotos estão declarados e documentados em `.envtest:1–11`; o nome não padrão do arquivo é uma ressalva de execução local, não ausência da lógica de composição. |
| Q5 | Yes | Não há resposta No; Q1–Q4 demonstram unidades independentes e composição por single-spa. |

## Motivo

- Classificado como `MFE-implemented`: o root configura e inicia a composição single-spa de dois microfrontends independentes. Os valores e o contrato dos remotos estão versionados e explicitamente documentados.
- `.envtest` exigir renomeação ou carregamento explícito é uma ressalva operacional, mas não descaracteriza a lógica de composição presente no snapshot.
- Não é MFE-unit (o root está presente e registra as unidades), nem code sharing (089/100), nem plataforma de terceiros (102/074/080).
- `approaches: [single-spa]`. `ui_technologies: [vanilla]`: o root é TypeScript/HTML sem biblioteca de UI declarada; as tecnologias das unidades externas não são observáveis. `build_tools: [vite]`, `frontend_units: 3`, `unit_organization: multi-repo`, `repo_type: example`.

## Notas para análise

- **RQ2:** root config com `vite-plugin-single-spa` (`cssStrategy: 'multiMife'`) e `import()` de módulos ESM servidos por dev servers Vite de cada microfrontend, sem import map.
- **RQ3:** a localização das unidades vive num arquivo de ambiente versionado com nome não padrão. Os microfrontends estão em outros repositórios, não consultados.
- **Protocolo (snapshot):** o branch padrão parou no commit inicial; a evolução (event bus, store central) está em `main_2`/`main_3`, fora do snapshot.
- **Protocolo (busca/elegibilidade):** entrada pela descrição, com elegibilidade `unknown` nas duas rodadas, sem que a razão tenha sido examinada aqui.

## Decisão registrada

Promovido para `MFE-implemented`. O repositório contém o root-config que registra e inicia `menu` e `base` como aplicações independentes, com localizações e lifecycles externos declarados. A necessidade de carregar ou renomear `.envtest` é uma ressalva operacional e não invalida a arquitetura de composição observada.
