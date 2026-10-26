---
schema: 1
id: 695955368
full_name: mbianchidev/engineering-interviews
url: https://github.com/mbianchidev/engineering-interviews
commit: a66f1531c498a9320fcd0d9a7899f9d53d44762d
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

# 127 — mbianchidev/engineering-interviews

## Contexto

Banco de perguntas de entrevista de engenharia mantido no `README.md`, acompanhado de um site Next.js de prática publicado no GitHub Pages (`README.md:3`; `README.md:18–20`; `SETUP.md:3`). Micro-frontends aparecem só como duas perguntas do banco, não como arquitetura do site. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:128` registra rank 127, ID 695955368, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:128` registra a estratégia `terminology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:6714` e em `data/discovery/mfe-round-002/candidates.csv:6719`, ambos com elegibilidade `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada, todos com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2023-09` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2023-09-01..2023-09-30` | 2026-10-07T22:18:29.204Z / 2026-10-08T15:52:58.583Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2023-09` | `"micro frontends" … created:2023-09-01..2023-09-30` | 2026-10-07T22:49:13.466Z / 2026-10-08T16:04:39.648Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2023-09` | `microfrontend … created:2023-09-01..2023-09-30` | 2026-10-07T18:23:17.308Z / 2026-10-08T15:36:40.868Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2023-09` | `microfrontends … created:2023-09-01..2023-09-30` | 2026-10-07T22:06:11.663Z / 2026-10-08T15:46:17.036Z |

Os metadados do hit registram nome `engineering-interviews`, descrição “A platform to prepare for engineering interviews”, tópico `interview-preperation`, linguagem TypeScript, `fork: false`, criação em 2023-09-24T18:01:39Z e push em 2026-10-02T08:58:18Z. Nenhum desses campos contém os termos buscados. Por eliminação, o acerto vem do README: `README.md:399` (“What are microfrontends?”, grafia unida) e `README.md:400` (“What are the benefits of using micro frontends?”, grafia separada). As consultas no singular (`micro frontend`, `microfrontend`) não têm ocorrência literal no singular. Nesses dois casos, o casamento depende do processamento textual da busca do GitHub, que não está registrado nos hits.

A última alteração de `README.md` alcançável a partir do SHA é `f8df05c` (mbianchidev, 2026-10-02T01:24:11+02:00), antes das coletas de 7 e 8 de outubro. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 40 entradas, todas arquivos regulares `100644`; zero symlinks (`120000`) e zero gitlinks (`160000`). Um único `package.json` na raiz, uma árvore `app/`, `lib/`, `scripts/`, `tests/`, `public/` e dois workflows. Nenhum `package.json` em subpasta em toda a história alcançável (`git log --name-only`). | contrária |
| Código-fonte (UI) | `app/layout.tsx:12–29`: um layout raiz com `SiteHeader` e `{children}`. `app/page.tsx:1–4` importa componentes e dados locais, e `app/page.tsx:20–21` liga a `/practice` e `/topics` por `next/link`, rotas do mesmo App Router. | contrária |
| Código-fonte (fronteiras) | Busca por `from '../`, `import('../` e `require('../` em TS/TSX/JS/MJS: 16 ocorrências. As de `../../` (`app/topics/[categoryId]/page.tsx:4`; `app/topics/[categoryId]/QuestionItem.tsx:6`) e as de `../` em `app/practice/page.tsx:4–5`, `app/ask-companies/page.tsx:5–6` e `app/topics/page.tsx:4–5` apontam para `app/components`. `lib/topicPresentation.ts:1` importa tipo de `app/components/Icon`; `lib/questionsData.ts:4` importa `public/questions.json`; `scripts/generate-questions.ts:3` importa `lib/parseQuestions`. Todas ficam dentro do mesmo projeto e não há segunda unidade para atravessar. | contrária |
| Configuração / Build/deploy | `package.json:5–11`: um único ciclo `next dev`/`next build`, precedido da geração do JSON. `next.config.ts:6–13`: `output: 'export'`, imagens sem otimização e `basePath`; sem hook de bundler nem composição. `.github/workflows/deploy.yml:38–57`: `npm ci`, `npm run build`, upload de `./out` e publicação no Pages, em um único artefato. | contrária |
| Tecnologia | `package.json:16–18` declara `next` 16.3.8, `react` e `react-dom` 19.3.0, resolvidos em `package-lock.json:5633–5635`, `6037–6039` e `6046–6048`. O lockfile não contém pacotes de federation, single-spa, qiankun ou wujie. | contexto |
| Código-fonte (gerador) | `scripts/generate-questions.ts:3–22` lê o README via `parseReadme` (`lib/parseQuestions.ts:31–34`) e grava `public/questions.json`; `lib/questionsData.ts:4–8` importa esse JSON para o cliente. Gera dados de perguntas, não código ou unidades frontend. | contexto |
| Documentação (sinal temático) | `README.md:397–400`: seção “Frontend Engineering Scenarios” com as duas perguntas sobre micro-frontends; `public/questions.json:1700–1709` e `public/questions.json:3971–3978` as reproduzem como texto. São conteúdo exibido, sem configurar ou conectar unidades. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` em toda a árvore do SHA, exceto o lockfile, por `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage`, `iframe`, `customElements`, `import.?map`, `micro.?front`, `webpack`, `turbopack`, `rspack`, `vite`, `exposes`, `remotes` e `zones`. Só há acertos em `README.md:399–400` e nas cópias em `public/questions.json`. | ausente |
| Documentação (arquitetura) | `SETUP.md:3`: “A static Next.js website”. `SETUP.md:14`: sem conta nem backend, com dados no `localStorage`. `SETUP.md:62–82`: stack e mapa de pastas de um único site. `SETUP.md:58–60`: publicação pelo workflow de Pages. | contexto |
| Histórico | Ver “Autoria e histórico”: o site Next surge em 2025-11-16 e evolui em um só projeto. Os caminhos já alterados na história alcançável não registram arquivos de federação, remotes, shell ou subpacotes. | contexto |

## Autoria e histórico

Clone não raso. `git rev-list` no SHA: 73 commits, 14 merges e uma raiz, `ea68228` (mbianchidev, 2023-09-25T01:53:42+02:00, “Initial commit #1”). O SHA avaliado é o merge do PR #18 (`cp-desktop-interview-workbench`), de Matteo Bianchi, em 2026-10-02T10:58:18+02:00, com pais `b7ef2ba` e `f8df05c`.

Autores registrados em toda a história: `copilot-swe-agent[bot]` 33, Matteo Bianchi 27, mbianchidev 11 e Sevi Karakulak 2. Em `app/`, `lib/` e `scripts/`: 18 commits do bot e 1 de mbianchidev. `git log --no-renames --name-status` por pasta registra 19 commits em `app`, 6 em `lib`, 1 em `scripts`, 3 em `.github`, 5 em `package.json` e 4 em `next.config.ts`. `layout.tsx`, `package.json`, `next.config.ts` e o parser são adicionados em `b42f601` (bot, 2025-11-16, “Transform into Next.js website with practice mode and topic browsing”). `scripts/generate-questions.ts` é adicionado em `90847db` (bot, 2025-11-16). Esses metadados atribuem a construção do site majoritariamente a commits do agente Copilot, aceitos por merges do titular. Eles indicam quem registrou os commits, não a autoria intelectual de cada trecho. Não há indício de código importado de aplicação terceira.

Refs locais: `main`, `origin/main` e `origin/HEAD` no SHA avaliado; `origin/cp-desktop-interview-workbench` em `f8df05c`; `origin/copilot/add-auth-layer-stripe-integration` em `4625f1a`. O conteúdo desses branches não foi considerado. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Há uma só unidade frontend identificável: um projeto Next com um `package.json` (`package.json:5–11`) e um layout raiz (`app/layout.tsx:12–29`). Não existe configuração de composição que referencie unidades externas (busca registrada). As menções em `README.md:399–400` são perguntas. |
| Q2 | No | Não há duas unidades com entrada e build próprios. As páginas compartilham o build único (`package.json:7`) e importam `app/components` e `lib/` do mesmo projeto (`app/topics/[categoryId]/page.tsx:1–5`). |
| Q3 | No | O layout raiz envolve rotas do mesmo App Router (`app/layout.tsx:21–22`); `app/page.tsx:20–21` só navega entre páginas internas. Não há host/shell carregando unidades distintas. |
| Q4 | No | `next.config.ts:6–13` configura apenas exportação estática e `basePath`; o deploy publica um artefato único (`.github/workflows/deploy.yml:41–46`). A busca não encontra mecanismo de composição. |
| Q5 | No | Q1–Q4 são No: site convencional de prática que trata micro-frontends como tema de pergunta. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde aos casos “conventional frontend monoliths” e “repositories mentioning micro-frontends without implementing them”. `MFE-unit` não se aplica: não há `exposes`, lifecycles ou outro preparo para host externo.
- `frontend_units: 1` / `single-unit`: conta o site Next materializado. Páginas, componentes, JSON gerado e testes não são unidades. Diferentemente dos perfis 011/064/068/073/077/101/111 (`frontend_units: 0`, sem aplicação), aqui existe uma aplicação implementada.
- `repo_type: production`: ferramenta de prática para uso real, com workflow de publicação no GitHub Pages (`.github/workflows/deploy.yml:38–57`; `SETUP.md:58–60`). Não se verificou o site publicado. `ui_technologies: [react, next]` segue o manifesto e os fontes. `build_tools: []` segue a convenção de Next encapsulando o bundler sem configuração explícita (como em 094 e 124).
- Não há decisão aberta. Não existe iframe, link entre aplicações distintas ou composição em build time a avaliar. Os links são rotas internas de um único app.

## Notas para análise

- **RQ1 (sinais enganosos):** o acerto vem de duas perguntas do banco no README (`README.md:399–400`), replicadas no JSON gerado. A estratégia terminológica captura repositórios que só tratam o tema como conteúdo, como em 023.
- **Checklist:** como em 023, conteúdo sobre MFE não conta como implementação. Como em 075/081/105, o gerador produz dados, não unidades. Como em 094 (exercício de entrevista), há uma aplicação própria `single-unit`. Não há cadeia host/remotes como em 076/084/096/106/109, configuração MFE não conectável como em 097/103/104, federação para code sharing como em 089/100, nem plataforma terceira como em 074/080/102.
- **Protocolo (busca):** os hits das consultas no singular dependem do processamento textual do GitHub. O README só tem as formas no plural.
- **Protocolo (família):** nenhuma outra anotação em `docs/mfe-classification/` cita `mbianchidev`.
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE e Q1–Q5 No; sem decisão aberta. Três ressalvas sem efeito na classe: (1) o inventário de caminhos históricos deve usar `git log --no-renames --format= --name-only`; sem `--no-renames` o comando falha ao pedir um blob histórico ausente do clone parcial (`GIT_NO_LAZY_FETCH=1`), então a afirmação de que não faltam objetos vale apenas para os comandos concluídos; (2) a atribuição do acerto ao `README.md:399–400` é inferência por eliminação, sem fragmento devolvido pela API, e as duas formas literais do README são plurais; o README do SHA (último commit que o altera, `f8df05c`, 2026-10-01T23:24:11Z) é anterior às buscas de 7 e 8/10; (3) comparações com 094, 124, 013 e 036 são contextuais, pois não são anotações finais; os finais comparáveis são 003 (aplicação convencional, uma unidade), 023 (conteúdo sobre MFE), 026, 041, 050 e 058 (MFE-unit não se aplica). Foram contadas 16 ocorrências de imports relativos que sobem diretórios, nenhuma entre unidades frontend.
