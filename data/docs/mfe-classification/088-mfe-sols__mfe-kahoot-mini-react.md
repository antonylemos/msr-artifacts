---
schema: 1
id: 1190253449
full_name: mfe-sols/mfe-kahoot-mini-react
url: https://github.com/mfe-sols/mfe-kahoot-mini-react
commit: 69cd5f059720c4649ffbfe3374ef809074de5c46
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [single-spa]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 088 — mfe-sols/mfe-kahoot-mini-react

## Contexto

Uma aplicação React de quiz, preparada para ser montada por single-spa e também executável por um HTML standalone que carrega a mesma unidade. O README apresenta explicitamente a intenção de integrar o módulo ao shell/root-config (`README.md:3–15`); a preparação concreta está nos lifecycles exportados e no build SystemJS, não no nome do repositório.

Commit conferido contra `data/samples/mfe-sample-001/clones.csv:89`. Inventário completo por `git ls-tree -r --name-only 69cd5f059720c4649ffbfe3374ef809074de5c46`: 35 arquivos, nenhum sob `node_modules/`, um único `package.json`, uma entrada de aplicação e um único build de aplicação. Os arquivos estão na raiz do clone, não sob `apps/mfe-kahoot-mini-react/`: esse prefixo aparece como contexto de monorepo em `project.json:4–19`, mas não existe na árvore avaliada. Não estão presentes `apps/root-config/`, os fontes de `libs/` ou outro alvo frontend. O HTML standalone e seu painel auxiliar não têm builds próprios e não constituem segunda unidade.

As referências locais `main`, `origin/main` e `origin/HEAD` apontam ao commit avaliado; somente registradas como contexto. Não foram usados outros branches nem acessado o host publicado.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Tecnologia | `package.json:16–25` declara React, single-spa-react, single-spa e bibliotecas compartilhadas `@mfe-sols/ui-kit`/`@mfe-sols/i18n`. São sinais isolados até confrontados com a entrada e a configuração abaixo. | fraca |
| Código-fonte (lifecycles) | `src/org-mfe-kahoot-mini-react.tsx:43–56` chama `singleSpaReact` com React, ReactDOMClient e `Root`, e exporta `bootstrap`, `mount`, `unmount`. `src/root.component.tsx:148–159` constrói o modelo/presenter e renderiza o `AppView` da própria aplicação. Isso demonstra uma unidade frontend preparada para composição, não apenas uma biblioteca ou declaração de dependência. | forte |
| Configuração / Build/deploy | `webpack.config.js:38–45` configura `webpack-config-single-spa-react-ts` com organização `org`, projeto `mfe-kahoot-mini-react`, `outputSystemJS: true` e HTML automático desabilitado. `package.json:10–13` contém os comandos de build e types; `vercel.json:2–3` define build e saída próprios. `vercel.json:14–17` trata o bundle `/org-mfe-kahoot-mini-react.js` como JavaScript. | forte |
| Configuração (standalone) | O import map de `public/index.html:97–104` contém somente `@org/mfe-kahoot-mini-react` apontando ao bundle local. `public/index.html:107–135` importa esse mesmo módulo e chama seus lifecycles com o nó `standalone-root`. Esse harness confirma o contrato consumidor dos exports, mas não registra nem compõe uma segunda aplicação. | moderada |
| Código-fonte (referência ao shell) | `public/index.html:24–30` aceita a origem `mfe-root-config.vercel.app`; `public/index.html:44–53` usa essa origem ou localhost:9000 para obter estilos compartilhados. `public/index.html:70–90` injeta CSS, não o JavaScript de um host. A referência ao root-config contextualiza um shell externo, sem trazer sua implementação para o snapshot nem adicioná-lo como unidade composta pelo candidato. | contexto |
| Código-fonte (contratos auxiliares) | `src/org-mfe-kahoot-mini-react.tsx:14–36` recebe mensagens `mfe-toggle`, valida origem e grava a lista de módulos desabilitados. `src/mfe-error-reporter.ts:66–96` envia mensagens tipadas `mfe-error` ao parent em modo `mfe-bridge=1`. São contratos explícitos do lado da unidade; o receptor/host não está no snapshot e nenhum iframe é criado aqui. | moderada |
| Código-fonte (integração visual) | `src/root.component.tsx:27–50` sincroniza idioma por evento/storage, e `src/root.component.tsx:82–114` observa o tema no documento compartilhado. Esses mecanismos reforçam a preparação para conviver com shell, sem provar sua composição externa. | moderada |
| Configuração (bibliotecas) | `webpack.config.js:54–63` procura pacotes `@mfe-sols/*` ou fontes opcionais em `../../libs/`; `webpack.config.js:93–106` configura aliases condicionais e permite empacotar UI kit, i18n e React. Essas bibliotecas não são aplicações adicionais. Os caminhos de fallback não existem no inventário deste clone, e não constituem importação de fontes de outro frontend observável. | contexto |
| Documentação | `README.md:7–15` distingue executar standalone de executar com root-config, e descreve o módulo como demonstração dentro do shell. `src/mvp/README.md:3–8` documenta as camadas model, presenter, usecase, service e view. Não foram encontrados ADRs ou diretórios de documentação de arquitetura adicionais no inventário. | contexto |
| Documentação de arquitetura (apresentação) | A apresentação versionada descreve um shell com roteamento/import map/lifecycles em `data/MFE-Orchestra-Seminar-New.pptx!ppt/slides/slide7.xml:2`; separação de módulos em repositórios independentes em `data/MFE-Orchestra-Seminar-New.pptx!ppt/slides/slide16.xml:2`; bibliotecas compartilhadas em `data/MFE-Orchestra-Seminar-New.pptx!ppt/slides/slide18.xml:2`. A notação `!` identifica o membro XML dentro do PPTX; os números são as linhas originais desse XML. Foi consultado o conteúdo textual do arquivo fixado, sem tratar as aplicações e import maps mostrados nos slides como implementação presente no clone. | contexto |
| Documentação / Código-fonte (conteúdo didático) | `data/question-sets.seed.json:335–343` contém uma pergunta cuja resposta é `mountRootParcel`. A busca por esse termo encontra conteúdo do quiz, não uma chamada executável que componha um parcel Vue. O jogo e seus lifecycles são implementação própria; as aplicações discutidas pelo quiz e pelos slides não aumentam Q1. | contexto |
| Histórico | O histórico tem 17 commits, todos de 2026-03-24, a partir do primeiro, `2883ae8ec09a34a73879c65499ffc9b5ecfb6a6d` (Update files); entre eles `a3a64a49e25a604ad4906f8d0545384096a295d8` (Update webpack.config.js) e o commit avaliado (Change files). A comparação por `git ls-tree` confirma que a entrada e o HTML standalone têm os mesmos blobs em 2883ae8, a3a64a4 e no snapshot: respectivamente `82f83153560a36b14e2c2eb61866128b8d737b9c` e `a6bb565f010fd64a51b97d41e8fc6658c25c982d`. Logo a preparação já estava presente naquela revisão anterior (`src/org-mfe-kahoot-mini-react.tsx:43–56`, `public/index.html:97–135`, conteúdos idênticos aos do snapshot). O blob anterior de Webpack não está disponível localmente; não se inferiu seu diff nem se usou conteúdo histórico ausente. | contexto |
| Estrutura / Composição (busca negativa do host) | Em `src/`, `public/`, `webpack.config.js`, `project.json` e `package.json`, procurados `registerApplication`, `constructApplications`, `constructRoutes`, `mountRootParcel`, `ModuleFederation`, `remoteEntry`, `exposes:` e `remotes:`: nenhum resultado. Há um import map, mas ele carrega somente a própria unidade (`public/index.html:98–103`). Não foram encontrados o root-config que registra múltiplas aplicações, seu layout ou import map de produção. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação própria com lifecycles (`src/org-mfe-kahoot-mini-react.tsx:43–56`). O único import map executável carrega essa mesma unidade (`public/index.html:98–103`). Referências ao shell para CSS, bibliotecas e exemplos dos slides/quiz não são outra unidade referenciada por configuração de composição. |
| Q2 | Yes | Para a unidade: entrada e lifecycles próprios, build SystemJS (`src/org-mfe-kahoot-mini-react.tsx:43–56`, `webpack.config.js:38–45`) e configuração de build/deploy própria (`package.json:10–13`, `vercel.json:2–3`). A unidade pode ser entregue como bundle ao consumidor externo. |
| Q3 | Undetermined | O README identifica um shell/root-config externo (`README.md:9–14`), mas seu registro/layout não está no snapshot. O HTML local somente monta a própria unidade (`public/index.html:109–135`); não permite verificar a participação de múltiplas unidades na aplicação externa. |
| Q4 | Undetermined | O lado da unidade está explicitamente implementado por exports e bundle SystemJS (`src/org-mfe-kahoot-mini-react.tsx:43–56`, `webpack.config.js:38–45`). Falta observar o host que a registra e conecta a outras unidades; o consumidor standalone de `public/index.html:121–133` testa apenas seu próprio contrato de montagem. |
| Q5 | No | A evidência demonstra uma unidade preparada para composição externa, não uma instância composta por pelo menos dois frontends no candidato. Q1 é No e aplica-se a exceção MFE-unit, com base nos lifecycles exportados (`src/org-mfe-kahoot-mini-react.tsx:56`) e no contexto de shell ausente (`README.md:9–14`). |

## Motivo

- Proposta `MFE-unit`: unidade frontend com lifecycles single-spa exportados e build SystemJS próprios, cujo host de composição não é observável. Corresponde diretamente à exceção do checklist, como no precedente final 058.
- O standalone não torna o candidato MFE-implemented: importa e monta apenas o mesmo módulo, sem uma segunda aplicação. Q2 registra a independência da unidade; Q3–Q4 permanecem Undetermined devido à preparação explícita para host externo, e Q5 é No para a instância arquitetural completa.
- Não é conteúdo puramente didático: há aplicação executável com view e lifecycles. Porém, os frontends descritos na apresentação e nas questões são conteúdo e não contam em Q1, conforme 023/028.
- O shell pretendido pertence ao ecossistema descrito pelo próprio projeto, com root-config de aplicações e bibliotecas `@mfe-sols/*`; não é uma plataforma de terceiros cujo mecanismo de extensões seja o único host. A regra de plugins de plataforma de 037 não afasta a preparação MFE-unit deste caso.
- A classificação se apoia em single-spa, sem depender de aceitar iframe/link. As mensagens do modo bridge têm contrato explícito, mas não provam um host implementado ou outra abordagem de composição no snapshot. As bibliotecas compartilhadas também não fundamentam composição em build time entre unidades frontend.

## Notas para análise

- **RQ1:** `project.json` e o comando `start` preservam caminhos de monorepo (`project.json:4–19`, `package.json:8`), embora a árvore esteja extraída na raiz e não contenha `../../scripts/require-port.js`. Essa dependência de ambiente não apaga os exports ou o build do módulo; nenhum build ou comando de inicialização foi executado.
- **RQ3:** o harness standalone comprova um consumidor dos lifecycles de uma unidade, sem funcionar como host de múltiplos alvos. O painel auxiliar publica autenticação simulada por BroadcastChannel (`public/dev-auth-panel.js:80–96`); não é aplicação independente nem evidência de um shell adicional.
- **Protocolo (família):** buscas nas anotações existentes por `mfe-sols`, `mfe-kahoot`, `mfe-root-config`, `MFE Orchestra` e `org/mfe-` não encontraram irmãos já anotados. A família/ecossistema pretendido é indicada pelo README, pelos pacotes `@mfe-sols/*` e pela apresentação, sem atribuir outros repositórios específicos não inspecionados. O precedente `docs/mfe-classification/058-ducknem2086__vue-lifecycle-demo.md` é comparável por lifecycles e host ausente, não evidência de ancestralidade ou template compartilhado.
- **Protocolo (extração de monorepo):** vários sinais indicam que o repositório é uma unidade extraída de um monorepo Nx do mesmo autor: `project.json:4–19` (root `apps/mfe-kahoot-mini-react`), `package.json:8` (`../../scripts/require-port.js`, inexistente), `webpack.config.js:54–55` (`../../libs/…`), `README.md:7` (`pnpm -C apps/…`) e os 17 commits num só dia. É uma hipótese que explica por que o host não está no snapshot, o cenário da exceção `MFE-unit`; não altera a classe.
- **Protocolo (histórico):** a inspeção de histórico foi limitada aos metadados e árvores disponíveis localmente. A conclusão usa os arquivos do commit fixado; as referências da apresentação a um monorepo ou a outros módulos não autorizam transferir a arquitetura completa para esta unidade extraída.
