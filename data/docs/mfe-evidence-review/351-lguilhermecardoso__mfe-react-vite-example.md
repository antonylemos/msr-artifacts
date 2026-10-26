---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
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

# 351 — lguilhermecardoso/mfe-react-vite-example

## Leitura do repositório

As cinco unidades React têm manifestos, entradas e builds próprios (#25–#29). A cadeia de composição parte das declarações de `@originjs/vite-plugin-federation` (#1, #3, #5, #7, #9), passa pelas configurações dos quatro remotes (#11–#14) e do host (#15), e chega aos imports e às montagens no código (#16–#24). As quatro relações ativas (#30–#33) ligam o `root-app` à navbar, login, dashboard e detalhe de personagem por Module Federation. Login e dashboard entram em rotas do host; o detalhe entra por um wrapper que recebe o ID da rota; a navbar é montada fora das rotas. A troca por props e callbacks é mediada pelo host.

O limite de build é próprio de cada unidade, enquanto o deploy é conjunto: o script constrói as cinco saídas e o único workflow publica o `dist` agregado no GitHub Pages (#34–#38). Isso sustenta a separação dos builds, sem estabelecer publicação ou versionamento independente. Os cinco pacotes sem escopo `vite-plugin-federation` são declarações sem uso registrado (#2, #4, #6, #8, #10), sinais que poderiam enganar uma leitura baseada apenas nos manifestos.

As afirmações documentais corroboram a organização e as integrações (#39–#46, #48–#53), mas têm força fraca por serem semânticas. A descrição do consumo local é contradita pela seleção ativa de URLs do Pages (#47), e a página Sobre nomeia React 18 diante de manifestos com React 19 (#54). A API externa é contexto funcional (#55). O histórico esclarece a coexistência da divergência de React e deixa inconclusivos usos passados das dependências e a origem da divergência local/Pages (#56–#62). Essas dúvidas são sobre o passado e não deixam ambígua a arquitetura do snapshot.

## Observações

### 1. mf-dashboard/package.json:13

**Observação:** O manifesto de `mf-dashboard` declara `@originjs/vite-plugin-federation` `^1.4.1` em `dependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation. A 3.4.2 registra Configurada `Yes`; o pacote com escopo é o importado e configurado pelo Vite.

### 2. mf-dashboard/package.json:31

**Observação:** O manifesto de `mf-dashboard` declara `vite-plugin-federation` `^0.0.1` em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation. A 3.4.2 registra Configurada `No`; o snapshot usa o pacote com escopo, sem uso registrado deste pacote sem escopo.

### 3. mf-login/package.json:20

**Observação:** O manifesto de `mf-login` declara `@originjs/vite-plugin-federation` `^1.4.1` em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation. A 3.4.2 registra Configurada `Yes`; o pacote com escopo é o importado e configurado pelo Vite.

### 4. mf-login/package.json:31

**Observação:** O manifesto de `mf-login` declara `vite-plugin-federation` `^0.0.1` em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation. A 3.4.2 registra Configurada `No`; o snapshot usa o pacote com escopo, sem uso registrado deste pacote sem escopo.

### 5. mf-navbar/package.json:20

**Observação:** O manifesto de `mf-navbar` declara `@originjs/vite-plugin-federation` `^1.4.1` em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation. A 3.4.2 registra Configurada `Yes`; o pacote com escopo é o importado e configurado pelo Vite.

### 6. mf-navbar/package.json:31

**Observação:** O manifesto de `mf-navbar` declara `vite-plugin-federation` `^0.0.1` em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation. A 3.4.2 registra Configurada `No`; o snapshot usa o pacote com escopo, sem uso registrado deste pacote sem escopo.

### 7. mf-personagem-detalhe/package.json:13

**Observação:** O manifesto de `mf-personagem-detalhe` declara `@originjs/vite-plugin-federation` `^1.4.1` em `dependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation. A 3.4.2 registra Configurada `Yes`; o pacote com escopo é o importado e configurado pelo Vite.

### 8. mf-personagem-detalhe/package.json:31

**Observação:** O manifesto de `mf-personagem-detalhe` declara `vite-plugin-federation` `^0.0.1` em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation. A 3.4.2 registra Configurada `No`; o snapshot usa o pacote com escopo, sem uso registrado deste pacote sem escopo.

### 9. root-app/package.json:21

**Observação:** O manifesto de `root-app` declara `@originjs/vite-plugin-federation` `^1.4.1` em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation. A 3.4.2 registra Configurada `Yes`; o pacote com escopo é o importado e configurado pelo Vite.

### 10. root-app/package.json:33

**Observação:** O manifesto de `root-app` declara `vite-plugin-federation` `^0.0.1` em `devDependencies`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation. A 3.4.2 registra Configurada `No`; o snapshot usa o pacote com escopo, sem uso registrado deste pacote sem escopo.

### 11. mf-dashboard/vite.config.ts:3; mf-dashboard/vite.config.ts:10-17

**Observação:** O plugin importado de `@originjs/vite-plugin-federation` recebe `name: "mf_dashboard"`, `filename: "remoteEntry.js"`, `exposes: { "./Dashboard": "./src/Dashboard.tsx" }` e `shared: ["react", "react-dom"]`.

**Interpretação:** Configura a superfície federada de `mf-dashboard` sem nomear outra unidade consumidora.

### 12. mf-login/vite.config.ts:3; mf-login/vite.config.ts:10-17

**Observação:** O plugin importado de `@originjs/vite-plugin-federation` recebe `name: "mf_login"`, `filename: "remoteEntry.js"`, `exposes: { "./Login": "./src/App.tsx" }` e `shared: ["react", "react-dom"]`.

**Interpretação:** Configura a superfície federada de `mf-login` sem nomear outra unidade consumidora.

### 13. mf-navbar/vite.config.ts:3; mf-navbar/vite.config.ts:10-17

**Observação:** O plugin importado de `@originjs/vite-plugin-federation` recebe `name: "mf_navbar"`, `filename: "remoteEntry.js"`, `exposes: { "./Navbar": "./src/Navbar.tsx" }` e `shared: ["react", "react-dom"]`.

**Interpretação:** Configura a superfície federada de `mf-navbar` sem nomear outra unidade consumidora.

### 14. mf-personagem-detalhe/vite.config.ts:3; mf-personagem-detalhe/vite.config.ts:10-17

**Observação:** O plugin importado de `@originjs/vite-plugin-federation` recebe `name: "mf_personagem_detalhe"`, `filename: "remoteEntry.js"`, `exposes: { "./PersonagemDetalhe": "./src/PersonagemDetalhe.tsx" }` e `shared: ["react", "react-dom"]`.

**Interpretação:** Configura a superfície federada de `mf-personagem-detalhe` sem nomear outra unidade consumidora.

### 15. root-app/vite.config.ts:3; root-app/vite.config.ts:7-24; root-app/vite.config.ts:31-35

**Observação:** A configuração nomeia o host `root_app`, compartilha React e React DOM e declara `mf_login`, `mf_dashboard`, `mf_personagem_detalhe` e `mf_navbar`, com URLs de `remoteEntry.js` locais ou do GitHub Pages selecionadas por `IS_LOCAL`.

**Interpretação:** O bloco liga explicitamente o host às quatro outras unidades por Module Federation. A seleção é feita ao montar a configuração do build.

### 16. root-app/src/App.tsx:5

**Observação:** Importa `mf_navbar/Navbar` por `React.lazy` e `import()`.

**Interpretação:** Nomeia o remote e o módulo de UI carregado pelo host.

### 17. root-app/src/App.tsx:6

**Observação:** Importa `mf_login/Login` por `React.lazy` e `import()`.

**Interpretação:** Nomeia a unidade de login carregada pelo host.

### 18. root-app/src/App.tsx:7

**Observação:** Importa `mf_dashboard/Dashboard` por `React.lazy` e `import()`.

**Interpretação:** Nomeia a unidade de dashboard carregada pelo host.

### 19. root-app/src/App.tsx:8

**Observação:** Importa `mf_personagem_detalhe/PersonagemDetalhe` por `React.lazy` e `import()`.

**Interpretação:** Nomeia a unidade de detalhe carregada pelo host.

### 20. root-app/src/App.tsx:24-28; root-app/src/App.tsx:8; root-app/src/App.tsx:81-84

**Observação:** O wrapper renderiza `PersonagemDetalheMFE` com `id`, `user` e `onBack`.

**Interpretação:** Usa o componente remoto fora da declaração de rota; a ligação do caminho ao wrapper aparece separadamente na tabela de rotas.

### 21. root-app/src/App.tsx:58-60; root-app/src/App.tsx:5

**Observação:** Renderiza `Navbar` dentro de Suspense quando há usuário e passa `user` e `onLogout`.

**Interpretação:** Monta a UI remota na área comum do host, fora das rotas.

### 22. root-app/src/App.tsx:63-96; root-app/src/App.tsx:5-8; root-app/src/App.tsx:20-28; root-app/src/main.tsx:9-11

**Observação:** A tabela de rotas associa `/login` a `LoginMFE`, `/dashboard` a `DashboardMFE` e `/personagem/:id` a `PersonagemDetalheWrapper`.

**Interpretação:** Liga caminhos do host a componentes remotos; o HashRouter enquadra a navegação das telas compostas.

### 23. root-app/src/App.tsx:64-68; root-app/src/App.tsx:6; root-app/src/App.tsx:36-40

**Observação:** A rota `/login` renderiza `LoginMFE` com `onAuthSuccess={handleLogin}` quando não há usuário.

**Interpretação:** A rota integra a unidade de login ao fluxo de autenticação do host.

### 24. root-app/src/App.tsx:69-80; root-app/src/App.tsx:7

**Observação:** A rota `/dashboard` renderiza `DashboardMFE` com usuário, token e callback que navega para `/personagem/${id}`.

**Interpretação:** A rota integra o dashboard e encaminha a navegação ao detalhe pelo host.

### 25. mf-dashboard/; mf-dashboard/package.json:1-11; mf-dashboard/index.html:11; mf-dashboard/src/main.tsx:6-10; mf-dashboard/vite.config.ts:6-34

**Observação:** O diretório `mf-dashboard` tem manifesto próprio, entrada HTML que carrega `src/main.tsx`, montagem React, script `tsc -b && vite build` e saída Vite `../dist/mf-dashboard`.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios. O diretório isoladamente não demonstra as relações de composição.

### 26. mf-login/; mf-login/package.json:1-11; mf-login/index.html:11; mf-login/src/main.tsx:6-10; mf-login/vite.config.ts:6-34

**Observação:** O diretório `mf-login` tem manifesto próprio, entrada HTML que carrega `src/main.tsx`, montagem React, script `tsc -b && vite build` e saída Vite `../dist/mf-login`.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios. O diretório isoladamente não demonstra as relações de composição.

### 27. mf-navbar/; mf-navbar/package.json:1-11; mf-navbar/index.html:11; mf-navbar/src/main.tsx:6-10; mf-navbar/vite.config.ts:6-34

**Observação:** O diretório `mf-navbar` tem manifesto próprio, entrada HTML que carrega `src/main.tsx`, montagem React, script `tsc -b && vite build` e saída Vite `../dist/mf-navbar`.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios. O diretório isoladamente não demonstra as relações de composição.

### 28. mf-personagem-detalhe/; mf-personagem-detalhe/package.json:1-11; mf-personagem-detalhe/index.html:11; mf-personagem-detalhe/src/main.tsx:6-10; mf-personagem-detalhe/vite.config.ts:6-34

**Observação:** O diretório `mf-personagem-detalhe` tem manifesto próprio, entrada HTML que carrega `src/main.tsx`, montagem React, script `tsc -b && vite build` e saída Vite `../dist/mf-personagem-detalhe`.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios. O diretório isoladamente não demonstra as relações de composição.

### 29. root-app/; root-app/package.json:1-11; root-app/index.html:15; root-app/src/main.tsx:7-13; root-app/vite.config.ts:6-45

**Observação:** O diretório `root-app` tem manifesto próprio, entrada HTML que carrega `src/main.tsx`, montagem React sob HashRouter, script `tsc -b && vite build` e saída Vite `../dist/root-app`.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios. O diretório isoladamente não demonstra as relações de composição.

### 30. root-app/src/App.tsx:5; root-app/src/App.tsx:59; root-app/vite.config.ts:11-24; root-app/vite.config.ts:31-35; mf-navbar/vite.config.ts:10-17; mf-navbar/vite.config.ts:23

**Observação:** `root-app` importa `mf_navbar/Navbar` e o renderiza; a configuração do host resolve `mf_navbar` por URL de `remoteEntry.js`, e `mf-navbar` expõe `./Navbar`. A 3.4.5 registra destino no snapshot `Yes` e relação ativa `Yes`.

**Interpretação:** A relação liga diretamente o host à unidade `mf-navbar` por Module Federation, com correspondência entre import, URL e módulo exposto.

### 31. root-app/src/App.tsx:6; root-app/src/App.tsx:64-68; root-app/vite.config.ts:11-24; root-app/vite.config.ts:31-35; mf-login/vite.config.ts:10-17; mf-login/vite.config.ts:23

**Observação:** `root-app` importa `mf_login/Login` e o renderiza; a configuração do host resolve `mf_login` por URL de `remoteEntry.js`, e `mf-login` expõe `./Login`. A 3.4.5 registra destino no snapshot `Yes` e relação ativa `Yes`.

**Interpretação:** A relação liga diretamente o host à unidade `mf-login` por Module Federation, com correspondência entre import, URL e módulo exposto.

### 32. root-app/src/App.tsx:7; root-app/src/App.tsx:69-80; root-app/vite.config.ts:11-24; root-app/vite.config.ts:31-35; mf-dashboard/vite.config.ts:10-17; mf-dashboard/vite.config.ts:23

**Observação:** `root-app` importa `mf_dashboard/Dashboard` e o renderiza; a configuração do host resolve `mf_dashboard` por URL de `remoteEntry.js`, e `mf-dashboard` expõe `./Dashboard`. A 3.4.5 registra destino no snapshot `Yes` e relação ativa `Yes`.

**Interpretação:** A relação liga diretamente o host à unidade `mf-dashboard` por Module Federation, com correspondência entre import, URL e módulo exposto.

### 33. root-app/src/App.tsx:8; root-app/src/App.tsx:24-28; root-app/src/App.tsx:81-84; root-app/vite.config.ts:11-24; root-app/vite.config.ts:31-35; mf-personagem-detalhe/vite.config.ts:10-17; mf-personagem-detalhe/vite.config.ts:23

**Observação:** `root-app` importa `mf_personagem_detalhe/PersonagemDetalhe` e o renderiza; a configuração do host resolve `mf_personagem_detalhe` por URL de `remoteEntry.js`, e `mf-personagem-detalhe` expõe `./PersonagemDetalhe`. A 3.4.5 registra destino no snapshot `Yes` e relação ativa `Yes`.

**Interpretação:** A relação liga diretamente o host à unidade `mf-personagem-detalhe` por Module Federation, com correspondência entre import, URL e módulo exposto.

### 34. mf-dashboard/package.json:8; mf-dashboard/vite.config.ts:22-24; build-all.sh:12; .github/workflows/deploy.yml:19-27

**Observação:** `mf-dashboard` executa seu próprio build e grava `dist/mf-dashboard`. `build-all.sh` o executa junto aos demais. O workflow publica o `./dist` inteiro no GitHub Pages. A 3.4.6 registra Build `separado`, Deploy `conjunto` e Versionamento `No`.

**Interpretação:** Mostra separação do build desta unidade e publicação conjunta com as demais. Não estabelece deploy ou versionamento independente.

### 35. mf-login/package.json:8; mf-login/vite.config.ts:22-24; build-all.sh:9; .github/workflows/deploy.yml:19-27

**Observação:** `mf-login` executa seu próprio build e grava `dist/mf-login`. `build-all.sh` o executa junto aos demais. O workflow publica o `./dist` inteiro no GitHub Pages. A 3.4.6 registra Build `separado`, Deploy `conjunto` e Versionamento `No`.

**Interpretação:** Mostra separação do build desta unidade e publicação conjunta com as demais. Não estabelece deploy ou versionamento independente.

### 36. mf-navbar/package.json:8; mf-navbar/vite.config.ts:22-24; build-all.sh:15; .github/workflows/deploy.yml:19-27

**Observação:** `mf-navbar` executa seu próprio build e grava `dist/mf-navbar`. `build-all.sh` o executa junto aos demais. O workflow publica o `./dist` inteiro no GitHub Pages. A 3.4.6 registra Build `separado`, Deploy `conjunto` e Versionamento `No`.

**Interpretação:** Mostra separação do build desta unidade e publicação conjunta com as demais. Não estabelece deploy ou versionamento independente.

### 37. mf-personagem-detalhe/package.json:8; mf-personagem-detalhe/vite.config.ts:22-24; build-all.sh:18; .github/workflows/deploy.yml:19-27

**Observação:** `mf-personagem-detalhe` executa seu próprio build e grava `dist/mf-personagem-detalhe`. `build-all.sh` o executa junto aos demais. O workflow publica o `./dist` inteiro no GitHub Pages. A 3.4.6 registra Build `separado`, Deploy `conjunto` e Versionamento `No`.

**Interpretação:** Mostra separação do build desta unidade e publicação conjunta com as demais. Não estabelece deploy ou versionamento independente.

### 38. root-app/package.json:8; root-app/vite.config.ts:37-40; build-all.sh:21-23; .github/workflows/deploy.yml:19-27; root-app/vite.config.ts:27

**Observação:** `root-app` executa seu próprio build e grava `dist/root-app`. `build-all.sh` o executa junto aos demais e copia a saída do host para a raiz de `dist`. O workflow publica o `./dist` inteiro no GitHub Pages. A 3.4.6 registra Build `separado`, Deploy `conjunto` e Versionamento `No`.

**Interpretação:** Mostra separação do build desta unidade e publicação conjunta com as demais. Não estabelece deploy ou versionamento independente.

### 39. .github/workflows/deploy.yml:1

**Observação:** O artefato afirma: "Deploy Microfrontends to GitHub Pages". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** Afirma a publicação conjunta de unidades frontend no Pages, corroborada pelo workflow e pelo script; o nome não prova execução de um deploy.

### 40. README.md:3

**Observação:** O artefato afirma: "This project demonstrates a Microfrontends architecture using React, Vite, Module Federation, and TailwindCSS.". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** Apresenta uma organização de microfrontends com Module Federation, corroborada pelas unidades, configuração e relações. A afirmação é evidência semântica.

### 41. README.md:11

**Observação:** O artefato afirma: "root-app/ […] Main application (container/orchestrator)". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** O papel de orquestrador é corroborado pelas quatro relações do host e pela renderização dos remotes.

### 42. README.md:12

**Observação:** O artefato afirma: "mf-login/ […] Microfrontend: Login and sign-up screen". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** O papel de unidade de login é corroborado pela estrutura própria, exposição federada e alternância entre login e cadastro.

### 43. README.md:13

**Observação:** O artefato afirma: "mf-dashboard/ […] Microfrontend: Main dashboard". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** O papel de dashboard é corroborado pela estrutura, exposição e montagem na rota do host.

### 44. README.md:14

**Observação:** O artefato afirma: "mf-personagem-detalhe/ […] Microfrontend: Character detail (e.g., Rick and Morty)". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** O papel de unidade de detalhe é corroborado pela estrutura e pelo módulo exposto que consulta um personagem por ID.

### 45. README.md:15

**Observação:** O artefato afirma: "mf-navbar/ […] Microfrontend: Navbar with navigation and user info". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** O papel da navbar é corroborado pela unidade própria, módulo exposto e UI de usuário e navegação.

### 46. README.md:33

**Observação:** O artefato afirma: "Each microfrontend is an independent project (with its own package.json).". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** A independência de projeto e desenvolvimento é corroborada pelas entradas, manifestos e builds próprios e pelos wrappers locais; não afirma deploy separado.

### 47. README.md:80

**Observação:** O artefato afirma: "The root-app will run on http://localhost:5000 […] consuming the microfrontends remotely from their preview servers.". A 3.4.7 registra a afirmação como `contradita`.

**Interpretação:** A descrição local é contradita: o ambiente ativo contém `IS_LOCAL=false`, que seleciona os remotes do Pages. O arquivo `.bkp` não ativa a opção local.

### 48. README.md:87

**Observação:** O artefato afirma: "Navbar (mf-navbar): […] federated integration". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** A integração federada da navbar é corroborada pela relação ativa, configuração e montagem no host.

### 49. README.md:92

**Observação:** O artefato afirma: "Basic global state (user/token via localStorage)". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** A descrição de estado básico é corroborada pelas gravações do login e do host e pela passagem por props. Não demonstra um context compartilhado nem um mecanismo adicional de composição.

### 50. README.md:98

**Observação:** O artefato afirma: "[x] Integrated login via MFE". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** A integração do login é corroborada pela relação ativa e pelo callback que atualiza o estado do host.

### 51. mf-navbar/src/App.tsx:15

**Observação:** O artefato afirma: "Em produção, user e onLogout viriam via props do root-app ou de um context global". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** O caminho de props do host é corroborado; o comentário oferece context global como alternativa, sem demonstrar sua implementação.

### 52. mf-navbar/src/App.tsx:21

**Observação:** O artefato afirma: "esse microfrontend só expõe a Navbar". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** A superfície exposta é corroborada: `./Navbar` é a única chave de `exposes` e aponta diretamente para Navbar.tsx.

### 53. roadmap.md:29

**Observação:** O artefato afirma: "[x] Permitir clicar em um card para visualizar detalhes no mf-personagem-detalhe". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** A navegação entre dashboard e detalhe é corroborada por callback e rotas do host; não implica um import direto entre remotes.

### 54. root-app/src/pages/Sobre.tsx:33

**Observação:** O artefato afirma: "Tecnologias: React 18". A 3.4.7 registra a afirmação como `contradita`.

**Interpretação:** A versão descrita é contradita pelos cinco manifestos, que declaram React e React DOM `^19.1.0`. É contexto sobre framework, sem mecanismo de MFE.

### 55. root-app/src/pages/Sobre.tsx:33

**Observação:** O artefato afirma: "integração com a API pública Rick and Morty". A 3.4.7 registra a afirmação como `corroborada`.

**Interpretação:** A dependência de backend externo é corroborada pelos fetches dos dois remotes; não constitui ligação de composição entre unidades frontend.

### 56. 6cdaf6f 2025-07-15 (mf-dashboard/package.json); 6cdaf6f 2025-07-15 (mf-dashboard/vite.config.ts); fdf3ccb 2025-07-17 (mf-dashboard/package.json); fdf3ccb 2025-07-17 (mf-dashboard/vite.config.ts)

**Observação:** O ponto histórico trata de `vite-plugin-federation` sem uso em `mf-dashboard`. O manifesto lido de `fdf3ccb` já declara os dois pacotes e não muda depois. Blobs de configurações anteriores estão indisponíveis no clone parcial. Resultado da 3.4.8: `inconclusivo`.

**Interpretação:** A dúvida é sobre uso passado, substituição ou abandono da dependência; não muda a leitura do snapshot, cujo plugin com escopo está configurado. O histórico não permite atribuir intenção à declaração sem uso.

### 57. 6cdaf6f 2025-07-15 (mf-login/package.json); 6cdaf6f 2025-07-15 (mf-login/vite.config.ts)

**Observação:** O ponto histórico trata de `vite-plugin-federation` sem uso em `mf-login`. O manifesto de `6cdaf6f` já declara os dois pacotes e não muda depois. Blobs de configurações anteriores estão indisponíveis no clone parcial. Resultado da 3.4.8: `inconclusivo`.

**Interpretação:** A dúvida é sobre uso passado, substituição ou abandono da dependência; não muda a leitura do snapshot, cujo plugin com escopo está configurado. O histórico não permite atribuir intenção à declaração sem uso.

### 58. 6cdaf6f 2025-07-15 (mf-navbar/package.json); 6cdaf6f 2025-07-15 (mf-navbar/vite.config.ts)

**Observação:** O ponto histórico trata de `vite-plugin-federation` sem uso em `mf-navbar`. O manifesto de `6cdaf6f` já declara os dois pacotes e não muda depois. Blobs de configurações anteriores estão indisponíveis no clone parcial. Resultado da 3.4.8: `inconclusivo`.

**Interpretação:** A dúvida é sobre uso passado, substituição ou abandono da dependência; não muda a leitura do snapshot, cujo plugin com escopo está configurado. O histórico não permite atribuir intenção à declaração sem uso.

### 59. 6cdaf6f 2025-07-15 (mf-personagem-detalhe/package.json); 6cdaf6f 2025-07-15 (mf-personagem-detalhe/vite.config.ts); fdf3ccb 2025-07-17 (mf-personagem-detalhe/package.json); fdf3ccb 2025-07-17 (mf-personagem-detalhe/vite.config.ts)

**Observação:** O ponto histórico trata de `vite-plugin-federation` sem uso em `mf-personagem-detalhe`. O manifesto lido de `fdf3ccb` já declara os dois pacotes e não muda depois. Blobs de configurações anteriores estão indisponíveis no clone parcial. Resultado da 3.4.8: `inconclusivo`.

**Interpretação:** A dúvida é sobre uso passado, substituição ou abandono da dependência; não muda a leitura do snapshot, cujo plugin com escopo está configurado. O histórico não permite atribuir intenção à declaração sem uso.

### 60. 6cdaf6f 2025-07-15 (root-app/package.json); 6cdaf6f 2025-07-15 (root-app/vite.config.ts); fdf3ccb 2025-07-17 (root-app/package.json); fdf3ccb 2025-07-17 (root-app/vite.config.ts); 980d535 2025-07-17 (root-app/package.json); 980d535 2025-07-17 (root-app/vite.config.ts)

**Observação:** O ponto histórico trata de `vite-plugin-federation` sem uso em `root-app`. As versões anteriores consultadas do manifesto e da configuração não puderam ser lidas. Blobs de configurações anteriores estão indisponíveis no clone parcial. Resultado da 3.4.8: `inconclusivo`.

**Interpretação:** A dúvida é sobre uso passado, substituição ou abandono da dependência; não muda a leitura do snapshot, cujo plugin com escopo está configurado. O histórico não permite atribuir intenção à declaração sem uso.

### 61. 6cdaf6f 2025-07-15 (README.md); fdf3ccb 2025-07-17 (root-app/vite.config.ts); 980d535 2025-07-17 (root-app/vite.config.ts); 980d535 2025-07-17 (root-app/.env); 980d535 2025-07-17 (root-app/.env.local.bkp)

**Observação:** O README entra em `6cdaf6f` e não muda. Os arquivos de ambiente entram em `980d535` já com `IS_LOCAL=false` e `IS_LOCAL=true` no backup. As configurações Vite anteriores consultadas não estão disponíveis, impedindo datar a seleção local/Pages e verificar um estágio anterior coerente com o README. Resultado: `inconclusivo`.

**Interpretação:** A dúvida restante é histórica: no snapshot a seleção dos remotes do Pages está clara. A limitação não torna ambígua a composição atual.

### 62. 6cdaf6f 2025-07-15 (mf-login/package.json); 6cdaf6f 2025-07-15 (mf-navbar/package.json); fdf3ccb 2025-07-17 (root-app/src/pages/Sobre.tsx); fdf3ccb 2025-07-17 (mf-dashboard/package.json); fdf3ccb 2025-07-17 (mf-personagem-detalhe/package.json)

**Observação:** A página Sobre é adicionada em `fdf3ccb` já com React 18. Naquele estágio os manifestos lidos de dashboard e detalhe declaram `^19.1.0`, assim como login e navbar desde `6cdaf6f`. A versão histórica do manifesto do host está indisponível. Resultado: `esclarecido`, limitado à coexistência comprovada do texto e dos quatro manifestos.

**Interpretação:** Explica que a divergência de versão já existia na criação da página; não exige supor migração posterior nem comprova que React 18 nunca existiu antes. Não sustenta uma interpretação de composição de MFE.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (mf-dashboard/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #11 |
| 2 | 3.4.2 (mf-dashboard/package.json:31) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | — |
| 3 | 3.4.2 (mf-login/package.json:20) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #12 |
| 4 | 3.4.2 (mf-login/package.json:31) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | — |
| 5 | 3.4.2 (mf-navbar/package.json:20) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #13 |
| 6 | 3.4.2 (mf-navbar/package.json:31) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | — |
| 7 | 3.4.2 (mf-personagem-detalhe/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #14 |
| 8 | 3.4.2 (mf-personagem-detalhe/package.json:31) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | — |
| 9 | 3.4.2 (root-app/package.json:21) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #15 |
| 10 | 3.4.2 (root-app/package.json:33) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | — |
| 11 | 3.4.2 (mf-dashboard/package.json:13; Evidência); 3.4.2 (mf-dashboard/package.json:31; Evidência); 3.4.3 (mf-dashboard; Marcadores); 3.4.3 (mf-dashboard; Build); 3.4.4 (root-app/src/App.tsx:7; Observação); 3.4.5 (#3; Configuração); 3.4.7 (#2; Evidência); 3.4.7 (#5; Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #25; configura #32 |
| 12 | 3.4.2 (mf-login/package.json:20; Evidência); 3.4.2 (mf-login/package.json:31; Evidência); 3.4.3 (mf-login; Marcadores); 3.4.3 (mf-login; Build); 3.4.4 (root-app/src/App.tsx:6; Observação); 3.4.5 (#2; Configuração); 3.4.7 (#4; Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #26; configura #31 |
| 13 | 3.4.2 (mf-navbar/package.json:20; Evidência); 3.4.2 (mf-navbar/package.json:31; Evidência); 3.4.3 (mf-navbar; Marcadores); 3.4.3 (mf-navbar; Build); 3.4.4 (root-app/src/App.tsx:5; Observação); 3.4.5 (#1; Configuração); 3.4.7 (#7; Evidência); 3.4.7 (#10; Evidência); 3.4.7 (#13; Evidência); 3.4.7 (#14; Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #27; configura #30 |
| 14 | 3.4.2 (mf-personagem-detalhe/package.json:13; Evidência); 3.4.2 (mf-personagem-detalhe/package.json:31; Evidência); 3.4.3 (mf-personagem-detalhe; Marcadores); 3.4.3 (mf-personagem-detalhe; Build); 3.4.4 (root-app/src/App.tsx:8; Observação); 3.4.5 (#4; Configuração); 3.4.7 (#6; Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #28; configura #33 |
| 15 | 3.4.2 (root-app/package.json:21; Evidência); 3.4.2 (root-app/package.json:33; Evidência); 3.4.3 (root-app; Marcadores); 3.4.3 (root-app; Build); 3.4.4 (root-app/src/App.tsx:5; Observação); 3.4.4 (root-app/src/App.tsx:6; Observação); 3.4.4 (root-app/src/App.tsx:7; Observação); 3.4.4 (root-app/src/App.tsx:8; Observação); 3.4.5 (#1; Configuração); 3.4.5 (#2; Configuração); 3.4.5 (#3; Configuração); 3.4.5 (#4; Configuração); 3.4.6 (#1; Onde é servida); 3.4.6 (#2; Onde é servida); 3.4.6 (#3; Onde é servida); 3.4.6 (#4; Onde é servida); 3.4.7 (#2; Evidência); 3.4.7 (#9; Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #30; configura #31; configura #32; configura #33 |
| 16 | 3.4.4 (root-app/src/App.tsx:5) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #30 |
| 17 | 3.4.4 (root-app/src/App.tsx:6) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #31 |
| 18 | 3.4.4 (root-app/src/App.tsx:7) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #32 |
| 19 | 3.4.4 (root-app/src/App.tsx:8) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #33 |
| 20 | 3.4.4 (root-app/src/App.tsx:24) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #33 |
| 21 | 3.4.4 (root-app/src/App.tsx:59) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #30 |
| 22 | 3.4.4 (root-app/src/App.tsx:63) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #31; implementa #32; implementa #33 |
| 23 | 3.4.4 (root-app/src/App.tsx:67) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #31 |
| 24 | 3.4.4 (root-app/src/App.tsx:73) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #32 |
| 25 | 3.4.3 (mf-dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 26 | 3.4.3 (mf-login) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 27 | 3.4.3 (mf-navbar) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 28 | 3.4.3 (mf-personagem-detalhe) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 29 | 3.4.3 (root-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 30 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #29; liga #27 |
| 31 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #29; liga #26 |
| 32 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #29; liga #25 |
| 33 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #29; liga #28 |
| 34 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #25 |
| 35 | 3.4.6 #2 | 6 build-deploy | CI | — | arquitetural | moderada | publica #26 |
| 36 | 3.4.6 #3 | 6 build-deploy | CI | — | arquitetural | moderada | publica #27 |
| 37 | 3.4.6 #4 | 6 build-deploy | CI | — | arquitetural | moderada | publica #28 |
| 38 | 3.4.6 #5 | 6 build-deploy | CI | — | arquitetural | moderada | publica #29 |
| 39 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #34; corrobora #35; corrobora #36; corrobora #37; corrobora #38 |
| 40 | 3.4.7 #2 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #11; corrobora #15; corrobora #25; corrobora #26; corrobora #27; corrobora #28; corrobora #29; corrobora #30; corrobora #31; corrobora #32; corrobora #33 |
| 41 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #30; corrobora #31; corrobora #32; corrobora #33 |
| 42 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #26; corrobora #12; corrobora mf-login/src/App.tsx:10-33 |
| 43 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #25; corrobora #11; corrobora #24 |
| 44 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #28; corrobora #14; corrobora mf-personagem-detalhe/src/PersonagemDetalhe.tsx:22-53 |
| 45 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #27; corrobora #13; corrobora mf-navbar/src/Navbar.tsx:58; corrobora mf-navbar/src/Navbar.tsx:111-125 |
| 46 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #25; corrobora #26; corrobora #27; corrobora #28; corrobora #29; corrobora mf-dashboard/src/App.tsx:3-7; corrobora mf-navbar/src/App.tsx:4-20; corrobora mf-personagem-detalhe/src/App.tsx:1-7; corrobora mf-login/src/App.tsx:6-14 |
| 47 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #15; contradiz root-app/.env:1 |
| 48 | 3.4.7 #10 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #30; corrobora #13; corrobora #21 |
| 49 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora root-app/src/App.tsx:10-12; corrobora root-app/src/App.tsx:36-45; corrobora root-app/src/App.tsx:59-75; corrobora mf-login/src/LoginForm.tsx:20-23 |
| 50 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #31; corrobora #23; corrobora mf-login/src/App.tsx:13-14 |
| 51 | 3.4.7 #13 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #21; corrobora root-app/src/App.tsx:42-45; corrobora mf-navbar/src/Navbar.tsx:71 |
| 52 | 3.4.7 #14 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #13; corrobora #16 |
| 53 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #32; corrobora #33; corrobora mf-dashboard/src/Dashboard.tsx:95; corrobora root-app/src/App.tsx:20-28; corrobora root-app/src/App.tsx:73-84 |
| 54 | 3.4.7 #16 | 7 documentação | código-fonte | — | contexto | fraca | contradiz root-app/package.json:14-15; contradiz mf-dashboard/package.json:15-16; contradiz mf-login/package.json:14-15; contradiz mf-navbar/package.json:14-15; contradiz mf-personagem-detalhe/package.json:15-16 |
| 55 | 3.4.7 #17 | 7 documentação | código-fonte | — | contexto | fraca | corrobora mf-dashboard/src/Dashboard.tsx:17; corrobora mf-dashboard/src/Dashboard.tsx:47-59; corrobora mf-personagem-detalhe/src/PersonagemDetalhe.tsx:22; corrobora mf-personagem-detalhe/src/PersonagemDetalhe.tsx:35-53 |
| 56 | 3.4.8 #1 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #2; explica #1; explica #11 |
| 57 | 3.4.8 #2 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #4; explica #3; explica #12 |
| 58 | 3.4.8 #3 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #6; explica #5; explica #13 |
| 59 | 3.4.8 #4 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #8; explica #7; explica #14 |
| 60 | 3.4.8 #5 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #10; explica #9; explica #15 |
| 61 | 3.4.8 #6 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #47; explica #15 |
| 62 | 3.4.8 #7 | 8 histórico | histórico | — | contexto | fraca | explica #54 |

## Resumo

Observações: 62. Dimensões (tecnologia: 10, configuração: 5, código: 9, estrutura: 5, composição: 4, build-deploy: 5, documentação: 17, histórico: 7). Força (forte: 12, moderada: 16, fraca: 34, ambígua: 0). Evidência (tecnológica: 19, arquitetural: 40, contexto: 3).
