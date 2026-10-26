---
schema: 1
id: 990161554
full_name: jacome7/Mythoria-webapp
url: https://github.com/jacome7/Mythoria-webapp
commit: 0bab42c5b9fda635cf2c65499371db2447294585
classification: Non-MFE
checklist: { q1: no, q2: undetermined, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: []
ui_technologies: [react, next]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 082 — jacome7/Mythoria-webapp

## Contexto

Aplicação de criação e leitura de histórias, comércio e biblioteca de utilizador em Next.js/React. Além da interface web, o candidato implementa três recursos HTML próprios de MCP Apps para um cliente conversacional externo. O ponto de triagem é distinguir esses recursos, preparados para integração por mensagens, de uma aplicação decomposta em unidades MFE; não basta classificar todo o repositório como um monólito Next ignorando esse contrato.

Clone conferido em `data/samples/mfe-sample-001/repos/jacome7__Mythoria-webapp/`. Rank, ID e SHA correspondem à linha `cloned` de `data/samples/mfe-sample-001/clones.csv:83`. `git rev-parse HEAD` retornou o SHA do front matter, e `git cat-file -t` confirmou um commit. Inventário integral de 3.669 arquivos por `git ls-tree -r -z --name-only`; 1.051 estão em `src/` e 702 em `package/`. A análise usou fontes/configurações no SHA fixado via `git show` e `git grep`; não executou a aplicação, builds, testes, serviços ou hosts externos.

**Branches, somente para registro:** `master`, `origin/master` e `origin/HEAD` apontam ao SHA avaliado. Outras referências disponíveis: `origin/main` → `6d9b6d13b51cd6faba91c47633183a87f2598023`; `origin/design-refactor` → `69ca09d3921d75671df245b96af8870c149f50bb`; `origin/codex/organize-and-cleanup-folder-structure` → `a6b5489bb60b874d5a37b4285830d4164b6cfb63`; `origin/codex/stripe-payments-refactor` → `f4c7527fcea3f6039518eac01ecd18316d640b4b`; `origin/codex/unify-homepage-hero-cta-to-sign-up` → `f676e7ceb491a79fbe2b6ccdef45df7704f108a2`. Foram registradas por `git for-each-ref`; nenhum conteúdo desses outros commits sustenta a classificação.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Configuração / Build/deploy (web) | `package.json:5–8` inicia Next com Turbopack em desenvolvimento e define um build Next; `:88–94` declara Next/React. `next.config.ts:25–38` define saída standalone e bibliotecas de servidor externas; `:96–112` configura Webpack e aplica os wrappers PWA/i18n. `Dockerfile:49–61` instala e constrói essa aplicação. Há um alvo web principal, destinado à produção, sem hosts/remotes de federação configurados. | contexto |
| Código-fonte / Estrutura (web) | `src/app/layout.tsx:51–81` organiza providers e renderiza `children`; `src/app/[locale]/layout.tsx:2–13` importa componentes locais de navegação, conteúdo e consentimento. São partes da mesma aplicação App Router, não entradas independentes. `README.md:27–31` descreve essa organização e as APIs. | contrária |
| Código-fonte / Configuração (recursos UI próprios) | `src/lib/mcp/ui-widgets.ts:1–7` define MIME `text/html;profile=mcp-app` e três URIs: criação, biblioteca e leitura. `:22–29`, `:172–195` produz documentos HTML completos com script e estado próprios; `:620–653` instancia as três superfícies pelo mesmo `buildWidgetHtml(surface)`. São fontes autorais efetivamente vinculadas ao servidor, não uma saída arbitrária de geração de componentes nem mero exemplo didático. | moderada |
| Código-fonte / Configuração (publicação dos recursos) | `src/lib/mcp/server.ts:385–387` chama `registerUiResources` ao criar o servidor. `:447–482` registra cada template por URI/MIME e devolve seu HTML e metadados de UI/CSP. `src/app/api/mcp/route.ts:1–11` liga os métodos HTTP ao handler MCP. Existe preparação operacional de recursos UI, além da presença de um SDK. | moderada |
| Configuração (binding de ferramenta e UI) | `src/lib/mcp/server.ts:195–238` associa ferramentas de criação/biblioteca a URIs; `:525–533` inclui `_meta.ui.resourceUri` e `openai/outputTemplate` nos descritores; `:598–619` inclui os bindings nos resultados. A associação explicita como um consumidor externo deve selecionar a interface correspondente. | moderada |
| Código-fonte (contrato de mensagens) | `src/lib/mcp/ui-widgets.ts:195–203` inicializa a superfície com `window.openai` quando disponível; `:283–305` envia JSON-RPC ao pai por `window.parent.postMessage` e controla requisições pendentes; `:317–335` define mensagens/contexto para o host. `:581–608` aceita mensagens somente do pai, resolve respostas por ID e renderiza após `ui/notifications/tool-input`/`tool-result`. Há contrato explícito, e não apenas ocorrência isolada de postMessage. | moderada |
| Código-fonte (responsabilidades UI) | `src/lib/mcp/ui-widgets.ts:348–375` renderiza criação/checkpoints; `:378–401` renderiza biblioteca/seleção; `:404–427` renderiza leitura e navegação. `:511–559` liga ações a chamadas de ferramentas com IDs de histórias. São interfaces específicas do domínio Mythoria. As três compartilham fonte e gerador; não se demonstram builds/deploys independentes entre elas. | moderada |
| Documentação / Composição (host externo) | `docs/mcp.md:37–47` orienta configurar o endpoint no ChatGPT; `:51–67` descreve os três recursos e metadados compatíveis. O host conversacional não está no repositório. O servidor publica recursos para esse consumidor, mas a interface Next local não foi observada montando os widgets. Documentação de conexão não comprova execução da composição. | ambígua |
| Código-fonte (testes existentes) | `tests/playwright/mcp.spec.ts:227–268` declara verificações de `resources/list` e `resources/read`, URI/MIME e conteúdo HTML. Os testes corroboram o contrato pretendido de entrega, mas não foram executados e esse trecho não implementa/testa um host visual montando as interfaces. | contexto |
| Estrutura (terceiros) | `package/package.json:2–10` identifica a cópia de `@modelcontextprotocol/ext-apps` 1.0.1 e sua origem; `package/README.md:1–5`, `:14–20` descreve o SDK e UIs em clientes conversacionais. Os 702 arquivos desse diretório não são alvos frontend próprios de Mythoria. Manifestos em `.agents/skills/` também pertencem a ferramentas auxiliares, não à aplicação de histórias. | contexto |
| Tecnologia / Configuração / Código-fonte / Composição | Buscas em `src/`, `docs/`, `scripts/`, `next.config.ts` e `package.json` por `ModuleFederationPlugin`, `single-spa`, `registerApplication`, `registerMicroApps`, `remoteEntry`, `qiankun`, `wujie`, `importmap` e `import-map` não tiveram ocorrências. Outra busca em `src/`, `docs/`, `tests/`, `next.config.ts` e `package.json` por `@modelcontextprotocol/ext-apps`, `AppBridge`, `app-bridge`, `ui/initialize`, `<iframe` e `srcDoc` também não teve ocorrências. O escopo exclui a cópia de SDK em `package/` e as skills. A única chamada própria de `window.parent.postMessage` encontrada está no contrato de `src/lib/mcp/ui-widgets.ts:283–295`. Não se encontrou host local que monte as UIs. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Há o alvo Next e três recursos HTML próprios (`package.json:5–8`; `src/lib/mcp/ui-widgets.ts:3–7`, `:620–653`), mas não se observa composição entre esses alvos na interface local. Os recursos são oferecidos a host externo, cujo carregador não está no snapshot (`docs/mcp.md:37–67`). Aplica-se o precedente 028: coexistência de alvos sem composição entre si não basta para Q1. |
| Q2 | Undetermined | A aplicação Next tem build próprio; os widgets têm URIs/documentos próprios, mas compartilham o gerador e a entrega no mesmo servidor (`src/lib/mcp/ui-widgets.ts:22–29`, `:620–653`; `src/lib/mcp/server.ts:447–482`). Não há builds separados dos três widgets nem evidência suficiente para tratá-los como três unidades relativamente independentes, ou como uma unidade remota com três superfícies. |
| Q3 | Undetermined | A publicação de recursos e bindings está implementada (`src/lib/mcp/server.ts:447–482`, `:525–533`), mas o host consumidor que os monta é externo (`docs/mcp.md:37–47`). O Next local não foi identificado como shell desses recursos. Não se pode confirmar a participação efetiva em uma aplicação composta a partir deste snapshot. |
| Q4 | Undetermined | Há contrato explícito de integração por metadados e JSON-RPC/postMessage (`src/lib/mcp/server.ts:525–533`; `src/lib/mcp/ui-widgets.ts:283–305`, `:581–608`), superando uma mera permissão de embedding. A execução do mecanismo do lado do host não é observável, e a caracterização de extensões MCP Apps como unidades MFE exige revisão. |
| Q5 | No | Não se demonstra uma instância MFE no repositório: o site Next é convencional, e as UIs adicionais são recursos de extensão para plataforma externa, sem host observado (`src/app/layout.tsx:51–81`; `docs/mcp.md:37–67`; `src/lib/mcp/server.ts:447–482`). Aplica-se a regra de plugins de plataforma decidida pelos pesquisadores (`037:60–62`; casos 010, 022, 035 e 037): unidades cujo único host é uma plataforma de terceiros com mecanismo de extensão são Non-MFE, registrando-se a plataforma. Aqui os hosts são clientes conversacionais externos (ChatGPT e OpenClaw, `docs/mcp.md:31–47`) que embutem as UIs pelo mecanismo de extensão MCP Apps. A fronteira de `MFE-unit` em `051:56` exige host que seja aplicação do próprio autor, o que não ocorre. |

## Motivo

- Propõe-se `Non-MFE`. Q1 é No e Q2–Q4 ficam Undetermined porque o host está fora do snapshot, o mesmo padrão dos precedentes finais 035 e 037 (Q1 No, Q3/Q4 Undetermined, Q5 No). Q2 é Undetermined, e não Yes como em 035/037, porque as três superfícies não têm entrada nem build próprios. Pela regra de plugins de plataforma (`037:60–62`), a classe é Non-MFE; plataformas registradas: ChatGPT (OpenAI Apps) e OpenClaw, via MCP Apps (`docs/mcp.md:31–47`).
- `MFE-unit` não se aplica: há preparação explícita para consumidor externo (contrato JSON-RPC por `postMessage`), mas o host é plataforma de terceiros, e `051:56` limita `MFE-unit` a hosts do próprio autor. Se os pesquisadores entenderem que clientes conversacionais com MCP Apps ficam fora da regra de plugins de plataforma, a alternativa a reavaliar é `MFE-unit`.
- `frontend_units: 2` conta os alvos próprios: o app web Next e o conjunto de UI MCP Apps, uma unidade com três vistas (criação, biblioteca e leitura). As três superfícies saem do mesmo `buildWidgetHtml` parametrizado por `surface` (`src/lib/mcp/ui-widgets.ts:22–29`, `:620–653`) e do mesmo servidor (`src/lib/mcp/server.ts:447–482`), sem entradas nem builds distintos; nos precedentes de plataforma o plugin conta como 1 unidade. `unit_organization: monorepo` descreve os dois alvos num repositório (como em 028). Não entram na contagem o SDK vendorizado, seus exemplos/bundles, skills, APIs e serviços backend.
- `ui_technologies: [react, next]` registra o frontend principal. Os recursos MCP usam HTML/CSS/JavaScript próprios, sem React ou outro framework nesses documentos; não se atribuem a eles frameworks do SDK. `build_tools: [webpack]`: o hook `webpack:` em `next.config.ts:96–108` é configuração explícita do bundler. A flag `--turbopack` do script de desenvolvimento (`package.json:6`) apenas escolhe o bundler embutido do framework e não é registrada, o mesmo critério de 094.
- `approaches: []` acompanha a classe Non-MFE por regra de plataforma, como em 035 e 037. Isso não significa ausência de integração: o contrato observado é MCP Apps com recursos HTML, bindings e mensagens ao pai; nenhum slug ou regra metodológica foi acrescentado.
- Não é o mesmo caso de conteúdo de prévia gerado no 081: as UIs deste candidato têm código autoral fixo, ações de domínio e recursos registrados no servidor; são renderizadas a partir de templates executados como parte da implementação. A questão é a organização e o host, não o fato de o HTML ser uma string.

## Notas para análise

- **RQ1:** a ausência de dependências de federação não encerra a triagem: recursos UI e contrato JSON-RPC explícito fornecem evidência de preparação para consumidor externo. Inversamente, o SDK em `package/` não é uma implementação autoral de host e não deve inflar a contagem.
- **Protocolo (famílias/templates):** busca nas anotações por `jacome7`, `Mythoria`, `modelcontextprotocol/ext-apps`, `MCP App UI` e `ui://mythoria` não encontrou família compartilhada já anotada. Os casos 031 (iframe com contrato e shell externo), 035 (plugin de plataforma) e 051 (widget remoto para dashboard externo) são comparadores conceituais, não evidência de linhagem. O caso 066 usa MCP para backend e não equivale a estes recursos HTML.
- **Protocolo:** os testes existentes foram lidos, não executados; não se comprova instalação/configuração do app em plataforma externa nem sucesso atual de integração ou deploy.
- **Regra de plataforma:** a revisão independente apontou que o caso se encaixa na regra de plugins de plataforma (`037:60–62`). A única ressalva é confirmar que clientes conversacionais com MCP Apps entram nessa regra; o texto da regra já inclui iframe como mecanismo de extensão. Não há decisão em aberto que altere a classe.
