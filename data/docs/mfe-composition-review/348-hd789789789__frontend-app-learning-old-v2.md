---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Leitura do repositório

O snapshot é uma cópia da Learning MFE da plataforma Open edX, a aplicação React que renderiza as páginas do curso para o estudante (README.rst:9-11). É um produto, e a raiz `.` é a única unidade do snapshot. A outra unidade da classificação, a Discussions MFE, é implantada à parte e fica fora do snapshot. A Learning MFE a embute por `<iframe>` com uma URL montada a partir de `DISCUSSIONS_MFE_BASE_URL`, que vem do ambiente (src/index.jsx:174; .env.development:14). Isso acontece em três lugares: a aba de discussão (src/course-home/discussion-tab/DiscussionTab.jsx:20-23) e as duas barras laterais do conteúdo, a antiga (src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:23, :40-41) e a nova (src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:21, :26-27). O slot escolhe uma das barras por `isNewDiscussionSidebarViewEnabled` (src/plugin-slots/NotificationsDiscussionsSidebarSlot/index.tsx:26). Da aba de discussão sai também o único canal de mensagens com a outra unidade: a Learning MFE escuta `postMessage` vindo do iframe para navegar e ajustar a altura (src/course-home/discussion-tab/DiscussionTab.jsx:13-19; src/generic/hooks.js:29-40, :59). Mensagens no sentido contrário não aparecem.

O resto do que a mineração apontou não virou relação. Os iframes e as mensagens trocadas com o conteúdo XBlock que o LMS serve (`${LMS_BASE_URL}/xblock/${id}`, src/courseware/course/sequence/Unit/urls.ts:26), o modal `plugin.modal` e os fragmentos `srcDoc` são conteúdo do curso, não outra unidade frontend, conforme a revisão de código-fonte. O script do Optimizely (public/index.html:10) é serviço de terceiros. O cabeçalho e o rodapé da plataforma entram como pacotes npm no build (package.json:37-38). O Frontend Plugin Framework (package.json:48) oferece slots como o do cabeçalho (src/plugin-slots/HeaderSlot/index.jsx:9-10), mas nenhum plugin é configurado no snapshot: o único `env.config` é o `example.env.config.jsx`, que nenhum build referencia. Não há relação para esses slots.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | DISCUSSIONS_MFE_BASE_URL | page → embedded-frontend | origem → destino | iframe | No | Yes | .env:14 (`DISCUSSIONS_MFE_BASE_URL=''`); .env.development:14 (`DISCUSSIONS_MFE_BASE_URL='http://localhost:2002'`) | src/course-home/discussion-tab/DiscussionTab.jsx:22; src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:26; src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:40 |
| 2 | . | DISCUSSIONS_MFE_BASE_URL | communication | origem → destino | events | No | Yes | — | src/course-home/discussion-tab/DiscussionTab.jsx:14 |

## Observações

**1. . → DISCUSSIONS_MFE_BASE_URL.** O destino é a Discussions MFE, identificada pelo nome da variável (src/index.jsx:174) e pelo título do iframe da aba (`title="discussion"`, src/course-home/discussion-tab/DiscussionTab.jsx:27). Nenhuma unidade do snapshot corresponde a ela, e a revisão estrutural lista só `.`; daí No snapshot = `No`. A URL de produção fica vazia no `.env` (.env:14) e é preenchida na implantação. Em desenvolvimento e teste ela aponta para `http://localhost:2002` (.env.development:14; .env.test:14). Os três iframes são `Yes` na revisão de código-fonte. A aba entra pela rota `DECODE_ROUTES.DISCUSSION` (src/index.jsx:98-102), e as duas barras laterais se alternam pela flag do slot (src/plugin-slots/NotificationsDiscussionsSidebarSlot/index.tsx:26). Como cada barra carrega a sua URL com `?inContextSidebar` (src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:41; src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:27), o mesmo destino aparece em formas diferentes da tela, mas é uma só relação.

**2. . → DISCUSSIONS_MFE_BASE_URL.** Quem envia é a Discussions MFE, de dentro do iframe da aba de discussão. A Learning MFE só recebe: `useIFramePluginEvents` registra um listener de `message` em `window` e despacha pelo `type` (src/generic/hooks.js:29-40). A aba trata `discussions.navigate`, navegando para o caminho que a outra unidade informa (src/course-home/discussion-tab/DiscussionTab.jsx:14-19), e `plugin.resize`, via `useIFrameHeight` (src/course-home/discussion-tab/DiscussionTab.jsx:13; src/generic/hooks.js:59), para ajustar a altura (src/course-home/discussion-tab/DiscussionTab.jsx:25). O snapshot não mostra mensagem enviada para o iframe da discussão. O passo 3 pede que a Origem de `communication` seja quem envia, mas quem envia está fora do snapshot e a Origem precisa ser uma unidade da revisão estrutural. Por decisão do pesquisador, só para este caso, a Origem é `.` e o Destino é a Discussions MFE, com o mesmo nome do destino da relação 1; daí No snapshot = `No` (ver "Decisão registrada"). A Direção fica `origem → destino`, o único valor da tabela para envio num só sentido, mas as mensagens vão do Destino para a Origem. Os dois tipos de mensagem passam por um único canal `postMessage`, daí `events`. Configuração = `—`, porque os tipos de mensagem são fixos no código. Ativa = `Yes` pela linha manual `Yes` da revisão de código-fonte. Fora de `src/generic/hooks.js`, só a aba de discussão usa `useIFramePluginEvents` ou `useIFrameHeight`. As barras laterais não escutam mensagens da discussão.

## Resumo

Relações: 2 (page → embedded-frontend: 1, communication: 1). Ativas: 2. Destino fora do snapshot: 2.
Unidades sem relação: nenhuma.

## Decisão registrada

A relação 2 é um canal `postMessage` em que só a Discussions MFE envia, de dentro do iframe da aba de discussão, e a Learning MFE só recebe (src/generic/hooks.js:29-40; src/course-home/discussion-tab/DiscussionTab.jsx:13-19). Pergunta: em `communication`, a Origem é a unidade que envia (INSTRUCTIONS.md, passo 3, "Origem"), mas quem envia está fora do snapshot, e a Origem precisa ser um diretório `Yes` ou `Undetermined` da revisão estrutural, que lista só `.`. Decisão do pesquisador, só para este caso: Origem `.`; Destino com o mesmo nome do destino da relação 1, `DISCUSSIONS_MFE_BASE_URL`; Direção `origem → destino`, o único valor da tabela para envio num só sentido, com a ressalva, na Observação 2, de que as mensagens vão do Destino para a Origem.
