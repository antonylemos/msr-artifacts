---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 299 — DATou-love/micro-frontEnd

## Leitura do repositório

A documentação Markdown se limita a dois READMEs em inglês: main-vue3/README.md:1-5 é o template Vue 3/TypeScript/Vite; sub-vue2/README.md:1-24 é o template Vue CLI, com instalação, execução, build e lint. Nenhum explica a composição entre unidades; os blocos de comandos de sub-vue2/README.md:4-20 não viram afirmações. O matches.csv não contém ocorrências `doc-*`. Não há README na raiz na listagem de artifacts.csv.

A documentação arquitetural está nos comentários, sobretudo em chinês, das configurações e entradas. Foram lidos integralmente main-vue3/package.json:1-24, sub-vue2/package.json:1-44 (ambos sem `description`), main-vue3/vite.config.ts:1-17, sub-vue2/vue.config.js:1-23, main-vue3/src/main.ts:1-38, sub-vue2/src/main.js:1-46, main-vue3/src/App.vue:1-48, main-vue3/index.html:1-13, sub-vue2/public/index.html:1-19 e os roteadores main-vue3/src/router/index.ts:1-28 e sub-vue2/src/router/index.js:1-38. A maioria dos comentários acompanha a composição qiankun registrada em 3.4.5: host, registro das sub-apps, contêiner e lifecycles. A unidade sub-react16 só está registrada no host, sem implementação no snapshot (3.4.5 #2; main-vue3/src/main.ts:17-22). As referências locais e os scripts de build não documentam publicação; 3.4.6 registra build separado e deploy não observado para as duas unidades presentes.

Os comentários sobre endereço, porta, CORS e rota de ativação (main-vue3/src/main.ts:13,15; main-vue3/vite.config.ts:10) não geram afirmações adicionais sobre infraestrutura. A alternativa comentada de isolamento experimental e a opção de prefetch (main-vue3/src/main.ts:31-35) descrevem opções desativadas, sem afirmar que o projeto as usa. O comentário sobre `publicPath` em sub-vue2/src/main.js:21 descreve o prefixo dos recursos, não a base do roteador; por isso ele não sustenta o comentário divergente em sub-vue2/src/router/index.js:9. O `publicPath` de sub-vue2/vue.config.js:21-22 também está comentado. Os comentários sobre webpack 5 (sub-vue2/vue.config.js:17), tipos, guardas e extensões de rotas são detalhes internos, sem nova afirmação sobre o conjunto de unidades.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | main-vue3/src/App.vue:10 | “子应用挂载点” (ponto de montagem das sub-aplicações) | composição | corroborada | 3.4.5 #1; 3.4.5 #2; main-vue3/src/App.vue:11; main-vue3/src/main.ts:14,20 |
| 2 | main-vue3/src/main.ts:9 | “定义子应用” (define as sub-aplicações) | estrutura | corroborada | 3.4.5 #1; 3.4.5 #2; main-vue3/src/main.ts:10-23 |
| 3 | main-vue3/src/main.ts:25 | “启动 qiankun” (inicia o qiankun) | composição | corroborada | 3.4.2, dependência qiankun; main-vue3/src/main.ts:3,26-36 |
| 4 | main-vue3/src/main.ts:29 | “开启严格的沙箱模式（推荐）” (ativa o modo estrito de sandbox, recomendado) | composição | corroborada | main-vue3/src/main.ts:28-30; 3.4.5, Leitura do repositório |
| 5 | main-vue3/vite.config.ts:9 | “主应用端口” (porta da aplicação principal) | estrutura | corroborada | 3.4.3, unidade main-vue3; 3.4.5 #1; main-vue3/src/main.ts:10-26 |
| 6 | sub-vue2/public/index.html:7 | “子应用静态资源前缀” (prefixo dos recursos estáticos da sub-aplicação) | composição | corroborada | sub-vue2/public/index.html:8; 3.4.5 #1 |
| 7 | sub-vue2/public/index.html:15 | “子应用挂载点，必须与主应用配置一致” (ponto de montagem da sub-aplicação, deve coincidir com a configuração da aplicação principal) | composição | contradita | sub-vue2/public/index.html:16-17; sub-vue2/src/main.js:11-16; main-vue3/src/main.ts:14; main-vue3/src/App.vue:11 |
| 8 | sub-vue2/src/main.js:9 | “渲染函数 - Updated for qiankun integration” (função de renderização — atualizada para integração com qiankun) | composição | corroborada | 3.4.4, src-mount-call; sub-vue2/src/main.js:10-17,36-38 |
| 9 | sub-vue2/src/main.js:26 | “如果在 qiankun 环境下，不立即挂载” (no ambiente qiankun, não monta imediatamente) | composição | corroborada | sub-vue2/src/main.js:27-29,36-38; 3.4.4, src-mount-call |
| 10 | sub-vue2/src/main.js:31 | “qiankun 生命周期” (ciclo de vida qiankun) | composição | corroborada | 3.4.4, src-mount-export; sub-vue2/src/main.js:32-46; 3.4.5 #1 |
| 11 | sub-vue2/src/router/index.js:9 | “在 qiankun 环境下，路由base会在main.js中动态设置” (no ambiente qiankun, a base do roteador será definida dinamicamente em main.js) | composição | contradita | sub-vue2/src/router/index.js:10-12; sub-vue2/src/main.js:1-46 |
| 12 | sub-vue2/vue.config.js:11 | “微前端配置” (configuração de micro-frontend) | composição | corroborada | sub-vue2/vue.config.js:12-20; 3.4.5 #1 |
| 13 | sub-vue2/vue.config.js:14 | “微前端要求的库配置” (configuração de biblioteca exigida pelo micro-frontend) | build-deploy | corroborada | sub-vue2/vue.config.js:15-18; 3.4.5 #1; 3.4.6 #2 |

## Observações

**1. main-vue3/src/App.vue.** O comentário identifica o elemento do host usado como contêiner: seu id é `subapp-viewport` (main-vue3/src/App.vue:11), e os dois registros apontam para ele (main-vue3/src/main.ts:14,20). O comentário “子应用挂载的容器 id” (id do contêiner onde a sub-aplicação é montada) em main-vue3/src/main.ts:14 repete esta afirmação, sem criar nova linha. Confirma a configuração, sem comprovar a execução das duas sub-apps.

**2. main-vue3/src/main.ts.** O registro define `sub-vue2` e `sub-react16` como sub-aplicações (main-vue3/src/main.ts:10-23). A segunda existe como destino configurado; a afirmação não diz que seu código está presente. O comentário “子应用名称” (nome da sub-aplicação) em main-vue3/src/main.ts:12 e “子应用端口” (porta da sub-aplicação) em sub-vue2/vue.config.js:6 reiteram o papel de sub-vue2, sem criar nova afirmação.

**3. main-vue3/src/main.ts.** `start` é importado de qiankun e chamado após o registro das unidades (main-vue3/src/main.ts:3,10-26). A revisão 3.4.2 registra a dependência configurada; o comentário corresponde à chamada efetiva no código.

**4. main-vue3/src/main.ts.** A opção ativa é `sandbox.strictStyleIsolation: true` (main-vue3/src/main.ts:28-30). A corroboração se restringe à ativação dessa configuração, que o comentário chama de modo estrito; não comprova isolamento funcional ou segurança. A leitura de 3.4.5 já ressalva que a montagem sob esse isolamento não foi executada.

**5. main-vue3/vite.config.ts.** O comentário da porta identifica main-vue3 como aplicação principal. Seu papel é confirmado pelo registro das sub-aplicações e pela inicialização do orquestrador (main-vue3/src/main.ts:10-26). O valor da porta, isoladamente, não é evidência de deploy; o tema é o papel da unidade.

**6. sub-vue2/public/index.html.** O comentário acompanha `<base href="/sub-vue2/">` (sub-vue2/public/index.html:8), que fornece a base para URLs relativas no documento. O caminho coincide com a ativação no host (main-vue3/src/main.ts:15). Não se infere hospedagem pública nem reescrita de todas as URLs de recursos.

**7. sub-vue2/public/index.html.** O id do elemento abaixo do comentário coincide textualmente com o contêiner configurado no host (sub-vue2/public/index.html:16; main-vue3/src/main.ts:14). Entretanto, esse elemento da sub-app não é o alvo de sua montagem: `render` recebe o contêiner externo e procura `#app` dentro dele, ou usa `#app` fora do qiankun (sub-vue2/src/main.js:11-16). O alvo interno é o elemento seguinte (sub-vue2/public/index.html:17); o contêiner do host pertence a main-vue3/src/App.vue:11. A afirmação confunde os dois níveis de montagem, embora os ids citados coincidam.

**8. sub-vue2/src/main.js.** A adaptação verificável de `render` é receber `props.container` e montar no seu `#app`; `mount(props)` repassa essas propriedades (sub-vue2/src/main.js:10-17,36-38). Isso sustenta a integração descrita sem afirmar que ela foi testada em execução.

**9. sub-vue2/src/main.js.** A montagem imediata ocorre apenas quando `__POWERED_BY_QIANKUN__` é falso; dentro do qiankun, a chamada fica no lifecycle `mount` (sub-vue2/src/main.js:27-29,36-38). A afirmação é sobre o momento de montagem sob o orquestrador.

**10. sub-vue2/src/main.js.** O comentário introduz as exportações `bootstrap`, `mount` e `unmount` (sub-vue2/src/main.js:32-46), ligadas ao registro do host na relação 3.4.5 #1. É uma afirmação sobre o contrato de lifecycle, distinta da implementação de renderização e da condição de montagem imediata.

**11. sub-vue2/src/router/index.js.** A base é literal e fixa em `/sub-vue2` (sub-vue2/src/router/index.js:10-12). A leitura integral de sub-vue2/src/main.js:1-46 mostra que esse arquivo importa o roteador e o entrega à instância Vue, mas não altera sua base. O valor dinâmico atribuído em sub-vue2/src/main.js:20-23 é `__webpack_public_path__`, uma propriedade diferente. O comentário é contradito pela implementação.

**12. sub-vue2/vue.config.js.** O bloco configura saída UMD, nome de biblioteca e global de carregamento (sub-vue2/vue.config.js:12-20); a relação com o host se confirma pelos lifecycles e registro (sub-vue2/src/main.js:32-46; main-vue3/src/main.ts:11-16). Não é uma menção solta: o comentário caracteriza um bloco concreto usado pela composição.

**13. sub-vue2/vue.config.js.** O comentário especifica a forma de biblioteca que o bloco anterior anuncia genericamente: `library: 'subVue2'`, `libraryTarget: 'umd'` e global próprio (sub-vue2/vue.config.js:15-18). As revisões 3.4.5 #1 e 3.4.6 #2 confirmam esse contrato de saída para a sub-app qiankun. A afirmação se refere à configuração desta integração, sem generalizar uma exigência a toda arquitetura de micro-frontends.

## Resumo

Afirmações: 13 (corroborada: 11, parcial: 0, contradita: 2, sem corroboração: 0). Temas: (estrutura: 2, composição: 10, build-deploy: 1).
