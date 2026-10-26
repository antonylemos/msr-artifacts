---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
url: https://github.com/vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation, iframe]
ui_technologies: [react, vue, angular]
build_tools: [webpack]
frontend_units: 7
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Contexto

Exemplo didático com um host React, dois remotes React, um remote Vue e um remote Angular. Além desse núcleo federado de cinco unidades locais, o host tem rotas para duas aplicações externas em iframes (`host/src/App.jsx:31–41`, `:190–197`). O tipo de repositório é corroborado pelo contexto de aprendizagem em `README.md:1–8` e pelas telas demonstrativas, não usado como prova de composição.

Clone conferido em `data/samples/mfe-sample-001/repos/vigneshwaran-chandrasekaran__microfrontend/`. Rank, ID e SHA correspondem à linha `cloned` de `data/samples/mfe-sample-001/clones.csv:79`; `git rev-parse HEAD` retornou o SHA do front matter e `git cat-file -t` confirmou um commit. Inventário integral de 65 arquivos por `git ls-tree -r --name-only`, sem gitlinks no inventário por `git ls-tree -r`. As citações foram conferidas por `git show` e as buscas por `git grep`, sempre no SHA fixado. Não foram executados builds ou acessados os endpoints externos.

A classe e as respostas Yes abaixo são sustentadas pelo núcleo federado de cinco unidades, independentemente dos iframes. `frontend_units: 7` é uma contagem descritiva provisória: cinco aplicações locais e duas aplicações externas explicitamente referenciadas nas rotas. A inclusão dessas duas referências na contagem metodológica está aberta à revisão conjunta; não se afirma que seus fontes, frameworks ou builds estejam disponíveis neste candidato.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Build/deploy | `package.json:7–12` instala e constrói os cinco projetos separadamente, inicia servidores individuais e copia os resultados para diretórios distintos. O inventário contém os cinco projetos com manifestos e fontes próprios; não são apenas nomes no README. | moderada |
| Configuração / Código-fonte / Build/deploy (host) | `host/package.json:6–8` define start/build; `host/webpack.config.js:49` define a entrada; `host/src/index.js:7` carrega o bootstrap; `host/src/bootstrap.js:3–14` monta a aplicação React e seu store. | moderada |
| Configuração / Código-fonte / Build/deploy (React 1) | `react-mfe-1/package.json:6–8` define start/build; `react-mfe-1/webpack.config.js:12–17` define entrada e porta, e `:43–54` configura `reactMfe1`, `remoteEntry.js` e `./mount`. `react-mfe-1/src/bootstrap.js:3–14` monta a aplicação standalone; `react-mfe-1/src/mount.js:5–20` exporta a função que monta a mesma aplicação no elemento fornecido pelo host. | forte |
| Configuração / Código-fonte / Build/deploy (React 2) | `react-mfe-2/package.json:6–8` define start/build; `react-mfe-2/webpack.config.js:11–16` define entrada e porta, e `:42–47` configura `reactMfe2`, `remoteEntry.js` e `./mount`. `react-mfe-2/src/bootstrap.js:1–12` monta a aplicação standalone; `react-mfe-2/src/mount.js:1–16` exporta a montagem no elemento externo. | forte |
| Configuração / Código-fonte / Build/deploy (Vue) | `vue-mfe/package.json:6–8` define start/build; `vue-mfe/webpack.config.js:13–18` define entrada e porta, e `:58–63` configura `vueMfe`, `remoteEntry.js` e `./mount`. `vue-mfe/src/bootstrap.js:2–5` monta a aplicação standalone; `vue-mfe/src/mount.js:5–13` cria e monta a aplicação Vue no elemento recebido. | forte |
| Configuração / Código-fonte / Build/deploy (Angular) | `angular-mfe/package.json:6–8` define start/build; `angular-mfe/angular.json:12–22` liga o builder custom-webpack à configuração de federação e à entrada `src/main.ts`. `angular-mfe/webpack.config.js:23–30` configura `angularMfe`, `remoteEntry.js` e `./mount`. `angular-mfe/src/main.ts:4–9` é a inicialização standalone; `angular-mfe/src/mount.ts:13–34` exporta a montagem com criação do elemento e bootstrap de `AppModule`. | forte |
| Composição / Configuração (host) | `host/webpack.config.js:30–46` define quatro remotes, usando endpoints por subdiretório em produção e portas locais em desenvolvimento. Angular é carregado por `promise import(...)`; os demais usam containers nomeados. `:79–89` passa efetivamente `remotes` ao `ModuleFederationPlugin`. Nomes e exposições correspondem aos quatro providers acima. | forte |
| Composição / Código-fonte (consumo) | `host/src/App.jsx:31–35` declara loaders com imports de `reactMfe1/mount`, `reactMfe2/mount`, `vueMfe/mount` e `angularMfe/mount`. `:48–69` resolve o módulo e chama `mount(container)`; `:177–188` liga cada loader a uma rota renderizando `MfeContainer`. Há uso dos módulos expostos, além de configuração/dependência. | forte |
| Código-fonte (interfaces) | `react-mfe-1/src/App.jsx:13–35` implementa contador; `react-mfe-2/src/App.jsx:13–60` implementa formulário e saudação; `vue-mfe/src/App.vue:7–31` renderiza seleção de temas, com estado em `:35–57`; `angular-mfe/src/app/app.component.html:8–21` renderiza fatos e botão ligado ao componente (`angular-mfe/src/app/app.component.ts:24–31`). As exposições montam telas de aplicações, não apenas bibliotecas compartilhadas. | forte |
| Estrutura / Código-fonte (independência) | Inspecionadas referências `from`, imports laterais, `import()` e `require()` em todos os fontes `.js`, `.jsx`, `.ts` e `.vue` sob os cinco diretórios `src/`: 26 especificadores relativos, nenhum resolvendo para outro projeto. Os não relativos são bibliotecas e os quatro imports federados de `host/src/App.jsx:32–35`. Procuradas dependências de um projeto nos manifestos dos outros: nenhuma. As configurações Webpack inspecionadas não introduzem alias para fontes de outras unidades; o alias Vue aponta à distribuição de Vue (`vue-mfe/webpack.config.js:29–34`), e o tsconfig Angular não define `paths` (`angular-mfe/tsconfig.json:3–22`). | ausente |
| Composição / Código-fonte (iframe) | `host/src/App.jsx:38–41` configura Route Map e Multibank em dois domínios externos; `:95–103` renderiza `<iframe src={url}>`; `:190–197` liga cada iframe a uma rota do mesmo shell. O mecanismo está implementado, mas sua aceitação como composição MFE é decisão aberta no checklist. A independência interna dessas aplicações não foi inspecionada. | ambígua |
| Build/deploy | `package.json:9–12` constrói os quatro remotes, depois o host, e copia os diretórios `dist` separados para a publicação. `vercel.json:2–5` usa essa montagem e define rewrite para a SPA. Não há importação dos fontes remotos no build do host: ele resolve endpoints de federação em runtime (`host/webpack.config.js:30–46`). Cada projeto tem também `vercel.json` próprio (`react-mfe-1/vercel.json:1–10`, com CORS em `/remoteEntry.js`; `host/vercel.json:1–7`). O histórico mostra que a publicação passou de projetos Vercel separados para um único domínio: commits 027c8f7, 204f174 e 50e2db2 (2026-04-11, "fix: single-domain deployment - build all MFEs into one dist folder for Vercel"), mantendo builds e `remoteEntry.js` separados. A publicação conjunta é escolha operacional, não composição em build time (histórico lido somente leitura). | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Há cinco unidades locais identificáveis com entradas/builds próprios, incluindo host e quatro providers. Os quatro remotes estão na configuração efetiva (`host/webpack.config.js:30–46`, `:79–89`) e nos loaders do host (`host/src/App.jsx:31–35`). As duas referências adicionais em iframe não são necessárias para satisfazer o mínimo de duas unidades. |
| Q2 | Yes | As cinco unidades do núcleo federado têm entradas, builds e bootstrap próprios, registrados individualmente na tabela; a inspeção dos imports não encontrou acesso direto aos fontes de outra unidade. Por exemplo, `react-mfe-1/package.json:6–8`, `react-mfe-1/webpack.config.js:12–17` e `react-mfe-1/src/bootstrap.js:3–14`. O consumo no host usa nomes federados (`host/src/App.jsx:32–35`). Esta resposta não extrapola independência para os dois conteúdos externos em iframe. |
| Q3 | Yes | O mesmo host roteia os quatro remotes e chama suas funções de montagem no container DOM (`host/src/App.jsx:48–69`, `:177–188`), sob `BrowserRouter` (`:207–211`). |
| Q4 | Yes | Module Federation efetivamente relaciona `remotes`, exposições e consumo: `host/webpack.config.js:79–89`; `react-mfe-1/webpack.config.js:43–54`; `react-mfe-2/webpack.config.js:42–47`; `vue-mfe/webpack.config.js:58–63`; `angular-mfe/webpack.config.js:23–30`; `host/src/App.jsx:31–35`, `:59–62`. A resposta se sustenta por federação, sem decidir se os iframes adicionais satisfazem Q4. |
| Q5 | Yes | O núcleo federado satisfaz Q1–Q4: unidades independentes, rotas comuns e chamadas às funções expostas que montam React, Vue e Angular (`host/src/App.jsx:31–69`, `:177–188`; funções mount documentadas na tabela). É suficiente para propor uma instância MFE; a inclusão dos iframes permanece aberta e o status é `review`. |

## Motivo

- Propõe-se `MFE-implemented`: Q1–Q5 são Yes com base no host e nos quatro remotes federados. Corresponde aos casos de inclusão de monorepo host/remotes, exemplo que efetivamente compõe unidades e implementação com múltiplos frameworks.
- Não é `MFE-unit`, pois o host e os providers estão presentes e conectados; não é apenas compartilhamento de código, pois as exposições montam interfaces completas.
- A cópia dos resultados para um diretório de publicação não é tomada como composição em build time por pacotes. São builds separados e containers `remoteEntry.js` resolvidos em runtime, sem importação direta dos fontes remotos (`package.json:9–12`; `host/webpack.config.js:30–46`; `host/src/App.jsx:32–35`).
- `approaches` registra os mecanismos observados: federação e iframe. A presença de `iframe` no campo não resolve sua elegibilidade metodológica. `ui_technologies` cobre apenas as unidades locais inspecionadas, sem inferir frameworks dos sites externos; o build usa Webpack, inclusive pela integração custom-webpack do Angular.
- `unit_organization: monorepo` descreve o núcleo local de cinco projetos. Há ainda dois endpoints externos de iframe. A contagem provisória de sete referências frontend e a caracterização da composição adicional precisam de decisão conjunta, conforme abaixo. O número “Six independent apps” de `README.md:6–7` não foi usado como contagem, pois a árvore contém cinco aplicações locais e o código referencia outras duas.

## Notas para análise

- **RQ1:** configuração recíproca e funções de montagem sustentam a arquitetura; README e nome do repositório não são a base da decisão. O total narrado no README diverge dos artefatos.
- **RQ2:** federação entre frameworks diferentes com contrato comum `mount(element)`; dois caminhos de incorporação externa por iframe coexistem no shell.
- **Protocolo:** a análise é estática no commit registrado. Não confirma sucesso de builds, funcionamento atual de endpoints ou comportamento completo de montagem/desmontagem; nenhuma aquisição/mineração foi iniciada.

## Ponto para revisão conjunta

- **Iframe e contagem:** aplicar a decisão metodológica ainda aberta a Route Map e Multibank (`host/src/App.jsx:38–41`, `:95–103`, `:190–197`). Há duas rotas reais de incorporação, mas não foram inspecionados seus fontes ou builds. Decidir se essas referências contam como unidades MFE e se a abordagem iframe entra na caracterização final da arquitetura.
- **Alternativas para o registro:** manter a contagem descritiva de sete unidades/referências e caracterizar a composição híbrida, caso os iframes sejam aceitos; ou registrar cinco unidades federadas e tratar os dois iframes apenas como contexto externo. `frontend_units: 7` e `approaches: [module-federation, iframe]` são provisórios sob `review`, não uma regra nova.
- **Regra sugerida em 031:** a anotação 031 sugere que iframe conta quando há contrato explícito de integração com o shell (registro, mensagens, roteamento). Aqui os iframes são embeds simples de URL externa, sem `postMessage` nem registro de rotas (`host/src/App.jsx:95–103`). Se essa regra for adotada, o registro fica `frontend_units: 5` e `approaches: [module-federation]`, com os iframes apenas como contexto, equivalente ao critério da 008 (host + remotes referenciados pela configuração de federação). Fixar 5 já seria possível sem esperar a decisão, pois a classe e Q1–Q5 não dependem dela.
- **Classe proposta:** o núcleo host + quatro remotes sustenta `MFE-implemented` e todas as respostas Yes sem depender da aceitação dos iframes. Confirmar esse enquadramento na decisão conjunta e consolidar a contagem/abordagens; não há override de Q5 nem promoção para `final` nesta anotação.
