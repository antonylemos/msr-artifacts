---
schema: 1
id: 124905930
full_name: scality/metalk8s
commit: f19004e899c78360d3a43d5f60047b140f29c909
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

# 272 — scality/metalk8s

## Leitura do repositório

O shell descobre as UIs implantadas e monta as views do remote metalk8s-ui por Module Federation. A cadeia reúne quatro declarações de dependência (#1–#4), configurações de federação e descoberta (#5–#13), código genérico de descoberta e carga (#101–#103) e a relação ativa shell-ui → ui (#110). O contrato da ui expõe ./FederableApp e ./AlertsNavbarUpdater; o operador liga metalk8s-ui a shell-ui-cp. O shell não fixa o nome do remote na chamada de carga: o destino vem das configurações.

A estrutura confirma shell-ui e exclui a ferramenta de geração de clientes (#107, #108). Para ui, mantém-se o Undetermined estrutural: há build próprio e módulo exposto, mas a entrada está vazia e não há início standalone (#109). Os builds são separados; o shell tem imagem própria e também cópia na imagem metalk8s-ui, por isso seu deploy continua Undetermined. A ui tem deploy conjunto nessa imagem e as versões seguem o produto (#114, #115).

Os tipos gerados, imports locais, testes e stubs da mineração não demonstram carga de remotes. Guardian e o evento de idioma estão inativos; o adaptador de nome de instância também não está ligado (#104). mcpTools e vm-management-ui permanecem indeterminados quanto ao destino e à atividade (#105, #106, #111, #112). A ligação ui → shell-ui existe apenas na configuração de desenvolvimento e não tem consumo runtime identificado (#113).

As 16 afirmações documentais são fracas isoladamente. Cinco são contraditas, uma é parcialmente corroborada e dez são corroboradas; os conflitos incluem a navbar legada, singleton de core-ui e o comando start. Os nove pontos históricos esclarecem a evolução, sem mudar os valores finais da 3.4: a entrada vazia, recursos mantidos mas desligados, mecanismos recentes sem destino local e coexistência de estágios de deploy e documentação (#132–#140). O histórico não fornece o conteúdo das versões antigas em vários pontos; suas mensagens e datas não substituem a evidência do snapshot.

## Observações

### 1. shell-ui/package.json:52

**Observação:** O manifesto declara `@scality/module-federation` na seção `dependencies`, versão `1.6.1`.

**Interpretação:** Declara Module Federation; a configuração e os usos têm observações próprias, e a declaração isolada não liga unidades.

### 2. shell-ui/package.json:20

**Observação:** O manifesto declara `@module-federation/enhanced` na seção `devDependencies`, versão `^0.21.6`.

**Interpretação:** Declara Module Federation; a configuração e os usos têm observações próprias, e a declaração isolada não liga unidades.

### 3. ui/package.json:11

**Observação:** O manifesto declara `@scality/module-federation` na seção `dependencies`, versão `1.6.1`.

**Interpretação:** Declara Module Federation; a configuração e os usos têm observações próprias, e a declaração isolada não liga unidades.

### 4. ui/package.json:75

**Observação:** O manifesto declara `@module-federation/enhanced` na seção `devDependencies`, versão `^0.21.6`.

**Interpretação:** Declara Module Federation; a configuração e os usos têm observações próprias, e a declaração isolada não liga unidades.

### 5. shell-ui/rspack.config.ts:130-208

**Observação:** O ModuleFederationPlugin declara name shell, remoteEntry.js, expõe App, lang, provedores de autenticação e alertas, hooks e provedores de configuração. shared inclui dependências e singletons eager; @mcp-b/* é filtrado.

**Interpretação:** Configura a federação e a API exportada pelo shell sem declarar remotes.

### 6. ui/rspack.config.ts:118-151; ui/rspack.config.ts:171-206

**Observação:** O ModuleFederationPlugin declara name metalk8s, remoteEntry versionado, cinco exposes e shared singleton. remotes declara shell@http://localhost:8084/shell/mf-manifest.json apenas com !isProduction. MicroAppRuntimeConfigurationPlugin gera configuração de metalk8s-ui.

**Interpretação:** Configura o remote e liga a ui ao shell no ambiente de desenvolvimento; não demonstra consumo desse remote em runtime de produção.

### 7. salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:15-50

**Observação:** O manifesto ScalityUI shell-ui-cp usa a imagem shell-ui e declara na navbar as views platform e alerts do kind metalk8s-ui.

**Interpretação:** Registra o shell de control plane e conecta sua navegação à unidade metalk8s-ui.

### 8. salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:15-25

**Observação:** ScalityUIComponent metalk8s-ui declara imagem metalk8s-ui e mountPath /usr/share/nginx/html/.well-known.

**Interpretação:** Registra a aplicação remota no operador, sem declarar sozinho a ligação a outro frontend.

### 9. shell-ui/public/config.json:2-15

**Observação:** A navbar lista as views platform e alerts de metalk8s-ui; discoveryUrl aponta para /shell/deployed-ui-apps.json.

**Interpretação:** O shell seleciona views de outra unidade e declara onde descobrir as aplicações.

### 10. shell-ui/public/deployed-ui-apps.json:2-8

**Observação:** A lista contém kind metalk8s-ui, name metalk8s.eu-west-1, version local-dev e url http://localhost:3000.

**Interpretação:** Registra o destino que o shell resolve durante a descoberta de UIs.

### 11. ui/public/.well-known/micro-app-configuration:1-49

**Observação:** MicroAppConfiguration de metalk8s-ui declara remoteEntryPath /mf-manifest.json, views platform e alerts com ./FederableApp no scope metalk8s, hook ./platformLibrary, navbar updater ./AlertsNavbarUpdater e publicPath /metalk8s.

**Interpretação:** Publica o contrato de uma unidade para o mecanismo de composição; não nomeia outra unidade como destino.

### 12. salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:52-74

**Observação:** ScalityUIComponentExposer metalk8s-ui-exposer declara scalityUI shell-ui-cp, scalityUIComponent metalk8s-ui e appHistoryBasePath /platform.

**Interpretação:** Liga os registros de shell e remote no operador de UI.

### 13. salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:77-112

**Observação:** ScalityUI shell-ui-wp usa a imagem shell-ui e lista platform e alerts do kind metalk8s-ui na navbar.

**Interpretação:** Registra o shell de workload plane com destinos de navegação frontend nomeados.

### 14. ui/@mf-types/shell/compiled-types/src/FederatedApp.d.ts:12

**Observação:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 15. ui/@mf-types/shell/compiled-types/src/FederatedApp.d.ts:13

**Observação:** `export default function App(): import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 16. ui/@mf-types/shell/compiled-types/src/alerts/AlertProvider.d.ts:12

**Observação:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 17. ui/@mf-types/shell/compiled-types/src/auth/AuthConfigProvider.d.ts:9

**Observação:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 18. ui/@mf-types/shell/compiled-types/src/auth/AuthProvider.d.ts:5

**Observação:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 19. ui/@mf-types/shell/compiled-types/src/auth/FirstTimeLoginProvider.d.ts:7

**Observação:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 20. ui/@mf-types/shell/compiled-types/src/initFederation/ConfigurationProviders.d.ts:124

**Observação:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 21. ui/@mf-types/shell/compiled-types/src/initFederation/ShellConfigProvider.d.ts:54

**Observação:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 22. ui/@mf-types/shell/compiled-types/src/initFederation/ShellHistoryProvider.d.ts:4

**Observação:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 23. ui/@mf-types/shell/compiled-types/src/initFederation/ShellThemeSelectorProvider.d.ts:16

**Observação:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 24. ui/@mf-types/shell/compiled-types/src/initFederation/UIListProvider.d.ts:24

**Observação:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 25. ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:32

**Observação:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 26. ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:33

**Observação:** `export declare const InstanceName: () => import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 27. ui/@mf-types/shell/compiled-types/src/navbar/NavBar.d.ts:6

**Observação:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 28. ui/@mf-types/shell/compiled-types/src/navbar/NavBar.d.ts:20

**Observação:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 29. ui/@mf-types/shell/compiled-types/src/navbar/NavbarUpdaterComponents.d.ts:1

**Observação:** `export declare const NavbarUpdaterComponents: () => import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 30. ui/@mf-types/shell/compiled-types/src/navbar/NotificationCenter.d.ts:1

**Observação:** `declare const NotificationCenter: () => import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 31. ui/@mf-types/shell/compiled-types/src/navbar/SleepingNotificationBell.d.ts:1

**Observação:** `export declare const SleepingNotificationBell: () => import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 32. ui/@mf-types/shell/compiled-types/src/navbar/index.d.ts:6

**Observação:** `export declare const SolutionsNavbar: ({ children }: SolutionsNavbarProps) => import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 33. ui/@mf-types/shell/compiled-types/src/navbar/lang.d.ts:13

**Observação:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretação:** `import("react/jsx-runtime")` em posição de tipo numa declaração `.d.ts` gerada dos tipos do remote `shell` (`ui/@mf-types/`); não é executado nem carrega módulo em runtime

### 34. shell-ui/rspack.config.ts:140

**Observação:** `'./moduleFederation/ConfigurationProvider': './src/initFederation/ConfigurationProviders.tsx',`.

**Interpretação:** A linha configura exposição de módulo local no build; não é chamada de carregamento remoto em runtime.

### 35. shell-ui/rspack.config.ts:141

**Observação:** `'./moduleFederation/ShellConfigurationProvider': './src/initFederation/ShellConfigProvider.tsx',`.

**Interpretação:** A linha configura exposição de módulo local no build; não é chamada de carregamento remoto em runtime.

### 36. shell-ui/rspack.config.ts:142

**Observação:** `'./moduleFederation/UIListProvider': './src/initFederation/UIListProvider.tsx',`.

**Interpretação:** A linha configura exposição de módulo local no build; não é chamada de carregamento remoto em runtime.

### 37. shell-ui/src/FederatedApp.tsx:19

**Observação:** `import { ConfigurationProvider, useConfigRetriever, useFederatedRoutes } from './initFederation/ConfigurationProviders';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ConfigurationProviders.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API; os usos que ele habilita (`ConfigurationProvider`, `useFederatedRoutes`) estão nas linhas manuais shell-ui/src/initFederation/UIListProvider.tsx:70 e shell-ui/src/FederatedApp.tsx:85

### 38. shell-ui/src/FederatedApp.tsx:20

**Observação:** `import { ShellConfigProvider, useShellConfig } from './initFederation/ShellConfigProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellConfigProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 39. shell-ui/src/FederatedApp.tsx:21

**Observação:** `import { ShellHistoryProvider } from './initFederation/ShellHistoryProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellHistoryProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 40. shell-ui/src/FederatedApp.tsx:22

**Observação:** `import { ShellThemeSelectorProvider } from './initFederation/ShellThemeSelectorProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellThemeSelectorProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 41. shell-ui/src/FederatedApp.tsx:23

**Observação:** `import { UIListProvider } from './initFederation/UIListProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/UIListProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API; o uso que ele habilita (`UIListProvider`) está na linha manual shell-ui/src/initFederation/UIListProvider.tsx:70

### 42. shell-ui/src/auth/AuthConfigProvider.tsx:3

**Observação:** `import type { OIDCConfig, OAuth2ProxyConfig } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Import de tipo do arquivo local shell-ui/src/initFederation/ConfigurationProviders.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 43. shell-ui/src/auth/AuthProvider.spec.tsx:84

**Observação:** `'../initFederation/ShellConfigProvider',`.

**Interpretação:** Arquivo de teste; referência ao arquivo local `initFederation/ShellConfigProvider` (import ou `jest.mock`); o padrão casou com o nome da pasta, não com a API

### 44. shell-ui/src/auth/AuthProvider.tsx:6

**Observação:** `import type { OAuth2ProxyConfig, OIDCConfig } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Import de tipo do arquivo local shell-ui/src/initFederation/ConfigurationProviders.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 45. shell-ui/src/auth/AuthProvider.tsx:7

**Observação:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellConfigProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 46. shell-ui/src/guardian/GuardianContext.tsx:2; shell-ui/public/config.json:18; shell-ui/src/FederatedApp.tsx:185

**Observação:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretação:** A construção atende ao assistente externo Guardian, desligado pela configuração do snapshot; não demonstra composição ativa de unidades frontend.

### 47. shell-ui/src/guardian/GuardianDrawer.tsx:1; shell-ui/public/config.json:18; shell-ui/src/FederatedApp.tsx:185

**Observação:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretação:** A construção atende ao assistente externo Guardian, desligado pela configuração do snapshot; não demonstra composição ativa de unidades frontend.

### 48. shell-ui/src/hooks/useShellHooks.ts:27

**Observação:** `} from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ConfigurationProviders.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 49. shell-ui/src/hooks/useShellHooks.ts:28

**Observação:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellConfigProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 50. shell-ui/src/hooks/useShellHooks.ts:29

**Observação:** `import { useShellThemeSelector } from '../initFederation/ShellThemeSelectorProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellThemeSelectorProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 51. shell-ui/src/hooks/useShellHooks.ts:30

**Observação:** `import { useDeployedApps } from '../initFederation/UIListProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/UIListProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 52. shell-ui/src/mcp/MCPRegistrar.test.tsx:6

**Observação:** `import type { FederatedModuleInfo } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Arquivo de teste; referência ao arquivo local `initFederation/ConfigurationProviders` (import ou `jest.mock`); o padrão casou com o nome da pasta, não com a API

### 53. shell-ui/src/mcp/MCPRegistrar.tsx:16

**Observação:** `} from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ConfigurationProviders.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 54. shell-ui/src/mcp/MCPRegistrar.tsx:17

**Observação:** `import { useDeployedApps } from '../initFederation/UIListProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/UIListProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 55. shell-ui/src/navbar/InstanceName.spec.tsx:10

**Observação:** `import type { RuntimeWebFinger } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Arquivo de teste; referência ao arquivo local `initFederation/ConfigurationProviders` (import ou `jest.mock`); o padrão casou com o nome da pasta, não com a API

### 56. shell-ui/src/navbar/InstanceName.spec.tsx:14

**Observação:** `jest.mock('../initFederation/ConfigurationProviders', () => ({`.

**Interpretação:** Arquivo de teste; referência ao arquivo local `initFederation/ConfigurationProviders` (import ou `jest.mock`); o padrão casou com o nome da pasta, não com a API

### 57. shell-ui/src/navbar/InstanceName.spec.tsx:37

**Observação:** `jest.mock('../initFederation/UIListProvider', () => ({`.

**Interpretação:** Arquivo de teste; referência ao arquivo local `initFederation/UIListProvider` (import ou `jest.mock`); o padrão casou com o nome da pasta, não com a API

### 58. shell-ui/src/navbar/InstanceName.tsx:8

**Observação:** `import { type RuntimeWebFinger, useConfigRetriever } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ConfigurationProviders.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 59. shell-ui/src/navbar/InstanceName.tsx:9

**Observação:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellConfigProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 60. shell-ui/src/navbar/InstanceName.tsx:10

**Observação:** `import { useDeployedApps } from '../initFederation/UIListProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/UIListProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 61. shell-ui/src/navbar/NavBar.tsx:22

**Observação:** `} from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ConfigurationProviders.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 62. shell-ui/src/navbar/NavBar.tsx:23

**Observação:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellConfigProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 63. shell-ui/src/navbar/NavBar.tsx:24

**Observação:** `import { useShellThemeSelector } from '../initFederation/ShellThemeSelectorProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellThemeSelectorProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 64. shell-ui/src/navbar/NavbarUpdaterComponents.tsx:7

**Observação:** `import type { FederatedModuleInfo } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Import de tipo do arquivo local shell-ui/src/initFederation/ConfigurationProviders.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 65. shell-ui/src/navbar/NavbarUpdaterComponents.tsx:8

**Observação:** `import { useConfigRetriever } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ConfigurationProviders.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 66. shell-ui/src/navbar/NavbarUpdaterComponents.tsx:9

**Observação:** `import { useDeployedApps } from '../initFederation/UIListProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/UIListProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 67. shell-ui/src/navbar/NotificationCenter.spec.tsx:9

**Observação:** `import { ShellHistoryProvider } from '../initFederation/ShellHistoryProvider';`.

**Interpretação:** Arquivo de teste; referência ao arquivo local `initFederation/ShellHistoryProvider` (import ou `jest.mock`); o padrão casou com o nome da pasta, não com a API

### 68. shell-ui/src/navbar/NotificationCenter.tsx:12

**Observação:** `import { useShellHistory } from '../initFederation/ShellHistoryProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellHistoryProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 69. shell-ui/src/navbar/auth/permissionUtils.ts:4

**Observação:** `import { UserGroupsMapping } from '../../initFederation/ShellConfigProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellConfigProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 70. shell-ui/src/navbar/index.spec.tsx:15

**Observação:** `import { ShellConfigProvider } from '../initFederation/ShellConfigProvider';`.

**Interpretação:** Arquivo de teste; referência ao arquivo local `initFederation/ShellConfigProvider` (import ou `jest.mock`); o padrão casou com o nome da pasta, não com a API

### 71. shell-ui/src/navbar/index.spec.tsx:16

**Observação:** `import { ShellHistoryProvider } from '../initFederation/ShellHistoryProvider';`.

**Interpretação:** Arquivo de teste; referência ao arquivo local `initFederation/ShellHistoryProvider` (import ou `jest.mock`); o padrão casou com o nome da pasta, não com a API

### 72. shell-ui/src/navbar/index.spec.tsx:17

**Observação:** `import { ShellThemeSelectorProvider } from '../initFederation/ShellThemeSelectorProvider';`.

**Interpretação:** Arquivo de teste; referência ao arquivo local `initFederation/ShellThemeSelectorProvider` (import ou `jest.mock`); o padrão casou com o nome da pasta, não com a API

### 73. shell-ui/src/navbar/index.tsx:2

**Observação:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellConfigProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 74. shell-ui/src/navbar/index.tsx:3

**Observação:** `import { useShellThemeSelector } from '../initFederation/ShellThemeSelectorProvider';`.

**Interpretação:** Import estático do arquivo local shell-ui/src/initFederation/ShellThemeSelectorProvider.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 75. shell-ui/src/navbar/navbarHooks.ts:2

**Observação:** `import type { ViewDefinition } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Import de tipo do arquivo local shell-ui/src/initFederation/ConfigurationProviders.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 76. shell-ui/src/navbar/navbarHooks.ts:3

**Observação:** `import '../initFederation/ConfigurationProviders';`.

**Interpretação:** Import de efeito colateral do arquivo local shell-ui/src/initFederation/ConfigurationProviders.tsx, da própria unidade; o padrão casou com o nome da pasta `initFederation`, não com a API

### 77. shell-ui/src/setupTests.ts:83

**Observação:** `registerRemotes: () => {},`.

**Interpretação:** `registerRemotes: () => {}` é um stub no mock de `@module-federation/enhanced/runtime` do setup de testes (shell-ui/src/setupTests.ts); não roda no build

### 78. ui/@mf-types/shell/compiled-types/src/auth/AuthConfigProvider.d.ts:2

**Observação:** `import type { OIDCConfig, OAuth2ProxyConfig } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 79. ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:6

**Observação:** `import { useConfig, useConfigRetriever, useDiscoveredViews, useLinkOpener } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 80. ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:7

**Observação:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 81. ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:8

**Observação:** `import { useShellThemeSelector } from '../initFederation/ShellThemeSelectorProvider';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 82. ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:9

**Observação:** `import { useDeployedApps } from '../initFederation/UIListProvider';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 83. ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:2

**Observação:** `import { type RuntimeWebFinger } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 84. ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:11

**Observação:** `microAppConfiguration: import("../initFederation/ConfigurationProviders").EnrichedBuildtimeWebFinger;`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 85. ui/@mf-types/shell/compiled-types/src/navbar/NavBar.d.ts:2

**Observação:** `import { ViewDefinition } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 86. ui/@mf-types/shell/compiled-types/src/navbar/auth/permissionUtils.d.ts:3

**Observação:** `import { UserGroupsMapping } from '../../initFederation/ShellConfigProvider';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 87. ui/@mf-types/shell/compiled-types/src/navbar/navbarHooks.d.ts:1

**Observação:** `import type { ViewDefinition } from '../initFederation/ConfigurationProviders';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 88. ui/@mf-types/shell/compiled-types/src/navbar/navbarHooks.d.ts:2

**Observação:** `import '../initFederation/ConfigurationProviders';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 89. ui/@mf-types/shell/moduleFederation/ConfigurationProvider.d.ts:1

**Observação:** `export * from './../compiled-types/src/initFederation/ConfigurationProviders';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 90. ui/@mf-types/shell/moduleFederation/ConfigurationProvider.d.ts:2

**Observação:** `export { default } from './../compiled-types/src/initFederation/ConfigurationProviders';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 91. ui/@mf-types/shell/moduleFederation/ShellConfigurationProvider.d.ts:1

**Observação:** `export * from './../compiled-types/src/initFederation/ShellConfigProvider';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 92. ui/@mf-types/shell/moduleFederation/ShellConfigurationProvider.d.ts:2

**Observação:** `export { default } from './../compiled-types/src/initFederation/ShellConfigProvider';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 93. ui/@mf-types/shell/moduleFederation/UIListProvider.d.ts:1

**Observação:** `export * from './../compiled-types/src/initFederation/UIListProvider';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 94. ui/@mf-types/shell/moduleFederation/UIListProvider.d.ts:2

**Observação:** `export { default } from './../compiled-types/src/initFederation/UIListProvider';`.

**Interpretação:** Declaração de tipos `.d.ts` gerada do remote `shell` em `ui/@mf-types/`; o padrão casou com o nome da pasta `initFederation` do shell, não com a API; não é executada

### 95. shell-ui/src/guardian/GuardianDrawer.tsx:37; shell-ui/public/config.json:18; shell-ui/src/FederatedApp.tsx:185

**Observação:** `<iframe`.

**Interpretação:** A construção atende ao assistente externo Guardian, desligado pela configuração do snapshot; não demonstra composição ativa de unidades frontend.

### 96. shell-ui/src/guardian/guardianPostMessageHooks.ts:38; shell-ui/public/config.json:18; shell-ui/src/FederatedApp.tsx:185

**Observação:** `iframeRef.current?.contentWindow?.postMessage(message, origin);`.

**Interpretação:** A construção atende ao assistente externo Guardian, desligado pela configuração do snapshot; não demonstra composição ativa de unidades frontend.

### 97. shell-ui/src/guardian/guardianPostMessageHooks.ts:63; shell-ui/public/config.json:18; shell-ui/src/FederatedApp.tsx:185

**Observação:** `iframeRef.current?.contentWindow?.postMessage({ type: 'MCP_ACK', id }, origin);`.

**Interpretação:** A construção atende ao assistente externo Guardian, desligado pela configuração do snapshot; não demonstra composição ativa de unidades frontend.

### 98. shell-ui/src/navbar/__TESTS__/testMultipleHooks.tsx:92

**Observação:** `const event = new CustomEvent(RENDER_HOOK_EVENT, {`.

**Interpretação:** Evento `RENDER_HOOK_EVENT` de um utilitário de teste (shell-ui/src/navbar/__TESTS__/testMultipleHooks.tsx:21, :43, :92-97); não é comunicação entre unidades

### 99. shell-ui/src/navbar/__TESTS__/testMultipleHooks.tsx:97

**Observação:** `window.dispatchEvent(event);`.

**Interpretação:** Evento `RENDER_HOOK_EVENT` de um utilitário de teste (shell-ui/src/navbar/__TESTS__/testMultipleHooks.tsx:21, :43, :92-97); não é comunicação entre unidades

### 100. shell-ui/src/navbar/lang.tsx:49; shell-ui/src/navbar/lang.tsx:47-52; shell-ui/src/FederatedApp.tsx:257

**Observação:** `new CustomEvent(LANGUAGE_CHANGED_EVENT, {`.

**Interpretação:** O evento depende de uma prop ausente no único uso registrado; é sinal inativo de comunicação, sem ligação ativa entre unidades.

### 101. shell-ui/src/initFederation/UIListProvider.tsx:70; shell-ui/src/initFederation/ConfigurationProviders.tsx:395; shell-ui/public/config.json:15; shell-ui/public/deployed-ui-apps.json:2-8; ui/public/.well-known/micro-app-configuration:8-27

**Observação:** fetch(discoveryURL) lê e valida a lista de UIs; ConfigurationProvider busca .well-known/micro-app-configuration de cada aplicação.

**Interpretação:** Implementa a descoberta genérica das UIs que serão compostas. O destino concreto vem da configuração, não de um nome de unidade nesta chamada.

### 102. shell-ui/src/FederatedApp.tsx:85-92; shell-ui/src/FederatedApp.tsx:97-137; ui/rspack.config.ts:122; ui/src/FederableApp.tsx:120-122

**Observação:** FederatedComponent recebe URL formada por app.url, remoteEntryPath e versão, além de module, scope, app e props shellHooks/shellAlerts. InternalRouter transforma as views em rotas.

**Interpretação:** Implementa a montagem de views remotas por parâmetros da descoberta e a entrega dos hooks do shell à UI; a chamada genérica não nomeia o destino.

### 103. shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51-69; shell-ui/src/navbar/NavbarUpdaterComponents.tsx:22-37; ui/public/.well-known/micro-app-configuration:42-47; ui/rspack.config.ts:124

**Observação:** O shell percorre navbarUpdaterComponents das configurações descobertas e passa module, scope, URL do remote e funções de notificação ao FederatedComponent.

**Interpretação:** Implementa a carga de updaters de navbar por parâmetros, sem nomear uma unidade na chamada.

### 104. shell-ui/src/navbar/InstanceName.tsx:161; shell-ui/src/navbar/InstanceName.tsx:153-170; salt/metalk8s/addons/ui/config/metalk8s-shell-ui-config.yaml.j2:41; salt/metalk8s/addons/ui/config/workloadplane-shell-ui-config.yaml.j2:17; ui/public/.well-known/micro-app-configuration:1-49

**Observação:** ComponentWithFederatedImports recebe instanceNameAdapter. O componente retorna vazio sem canChangeInstanceName; as configurações Salt declaram false e a configuração da ui não declara adaptador.

**Interpretação:** Há mecanismo de importação federada inativo nas configurações do snapshot; não sustenta uma relação de composição ativa.

### 105. shell-ui/src/mcp/MCPRegistrar.tsx:201; shell-ui/src/mcp/MCPRegistrar.tsx:176-211; ui/public/.well-known/micro-app-configuration:1-49

**Observação:** O registrador lê spec.mcpTools, retorna null sem esse campo e passa as informações do módulo e remoteEntryUrl a ComponentWithFederatedImports. A configuração da ui não declara mcpTools.

**Interpretação:** O mecanismo está implementado e montado, mas o snapshot não identifica UI que declare o destino. Continuam plausíveis o uso por uma UI descoberta em outro ambiente e a ausência de carga neste ambiente.

### 106. ui/src/containers/Layout.tsx:251; ui/src/containers/Layout.tsx:100-103; ui/src/containers/Layout.tsx:246-262

**Observação:** A rota virtual-machines/* renderiza FederatedComponent com a URL e os dados de vmView, selecionada pelo kind vm-management-ui. Sem vmView renderiza a página 404.

**Interpretação:** Declara composição aninhada com vm-management-ui, mas sua disponibilidade depende da descoberta. O snapshot permite tanto carga com esse destino implantado quanto fallback 404 sem ele.

### 107. shell-ui/; shell-ui/rspack.config.ts:46; shell-ui/src/index.tsx:1-9; shell-ui/package.json:9

**Observação:** O diretório tem manifesto, configuração rspack com entry ./src/index.tsx, criação de raiz React e script próprio de build.

**Interpretação:** Confirma o limite de uma unidade frontend com início e build próprios.

### 108. tools/crd-client-generator-js/; tools/crd-client-generator-js/package.json:8

**Observação:** O pacote executa ts-node src/index.ts como ferramenta de geração de clientes de CRD.

**Interpretação:** Ferramenta Node de apoio, sem unidade frontend.

### 109. ui/; ui/rspack.config.ts:32-34; ui/rspack.config.ts:118-127; ui/src/index.ts (0 bytes); ui/src/FederableApp.tsx:120-122; ui/package.json:39

**Observação:** O diretório tem build rspack próprio, entry ./src/index.ts vazia e exporta FederableApp pelos exposes, sem início de renderização próprio.

**Interpretação:** A revisão estrutural permanece Undetermined: o limite de build do remote é visível, mas seu início standalone não está demonstrado. Ser uma unidade iniciável por si e funcionar apenas quando montada pelo shell permanecem leituras distintas para esse critério.

### 110. shell-ui/src/FederatedApp.tsx:85-92; shell-ui/public/deployed-ui-apps.json:2-8; ui/public/.well-known/micro-app-configuration:1-49; ui/rspack.config.ts:118-127; salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:52-63

**Observação:** O shell descobre metalk8s-ui, resolve seu mf-manifest.json e monta as views ./FederableApp e o updater ./AlertsNavbarUpdater do scope metalk8s. O exposer liga metalk8s-ui a shell-ui-cp.

**Interpretação:** Relação ativa shell-ui → ui por Module Federation, com destino presente no snapshot.

### 111. shell-ui/src/mcp/MCPRegistrar.tsx:176-211

**Observação:** O shell lê mcpTools de cada configuração de UI e condiciona a importação federada à presença do campo. Nenhuma configuração do snapshot o declara.

**Interpretação:** Relação shell-ui → mcpTools indeterminada: pode ser satisfeita por UI descoberta em outro ambiente ou permanecer sem destino carregável.

### 112. ui/src/containers/Layout.tsx:100-103; ui/src/containers/Layout.tsx:246-262

**Observação:** A ui procura vm-management-ui nas views descobertas e monta seu módulo em virtual-machines/*, com fallback 404 quando ausente.

**Interpretação:** Relação ui → vm-management-ui indeterminada: a composição depende de uma UI cuja presença e configuração não são demonstradas no snapshot.

### 113. ui/rspack.config.ts:128-132; shell-ui/rspack.config.ts:131; shell-ui/rspack.config.ts:54

**Observação:** A ui declara shell@http://localhost:8084/shell/mf-manifest.json só fora de produção; shell-ui declara name shell. Não há import runtime shell/... na ui.

**Interpretação:** Relação ui → shell-ui configurada para desenvolvimento, Ativa No na 3.4.5; não estabelece composição em produção.

### 114. shell-ui/package.json:9; shell-ui/Dockerfile:4-30; buildchain/buildchain/image.py:417-437; images/metalk8s-ui/Dockerfile:9-11; salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:15-32; salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:77-94; .github/workflows/build-shell-ui.yaml:31-78; .github/workflows/publish.yaml:106-160; buildchain/buildchain/versions.py:257-266; .github/workflows/publish.yaml:71-76

**Observação:** O shell tem script rspack e imagem nginx próprios, recursos ScalityUI e publicação da imagem e de shell.tar no CI. O mesmo build também é copiado para a imagem metalk8s-ui. A versão segue o produto.

**Interpretação:** O build é separado e confirma um limite da unidade. O deploy permanece Undetermined pela coexistência das duas formas de publicação; não há versionamento próprio.

### 115. ui/package.json:39; ui/Dockerfile:3-19; ui/entrypoint.sh:5-8; buildchain/buildchain/ui.py:48-64; buildchain/buildchain/ui.py:115-128; images/metalk8s-ui/Dockerfile:9-11; salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:15-25; buildchain/buildchain/versions.py:257-266

**Observação:** A ui tem script rspack e tarefa de build próprios. A imagem metalk8s-ui contém ui, docs/html e shell-ui e é usada pelo ScalityUIComponent. A versão segue o produto.

**Interpretação:** O build é separado, mas o deploy é conjunto com shell e documentação na mesma imagem; não há versionamento próprio. Isso não resolve a dúvida estrutural sobre início standalone.

### 116. .github/workflows/publish.yaml:42

**Observação:** O texto afirma: "Retrieve Shell UI image from the build, load it and compute version".

**Interpretação:** Descreve recuperação da imagem e cálculo da versão, corroborados pelo CI; não implica versão independente.

### 117. .github/workflows/publish.yaml:106

**Observação:** O texto afirma: "Tag shell-ui image before upload to registry".

**Interpretação:** Descreve publicação da imagem do shell, corroborada pelo workflow.

### 118. CLAUDE.md:6

**Observação:** O texto afirma: "**TypeScript/React UI** (`ui/`, `shell-ui/`) using rspack, react-router v7, react-query, `@scality/core-ui`, `@scality/module-federation`".

**Interpretação:** Situa ui e shell-ui como conjunto frontend com React/rspack e a biblioteca de federação, sem resolver o início standalone da ui.

### 119. buildchain/buildchain/shell_ui.py:3-10

**Observação:** O texto afirma: "Tasks to build the Shell UI." (diagrama `shell-UI` → `mkdir` → `build`).

**Interpretação:** Descreve o build próprio do shell, confirmado pelas tarefas.

### 120. buildchain/buildchain/ui.py:3-10

**Observação:** O texto afirma: "Tasks to build the MetalK8s UI." (diagrama `UI` → `mkdir` → `UI build` → `UI configuration`).

**Interpretação:** Descreve o build próprio da ui, confirmado pelas tarefas.

### 121. buildchain/buildchain/versions.py:63

**Observação:** O texto afirma: "Get shell ui version from package.json".

**Interpretação:** Descreve a leitura de uma versão do manifesto, confirmada pelo código; não afirma que essa versão é usada para publicar a imagem.

### 122. shell-ui/README.md:6-11

**Observação:** O texto afirma: "we have this configuration on module federation : ``` '@scality/core-ui': { singleton: true, } ```".

**Interpretação:** Afirma singleton de core-ui, contradito pela configuração atual, que não declara essa opção para a biblioteca.

### 123. shell-ui/README.md:13-14

**Observação:** O texto afirma: "We want to avoid to set the option `eager: true` because will load core-ui completely at the beginning".

**Interpretação:** A orientação de não usar eager para core-ui é corroborada pelo shared atual.

### 124. shell-ui/README.md:19

**Observação:** O texto afirma: "Common navbar that can be integrated in metalk8s solution UI".

**Interpretação:** Descreve navbar embutida nas UIs de solução; o snapshot mostra a direção inversa, shell compondo ui, e contradiz o mecanismo legado.

### 125. shell-ui/README.md:21-23

**Observação:** O texto afirma: "Authentication : token negociation, token renewal, claims provider / Theming : provide the selected theme to solution UIs / I18n : provide a language selector and expose selected language to solution UIs".

**Interpretação:** Descreve autenticação, tema e idioma fornecidos às UIs; isso se confirma pelos hooks e contexto do shell.

### 126. shell-ui/README.md:58-65

**Observação:** O texto afirma: "logOut(providerLogout: boolean): void - force logOut, might be called when an UI receive a 401 or 403 status code" / "getClaims(): Promise<Claims>" / "getIdToken(): Promise<string>" / "getLanguage()" / "getTheme()" / "getOptions()".

**Interpretação:** Descreve métodos de um elemento DOM legado; o snapshot usa hooks por props e contradiz esse contrato.

### 127. shell-ui/README.md:67-72

**Observação:** O texto afirma: "solutions--authenticated, payload: {token, claims: {...}} --- also called when the token is renewed" / "solutions--logged-out" / "solutions--theme-changed" / "solutions--language-changed".

**Interpretação:** Descreve eventos legados; os nomes e os disparos ativos não se confirmam, conforme a revisão de código.

### 128. shell-ui/rspack.config.ts:148

**Observação:** O texto afirma: "@mcp-b/* are side-effect-only browser globals — must not be shared via MF".

**Interpretação:** Descreve exclusão de @mcp-b/* do compartilhamento; o filtro da configuração confirma.

### 129. shell-ui/src/navbar/NavbarUpdaterComponents.tsx:66-67

**Observação:** O texto afirma: "Headless updaters — they publish links/notifications and render nothing in place.".

**Interpretação:** Descreve módulos de atualização sem renderização visual, corroborados pela carga do shell e pelo updater de alertas da ui.

### 130. ui/README.md:29

**Observação:** O texto afirma: "This will first start `<root>/shell-ui` in Docker container and expose it on port 8084 and then will start the Metalk8s UI in dev mode.".

**Interpretação:** Afirma que start sobe shell em Docker, contradito pelo script atual que só inicia rspack serve da ui.

### 131. ui/README.md:30-32

**Observação:** O texto afirma: "you can alternatively install `<root>/shell-ui` dependencies via running `npm install` in that folder and then run `npm run build`. Then serve statically the content of the `<root>/shell-ui/build` folder on the port 8084.".

**Interpretação:** O build estático do shell e o endereço de desenvolvimento são confirmados em parte; suficiência do fluxo descrito não é demonstrada.

### 132. 50c231439 2023-02-27 (ui/src/index.ts); ae1de7bcc 2024-06-28 (ui/src/index.ts)

**Observação:** A revisão registra criação de index.ts na migração TypeScript em 2023 e mudança para o objeto vazio em ae1de7bcc, junto da remoção de entry.tsx e index.html em 2024.

**Interpretação:** Esclarece a origem da entrada vazia como mudança deliberada, preservando o Undetermined estrutural do snapshot.

### 133. ddf833ad6 2026-04-08 (shell-ui/src/guardian/); 8522c6c98 2026-04-27 (shell-ui/src/guardian/GuardianDrawer.tsx); 8b8e67415 2026-05-05 (shell-ui/public/config.json; shell-ui/src/FederatedApp.tsx); 462b577fe 2026-06-10 (shell-ui/src/guardian/); 98052bf1b 2026-08-17 (shell-ui/src/guardian/)

**Observação:** A revisão registra Guardian introduzido em abril de 2026, chave canUseGuardian em maio e mudanças até agosto; não dispõe do conteúdo antigo das configurações.

**Interpretação:** Esclarece que o recurso desligado é recente e mantido; não muda os No do snapshot.

### 134. f28782afa 2021-02-24 (shell-ui/README.md); 59da5f6ff 2021-04-07 (shell-ui/src/navbar/events.js; shell-ui/src/navbar/library.js); a33ef1c93 2021-04-14 (shell-ui/src/platform/library.js); 938cc576e 2021-05-26 (shell-ui/webpack.common.js); eeeca883a 2021-06-04 (shell-ui/); 30709cb48 2023-02-27 (shell-ui/src/navbar/events.ts; shell-ui/src/navbar/library.ts); e109eb9ef 2023-06-13 (shell-ui/README.md)

**Observação:** A revisão situa README, eventos e biblioteca legados em fevereiro–abril de 2021, antes da migração do shell para Module Federation em maio–junho; após TypeScript esses arquivos recebem sobretudo mudanças gerais.

**Interpretação:** Explica as afirmações contraditas e o evento inativo como estágios anteriores à composição atual.

### 135. 26151e240 2024-02-15 (shell-ui/src/navbar/InstanceName.tsx); 1372479a8 2024-09-16 (salt/metalk8s/addons/ui/config/metalk8s-shell-ui-config.yaml.j2); 85bcf59be 2026-05-06 (shell-ui/src/navbar/InstanceName.tsx); 4684c2a43 2026-08-11 (shell-ui/src/navbar/InstanceName.tsx)

**Observação:** A revisão registra introdução de InstanceName e das configurações em 2024, com manutenção do componente até agosto de 2026; não mostra se a flag já esteve true.

**Interpretação:** Explica o mecanismo inativo como recurso mantido; não demonstra configuração que o ligue no snapshot.

### 136. 627a3559f 2025-09-09 (ui/public/.well-known/micro-app-configuration); baba81932 2026-03-27 (shell-ui/src/mcp/MCPRegistrar.tsx); 07b8b7053 2026-10-06 (shell-ui/src/mcp/MCPRegistrar.tsx)

**Observação:** A revisão registra MCPRegistrar desde março de 2026 e mudanças até outubro; micro-app-configuration da ui não muda desde setembro de 2025, antes da introdução de mcpTools.

**Interpretação:** Explica um mecanismo recente que a ui local nunca declarou; permanece indeterminado seu destino na composição do snapshot.

### 137. 556f0c84f 2026-09-17 (ui/src/containers/Layout.tsx)

**Observação:** A mensagem de 556f0c84f anuncia a aba de máquinas virtuais e descreve a micro-app como implantada só em ARTESCA+, com presença usada como condição da rota.

**Interpretação:** Explica a intenção de composição com outro produto pela mensagem do commit; sem código do destino, permanece o Undetermined da relação no snapshot.

### 138. 2d6df3d31 2021-02-24 (images/metalk8s-ui/Dockerfile; images/metalk8s-ui/conf/nginx.conf; buildchain/buildchain/shell_ui.py); 70dbd925d 2025-08-13 (salt/metalk8s/addons/shell-ui/deployed/); 65ea4b164 2025-08-13 (salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls); 009ff435b 2025-10-13 (salt/metalk8s/addons/ui/deployed/); 410823fd7 2025-12-16 (images/metalk8s-ui/conf/nginx.conf); da28d2908 2026-07-16 (images/metalk8s-ui/Dockerfile)

**Observação:** A revisão registra cópia do shell na imagem metalk8s-ui desde 2021 e deploy próprio via ScalityUI desde agosto de 2025; a cópia anterior não foi removida.

**Interpretação:** Explica as duas formas como estágios diferentes coexistindo; não resolve qual delas é usada e preserva o deploy Undetermined.

### 139. e109eb9ef 2023-06-13 (shell-ui/README.md); 5640809b6 2025-12-18 (shell-ui/rspack.config.ts; ui/rspack.config.ts); 3d610e75a 2026-01-14 (shell-ui/rspack.config.ts; ui/rspack.config.ts)

**Observação:** O README do shell é de junho de 2023; mensagens de dezembro de 2025 anunciam volta do singleton de core-ui e de janeiro de 2026 anunciam sua retirada nas duas configurações.

**Interpretação:** Explica a contradição documental pela mudança posterior da configuração; o conteúdo histórico não foi inspecionado.

### 140. e2fae4bcf 2023-06-28 (ui/README.md); e83045616 2024-07-03 (ui/webpack.dev.js; ui/webpack.common.js; ui/webpack.prod.js; ui/package.json); 136cf7844 2026-01-29 (shell-ui/rspack.config.ts; ui/rspack.config.ts; shell-ui/public/config.json; shell-ui/public/deployed-ui-apps.json)

**Observação:** A revisão situa o README da ui em junho de 2023, antes da remoção de webpack em julho de 2024 e da reorganização do ambiente de desenvolvimento em janeiro de 2026.

**Interpretação:** Explica a divergência documental pela idade do README, sem reconstituir scripts antigos indisponíveis.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (shell-ui/package.json:52) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5; declara #102; declara #103 |
| 2 | 3.4.2 (shell-ui/package.json:20) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5 |
| 3 | 3.4.2 (ui/package.json:11) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6; declara ui/src/FederableApp.tsx:120-122 |
| 4 | 3.4.2 (ui/package.json:75) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 5 | 3.4.2 (shell-ui/package.json:52; Evidência); 3.4.2 (shell-ui/package.json:20; Evidência); 3.4.3 (shell-ui; Marcadores); 3.4.4 (shell-ui/rspack.config.ts:140; Arquivo:linha); 3.4.4 (shell-ui/rspack.config.ts:140; Observação); 3.4.4 (shell-ui/rspack.config.ts:141; Arquivo:linha); 3.4.4 (shell-ui/rspack.config.ts:141; Observação); 3.4.4 (shell-ui/rspack.config.ts:142; Arquivo:linha); 3.4.4 (shell-ui/rspack.config.ts:142; Observação); 3.4.5 (#4; Configuração); 3.4.7 (#7; Evidência); 3.4.7 (#8; Evidência); 3.4.7 (#13; Documento); 3.4.7 (#13; Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #107 |
| 6 | 3.4.2 (ui/package.json:11; Evidência); 3.4.2 (ui/package.json:75; Evidência); 3.4.3 (ui; Marcadores); 3.4.3 (ui; Entrada); 3.4.3 (ui; Build); 3.4.4 (shell-ui/src/FederatedApp.tsx:85; Observação); 3.4.4 (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51; Observação); 3.4.5 (#1; Configuração); 3.4.5 (#4; Configuração); 3.4.7 (#7; Evidência); 3.4.7 (#15; Evidência); 3.4.7 (#16; Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #113; configura #109 |
| 7 | 3.4.3 (shell-ui; Deploy); 3.4.5 (#1; Configuração); 3.4.6 (#1; Artefatos) | 2 configuração | deploy | module-federation | arquitetural | forte | configura #110 |
| 8 | 3.4.3 (ui; Deploy); 3.4.6 (#2; Artefatos) | 2 configuração | deploy | module-federation | arquitetural | moderada | configura #109 |
| 9 | 3.4.4 (shell-ui/src/initFederation/UIListProvider.tsx:70; Observação); 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:161; Observação); 3.4.5 (#1; Configuração) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #110 |
| 10 | 3.4.4 (shell-ui/src/initFederation/UIListProvider.tsx:70; Observação); 3.4.4 (ui/src/containers/Layout.tsx:251; Observação); 3.4.5 (#1; Configuração) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #110 |
| 11 | 3.4.4 (shell-ui/src/initFederation/UIListProvider.tsx:70; Observação); 3.4.4 (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51; Observação); 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:161; Observação); 3.4.5 (#1; Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #110 |
| 12 | 3.4.5 (#1; Configuração) | 2 configuração | deploy | module-federation | arquitetural | forte | configura #110 |
| 13 | 3.4.6 (#1; Artefatos) | 2 configuração | deploy | module-federation | arquitetural | forte | configura #107 |
| 14 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/FederatedApp.d.ts:12) | 3 código | código-fonte | — | contexto | fraca | — |
| 15 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/FederatedApp.d.ts:13) | 3 código | código-fonte | — | contexto | fraca | — |
| 16 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/alerts/AlertProvider.d.ts:12) | 3 código | código-fonte | — | contexto | fraca | — |
| 17 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/auth/AuthConfigProvider.d.ts:9) | 3 código | código-fonte | — | contexto | fraca | — |
| 18 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/auth/AuthProvider.d.ts:5) | 3 código | código-fonte | — | contexto | fraca | — |
| 19 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/auth/FirstTimeLoginProvider.d.ts:7) | 3 código | código-fonte | — | contexto | fraca | — |
| 20 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/initFederation/ConfigurationProviders.d.ts:124) | 3 código | código-fonte | — | contexto | fraca | — |
| 21 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/initFederation/ShellConfigProvider.d.ts:54) | 3 código | código-fonte | — | contexto | fraca | — |
| 22 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/initFederation/ShellHistoryProvider.d.ts:4) | 3 código | código-fonte | — | contexto | fraca | — |
| 23 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/initFederation/ShellThemeSelectorProvider.d.ts:16) | 3 código | código-fonte | — | contexto | fraca | — |
| 24 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/initFederation/UIListProvider.d.ts:24) | 3 código | código-fonte | — | contexto | fraca | — |
| 25 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:32) | 3 código | código-fonte | — | contexto | fraca | — |
| 26 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:33) | 3 código | código-fonte | — | contexto | fraca | — |
| 27 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/NavBar.d.ts:6) | 3 código | código-fonte | — | contexto | fraca | — |
| 28 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/NavBar.d.ts:20) | 3 código | código-fonte | — | contexto | fraca | — |
| 29 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/NavbarUpdaterComponents.d.ts:1) | 3 código | código-fonte | — | contexto | fraca | — |
| 30 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/NotificationCenter.d.ts:1) | 3 código | código-fonte | — | contexto | fraca | — |
| 31 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/SleepingNotificationBell.d.ts:1) | 3 código | código-fonte | — | contexto | fraca | — |
| 32 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/index.d.ts:6) | 3 código | código-fonte | — | contexto | fraca | — |
| 33 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/lang.d.ts:13) | 3 código | código-fonte | — | contexto | fraca | — |
| 34 | 3.4.4 (shell-ui/rspack.config.ts:140) | 3 código | configuração | module-federation | tecnológica | fraca | — |
| 35 | 3.4.4 (shell-ui/rspack.config.ts:141) | 3 código | configuração | module-federation | tecnológica | fraca | — |
| 36 | 3.4.4 (shell-ui/rspack.config.ts:142) | 3 código | configuração | module-federation | tecnológica | fraca | — |
| 37 | 3.4.4 (shell-ui/src/FederatedApp.tsx:19) | 3 código | código-fonte | — | contexto | fraca | — |
| 38 | 3.4.4 (shell-ui/src/FederatedApp.tsx:20) | 3 código | código-fonte | — | contexto | fraca | — |
| 39 | 3.4.4 (shell-ui/src/FederatedApp.tsx:21) | 3 código | código-fonte | — | contexto | fraca | — |
| 40 | 3.4.4 (shell-ui/src/FederatedApp.tsx:22) | 3 código | código-fonte | — | contexto | fraca | — |
| 41 | 3.4.4 (shell-ui/src/FederatedApp.tsx:23) | 3 código | código-fonte | — | contexto | fraca | — |
| 42 | 3.4.4 (shell-ui/src/auth/AuthConfigProvider.tsx:3) | 3 código | código-fonte | — | contexto | fraca | — |
| 43 | 3.4.4 (shell-ui/src/auth/AuthProvider.spec.tsx:84) | 3 código | código-fonte | — | contexto | fraca | — |
| 44 | 3.4.4 (shell-ui/src/auth/AuthProvider.tsx:6) | 3 código | código-fonte | — | contexto | fraca | — |
| 45 | 3.4.4 (shell-ui/src/auth/AuthProvider.tsx:7) | 3 código | código-fonte | — | contexto | fraca | — |
| 46 | 3.4.4 (shell-ui/src/guardian/GuardianContext.tsx:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 47 | 3.4.4 (shell-ui/src/guardian/GuardianDrawer.tsx:1) | 3 código | código-fonte | — | contexto | fraca | — |
| 48 | 3.4.4 (shell-ui/src/hooks/useShellHooks.ts:27) | 3 código | código-fonte | — | contexto | fraca | — |
| 49 | 3.4.4 (shell-ui/src/hooks/useShellHooks.ts:28) | 3 código | código-fonte | — | contexto | fraca | — |
| 50 | 3.4.4 (shell-ui/src/hooks/useShellHooks.ts:29) | 3 código | código-fonte | — | contexto | fraca | — |
| 51 | 3.4.4 (shell-ui/src/hooks/useShellHooks.ts:30) | 3 código | código-fonte | — | contexto | fraca | — |
| 52 | 3.4.4 (shell-ui/src/mcp/MCPRegistrar.test.tsx:6) | 3 código | código-fonte | — | contexto | fraca | — |
| 53 | 3.4.4 (shell-ui/src/mcp/MCPRegistrar.tsx:16) | 3 código | código-fonte | — | contexto | fraca | — |
| 54 | 3.4.4 (shell-ui/src/mcp/MCPRegistrar.tsx:17) | 3 código | código-fonte | — | contexto | fraca | — |
| 55 | 3.4.4 (shell-ui/src/navbar/InstanceName.spec.tsx:10) | 3 código | código-fonte | — | contexto | fraca | — |
| 56 | 3.4.4 (shell-ui/src/navbar/InstanceName.spec.tsx:14) | 3 código | código-fonte | — | contexto | fraca | — |
| 57 | 3.4.4 (shell-ui/src/navbar/InstanceName.spec.tsx:37) | 3 código | código-fonte | — | contexto | fraca | — |
| 58 | 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:8) | 3 código | código-fonte | — | contexto | fraca | — |
| 59 | 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:9) | 3 código | código-fonte | — | contexto | fraca | — |
| 60 | 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:10) | 3 código | código-fonte | — | contexto | fraca | — |
| 61 | 3.4.4 (shell-ui/src/navbar/NavBar.tsx:22) | 3 código | código-fonte | — | contexto | fraca | — |
| 62 | 3.4.4 (shell-ui/src/navbar/NavBar.tsx:23) | 3 código | código-fonte | — | contexto | fraca | — |
| 63 | 3.4.4 (shell-ui/src/navbar/NavBar.tsx:24) | 3 código | código-fonte | — | contexto | fraca | — |
| 64 | 3.4.4 (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:7) | 3 código | código-fonte | — | contexto | fraca | — |
| 65 | 3.4.4 (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:8) | 3 código | código-fonte | — | contexto | fraca | — |
| 66 | 3.4.4 (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:9) | 3 código | código-fonte | — | contexto | fraca | — |
| 67 | 3.4.4 (shell-ui/src/navbar/NotificationCenter.spec.tsx:9) | 3 código | código-fonte | — | contexto | fraca | — |
| 68 | 3.4.4 (shell-ui/src/navbar/NotificationCenter.tsx:12) | 3 código | código-fonte | — | contexto | fraca | — |
| 69 | 3.4.4 (shell-ui/src/navbar/auth/permissionUtils.ts:4) | 3 código | código-fonte | — | contexto | fraca | — |
| 70 | 3.4.4 (shell-ui/src/navbar/index.spec.tsx:15) | 3 código | código-fonte | — | contexto | fraca | — |
| 71 | 3.4.4 (shell-ui/src/navbar/index.spec.tsx:16) | 3 código | código-fonte | — | contexto | fraca | — |
| 72 | 3.4.4 (shell-ui/src/navbar/index.spec.tsx:17) | 3 código | código-fonte | — | contexto | fraca | — |
| 73 | 3.4.4 (shell-ui/src/navbar/index.tsx:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 74 | 3.4.4 (shell-ui/src/navbar/index.tsx:3) | 3 código | código-fonte | — | contexto | fraca | — |
| 75 | 3.4.4 (shell-ui/src/navbar/navbarHooks.ts:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 76 | 3.4.4 (shell-ui/src/navbar/navbarHooks.ts:3) | 3 código | código-fonte | — | contexto | fraca | — |
| 77 | 3.4.4 (shell-ui/src/setupTests.ts:83) | 3 código | código-fonte | — | contexto | fraca | — |
| 78 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/auth/AuthConfigProvider.d.ts:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 79 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:6) | 3 código | código-fonte | — | contexto | fraca | — |
| 80 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:7) | 3 código | código-fonte | — | contexto | fraca | — |
| 81 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:8) | 3 código | código-fonte | — | contexto | fraca | — |
| 82 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:9) | 3 código | código-fonte | — | contexto | fraca | — |
| 83 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 84 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:11) | 3 código | código-fonte | — | contexto | fraca | — |
| 85 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/NavBar.d.ts:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 86 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/auth/permissionUtils.d.ts:3) | 3 código | código-fonte | — | contexto | fraca | — |
| 87 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/navbarHooks.d.ts:1) | 3 código | código-fonte | — | contexto | fraca | — |
| 88 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/navbarHooks.d.ts:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 89 | 3.4.4 (ui/@mf-types/shell/moduleFederation/ConfigurationProvider.d.ts:1) | 3 código | código-fonte | — | contexto | fraca | — |
| 90 | 3.4.4 (ui/@mf-types/shell/moduleFederation/ConfigurationProvider.d.ts:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 91 | 3.4.4 (ui/@mf-types/shell/moduleFederation/ShellConfigurationProvider.d.ts:1) | 3 código | código-fonte | — | contexto | fraca | — |
| 92 | 3.4.4 (ui/@mf-types/shell/moduleFederation/ShellConfigurationProvider.d.ts:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 93 | 3.4.4 (ui/@mf-types/shell/moduleFederation/UIListProvider.d.ts:1) | 3 código | código-fonte | — | contexto | fraca | — |
| 94 | 3.4.4 (ui/@mf-types/shell/moduleFederation/UIListProvider.d.ts:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 95 | 3.4.4 (shell-ui/src/guardian/GuardianDrawer.tsx:37) | 3 código | código-fonte | iframe | contexto | fraca | — |
| 96 | 3.4.4 (shell-ui/src/guardian/guardianPostMessageHooks.ts:38) | 3 código | código-fonte | — | contexto | fraca | — |
| 97 | 3.4.4 (shell-ui/src/guardian/guardianPostMessageHooks.ts:63) | 3 código | código-fonte | — | contexto | fraca | — |
| 98 | 3.4.4 (shell-ui/src/navbar/__TESTS__/testMultipleHooks.tsx:92) | 3 código | código-fonte | — | contexto | fraca | — |
| 99 | 3.4.4 (shell-ui/src/navbar/__TESTS__/testMultipleHooks.tsx:97) | 3 código | código-fonte | — | contexto | fraca | — |
| 100 | 3.4.4 (shell-ui/src/navbar/lang.tsx:49) | 3 código | código-fonte | — | contexto | fraca | — |
| 101 | 3.4.4 (shell-ui/src/initFederation/UIListProvider.tsx:70) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #110 |
| 102 | 3.4.4 (shell-ui/src/FederatedApp.tsx:85) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #110 |
| 103 | 3.4.4 (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #110 |
| 104 | 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:161) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 105 | 3.4.4 (shell-ui/src/mcp/MCPRegistrar.tsx:201) | 3 código | código-fonte | module-federation | tecnológica | ambígua | implementa #111 |
| 106 | 3.4.4 (ui/src/containers/Layout.tsx:251) | 3 código | código-fonte | module-federation | arquitetural | ambígua | implementa #112 |
| 107 | 3.4.3 (shell-ui) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 108 | 3.4.3 (tools/crd-client-generator-js) | 4 estrutura | diretório | — | contexto | fraca | — |
| 109 | 3.4.3 (ui) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 110 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #107; liga #109 |
| 111 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | ambígua | liga #107 |
| 112 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | ambígua | liga #109 |
| 113 | 3.4.5 #4 | 5 composição | configuração | module-federation | arquitetural | moderada | liga #109; liga #107 |
| 114 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #107 |
| 115 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #109 |
| 116 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #114 |
| 117 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #114 |
| 118 | 3.4.7 #3 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #107; corrobora #1; corrobora #3 |
| 119 | 3.4.7 #4 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #114 |
| 120 | 3.4.7 #5 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #115 |
| 121 | 3.4.7 #6 | 7 documentação | comentário | — | arquitetural | fraca | corrobora buildchain/buildchain/versions.py:64-67 |
| 122 | 3.4.7 #7 | 7 documentação | documentação | module-federation | tecnológica | fraca | contradiz #5; contradiz #6 |
| 123 | 3.4.7 #8 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #5; corrobora #6 |
| 124 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #110 |
| 125 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #110 |
| 126 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | contradiz shell-ui/src/hooks/useShellHooks.ts:70-82 |
| 127 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | contradiz shell-ui/src/navbar/events.ts:1-4; contradiz shell-ui/src/navbar/library.ts:5-16 |
| 128 | 3.4.7 #13 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora #5 |
| 129 | 3.4.7 #14 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #103; corrobora ui/src/components/AlertNavbarUpdaterComponent.tsx:160 |
| 130 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | contradiz ui/package.json:38 |
| 131 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #114; corrobora em parte #113 |
| 132 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #109 |
| 133 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #46; explica #47; explica #95; explica #96; explica #97 |
| 134 | 3.4.8 #3 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #124; explica #126; explica #127; explica #100 |
| 135 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #104 |
| 136 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #105; explica #111 |
| 137 | 3.4.8 #6 | 8 histórico | histórico | — | arquitetural | fraca | explica #106; explica #112 |
| 138 | 3.4.8 #7 | 8 histórico | histórico | — | arquitetural | fraca | explica #114 |
| 139 | 3.4.8 #8 | 8 histórico | histórico | — | tecnológica | fraca | explica #122 |
| 140 | 3.4.8 #9 | 8 histórico | histórico | — | arquitetural | fraca | explica #130; explica #131 |

## Resumo

Observações: 140. Dimensões (tecnologia: 4, configuração: 9, código: 93, estrutura: 3, composição: 4, build-deploy: 2, documentação: 16, histórico: 9). Força (forte: 7, moderada: 10, fraca: 118, ambígua: 5). Evidência (tecnológica: 18, arquitetural: 36, contexto: 86).
