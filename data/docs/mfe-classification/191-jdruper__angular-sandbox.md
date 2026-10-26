---
schema: 1
id: 1012591256
full_name: jdruper/angular-sandbox
url: https://github.com/jdruper/angular-sandbox
commit: ed38451acdedc80c019cbcbf84a61bc384605ee0
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 191 — jdruper/angular-sandbox

## Contexto

“Angular Sandbox Pattern Template” (`README.md:1–7`): template Angular 19 de uma única aplicação que demonstra o “Sandbox Pattern”, com serviços que isolam a lógica de negócio dos componentes. Inclui suporte a PWA e um serviço de sincronização. “Micro Frontend Ready” aparece como qualidade de escalabilidade declarada (`README.md:312`), mas o repositório não configura nenhuma composição. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:192` registra rank 191, ID 1012591256, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:192` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:15913` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:15917` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-07` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:24:04.410Z / 2026-10-08T15:55:14.653Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:55:39.933Z / 2026-10-08T16:06:16.274Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Metadados do hit:
- descrição “A production-ready Angular 19 starter template demonstrating the **Sandbox Pattern**…”, sem os termos;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 218;
- criação em 2025-07-02T15:07:24Z, push em 2025-07-10T20:40:09Z.

O acerto vem de `README.md:312`, “- **Micro Frontend Ready**: Each feature is self-contained”, única ocorrência. O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `50277fe` (2025-07-02), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 65 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Angular (`angular.json`, `src/app` com `core/`, `features/dashboard/`, `sandbox/` e `shared/`) e documentação de arquitetura em `docs/`. | contrária |
| Configuração / Build | `angular.json:25–29`: builder `@angular/build:application`, uma entrada `src/main.ts`. `package.json:30–45`: Angular 19 e service worker, sem dependência de federação, single-spa ou Native Federation. `src/app/app.routes.ts:3`: rotas vazias. | contrária |
| Documentação | `README.md:1–7`: padrão Sandbox numa aplicação. `README.md:310–314`: “Micro Frontend Ready” como propriedade das features autocontidas, ao lado de “Lazy Loading” e “Service Isolation”. É qualidade alegada, não composição implementada. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA (exceto `package-lock.json`) por `micro.?front`, `federation`, `remoteEntry` e `single-spa`: só `README.md:312`. | ausente |

## Autoria e histórico

Clone não raso; 3 commits, nenhum merge, todos de Jose Beita `<jdruper@gmail.com>`: `c8842c6` (2025-07-02, “Basic boilerplate created”), `50277fe` (2025-07-02, “Sandbox pattern creation”) e o SHA `ed38451` (2025-07-10, “feat: pwa support and sync service”). Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git cat-file` confirma que o objeto `7919c63…` não está disponível localmente; comandos que dependem dele falham sob `GIT_NO_LAZY_FETCH=1`, de modo que a atribuição exaustiva de cada arquivo histórico fica limitada ao que os objetos locais permitem.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; as “features” são pastas internas, não unidades com entrada própria. Nenhuma configuração de composição. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada; há um único build (`angular.json:25–29`). |
| Q3 | No | Não há host compondo unidades. |
| Q4 | No | Nenhum mecanismo de composição configurado (busca registrada). |
| Q5 | No | Q1–Q4 são No: template de aplicação Angular que se declara “Micro Frontend Ready”. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” e a “repositories mentioning micro-frontends without implementing them”: a prontidão para micro-frontends é afirmação de arquitetura modular, sem composição.
- Há uma aplicação real, por isso `frontend_units: 1` e `single-unit`. `ui_technologies: [angular]`, `build_tools: []` (o CLI do Angular encapsula o bundler). `repo_type: template` (“starter template”, `README.md:3`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “Micro Frontend Ready” como qualidade de um template monolítico modular.
- **Protocolo (busca):** o hit plural `"micro frontends"` não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `template`, `[angular]`, uma unidade e `single-unit`; sem decisão aberta (`draft`). Um único projeto Angular (entrada `src/main.ts`) em 65 entradas regulares. Ressalva de completude histórica: o objeto ausente do clone parcial impede comprovar integralmente alguns diffs e `name-status` antigos, sem afetar a leitura dos artefatos citados no SHA nem a conclusão.
