---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
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

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Leitura do repositório

As quatro aplicações Vue têm entrada e build próprios (#13–#16, #21–#24). A cadeia de composição começa nas declarações do plugin (#1–#4), passa pelas configurações federadas (#6–#9) e chega ao import `dashboard/Widget` e à sua renderização no shell (#10–#11). Essa cadeia sustenta a relação ativa shell → Dashboard (#18). O host configura também CMS e Kanban, mas nenhum código os consome: as relações permanecem declaradas e inativas (#19–#20). O nome `dashboard_app` do produtor difere da chave `dashboard` no host; a resolução registrada se faz pela URL e pelo módulo exposto (#7–#8, #18).

A raiz coordena o workspace e o UI Kit é biblioteca, sem serem unidades frontend (#12, #17). O Turbo declarado e os scripts de coordenação não demonstram composição, e o Undetermined da dependência permanece (#5). Os quatro builds são separados, mas não há deploy observado nem versionamento independente; URLs localhost e preview não comprovam publicação (#21–#24). A promessa documental de implantação independente fica sem corroboração (#47).

A documentação confirma a organização host/remotes, a carga do Dashboard e o compartilhamento configurado de Vue (#25–#26, #28–#31), mas excede o código ao anunciar carga de CMS e Kanban, integração completa, estado, autenticação e roteamento compartilhados (#27, #32–#33, #42, #44–#46). O kit só é consumido pelo shell, contrariando as setas dos remotes e o HMR prometido para as quatro apps (#34–#37, #48). Bibliotecas anunciadas estão ausentes e a versão Vite 6 diverge dos manifestos (#40–#41). Essas afirmações são fracas, mesmo quando corroboradas: sozinhas não configuram nem implementam a composição.

O histórico situa as promessas antes do código e esclarece as desconexões de CMS/Kanban e as divergências do kit e das bibliotecas (#49–#53). A falta de blobs antigos limita a reconstrução. Só a versão passada do Vite permanece inconclusiva; isso não afeta a leitura do snapshot (#54). A ambiguidade tecnológica registrada para Turbo não deixa em aberto a cadeia federada efetivamente implementada.

## Observações

### 1. apps/cms/package.json:18

**Observação:** o manifesto de cms declara `@originjs/vite-plugin-federation: ^1.4.1` em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation; o resultado Configurada Yes da revisão tem sua configuração classificada separadamente.

### 2. apps/dashboard/package.json:18

**Observação:** o manifesto de dashboard declara `@originjs/vite-plugin-federation: ^1.4.1` em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation; o resultado Configurada Yes da revisão tem sua configuração classificada separadamente.

### 3. apps/kanban/package.json:18

**Observação:** o manifesto de kanban declara `@originjs/vite-plugin-federation: ^1.4.1` em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation; o resultado Configurada Yes da revisão tem sua configuração classificada separadamente.

### 4. apps/shell/package.json:16

**Observação:** o manifesto de shell declara `@originjs/vite-plugin-federation: ^1.4.1` em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation; o resultado Configurada Yes da revisão tem sua configuração classificada separadamente.

### 5. package.json:18

**Observação:** o manifesto da raiz declara `turbo: ^2.6.1` em `devDependencies`.

**Interpretação:** É um sinal de coordenação de monorepo. A 3.4.2 registra Configurada Undetermined porque os scripts não contam como uso naquela etapa: a declaração pode corresponder apenas à preparação da ferramenta ou ao seu uso por esses scripts. Nenhuma dessas leituras estabelece, sozinha, unidades frontend nem composição.

### 6. apps/cms/vite.config.ts:3,16-23

**Observação:** o plugin `federation` declara `cms_app`, `remoteEntry.js`, expõe `./Cms` de `./src/App.vue` e compartilha `vue`.

**Interpretação:** Configura o mecanismo federado numa unidade produtora, sem nomear o consumidor.

### 7. apps/shell/vite.config.ts:4,19-27

**Observação:** o plugin `federation` nomeia o host `shell`, resolve `dashboard`, `cms` e `kanban` pelos endereços `http://localhost:5001/assets/remoteEntry.js`, `http://localhost:5002/assets/remoteEntry.js` e `http://localhost:5003/assets/remoteEntry.js`, e compartilha `vue`.

**Interpretação:** A configuração liga explicitamente o host a três remotes; sozinha não prova consumo dos três pelo código.

### 8. apps/dashboard/vite.config.ts:3,18-25

**Observação:** o plugin `federation` declara `dashboard_app`, gera `remoteEntry.js`, expõe `./Widget` de `./src/components/WidgetDinero.vue` e compartilha `vue`.

**Interpretação:** Parametriza um produtor federado e o módulo oferecido, sem nomear consumidor.

### 9. apps/kanban/vite.config.ts:3,16-23

**Observação:** o plugin `federation` declara `kanban_app`, gera `remoteEntry.js`, expõe `./Kanban` de `./src/App.vue` e compartilha `vue`.

**Interpretação:** Parametriza um produtor federado, sem declarar consumidor.

### 10. apps/shell/src/App.vue:2,5-7,21-28; apps/shell/src/main.ts:3-5; apps/shell/index.html:11; apps/shell/vite.config.ts:22; apps/dashboard/vite.config.ts:19-23; apps/shell/src/vite-env.d.ts:3-7

**Observação:** `defineAsyncComponent` importa `dashboard/Widget`; o especificador corresponde à chave do host e à exposição `./Widget` do Dashboard. O componente aparece no App montado pela entrada do shell.

**Interpretação:** O carregamento nomeia diretamente outra unidade e participa da composição federada em runtime.

### 11. apps/shell/src/App.vue:21-28; apps/shell/src/App.vue:5-7; apps/shell/src/main.ts:3-5

**Observação:** o template renderiza `<DashboardWidget />` dentro de `Suspense`, com fallback; a variável é o componente assíncrono importado de `dashboard/Widget`.

**Interpretação:** A renderização materializa o mecanismo preparado pelo import. A linha renderiza uma variável local, sem nomear diretamente o destino remoto.

### 12. .; package.json:1-20

**Observação:** a raiz tem manifesto com scripts `turbo dev`, `turbo build`, `turbo lint` e `dev:hybrid`, sem entrada de UI nem build próprio.

**Interpretação:** É coordenação do workspace, marcada Unidade frontend No; não constitui aplicação frontend.

### 13. apps/cms; apps/cms/package.json:1-26; apps/cms/index.html:10-11; apps/cms/src/main.ts:3-5; apps/cms/vite.config.ts:6-32; pnpm-workspace.yaml:2

**Observação:** `apps/cms` tem manifesto próprio, HTML que carrega `src/main.ts`, entrada que monta `App` em `#app`, configuração Vite própria e script `vue-tsc -b && vite build`. Integra `apps/*` no workspace.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios, marcada Yes na revisão estrutural. Esse limite sozinho não demonstra a organização completa de MFE.

### 14. apps/dashboard; apps/dashboard/package.json:1-26; apps/dashboard/index.html:10-11; apps/dashboard/src/main.ts:3-5; apps/dashboard/vite.config.ts:6-34; pnpm-workspace.yaml:2

**Observação:** `apps/dashboard` tem manifesto próprio, HTML que carrega `src/main.ts`, entrada que monta `App` em `#app`, configuração Vite própria e script `vue-tsc -b && vite build`. Integra `apps/*` no workspace.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios, marcada Yes na revisão estrutural. Esse limite sozinho não demonstra a organização completa de MFE.

### 15. apps/kanban; apps/kanban/package.json:1-26; apps/kanban/index.html:10-11; apps/kanban/src/main.ts:3-5; apps/kanban/vite.config.ts:6-32; pnpm-workspace.yaml:2

**Observação:** `apps/kanban` tem manifesto próprio, HTML que carrega `src/main.ts`, entrada que monta `App` em `#app`, configuração Vite própria e script `vue-tsc -b && vite build`. Integra `apps/*` no workspace.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios, marcada Yes na revisão estrutural. Esse limite sozinho não demonstra a organização completa de MFE.

### 16. apps/shell; apps/shell/package.json:1-26; apps/shell/index.html:10-11; apps/shell/src/main.ts:3-5; apps/shell/vite.config.ts:7-35; pnpm-workspace.yaml:2

**Observação:** `apps/shell` tem manifesto próprio, HTML que carrega `src/main.ts`, entrada que monta `App` em `#app`, configuração Vite própria e script `vue-tsc -b && vite build`. Integra `apps/*` no workspace.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios, marcada Yes na revisão estrutural. Esse limite sozinho não demonstra a organização completa de MFE.

### 17. packages/ui-kit; packages/ui-kit/package.json:1-21; packages/ui-kit/src/index.ts:1-4; pnpm-workspace.yaml:3

**Observação:** o pacote `@repo/ui-kit` exporta `MyButton` e `setupMsg`; só tem script `lint`, sem entrada de aplicação nem build.

**Interpretação:** É biblioteca de componentes do workspace, marcada Unidade frontend No. Seu compartilhamento não equivale a composição entre aplicações.

### 18. apps/shell/vite.config.ts:22; apps/dashboard/vite.config.ts:18-25; apps/shell/src/App.vue:5-7,21-28

**Observação:** o shell declara o remote `dashboard` por URL de `remoteEntry.js`; `apps/dashboard` declara esse arquivo e expõe `./Widget`. O shell importa e renderiza `dashboard/Widget`.

**Interpretação:** A relação host → remote está ativa no snapshot, com ligação explícita e consumo em código.

### 19. apps/shell/vite.config.ts:23; apps/cms/vite.config.ts:16-23

**Observação:** o shell declara o remote `cms` por URL de `remoteEntry.js`; `apps/cms` declara esse arquivo e expõe `./Cms`. Não há import nem renderização de `cms` no shell, conforme a relação Ativa No da 3.4.5.

**Interpretação:** A relação host → remote está configurada, mas não participa da composição executada pelo código no snapshot.

### 20. apps/shell/vite.config.ts:24; apps/kanban/vite.config.ts:16-23

**Observação:** o shell declara o remote `kanban` por URL de `remoteEntry.js`; `apps/kanban` declara esse arquivo e expõe `./Kanban`. Não há import nem renderização de `kanban` no shell, conforme a relação Ativa No da 3.4.5.

**Interpretação:** A relação host → remote está configurada, mas não participa da composição executada pelo código no snapshot.

### 21. apps/cms/package.json:3-10; apps/cms/vite.config.ts:16-23; package.json:8; turbo.json:8-11

**Observação:** `apps/cms` define `vue-tsc -b && vite build`; a raiz delega por `turbo build`, com saída `dist/**` por pacote. A configuração federada gera o seu `remoteEntry.js`. A revisão registra Build separado, Deploy não observado e Versionamento No; os servidores são locais, sem artefato de publicação.

**Interpretação:** O build confirma uma fronteira própria de aplicação. Não há evidência de implantação ou versionamento independente.

### 22. apps/dashboard/package.json:3-10; apps/dashboard/vite.config.ts:18-25; package.json:8; turbo.json:8-11

**Observação:** `apps/dashboard` define `vue-tsc -b && vite build`; a raiz delega por `turbo build`, com saída `dist/**` por pacote. A configuração federada gera o seu `remoteEntry.js`. A revisão registra Build separado, Deploy não observado e Versionamento No; os servidores são locais, sem artefato de publicação.

**Interpretação:** O build confirma uma fronteira própria de aplicação. Não há evidência de implantação ou versionamento independente.

### 23. apps/kanban/package.json:3-10; apps/kanban/vite.config.ts:16-23; package.json:8; turbo.json:8-11

**Observação:** `apps/kanban` define `vue-tsc -b && vite build`; a raiz delega por `turbo build`, com saída `dist/**` por pacote. A configuração federada gera o seu `remoteEntry.js`. A revisão registra Build separado, Deploy não observado e Versionamento No; os servidores são locais, sem artefato de publicação.

**Interpretação:** O build confirma uma fronteira própria de aplicação. Não há evidência de implantação ou versionamento independente.

### 24. apps/shell/package.json:3-10; apps/shell/vite.config.ts:19-27; package.json:8; turbo.json:8-11

**Observação:** `apps/shell` define `vue-tsc -b && vite build`; a raiz delega por `turbo build`, com saída `dist/**` por pacote. O host incorpora as URLs locais dos remotes. A revisão registra Build separado, Deploy não observado e Versionamento No; os servidores são locais, sem artefato de publicação.

**Interpretação:** O build confirma uma fronteira própria de aplicação. Não há evidência de implantação ou versionamento independente.

### 25. README.mkd:3; apps/cms/package.json:18; apps/dashboard/package.json:18; apps/kanban/package.json:18; apps/shell/package.json:16; apps/cms; apps/cms/package.json:1-26; apps/cms/index.html:10-11; apps/cms/src/main.ts:3-5; apps/cms/vite.config.ts:6-32; pnpm-workspace.yaml:2; apps/dashboard; apps/dashboard/package.json:1-26; apps/dashboard/index.html:10-11; apps/dashboard/src/main.ts:3-5; apps/dashboard/vite.config.ts:6-34; apps/kanban; apps/kanban/package.json:1-26; apps/kanban/index.html:10-11; apps/kanban/src/main.ts:3-5; apps/kanban/vite.config.ts:6-32; apps/shell; apps/shell/package.json:1-26; apps/shell/index.html:10-11; apps/shell/src/main.ts:3-5; apps/shell/vite.config.ts:7-35; apps/shell/vite.config.ts:22; apps/dashboard/vite.config.ts:18-25; apps/shell/src/App.vue:5-7,21-28

**Observação:** o README afirma: “Un ecosistema de Arquitectura Microfrontend [...] construido con Vue 3, Vite y Module Federation” (ecossistema de arquitetura microfrontend construído com Vue 3, Vite e Module Federation).

**Interpretação:** A descrição situa tecnologias e o conjunto de aplicações. A 3.4.7 a registra como corroborada pela cadeia federada e pelas unidades, sem medir desempenho.

### 26. README.mkd:5; apps/cms; apps/cms/package.json:1-26; apps/cms/index.html:10-11; apps/cms/src/main.ts:3-5; apps/cms/vite.config.ts:6-32; pnpm-workspace.yaml:2; apps/dashboard; apps/dashboard/package.json:1-26; apps/dashboard/index.html:10-11; apps/dashboard/src/main.ts:3-5; apps/dashboard/vite.config.ts:6-34; apps/kanban; apps/kanban/package.json:1-26; apps/kanban/index.html:10-11; apps/kanban/src/main.ts:3-5; apps/kanban/vite.config.ts:6-32; apps/shell; apps/shell/package.json:1-26; apps/shell/index.html:10-11; apps/shell/src/main.ts:3-5; apps/shell/vite.config.ts:7-35

**Observação:** o README afirma: “aplicaciones verticales independientes” (aplicações verticais independentes).

**Interpretação:** A independência descrita tem corroboração nas entradas e scripts próprios das quatro unidades; não demonstra por si implantação independente.

### 27. README.mkd:5; apps/shell/src/App.vue:2-7,14-15; apps/dashboard/src/components/WidgetDinero.vue:1-19; apps/cms/src/App.vue:1-10; apps/kanban/src/App.vue:1-10

**Observação:** o README afirma: “comparten diseño, lógica y estado” (compartilham design, lógica e estado).

**Interpretação:** É uma afirmação de compartilhamento entre unidades, contradita na revisão: só o shell consome o kit e o estado do widget é local.

### 28. README.mkd:9; apps/shell/vite.config.ts:4,19-27; apps/shell/vite.config.ts:22; apps/dashboard/vite.config.ts:18-25; apps/shell/src/App.vue:5-7,21-28; apps/shell/vite.config.ts:23; apps/cms/vite.config.ts:16-23; apps/shell/vite.config.ts:24; apps/kanban/vite.config.ts:16-23

**Observação:** o README afirma: “El sistema utiliza el patrón Host (Shell) + Remotes” (o sistema usa o padrão host/shell e remotos).

**Interpretação:** Descreve a organização host/remotes, corroborada pela configuração e pelas três relações registradas.

### 29. README.mkd:9; apps/shell/src/App.vue:2,5-7,21-28; apps/shell/src/main.ts:3-5; apps/shell/index.html:11; apps/shell/vite.config.ts:22; apps/dashboard/vite.config.ts:19-23; apps/shell/src/vite-env.d.ts:3-7; apps/shell/src/App.vue:21-28; apps/shell/src/App.vue:5-7

**Observação:** o README afirma: “cargando los microfrontends bajo demanda (Lazy Loading)” (carregando os microfrontends sob demanda).

**Interpretação:** Descreve carga sob demanda entre unidades, corroborada pelo import assíncrono e pela renderização do Dashboard; não confirma consumo de todos os remotes.

### 30. README.mkd:9; apps/cms/vite.config.ts:3,16-23; apps/shell/vite.config.ts:4,19-27; apps/dashboard/vite.config.ts:3,18-25; apps/kanban/vite.config.ts:3,16-23

**Observação:** o README afirma: “compartiendo dependencias críticas para optimizar el bundle size” (compartilhando dependências críticas para otimizar o tamanho do bundle).

**Interpretação:** A afirmação sobre compartilhamento de dependências é corroborada por `shared: ["vue"]` nas quatro configurações. Não há medição de otimização do bundle.

### 31. README.mkd:25; apps/shell/vite.config.ts:22; apps/dashboard/vite.config.ts:18-25; apps/shell/src/App.vue:5-7,21-28; apps/shell/src/App.vue:2,5-7,21-28; apps/shell/src/main.ts:3-5; apps/shell/index.html:11; apps/dashboard/vite.config.ts:19-23; apps/shell/src/vite-env.d.ts:3-7; apps/shell/src/App.vue:21-28; apps/shell/src/App.vue:5-7

**Observação:** o README afirma: “Shell -->\|Carga Remota\| Dashboard” (shell carrega remotamente Dashboard).

**Interpretação:** A aresta documental é corroborada pela relação ativa e pelo código que carrega o widget.

### 32. README.mkd:26; apps/shell/vite.config.ts:23; apps/cms/vite.config.ts:16-23; apps/shell/src/App.vue:1-33

**Observação:** o README afirma: “Shell -->\|Carga Remota\| CMS” (shell carrega remotamente CMS).

**Interpretação:** A seta promete carga efetiva, mas a revisão a registra como contradita: a relação com CMS é declarada e inativa.

### 33. README.mkd:27; apps/shell/vite.config.ts:24; apps/kanban/vite.config.ts:16-23; apps/shell/src/App.vue:1-33

**Observação:** o README afirma: “Shell -->\|Carga Remota\| Kanban” (shell carrega remotamente Kanban).

**Interpretação:** A seta promete carga efetiva, mas a revisão a registra como contradita: a relação com Kanban é declarada e inativa.

### 34. README.mkd:29; apps/shell/package.json:12; apps/shell/src/App.vue:3,14-15

**Observação:** o README afirma: “Shell -.->\|Consume\| UIKit” (o shell consome o UI Kit).

**Interpretação:** O consumo da biblioteca pelo shell é corroborado pelo import estático e pela dependência de workspace. Trata de reutilização local, sem mecanismo de composição de MFE.

### 35. README.mkd:30; apps/dashboard/package.json:12-16; apps/dashboard/src/App.vue:1-10; apps/dashboard/src/components/WidgetDinero.vue:1-19

**Observação:** o README afirma: “Dashboard -.->\|Consume\| UIKit” (o Dashboard consome o UI Kit).

**Interpretação:** A revisão registra a seta como contradita: o Dashboard não declara o kit nem importa seus componentes; a varredura de CSS não estabelece esse consumo.

### 36. README.mkd:31; apps/cms/package.json:12-16; apps/cms/src/App.vue:1-10

**Observação:** o README afirma: “CMS -.->\|Consume\| UIKit” (o CMS consome o UI Kit).

**Interpretação:** A revisão registra a seta como contradita: o CMS não declara nem importa o kit.

### 37. README.mkd:32; apps/kanban/package.json:12-16; apps/kanban/src/App.vue:1-10

**Observação:** o README afirma: “Kanban -.->\|Consume\| UIKit” (o Kanban consome o UI Kit).

**Interpretação:** A revisão registra a seta como contradita: o Kanban não declara nem importa o kit.

### 38. README.mkd:40; package.json:7-10,18; turbo.json:3-13; pnpm-workspace.yaml:1-3

**Observação:** o README afirma: “Turborepo para la orquestación de tareas y pnpm workspaces” (Turborepo para orquestrar tarefas e pnpm workspaces).

**Interpretação:** A afirmação de coordenação do workspace é corroborada pelos scripts e pelas tasks; não constitui unidade frontend nem composição. O Undetermined da dependência Turbo permanece.

### 39. README.mkd:44-51; apps/cms; apps/cms/package.json:1-26; apps/cms/index.html:10-11; apps/cms/src/main.ts:3-5; apps/cms/vite.config.ts:6-32; pnpm-workspace.yaml:2; apps/dashboard; apps/dashboard/package.json:1-26; apps/dashboard/index.html:10-11; apps/dashboard/src/main.ts:3-5; apps/dashboard/vite.config.ts:6-34; apps/kanban; apps/kanban/package.json:1-26; apps/kanban/index.html:10-11; apps/kanban/src/main.ts:3-5; apps/kanban/vite.config.ts:6-32; apps/shell; apps/shell/package.json:1-26; apps/shell/index.html:10-11; apps/shell/src/main.ts:3-5; apps/shell/vite.config.ts:7-35

**Observação:** o README afirma: “apps/ [...] Shell [...] Dashboard [...] CMS [...] Kanban” (quatro aplicações em apps/).

**Interpretação:** A divisão em quatro aplicações é corroborada pelas quatro unidades frontend da revisão estrutural.

### 40. README.mkd:54-57; packages/ui-kit; packages/ui-kit/package.json:1-21; packages/ui-kit/src/index.ts:1-4; pnpm-workspace.yaml:3; packages/ui-kit/tsconfig.json:1-19

**Observação:** o README afirma: “Librerías Compartidas [...] @repo/ui-kit [...] @repo/utils [...] Configuración TS” (bibliotecas compartilhadas: UI Kit, utils e configuração TS).

**Interpretação:** A descrição das bibliotecas de apoio é contradita: só ui-kit está presente; utils e o pacote de configuração TS não existem no snapshot. Não descreve unidades frontend.

### 41. README.mkd:68; apps/cms/package.json:23; apps/dashboard/package.json:23; apps/kanban/package.json:23; apps/shell/package.json:23

**Observação:** o README afirma: “Build Tool: Vite 6”.

**Interpretação:** A versão anunciada do builder é contradita pelos manifestos que declaram Vite ^7.2.4. A versão da ferramenta não estabelece composição.

### 42. README.mkd:73; apps/shell/package.json:11-25; apps/cms/package.json:12-25; apps/dashboard/package.json:12-25; apps/kanban/package.json:12-25; apps/dashboard/src/components/WidgetDinero.vue:2-4,12

**Observação:** o README afirma: “State Management: Pinia (Shared State)”.

**Interpretação:** A afirmação nomeia compartilhamento de estado, mas é contradita pela ausência de Pinia nos manifestos e pelo estado local do widget; não prova um mecanismo compartilhado implementado.

### 43. README.mkd:91; package.json:7; turbo.json:4-7; apps/cms/package.json:7; apps/dashboard/package.json:7; apps/kanban/package.json:7; apps/shell/package.json:7

**Observação:** o README afirma: “Turborepo lanzará las 4 aplicaciones en paralelo” (Turborepo iniciará as quatro aplicações em paralelo).

**Interpretação:** A execução conjunta das quatro aplicações é corroborada pelos scripts Vite e pela task dev, sem validação de execução federada. Situa o conjunto de unidades frontend.

### 44. README.mkd:99; apps/shell/vite.config.ts:23; apps/cms/vite.config.ts:16-23; apps/shell/vite.config.ts:24; apps/kanban/vite.config.ts:16-23; apps/shell/src/App.vue:1-33

**Observação:** o README afirma: “Entra aquí para ver la integración completa” (entre aqui para ver a integração completa).

**Interpretação:** A integração completa é contradita: o shell renderiza só o Dashboard e o botão local, com CMS e Kanban inativos.

### 45. README.mkd:117-119; apps/shell/src/App.vue:1-33; apps/shell/src/main.ts:1-5; apps/cms/src/App.vue:1-10; apps/kanban/src/App.vue:1-10; apps/dashboard/src/components/WidgetDinero.vue:1-19

**Observação:** o README afirma: “Maneja [...] Autenticación (JWT compartido)” (o shell gerencia autenticação com JWT compartilhado).

**Interpretação:** A afirmação promete sessão compartilhada entre unidades, contradita pelo código mínimo do shell e dos remotes, sem autenticação JWT.

### 46. README.mkd:120; apps/shell/src/App.vue:1-33; apps/shell/src/main.ts:1-5; apps/shell/package.json:11-25

**Observação:** o README afirma: “Enrutamiento raíz” (roteamento raiz no shell).

**Interpretação:** A responsabilidade de roteamento atribuída ao host é contradita: a entrada monta App e este renderiza o widget diretamente, sem roteador.

### 47. README.mkd:150

**Observação:** o README afirma: “Cada equipo puede desplegar su microfrontend (Dashboard, CMS) sin afectar al Shell ni a los otros módulos” (cada equipe pode implantar seu microfrontend sem afetar o shell ou os demais módulos).

**Interpretação:** A afirmação trata de implantação independente das unidades, mas a 3.4.7 a registra sem corroboração. Builds separados e preview local não demonstram essa propriedade.

### 48. README.mkd:152; apps/shell/src/App.vue:3,14-15; apps/cms/package.json:12-16; apps/dashboard/package.json:12-16; apps/kanban/package.json:12-16

**Observação:** o README afirma: “ver el cambio reflejado instantáneamente en las 4 apps gracias al Hot Module Replacement (HMR) unificado” (ver a alteração do UI Kit nas quatro apps graças ao HMR unificado).

**Interpretação:** O efeito prometido nas quatro aplicações é contradito pelo consumo do kit só no shell; a orquestração de dev não cria consumidores nos remotes.

### 49. e3cc334 2025-11-28 (.turbo/, turbo.json); 816fe78 2025-11-29 (.turbo/cookies/1.cookie); 80a16ce 2025-11-29 (.turbo/)

**Observação:** a revisão histórica registra `.turbo/` no primeiro commit, com cookies e log vazio datado de 2025-11-27, e sua remoção em dois commits; `turbo.json` preserva o mesmo objeto e não surge automação externa aos scripts.

**Interpretação:** O ponto esclarece vestígios de execução local do Turbo, sem identificar o script executado. Não altera o Undetermined da 3.4.2 nem demonstra composição.

### 50. e3cc334 2025-11-28 (apps/*/vite.config.ts, apps/shell/src/App.vue); 5244640 2025-11-28 (README.mkd); 13859fe 2025-11-29 (apps/*/vite.config.ts, apps/shell/src/vite-env.d.ts); ea611b1 2025-11-29 (apps/shell/src/App.vue)

**Observação:** a revisão situa o README antes da configuração diferenciada dos remotes; depois dessa configuração, o App do shell só tem a versão que carrega Dashboard, sem inclusão ou remoção de carga de CMS e Kanban.

**Interpretação:** O ponto esclarece que CMS e Kanban permaneceram declarados e não conectados no histórico observável; não são ligações abandonadas confirmadas por código anterior. Os blobs antigos tentados estavam ausentes, limite preservado nesta leitura.

### 51. e3cc334 2025-11-28 (apps/*/src/main.ts); 5244640 2025-11-28 (README.mkd); 280cc20 2025-11-29 (apps/*/package.json)

**Observação:** a revisão registra que nenhum commit criou arquivos de store, roteador ou autenticação; as entradas são os mesmos objetos até o snapshot. O README antecede os componentes específicos, e o conteúdo anterior dos manifestos não está disponível.

**Interpretação:** Esclarece as promessas de estado, JWT e roteamento como descrição anterior ao código no histórico observável, sem provar dependências antigas. Não sustenta sozinha a arquitetura.

### 52. e3cc334 2025-11-28 (packages/ui-kit/index.ts, apps/*/src/App.vue); ea611b1 2025-11-29 (packages/ui-kit/src/MyButton.vue, apps/*/src/App.vue); 29967bf 2025-11-29 (apps/*/src/style.css); 280cc20 2025-11-29 (apps/*/package.json)

**Observação:** a revisão registra a criação dos componentes do kit e a preservação, nos remotes, das versões de App sem imports do kit; o widget também tem uma única versão. As folhas de estilo referenciam o kit, e o conteúdo anterior dos manifestos está indisponível.

**Interpretação:** Esclarece que os componentes do kit não tiveram consumo pelos remotes após sua criação no histórico observável. O compartilhamento de CSS não confirma as promessas de consumo e HMR nas quatro apps.

### 53. 5244640 2025-11-28 (README.mkd)

**Observação:** a revisão registra o anúncio de `@repo/utils` e configuração TS no README e a ausência desses pacotes na lista de caminhos de todos os commits até o snapshot; sob packages só aparece ui-kit.

**Interpretação:** Esclarece que as duas bibliotecas foram anunciadas, sem estágio observável em que existissem ou fossem removidas. São contexto de bibliotecas de apoio.

### 54. e3cc334 2025-11-28 (apps/*/package.json); 5244640 2025-11-28 (README.mkd); 280cc20 2025-11-29 (apps/*/package.json)

**Observação:** a revisão registra duas versões dos manifestos, sem conteúdo disponível da primeira. O README anuncia Vite 6 e os manifestos do snapshot declaram ^7.2.4; não foi possível saber a versão quando o README entrou.

**Interpretação:** O ponto é inconclusivo apenas quanto ao passado. A divergência no snapshot está clara e não deixa ambígua a composição atual; por isso sua força é fraca.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/cms/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 2 | 3.4.2 (apps/dashboard/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8 |
| 3 | 3.4.2 (apps/kanban/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #9 |
| 4 | 3.4.2 (apps/shell/package.json:16) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #7 |
| 5 | 3.4.2 (package.json:18) | 1 tecnologia | manifesto | — | contexto | ambígua | — |
| 6 | 3.4.2 (apps/cms/package.json:18, Evidência); 3.4.3 (apps/cms, Marcadores e Build); 3.4.5 #2 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #6 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #13; configura #19 |
| 7 | 3.4.2 (apps/cms/package.json:18, Evidência); 3.4.2 (apps/kanban/package.json:18, Evidência); 3.4.2 (apps/shell/package.json:16, Evidência); 3.4.3 (apps/shell, Marcadores e Build); 3.4.4 (src-remote-import, Observação); 3.4.5 #1, #2, #3 (Configuração); 3.4.6 #1, #2, #3 (Onde é servida), #4 (Artefatos); 3.4.7 #4, #6, #8, #9 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #10; configura #16; configura #18; configura #19; configura #20 |
| 8 | 3.4.2 (apps/dashboard/package.json:18, Evidência); 3.4.3 (apps/dashboard, Marcadores e Build); 3.4.4 (src-remote-import, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #6 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #10; configura #14; configura #18 |
| 9 | 3.4.2 (apps/kanban/package.json:18, Evidência); 3.4.3 (apps/kanban, Marcadores e Build); 3.4.5 #3 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #6 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #15; configura #20 |
| 10 | 3.4.4 (src-remote-import, apps/shell/src/App.vue:6) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #18 |
| 11 | 3.4.4 (manual, apps/shell/src/App.vue:23) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #18 |
| 12 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 13 | 3.4.3 (apps/cms) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 14 | 3.4.3 (apps/dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 15 | 3.4.3 (apps/kanban) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 16 | 3.4.3 (apps/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 17 | 3.4.3 (packages/ui-kit) | 4 estrutura | diretório | — | contexto | fraca | — |
| 18 | 3.4.5 #1 | 5 composição | configuração | module-federation | arquitetural | forte | liga #16; liga #14 |
| 19 | 3.4.5 #2 | 5 composição | configuração | module-federation | arquitetural | moderada | liga #16; liga #13 |
| 20 | 3.4.5 #3 | 5 composição | configuração | module-federation | arquitetural | moderada | liga #16; liga #15 |
| 21 | 3.4.6 #1 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #13 |
| 22 | 3.4.6 #2 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #14 |
| 23 | 3.4.6 #3 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #15 |
| 24 | 3.4.6 #4 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #16 |
| 25 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4; corrobora #13; corrobora #14; corrobora #15; corrobora #16; corrobora #18 |
| 26 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #13; corrobora #14; corrobora #15; corrobora #16 |
| 27 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | contradiz apps/shell/src/App.vue:2-7,14-15; contradiz apps/dashboard/src/components/WidgetDinero.vue:1-19; contradiz apps/cms/src/App.vue:1-10; contradiz apps/kanban/src/App.vue:1-10 |
| 28 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #7; corrobora #18; corrobora #19; corrobora #20 |
| 29 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #10; corrobora #11 |
| 30 | 3.4.7 #6 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #6; corrobora #7; corrobora #8; corrobora #9 |
| 31 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #18; corrobora #10; corrobora #11 |
| 32 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #19; contradiz apps/shell/src/App.vue:1-33 |
| 33 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #20; contradiz apps/shell/src/App.vue:1-33 |
| 34 | 3.4.7 #10 | 7 documentação | documentação | — | contexto | fraca | corrobora apps/shell/package.json:12; corrobora apps/shell/src/App.vue:3,14-15 |
| 35 | 3.4.7 #11 | 7 documentação | documentação | — | contexto | fraca | contradiz apps/dashboard/package.json:12-16; contradiz apps/dashboard/src/App.vue:1-10; contradiz apps/dashboard/src/components/WidgetDinero.vue:1-19 |
| 36 | 3.4.7 #12 | 7 documentação | documentação | — | contexto | fraca | contradiz apps/cms/package.json:12-16; contradiz apps/cms/src/App.vue:1-10 |
| 37 | 3.4.7 #13 | 7 documentação | documentação | — | contexto | fraca | contradiz apps/kanban/package.json:12-16; contradiz apps/kanban/src/App.vue:1-10 |
| 38 | 3.4.7 #14 | 7 documentação | documentação | — | contexto | fraca | corrobora package.json:7-10,18; corrobora turbo.json:3-13; corrobora pnpm-workspace.yaml:1-3 |
| 39 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #13; corrobora #14; corrobora #15; corrobora #16 |
| 40 | 3.4.7 #16 | 7 documentação | documentação | — | contexto | fraca | contradiz #17; contradiz packages/ui-kit/tsconfig.json:1-19 |
| 41 | 3.4.7 #17 | 7 documentação | documentação | — | contexto | fraca | contradiz apps/cms/package.json:23; contradiz apps/dashboard/package.json:23; contradiz apps/kanban/package.json:23; contradiz apps/shell/package.json:23 |
| 42 | 3.4.7 #18 | 7 documentação | documentação | — | tecnológica | fraca | contradiz apps/shell/package.json:11-25; contradiz apps/cms/package.json:12-25; contradiz apps/dashboard/package.json:12-25; contradiz apps/kanban/package.json:12-25; contradiz apps/dashboard/src/components/WidgetDinero.vue:2-4,12 |
| 43 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | corrobora package.json:7; corrobora turbo.json:4-7; corrobora apps/cms/package.json:7; corrobora apps/dashboard/package.json:7; corrobora apps/kanban/package.json:7; corrobora apps/shell/package.json:7 |
| 44 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #19; contradiz #20; contradiz apps/shell/src/App.vue:1-33 |
| 45 | 3.4.7 #21 | 7 documentação | documentação | — | arquitetural | fraca | contradiz apps/shell/src/App.vue:1-33; contradiz apps/shell/src/main.ts:1-5; contradiz apps/cms/src/App.vue:1-10; contradiz apps/kanban/src/App.vue:1-10; contradiz apps/dashboard/src/components/WidgetDinero.vue:1-19 |
| 46 | 3.4.7 #22 | 7 documentação | documentação | — | arquitetural | fraca | contradiz apps/shell/src/App.vue:1-33; contradiz apps/shell/src/main.ts:1-5; contradiz apps/shell/package.json:11-25 |
| 47 | 3.4.7 #23 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 48 | 3.4.7 #24 | 7 documentação | documentação | — | arquitetural | fraca | contradiz apps/shell/src/App.vue:3,14-15; contradiz apps/cms/package.json:12-16; contradiz apps/dashboard/package.json:12-16; contradiz apps/kanban/package.json:12-16 |
| 49 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #5 |
| 50 | 3.4.8 #2 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #19; explica #20; explica #32; explica #33; explica #44 |
| 51 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #27; explica #42; explica #45; explica #46 |
| 52 | 3.4.8 #4 | 8 histórico | histórico | — | contexto | fraca | explica #35; explica #36; explica #37; explica #48 |
| 53 | 3.4.8 #5 | 8 histórico | histórico | — | contexto | fraca | explica #40 |
| 54 | 3.4.8 #6 | 8 histórico | histórico | — | contexto | fraca | explica #41 |

## Resumo

Observações: 54. Dimensões (tecnologia: 5, configuração: 4, código: 2, estrutura: 6, composição: 3, build-deploy: 4, documentação: 24, histórico: 6). Força (forte: 3, moderada: 14, fraca: 36, ambígua: 1). Evidência (tecnológica: 9, arquitetural: 31, contexto: 14).
