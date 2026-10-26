---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
url: https://github.com/webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 083 — webdevqadeer/frontend-development

## Contexto

O snapshot contém um exemplo de marketplace em `react/mv-marketplace/`: um shell e quatro aplicações React (`admin`, `buyer`, `payment`, `seller`), além da biblioteca `mvp-theme`. Os workspaces e os comandos separados estão em `react/mv-marketplace/package.json:4–18`. A configuração e o consumo dos remotes estão presentes, mas há uma inconsistência de maiúsculas/minúsculas na entrada do shell, detalhada abaixo.

Inspeção somente de leitura do commit registrado em `data/samples/mfe-sample-001/clones.csv:84`. O inventário completo por `git ls-tree -r --name-only f8d264873c9182d4f3a0628f18f7618b019a2f79` contém 4.633 arquivos: 4.566 sob `node_modules/` e 67 fora desses diretórios. A contagem de unidades considera os cinco alvos próprios em `apps/`, excluindo dependências vendorizadas e a biblioteca. As referências locais `main`, `origin/main` e `origin/HEAD` apontam para o mesmo commit; registradas somente como contexto, sem ampliar o snapshot.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Build/deploy | Os cinco workspaces de aplicação e a biblioteca são declarados em `react/mv-marketplace/package.json:4–10`. `react/mv-marketplace/package.json:15` executa separadamente o build de cada aplicação; `react/mv-marketplace/apps/shell/package.json:6–10`, `react/mv-marketplace/apps/admin/package.json:6–10`, `react/mv-marketplace/apps/buyer/package.json:6–10`, `react/mv-marketplace/apps/payment/package.json:6–10` e `react/mv-marketplace/apps/seller/package.json:6–10` contêm scripts próprios de Vite. | moderada |
| Código-fonte / Tecnologia | Cada aplicação possui entrada com `createRoot` e um componente App: `react/mv-marketplace/apps/admin/src/main.jsx:1–9`, `react/mv-marketplace/apps/buyer/src/main.jsx:1–9`, `react/mv-marketplace/apps/payment/src/main.jsx:1–9`, `react/mv-marketplace/apps/seller/src/main.jsx:1–9` e `react/mv-marketplace/apps/shell/src/main.jsx:1–9`. Os remotes renderizam interfaces próprias em `react/mv-marketplace/apps/admin/src/App.jsx:1–2`, `react/mv-marketplace/apps/buyer/src/App.jsx:2–9`, `react/mv-marketplace/apps/payment/src/App.jsx:1–2` e `react/mv-marketplace/apps/seller/src/App.jsx:4–5`. | moderada |
| Configuração (host) | O shell instancia o plugin de federação e aponta `buyer_app`, `seller_app`, `admin_app` e `payment_app` para quatro `remoteEntry.js` nas portas 5001–5004; compartilha React e ReactDOM em `react/mv-marketplace/apps/shell/vite.config.js:9–18`. | forte |
| Configuração (remotes) | Há exposições concretas de `./App` a partir de `./src/App.jsx`, com `remoteEntry.js` e portas de preview correspondentes: `react/mv-marketplace/apps/admin/vite.config.js:8–20`, `react/mv-marketplace/apps/buyer/vite.config.js:8–20`, `react/mv-marketplace/apps/payment/vite.config.js:8–18` e `react/mv-marketplace/apps/seller/vite.config.js:8–18`. | forte |
| Composição / Código-fonte | `react/mv-marketplace/apps/shell/src/router.jsx:4–7` importa os quatro módulos federados com `React.lazy`; `react/mv-marketplace/apps/shell/src/router.jsx:11–17` os coloca nas rotas `/`, `/seller`, `/admin` e `/payment`. `react/mv-marketplace/apps/shell/src/app.jsx:1–9` importa esse roteador e o insere no layout. Há código consumidor, além da configuração e da dependência. | forte |
| Código-fonte (cadeia de entrada) | `react/mv-marketplace/apps/shell/index.html:11` carrega `main.jsx`, mas `react/mv-marketplace/apps/shell/src/main.jsx:3` importa `./App.jsx`. O inventário Git registra somente `react/mv-marketplace/apps/shell/src/app.jsx`, cujo componente está em `react/mv-marketplace/apps/shell/src/app.jsx:5–15`; a consulta exata de `apps/shell/src/App.jsx` no mesmo prefixo não retorna arquivo. Em sistemas sensíveis à caixa, essa entrada não alcança o roteador como escrita. Não se executou build nem se presumiu o sistema de arquivos usado pelo autor. | ambígua |
| Estrutura / Configuração (biblioteca) | `react/mv-marketplace/packages/mvp-theme/vite.config.js:7–16` define build de biblioteca ES/UMD, e `react/mv-marketplace/packages/mvp-theme/src/index.js:1` reexporta um Button. `react/mv-marketplace/apps/shell/vite.config.js:16` também declara um remote genérico `package` na porta 5005, repetido nos remotes, mas a biblioteca não configura federação. Não se identificou uma sexta aplicação frontend associada a essa declaração. | contexto |
| Código-fonte (busca negativa) | Auditoria de todos os imports em arquivos próprios `.js`/`.jsx` sob `react/mv-marketplace/apps/*/src/`: os oito imports relativos permanecem dentro da respectiva aplicação; não há import direto do código-fonte de outra aplicação. Os imports externos de unidades são somente os quatro de `react/mv-marketplace/apps/shell/src/router.jsx:4–7`. Procurados ainda `package/` e `mv-theme` nesse escopo, sem consumo encontrado; a declaração da porta 5005 não sustenta outra unidade efetivamente composta. | ausente |
| Configuração / Código-fonte (busca negativa) | `git grep` no commit, em `react/mv-marketplace/apps/` e `react/mv-marketplace/packages/mvp-theme/src/`, procurou `<iframe`, `postMessage`, `srcDoc`, `single-spa`, `registerApplication`, `registerMicroApps`, `customElements.define`, `importmap` e `import-map`; nenhum resultado. A composição observada depende dos imports federados já citados. | ausente |
| Documentação | `react/mv-marketplace/apps/shell/README.md:1–8` é o texto genérico React + Vite. Não se usa esse README, o nome do repositório ou a dependência do plugin isoladamente para confirmar MFE. | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Cinco alvos próprios, com relação explícita de composição: workspaces em `react/mv-marketplace/package.json:6–10`, quatro remotes em `react/mv-marketplace/apps/shell/vite.config.js:12–15` e consumo em `react/mv-marketplace/apps/shell/src/router.jsx:4–17`. A biblioteca e `node_modules/` não são unidades adicionais. |
| Q2 | Yes | Entradas próprias em `react/mv-marketplace/apps/admin/src/main.jsx:1–9`, `react/mv-marketplace/apps/buyer/src/main.jsx:1–9`, `react/mv-marketplace/apps/payment/src/main.jsx:1–9`, `react/mv-marketplace/apps/seller/src/main.jsx:1–9` e `react/mv-marketplace/apps/shell/src/main.jsx:1–9`; builds separados em `react/mv-marketplace/package.json:15`. A auditoria dos imports próprios não encontrou importação direta de fontes entre aplicações. A inconsistência da entrada do shell é registrada em Q4, sem apagar sua existência como alvo separado. |
| Q3 | Yes | O shell reúne as quatro interfaces nas rotas de uma mesma aplicação em `react/mv-marketplace/apps/shell/src/router.jsx:11–17`; seu componente incorpora o roteador em `react/mv-marketplace/apps/shell/src/app.jsx:1–9`. Esta resposta identifica a relação explícita no código, sem afirmar execução bem-sucedida. |
| Q4 | Yes | O shell declara e consome os quatro remotes por Module Federation (`react/mv-marketplace/apps/shell/vite.config.js:9–18`; `react/mv-marketplace/apps/shell/src/router.jsx:4–17`). A diferença de caixa entre `App.jsx` e `app.jsx` é um defeito de portabilidade, mas não invalida o mecanismo de composição implementado. |
| Q5 | Yes | Host, remotes, exposições e consumo dinâmico estão implementados; o conjunto satisfaz a classificação MFE. |

## Motivo

- Aplica-se a regra `MFE-implemented`: Q1–Q5 são Yes após a revisão conjunta.
- O código corresponde a um exemplo de shell com remotes próprios e builds separados. Os componentes são interfaces mínimas de demonstração; suas exposições e rotas estão implementadas nos arquivos do projeto, não apenas como conteúdo didático em documentação. Por isso, não se aplica a exclusão de alvos sem relação de composição dos precedentes 023/028.
- Não é MFE-unit: o próprio host está presente. Também não é um plugin cujo único host seja plataforma de terceiros. A biblioteca ES/UMD não é usada para fundamentar composição em build time nem para aumentar a contagem de unidades.

## Notas para análise

- **RQ1:** imports federados e rotas sustentam a intenção e o código de composição; o desencontro entre o caminho importado e o nome registrado impede presumir a execução dessa cadeia em qualquer ambiente. Não foram instaladas dependências, executados serviços ou corrigidos arquivos.
- **Protocolo:** há semelhança arquitetural com `docs/mfe-classification/045-mrgleam__mf-tanstack-demo.md` e `docs/mfe-classification/070-viernesviernes__EmerTech-Lab-Assignment-3.md` (React/Vite, shell e remotes). A busca nas anotações por `webdevqadeer`, `mv-marketplace`, `mvp-theme` e `multi.vendor` não encontrou indicação de família já registrada. O README genérico não demonstra origem comum ou duplicação de template.

- **Evidência para a decisão de Q4 (revisão independente, conferida no commit):** `node_modules/` está versionado e só contém binários nativos de Windows (`@esbuild/win32-x64`, `@rollup/rollup-win32-x64-gnu` e `-msvc`, `@swc/core-win32-x64-msvc`, em `react/mv-marketplace/node_modules/`), sem equivalentes linux/darwin. Isso indica que o autor instalou e construiu em Windows, sistema de arquivos insensível à caixa, onde `./App.jsx` abre `app.jsx`. O `main.jsx` do shell tem o mesmo blob dos outros quatro apps (template Vite não alterado). Por inferência, o defeito é de portabilidade e não de ausência de conexão; não há execução observada que o confirme.
- **Observações sem efeito em Q4:** (R1) o remote `payment` usa `name: "payment-app"` (`apps/payment/vite.config.js:9`), enquanto o host o chama por `payment_app` (`apps/shell/vite.config.js:15`; `router.jsx:7`), o que o plugin de federação tende a resolver pela chave e pela URL, força ambígua. (R2) Os remotes só fixam a porta em `preview`, e o script raiz `dev:apps` (`package.json:18`) roda `vite` em desenvolvimento; é detalhe do fluxo operacional. (R3) O remote `package` (localhost:5005) está declarado no shell e nos remotes, mas nenhum alvo o serve nem o importa: declaração morta.

## Decisão registrada

Promover para **MFE-implemented**. O shell configura quatro remotes, cada remote expõe sua aplicação por `remoteEntry.js`, e o shell os importa dinamicamente nas rotas. A divergência entre `App.jsx` e `app.jsx` é registrada como defeito de portabilidade, sem desfazer a evidência de composição por Module Federation.
