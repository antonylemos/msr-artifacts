---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
url: https://github.com/JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [iframe]
ui_technologies: [vue, react, angular]
build_tools: [vite, esbuild]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 321 — JandrySan/becas-uleam

## Contexto

Projeto acadêmico integrado (“Proyecto integrado Demo Day”, `README.md:1`) para o fluxo de bolsas de uma universidade: uma contenedora vanilla-TS faz o login único e carrega, por `<iframe>`, três módulos em frameworks diferentes — Vue (`1verificador-vue/`, elegibilidade), React (`2postulacion-react/`, postulação) e Angular (`3seguimiento-angular/`, acompanhamento) —, cada um atribuído a um integrante da equipe (`README.md:5–10`, `82–88`). O README afirma ter evitado Module Federation em favor de iframes sob o mesmo domínio (`README.md:94`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:322` registra rank 321, ID 1294611998, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:322` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:33178` (`technology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:33186` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-07` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-07-31` | 2026-10-07T23:29:11.347Z / 2026-10-08T16:19:00.527Z |

Metadados do hit: descrição nula, sem tópicos, linguagem TypeScript, sem licença, `fork: false`, tamanho 1509, criação em 2026-07-09T04:02:23Z, push em 2026-07-10T16:49:02Z, homepage em Vercel.

O acerto vem da única ocorrência do termo no README, uma negação: `README.md:94` (“…integrar aplicaciones hechas con frameworks distintos sin usar herramientas complejas como module federation”). A última alteração do README é `997197b` (2026-07-09), anterior às coletas de 7 e 8 de outubro de 2026; o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 108 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Contenedora na raiz (`index.html`, `src/main.ts`, `package.json`, `vite.config` implícito do Vite), três módulos com `package.json` e entrada próprios, workspace pnpm (`pnpm-workspace.yaml:1–4`; `package.json:7–11`). `1verificador-vue/verificador/` é um scaffold Vue aninhado (`verificador/src/main.ts:1–5`), fora do workspace e do build integrado. `3seguimiento-angular/.angular/cache/` versiona cache do Angular CLI. | contexto |
| Código-fonte (contenedora) | `index.html:23–27`: abas com `data-src` `/vue/`, `/react/` e `/angular/#/seguimiento`; `index.html:61`: `<iframe id="moduleFrame">`. `src/main.ts:87–97`: troca `frame.src` conforme a aba; `:24–34`: em desenvolvimento usa `localhost:5173/vue/`, `5174/react/` e `4200/#/seguimiento`; `:120–130`: habilita módulos por papel (administrador só acompanhamento). | moderada |
| Código-fonte (contrato entre janelas) | Contenedora → módulos: `src/main.ts:75–85` envia `BECAS_PORTAL_STATE` (sessão, token, usuário) por `postMessage`; módulos → contenedora: `src/main.ts:189–209` trata `BECAS_DATOS_ESTUDIANTE`, pedidos de navegação (`modulo: 'postulacion'`/`'seguimiento'`) e sinais `BECAS_*_READY`. Lados dos módulos: `1verificador-vue/src/views/HomeView.vue:92–103` (dados do estudante e pedido de navegação); `2postulacion-react/src/context/PostulacionContext.tsx:56–60`, `69` e `src/pages/VistaPrevia.tsx:99`; `3seguimiento-angular/src/app/app.component.ts:17–31`. | moderada |
| Configuração (módulos) | Base de publicação coerente com as subpastas da contenedora: `1verificador-vue/vite.config.ts:4–7` (`base: '/vue/'`) e `src/main.ts:15–18` (hash history); `2postulacion-react/vite.config.ts:4–7` (`base: '/react/'`) e `src/main.tsx:11` (`HashRouter`); `3seguimiento-angular/package.json:7` (`ng build --base-href /angular/`) e `src/main.ts:14–16` (`withHashLocation`). | moderada |
| Build/deploy | `package.json:14`: `start` sobe contenedora e módulos em portas separadas; `:17`: `build` compila a contenedora e cada módulo separadamente e `scripts/build-integrado.mjs:14–19` copia os `dist` para `dist/vue`, `dist/react` e `dist/angular`; `vercel.json:2–6`: um único deploy estático. `scripts/generar-angular-env.mjs:63–69` gera o ambiente do Angular a partir de variáveis da raiz. | moderada |
| Código-fonte (fronteiras) | Varredura de todos os especificadores relativos (61) em `*.ts`, `*.tsx`, `*.vue`, `*.mjs`, `*.js` e `*.css` (exceto lockfile e cache do Angular), resolvidos contra a raiz de cada projeto: nenhum sai do projeto de origem. Os módulos não importam código da contenedora nem uns dos outros; cada um tem seu próprio cliente Supabase (`src/services/supabase.ts` em cada pasta) e o estado comum passa por `localStorage` e mensagens. | forte |
| Tecnologia / Configuração (busca) | `git grep -i` no SHA, exceto lockfile e cache do Angular, por `federation`, `single.?spa`, `import.?map`, `micro.?front` e `qiankun`: só a negação de `README.md:94`. | ausente |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 10 commits alcançáveis (10 em todos os refs), nenhum merge, de 2026-07-08 a 2026-07-10. Autoria por metadados: `JandrySan` (8 commits, e-mail noreply) e `remanCO Skill Issue <alavajg@gmail.com>` (2 commits, `997197b` e `9796f8d`). A raiz `2f53246` (“estructura”) já adiciona a contenedora e os três módulos; os commits seguintes ajustam Supabase, workspace pnpm, Vercel e o ambiente do Angular. O README atribui cada módulo a um integrante (`README.md:84–88`, ainda com marcadores “Integrante 1–3”), mas os metadados mostram só duas identidades e não permitem separar a autoria por módulo. `git rev-list --objects $SHA --missing=print` identifica 47 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Contenedora e três módulos frontend no repositório, referenciados pela contenedora (`index.html:23–27`). |
| Q2 | Yes | Entrada, build e porta de desenvolvimento próprios por módulo (`package.json:14`, `17`; configs de cada pasta) e nenhum import de código-fonte entre eles; o deploy é único, mas os builds são separados e só copiados (`scripts/build-integrado.mjs:14–19`). |
| Q3 | Yes | A contenedora carrega e alterna os módulos em área comum, com login único e navegação por abas e por mensagens (`src/main.ts:87–97`, `189–209`). |
| Q4 | Yes | A contenedora carrega os módulos por `<iframe>` em área comum e mantém um contrato bidirecional por `postMessage`, com bases de rota e builds coerentes (`src/main.ts:75–97`, `189–209`). |
| Q5 | Yes | Q1–Q4 demonstram módulos independentes compostos por uma contenedora comum. |

## Motivo

- Classificado como `MFE-implemented`: a contenedora compõe três módulos independentes por iframe, com login e navegação compartilhados e troca bidirecional de mensagens.
- Não é `MFE-unit`: a contenedora está no snapshot. Não há code sharing (089/100) nem unidade de terceiros (102/074/080).
- `frontend_units: 4` (contenedora e três módulos; não conta o scaffold `1verificador-vue/verificador/`), `approaches: [iframe]`, `ui_technologies: [vue, react, angular]` (a contenedora é TypeScript sem framework), `build_tools: [vite, esbuild]` (Vite na contenedora, no Vue e no React; builder `application` do Angular, `3seguimiento-angular/angular.json:14`), `repo_type: example` (projeto acadêmico de Demo Day).

## Notas para análise

- **RQ1 (sinais enganosos):** entrou pela busca `"module federation"` por uma frase que nega o uso de Module Federation (`README.md:94`).
- **RQ2:** composição por iframe com contrato de mensagens tipadas (`BECAS_PORTAL_STATE`, `BECAS_*_READY`, pedidos de navegação), sessão compartilhada por `localStorage` no mesmo domínio, hash routing em subpastas e build integrado em um único `dist` estático.
- **RQ3:** módulos atribuídos por framework a integrantes distintos (`README.md:84–88`, `92`), como justificativa explícita de independência de equipes.
- **Protocolo:** `3seguimiento-angular/src/environments/environment.generated.ts` está versionado, embora o gerador diga que não deve ser enviado ao repositório (`scripts/generar-angular-env.mjs:76–77`); seu conteúdo não é reproduzido aqui.

## Decisão registrada

Promovido para `MFE-implemented`. A contenedora integra três módulos em frameworks distintos, com builds separados, login e navegação compartilhados, iframes em área comum e contrato bidirecional por `postMessage`. O deploy final conjunto não elimina as fronteiras de composição observadas.
