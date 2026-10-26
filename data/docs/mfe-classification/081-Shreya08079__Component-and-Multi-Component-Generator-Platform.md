---
schema: 1
id: 1026753138
full_name: Shreya08079/Component-and-Multi-Component-Generator-Platform
url: https://github.com/Shreya08079/Component-and-Multi-Component-Generator-Platform
commit: 533c551b1150d03a65725ba6b078bcd4c610b075
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
  date: 2026-10-22
---

# 081 — Shreya08079/Component-and-Multi-Component-Generator-Platform

## Contexto

CodeCraft é um playground de geração, edição e exportação de componentes, com um frontend Next.js/React e uma API Express. O README usa o termo micro-frontend (`README.md:3–14`), mas o código implementa uma aplicação convencional cujo iframe mostra conteúdo gerado, mantido no estado da própria página. A classificação não atribui arquitetura MFE à plataforma com base no nome, nas descrições ou nas saídas do gerador.

Clone conferido em `data/samples/mfe-sample-001/repos/Shreya08079__Component-and-Multi-Component-Generator-Platform/`. Rank, ID e SHA correspondem à linha `cloned` de `data/samples/mfe-sample-001/clones.csv:82`. `git rev-parse HEAD` retornou o SHA do front matter e `git cat-file -t` confirmou um commit. Inventário integral de 42 arquivos por `git ls-tree -r -z --name-only`; sem gitlinks no inventário por `git ls-tree -r`. Fontes e citações inspecionados por `git show` e buscas por `git grep` no SHA fixado. Não foram executados builds, a aplicação ou chamadas aos serviços externos.

**Branches, somente para registro:** `git for-each-ref` enumerou `refs/heads/master`, `refs/remotes/origin/master` e `refs/remotes/origin/HEAD`, todos apontando a `533c551b1150d03a65725ba6b078bcd4c610b075`. Não há outro branch disponível neste clone para inspecionar; nenhum fetch ou conteúdo externo ao snapshot foi usado.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Configuração / Build/deploy | O inventário contém um único projeto frontend (`frontend/`) e uma API (`backend/`), com apenas dois manifestos. `frontend/package.json:5–18` define scripts Next.js e dependências React; `backend/package.json:5–8`, `:13–20` define a entrada Node e dependências Express/Mongoose. Backend não é uma segunda unidade frontend; páginas e componentes de `frontend/src/` pertencem ao mesmo projeto/build. | contrária |
| Código-fonte / Configuração (UI) | `frontend/src/pages/_app.js:1–4` é o wrapper compartilhado das páginas Next.js. `frontend/src/pages/dashboard.js:3–7` importa estaticamente os painéis locais; `frontend/jsconfig.json:2–6` resolve `@/components/*` para os próprios fontes. `frontend/src/pages/dashboard.js:85–102`, `:125–129` renderiza esses componentes como partes da mesma aplicação. | contrária |
| Código-fonte (geração e estado) | `frontend/src/components/ChatPanel.js:23–35` envia o prompt para `/api/llm/generate` e passa o texto retornado a `setCode`. `backend/controller/llmController.js:14–32` solicita código ao serviço LLM e o devolve em JSON. `frontend/src/pages/dashboard.js:13–14`, `:21–26`, `:95–100` mantém/carrega o código de sessão e liga o painel ao setter local. O resultado é conteúdo de trabalho do gerador, não uma unidade versionada com entrada/build próprios. | contrária |
| Composição / Código-fonte (preview) | `frontend/src/pages/dashboard.js:109–119` renderiza um iframe apenas quando há `jsxCode`; o atributo `srcDoc` em `:114` monta uma string HTML com `cssCode` e `jsxCode`. Não há URL de aplicação filha, remote entry, build de aplicação gerada ou contrato de montagem independente. O iframe isola a prévia dos dados da sessão, não conecta duas unidades frontend identificadas no repositório. O `srcDoc` contém um `parent.postMessage` (`:114`), mas nenhum `addEventListener('message')` nem `onmessage` em `frontend/src`; a página usa um listener de clique no `contentWindow` (`:115–118`). Sem consumidor no pai e vindo de uma string gerada, não é contrato de integração entre unidades. | contrária |
| Código-fonte (edição e exportação) | `frontend/src/pages/dashboard.js:67–70` altera a string exibida ao editar propriedades. `frontend/src/components/CodeTabs.js:14–24` exporta somente `Component.jsx` e `styles.css` em ZIP; `:64–76` mostra o código com realce. Não gera manifesto, entrada ou build de um remote integrado à plataforma. | contexto |
| Configuração / Build/deploy (API e publicação) | `frontend/next.config.js:3–16` configura o aplicativo Next, exportação estática e rewrite de `/api/:path*` para o backend. `vercel.json:3–12` seleciona `frontend/package.json` para `@vercel/next` e encaminha rotas ao frontend. É conexão UI/API e publicação de um frontend, sem composição de aplicações UI. | contrária |
| Documentação | `README.md:3–7` denomina o playground/viewport como micro-frontend; `README.md:20–25` descreve geração, preview e exportação. `architecture.md:5–14`, `:47–51` distingue um frontend Next/React, backend API e iframe de preview. A expressão arquitetural foi confrontada com os artefatos acima. | fraca |
| Tecnologia / Configuração / Código-fonte / Composição | Busca com `git grep -n -i -E` no commit, excluindo `.env.local` e arquivos terminados em `lock.json`, por `ModuleFederationPlugin`, `module.?federation`, `single.?spa`, `registerApplication`, `remoteEntry`, `remotes`, `exposes`, `import.?map`, `qiankun`, `wujie`, `customElements[.]define` e `System[.]import`: nenhuma ocorrência. O inventário também não contém configuração Webpack/Vite/Rspack ou manifestos de hosts/remotes adicionais; a configuração de aplicação é `frontend/next.config.js:1–20`. A busca complementar por `<iframe`, `srcDoc` e termos micro-frontend identificou as descrições e a prévia inspecionada em `frontend/src/pages/dashboard.js:108–119`, não outra aplicação componível. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Há apenas um alvo frontend próprio (`frontend/package.json:5–18`; `frontend/src/pages/_app.js:1–4`). Backend não é frontend, painéis são imports locais (`frontend/src/pages/dashboard.js:3–7`) e o conteúdo gerado no iframe (`:109–119`) não é uma segunda unidade conforme o critério vigente. |
| Q2 | No | Não há conjunto de unidades relativamente independentes. Os painéis compartilham o build Next e estado/props da página (`frontend/src/pages/dashboard.js:13–16`, `:85–102`, `:125–129`). A saída gerada não possui entrada/build próprio, e o exportador só grava JSX/CSS (`frontend/src/components/CodeTabs.js:14–24`). |
| Q3 | No | Não há host/shell/root que componha unidades frontend distintas. O wrapper Next renderiza uma página (`frontend/src/pages/_app.js:3–4`), e o dashboard renderiza componentes locais e uma string de prévia (`frontend/src/pages/dashboard.js:95–119`). |
| Q4 | No | O iframe é usado, mas recebe `srcDoc` de dados locais (`frontend/src/pages/dashboard.js:109–119`), sem conectar unidades relativamente independentes. As buscas não encontraram outros mecanismos de composição; o rewrite de `frontend/next.config.js:10–16` atende API, não unidade frontend. |
| Q5 | No | O fluxo verificável é prompt → código em estado local → preview/exportação, dentro de um frontend (`frontend/src/components/ChatPanel.js:23–35`; `frontend/src/pages/dashboard.js:109–119`; `frontend/src/components/CodeTabs.js:14–24`). Isso sustenta uma plataforma de geração de componentes, não uma instância MFE. Q5 acompanha Q1–Q4. |

## Motivo

- Aplica-se `Non-MFE`: Q1–Q5 são No, sem exceção `MFE-unit`. O candidato corresponde a frontend convencional que usa micro-frontend como descrição de playground/viewport, sem implementar composição entre unidades frontend independentes.
- `frontend_units: 1` conta o único alvo UI próprio, Next.js/React. Não conta Express, páginas da mesma aplicação, painéis importados estaticamente ou código gerado como alvos adicionais. O inventário integral permite essa contagem sem atribuir zero a conteúdo não observado.
- O iframe foi verificado no código; não é uma menção ignorada. A decisão não depende de resolver a regra geral de composição por iframes: o critério vigente já exclui saídas geradas como unidades de Q1, e aqui o `srcDoc` mostra precisamente essa saída. Mesmo admitir iframe como mecanismo não forneceria uma segunda unidade com entrada/build próprios. Não há decisão metodológica aberta neste caso.
- Não é `MFE-unit`: o único frontend não expõe módulos/ciclos de vida para host externo; os arquivos exportados são produto do gerador. Não há composição em build time de aplicações publicadas como pacotes nem navegação entre aplicações independentes.
- `repo_type: example` registra o playground/protótipo: o código identifica seleção/edição como demonstração e substituição de texto, não processamento real de AST (`frontend/src/pages/dashboard.js:58–70`). React e Next.js estão observados nos fontes (`frontend/package.json:5–18`); `ui_technologies: [react, next]` segue a convenção de 013 e 036. `build_tools: []` não atribui um bundler subjacente não configurado explicitamente: os scripts e a configuração mostram Next.js, sem configuração independente de Webpack/Vite/Rspack. `approaches: []` segue o registro Non-MFE.

## Notas para análise

- **RQ1 (sinais enganosos):** “micro-frontend playground” no README e nos rótulos da UI descreve o produto; `srcDoc` com código gerado é a evidência técnica que permite distinguir a prévia de composição de aplicações.
- **Protocolo (precedentes):** aplicado o critério consolidado nos casos finais 028 (`028-mmss1995__SkewForge.md`, alvos sem relação de composição não satisfazem Q1) e 023 (`023-arunkumarsubburaj__mfe_slide_dev.md`, código como conteúdo não é unidade implementada), junto ao lembrete vigente sobre código gerado. O frontend próprio é contado, enquanto o conteúdo produzido por ele não é.
- **Protocolo (famílias/templates):** a busca nas anotações existentes por `CodeCraft`, `Shreya08079` e `Component-and-Multi-Component-Generator` não encontrou outro membro da mesma família/template. O caso 075 (`075-ligoj__cli.md`) é análogo apenas quanto à distinção entre ferramenta geradora e suas saídas; não há evidência de origem compartilhada. Nenhuma duplicação ou filiação foi inferida do termo playground.
