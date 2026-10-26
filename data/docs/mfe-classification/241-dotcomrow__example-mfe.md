---
schema: 1
id: 1175564173
full_name: dotcomrow/example-mfe
url: https://github.com/dotcomrow/example-mfe
commit: d20a389c33fd7bbbe6929cfc216da3af7717dd6d
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: [runtime-script]
ui_technologies: []
build_tools: [esbuild]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 241 — dotcomrow/example-mfe

## Contexto

“Example MFE (Suncoast Contract)” (`README.md:1–11`): pacote de micro-frontend de exemplo que segue o contrato de módulos de UI “Suncoast” (`module.definition.json`) e inclui um adaptador para o contrato `CmsModuleDefinition` do shell. Ele é compilado num único arquivo de navegador (`dist/example-mfe.js`, IIFE via esbuild) e traz dados de seed para registrar o módulo no CMS Directus (`cms_modules`).

O módulo (`mfe-example-chat`) é uma UI de chat em TypeScript puro, com DOM manual e GraphQL HTTP/WS. Ele se registra em `globalThis.SuncoastMfeRegistry` com `mount`/`unmount` e é montado pelo shell Suncoast, que não está no repositório. Há uma página `preview/` local para testar a montagem. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:242` registra rank 241, ID 1175564173, status `cloned`, branch `prod` e o commit do front matter, que é o HEAD do clone e de `origin/prod`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:242` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:26052` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:26059` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-03` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:33:56.858Z / 2026-10-08T15:58:48.643Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:02:04.341Z / 2026-10-08T16:08:38.341Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-03-01..2026-03-31`.

Metadados do hit:
- descrição “Suncoast Systems Example MFE”;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 141;
- criação em 2026-03-07T22:00:23Z, push em 2026-09-13T02:35:19Z.

O acerto vem de `README.md:3`, “Example micro-frontend package that:”. A busca de frase trata o hífen como separador. O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `44955f4` (2026-05-24), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

Nas duas rodadas, a mesma conta tem outro candidato, `dotcomrow/nifi-flow-mfe` (ID 1237843855; `data/discovery/mfe-round-002/candidates.csv`), fora da amostra (`sample.csv:242` é o único da conta) e não inspecionado.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 31 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único pacote: `src/` (módulo, contratos, adaptador do host), `preview/` (página local de teste), `scripts/` (build, dev, publicação no registro e no catálogo, mapas de fonte), `directus/` (seeds), `module.definition.json`, workflows de CI e publicação. | contexto |
| Contrato com o host | `src/index.ts:48–63`: registra em `globalThis.SuncoastMfeRegistry[MODULE_KEY]` as funções `createModule`, `cmsModuleDefinition`, `mount` e outras. `src/host-adapter.ts:38–86`: `createCmsModuleDefinition()` com `mount(context)` que monta no `context.element`, desmonta no `abort` e emite `cms-module-event`. `src/contracts.ts:81–89`: ciclo de vida `init`/`mount`/`update`/`unmount`. `README.md:101–106`: hospedar `dist/example-mfe.js` e registrar o módulo no Directus para o shell carregá-lo. | forte |
| Build/deploy | `scripts/build.mjs:42–59`: esbuild com `format: "iife"`, `globalName: "ExampleMfeBundle"`, saída `dist/example-mfe.js`. `package.json:8–21`: scripts de build, publicação no registro de módulos e notificação do catálogo. `.github/workflows/publish.yml:1–184` (build, preparação e download) e `:233–239` (publicação efetiva), em um workflow de 252 linhas: build e publicação no registro de módulos (alvos preview/produção). | forte |
| Host | O shell Suncoast que lê o registro e monta o módulo não está no snapshot. `preview/main.ts:1–3`, `486` importa `../src/host-adapter` e chama `mount` como harness de teste do mesmo pacote, não como host independente. | ambígua |
| Código-fonte | `src/module.ts:1–3`, `1676–1796`: UI em DOM manual (`document.createElement`), cliente `graphql-ws`; sem framework de UI. | contexto |

## Autoria e histórico

Clone não raso; 53 commits ancestrais ao SHA, nenhum merge (54 em todas as refs, incluindo o do Dependabot). Os 53 são de Chris Lyons (noreply, conta `mephmanx`), e o commit do bot está fora do `prod`. A raiz é de 2026-03-07; o SHA `d20a389` (2026-09-04, “Publish OpenObserve source maps”) é o HEAD de `prod`, o branch padrão. O branch do Dependabot tem 1 commit fora de `prod` e não foi considerado. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects $SHA --missing=print` identifica 135 objetos históricos ausentes; nenhum foi buscado, e os blobs atuais necessários estavam disponíveis.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend; o módulo só se registra para um host externo, sem referenciar outras unidades. |
| Q2 | Yes | Entrada, build e publicação próprios (`scripts/build.mjs`; `.github/workflows/publish.yml`). |
| Q3 | Undetermined | O shell Suncoast não é observável; o README e o contrato descrevem a montagem por ele. |
| Q4 | Undetermined | Mecanismo de carga por script com registro global e ciclo de vida preparado do lado do módulo; a conexão depende do shell ausente. |
| Q5 | No | Uma unidade preparada para composição por host externo não observável. |

## Motivo

- `MFE-unit` pela regra “single frontend unit explicitly prepared to be composed by an external host … but the composing host is not observable”, com o vetor de exceção de 001/050/069/004/058. O preparo é explícito: registro global, `mount`/`unmount` e bundle IIFE.
- **Mecanismo:** é `runtime-script`, o slug do template com primeiro caso em 002 (script carregado em runtime com API de montagem num global), aqui sem Module Federation.
- **Plataforma:** o host é um shell próprio do ecossistema “Suncoast” (CMS Directus, registro e catálogo de módulos), não de terceiros. Fica a mesma dúvida de 161/189/222: plataforma de extensões de primeira parte ou arquitetura MFE do autor. Daí o `status: review`.
- **Campos:** `ui_technologies: []` (DOM manual, sem framework), `build_tools: [esbuild]` (como 059), `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: template` (“Example MFE”, com guias de integração para novos módulos, `README.md:1–11`; `MFE_AUTH_INTEGRATION_REFERENCE.md`).

## Notas para análise

- **RQ2:** micro-frontend sem framework, entregue como IIFE que se registra num registro global, configurado por CMS (Directus) e publicado em registro de módulos, com rastreabilidade de build e mapas de fonte no OpenObserve.
- **Protocolo (amostra):** outro repositório MFE da mesma conta está nas rodadas, fora da amostra.
- **Protocolo (busca):** o hit plural não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002). O branch padrão é `prod`.

## Ponto para revisão conjunta

1. **Host de primeira parte:** um módulo preparado para o shell de um ecossistema próprio do autor (Suncoast), carregado por script e registro global, conta como MFE-unit ou segue 037 (plugin de plataforma)? É a mesma pergunta de 161/189/222.

Não se propõe regra nova. Até a decisão, preservar `MFE-unit`/`review`.
- **Contribuição da revisão independente (Lupa):** concordância com MFE-unit (Q1 No, Q2 Yes, Q3/Q4 Undetermined, Q5 No), `runtime-script`, esbuild, uma unidade e `template`. A regra de exceção abrange uma unidade explicitamente preparada para host externo não observável, e o contrato é concreto; a propriedade do shell, por si só, não justifica uma nova exclusão. A revisora recomenda resolver favoravelmente a dúvida de primeira parte, e que o `review` só continue se os responsáveis mantiverem expressamente essa questão metodológica em 161, 189 e 222. O final 050 tem o mesmo vetor para um remoto de UI com host ausente; 037 é Non-MFE por decisão de exclusão de widget de configuração de plataforma de terceiros, e ser módulo de CMS ou usar a plataforma do mesmo ecossistema não demonstra, sozinho, essa condição; "host próprio do autor" também não está provado pela marca Suncoast. Correções adotadas: 53 ancestrais (54 em todas as refs), a autoria do bot fora de `prod`, 135 objetos ausentes, a referência da publicação e a precisão de `mount`/`unmount`.
