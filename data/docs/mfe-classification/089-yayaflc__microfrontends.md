---
schema: 1
id: 963538342
full_name: yayaflc/microfrontends
url: https://github.com/yayaflc/microfrontends
commit: 704f80e756946ae04fa8fa071b5058fc9b07cfde
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 089 — yayaflc/microfrontends

## Contexto

Exemplo React com dois alvos próprios, `app1/` e `app2/`, cada um com entrada, build e configuração Webpack separados. O consumo federado é bidirecional: app2 renderiza dois botões expostos por app1; app1 usa um hook exposto por app2. A federação está configurada e consumida no código. Permanece uma decisão interpretativa: esses elementos compõem unidades frontend ou constituem somente compartilhamento de componentes e lógica, caso explicitamente excluído pelo checklist?

Commit conferido contra `data/samples/mfe-sample-001/clones.csv:90`. O inventário completo por `git ls-tree -r --name-only 704f80e756946ae04fa8fa071b5058fc9b07cfde` contém 85 arquivos, nenhum sob `node_modules/`, e dois manifestos de projeto: `app1/package.json` e `app2/package.json`. O `index.tsx` na raiz é vazio, não um terceiro alvo. `frontend_units: 2` conta os dois alvos próprios, sem duplicar botões, hook, bibliotecas ou arquivos de configuração herdados do CRA.

As referências locais `main`, `origin/main` e `origin/HEAD` apontam ao mesmo commit fixado. O clone não é raso (`git rev-parse --is-shallow-repository`: false), e `git rev-list --count 704f80e756946ae04fa8fa071b5058fc9b07cfde` retorna **11 commits** alcançáveis. Não se confundiu a exibição dos dez últimos commits com a contagem total. As referências foram registradas sem usar outros branches na classificação.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Build/deploy | `app1/package.json:64–67` e `app2/package.json:64–67` definem start e build próprios com configuração Webpack explícita. `app1/webpack.config.js:5–10` define entrada e porta 3001; `app2/webpack.config.js:5–10` define entrada e porta 3002. São dois alvos próprios, não pacotes vendorizados. | moderada |
| Código-fonte (entradas) | `app1/src/index.tsx:1–3` e `app2/src/index.tsx:1–3` importam o bootstrap assíncrono próprio. `app1/src/bootstrap.tsx:1–11` e `app2/src/bootstrap.tsx:1–11` montam seus Apps com ReactDOM. | moderada |
| Configuração (app1) | `app1/webpack.config.js:26–39` instancia `ModuleFederationPlugin`, define o remote app2 em `localhost:3002/remoteEntry.js`, expõe `HelloButton` e `GoodbyeButton` e compartilha React/ReactDOM como singletons. | forte |
| Configuração (app2) | `app2/webpack.config.js:26–38` instancia o mesmo plugin, define o remote app1 em `localhost:3001/remoteEntry.js`, expõe `useTextData` e compartilha React/ReactDOM. | forte |
| Código-fonte (UI remota consumida) | `app2/src/App.tsx:3–4` importa os dois botões de app1 via `React.lazy`; `app2/src/App.tsx:12–15` os renderiza na própria interface, passando callbacks locais. Os módulos expostos implementam controles visuais em `app1/src/components/HelloButton.tsx:7–18` e `app1/src/components/GoodbyeButton.tsx:7–18`. Há uso concreto da federação, mas a granulação é a de dois controles reutilizáveis. | ambígua |
| Código-fonte (lógica remota consumida) | `app1/src/components/TextData.tsx:3–15` importa `app2/useTextData`, chama o hook e mostra o texto em um textarea local. `app1/src/App.tsx:2–8` incorpora esse componente. `app2/src/hooks/useTextData.ts:3–11` apenas mantém e devolve uma string de demonstração. Essa direção da integração compartilha lógica, sem montar uma interface remota. | ambígua |
| Código-fonte (contratos de módulos) | `app1/src/declarations.d.ts:1–3` declara o hook federado; `app2/src/declarations.d.ts:1–10` declara os dois componentes federados e a prop `onClick`. As declarações correspondem às exposições e aos imports observados, mas não definem por si só o limite arquitetural entre aplicação e biblioteca. | moderada |
| Código-fonte (escopo das aplicações) | `app1/src/App.tsx:4–13` contém título e textarea; `app2/src/App.tsx:6–20` contém título e os dois botões remotos. Não é exposto um App completo ou módulo de rotas nas configurações: as exposições são os controles e o hook já citados (`app1/webpack.config.js:32–35`, `app2/webpack.config.js:32–34`). Isso fundamenta a dúvida sobre a exclusão de code sharing, sem criar requisito de tela completa. | ambígua |
| Documentação | `README.md:3` descreve um estudo de microfrontends com React e Module Federation; `README.md:5` referencia a imagem de demonstração `demo.png`. `app1/README.md:1–3` e `app2/README.md:1–3` preservam o texto do Create React App. Procurados ADRs, diretórios `docs/`, documentos e diagramas de arquitetura no inventário, sem artefatos específicos além dos READMEs e da imagem de demonstração. A autodescrição não resolve a interpretação arquitetural. | contexto |
| Histórico | A sequência completa de 11 commits começa em `e25161d5507216c66037f97d4143626501822984` (2025-04-09, create projects base). `94007b3eaef3879d56a79af557f78c1a922d449b` (2025-04-09) tem a mensagem feat: integration module federation; os blobs históricos desse ponto não estavam disponíveis localmente, portanto não se inferiu seu conteúdo pelo título. Em `fd7c22447decac3ff830f27a8aa11ccc345c4f4e` (2025-04-12, feat: export hook from app2 to app1), foram lidos os arquivos históricos: `app1/src/components/TextData.tsx:4–7` já importa/chama o hook, e `app2/src/hooks/useTextData.ts:3–11` o implementa, como no snapshot atual. Os quatro commits seguintes tratam README/imagem; a conclusão usa o código fixado. | contexto |
| Código-fonte (busca negativa de acoplamento direto) | Auditoria de imports estáticos/dinâmicos nos arquivos `.ts`/`.tsx` de `app1/src/` e `app2/src/`: nenhum import relativo atravessa para fontes da outra aplicação. Os três especificadores de integração são `app1/HelloButton`, `app1/GoodbyeButton` e `app2/useTextData`, consumidos pelo mecanismo de federação; os demais imports nominais são dependências npm. | ausente |
| Configuração / Código-fonte (busca negativa de outros mecanismos) | Em todos os arquivos próprios `.ts`, `.tsx`, `.js`, `.html`, `.json` e `.md` do snapshot, excluídos `package-lock.json` e `yarn.lock`, procurados `single-spa`, `registerApplication`, `registerMicroApps`, `qiankun`, `wujie`, `customElements.define`, `importmap`, `import-map`, `postMessage`, `<iframe` e `srcDoc`, sem resultados. A dúvida não depende de link/iframe nem de composição em build time. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Os dois projetos existem fisicamente, mas os únicos artefatos federados são dois botões genéricos e um hook; não formam unidades frontend compostas. |
| Q2 | No | Builds e portas separados não caracterizam independência de unidades MFE quando a relação aceita entre os projetos é somente compartilhamento de código. |
| Q3 | No | App2 renderiza controles reutilizáveis e app1 consome um hook; não há região funcional, página ou fluxo de interface remoto. |
| Q4 | No | Module Federation está implementado, mas o mecanismo é usado exclusivamente para compartilhar componentes e lógica, caso excluído pelo checklist. |
| Q5 | No | A arquitetura observada é compartilhamento de código entre projetos demonstrativos, não composição de micro-frontends. |

## Motivo

- Aplica-se a exclusão de Module Federation usado somente para compartilhamento de código: os únicos módulos remotos são dois controles genéricos e um hook que devolve texto.
- Os dois projetos têm builds próprios e imports federados executáveis, mas não há composição de uma região funcional, página ou fluxo de interface de uma unidade na outra.
- `approaches: []` registra que nenhuma abordagem MFE foi confirmada para esta classificação; Module Federation é evidência do mecanismo de compartilhamento, não de uma instância MFE.
- `build_tools: [webpack]` se apoia nas configurações explícitas e nos comandos efetivos; os READMEs CRA não significam bundler encapsulado. Os scripts ejetados (`app*/scripts/start.js`, `build.js`, `test.js`) são resíduos dos commits `yarn eject` (92425c5, eecd80c, 1b5da1c) e não são usados: os comandos efetivos (`package.json:64–67`) chamam o `webpack.config.js` autoral, como em 019 (CRA ejetado) e ao contrário de 087.

## Notas para análise

- **RQ1:** a contagem de alvos é dois, mas contar projetos e encontrar federação não resolve sozinho a inclusão no fenômeno. As exposições e seus consumidores precisam ser interpretados diante da exclusão de code sharing.
- **RQ1 (execução):** `app2/src/App.tsx:1` importa `Suspense`, mas sua árvore em `app2/src/App.tsx:6–18` não o usa em torno dos componentes lazy. Não foram executados build ou navegador. O ponto submetido à revisão é a natureza dos elementos compostos, sem transformar imperfeição de execução em requisito arquitetural novo.
- **Protocolo (histórico):** o total verificado é 11 commits alcançáveis pelo SHA, em clone não raso. O histórico de commits está disponível, embora alguns blobs antigos estejam ausentes no clone parcial; não foram buscados pela rede. Os títulos dos commits não substituem as evidências do código fixado.
- **Protocolo (família):** buscas nas anotações por `yayaflc`, `HelloButton`, `GoodbyeButton` e `useTextData` não encontraram irmãos ou origem comum já registrada. Os READMEs e configurações remanescentes indicam scaffold CRA ejetado, mas não demonstram um template compartilhado com candidato específico. Os casos 076 e 078 são comparáveis por federação com UI consumida e registram interfaces de ferramentas/aplicações; não criam por si uma regra que exija interfaces completas. O caso 015 mostra biblioteca compartilhada, mas este candidato contém também dois alvos executáveis, de modo que a analogia não resolve automaticamente a classe.

## Decisão registrada

Promover para **Non-MFE**. Apesar de Module Federation estar configurado e consumido, os remotes fornecem apenas dois botões genéricos e um hook de texto. A relação entre os projetos é compartilhamento de componentes e lógica, sem unidade funcional composta na interface.
