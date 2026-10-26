---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
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

# 321 — JandrySan/becas-uleam

## Leitura do repositório

Projeto acadêmico de "Demo Day" (`README.md:1`) para o fluxo de bolsas de uma universidade: uma
contenedora vanilla-TS na raiz (`.`) faz o login único com Supabase e carrega, num único `<iframe>`
(`index.html:61`), três módulos de frameworks diferentes — Vue (`1verificador-vue`, elegibilidade),
React (`2postulacion-react`, postulação) e Angular (`3seguimiento-angular`, acompanhamento) —, um
por integrante da equipe (`README.md:7-10`, `README.md:86-88`). O README diz que a equipe evitou
Module Federation e preferiu compilar cada módulo na sua pasta e carregá-lo por iframe sob o mesmo
domínio (`README.md:94`), com a sessão compartilhada por `localStorage` (`README.md:92`).

A contenedora é o host: os botões da `<nav class="tabs">` declaram os três módulos por `data-src`
(`/vue/`, `/react/`, `/angular/#/seguimiento`, `index.html:24-26`) e `activate` troca `frame.src`
pelo módulo escolhido (`src/main.ts:87-97`); depois do login, `showApp` abre o Vue para estudantes
e o Angular para administradores, desabilitando os outros dois (`src/main.ts:120-130`). Os caminhos
batem com o `base` de cada build (`1verificador-vue/vite.config.ts:5`, `2postulacion-react/vite.config.ts:5`,
`3seguimiento-angular/package.json:7`) e com as pastas onde `scripts/build-integrado.mjs:14-19`
copia os builds dentro do `dist` da raiz, que é o único deploy (`package.json:17`; `vercel.json:3-5`).
Em desenvolvimento (`localhost:3000`), as URLs viram as portas 5173, 5174 e 4200 (`src/main.ts:24-34`).

A navegação e o estado correm por dois canais. Por `postMessage`, os módulos pedem à contenedora
que troque de módulo (`{ modulo: 'postulacion' }`, `{ modulo: 'seguimiento' }`), avisam que estão
prontos e enviam dados; a contenedora responde com `BECAS_PORTAL_STATE` ao módulo do iframe
(`src/main.ts:75-85`, `:189-209`). Por `localStorage`, que só é comum às unidades no deploy
integrado (mesma origem), a contenedora grava a sessão e os módulos gravam e leem os dados do
estudante. O fluxo é linear: Vue avalia → React postula → Angular acompanha.

O que não virou relação: a contenedora espera `BECAS_VUE_READY` (`src/main.ts:205`), que o Vue
nunca envia; `BECAS_POSTULACION_UPDATE` vai à contenedora, que não o trata, e o Angular, que o
trata (`3seguimiento-angular/src/app/app.component.ts:28-30`), roda em outro carregamento do mesmo
iframe e não o recebe de ninguém. O scaffold `1verificador-vue/verificador` é uma unidade isolada:
fica fora do workspace e do build integrado, e nenhuma unidade o carrega.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | 1verificador-vue | page → embedded-frontend | origem → destino | iframe | Yes | Yes | 1verificador-vue/vite.config.ts:5 (`base: '/vue/'`); scripts/build-integrado.mjs:14 (copia `1verificador-vue/dist` para `dist/vue`) | index.html:61; index.html:24 |
| 2 | . | 2postulacion-react | page → embedded-frontend | origem → destino | iframe | Yes | Yes | 2postulacion-react/vite.config.ts:5 (`base: '/react/'`); scripts/build-integrado.mjs:15 (copia `2postulacion-react/dist` para `dist/react`) | index.html:61; index.html:24 |
| 3 | . | 3seguimiento-angular | page → embedded-frontend | origem → destino | iframe | Yes | Yes | 3seguimiento-angular/package.json:7 (`ng build --base-href /angular/`); scripts/build-integrado.mjs:16-19 (copia o build Angular para `dist/angular`) | index.html:61; index.html:24 |
| 4 | . | 1verificador-vue | communication | bidirecional | events | Yes | Yes | — | 1verificador-vue/src/views/HomeView.vue:92; 1verificador-vue/src/views/HomeView.vue:103; src/main.ts:138 |
| 5 | . | 2postulacion-react | communication | bidirecional | events | Yes | Yes | — | 2postulacion-react/src/context/PostulacionContext.tsx:60; 2postulacion-react/src/context/PostulacionContext.tsx:69; 2postulacion-react/src/pages/VistaPrevia.tsx:99; src/main.ts:84 |
| 6 | . | 3seguimiento-angular | communication | bidirecional | events | Yes | Yes | — | 3seguimiento-angular/src/app/app.component.ts:18; src/main.ts:84; src/main.ts:138 |
| 7 | 1verificador-vue | 2postulacion-react | communication | origem → destino | other | Yes | Yes | — | 1verificador-vue/src/views/HomeView.vue:88 |

## Observações

**1. . → 1verificador-vue.** O primeiro botão da navegação aponta para `data-src="/vue/"`
(`index.html:24`), e `activate` põe esse valor em `frame.src` do iframe `moduleFrame`
(`index.html:61`; `src/main.ts:91`). O destino foi resolvido por duas correspondências: `/vue/` é o
`base` do build Vue (`1verificador-vue/vite.config.ts:5`) e a pasta para onde
`scripts/build-integrado.mjs:14` copia `1verificador-vue/dist`. É o módulo aberto por padrão para
estudantes (`src/main.ts:129`) e fica desabilitado para administradores (`src/main.ts:121-123`).

**2. . → 2postulacion-react.** Mesmo padrão com `data-src="/react/"` (`index.html:25`), que é o
`base` do build React (`2postulacion-react/vite.config.ts:5`) e o destino da cópia em
`scripts/build-integrado.mjs:15`. Além do clique, a contenedora abre esse módulo quando o Vue pede
`{ modulo: 'postulacion' }` (`src/main.ts:199`; relação 4).

**3. . → 3seguimiento-angular.** Mesmo padrão com `data-src="/angular/#/seguimiento"`
(`index.html:26`). O prefixo `/angular/` é o `--base-href` do build Angular
(`3seguimiento-angular/package.json:7`) e a pasta da cópia em `scripts/build-integrado.mjs:16-19`.
É o módulo aberto para administradores (`src/main.ts:124`) e o que a contenedora abre quando o
React pede `{ modulo: 'seguimiento' }` (`src/main.ts:200`; relação 5).

**4. . → 1verificador-vue.** O Vue envia à janela da contenedora `BECAS_DATOS_ESTUDIANTE` ao fim
de `evaluar` (`1verificador-vue/src/views/HomeView.vue:92-99`) e `{ modulo: 'postulacion' }` em
`iniciarPostulacion` (`:101-104`); a contenedora grava os dados e troca o iframe para o React
(`src/main.ts:192-199`). No outro sentido, a contenedora grava `usuario` no `localStorage` em
`saveSession` (`src/main.ts:137`, linha `src/main.ts:138` da revisão de código-fonte), e o Vue lê
essa chave para preencher o correio do formulário (`1verificador-vue/src/views/HomeView.vue:21`).
A revisão de código-fonte só nomeia o Angular como leitor da sessão; o Vue foi resolvido aqui pela
leitura de `usuario`. Por isso a direção é `bidirecional`. O trio junta o canal `postMessage` e o
estado por `localStorage`; pela regra do pesquisador de 24/10, o mecanismo é `events`. O
`BECAS_PORTAL_STATE` de `sendState` (`src/main.ts:84`) também chega ao Vue quando ele está no
iframe, mas o Vue não escuta `message`, e a revisão de código-fonte dá como alvos dessa linha só o
React e o Angular; por isso `src/main.ts:84` não está nesta linha.

**5. . → 2postulacion-react.** O React avisa que está pronto com `BECAS_REACT_READY` na montagem do
`PostulacionProvider` (`2postulacion-react/src/context/PostulacionContext.tsx:53-62`), envia
`BECAS_POSTULACION_UPDATE` a cada mudança de estado (`:63-70`) e pede `{ modulo: 'seguimiento' }`
depois de gravar a postulação (`2postulacion-react/src/pages/VistaPrevia.tsx:99`). A contenedora
responde ao `READY` com `sendState` (`src/main.ts:202-207`), cujo `BECAS_PORTAL_STATE` o React
aplica (`2postulacion-react/src/context/PostulacionContext.tsx:56`): envio nos dois sentidos, logo
`bidirecional`. Só há o canal `postMessage` nesta linha: as chaves de sessão gravadas em
`src/main.ts:136-141` não são lidas pelo React, que lê as chaves `becas_*`
(`2postulacion-react/src/context/PostulacionContext.tsx:4-6`). `BECAS_POSTULACION_UPDATE` não tem
ramo no listener da contenedora (`src/main.ts:189-209`); a linha conta pelo envio, como registrou a
revisão de código-fonte.

**6. . → 3seguimiento-angular.** O Angular envia `BECAS_ANGULAR_READY` no `ngOnInit`
(`3seguimiento-angular/src/app/app.component.ts:17-19`), a contenedora responde com `sendState`
(`src/main.ts:204`, `:207`, `:84`) e o Angular aplica `BECAS_PORTAL_STATE` com `aplicarSesion`
(`3seguimiento-angular/src/app/app.component.ts:21-27`): envio nos dois sentidos, `bidirecional`.
Além disso, a sessão gravada pela contenedora (`src/main.ts:136-141`) é lida pelo Angular em
`becas_session` (`3seguimiento-angular/src/app/services/auth.service.ts:13-15`) e `usuario`
(`3seguimiento-angular/src/app/services/seguimiento-store.service.ts:111`). O trio junta `postMessage`
e `localStorage`; pela regra do pesquisador de 24/10, o mecanismo é `events`.

**7. 1verificador-vue → 2postulacion-react.** O Vue grava `becas_datos_estudiante`, `becas_nombre` e
`becas_email` em `evaluar` (`1verificador-vue/src/views/HomeView.vue:88-90`), e o React lê as mesmas
chaves no estado inicial do `PostulacionProvider` (`2postulacion-react/src/context/PostulacionContext.tsx:4-6`,
`:45-52`) e `becas_datos_estudiante` ao enviar a postulação
(`2postulacion-react/src/pages/VistaPrevia.tsx:37-39`). Mecanismo `other`: é estado compartilhado
por `localStorage` sob a mesma origem, sem mensagem entre os dois módulos, e o trio não tem canal de
eventos. A ligação só funciona no deploy integrado; nas portas de desenvolvimento
(`src/main.ts:24-34`) as origens são diferentes. O React regrava essas chaves
(`2postulacion-react/src/context/PostulacionContext.tsx:65-68`) e a contenedora também as grava ao
receber `BECAS_DATOS_ESTUDIANTE` (`src/main.ts:193-195`), mas nenhuma dessas linhas é construção na
revisão de código-fonte; a direção fica a da gravação registrada.

## Resumo

Relações: 7 (page → embedded-frontend: 3, communication: 4). Ativas: 7. Destino fora do snapshot: 0.
Unidades sem relação: 1verificador-vue/verificador.
