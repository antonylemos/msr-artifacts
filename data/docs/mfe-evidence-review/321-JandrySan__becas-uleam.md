---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 321 — JandrySan/becas-uleam

## Leitura do repositório

A cadeia observada parte de uma contenedora e três módulos com entrada e build próprios (#13, #14, #16, #17), passa pelo código que declara os destinos e troca o iframe (#2, #10) e chega às três relações ativas de embedding (#18–#20). Mensagens entre janelas e armazenamento da mesma origem sustentam navegação e transferência de estado (#3–#9, #11, #12; #21–#24). Os quatro builds integrados saem num único deploy estático (#25, #26, #28, #29); o scaffold Vue aninhado também é unidade frontend na revisão estrutural, mas fica isolado e sem deploy observado (#15, #27).

Não há linha de dependência na 3.4.2, portanto a dimensão tecnológica não recebe observação de manifesto. Nenhum bloco de configuração citado nas tabelas atende ao recorte da dimensão 2: os Vite configs declaram plugins de framework e bases de publicação, o angular.json declara build comum de aplicação, os manifestos/workspace listam projetos e scripts, e vercel.json publica o dist. As URLs que nomeiam os destinos do iframe estão em código da aplicação (#10), não em configuração de ferramenta. As bases de publicação continuam nos trechos de estrutura, composição e build, sem virar configuração de remote.

Os sinais enganosos são a restrição TypeScript confundida com custom element (#1) e a menção que nega Module Federation (#41). O envio React sem receptor na contenedora não demonstra atualização do Angular (#6, #22). O Vue não implementa o contrato READY/recepção de estado que a contenedora espera (#21, #45). O histórico não esclarece o passado desses contratos, mas os limites do snapshot são claros (#44, #45). Não se infere abandono.

A documentação corrobora a organização integrada, mas registra três contradições: persistência Angular descrita como sem banco (#30), rewrites prometidos e ausentes (#38) e sessão por localStorage estendida indevidamente aos três módulos (#43). O histórico esclarece os dois primeiros descompassos (#46, #47); a origem da nota de sessão continua inconclusiva (#48). A atribuição de módulos a integrantes permanece sem corroboração (#39). Essas limitações não desfazem as relações de composição registradas como ativas.

## Observações

### 1. src/main.ts:9

**Observação:** O helper `$` usa `getElementById` com o parâmetro genérico `T extends HTMLElement`.

**Interpretação:** A restrição de tipo não define um custom element; é falso positivo da mineração.

### 2. index.html:61; index.html:24-26; src/main.ts:87-97; scripts/build-integrado.mjs:14-19

**Observação:** O iframe `moduleFrame` começa em `about:blank`; `activate` atribui a `frame.src` o `data-src` dos botões `/vue/`, `/react/` e `/angular/#/seguimiento`. Os builds dos três módulos são copiados para essas subpastas.

**Interpretação:** A contenedora carrega três unidades frontend em uma área comum por iframe.

### 3. 1verificador-vue/src/views/HomeView.vue:64-99; 1verificador-vue/src/views/HomeView.vue:122; src/main.ts:192-196

**Observação:** O submit executa `evaluar`, que envia `BECAS_DATOS_ESTUDIANTE` à janela pai; o listener da contenedora grava os dados e chama `sendState`.

**Interpretação:** O Vue envia dados à contenedora por mensagem entre janelas. O destino é obtido por `window.parent`.

### 4. 1verificador-vue/src/views/HomeView.vue:101-104; 1verificador-vue/src/views/HomeView.vue:209; src/main.ts:199

**Observação:** O botão de iniciar postulação chama `iniciarPostulacion`, que envia `{ modulo: postulacion }` à janela pai. A contenedora chama `activateBySrc` com `/react/`.

**Interpretação:** O Vue pede navegação à contenedora, que seleciona o React.

### 5. 2postulacion-react/src/context/PostulacionContext.tsx:53-62; 2postulacion-react/src/main.tsx:12; src/main.ts:203-207

**Observação:** Na montagem do provider, o React registra um listener de `message`, trata `BECAS_PORTAL_STATE` e envia `BECAS_REACT_READY` à janela pai. A contenedora responde chamando `sendState`.

**Interpretação:** O handshake conecta React e contenedora; o envio usa a janela pai como destino.

### 6. 2postulacion-react/src/context/PostulacionContext.tsx:63-70; src/main.ts:189-209

**Observação:** O efeito de mudança de estado envia `BECAS_POSTULACION_UPDATE` à janela pai. O listener da contenedora não possui ramo para esse tipo.

**Interpretação:** Há envio entre unidades, mantido como Composição Yes na 3.4.4, mas sem consumidor na contenedora; isso não comprova atualização do Angular.

### 7. 2postulacion-react/src/pages/VistaPrevia.tsx:99; 2postulacion-react/src/pages/VistaPrevia.tsx:126; 2postulacion-react/src/App.tsx:17; src/main.ts:200

**Observação:** A página de resumo envia `{ modulo: seguimiento }` à janela pai após a postulação; a contenedora chama `activateBySrc` com `/angular/`.

**Interpretação:** O React pede navegação à contenedora, que seleciona o Angular.

### 8. 3seguimiento-angular/src/app/app.component.ts:17-27; 3seguimiento-angular/src/main.ts:14; src/main.ts:204-207

**Observação:** O `ngOnInit` envia `BECAS_ANGULAR_READY` à janela pai; a contenedora responde com estado e o listener Angular aplica `BECAS_PORTAL_STATE`.

**Interpretação:** O handshake liga o Angular à contenedora por mensagens; o envio usa a janela pai como destino.

### 9. src/main.ts:75-85; src/main.ts:96; src/main.ts:187; src/main.ts:196-207; 2postulacion-react/src/context/PostulacionContext.tsx:56; 3seguimiento-angular/src/app/app.component.ts:24-26

**Observação:** `sendState` envia `BECAS_PORTAL_STATE` com sessão, token, usuário e id a `frame.contentWindow`, após ativação, carregamento e mensagens. React e Angular têm listeners para o tipo.

**Interpretação:** O mecanismo envia estado ao módulo corrente do iframe; a unidade destinatária depende de qual está carregada.

### 10. index.html:23-27; src/main.ts:24-34; src/main.ts:91-94

**Observação:** Os botões da contenedora declaram os destinos `/vue/`, `/react/` e `/angular/#/seguimiento`, com título e tecnologia. `activate` carrega o destino no iframe; em desenvolvimento os atributos recebem URLs com portas próprias.

**Interpretação:** O registro executado pela aplicação nomeia os três destinos de composição. É código da interface, não arquivo de configuração de ferramenta.

### 11. src/main.ts:133-145; src/main.ts:169; 3seguimiento-angular/src/app/services/auth.service.ts:8-15; 3seguimiento-angular/src/app/services/seguimiento-store.service.ts:111; scripts/build-integrado.mjs:14-19; vercel.json:3-5

**Observação:** Após login, `saveSession` grava `token`, `usuario`, `becas_session` e `supabase_user_id`. O Angular lê `becas_session` e `usuario`; os builds integrados são publicados sob a mesma origem.

**Interpretação:** A sessão liga contenedora e Angular por armazenamento da mesma origem; as portas distintas de desenvolvimento limitam esse compartilhamento.

### 12. 1verificador-vue/src/views/HomeView.vue:88-90; 2postulacion-react/src/context/PostulacionContext.tsx:4-6; 2postulacion-react/src/context/PostulacionContext.tsx:45-52; 2postulacion-react/src/pages/VistaPrevia.tsx:37-39

**Observação:** O Vue grava `becas_datos_estudiante`, `becas_nombre` e `becas_email`; o estado inicial React lê as mesmas chaves e o envio da postulação lê os dados do estudante.

**Interpretação:** O armazenamento compartilhado transfere dados do Vue ao React quando ambos usam a mesma origem.

### 13. ./; index.html:65; src/main.ts:87-97; package.json:15-17

**Observação:** A raiz tem entrada HTML para `src/main.ts`, que troca o iframe, e build Vite próprio.

**Interpretação:** A contenedora é uma unidade frontend com entrada e build próprios.

### 14. 1verificador-vue/; 1verificador-vue/index.html:11; 1verificador-vue/src/main.ts:20-23; 1verificador-vue/package.json:8; 1verificador-vue/vite.config.ts:4-7

**Observação:** A entrada monta Vue com Pinia e router; o manifesto define `vite build`, com base `/vue/`.

**Interpretação:** Há limite de aplicação Vue com build próprio.

### 15. 1verificador-vue/verificador/; 1verificador-vue/verificador/index.html:62; 1verificador-vue/verificador/src/main.ts:5; 1verificador-vue/verificador/package.json:8; 1verificador-vue/verificador/vite.config.ts:5-7

**Observação:** O scaffold aninhado monta Vue e define `vue-tsc -b && vite build`; não consta no workspace nem no build integrado.

**Interpretação:** É unidade frontend observável, embora isolada da composição integrada.

### 16. 2postulacion-react/; 2postulacion-react/index.html:1; 2postulacion-react/src/main.tsx:9-17; 2postulacion-react/package.json:8; 2postulacion-react/vite.config.ts:4-7

**Observação:** A entrada monta React com `HashRouter`; o build executa TypeScript e Vite com base `/react/`.

**Interpretação:** Há limite de aplicação React com build próprio.

### 17. 3seguimiento-angular/; 3seguimiento-angular/angular.json:13-18; 3seguimiento-angular/src/main.ts:14-15; 3seguimiento-angular/package.json:7

**Observação:** O target Angular declara entrada HTML e `src/main.ts`, que executa `bootstrapApplication`; há build `ng build --base-href /angular/`.

**Interpretação:** Há limite de aplicação Angular com entrada e build próprios.

### 18. index.html:24; index.html:61; src/main.ts:87-97; 1verificador-vue/vite.config.ts:5; scripts/build-integrado.mjs:14

**Observação:** O botão aponta para `/vue/`, que é carregado no iframe; a base do build e a cópia para o `dist` integrado resolvem o destino `1verificador-vue`.

**Interpretação:** A relação ativa liga a contenedora a `1verificador-vue` por iframe.

### 19. index.html:25; index.html:61; src/main.ts:87-97; 2postulacion-react/vite.config.ts:5; scripts/build-integrado.mjs:15

**Observação:** O botão aponta para `/react/`, que é carregado no iframe; a base do build e a cópia para o `dist` integrado resolvem o destino `2postulacion-react`.

**Interpretação:** A relação ativa liga a contenedora a `2postulacion-react` por iframe.

### 20. index.html:26; index.html:61; src/main.ts:87-97; 3seguimiento-angular/package.json:7; scripts/build-integrado.mjs:16-19

**Observação:** O botão aponta para `/angular/#/seguimiento`, que é carregado no iframe; a base do build e a cópia para o `dist` integrado resolvem o destino `3seguimiento-angular`.

**Interpretação:** A relação ativa liga a contenedora a `3seguimiento-angular` por iframe.

### 21. 1verificador-vue/src/views/HomeView.vue:21; 1verificador-vue/src/views/HomeView.vue:92-104; src/main.ts:136-138; src/main.ts:192-199

**Observação:** O Vue envia dados e pedido de postulação à contenedora; no sentido inverso lê `usuario` gravado por ela no `localStorage`.

**Interpretação:** A relação bidirecional combina mensagens e armazenamento da mesma origem, com mecanismo events conforme a revisão final.

### 22. 2postulacion-react/src/context/PostulacionContext.tsx:53-70; 2postulacion-react/src/pages/VistaPrevia.tsx:99; src/main.ts:75-85; src/main.ts:189-209

**Observação:** O React envia READY, atualização e pedido de acompanhamento; a contenedora responde ao READY com estado. O React trata o tipo de estado, mas a contenedora não trata a atualização.

**Interpretação:** A relação ativa e bidirecional conta pelos envios existentes; não implica consumidor para todos os tipos de mensagem.

### 23. 3seguimiento-angular/src/app/app.component.ts:17-27; src/main.ts:75-85; src/main.ts:136-141; src/main.ts:204-207; 3seguimiento-angular/src/app/services/auth.service.ts:13-15; 3seguimiento-angular/src/app/services/seguimiento-store.service.ts:111

**Observação:** O Angular envia READY, recebe estado da contenedora e lê a sessão e o usuário gravados por ela.

**Interpretação:** A relação bidirecional ativa combina postMessage e armazenamento da mesma origem, com mecanismo events na revisão final.

### 24. 1verificador-vue/src/views/HomeView.vue:88-90; 2postulacion-react/src/context/PostulacionContext.tsx:4-6; 2postulacion-react/src/context/PostulacionContext.tsx:45-52; 2postulacion-react/src/pages/VistaPrevia.tsx:37-39

**Observação:** O Vue grava três chaves de dados do estudante que o React lê na inicialização e na postulação.

**Interpretação:** A relação ativa segue Vue → React via localStorage na mesma origem; não há mensagem direta entre os dois.

### 25. package.json:17; scripts/build-integrado.mjs:14-19; vercel.json:3-5

**Observação:** O build da raiz compila a contenedora com Vite, dispara os builds dos três módulos e copia seus resultados para o dist publicado pela Vercel.

**Interpretação:** Build separado confirma o limite da unidade; o deploy é conjunto e não há versionamento independente registrado.

### 26. 1verificador-vue/package.json:8; 1verificador-vue/vite.config.ts:4-7; scripts/build-integrado.mjs:14; vercel.json:3-5

**Observação:** `1verificador-vue` tem comando de build próprio; seu resultado é copiado para o dist integrado e publicado no deploy Vercel conjunto.

**Interpretação:** Build separado confirma o limite da unidade; o deploy é conjunto e não há versionamento independente registrado.

### 27. 1verificador-vue/verificador/package.json:8; 1verificador-vue/verificador/vite.config.ts:5-7; pnpm-workspace.yaml:1-4; package.json:17; scripts/build-integrado.mjs:14-19

**Observação:** O scaffold tem build próprio, mas fica fora do workspace, do comando integrado e das cópias publicadas; seu deploy é não observado.

**Interpretação:** Build separado confirma o limite da unidade; não há publicação observada do scaffold.

### 28. 2postulacion-react/package.json:8; 2postulacion-react/vite.config.ts:4-7; scripts/build-integrado.mjs:15; vercel.json:3-5

**Observação:** `2postulacion-react` tem comando de build próprio; seu resultado é copiado para o dist integrado e publicado no deploy Vercel conjunto.

**Interpretação:** Build separado confirma o limite da unidade; o deploy é conjunto e não há versionamento independente registrado.

### 29. 3seguimiento-angular/package.json:7; 3seguimiento-angular/angular.json:13-18; scripts/generar-angular-env.mjs:63-86; scripts/build-integrado.mjs:16-19; vercel.json:3-5

**Observação:** `3seguimiento-angular` tem comando de build próprio; seu resultado é copiado para o dist integrado e publicado no deploy Vercel conjunto. O build Angular depende do environment gerado pelo prebuild da raiz.

**Interpretação:** Build separado confirma o limite da unidade; o deploy é conjunto e não há versionamento independente registrado.

### 30. 3seguimiento-angular/README.md:3

**Observação:** O README Angular descreve um protótipo com dados simulados em memória e sem banco.

**Interpretação:** É contexto sobre persistência, contradito pelo uso de Supabase; não demonstra composição frontend.

### 31. README.md:7

**Observação:** O README atribui à contenedora vanilla-ts login único, menu e integração por iframe.

**Interpretação:** A afirmação situa o papel da contenedora e é corroborada por sua entrada e pelas relações de embedding.

### 32. README.md:8-10

**Observação:** O README lista Vue em /vue/, React em /react/ e Angular em /angular/.

**Interpretação:** A lista descreve os três módulos integrados, sem incluir o scaffold isolado.

### 33. README.md:19-24

**Observação:** O README diz que os módulos sobem separadamente em desenvolvimento e lista as quatro portas.

**Interpretação:** A separação dos servidores é corroborada pelos scripts e URLs de desenvolvimento; não equivale a deploy independente.

### 34. README.md:32-40

**Observação:** O README apresenta uma única pasta dist com index.html e subpastas vue, react e angular.

**Interpretação:** A árvore documenta a agregação dos builds separados em um artefato publicado em conjunto.

### 35. README.md:42

**Observação:** O README descreve uma URL pública, módulos em subpastas e navegação com hash routing.

**Interpretação:** A afirmação é corroborada pelo deploy integrado e pelos roteadores dos módulos; não fornece um endereço publicado.

### 36. README.md:46; README.md:59

**Observação:** O README pede um projeto Supabase único e o descreve como compartilhado pela equipe.

**Interpretação:** É contexto de backend compartilhado, corroborado pelos clientes e variáveis comuns, sem demonstrar composição frontend.

### 37. README.md:70-78

**Observação:** O README instrui deploy na Vercel com saída dist.

**Interpretação:** O deploy descrito é o único deploy conjunto registrado; a diferença npm/pnpm não muda o script de build chamado.

### 38. README.md:80

**Observação:** O README afirma que vercel.json já contém rewrites para /vue/, /react/ e /angular/.

**Interpretação:** A afirmação é contradita pelo arquivo, que contém apenas instalação, build e diretório de saída.

### 39. README.md:86-88

**Observação:** O README atribui um módulo Vue, React e Angular a cada um de três integrantes, ainda sem nomes.

**Interpretação:** A divisão de responsabilidade por módulo é declarada, mas permanece sem corroboração na revisão documental.

### 40. README.md:92

**Observação:** O README diz que o login ficou na contenedora para manter sessão única compartilhada por localStorage.

**Interpretação:** A afirmação é corroborada pela gravação da sessão e pela leitura em Vue e Angular; não exige que todos os módulos leiam as mesmas chaves.

### 41. README.md:94

**Observação:** O README afirma que integrou aplicações em frameworks diferentes sem usar module federation.

**Interpretação:** A negação é corroborada pela ausência de dependências de integração na 3.4.2 e pela integração por iframe; a menção textual não comprova uso de Module Federation.

### 42. README.md:94

**Observação:** O README diz que cada módulo é carregado em iframe sob o mesmo domínio.

**Interpretação:** A afirmação é corroborada pelos caminhos relativos e pelo deploy conjunto; em desenvolvimento as portas são distintas.

### 43. index.html:46

**Observação:** A nota do login diz que a sessão é compartilhada com os três módulos por localStorage.

**Interpretação:** A extensão aos três é contradita: Vue e Angular leem chaves de sessão, mas o React lê dados do estudante e recebe mensagens do portal, sem ler essas chaves.

### 44. 2f53246 2026-07-08 (2postulacion-react/src/context/PostulacionContext.tsx; src/main.ts; 3seguimiento-angular/src/app/app.component.ts); acb73a0 2026-07-09 (src/main.ts; 3seguimiento-angular/src/app/app.component.ts)

**Observação:** O provedor React já envia BECAS_POSTULACION_UPDATE no primeiro commit e não muda depois. Os conteúdos iniciais da contenedora e do componente Angular estão ausentes.

**Interpretação:** O passado do receptor/encaminhamento permanece inconclusivo; no snapshot está clara a ausência de consumidor na contenedora e de encaminhamento ao Angular.

### 45. 2f53246 2026-07-08 (src/main.ts; 1verificador-vue/src/views/HomeView.vue); acb73a0 2026-07-09 (src/main.ts; 1verificador-vue/src/views/HomeView.vue)

**Observação:** A contenedora e HomeView aparecem no primeiro commit e mudam em acb73a0; seus conteúdos iniciais não estão disponíveis.

**Interpretação:** Não se determina se o contrato READY do Vue foi retirado ou nunca conectado. A dúvida é histórica: o snapshot já registra que o Vue não envia READY nem escuta estado.

### 46. 997197b 2026-07-09 (README.md); c1a2ab3 2026-07-10 (vercel.json)

**Observação:** O README deixa de mudar antes do commit que altera somente vercel.json e anuncia a remoção de rewrites que bloqueavam os módulos; os conteúdos antigos dessas regras não foram lidos.

**Interpretação:** A sequência esclarece a promessa documental desatualizada, sem demonstrar o bloqueio alegado pela mensagem do commit.

### 47. 2f53246 2026-07-08 (3seguimiento-angular/README.md); acb73a0 2026-07-09 (3seguimiento-angular/src/app/services/supabase.service.ts; 3seguimiento-angular/src/app/services/seguimiento-store.service.ts)

**Observação:** O README Angular é adicionado no primeiro commit e não muda; acb73a0 cria o serviço Supabase e altera o store. Os conteúdos antigos do store estão ausentes.

**Interpretação:** O histórico esclarece a descrição mantida antes da criação do serviço, sem provar que a implementação anterior era exclusivamente em memória.

### 48. 2f53246 2026-07-08 (2postulacion-react/src/context/PostulacionContext.tsx; index.html; src/main.ts); acb73a0 2026-07-09 (index.html; src/main.ts)

**Observação:** O provedor React inicial já lê só dados e documentos do localStorage e não muda; index.html e src/main.ts mudam depois, mas seus conteúdos anteriores estão ausentes.

**Interpretação:** A origem da nota abrangente permanece inconclusiva. A dúvida é sobre o passado; no snapshot a contradição entre a nota e as leituras React está delimitada.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (src/main.ts:9) | 3 código | código-fonte | — | contexto | fraca | — |
| 2 | 3.4.4 (index.html:61) | 3 código | código-fonte | iframe | arquitetural | forte | implementa #18; implementa #19; implementa #20 |
| 3 | 3.4.4 (1verificador-vue/src/views/HomeView.vue:92) | 3 código | código-fonte | events | arquitetural | moderada | implementa #21 |
| 4 | 3.4.4 (1verificador-vue/src/views/HomeView.vue:103) | 3 código | código-fonte | events | arquitetural | forte | implementa #21 |
| 5 | 3.4.4 (2postulacion-react/src/context/PostulacionContext.tsx:60) | 3 código | código-fonte | events | arquitetural | moderada | implementa #22 |
| 6 | 3.4.4 (2postulacion-react/src/context/PostulacionContext.tsx:69) | 3 código | código-fonte | events | arquitetural | moderada | implementa #22 |
| 7 | 3.4.4 (2postulacion-react/src/pages/VistaPrevia.tsx:99) | 3 código | código-fonte | events | arquitetural | forte | implementa #22 |
| 8 | 3.4.4 (3seguimiento-angular/src/app/app.component.ts:18) | 3 código | código-fonte | events | arquitetural | moderada | implementa #23 |
| 9 | 3.4.4 (src/main.ts:84) | 3 código | código-fonte | events | arquitetural | moderada | implementa #22; implementa #23 |
| 10 | 3.4.4 (index.html:24) | 3 código | código-fonte | iframe | arquitetural | forte | implementa #18; implementa #19; implementa #20 |
| 11 | 3.4.4 (src/main.ts:138) | 3 código | código-fonte | events | arquitetural | moderada | implementa #21; implementa #23 |
| 12 | 3.4.4 (1verificador-vue/src/views/HomeView.vue:88) | 3 código | código-fonte | other | arquitetural | moderada | implementa #24 |
| 13 | 3.4.3 (.) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 14 | 3.4.3 (1verificador-vue) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 15 | 3.4.3 (1verificador-vue/verificador) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 16 | 3.4.3 (2postulacion-react) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 17 | 3.4.3 (3seguimiento-angular) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 18 | 3.4.5 #1 | 5 composição | código-fonte | iframe | arquitetural | forte | liga #13; liga #14 |
| 19 | 3.4.5 #2 | 5 composição | código-fonte | iframe | arquitetural | forte | liga #13; liga #16 |
| 20 | 3.4.5 #3 | 5 composição | código-fonte | iframe | arquitetural | forte | liga #13; liga #17 |
| 21 | 3.4.5 #4 | 5 composição | código-fonte | events | arquitetural | forte | liga #13; liga #14 |
| 22 | 3.4.5 #5 | 5 composição | código-fonte | events | arquitetural | forte | liga #13; liga #16 |
| 23 | 3.4.5 #6 | 5 composição | código-fonte | events | arquitetural | forte | liga #13; liga #17 |
| 24 | 3.4.5 #7 | 5 composição | código-fonte | other | arquitetural | forte | liga #14; liga #16 |
| 25 | 3.4.6 #1 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #13 |
| 26 | 3.4.6 #2 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #14 |
| 27 | 3.4.6 #3 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #15 |
| 28 | 3.4.6 #4 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #16 |
| 29 | 3.4.6 #5 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #17 |
| 30 | 3.4.7 #1 | 7 documentação | documentação | — | contexto | fraca | contradiz 3seguimiento-angular/src/app/services/seguimiento-store.service.ts:42-44; contradiz 3seguimiento-angular/src/app/services/supabase.service.ts:11-27 |
| 31 | 3.4.7 #2 | 7 documentação | documentação | iframe | arquitetural | fraca | corrobora #13; corrobora #18; corrobora #19; corrobora #20 |
| 32 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #14; corrobora #16; corrobora #17; corrobora #26; corrobora #28; corrobora #29 |
| 33 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora package.json:14-15; corrobora src/main.ts:24-34 |
| 34 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #25; corrobora #26; corrobora #28; corrobora #29 |
| 35 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #25; corrobora 1verificador-vue/src/main.ts:16; corrobora 2postulacion-react/src/main.tsx:11; corrobora 3seguimiento-angular/src/main.ts:15 |
| 36 | 3.4.7 #7 | 7 documentação | documentação | — | contexto | fraca | corrobora src/services/supabase.ts:3-10; corrobora 1verificador-vue/src/services/supabase.ts:3-6; corrobora 2postulacion-react/src/services/supabase.ts:4-11; corrobora scripts/generar-angular-env.mjs:48-49; corrobora 3seguimiento-angular/src/app/services/supabase.service.ts:24-27 |
| 37 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #25 |
| 38 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | contradiz vercel.json:1-6 |
| 39 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 40 | 3.4.7 #11 | 7 documentação | documentação | other | arquitetural | fraca | corrobora #11; corrobora #21; corrobora #23 |
| 41 | 3.4.7 #12 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #18; corrobora #19; corrobora #20 |
| 42 | 3.4.7 #13 | 7 documentação | documentação | iframe | arquitetural | fraca | corrobora #18; corrobora #19; corrobora #20; corrobora #25; corrobora #26; corrobora #28; corrobora #29 |
| 43 | 3.4.7 #14 | 7 documentação | comentário | other | arquitetural | fraca | contradiz #22; contradiz 2postulacion-react/src/context/PostulacionContext.tsx:4-6; contradiz 2postulacion-react/src/context/PostulacionContext.tsx:45-52 |
| 44 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #6; explica #22 |
| 45 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #21 |
| 46 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #38; explica #25 |
| 47 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #30 |
| 48 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #43; explica #22 |

## Resumo

Observações: 48. Dimensões (tecnologia: 0, configuração: 0, código: 12, estrutura: 5, composição: 7, build-deploy: 5, documentação: 14, histórico: 5). Força (forte: 11, moderada: 17, fraca: 20, ambígua: 0). Evidência (tecnológica: 1, arquitetural: 44, contexto: 3).
