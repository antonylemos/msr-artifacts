---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
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

# 208 — enzox0/module-federation-project-template

## Leitura do repositório

O snapshot contém um shell e quatro remotos React/Vite, cada um com entrada e build próprios (#38, #39, #40, #41, #42). A cadeia de composição passa pelas declarações do plugin (#1–#5), pelos blocos de federação e Vite (#7–#21), pelos imports e pelas rotas (#27–#36) e pelas quatro relações ativas (#47–#50). Os nomes de remote ligam os módulos `./App` aos destinos; portas de desenvolvimento apenas corroboram sua identificação. Os quatro remotos são stubs, conforme a 3.4.5; a composição registrada não pressupõe funcionalidades de negócio completas.

Os blocos `.js` de federação também estão citados nos marcadores estruturais e têm observações próprias (#22–#26). O `.js` do shell (#26) contém endpoints divergentes, mas a 3.4.5 registra que o `.ts` (#19) governa o fluxo padrão. O histórico (#73) registra que ambos entram juntos, sem estágio anterior observável que elimine a discrepância. A força forte de #26 descreve sua declaração explícita de remotes, sem transformá-la em configuração ativa.

As imagens finais são separadas por aplicação (#51–#55), embora cada Dockerfile construa o workspace inteiro. O CD e a infraestrutura de orquestração permanecem placeholders, e os endpoints localhost com `/dist/assets/` não coincidem com a raiz e a porta das imagens nginx. As promessas de prontidão para produção (#63), proxy reverso (#65) e deploy sem reconstrução do restante (#69) são contraditas pelas evidências já registradas. As afirmações documentais permanecem fracas mesmo quando corroboradas.

A raiz (#37) e as bibliotecas (#43–#46) são contexto, sem unidade frontend própria. As aplicações declaram pacotes de workspace, mas não os importam, o que contradiz a apresentação desses pacotes como compartilhados pelas aplicações (#64, #75). Também não há script de build nos pacotes, contrariando #72. O bootstrap assíncrono local (#31) é um sinal tecnológico fraco, sem identificar sozinho Module Federation. Os pontos históricos (#73–#78) esclarecem discrepâncias sem abrir ambiguidade sobre a arquitetura do snapshot.

Na dimensão 2 entram apenas os blocos de configuração de federação e do plugin citados nas tabelas. Os `.d.ts` dos marcadores são declarações de tipo, sem configuração de build ou runtime; `turbo.json`, workspace, nginx e os demais blocos citados não declaram elemento de composição nos termos do passo 2. A enumeração de URLs no health check é código, aparece somente como apoio das revisões e não gera observação adicional de configuração.

## Observações

### 1. apps/admin-mf/package.json:14

**Observação:** O manifesto de admin-mf declara `@originjs/vite-plugin-federation` em dependencies, versão `^1.3.5`.

**Interpretação:** É um sinal de tecnologia de Module Federation; a declaração sozinha não estabelece a composição.

### 2. apps/auth-mf/package.json:14

**Observação:** O manifesto de auth-mf declara `@originjs/vite-plugin-federation` em dependencies, versão `^1.3.5`.

**Interpretação:** É um sinal de tecnologia de Module Federation; a declaração sozinha não estabelece a composição.

### 3. apps/dashboard-mf/package.json:14

**Observação:** O manifesto de dashboard-mf declara `@originjs/vite-plugin-federation` em dependencies, versão `^1.3.5`.

**Interpretação:** É um sinal de tecnologia de Module Federation; a declaração sozinha não estabelece a composição.

### 4. apps/messaging-mf/package.json:14

**Observação:** O manifesto de messaging-mf declara `@originjs/vite-plugin-federation` em dependencies, versão `^1.3.5`.

**Interpretação:** É um sinal de tecnologia de Module Federation; a declaração sozinha não estabelece a composição.

### 5. apps/shell/package.json:14

**Observação:** O manifesto de shell declara `@originjs/vite-plugin-federation` em dependencies, versão `^1.3.5`.

**Interpretação:** É um sinal de tecnologia de Module Federation; a declaração sozinha não estabelece a composição.

### 6. package.json:30

**Observação:** O manifesto da raiz declara `turbo` em devDependencies, versão `^2.0.0`.

**Interpretação:** A ferramenta de monorepo é contexto de coordenação; a declaração não identifica unidades frontend nem seu mecanismo de composição.

### 7. apps/admin-mf/module-federation.config.ts:1-8

**Observação:** O objeto `mfConfig` nomeia `adminMf`, define `remoteEntry.js`, expõe `./App` por `./src/exposes.tsx` e compartilha `react`, `react-dom` e `react-router-dom`.

**Interpretação:** Configura o mecanismo de federação e a superfície exposta de uma unidade, sem nomear consumidores.

### 8. apps/admin-mf/vite.config.js:1-17

**Observação:** A configuração do Vite importa o plugin `@originjs/vite-plugin-federation` e `mfConfig` de `./module-federation.config`, e invoca `federation(mfConfig)` na lista de plugins.

**Interpretação:** Integra a federação ao build de admin-mf; este bloco não enumera os destinos da composição.

### 9. apps/admin-mf/vite.config.ts:1-18

**Observação:** A configuração do Vite importa o plugin `@originjs/vite-plugin-federation` e `mfConfig` de `./module-federation.config`, e invoca `federation(mfConfig)` na lista de plugins.

**Interpretação:** Integra a federação ao build de admin-mf; este bloco não enumera os destinos da composição.

### 10. apps/auth-mf/module-federation.config.ts:1-8

**Observação:** O objeto `mfConfig` nomeia `authMf`, define `remoteEntry.js`, expõe `./App` por `./src/exposes.tsx` e compartilha `react`, `react-dom` e `react-router-dom`.

**Interpretação:** Configura o mecanismo de federação e a superfície exposta de uma unidade, sem nomear consumidores.

### 11. apps/auth-mf/vite.config.js:1-17

**Observação:** A configuração do Vite importa o plugin `@originjs/vite-plugin-federation` e `mfConfig` de `./module-federation.config`, e invoca `federation(mfConfig)` na lista de plugins.

**Interpretação:** Integra a federação ao build de auth-mf; este bloco não enumera os destinos da composição.

### 12. apps/auth-mf/vite.config.ts:1-18

**Observação:** A configuração do Vite importa o plugin `@originjs/vite-plugin-federation` e `mfConfig` de `./module-federation.config`, e invoca `federation(mfConfig)` na lista de plugins.

**Interpretação:** Integra a federação ao build de auth-mf; este bloco não enumera os destinos da composição.

### 13. apps/dashboard-mf/module-federation.config.ts:1-8

**Observação:** O objeto `mfConfig` nomeia `dashboardMf`, define `remoteEntry.js`, expõe `./App` por `./src/exposes.tsx` e compartilha `react`, `react-dom` e `react-router-dom`.

**Interpretação:** Configura o mecanismo de federação e a superfície exposta de uma unidade, sem nomear consumidores.

### 14. apps/dashboard-mf/vite.config.js:1-17

**Observação:** A configuração do Vite importa o plugin `@originjs/vite-plugin-federation` e `mfConfig` de `./module-federation.config`, e invoca `federation(mfConfig)` na lista de plugins.

**Interpretação:** Integra a federação ao build de dashboard-mf; este bloco não enumera os destinos da composição.

### 15. apps/dashboard-mf/vite.config.ts:1-18

**Observação:** A configuração do Vite importa o plugin `@originjs/vite-plugin-federation` e `mfConfig` de `./module-federation.config`, e invoca `federation(mfConfig)` na lista de plugins.

**Interpretação:** Integra a federação ao build de dashboard-mf; este bloco não enumera os destinos da composição.

### 16. apps/messaging-mf/module-federation.config.ts:1-8

**Observação:** O objeto `mfConfig` nomeia `messagingMf`, define `remoteEntry.js`, expõe `./App` por `./src/exposes.tsx` e compartilha `react`, `react-dom` e `react-router-dom`.

**Interpretação:** Configura o mecanismo de federação e a superfície exposta de uma unidade, sem nomear consumidores.

### 17. apps/messaging-mf/vite.config.js:1-17

**Observação:** A configuração do Vite importa o plugin `@originjs/vite-plugin-federation` e `mfConfig` de `./module-federation.config`, e invoca `federation(mfConfig)` na lista de plugins.

**Interpretação:** Integra a federação ao build de messaging-mf; este bloco não enumera os destinos da composição.

### 18. apps/messaging-mf/vite.config.ts:1-18

**Observação:** A configuração do Vite importa o plugin `@originjs/vite-plugin-federation` e `mfConfig` de `./module-federation.config`, e invoca `federation(mfConfig)` na lista de plugins.

**Interpretação:** Integra a federação ao build de messaging-mf; este bloco não enumera os destinos da composição.

### 19. apps/shell/module-federation.config.ts:1-11

**Observação:** O objeto `mfConfig` nomeia `shell`, define `remoteEntry.js`, declara `authMf`, `dashboardMf`, `adminMf` e `messagingMf` nas portas 3001, 3002, 3003 e 3004 com caminho `/dist/assets/remoteEntry.js` e compartilha React, React DOM e React Router.

**Interpretação:** A configuração liga explicitamente o host às quatro unidades remotas, parametrizando sua resolução em runtime.

### 20. apps/shell/vite.config.js:1-17

**Observação:** A configuração do Vite importa o plugin `@originjs/vite-plugin-federation` e `mfConfig` de `./module-federation.config`, e invoca `federation(mfConfig)` na lista de plugins.

**Interpretação:** Integra a federação ao build de shell; este bloco não enumera os destinos da composição.

### 21. apps/shell/vite.config.ts:1-18

**Observação:** A configuração do Vite importa o plugin `@originjs/vite-plugin-federation` e `mfConfig` de `./module-federation.config`, e invoca `federation(mfConfig)` na lista de plugins.

**Interpretação:** Integra a federação ao build de shell; este bloco não enumera os destinos da composição.

### 22. apps/admin-mf/module-federation.config.js:1-8

**Observação:** O objeto `mfConfig` nomeia `adminMf`, define `remoteEntry.js`, expõe `./App` por `./src/exposes.tsx` e compartilha `react`, `react-dom` e `react-router-dom`.

**Interpretação:** Configura o mecanismo de federação e a superfície exposta de uma unidade, sem nomear consumidores.

### 23. apps/auth-mf/module-federation.config.js:1-8

**Observação:** O objeto `mfConfig` nomeia `authMf`, define `remoteEntry.js`, expõe `./App` por `./src/exposes.tsx` e compartilha `react`, `react-dom` e `react-router-dom`.

**Interpretação:** Configura o mecanismo de federação e a superfície exposta de uma unidade, sem nomear consumidores.

### 24. apps/dashboard-mf/module-federation.config.js:1-8

**Observação:** O objeto `mfConfig` nomeia `dashboardMf`, define `remoteEntry.js`, expõe `./App` por `./src/exposes.tsx` e compartilha `react`, `react-dom` e `react-router-dom`.

**Interpretação:** Configura o mecanismo de federação e a superfície exposta de uma unidade, sem nomear consumidores.

### 25. apps/messaging-mf/module-federation.config.js:1-8

**Observação:** O objeto `mfConfig` nomeia `messagingMf`, define `remoteEntry.js`, expõe `./App` por `./src/exposes.tsx` e compartilha `react`, `react-dom` e `react-router-dom`.

**Interpretação:** Configura o mecanismo de federação e a superfície exposta de uma unidade, sem nomear consumidores.

### 26. apps/shell/module-federation.config.js:1-11

**Observação:** O objeto `mfConfig` nomeia `shell`, define `remoteEntry.js`, declara `authMf`, `dashboardMf`, `adminMf` e `messagingMf` nas portas 3004, 3005, 3006 e 3007 com caminho `/assets/remoteEntry.js` e compartilha React, React DOM e React Router.

**Interpretação:** É uma declaração explícita de ligações host/remotes. A 3.4.5 registra que esta cópia compilada não governa o fluxo padrão; seus endpoints divergentes não alteram os destinos identificados pelos nomes.

### 27. apps/shell/src/App.tsx:7

**Observação:** O shell define o componente remoto com `lazy(() => import('authMf/App'))`.

**Interpretação:** O carregamento nomeia diretamente o módulo da unidade auth-mf, ligando o shell ao destino por Module Federation.

### 28. apps/shell/src/App.tsx:8

**Observação:** O shell define o componente remoto com `lazy(() => import('adminMf/App'))`.

**Interpretação:** O carregamento nomeia diretamente o módulo da unidade admin-mf, ligando o shell ao destino por Module Federation.

### 29. apps/shell/src/App.tsx:9

**Observação:** O shell define o componente remoto com `lazy(() => import('dashboardMf/App'))`.

**Interpretação:** O carregamento nomeia diretamente o módulo da unidade dashboard-mf, ligando o shell ao destino por Module Federation.

### 30. apps/shell/src/App.tsx:10

**Observação:** O shell define o componente remoto com `lazy(() => import('messagingMf/App'))`.

**Interpretação:** O carregamento nomeia diretamente o módulo da unidade messaging-mf, ligando o shell ao destino por Module Federation.

### 31. apps/shell/src/main.tsx:1

**Observação:** O arquivo executa `import('./bootstrap')`.

**Interpretação:** É carregamento assíncrono interno ao shell; sozinho não liga unidades nem identifica a tecnologia de federação.

### 32. apps/shell/src/App.tsx:24-76

**Observação:** A tabela `Routes` associa `/auth`, `/admin`, `/dashboard` e `/messaging` a `AuthApp`, `AdminApp`, `DashboardApp` e `MessagingApp`, com `ErrorBoundary` e `Suspense` em cada rota.

**Interpretação:** A tabela situa a montagem das quatro unidades remotas nos caminhos de navegação do host.

### 33. apps/shell/src/App.tsx:39-43; apps/shell/src/App.tsx:7

**Observação:** O shell renderiza `<AuthApp />` dentro de `ErrorBoundary` e `Suspense`; o componente vem do lazy import de `authMf/App`.

**Interpretação:** É o ponto de renderização do componente de auth-mf; a montagem é parte da composição, sem declarar isoladamente a relação de rota.

### 34. apps/shell/src/App.tsx:49-53; apps/shell/src/App.tsx:8

**Observação:** O shell renderiza `<AdminApp />` dentro de `ErrorBoundary` e `Suspense`; o componente vem do lazy import de `adminMf/App`.

**Interpretação:** É o ponto de renderização do componente de admin-mf; a montagem é parte da composição, sem declarar isoladamente a relação de rota.

### 35. apps/shell/src/App.tsx:59-63; apps/shell/src/App.tsx:9

**Observação:** O shell renderiza `<DashboardApp />` dentro de `ErrorBoundary` e `Suspense`; o componente vem do lazy import de `dashboardMf/App`.

**Interpretação:** É o ponto de renderização do componente de dashboard-mf; a montagem é parte da composição, sem declarar isoladamente a relação de rota.

### 36. apps/shell/src/App.tsx:69-73; apps/shell/src/App.tsx:10

**Observação:** O shell renderiza `<MessagingApp />` dentro de `ErrorBoundary` e `Suspense`; o componente vem do lazy import de `messagingMf/App`.

**Interpretação:** É o ponto de renderização do componente de messaging-mf; a montagem é parte da composição, sem declarar isoladamente a relação de rota.

### 37. .; package.json:1-43

**Observação:** A raiz tem manifesto de workspace e script `turbo run build`, sem entrada ou build próprio de UI.

**Interpretação:** É coordenação do workspace, não uma unidade frontend.

### 38. apps/admin-mf; apps/admin-mf/index.html:10; apps/admin-mf/src/bootstrap.tsx:5-9; apps/admin-mf/package.json:8; apps/admin-mf/vite.config.ts:6-18; apps/admin-mf/Dockerfile:9-12

**Observação:** apps/admin-mf tem HTML de entrada, bootstrap que monta React, script `tsc && vite build`, configuração Vite própria e Dockerfile que copia apenas seu `dist` para a imagem final.

**Interpretação:** O conjunto delimita uma unidade frontend com entrada e build próprios; a ligação às demais depende das evidências de composição.

### 39. apps/auth-mf; apps/auth-mf/index.html:10; apps/auth-mf/src/bootstrap.tsx:5-9; apps/auth-mf/package.json:8; apps/auth-mf/vite.config.ts:6-18; apps/auth-mf/Dockerfile:9-12

**Observação:** apps/auth-mf tem HTML de entrada, bootstrap que monta React, script `tsc && vite build`, configuração Vite própria e Dockerfile que copia apenas seu `dist` para a imagem final.

**Interpretação:** O conjunto delimita uma unidade frontend com entrada e build próprios; a ligação às demais depende das evidências de composição.

### 40. apps/dashboard-mf; apps/dashboard-mf/index.html:10; apps/dashboard-mf/src/bootstrap.tsx:5-9; apps/dashboard-mf/package.json:8; apps/dashboard-mf/vite.config.ts:6-18; apps/dashboard-mf/Dockerfile:9-12

**Observação:** apps/dashboard-mf tem HTML de entrada, bootstrap que monta React, script `tsc && vite build`, configuração Vite própria e Dockerfile que copia apenas seu `dist` para a imagem final.

**Interpretação:** O conjunto delimita uma unidade frontend com entrada e build próprios; a ligação às demais depende das evidências de composição.

### 41. apps/messaging-mf; apps/messaging-mf/index.html:10; apps/messaging-mf/src/bootstrap.tsx:5-9; apps/messaging-mf/package.json:8; apps/messaging-mf/vite.config.ts:6-18; apps/messaging-mf/Dockerfile:9-12

**Observação:** apps/messaging-mf tem HTML de entrada, bootstrap que monta React, script `tsc && vite build`, configuração Vite própria e Dockerfile que copia apenas seu `dist` para a imagem final.

**Interpretação:** O conjunto delimita uma unidade frontend com entrada e build próprios; a ligação às demais depende das evidências de composição.

### 42. apps/shell; apps/shell/index.html:10; apps/shell/src/main.tsx:1; apps/shell/src/bootstrap.tsx:5-9; apps/shell/package.json:8; apps/shell/vite.config.ts:6-18; apps/shell/Dockerfile:9-12

**Observação:** apps/shell tem HTML de entrada, bootstrap que monta React, script `tsc && vite build`, configuração Vite própria e Dockerfile que copia apenas seu `dist` para a imagem final.

**Interpretação:** O conjunto delimita uma unidade frontend com entrada e build próprios; a ligação às demais depende das evidências de composição.

### 43. packages/sdk; packages/sdk/package.json:5-10

**Observação:** O manifesto de packages/sdk aponta `main` para `./src/index.ts` e só declara scripts `lint` e `clean`; a revisão estrutural registra uma biblioteca de clientes HTTP, auth e websocket, sem entrada de aplicação.

**Interpretação:** É um pacote de apoio do workspace; não delimita uma unidade frontend independente.

### 44. packages/shared; packages/shared/package.json:5-10

**Observação:** O manifesto de packages/shared aponta `main` para `./src/index.ts` e só declara scripts `lint` e `clean`; a revisão estrutural registra uma biblioteca de utilitários, sem entrada de aplicação.

**Interpretação:** É um pacote de apoio do workspace; não delimita uma unidade frontend independente.

### 45. packages/types; packages/types/package.json:5-10

**Observação:** O manifesto de packages/types aponta `main` para `./src/index.ts` e só declara scripts `lint` e `clean`; a revisão estrutural registra uma biblioteca de tipos, sem entrada de aplicação.

**Interpretação:** É um pacote de apoio do workspace; não delimita uma unidade frontend independente.

### 46. packages/ui; packages/ui/package.json:5-10

**Observação:** O manifesto de packages/ui aponta `main` para `./src/index.ts` e só declara scripts `lint` e `clean`; a revisão estrutural registra uma biblioteca de componentes de UI, sem entrada de aplicação.

**Interpretação:** É um pacote de apoio do workspace; não delimita uma unidade frontend independente.

### 47. apps/shell/src/App.tsx:7; apps/shell/src/App.tsx:36-45; apps/shell/module-federation.config.ts:5; apps/shell/vite.config.ts:7; apps/auth-mf/module-federation.config.ts:2-6

**Observação:** O shell importa `authMf/App` e o monta na rota `/auth`. A chave `authMf` em `remotes` resolve o `remoteEntry.js` e corresponde ao nome da configuração de auth-mf, que expõe `./App`.

**Interpretação:** É uma relação ativa host → remote dentro do snapshot, sustentada pela resolução do destino e pelo consumo no código.

### 48. apps/shell/src/App.tsx:8; apps/shell/src/App.tsx:46-55; apps/shell/module-federation.config.ts:7; apps/shell/vite.config.ts:7; apps/admin-mf/module-federation.config.ts:2-6

**Observação:** O shell importa `adminMf/App` e o monta na rota `/admin`. A chave `adminMf` em `remotes` resolve o `remoteEntry.js` e corresponde ao nome da configuração de admin-mf, que expõe `./App`.

**Interpretação:** É uma relação ativa host → remote dentro do snapshot, sustentada pela resolução do destino e pelo consumo no código.

### 49. apps/shell/src/App.tsx:9; apps/shell/src/App.tsx:56-65; apps/shell/module-federation.config.ts:6; apps/shell/vite.config.ts:7; apps/dashboard-mf/module-federation.config.ts:2-6

**Observação:** O shell importa `dashboardMf/App` e o monta na rota `/dashboard`. A chave `dashboardMf` em `remotes` resolve o `remoteEntry.js` e corresponde ao nome da configuração de dashboard-mf, que expõe `./App`.

**Interpretação:** É uma relação ativa host → remote dentro do snapshot, sustentada pela resolução do destino e pelo consumo no código.

### 50. apps/shell/src/App.tsx:10; apps/shell/src/App.tsx:66-75; apps/shell/module-federation.config.ts:8; apps/shell/vite.config.ts:7; apps/messaging-mf/module-federation.config.ts:2-6

**Observação:** O shell importa `messagingMf/App` e o monta na rota `/messaging`. A chave `messagingMf` em `remotes` resolve o `remoteEntry.js` e corresponde ao nome da configuração de messaging-mf, que expõe `./App`.

**Interpretação:** É uma relação ativa host → remote dentro do snapshot, sustentada pela resolução do destino e pelo consumo no código.

### 51. apps/admin-mf/package.json:8; apps/admin-mf/vite.config.ts:6-13; apps/admin-mf/Dockerfile:1-12

**Observação:** apps/admin-mf tem script `tsc && vite build` e configuração próprios. Seu Dockerfile executa `pnpm build` no workspace inteiro, mas a imagem nginx final recebe apenas o `dist` desta aplicação e expõe a porta 80.

**Interpretação:** Build e deploy são separados conforme a 3.4.6, delimitando a aplicação. O build das imagens continua abrangendo o workspace; não há versionamento independente usado na publicação nem execução de deploy demonstrada.

### 52. apps/auth-mf/package.json:8; apps/auth-mf/vite.config.ts:6-13; apps/auth-mf/Dockerfile:1-12

**Observação:** apps/auth-mf tem script `tsc && vite build` e configuração próprios. Seu Dockerfile executa `pnpm build` no workspace inteiro, mas a imagem nginx final recebe apenas o `dist` desta aplicação e expõe a porta 80.

**Interpretação:** Build e deploy são separados conforme a 3.4.6, delimitando a aplicação. O build das imagens continua abrangendo o workspace; não há versionamento independente usado na publicação nem execução de deploy demonstrada.

### 53. apps/dashboard-mf/package.json:8; apps/dashboard-mf/vite.config.ts:6-13; apps/dashboard-mf/Dockerfile:1-12

**Observação:** apps/dashboard-mf tem script `tsc && vite build` e configuração próprios. Seu Dockerfile executa `pnpm build` no workspace inteiro, mas a imagem nginx final recebe apenas o `dist` desta aplicação e expõe a porta 80.

**Interpretação:** Build e deploy são separados conforme a 3.4.6, delimitando a aplicação. O build das imagens continua abrangendo o workspace; não há versionamento independente usado na publicação nem execução de deploy demonstrada.

### 54. apps/messaging-mf/package.json:8; apps/messaging-mf/vite.config.ts:6-13; apps/messaging-mf/Dockerfile:1-12

**Observação:** apps/messaging-mf tem script `tsc && vite build` e configuração próprios. Seu Dockerfile executa `pnpm build` no workspace inteiro, mas a imagem nginx final recebe apenas o `dist` desta aplicação e expõe a porta 80.

**Interpretação:** Build e deploy são separados conforme a 3.4.6, delimitando a aplicação. O build das imagens continua abrangendo o workspace; não há versionamento independente usado na publicação nem execução de deploy demonstrada.

### 55. apps/shell/package.json:8; apps/shell/vite.config.ts:6-13; apps/shell/Dockerfile:1-12; infrastructure/docker/production/Dockerfile.shell:1-13; infrastructure/nginx/nginx.conf:9-18; apps/shell/module-federation.config.ts:5-8

**Observação:** apps/shell tem script `tsc && vite build` e configuração próprios. Seu Dockerfile executa `pnpm build` no workspace inteiro, mas a imagem nginx final recebe apenas o `dist` desta aplicação e expõe a porta 80. O Dockerfile alternativo de produção acrescenta nginx com fallback SPA, e o shell mantém as URLs localhost dos remotos embutidas.

**Interpretação:** Build e deploy são separados conforme a 3.4.6, delimitando a aplicação. O build das imagens continua abrangendo o workspace; não há versionamento independente usado na publicação nem execução de deploy demonstrada.

### 56. .docs/QUICK_START.md:28-29

**Observação:** A documentação afirma: "\"Failed to fetch dynamically imported module\"" / "**Cause:** A remote microfrontend isn't running".

**Interpretação:** Descreve dependência de disponibilidade dos remotos durante seu carregamento pelo host; a 3.4.7 a registra como corroborada.

### 57. .docs/QUICK_START.md:46-50

**Observação:** A documentação afirma: "Shell (Host) | 3000", "Auth MF | 3001", "Dashboard MF | 3002", "Admin MF | 3003", "Messaging MF | 3004".

**Interpretação:** Descreve um host e quatro unidades remotas com portas distintas; a 3.4.7 confirma a organização.

### 58. .docs/QUICK_START.md:76

**Observação:** A documentação afirma: "**Error Boundaries** - Graceful error handling".

**Interpretação:** Afirma proteção de erros na composição; a 3.4.7 confirma os wrappers de montagem, sem demonstrar nova busca do módulo após retry.

### 59. .docs/QUICK_START.md:77

**Observação:** A documentação afirma: "**Remote Health Check** - Real-time status monitoring".

**Interpretação:** Afirma monitoramento de remotos; a 3.4.7 confirma o health check, que não carrega nem monta unidades.

### 60. .docs/RUNNING.md:3

**Observação:** A documentação afirma: "This is a monorepo with multiple microfrontends using Module Federation.".

**Interpretação:** Apresenta as unidades num monorepo ligado por Module Federation; a afirmação é corroborada, mas permanece semântica.

### 61. .docs/RUNNING.md:81

**Observação:** A documentação afirma: "Verify the remote app is accessible at its URL (e.g., http://localhost:3001/assets/remoteEntry.js)".

**Interpretação:** O endereço documentado é contradito: o shell e seu health check usam `/dist/assets/remoteEntry.js`.

### 62. .docs/RUNNING.md:96

**Observação:** A documentação afirma: "This will build all apps in the correct order using Turbo's dependency graph.".

**Interpretação:** Afirma a coordenação do build das aplicações; a 3.4.7 confirma a configuração do grafo, sem build efetivo dos pacotes compartilhados.

### 63. README.md:3

**Observação:** A documentação afirma: "A production-ready monorepo template".

**Interpretação:** A promessa de prontidão para produção é contradita pelo CD placeholder e pela divergência entre endpoints do host e serviço das imagens.

### 64. README.md:3

**Observação:** A documentação afirma: "This template provides a complete microfrontend architecture with shared packages".

**Interpretação:** Descreve pacotes compartilhados como parte da arquitetura. A 3.4.7 a registra como contradita: os apps declaram os pacotes, mas não os importam.

### 65. README.md:42

**Observação:** A documentação afirma: "Nginx<br/>Reverse Proxy<br/>Production Routing".

**Interpretação:** A alegação de proxy reverso é contradita: o nginx apenas serve arquivos estáticos do shell com fallback SPA.

### 66. README.md:43

**Observação:** A documentação afirma: "Docker<br/>Containerization<br/>Deployment".

**Interpretação:** Descreve empacotamento das unidades em containers; a 3.4.7 confirma imagens separadas, sem execução de deploy.

### 67. README.md:46-49

**Observação:** A documentação afirma: "Shell -->|Lazy Load| Auth" (e o mesmo para Dashboard, Admin e Messaging).

**Interpretação:** Descreve o carregamento dos quatro remotos pelo shell; a 3.4.7 confirma imports e relações.

### 68. README.md:100

**Observação:** A documentação afirma: "**Build independent microfrontends** that can be developed, tested, and deployed separately".

**Interpretação:** Afirma independência de desenvolvimento, teste e deploy; a 3.4.7 a corrobora com entradas e imagens próprias, sem URL de produção atribuída.

### 69. README.md:103

**Observação:** A documentação afirma: "**Deploy independently** without rebuilding the entire application".

**Interpretação:** A promessa de deploy sem reconstruir as demais aplicações é contradita pelo build do workspace inteiro nos Dockerfiles.

### 70. README.md:107

**Observação:** A documentação afirma: "**Module Federation**: Runtime code sharing between applications".

**Interpretação:** Nomeia Module Federation como compartilhamento de código entre aplicações em runtime, corroborado pelas relações host/remotes.

### 71. README.md:122-123

**Observação:** A documentação afirma: "Handles routing and navigation" / "Provides shared layout and error boundaries".

**Interpretação:** Descreve o papel do shell na navegação e no layout comum; a 3.4.7 confirma a tabela de rotas e sua estrutura envolvente.

### 72. README.md:507

**Observação:** A documentação afirma: "Builds all shared packages first".

**Interpretação:** O passo é contradito: os pacotes compartilhados não têm script `build`.

### 73. 7e00cd3 2026-05-29 (apps/shell/module-federation.config.js; apps/shell/module-federation.config.ts); b3c96cb 2026-05-29 (.docs/RUNNING.md)

**Observação:** Os arquivos `.js` e `.ts` da federação do shell entram juntos em `7e00cd3` e não mudam; já têm endpoints divergentes na introdução. O guia com o caminho sem `/dist` entra em `b3c96cb`, sem alteração posterior.

**Interpretação:** A divergência convive no snapshot desde a introdução dos arquivos, sem estágio anterior observado que explique a cópia obsoleta. A resolução do fluxo padrão permanece a registrada na 3.4.5.

### 74. 76d4857 2026-05-29 (README.md); 7e00cd3 2026-05-29 (apps/shell/module-federation.config.ts); a158918 2026-05-29 (infrastructure/kubernetes/); 599d40d 2026-05-29 (infrastructure/kubernetes/shell/index.yaml); ed07d0d 2026-05-29 (infrastructure/terraform/); 785290a 2026-05-29 (scripts/deploy.sh); 4db3303 2026-05-29 (.github/workflows/cd.yml)

**Observação:** O README antecede as aplicações e a infraestrutura. Kubernetes, Terraform, scripts e workflows entram depois; os placeholders e o `echo` do CD não são completados até o snapshot.

**Interpretação:** A prontidão anunciada e a infraestrutura incompleta coexistem desde a criação; não há retirada de uma implantação de produção observável no histórico do repositório.

### 75. 76d4857 2026-05-29 (README.md); 23b3cd7 2026-05-29 (apps/admin-mf/package.json); b51dc85 2026-05-29 (apps/auth-mf/package.json); 5c843e2 2026-05-29 (apps/dashboard-mf/package.json); 4187380 2026-05-29 (apps/messaging-mf/package.json); 31ac7bf 2026-05-29 (apps/shell/package.json); cefcdba 2026-05-29 (packages/sdk/package.json); 6437f4e 2026-05-29 (packages/shared/package.json); 40908b4 2026-05-29 (packages/types/package.json); b5a45f8 2026-05-29 (packages/ui/package.json)

**Observação:** Os manifestos das cinco aplicações declaram pacotes de workspace desde sua criação. Seus arquivos fonte não são alterados ou removidos depois de adicionados e nunca importam esses pacotes até o snapshot; os pacotes são adicionados depois das aplicações.

**Interpretação:** A ausência de uso não resulta de desconexão posterior de pacotes antes integrados; contextualiza a contradição da documentação.

### 76. 76d4857 2026-05-29 (README.md); de055a2 2026-05-29 (infrastructure/docker/production/Dockerfile.shell); 4da0ea3 2026-05-29 (infrastructure/nginx/nginx.conf)

**Observação:** O diagrama do README antecede o nginx e o Dockerfile de produção do shell. O `nginx.conf` é criado como servidor de arquivos estáticos com fallback e nunca é alterado.

**Interpretação:** O proxy reverso descrito não teve implementação observável anterior removida; a contradição é original à introdução dos artefatos.

### 77. 76d4857 2026-05-29 (README.md); 4c4be4f 2026-05-29 (apps/admin-mf/Dockerfile); 264b5f2 2026-05-29 (apps/auth-mf/Dockerfile); 452d4f3 2026-05-29 (apps/dashboard-mf/Dockerfile); 4187380 2026-05-29 (apps/messaging-mf/Dockerfile); adc6f0f 2026-05-29 (apps/shell/Dockerfile)

**Observação:** O README antecede os cinco Dockerfiles. Desde a criação, cada Dockerfile executa o build do workspace inteiro; nenhum é alterado até o snapshot.

**Interpretação:** A promessa de implantar sem reconstruir o restante não corresponde a um estágio anterior observável dos Dockerfiles.

### 78. 76d4857 2026-05-29 (README.md); 73d3333 2026-05-29 (turbo.json); cefcdba 2026-05-29 (packages/sdk/package.json); 6437f4e 2026-05-29 (packages/shared/package.json); 40908b4 2026-05-29 (packages/types/package.json); b5a45f8 2026-05-29 (packages/ui/package.json)

**Observação:** O README antecede os pacotes compartilhados. Os manifestos destes nunca têm script `build`; o `turbo.json` mantém `^build` desde sua criação.

**Interpretação:** O build dos pacotes descrito não corresponde a scripts anteriormente existentes no repositório; a discrepância não é uma regressão observada.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/admin-mf/package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8; declara #9 |
| 2 | 3.4.2 (apps/auth-mf/package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #11; declara #12 |
| 3 | 3.4.2 (apps/dashboard-mf/package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #14; declara #15 |
| 4 | 3.4.2 (apps/messaging-mf/package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #17; declara #18 |
| 5 | 3.4.2 (apps/shell/package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #20; declara #21 |
| 6 | 3.4.2 (package.json:30) | 1 tecnologia | manifesto | — | contexto | fraca | declara turbo.json:4-19; declara .github/workflows/ci.yml:25-26 |
| 7 | 3.4.2 #1 (Evidência (artefato:linha)); 3.4.3 #2 (Marcadores); 3.4.4 #2 (Observação); 3.4.5 #2 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #38 |
| 8 | 3.4.2 #1 (Evidência (artefato:linha)); 3.4.3 #2 (Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #38 |
| 9 | 3.4.2 #1 (Evidência (artefato:linha)); 3.4.3 #2 (Marcadores); 3.4.3 #2 (Build); 3.4.5 #2 (Configuração); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #38 |
| 10 | 3.4.2 #2 (Evidência (artefato:linha)); 3.4.3 #3 (Marcadores); 3.4.4 #1 (Observação); 3.4.5 #1 (Configuração); 3.4.7 #15 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #39 |
| 11 | 3.4.2 #2 (Evidência (artefato:linha)); 3.4.3 #3 (Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #39 |
| 12 | 3.4.2 #2 (Evidência (artefato:linha)); 3.4.3 #3 (Marcadores); 3.4.3 #3 (Build); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #2 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #39 |
| 13 | 3.4.2 #3 (Evidência (artefato:linha)); 3.4.3 #4 (Marcadores); 3.4.4 #3 (Observação); 3.4.5 #3 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #40 |
| 14 | 3.4.2 #3 (Evidência (artefato:linha)); 3.4.3 #4 (Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #40 |
| 15 | 3.4.2 #3 (Evidência (artefato:linha)); 3.4.3 #4 (Marcadores); 3.4.3 #4 (Build); 3.4.5 #3 (Configuração); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #40 |
| 16 | 3.4.2 #4 (Evidência (artefato:linha)); 3.4.3 #5 (Marcadores); 3.4.4 #4 (Observação); 3.4.5 #4 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #41 |
| 17 | 3.4.2 #4 (Evidência (artefato:linha)); 3.4.3 #5 (Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #41 |
| 18 | 3.4.2 #4 (Evidência (artefato:linha)); 3.4.3 #5 (Marcadores); 3.4.3 #5 (Build); 3.4.5 #4 (Configuração); 3.4.6 #4 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #41 |
| 19 | 3.4.2 #5 (Evidência (artefato:linha)); 3.4.3 #6 (Marcadores); 3.4.4 #1 (Observação); 3.4.4 #2 (Observação); 3.4.4 #3 (Observação); 3.4.4 #4 (Observação); 3.4.5 #1 (Configuração); 3.4.5 #2 (Configuração); 3.4.5 #3 (Configuração); 3.4.5 #4 (Configuração); 3.4.6 #1 (Onde é servida); 3.4.6 #2 (Onde é servida); 3.4.6 #3 (Onde é servida); 3.4.6 #4 (Onde é servida); 3.4.7 #1 (Evidência); 3.4.7 #6 (Evidência); 3.4.7 #8 (Evidência); 3.4.7 #15 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #47; configura #48; configura #49; configura #50 |
| 20 | 3.4.2 #5 (Evidência (artefato:linha)); 3.4.3 #6 (Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #42 |
| 21 | 3.4.2 #5 (Evidência (artefato:linha)); 3.4.3 #6 (Marcadores); 3.4.3 #6 (Build); 3.4.4 #1 (Observação); 3.4.5 #1 (Configuração); 3.4.5 #2 (Configuração); 3.4.5 #3 (Configuração); 3.4.5 #4 (Configuração); 3.4.6 #5 (Artefatos); 3.4.7 #2 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #42 |
| 22 | 3.4.3 #2 (Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #38 |
| 23 | 3.4.3 #3 (Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #39 |
| 24 | 3.4.3 #4 (Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #40 |
| 25 | 3.4.3 #5 (Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #41 |
| 26 | 3.4.3 #6 (Marcadores) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #47; configura #48; configura #49; configura #50 |
| 27 | 3.4.4 (src-remote-import, apps/shell/src/App.tsx:7) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #47 |
| 28 | 3.4.4 (src-remote-import, apps/shell/src/App.tsx:8) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #48 |
| 29 | 3.4.4 (src-remote-import, apps/shell/src/App.tsx:9) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #49 |
| 30 | 3.4.4 (src-remote-import, apps/shell/src/App.tsx:10) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #50 |
| 31 | 3.4.4 (src-async-bootstrap, apps/shell/src/main.tsx:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 32 | 3.4.4 (manual host-relationship, apps/shell/src/App.tsx:24) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #47; implementa #48; implementa #49; implementa #50 |
| 33 | 3.4.4 (manual runtime-composition, apps/shell/src/App.tsx:41) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #47 |
| 34 | 3.4.4 (manual runtime-composition, apps/shell/src/App.tsx:51) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #48 |
| 35 | 3.4.4 (manual runtime-composition, apps/shell/src/App.tsx:61) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #49 |
| 36 | 3.4.4 (manual runtime-composition, apps/shell/src/App.tsx:71) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #50 |
| 37 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 38 | 3.4.3 (apps/admin-mf) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 39 | 3.4.3 (apps/auth-mf) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 40 | 3.4.3 (apps/dashboard-mf) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 41 | 3.4.3 (apps/messaging-mf) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 42 | 3.4.3 (apps/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 43 | 3.4.3 (packages/sdk) | 4 estrutura | diretório | — | contexto | fraca | — |
| 44 | 3.4.3 (packages/shared) | 4 estrutura | diretório | — | contexto | fraca | — |
| 45 | 3.4.3 (packages/types) | 4 estrutura | diretório | — | contexto | fraca | — |
| 46 | 3.4.3 (packages/ui) | 4 estrutura | diretório | — | contexto | fraca | — |
| 47 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #39 |
| 48 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #38 |
| 49 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #40 |
| 50 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #41 |
| 51 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #38 |
| 52 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #39 |
| 53 | 3.4.6 #3 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #40 |
| 54 | 3.4.6 #4 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #41 |
| 55 | 3.4.6 #5 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #42 |
| 56 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #27; corrobora #28; corrobora #29; corrobora #30 |
| 57 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #38; corrobora #39; corrobora #40; corrobora #41; corrobora #42 |
| 58 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #33; corrobora #34; corrobora #35; corrobora #36 |
| 59 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora apps/shell/src/components/RemoteHealthCheck.tsx:11-16; corrobora apps/shell/src/components/RemoteHealthCheck.tsx:24-58 |
| 60 | 3.4.7 #5 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #47; corrobora #48; corrobora #49; corrobora #50 |
| 61 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #19; contradiz apps/shell/src/components/RemoteHealthCheck.tsx:12 |
| 62 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #51; corrobora #52; corrobora #53; corrobora #54; corrobora #55; corrobora turbo.json:5-8 |
| 63 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | contradiz .github/workflows/cd.yml:14-15; contradiz #55; contradiz #52 |
| 64 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | contradiz apps/auth-mf/src/bootstrap.tsx:1-3 |
| 65 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | contradiz infrastructure/nginx/nginx.conf:9-18 |
| 66 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #51; corrobora #52; corrobora #53; corrobora #54; corrobora #55 |
| 67 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #47; corrobora #48; corrobora #49; corrobora #50 |
| 68 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #38; corrobora #39; corrobora #40; corrobora #41; corrobora #42; corrobora #51; corrobora #52; corrobora #53; corrobora #54; corrobora #55 |
| 69 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #51 |
| 70 | 3.4.7 #15 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #47; corrobora #48; corrobora #49; corrobora #50 |
| 71 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #32; corrobora apps/shell/src/App.tsx:15-23; corrobora apps/shell/src/App.tsx:77-78 |
| 72 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #43; contradiz #44; contradiz #45; contradiz #46 |
| 73 | 3.4.8 #1 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #26; explica #19; explica #61 |
| 74 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #63; explica #55 |
| 75 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #64 |
| 76 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #65; explica #55 |
| 77 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #69; explica #51; explica #52; explica #53; explica #54; explica #55 |
| 78 | 3.4.8 #6 | 8 histórico | histórico | — | contexto | fraca | explica #72; explica #43; explica #44; explica #45; explica #46 |

## Resumo

Observações: 78. Dimensões (tecnologia: 6, configuração: 20, código: 10, estrutura: 10, composição: 4, build-deploy: 5, documentação: 17, histórico: 6). Força (forte: 11, moderada: 32, fraca: 35, ambígua: 0). Evidência (tecnológica: 24, arquitetural: 47, contexto: 7).
