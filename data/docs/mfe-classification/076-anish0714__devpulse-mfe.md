---
schema: 1
id: 1353825451
full_name: anish0714/devpulse-mfe
url: https://github.com/anish0714/devpulse-mfe
commit: 6a2348d162b34030505554ab0ef954577627999a
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 6
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 076 — anish0714/devpulse-mfe

## Contexto

Caixa de ferramentas de navegador organizada em shell e cinco aplicações remotas: conversão PDF, manipulação PDF, utilitários de desenvolvimento, preenchimento de formulários PDF e OCR. O projeto se apresenta como demonstração de arquitetura (`README.md:9–12`); a classificação se apoia nas configurações e no consumo dos componentes no código, não no nome do repositório ou nessa declaração.

Clone conferido em `data/samples/mfe-sample-001/repos/anish0714__devpulse-mfe/`. Rank, ID e SHA correspondem à linha `cloned` de `data/samples/mfe-sample-001/clones.csv:77`; `git rev-parse HEAD` retornou o SHA do front matter e `git cat-file -t` confirmou um commit. Inventário integral de 90 arquivos por `git ls-tree -r --name-only`; conteúdo e citações verificados com `git show`/`git grep` no SHA fixado. Não foram executados builds ou acessados os ambientes publicados.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Build/deploy | `package.json:5–11` declara workspaces em `packages/*` e delega builds a cada workspace. O inventário identifica seis pacotes com manifesto, configuração Webpack, entrada e bootstrap próprios; as seis linhas seguintes registram esses artefatos. | moderada |
| Configuração / Código-fonte / Build/deploy (shell) | `packages/shell/package.json:5–8` define start/build próprios; `packages/shell/webpack.config.js:28–34` define entrada e saída; `packages/shell/src/index.ts:3` carrega o bootstrap; `packages/shell/src/bootstrap.tsx:1–7` monta a aplicação React. | moderada |
| Configuração / Código-fonte / Build/deploy (dev-utils) | `packages/dev-utils-remote/package.json:5–8` define start/build próprios; `packages/dev-utils-remote/webpack.config.js:10–16` define entrada/saída e `:28–38` define porta, nome `devUtils`, `remoteEntry.js` e exposição de `./Widget`; `packages/dev-utils-remote/src/index.ts:3` e `packages/dev-utils-remote/src/bootstrap.tsx:1–7` constituem a entrada independente. | moderada |
| Configuração / Código-fonte / Build/deploy (OCR) | `packages/ocr-remote/package.json:5–8` define start/build próprios; `packages/ocr-remote/webpack.config.js:10–16` define entrada/saída e `:28–38` define porta, nome `ocr`, `remoteEntry.js` e exposição de `./Widget`; `packages/ocr-remote/src/index.ts:3` e `packages/ocr-remote/src/bootstrap.tsx:1–7` constituem a entrada independente. | moderada |
| Configuração / Código-fonte / Build/deploy (conversão PDF) | `packages/pdf-conversion-remote/package.json:5–8` define start/build próprios; `packages/pdf-conversion-remote/webpack.config.js:10–16` define entrada/saída e `:28–38` define porta, nome `pdfConversion`, `remoteEntry.js` e exposição de `./Widget`; `packages/pdf-conversion-remote/src/index.ts:3` e `packages/pdf-conversion-remote/src/bootstrap.tsx:1–7` constituem a entrada independente. | moderada |
| Configuração / Código-fonte / Build/deploy (formulários PDF) | `packages/pdf-form-filler-remote/package.json:5–8` define start/build próprios; `packages/pdf-form-filler-remote/webpack.config.js:10–16` define entrada/saída e `:28–38` define porta, nome `pdfFormFiller`, `remoteEntry.js` e exposição de `./Widget`; `packages/pdf-form-filler-remote/src/index.ts:3` e `packages/pdf-form-filler-remote/src/bootstrap.tsx:1–7` constituem a entrada independente. | moderada |
| Configuração / Código-fonte / Build/deploy (manipulação PDF) | `packages/pdf-manipulation-remote/package.json:5–8` define start/build próprios; `packages/pdf-manipulation-remote/webpack.config.js:10–16` define entrada/saída e `:28–38` define porta, nome `pdfManipulation`, `remoteEntry.js` e exposição de `./Widget`; `packages/pdf-manipulation-remote/src/index.ts:3` e `packages/pdf-manipulation-remote/src/bootstrap.tsx:1–7` constituem a entrada independente. | moderada |
| Composição / Configuração | `packages/shell/webpack.config.js:11–25` seleciona os cinco endpoints `remoteEntry.js` de produção ou localhost; `:50–58` configura o `ModuleFederationPlugin` com os nomes correspondentes aos cinco remotes. Os nomes e módulos expostos coincidem com os artefatos de cada remote acima. | forte |
| Composição / Código-fonte (consumo) | `packages/shell/src/App.tsx:7–11` importa os cinco `Widget` por `React.lazy`; `:34–90` associa cada componente a uma seção da aplicação; `:95–97`, `:135–147` e `:160–166` selecionam e renderizam o componente remoto em `Suspense` dentro de `RemoteErrorBoundary`. Não se trata apenas de declarações de tipos ou dependências. | forte |
| Código-fonte (UI composta) | Os módulos expostos contêm telas de ferramentas: `packages/dev-utils-remote/src/Widget.tsx:18–40` renderiza seleção e ferramenta ativa; `packages/pdf-conversion-remote/src/Widget.tsx:185–199` renderiza navegação das operações; `packages/pdf-manipulation-remote/src/Widget.tsx:277–287`, `packages/pdf-form-filler-remote/src/Widget.tsx:115–125` e `packages/ocr-remote/src/Widget.tsx:114–123` renderizam telas com entrada de arquivos. São interfaces de aplicações, além de compartilhamento de código utilitário. | forte |
| Estrutura / Código-fonte (independência) | Inspecionadas as referências `from`, imports laterais, `import()` e `require()` em todos os fontes `.ts`/`.tsx` sob `packages/*/src/`: 67 especificadores relativos, nenhum resolvendo para outro pacote. Os não relativos são bibliotecas externas e os cinco imports federados de `packages/shell/src/App.tsx:7–11`. Procuradas também dependências de um workspace nos manifestos dos outros: nenhuma. Os cinco módulos federados são declarados em `packages/shell/src/types/remotes.d.ts:1–29`, o que confirma que os imports de `App.tsx:7–11` são especificadores federados. Utilitários como `CopyButton.tsx` e `FileDropZone.tsx` estão duplicados entre remotes, sem pacote comum. Os seis `tsconfig.json` incluem apenas `src` (`packages/shell/tsconfig.json:13`, `packages/dev-utils-remote/tsconfig.json:13`, `packages/ocr-remote/tsconfig.json:13`, `packages/pdf-conversion-remote/tsconfig.json:13`, `packages/pdf-form-filler-remote/tsconfig.json:13`, `packages/pdf-manipulation-remote/tsconfig.json:13`), sem aliases para fontes de outras unidades. | ausente |
| Build/deploy (limitação) | `.github/workflows/deploy.yml:36–44` constrói todos os workspaces, mas copia ao site somente shell, conversão PDF e manipulação PDF; `:46–60` publica esse site em Pages. Os caminhos de dev-utils, formulários PDF e OCR exigidos em `packages/shell/webpack.config.js:17–25` não são copiados. `.github/workflows/ci.yml:18`, `:32–36` também cobre apenas três pacotes na matriz. Contrasta com a descrição de seis unidades publicadas e verificadas separadamente em `README.md:88–96`, `:113–116`; não se afirma que os cinco remotes funcionem no site publicado por esse workflow. O histórico explica a lacuna: o commit d0b0a84 (2026-09-01, "Revert workflow-file edits (push blocked without workflow OAuth scope)") diz que `ci.yml` e `deploy.yml` ainda precisavam da entrada e do caminho de dev-utils, e os remotes seguintes (5062d12 e fcca491, mesma data) também não foram adicionados. A omissão decorre de um bloqueio de permissão no push, não de um desenho de deploy (histórico lido somente leitura). | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Seis unidades identificáveis: shell e cinco remotes, com entradas/builds registrados na tabela. O host referencia todos explicitamente (`packages/shell/webpack.config.js:50–58`), e os componentes consumidos constam de `packages/shell/src/App.tsx:7–11`. |
| Q2 | Yes | Cada unidade tem entrada, bootstrap e build próprios; as seis linhas de unidades documentam os artefatos. Por exemplo, `packages/dev-utils-remote/package.json:5–8`, `packages/dev-utils-remote/webpack.config.js:10–16` e `packages/dev-utils-remote/src/bootstrap.tsx:1–7`. A inspeção dos imports não encontrou acesso direto aos fontes de outra unidade; a integração do shell usa nomes federados (`packages/shell/src/App.tsx:7–11`). A publicação conjunta de arquivos preserva bundles e endpoints separados (`.github/workflows/deploy.yml:41–44`; `packages/shell/webpack.config.js:11–25`). |
| Q3 | Yes | O shell oferece navegação entre seções e renderiza o remote selecionado na mesma aplicação (`packages/shell/src/App.tsx:34–90`, `:95–97`, `:135–166`). |
| Q4 | Yes | Há correspondência entre `remotes` do host (`packages/shell/webpack.config.js:50–58`), `exposes` dos cinco remotes (cada `webpack.config.js:33–38` listado na tabela) e imports/renderização reais do shell (`packages/shell/src/App.tsx:7–11`, `:160–166`). Isso estabelece composição por Module Federation no código, incluindo pelo menos os dois remotes copiados pelo workflow de publicação (`.github/workflows/deploy.yml:41–44`). |
| Q5 | Yes | Configurações recíprocas, unidades com builds/entradas próprios e UI remota efetivamente consumida pelo shell sustentam uma instância MFE (`packages/shell/webpack.config.js:50–58`; `packages/shell/src/App.tsx:7–11`, `:160–166`; artefatos individuais na tabela). A limitação da publicação não elimina a composição implementada. |

## Motivo

- Aplica-se `MFE-implemented`: Q1–Q5 são Yes. Corresponde ao caso de inclusão de monorepo com host e remotes e ao de demonstração que efetivamente compõe unidades frontend.
- `frontend_units: 6` conta o shell e as cinco aplicações remotas observadas. As ferramentas internas de dev-utils são componentes da mesma unidade, não unidades adicionais (`packages/dev-utils-remote/src/Widget.tsx:3–20`).
- Não se aplica a exclusão de Module Federation usado somente para compartilhamento de código: o host renderiza telas de ferramentas vindas dos remotes. Também não se aplica `MFE-unit`, pois o host está presente e consome as exposições.
- A montagem do diretório `site/` durante o deploy copia builds independentes; não integra fontes dos remotes em um pacote consumido estaticamente pelo shell. A conexão usa `remoteEntry.js` e imports federados em runtime (`packages/shell/webpack.config.js:11–25`, `:50–58`; `packages/shell/src/App.tsx:7–11`). Não há decisão aberta de composição em build time, por links ou iframes.
- A evidência de arquitetura está no código e na configuração. O workflow incompleto limita a publicação dos cinco remotes; a análise não confirma execução, acessibilidade atual ou sucesso de build/deploy.

## Notas para análise

- **RQ1:** o README descreve o estado pretendido (seis unidades em CI e publicação); os workflows no commit ficaram defasados, com só shell e dois remotes na matriz/cópia, por bloqueio de push (d0b0a84). A contagem de seis unidades vem dos artefatos, não da alegação de implantação independente.
- **RQ2:** Module Federation/Webpack com aplicações React, bootstrap assíncrono, singleton de React e componentes remotos carregados sob demanda (`packages/shell/src/index.ts:1–3`; `packages/shell/webpack.config.js:59–61`; `packages/shell/src/App.tsx:7–11`).
- **RQ3:** cadeia verificada entre nomes/URLs em `remotes`, nomes/`exposes` das unidades e consumo por `lazy`/renderização no host. A publicação parcial é uma limitação operacional conhecida, sem decisão metodológica pendente sobre a classe.
