---
schema: 1
id: 956294016
full_name: harshan89/home24
url: https://github.com/harshan89/home24
commit: 2cb36e849853c272820549ab6de61699f074b12d
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 094 — harshan89/home24

## Contexto

Exercício de entrevista para um back office de produtos, com login, categorias, listagem, edição e exclusão. O caráter de exercício está explícito em `README.md:89–91`. O snapshot implementa uma aplicação Next.js/React com páginas, componentes, Redux/Saga e endpoints de API no mesmo projeto. A documentação declara que não utiliza arquitetura micro frontend (`README.md:12–14`); essa declaração foi confrontada com entradas, imports e configuração, não usada isoladamente.

O nome exato do clone é `harshan89__home24`. O commit corresponde a `data/samples/mfe-sample-001/clones.csv:95`. O inventário integral por `git ls-tree -r 2cb36e849853c272820549ab6de61699f074b12d` contém **91 arquivos regulares** (modo `100644`), **zero symlinks** (`120000`) e **zero gitlinks** (`160000`). Não há `node_modules/` versionado, submódulos, outros manifestos de aplicação ou prefixo de subpasta a remover: `package.json`, `next.config.ts` e `src/` estão na raiz. Há um alvo frontend próprio; páginas, componentes, endpoints e testes não são unidades adicionais.

## Proveniência na amostra

- `data/samples/mfe-sample-001/sample.csv:95` registra rank 94, id 956294016, `strategies: terminology` e elegibilidade `pass`.
- `data/samples/mfe-sample-001/manifest.json:2–5` identifica a rodada de origem `data/discovery/mfe-round-002`. Em `data/discovery/mfe-round-002/candidates.csv:12408`, a estratégia também é `terminology`; os metadados registram TypeScript, descrição nula, tópicos vazios, branch padrão `master`, criação em 2025-03-28 e último push em 2025-04-02. Descoberta e elegibilidade não confirmam arquitetura.
- Consulta somente leitura ao `data/discovery/mfe-round-002/discovery.sqlite`, tabelas `hits` e `queries`, filtrando `hits.repository_id = 956294016`: há hits nas consultas `terminology-micro-frontend-repositories` e `terminology-micro-frontends-repositories`, estratégia `terminology`, endpoint `repositories`, respectivamente `"micro frontend" in:name,description,readme` e `"micro frontends" in:name,description,readme`. Os dois registros têm `path` vazio: são resultados de busca de repositórios, sem localização de código. A menção negativa em `README.md:14` é um sinal terminológico observado, compatível com o tema das consultas; o banco não atribui o hit a essa linha. O nome do repositório não foi tratado como evidência de arquitetura.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Build/deploy | Um manifesto define `next dev --turbopack`, `next build` e `next start` (`package.json:5–11`). Um Dockerfile instala, compila e inicia esse mesmo projeto (`Dockerfile:3–13`). Não se observam builds de unidades frontend separadas. | contrária |
| Tecnologia / Configuração | React, ReactDOM e Next estão declarados em `package.json:17–19` e usados nos fontes (`src/app/layout.tsx:3–7`, `src/app/product/page.tsx:3–5`, `:24`). `next.config.ts:1–7` contém apenas o objeto vazio de configuração. Não há configuração explícita de bundler ou de federação; o bundler permanece encapsulado pelo Next, mesmo com a opção de desenvolvimento `--turbopack`. | contexto |
| Código-fonte (entrada e estado) | O layout raiz importa diretamente o store local e envolve os filhos com Redux Provider (`src/app/layout.tsx:6–7`, `:19–33`). O store importa reducer e saga locais e executa a saga (`src/state/store.ts:1–14`). É estado compartilhado internamente por uma aplicação. | contrária |
| Código-fonte (páginas e componentes) | A página inicial importa e renderiza `LoginComponent` local (`src/app/page.tsx:3–6`). A página de produtos importa diretamente serviços, seletores, menu, tabela, detalhe e cabeçalho (`src/app/product/page.tsx:6–25`), renderizando-os na mesma árvore (`:124–170`). O alias `@/*` aponta a `./src/*` (`tsconfig.json:21–23`), não a remotes. | contrária |
| Composição (navegação interna) | Após login, a saga navega para `product` (`src/state/user/userSaga.ts:15–23`); a página de produtos usa o router Next e retorna à raiz sem token (`src/app/product/page.tsx:24`, `:53–64`). São rotas da mesma aplicação, sem zonas ou unidades com entrega independente. | contrária |
| Código-fonte (API) | O cliente Axios usa `NEXT_PUBLIC_API_URL` ou `http://localhost:3000/api/` (`src/api/clients/adminApiClient.ts:1–8`). Essa configuração seleciona uma API de dados; não importa nem monta outro frontend. | contexto |
| Documentação de arquitetura | `README.md:12–16` descreve a separação entre business models, API/DTO, serviços e Redux/Saga e nega o uso de micro frontends. `README.md:18–22` explica o modelo de classes. Os diagramas são imagens remotas referenciadas no Markdown, não arquivos locais inspecionados; não se infere seu conteúdo. Não há ADR ou outro documento de arquitetura no inventário. | contrária |
| Estrutura (busca negativa de unidades) | No inventário integral, procurados outros `package.json`, configurações de build/composição, aplicações em subpastas e gitlinks. Encontrado apenas o projeto raiz. `public/` contém imagens/ícones, `cypress/` e `src/tests/` contêm testes; não há unidades frontend vendorizadas ou alvos independentes nesses diretórios. | ausente |
| Configuração / Código-fonte (busca negativa de composição) | Executado `git grep -n -I -i -E` no commit em todos os arquivos textuais, excluindo apenas `package-lock.json`, procurando `ModuleFederation`, `module.federation`, `remoteEntry`, `single-spa`, `registerApplication`, `registerMicroApps`, import maps, `postMessage`, `<iframe`, `srcDoc`, `exposes`, `remotes`, `qiankun`, `wujie`, `customElements`, `bootstrap`, `unmount` e `rewrites`: nenhum resultado. A busca ampliada por `micro.?front` e `federat` encontra somente a declaração negativa de `README.md:14`. Não foi encontrado contrato que prepare a aplicação para host externo. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma unidade própria Next.js: layout compartilhado (`src/app/layout.tsx:19–33`), página inicial (`src/app/page.tsx:3–6`) e página de produtos que importa componentes locais (`src/app/product/page.tsx:6–25`). Não há segunda unidade própria nem remote configurado. |
| Q2 | No | Um único build (`package.json:5–8`, `Dockerfile:5–13`) e imports diretos dos componentes/serviços do mesmo projeto (`src/app/product/page.tsx:6–25`, `tsconfig.json:21–23`). Não há conjunto de unidades independentes nem unidade preparada para host externo ausente. |
| Q3 | No | O layout envolve páginas internas (`src/app/layout.tsx:19–33`); a página de produtos renderiza componentes importados localmente (`src/app/product/page.tsx:124–170`). Não existe host/root que componha unidades frontend independentes. |
| Q4 | No | A configuração Next é vazia (`next.config.ts:3–7`), e as buscas de composição não encontraram mecanismo configurado ou consumido. Os fluxos observados usam imports locais e navegação Next (`src/app/product/page.tsx:6–25`, `:53–64`). |
| Q5 | No | Aplicação convencional única, de acordo com o código de composição local (`src/app/product/page.tsx:124–170`) e a descrição arquitetural (`README.md:12–14`). Q5 acompanha Q1–Q4. |

## Motivo

- Proposta `Non-MFE`: frontend monolítico convencional, com Q1–Q5 No. Modularização de classes, serviços, componentes e estado não demonstra decomposição em unidades frontend independentes.
- `frontend_units: 1` conta o alvo próprio observado, sem contar endpoints, testes ou componentes como unidades. Não se aplica a exceção MFE-unit: não há preparação explícita para integração em host externo. Por isso Q2–Q4 são No, não Undetermined.
- `repo_type: example` registra o exercício de entrevista (`README.md:91`). `ui_technologies: [react, next]` corresponde às tecnologias usadas nos fontes; `build_tools: []` segue a convenção de Next encapsulando o bundler, sem configuração explícita deste. `approaches: []` acompanha Non-MFE.

## Notas para análise

- **RQ1:** a presença da expressão micro frontend em uma negação (`README.md:14`) ilustra um falso positivo terminológico. Os metadados da descoberta não têm o termo (descrição vazia, tópicos vazios, nome "home24"), então, por eliminação, o acerto é compatível apenas com `README.md:14`, uma negação (metadados do momento da descoberta, lidos em modo somente leitura; a rodada 001 registra os mesmos acertos). A consulta de descoberta e as dependências não substituem a verificação das relações entre fontes, configuração e build.
- **RQ3:** layout, store e componentes convergem no mesmo projeto; a camada Axios fornece dados, não uma composição de interfaces (`src/app/layout.tsx:6–7`, `:32`, `src/api/clients/adminApiClient.ts:3–8`).
- **Protocolo (famílias/templates):** procurados `harshan89` e `home24` nas anotações existentes, sem irmão anotado. O histórico local identifica scaffold Create Next App no commit inicial `594551d`; não se demonstrou filiação a outro candidato. Como paralelo analítico, 081 também contém um frontend Next com componentes locais, mas não se afirma família compartilhada. Diferentemente do caso Multi-Zones 013, aqui não há rewrites nem aplicações por zona (`next.config.ts:3–7`). Os precedentes 023/028 orientam a não converter menções documentais em unidades.
- **Histórico:** `git rev-list --count 2cb36e849853c272820549ab6de61699f074b12d` retorna **44 commits**, incluindo merges; `git rev-parse --is-shallow-repository` retorna false. O log alcançável vai de `594551d` (2025-03-28, Initial commit from Create Next App) ao merge fixado (2025-04-02). Entre os assuntos observados estão estrutura de produtos, Redux/Saga, login, Docker, testes e documentação; isso contextualiza o exercício, sem substituir evidências do snapshot. A contagem não foi inferida do número de entradas de uma página ou do README.
- **Branches:** `master`, `origin/master` e `origin/HEAD` apontam ao commit fixado; `origin/users/harshan` aponta a `19bbb2575f1e995eaf6a96c5cfdd1c66ba2654d9`. As referências foram registradas, sem usar outro branch para completar a implementação avaliada.
- **Checklist:** não há decisão aberta que dependa de composição por links, iframes, compartilhamento de código federado ou falhas de execução. A inspeção foi estática e local; links externos, imagens de diagramas, vídeo e implantação Vercel não foram acessados. Não foram executados instalação, build, testes ou aplicação.
