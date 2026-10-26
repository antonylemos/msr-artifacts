---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 321 — JandrySan/becas-uleam

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-custom-element | src/main.ts:9 | . | none | No | `const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;` é um helper genérico de `getElementById`; `extends HTMLElement` é restrição de tipo TypeScript, não definição de custom element. |
| src-iframe | index.html:61 | . | embedding | Yes | `<iframe id="moduleFrame" src="about:blank">` é o quadro onde a contenedora carrega o módulo ativo: `activate` troca `frame.src` pelo `data-src` do botão (src/main.ts:12, :87-97), e os botões apontam para `/vue/`, `/react/` e `/angular/#/seguimiento` (index.html:24-26), onde o build integrado copia 1verificador-vue, 2postulacion-react e 3seguimiento-angular (scripts/build-integrado.mjs:14-19). `showApp` ativa o primeiro módulo após o login (src/main.ts:120-130); a entrada é index.html:65. |
| src-cross-unit-communication | 1verificador-vue/src/views/HomeView.vue:92 | 1verificador-vue | communication | Yes | `window.parent?.postMessage({ tipo: 'BECAS_DATOS_ESTUDIANTE', datos }, '*')` ao fim de `evaluar` (1verificador-vue/src/views/HomeView.vue:64, :92-99), disparado pelo submit do formulário (:122); o alvo é a contenedora `.`, que grava os dados no `localStorage` e reenvia o estado (src/main.ts:192-196). HomeView é a rota `/` (1verificador-vue/src/main.ts:7, :11). |
| src-cross-unit-communication | 1verificador-vue/src/views/HomeView.vue:103 | 1verificador-vue | communication | Yes | `window.parent?.postMessage({ modulo: 'postulacion' }, '*')` em `iniciarPostulacion` (1verificador-vue/src/views/HomeView.vue:101-104), ligado ao botão "Iniciar postulación" (:209); a contenedora `.` troca o iframe para o módulo React com `activateBySrc('/react/')` (src/main.ts:199). |
| src-cross-unit-communication | 2postulacion-react/src/context/PostulacionContext.tsx:60 | 2postulacion-react | communication | Yes | `window.parent?.postMessage({ tipo: 'BECAS_REACT_READY' }, '*')` no `useEffect` de montagem do `PostulacionProvider` (2postulacion-react/src/context/PostulacionContext.tsx:53-62), que envolve o App (2postulacion-react/src/main.tsx:12); a contenedora `.` responde com `sendState` (src/main.ts:203, :207). O mesmo efeito escuta `message` (:59) e aplica `BECAS_PORTAL_STATE` (:56). |
| src-cross-unit-communication | 2postulacion-react/src/context/PostulacionContext.tsx:69 | 2postulacion-react | communication | Yes | `window.parent?.postMessage({ tipo: 'BECAS_POSTULACION_UPDATE', datos, documentos }, '*')` a cada mudança de `estado` (2postulacion-react/src/context/PostulacionContext.tsx:63-70); o alvo é a janela da contenedora `.`, cujo listener (src/main.ts:189-209) não trata esse `tipo`. Ver Notas. |
| src-cross-unit-communication | 2postulacion-react/src/pages/VistaPrevia.tsx:99 | 2postulacion-react | communication | Yes | `window.parent?.postMessage({ modulo: 'seguimiento' }, '*')` depois de gravar a postulação em `enviarPostulacion` (2postulacion-react/src/pages/VistaPrevia.tsx:29, :99), ligado ao botão de :126; a página é a rota `/resumen` (2postulacion-react/src/App.tsx:17). A contenedora `.` troca o iframe para o módulo Angular com `activateBySrc('/angular/')` (src/main.ts:200). |
| src-cross-unit-communication | 3seguimiento-angular/src/app/app.component.ts:18 | 3seguimiento-angular | communication | Yes | `window.parent?.postMessage({ tipo: 'BECAS_ANGULAR_READY' }, '*')` no `ngOnInit` do `AppComponent` (3seguimiento-angular/src/app/app.component.ts:17-19), inicializado em 3seguimiento-angular/src/main.ts:14; a contenedora `.` responde com `sendState` (src/main.ts:204, :207). O componente escuta `window:message` e aplica `BECAS_PORTAL_STATE` com `aplicarSesion` (3seguimiento-angular/src/app/app.component.ts:21-27). |
| src-cross-unit-communication | src/main.ts:84 | . | communication | Yes | `frame.contentWindow?.postMessage(payload, '*')` em `sendState` envia `BECAS_PORTAL_STATE` com sessão, token, usuário e id (src/main.ts:75-85) ao módulo do iframe; é chamado após `activate` (:96), no `load` do iframe (:187) e em resposta às mensagens dos módulos (:196, :207). Os alvos são 3seguimiento-angular (3seguimiento-angular/src/app/app.component.ts:24-26) e 2postulacion-react (2postulacion-react/src/context/PostulacionContext.tsx:56). |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | index.html:24 | . | host-relationship | Yes | Os botões de `<nav class="tabs">` declaram os três módulos da contenedora e onde ficam: `data-src="/vue/"`, `"/react/"` e `"/angular/#/seguimiento"`, com título e tecnologia (index.html:23-27); `activate` usa esses atributos para carregar o iframe (src/main.ts:91-94). Em desenvolvimento (`localhost:3000`) as URLs são trocadas por `http://localhost:5173/vue/`, `:5174/react/` e `:4200/#/seguimiento` (src/main.ts:24-34). |
| manual | src/main.ts:138 | . | communication | Yes | `saveSession` grava a sessão no `localStorage` após o login: `token`, `usuario`, `becas_session` e `supabase_user_id` (src/main.ts:133-145, chamado em :169); index.html:46 diz que a sessão "se comparte con los tres módulos mediante localStorage". 3seguimiento-angular lê `becas_session` ao criar o `AuthService` (3seguimiento-angular/src/app/services/auth.service.ts:8, :13-15) e `usuario` em 3seguimiento-angular/src/app/services/seguimiento-store.service.ts:111. As unidades compartilham a origem no deploy integrado (scripts/build-integrado.mjs:14-19; vercel.json:3-5). |
| manual | 1verificador-vue/src/views/HomeView.vue:88 | 1verificador-vue | communication | Yes | `evaluar` grava `becas_datos_estudiante`, `becas_nombre` e `becas_email` no `localStorage` (1verificador-vue/src/views/HomeView.vue:88-90); 2postulacion-react lê as mesmas chaves no estado inicial do `PostulacionProvider` (2postulacion-react/src/context/PostulacionContext.tsx:5, :45-52) e lê `becas_datos_estudiante` ao enviar a postulação (2postulacion-react/src/pages/VistaPrevia.tsx:37-39). A contenedora também grava essas chaves ao receber `BECAS_DATOS_ESTUDIANTE` (src/main.ts:193-195), e o React as regrava (2postulacion-react/src/context/PostulacionContext.tsx:65-68). |

## Resumo

Construções com composição: 11 (embedding: 1, communication: 9, host-relationship: 1).

## Notas

- `src-custom-element` em src/main.ts:9 é falso positivo: `extends HTMLElement` aparece numa restrição de tipo genérico.
- `BECAS_POSTULACION_UPDATE` (2postulacion-react/src/context/PostulacionContext.tsx:69) vai à contenedora, que não tem ramo para esse `tipo` (src/main.ts:189-209). 3seguimiento-angular trata esse `tipo` e `BECAS_POSTULACION_ENVIADA` (3seguimiento-angular/src/app/app.component.ts:28-30), mas o Angular roda em outro iframe e nenhuma unidade repassa a mensagem; nenhum arquivo envia `BECAS_POSTULACION_ENVIADA`. A linha ficou `Yes` porque a mensagem é disparada para outra unidade; a falta de consumidor é registrada aqui.
- A contenedora espera `BECAS_VUE_READY` (src/main.ts:205), mas 1verificador-vue não envia essa mensagem nem escuta `message`; o módulo Vue recebe `BECAS_PORTAL_STATE` sem tratá-lo.
- O compartilhamento por `localStorage` depende da mesma origem, que só existe no deploy integrado; nas URLs de desenvolvimento (src/main.ts:24-34) os módulos ficam em portas diferentes e só o `postMessage` liga as unidades.
- O scaffold `1verificador-vue/verificador/` (unidade `Yes` na revisão estrutural) não tem construção de composição: a busca do passo 4 não achou `import()`, `postMessage`, `localStorage`, iframe nem custom element nos seus arquivos.
- A busca do passo 4 não achou `import()` dinâmico, `React.lazy`, `defineAsyncComponent`, `loadRemote`, `customElements`, `CustomEvent`, `BroadcastChannel` nem injeção de `<script>` no snapshot. Os listeners de `message` (src/main.ts:189; 2postulacion-react/src/context/PostulacionContext.tsx:59; 3seguimiento-angular/src/app/app.component.ts:21) são pontos de uso do `postMessage` já registrado e não viraram linha.
