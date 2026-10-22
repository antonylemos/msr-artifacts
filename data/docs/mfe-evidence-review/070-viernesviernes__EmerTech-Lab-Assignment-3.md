---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
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
  date: 2026-10-21
---

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Leitura do repositório

Três aplicações React/Vite formam uma cadeia completa de Module Federation:
- **Dependência:** `@originjs/vite-plugin-federation`, nas três aplicações (#1 a #3).
- **Configuração:** os dois remotes se declaram e expõem `./App` (#4, #5), e o shell os declara (#6).
- **Código:** o shell importa cada aplicação remota pelo nome (#7, #8), liga cada uma a uma rota (#11) e as renderiza (#12, #13).
- **Relações host → remote:** isso resulta em duas relações ativas (#19, #20).

Há também um canal de comunicação entre frontends. O auth-app dispara o evento `loginSuccess` no `window` (#9), e o shell o escuta (#10). Isso resulta numa terceira relação ativa, no sentido auth-app → shell (#21). Logo depois do evento, o auth-app recarrega a página, e o estado passa a depender da sessão no backend. É uma particularidade que a força não registra.

Build é separado, e o deploy não é observado: o script chamado `deploy` só faz build e preview local (#22 a #24). A raiz `client/` e o backend `server/` são contexto (#14, #18). A única afirmação está num comentário do backend e corrobora os três micro-frontends (#25).

## Observações

### 1. client/auth-app/package.json:15

**Observação:** `@originjs/vite-plugin-federation` (`1.3.5`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no build do auth-app.

### 2. client/community-app/package.json:15

**Observação:** `@originjs/vite-plugin-federation` (`1.3.5`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no build do community-app.

### 3. client/shell-app/package.json:14

**Observação:** `@originjs/vite-plugin-federation` (`1.3.5`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no build do shell.

### 4. client/auth-app/vite.config.js:1-33

**Observação:** `federation` declara `name: 'authApp'` e `filename: 'remoteEntry.js'`, expõe `./App` (`./src/App.jsx`) e compartilha `react`, `react-dom`, `@apollo/client` e `graphql`. As portas são 3001 em desenvolvimento e em preview.

**Interpretação:** O auth-app está configurado como remote e oferece sua aplicação a um host.

### 5. client/community-app/vite.config.js:1-33

**Observação:** `federation` declara `name: 'communityApp'` e `filename: 'remoteEntry.js'`, expõe `./App` e compartilha as mesmas bibliotecas. As portas são 3002.

**Interpretação:** O community-app está configurado como remote e oferece sua aplicação a um host.

### 6. client/shell-app/vite.config.js:1-33

**Observação:** `federation` declara `name: 'shellApp'` e os remotes `authApp` e `communityApp` em `http://localhost:3001` e `3002/assets/remoteEntry.js`, e compartilha as mesmas bibliotecas.

**Interpretação:** A configuração do host declara os dois remotes e onde encontrá-los em desenvolvimento.

### 7. client/shell-app/src/App.jsx:5

**Observação:** Importa `authApp/App` de forma preguiçosa.

**Interpretação:** O shell importa a aplicação exposta pelo auth-app, pelo nome dele.

### 8. client/shell-app/src/App.jsx:6

**Observação:** Importa `communityApp/App` de forma preguiçosa.

**Interpretação:** O shell importa a aplicação exposta pelo community-app, pelo nome dele.

### 9. client/auth-app/src/subcomponents/Login.jsx:37-38

**Observação:** `window.dispatchEvent(new CustomEvent('loginSuccess', { detail: { isLoggedIn: true } }))`. Na linha seguinte, a página é recarregada para `/`.

**Interpretação:** O auth-app avisa o login a quem escutar o `window`.

### 10. client/shell-app/src/App.jsx:23-28, 34-35

**Observação:** O shell registra um listener de `loginSuccess` que atualiza `isLoggedIn` a partir de `event.detail`, e o remove na limpeza.

**Interpretação:** O shell recebe o aviso de login de outra unidade.

### 11. client/shell-app/src/App.jsx:43-47

**Observação:** `Routes` liga `/` a um redirecionamento, `/login` ao `AuthApp` e `/community` ao `CommunityApp`.

**Interpretação:** O roteamento do host declara onde cada remote aparece.

### 12. client/shell-app/src/App.jsx:45; client/shell-app/src/App.jsx:5

**Observação:** `<Route path="/login" element={<AuthApp />} />`.

**Interpretação:** A rota liga `/login` à aplicação remota do auth-app.

### 13. client/shell-app/src/App.jsx:46; client/shell-app/src/App.jsx:6

**Observação:** `<Route path="/community" element={<CommunityApp />} />`.

**Interpretação:** A rota liga `/community` à aplicação remota do community-app.

### 14. client; client/package.json:1-16

**Observação:** É o manifesto que sobe as três aplicações juntas com `concurrently`, sem entrada nem build de UI.

**Interpretação:** É uma pasta de coordenação, e não uma unidade.

### 15. client/auth-app; client/auth-app/package.json:1-12; client/auth-app/index.html:10-11; client/auth-app/src/main.jsx:7-11; client/auth-app/vite.config.js:21-26

**Observação:** É uma aplicação React com manifesto, entrada e build Vite próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 16. client/community-app; client/community-app/package.json:1-12; client/community-app/index.html:10-11; client/community-app/src/main.jsx:6-10; client/community-app/vite.config.js:21-26

**Observação:** É uma aplicação React com manifesto, entrada e build Vite próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 17. client/shell-app; client/shell-app/package.json:1-12; client/shell-app/index.html:10-11; client/shell-app/src/main.jsx:16-24; client/shell-app/vite.config.js:18-23

**Observação:** É uma aplicação React com manifesto, entrada e build Vite próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 18. server; server/package.json:1-20; server/gateway.js:85-108

**Observação:** São microsserviços GraphQL e um gateway HTTP, sem UI.

**Interpretação:** É um backend no mesmo repositório, e não uma unidade frontend.

### 19. client/shell-app/src/App.jsx:5, 43, 45; client/shell-app/vite.config.js:9-12; client/auth-app/vite.config.js:9-14

**Observação:** O shell importa `authApp/App` e o renderiza em `/login`. O nome e o módulo correspondem à configuração do auth-app.

**Interpretação:** É uma relação host → remote ativa.

### 20. client/shell-app/src/App.jsx:6, 43, 46; client/shell-app/vite.config.js:9-11, 13; client/community-app/vite.config.js:9-14

**Observação:** O shell importa `communityApp/App` e o renderiza em `/community`. O nome e o módulo correspondem à configuração do community-app.

**Interpretação:** É uma relação host → remote ativa.

### 21. client/auth-app/src/subcomponents/Login.jsx:37; client/shell-app/src/App.jsx:28

**Observação:** O auth-app emite `loginSuccess`, e o shell o escuta. Não há envio no sentido inverso.

**Interpretação:** É uma relação de comunicação ativa, no sentido auth-app → shell.

### 22. client/auth-app/vite.config.js:21-26, 30-31; client/auth-app/package.json:8, 10-11

**Observação:** Tem configuração e `vite build` próprios. O script `deploy` só roda `build` e `preview` local na porta 3001.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 23. client/community-app/vite.config.js:21-26, 30-31; client/community-app/package.json:8, 10-11

**Observação:** Tem configuração e `vite build` próprios. O script `deploy` só roda `build` e `preview` local na porta 3002.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 24. client/shell-app/vite.config.js:18-23; client/shell-app/package.json:8

**Observação:** Tem configuração e `vite build` próprios, e roda só com o servidor de desenvolvimento.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 25. server/gateway.js:12

**Observação:** "Microfrontends: shell 3000, auth-app 3001, community-app 3002".

**Interpretação:** Nomeia as três aplicações como micro-frontends, aceitas pelo gateway como origens. A afirmação é corroborada.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (client/auth-app/package.json:15) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 2 | 3.4.2 (client/community-app/package.json:15) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5 |
| 3 | 3.4.2 (client/shell-app/package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 4 | 3.4.2 (client/auth-app/package.json:15, Evidência); 3.4.3 (client/auth-app, Marcadores e Build); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #15; configura #19 |
| 5 | 3.4.2 (client/community-app/package.json:15, Evidência); 3.4.3 (client/community-app, Marcadores e Build); 3.4.5 #2 (Configuração); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #16; configura #20 |
| 6 | 3.4.2 (client/shell-app/package.json:14, Evidência); 3.4.3 (client/shell-app, Marcadores e Build); 3.4.5 #1, #2 (Configuração); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #17; configura #19; configura #20 |
| 7 | 3.4.4 (client/shell-app/src/App.jsx:5) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #19 |
| 8 | 3.4.4 (client/shell-app/src/App.jsx:6) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #20 |
| 9 | 3.4.4 (client/auth-app/src/subcomponents/Login.jsx:37) | 3 código | código-fonte | events | tecnológica | moderada | implementa #21 |
| 10 | 3.4.4 (client/shell-app/src/App.jsx:28) | 3 código | código-fonte | events | tecnológica | moderada | implementa #21 |
| 11 | 3.4.4 (client/shell-app/src/App.jsx:43) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #19; implementa #20 |
| 12 | 3.4.4 (client/shell-app/src/App.jsx:45) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #19 |
| 13 | 3.4.4 (client/shell-app/src/App.jsx:46) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #20 |
| 14 | 3.4.3 (client) | 4 estrutura | diretório | — | contexto | fraca | — |
| 15 | 3.4.3 (client/auth-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 16 | 3.4.3 (client/community-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 17 | 3.4.3 (client/shell-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 18 | 3.4.3 (server) | 4 estrutura | diretório | — | contexto | fraca | — |
| 19 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #17; liga #15 |
| 20 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #17; liga #16 |
| 21 | 3.4.5 #3 | 5 composição | código-fonte | events | arquitetural | forte | liga #15; liga #17 |
| 22 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #15 |
| 23 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #16 |
| 24 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #17 |
| 25 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #15; corrobora #16; corrobora #17; corrobora server/gateway.js:13-17 |

## Resumo

Observações: 25. Dimensões (tecnologia: 3, configuração: 3, código: 7, estrutura: 5, composição: 3, build-deploy: 3, documentação: 1, histórico: 0). Força (forte: 9, moderada: 10, fraca: 6, ambígua: 0). Evidência (tecnológica: 7, arquitetural: 16, contexto: 2).
