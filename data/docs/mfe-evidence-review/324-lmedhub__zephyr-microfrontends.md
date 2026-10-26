---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
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

# 324 — lmedhub/zephyr-microfrontends

## Leitura do repositório

O snapshot reúne quatro unidades frontend com entradas e builds próprios: host React, remotes React de header e footer e remote Vue do encurtador de URLs (#14–#17). A configuração do host nomeia os três destinos (#2), os remotes expõem seus módulos (#3–#5) e o código carrega esses destinos e os renderiza (#7–#12). Essa cadeia sustenta três relações host → remote ativas, com todos os destinos no snapshot (#18–#20). No encurtador, o módulo chega por Module Federation e depois é montado como aplicação Vue num contêiner do host React (#9, #10, #20).

Há dois sinais que exigem cuidado: a dependência `@module-federation/enhanced` está declarada sem uso (#1), enquanto os builds usam o plugin embutido do Rspack (#2–#5); e a raiz `frontend` coordena as aplicações, sem constituir outra unidade (#13). A investigação histórica não esclarece o uso passado do pacote, por ausência de objetos antigos, mas não deixa ambígua a composição atual (#29).

Os quatro builds têm publicação separada registrada por `withZephyr()` (#21–#24), sem endereço publicado ou versionamento independente demonstrado. O bloco `zephyr:dependencies` do host nomeia apenas header e footer (#6); a resolução local de Module Federation inclui também o encurtador (#2). O README corrobora a demonstração e os papéis do host, header e footer (#25–#28), sem listar o remote Vue. Conforme a 3.4.7, a lista não declara ser exaustiva; a omissão limita a documentação sem contradizer as unidades descritas.

## Observações

### 1. frontend/package.json:59

**Observação:** O manifesto agregador declara `@module-federation/enhanced` na versão `^0.8.9` em `dependencies`. A 3.4.2 registra Configurada `No`: não há import ou require do pacote nas aplicações.

**Interpretação:** A declaração é um sinal isolado de tecnologia. A federação observada usa o plugin embutido do Rspack, sem uso deste pacote.

### 2. frontend/apps/host/rspack.config.ts:1; frontend/apps/host/rspack.config.ts:82-94

**Observação:** O `ModuleFederationPlugin` do Rspack declara `name: "host"`, os remotes `remote_header`, `remote_footer` e `url_shortener`, resolvidos respectivamente por `http://localhost:3001/remoteEntry.js`, `http://localhost:3002/remoteEntry.js` e `http://localhost:3003/remoteEntry.js`. Compartilha `react`, `react-dom` e `vue` como singleton e eager.

**Interpretação:** A configuração liga explicitamente o host a três unidades remotas por Module Federation. As URLs registram a resolução local dos destinos.

### 3. frontend/apps/remote-footer/rspack.config.ts:73-84

**Observação:** O plugin de federação declara `name: "remote_footer"`, `filename: "remoteEntry.js"`, expõe `./Footer` a partir de `./src/Footer.tsx` e compartilha `react` e `react-dom` singleton e eager.

**Interpretação:** Configura o mecanismo e a oferta de um módulo pela unidade remote-footer, sem nomear uma unidade consumidora neste bloco.

### 4. frontend/apps/remote-header/rspack.config.ts:73-84

**Observação:** O plugin de federação declara `name: "remote_header"`, `filename: "remoteEntry.js"`, expõe `./Header` a partir de `./src/Header.tsx` e compartilha `react` e `react-dom` singleton e eager.

**Interpretação:** Configura o mecanismo e a oferta de um módulo pela unidade remote-header, sem nomear uma unidade consumidora neste bloco.

### 5. frontend/apps/url-shortener/rspack.config.ts:74-87

**Observação:** O plugin de federação declara `name: "url_shortener"`, `filename: "remoteEntry.js"`, expõe `./Shortener` a partir de `./src/Shortener.vue` e compartilha `vue` singleton e eager, com `requiredVersion: "^3.4.0"`.

**Interpretação:** Configura o mecanismo e a oferta de um módulo pela unidade url-shortener, sem nomear uma unidade consumidora neste bloco.

### 6. frontend/apps/host/package.json:4-7

**Observação:** O campo `zephyr:dependencies` do host declara `remote-header@^1.0.0` e `remote-footer@^1.0.0`. Não inclui `url-shortener`.

**Interpretação:** A configuração nomeia dois destinos remotos como dependências do host para o Zephyr. Situa unidades, mas as faixas declaradas não demonstram versionamento independente nem publicação realizada.

### 7. frontend/apps/host/src/App.tsx:6; frontend/apps/host/rspack.config.ts:85; frontend/apps/remote-header/rspack.config.ts:74-78

**Observação:** `React.lazy(() => import("remote_header/Header"))` atribui a `RemoteHeader` o módulo `./Header` do remote `remote_header`, declarado na configuração do host.

**Interpretação:** O carregamento nomeia o destino remoto e cruza a fronteira entre host e header por Module Federation.

### 8. frontend/apps/host/src/App.tsx:7; frontend/apps/host/rspack.config.ts:86; frontend/apps/remote-footer/rspack.config.ts:74-78

**Observação:** `React.lazy(() => import("remote_footer/Footer"))` atribui a `RemoteFooter` o módulo `./Footer` do remote `remote_footer`, declarado na configuração do host.

**Interpretação:** O carregamento nomeia o destino remoto e cruza a fronteira entre host e footer por Module Federation.

### 9. frontend/apps/host/src/utils/VueShortener.tsx:12; frontend/apps/host/rspack.config.ts:87; frontend/apps/url-shortener/rspack.config.ts:75-78

**Observação:** O wrapper do host executa `await import("url_shortener/Shortener")` e recebe o módulo `./Shortener` exposto pelo remote `url_shortener`.

**Interpretação:** O carregamento nomeia o destino Vue e liga o host ao módulo remoto por Module Federation.

### 10. frontend/apps/host/src/utils/VueShortener.tsx:10-16

**Observação:** O wrapper carrega `createApp` de `vue`, cria uma aplicação com `Shortener.default`, importado de `url_shortener/Shortener`, e executa `app.mount(containerRef.current)`.

**Interpretação:** A montagem insere o componente Vue remoto no contêiner do host React. A chamada de montagem realiza a integração de renderização do módulo previamente carregado.

### 11. frontend/apps/host/src/App.tsx:6; frontend/apps/host/src/App.tsx:12-14; frontend/apps/host/src/App.tsx:27-28

**Observação:** O host renderiza `<RemoteHeader />` dentro de `Suspense`, usando o componente resolvido por `React.lazy`; o próprio `App` é montado com `root.render(<App />)`.

**Interpretação:** A renderização usa o componente remoto carregado no host e participa da relação com o header.

### 12. frontend/apps/host/src/App.tsx:7; frontend/apps/host/src/App.tsx:20-22

**Observação:** O host renderiza `<RemoteFooter />` dentro de `Suspense`, usando o componente resolvido por `React.lazy`.

**Interpretação:** A renderização usa o componente remoto carregado no host e participa da relação com o footer.

### 13. frontend; frontend/index.html:1-14; frontend/package.json:12-16

**Observação:** A raiz `frontend` agrega scripts que entram em cada diretório de aplicação para executar o build. Seu `index.html` não carrega script e não é usado por um build, conforme a 3.4.3.

**Interpretação:** É uma raiz de coordenação, classificada como Unidade frontend `No`; não acrescenta uma quinta unidade.

### 14. frontend/apps/host; frontend/apps/host/rspack.config.ts:9-10; frontend/apps/host/rspack.config.ts:102-103; frontend/apps/host/package.json:9

**Observação:** O diretório de host tem manifesto próprio, entrada `./src/App.tsx`, template `./index.html` e script de build Rspack próprios.

**Interpretação:** É uma unidade frontend React com limite de entrada e build confirmado, registrada como `Yes` na 3.4.3.

### 15. frontend/apps/remote-footer; frontend/apps/remote-footer/rspack.config.ts:9-10; frontend/apps/remote-footer/rspack.config.ts:89-90; frontend/apps/remote-footer/package.json:5

**Observação:** O diretório de remote-footer tem manifesto próprio, entrada `./src/index.tsx`, template `./index.html` e script de build Rspack próprios.

**Interpretação:** É uma unidade frontend React com limite de entrada e build confirmado, registrada como `Yes` na 3.4.3.

### 16. frontend/apps/remote-header; frontend/apps/remote-header/rspack.config.ts:9-10; frontend/apps/remote-header/rspack.config.ts:89-90; frontend/apps/remote-header/package.json:5

**Observação:** O diretório de remote-header tem manifesto próprio, entrada `./src/index.tsx`, template `./index.html` e script de build Rspack próprios.

**Interpretação:** É uma unidade frontend React com limite de entrada e build confirmado, registrada como `Yes` na 3.4.3.

### 17. frontend/apps/url-shortener; frontend/apps/url-shortener/rspack.config.ts:7-8; frontend/apps/url-shortener/rspack.config.ts:96-97; frontend/apps/url-shortener/package.json:5

**Observação:** O diretório de url-shortener tem manifesto próprio, entrada `./src/index.ts`, template `./index.html` e script de build Rspack próprios.

**Interpretação:** É uma unidade frontend Vue 3 com limite de entrada e build confirmado, registrada como `Yes` na 3.4.3.

### 18. frontend/apps/host/src/App.tsx:6; frontend/apps/host/src/App.tsx:13; frontend/apps/host/rspack.config.ts:85; frontend/apps/remote-header/rspack.config.ts:74-78

**Observação:** O host referencia `remote_header/Header`; seu remote `remote_header` corresponde ao nome e ao módulo exposto em `frontend/apps/remote-header`. O host renderiza o componente em `Suspense`.

**Interpretação:** É uma relação `host → remote` ativa, por Module Federation, com ambas as unidades no snapshot. 

### 19. frontend/apps/host/src/App.tsx:7; frontend/apps/host/src/App.tsx:21; frontend/apps/host/rspack.config.ts:86; frontend/apps/remote-footer/rspack.config.ts:74-78

**Observação:** O host referencia `remote_footer/Footer`; seu remote `remote_footer` corresponde ao nome e ao módulo exposto em `frontend/apps/remote-footer`. O host renderiza o componente em `Suspense`.

**Interpretação:** É uma relação `host → remote` ativa, por Module Federation, com ambas as unidades no snapshot. 

### 20. frontend/apps/host/src/utils/VueShortener.tsx:12-16; frontend/apps/host/src/App.tsx:4; frontend/apps/host/src/App.tsx:17; frontend/apps/host/rspack.config.ts:87; frontend/apps/url-shortener/rspack.config.ts:75-78

**Observação:** O host referencia `url_shortener/Shortener`; seu remote `url_shortener` corresponde ao nome e ao módulo exposto em `frontend/apps/url-shortener`. O wrapper cria e monta uma aplicação Vue no host React.

**Interpretação:** É uma relação `host → remote` ativa, por Module Federation, com ambas as unidades no snapshot. A montagem Vue posterior não muda a entrada do destino como módulo.

### 21. frontend/apps/host/package.json:3; frontend/apps/host/package.json:9; frontend/apps/host/rspack.config.ts:7; frontend/apps/host/rspack.config.ts:82-94; frontend/package.json:12; frontend/package.json:16

**Observação:** A aplicação host tem script `rspack build` próprio e configuração envolvida por `withZephyr()`. A raiz chama seu build individual e o inclui em `build:all`. A versão do manifesto é `1.0.0`; a 3.4.6 registra Build `separado`, Deploy `separado` e Versionamento independente `No`.

**Interpretação:** Há limite de build e publicação por aplicação pelo plugin Zephyr. O snapshot não fornece endereço publicado nem demonstra uso da versão na publicação; as URLs locais não comprovam uma implantação realizada.

### 22. frontend/apps/remote-footer/package.json:3; frontend/apps/remote-footer/package.json:5; frontend/apps/remote-footer/rspack.config.ts:7; frontend/apps/remote-footer/rspack.config.ts:73-84; frontend/package.json:14; frontend/package.json:16

**Observação:** A aplicação remote-footer tem script `rspack build` próprio e configuração envolvida por `withZephyr()`. A raiz chama seu build individual e o inclui em `build:all`. A versão do manifesto é `1.0.0`; a 3.4.6 registra Build `separado`, Deploy `separado` e Versionamento independente `No`.

**Interpretação:** Há limite de build e publicação por aplicação pelo plugin Zephyr. O snapshot não fornece endereço publicado nem demonstra uso da versão na publicação; as URLs locais não comprovam uma implantação realizada.

### 23. frontend/apps/remote-header/package.json:3; frontend/apps/remote-header/package.json:5; frontend/apps/remote-header/rspack.config.ts:7; frontend/apps/remote-header/rspack.config.ts:73-84; frontend/package.json:13; frontend/package.json:16

**Observação:** A aplicação remote-header tem script `rspack build` próprio e configuração envolvida por `withZephyr()`. A raiz chama seu build individual e o inclui em `build:all`. A versão do manifesto é `1.0.0`; a 3.4.6 registra Build `separado`, Deploy `separado` e Versionamento independente `No`.

**Interpretação:** Há limite de build e publicação por aplicação pelo plugin Zephyr. O snapshot não fornece endereço publicado nem demonstra uso da versão na publicação; as URLs locais não comprovam uma implantação realizada.

### 24. frontend/apps/url-shortener/package.json:3; frontend/apps/url-shortener/package.json:5; frontend/apps/url-shortener/rspack.config.ts:5; frontend/apps/url-shortener/rspack.config.ts:74-87; frontend/package.json:15; frontend/package.json:16

**Observação:** A aplicação url-shortener tem script `rspack build` próprio e configuração envolvida por `withZephyr()`. A raiz chama seu build individual e o inclui em `build:all`. A versão do manifesto é `1.0.0`; a 3.4.6 registra Build `separado`, Deploy `separado` e Versionamento independente `No`.

**Interpretação:** Há limite de build e publicação por aplicação pelo plugin Zephyr. O snapshot não fornece endereço publicado nem demonstra uso da versão na publicação; as URLs locais não comprovam uma implantação realizada.

### 25. frontend/README.md:3

**Observação:** O README apresenta uma demonstração de arquitetura de microfrontends com Rspack, Module Federation, React e Zephyr Cloud.

**Interpretação:** É uma afirmação arquitetural corroborada pelas relações ativas e pelas configurações de publicação, sem comprovar que uma implantação ocorreu.

### 26. frontend/README.md:7

**Observação:** O README descreve o Host Application como aplicação principal que consome microfrontends remotos.

**Interpretação:** O papel consumidor declarado é corroborado pelas três relações do host.

### 27. frontend/README.md:8

**Observação:** O README descreve o Remote Header como componente de cabeçalho independente.

**Interpretação:** A afirmação é corroborada pelo limite próprio de entrada e build do header; refere-se à execução e ao desenvolvimento, sem reivindicar versionamento independente.

### 28. frontend/README.md:9

**Observação:** O README descreve o Remote Footer como componente de rodapé independente.

**Interpretação:** A afirmação é corroborada pelo limite próprio de entrada e build do footer; refere-se à execução e ao desenvolvimento, sem reivindicar versionamento independente.

### 29. 87ab32c 2025-05-26 (package.json; module-federation.config.ts; rspack.config.ts); dc92890 2025-05-27 (module-federation.config.ts; apps/host/rspack.config.ts); a9f8005 2025-05-27 (package.json); 8b5da15 2025-06-02 (frontend/package.json); be7d3bc 2025-06-04 (frontend/package.json)

**Observação:** O ponto histórico da 3.4.8 registra a criação do manifesto na raiz, a remoção da configuração de federação da raiz quando surgem as aplicações, alterações do manifesto e sua mudança para `frontend/`. Os objetos antigos necessários para ler os manifestos e configurações não estão disponíveis. O resultado é `inconclusivo`.

**Interpretação:** Não se determina quando `@module-federation/enhanced` foi declarado nem se teve uso passado. A dúvida histórica não altera a leitura do snapshot: a dependência permanece sem uso e a federação atual é a do Rspack.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (frontend/package.json:59) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | — |
| 2 | 3.4.2 (frontend/package.json:59, Evidência); 3.4.3 (frontend/apps/host, Marcadores, Entrada, Build, Deploy); 3.4.4 (frontend/apps/host/src/App.tsx:6, :7; frontend/apps/host/src/utils/VueShortener.tsx:12, Observação); 3.4.5 #1, #2, #3 (Configuração); 3.4.6 #1 (Evidência); 3.4.7 #1, #2 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #7; configura #8; configura #9; configura #14; configura #18; configura #19; configura #20 |
| 3 | 3.4.2 (frontend/package.json:59, Evidência); 3.4.3 (frontend/apps/remote-footer, Marcadores, Entrada, Build, Deploy); 3.4.4 (frontend/apps/host/src/App.tsx:7, Observação); 3.4.5 #2 (Configuração); 3.4.6 #2 (Evidência); 3.4.7 #4 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #15; configura #19 |
| 4 | 3.4.2 (frontend/package.json:59, Evidência); 3.4.3 (frontend/apps/remote-header, Marcadores, Entrada, Build, Deploy); 3.4.4 (frontend/apps/host/src/App.tsx:6, Observação); 3.4.5 #1 (Configuração); 3.4.6 #3 (Evidência); 3.4.7 #3 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #16; configura #18 |
| 5 | 3.4.2 (frontend/package.json:59, Evidência); 3.4.3 (frontend/apps/url-shortener, Marcadores, Entrada, Build, Deploy); 3.4.4 (frontend/apps/host/src/utils/VueShortener.tsx:12, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #17; configura #20 |
| 6 | 3.4.3 (frontend/apps/host, Marcadores, Manifesto) | 2 configuração | configuração | — | arquitetural | forte | configura #14; configura #18; configura #19 |
| 7 | 3.4.4 (frontend/apps/host/src/App.tsx:6) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #18 |
| 8 | 3.4.4 (frontend/apps/host/src/App.tsx:7) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #19 |
| 9 | 3.4.4 (frontend/apps/host/src/utils/VueShortener.tsx:12) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #20 |
| 10 | 3.4.4 (frontend/apps/host/src/utils/VueShortener.tsx:16) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #20 |
| 11 | 3.4.4 (frontend/apps/host/src/App.tsx:13) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #18 |
| 12 | 3.4.4 (frontend/apps/host/src/App.tsx:21) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #19 |
| 13 | 3.4.3 (frontend) | 4 estrutura | diretório | — | contexto | fraca | — |
| 14 | 3.4.3 (frontend/apps/host) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 15 | 3.4.3 (frontend/apps/remote-footer) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 16 | 3.4.3 (frontend/apps/remote-header) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 17 | 3.4.3 (frontend/apps/url-shortener) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 18 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #14; liga #16 |
| 19 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #14; liga #15 |
| 20 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #14; liga #17 |
| 21 | 3.4.6 #1 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #14 |
| 22 | 3.4.6 #2 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #15 |
| 23 | 3.4.6 #3 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #16 |
| 24 | 3.4.6 #4 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #17 |
| 25 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #2; corrobora #18; corrobora #19; corrobora #20; corrobora #21; corrobora #22; corrobora #23; corrobora #24 |
| 26 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #2; corrobora #18; corrobora #19; corrobora #20 |
| 27 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16 |
| 28 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #15 |
| 29 | 3.4.8 #1 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #1 |

## Resumo

Observações: 29. Dimensões (tecnologia: 1, configuração: 5, código: 6, estrutura: 5, composição: 3, build-deploy: 4, documentação: 4, histórico: 1). Força (forte: 8, moderada: 14, fraca: 7, ambígua: 0). Evidência (tecnológica: 5, arquitetural: 23, contexto: 1).
