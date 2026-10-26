---
schema: 1
id: 1178836362
full_name: ramdev90/nx-module-federation
url: https://github.com/ramdev90/nx-module-federation
commit: cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 109 — ramdev90/nx-module-federation

## Contexto

Exemplo Angular/Nx com shell e três aplicações remotas, `products`, `orders` e `customer`, integradas por rotas federadas. A árvore contém ainda a aplicação inicial `apps/microfrontend-workspace`, sem relação de composição com os quatro alvos: ela é inventariada, mas não somada às unidades de Q1, conforme os precedentes 023/028 para alvos sem composição. A contagem quatro não significa ausência de observabilidade da quinta aplicação.

Predominam scaffold e telas NxWelcome, mas há aplicações concretas com builds/entradas e configuração federada consumida no router. Isso difere de código do gerador ou snippets sobre como gerar aplicações. O caráter demonstrativo é registrado em `repo_type: example`, sem atribuir autoria original do scaffold ao titular.

## Proveniência na amostra

- Rank 109, ID e estratégias `terminology;technology`: `data/samples/mfe-sample-001/sample.csv:110`. Clone, branch `master` e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:110`. A amostra deriva da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:26270` registra elegibilidade `unknown`; `data/discovery/mfe-round-002/candidates.csv:26277`, `pass`. Ambas têm descrição nula, tópicos vazios, TypeScript, licença nula e `fork: false`.
- Consulta `sqlite3 -readonly`, unindo `hits` e `queries` por `query_id` e filtrando `repository_id=1178836362`, nos bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`: ambas registram os mesmos três hits, endpoint `repositories`, sem caminho de arquivo:
  - `technology-module-federation-repositories`, estratégia `technology`, consulta exata `"module federation" in:name,description,readme`;
  - `terminology-microfrontend-repositories`, estratégia `terminology`, consulta exata `microfrontend in:name,description,readme`;
  - `terminology-microfrontends-repositories`, estratégia `terminology`, consulta exata `microfrontends in:name,description,readme`.
- Por eliminação dos campos: descrição e tópicos não explicam os termos. O README tem título exato `# MicrofrontendWorkspace` (`README.md:1`), forma concatenada, além de comandos com `microfrontend-workspace` (`README.md:14`; `README.md:20`). Não há plural literal nesses trechos. A busca de tecnologia é compatível com as palavras hifenizadas do nome do repositório, mas o banco não informa o campo/normalização do casamento. O fim do README contém acréscimos com caracteres NUL (`README.md:102–104`), não uma frase ASCII limpa “module federation”. Esses sinais são apenas proveniência; o nome e os hits não confirmam arquitetura.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r` do SHA: 103 arquivos regulares, todos modo 100644; zero symlinks e zero gitlinks. `products/`: 25; `shell/`: 19; `orders/` e `customer/`: 17 cada; `apps/`: 14; `.vscode/`: um; dez arquivos na raiz. Não há `node_modules`, submódulo ou árvore de framework vendorizada. Contagens da árvore Git, sem linhas textuais artificiais. | contexto |
| Estrutura / Build/deploy | Quatro projetos application com builds próprios `@nx/angular:webpack-browser`, output, índice, `main` e tsconfig distintos (`shell/project.json:2–26`; `products/project.json:2–26`; `orders/project.json:2–26`; `customer/project.json:2–26`). As entradas, HTML, tsconfigs, estilos e configs indicados existem. Os quatro `main.ts` importam bootstrap assíncrono (`shell/src/main.ts:1`; `products/src/main.ts:1`; `orders/src/main.ts:1`; `customer/src/main.ts:1`). | forte |
| Configuração (shell) | `shell/module-federation.config.ts:3–17` define `name: 'shell'` e remotes `['products', 'orders', 'customer']`; export default exigido pelo grafo Nx em `shell/module-federation.config.ts:20–23`. São nomes de projetos presentes no workspace, não referências documentais a remotes futuros. | forte |
| Configuração (remotes) | Cada remote expõe a chave `./Routes` para um arquivo real: `products/src/app/remote-entry/entry.routes.ts`, `orders/src/app/remote-entry/entry.routes.ts` e `customer/src/app/remote-entry/entry.routes.ts` (`products/module-federation.config.ts:3–7`; `orders/module-federation.config.ts:3–7`; `customer/module-federation.config.ts:3–7`). Os nomes federados correspondem aos nomes usados pelo shell. | forte |
| Build/deploy / Composição | Os project targets leem `customWebpackConfig` de seus diretórios (`shell/project.json:24–25`; `products/project.json:24–25`; `orders/project.json:24–25`; `customer/project.json:24–25`). Os quatro arquivos importam a configuração MF local e a passam a `withModuleFederation` de `@nx/module-federation/angular` (`shell/webpack.config.ts:1–9`; `products/webpack.config.ts:1–9`; `orders/webpack.config.ts:1–9`; `customer/webpack.config.ts:1–9`). Logo não são configs de federação soltas e não lidas pelo build. | forte |
| Código-fonte (consumo/exports) | O router do shell usa `import('customer/Routes')`, `import('orders/Routes')` e `import('products/Routes')`, consumindo `m.remoteRoutes` em cada `loadChildren` (`shell/src/app/app.routes.ts:4–16`). Os três arquivos expostos exportam exatamente `remoteRoutes` (`customer/src/app/remote-entry/entry.routes.ts:1–4`; `orders/src/app/remote-entry/entry.routes.ts:1–4`; `products/src/app/remote-entry/entry.routes.ts:1–8`). Não há divergência de nome de remote/chave/export. O contrato é uma lista de rotas Angular, sem props ou função mount adicional exigida pelo consumidor. | forte |
| Código-fonte (integração) | O bootstrap do shell inicia `App` (`shell/src/bootstrap.ts:1–5`); `appConfig` registra `appRoutes` (`shell/src/app/app.config.ts:5–9`); `App` importa `RouterModule` e aponta ao template (`shell/src/app/app.ts:1–13`), que oferece menu para os três remotes e `router-outlet` (`shell/src/app/app.html:1–7`). Há cadeia de consumo completa até a apresentação. | forte |
| Código-fonte (entradas remotas) | Os bootstraps remotos iniciam seus `RemoteEntry` próprios (`products/src/bootstrap.ts:1–5`; `orders/src/bootstrap.ts:1–5`; `customer/src/bootstrap.ts:1–5`), existentes e exportados (`products/src/app/remote-entry/entry.ts:1–9`; `orders/src/app/remote-entry/entry.ts:1–9`; `customer/src/app/remote-entry/entry.ts:1–9`). Products inclui também rota `list` e componente `ProductList`, ambos existentes (`products/src/app/remote-entry/entry.routes.ts:3–8`; `products/src/app/product-list.ts:1–9`; `products/src/app/product-list.html:1–3`). Rotas de aplicações são o objeto federado, não somente um hook/utilitário compartilhado. | forte |
| Configuração / Independência | Os aliases TypeScript `products/Routes`, `orders/Routes` e `customer/Routes` apontam às fontes para resolução de tipos (`tsconfig.base.json:17–20`). Isso foi confrontado com a configuração Webpack: os mesmos identificadores são remotes de MF e os imports são federados, com plugin efetivamente conectado ao builder. Há uma exceção: `orders` importa diretamente o componente-fonte `ProductList` de `products` por caminho relativo que atravessa a fronteira de projeto (`orders/src/app/remote-entry/nx-welcome.ts:3`, usado em `:7` e no template em `:512`), e esse `NxWelcome` é usado pelo componente da rota exposta de `orders` (`orders/src/app/remote-entry/entry.ts:2–7`); a busca por `../../../` nos `.ts` encontra só essa linha. Fora desse par, o shell usa apenas especificadores federados e não há outro import relativo entre aplicações. Não se confunde path de tipagem com import direto das fontes de outra unidade. | ambígua |
| Build/deploy (desenvolvimento) | Shell usa executor `@nx/angular:module-federation-dev-server`, porta 4200 (`shell/project.json:58–73`). Os remotes usam seus próprios builds e portas 4201/4202/4203 (`products/project.json:58–74`; `orders/project.json:58–74`; `customer/project.json:58–74`), além de alvos `serve-static` por unidade (`products/project.json:85–100`; `orders/project.json:85–100`; `customer/project.json:85–100`). `dependsOn: shell:serve` orquestra desenvolvimento; não é import de fontes nem elimina os builds separados. | forte |
| Tecnologia / Resolução | Angular, Nx e MF estão declarados (`package.json:8–32`). Lockfile resolve Nx Angular/MF/Webpack 22.5.4 (`package-lock.json:7380–7385`; `package-lock.json:7612–7617`; `package-lock.json:8159–8164`), builder Angular 21.1.5 (`package-lock.json:294–299`), MF enhanced 0.21.6 (`package-lock.json:6240–6245`), Webpack 5.105.4 (`package-lock.json:21934–21939`) e TypeScript 5.9.3 (`package-lock.json:21638–21643`). Peers registrados: Nx Angular aceita builders Angular `>=19 <22`; builder Angular aceita TypeScript `>=5.9 <6`; enhanced aceita Webpack 5. Configs e versões são estaticamente coerentes; nenhum build/servidor foi executado. | moderada |
| Configuração / Limites | Os targets de produção apontam a configs que também aplicam `withModuleFederation` e preservam a configuração (`shell/project.json:42–45`; `shell/webpack.prod.config.ts:9–24`; `products/webpack.prod.config.ts:9–24`; `orders/webpack.prod.config.ts:9–24`; `customer/webpack.prod.config.ts:9–24`). URLs reais de deploy não são fornecidas: os overrides de produção são comentários. A classificação se apoia na composição do workspace, sem afirmar deploy publicado. | contexto |
| Estrutura / Composição (alvo excluído) | O projeto inicial `microfrontend-workspace` tem build/entrada convencional próprios (`apps/microfrontend-workspace/project.json:2–23`), rotas vazias (`apps/microfrontend-workspace/src/app/app.routes.ts:1–3`) e template NxWelcome (`apps/microfrontend-workspace/src/app/app.html:1–2`). Não é remote do shell nem consumidor dos remotes. Foi inventariado como aplicação não participante, sem aumentar `frontend_units` da composição. `products/my-component.ts:1–9` também é componente isolado, não outra aplicação. | contexto |
| Tecnologia / Composição / Documentação | Busca textual no SHA, excluído `package-lock.json`, por `single-spa`, `registerApplication`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe` e `importmap`: nenhum resultado. Inventário de nomes/documentos: apenas README, sem ADR ou documentação de arquitetura adicional. O README é scaffold Nx com comandos para o projeto inicial (`README.md:5–29`), insuficiente sozinho para a cadeia federada observada nos outros arquivos. | ausente |

## Autoria e histórico

Metadados no SHA: quatro commits alcançáveis, zero merges, um commit-raiz `a6a38c9e98f344e9694af343f80624bc8ce79738`, clone não shallow. Todos registram autor/committer `ramdev90`, entre 10/03/2026 e 11/03/2026. As únicas refs são `master`, `origin/master` e `origin/HEAD`, no SHA avaliado. Nenhum conteúdo de outro branch ou blob histórico foi usado.

`git log --no-renames --name-status` por `apps/`, `shell/`, `products/`, `orders/` e `customer/`, sempre com `GIT_NO_LAZY_FETCH=1`: o commit-raiz adiciona a aplicação Nx inicial; o HEAD `cf42f3f1506bfe6f25a263d0763cd09cac7e84f7` adiciona em bloco as quatro árvores federadas e os componentes extras de produtos. Não houve objeto ausente nessas consultas. Os nomes genéricos “initial commit” e a identidade Git não demonstram escrita manual ou autoria original de cada arquivo.

O README apresenta o workspace como gerado por Nx e orienta seus generators (`README.md:5–7`; `README.md:33–48`); configs comentadas e telas NxWelcome são compatíveis com scaffold de ferramenta. Esse scaffold não é atribuído intelectualmente ao titular. Ao mesmo tempo, são aplicações geradas já materializadas no snapshot, com composição configurada e consumida, e não apenas um gerador, template textual ou distribuição vendorizada de Nx. Não se infere a sequência exata de comandos executados a partir dos commits.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Shell e três remotes concretos, explicitamente ligados por `remotes` (`shell/module-federation.config.ts:3–17`) e respectivas configurações `exposes` (`products/module-federation.config.ts:3–7`; `orders/module-federation.config.ts:3–7`; `customer/module-federation.config.ts:3–7`). A aplicação inicial sem composição não é somada. |
| Q2 | Yes | Cada unidade tem entrada e build próprios (`shell/project.json:9–26`; `products/project.json:9–26`; `orders/project.json:9–26`; `customer/project.json:9–26`), e o shell importa interfaces federadas (`shell/src/app/app.routes.ts:4–16`). Yes para shell, `customer` e `products`, sem imports cruzados. Exceção: `orders` importa diretamente o componente-fonte `ProductList` de `products` (`orders/src/app/remote-entry/nx-welcome.ts:3`, `:7`, `:512`), acoplamento lateral entre dois remotes, num componente de boas-vindas, que não participa da composição por Module Federation. Paths TypeScript foram considerados junto com os hooks MF de build, não isoladamente. |
| Q3 | Yes | O shell registra o router e apresenta os remotes sob rotas/menu de uma mesma aplicação (`shell/src/app/app.config.ts:5–9`; `shell/src/app/app.routes.ts:4–16`; `shell/src/app/app.html:1–7`). |
| Q4 | Yes | Cadeia conectada: project target → config Webpack → `withModuleFederation` → remotes/exposes → import de `*/Routes` → export `remoteRoutes` existente → router-outlet. Não é dependência ou configuração sem uso (`shell/project.json:24–25`; `shell/webpack.config.ts:1–9`; `shell/src/app/app.routes.ts:4–16`; `products/src/app/remote-entry/entry.routes.ts:1–8`). |
| Q5 | Yes | Q1–Q4 convergem para exemplo com host e remotes relativamente independentes. A origem scaffold não invalida uma composição efetivamente materializada e consumida. |

## Motivo

- `MFE-implemented`: quatro unidades com entradas/builds, integração MF configurada nos dois lados e consumo de rotas verificado. `repo_type: example` registra o conteúdo predominantemente demonstrativo; `build_tools: [webpack]` decorre dos hooks explícitos, não de inferência sobre Angular CLI.
- Q1 conta unidades presentes e referenciadas por composição, não nomes, pacotes ou componentes. Q2 aplica literalmente entrada/build próprios e ausência de import direto entre fontes de unidades; a exceção `orders` → `products` foi registrada, e a classe se mantém porque a composição host ↔ remotes por Module Federation está completa e o conjunto shell, `customer` e `products` satisfaz Q1 a Q4 sem imports cruzados (mesma lógica do 008, onde uma lacuna parcial não afetou o resultado); aliases de tipagem são acompanhados de federação real nos hooks. Q4 se apoia no consumo por `loadChildren` com exports e destinos correspondentes.
- Diferentemente de 097/103/104, a configuração é lida pelo builder e a cadeia até o consumidor está presente. O objeto exposto é rota de aplicação com componentes, bootstraps e build próprio; não apenas code sharing no limite discutido em 089/100. A organização é comparável aos exemplos completos 076/084/096/106 e ao final 007.
- Não se analisa o framework Nx como se fosse unidade própria, nem se atribui ao titular a autoria do código gerado. A distinção de 074/102/080 para plataforma/código terceiro não elimina aplicações scaffold materializadas pelo projeto. Também não se confunde o snapshot com um gerador cujo produto ainda não existe, como nos casos 075/081/105.
- `frontend_units: 4` segue os precedentes 023/028: a quinta aplicação inventariada não participa da composição; componentes e telas NxWelcome não são alvos adicionais. A presença dessa aplicação convencional não desfaz a cadeia host/remotes das outras quatro.
- A ausência de deploy real ou domínio de produção não exige reinterpretar Q2 como necessidade de publicação independente. Não se detectou defeito concreto de nomes/exports/entradas que imponha juízo sobre uma cadeia não conectável. Não há decisão aberta de links, iframes ou composição apenas em build time.

## Notas para análise

- **RQ1 (famílias):** busca por `ramdev90`, `nx-module-federation`, `withModuleFederation` e `remoteRoutes` nas anotações disponíveis não encontrou irmão do mesmo titular ou outro caso com o mesmo padrão Nx completo; os resultados parciais em outros wrappers/configs não comprovam origem comum. O padrão de scaffold é explicitado sem promover autoria Git a autoria manual.
- **RQ3:** ligações decisivas são nomes dos projetos → remotes → exposes `./Routes` → export `remoteRoutes` → `loadChildren` do shell. O vínculo `customWebpackConfig` fecha a ligação entre configuração declarada e build; paths TypeScript sozinhos não o fariam.
- **Protocolo:** consultas singulares/plurais e frase de tecnologia foram preservadas. README concatenado e trechos com NUL limitam a atribuição exata dos hits a texto; isso não afeta a evidência arquitetural independente do mecanismo de busca.

- **Alternativa não adotada (revisão independente):** aplicar o critério literal de Q2 ao conjunto inteiro e registrar Q2 Undetermined, com Justificativa do Q5, `Uncertain` e `review`. Não foi adotada porque a composição observada não depende do import cruzado e Q1 exige apenas duas unidades. O precedente 042 (Q2 No por import direto de `src/`) difere porque lá o import de fontes era a própria integração e não havia Module Federation.
- **RQ1/RQ3:** um import lateral entre remotes é um sinal de acoplamento que a busca por Module Federation não revela.
