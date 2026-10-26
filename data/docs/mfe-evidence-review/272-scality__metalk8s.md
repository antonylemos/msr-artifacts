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

## Repository overview

Shell discovers deployed UIs, mounting metalk8s-ui remote views through Module Federation. Chain combines four dependency declarations (#1–#4), federation/discovery configurations (#5–#13), generic discovery/loading code (#101–#103) and active shell-ui → ui relationship (#110). Ui contract exposes ./FederableApp and ./AlertsNavbarUpdater; operator links metalk8s-ui to shell-ui-cp. Shell does not fix remote name in loading call: target comes from configurations.

Structure confirms shell-ui, excluding client generation tool (#107, #108). For ui structural Undetermined retained: own build/exposed module but empty entry without standalone startup (#109). Builds separate; shell has own image and copy in metalk8s-ui image, therefore deployment remains Undetermined. Ui has joint deployment in image; versions follow product (#114, #115).

Generated types, local imports, mining tests/stubs do not demonstrate remote loading. Guardian/language event inactive; instance-name adapter also disconnected (#104). mcpTools and vm-management-ui remain undetermined regarding target/activity (#105, #106, #111, #112). Ui → shell-ui link only in development configuration without identified runtime consumption (#113).

16 documentary claims weak alone. Five contradicted, one partially corroborated, ten corroborated; conflicts include legacy navbar, core-ui singleton and start command. Nine historical points clarify evolution without changing final 3.4 values: empty entry, retained disabled features, recent mechanisms without local target, coexisting deployment/documentation stages (#132–#140). History lacks old-version contents at several points; messages/dates do not replace snapshot evidence.

## Observations

### 1. shell-ui/package.json:52

**Observation:** Manifest declares `@scality/module-federation` in `dependencies`, version `1.6.1`.

**Interpretation:** Declares Module Federation; configuration/usage have own observations, declaration alone links no units.

### 2. shell-ui/package.json:20

**Observation:** Manifest declares `@module-federation/enhanced` in `devDependencies`, version `^0.21.6`.

**Interpretation:** Declares Module Federation; configuration/usage have own observations, declaration alone links no units.

### 3. ui/package.json:11

**Observation:** Manifest declares `@scality/module-federation` in `dependencies`, version `1.6.1`.

**Interpretation:** Declares Module Federation; configuration/usage have own observations, declaration alone links no units.

### 4. ui/package.json:75

**Observation:** Manifest declares `@module-federation/enhanced` in `devDependencies`, version `^0.21.6`.

**Interpretation:** Declares Module Federation; configuration/usage have own observations, declaration alone links no units.

### 5. shell-ui/rspack.config.ts:130-208

**Observation:** ModuleFederationPlugin declares name shell, remoteEntry.js, exposes App, lang, authentication/alert providers, hooks and configuration providers. Shared includes dependencies/eager singletons; @mcp-b/* filtered.

**Interpretation:** Configures federation and shell-exported API without declaring remotes.

### 6. ui/rspack.config.ts:118-151; ui/rspack.config.ts:171-206

**Observation:** ModuleFederationPlugin declares name metalk8s, versioned remoteEntry, five exposes and singleton shared. Remotes declares shell@http://localhost:8084/shell/mf-manifest.json only with !isProduction. MicroAppRuntimeConfigurationPlugin generates metalk8s-ui configuration.

**Interpretation:** Configures remote, linking ui to shell in development; does not demonstrate production runtime remote consumption.

### 7. salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:15-50

**Observation:** ScalityUI manifest shell-ui-cp uses shell-ui image, declaring navbar views platform/alerts of kind metalk8s-ui.

**Interpretation:** Registers control-plane shell, connecting navigation to unit metalk8s-ui.

### 8. salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:15-25

**Observation:** ScalityUIComponent metalk8s-ui declares image metalk8s-ui and mountPath /usr/share/nginx/html/.well-known.

**Interpretation:** Registers remote application in operator without independently declaring another frontend link.

### 9. shell-ui/public/config.json:2-15

**Observation:** Navbar lists platform/alerts views of metalk8s-ui; discoveryUrl points to /shell/deployed-ui-apps.json.

**Interpretation:** Shell selects another unit views, declaring application discovery location.

### 10. shell-ui/public/deployed-ui-apps.json:2-8

**Observation:** List contains kind metalk8s-ui, name metalk8s.eu-west-1, version local-dev and url http://localhost:3000.

**Interpretation:** Registers target resolved by shell during UI discovery.

### 11. ui/public/.well-known/micro-app-configuration:1-49

**Observation:** MicroAppConfiguration of metalk8s-ui declares remoteEntryPath /mf-manifest.json, platform/alerts views with ./FederableApp in scope metalk8s, hook ./platformLibrary, navbar updater ./AlertsNavbarUpdater and publicPath /metalk8s.

**Interpretation:** Publishes unit contract for composition mechanism without naming another target unit.

### 12. salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:52-74

**Observation:** ScalityUIComponentExposer metalk8s-ui-exposer declares scalityUI shell-ui-cp, scalityUIComponent metalk8s-ui and appHistoryBasePath /platform.

**Interpretation:** Links shell/remote records in UI operator.

### 13. salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:77-112

**Observation:** ScalityUI shell-ui-wp uses shell-ui image, listing platform/alerts of kind metalk8s-ui in navbar.

**Interpretation:** Registers workload-plane shell with named frontend navigation targets.

### 14. ui/@mf-types/shell/compiled-types/src/FederatedApp.d.ts:12

**Observation:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 15. ui/@mf-types/shell/compiled-types/src/FederatedApp.d.ts:13

**Observation:** `export default function App(): import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 16. ui/@mf-types/shell/compiled-types/src/alerts/AlertProvider.d.ts:12

**Observation:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 17. ui/@mf-types/shell/compiled-types/src/auth/AuthConfigProvider.d.ts:9

**Observation:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 18. ui/@mf-types/shell/compiled-types/src/auth/AuthProvider.d.ts:5

**Observation:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 19. ui/@mf-types/shell/compiled-types/src/auth/FirstTimeLoginProvider.d.ts:7

**Observation:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 20. ui/@mf-types/shell/compiled-types/src/initFederation/ConfigurationProviders.d.ts:124

**Observation:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 21. ui/@mf-types/shell/compiled-types/src/initFederation/ShellConfigProvider.d.ts:54

**Observation:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 22. ui/@mf-types/shell/compiled-types/src/initFederation/ShellHistoryProvider.d.ts:4

**Observation:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 23. ui/@mf-types/shell/compiled-types/src/initFederation/ShellThemeSelectorProvider.d.ts:16

**Observation:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 24. ui/@mf-types/shell/compiled-types/src/initFederation/UIListProvider.d.ts:24

**Observation:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 25. ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:32

**Observation:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 26. ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:33

**Observation:** `export declare const InstanceName: () => import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 27. ui/@mf-types/shell/compiled-types/src/navbar/NavBar.d.ts:6

**Observation:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 28. ui/@mf-types/shell/compiled-types/src/navbar/NavBar.d.ts:20

**Observation:** `}) => import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 29. ui/@mf-types/shell/compiled-types/src/navbar/NavbarUpdaterComponents.d.ts:1

**Observation:** `export declare const NavbarUpdaterComponents: () => import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 30. ui/@mf-types/shell/compiled-types/src/navbar/NotificationCenter.d.ts:1

**Observation:** `declare const NotificationCenter: () => import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 31. ui/@mf-types/shell/compiled-types/src/navbar/SleepingNotificationBell.d.ts:1

**Observation:** `export declare const SleepingNotificationBell: () => import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 32. ui/@mf-types/shell/compiled-types/src/navbar/index.d.ts:6

**Observation:** `export declare const SolutionsNavbar: ({ children }: SolutionsNavbarProps) => import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 33. ui/@mf-types/shell/compiled-types/src/navbar/lang.d.ts:13

**Observation:** `}): import("react/jsx-runtime").JSX.Element;`.

**Interpretation:** `import("react/jsx-runtime")` in type position in `.d.ts` declaration generated from remote `shell` types (`ui/@mf-types/`); not executed or loading runtime module

### 34. shell-ui/rspack.config.ts:140

**Observation:** `'./moduleFederation/ConfigurationProvider': './src/initFederation/ConfigurationProviders.tsx',`.

**Interpretation:** Line configures local module exposure in build; not runtime remote loading call.

### 35. shell-ui/rspack.config.ts:141

**Observation:** `'./moduleFederation/ShellConfigurationProvider': './src/initFederation/ShellConfigProvider.tsx',`.

**Interpretation:** Line configures local module exposure in build; not runtime remote loading call.

### 36. shell-ui/rspack.config.ts:142

**Observation:** `'./moduleFederation/UIListProvider': './src/initFederation/UIListProvider.tsx',`.

**Interpretation:** Line configures local module exposure in build; not runtime remote loading call.

### 37. shell-ui/src/FederatedApp.tsx:19

**Observation:** `import { ConfigurationProvider, useConfigRetriever, useFederatedRoutes } from './initFederation/ConfigurationProviders';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ConfigurationProviders.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API; enabled usages (`ConfigurationProvider`, `useFederatedRoutes`) appear in manual rows shell-ui/src/initFederation/UIListProvider.tsx:70 and shell-ui/src/FederatedApp.tsx:85

### 38. shell-ui/src/FederatedApp.tsx:20

**Observation:** `import { ShellConfigProvider, useShellConfig } from './initFederation/ShellConfigProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellConfigProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 39. shell-ui/src/FederatedApp.tsx:21

**Observation:** `import { ShellHistoryProvider } from './initFederation/ShellHistoryProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellHistoryProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 40. shell-ui/src/FederatedApp.tsx:22

**Observation:** `import { ShellThemeSelectorProvider } from './initFederation/ShellThemeSelectorProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellThemeSelectorProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 41. shell-ui/src/FederatedApp.tsx:23

**Observation:** `import { UIListProvider } from './initFederation/UIListProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/UIListProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API; enabled usage (`UIListProvider`) appears in manual row shell-ui/src/initFederation/UIListProvider.tsx:70

### 42. shell-ui/src/auth/AuthConfigProvider.tsx:3

**Observation:** `import type { OIDCConfig, OAuth2ProxyConfig } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Type import of local file shell-ui/src/initFederation/ConfigurationProviders.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 43. shell-ui/src/auth/AuthProvider.spec.tsx:84

**Observation:** `'../initFederation/ShellConfigProvider',`.

**Interpretation:** Test file; reference to local file `initFederation/ShellConfigProvider` (import or `jest.mock`); pattern matched folder name, rather than API

### 44. shell-ui/src/auth/AuthProvider.tsx:6

**Observation:** `import type { OAuth2ProxyConfig, OIDCConfig } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Type import of local file shell-ui/src/initFederation/ConfigurationProviders.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 45. shell-ui/src/auth/AuthProvider.tsx:7

**Observation:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellConfigProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 46. shell-ui/src/guardian/GuardianContext.tsx:2; shell-ui/public/config.json:18; shell-ui/src/FederatedApp.tsx:185

**Observation:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretation:** Construct serves external Guardian assistant disabled by snapshot configuration; demonstrates no active frontend unit composition.

### 47. shell-ui/src/guardian/GuardianDrawer.tsx:1; shell-ui/public/config.json:18; shell-ui/src/FederatedApp.tsx:185

**Observation:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretation:** Construct serves external Guardian assistant disabled by snapshot configuration; demonstrates no active frontend unit composition.

### 48. shell-ui/src/hooks/useShellHooks.ts:27

**Observation:** `} from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ConfigurationProviders.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 49. shell-ui/src/hooks/useShellHooks.ts:28

**Observation:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellConfigProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 50. shell-ui/src/hooks/useShellHooks.ts:29

**Observation:** `import { useShellThemeSelector } from '../initFederation/ShellThemeSelectorProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellThemeSelectorProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 51. shell-ui/src/hooks/useShellHooks.ts:30

**Observation:** `import { useDeployedApps } from '../initFederation/UIListProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/UIListProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 52. shell-ui/src/mcp/MCPRegistrar.test.tsx:6

**Observation:** `import type { FederatedModuleInfo } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Test file; reference to local file `initFederation/ConfigurationProviders` (import or `jest.mock`); pattern matched folder name, rather than API

### 53. shell-ui/src/mcp/MCPRegistrar.tsx:16

**Observation:** `} from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ConfigurationProviders.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 54. shell-ui/src/mcp/MCPRegistrar.tsx:17

**Observation:** `import { useDeployedApps } from '../initFederation/UIListProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/UIListProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 55. shell-ui/src/navbar/InstanceName.spec.tsx:10

**Observation:** `import type { RuntimeWebFinger } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Test file; reference to local file `initFederation/ConfigurationProviders` (import or `jest.mock`); pattern matched folder name, rather than API

### 56. shell-ui/src/navbar/InstanceName.spec.tsx:14

**Observation:** `jest.mock('../initFederation/ConfigurationProviders', () => ({`.

**Interpretation:** Test file; reference to local file `initFederation/ConfigurationProviders` (import or `jest.mock`); pattern matched folder name, rather than API

### 57. shell-ui/src/navbar/InstanceName.spec.tsx:37

**Observation:** `jest.mock('../initFederation/UIListProvider', () => ({`.

**Interpretation:** Test file; reference to local file `initFederation/UIListProvider` (import or `jest.mock`); pattern matched folder name, rather than API

### 58. shell-ui/src/navbar/InstanceName.tsx:8

**Observation:** `import { type RuntimeWebFinger, useConfigRetriever } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ConfigurationProviders.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 59. shell-ui/src/navbar/InstanceName.tsx:9

**Observation:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellConfigProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 60. shell-ui/src/navbar/InstanceName.tsx:10

**Observation:** `import { useDeployedApps } from '../initFederation/UIListProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/UIListProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 61. shell-ui/src/navbar/NavBar.tsx:22

**Observation:** `} from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ConfigurationProviders.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 62. shell-ui/src/navbar/NavBar.tsx:23

**Observation:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellConfigProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 63. shell-ui/src/navbar/NavBar.tsx:24

**Observation:** `import { useShellThemeSelector } from '../initFederation/ShellThemeSelectorProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellThemeSelectorProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 64. shell-ui/src/navbar/NavbarUpdaterComponents.tsx:7

**Observation:** `import type { FederatedModuleInfo } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Type import of local file shell-ui/src/initFederation/ConfigurationProviders.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 65. shell-ui/src/navbar/NavbarUpdaterComponents.tsx:8

**Observation:** `import { useConfigRetriever } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ConfigurationProviders.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 66. shell-ui/src/navbar/NavbarUpdaterComponents.tsx:9

**Observation:** `import { useDeployedApps } from '../initFederation/UIListProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/UIListProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 67. shell-ui/src/navbar/NotificationCenter.spec.tsx:9

**Observation:** `import { ShellHistoryProvider } from '../initFederation/ShellHistoryProvider';`.

**Interpretation:** Test file; reference to local file `initFederation/ShellHistoryProvider` (import or `jest.mock`); pattern matched folder name, rather than API

### 68. shell-ui/src/navbar/NotificationCenter.tsx:12

**Observation:** `import { useShellHistory } from '../initFederation/ShellHistoryProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellHistoryProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 69. shell-ui/src/navbar/auth/permissionUtils.ts:4

**Observation:** `import { UserGroupsMapping } from '../../initFederation/ShellConfigProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellConfigProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 70. shell-ui/src/navbar/index.spec.tsx:15

**Observation:** `import { ShellConfigProvider } from '../initFederation/ShellConfigProvider';`.

**Interpretation:** Test file; reference to local file `initFederation/ShellConfigProvider` (import or `jest.mock`); pattern matched folder name, rather than API

### 71. shell-ui/src/navbar/index.spec.tsx:16

**Observation:** `import { ShellHistoryProvider } from '../initFederation/ShellHistoryProvider';`.

**Interpretation:** Test file; reference to local file `initFederation/ShellHistoryProvider` (import or `jest.mock`); pattern matched folder name, rather than API

### 72. shell-ui/src/navbar/index.spec.tsx:17

**Observation:** `import { ShellThemeSelectorProvider } from '../initFederation/ShellThemeSelectorProvider';`.

**Interpretation:** Test file; reference to local file `initFederation/ShellThemeSelectorProvider` (import or `jest.mock`); pattern matched folder name, rather than API

### 73. shell-ui/src/navbar/index.tsx:2

**Observation:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellConfigProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 74. shell-ui/src/navbar/index.tsx:3

**Observation:** `import { useShellThemeSelector } from '../initFederation/ShellThemeSelectorProvider';`.

**Interpretation:** Static import of local file shell-ui/src/initFederation/ShellThemeSelectorProvider.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 75. shell-ui/src/navbar/navbarHooks.ts:2

**Observation:** `import type { ViewDefinition } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Type import of local file shell-ui/src/initFederation/ConfigurationProviders.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 76. shell-ui/src/navbar/navbarHooks.ts:3

**Observation:** `import '../initFederation/ConfigurationProviders';`.

**Interpretation:** Side-effect import of local file shell-ui/src/initFederation/ConfigurationProviders.tsx, belonging to own unit; pattern matched folder name `initFederation`, rather than API

### 77. shell-ui/src/setupTests.ts:83

**Observation:** `registerRemotes: () => {},`.

**Interpretation:** `registerRemotes: () => {}` stub in mock of `@module-federation/enhanced/runtime` in test setup (shell-ui/src/setupTests.ts); does not run in build

### 78. ui/@mf-types/shell/compiled-types/src/auth/AuthConfigProvider.d.ts:2

**Observation:** `import type { OIDCConfig, OAuth2ProxyConfig } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 79. ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:6

**Observation:** `import { useConfig, useConfigRetriever, useDiscoveredViews, useLinkOpener } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 80. ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:7

**Observation:** `import { useShellConfig } from '../initFederation/ShellConfigProvider';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 81. ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:8

**Observation:** `import { useShellThemeSelector } from '../initFederation/ShellThemeSelectorProvider';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 82. ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:9

**Observation:** `import { useDeployedApps } from '../initFederation/UIListProvider';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 83. ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:2

**Observation:** `import { type RuntimeWebFinger } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 84. ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:11

**Observation:** `microAppConfiguration: import("../initFederation/ConfigurationProviders").EnrichedBuildtimeWebFinger;`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 85. ui/@mf-types/shell/compiled-types/src/navbar/NavBar.d.ts:2

**Observation:** `import { ViewDefinition } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 86. ui/@mf-types/shell/compiled-types/src/navbar/auth/permissionUtils.d.ts:3

**Observation:** `import { UserGroupsMapping } from '../../initFederation/ShellConfigProvider';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 87. ui/@mf-types/shell/compiled-types/src/navbar/navbarHooks.d.ts:1

**Observation:** `import type { ViewDefinition } from '../initFederation/ConfigurationProviders';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 88. ui/@mf-types/shell/compiled-types/src/navbar/navbarHooks.d.ts:2

**Observation:** `import '../initFederation/ConfigurationProviders';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 89. ui/@mf-types/shell/moduleFederation/ConfigurationProvider.d.ts:1

**Observation:** `export * from './../compiled-types/src/initFederation/ConfigurationProviders';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 90. ui/@mf-types/shell/moduleFederation/ConfigurationProvider.d.ts:2

**Observation:** `export { default } from './../compiled-types/src/initFederation/ConfigurationProviders';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 91. ui/@mf-types/shell/moduleFederation/ShellConfigurationProvider.d.ts:1

**Observation:** `export * from './../compiled-types/src/initFederation/ShellConfigProvider';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 92. ui/@mf-types/shell/moduleFederation/ShellConfigurationProvider.d.ts:2

**Observation:** `export { default } from './../compiled-types/src/initFederation/ShellConfigProvider';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 93. ui/@mf-types/shell/moduleFederation/UIListProvider.d.ts:1

**Observation:** `export * from './../compiled-types/src/initFederation/UIListProvider';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 94. ui/@mf-types/shell/moduleFederation/UIListProvider.d.ts:2

**Observation:** `export { default } from './../compiled-types/src/initFederation/UIListProvider';`.

**Interpretation:** Type declaration `.d.ts` generated from remote `shell` in `ui/@mf-types/`; pattern matched shell folder name `initFederation` rather than API; not executed

### 95. shell-ui/src/guardian/GuardianDrawer.tsx:37; shell-ui/public/config.json:18; shell-ui/src/FederatedApp.tsx:185

**Observation:** `<iframe`.

**Interpretation:** Construct serves external Guardian assistant disabled by snapshot configuration; demonstrates no active frontend unit composition.

### 96. shell-ui/src/guardian/guardianPostMessageHooks.ts:38; shell-ui/public/config.json:18; shell-ui/src/FederatedApp.tsx:185

**Observation:** `iframeRef.current?.contentWindow?.postMessage(message, origin);`.

**Interpretation:** Construct serves external Guardian assistant disabled by snapshot configuration; demonstrates no active frontend unit composition.

### 97. shell-ui/src/guardian/guardianPostMessageHooks.ts:63; shell-ui/public/config.json:18; shell-ui/src/FederatedApp.tsx:185

**Observation:** `iframeRef.current?.contentWindow?.postMessage({ type: 'MCP_ACK', id }, origin);`.

**Interpretation:** Construct serves external Guardian assistant disabled by snapshot configuration; demonstrates no active frontend unit composition.

### 98. shell-ui/src/navbar/__TESTS__/testMultipleHooks.tsx:92

**Observation:** `const event = new CustomEvent(RENDER_HOOK_EVENT, {`.

**Interpretation:** Event `RENDER_HOOK_EVENT` from test utility (shell-ui/src/navbar/__TESTS__/testMultipleHooks.tsx:21, :43, :92-97); not inter-unit communication

### 99. shell-ui/src/navbar/__TESTS__/testMultipleHooks.tsx:97

**Observation:** `window.dispatchEvent(event);`.

**Interpretation:** Event `RENDER_HOOK_EVENT` from test utility (shell-ui/src/navbar/__TESTS__/testMultipleHooks.tsx:21, :43, :92-97); not inter-unit communication

### 100. shell-ui/src/navbar/lang.tsx:49; shell-ui/src/navbar/lang.tsx:47-52; shell-ui/src/FederatedApp.tsx:257

**Observation:** `new CustomEvent(LANGUAGE_CHANGED_EVENT, {`.

**Interpretation:** Event depends on prop absent in only recorded usage; inactive communication signal without active inter-unit link.

### 101. shell-ui/src/initFederation/UIListProvider.tsx:70; shell-ui/src/initFederation/ConfigurationProviders.tsx:395; shell-ui/public/config.json:15; shell-ui/public/deployed-ui-apps.json:2-8; ui/public/.well-known/micro-app-configuration:8-27

**Observation:** fetch(discoveryURL) reads/validates UI list; ConfigurationProvider retrieves .well-known/micro-app-configuration of each application.

**Interpretation:** Implements generic discovery of UIs to compose. Concrete target from configuration rather than unit name in call.

### 102. shell-ui/src/FederatedApp.tsx:85-92; shell-ui/src/FederatedApp.tsx:97-137; ui/rspack.config.ts:122; ui/src/FederableApp.tsx:120-122

**Observation:** FederatedComponent receives URL formed from app.url, remoteEntryPath and version, plus module, scope, app and props shellHooks/shellAlerts. InternalRouter transforms views to routes.

**Interpretation:** Implements remote-view mounting through discovery parameters and shell-hook delivery to UI; generic call names no target.

### 103. shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51-69; shell-ui/src/navbar/NavbarUpdaterComponents.tsx:22-37; ui/public/.well-known/micro-app-configuration:42-47; ui/rspack.config.ts:124

**Observation:** Shell iterates navbarUpdaterComponents from discovered configurations, passing module, scope, remote URL and notification functions to FederatedComponent.

**Interpretation:** Implements parameterized navbar updater loading without naming unit in call.

### 104. shell-ui/src/navbar/InstanceName.tsx:161; shell-ui/src/navbar/InstanceName.tsx:153-170; salt/metalk8s/addons/ui/config/metalk8s-shell-ui-config.yaml.j2:41; salt/metalk8s/addons/ui/config/workloadplane-shell-ui-config.yaml.j2:17; ui/public/.well-known/micro-app-configuration:1-49

**Observation:** ComponentWithFederatedImports receives instanceNameAdapter. Component returns empty without canChangeInstanceName; Salt configurations declare false and ui configuration no adapter.

**Interpretation:** Federated import mechanism inactive in snapshot configurations; supports no active composition relationship.

### 105. shell-ui/src/mcp/MCPRegistrar.tsx:201; shell-ui/src/mcp/MCPRegistrar.tsx:176-211; ui/public/.well-known/micro-app-configuration:1-49

**Observation:** Registrar reads spec.mcpTools, returns null without field, passing module information and remoteEntryUrl to ComponentWithFederatedImports. Ui configuration declares no mcpTools.

**Interpretation:** Mechanism implemented/mounted but snapshot identifies no UI declaring target. Usage by UI discovered in another environment and no loading in this environment both remain plausible.

### 106. ui/src/containers/Layout.tsx:251; ui/src/containers/Layout.tsx:100-103; ui/src/containers/Layout.tsx:246-262

**Observation:** Route virtual-machines/* renders FederatedComponent with vmView URL/data selected by kind vm-management-ui. Without vmView renders 404 page.

**Interpretation:** Declares nested composition with vm-management-ui but availability discovery-dependent. Snapshot allows both loading with target deployed and fallback 404 without it.

### 107. shell-ui/; shell-ui/rspack.config.ts:46; shell-ui/src/index.tsx:1-9; shell-ui/package.json:9

**Observation:** Directory has manifest, rspack configuration with entry ./src/index.tsx, React root creation and own build script.

**Interpretation:** Confirms frontend unit boundary with own startup/build.

### 108. tools/crd-client-generator-js/; tools/crd-client-generator-js/package.json:8

**Observation:** Package executes ts-node src/index.ts as CRD client-generation tool.

**Interpretation:** Supporting Node tool without frontend unit.

### 109. ui/; ui/rspack.config.ts:32-34; ui/rspack.config.ts:118-127; ui/src/index.ts (0 bytes); ui/src/FederableApp.tsx:120-122; ui/package.json:39

**Observation:** Directory has own rspack build, empty entry ./src/index.ts and exports FederableApp through exposes without own rendering startup.

**Interpretation:** Structural review remains Undetermined: remote build boundary visible but standalone startup not demonstrated. Self-starting unit and operation only when shell-mounted remain distinct readings for criterion.

### 110. shell-ui/src/FederatedApp.tsx:85-92; shell-ui/public/deployed-ui-apps.json:2-8; ui/public/.well-known/micro-app-configuration:1-49; ui/rspack.config.ts:118-127; salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:52-63

**Observation:** Shell discovers metalk8s-ui, resolves mf-manifest.json and mounts views ./FederableApp and updater ./AlertsNavbarUpdater in scope metalk8s. Exposer links metalk8s-ui to shell-ui-cp.

**Interpretation:** Active shell-ui → ui Module Federation relationship with target present in snapshot.

### 111. shell-ui/src/mcp/MCPRegistrar.tsx:176-211

**Observation:** Shell reads mcpTools from each UI configuration, conditioning federated import on field presence. No snapshot configuration declares it.

**Interpretation:** Undetermined shell-ui → mcpTools relationship: may be fulfilled by UI discovered elsewhere or remain without loadable target.

### 112. ui/src/containers/Layout.tsx:100-103; ui/src/containers/Layout.tsx:246-262

**Observation:** Ui searches vm-management-ui in discovered views, mounting module at virtual-machines/* with fallback 404 when absent.

**Interpretation:** Undetermined ui → vm-management-ui relationship: composition depends on UI whose presence/configuration not demonstrated in snapshot.

### 113. ui/rspack.config.ts:128-132; shell-ui/rspack.config.ts:131; shell-ui/rspack.config.ts:54

**Observation:** Ui declares shell@http://localhost:8084/shell/mf-manifest.json only outside production; shell-ui declares name shell. No runtime shell/... import in ui.

**Interpretation:** Ui → shell-ui relationship configured for development, Active No in 3.4.5; establishes no production composition.

### 114. shell-ui/package.json:9; shell-ui/Dockerfile:4-30; buildchain/buildchain/image.py:417-437; images/metalk8s-ui/Dockerfile:9-11; salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:15-32; salt/metalk8s/addons/shell-ui/deployed/ui-operator-cr.sls:77-94; .github/workflows/build-shell-ui.yaml:31-78; .github/workflows/publish.yaml:106-160; buildchain/buildchain/versions.py:257-266; .github/workflows/publish.yaml:71-76

**Observation:** Shell has own rspack script/nginx image, ScalityUI resources and CI publication of image/shell.tar. Same build also copied to metalk8s-ui image. Version follows product.

**Interpretation:** Separate build confirms unit boundary. Deployment remains Undetermined because two publication forms coexist; no own versioning.

### 115. ui/package.json:39; ui/Dockerfile:3-19; ui/entrypoint.sh:5-8; buildchain/buildchain/ui.py:48-64; buildchain/buildchain/ui.py:115-128; images/metalk8s-ui/Dockerfile:9-11; salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls:15-25; buildchain/buildchain/versions.py:257-266

**Observation:** Ui has own rspack script/build task. Metalk8s-ui image contains ui, docs/html and shell-ui, used by ScalityUIComponent. Version follows product.

**Interpretation:** Separate build but joint deployment with shell/documentation in same image; no own versioning. Does not resolve structural standalone-startup uncertainty.

### 116. .github/workflows/publish.yaml:42

**Observation:** Text states: "Retrieve Shell UI image from the build, load it and compute version".

**Interpretation:** Describes image retrieval/version calculation, corroborated by CI; does not imply independent version.

### 117. .github/workflows/publish.yaml:106

**Observation:** Text states: "Tag shell-ui image before upload to registry".

**Interpretation:** Describes shell image publication corroborated by workflow.

### 118. CLAUDE.md:6

**Observation:** Text states: "**TypeScript/React UI** (`ui/`, `shell-ui/`) using rspack, react-router v7, react-query, `@scality/core-ui`, `@scality/module-federation`".

**Interpretation:** Locates ui/shell-ui as React/rspack frontend group with federation library without resolving ui standalone startup.

### 119. buildchain/buildchain/shell_ui.py:3-10

**Observation:** Text states: "Tasks to build the Shell UI." (diagram `shell-UI` → `mkdir` → `build`).

**Interpretation:** Describes own shell build confirmed by tasks.

### 120. buildchain/buildchain/ui.py:3-10

**Observation:** Text states: "Tasks to build the MetalK8s UI." (diagram `UI` → `mkdir` → `UI build` → `UI configuration`).

**Interpretation:** Describes own ui build confirmed by tasks.

### 121. buildchain/buildchain/versions.py:63

**Observation:** Text states: "Get shell ui version from package.json".

**Interpretation:** Describes manifest version reading confirmed by code; does not claim version used to publish image.

### 122. shell-ui/README.md:6-11

**Observation:** Text states: "we have this configuration on module federation : ``` '@scality/core-ui': { singleton: true, } ```".

**Interpretation:** Claims core-ui singleton, contradicted by current configuration lacking option for library.

### 123. shell-ui/README.md:13-14

**Observation:** Text states: "We want to avoid to set the option `eager: true` because will load core-ui completely at the beginning".

**Interpretation:** Guidance against eager for core-ui corroborated by current shared.

### 124. shell-ui/README.md:19

**Observation:** Text states: "Common navbar that can be integrated in metalk8s solution UI".

**Interpretation:** Describes navbar embedded in solution UIs; snapshot shows reverse direction, shell composing ui, contradicting legacy mechanism.

### 125. shell-ui/README.md:21-23

**Observation:** Text states: "Authentication : token negociation, token renewal, claims provider / Theming : provide the selected theme to solution UIs / I18n : provide a language selector and expose selected language to solution UIs".

**Interpretation:** Describes authentication/theme/language supplied to UIs, confirmed by shell hooks/context.

### 126. shell-ui/README.md:58-65

**Observation:** Text states: "logOut(providerLogout: boolean): void - force logOut, might be called when an UI receive a 401 or 403 status code" / "getClaims(): Promise<Claims>" / "getIdToken(): Promise<string>" / "getLanguage()" / "getTheme()" / "getOptions()".

**Interpretation:** Describes legacy DOM element methods; snapshot uses hooks through props, contradicting contract.

### 127. shell-ui/README.md:67-72

**Observation:** Text states: "solutions--authenticated, payload: {token, claims: {...}} --- also called when the token is renewed" / "solutions--logged-out" / "solutions--theme-changed" / "solutions--language-changed".

**Interpretation:** Describes legacy events; names/active dispatches unconfirmed per source review.

### 128. shell-ui/rspack.config.ts:148

**Observation:** Text states: "@mcp-b/* are side-effect-only browser globals — must not be shared via MF".

**Interpretation:** Describes @mcp-b/* sharing exclusion; configuration filter confirms.

### 129. shell-ui/src/navbar/NavbarUpdaterComponents.tsx:66-67

**Observation:** Text states: "Headless updaters — they publish links/notifications and render nothing in place.".

**Interpretation:** Describes visually headless updater modules corroborated by shell loading and ui alert updater.

### 130. ui/README.md:29

**Observation:** Text states: "This will first start `<root>/shell-ui` in Docker container and expose it on port 8084 and then will start the Metalk8s UI in dev mode.".

**Interpretation:** Claims start launches shell in Docker, contradicted by current script only starting ui rspack serve.

### 131. ui/README.md:30-32

**Observation:** Text states: "you can alternatively install `<root>/shell-ui` dependencies via running `npm install` in that folder and then run `npm run build`. Then serve statically the content of the `<root>/shell-ui/build` folder on the port 8084.".

**Interpretation:** Static shell build/development address partially confirmed; sufficiency of described flow not demonstrated.

### 132. 50c231439 2023-02-27 (ui/src/index.ts); ae1de7bcc 2024-06-28 (ui/src/index.ts)

**Observation:** Review records index.ts creation during TypeScript migration in 2023 and change to empty object in ae1de7bcc alongside entry.tsx and index.html removal in 2024.

**Interpretation:** Clarifies empty entry origin as deliberate change, preserving snapshot structural Undetermined.

### 133. ddf833ad6 2026-04-08 (shell-ui/src/guardian/); 8522c6c98 2026-04-27 (shell-ui/src/guardian/GuardianDrawer.tsx); 8b8e67415 2026-05-05 (shell-ui/public/config.json; shell-ui/src/FederatedApp.tsx); 462b577fe 2026-06-10 (shell-ui/src/guardian/); 98052bf1b 2026-08-17 (shell-ui/src/guardian/)

**Observation:** Review records Guardian introduced April 2026, canUseGuardian key May and changes through August; old configuration contents unavailable.

**Interpretation:** Clarifies disabled feature recent/maintained; snapshot No values unchanged.

### 134. f28782afa 2021-02-24 (shell-ui/README.md); 59da5f6ff 2021-04-07 (shell-ui/src/navbar/events.js; shell-ui/src/navbar/library.js); a33ef1c93 2021-04-14 (shell-ui/src/platform/library.js); 938cc576e 2021-05-26 (shell-ui/webpack.common.js); eeeca883a 2021-06-04 (shell-ui/); 30709cb48 2023-02-27 (shell-ui/src/navbar/events.ts; shell-ui/src/navbar/library.ts); e109eb9ef 2023-06-13 (shell-ui/README.md)

**Observation:** Review locates legacy README, events and library in February–April 2021 before shell migration to Module Federation in May–June; after TypeScript files mainly receive general changes.

**Interpretation:** Explains contradicted claims/inactive event as stages predating current composition.

### 135. 26151e240 2024-02-15 (shell-ui/src/navbar/InstanceName.tsx); 1372479a8 2024-09-16 (salt/metalk8s/addons/ui/config/metalk8s-shell-ui-config.yaml.j2); 85bcf59be 2026-05-06 (shell-ui/src/navbar/InstanceName.tsx); 4684c2a43 2026-08-11 (shell-ui/src/navbar/InstanceName.tsx)

**Observation:** Review records InstanceName/configuration introduction in 2024 with component maintenance through August 2026; does not show whether flag ever true.

**Interpretation:** Explains inactive mechanism as maintained feature; demonstrates no snapshot-enabling configuration.

### 136. 627a3559f 2025-09-09 (ui/public/.well-known/micro-app-configuration); baba81932 2026-03-27 (shell-ui/src/mcp/MCPRegistrar.tsx); 07b8b7053 2026-10-06 (shell-ui/src/mcp/MCPRegistrar.tsx)

**Observation:** Review records MCPRegistrar since March 2026, changes through October; ui micro-app-configuration unchanged since September 2025, before mcpTools introduction.

**Interpretation:** Explains recent mechanism never declared by local ui; snapshot composition target remains undetermined.

### 137. 556f0c84f 2026-09-17 (ui/src/containers/Layout.tsx)

**Observation:** Message of 556f0c84f announces virtual machine tab, describing micro-app deployed only in ARTESCA+, presence used as route condition.

**Interpretation:** Explains intended other-product composition through commit message; without target code snapshot relationship remains Undetermined.

### 138. 2d6df3d31 2021-02-24 (images/metalk8s-ui/Dockerfile; images/metalk8s-ui/conf/nginx.conf; buildchain/buildchain/shell_ui.py); 70dbd925d 2025-08-13 (salt/metalk8s/addons/shell-ui/deployed/); 65ea4b164 2025-08-13 (salt/metalk8s/addons/ui/deployed/ui-operator-cr.sls); 009ff435b 2025-10-13 (salt/metalk8s/addons/ui/deployed/); 410823fd7 2025-12-16 (images/metalk8s-ui/conf/nginx.conf); da28d2908 2026-07-16 (images/metalk8s-ui/Dockerfile)

**Observation:** Review records shell copy in metalk8s-ui image since 2021 and own ScalityUI deployment since August 2025; earlier copy not removed.

**Interpretation:** Explains two forms as coexisting different stages; does not resolve which used, preserving deployment Undetermined.

### 139. e109eb9ef 2023-06-13 (shell-ui/README.md); 5640809b6 2025-12-18 (shell-ui/rspack.config.ts; ui/rspack.config.ts); 3d610e75a 2026-01-14 (shell-ui/rspack.config.ts; ui/rspack.config.ts)

**Observation:** Shell README from June 2023; December 2025 messages announce return of core-ui singleton, January 2026 messages its removal in both configurations.

**Interpretation:** Explains documentary contradiction through later configuration change; historical contents not inspected.

### 140. e2fae4bcf 2023-06-28 (ui/README.md); e83045616 2024-07-03 (ui/webpack.dev.js; ui/webpack.common.js; ui/webpack.prod.js; ui/package.json); 136cf7844 2026-01-29 (shell-ui/rspack.config.ts; ui/rspack.config.ts; shell-ui/public/config.json; shell-ui/public/deployed-ui-apps.json)

**Observation:** Review locates ui README in June 2023 before webpack removal in July 2024 and development environment reorganization in January 2026.

**Interpretation:** Explains documentary divergence through README age without reconstructing unavailable old scripts.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (shell-ui/package.json:52) | 1 technology | manifest | module-federation | technological | weak | declares #5; declares #102; declares #103 |
| 2 | 3.4.2 (shell-ui/package.json:20) | 1 technology | manifest | module-federation | technological | weak | declares #5 |
| 3 | 3.4.2 (ui/package.json:11) | 1 technology | manifest | module-federation | technological | weak | declares #6; declares ui/src/FederableApp.tsx:120-122 |
| 4 | 3.4.2 (ui/package.json:75) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 5 | 3.4.2 (shell-ui/package.json:52; Evidence); 3.4.2 (shell-ui/package.json:20; Evidence); 3.4.3 (shell-ui; Markers); 3.4.4 (shell-ui/rspack.config.ts:140; File:line); 3.4.4 (shell-ui/rspack.config.ts:140; Observation); 3.4.4 (shell-ui/rspack.config.ts:141; File:line); 3.4.4 (shell-ui/rspack.config.ts:141; Observation); 3.4.4 (shell-ui/rspack.config.ts:142; File:line); 3.4.4 (shell-ui/rspack.config.ts:142; Observation); 3.4.5 (#4; Configuration); 3.4.7 (#7; Evidence); 3.4.7 (#8; Evidence); 3.4.7 (#13; Document); 3.4.7 (#13; Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #107 |
| 6 | 3.4.2 (ui/package.json:11; Evidence); 3.4.2 (ui/package.json:75; Evidence); 3.4.3 (ui; Markers); 3.4.3 (ui; Entry); 3.4.3 (ui; Build); 3.4.4 (shell-ui/src/FederatedApp.tsx:85; Observation); 3.4.4 (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51; Observation); 3.4.5 (#1; Configuration); 3.4.5 (#4; Configuration); 3.4.7 (#7; Evidence); 3.4.7 (#15; Evidence); 3.4.7 (#16; Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #113; configures #109 |
| 7 | 3.4.3 (shell-ui; Deploy); 3.4.5 (#1; Configuration); 3.4.6 (#1; Artifacts) | 2 configuration | deploy | module-federation | architectural | strong | configures #110 |
| 8 | 3.4.3 (ui; Deploy); 3.4.6 (#2; Artifacts) | 2 configuration | deploy | module-federation | architectural | moderate | configures #109 |
| 9 | 3.4.4 (shell-ui/src/initFederation/UIListProvider.tsx:70; Observation); 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:161; Observation); 3.4.5 (#1; Configuration) | 2 configuration | configuration | module-federation | architectural | strong | configures #110 |
| 10 | 3.4.4 (shell-ui/src/initFederation/UIListProvider.tsx:70; Observation); 3.4.4 (ui/src/containers/Layout.tsx:251; Observation); 3.4.5 (#1; Configuration) | 2 configuration | configuration | module-federation | architectural | strong | configures #110 |
| 11 | 3.4.4 (shell-ui/src/initFederation/UIListProvider.tsx:70; Observation); 3.4.4 (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51; Observation); 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:161; Observation); 3.4.5 (#1; Configuration) | 2 configuration | configuration | module-federation | technological | moderate | configures #110 |
| 12 | 3.4.5 (#1; Configuration) | 2 configuration | deploy | module-federation | architectural | strong | configures #110 |
| 13 | 3.4.6 (#1; Artifacts) | 2 configuration | deploy | module-federation | architectural | strong | configures #107 |
| 14 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/FederatedApp.d.ts:12) | 3 code | source code | — | context | weak | — |
| 15 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/FederatedApp.d.ts:13) | 3 code | source code | — | context | weak | — |
| 16 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/alerts/AlertProvider.d.ts:12) | 3 code | source code | — | context | weak | — |
| 17 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/auth/AuthConfigProvider.d.ts:9) | 3 code | source code | — | context | weak | — |
| 18 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/auth/AuthProvider.d.ts:5) | 3 code | source code | — | context | weak | — |
| 19 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/auth/FirstTimeLoginProvider.d.ts:7) | 3 code | source code | — | context | weak | — |
| 20 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/initFederation/ConfigurationProviders.d.ts:124) | 3 code | source code | — | context | weak | — |
| 21 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/initFederation/ShellConfigProvider.d.ts:54) | 3 code | source code | — | context | weak | — |
| 22 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/initFederation/ShellHistoryProvider.d.ts:4) | 3 code | source code | — | context | weak | — |
| 23 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/initFederation/ShellThemeSelectorProvider.d.ts:16) | 3 code | source code | — | context | weak | — |
| 24 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/initFederation/UIListProvider.d.ts:24) | 3 code | source code | — | context | weak | — |
| 25 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:32) | 3 code | source code | — | context | weak | — |
| 26 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:33) | 3 code | source code | — | context | weak | — |
| 27 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/NavBar.d.ts:6) | 3 code | source code | — | context | weak | — |
| 28 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/NavBar.d.ts:20) | 3 code | source code | — | context | weak | — |
| 29 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/NavbarUpdaterComponents.d.ts:1) | 3 code | source code | — | context | weak | — |
| 30 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/NotificationCenter.d.ts:1) | 3 code | source code | — | context | weak | — |
| 31 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/SleepingNotificationBell.d.ts:1) | 3 code | source code | — | context | weak | — |
| 32 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/index.d.ts:6) | 3 code | source code | — | context | weak | — |
| 33 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/lang.d.ts:13) | 3 code | source code | — | context | weak | — |
| 34 | 3.4.4 (shell-ui/rspack.config.ts:140) | 3 code | configuration | module-federation | technological | weak | — |
| 35 | 3.4.4 (shell-ui/rspack.config.ts:141) | 3 code | configuration | module-federation | technological | weak | — |
| 36 | 3.4.4 (shell-ui/rspack.config.ts:142) | 3 code | configuration | module-federation | technological | weak | — |
| 37 | 3.4.4 (shell-ui/src/FederatedApp.tsx:19) | 3 code | source code | — | context | weak | — |
| 38 | 3.4.4 (shell-ui/src/FederatedApp.tsx:20) | 3 code | source code | — | context | weak | — |
| 39 | 3.4.4 (shell-ui/src/FederatedApp.tsx:21) | 3 code | source code | — | context | weak | — |
| 40 | 3.4.4 (shell-ui/src/FederatedApp.tsx:22) | 3 code | source code | — | context | weak | — |
| 41 | 3.4.4 (shell-ui/src/FederatedApp.tsx:23) | 3 code | source code | — | context | weak | — |
| 42 | 3.4.4 (shell-ui/src/auth/AuthConfigProvider.tsx:3) | 3 code | source code | — | context | weak | — |
| 43 | 3.4.4 (shell-ui/src/auth/AuthProvider.spec.tsx:84) | 3 code | source code | — | context | weak | — |
| 44 | 3.4.4 (shell-ui/src/auth/AuthProvider.tsx:6) | 3 code | source code | — | context | weak | — |
| 45 | 3.4.4 (shell-ui/src/auth/AuthProvider.tsx:7) | 3 code | source code | — | context | weak | — |
| 46 | 3.4.4 (shell-ui/src/guardian/GuardianContext.tsx:2) | 3 code | source code | — | context | weak | — |
| 47 | 3.4.4 (shell-ui/src/guardian/GuardianDrawer.tsx:1) | 3 code | source code | — | context | weak | — |
| 48 | 3.4.4 (shell-ui/src/hooks/useShellHooks.ts:27) | 3 code | source code | — | context | weak | — |
| 49 | 3.4.4 (shell-ui/src/hooks/useShellHooks.ts:28) | 3 code | source code | — | context | weak | — |
| 50 | 3.4.4 (shell-ui/src/hooks/useShellHooks.ts:29) | 3 code | source code | — | context | weak | — |
| 51 | 3.4.4 (shell-ui/src/hooks/useShellHooks.ts:30) | 3 code | source code | — | context | weak | — |
| 52 | 3.4.4 (shell-ui/src/mcp/MCPRegistrar.test.tsx:6) | 3 code | source code | — | context | weak | — |
| 53 | 3.4.4 (shell-ui/src/mcp/MCPRegistrar.tsx:16) | 3 code | source code | — | context | weak | — |
| 54 | 3.4.4 (shell-ui/src/mcp/MCPRegistrar.tsx:17) | 3 code | source code | — | context | weak | — |
| 55 | 3.4.4 (shell-ui/src/navbar/InstanceName.spec.tsx:10) | 3 code | source code | — | context | weak | — |
| 56 | 3.4.4 (shell-ui/src/navbar/InstanceName.spec.tsx:14) | 3 code | source code | — | context | weak | — |
| 57 | 3.4.4 (shell-ui/src/navbar/InstanceName.spec.tsx:37) | 3 code | source code | — | context | weak | — |
| 58 | 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:8) | 3 code | source code | — | context | weak | — |
| 59 | 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:9) | 3 code | source code | — | context | weak | — |
| 60 | 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:10) | 3 code | source code | — | context | weak | — |
| 61 | 3.4.4 (shell-ui/src/navbar/NavBar.tsx:22) | 3 code | source code | — | context | weak | — |
| 62 | 3.4.4 (shell-ui/src/navbar/NavBar.tsx:23) | 3 code | source code | — | context | weak | — |
| 63 | 3.4.4 (shell-ui/src/navbar/NavBar.tsx:24) | 3 code | source code | — | context | weak | — |
| 64 | 3.4.4 (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:7) | 3 code | source code | — | context | weak | — |
| 65 | 3.4.4 (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:8) | 3 code | source code | — | context | weak | — |
| 66 | 3.4.4 (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:9) | 3 code | source code | — | context | weak | — |
| 67 | 3.4.4 (shell-ui/src/navbar/NotificationCenter.spec.tsx:9) | 3 code | source code | — | context | weak | — |
| 68 | 3.4.4 (shell-ui/src/navbar/NotificationCenter.tsx:12) | 3 code | source code | — | context | weak | — |
| 69 | 3.4.4 (shell-ui/src/navbar/auth/permissionUtils.ts:4) | 3 code | source code | — | context | weak | — |
| 70 | 3.4.4 (shell-ui/src/navbar/index.spec.tsx:15) | 3 code | source code | — | context | weak | — |
| 71 | 3.4.4 (shell-ui/src/navbar/index.spec.tsx:16) | 3 code | source code | — | context | weak | — |
| 72 | 3.4.4 (shell-ui/src/navbar/index.spec.tsx:17) | 3 code | source code | — | context | weak | — |
| 73 | 3.4.4 (shell-ui/src/navbar/index.tsx:2) | 3 code | source code | — | context | weak | — |
| 74 | 3.4.4 (shell-ui/src/navbar/index.tsx:3) | 3 code | source code | — | context | weak | — |
| 75 | 3.4.4 (shell-ui/src/navbar/navbarHooks.ts:2) | 3 code | source code | — | context | weak | — |
| 76 | 3.4.4 (shell-ui/src/navbar/navbarHooks.ts:3) | 3 code | source code | — | context | weak | — |
| 77 | 3.4.4 (shell-ui/src/setupTests.ts:83) | 3 code | source code | — | context | weak | — |
| 78 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/auth/AuthConfigProvider.d.ts:2) | 3 code | source code | — | context | weak | — |
| 79 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:6) | 3 code | source code | — | context | weak | — |
| 80 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:7) | 3 code | source code | — | context | weak | — |
| 81 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:8) | 3 code | source code | — | context | weak | — |
| 82 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/hooks/useShellHooks.d.ts:9) | 3 code | source code | — | context | weak | — |
| 83 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:2) | 3 code | source code | — | context | weak | — |
| 84 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/InstanceName.d.ts:11) | 3 code | source code | — | context | weak | — |
| 85 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/NavBar.d.ts:2) | 3 code | source code | — | context | weak | — |
| 86 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/auth/permissionUtils.d.ts:3) | 3 code | source code | — | context | weak | — |
| 87 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/navbarHooks.d.ts:1) | 3 code | source code | — | context | weak | — |
| 88 | 3.4.4 (ui/@mf-types/shell/compiled-types/src/navbar/navbarHooks.d.ts:2) | 3 code | source code | — | context | weak | — |
| 89 | 3.4.4 (ui/@mf-types/shell/moduleFederation/ConfigurationProvider.d.ts:1) | 3 code | source code | — | context | weak | — |
| 90 | 3.4.4 (ui/@mf-types/shell/moduleFederation/ConfigurationProvider.d.ts:2) | 3 code | source code | — | context | weak | — |
| 91 | 3.4.4 (ui/@mf-types/shell/moduleFederation/ShellConfigurationProvider.d.ts:1) | 3 code | source code | — | context | weak | — |
| 92 | 3.4.4 (ui/@mf-types/shell/moduleFederation/ShellConfigurationProvider.d.ts:2) | 3 code | source code | — | context | weak | — |
| 93 | 3.4.4 (ui/@mf-types/shell/moduleFederation/UIListProvider.d.ts:1) | 3 code | source code | — | context | weak | — |
| 94 | 3.4.4 (ui/@mf-types/shell/moduleFederation/UIListProvider.d.ts:2) | 3 code | source code | — | context | weak | — |
| 95 | 3.4.4 (shell-ui/src/guardian/GuardianDrawer.tsx:37) | 3 code | source code | iframe | context | weak | — |
| 96 | 3.4.4 (shell-ui/src/guardian/guardianPostMessageHooks.ts:38) | 3 code | source code | — | context | weak | — |
| 97 | 3.4.4 (shell-ui/src/guardian/guardianPostMessageHooks.ts:63) | 3 code | source code | — | context | weak | — |
| 98 | 3.4.4 (shell-ui/src/navbar/__TESTS__/testMultipleHooks.tsx:92) | 3 code | source code | — | context | weak | — |
| 99 | 3.4.4 (shell-ui/src/navbar/__TESTS__/testMultipleHooks.tsx:97) | 3 code | source code | — | context | weak | — |
| 100 | 3.4.4 (shell-ui/src/navbar/lang.tsx:49) | 3 code | source code | — | context | weak | — |
| 101 | 3.4.4 (shell-ui/src/initFederation/UIListProvider.tsx:70) | 3 code | source code | module-federation | technological | moderate | implements #110 |
| 102 | 3.4.4 (shell-ui/src/FederatedApp.tsx:85) | 3 code | source code | module-federation | technological | moderate | implements #110 |
| 103 | 3.4.4 (shell-ui/src/navbar/NavbarUpdaterComponents.tsx:51) | 3 code | source code | module-federation | technological | moderate | implements #110 |
| 104 | 3.4.4 (shell-ui/src/navbar/InstanceName.tsx:161) | 3 code | source code | module-federation | technological | weak | — |
| 105 | 3.4.4 (shell-ui/src/mcp/MCPRegistrar.tsx:201) | 3 code | source code | module-federation | technological | ambiguous | implements #111 |
| 106 | 3.4.4 (ui/src/containers/Layout.tsx:251) | 3 code | source code | module-federation | architectural | ambiguous | implements #112 |
| 107 | 3.4.3 (shell-ui) | 4 structure | directory | — | architectural | moderate | — |
| 108 | 3.4.3 (tools/crd-client-generator-js) | 4 structure | directory | — | context | weak | — |
| 109 | 3.4.3 (ui) | 4 structure | directory | — | architectural | ambiguous | — |
| 110 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #107; links #109 |
| 111 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | ambiguous | links #107 |
| 112 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | ambiguous | links #109 |
| 113 | 3.4.5 #4 | 5 composition | configuration | module-federation | architectural | moderate | links #109; links #107 |
| 114 | 3.4.6 #1 | 6 build-deploy | deploy | — | architectural | moderate | publishes #107 |
| 115 | 3.4.6 #2 | 6 build-deploy | deploy | — | architectural | moderate | publishes #109 |
| 116 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | corroborates #114 |
| 117 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | corroborates #114 |
| 118 | 3.4.7 #3 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #107; corroborates #1; corroborates #3 |
| 119 | 3.4.7 #4 | 7 documentation | comment | — | architectural | weak | corroborates #114 |
| 120 | 3.4.7 #5 | 7 documentation | comment | — | architectural | weak | corroborates #115 |
| 121 | 3.4.7 #6 | 7 documentation | comment | — | architectural | weak | corroborates buildchain/buildchain/versions.py:64-67 |
| 122 | 3.4.7 #7 | 7 documentation | documentation | module-federation | technological | weak | contradicts #5; contradicts #6 |
| 123 | 3.4.7 #8 | 7 documentation | documentation | — | technological | weak | corroborates #5; corroborates #6 |
| 124 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | contradicts #110 |
| 125 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates #110 |
| 126 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | contradicts shell-ui/src/hooks/useShellHooks.ts:70-82 |
| 127 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | contradicts shell-ui/src/navbar/events.ts:1-4; contradicts shell-ui/src/navbar/library.ts:5-16 |
| 128 | 3.4.7 #13 | 7 documentation | comment | module-federation | technological | weak | corroborates #5 |
| 129 | 3.4.7 #14 | 7 documentation | comment | — | architectural | weak | corroborates #103; corroborates ui/src/components/AlertNavbarUpdaterComponent.tsx:160 |
| 130 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | contradicts ui/package.json:38 |
| 131 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | partially corroborates #114; partially corroborates #113 |
| 132 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #109 |
| 133 | 3.4.8 #2 | 8 history | history | — | context | weak | explains #46; explains #47; explains #95; explains #96; explains #97 |
| 134 | 3.4.8 #3 | 8 history | history | module-federation | architectural | weak | explains #124; explains #126; explains #127; explains #100 |
| 135 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #104 |
| 136 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #105; explains #111 |
| 137 | 3.4.8 #6 | 8 history | history | — | architectural | weak | explains #106; explains #112 |
| 138 | 3.4.8 #7 | 8 history | history | — | architectural | weak | explains #114 |
| 139 | 3.4.8 #8 | 8 history | history | — | technological | weak | explains #122 |
| 140 | 3.4.8 #9 | 8 history | history | — | architectural | weak | explains #130; explains #131 |

## Summary

Observations: 140. Dimensions (technology: 4, configuration: 9, code: 93, structure: 3, composition: 4, build-deploy: 2, documentation: 16, history: 9). Strength (strong: 7, moderate: 10, weak: 118, ambiguous: 5). Evidence (technological: 18, architectural: 36, context: 86).

