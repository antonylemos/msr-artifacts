---
schema: 1
id: 876869948
full_name: sanketkedare/ReactForge
url: https://github.com/sanketkedare/ReactForge
commit: 358c47ae9860c83ff495405a0ebb0826bc92067c
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 098 — sanketkedare/ReactForge

## Contexto

Plataforma educacional de desafios React, laboratório de desempenho, editor/runner de código e recursos de autenticação/AI. A expressão Module Federation aparece como assunto do currículo, não como arquitetura implementada da plataforma (`README.md:190`, `src/data/learningProjects.ts:1856–1872`). A implementação observada é uma aplicação Next.js com páginas e componentes locais; o preview de código do usuário não é outra unidade frontend própria segundo os precedentes 075/081.

`repo_type: production` descreve a orientação a uma plataforma publicada para estudantes, com autenticação e onboarding (`README.md:6–14`, `src/app/layout.tsx:158–185`), não a prontidão operacional verificada. Ser uma plataforma de ensino não converte cada exercício em aplicação independente. O clone é `sanketkedare__ReactForge` e o SHA corresponde a `data/samples/mfe-sample-001/clones.csv:99`.

Inventário integral por `git ls-tree -r 358c47ae9860c83ff495405a0ebb0826bc92067c`: **253 arquivos regulares** (modo `100644`), **zero symlinks** e **zero gitlinks**. Não há `node_modules/` versionado ou submódulos. Há um `package.json` na raiz, uma configuração Next e uma árvore `src/app/`, sem prefixo de projeto a remover. `frontend_units: 1` conta a aplicação própria; desafios, snippets, respostas geradas e HTML de preview não são alvos extras. Os SVGs `vite.svg` e `react.svg` não demonstram outra aplicação ou configuração de bundler.

## Proveniência na amostra

- `data/samples/mfe-sample-001/sample.csv:99` registra rank 98, id 876869948, `strategies: terminology;technology` e elegibilidade `pass`. O run de origem é `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:10455` e `data/discovery/mfe-round-002/candidates.csv:10461` registram descrição nula, tópicos vazios, linguagem TypeScript, licença nula, branch padrão `main`, criação em 2024-10-22 e último push em 2026-09-07; as estratégias são as mesmas da amostra. São metadados de descoberta, não evidência de composição.
- Os bancos das duas rodadas, `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, foram consultados com `sqlite3 -readonly`. A junção `hits JOIN queries` por `query_id`, filtrando `hits.repository_id = 876869948`, retorna em cada banco os mesmos três hits: `technology-module-federation-repositories`, `terminology-micro-frontend-repositories` e `terminology-micro-frontends-repositories`. Endpoint `repositories`, `path` vazio; consultas respectivamente `"module federation"`, `"micro frontend"` e `"micro frontends"` em `name,description,readme`. Não há hit de arquivo de configuração nesses resultados.
- **Eliminação dos campos:** `ReactForge` não contém as expressões buscadas; descrição e tópicos estão vazios. O campo compatível observado é o README, cujo item curricular 97 é “Micro-Frontend Module Federation” (`README.md:190`). Isso explica o sinal temático local sem atribuir ao banco uma linha ou uma versão indexada que ele não identifica. O nome não foi tratado como evidência arquitetural.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Build/deploy | Um manifesto define `next dev`, `next build` e `next start` (`package.json:6–11`). O layout raiz aplica os providers de autenticação/tema às páginas (`src/app/layout.tsx:158–185`). Não se observam builds, entradas ou exposições de outras unidades frontend. | contrária |
| Configuração (resolução estática) | A configuração importa o tipo de `next` (`next.config.ts:1–3`), pacote declarado em `package.json:27` e registrado em `package-lock.json:7324–7326`. React/ReactDOM estão declarados (`package.json:30–31`) e no lock (`package-lock.json:8040–8042`, `:8049–8051`). Não existe plugin de composição a resolver: manifesto e chaves de pacotes do lock não contêm federation/single-spa/qiankun/wujie. A correspondência estática não afirma instalação ou build bem-sucedido. | contexto |
| Configuração (bundler e testes) | `next.config.ts:4–52` configura remoção de console, imagens e headers HTTP, sem hook de bundler/composição, remotes ou rewrites. `vitest.config.ts:1–14` define ambiente de teste e alias de fontes; `vitest/config` corresponde ao Vitest declarado e travado (`package.json:49`, `package-lock.json:9611–9613`). Não é configuração de build Vite das unidades. O bundler da aplicação permanece encapsulado pelo Next, portanto `build_tools: []`. | contexto |
| Código-fonte (desafio implementado) | A rota de calculadora importa Calculator e DynamicTaskClient locais (`src/app/(projects)/calculator/page.tsx:1–3`) e renderiza o componente como filho do workbench (`:22–28`). O alias `@/*` aponta a `./src/*` (`tsconfig.json:25–28`). É uma página do mesmo projeto, não um remote. | contrária |
| Código-fonte (catálogo e rota dinâmica) | O catch-all lê o registro `LEARNING_PROJECTS` (`src/app/(projects)/[slug]/page.tsx:1–13`, `:86–100`) e entrega o descritor ao DynamicTaskClient (`:165–170`). O registro do desafio module-federation é texto com objetivos de aprendizagem (`src/data/learningProjects.ts:1856–1872`), sem URLs, containers, builds ou loaders de unidades. Não existe rota própria implementando um host federado. | contrária |
| Código-fonte (workbench) | DynamicTaskClient importa o gerador de código inicial e LiveCodeRunner (`src/components/studio/DynamicTaskClient.tsx:40–44`); mantém a solução em estado `userCode` (`:109–115`) e a fornece ao preview (`:927–941`). O gerador retorna texto de componente (`src/lib/taskStarterCode.ts:1–25`), não um projeto/build independente. | contrária |
| Código-fonte (runner no mesmo documento) | LiveCodeRunner carrega Babel standalone por script externo (`src/components/studio/LiveCodeRunner.tsx:49–68`), transforma o código fornecido (`:84–98`), executa-o via `new Function` (`:110–149`) e renderiza o componente resultante (`:151–159`, `:182–197`). Babel é ferramenta de compilação do conteúdo editado, não unidade frontend remota. Esse caminho não usa iframe, apesar das descrições gerais de sandbox nos documentos. | contrária |
| Código-fonte (iframe e contrato de mensagens) | O playground mantém `code` no próprio estado (`src/app/(studio)/playground/page.tsx:72–78`), constrói HTML com esse conteúdo e bibliotecas React/Babel de CDN, e atribui o resultado a `iframe.srcdoc` (`:80–112`). Emite LOG/ERROR (`:103–105`), recebe-os para atualizar o painel (`:125–139`) e renderiza o iframe (`:238–244`). O contrato é explícito, mas serve ao preview de código do usuário, não à integração de aplicações próprias relativamente independentes. Aplica-se 075/081, sem inferir uma segunda unidade pelos scripts de CDN. | contexto |
| Código-fonte (sincronização entre abas) | ThreadedComments abre `BroadcastChannel("studio_threaded_comments")` (`src/components/studio/ThreadedComments/ThreadedComments.tsx:161–169`) e publica mutações de comentário/voto (`:217–238`). É sincronização entre instâncias da mesma funcionalidade, não composição de frontends independentes. | contexto |
| Documentação de arquitetura / ADRs | O ADR-001 adota explicitamente Next App Router, Server/Client Components e renderização centralizada dos desafios (`docs/architecture/ADR-001-nextjs-app-router.md:9–13`). O ADR-002 organiza estado local, URL, servidor e global (`docs/architecture/ADR-002-state-management-discipline.md:9–18`); “Anti-Monolith” no título refere-se a um store global, não a decomposição MFE. O ADR-003 trata de cancelamento/cache (`docs/architecture/ADR-003-data-fetching-and-caching.md:9–12`). Os demais documentam design system (`docs/architecture/ADR-004-design-system-and-tokens.md:9–12`), testes (`docs/architecture/ADR-005-testing-strategy.md:9–14`) e desempenho (`docs/architecture/ADR-006-performance-budget-and-virtualization.md:9–12`), não federação. | contrária |
| Documentação (sandbox) | `ARCHITECTURE.md:32–41` descreve router e estado da plataforma; `:50–52` descreve isolamento por iframe e mensagens. O código foi usado para distinguir o playground com srcdoc do LiveCodeRunner no mesmo documento, sem transferir toda afirmação documental a todos os caminhos. | contexto |
| Estrutura / Configuração / Código-fonte (busca negativa) | Procurados no inventário outros manifestos de aplicação, gitlinks e configurações de Webpack/federação/import maps: ausentes. Em todos os textos do snapshot, excluído `package-lock.json`, buscados `ModuleFederationPlugin`, `withModuleFederation`, `loadRemoteModule`, `loadRemoteEntry`, `remoteEntry`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements.define`, `initFederation`, `importmap`, hooks `webpack` e `rewrites`. Nenhum mecanismo foi encontrado; o único resultado da expressão ampliada é “Avoid unnecessary rewrites” em plano textual (`ReactForge_10Y_Experienced_Developer_Transformation_Plan.md:1625`), não configuração. Menções a module-federation localizam conteúdo curricular, não importações ou produtores. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um alvo Next, com páginas/componentes locais (`src/app/(projects)/calculator/page.tsx:1–3`, `:22–28`). O item federado é currículo (`src/data/learningProjects.ts:1856–1872`); preview/srcdoc de código editado não conta como unidade própria (`src/app/(studio)/playground/page.tsx:80–112`). |
| Q2 | No | Um build Next (`package.json:6–9`), sem conjunto de unidades ou aplicação preparada para host externo. O runner recebe código em estado local (`src/components/studio/DynamicTaskClient.tsx:109–115`, `:927–941`), não um artefato frontend com build/deploy próprio. |
| Q3 | No | Layout/providers e desafios pertencem à mesma aplicação (`src/app/layout.tsx:158–185`, `src/app/(projects)/[slug]/page.tsx:165–170`). O iframe é preview do editor, não host de unidades próprias. |
| Q4 | No | Não há configuração/consumo de composição entre unidades; `next.config.ts:3–52` configura a aplicação convencional. LOG/ERROR do preview (`src/app/(studio)/playground/page.tsx:103–105`, `:128–137`) e BroadcastChannel de comentários não estabelecem integração MFE. |
| Q5 | No | Plataforma única com tema MFE no currículo, geração/execução de código e páginas locais, conforme ADR-001 (`docs/architecture/ADR-001-nextjs-app-router.md:9–13`). Q5 acompanha Q1–Q4, sem override. |

## Motivo

- Proposta `Non-MFE`: aplicação convencional que ensina MFE sem implementar uma arquitetura MFE observável. Os precedentes 023/028 excluem conteúdo didático como prova de unidades, e 075/081 excluem código gerado/exibido e seu preview da contagem.
- O contrato de mensagens do iframe foi verificado, mas sua existência não transforma conteúdo editado em aplicação frontend própria. Não há decisão aberta sobre iframe entre unidades independentes a resolver neste caso. Também não há composição por links ou apenas em build time.
- Não se aplica MFE-unit: nenhuma exposição, lifecycle ou build prepara uma aplicação para host externo. Em Q1 No, Q2–Q4 ficam No. `frontend_units: 1`, `ui_technologies: [react, next]`, `build_tools: []` e `approaches: []` descrevem a implementação, sem promover Babel do runner ou o SVG Vite a bundlers de unidades.

## Notas para análise

- **RQ1:** as duas rodadas registram os mesmos hits de repositório, compatíveis com a linha curricular do README. O nome do desafio “Simulator”, termos “host/remote” e objetivos de aprendizagem não substituem código de composição.
- **RQ3:** a cadeia real é registro curricular → rota dinâmica → workbench → código em estado → runner/preview. O script Babel/CDN e as mensagens pertencem a essa cadeia de conteúdo. O outro caminho usa páginas com componentes importados estaticamente. Ambos permanecem no mesmo alvo próprio.
- **Protocolo (famílias/templates):** buscas por `sanketkedare`, `ReactForge`, `React-Tasks` e `100 Hands-On React` nas anotações existentes não encontraram irmão. Os nomes legados de assets Vite e diretórios de desafios não demonstram outra unidade ou filiação. 081 é precedente próximo por gerador/playground Next e iframe de conteúdo; 075/023/028 também se aplicam como critério, sem afirmar código comum.
- **Histórico:** clone não raso; **49 commits alcançáveis**, **0 merges** e **1 commit-raiz**, `fc29f76796e179079200b37a00a3215a644a7328` (2024-10-15, “first commit”), contados por `git rev-list --count`, `--count --merges` e `--max-parents=0`. O histórico registra currículo/AI em `4607746` (2026-08-26), transformação arquitetural em `9d953ac` (2026-09-06), configuração de testes em `bdf798a` (2026-09-06) e runner/IDE no SHA avaliado (2026-09-07). São assuntos de commits, sem usar snapshots antigos para completar a implementação atual; a data do commit-raiz é distinta da criação do repositório nos metadados.
- **Protocolo (branches e limites):** somente `main`, `origin/main` e `origin/HEAD`, todos no SHA fixado. Nenhuma rede, submódulo, instalação, build, teste, runner ou aplicação executados. Pacotes/configurações foram conferidos estaticamente no manifesto/lock, sem verificar disponibilidade atual no registry. Nenhuma decisão aberta identificada.
- **Menções curriculares (complemento):** além de `README.md:190` e `src/data/learningProjects.ts:1856–1864`, a lista de tarefas aparece em `AGENTS.md:20`, o mesmo tipo de conteúdo. A tarefa `module-federation` não tem página nem starter específicos: nenhum caminho do inventário contém `federation`, `remote` ou `micro`, e a rota é atendida pelo catch-all genérico `[slug]` (`src/app/(projects)/[slug]/page.tsx:10–13`, `:86–100`). Isso fecha a hipótese de um simulador implementado.
- **Preview do playground:** o `srcdoc` carrega React 18 por CDN (`src/app/(studio)/playground/page.tsx:89–90`), enquanto a aplicação usa React 19 (`package.json:30`); confirma que o preview é um runtime separado de conteúdo e não uma unidade da aplicação.
