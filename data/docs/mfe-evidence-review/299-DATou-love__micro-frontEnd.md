---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
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

# 299 — DATou-love/micro-frontEnd

## Leitura do repositório

A cadeia observável combina a dependência qiankun do host (#1), a saída UMD da sub-app (#2), o registro explícito de destinos (#8) e os lifecycles de montagem e desmontagem (#3–#6). As relações #12 e #13 ligam o host Vue 3/Vite a sub-vue2 e sub-react16. Há duas unidades presentes com entradas e builds próprios (#10, #11, #14, #15); sub-react16 só aparece como destino externo declarado, sem código ou disponibilidade verificáveis no snapshot. As revisões registram as duas relações como ativas. O possível problema de montagem sob strictStyleIsolation não muda esses valores e não foi verificado por execução (#6, #9, #12).

O registro e o start estão em código executado pela aplicação (#8, #9), não em arquivo de configuração. Na dimensão 2, há somente o bloco da ferramenta que configura a biblioteca da sub-app (#2). Portas de desenvolvimento, CORS, aliases e a base HTML não acrescentam observações de configuração da composição segundo o recorte da etapa. A base HTML permanece como suporte da relação #12 e da afirmação #21. Não há deploy observado para as duas aplicações (#14, #15).

As treze afirmações são comentários (#16–#28), com força fraca por si mesmos. Duas confundem o ponto de montagem e a definição da base do roteador (#22, #26); as implementações citadas as contradizem. O único commit não esclarece a origem desses comentários (#29, #30), mas essa incerteza histórica não torna ambígua a arquitetura registrada no snapshot.

## Observações

### 1. main-vue3/package.json:12

**Observação:** O manifesto do host declara `qiankun: ^2.10.16`.

**Interpretação:** A declaração é um sinal tecnológico isolado; o uso aparece nas observações de código.

### 2. sub-vue2/vue.config.js:3-23

**Observação:** A configuração da sub-app define saída com `library: 'subVue2'`, `libraryTarget: 'umd'` e `chunkLoadingGlobal: 'webpackJsonp_sub_vue2'`.

**Interpretação:** O bloco configura o formato de biblioteca da integração qiankun numa unidade, sem nomear outra aplicação.

### 3. sub-vue2/src/main.js:32-34

**Observação:** A entrada exporta a função assíncrona `bootstrap`, que escreve uma mensagem no console.

**Interpretação:** A exportação oferece parte do contrato de lifecycle qiankun, sem ligar sozinha a sub-app a um host.

### 4. sub-vue2/src/main.js:36-39; sub-vue2/src/main.js:10-17

**Observação:** A função exportada `mount(props)` chama `render(props)`, que usa o contêiner recebido.

**Interpretação:** O lifecycle implementa a montagem acionada pelo orquestrador, recebendo a unidade de execução por parâmetro.

### 5. sub-vue2/src/main.js:41-46

**Observação:** A função exportada `unmount` destrói a instância Vue, limpa seu elemento e atribui `null` à instância.

**Interpretação:** Implementa a desativação da sub-app pelo contrato qiankun, sem nomear um consumidor.

### 6. sub-vue2/src/main.js:10-17; sub-vue2/src/main.js:27-29; sub-vue2/src/main.js:36-39

**Observação:** `render` monta a instância no `#app` encontrado dentro de `props.container`, ou no `#app` global sem contêiner. É chamada por `mount(props)` e fora do ambiente qiankun.

**Interpretação:** A montagem adapta a aplicação ao contêiner recebido e à execução isolada. O mecanismo não nomeia o host; o funcionamento sob isolamento estrito não foi executado.

### 7. main-vue3/src/main.ts:3; main-vue3/src/main.ts:10-36; main-vue3/index.html:11

**Observação:** A entrada do host importa `registerMicroApps` e `start` de `qiankun` e usa as duas funções.

**Interpretação:** O import prepara o mecanismo de composição; as unidades são nomeadas pelo registro em observação própria.

### 8. main-vue3/src/main.ts:10-23; main-vue3/src/App.vue:11

**Observação:** `registerMicroApps` registra `sub-vue2` com entrada `//localhost:8081` e regra `/sub-vue2`, e `sub-react16` com entrada `//localhost:3000` e regra `/sub-react16`; ambas usam `#subapp-viewport`.

**Interpretação:** O registro liga o host a duas unidades por endereços e regras explícitos de ativação. A segunda só existe como destino declarado no snapshot.

### 9. main-vue3/src/main.ts:26-36; main-vue3/index.html:11

**Observação:** A entrada chama `start` com `sandbox.strictStyleIsolation: true`.

**Interpretação:** A chamada inicia o mecanismo qiankun sem nomear destinos; a opção ativa não demonstra por si só o sucesso da montagem.

### 10. main-vue3/; main-vue3/package.json:1-24; main-vue3/index.html:10-11; main-vue3/src/main.ts:6-7; main-vue3/src/main.ts:38; main-vue3/vite.config.ts:6-17; main-vue3/package.json:8

**Observação:** O diretório contém manifesto próprio, entrada HTML que carrega `src/main.ts`, criação e montagem Vue 3 e build `vue-tsc -b && vite build` com configuração Vite própria.

**Interpretação:** Esses artefatos delimitam uma unidade frontend com entrada e build próprios, sem comprovar sozinhos sua ligação a outras unidades.

### 11. sub-vue2/; sub-vue2/package.json:1-44; sub-vue2/src/main.js:10-17; sub-vue2/src/main.js:27-29; sub-vue2/public/index.html:17; sub-vue2/vue.config.js:3-23; sub-vue2/package.json:7

**Observação:** O diretório contém manifesto próprio, entrada Vue 2 com montagem fora do qiankun, template com `#app` e build `vue-cli-service build` com configuração própria.

**Interpretação:** Os artefatos delimitam outra unidade frontend, com entrada e build separados dos do host.

### 12. main-vue3/src/main.ts:3; main-vue3/src/main.ts:10-16; main-vue3/src/main.ts:26-36; main-vue3/src/App.vue:11; sub-vue2/vue.config.js:6; sub-vue2/vue.config.js:15-18; sub-vue2/public/index.html:8; sub-vue2/src/main.js:16; sub-vue2/src/main.js:32-46

**Observação:** O host registra `sub-vue2` em `//localhost:8081`, no contêiner `#subapp-viewport`, ativada em `/sub-vue2`. A sub-app tem porta 8081, saída UMD, base HTML `/sub-vue2/` e lifecycles exportados. A revisão marca relação `root-config → application`, presente e ativa.

**Interpretação:** A correspondência de registro, endereço e contrato liga explicitamente duas unidades relativamente independentes. Ativa descreve o código registrado, sem demonstrar execução bem-sucedida sob isolamento estrito.

### 13. main-vue3/src/main.ts:3; main-vue3/src/main.ts:17-22; main-vue3/src/main.ts:26-36; main-vue3/src/App.vue:7; main-vue3/src/App.vue:11

**Observação:** O host registra `sub-react16` em `//localhost:3000`, no mesmo contêiner e com ativação `/sub-react16`. A revisão marca relação `root-config → application`, ativa e com destino fora do snapshot.

**Interpretação:** A relação declara outra unidade por mecanismo explícito de composição; não permite avaliar sua implementação ou disponibilidade.

### 14. main-vue3/package.json:8; main-vue3/vite.config.ts:6-17

**Observação:** O host tem script `vue-tsc -b && vite build` e configuração Vite próprios. A revisão registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** O build confirma o limite de produção do artefato da unidade; não demonstra publicação nem versionamento independente.

### 15. sub-vue2/package.json:7; sub-vue2/vue.config.js:12-20

**Observação:** A sub-app tem script `vue-cli-service build` e saída UMD `subVue2`. A revisão registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** Há build próprio para a sub-app no contrato qiankun, sem evidência de publicação ou versionamento independente.

### 16. main-vue3/src/App.vue:10

**Observação:** O comentário afirma: “子应用挂载点” (ponto de montagem das sub-aplicações).

**Interpretação:** Identifica o contêiner de composição do host; a revisão registra corroboração pelo elemento e pelos registros das sub-apps.

### 17. main-vue3/src/main.ts:9

**Observação:** O comentário afirma: “定义子应用” (define as sub-aplicações).

**Interpretação:** Descreve a organização do registro; é corroborada pelas duas relações, sem afirmar presença local de todos os destinos.

### 18. main-vue3/src/main.ts:25

**Observação:** O comentário afirma: “启动 qiankun” (inicia o qiankun).

**Interpretação:** Nomeia o mecanismo; a chamada efetiva e a dependência corroboram a afirmação.

### 19. main-vue3/src/main.ts:29

**Observação:** O comentário afirma: “开启严格的沙箱模式（推荐）” (ativa o modo estrito de sandbox, recomendado).

**Interpretação:** A revisão corrobora apenas a ativação de `strictStyleIsolation`, sem comprovar isolamento funcional ou segurança.

### 20. main-vue3/vite.config.ts:9

**Observação:** O comentário afirma: “主应用端口” (porta da aplicação principal).

**Interpretação:** Identifica main-vue3 como host, papel corroborado pela unidade e pela composição. A porta não demonstra deploy.

### 21. sub-vue2/public/index.html:7

**Observação:** O comentário afirma: “子应用静态资源前缀” (prefixo dos recursos estáticos da sub-aplicação).

**Interpretação:** A revisão corrobora a base de URLs relativas da unidade pelo elemento `base`, sem inferir publicação.

### 22. sub-vue2/public/index.html:15

**Observação:** O comentário afirma: “子应用挂载点，必须与主应用配置一致” (ponto de montagem da sub-aplicação, deve coincidir com a configuração da aplicação principal).

**Interpretação:** A revisão registra contradição: o elemento `subapp-viewport` da sub-app não é seu alvo de montagem, que é `#app`; o contêiner externo pertence ao host.

### 23. sub-vue2/src/main.js:9

**Observação:** O comentário afirma: “渲染函数 - Updated for qiankun integration” (função de renderização — atualizada para integração com qiankun).

**Interpretação:** A revisão corrobora a adaptação de renderização ao contêiner recebido, sem atestar execução.

### 24. sub-vue2/src/main.js:26

**Observação:** O comentário afirma: “如果在 qiankun 环境下，不立即挂载” (no ambiente qiankun, não monta imediatamente).

**Interpretação:** Descreve o mecanismo de adiar a montagem ao lifecycle; a guarda e a chamada em mount corroboram a afirmação.

### 25. sub-vue2/src/main.js:31

**Observação:** O comentário afirma: “qiankun 生命周期” (ciclo de vida qiankun).

**Interpretação:** A afirmação tecnológica é corroborada pelas exportações bootstrap, mount e unmount e pelo contrato da relação com o host.

### 26. sub-vue2/src/router/index.js:9

**Observação:** O comentário afirma: “在 qiankun 环境下，路由base会在main.js中动态设置” (no ambiente qiankun, a base do roteador será definida dinamicamente em main.js).

**Interpretação:** A revisão registra contradição: a base é fixa em `/sub-vue2`; main.js altera o public path dos recursos, sem alterar a base do roteador.

### 27. sub-vue2/vue.config.js:11

**Observação:** O comentário afirma: “微前端配置” (configuração de micro-frontend).

**Interpretação:** Caracteriza o bloco concreto de saída usado pela sub-app; a revisão corrobora a afirmação pela configuração e pela relação com o host, sem nomear um mecanismo no comentário.

### 28. sub-vue2/vue.config.js:14

**Observação:** O comentário afirma: “微前端要求的库配置” (configuração de biblioteca exigida pelo micro-frontend).

**Interpretação:** A revisão corrobora o contrato de saída desta sub-app pelo bloco UMD e pelo build próprio; o comentário não estabelece uma exigência geral para micro-frontends.

### 29. 8e52e7d 2025-11-03 (sub-vue2/public/index.html; sub-vue2/src/main.js; main-vue3/src/App.vue)

**Observação:** O único commit adiciona juntos o comentário de montagem, os elementos HTML e a implementação de renderização. A revisão não encontra versão anterior ou mudança do alvo de montagem e registra resultado inconclusivo.

**Interpretação:** O passado não distingue tentativa anterior, cópia ou erro no comentário. A dúvida não muda a leitura arquitetural do snapshot: o alvo implementado é #app e a contradição documental permanece.

### 30. 8e52e7d 2025-11-03 (sub-vue2/src/router/index.js; sub-vue2/src/main.js; sub-vue2/vue.config.js)

**Observação:** O único commit adiciona juntos o comentário sobre base dinâmica, a base literal /sub-vue2 e a atribuição de __webpack_public_path__. A revisão não encontra versão alternativa de main.js e registra resultado inconclusivo.

**Interpretação:** O histórico não esclarece a origem do comentário; a dúvida é sobre o passado, com a base fixa e o ajuste de public path claros no snapshot.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (main-vue3/package.json:12) | 1 tecnologia | manifesto | qiankun | tecnológica | fraca | declara #7; declara #8; declara #9 |
| 2 | 3.4.3 (sub-vue2, Build); 3.4.4 (sub-vue2/src/main.js:32, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #12, #13 (Evidência) | 2 configuração | configuração | qiankun | tecnológica | moderada | configura #3; configura #4; configura #5; configura #11; configura #12; configura #15 |
| 3 | 3.4.4 (src-mount-export, sub-vue2/src/main.js:32) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #12 |
| 4 | 3.4.4 (src-mount-export, sub-vue2/src/main.js:36) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #12 |
| 5 | 3.4.4 (src-mount-export, sub-vue2/src/main.js:41) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #12 |
| 6 | 3.4.4 (src-mount-call, sub-vue2/src/main.js:16) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #12 |
| 7 | 3.4.4 (src-lifecycles, main-vue3/src/main.ts:3) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #12; implementa #13 |
| 8 | 3.4.4 (src-lifecycles, main-vue3/src/main.ts:10) | 3 código | código-fonte | qiankun | arquitetural | forte | implementa #12; implementa #13 |
| 9 | 3.4.4 (manual, main-vue3/src/main.ts:26) | 3 código | código-fonte | qiankun | tecnológica | moderada | implementa #12; implementa #13 |
| 10 | 3.4.3 (main-vue3) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 11 | 3.4.3 (sub-vue2) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 12 | 3.4.5 #1 | 5 composição | código-fonte | qiankun | arquitetural | forte | liga #10; liga #11 |
| 13 | 3.4.5 #2 | 5 composição | código-fonte | qiankun | arquitetural | forte | liga #10; liga main-vue3/src/main.ts:17-22 |
| 14 | 3.4.6 #1 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #10 |
| 15 | 3.4.6 #2 | 6 build-deploy | manifesto | qiankun | arquitetural | moderada | publica #11 |
| 16 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #12; corrobora #13 |
| 17 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #8; corrobora #12; corrobora #13 |
| 18 | 3.4.7 #3 | 7 documentação | comentário | qiankun | tecnológica | fraca | corrobora #1; corrobora #7; corrobora #9 |
| 19 | 3.4.7 #4 | 7 documentação | comentário | — | tecnológica | fraca | corrobora #9 |
| 20 | 3.4.7 #5 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #10; corrobora #12 |
| 21 | 3.4.7 #6 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #12 |
| 22 | 3.4.7 #7 | 7 documentação | comentário | — | arquitetural | fraca | contradiz #6; contradiz sub-vue2/public/index.html:16-17; contradiz #8 |
| 23 | 3.4.7 #8 | 7 documentação | comentário | qiankun | tecnológica | fraca | corrobora #4; corrobora #6 |
| 24 | 3.4.7 #9 | 7 documentação | comentário | qiankun | tecnológica | fraca | corrobora #4; corrobora #6 |
| 25 | 3.4.7 #10 | 7 documentação | comentário | qiankun | tecnológica | fraca | corrobora #3; corrobora #4; corrobora #5; corrobora #12 |
| 26 | 3.4.7 #11 | 7 documentação | comentário | qiankun | tecnológica | fraca | contradiz sub-vue2/src/router/index.js:10-12; contradiz sub-vue2/src/main.js:1-46 |
| 27 | 3.4.7 #12 | 7 documentação | comentário | — | tecnológica | fraca | corrobora #2; corrobora #12 |
| 28 | 3.4.7 #13 | 7 documentação | comentário | — | tecnológica | fraca | corrobora #2; corrobora #12; corrobora #15 |
| 29 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #22; explica #6 |
| 30 | 3.4.8 #2 | 8 histórico | histórico | qiankun | tecnológica | fraca | explica #26; explica sub-vue2/src/router/index.js:10-12; explica sub-vue2/src/main.js:20-23 |

## Resumo

Observações: 30. Dimensões (tecnologia: 1, configuração: 1, código: 7, estrutura: 2, composição: 2, build-deploy: 2, documentação: 13, histórico: 2). Força (forte: 3, moderada: 11, fraca: 16, ambígua: 0). Evidência (tecnológica: 17, arquitetural: 13, contexto: 0).
