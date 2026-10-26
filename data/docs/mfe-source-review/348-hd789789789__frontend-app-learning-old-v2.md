---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-html-external-script | public/index.html:10 | . | none | No | `<script src="https://www.edx.org/optimizelyjs/<%= ... OPTIMIZELY_PROJECT_ID %>.js">`, condicionado a `OPTIMIZELY_PROJECT_ID` (public/index.html:9-11): script de experimentação do Optimizely, serviço de terceiros, não o bundle de outra unidade frontend. |
| src-iframe | src/course-home/discussion-tab/DiscussionTab.jsx:22 | . | embedding | Yes | `<iframe src={discussionsUrl}>` embute a Discussions MFE, unidade externa, pela URL `${getConfig().DISCUSSIONS_MFE_BASE_URL}/${courseId}/${originalPath}` (src/course-home/discussion-tab/DiscussionTab.jsx:20-23); `DISCUSSIONS_MFE_BASE_URL` vem de `process.env` (src/index.jsx:174). Ativo: `<DiscussionTab />` na rota `DECODE_ROUTES.DISCUSSION` (src/index.jsx:98-102). |
| src-iframe | src/course-home/outline-tab/LmsHtmlFragment.jsx:48 | . | embedding | No | `<iframe srcDoc={wholePage}>` exibe um fragmento HTML recebido por prop (`html`), montado localmente com `<base href=LMS_BASE_URL>` (src/course-home/outline-tab/LmsHtmlFragment.jsx:13-28, :54); usado por CourseHandouts.jsx:26 e WelcomeMessage.jsx:78/:86 para apostilas e mensagem de boas-vindas do curso. É conteúdo do curso, não outra unidade frontend. |
| src-iframe | src/courseware/course/content-tools/notes-visibility/NotesVisibility.test.jsx:72 | . | none | No | `document.createElement('iframe')` num teste Jest (`it('handles click')`, :70-73), que simula o `unit-iframe`; não faz parte do build. |
| src-iframe | src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:26 | . | embedding | Yes | `<iframe src={${discussionsUrl}?inContextSidebar}>` (template literal) embute a Discussions MFE na nova barra lateral, com `discussionsUrl = ${DISCUSSIONS_MFE_BASE_URL}/${courseId}/category/${unitId}` (…/DiscussionsWidget.tsx:21, :26-27). Ativo: importado em DiscussionsNotificationsSidebar.tsx:8 e renderizado em :26, registrado em `SIDEBARS` (src/courseware/course/new-sidebar/sidebars/index.ts:1-8) e mostrado pelo `NewSidebar` quando `isNewDiscussionSidebarViewEnabled` (src/plugin-slots/NotificationsDiscussionsSidebarSlot/index.tsx:26), slot usado em src/courseware/course/sequence/Sequence.jsx:230. |
| src-iframe | src/courseware/course/sequence/Unit/ContentIFrame.jsx:77 | . | embedding | No | `<iframe {...contentIFrameProps}>` com `src: iframeUrl` (src/courseware/course/sequence/Unit/ContentIFrame.jsx:55-64), URL `${LMS_BASE_URL}/xblock/${id}` de `getIFrameUrl` (src/courseware/course/sequence/Unit/urls.ts:26): exibe o conteúdo da unidade do curso (XBlock) renderizado pelo LMS, conteúdo e não unidade frontend da classificação (ver Notas). |
| src-iframe | src/courseware/course/sequence/Unit/ContentIFrame.jsx:93 | . | embedding | No | `<iframe src={modalOptions.url}>` no `ModalDialog` (src/courseware/course/sequence/Unit/ContentIFrame.jsx:80-100), aberto quando o conteúdo do iframe envia `plugin.modal` com a URL (src/courseware/course/sequence/Unit/hooks/useModalIFrameData.js:21-23); modal de conteúdo do curso (classe `modal-lti`, :83), não outra unidade frontend. |
| src-iframe | src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:40 | . | embedding | Yes | `<iframe src={${discussionsUrl}?inContextSidebar}>` (template literal) embute a Discussions MFE na barra lateral antiga, com `discussionsUrl = ${DISCUSSIONS_MFE_BASE_URL}/${courseId}/category/${unitId}` (…/DiscussionsSidebar.jsx:23, :40-41). Ativo: exportado em sidebars/discussions/index.js:1, registrado em `SIDEBARS` (src/courseware/course/sidebar/sidebars/index.js:2, :10-14) e mostrado pelo `Sidebar` quando a nova visão está desligada (src/plugin-slots/NotificationsDiscussionsSidebarSlot/index.tsx:26). |
| src-cross-unit-communication | src/course-home/courseware-search/hooks.test.jsx:139 | . | none | No | `global.dispatchEvent(new Event('resize'))` num teste Jest para simular redimensionamento da janela (:137-139); evento interno de teste. |
| src-cross-unit-communication | src/course-home/discussion-tab/DiscussionTab.test.jsx:62 | . | none | No | `window.postMessage(...)` num teste Jest (`it('resizes when it gets a size hint from iframe')`, :61-62) que simula a mensagem de altura do iframe; não faz parte do build. |
| src-cross-unit-communication | src/course-home/outline-tab/LmsHtmlFragment.jsx:23 | . | communication | No | `window.parent.postMessage({type: 'lmshtmlfragment.resize'}, '*')` dentro do `<script>` do `srcDoc` gerado pelo próprio componente (src/course-home/outline-tab/LmsHtmlFragment.jsx:21-26), ouvido pelo mesmo componente para ajustar a altura (:37-45); comunicação interna à unidade `.`. |
| src-cross-unit-communication | src/courseware/course/content-tools/notes-visibility/NotesVisibility.jsx:13 | . | communication | No | `iframe.contentWindow.postMessage('tools.toggleNotes', LMS_BASE_URL)` para o `unit-iframe` (src/courseware/course/content-tools/notes-visibility/NotesVisibility.jsx:11-14), que exibe o conteúdo XBlock servido pelo LMS (ContentIFrame.jsx:77); o destino é conteúdo do curso, não outra unidade frontend. |
| src-cross-unit-communication | src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:55 | . | communication | No | `frame?.contentWindow?.postMessage({ hashName: hash }, LMS_BASE_URL)` envia o hash da URL ao iframe do conteúdo XBlock do LMS (src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:49-57); destino é conteúdo do curso, não outra unidade frontend. |
| src-cross-unit-communication | src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:115 | . | communication | No | `iframeElement?.contentWindow?.postMessage(visibleInfo, LMS_BASE_URL)` envia `unit.visibilityStatus` ao iframe do conteúdo XBlock para marcar blocos como vistos (src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:104-119); destino é conteúdo do curso, não outra unidade frontend. |
| src-cross-unit-communication | src/courseware/course/sequence/Unit/hooks/useModalIFrameData.js:13 | . | communication | No | `rootFrame.contentWindow.postMessage({ type: 'plugin.modal-close' }, '*')` ao fechar o modal (src/courseware/course/sequence/Unit/hooks/useModalIFrameData.js:10-14), avisando o iframe de conteúdo do curso; destino é conteúdo, não outra unidade frontend. |
| src-cross-unit-communication | src/courseware/course/sidebar/sidebars/course-outline/CourseOutlineTray.test.jsx:106 | . | none | No | `window.dispatchEvent(new Event('resize'))` num teste Jest para simular redimensionamento (:104-106); evento interno de teste. |
| src-cross-unit-communication | src/generic/hooks.test.jsx:14 | . | none | No | `window.postMessage({ test: 'test' }, '*')` num teste Jest de `useEventListener` (:13-15); não faz parte do build. |
| src-cross-unit-communication | src/generic/hooks.test.jsx:37 | . | none | No | `window.postMessage({ type: 'plugin.resize', ... })` num teste Jest de `useIFrameHeight` (:36-38); não faz parte do build. |
| src-cross-unit-communication | src/setupTest.js:67 | . | none | No | `new CustomEvent('show_modal')` no mock de `HTMLDialogElement.prototype.showModal` para o jsdom (src/setupTest.js:64-69); arquivo de setup do Jest (jest.config.js:4-5), não faz parte do build. |
| src-cross-unit-communication | src/setupTest.js:68 | . | none | No | `this.dispatchEvent(onShowModal)` no mesmo mock de `showModal` (src/setupTest.js:66-69); setup do Jest. |
| src-cross-unit-communication | src/setupTest.js:71 | . | none | No | `new CustomEvent('close')` no mock de `HTMLDialogElement.prototype.close` (src/setupTest.js:70-73); setup do Jest. |
| src-cross-unit-communication | src/setupTest.js:72 | . | none | No | `this.dispatchEvent(onClose)` no mesmo mock de `close` (src/setupTest.js:70-73); setup do Jest. |
| src-cross-unit-communication | src/setupTest.js:132 | . | none | No | `window.postMessage(message, '*')` na função auxiliar de teste `loadUnit`, que simula a mensagem de carga da unidade do curso (src/setupTest.js:125-133); setup do Jest. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | src/course-home/discussion-tab/DiscussionTab.jsx:14 | . | communication | Yes | `useIFramePluginEvents({ 'discussions.navigate': ... })` assina as mensagens `postMessage` que a Discussions MFE envia do iframe e navega para `/course/:courseId/discussion/${payload.path}` (src/course-home/discussion-tab/DiscussionTab.jsx:14-19); o hook registra o listener de `message` (src/generic/hooks.js:29-40). Na mesma aba, `useIFrameHeight()` (DiscussionTab.jsx:13) assina `plugin.resize` pelo mesmo hook (src/generic/hooks.js:59) para ajustar a altura do iframe (DiscussionTab.jsx:25). |

## Resumo

Construções com composição: 4 (embedding: 3, communication: 1).

## Notas

- Os iframes e as mensagens `postMessage` ligados ao conteúdo do curso (`${LMS_BASE_URL}/xblock/<id>` em src/courseware/course/sequence/Unit/urls.ts:26, o modal `plugin.modal` e os fragmentos `srcDoc`) foram anotados como `No` porque o alvo é conteúdo servido pelo LMS, e a classificação conta só duas unidades: esta aplicação e a Discussions MFE (`frontend_units: 2`). Também não viraram linha manual os listeners de mensagens desse conteúdo (`entranceExam.passed` em src/courseware/course/sequence/Sequence.jsx:120-130; `window.onmessage` em src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:164-168).
- A Discussions MFE fica fora do snapshot; ela só entra pela URL `DISCUSSIONS_MFE_BASE_URL` (src/index.jsx:174), em três iframes: a aba de discussão e as duas barras laterais (antiga e nova), que se alternam por `isNewDiscussionSidebarViewEnabled`.
- Os `React.lazy(() => import('./...'))` dos alertas (por exemplo, src/alerts/enrollment-alert/hooks.js:10) e de `ContentLock` (src/courseware/course/sequence/SequenceContent.jsx:10) carregam arquivos locais da própria unidade e não viraram linha manual.
- 11 das 23 linhas `src-*` são de testes Jest ou de `src/setupTest.js`.
