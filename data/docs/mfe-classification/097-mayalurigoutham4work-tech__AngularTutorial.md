---
schema: 1
id: 1237162366
full_name: mayalurigoutham4work-tech/AngularTutorial
url: https://github.com/mayalurigoutham4work-tech/AngularTutorial
commit: 0aca529f5d3b65b983e02b33a4f4d5103c544df7
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 097 — mayalurigoutham4work-tech/AngularTutorial

## Contexto

Exemplo de comércio eletrônico em Angular, com páginas de produtos, carrinho, pedidos, conta e categorias. A implementação tem uma aplicação em `angular-app/`, com um bootstrap e uma tabela de rotas que importa todas as páginas locais. A documentação anuncia Native Module Federation (`README.md:1–3`), mas também situa os remotes e seu carregamento como trabalho futuro (`angular-app/ARCHITECTURE.md:244–281`, `angular-app/SETUP_COMPLETE.md:180–200`). O arquivo `federation.config.js` existe, porém não é referenciado pelo build nem pelo bootstrap e expõe somente serviços/componentes compartilhados, não uma aplicação remota.

Clone confirmado: `mayalurigoutham4work-tech__AngularTutorial`; SHA conforme `data/samples/mfe-sample-001/clones.csv:98`. Inventário integral por `git ls-tree -r 0aca529f5d3b65b983e02b33a4f4d5103c544df7`: **2.008 arquivos regulares** (modo `100644`), **zero symlinks** e **zero gitlinks**. Desses arquivos, **1.961** estão sob `angular-app/.npm-cache/`, incluindo conteúdo/índices do cacache e logs; restam **47** fora do cache. Não há `node_modules/` versionado ou submódulo. A configuração npm usa cache local (`angular-app/.npmrc:1–2`); os objetos desse cache não são fontes de unidades próprias e não foram extraídos/executados.

O inventário dos caminhos próprios contém um manifesto de aplicação (`angular-app/package.json`), uma configuração Angular CLI e um `src/main.ts`. Não existem projetos `products-mfe`, `cart-mfe` ou `account-mfe` no snapshot. `frontend_units: 1` conta a aplicação real; páginas internas e aplicações apenas propostas nos documentos não aumentam essa contagem.

## Proveniência na amostra

- `data/samples/mfe-sample-001/sample.csv:98` registra rank 97, id 1237162366, `strategies: terminology;technology` e elegibilidade `pass`. O manifesto identifica `data/discovery/mfe-round-002` como rodada de origem (`data/samples/mfe-sample-001/manifest.json:2–5`).
- O candidato está em `data/discovery/mfe-round-001/candidates.csv:29995` e `data/discovery/mfe-round-002/candidates.csv:30001`. Em ambas: mesmas estratégias; descrição nula; tópicos vazios; linguagem TypeScript; licença nula; branch padrão `main`; criação em 2026-05-12 e último push em 2026-05-13. São metadados de descoberta, não confirmação de arquitetura.
- Consultados os bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite` com `sqlite3 -readonly`. Em cada um, `hits JOIN queries` por `query_id`, filtrando `hits.repository_id = 1237162366`, retorna os mesmos três hits: `technology-module-federation-repositories`, `terminology-micro-frontend-repositories` e `terminology-micro-frontends-repositories`. Todos usam endpoint `repositories`, sem caminho de código (`path` vazio), buscando respectivamente `"module federation"`, `"micro frontend"` e `"micro frontends"` em `name,description,readme`.
- **Eliminação dos campos:** `AngularTutorial` não contém essas expressões; descrição e tópicos estão vazios. O README é o campo compatível observado: título com Native Module Federation e descrição com micro frontends (`README.md:1–3`). Os hits não atribuem a busca a uma linha nem garantem identidade entre a versão indexada e o snapshot. O nome do repositório não foi usado como evidência arquitetural.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Código-fonte (entrada) | `angular-app/src/index.html:10–12` contém `app-root`; `angular-app/src/main.ts:1–6` importa App/appConfig locais e executa `bootstrapApplication`. `angular-app/src/app/app.config.ts:4–9` fornece o router da aplicação, sem inicialização de federação. | contrária |
| Composição (rotas) | `angular-app/src/app/app.routes.ts:1–8` importa diretamente ShellLayout e seis páginas do mesmo diretório de aplicação; `:10–24` associa as rotas a essas classes. Não carrega módulos externos nem remotes por URL. | contrária |
| Código-fonte (shell) | `angular-app/src/app/app.ts:1–11` renderiza o router outlet. `angular-app/src/app/layouts/shell.layout.ts:1–15` importa Header/Footer locais e envolve outro router outlet. O nome Shell corresponde a um layout da mesma aplicação, não a um host de aplicações independentes. | contrária |
| Código-fonte (páginas e serviços) | Products importa serviços locais de produtos/carrinho (`angular-app/src/app/pages/products.component.ts:1–10`). Os barrels compartilhados apenas reexportam Cart/Product/Order services (`angular-app/src/app/shared/services/index.ts:1–3`) e Header/Footer (`angular-app/src/app/shared/components/index.ts:1–2`). São partes da aplicação única. | contrária |
| Configuração (arquivo de federação isolado) | `angular-app/federation.config.js:1–15` chama `withModuleFederationPlugin` e `shareAll` importados de `@angular/build`, nomeia `shell`, define `remoteEntry.js` e expõe `./SharedServices` e `./SharedComponents`. Não declara remotes nem expõe um alvo de aplicação. A mera presença desse arquivo não demonstra que o build o leia ou produza um container funcional. Além de não ser lido por nenhum arquivo de build, o arquivo não é resolúvel no snapshot: `package.json` e `package-lock.json` não declaram nenhum pacote de federação (`@angular-architects/*`, `@module-federation/*` ou `@softarc/*`, busca sem ocorrências), o `angular.json` usa o builder `@angular/build:application` sem `webpackConfig` (`angular.json:8–29`), e a revisão independente observa que `withModuleFederationPlugin` e `shareAll` pertencem a `@angular-architects/module-federation`, e não a `@angular/build`, de onde o arquivo as importa (`federation.config.js:1`). Nenhum container poderia ser gerado a partir dele. | fraca |
| Build/deploy | `angular-app/package.json:4–9` chama apenas Angular CLI. `angular-app/angular.json:8–29` define um projeto `application`, builder `@angular/build:application` e entrada `src/main.ts`; o restante configura otimização, dev server e testes (`:31–69`), sem referência a `federation.config.js`, webpackConfig ou builder de federação. Não há hook de integração no bootstrap (`angular-app/src/main.ts:1–6`). | contrária |
| Tecnologia | Angular está declarado em `angular-app/package.json:14–19` e usado no bootstrap/rotas. O CLI encapsula o bundler; não foi observado arquivo de bundler ou hook efetivamente ligado ao build. O arquivo de federação isolado não sustenta atribuir Webpack ou native-federation à implementação. Registra-se `ui_technologies: [angular]`, `build_tools: []` e `approaches: []`. | contexto |
| Documentação de arquitetura (estado futuro) | `angular-app/ARCHITECTURE.md:7–34` mostra a aplicação com header, páginas, router e footer. A seção intitulada “Module Federation Setup (Future)” (`:244–281`) desenha Products/Cart/Account como remotes futuros, com portas 4201–4203. O diagrama não corresponde a projetos/configurações presentes. | contrária |
| Documentação (passos ainda necessários) | `angular-app/SETUP_COMPLETE.md:180–200` diz para estender com micro-frontends reais, criar aplicações, configurar cada uma e atualizar rotas para importação remota. `angular-app/MICRO_FRONTENDS_SETUP.md:24–46` contém comandos e configuração exemplificativa para criar Products MFE; `:67–75` apresenta uma futura referência de webpack no build. Isso é conteúdo de guia, não configuração ativa. | contrária |
| Documentação (sinais contraditórios) | O README afirma arquitetura MFE (`README.md:3–28`) e descreve criação dos remotes como instrução (`README.md:178–187`). `angular-app/SETUP_COMPLETE.md:5–12` anuncia suporte pronto, mas sua própria seção de próximos passos requer criar e carregar os remotes. As afirmações foram confrontadas com o código consumidor, sem presumir implementação a partir dos textos. | contexto |
| Estrutura (busca negativa de unidades) | Inventariados todos os caminhos, separando `.npm-cache/`; procurados outros manifestos próprios, entradas de aplicação, configurações de remotes, gitlinks e ADRs. Há somente `angular-app/` como alvo próprio; os documentos de arquitetura são os Markdown já listados, sem ADR separado. Objetos de dependências/cache e comandos de criação em Markdown não contam como aplicações. | ausente |
| Configuração / Código-fonte (busca negativa de composição) | Em `angular-app/src/`, `angular-app/angular.json`, `angular-app/package.json` e `angular-app/federation.config.js`, procurados `loadRemoteModule`, `loadRemoteEntry`, `initFederation`, `remotes`, `single-spa`, `registerApplication`, `registerMicroApps`, `iframe`, `postMessage`, `customElements`, `importmap` e `import-map`: nenhum resultado. Busca ampliada por federação encontra o arquivo isolado e textos de marketing nas páginas, sem consumidor de composição. | ausente |
| Build/deploy (busca negativa de ligação) | Procurado `federation.config` em todos os arquivos próprios, excluindo `angular-app/.npm-cache/` e `angular-app/package-lock.json`: resultados somente no README duplicado e documentos/guias. Nenhum arquivo de build, script ou fonte importa/referencia a configuração isolada. A referência exemplificada em `angular-app/MICRO_FRONTENDS_SETUP.md:67–75` não existe em `angular-app/angular.json:15–29`. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma aplicação própria, com um bootstrap (`angular-app/src/main.ts:1–6`) e seis páginas importadas diretamente (`angular-app/src/app/app.routes.ts:1–24`). Os remotes só aparecem como criação futura (`angular-app/SETUP_COMPLETE.md:180–200`). |
| Q2 | No | Um projeto/build (`angular-app/angular.json:8–29`), sem conjunto de unidades independentes. O arquivo isolado expõe serviços/componentes, não prepara uma aplicação para host externo por cadeia de build observável (`angular-app/federation.config.js:6–9`). Por isso, Q1 No não leva a Undetermined. |
| Q3 | No | ShellLayout envolve páginas da mesma aplicação (`angular-app/src/app/layouts/shell.layout.ts:1–15`, `angular-app/src/app/app.routes.ts:10–24`), sem host que carregue outras unidades frontend. |
| Q4 | No | Configuração de federação não ligada ao build; CLI aponta ao bootstrap convencional (`angular-app/angular.json:15–29`, `angular-app/src/main.ts:1–6`). Não há consumidor de remotes; sua integração é etapa futura (`angular-app/SETUP_COMPLETE.md:199–200`). |
| Q5 | No | Código de aplicação monolítica convencional com proposta/documentação de extração futura (`angular-app/ARCHITECTURE.md:244–281`). A evidência de execução da composição não existe no código; Q5 acompanha Q1–Q4. |

## Motivo

- Proposta `Non-MFE`: frontend convencional e menções/configuração de federação sem composição implementada. Os precedentes 023/028 e 075/081 impedem contar diagramas, comandos e snippets documentais como unidades reais.
- Não é MFE-unit: o arquivo não está conectado ao build e expõe apenas serviços/componentes, sem unidade de aplicação explicitamente preparada para host externo. Não é o caso de 089, no qual havia federação efetiva a avaliar como possível code sharing; aqui faltam tanto a cadeia de build quanto o consumidor. Q2–Q4 são No, não Undetermined. O arquivo de federação também não é resolúvel (sem pacote de federação declarado nem builder compatível), então não há unidade que possa ser gerada para um host externo.
- Não se aplica a inclusão de host com remotes externos: não há remotes em configuração executável nem código de carregamento. As portas e aplicações dos diagramas são propostas. Também não há contrato de composição por links/iframe ou integração de unidades somente em build time a arbitrar.
- `frontend_units: 1` conta o único alvo próprio após o inventário, sem cache npm, serviços, componentes ou remotes apenas planejados. `repo_type: example` corresponde ao tutorial/demonstração com produtos de exemplo (`README.md:203–210`).

## Notas para análise

- **RQ1:** as mesmas estratégias e três hits aparecem nas rodadas 001 e 002. A descrição temática do README e o rótulo “Native” contrastam com o bootstrap/build e com a seção de arquitetura futura; não se infere abordagem implementada pelo rótulo.
- **RQ3:** a relação decisiva é a ausência de ligação de `federation.config.js` ao build, combinada com imports locais nas rotas. A possibilidade abstrata de instalar/corrigir um plugin e criar remotes não altera a classificação do snapshot.
- **Protocolo (famílias/templates):** buscados `mayalurigoutham`, `AngularTutorial`, `EComm Platform` e `Native Module Federation Power` nas anotações existentes, sem irmão identificado. Os dois README do snapshot têm o mesmo blob; são duplicação interna, não duas aplicações. 091 é paralelo por separar implementação atual e arquitetura futura, e 023/028 por excluir conteúdo sem composição; não se afirma família compartilhada. A configuração Angular CLI convencional é observada diretamente, sem atribuir origem a um template específico apenas por similaridade.
- **Histórico:** clone não raso; **3 commits alcançáveis**, **0 merges** e **1 commit-raiz**, conferidos por `git rev-list --count`, `--count --merges` e `--max-parents=0`. Todos em 2026-05-12: `bbd97cf61012e8f52c23c00045f6c2fc7a99b567` (“Initial commit”), `9654d3177c7c76b0783316062d5b867cd86803f9` (“Add README.md for ECommerce platform”) e o SHA avaliado (“Update README.md”). Comparação das árvores integrais: a raiz tem 2.007 arquivos; o segundo commit adiciona apenas `README.md` na raiz, e o terceiro altera apenas esse README. Código, configuração isolada e documentos em `angular-app/` não mudam nesses dois commits.
- **Protocolo (branches e limites):** somente `main`, `origin/main` e `origin/HEAD`, todos no SHA fixado. Nenhum conteúdo de outro branch foi usado. Inspeção estática e local, sem rede, acesso a submódulos, instalação, execução do QUICK_START, build ou testes. Nenhuma decisão aberta necessária para classificar o código observado.
