---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
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

# 203 — agsosa/react-next-umd-remote-modules-poc

## Leitura do repositório

A composição não usa biblioteca de MFE: a revisão de dependências não encontrou nenhuma tecnologia de integração, e não há observação de tecnologia. São duas aplicações Next.js, `mf-1` e `shell`, cada uma com manifesto, entrada e build próprios (#11, #12). A cadeia usa só um bundle UMD e o navegador:
- **Configuração:** o Vite do `mf-1` empacota três componentes React num `bundle.js` UMD que publica a global `MF1_RemoteModules` e deixa React e ReactDOM como globais externos (#1). A configuração do `shell` guarda a URL base do `mf-1`, com padrão na porta do servidor de desenvolvimento dele (#2).
- **Código do host:** um hook genérico injeta o `<script>` e lê o componente da global (#3). Três componentes do shell passam ao hook a URL do bundle e o nome do componente (#5, #7, #9) e o renderizam com props e callbacks do shell (#6, #8, #10).
- **Relação:** tudo isso resulta na única relação, ativa, `shell → mf-1` (#13).

Build é separado nas duas aplicações (#14, #15). O bundle remoto sai do mesmo build do `mf-1` e é servido pela pasta `public` dele. Não há artefato de deploy no snapshot.

Um sinal engana: o `postMessage` que a mineração achou no bundle gerado é do axios embutido, não comunicação entre unidades (#4).

A documentação tem 23 afirmações, todas fracas pelo critério do protocolo. A maioria é corroborada pelas observações acima. Uma não tem corroboração: os endereços na Vercel (#17). Duas são contraditas. Uma é a de que o shell "only needs a `<script>` tag" (#31), quando ele também expõe React em `window` e lê a URL configurada. A outra são as "shared interfaces" (#33), que são duas cópias idênticas. Uma é corroborada em parte: a de que o bundle poderia ser publicado em outro lugar (#37). Os três pontos históricos explicam essas três afirmações (#39, #40, #41), sem ambiguidade aberta no snapshot.

Ficaram fora da dimensão 2 os blocos citados que não declaram elemento da composição: o cabeçalho `Cache-Control` de `/remote-modules/:path*` em mf-1/next.config.ts:9-23, que é configuração de servidor (está em #14), e os scripts e versões de React dos `package.json`.

## Observações

### 1. mf-1/vite.mf.ts:27-47

**Observação:** O bloco `build` tem `outDir: "public/remote-modules"`, `input: "src/RemoteModules/RemoteModules.ts"`, `external: ["react", "react-dom"]` e `output` com `entryFileNames: "bundle.js"`, `format: "umd"`, `name: "MF1_RemoteModules"` e `globals` `React` e `ReactDOM`. Os comentários dizem que o shell deve fornecer react/react-dom e que o nome da global deve ser único.

**Interpretação:** O `mf-1` está configurado para publicar seus componentes como um script UMD que expõe uma global própria e espera React do host.

### 2. shell/next.config.js:7-9

**Observação:** `publicRuntimeConfig` define `MF1_BASE_URL: process.env.MF1_BASE_URL || 'http://localhost:3001'`.

**Interpretação:** O host declara o endereço do `mf-1`, configurável por ambiente e com padrão na porta do `mf-1` em desenvolvimento.

### 3. shell/src/hooks/useRemoteModule.ts:79

**Observação:** O hook `useRemoteModule` cria um `script` com a URL recebida, o anexa ao `head` e, no `onload`, lê `window[moduleName][componentName]`. Antes, expõe `window.React` e `window.ReactDOM`.

**Interpretação:** O host tem um carregador genérico de bundles UMD por `<script>`, que recebe por parâmetro o bundle e o componente.

### 4. mf-1/public/remote-modules/bundle.js:10

**Observação:** O `postMessage(r,"*")` casado pela mineração está no bundle gerado, numa linha com `` `axios@${Math.random()}` ``.

**Interpretação:** É o polyfill de `setImmediate` do axios, que manda mensagem à própria janela. Não é comunicação entre unidades: é um falso positivo.

### 5. shell/src/components/RemoteHeader.tsx:18-22; shell/next.config.js:8

**Observação:** `useRemoteModule<HeaderProps>({ url: MF1_BASE_URL + "/remote-modules/bundle.js", moduleName: "MF1_RemoteModules", componentName: "Header" })`.

**Interpretação:** O host aponta para o bundle do `mf-1` e pede o componente `Header`.

### 6. shell/src/components/RemoteHeader.tsx:37

**Observação:** `<Header appName="Shell App" router={router} onMount={handleMount} />`, com o `Header` obtido pelo hook. O shell passa o próprio `router` do Next.

**Interpretação:** O host renderiza um componente remoto na própria árvore React, com props e callbacks.

### 7. shell/src/components/RemoteFulfilment.tsx:29-33; shell/next.config.js:8

**Observação:** `useRemoteModule<FulfilmentProps>({ url: MF1_BASE_URL + '/remote-modules/bundle.js', moduleName: 'MF1_RemoteModules', componentName: 'Fulfilment' })`.

**Interpretação:** O host aponta para o mesmo bundle do `mf-1` e pede o componente `Fulfilment`.

### 8. shell/src/components/RemoteFulfilment.tsx:65-68

**Observação:** `<Fulfilment onFulfil={onFulfil} onTrack={onTrack} />`, com o componente obtido pelo hook.

**Interpretação:** O host renderiza um componente remoto com callbacks próprios.

### 9. shell/src/components/RemoteFulfilmentDetails.tsx:29-33; shell/next.config.js:8

**Observação:** `useRemoteModule<FulfilmentDetailsProps>({ url: MF1_BASE_URL + '/remote-modules/bundle.js', moduleName: 'MF1_RemoteModules', componentName: 'FulfilmentDetails' })`.

**Interpretação:** O host aponta para o bundle do `mf-1` e pede o componente `FulfilmentDetails`.

### 10. shell/src/components/RemoteFulfilmentDetails.tsx:65-68

**Observação:** `<FulfilmentDetailsComponent orderId={orderId} onStatusChange={onStatusChange} />`, com o componente obtido pelo hook.

**Interpretação:** O host renderiza um componente remoto com props e callback próprios.

### 11. mf-1; mf-1/package.json:8, 11; mf-1/src/pages/_app.tsx:5; mf-1/src/pages/index.tsx:11; mf-1/vite.mf.ts:27-47; mf-1/next.config.ts:5-32

**Observação:** É uma aplicação Next.js (Pages Router) com manifesto, entrada e build próprios. O mesmo build gera, com Vite, o bundle UMD dos componentes remotos.

**Interpretação:** É uma unidade frontend com limite próprio, que também fornece componentes a outra.

### 12. shell; shell/package.json:7; shell/src/pages/_app.tsx:5; shell/src/pages/index.tsx:138; shell/next.config.js:2-18

**Observação:** É uma aplicação Next.js (Pages Router) com manifesto, entrada e build próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 13. shell/src/hooks/useRemoteModule.ts:79-99; shell/src/components/RemoteHeader.tsx:18-22, 37; shell/src/components/RemoteFulfilment.tsx:29-33, 65-68; shell/src/components/RemoteFulfilmentDetails.tsx:29-33, 65-68; mf-1/vite.mf.ts:28, 33, 35, 37-39; shell/next.config.js:8

**Observação:** O shell carrega `MF1_BASE_URL + "/remote-modules/bundle.js"` por `<script>` e lê `Header`, `Fulfilment` e `FulfilmentDetails` da global `MF1_RemoteModules`. O arquivo e a global correspondem ao build Vite do `mf-1`. Os componentes são usados nas páginas do shell.

**Interpretação:** É uma relação `host → remote` ativa, por mecanismo `script`, em que o destino entra como módulo de componentes na árvore do host.

### 14. mf-1/package.json:8, 11; mf-1/vite.mf.ts:27-47; mf-1/next.config.ts:9-23

**Observação:** O `build` do `mf-1` roda `vite build --config vite.mf.ts` e depois `next build`. O bundle sai em `public/remote-modules`, servido pelo próprio Next, com `Cache-Control` em produção. Não há artefato de deploy, e o nome do bundle é fixo.

**Interpretação:** Há fronteira de build própria, sem deploy observado nem versionamento independente. O bundle remoto não é publicado à parte da aplicação.

### 15. shell/package.json:7; shell/next.config.js:7-9

**Observação:** O `shell` constrói com `next build` no próprio diretório, sem código do `mf-1`, que chega só em runtime pela URL configurada. Não há artefato de deploy.

**Interpretação:** Há fronteira de build própria, sem deploy observado nem versionamento independente.

### 16. README.md:3

**Observação:** "A proof-of-concept implementation of microfrontends using UMD (Universal Module Definition) format with Next.js and React, enabling remote component sharing between applications".

**Interpretação:** Apresenta o projeto como microfrontends que compartilham componentes por bundle UMD. A afirmação é corroborada.

### 17. README.md:7-8

**Observação:** "**Shell App**: https://umd-remote-modules-poc-shell.vercel.app/", "**MF1**: https://umd-remote-modules-poc-mf1.vercel.app/".

**Interpretação:** Indica uma publicação separada para cada aplicação. Não há artefato de deploy no snapshot: a afirmação fica sem corroboração.

### 18. README.md:12

**Observação:** "This solution implements **UMD-based Microfrontends** (not Module Federation)".

**Interpretação:** Nomeia o formato UMD e nega o uso de Module Federation. A afirmação é corroborada.

### 19. README.md:14

**Observação:** "**Shell App**: A Next.js application that consumes remote components from MF1".

**Interpretação:** Afirma que o shell é o consumidor dos componentes do `mf-1`. A afirmação é corroborada.

### 20. README.md:15

**Observação:** "**MF1**: A Next.js application that also uses its own components internally AND exposes them as UMD bundles for remote consumption".

**Interpretação:** Afirma que o `mf-1` usa os componentes nas próprias páginas e os expõe a outra aplicação. A afirmação é corroborada.

### 21. README.md:16

**Observação:** "**Remote Loading**: Components are loaded dynamically via script tags".

**Interpretação:** Nomeia o carregamento por `<script>`. A afirmação é corroborada.

### 22. README.md:24

**Observação:** "MF1 runs as a standalone Next.js application that uses its own components locally".

**Interpretação:** Afirma que o `mf-1` roda sozinho. A afirmação é corroborada.

### 23. README.md:26

**Observação:** "MF1 also uses Vite to compile the same React components into a UMD bundle for remote consumption".

**Interpretação:** Descreve o build do bundle remoto dentro do `mf-1`. A afirmação é corroborada.

### 24. README.md:58

**Observação:** "The shell app uses a reusable hook to load and consume remote components".

**Interpretação:** Afirma que o shell consome os componentes remotos por um único hook. A afirmação é corroborada.

### 25. README.md:74

**Observação:** "**Global Access**: Components become available via `window.MF1_RemoteModules`".

**Interpretação:** Descreve o acesso pela global do bundle. A afirmação é corroborada.

### 26. README.md:75-76

**Observação:** "Components are treated as normal React components", "React renders them seamlessly into the shell's component tree".

**Interpretação:** Afirma que os componentes remotos entram na árvore do shell como componentes comuns. A afirmação é corroborada.

### 27. README.md:86

**Observação:** "Next.js development server + Vite watch mode for exported remote components".

**Interpretação:** Descreve o modo de desenvolvimento do `mf-1`, com o bundle refeito a cada mudança. A afirmação é corroborada.

### 28. README.md:100

**Observação:** "**Remote Bundle**: http://localhost:3001/remote-modules/bundle.js (UMD bundle for Shell)".

**Interpretação:** Afirma que o bundle é servido pelo `mf-1`. A afirmação é corroborada.

### 29. README.md:104

**Observação:** "router state is passed as props".

**Interpretação:** Afirma que o contrato entre shell e remote passa o roteamento por props. A afirmação é corroborada.

### 30. README.md:114-117

**Observação:** "The `useRemoteModule` hook implements: - **Script caching**: Prevents duplicate loads - **Component memoization**: Improves performance - **Error handling**: Graceful fallbacks".

**Interpretação:** Descreve recursos do carregador. A afirmação é corroborada.

### 31. README.md:124

**Observação:** "**Simple Setup**: No complex module-federation configuration. The shell app only needs a `<script>` tag."

**Interpretação:** Afirma que o host só precisa do `<script>`. O shell também expõe React e ReactDOM em `window` e lê a URL do remote da configuração, o que contradiz a afirmação.

### 32. README.md:125

**Observação:** "**Standalone Development**: Each microfrontend can be developed independently".

**Interpretação:** Afirma que cada aplicação é desenvolvida sozinha. A afirmação é corroborada.

### 33. README.md:127

**Observação:** "**TypeScript Support**: Full type safety with shared interfaces".

**Interpretação:** Afirma interfaces comuns às unidades. Há duas cópias idênticas, uma em cada unidade, sem módulo comum, o que contradiz a afirmação.

### 34. README.md:132

**Observação:** "**Global Namespace**: Each microfrontend needs unique global names".

**Interpretação:** Descreve um requisito do mecanismo por global. A afirmação é corroborada.

### 35. README.md:133

**Observação:** "**Dependency Management**: External dependencies must be managed carefully".

**Interpretação:** Aponta a coordenação das dependências externas ao bundle. A afirmação é corroborada.

### 36. README.md:134

**Observação:** "**Runtime Loading**: Components are loaded at runtime, not build time. SSR is not compatible."

**Interpretação:** Afirma que a composição só ocorre no navegador. A afirmação é corroborada.

### 37. mf-1/vite.mf.ts:28

**Observação:** "podemos subirlo a cualquier otro lugar" (podemos publicá-lo em qualquer outro lugar).

**Interpretação:** Supõe que o bundle possa ser publicado fora do `mf-1`. A URL base é configurável, mas nenhum artefato publica o bundle fora: a afirmação é corroborada em parte.

### 38. mf-1/vite.mf.ts:35

**Observação:** "App shell debe proveer react/react-dom. Debemos coordinar mismas versiones." (o shell deve fornecer react/react-dom; devemos coordenar as mesmas versões).

**Interpretação:** Afirma que o host fornece React ao remote e que as versões são coordenadas. A afirmação é corroborada.

### 39. 6ff5738 2025-07-28 (shell/src/hooks/useRemoteModule.ts); d7937f8 2025-07-28 (shell/next.config.js); faabb25 2025-07-28 (mf-1/vite.mf.ts); 03aa81d 2025-07-28 (README.md); ed8c864 2025-07-28 (README.md)

**Observação:** O hook, `shell/next.config.js` e `mf-1/vite.mf.ts` chegam à versão do snapshot antes de `03aa81d`, que cria o README, e de `ed8c864`, que lhe dá a versão do snapshot. A versão de `03aa81d` falta no clone.

**Interpretação:** A frase "only needs a `<script>` tag" não é resto de um estágio anterior do código: coexiste com o que a contradiz. O ponto está esclarecido.

### 40. ff692cd 2025-07-28 (mf-1/src/types/remote-components.d.ts, shell/src/types/mf1-remote-components.d.ts); 397b98c 2025-07-28 (mf-1/src/types/remote-components.d.ts, shell/src/types/mf1-remote-components.d.ts)

**Observação:** Os dois arquivos de tipos nascem no mesmo commit com o mesmo objeto e mudam juntos para o mesmo objeto, que é o do snapshot. Nenhum commit cria arquivo de tipos num lugar comum.

**Interpretação:** As interfaces foram duplicadas desde o início e mantidas iguais por cópia, nunca extraídas. O ponto está esclarecido.

### 41. b50998d 2025-07-28 (mf-1/public/remote-components/bundle.js); 0f9ffc9 2025-07-28 (mf-1/public/remote-modules/bundle.js); 397b98c 2025-07-28 (mf-1/public/remote-components/bundle.js); faabb25 2025-07-28 (mf-1/vite.mf.ts)

**Observação:** O bundle sempre esteve em `mf-1/public`, primeiro em `remote-components/` e depois em `remote-modules/`. Nenhum dos 17 commits cria artefato de publicação. O comentário está na versão de `faabb25`, e as anteriores faltam no clone.

**Interpretação:** A publicação em outro lugar é uma alternativa anotada, não um estágio abandonado. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (mf-1, Entrada e Build); 3.4.4 (shell/src/hooks/useRemoteModule.ts:79, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Onde é servida, Artefatos); 3.4.7 #1, #8, #10, #13, #16, #19, #20, #23 (Evidência); 3.4.7 #22, #23 (Documento) | 2 configuração | configuração | script | tecnológica | moderada | configura #11; configura #13 |
| 2 | 3.4.3 (shell, Build); 3.4.4 (shell/src/components/RemoteHeader.tsx:18, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #16, #22 (Evidência) | 2 configuração | configuração | script | arquitetural | forte | configura #5; configura #7; configura #9; configura #13 |
| 3 | 3.4.4 (shell/src/hooks/useRemoteModule.ts:79) | 3 código | código-fonte | script | tecnológica | moderada | implementa #13 |
| 4 | 3.4.4 (mf-1/public/remote-modules/bundle.js:10) | 3 código | código-fonte | — | contexto | fraca | — |
| 5 | 3.4.4 (shell/src/components/RemoteHeader.tsx:18) | 3 código | código-fonte | script | arquitetural | forte | implementa #13 |
| 6 | 3.4.4 (shell/src/components/RemoteHeader.tsx:37) | 3 código | código-fonte | script | tecnológica | moderada | implementa #13 |
| 7 | 3.4.4 (shell/src/components/RemoteFulfilment.tsx:29) | 3 código | código-fonte | script | arquitetural | forte | implementa #13 |
| 8 | 3.4.4 (shell/src/components/RemoteFulfilment.tsx:65) | 3 código | código-fonte | script | tecnológica | moderada | implementa #13 |
| 9 | 3.4.4 (shell/src/components/RemoteFulfilmentDetails.tsx:29) | 3 código | código-fonte | script | arquitetural | forte | implementa #13 |
| 10 | 3.4.4 (shell/src/components/RemoteFulfilmentDetails.tsx:65) | 3 código | código-fonte | script | tecnológica | moderada | implementa #13 |
| 11 | 3.4.3 (mf-1) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 12 | 3.4.3 (shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 13 | 3.4.5 #1 | 5 composição | código-fonte | script | arquitetural | forte | liga #12; liga #11 |
| 14 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #11 |
| 15 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #12 |
| 16 | 3.4.7 #1 | 7 documentação | documentação | script | arquitetural | fraca | corrobora #11; corrobora #12; corrobora #13; corrobora #1 |
| 17 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 18 | 3.4.7 #3 | 7 documentação | documentação | script | tecnológica | fraca | corrobora #13 |
| 19 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #13 |
| 20 | 3.4.7 #5 | 7 documentação | documentação | script | arquitetural | fraca | corrobora #11; corrobora #1; corrobora mf-1/src/pages/index.tsx:3-4 |
| 21 | 3.4.7 #6 | 7 documentação | documentação | script | tecnológica | fraca | corrobora #3; corrobora #13 |
| 22 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #11 |
| 23 | 3.4.7 #8 | 7 documentação | documentação | script | arquitetural | fraca | corrobora #14; corrobora #1 |
| 24 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #5; corrobora #7; corrobora #9 |
| 25 | 3.4.7 #10 | 7 documentação | documentação | script | tecnológica | fraca | corrobora #1; corrobora #3; corrobora #13 |
| 26 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #6; corrobora #8; corrobora #10; corrobora #13 |
| 27 | 3.4.7 #12 | 7 documentação | documentação | — | tecnológica | fraca | corrobora mf-1/package.json:6-7, 12 |
| 28 | 3.4.7 #13 | 7 documentação | documentação | script | arquitetural | fraca | corrobora #14; corrobora #1 |
| 29 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #6 |
| 30 | 3.4.7 #15 | 7 documentação | documentação | script | tecnológica | fraca | corrobora #3; corrobora shell/src/components/RemoteHeader.tsx:24-31 |
| 31 | 3.4.7 #16 | 7 documentação | documentação | script | tecnológica | fraca | contradiz #3; contradiz #1; contradiz #2 |
| 32 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #11; corrobora #12 |
| 33 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | contradiz mf-1/src/types/remote-components.d.ts:3-29; contradiz shell/src/types/mf1-remote-components.d.ts:3-29 |
| 34 | 3.4.7 #19 | 7 documentação | documentação | script | tecnológica | fraca | corrobora #1; corrobora #3 |
| 35 | 3.4.7 #20 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #1; corrobora mf-1/package.json:17-18; corrobora shell/package.json:13-14 |
| 36 | 3.4.7 #21 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #3; corrobora #13; corrobora #15 |
| 37 | 3.4.7 #22 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte #2; corrobora em parte #5 |
| 38 | 3.4.7 #23 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #3; corrobora #1; corrobora mf-1/package.json:17-18; corrobora shell/package.json:13-14 |
| 39 | 3.4.8 #1 | 8 histórico | histórico | script | tecnológica | fraca | explica #31 |
| 40 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #33 |
| 41 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #37 |

## Resumo

Observações: 41. Dimensões (tecnologia: 0, configuração: 2, código: 8, estrutura: 2, composição: 1, build-deploy: 2, documentação: 23, histórico: 3). Força (forte: 5, moderada: 9, fraca: 27, ambígua: 0). Evidência (tecnológica: 15, arquitetural: 25, contexto: 1).
