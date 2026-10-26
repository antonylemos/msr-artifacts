---
schema: 1
id: 1248756347
full_name: shreyash1086/mfe
commit: b0fdd18d2ef6beb846fa0a534b9458669405fe6b
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

# 270 — shreyash1086/mfe

## Leitura do repositório

A arquitetura observada reúne shell e nove módulos React compostos por Module Federation, além de um design system federado. A inspeção de dependências não registra tecnologias no dependencies.csv, por isso não há observação na dimensão 1. A evidência do mecanismo vem das configurações e do código: os plugins expõem Apps e declaram o remote sharedDesignSystem; o código do HTML resolve os endereços, e o loader do shell inicializa containers, obtém os módulos e os monta por rota (#59; #101–#109). Os nove módulos não carregam uns aos outros.

O design system tem dois papéis: pacote file: para o build e remote consumido pelo shell e pelos nove módulos (#110–#119). A revisão estrutural confirma onze diretórios com entrada e build próprios (#90–#100); inclui a UI de demonstração do design system, enquanto a classificação conta dez unidades da aplicação. São escopos de contagem registrados na 3.4, preservados aqui. A publicação é separada por imagem e serviço, mas não há versionamento independente, e o build do shell depende das fontes dos módulos para gerar CSS. Autenticação e tema atravessam as unidades pela ponte global, armazenamento e classe do DOM (#120–#128).

Imports de react-dom/client, bootstraps locais e iframes do cliente de VM não compõem estas unidades. A documentação confirma partes da cadeia, mas mantém contagens e nomes antigos, imports estáticos exemplificados, healthchecks e garantias de versão que os artefatos atuais contradizem (#140, #146, #147, #162, #165). Os pontos históricos explicam a expansão e delimitam lacunas dos blobs antigos; as dúvidas restantes são sobre o passado, com a arquitetura do snapshot estabelecida.

A extração usa as sete revisões finais, sem nova mineração. Na dimensão 2, cada configuração webpack é uma observação inteira por unidade, incluindo o segundo config do shell. O mapa de URLs do HTML é código executado pelo navegador: ele sustenta as relações já registradas, sem virar uma observação nova de configuração. Não entram configurações de proxy, caminhos de publicação nginx, portas de devServer nem código executável como remoteConfig.js. As construções JavaScript dentro dos remotes promise permanecem também na dimensão 3, uma por linha da revisão de código. O ponto histórico sem commits foi resolvido apenas pelos trechos de snapshot indicados na 3.4.8.

## Observações

### 1. module-assessment/webpack.config.js:35-74

**Observação:** O ModuleFederationPlugin declara name: "assessment", filename: "remoteEntry.js". Expõe `./AssessmentApp` → `./src/App`. Declara sharedDesignSystem como remote promise: reutiliza window.sharedDesignSystem ou injeta o script da URL design_system de window.__RUNTIME_REMOTE_CONFIG__, com fallback http://localhost:3010/remoteEntry.js. Configura react, react-dom, react-router, react-router-dom, shared-design-system como singletons.

**Interpretação:** A configuração de module-assessment liga esta unidade ao remote sharedDesignSystem por Module Federation e oferece o próprio App para consumo.

### 2. module-cloud-console/webpack.config.js:34-73

**Observação:** O ModuleFederationPlugin declara name: "cloud_console", filename: "remoteEntry.js". Expõe `./CloudConsoleApp` → `./src/App`. Declara sharedDesignSystem como remote promise: reutiliza window.sharedDesignSystem ou injeta o script da URL design_system de window.__RUNTIME_REMOTE_CONFIG__, com fallback http://localhost:3010/remoteEntry.js. Configura react, react-dom, react-router, react-router-dom, shared-design-system como singletons.

**Interpretação:** A configuração de module-cloud-console liga esta unidade ao remote sharedDesignSystem por Module Federation e oferece o próprio App para consumo.

### 3. module-cloud-labs/webpack.config.js:29-68

**Observação:** O ModuleFederationPlugin declara name: "cloud_labs", filename: "remoteEntry.js". Expõe `./CloudLabsApp` → `./src/App`. Declara sharedDesignSystem como remote promise: reutiliza window.sharedDesignSystem ou injeta o script da URL design_system de window.__RUNTIME_REMOTE_CONFIG__, com fallback http://localhost:3010/remoteEntry.js. Configura react, react-dom, react-router, react-router-dom, shared-design-system como singletons.

**Interpretação:** A configuração de module-cloud-labs liga esta unidade ao remote sharedDesignSystem por Module Federation e oferece o próprio App para consumo.

### 4. module-code-environment/webpack.config.js:30-69

**Observação:** O ModuleFederationPlugin declara name: "code_environment", filename: "remoteEntry.js". Expõe `./CodeEnvironmentApp` → `./src/App`. Declara sharedDesignSystem como remote promise: reutiliza window.sharedDesignSystem ou injeta o script da URL design_system de window.__RUNTIME_REMOTE_CONFIG__, com fallback http://localhost:3010/remoteEntry.js. Configura react, react-dom, react-router, react-router-dom, shared-design-system como singletons.

**Interpretação:** A configuração de module-code-environment liga esta unidade ao remote sharedDesignSystem por Module Federation e oferece o próprio App para consumo.

### 5. module-code-module/webpack.config.js:37-79

**Observação:** O ModuleFederationPlugin declara name: "code_module", filename: "remoteEntry.js". Expõe `./CodeModuleApp` → `./src/App`. Declara sharedDesignSystem como remote promise: reutiliza window.sharedDesignSystem ou injeta o script da URL design_system de window.__RUNTIME_REMOTE_CONFIG__, com fallback http://localhost:3010/remoteEntry.js. Configura react, react-dom, react-router, react-router-dom, styled-components, shared-design-system como singletons.

**Interpretação:** A configuração de module-code-module liga esta unidade ao remote sharedDesignSystem por Module Federation e oferece o próprio App para consumo.

### 6. module-content-uploading/webpack.config.js:29-68

**Observação:** O ModuleFederationPlugin declara name: "content_uploading", filename: "remoteEntry.js". Expõe `./ContentUploadingApp` → `./src/App`. Declara sharedDesignSystem como remote promise: reutiliza window.sharedDesignSystem ou injeta o script da URL design_system de window.__RUNTIME_REMOTE_CONFIG__, com fallback http://localhost:3010/remoteEntry.js. Configura react, react-dom, react-router, react-router-dom, shared-design-system como singletons.

**Interpretação:** A configuração de module-content-uploading liga esta unidade ao remote sharedDesignSystem por Module Federation e oferece o próprio App para consumo.

### 7. module-dashboard/webpack.config.js:29-68

**Observação:** O ModuleFederationPlugin declara name: "dashboard", filename: "remoteEntry.js". Expõe `./DashboardApp` → `./src/App`. Declara sharedDesignSystem como remote promise: reutiliza window.sharedDesignSystem ou injeta o script da URL design_system de window.__RUNTIME_REMOTE_CONFIG__, com fallback http://localhost:3010/remoteEntry.js. Configura react, react-dom, react-router, react-router-dom, shared-design-system como singletons.

**Interpretação:** A configuração de module-dashboard liga esta unidade ao remote sharedDesignSystem por Module Federation e oferece o próprio App para consumo.

### 8. module-logging/webpack.config.js:30-69

**Observação:** O ModuleFederationPlugin declara name: "logging", filename: "remoteEntry.js". Expõe `./LoggingApp` → `./src/App`. Declara sharedDesignSystem como remote promise: reutiliza window.sharedDesignSystem ou injeta o script da URL design_system de window.__RUNTIME_REMOTE_CONFIG__, com fallback http://localhost:3010/remoteEntry.js. Configura react, react-dom, react-router, react-router-dom, shared-design-system como singletons.

**Interpretação:** A configuração de module-logging liga esta unidade ao remote sharedDesignSystem por Module Federation e oferece o próprio App para consumo.

### 9. module-virtual-machine/webpack.config.js:29-71

**Observação:** O ModuleFederationPlugin declara name: "virtual_machine", filename: "remoteEntry.js". Expõe `./VirtualMachineApp` → `./src/App`. Declara sharedDesignSystem como remote promise: reutiliza window.sharedDesignSystem ou injeta o script da URL design_system de window.__RUNTIME_REMOTE_CONFIG__, com fallback http://localhost:3010/remoteEntry.js. Configura react, react-dom, react-router, react-router-dom, styled-components, shared-design-system como singletons.

**Interpretação:** A configuração de module-virtual-machine liga esta unidade ao remote sharedDesignSystem por Module Federation e oferece o próprio App para consumo.

### 10. shared-design-system/webpack.config.js:35-60

**Observação:** O ModuleFederationPlugin declara name: "sharedDesignSystem", filename: "remoteEntry.js". Expõe `./tokens` → `./src/tokens/index.js`, `./styles` → `./src/styles/global.css`, `./ThemeContext` → `./src/contexts/ThemeContext.jsx`, `./Button` → `./src/components/Button.jsx`, `./Card` → `./src/components/Card.jsx`, `./Badge` → `./src/components/Badge.jsx`, `./Loader` → `./src/components/Loader.jsx`, `./PageHeader` → `./src/components/PageHeader.jsx`, `./EmptyState` → `./src/components/EmptyState.jsx`, `./Toast` → `./src/components/Toast.jsx`. Configura react, react-dom como singletons.

**Interpretação:** Configura um container federado que oferece tokens, estilos, contexto e componentes; o bloco não identifica seus consumidores.

### 11. shell-app/webpack.config.js:30-59

**Observação:** O ModuleFederationPlugin declara name: "shell". Declara sharedDesignSystem como remote promise: reutiliza window.sharedDesignSystem ou injeta o script da URL design_system de window.__RUNTIME_REMOTE_CONFIG__, com fallback http://localhost:3010/remoteEntry.js. Configura react, react-dom, react-router, react-router-dom, styled-components, shared-design-system como singletons.

**Interpretação:** A configuração de shell-app liga esta unidade ao remote sharedDesignSystem por Module Federation. Os nove module-* são resolvidos pelo loader do shell, fora deste bloco.

### 12. shell-app/webpack.prod.config.js:42-66

**Observação:** O ModuleFederationPlugin declara name: "shell". Declara sharedDesignSystem como remote promise: reutiliza window.sharedDesignSystem ou injeta o script da URL design_system de window.__RUNTIME_REMOTE_CONFIG__, com fallback http://localhost:3010/remoteEntry.js. Configura react, react-dom, react-router, react-router-dom, styled-components, shared-design-system como singletons.

**Interpretação:** A configuração de shell-app liga esta unidade ao remote sharedDesignSystem por Module Federation. Os nove module-* são resolvidos pelo loader do shell, fora deste bloco.

### 13. module-cloud-console/src/bootstrap.js:4; module-cloud-console/src/bootstrap.js:3-7

**Observação:** O bootstrap importa react-dom/client de forma assíncrona e usa createRoot para renderizar o App local.

**Interpretação:** A carga de um pacote do framework renderiza a própria unidade; não liga frontends.

### 14. module-cloud-labs/src/bootstrap.js:4; module-cloud-labs/src/bootstrap.js:3-7

**Observação:** O bootstrap importa react-dom/client de forma assíncrona e usa createRoot para renderizar o App local.

**Interpretação:** A carga de um pacote do framework renderiza a própria unidade; não liga frontends.

### 15. module-code-environment/src/bootstrap.js:4; module-code-environment/src/bootstrap.js:3-7

**Observação:** O bootstrap importa react-dom/client de forma assíncrona e usa createRoot para renderizar o App local.

**Interpretação:** A carga de um pacote do framework renderiza a própria unidade; não liga frontends.

### 16. module-content-uploading/src/bootstrap.js:2; module-content-uploading/src/bootstrap.js:1-5

**Observação:** O bootstrap importa react-dom/client de forma assíncrona e usa createRoot para renderizar o App local.

**Interpretação:** A carga de um pacote do framework renderiza a própria unidade; não liga frontends.

### 17. module-dashboard/src/bootstrap.js:4; module-dashboard/src/bootstrap.js:3-7

**Observação:** O bootstrap importa react-dom/client de forma assíncrona e usa createRoot para renderizar o App local.

**Interpretação:** A carga de um pacote do framework renderiza a própria unidade; não liga frontends.

### 18. module-logging/src/bootstrap.js:4; module-logging/src/bootstrap.js:3-7

**Observação:** O bootstrap importa react-dom/client de forma assíncrona e usa createRoot para renderizar o App local.

**Interpretação:** A carga de um pacote do framework renderiza a própria unidade; não liga frontends.

### 19. module-virtual-machine/src/bootstrap.js:4; module-virtual-machine/src/bootstrap.js:3-7

**Observação:** O bootstrap importa react-dom/client de forma assíncrona e usa createRoot para renderizar o App local.

**Interpretação:** A carga de um pacote do framework renderiza a própria unidade; não liga frontends.

### 20. module-assessment/src/index.js:1

**Observação:** A entrada executa import("./bootstrap").

**Interpretação:** É uma fronteira assíncrona local, sinal tecnológico isolado, sem identificar mecanismo nem destino de composição nesta construção.

### 21. module-cloud-console/src/index.js:4

**Observação:** A entrada executa import("./bootstrap").

**Interpretação:** É uma fronteira assíncrona local, sinal tecnológico isolado, sem identificar mecanismo nem destino de composição nesta construção.

### 22. module-cloud-labs/src/index.js:4

**Observação:** A entrada executa import("./bootstrap").

**Interpretação:** É uma fronteira assíncrona local, sinal tecnológico isolado, sem identificar mecanismo nem destino de composição nesta construção.

### 23. module-code-environment/src/index.js:4

**Observação:** A entrada executa import("./bootstrap").

**Interpretação:** É uma fronteira assíncrona local, sinal tecnológico isolado, sem identificar mecanismo nem destino de composição nesta construção.

### 24. module-code-module/src/index.js:1

**Observação:** A entrada executa import("./bootstrap").

**Interpretação:** É uma fronteira assíncrona local, sinal tecnológico isolado, sem identificar mecanismo nem destino de composição nesta construção.

### 25. module-content-uploading/src/index.js:1

**Observação:** A entrada executa import("./bootstrap").

**Interpretação:** É uma fronteira assíncrona local, sinal tecnológico isolado, sem identificar mecanismo nem destino de composição nesta construção.

### 26. module-dashboard/src/index.js:4

**Observação:** A entrada executa import("./bootstrap").

**Interpretação:** É uma fronteira assíncrona local, sinal tecnológico isolado, sem identificar mecanismo nem destino de composição nesta construção.

### 27. module-logging/src/index.js:4

**Observação:** A entrada executa import("./bootstrap").

**Interpretação:** É uma fronteira assíncrona local, sinal tecnológico isolado, sem identificar mecanismo nem destino de composição nesta construção.

### 28. module-virtual-machine/src/index.js:4

**Observação:** A entrada executa import("./bootstrap").

**Interpretação:** É uma fronteira assíncrona local, sinal tecnológico isolado, sem identificar mecanismo nem destino de composição nesta construção.

### 29. shared-design-system/src/index.js:1

**Observação:** A entrada executa import("./bootstrap").

**Interpretação:** É uma fronteira assíncrona local, sinal tecnológico isolado, sem identificar mecanismo nem destino de composição nesta construção.

### 30. shell-app/src/index.js:2

**Observação:** A entrada executa import("./bootstrap").

**Interpretação:** É uma fronteira assíncrona local, sinal tecnológico isolado, sem identificar mecanismo nem destino de composição nesta construção.

### 31. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:35-49; shell-app/src/App.jsx:15-77

**Observação:** `__webpack_init_sharing__("default")` em `initRemoteContainer` (shell-app/src/remotes/remoteLoader.js:35-49) inicializa o escopo compartilhado antes de iniciar o container remoto

**Interpretação:** Implementa parte do loader de Module Federation; o nome do destino chega por parâmetro, sem estabelecer sozinho uma ligação entre unidades.

### 32. shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:41-47

**Observação:** `container.init(__webpack_share_scopes__.default)` inicia o container `window[scope]` do remote carregado (shell-app/src/remotes/remoteLoader.js:41-47); mesma cadeia de :59

**Interpretação:** Implementa parte do loader de Module Federation; o nome do destino chega por parâmetro, sem estabelecer sozinho uma ligação entre unidades.

### 33. shell-app/src/remotes/remoteLoader.js:51

**Observação:** Definição de `loadRemoteModule`: injeta o `remoteEntry.js` (:58), inicia o container (:59) e obtém o módulo exposto por `container.get(exposedModule)` (:62-63)

**Interpretação:** Implementa parte do loader de Module Federation; o nome do destino chega por parâmetro, sem estabelecer sozinho uma ligação entre unidades.

### 34. shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:80-88; shell-app/src/App.jsx:11; shell-app/src/App.jsx:15-77

**Observação:** `loadRemoteModule({ remoteName, remoteUrl, exposedModule })` dentro de `ReactLazyWrapper` (shell-app/src/remotes/remoteLoader.js:80-88), retornado por `loadRemoteComponent` (:68-78), importado em shell-app/src/App.jsx:11 e chamado para os nove remotes (shell-app/src/App.jsx:15-77)

**Interpretação:** Implementa parte do loader de Module Federation; o nome do destino chega por parâmetro, sem estabelecer sozinho uma ligação entre unidades.

### 35. module-assessment/webpack.config.js:44; module-assessment/webpack.config.js:39-50; module-assessment/src/ThemeContext.jsx:1; module-assessment/src/pages/Assessment.jsx:15-16; module-assessment/webpack.config.js:35-74

**Observação:** Remote `sharedDesignSystem` como `promise` (module-assessment/webpack.config.js:39-50): injeta o `remoteEntry.js` do shared-design-system pela URL `design_system` de `window.__RUNTIME_REMOTE_CONFIG__` ou `http://localhost:3010/remoteEntry.js` (:42-43). Usado: `ThemeProvider` reexportado de `sharedDesignSystem/ThemeContext` (module-assessment/src/ThemeContext.jsx:1) e `PageHeader`/`Card` (module-assessment/src/pages/Assessment.jsx:15-16)

**Interpretação:** O código do remote promise de module-assessment nomeia sharedDesignSystem e carrega seu container federado, ligando as duas unidades.

### 36. module-cloud-console/webpack.config.js:43; module-cloud-console/webpack.config.js:38-49; module-cloud-console/src/ThemeContext.jsx:1; module-cloud-console/src/CloudConsole.jsx:7-8; module-cloud-console/webpack.config.js:34-73

**Observação:** Remote `sharedDesignSystem` como `promise` (module-cloud-console/webpack.config.js:38-49), mesma injeção do `remoteEntry.js` do shared-design-system (:41-42); usado em module-cloud-console/src/ThemeContext.jsx:1 e module-cloud-console/src/CloudConsole.jsx:7-8

**Interpretação:** O código do remote promise de module-cloud-console nomeia sharedDesignSystem e carrega seu container federado, ligando as duas unidades.

### 37. module-cloud-labs/webpack.config.js:38; module-cloud-labs/webpack.config.js:33-44; module-cloud-labs/src/ThemeContext.jsx:1; module-cloud-labs/src/CloudLabs.jsx:6-7; module-cloud-labs/webpack.config.js:29-68

**Observação:** Remote `sharedDesignSystem` como `promise` (module-cloud-labs/webpack.config.js:33-44), mesma injeção do `remoteEntry.js` do shared-design-system (:36-37); usado em module-cloud-labs/src/ThemeContext.jsx:1 e module-cloud-labs/src/CloudLabs.jsx:6-7

**Interpretação:** O código do remote promise de module-cloud-labs nomeia sharedDesignSystem e carrega seu container federado, ligando as duas unidades.

### 38. module-code-environment/webpack.config.js:39; module-code-environment/webpack.config.js:34-45; module-code-environment/src/ThemeContext.jsx:1; module-code-environment/src/CodeEnvironment.jsx:9-10; module-code-environment/webpack.config.js:30-69

**Observação:** Remote `sharedDesignSystem` como `promise` (module-code-environment/webpack.config.js:34-45), mesma injeção do `remoteEntry.js` do shared-design-system (:37-38); usado em module-code-environment/src/ThemeContext.jsx:1 e module-code-environment/src/CodeEnvironment.jsx:9-10

**Interpretação:** O código do remote promise de module-code-environment nomeia sharedDesignSystem e carrega seu container federado, ligando as duas unidades.

### 39. module-code-module/webpack.config.js:46; module-code-module/webpack.config.js:41-52; module-code-module/src/ThemeContext.jsx:1; module-code-module/src/CodeModule.jsx:24; module-code-module/webpack.config.js:37-79

**Observação:** Remote `sharedDesignSystem` como `promise` (module-code-module/webpack.config.js:41-52), mesma injeção do `remoteEntry.js` do shared-design-system (:44-45); usado em module-code-module/src/ThemeContext.jsx:1 e module-code-module/src/CodeModule.jsx:24

**Interpretação:** O código do remote promise de module-code-module nomeia sharedDesignSystem e carrega seu container federado, ligando as duas unidades.

### 40. module-content-uploading/webpack.config.js:38; module-content-uploading/webpack.config.js:33-44; module-content-uploading/src/ThemeContext.jsx:1; module-content-uploading/src/Content.jsx:12-13; module-content-uploading/webpack.config.js:29-68

**Observação:** Remote `sharedDesignSystem` como `promise` (module-content-uploading/webpack.config.js:33-44), mesma injeção do `remoteEntry.js` do shared-design-system (:36-37); usado em module-content-uploading/src/ThemeContext.jsx:1 e module-content-uploading/src/Content.jsx:12-13

**Interpretação:** O código do remote promise de module-content-uploading nomeia sharedDesignSystem e carrega seu container federado, ligando as duas unidades.

### 41. module-dashboard/webpack.config.js:38; module-dashboard/webpack.config.js:33-44; module-dashboard/src/ThemeContext.jsx:1; module-dashboard/src/Dashboard.jsx:24-25; module-dashboard/webpack.config.js:29-68

**Observação:** Remote `sharedDesignSystem` como `promise` (module-dashboard/webpack.config.js:33-44), mesma injeção do `remoteEntry.js` do shared-design-system (:36-37); usado em module-dashboard/src/ThemeContext.jsx:1 e module-dashboard/src/Dashboard.jsx:24-25

**Interpretação:** O código do remote promise de module-dashboard nomeia sharedDesignSystem e carrega seu container federado, ligando as duas unidades.

### 42. module-logging/webpack.config.js:39; module-logging/webpack.config.js:34-45; module-logging/src/ThemeContext.jsx:1; module-logging/src/Logs.jsx:27-28; module-logging/webpack.config.js:30-69

**Observação:** Remote `sharedDesignSystem` como `promise` (module-logging/webpack.config.js:34-45), mesma injeção do `remoteEntry.js` do shared-design-system (:37-38); usado em module-logging/src/ThemeContext.jsx:1 e module-logging/src/Logs.jsx:27-28

**Interpretação:** O código do remote promise de module-logging nomeia sharedDesignSystem e carrega seu container federado, ligando as duas unidades.

### 43. module-virtual-machine/webpack.config.js:38; module-virtual-machine/webpack.config.js:33-44; module-virtual-machine/src/ThemeContext.jsx:1; module-virtual-machine/src/VirtualMachine.jsx:23; module-virtual-machine/webpack.config.js:29-71

**Observação:** Remote `sharedDesignSystem` como `promise` (module-virtual-machine/webpack.config.js:33-44), mesma injeção do `remoteEntry.js` do shared-design-system (:36-37); usado em module-virtual-machine/src/ThemeContext.jsx:1 e module-virtual-machine/src/VirtualMachine.jsx:23

**Interpretação:** O código do remote promise de module-virtual-machine nomeia sharedDesignSystem e carrega seu container federado, ligando as duas unidades.

### 44. shell-app/src/remotes/remoteLoader.js:9; shell-app/src/remotes/remoteLoader.js:4-31; shell-app/src/config/remoteConfig.js:28-31; shell-app/public/index.html:18-51

**Observação:** loadScript cria um elemento script, atribui a URL recebida e o anexa ao head; loadRemoteModule usa essa função para carregar remoteEntry.js.

**Interpretação:** A injeção implementa a carga dinâmica do mecanismo de federação, recebendo o destino por parâmetro.

### 45. shell-app/webpack.config.js:40; shell-app/webpack.config.js:35-46; shell-app/package.json:6; shell-app/src/App.jsx:3; shell-app/src/contexts/ThemeContext.jsx:1; shell-app/webpack.config.js:30-59

**Observação:** Remote `sharedDesignSystem` como `promise` (shell-app/webpack.config.js:35-46) injeta o `remoteEntry.js` do shared-design-system (URL `design_system`, :38-39); config do script `build` (shell-app/package.json:6). Usado por `import "sharedDesignSystem/styles"` (shell-app/src/App.jsx:3) e pelo `ThemeProvider` de shell-app/src/contexts/ThemeContext.jsx:1

**Interpretação:** O código do remote promise de shell-app nomeia sharedDesignSystem e carrega seu container federado, ligando as duas unidades.

### 46. shell-app/webpack.prod.config.js:50; shell-app/webpack.prod.config.js:45-56; shell-app/Dockerfile:26; shell-app/webpack.prod.config.js:42-66

**Observação:** Mesmo remote `sharedDesignSystem` como `promise` (shell-app/webpack.prod.config.js:45-56) no config usado pela imagem Docker (shell-app/Dockerfile:26)

**Interpretação:** O código do remote promise de shell-app nomeia sharedDesignSystem e carrega seu container federado, ligando as duas unidades.

### 47. module-assessment/src/pages/KodeEnvSection.jsx:369; module-assessment/src/pages/KodeEnvSection.jsx:7

**Observação:** O iframe recebe uma URL do cliente Guacamole externo composta com connectionId e token da instância selecionada.

**Interpretação:** A incorporação mostra uma sessão de VM do laboratório; a revisão registra Composição No, pois não é uma unidade frontend do conjunto.

### 48. module-code-module/src/CodeModule.jsx:847; module-code-module/src/CodeModule.jsx:35

**Observação:** O iframe recebe uma URL do cliente Guacamole externo composta com connectionId e token da instância selecionada.

**Interpretação:** A incorporação mostra uma sessão de VM do laboratório; a revisão registra Composição No, pois não é uma unidade frontend do conjunto.

### 49. shell-app/src/App.jsx:15; shell-app/src/App.jsx:15-21; module-cloud-labs/webpack.config.js:30; shell-app/src/App.jsx:181-192; module-cloud-labs/webpack.config.js:29-68

**Observação:** `React.lazy(loadRemoteComponent({ remoteName: "cloud_labs", exposedModule: "./CloudLabsApp", getRemoteUrl }))` (shell-app/src/App.jsx:15-21) carrega em runtime o módulo exposto por module-cloud-labs (`name: "cloud_labs"`, module-cloud-labs/webpack.config.js:30; `./CloudLabsApp`, :47); rota `/cloud-labs` em shell-app/src/App.jsx:181-192

**Interpretação:** Nomeia o container remoto e seu módulo exposto no ponto de carga, ligando o host à unidade de destino.

### 50. shell-app/src/App.jsx:22; shell-app/src/App.jsx:22-28; module-dashboard/webpack.config.js:30; shell-app/src/App.jsx:169-180; module-dashboard/webpack.config.js:29-68

**Observação:** `React.lazy` de `dashboard`/`./DashboardApp` (shell-app/src/App.jsx:22-28), exposto por module-dashboard (module-dashboard/webpack.config.js:30, :47); rota `/dashboard` em shell-app/src/App.jsx:169-180

**Interpretação:** Nomeia o container remoto e seu módulo exposto no ponto de carga, ligando o host à unidade de destino.

### 51. shell-app/src/App.jsx:29; shell-app/src/App.jsx:29-35; module-virtual-machine/webpack.config.js:30; shell-app/src/App.jsx:193-204; module-virtual-machine/webpack.config.js:29-71

**Observação:** `React.lazy` de `virtual_machine`/`./VirtualMachineApp` (shell-app/src/App.jsx:29-35), exposto por module-virtual-machine (module-virtual-machine/webpack.config.js:30, :47); rota `/virtual-machine` em shell-app/src/App.jsx:193-204

**Interpretação:** Nomeia o container remoto e seu módulo exposto no ponto de carga, ligando o host à unidade de destino.

### 52. shell-app/src/App.jsx:36; shell-app/src/App.jsx:36-42; module-cloud-console/webpack.config.js:35; shell-app/src/App.jsx:205-216; module-cloud-console/webpack.config.js:34-73

**Observação:** `React.lazy` de `cloud_console`/`./CloudConsoleApp` (shell-app/src/App.jsx:36-42), exposto por module-cloud-console (module-cloud-console/webpack.config.js:35, :52); rota `/cloud-console` em shell-app/src/App.jsx:205-216

**Interpretação:** Nomeia o container remoto e seu módulo exposto no ponto de carga, ligando o host à unidade de destino.

### 53. shell-app/src/App.jsx:43; shell-app/src/App.jsx:43-49; module-logging/webpack.config.js:31; shell-app/src/App.jsx:217-228; module-logging/webpack.config.js:30-69

**Observação:** `React.lazy` de `logging`/`./LoggingApp` (shell-app/src/App.jsx:43-49), exposto por module-logging (module-logging/webpack.config.js:31, :48); rota `/system-logs` em shell-app/src/App.jsx:217-228

**Interpretação:** Nomeia o container remoto e seu módulo exposto no ponto de carga, ligando o host à unidade de destino.

### 54. shell-app/src/App.jsx:50; shell-app/src/App.jsx:50-56; module-code-environment/webpack.config.js:31; shell-app/src/App.jsx:229-240; module-code-environment/webpack.config.js:30-69

**Observação:** `React.lazy` de `code_environment`/`./CodeEnvironmentApp` (shell-app/src/App.jsx:50-56), exposto por module-code-environment (module-code-environment/webpack.config.js:31, :48); rota `/code-environment` em shell-app/src/App.jsx:229-240

**Interpretação:** Nomeia o container remoto e seu módulo exposto no ponto de carga, ligando o host à unidade de destino.

### 55. shell-app/src/App.jsx:57; shell-app/src/App.jsx:57-63; module-code-module/webpack.config.js:38; shell-app/src/App.jsx:241-252; module-code-module/webpack.config.js:37-79

**Observação:** `React.lazy` de `code_module`/`./CodeModuleApp` (shell-app/src/App.jsx:57-63), exposto por module-code-module (module-code-module/webpack.config.js:38, :55); rota `/code-module` em shell-app/src/App.jsx:241-252

**Interpretação:** Nomeia o container remoto e seu módulo exposto no ponto de carga, ligando o host à unidade de destino.

### 56. shell-app/src/App.jsx:64; shell-app/src/App.jsx:64-70; module-content-uploading/webpack.config.js:30; shell-app/src/App.jsx:253-264; module-content-uploading/webpack.config.js:29-68

**Observação:** `React.lazy` de `content_uploading`/`./ContentUploadingApp` (shell-app/src/App.jsx:64-70), exposto por module-content-uploading (module-content-uploading/webpack.config.js:30, :47); rota `/content-uploading/*` em shell-app/src/App.jsx:253-264

**Interpretação:** Nomeia o container remoto e seu módulo exposto no ponto de carga, ligando o host à unidade de destino.

### 57. shell-app/src/App.jsx:71; shell-app/src/App.jsx:71-77; module-assessment/webpack.config.js:36; shell-app/src/App.jsx:265-276; module-assessment/webpack.config.js:35-74

**Observação:** `React.lazy` de `assessment`/`./AssessmentApp` (shell-app/src/App.jsx:71-77), exposto por module-assessment (module-assessment/webpack.config.js:36, :53); rota `/assessment/*` em shell-app/src/App.jsx:265-276

**Interpretação:** Nomeia o container remoto e seu módulo exposto no ponto de carga, ligando o host à unidade de destino.

### 58. shell-app/src/App.jsx:148; shell-app/src/App.jsx:128-153; shell-app/src/bootstrap.js:6

**Observação:** `RemoteWrapper` renderiza `<Component />`, o componente lazy do remote, dentro de `RemoteErrorBoundary` e `Suspense` (shell-app/src/App.jsx:128-153); recebe os nove componentes pelas rotas de :169-276. `App` é renderizado em shell-app/src/bootstrap.js:6

**Interpretação:** O wrapper renderiza o componente remoto recebido por parâmetro, com tratamento de espera e erro; não nomeia sozinho o destino.

### 59. shell-app/src/App.jsx:167; shell-app/src/App.jsx:167-277; shell-app/src/App.jsx:294

**Observação:** `<Routes>` de `AppLayout` (shell-app/src/App.jsx:167-277) declara as nove rotas e o remote de cada uma (`remoteName` e `component`, ex.: `/dashboard` → `dashboard`/`DashboardApp`, :169-180); `AppLayout` é a rota `/*` de shell-app/src/App.jsx:294

**Interpretação:** A tabela de rotas liga caminhos do shell aos nove componentes remotos identificados; explicita sua composição na interface.

### 60. shell-app/src/App.jsx:291; shell-app/src/App.jsx:291-296; shell-app/src/contexts/ThemeContext.jsx:1; shell-app/src/App.jsx:6; shared-design-system/webpack.config.js:41; shell-app/src/App.jsx:3; shared-design-system/webpack.config.js:40; shared-design-system/webpack.config.js:35-60

**Observação:** Renderiza `<ThemeProvider>` em volta do app (shell-app/src/App.jsx:291-296); vem do reexport de `sharedDesignSystem/ThemeContext` (shell-app/src/contexts/ThemeContext.jsx:1, importado em shell-app/src/App.jsx:6), exposto pelo shared-design-system (shared-design-system/webpack.config.js:41). O shell também carrega `sharedDesignSystem/styles` por import estático (shell-app/src/App.jsx:3; exposto em shared-design-system/webpack.config.js:40)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 61. shell-app/src/contexts/AuthContext.jsx:229; shell-app/src/contexts/AuthContext.jsx:228-262; module-dashboard/src/AuthContext.jsx:30-33; module-cloud-labs/src/AuthContext.jsx:111-113; shell-app/src/components/Login.jsx:70-71; shell-app/src/App.jsx:290

**Observação:** O `AuthProvider` do shell publica a ponte `window.__SHELL_AUTH__` (shell-app/src/contexts/AuthContext.jsx:228-262) com usuário, senha, token, papel, `accessFlags`, `onAuthChange` e `signOut`; avisa os assinantes no logout (:218-224). Os remotes a leem quando rodam no shell, ex.: module-dashboard/src/AuthContext.jsx:30-33 e module-cloud-labs/src/AuthContext.jsx:111-113; o login do shell grava as credenciais por ela (shell-app/src/components/Login.jsx:70-71). `AuthProvider` envolve o app em shell-app/src/App.jsx:290

**Interpretação:** A ponte publica estado e assinaturas para comunicação entre unidades; os consumidores concretos aparecem nas relações de composição.

### 62. shared-design-system/src/contexts/ThemeContext.jsx:21; shared-design-system/webpack.config.js:41; shared-design-system/src/contexts/ThemeContext.jsx:14-22; shell-app/src/App.jsx:291; module-dashboard/src/App.jsx:11; module-assessment/src/pages/AssessmentReports.jsx:418; shell-app/src/components/Login.jsx:50; shared-design-system/webpack.config.js:35-60

**Observação:** O `ThemeProvider` exposto (`./ThemeContext`, shared-design-system/webpack.config.js:41) grava o tema na chave `theme` do `localStorage` e aplica a classe `dark` no `documentElement` (shared-design-system/src/contexts/ThemeContext.jsx:14-22); cada instância lê a chave ao montar (:8) e escuta o evento `storage` (:24-33). O shell e os nove módulos usam cada um o seu `ThemeProvider` (ex.: shell-app/src/App.jsx:291, module-dashboard/src/App.jsx:11), e módulos alteram o tema com `toggleTheme` (ex.: module-assessment/src/pages/AssessmentReports.jsx:418); o login do shell grava a mesma chave (shell-app/src/components/Login.jsx:50, :53)

**Interpretação:** O contexto compartilhado usa armazenamento e estado do DOM para comunicar tema entre as instâncias das unidades; o listener storage não demonstra emissão sintética na mesma página.

### 63. module-assessment/src/App.jsx:24; module-assessment/src/App.jsx:22-45; module-assessment/src/ThemeContext.jsx:1; module-assessment/webpack.config.js:53; module-assessment/webpack.config.js:35-74

**Observação:** Renderiza `<ThemeProvider>` do shared-design-system em volta das rotas do módulo (module-assessment/src/App.jsx:22-45); reexport de `sharedDesignSystem/ThemeContext` em module-assessment/src/ThemeContext.jsx:1. `App` é o módulo exposto `./AssessmentApp` (module-assessment/webpack.config.js:53)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 64. module-assessment/src/pages/Assessment.jsx:350; module-assessment/src/pages/Assessment.jsx:15; shared-design-system/webpack.config.js:46; module-assessment/src/App.jsx:29; shared-design-system/webpack.config.js:35-60

**Observação:** Renderiza `<PageHeader>` do shared-design-system (import `sharedDesignSystem/PageHeader`, module-assessment/src/pages/Assessment.jsx:15; exposto em shared-design-system/webpack.config.js:46); `Assessment` é a rota `/` de module-assessment/src/App.jsx:29

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 65. module-assessment/src/pages/Assessment.jsx:400; module-assessment/src/pages/Assessment.jsx:16; shared-design-system/webpack.config.js:43; shared-design-system/webpack.config.js:35-60

**Observação:** Renderiza `<Card>` do shared-design-system (import `sharedDesignSystem/Card`, module-assessment/src/pages/Assessment.jsx:16; exposto em shared-design-system/webpack.config.js:43)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 66. module-assessment/src/pages/AssessmentsList.jsx:706; module-assessment/src/pages/AssessmentsList.jsx:9; module-assessment/src/App.jsx:30

**Observação:** Renderiza `<PageHeader>` do shared-design-system (import em module-assessment/src/pages/AssessmentsList.jsx:9); `AssessmentsList` é a rota `/assessments-list` de module-assessment/src/App.jsx:30

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 67. module-cloud-console/src/App.jsx:11; module-cloud-console/src/ThemeContext.jsx:1; module-cloud-console/webpack.config.js:52; module-cloud-console/webpack.config.js:34-73

**Observação:** Renderiza `<ThemeProvider>` do shared-design-system (reexport em module-cloud-console/src/ThemeContext.jsx:1); `App` é o módulo exposto `./CloudConsoleApp` (module-cloud-console/webpack.config.js:52)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 68. module-cloud-console/src/CloudConsole.jsx:261; module-cloud-console/src/CloudConsole.jsx:7; module-cloud-console/src/App.jsx:12

**Observação:** Renderiza `<PageHeader>` do shared-design-system (import em module-cloud-console/src/CloudConsole.jsx:7); `CloudConsole` é renderizado em module-cloud-console/src/App.jsx:12

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 69. module-cloud-console/src/CloudConsole.jsx:281; module-cloud-console/src/CloudConsole.jsx:8

**Observação:** Renderiza `<Card>` do shared-design-system (import em module-cloud-console/src/CloudConsole.jsx:8)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 70. module-cloud-labs/src/App.jsx:11; module-cloud-labs/src/ThemeContext.jsx:1; module-cloud-labs/webpack.config.js:47; module-cloud-labs/webpack.config.js:29-68

**Observação:** Renderiza `<ThemeProvider>` do shared-design-system (reexport em module-cloud-labs/src/ThemeContext.jsx:1); `App` é o módulo exposto `./CloudLabsApp` (module-cloud-labs/webpack.config.js:47)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 71. module-cloud-labs/src/CloudLabs.jsx:28; module-cloud-labs/src/CloudLabs.jsx:6

**Observação:** Renderiza `<PageHeader>` do shared-design-system (import em module-cloud-labs/src/CloudLabs.jsx:6)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 72. module-cloud-labs/src/CloudLabs.jsx:37; module-cloud-labs/src/CloudLabs.jsx:7

**Observação:** Renderiza `<Card>` do shared-design-system (import em module-cloud-labs/src/CloudLabs.jsx:7)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 73. module-code-environment/src/App.jsx:11; module-code-environment/src/ThemeContext.jsx:1; module-code-environment/webpack.config.js:48; module-code-environment/webpack.config.js:30-69

**Observação:** Renderiza `<ThemeProvider>` do shared-design-system (reexport em module-code-environment/src/ThemeContext.jsx:1); `App` é o módulo exposto `./CodeEnvironmentApp` (module-code-environment/webpack.config.js:48)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 74. module-code-environment/src/CodeEnvironment.jsx:39; module-code-environment/src/CodeEnvironment.jsx:28-39; module-code-environment/src/CodeEnvironment.jsx:10

**Observação:** Renderiza `<Card>` do shared-design-system em `TaskCard` (module-code-environment/src/CodeEnvironment.jsx:28-39; import em :10), usado em :548

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 75. module-code-environment/src/CodeEnvironment.jsx:492; module-code-environment/src/CodeEnvironment.jsx:9

**Observação:** Renderiza `<PageHeader>` do shared-design-system (import em module-code-environment/src/CodeEnvironment.jsx:9)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 76. module-code-module/src/App.jsx:11; module-code-module/src/ThemeContext.jsx:1; module-code-module/webpack.config.js:55; module-code-module/webpack.config.js:37-79

**Observação:** Renderiza `<ThemeProvider>` do shared-design-system (reexport em module-code-module/src/ThemeContext.jsx:1); `App` é o módulo exposto `./CodeModuleApp` (module-code-module/webpack.config.js:55)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 77. module-code-module/src/CodeModule.jsx:887; module-code-module/src/CodeModule.jsx:24

**Observação:** Renderiza `<PageHeader>` do shared-design-system (import em module-code-module/src/CodeModule.jsx:24)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 78. module-content-uploading/src/App.jsx:12; module-content-uploading/src/App.jsx:12-18; module-content-uploading/src/ThemeContext.jsx:1; module-content-uploading/webpack.config.js:47; module-content-uploading/webpack.config.js:29-68

**Observação:** Renderiza `<ThemeProvider>` do shared-design-system em volta das rotas do módulo (module-content-uploading/src/App.jsx:12-18; reexport em module-content-uploading/src/ThemeContext.jsx:1); `App` é o módulo exposto `./ContentUploadingApp` (module-content-uploading/webpack.config.js:47)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 79. module-content-uploading/src/Content.jsx:639; module-content-uploading/src/Content.jsx:12; module-content-uploading/src/App.jsx:14

**Observação:** Renderiza `<PageHeader>` do shared-design-system (import em module-content-uploading/src/Content.jsx:12); `Content` é a rota `/` de module-content-uploading/src/App.jsx:14

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 80. module-content-uploading/src/CohortContent.jsx:311; module-content-uploading/src/CohortContent.jsx:13; module-content-uploading/src/App.jsx:15-16

**Observação:** Renderiza `<PageHeader>` do shared-design-system (import em module-content-uploading/src/CohortContent.jsx:13); `CohortContent` é a rota de module-content-uploading/src/App.jsx:15-16

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 81. module-content-uploading/src/CohortContent.jsx:327; module-content-uploading/src/CohortContent.jsx:14

**Observação:** Renderiza `<Card>` do shared-design-system (import em module-content-uploading/src/CohortContent.jsx:14; de novo em :755)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 82. module-dashboard/src/App.jsx:11; module-dashboard/src/ThemeContext.jsx:1; module-dashboard/webpack.config.js:47; module-dashboard/webpack.config.js:29-68

**Observação:** Renderiza `<ThemeProvider>` do shared-design-system (reexport em module-dashboard/src/ThemeContext.jsx:1); `App` é o módulo exposto `./DashboardApp` (module-dashboard/webpack.config.js:47)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 83. module-dashboard/src/Dashboard.jsx:203; module-dashboard/src/Dashboard.jsx:202-203; module-dashboard/src/Dashboard.jsx:25

**Observação:** Renderiza `<Card>` do shared-design-system em `StatCard` (module-dashboard/src/Dashboard.jsx:202-203; import em :25), usado em :293; de novo em :301 e :362

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 84. module-dashboard/src/Dashboard.jsx:272; module-dashboard/src/Dashboard.jsx:270-272; module-dashboard/src/Dashboard.jsx:24

**Observação:** Renderiza `<PageHeader>` do shared-design-system em `AdminDashboard` (module-dashboard/src/Dashboard.jsx:270-272; import em :24), renderizado em :420 e :427

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 85. module-logging/src/App.jsx:11; module-logging/src/ThemeContext.jsx:1; module-logging/webpack.config.js:48; module-logging/webpack.config.js:30-69

**Observação:** Renderiza `<ThemeProvider>` do shared-design-system (reexport em module-logging/src/ThemeContext.jsx:1); `App` é o módulo exposto `./LoggingApp` (module-logging/webpack.config.js:48)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 86. module-logging/src/Logs.jsx:458; module-logging/src/Logs.jsx:457-458; module-logging/src/Logs.jsx:28

**Observação:** Renderiza `<Card>` do shared-design-system em `StatCard` (module-logging/src/Logs.jsx:457-458; import em :28), usado em :513

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 87. module-logging/src/Logs.jsx:492; module-logging/src/Logs.jsx:27

**Observação:** Renderiza `<PageHeader>` do shared-design-system (import em module-logging/src/Logs.jsx:27)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 88. module-virtual-machine/src/App.jsx:11; module-virtual-machine/src/ThemeContext.jsx:1; module-virtual-machine/webpack.config.js:47; module-virtual-machine/webpack.config.js:29-71

**Observação:** Renderiza `<ThemeProvider>` do shared-design-system (reexport em module-virtual-machine/src/ThemeContext.jsx:1); `App` é o módulo exposto `./VirtualMachineApp` (module-virtual-machine/webpack.config.js:47)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 89. module-virtual-machine/src/VirtualMachine.jsx:802; module-virtual-machine/src/VirtualMachine.jsx:23

**Observação:** Renderiza `<PageHeader>` do shared-design-system (import em module-virtual-machine/src/VirtualMachine.jsx:23)

**Interpretação:** Usa o componente do design system federado na renderização da unidade. O ponto de renderização utiliza o mecanismo sem declarar uma rota entre aplicações.

### 90. module-assessment/; module-assessment/webpack.config.js:6; module-assessment/src/bootstrap.js:7; module-assessment/package.json:6; module-assessment/Dockerfile:2; docker-compose.yml:145-148; module-assessment/Dockerfile:15-20

**Observação:** O diretório module-assessment tem package.json e configuração webpack próprios. A entrada renderiza o App React da unidade. O manifesto declara build com webpack; o Dockerfile constrói o diretório e copia seu dist para uma imagem nginx, vinculada a serviço próprio no compose.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios.

### 91. module-cloud-console/; module-cloud-console/webpack.config.js:7; module-cloud-console/src/bootstrap.js:6; module-cloud-console/package.json:6; module-cloud-console/Dockerfile:2; docker-compose.yml:80-83; module-cloud-console/Dockerfile:15-20

**Observação:** O diretório module-cloud-console tem package.json e configuração webpack próprios. A entrada renderiza o App React da unidade. O manifesto declara build com webpack; o Dockerfile constrói o diretório e copia seu dist para uma imagem nginx, vinculada a serviço próprio no compose.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios.

### 92. module-cloud-labs/; module-cloud-labs/webpack.config.js:6; module-cloud-labs/src/bootstrap.js:6; module-cloud-labs/package.json:6; module-cloud-labs/Dockerfile:2; docker-compose.yml:41-44; module-cloud-labs/Dockerfile:15-20

**Observação:** O diretório module-cloud-labs tem package.json e configuração webpack próprios. A entrada renderiza o App React da unidade. O manifesto declara build com webpack; o Dockerfile constrói o diretório e copia seu dist para uma imagem nginx, vinculada a serviço próprio no compose.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios.

### 93. module-code-environment/; module-code-environment/webpack.config.js:7; module-code-environment/src/bootstrap.js:6; module-code-environment/package.json:6; module-code-environment/Dockerfile:2; docker-compose.yml:106-109; module-code-environment/Dockerfile:15-20

**Observação:** O diretório module-code-environment tem package.json e configuração webpack próprios. A entrada renderiza o App React da unidade. O manifesto declara build com webpack; o Dockerfile constrói o diretório e copia seu dist para uma imagem nginx, vinculada a serviço próprio no compose.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios.

### 94. module-code-module/; module-code-module/webpack.config.js:7; module-code-module/src/bootstrap.js:8; module-code-module/package.json:6; module-code-module/Dockerfile:2; docker-compose.yml:119-122; module-code-module/Dockerfile:15-20

**Observação:** O diretório module-code-module tem package.json e configuração webpack próprios. A entrada renderiza o App React da unidade. O manifesto declara build com webpack; o Dockerfile constrói o diretório e copia seu dist para uma imagem nginx, vinculada a serviço próprio no compose.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios.

### 95. module-content-uploading/; module-content-uploading/webpack.config.js:6; module-content-uploading/src/bootstrap.js:4; module-content-uploading/package.json:6; module-content-uploading/Dockerfile:2; docker-compose.yml:132-135; module-content-uploading/Dockerfile:15-20

**Observação:** O diretório module-content-uploading tem package.json e configuração webpack próprios. A entrada renderiza o App React da unidade. O manifesto declara build com webpack; o Dockerfile constrói o diretório e copia seu dist para uma imagem nginx, vinculada a serviço próprio no compose.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios.

### 96. module-dashboard/; module-dashboard/webpack.config.js:6; module-dashboard/src/bootstrap.js:6; module-dashboard/package.json:6; module-dashboard/Dockerfile:2; docker-compose.yml:54-57; module-dashboard/Dockerfile:15-20

**Observação:** O diretório module-dashboard tem package.json e configuração webpack próprios. A entrada renderiza o App React da unidade. O manifesto declara build com webpack; o Dockerfile constrói o diretório e copia seu dist para uma imagem nginx, vinculada a serviço próprio no compose.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios.

### 97. module-logging/; module-logging/webpack.config.js:7; module-logging/src/bootstrap.js:6; module-logging/package.json:6; module-logging/Dockerfile:2; docker-compose.yml:93-96; module-logging/Dockerfile:15-20

**Observação:** O diretório module-logging tem package.json e configuração webpack próprios. A entrada renderiza o App React da unidade. O manifesto declara build com webpack; o Dockerfile constrói o diretório e copia seu dist para uma imagem nginx, vinculada a serviço próprio no compose.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios.

### 98. module-virtual-machine/; module-virtual-machine/webpack.config.js:6; module-virtual-machine/src/bootstrap.js:6; module-virtual-machine/package.json:6; module-virtual-machine/Dockerfile:2; docker-compose.yml:67-70; module-virtual-machine/Dockerfile:15-20

**Observação:** O diretório module-virtual-machine tem package.json e configuração webpack próprios. A entrada renderiza o App React da unidade. O manifesto declara build com webpack; o Dockerfile constrói o diretório e copia seu dist para uma imagem nginx, vinculada a serviço próprio no compose.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios.

### 99. shared-design-system/; shared-design-system/webpack.config.js:6; shared-design-system/src/bootstrap.js:7; shared-design-system/package.json:6; shared-design-system/Dockerfile:2; docker-compose.yml:29-32; shared-design-system/Dockerfile:12-18

**Observação:** O diretório shared-design-system tem package.json e configuração webpack próprios. A entrada renderiza uma página de demonstração do design system. O manifesto declara build com webpack; o Dockerfile constrói o diretório e copia seu dist para uma imagem nginx, vinculada a serviço próprio no compose.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios. A 3.4.3 conta esta fronteira com UI de demonstração; a classificação mantém 10 unidades da aplicação, sem incluir o design system.

### 100. shell-app/; shell-app/webpack.config.js:6; shell-app/src/bootstrap.js:6; shell-app/package.json:6; shell-app/webpack.prod.config.js:18; shell-app/Dockerfile:26; shell-app/Dockerfile:2; docker-compose.yml:159-162; shell-app/Dockerfile:26-31

**Observação:** O diretório shell-app tem package.json e configuração webpack próprios. A entrada renderiza o App React da unidade. O manifesto declara build com webpack; o Dockerfile constrói o diretório e copia seu dist para uma imagem nginx, vinculada a serviço próprio no compose.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios.

### 101. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:71; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:33; shell-app/public/index.html:46; nginx/nginx.conf:133-134; module-assessment/webpack.config.js:36-37; module-assessment/webpack.config.js:53; module-assessment/webpack.config.js:80

**Observação:** O shell pede o App exposto de module-assessment por React.lazy/loadRemoteComponent e o monta em uma rota. O loader injeta remoteEntry.js, inicializa o escopo compartilhado e obtém o módulo do container; o mapa do HTML resolve a URL e o gateway a encaminha ao contêiner de destino.

**Interpretação:** Liga ativamente o host shell-app a module-assessment por Module Federation em runtime.

### 102. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:36; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:28; shell-app/public/index.html:41; nginx/nginx.conf:73-74; module-cloud-console/webpack.config.js:35-36; module-cloud-console/webpack.config.js:52; module-cloud-console/webpack.config.js:83

**Observação:** O shell pede o App exposto de module-cloud-console por React.lazy/loadRemoteComponent e o monta em uma rota. O loader injeta remoteEntry.js, inicializa o escopo compartilhado e obtém o módulo do container; o mapa do HTML resolve a URL e o gateway a encaminha ao contêiner de destino.

**Interpretação:** Liga ativamente o host shell-app a module-cloud-console por Module Federation em runtime.

### 103. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:15; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:25; shell-app/public/index.html:38; nginx/nginx.conf:37-38; module-cloud-labs/webpack.config.js:30-31; module-cloud-labs/webpack.config.js:47; module-cloud-labs/webpack.config.js:74

**Observação:** O shell pede o App exposto de module-cloud-labs por React.lazy/loadRemoteComponent e o monta em uma rota. O loader injeta remoteEntry.js, inicializa o escopo compartilhado e obtém o módulo do container; o mapa do HTML resolve a URL e o gateway a encaminha ao contêiner de destino.

**Interpretação:** Liga ativamente o host shell-app a module-cloud-labs por Module Federation em runtime.

### 104. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:50; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:30; shell-app/public/index.html:43; nginx/nginx.conf:97-98; module-code-environment/webpack.config.js:31-32; module-code-environment/webpack.config.js:48; module-code-environment/webpack.config.js:79

**Observação:** O shell pede o App exposto de module-code-environment por React.lazy/loadRemoteComponent e o monta em uma rota. O loader injeta remoteEntry.js, inicializa o escopo compartilhado e obtém o módulo do container; o mapa do HTML resolve a URL e o gateway a encaminha ao contêiner de destino.

**Interpretação:** Liga ativamente o host shell-app a module-code-environment por Module Federation em runtime.

### 105. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:57; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:31; shell-app/public/index.html:44; nginx/nginx.conf:109-110; module-code-module/webpack.config.js:38-39; module-code-module/webpack.config.js:55; module-code-module/webpack.config.js:85

**Observação:** O shell pede o App exposto de module-code-module por React.lazy/loadRemoteComponent e o monta em uma rota. O loader injeta remoteEntry.js, inicializa o escopo compartilhado e obtém o módulo do container; o mapa do HTML resolve a URL e o gateway a encaminha ao contêiner de destino.

**Interpretação:** Liga ativamente o host shell-app a module-code-module por Module Federation em runtime.

### 106. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:64; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:32; shell-app/public/index.html:45; nginx/nginx.conf:121-122; module-content-uploading/webpack.config.js:30-31; module-content-uploading/webpack.config.js:47; module-content-uploading/webpack.config.js:74

**Observação:** O shell pede o App exposto de module-content-uploading por React.lazy/loadRemoteComponent e o monta em uma rota. O loader injeta remoteEntry.js, inicializa o escopo compartilhado e obtém o módulo do container; o mapa do HTML resolve a URL e o gateway a encaminha ao contêiner de destino.

**Interpretação:** Liga ativamente o host shell-app a module-content-uploading por Module Federation em runtime.

### 107. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:22; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:26; shell-app/public/index.html:39; nginx/nginx.conf:49-50; module-dashboard/webpack.config.js:30-31; module-dashboard/webpack.config.js:47; module-dashboard/webpack.config.js:75

**Observação:** O shell pede o App exposto de module-dashboard por React.lazy/loadRemoteComponent e o monta em uma rota. O loader injeta remoteEntry.js, inicializa o escopo compartilhado e obtém o módulo do container; o mapa do HTML resolve a URL e o gateway a encaminha ao contêiner de destino.

**Interpretação:** Liga ativamente o host shell-app a module-dashboard por Module Federation em runtime.

### 108. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:43; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:29; shell-app/public/index.html:42; nginx/nginx.conf:85-86; module-logging/webpack.config.js:31-32; module-logging/webpack.config.js:48; module-logging/webpack.config.js:78

**Observação:** O shell pede o App exposto de module-logging por React.lazy/loadRemoteComponent e o monta em uma rota. O loader injeta remoteEntry.js, inicializa o escopo compartilhado e obtém o módulo do container; o mapa do HTML resolve a URL e o gateway a encaminha ao contêiner de destino.

**Interpretação:** Liga ativamente o host shell-app a module-logging por Module Federation em runtime.

### 109. shell-app/src/remotes/remoteLoader.js:40; shell-app/src/remotes/remoteLoader.js:45; shell-app/src/remotes/remoteLoader.js:51; shell-app/src/remotes/remoteLoader.js:82; shell-app/src/remotes/remoteLoader.js:9; shell-app/src/App.jsx:29; shell-app/src/App.jsx:148; shell-app/src/App.jsx:167; shell-app/public/index.html:27; shell-app/public/index.html:40; nginx/nginx.conf:61-62; module-virtual-machine/webpack.config.js:30-31; module-virtual-machine/webpack.config.js:47; module-virtual-machine/webpack.config.js:77

**Observação:** O shell pede o App exposto de module-virtual-machine por React.lazy/loadRemoteComponent e o monta em uma rota. O loader injeta remoteEntry.js, inicializa o escopo compartilhado e obtém o módulo do container; o mapa do HTML resolve a URL e o gateway a encaminha ao contêiner de destino.

**Interpretação:** Liga ativamente o host shell-app a module-virtual-machine por Module Federation em runtime.

### 110. module-assessment/webpack.config.js:44; module-assessment/src/App.jsx:24; module-assessment/src/pages/Assessment.jsx:350; module-assessment/src/pages/Assessment.jsx:400; module-assessment/src/pages/AssessmentsList.jsx:706; module-assessment/webpack.config.js:39-50; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observação:** module-assessment declara o remote promise sharedDesignSystem e renderiza ThemeProvider, PageHeader e Card. O webpack do destino expõe esses módulos; o promise reutiliza o container global ou injeta o remoteEntry.js pela URL design_system, com fallback local.

**Interpretação:** Liga ativamente module-assessment ao design system federado; o destino tem também entrada e publicação próprias.

### 111. module-cloud-console/webpack.config.js:43; module-cloud-console/src/App.jsx:11; module-cloud-console/src/CloudConsole.jsx:261; module-cloud-console/src/CloudConsole.jsx:281; module-cloud-console/webpack.config.js:38-49; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observação:** module-cloud-console declara o remote promise sharedDesignSystem e renderiza ThemeProvider, PageHeader e Card. O webpack do destino expõe esses módulos; o promise reutiliza o container global ou injeta o remoteEntry.js pela URL design_system, com fallback local.

**Interpretação:** Liga ativamente module-cloud-console ao design system federado; o destino tem também entrada e publicação próprias.

### 112. module-cloud-labs/webpack.config.js:38; module-cloud-labs/src/App.jsx:11; module-cloud-labs/src/CloudLabs.jsx:28; module-cloud-labs/src/CloudLabs.jsx:37; module-cloud-labs/webpack.config.js:33-44; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observação:** module-cloud-labs declara o remote promise sharedDesignSystem e renderiza ThemeProvider, PageHeader e Card. O webpack do destino expõe esses módulos; o promise reutiliza o container global ou injeta o remoteEntry.js pela URL design_system, com fallback local.

**Interpretação:** Liga ativamente module-cloud-labs ao design system federado; o destino tem também entrada e publicação próprias.

### 113. module-code-environment/webpack.config.js:39; module-code-environment/src/App.jsx:11; module-code-environment/src/CodeEnvironment.jsx:39; module-code-environment/src/CodeEnvironment.jsx:492; module-code-environment/webpack.config.js:34-45; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observação:** module-code-environment declara o remote promise sharedDesignSystem e renderiza ThemeProvider, PageHeader e Card. O webpack do destino expõe esses módulos; o promise reutiliza o container global ou injeta o remoteEntry.js pela URL design_system, com fallback local.

**Interpretação:** Liga ativamente module-code-environment ao design system federado; o destino tem também entrada e publicação próprias.

### 114. module-code-module/webpack.config.js:46; module-code-module/src/App.jsx:11; module-code-module/src/CodeModule.jsx:887; module-code-module/webpack.config.js:41-52; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observação:** module-code-module declara o remote promise sharedDesignSystem e renderiza ThemeProvider, PageHeader. O webpack do destino expõe esses módulos; o promise reutiliza o container global ou injeta o remoteEntry.js pela URL design_system, com fallback local.

**Interpretação:** Liga ativamente module-code-module ao design system federado; o destino tem também entrada e publicação próprias.

### 115. module-content-uploading/webpack.config.js:38; module-content-uploading/src/App.jsx:12; module-content-uploading/src/Content.jsx:639; module-content-uploading/src/CohortContent.jsx:311; module-content-uploading/src/CohortContent.jsx:327; module-content-uploading/webpack.config.js:33-44; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observação:** module-content-uploading declara o remote promise sharedDesignSystem e renderiza ThemeProvider, PageHeader e Card. O webpack do destino expõe esses módulos; o promise reutiliza o container global ou injeta o remoteEntry.js pela URL design_system, com fallback local.

**Interpretação:** Liga ativamente module-content-uploading ao design system federado; o destino tem também entrada e publicação próprias.

### 116. module-dashboard/webpack.config.js:38; module-dashboard/src/App.jsx:11; module-dashboard/src/Dashboard.jsx:203; module-dashboard/src/Dashboard.jsx:272; module-dashboard/webpack.config.js:33-44; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observação:** module-dashboard declara o remote promise sharedDesignSystem e renderiza ThemeProvider, PageHeader e Card. O webpack do destino expõe esses módulos; o promise reutiliza o container global ou injeta o remoteEntry.js pela URL design_system, com fallback local.

**Interpretação:** Liga ativamente module-dashboard ao design system federado; o destino tem também entrada e publicação próprias.

### 117. module-logging/webpack.config.js:39; module-logging/src/App.jsx:11; module-logging/src/Logs.jsx:458; module-logging/src/Logs.jsx:492; module-logging/webpack.config.js:34-45; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observação:** module-logging declara o remote promise sharedDesignSystem e renderiza ThemeProvider, PageHeader e Card. O webpack do destino expõe esses módulos; o promise reutiliza o container global ou injeta o remoteEntry.js pela URL design_system, com fallback local.

**Interpretação:** Liga ativamente module-logging ao design system federado; o destino tem também entrada e publicação próprias.

### 118. module-virtual-machine/webpack.config.js:38; module-virtual-machine/src/App.jsx:11; module-virtual-machine/src/VirtualMachine.jsx:802; module-virtual-machine/webpack.config.js:33-44; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67

**Observação:** module-virtual-machine declara o remote promise sharedDesignSystem e renderiza ThemeProvider, PageHeader. O webpack do destino expõe esses módulos; o promise reutiliza o container global ou injeta o remoteEntry.js pela URL design_system, com fallback local.

**Interpretação:** Liga ativamente module-virtual-machine ao design system federado; o destino tem também entrada e publicação próprias.

### 119. shell-app/webpack.config.js:40; shell-app/webpack.prod.config.js:50; shell-app/src/App.jsx:291; shell-app/webpack.config.js:34-46; shell-app/webpack.prod.config.js:44-56; shell-app/public/index.html:24; shell-app/public/index.html:37; nginx/nginx.conf:25-26; shared-design-system/webpack.config.js:36-37; shared-design-system/webpack.config.js:38-49; shared-design-system/webpack.config.js:67; shell-app/src/App.jsx:3

**Observação:** shell-app declara o remote promise sharedDesignSystem e renderiza ThemeProvider e importa o CSS global. O webpack do destino expõe esses módulos; o promise reutiliza o container global ou injeta o remoteEntry.js pela URL design_system, com fallback local.

**Interpretação:** Liga ativamente shell-app ao design system federado; o destino tem também entrada e publicação próprias.

### 120. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-cloud-console/src/AuthContext.jsx:30-34; module-cloud-console/src/AuthContext.jsx:111-126; module-cloud-console/src/App.jsx:11

**Observação:** shell-app e module-cloud-console acessam a ponte window.__SHELL_AUTH__ e o tema compartilhado. O shell publica getters e onAuthChange; o contexto de tema lê/grava a chave theme e altera a classe dark do documentElement.

**Interpretação:** A relação communication está ativa, com direção `origem → destino` e mecanismo events registrados na 3.4.5. Autenticação e tema foram reunidos no mesmo par de unidades; o tema não depende de eventos sintéticos demonstrados.

### 121. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-cloud-labs/src/AuthContext.jsx:30-34; module-cloud-labs/src/AuthContext.jsx:111-126; module-cloud-labs/src/App.jsx:11

**Observação:** shell-app e module-cloud-labs acessam a ponte window.__SHELL_AUTH__ e o tema compartilhado. O shell publica getters e onAuthChange; o contexto de tema lê/grava a chave theme e altera a classe dark do documentElement.

**Interpretação:** A relação communication está ativa, com direção `origem → destino` e mecanismo events registrados na 3.4.5. Autenticação e tema foram reunidos no mesmo par de unidades; o tema não depende de eventos sintéticos demonstrados.

### 122. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-code-environment/src/AuthContext.jsx:30-34; module-code-environment/src/AuthContext.jsx:111-126; module-code-environment/src/App.jsx:11

**Observação:** shell-app e module-code-environment acessam a ponte window.__SHELL_AUTH__ e o tema compartilhado. O shell publica getters e onAuthChange; o contexto de tema lê/grava a chave theme e altera a classe dark do documentElement.

**Interpretação:** A relação communication está ativa, com direção `origem → destino` e mecanismo events registrados na 3.4.5. Autenticação e tema foram reunidos no mesmo par de unidades; o tema não depende de eventos sintéticos demonstrados.

### 123. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-code-module/src/AuthContext.jsx:30-34; module-code-module/src/AuthContext.jsx:111-126; module-code-module/src/App.jsx:11

**Observação:** shell-app e module-code-module acessam a ponte window.__SHELL_AUTH__ e o tema compartilhado. O shell publica getters e onAuthChange; o contexto de tema lê/grava a chave theme e altera a classe dark do documentElement.

**Interpretação:** A relação communication está ativa, com direção `origem → destino` e mecanismo events registrados na 3.4.5. Autenticação e tema foram reunidos no mesmo par de unidades; o tema não depende de eventos sintéticos demonstrados.

### 124. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-content-uploading/src/AuthContext.jsx:30-34; module-content-uploading/src/AuthContext.jsx:111-126; module-content-uploading/src/App.jsx:12

**Observação:** shell-app e module-content-uploading acessam a ponte window.__SHELL_AUTH__ e o tema compartilhado. O shell publica getters e onAuthChange; o contexto de tema lê/grava a chave theme e altera a classe dark do documentElement.

**Interpretação:** A relação communication está ativa, com direção `origem → destino` e mecanismo events registrados na 3.4.5. Autenticação e tema foram reunidos no mesmo par de unidades; o tema não depende de eventos sintéticos demonstrados.

### 125. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-dashboard/src/AuthContext.jsx:30-34; module-dashboard/src/AuthContext.jsx:111-126; module-dashboard/src/App.jsx:11

**Observação:** shell-app e module-dashboard acessam a ponte window.__SHELL_AUTH__ e o tema compartilhado. O shell publica getters e onAuthChange; o contexto de tema lê/grava a chave theme e altera a classe dark do documentElement.

**Interpretação:** A relação communication está ativa, com direção `origem → destino` e mecanismo events registrados na 3.4.5. Autenticação e tema foram reunidos no mesmo par de unidades; o tema não depende de eventos sintéticos demonstrados.

### 126. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-logging/src/AuthContext.jsx:30-34; module-logging/src/AuthContext.jsx:111-126; module-logging/src/App.jsx:11

**Observação:** shell-app e module-logging acessam a ponte window.__SHELL_AUTH__ e o tema compartilhado. O shell publica getters e onAuthChange; o contexto de tema lê/grava a chave theme e altera a classe dark do documentElement.

**Interpretação:** A relação communication está ativa, com direção `origem → destino` e mecanismo events registrados na 3.4.5. Autenticação e tema foram reunidos no mesmo par de unidades; o tema não depende de eventos sintéticos demonstrados.

### 127. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-virtual-machine/src/AuthContext.jsx:30-34; module-virtual-machine/src/AuthContext.jsx:111-126; module-virtual-machine/src/App.jsx:11

**Observação:** shell-app e module-virtual-machine acessam a ponte window.__SHELL_AUTH__ e o tema compartilhado. O shell publica getters e onAuthChange; o contexto de tema lê/grava a chave theme e altera a classe dark do documentElement.

**Interpretação:** A relação communication está ativa, com direção `origem → destino` e mecanismo events registrados na 3.4.5. Autenticação e tema foram reunidos no mesmo par de unidades; o tema não depende de eventos sintéticos demonstrados.

### 128. shell-app/src/contexts/AuthContext.jsx:229; shared-design-system/src/contexts/ThemeContext.jsx:21; module-assessment/src/AuthContext.jsx:30-34; module-assessment/src/AuthContext.jsx:111-126; module-assessment/src/App.jsx:24; module-assessment/src/pages/AssessmentReports.jsx:418

**Observação:** module-assessment e shell-app acessam a ponte window.__SHELL_AUTH__ e o tema compartilhado. O shell publica getters e onAuthChange; o contexto de tema lê/grava a chave theme e altera a classe dark do documentElement.

**Interpretação:** A relação communication está ativa, com direção `bidirecional` e mecanismo events registrados na 3.4.5. Autenticação e tema foram reunidos no mesmo par de unidades; o tema não depende de eventos sintéticos demonstrados.

### 129. module-assessment/package.json:6; module-assessment/Dockerfile:15; module-assessment/Dockerfile:18-20; docker-compose.yml:145-156; nginx/nginx.conf:133-140; module-assessment/Dockerfile:6-7; module-assessment/package.json:22; module-assessment/tailwind.config.js:1

**Observação:** O Dockerfile de module-assessment executa o script build do seu package.json e copia seu dist para uma imagem nginx própria. O compose declara serviço próprio e o gateway encaminha o prefixo /assessment-remote/ ao contêiner desta aplicação. O build copia o shared-design-system como dependência file: e fonte de tokens.

**Interpretação:** Build e deploy separados confirmam o limite publicável desta unidade, sem demonstrar versionamento independente (No na 3.4.6). A separação do artefato coexiste com essa dependência de fontes no build.

### 130. module-cloud-console/package.json:6; module-cloud-console/Dockerfile:15; module-cloud-console/Dockerfile:18-20; docker-compose.yml:80-91; nginx/nginx.conf:73-80; module-cloud-console/Dockerfile:6-7; module-cloud-console/package.json:16; module-cloud-console/tailwind.config.js:1

**Observação:** O Dockerfile de module-cloud-console executa o script build do seu package.json e copia seu dist para uma imagem nginx própria. O compose declara serviço próprio e o gateway encaminha o prefixo /cloud-console-remote/ ao contêiner desta aplicação. O build copia o shared-design-system como dependência file: e fonte de tokens.

**Interpretação:** Build e deploy separados confirmam o limite publicável desta unidade, sem demonstrar versionamento independente (No na 3.4.6). A separação do artefato coexiste com essa dependência de fontes no build.

### 131. module-cloud-labs/package.json:6; module-cloud-labs/Dockerfile:15; module-cloud-labs/Dockerfile:18-20; docker-compose.yml:41-52; nginx/nginx.conf:37-44; module-cloud-labs/Dockerfile:6-7; module-cloud-labs/package.json:15; module-cloud-labs/tailwind.config.js:1

**Observação:** O Dockerfile de module-cloud-labs executa o script build do seu package.json e copia seu dist para uma imagem nginx própria. O compose declara serviço próprio e o gateway encaminha o prefixo /cloud-labs-remote/ ao contêiner desta aplicação. O build copia o shared-design-system como dependência file: e fonte de tokens.

**Interpretação:** Build e deploy separados confirmam o limite publicável desta unidade, sem demonstrar versionamento independente (No na 3.4.6). A separação do artefato coexiste com essa dependência de fontes no build.

### 132. module-code-environment/package.json:6; module-code-environment/Dockerfile:15; module-code-environment/Dockerfile:18-20; docker-compose.yml:106-117; nginx/nginx.conf:97-104; module-code-environment/Dockerfile:6-7; module-code-environment/package.json:15; module-code-environment/tailwind.config.js:1

**Observação:** O Dockerfile de module-code-environment executa o script build do seu package.json e copia seu dist para uma imagem nginx própria. O compose declara serviço próprio e o gateway encaminha o prefixo /code-environment-remote/ ao contêiner desta aplicação. O build copia o shared-design-system como dependência file: e fonte de tokens.

**Interpretação:** Build e deploy separados confirmam o limite publicável desta unidade, sem demonstrar versionamento independente (No na 3.4.6). A separação do artefato coexiste com essa dependência de fontes no build.

### 133. module-code-module/package.json:6; module-code-module/Dockerfile:15; module-code-module/Dockerfile:18-20; docker-compose.yml:119-130; nginx/nginx.conf:109-116; module-code-module/Dockerfile:6-7; module-code-module/package.json:19; module-code-module/tailwind.config.js:1

**Observação:** O Dockerfile de module-code-module executa o script build do seu package.json e copia seu dist para uma imagem nginx própria. O compose declara serviço próprio e o gateway encaminha o prefixo /code-module-remote/ ao contêiner desta aplicação. O build copia o shared-design-system como dependência file: e fonte de tokens.

**Interpretação:** Build e deploy separados confirmam o limite publicável desta unidade, sem demonstrar versionamento independente (No na 3.4.6). A separação do artefato coexiste com essa dependência de fontes no build.

### 134. module-content-uploading/package.json:6; module-content-uploading/Dockerfile:15; module-content-uploading/Dockerfile:18-20; docker-compose.yml:132-143; nginx/nginx.conf:121-128; module-content-uploading/Dockerfile:6-7; module-content-uploading/package.json:16; module-content-uploading/tailwind.config.js:1

**Observação:** O Dockerfile de module-content-uploading executa o script build do seu package.json e copia seu dist para uma imagem nginx própria. O compose declara serviço próprio e o gateway encaminha o prefixo /content-uploading-remote/ ao contêiner desta aplicação. O build copia o shared-design-system como dependência file: e fonte de tokens.

**Interpretação:** Build e deploy separados confirmam o limite publicável desta unidade, sem demonstrar versionamento independente (No na 3.4.6). A separação do artefato coexiste com essa dependência de fontes no build.

### 135. module-dashboard/package.json:6; module-dashboard/Dockerfile:15; module-dashboard/Dockerfile:18-20; docker-compose.yml:54-65; nginx/nginx.conf:49-56; module-dashboard/Dockerfile:6-7; module-dashboard/package.json:15; module-dashboard/tailwind.config.js:1

**Observação:** O Dockerfile de module-dashboard executa o script build do seu package.json e copia seu dist para uma imagem nginx própria. O compose declara serviço próprio e o gateway encaminha o prefixo /dashboard-remote/ ao contêiner desta aplicação. O build copia o shared-design-system como dependência file: e fonte de tokens.

**Interpretação:** Build e deploy separados confirmam o limite publicável desta unidade, sem demonstrar versionamento independente (No na 3.4.6). A separação do artefato coexiste com essa dependência de fontes no build.

### 136. module-logging/package.json:6; module-logging/Dockerfile:15; module-logging/Dockerfile:18-20; docker-compose.yml:93-104; nginx/nginx.conf:85-92; module-logging/Dockerfile:6-7; module-logging/package.json:16; module-logging/tailwind.config.js:1

**Observação:** O Dockerfile de module-logging executa o script build do seu package.json e copia seu dist para uma imagem nginx própria. O compose declara serviço próprio e o gateway encaminha o prefixo /logging-remote/ ao contêiner desta aplicação. O build copia o shared-design-system como dependência file: e fonte de tokens.

**Interpretação:** Build e deploy separados confirmam o limite publicável desta unidade, sem demonstrar versionamento independente (No na 3.4.6). A separação do artefato coexiste com essa dependência de fontes no build.

### 137. module-virtual-machine/package.json:6; module-virtual-machine/Dockerfile:15; module-virtual-machine/Dockerfile:18-20; docker-compose.yml:67-78; nginx/nginx.conf:61-68; module-virtual-machine/Dockerfile:6-7; module-virtual-machine/package.json:17; module-virtual-machine/tailwind.config.js:1

**Observação:** O Dockerfile de module-virtual-machine executa o script build do seu package.json e copia seu dist para uma imagem nginx própria. O compose declara serviço próprio e o gateway encaminha o prefixo /virtual-machine-remote/ ao contêiner desta aplicação. O build copia o shared-design-system como dependência file: e fonte de tokens.

**Interpretação:** Build e deploy separados confirmam o limite publicável desta unidade, sem demonstrar versionamento independente (No na 3.4.6). A separação do artefato coexiste com essa dependência de fontes no build.

### 138. shared-design-system/package.json:6; shared-design-system/Dockerfile:12; shared-design-system/Dockerfile:15-21; docker-compose.yml:29-38; nginx/nginx.conf:25-32

**Observação:** O Dockerfile de shared-design-system executa o script build do seu package.json e copia seu dist para uma imagem nginx própria. O compose declara serviço próprio e o gateway encaminha o prefixo /design-system-remote/ ao contêiner desta aplicação.

**Interpretação:** Build e deploy separados confirmam o limite publicável desta unidade, sem demonstrar versionamento independente (No na 3.4.6).

### 139. shell-app/package.json:6; shell-app/Dockerfile:26; shell-app/Dockerfile:29-31; docker-compose.yml:159-179; nginx/nginx.conf:18-22; shell-app/Dockerfile:6-22; shell-app/tailwind.config.js:4-17; shell-app/public/index.html:18-51

**Observação:** O Dockerfile de shell-app executa webpack com webpack.prod.config.js e copia seu dist para uma imagem nginx própria. O compose declara serviço próprio e o gateway encaminha o prefixo / ao contêiner desta aplicação. O Dockerfile também copia os nove módulos para o Tailwind, e o HTML contém os endereços dos remotes.

**Interpretação:** Build e deploy separados confirmam o limite publicável desta unidade, sem demonstrar versionamento independente (No na 3.4.6). O CSS depende das classes dos módulos e a alteração desses endereços requer reconstrução do shell.

### 140. README.md:4

**Observação:** O documento afirma: "A production-ready micro-frontend setup with 3 independent modules".

**Interpretação:** A afirmação é contradita pelos artefatos do snapshot indicados na 3.4.7. A contagem de três módulos diverge dos nove módulos e do design system.

### 141. README.md:4; docker-compose.yml:29-179

**Observação:** O documento afirma: "each running in its own Docker container".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 142. README.md:4

**Observação:** O documento afirma: "orchestrated by a Shell host app".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 143. README.md:12; shell-app/src/App.jsx:15-71

**Observação:** O documento afirma: "shell-app/ ← Host (port 3000) — loads all modules at runtime".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 144. README.md:16; docker-compose.yml:3-184

**Observação:** O documento afirma: "docker-compose.yml ← Master orchestrator".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 145. README.md:29; module-cloud-labs/webpack.config.js:30-31

**Observação:** O documento afirma: "Each module **exposes** a React component via `remoteEntry.js`.".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 146. README.md:46; docker-compose.yml:168-178

**Observação:** O documento afirma: "Shell waits for all 3 modules to pass healthchecks before starting.".

**Interpretação:** A afirmação é contradita pelos artefatos do snapshot indicados na 3.4.7. O depends_on só ordena a partida; não há healthchecks.

### 147. README.md:103; shell-app/src/App.jsx:15-71; shell-app/webpack.config.js:32-47

**Observação:** O documento afirma: "Shell imports modules like normal React".

**Interpretação:** A afirmação é contradita pelos artefatos do snapshot indicados na 3.4.7. O shell usa o loader de runtime, não o import estático exemplificado.

### 148. README.md:113-114; module-cloud-labs/webpack.config.js:49-53; shell-app/webpack.config.js:51-53; shared-design-system/webpack.config.js:50-54

**Observação:** O documento afirma: "With `singleton: true`, all modules share ONE React instance negotiated at runtime.".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 149. README.md:120; module-cloud-labs/Dockerfile:1-22

**Observação:** O documento afirma: "Each module's Dockerfile (multi-stage)".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 150. README.md:164, 167; docker-compose.yml:54-58; nginx/nginx.conf:49-50

**Observação:** O documento afirma: "Scale a single module" […] "Scale dashboard to 3 instances (behind a load balancer)".

**Interpretação:** A afirmação é contradita pelos artefatos do snapshot indicados na 3.4.7. Os nomes fixos de contêiner impedem a escala exemplificada.

### 151. README.md:171

**Observação:** O documento afirma: "Deploy only one module".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 152. README.md:171

**Observação:** O documento afirma: "(zero-downtime)".

**Interpretação:** A 3.4.7 não encontrou artefato que sustente esta afirmação; ela permanece uma descrição ou possibilidade enunciada.

### 153. README.md:194

**Observação:** O documento afirma: "Be developed by a separate team".

**Interpretação:** A 3.4.7 não encontrou artefato que sustente esta afirmação; ela permanece uma descrição ou possibilidade enunciada.

### 154. README.md:195; module-cloud-labs/src/App.jsx:18-33; module-cloud-labs/webpack.config.js:69-75

**Observação:** O documento afirma: "Run standalone (open `:3001` directly in browser)".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 155. README.md:196

**Observação:** O documento afirma: "Have its own CI/CD pipeline".

**Interpretação:** A 3.4.7 não encontrou artefato que sustente esta afirmação; ela permanece uma descrição ou possibilidade enunciada.

### 156. README.md:198; module-cloud-labs/webpack.config.js:49-67; shell-app/webpack.config.js:51-58; module-cloud-labs/package.json:11-14

**Observação:** O documento afirma: "Use a different version of shared libraries (with care)".

**Interpretação:** A afirmação é contradita pelos artefatos do snapshot indicados na 3.4.7. A configuração usa singletons.

### 157. README.md:214-230; module-cloud-labs/src/index.js:4; module-cloud-labs/webpack.config.js:47

**Observação:** O documento afirma: "Project Structure (each module)" (árvore comentada de um módulo: `index.js` "Entry (just: import("./bootstrap"))", `App.jsx` "Component exposed to Shell", `webpack.config.js` "Module Federation config (exposes CloudLabsApp)").

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 158. docs/ARCHITECTURE.md:3; shell-app/webpack.config.js:2

**Observação:** O documento afirma: "This repository implements a production-grade micro-frontend platform using Webpack 5 Module Federation, Docker, and nginx.".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 159. docs/ARCHITECTURE.md:7; shell-app/public/index.html:22-48; shell-app/webpack.config.js:38-39

**Observação:** O documento afirma: "Runtime Module Federation loader that injects `remoteEntry.js` at runtime (no hardcoded build-time remote URLs).".

**Interpretação:** A afirmação é contradita pelos artefatos do snapshot indicados na 3.4.7. As URLs estão fixadas no HTML que entra no build.

### 160. docs/ARCHITECTURE.md:8; shell-app/src/config/remoteConfig.js:8-31; shell-app/public/index.html:51

**Observação:** O documento afirma: "Centralized runtime remote config (`window.__RUNTIME_REMOTE_CONFIG__`) with sane localhost defaults; can be overridden at runtime (nginx or injected script).".

**Interpretação:** A afirmação é parcialmente corroborada: há leitura e preservação de override externo, mas não há injeção implementada no início do contêiner.

### 161. docs/ARCHITECTURE.md:9; shell-app/src/App.jsx:148; shell-app/src/remotes/remoteLoader.js:4; shell-app/src/App.jsx:105-106

**Observação:** O documento afirma: "Shell now lazy-loads remotes using a robust loader with timeouts and retry support.".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 162. docs/ARCHITECTURE.md:10; shell-app/webpack.config.js:48-58; module-cloud-labs/webpack.config.js:49-63

**Observação:** O documento afirma: "`react`, `react-dom`, and `react-router-dom` are enforced as singletons with strict version matching.".

**Interpretação:** A afirmação é contradita pelos artefatos do snapshot indicados na 3.4.7. A configuração não habilita strictVersion.

### 163. docs/ARCHITECTURE.md:11; shell-app/Dockerfile:26

**Observação:** O documento afirma: "Shell Docker build uses explicit `webpack.prod.config.js`.".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 164. docs/ARCHITECTURE.md:32-36; shell-app/src/App.jsx:148; shell-app/src/App.jsx:79-153

**Observação:** O documento afirma: "the shell uses a `RemoteWrapper` which: Uses `React.lazy()` with a runtime loader […] Calls the remote container `init()` […] Calls `container.get()` […] an error boundary with a Retry button on failure.".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 165. docs/ARCHITECTURE.md:46-51; docker-compose.yml:29-179

**Observação:** O documento afirma: "Shell (host) […] Auth (remote) […] Dashboard (remote) […] Profile (remote)" (serviços do Docker Compose).

**Interpretação:** A afirmação é contradita pelos artefatos do snapshot indicados na 3.4.7. Auth e Profile não são os serviços atuais.

### 166. module-assessment/Dockerfile:6; module-assessment/package.json:22; module-assessment/Dockerfile:7

**Observação:** O comentário afirma: "Copy the shared design system folder first (required by the file:../shared-design-system dependency)".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 167. module-assessment/src/AuthContext.jsx:29, 110; module-assessment/src/AuthContext.jsx:111-126

**Observação:** O comentário afirma: "Check if shell bridge is available (module running within shell)" […] "If shell bridge is available, subscribe to its changes instead of checking auth ourselves".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 168. shared-design-system/src/contexts/ThemeContext.jsx:13; shared-design-system/src/contexts/ThemeContext.jsx:14-22; module-assessment/src/pages/AssessmentReports.jsx:418

**Observação:** O comentário afirma: "Shell owns the DOM class — single source of truth".

**Interpretação:** A afirmação é contradita pelos artefatos do snapshot indicados na 3.4.7. O provider de cada módulo também altera a classe dark.

### 169. shared-design-system/src/contexts/ThemeContext.jsx:24; shared-design-system/src/contexts/ThemeContext.jsx:25-33

**Observação:** O comentário afirma: "React to synthetic StorageEvents dispatched from any module".

**Interpretação:** A afirmação é contradita pelos artefatos do snapshot indicados na 3.4.7. Há listener storage, sem emissor sintético no snapshot.

### 170. shell-app/public/index.html:16-17; shell-app/public/index.html:18-48; nginx/nginx.conf:25-134

**Observação:** O comentário afirma: "In Docker (port 80/443), use relative paths handled by gateway Nginx. In dev (port 3000), use localhost port-based URLs.".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 171. shell-app/src/contexts/AuthContext.jsx:136, 218, 227; shell-app/src/contexts/AuthContext.jsx:229

**Observação:** O comentário afirma: "Notify remotes of auth state" […] "Notify remotes of sign out" […] "Setup window bridge for remotes to access auth".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 172. shell-app/webpack.config.js:32-33; shell-app/webpack.config.js:34-47; shell-app/src/App.jsx:3

**Observação:** O comentário afirma: "We rely on runtime remote loading (shell reads window.__RUNTIME_REMOTE_CONFIG__) but sharedDesignSystem is imported statically at build-time.".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 173. shell-app/webpack.config.js:48-50; shell-app/webpack.config.js:51-58; module-cloud-labs/webpack.config.js:49-67

**Observação:** O comentário afirma: "Relax strict version checks at build time so remotes with minor patch versions can still initialize during development.".

**Interpretação:** A afirmação é corroborada pelos artefatos indicados na 3.4.7.

### 174. 18051fd 2026-06-05 (shared-design-system/src/contexts/ThemeContext.jsx)

**Observação:** O provider aparece em 18051fd com o comentário sobre eventos sintéticos e somente o listener storage; seu objeto não muda depois. Os antigos consumidores não foram integralmente recuperados.

**Interpretação:** O passado do emissor permanece inconclusivo; isso não altera a ausência de emissor no snapshot nem a comunicação de tema pela chave e pelo DOM.

### 175. 68ea11f 2026-05-25 (docs/ARCHITECTURE.md); ded9db1 2026-06-03 (README.md); 18051fd 2026-06-05 (module-assessment/)

**Observação:** O primeiro commit contém três módulos e o documento de arquitetura com Auth/Profile. ded9db1 remove esses caminhos, acrescenta Cloud Labs/Virtual Machine e altera o README; 18051fd acrescenta seis módulos e o design system sem atualização posterior desses documentos.

**Interpretação:** Esclarece a contagem e os nomes documentais como registros de estágios anteriores; não demonstra extração de monólito.

### 176. 68ea11f 2026-05-25 (docker-compose.yml); ded9db1 2026-06-03 (README.md; docker-compose.yml); 18051fd 2026-06-05 (docker-compose.yml)

**Observação:** O README de ded9db1 já afirma espera por healthchecks. O compose muda em ded9db1 e 18051fd; seus dois primeiros blobs não estão disponíveis, e o snapshot não declara healthchecks.

**Interpretação:** O funcionamento anterior é inconclusivo; a divergência atual da afirmação com o compose está estabelecida.

### 177. 68ea11f 2026-05-25 (shell-app/src/remotes/remoteLoader.js; shell-app/src/App.jsx; shell-app/webpack.config.js); ded9db1 2026-06-03 (README.md; shell-app/webpack.config.js)

**Observação:** O loader lido do primeiro commit tem o mesmo conteúdo do snapshot. O README de ded9db1 já exemplifica import de auth/AuthApp; os blobs antigos do App e webpack necessários não estão disponíveis.

**Interpretação:** Não se demonstra substituição histórica de mecanismo. O snapshot usa o loader, e a dúvida sobre o passado não muda essa leitura.

### 178. ded9db1 2026-06-03 (README.md); 18051fd 2026-06-05 (docker-compose.yml)

**Observação:** A instrução de três instâncias já está no README de ded9db1. O compose de 18051fd é o do snapshot, com nomes fixos; os dois estados anteriores não puderam ser lidos.

**Interpretação:** É inconclusivo se houve suporte anterior a réplicas; a instrução atual continua contrariada pelo compose.

### 179. ded9db1 2026-06-03 (README.md; shell-app/webpack.config.js); 18051fd 2026-06-05 (shell-app/webpack.config.js)

**Observação:** O README de ded9db1 já admite versões diferentes. O webpack muda em ded9db1 e 18051fd, sendo este último o do snapshot; os blobs anteriores não estão disponíveis.

**Interpretação:** O passado de singletons é inconclusivo, sem mudar a configuração atual que contraria a afirmação.

### 180. 68ea11f 2026-05-25 (docs/ARCHITECTURE.md; shell-app/src/remotes/remoteLoader.js); ded9db1 2026-06-03 (shell-app/public/index.html); 18051fd 2026-06-05 (shell-app/public/index.html)

**Observação:** O documento de arquitetura e o loader mantêm seus objetos desde o primeiro commit. O HTML muda posteriormente, mas seu conteúdo inicial não pôde ser lido; o HTML atual contém URLs fixas.

**Interpretação:** Não é possível decidir quando surgiu a divergência documental; a origem fixa das URLs no snapshot é clara.

### 181. docs/ARCHITECTURE.md:55; shell-app/public/index.html:51; shell-app/Dockerfile:29-33; shell-app/nginx.conf:1-34

**Observação:** A arquitetura lista a injeção ao iniciar o contêiner como próximo passo. O HTML preserva override externo; Dockerfile e nginx apenas copiam e servem os arquivos.

**Interpretação:** Resolvido pelo snapshot: existe suporte ao override externo, e a injeção no início do contêiner permanece futura, preservando a corroboração parcial da afirmação.

### 182. 68ea11f 2026-05-25 (docs/ARCHITECTURE.md; shell-app/webpack.config.js); ded9db1 2026-06-03 (shell-app/webpack.config.js); 18051fd 2026-06-05 (shell-app/webpack.config.js)

**Observação:** A afirmação de versões estritas já está no primeiro documento de arquitetura, que não muda. O webpack muda duas vezes; o estado atual relaxa versões, e os dois blobs anteriores estão ausentes.

**Interpretação:** A existência de verificações estritas no passado é inconclusiva; não muda a ausência de strictVersion na configuração atual.

### 183. 18051fd 2026-06-05 (shared-design-system/src/contexts/ThemeContext.jsx; module-assessment/src/App.jsx; module-assessment/src/ThemeContext.jsx)

**Observação:** O provider e o App de assessment são acrescentados juntos em 18051fd e mantêm os mesmos objetos: o provider já escreve classe e storage, e o módulo já monta o provider federado.

**Interpretação:** Esclarece que o comentário de controle exclusivo pelo shell conflita com o uso pelo módulo desde a primeira presença destes artefatos, sem demonstrar intenção nem origem externa.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (module-assessment) (Marcadores); 3.4.3 (module-assessment) (Build); 3.4.4 (module-assessment/webpack.config.js:44) (Arquivo:linha); 3.4.4 (module-assessment/webpack.config.js:44) (Observação); 3.4.4 (shell-app/src/App.jsx:71) (Observação); 3.4.4 (module-assessment/src/App.jsx:24) (Observação); 3.4.5 #1 (Configuração); 3.4.5 #10 (Configuração); 3.4.5 #10 (Código) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #101; configura #110 |
| 2 | 3.4.3 (module-cloud-console) (Marcadores); 3.4.3 (module-cloud-console) (Build); 3.4.4 (module-cloud-console/webpack.config.js:43) (Arquivo:linha); 3.4.4 (module-cloud-console/webpack.config.js:43) (Observação); 3.4.4 (shell-app/src/App.jsx:36) (Observação); 3.4.4 (module-cloud-console/src/App.jsx:11) (Observação); 3.4.5 #2 (Configuração); 3.4.5 #11 (Configuração); 3.4.5 #11 (Código) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #102; configura #111 |
| 3 | 3.4.3 (module-cloud-labs) (Marcadores); 3.4.3 (module-cloud-labs) (Build); 3.4.4 (module-cloud-labs/webpack.config.js:38) (Arquivo:linha); 3.4.4 (module-cloud-labs/webpack.config.js:38) (Observação); 3.4.4 (shell-app/src/App.jsx:15) (Observação); 3.4.4 (module-cloud-labs/src/App.jsx:11) (Observação); 3.4.5 #3 (Configuração); 3.4.5 #12 (Configuração); 3.4.5 #12 (Código); 3.4.7 #6 (Evidência); 3.4.7 #9 (Evidência); 3.4.7 #17 (Evidência); 3.4.7 #18 (Evidência); 3.4.7 #23 (Evidência); 3.4.7 #34 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #103; configura #112 |
| 4 | 3.4.3 (module-code-environment) (Marcadores); 3.4.3 (module-code-environment) (Build); 3.4.4 (module-code-environment/webpack.config.js:39) (Arquivo:linha); 3.4.4 (module-code-environment/webpack.config.js:39) (Observação); 3.4.4 (shell-app/src/App.jsx:50) (Observação); 3.4.4 (module-code-environment/src/App.jsx:11) (Observação); 3.4.5 #4 (Configuração); 3.4.5 #13 (Configuração); 3.4.5 #13 (Código) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #104; configura #113 |
| 5 | 3.4.3 (module-code-module) (Marcadores); 3.4.3 (module-code-module) (Build); 3.4.4 (module-code-module/webpack.config.js:46) (Arquivo:linha); 3.4.4 (module-code-module/webpack.config.js:46) (Observação); 3.4.4 (shell-app/src/App.jsx:57) (Observação); 3.4.4 (module-code-module/src/App.jsx:11) (Observação); 3.4.5 #5 (Configuração); 3.4.5 #14 (Configuração); 3.4.5 #14 (Código) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #105; configura #114 |
| 6 | 3.4.3 (module-content-uploading) (Marcadores); 3.4.3 (module-content-uploading) (Build); 3.4.4 (module-content-uploading/webpack.config.js:38) (Arquivo:linha); 3.4.4 (module-content-uploading/webpack.config.js:38) (Observação); 3.4.4 (shell-app/src/App.jsx:64) (Observação); 3.4.4 (module-content-uploading/src/App.jsx:12) (Observação); 3.4.5 #6 (Configuração); 3.4.5 #15 (Configuração); 3.4.5 #15 (Código) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #106; configura #115 |
| 7 | 3.4.3 (module-dashboard) (Marcadores); 3.4.3 (module-dashboard) (Build); 3.4.4 (module-dashboard/webpack.config.js:38) (Arquivo:linha); 3.4.4 (module-dashboard/webpack.config.js:38) (Observação); 3.4.4 (shell-app/src/App.jsx:22) (Observação); 3.4.4 (module-dashboard/src/App.jsx:11) (Observação); 3.4.5 #7 (Configuração); 3.4.5 #16 (Configuração); 3.4.5 #16 (Código) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #107; configura #116 |
| 8 | 3.4.3 (module-logging) (Marcadores); 3.4.3 (module-logging) (Build); 3.4.4 (module-logging/webpack.config.js:39) (Arquivo:linha); 3.4.4 (module-logging/webpack.config.js:39) (Observação); 3.4.4 (shell-app/src/App.jsx:43) (Observação); 3.4.4 (module-logging/src/App.jsx:11) (Observação); 3.4.5 #8 (Configuração); 3.4.5 #17 (Configuração); 3.4.5 #17 (Código) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #108; configura #117 |
| 9 | 3.4.3 (module-virtual-machine) (Marcadores); 3.4.3 (module-virtual-machine) (Build); 3.4.4 (module-virtual-machine/webpack.config.js:38) (Arquivo:linha); 3.4.4 (module-virtual-machine/webpack.config.js:38) (Observação); 3.4.4 (shell-app/src/App.jsx:29) (Observação); 3.4.4 (module-virtual-machine/src/App.jsx:11) (Observação); 3.4.5 #9 (Configuração); 3.4.5 #18 (Configuração); 3.4.5 #18 (Código) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #109; configura #118 |
| 10 | 3.4.3 (shared-design-system) (Marcadores); 3.4.3 (shared-design-system) (Build); 3.4.4 (shell-app/src/App.jsx:291) (Observação); 3.4.4 (shared-design-system/src/contexts/ThemeContext.jsx:21) (Observação); 3.4.4 (module-assessment/src/pages/Assessment.jsx:350) (Observação); 3.4.4 (module-assessment/src/pages/Assessment.jsx:400) (Observação); 3.4.5 #10 (Configuração); 3.4.5 #11 (Configuração); 3.4.5 #12 (Configuração); 3.4.5 #13 (Configuração); 3.4.5 #14 (Configuração); 3.4.5 #15 (Configuração); 3.4.5 #16 (Configuração); 3.4.5 #17 (Configuração); 3.4.5 #18 (Configuração); 3.4.5 #19 (Configuração); 3.4.7 #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #110; configura #111; configura #112; configura #113; configura #114; configura #115; configura #116; configura #117; configura #118; configura #119 |
| 11 | 3.4.3 (shell-app) (Marcadores); 3.4.3 (shell-app) (Build); 3.4.4 (shell-app/webpack.config.js:40) (Arquivo:linha); 3.4.4 (shell-app/webpack.config.js:40) (Observação); 3.4.5 #19 (Configuração); 3.4.5 #19 (Código); 3.4.7 #8 (Evidência); 3.4.7 #9 (Evidência); 3.4.7 #17 (Evidência); 3.4.7 #19 (Evidência); 3.4.7 #20 (Evidência); 3.4.7 #23 (Evidência); 3.4.7 #33 (Documento); 3.4.7 #33 (Evidência); 3.4.7 #34 (Documento); 3.4.7 #34 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #119 |
| 12 | 3.4.3 (shell-app) (Marcadores); 3.4.4 (shell-app/webpack.prod.config.js:50) (Arquivo:linha); 3.4.4 (shell-app/webpack.prod.config.js:50) (Observação); 3.4.5 #19 (Configuração); 3.4.5 #19 (Código) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #119 |
| 13 | 3.4.4 (module-cloud-console/src/bootstrap.js:4) | 3 código | código-fonte | — | contexto | fraca | — |
| 14 | 3.4.4 (module-cloud-labs/src/bootstrap.js:4) | 3 código | código-fonte | — | contexto | fraca | — |
| 15 | 3.4.4 (module-code-environment/src/bootstrap.js:4) | 3 código | código-fonte | — | contexto | fraca | — |
| 16 | 3.4.4 (module-content-uploading/src/bootstrap.js:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 17 | 3.4.4 (module-dashboard/src/bootstrap.js:4) | 3 código | código-fonte | — | contexto | fraca | — |
| 18 | 3.4.4 (module-logging/src/bootstrap.js:4) | 3 código | código-fonte | — | contexto | fraca | — |
| 19 | 3.4.4 (module-virtual-machine/src/bootstrap.js:4) | 3 código | código-fonte | — | contexto | fraca | — |
| 20 | 3.4.4 (module-assessment/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 21 | 3.4.4 (module-cloud-console/src/index.js:4) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 22 | 3.4.4 (module-cloud-labs/src/index.js:4) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 23 | 3.4.4 (module-code-environment/src/index.js:4) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 24 | 3.4.4 (module-code-module/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 25 | 3.4.4 (module-content-uploading/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 26 | 3.4.4 (module-dashboard/src/index.js:4) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 27 | 3.4.4 (module-logging/src/index.js:4) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 28 | 3.4.4 (module-virtual-machine/src/index.js:4) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 29 | 3.4.4 (shared-design-system/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 30 | 3.4.4 (shell-app/src/index.js:2) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 31 | 3.4.4 (shell-app/src/remotes/remoteLoader.js:40) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #101; implementa #102; implementa #103; implementa #104; implementa #105; implementa #106; implementa #107; implementa #108; implementa #109 |
| 32 | 3.4.4 (shell-app/src/remotes/remoteLoader.js:45) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #101; implementa #102; implementa #103; implementa #104; implementa #105; implementa #106; implementa #107; implementa #108; implementa #109 |
| 33 | 3.4.4 (shell-app/src/remotes/remoteLoader.js:51) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #101; implementa #102; implementa #103; implementa #104; implementa #105; implementa #106; implementa #107; implementa #108; implementa #109 |
| 34 | 3.4.4 (shell-app/src/remotes/remoteLoader.js:82) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #101; implementa #102; implementa #103; implementa #104; implementa #105; implementa #106; implementa #107; implementa #108; implementa #109 |
| 35 | 3.4.4 (module-assessment/webpack.config.js:44) | 3 código | configuração | module-federation | arquitetural | forte | implementa #110 |
| 36 | 3.4.4 (module-cloud-console/webpack.config.js:43) | 3 código | configuração | module-federation | arquitetural | forte | implementa #111 |
| 37 | 3.4.4 (module-cloud-labs/webpack.config.js:38) | 3 código | configuração | module-federation | arquitetural | forte | implementa #112 |
| 38 | 3.4.4 (module-code-environment/webpack.config.js:39) | 3 código | configuração | module-federation | arquitetural | forte | implementa #113 |
| 39 | 3.4.4 (module-code-module/webpack.config.js:46) | 3 código | configuração | module-federation | arquitetural | forte | implementa #114 |
| 40 | 3.4.4 (module-content-uploading/webpack.config.js:38) | 3 código | configuração | module-federation | arquitetural | forte | implementa #115 |
| 41 | 3.4.4 (module-dashboard/webpack.config.js:38) | 3 código | configuração | module-federation | arquitetural | forte | implementa #116 |
| 42 | 3.4.4 (module-logging/webpack.config.js:39) | 3 código | configuração | module-federation | arquitetural | forte | implementa #117 |
| 43 | 3.4.4 (module-virtual-machine/webpack.config.js:38) | 3 código | configuração | module-federation | arquitetural | forte | implementa #118 |
| 44 | 3.4.4 (shell-app/src/remotes/remoteLoader.js:9) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #101; implementa #102; implementa #103; implementa #104; implementa #105; implementa #106; implementa #107; implementa #108; implementa #109 |
| 45 | 3.4.4 (shell-app/webpack.config.js:40) | 3 código | configuração | module-federation | arquitetural | forte | implementa #119 |
| 46 | 3.4.4 (shell-app/webpack.prod.config.js:50) | 3 código | configuração | module-federation | arquitetural | forte | implementa #119 |
| 47 | 3.4.4 (module-assessment/src/pages/KodeEnvSection.jsx:369) | 3 código | código-fonte | iframe | contexto | fraca | — |
| 48 | 3.4.4 (module-code-module/src/CodeModule.jsx:847) | 3 código | código-fonte | iframe | contexto | fraca | — |
| 49 | 3.4.4 (shell-app/src/App.jsx:15) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #103 |
| 50 | 3.4.4 (shell-app/src/App.jsx:22) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #107 |
| 51 | 3.4.4 (shell-app/src/App.jsx:29) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #109 |
| 52 | 3.4.4 (shell-app/src/App.jsx:36) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #102 |
| 53 | 3.4.4 (shell-app/src/App.jsx:43) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #108 |
| 54 | 3.4.4 (shell-app/src/App.jsx:50) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #104 |
| 55 | 3.4.4 (shell-app/src/App.jsx:57) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #105 |
| 56 | 3.4.4 (shell-app/src/App.jsx:64) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #106 |
| 57 | 3.4.4 (shell-app/src/App.jsx:71) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #101 |
| 58 | 3.4.4 (shell-app/src/App.jsx:148) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #101; implementa #102; implementa #103; implementa #104; implementa #105; implementa #106; implementa #107; implementa #108; implementa #109 |
| 59 | 3.4.4 (shell-app/src/App.jsx:167) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #101; implementa #102; implementa #103; implementa #104; implementa #105; implementa #106; implementa #107; implementa #108; implementa #109 |
| 60 | 3.4.4 (shell-app/src/App.jsx:291) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #119 |
| 61 | 3.4.4 (shell-app/src/contexts/AuthContext.jsx:229) | 3 código | código-fonte | — | arquitetural | moderada | implementa #120; implementa #121; implementa #122; implementa #123; implementa #124; implementa #125; implementa #126; implementa #127; implementa #128 |
| 62 | 3.4.4 (shared-design-system/src/contexts/ThemeContext.jsx:21) | 3 código | código-fonte | — | arquitetural | moderada | implementa #120; implementa #121; implementa #122; implementa #123; implementa #124; implementa #125; implementa #126; implementa #127; implementa #128 |
| 63 | 3.4.4 (module-assessment/src/App.jsx:24) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #110 |
| 64 | 3.4.4 (module-assessment/src/pages/Assessment.jsx:350) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #110 |
| 65 | 3.4.4 (module-assessment/src/pages/Assessment.jsx:400) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #110 |
| 66 | 3.4.4 (module-assessment/src/pages/AssessmentsList.jsx:706) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #110 |
| 67 | 3.4.4 (module-cloud-console/src/App.jsx:11) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #111 |
| 68 | 3.4.4 (module-cloud-console/src/CloudConsole.jsx:261) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #111 |
| 69 | 3.4.4 (module-cloud-console/src/CloudConsole.jsx:281) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #111 |
| 70 | 3.4.4 (module-cloud-labs/src/App.jsx:11) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #112 |
| 71 | 3.4.4 (module-cloud-labs/src/CloudLabs.jsx:28) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #112 |
| 72 | 3.4.4 (module-cloud-labs/src/CloudLabs.jsx:37) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #112 |
| 73 | 3.4.4 (module-code-environment/src/App.jsx:11) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #113 |
| 74 | 3.4.4 (module-code-environment/src/CodeEnvironment.jsx:39) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #113 |
| 75 | 3.4.4 (module-code-environment/src/CodeEnvironment.jsx:492) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #113 |
| 76 | 3.4.4 (module-code-module/src/App.jsx:11) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #114 |
| 77 | 3.4.4 (module-code-module/src/CodeModule.jsx:887) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #114 |
| 78 | 3.4.4 (module-content-uploading/src/App.jsx:12) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #115 |
| 79 | 3.4.4 (module-content-uploading/src/Content.jsx:639) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #115 |
| 80 | 3.4.4 (module-content-uploading/src/CohortContent.jsx:311) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #115 |
| 81 | 3.4.4 (module-content-uploading/src/CohortContent.jsx:327) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #115 |
| 82 | 3.4.4 (module-dashboard/src/App.jsx:11) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #116 |
| 83 | 3.4.4 (module-dashboard/src/Dashboard.jsx:203) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #116 |
| 84 | 3.4.4 (module-dashboard/src/Dashboard.jsx:272) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #116 |
| 85 | 3.4.4 (module-logging/src/App.jsx:11) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #117 |
| 86 | 3.4.4 (module-logging/src/Logs.jsx:458) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #117 |
| 87 | 3.4.4 (module-logging/src/Logs.jsx:492) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #117 |
| 88 | 3.4.4 (module-virtual-machine/src/App.jsx:11) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #118 |
| 89 | 3.4.4 (module-virtual-machine/src/VirtualMachine.jsx:802) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #118 |
| 90 | 3.4.3 (module-assessment) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 91 | 3.4.3 (module-cloud-console) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 92 | 3.4.3 (module-cloud-labs) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 93 | 3.4.3 (module-code-environment) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 94 | 3.4.3 (module-code-module) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 95 | 3.4.3 (module-content-uploading) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 96 | 3.4.3 (module-dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 97 | 3.4.3 (module-logging) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 98 | 3.4.3 (module-virtual-machine) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 99 | 3.4.3 (shared-design-system) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 100 | 3.4.3 (shell-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 101 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #100; liga #90 |
| 102 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #100; liga #91 |
| 103 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #100; liga #92 |
| 104 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #100; liga #93 |
| 105 | 3.4.5 #5 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #100; liga #94 |
| 106 | 3.4.5 #6 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #100; liga #95 |
| 107 | 3.4.5 #7 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #100; liga #96 |
| 108 | 3.4.5 #8 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #100; liga #97 |
| 109 | 3.4.5 #9 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #100; liga #98 |
| 110 | 3.4.5 #10 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #90; liga #99 |
| 111 | 3.4.5 #11 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #91; liga #99 |
| 112 | 3.4.5 #12 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #92; liga #99 |
| 113 | 3.4.5 #13 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #93; liga #99 |
| 114 | 3.4.5 #14 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #94; liga #99 |
| 115 | 3.4.5 #15 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #95; liga #99 |
| 116 | 3.4.5 #16 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #96; liga #99 |
| 117 | 3.4.5 #17 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #97; liga #99 |
| 118 | 3.4.5 #18 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #98; liga #99 |
| 119 | 3.4.5 #19 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #100; liga #99 |
| 120 | 3.4.5 #20 | 5 composição | código-fonte | events | arquitetural | forte | liga #100; liga #91 |
| 121 | 3.4.5 #21 | 5 composição | código-fonte | events | arquitetural | forte | liga #100; liga #92 |
| 122 | 3.4.5 #22 | 5 composição | código-fonte | events | arquitetural | forte | liga #100; liga #93 |
| 123 | 3.4.5 #23 | 5 composição | código-fonte | events | arquitetural | forte | liga #100; liga #94 |
| 124 | 3.4.5 #24 | 5 composição | código-fonte | events | arquitetural | forte | liga #100; liga #95 |
| 125 | 3.4.5 #25 | 5 composição | código-fonte | events | arquitetural | forte | liga #100; liga #96 |
| 126 | 3.4.5 #26 | 5 composição | código-fonte | events | arquitetural | forte | liga #100; liga #97 |
| 127 | 3.4.5 #27 | 5 composição | código-fonte | events | arquitetural | forte | liga #100; liga #98 |
| 128 | 3.4.5 #28 | 5 composição | código-fonte | events | arquitetural | forte | liga #90; liga #100 |
| 129 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #90 |
| 130 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #91 |
| 131 | 3.4.6 #3 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #92 |
| 132 | 3.4.6 #4 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #93 |
| 133 | 3.4.6 #5 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #94 |
| 134 | 3.4.6 #6 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #95 |
| 135 | 3.4.6 #7 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #96 |
| 136 | 3.4.6 #8 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #97 |
| 137 | 3.4.6 #9 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #98 |
| 138 | 3.4.6 #10 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #99 |
| 139 | 3.4.6 #11 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #100 |
| 140 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #101; contradiz #102; contradiz #103; contradiz #104; contradiz #105; contradiz #106; contradiz #107; contradiz #108; contradiz #109 |
| 141 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #129; corrobora #130; corrobora #131; corrobora #132; corrobora #133; corrobora #134; corrobora #135; corrobora #136; corrobora #137; corrobora #138; corrobora #139; corrobora docker-compose.yml:29-179 |
| 142 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #101; corrobora #102; corrobora #103; corrobora #104; corrobora #105; corrobora #106; corrobora #107; corrobora #108; corrobora #109 |
| 143 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #101; corrobora #102; corrobora #103; corrobora #104; corrobora #105; corrobora #106; corrobora #107; corrobora #108; corrobora #109; corrobora #49; corrobora shell-app/src/App.jsx:15-71 |
| 144 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #129; corrobora #130; corrobora #131; corrobora #132; corrobora #133; corrobora #134; corrobora #135; corrobora #136; corrobora #137; corrobora #138; corrobora #139; corrobora docker-compose.yml:3-184 |
| 145 | 3.4.7 #6 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #101; corrobora #102; corrobora #103; corrobora #104; corrobora #105; corrobora #106; corrobora #107; corrobora #108; corrobora #109; corrobora #3 |
| 146 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | contradiz docker-compose.yml:168-178 |
| 147 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #49; contradiz #11; contradiz shell-app/src/App.jsx:15-71 |
| 148 | 3.4.7 #9 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #3; corrobora #10; corrobora #11 |
| 149 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #129; corrobora #130; corrobora #131; corrobora #132; corrobora #133; corrobora #134; corrobora #135; corrobora #136; corrobora #137; corrobora #138; corrobora #139; corrobora module-cloud-labs/Dockerfile:1-22 |
| 150 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | contradiz docker-compose.yml:54-58; contradiz nginx/nginx.conf:49-50 |
| 151 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #129; corrobora #130; corrobora #131; corrobora #132; corrobora #133; corrobora #134; corrobora #135; corrobora #136; corrobora #137 |
| 152 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 153 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 154 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #3; corrobora module-cloud-labs/src/App.jsx:18-33 |
| 155 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 156 | 3.4.7 #17 | 7 documentação | documentação | — | tecnológica | fraca | contradiz #3; contradiz #11; contradiz module-cloud-labs/package.json:11-14 |
| 157 | 3.4.7 #18 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #22; corrobora #3; corrobora module-cloud-labs/src/index.js:4 |
| 158 | 3.4.7 #19 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #101; corrobora #102; corrobora #103; corrobora #104; corrobora #105; corrobora #106; corrobora #107; corrobora #108; corrobora #109; corrobora #110; corrobora #111; corrobora #112; corrobora #113; corrobora #114; corrobora #115; corrobora #116; corrobora #117; corrobora #118; corrobora #119; corrobora #11; corrobora #129; corrobora #130; corrobora #131; corrobora #132; corrobora #133; corrobora #134; corrobora #135; corrobora #136; corrobora #137; corrobora #138; corrobora #139 |
| 159 | 3.4.7 #20 | 7 documentação | documentação | module-federation | arquitetural | fraca | contradiz #11; contradiz #139; contradiz shell-app/public/index.html:22-48 |
| 160 | 3.4.7 #21 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte shell-app/src/config/remoteConfig.js:8-31; corrobora em parte shell-app/public/index.html:51 |
| 161 | 3.4.7 #22 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #58; corrobora shell-app/src/App.jsx:148; corrobora shell-app/src/remotes/remoteLoader.js:4; corrobora shell-app/src/App.jsx:105-106 |
| 162 | 3.4.7 #23 | 7 documentação | documentação | module-federation | tecnológica | fraca | contradiz #3; contradiz #11 |
| 163 | 3.4.7 #24 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #139; corrobora shell-app/Dockerfile:26 |
| 164 | 3.4.7 #25 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #58; corrobora shell-app/src/App.jsx:148; corrobora shell-app/src/App.jsx:79-153 |
| 165 | 3.4.7 #26 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #129; contradiz #130; contradiz #131; contradiz #132; contradiz #133; contradiz #134; contradiz #135; contradiz #136; contradiz #137; contradiz #138; contradiz #139; contradiz docker-compose.yml:29-179 |
| 166 | 3.4.7 #27 | 7 documentação | comentário | — | arquitetural | fraca | corrobora module-assessment/package.json:22; corrobora module-assessment/Dockerfile:7 |
| 167 | 3.4.7 #28 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #120; corrobora #121; corrobora #122; corrobora #123; corrobora #124; corrobora #125; corrobora #126; corrobora #127; corrobora #128; corrobora module-assessment/src/AuthContext.jsx:111-126 |
| 168 | 3.4.7 #29 | 7 documentação | comentário | — | arquitetural | fraca | contradiz #128; contradiz shared-design-system/src/contexts/ThemeContext.jsx:14-22; contradiz module-assessment/src/pages/AssessmentReports.jsx:418 |
| 169 | 3.4.7 #30 | 7 documentação | comentário | — | arquitetural | fraca | contradiz shared-design-system/src/contexts/ThemeContext.jsx:25-33 |
| 170 | 3.4.7 #31 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #101; corrobora #102; corrobora #103; corrobora #104; corrobora #105; corrobora #106; corrobora #107; corrobora #108; corrobora #109; corrobora shell-app/public/index.html:18-48; corrobora nginx/nginx.conf:25-134 |
| 171 | 3.4.7 #32 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #120; corrobora #121; corrobora #122; corrobora #123; corrobora #124; corrobora #125; corrobora #126; corrobora #127; corrobora #128; corrobora #61; corrobora shell-app/src/contexts/AuthContext.jsx:229 |
| 172 | 3.4.7 #33 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #119; corrobora #11; corrobora shell-app/src/App.jsx:3 |
| 173 | 3.4.7 #34 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora #3; corrobora #11 |
| 174 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #169; explica #62 |
| 175 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #140; explica #165 |
| 176 | 3.4.8 #3 | 8 histórico | histórico | — | contexto | fraca | explica #146 |
| 177 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #147 |
| 178 | 3.4.8 #5 | 8 histórico | histórico | — | contexto | fraca | explica #150 |
| 179 | 3.4.8 #6 | 8 histórico | histórico | — | contexto | fraca | explica #156 |
| 180 | 3.4.8 #7 | 8 histórico | histórico | — | contexto | fraca | explica #159 |
| 181 | 3.4.8 #8 | 8 histórico | histórico | — | contexto | fraca | explica #160 |
| 182 | 3.4.8 #9 | 8 histórico | histórico | — | contexto | fraca | explica #162 |
| 183 | 3.4.8 #10 | 8 histórico | histórico | — | arquitetural | fraca | explica #168 |

## Resumo

Observações: 183. Dimensões (tecnologia: 0, configuração: 12, código: 77, estrutura: 11, composição: 28, build-deploy: 11, documentação: 34, histórico: 10). Força (forte: 60, moderada: 59, fraca: 64, ambígua: 0). Evidência (tecnológica: 22, arquitetural: 145, contexto: 16).
