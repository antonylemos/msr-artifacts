---
schema: 1
id: 1325875170
full_name: ArthTechX/PrepMate
url: https://github.com/ArthTechX/PrepMate
commit: 4aad7d956c0c3ea11955345076f25e70745d8f49
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

# 124 — ArthTechX/PrepMate

## Contexto

Aplicação full-stack de entrevistas simuladas, com perfil, currículo PDF, entrevista por voz, avaliação e relatório (`README.md:3–14`). Uma única UI Next.js/React consome rotas API e serviços de IA/mídia. O iframe da página exibe um PDF; o avatar Anam fornece streaming para um elemento de vídeo, não outra aplicação frontend montada.

Rank, ID e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:125`, status `cloned`; HEAD coincide com o commit do front matter. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`. Inspeção somente leitura do SHA, sem instalar dependências, executar builds/servidores, usar rede ou alterar o clone.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:125` registra rank 124, estratégia `technology` e elegibilidade `pass`. A fonte da amostra é a rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O candidato consta em `data/discovery/mfe-round-001/candidates.csv:34901`, com elegibilidade `unknown`, e `data/discovery/mfe-round-002/candidates.csv:34907`, com `pass`. Ambas registram descrição nula, tópicos vazios, linguagem TypeScript, `fork: false`, criação em 2026-08-06T20:48:47Z e push em 2026-08-06T21:10:23Z.

Consultas `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` de `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`, pelo ID 1325875170, mostram um hit em cada rodada:

- Consulta `technology-single-spa-repositories`, estratégia `technology`, texto **`"single-spa" in:name,description,readme`**.
- Subconsulta `technology-single-spa-repositories#created:2026-Q3`.
- Consulta efetiva `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-09-30`.
- Coletas: 2026-10-07T23:36:12.321Z na rodada 001 e 2026-10-08T16:21:53.010Z na rodada 002; `path` vazio, sem linha/campo casado.

Por eliminação, nome e descrição não contêm o termo pesquisado e não há tópicos. O sinal textual próximo observado é **“Single SPA”**, com espaço e maiúsculas, em `README.md:542`: `Page[page.tsx - Single SPA]`. A expressão aparece no diagrama de arquivos para descrever uma página única, sem citar o framework single-spa. Não se reescreve essa grafia como ocorrência literal de `single-spa`, nem se afirma qual normalização da busca produziu o hit; a API não registrou essa explicação. O README inteiro pertence ao único commit, de 2026-08-06T21:08:58Z, anterior às buscas de outubro, não posterior. O nome do repositório não foi usado como evidência arquitetural.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r`: 43 arquivos regulares `100644`, zero symlinks e zero gitlinks. Um único manifesto/config Next, `app/layout.tsx`, `app/page.tsx`, rotas API, bibliotecas de servidor, Prisma e assets. Não há segundo alvo frontend, host/remote, submódulo, `node_modules` versionado ou configuração explícita de bundler. | contrária |
| Código-fonte (UI) | `app/layout.tsx:20–33` fornece o layout raiz que envolve `children`; `app/page.tsx:1–3` define a página client com hooks React. O inventário contém apenas essa página de interface; as demais rotas em `app/api` são endpoints. Não há entradas/builds de regiões independentes. | contrária |
| Configuração / Build/deploy | `package.json:5–12` define um único ciclo `next dev/build/start`, além de tarefas Prisma. `next.config.ts:1–7` exporta configuração vazia, sem hook de bundler, remotes ou composição. `tsconfig.json:21–23` resolve `@/*` para a raiz local. As pastas `app`, `lib/agents` e `prisma` não constituem unidades frontend por sua separação em diretórios. | contrária |
| Tecnologia (resolução) | `package.json:20–25` declara Next 16.1.6 e React/ReactDOM 19.2.3, resolvidos em `package-lock.json:5554–5556`, `package-lock.json:6213–6215` e `package-lock.json:6222–6224`. Next encapsula o bundler; não se infere Webpack/Turbopack de dependências transitivas ou do nome do framework. Não se executou instalação/build. | contexto |
| Código-fonte (iframe) | `app/page.tsx:1464–1475` rotula “Resume preview (PDF)” e aponta o iframe a `/api/resumes/${selectedResume.id}/pdf`. `app/api/resumes/[resumeId]/pdf/route.ts:25–41` busca o arquivo e devolve `Content-Type: application/pdf` e disposição inline. Trata-se de visualização de documento, sem contrato entre unidades frontend. | contrária |
| Código-fonte (avatar) | `app/page.tsx:208–235` obtém token pela API local, importa o SDK Anam e chama `streamToVideoElement("anam-video")`; `app/page.tsx:237–240` cria entrada de áudio PCM. A implementação entrega mídia a um elemento DOM, sem carregar uma UI remota com entrada/build próprios. O SDK está declarado (`package.json:15`) e resolvido em `package-lock.json:50–52`. | contexto |
| Código-fonte (fronteiras) | Busca ativa literal por `../../` e `../../../` em todos os JS/TS/TSX do SHA: nenhuma ocorrência. Os dois únicos arquivos TSX são o layout e a página do mesmo alvo. A ausência de travessias não estabelece independência de unidades que não existem; aliases locais não foram tratados como composição. | contexto |
| Tecnologia / Configuração / Composição | Busca nos arquivos textuais, excluindo o lockfile, por `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage`, `iframe`, `customElements`, `import.?map` e `micro.?frontend` retorna apenas “Single SPA” no diagrama (`README.md:542`), o iframe de PDF e seu comentário de endpoint (`app/api/resumes/[resumeId]/pdf/route.ts:6–9`). Busca adicional por `single-spa`, `registerApplication`, `ModuleFederation`, `remoteEntry`, `exposes`, `remotes` e `importmap` em TS/TSX/JSON não encontra esses mecanismos, inclusive no lockfile. | ausente |
| Documentação (arquitetura) | O HLD distingue um cliente React e o servidor Next/API dos serviços externos (`README.md:44–77`). O diagrama de camadas descreve “Single-Page React UI” (`README.md:80–105`), e o mapa de arquivos identifica `page.tsx` como “Single SPA” (`README.md:537–549`). Essa documentação é coerente com o inventário e o código, não evidência de framework single-spa. Não há ADR separado no inventário. | contexto |

## Autoria e histórico

Metadados de `git rev-list`: **1 commit, 0 merges e 1 commit-raiz**, o próprio SHA avaliado; clone não shallow. Autor e committer `Arth Kumar`, em 2026-08-07T02:38:58+05:30 (2026-08-06T21:08:58Z), mensagem `Initial commit`.

`git log --no-renames --name-status` por `app`, `lib` e `prisma` mostra adição conjunta de 14, 15 e 1 arquivos, respectivamente, no mesmo commit. Não há evolução granular que demonstre a escrita original de cada trecho pelo titular. Adição em bloco não prova vendorização nem geração automática, e não foi encontrado upstream declarado nas evidências lidas; o conteúdo foi tratado como implementação materializada do candidato, com esse limite de autoria. SDKs externos são dependências e não foram atribuídos ao titular como unidades próprias. Não se leram blobs históricos, e nenhum objeto ausente foi encontrado.

Referências locais apenas para registro: `main`, `origin/main` e `origin/HEAD` apontam ao SHA fixado. Não há outro branch na enumeração local; isso não garante inexistência de outros branches no servidor. Não se incorporou conteúdo externo ao snapshot.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma aplicação Next, com layout/página próprios e ciclo de build único (`app/layout.tsx:20–33`; `app/page.tsx:1–3`; `package.json:5–8`). O iframe é um PDF, e o avatar é mídia, não outras unidades frontend. |
| Q2 | No | Não há conjunto de unidades com entradas/builds independentes. A página e as rotas API compartilham o projeto Next (`package.json:5–12`; `next.config.ts:1–7`); a organização de bibliotecas/serviços não cria unidades frontend. |
| Q3 | No | O layout envolve a própria página (`app/layout.tsx:20–33`), sem host/shell que carregue, monte ou roteie unidades distintas. O iframe de currículo (`app/page.tsx:1464–1475`) é apresentação de dados. |
| Q4 | No | Não há mecanismo de composição configurado. A configuração Next é vazia (`next.config.ts:1–7`); o iframe retorna PDF (`app/api/resumes/[resumeId]/pdf/route.ts:36–41`) e o SDK faz streaming de mídia (`app/page.tsx:231–240`). |
| Q5 | No | Q1–Q4 convergem: frontend convencional único com APIs/IA/mídia, sem arquitetura MFE observável. “Single SPA” (`README.md:542`) não identifica a biblioteca single-spa. |

## Motivo

- `Non-MFE` pelo caso de frontend monolítico convencional. Não se trata de unidade preparada para host externo; portanto `MFE-unit` não se aplica e Q2–Q4 são No, não Undetermined.
- `frontend_units: 1` e `unit_organization: single-unit` registram o único alvo próprio. APIs, agentes de IA, bibliotecas e mídia/documentos não aumentam a contagem.
- `repo_type: production` descreve a aplicação voltada ao fluxo de preparação para entrevista (`README.md:3–14`), sem afirmar implantação operacional verificada. `ui_technologies: [react, next]` segue a convenção para Next; `build_tools: []` porque não há configuração explícita de bundler.
- Não há questão metodológica aberta de iframe/composição por links/build time: o alvo do iframe foi verificado como PDF e não há segunda aplicação identificada. Não se aplica uma regra genérica de exclusão a todo iframe; avalia-se o conteúdo concreto deste caso.

## Notas para análise

- **Protocolo (família):** busca nas anotações por `ArthTechX`, `PrepMate` e `Anam` não encontrou irmão já anotado. Artefatos padrão de Next não provam linhagem comum com candidato específico.
- **RQ1:** a estratégia de tecnologia recuperou o candidato por consulta `"single-spa"`, enquanto a evidência textual próxima é “Single SPA” no sentido de uma interface única. O hit não confirma uso da biblioteca; nomes de SDK e tags iframe também exigem inspeção do consumidor e do conteúdo.
- **Checklist:** diferentemente de 076/084/096/106/109, não há cadeia de unidades; diferentemente de 097/103/104, não há configuração MFE que dependa de reparar conexão; diferentemente de 089/100, não há federação usada para compartilhar componentes. O caso também não é conteúdo apenas proposto/gerado como em 023/075/081/105: a UI é implementada, mas é um alvo convencional único. As dependências externas não tornam o sistema um plugin de plataforma terceiro como os discutidos em 037/074/102.
- **RQ1 (família de sinal enganoso, com 110):** 110 e 124 foram recuperados pela mesma consulta `technology-single-spa-repositories`, e em ambos o README traz "single SPA" (`110: README.md:11`; `124: README.md:542`, "Page[page.tsx - Single SPA]") como descrição de página única, não a biblioteca single-spa. A grafia com espaço casa com o termo da consulta; falso positivo recorrente a considerar em RQ1.
