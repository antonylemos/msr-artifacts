---
schema: 1
id: 1329274714
full_name: pmiguras/likekiri-website
commit: 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
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

# 084 — pmiguras/likekiri-website

## Leitura do repositório

Plataforma modular orientada a produção, num monorepo pnpm: dois shells React/Vite, o painel `apps/admin-shell` (#42) e o site `apps/web-shell` (#44), dez módulos federados em `modules/*` (#45 a #54), o backend NestJS `apps/core` (#43) e três bibliotecas (#55 a #57). Os shells não nomeiam nenhum módulo no código: os destinos chegam por dados de runtime, a partir do registro do core e dos manifestos que cada módulo publica.

A cadeia que sustenta a arquitetura:
- **Dependências:** o runtime `@module-federation/runtime` nos dois shells (#1, #2) e o plugin `@module-federation/vite` nos dez módulos (#3 a #12).
- **Configuração:** cada módulo se declara como remote, com nome igual ao seu `moduleId`, os componentes expostos e o React compartilhado (#13 a #22). Não há `remotes` estáticos nos shells.
- **Código:** o core busca o manifesto de cada módulo e compila as rotas por superfície (#38). O painel pede as rotas `admin`, registra o remote e carrega e monta o componente (#24 a #29). No site, o core executa o SSR do shell no próprio processo (#36, #37); o shell escreve placeholders de ilha (#33, #35), e o runtime de ilhas inicializa a federação e monta ou hidrata cada componente (#30 a #32). Para `clientes`, o core pede o HTML ao servidor do módulo, e o shell o insere (#34, #39).
- **Relações:** isso resulta em treze relações host → remote ativas (#58 a #70): o painel consome nove módulos e o site, quatro; `chat`, `clientes` e `hello` entram nas duas superfícies.
- **Build e deploy:** as doze aplicações têm build próprio. Os dez módulos têm também deploy próprio, com unidade systemd, porta e rota Caddy (#73 a #82), enquanto os dois shells saem juntos no processo do core (#71, #72).

O que pode enganar:
- O código de composição mais forte está no backend (#36 a #39), que não é unidade frontend; ele resolve os destinos que os shells usam.
- O único registro versionado de módulos é um exemplo que nada lê (#23, #40; #151). A lista habilitada numa implantação fica fora do snapshot, mas a identidade dos destinos sai dos manifestos dos módulos.
- `apps/core` e as bibliotecas `packages/*` não são unidades frontend (#43, #55 a #57).

O que fica ambíguo são os dez módulos como aplicações próprias: a entrada do build só reexporta componentes, e não há `index.html` (#45 a #54). O histórico mostra que eles nasceram assim, como remotes (#150). O papel de remote não depende disso, e as relações (#58 a #70) e o deploy separado (#73 a #82) os situam como unidades.

A documentação é extensa e, no geral, fiel ao código: descreve o microkernel com módulos federados, o registry, as ilhas, o SSR delegado e os widgets (por exemplo #83, #100 a #104, #146). As contradições estão no diagrama e no fluxo de requisições do README (#96, #97, #99), em textos anteriores ao SSR delegado (#124, #136, #145), na origem dos estáticos de admin do `hello` (#126) e no header "estático" do site (#144); o histórico explica cada uma (#152 a #157), e só a do `hello` fica inconclusiva sobre o passado (#155). Quatro afirmações de verificação em produção não têm artefato (#128, #130, #133, #138).

## Observações

### 1. apps/admin-shell/package.json:14; apps/admin-shell/src/federation.ts:1, 34-46; apps/admin-shell/src/views/ModulePage.tsx:4, 25

**Observação:** `@module-federation/runtime` (`2.8.2`) está declarada em `dependencies` do admin-shell. O `federation.ts` importa `init`, `loadRemote` e `registerRemotes` do pacote e os chama no loader de componentes remotos, que a `ModulePage` usa.

**Interpretação:** O runtime do Module Federation está presente no painel e é usado para carregar remotes em runtime.

### 2. apps/web-shell/package.json:13; apps/web-shell/src/islands.ts:1, 54-56, 90-107

**Observação:** `@module-federation/runtime` (`2.8.2`) está declarada em `dependencies` do web-shell. O `islands.ts`, entrada do build cliente (`islands.js`), importa `init` e `loadRemote` e os chama com os remotes das ilhas.

**Interpretação:** O runtime do Module Federation está presente no site e é usado pelo runtime de ilhas no cliente.

### 3. modules/chat/package.json:19; modules/chat/vite.config.ts:3, 8-16

**Observação:** `@module-federation/vite` (`1.20.5`) está declarada em `devDependencies` de `modules/chat`. O `vite.config.ts` importa `federation` e o aplica em `plugins`.

**Interpretação:** O plugin de federação está presente no build do módulo `chat`.

### 4. modules/clientes/package.json:18; modules/clientes/vite.config.ts:3, 22-36

**Observação:** `@module-federation/vite` (`1.20.5`) está declarada em `devDependencies` de `modules/clientes`. O `vite.config.ts` importa `federation` e o aplica em `plugins`. Só o build cliente usa o plugin; o build SSR não.

**Interpretação:** O plugin de federação está presente no build do módulo `clientes`.

### 5. modules/cuentas/package.json:18; modules/cuentas/vite.config.ts:3, 8-20

**Observação:** `@module-federation/vite` (`1.20.5`) está declarada em `devDependencies` de `modules/cuentas`. O `vite.config.ts` importa `federation` e o aplica em `plugins`.

**Interpretação:** O plugin de federação está presente no build do módulo `cuentas`.

### 6. modules/ejemplo-admin/package.json:18; modules/ejemplo-admin/vite.config.ts:3, 10-21

**Observação:** `@module-federation/vite` (`1.20.5`) está declarada em `devDependencies` de `modules/ejemplo-admin`. O `vite.config.ts` importa `federation` e o aplica em `plugins`.

**Interpretação:** O plugin de federação está presente no build do módulo `ejemplo-admin`.

### 7. modules/ejemplo-web/package.json:18; modules/ejemplo-web/vite.config.ts:3, 11-21

**Observação:** `@module-federation/vite` (`1.20.5`) está declarada em `devDependencies` de `modules/ejemplo-web`. O `vite.config.ts` importa `federation` e o aplica em `plugins`.

**Interpretação:** O plugin de federação está presente no build do módulo `ejemplo-web`.

### 8. modules/hello/package.json:17; modules/hello/vite.config.ts:3, 10-21

**Observação:** `@module-federation/vite` (`1.20.5`) está declarada em `devDependencies` de `modules/hello`. O `vite.config.ts` importa `federation` e o aplica em `plugins`.

**Interpretação:** O plugin de federação está presente no build do módulo `hello`.

### 9. modules/media/package.json:19; modules/media/vite.config.ts:3, 8-18

**Observação:** `@module-federation/vite` (`1.20.5`) está declarada em `devDependencies` de `modules/media`. O `vite.config.ts` importa `federation` e o aplica em `plugins`.

**Interpretação:** O plugin de federação está presente no build do módulo `media`.

### 10. modules/ops/package.json:10; modules/ops/vite.config.ts:3, 8-13

**Observação:** `@module-federation/vite` (`1.20.5`) está declarada em `devDependencies` de `modules/ops`. O `vite.config.ts` importa `federation` e o aplica em `plugins`.

**Interpretação:** O plugin de federação está presente no build do módulo `ops`.

### 11. modules/registry/package.json:18; modules/registry/vite.config.ts:3, 8-18

**Observação:** `@module-federation/vite` (`1.20.5`) está declarada em `devDependencies` de `modules/registry`. O `vite.config.ts` importa `federation` e o aplica em `plugins`.

**Interpretação:** O plugin de federação está presente no build do módulo `registry`.

### 12. modules/sitio/package.json:18; modules/sitio/vite.config.ts:3, 8-18

**Observação:** `@module-federation/vite` (`1.20.5`) está declarada em `devDependencies` de `modules/sitio`. O `vite.config.ts` importa `federation` e o aplica em `plugins`.

**Interpretação:** O plugin de federação está presente no build do módulo `sitio`.

### 13. modules/chat/vite.config.ts:8-16

**Observação:** `federation({ ... })` declara `name: 'chat'` e `filename: 'remoteEntry.js'`, expõe `./ChatWidgetIsland`, `./ChatAdminPage` e compartilha `react` e `react-dom` como singletons.

**Interpretação:** O módulo `chat` está configurado como remote, com nome próprio, os componentes que oferece aos shells e o React compartilhado.

### 14. modules/clientes/vite.config.ts:22-36

**Observação:** `federation({ ... })` no ramo do build cliente (o ramo SSR, de 11-17, não usa o plugin) declara `name: 'clientes'` e `filename: 'remoteEntry.js'`, expõe `./RegistroIsland`, `./AccesoIsland`, `./PortalIsland`, `./CuentasAdminPage`, `./FacturacionAdminPage` e compartilha `react` e `react-dom` como singletons.

**Interpretação:** O módulo `clientes` está configurado como remote, com nome próprio, os componentes que oferece aos shells e o React compartilhado.

### 15. modules/cuentas/vite.config.ts:8-20

**Observação:** `federation({ ... })` declara `name: 'cuentas'` e `filename: 'remoteEntry.js'`, expõe `./UsersPage`, `./InvitationsPage`, `./PasswordPage` e compartilha `react` e `react-dom` como singletons.

**Interpretação:** O módulo `cuentas` está configurado como remote, com nome próprio, os componentes que oferece aos shells e o React compartilhado.

### 16. modules/ejemplo-admin/vite.config.ts:10-21

**Observação:** `federation({ ... })` declara `name: 'ejemplo-admin'` e `filename: 'remoteEntry.js'`, expõe `./PanelPage`, `./AjustesPage` e compartilha `react` e `react-dom` como singletons.

**Interpretação:** O módulo `ejemplo-admin` está configurado como remote, com nome próprio, os componentes que oferece aos shells e o React compartilhado.

### 17. modules/ejemplo-web/vite.config.ts:11-21

**Observação:** `federation({ ... })` declara `name: 'ejemplo-web'` e `filename: 'remoteEntry.js'`, expõe `./SimuladorIsland` e compartilha `react` e `react-dom` como singletons.

**Interpretação:** O módulo `ejemplo-web` está configurado como remote, com nome próprio, os componentes que oferece aos shells e o React compartilhado.

### 18. modules/hello/vite.config.ts:10-21

**Observação:** `federation({ ... })` declara `name: 'hello'` e `filename: 'remoteEntry.js'`, expõe `./HelloIsland`, `./HelloAdminPage` e compartilha `react` e `react-dom` como singletons.

**Interpretação:** O módulo `hello` está configurado como remote, com nome próprio, os componentes que oferece aos shells e o React compartilhado.

### 19. modules/media/vite.config.ts:8-18

**Observação:** `federation({ ... })` declara `name: 'media'` e `filename: 'remoteEntry.js'`, expõe `./MediaPage` e compartilha `react` e `react-dom` como singletons.

**Interpretação:** O módulo `media` está configurado como remote, com nome próprio, os componentes que oferece aos shells e o React compartilhado.

### 20. modules/ops/vite.config.ts:8-13

**Observação:** `federation({ ... })` declara `name: 'ops'` e `filename: 'remoteEntry.js'`, expõe `./OpsAdminPage` e compartilha `react` e `react-dom` como singletons.

**Interpretação:** O módulo `ops` está configurado como remote, com nome próprio, os componentes que oferece aos shells e o React compartilhado.

### 21. modules/registry/vite.config.ts:8-18

**Observação:** `federation({ ... })` declara `name: 'registry'` e `filename: 'remoteEntry.js'`, expõe `./RegistryPage` e compartilha `react` e `react-dom` como singletons.

**Interpretação:** O módulo `registry` está configurado como remote, com nome próprio, os componentes que oferece aos shells e o React compartilhado.

### 22. modules/sitio/vite.config.ts:8-18

**Observação:** `federation({ ... })` declara `name: 'sitio'` e `filename: 'remoteEntry.js'`, expõe `./SitioPage` e compartilha `react` e `react-dom` como singletons.

**Interpretação:** O módulo `sitio` está configurado como remote, com nome próprio, os componentes que oferece aos shells e o React compartilhado.

### 23. config/modules.example.json:3-7

**Observação:** O único registro do arquivo declara `"moduleId": "hello"`, `"baseUrl": "http://127.0.0.1:4001"` e uma `hmacKey` de exemplo. O registro real é lido de `MODULE_REGISTRY_CONFIG`, e o `config/modules.json` está no `.gitignore`.

**Interpretação:** É o modelo do registro de módulos do core: mostra como uma implantação diz quais aplicações de módulo usa e onde, mas não é lido por nenhum build nem pelo runtime.

**Nota:** A orientação para uma configuração que declara outra unidade como aplicação é `forte`, mas este arquivo é um exemplo que nada lê (3.4.4, Composição `No`; 3.4.8 #2). Ele não participa da composição, e por isso fica `fraca`, sem relação `configura`.

### 24. apps/admin-shell/src/federation.ts:1

**Observação:** `import { init, loadRemote, registerRemotes } from '@module-federation/runtime'`. Os três são usados no mesmo arquivo, em :36, :40 e :44.

**Interpretação:** O painel importa as funções do runtime de federação que registram e carregam remotes.

### 25. apps/admin-shell/src/federation.ts:34, 39-41

**Observação:** `registerRemotes([remote])`, com `remote = { name: route.moduleId, entry: route.remoteEntry, type: 'module' }`, quando o runtime já foi inicializado e o módulo ainda não é conhecido. A `route` vem do manifesto que o core entrega.

**Interpretação:** O painel registra em runtime um remote recebido por parâmetro, sem nomear nenhum módulo no código.

### 26. apps/admin-shell/src/federation.ts:13-26, 34-38

**Observação:** `init({ name: 'likekiri_admin', remotes: [remote], shared: hostShared })` no primeiro carregamento; `hostShared` fornece `react` e `react-dom` do host como singletons.

**Interpretação:** O painel inicializa a federação com o primeiro remote recebido e compartilha o seu React com os remotes.

### 27. apps/admin-shell/src/federation.ts:43-47

**Observação:** ``loadRemote<Record<string, unknown>>(`${route.moduleId}/${exposed}`)``, com `exposed` tirado de `route.component` sem o `./`; o componente é `remoteModule[exposed]` ou o `default`.

**Interpretação:** O painel obtém o componente exposto por outra unidade, cujo nome chega por dados de runtime.

### 28. apps/admin-shell/src/views/ModulePage.tsx:4, 25, 48; apps/admin-shell/src/App.tsx:226

**Observação:** `createElement(state.Component, params)` renderiza o componente carregado por `loadRemoteComponent(route)`. A `ModulePage` é renderizada pela rota de módulo do `App`.

**Interpretação:** O painel monta na página o componente carregado da outra unidade, com os parâmetros da URL como props.

### 29. apps/admin-shell/src/api.ts:9-15, 37-42, 85; apps/admin-shell/src/App.tsx:148, 214

**Observação:** `request<ShellManifest>('/api/shell/manifest?surface=admin')` pede ao core a tabela de rotas da superfície `admin`, com `moduleId`, `component` e `remoteEntry` de cada módulo. O `App` a carrega e casa a rota atual com `matchModuleRoute`.

**Interpretação:** O painel resolve pelo core quais módulos e componentes entram em cada rota; os destinos não estão no código do painel.

### 30. apps/web-shell/src/islands.ts:1, 80-90, 113

**Observação:** `init({ name: 'likekiri_web', remotes, shared: { react, react-dom } })` registra os remotes coletados dos placeholders de ilha (`data-remote`). `boot()` roda quando o bundle `islands.js` carrega.

**Interpretação:** O site inicializa a federação no cliente com os remotes que o HTML do shell anuncia e compartilha o seu React.

### 31. apps/web-shell/src/islands.ts:54-57

**Observação:** ``loadRemote<Record<string, unknown>>(`${spec.moduleId}/${spec.exposed}`)``, com `moduleId` e `exposed` lidos do placeholder.

**Interpretação:** O site obtém o componente exposto por outra unidade, cujo nome chega pelo HTML.

### 32. apps/web-shell/src/islands.ts:62-71

**Observação:** `hydrateRoot(spec.el, element)` quando a ilha veio pré-renderizada (`data-hydrate`), senão `createRoot(spec.el).render(element)`. Uma falha marca só o lugar da ilha.

**Interpretação:** O site monta ou hidrata no lugar da ilha o componente da outra unidade, e a falha de uma ilha fica isolada.

### 33. apps/web-shell/src/entry-server.tsx:77-82; apps/web-shell/src/islands.ts:23-28; apps/core/src/shell/shell.service.ts:138-144

**Observação:** ``'data-likekiri-island': `${island.moduleId}/${island.component}` `` e `'data-remote': island.remoteEntry` no placeholder da página. O descritor da ilha chega do core, e o `islands.ts` lê esses atributos.

**Interpretação:** O HTML do shell declara qual componente de qual módulo ocupa a página e de onde vem o seu `remoteEntry`; é o contrato entre o SSR e o runtime de ilhas.

### 34. apps/web-shell/src/entry-server.tsx:23-27, 95-96; apps/core/src/registry/registry.service.ts:307-317

**Observação:** `dangerouslySetInnerHTML={{ __html: island.html as string }}` insere no placeholder o HTML que o servidor do módulo pré-renderizou, pedido pelo core ao `/render` do módulo.

**Interpretação:** O shell inclui no servidor o markup produzido por outra unidade; é composição no servidor, sem Module Federation.

### 35. apps/web-shell/src/entry-server.tsx:57-58, 132; apps/core/src/registry/registry.service.ts:346-355

**Observação:** ``data-likekiri-island={`${w.moduleId}/${w.component}`}`` e `data-remote={w.remoteEntry}` para cada widget global, renderizados em toda página. A lista vem de `registry.webWidgets()`.

**Interpretação:** O shell declara as ilhas flutuantes globais, como o chat, pelo mesmo contrato de placeholder.

### 36. apps/core/src/shell/shell.service.ts:83-89

**Observação:** `import(pathToFileURL(entryPath).href)` carrega o `server/entry-server.js` do web-shell, com o caminho montado a partir de `webDistDir`. O arquivo está em `apps/core`, que não é unidade frontend.

**Interpretação:** O backend carrega em runtime o bundle SSR do shell do site, para renderizar as páginas no próprio processo.

### 37. apps/core/src/shell/shell.service.ts:135-147; apps/core/src/shell/shell.controller.ts:53

**Observação:** `entry.render(request, { onReady, onError })` executa o render do web-shell, passando o descritor da ilha do módulo casado e os widgets globais.

**Interpretação:** É o passo do servidor que entrega ao shell do site os módulos que ele deve anunciar na página.

### 38. apps/core/src/registry/registry.service.ts:401-406, 471-485; modules/hello/server.mjs:87-95

**Observação:** `fetch(url, { headers, signal })` busca `/.well-known/module-manifest` no `baseUrl` de cada módulo registrado, com cabeçalhos assinados. Do manifesto saem o `remoteEntry` e as rotas da tabela que o core entrega aos shells.

**Interpretação:** O backend resolve, pelos manifestos dos módulos, os destinos e os `remoteEntry` que os dois shells usam.

### 39. apps/core/src/registry/registry.service.ts:307-318; apps/core/src/shell/shell.controller.ts:46-49

**Observação:** `fetch(new URL('/render', synced.registration.baseUrl), { method: 'POST', ... })` pede ao servidor do módulo o HTML do componente e usa `data.html` como `islandHtml`.

**Interpretação:** O backend obtém de outra unidade o markup pré-renderizado de uma ilha; é o lado do servidor do SSR delegado.

### 40. config/modules.example.json:4-5; apps/core/src/registry/registry-config.ts:4-7

**Observação:** `"moduleId": "hello"` e `"baseUrl": "http://127.0.0.1:4001"`. O core lê o registro de `MODULE_REGISTRY_CONFIG`, e não deste exemplo.

**Interpretação:** É um registro de exemplo: nomeia o `hello`, mas não ativa nenhuma composição.

### 41. .; package.json:1-13; pnpm-workspace.yaml:1-4

**Observação:** Manifesto da raiz do workspace pnpm (`apps/*`, `packages/*`, `modules/*`). O `build` só delega aos membros (`pnpm -r build`), sem entrada nem build de UI.

**Interpretação:** É a raiz de coordenação do monorepo, não uma unidade frontend.

### 42. apps/admin-shell; apps/admin-shell/package.json:1-26; apps/admin-shell/index.html:12-13; apps/admin-shell/src/main.tsx:5-9; apps/admin-shell/vite.config.ts:4-8

**Observação:** Manifesto próprio (`@likekiri/admin-shell`), `index.html` com `#root` e `/src/main.tsx`, montagem React por `createRoot` e configuração Vite própria com `base: '/admin-assets/'`.

**Interpretação:** É uma unidade frontend: a SPA do painel, com entrada e build próprios.

### 43. apps/core; apps/core/package.json:1-35; infra/systemd/likekiri-core.service:12, 16

**Observação:** Manifesto próprio (`core`), backend NestJS com build só por `tsc`, rodado por uma unidade systemd (`node apps/core/dist/main.js`).

**Interpretação:** É o backend que integra módulos e serve os shells, não uma unidade frontend.

### 44. apps/web-shell; apps/web-shell/package.json:1-26; apps/web-shell/vite.config.ts:8-29; apps/web-shell/src/entry-server.tsx:176-181; apps/web-shell/src/islands.ts:63-67, 113

**Observação:** Manifesto próprio (`@likekiri/web-shell`), build Vite cliente (`src/islands.ts`) e SSR (`src/entry-server.tsx`). O render usa `renderToPipeableStream` com `bootstrapModules: ['/assets/islands.js']`, e o runtime de ilhas monta por `hydrateRoot`/`createRoot`.

**Interpretação:** É uma unidade frontend: o shell React do site, com entradas cliente e SSR e build próprios.

### 45. modules/chat; modules/chat/package.json:1-26; modules/chat/vite.config.ts:5-19; modules/chat/src/index.ts:1-2; infra/systemd/likekiri-module-chat.service:10, 13; infra/caddy/likekiri.caddy:28-30, 69-71

**Observação:** Manifesto próprio (`@likekiri/module-chat`) e build federado próprio com `remoteEntry.js`. A entrada do build (`src/index.ts`) só reexporta componentes, e não há `index.html`. Tem processo systemd e proxy Caddy próprios.

**Interpretação:** Duas leituras continuam plausíveis: é uma unidade frontend que só existe como remote dos shells, ou é um pacote de componentes sem UI própria. O papel de remote não depende disso.

### 46. modules/clientes; modules/clientes/package.json:1-24; modules/clientes/vite.config.ts:9-46; modules/clientes/src/index.ts:1-5; infra/systemd/likekiri-module-clientes.service:10, 13; infra/caddy/likekiri.caddy:22-24, 63-65

**Observação:** Manifesto próprio (`@likekiri/module-clientes`) e build federado próprio com `remoteEntry.js`. A entrada do build (`src/index.ts`) só reexporta componentes, e não há `index.html`. Tem processo systemd e proxy Caddy próprios.

**Interpretação:** Duas leituras continuam plausíveis: é uma unidade frontend que só existe como remote dos shells, ou é um pacote de componentes sem UI própria. O papel de remote não depende disso.

### 47. modules/cuentas; modules/cuentas/package.json:1-25; modules/cuentas/vite.config.ts:5-29; modules/cuentas/src/index.ts:1-3; infra/systemd/likekiri-module-cuentas.service:10, 12; infra/caddy/likekiri.caddy:51-53

**Observação:** Manifesto próprio (`@likekiri/module-cuentas`) e build federado próprio com `remoteEntry.js`. A entrada do build (`src/index.ts`) só reexporta componentes, e não há `index.html`. Tem processo systemd e proxy Caddy próprios.

**Interpretação:** Duas leituras continuam plausíveis: é uma unidade frontend que só existe como remote dos shells, ou é um pacote de componentes sem UI própria. O papel de remote não depende disso.

### 48. modules/ejemplo-admin; modules/ejemplo-admin/package.json:1-25; modules/ejemplo-admin/vite.config.ts:7-30; modules/ejemplo-admin/src/index.ts:1-2; infra/systemd/likekiri-module-ejemplo-admin.service:10, 12; infra/caddy/likekiri.caddy:57-59

**Observação:** Manifesto próprio (`@likekiri/module-ejemplo-admin`) e build federado próprio com `remoteEntry.js`. A entrada do build (`src/index.ts`) só reexporta componentes, e não há `index.html`. Tem processo systemd e proxy Caddy próprios.

**Interpretação:** Duas leituras continuam plausíveis: é uma unidade frontend que só existe como remote dos shells, ou é um pacote de componentes sem UI própria. O papel de remote não depende disso.

### 49. modules/ejemplo-web; modules/ejemplo-web/package.json:1-25; modules/ejemplo-web/vite.config.ts:8-30; modules/ejemplo-web/src/index.ts:1; infra/systemd/likekiri-module-ejemplo-web.service:10, 12; infra/caddy/likekiri.caddy:19-21

**Observação:** Manifesto próprio (`@likekiri/module-ejemplo-web`) e build federado próprio com `remoteEntry.js`. A entrada do build (`src/index.ts`) só reexporta componentes, e não há `index.html`. Tem processo systemd e proxy Caddy próprios.

**Interpretação:** Duas leituras continuam plausíveis: é uma unidade frontend que só existe como remote dos shells, ou é um pacote de componentes sem UI própria. O papel de remote não depende disso.

### 50. modules/hello; modules/hello/package.json:1-24; modules/hello/vite.config.ts:7-32; modules/hello/src/index.ts:1-2; infra/systemd/likekiri-module-hello.service:10, 12; infra/caddy/likekiri.caddy:16-18

**Observação:** Manifesto próprio (`@likekiri/module-hello`) e build federado próprio com `remoteEntry.js`. A entrada do build (`src/index.ts`) só reexporta componentes, e não há `index.html`. Tem processo systemd e proxy Caddy próprios.

**Interpretação:** Duas leituras continuam plausíveis: é uma unidade frontend que só existe como remote dos shells, ou é um pacote de componentes sem UI própria. O papel de remote não depende disso.

### 51. modules/media; modules/media/package.json:1-26; modules/media/vite.config.ts:5-27; modules/media/src/index.ts:1; infra/systemd/likekiri-module-media.service:10, 13; infra/caddy/likekiri.caddy:25-27, 66-68

**Observação:** Manifesto próprio (`@likekiri/module-media`) e build federado próprio com `remoteEntry.js`. A entrada do build (`src/index.ts`) só reexporta componentes, e não há `index.html`. Tem processo systemd e proxy Caddy próprios.

**Interpretação:** Duas leituras continuam plausíveis: é uma unidade frontend que só existe como remote dos shells, ou é um pacote de componentes sem UI própria. O papel de remote não depende disso.

### 52. modules/ops; modules/ops/package.json:1-13; modules/ops/vite.config.ts:5-16; modules/ops/src/index.ts:1; infra/systemd/likekiri-module-ops.service:10, 12; infra/caddy/likekiri.caddy:72-74

**Observação:** Manifesto próprio (`@likekiri/module-ops`) e build federado próprio com `remoteEntry.js`. A entrada do build (`src/index.ts`) só reexporta componentes, e não há `index.html`. Tem processo systemd e proxy Caddy próprios.

**Interpretação:** Duas leituras continuam plausíveis: é uma unidade frontend que só existe como remote dos shells, ou é um pacote de componentes sem UI própria. O papel de remote não depende disso.

### 53. modules/registry; modules/registry/package.json:1-25; modules/registry/vite.config.ts:5-27; modules/registry/src/index.ts:1; infra/systemd/likekiri-module-registry.service:10, 12; infra/caddy/likekiri.caddy:54-56

**Observação:** Manifesto próprio (`@likekiri/module-registry`) e build federado próprio com `remoteEntry.js`. A entrada do build (`src/index.ts`) só reexporta componentes, e não há `index.html`. Tem processo systemd e proxy Caddy próprios.

**Interpretação:** Duas leituras continuam plausíveis: é uma unidade frontend que só existe como remote dos shells, ou é um pacote de componentes sem UI própria. O papel de remote não depende disso.

### 54. modules/sitio; modules/sitio/package.json:1-24; modules/sitio/vite.config.ts:5-27; modules/sitio/src/index.ts:1; infra/systemd/likekiri-module-sitio.service:10, 12; infra/caddy/likekiri.caddy:60-62

**Observação:** Manifesto próprio (`@likekiri/module-sitio`) e build federado próprio com `remoteEntry.js`. A entrada do build (`src/index.ts`) só reexporta componentes, e não há `index.html`. Tem processo systemd e proxy Caddy próprios.

**Interpretação:** Duas leituras continuam plausíveis: é uma unidade frontend que só existe como remote dos shells, ou é um pacote de componentes sem UI própria. O papel de remote não depende disso.

### 55. packages/contract; packages/contract/package.json:1-31

**Observação:** Manifesto próprio (`@likekiri/contract`), só `main`/`exports` de biblioteca e build por `tsc`.

**Interpretação:** É a biblioteca do contrato entre módulos e core, não uma unidade frontend.

### 56. packages/i18n; packages/i18n/package.json:1-21

**Observação:** Manifesto próprio (`@likekiri/i18n`), só `main`/`exports` de biblioteca e build por `tsc`.

**Interpretação:** É uma biblioteca de textos compartilhada, não uma unidade frontend.

### 57. packages/tokens; packages/tokens/package.json:1-15

**Observação:** Manifesto próprio (`@likekiri/tokens`), só `main`/`types` de biblioteca e build por `tsc`.

**Interpretação:** É uma biblioteca de design tokens compartilhada, não uma unidade frontend.

### 58. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/chat/vite.config.ts:8-16; modules/chat/server.mjs:43, 496-497

**Observação:** O painel pede ao core as rotas da superfície `admin`, registra o remote e carrega `chat/<exposto>` por `loadRemote`, e monta o componente na `ModulePage`. O destino é `chat`: o `MODULE_ID` do servidor do módulo é igual ao `name` da federação, e as rotas `admin` do manifesto usam componentes expostos no `vite.config.ts`.

**Interpretação:** É uma relação host → remote ativa entre o painel e o módulo `chat`, por Module Federation em runtime, com o destino resolvido pelo manifesto do módulo.

### 59. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/clientes/vite.config.ts:22-36; modules/clientes/server.mjs:45, 1016-1017

**Observação:** O painel pede ao core as rotas da superfície `admin`, registra o remote e carrega `clientes/<exposto>` por `loadRemote`, e monta o componente na `ModulePage`. O destino é `clientes`: o `MODULE_ID` do servidor do módulo é igual ao `name` da federação, e as rotas `admin` do manifesto usam componentes expostos no `vite.config.ts`.

**Interpretação:** É uma relação host → remote ativa entre o painel e o módulo `clientes`, por Module Federation em runtime, com o destino resolvido pelo manifesto do módulo.

### 60. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/cuentas/vite.config.ts:8-20; modules/cuentas/server.mjs:23, 41-59

**Observação:** O painel pede ao core as rotas da superfície `admin`, registra o remote e carrega `cuentas/<exposto>` por `loadRemote`, e monta o componente na `ModulePage`. O destino é `cuentas`: o `MODULE_ID` do servidor do módulo é igual ao `name` da federação, e as rotas `admin` do manifesto usam componentes expostos no `vite.config.ts`.

**Interpretação:** É uma relação host → remote ativa entre o painel e o módulo `cuentas`, por Module Federation em runtime, com o destino resolvido pelo manifesto do módulo.

### 61. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/ejemplo-admin/vite.config.ts:10-21; modules/ejemplo-admin/server.mjs:24, 42-53

**Observação:** O painel pede ao core as rotas da superfície `admin`, registra o remote e carrega `ejemplo-admin/<exposto>` por `loadRemote`, e monta o componente na `ModulePage`. O destino é `ejemplo-admin`: o `MODULE_ID` do servidor do módulo é igual ao `name` da federação, e as rotas `admin` do manifesto usam componentes expostos no `vite.config.ts`.

**Interpretação:** É uma relação host → remote ativa entre o painel e o módulo `ejemplo-admin`, por Module Federation em runtime, com o destino resolvido pelo manifesto do módulo.

### 62. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/hello/vite.config.ts:10-21; modules/hello/server.mjs:23, 48-53

**Observação:** O painel pede ao core as rotas da superfície `admin`, registra o remote e carrega `hello/<exposto>` por `loadRemote`, e monta o componente na `ModulePage`. O destino é `hello`: o `MODULE_ID` do servidor do módulo é igual ao `name` da federação, e as rotas `admin` do manifesto usam componentes expostos no `vite.config.ts`.

**Interpretação:** É uma relação host → remote ativa entre o painel e o módulo `hello`, por Module Federation em runtime, com o destino resolvido pelo manifesto do módulo.

### 63. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/media/vite.config.ts:8-18; modules/media/server.mjs:32, 430-435

**Observação:** O painel pede ao core as rotas da superfície `admin`, registra o remote e carrega `media/<exposto>` por `loadRemote`, e monta o componente na `ModulePage`. O destino é `media`: o `MODULE_ID` do servidor do módulo é igual ao `name` da federação, e as rotas `admin` do manifesto usam componentes expostos no `vite.config.ts`.

**Interpretação:** É uma relação host → remote ativa entre o painel e o módulo `media`, por Module Federation em runtime, com o destino resolvido pelo manifesto do módulo.

### 64. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/ops/vite.config.ts:8-13; modules/ops/server.mjs:36, 267

**Observação:** O painel pede ao core as rotas da superfície `admin`, registra o remote e carrega `ops/<exposto>` por `loadRemote`, e monta o componente na `ModulePage`. O destino é `ops`: o `MODULE_ID` do servidor do módulo é igual ao `name` da federação, e as rotas `admin` do manifesto usam componentes expostos no `vite.config.ts`.

**Interpretação:** É uma relação host → remote ativa entre o painel e o módulo `ops`, por Module Federation em runtime, com o destino resolvido pelo manifesto do módulo.

### 65. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/registry/vite.config.ts:8-18; modules/registry/server.mjs:23, 41-46

**Observação:** O painel pede ao core as rotas da superfície `admin`, registra o remote e carrega `registry/<exposto>` por `loadRemote`, e monta o componente na `ModulePage`. O destino é `registry`: o `MODULE_ID` do servidor do módulo é igual ao `name` da federação, e as rotas `admin` do manifesto usam componentes expostos no `vite.config.ts`.

**Interpretação:** É uma relação host → remote ativa entre o painel e o módulo `registry`, por Module Federation em runtime, com o destino resolvido pelo manifesto do módulo.

### 66. apps/admin-shell/src/api.ts:85; apps/admin-shell/src/federation.ts:34-46; apps/admin-shell/src/views/ModulePage.tsx:48; apps/core/src/registry/registry.service.ts:213-223, 403; modules/sitio/vite.config.ts:8-18; modules/sitio/server.mjs:23, 41-47

**Observação:** O painel pede ao core as rotas da superfície `admin`, registra o remote e carrega `sitio/<exposto>` por `loadRemote`, e monta o componente na `ModulePage`. O destino é `sitio`: o `MODULE_ID` do servidor do módulo é igual ao `name` da federação, e as rotas `admin` do manifesto usam componentes expostos no `vite.config.ts`.

**Interpretação:** É uma relação host → remote ativa entre o painel e o módulo `sitio`, por Module Federation em runtime, com o destino resolvido pelo manifesto do módulo.

### 67. apps/core/src/shell/shell.service.ts:89, 147; apps/web-shell/src/entry-server.tsx:79-80; apps/web-shell/src/islands.ts:54, 65-67, 90; apps/core/src/registry/registry.service.ts:346-355, 403; apps/web-shell/src/entry-server.tsx:57-58; modules/chat/vite.config.ts:8-16; modules/chat/server.mjs:43, 495

**Observação:** O core casa a rota pública, executa o render do web-shell e passa o descritor da ilha; o shell escreve o placeholder com `data-likekiri-island` e `data-remote`, e o runtime de ilhas registra o remote e carrega `chat/<exposto>`. Entra como widget global, num placeholder escrito em toda página, e a mesma rota também pode casar como ilha de página. O destino é `chat`, pelo `MODULE_ID` e pelas rotas `web` do manifesto do módulo.

**Interpretação:** É uma relação host → remote ativa entre o site e o módulo `chat`, por Module Federation em runtime.

### 68. apps/core/src/shell/shell.service.ts:89, 147; apps/web-shell/src/entry-server.tsx:79-80; apps/web-shell/src/islands.ts:54, 65-67, 90; apps/core/src/registry/registry.service.ts:307-318, 403; apps/web-shell/src/entry-server.tsx:95-96; modules/clientes/server.mjs:1095; modules/clientes/vite.config.ts:22-36; modules/clientes/server.mjs:45, 1013-1015

**Observação:** O core casa a rota pública, executa o render do web-shell e passa o descritor da ilha; o shell escreve o placeholder com `data-likekiri-island` e `data-remote`, e o runtime de ilhas registra o remote e carrega `clientes/<exposto>`. As rotas são `ssr: 'server'`: o core pede o HTML ao `POST /render` do módulo, o shell o insere no placeholder e o cliente hidrata com o componente federado. O destino é `clientes`, pelo `MODULE_ID` e pelas rotas `web` do manifesto do módulo.

**Interpretação:** É uma relação host → remote ativa entre o site e o módulo `clientes`, por Module Federation em runtime, com SSR delegado ao módulo no mesmo caminho.

### 69. apps/core/src/shell/shell.service.ts:89, 147; apps/web-shell/src/entry-server.tsx:79-80; apps/web-shell/src/islands.ts:54, 65-67, 90; apps/core/src/registry/registry.service.ts:403; modules/ejemplo-web/vite.config.ts:11-21; modules/ejemplo-web/server.mjs:24, 42-48

**Observação:** O core casa a rota pública, executa o render do web-shell e passa o descritor da ilha; o shell escreve o placeholder com `data-likekiri-island` e `data-remote`, e o runtime de ilhas registra o remote e carrega `ejemplo-web/<exposto>`. A rota é `ssr: 'shell'`: o shell escreve só o placeholder, e a ilha é montada no cliente. O destino é `ejemplo-web`, pelo `MODULE_ID` e pelas rotas `web` do manifesto do módulo.

**Interpretação:** É uma relação host → remote ativa entre o site e o módulo `ejemplo-web`, por Module Federation em runtime.

### 70. apps/core/src/shell/shell.service.ts:89, 147; apps/web-shell/src/entry-server.tsx:79-80; apps/web-shell/src/islands.ts:54, 65-67, 90; apps/core/src/registry/registry.service.ts:403; modules/hello/vite.config.ts:10-21; modules/hello/server.mjs:23, 41-47

**Observação:** O core casa a rota pública, executa o render do web-shell e passa o descritor da ilha; o shell escreve o placeholder com `data-likekiri-island` e `data-remote`, e o runtime de ilhas registra o remote e carrega `hello/<exposto>`. A rota é `ssr: 'shell'`: o shell escreve só o placeholder, e a ilha é montada no cliente. O destino é `hello`, pelo `MODULE_ID` e pelas rotas `web` do manifesto do módulo.

**Interpretação:** É uma relação host → remote ativa entre o site e o módulo `hello`, por Module Federation em runtime.

### 71. apps/admin-shell/vite.config.ts:4-8; apps/admin-shell/package.json:9; package.json:9; apps/core/src/main.ts:27-32; apps/core/src/shell/shell.service.ts:100-103; infra/systemd/likekiri-core.service:12, 16

**Observação:** Build próprio (`vite build`) com saída `dist` e prefixo `/admin-assets/`. O core serve os estáticos e o `index.html` do painel, e o Caddy de `admin.likekiri.com` manda ao core tudo o que não é `/modules/*`. Não há artefato que publique o painel sozinho. Sem versionamento usado em publicação.

**Interpretação:** O painel tem fronteira de build própria, mas é publicado junto com o core e com o site (build separado, deploy conjunto).

### 72. apps/web-shell/vite.config.ts:8-29; apps/web-shell/package.json:8; package.json:9; apps/core/src/main.ts:21-26; apps/core/src/shell/shell.service.ts:81-87; infra/systemd/likekiri-core.service:12, 16; infra/caddy/likekiri.caddy:9-13

**Observação:** Dois builds próprios, cliente (`dist/client`) e SSR (`dist/server`). O core importa o bundle SSR e serve `dist/client` em `/assets/`. O Caddy serve `/assets/*` de `/srv/likekiri/public`, que nenhum artefato do snapshot preenche. Sem versionamento usado em publicação.

**Interpretação:** O site tem fronteira de build própria, mas é publicado no processo do core (build separado, deploy conjunto).

### 73. modules/chat/vite.config.ts:5-19; modules/chat/package.json:8; infra/systemd/likekiri-module-chat.service:10, 13; modules/chat/server.mjs:37; infra/caddy/likekiri.caddy:28-30, 69-71

**Observação:** Build federado próprio, com saída `dist`. Unidade systemd própria roda o `server.mjs` do módulo, que serve o `dist` em `127.0.0.1:4009`, e o Caddy dá ao módulo rota própria `/modules/chat/*` em likekiri.com e admin.likekiri.com. O checkout `/srv/likekiri/app` é o mesmo de todas as unidades. A versão do manifesto (0.1.0) não é usada para publicar.

**Interpretação:** O módulo `chat` tem fronteiras de build e de deploy próprias (build e deploy separados).

### 74. modules/clientes/vite.config.ts:9-46; modules/clientes/package.json:8; infra/systemd/likekiri-module-clientes.service:10, 13; modules/clientes/server.mjs:40, 466; infra/caddy/likekiri.caddy:22-24, 63-65

**Observação:** Build federado próprio, com saída `dist`. Gera também o `dist-ssr`, que o servidor do módulo carrega para responder ao `/render`. Unidade systemd própria roda o `server.mjs` do módulo, que serve o `dist` em `127.0.0.1:4006`, e o Caddy dá ao módulo rota própria `/modules/clientes/*` em likekiri.com e admin.likekiri.com. O checkout `/srv/likekiri/app` é o mesmo de todas as unidades. A versão do manifesto (0.1.0) não é usada para publicar.

**Interpretação:** O módulo `clientes` tem fronteiras de build e de deploy próprias (build e deploy separados).

### 75. modules/cuentas/vite.config.ts:5-29; modules/cuentas/package.json:8; infra/systemd/likekiri-module-cuentas.service:10, 12; modules/cuentas/server.mjs:22; infra/caddy/likekiri.caddy:51-53

**Observação:** Build federado próprio, com saída `dist`. Unidade systemd própria roda o `server.mjs` do módulo, que serve o `dist` em `127.0.0.1:4002`, e o Caddy dá ao módulo rota própria `/modules/cuentas/*` em admin.likekiri.com. O checkout `/srv/likekiri/app` é o mesmo de todas as unidades. A versão do manifesto (0.1.0) não é usada para publicar.

**Interpretação:** O módulo `cuentas` tem fronteiras de build e de deploy próprias (build e deploy separados).

### 76. modules/ejemplo-admin/vite.config.ts:7-30; modules/ejemplo-admin/package.json:8; infra/systemd/likekiri-module-ejemplo-admin.service:10, 12; modules/ejemplo-admin/server.mjs:23; infra/caddy/likekiri.caddy:57-59

**Observação:** Build federado próprio, com saída `dist`. Unidade systemd própria roda o `server.mjs` do módulo, que serve o `dist` em `127.0.0.1:4005`, e o Caddy dá ao módulo rota própria `/modules/ejemplo-admin/*` em admin.likekiri.com. O checkout `/srv/likekiri/app` é o mesmo de todas as unidades. A versão do manifesto (0.1.0) não é usada para publicar.

**Interpretação:** O módulo `ejemplo-admin` tem fronteiras de build e de deploy próprias (build e deploy separados).

### 77. modules/ejemplo-web/vite.config.ts:8-30; modules/ejemplo-web/package.json:8; infra/systemd/likekiri-module-ejemplo-web.service:10, 12; modules/ejemplo-web/server.mjs:23; infra/caddy/likekiri.caddy:19-21

**Observação:** Build federado próprio, com saída `dist`. Unidade systemd própria roda o `server.mjs` do módulo, que serve o `dist` em `127.0.0.1:4004`, e o Caddy dá ao módulo rota própria `/modules/ejemplo-web/*` em likekiri.com. O checkout `/srv/likekiri/app` é o mesmo de todas as unidades. A versão do manifesto (0.1.0) não é usada para publicar.

**Interpretação:** O módulo `ejemplo-web` tem fronteiras de build e de deploy próprias (build e deploy separados).

### 78. modules/hello/vite.config.ts:7-32; modules/hello/package.json:8; infra/systemd/likekiri-module-hello.service:10, 12; modules/hello/server.mjs:22, 98-113; infra/caddy/likekiri.caddy:16-18

**Observação:** Build federado próprio, com saída `dist`. Unidade systemd própria roda o `server.mjs` do módulo, que serve o `dist` em `127.0.0.1:4001`, e o Caddy dá ao módulo rota própria `/modules/hello/*` em likekiri.com. O checkout `/srv/likekiri/app` é o mesmo de todas as unidades. A versão do manifesto (0.1.0) não é usada para publicar.

**Interpretação:** O módulo `hello` tem fronteiras de build e de deploy próprias (build e deploy separados).

### 79. modules/media/vite.config.ts:5-27; modules/media/package.json:8; infra/systemd/likekiri-module-media.service:10, 13; modules/media/server.mjs:28; infra/caddy/likekiri.caddy:25-27, 66-68

**Observação:** Build federado próprio, com saída `dist`. Unidade systemd própria roda o `server.mjs` do módulo, que serve o `dist` em `127.0.0.1:4008`, e o Caddy dá ao módulo rota própria `/modules/media/*` em likekiri.com e admin.likekiri.com. O checkout `/srv/likekiri/app` é o mesmo de todas as unidades. A versão do manifesto (0.1.0) não é usada para publicar.

**Interpretação:** O módulo `media` tem fronteiras de build e de deploy próprias (build e deploy separados).

### 80. modules/ops/vite.config.ts:5-16; modules/ops/package.json:7; infra/systemd/likekiri-module-ops.service:10, 12; modules/ops/server.mjs:31; infra/caddy/likekiri.caddy:72-74

**Observação:** Build federado próprio, com saída `dist`. Unidade systemd própria roda o `server.mjs` do módulo, que serve o `dist` em `127.0.0.1:4010`, e o Caddy dá ao módulo rota própria `/modules/ops/*` em admin.likekiri.com. O checkout `/srv/likekiri/app` é o mesmo de todas as unidades. A versão do manifesto (0.1.0) não é usada para publicar.

**Interpretação:** O módulo `ops` tem fronteiras de build e de deploy próprias (build e deploy separados).

### 81. modules/registry/vite.config.ts:5-27; modules/registry/package.json:8; infra/systemd/likekiri-module-registry.service:10, 12; modules/registry/server.mjs:22; infra/caddy/likekiri.caddy:54-56

**Observação:** Build federado próprio, com saída `dist`. Unidade systemd própria roda o `server.mjs` do módulo, que serve o `dist` em `127.0.0.1:4003`, e o Caddy dá ao módulo rota própria `/modules/registry/*` em admin.likekiri.com. O checkout `/srv/likekiri/app` é o mesmo de todas as unidades. A versão do manifesto (0.1.0) não é usada para publicar.

**Interpretação:** O módulo `registry` tem fronteiras de build e de deploy próprias (build e deploy separados).

### 82. modules/sitio/vite.config.ts:5-27; modules/sitio/package.json:8; infra/systemd/likekiri-module-sitio.service:10, 12; modules/sitio/server.mjs:22; infra/caddy/likekiri.caddy:60-62

**Observação:** Build federado próprio, com saída `dist`. Unidade systemd própria roda o `server.mjs` do módulo, que serve o `dist` em `127.0.0.1:4007`, e o Caddy dá ao módulo rota própria `/modules/sitio/*` em admin.likekiri.com. O checkout `/srv/likekiri/app` é o mesmo de todas as unidades. A versão do manifesto (0.1.0) não é usada para publicar.

**Interpretação:** O módulo `sitio` tem fronteiras de build e de deploy próprias (build e deploy separados).

### 83. CLAUDE.md:3-5

**Observação:** "Plataforma modular (microkernel híbrido): core NestJS que no conoce ningún dominio de negocio, módulos independientes que publican manifest + bundle federado, `likekiri.com` (shell SSR + islas) y `admin.likekiri.com` (SPA CSR)."

**Interpretação:** Apresenta a organização das unidades: um core sem domínio, módulos que publicam manifesto e bundle federado, e as duas superfícies. A afirmação é corroborada.

### 84. CLAUDE.md:10-11

**Observação:** "**El core nunca importa un módulo.** `grep -rn \"modules/\" apps/core/src` debe devolver vacío. Los módulos entran solo por manifest validado."

**Interpretação:** Diz que os módulos se ligam à plataforma só pelo manifesto que o core valida, sem import no core. A afirmação é corroborada.

### 85. CLAUDE.md:12-13

**Observação:** "`packages/contract` es el contrato módulo↔core."

**Interpretação:** Situa a biblioteca do contrato entre módulos e core. A afirmação é corroborada.

### 86. CLAUDE.md:25-26

**Observação:** "`apps/core` — NestJS: API, registry, auth, SSR del shell." […] "`apps/web-shell` — React shell del website público (SSR en core + hidratación)."

**Interpretação:** Descreve o shell do site como unidade renderizada no core e hidratada no cliente. A afirmação é corroborada.

### 87. CLAUDE.md:27-29

**Observação:** "`apps/admin-shell` — shell de la SPA de admin: login, aceptar invitación y cargador de micro-frontends. SIN pantallas de negocio: el sidebar se construye 100% desde el manifest (ADR 005)."

**Interpretação:** Descreve o painel como carregador de micro-frontends, cujas telas de negócio vêm dos módulos. A afirmação é corroborada.

### 88. CLAUDE.md:31-32

**Observação:** "`modules/cuentas` — usuarios, invitaciones y contraseña (submenú \"Cuentas\")." "`modules/registry` — vista del registry (submenú \"Plataforma\", modo toggle)."

**Interpretação:** Situa `cuentas` e `registry` como módulos do painel. A afirmação é corroborada.

### 89. CLAUDE.md:33-34

**Observação:** "`modules/ejemplo-web` / `modules/ejemplo-admin` — PLANTILLAS comentadas para crear módulos nuevos (una por superficie)"

**Interpretação:** Situa os dois módulos-modelo, um por superfície. A afirmação é corroborada.

### 90. CLAUDE.md:35-37

**Observação:** "`modules/clientes` — módulo con DOMINIO PROPIO (API + SQLite): registro y portal de clientes en el front […], cuentas/planes/facturación en el admin."

**Interpretação:** Situa `clientes` como módulo com telas nas duas superfícies. A afirmação é corroborada.

### 91. CLAUDE.md:38-39

**Observação:** "`modules/sitio` — server-driven UI: edita la estructura del sitio público (anuncio, menú, pie) que el core inyecta en cada render del SSR (ADR 006)."

**Interpretação:** Diz que uma tela de módulo no painel edita a estrutura que o shell do site desenha. A afirmação é corroborada.

### 92. CLAUDE.md:41

**Observação:** "`modules/chat` — chat en vivo por WebSocket (widget global + panel de agente)."

**Interpretação:** Situa o chat nas duas superfícies, como widget no site e painel no admin. A afirmação é corroborada.

### 93. CLAUDE.md:43

**Observação:** "`packages/tokens` — design tokens compartidos."

**Interpretação:** Situa uma biblioteca compartilhada. A afirmação é corroborada.

### 94. CLAUDE.md:44

**Observação:** "`infra/` — plantillas de Caddy, systemd y docker-compose (dev)."

**Interpretação:** Descreve a pasta de modelos de infraestrutura. A afirmação é corroborada.

### 95. README.md:35-37

**Observação:** "Si un módulo se cae o se borra de la configuración, el resto de la plataforma sigue funcionando."

**Interpretação:** Afirma a independência dos módulos em operação. O código sustenta o isolamento de falhas, não uma execução observada. A afirmação é corroborada.

### 96. README.md:40-50

**Observação:** diagrama: "Caddy (único punto de entrada externo, TLS, proxy)" → "likekiri.com / www", "admin.likekiri.com", "/modules/<id>/* (por host)" → "apps/core"

**Interpretação:** Põe os caminhos `/modules/<id>/*` atrás do core, mas o Caddy os manda direto à porta de cada módulo. A afirmação é contradita.

### 97. README.md:54-59

**Observação:** diagrama: "apps/core" → "import() dinámico" → "apps/web-shell (SSR + islas)", "apps/admin-shell (SPA, sidebar generado desde el manifest)"

**Interpretação:** Diz que o core carrega os dois shells por `import()`; vale para o web-shell, mas o painel é servido como `index.html` e estáticos. A afirmação é contradita.

### 98. README.md:54-59

**Observação:** diagrama: "apps/core" → "fetch HTTP firmado HMAC" → "modules/<id> (proceso propio) manifest + remoteEntry.js + server.mjs + DB propia (opcional)"

**Interpretação:** Descreve cada módulo como processo próprio que o core consulta por HTTP assinado. A afirmação é corroborada.

### 99. README.md:64-65

**Observação:** "Caddy reenvía la petición al core (`127.0.0.1:3000`), salvo los estáticos federados bajo `/modules/<id>/*`, que van directo al proceso del módulo."

**Interpretação:** A parte dos módulos confere, mas no site há outra exceção: `/assets/*` é servido pelo Caddy do disco. A afirmação é contradita.

### 100. README.md:69-70

**Observação:** "Para `web`, el core resuelve el path contra el **registry** de módulos (rutas + páginas propias del shell) y arma un `RenderRequest`."

**Interpretação:** Descreve como o core escolhe o módulo de cada página do site. A afirmação é corroborada.

### 101. README.md:71-73

**Observação:** "El core carga dinámicamente (`import()` ESM, ya que el propio core es CommonJS) el bundle SSR de `apps/web-shell` (`dist/server/entry-server.js`) y hace streaming del HTML (`renderToPipeableStream`)"

**Interpretação:** Descreve a carga do bundle SSR do shell pelo core. A afirmação é corroborada.

### 102. README.md:74-77

**Observação:** "Si la ruta del módulo declara `ssr: \"server\"` (ADR 007), el core pide el HTML ya renderizado al propio módulo (`POST /render`, firmado, timeout de 400 ms) y lo incrusta con `data-hydrate=\"1\"`. Si el módulo no responde a tiempo, degrada automáticamente a un placeholder de isla"

**Interpretação:** Descreve o SSR delegado ao módulo e a degradação para placeholder. A afirmação é corroborada.

### 103. README.md:78-80

**Observação:** "En el cliente, `islands.ts` escanea los `[data-likekiri-island]`, inicializa Module Federation (React/ReactDOM compartidos como singleton) y monta o hidrata cada isla. Si una isla falla, solo se rompe su propio hueco."

**Interpretação:** Descreve o runtime de ilhas que carrega os módulos no site. A afirmação é corroborada.

### 104. README.md:87-90

**Observação:** "Al navegar a una ruta de módulo, `federation.ts` carga el componente remoto vía `@module-federation/runtime` (`loadRemote`) y lo monta con los `:params` de la URL como props."

**Interpretação:** Descreve a carga dos módulos no painel. A afirmação é corroborada.

### 105. README.md:94-95

**Observação:** "Lee `config/modules.json` (`{ moduleId, baseUrl, hmacKey }` por módulo, sin claves duplicadas ni compartidas)."

**Interpretação:** Descreve o registro de módulos que o core lê. O arquivo real está fora do snapshot; o formato confere com o exemplo e com o código. A afirmação é corroborada.

### 106. README.md:96-98

**Observação:** "Cada `REGISTRY_REFRESH_MINUTES` (por defecto 5) sincroniza con todos los módulos: `GET /.well-known/module-manifest` firmado, verifica la firma de la respuesta y valida el manifest"

**Interpretação:** Descreve como o core obtém os manifestos dos módulos. A afirmação é corroborada.

### 107. README.md:101-102

**Observação:** "Compila tablas de rutas para `web` y `admin`; ante colisión de ruta, **gana el primer módulo en registrarla** y el manifest en conflicto se rechaza entero."

**Interpretação:** Descreve como o core reparte as rotas entre os módulos por superfície. A afirmação é corroborada.

### 108. README.md:117-118

**Observação:** "`widget: true` en una ruta la convierte en isla flotante global, visible en todas las páginas del sitio (usado por el chat, ADR 008)."

**Interpretação:** Descreve como o chat entra em toda página do site. A afirmação é corroborada.

### 109. README.md:136

**Observação:** "pnpm 11.20.0 (workspaces puros — sin Turborepo ni Nx)"

**Interpretação:** Nomeia a ferramenta do monorepo. A afirmação é corroborada.

### 110. README.md:142

**Observação:** "Frontend (shells y módulos) \| React 19 + Vite 8"

**Interpretação:** Nomeia o framework e o build das unidades. A afirmação é corroborada.

### 111. README.md:143

**Observação:** "Federación de módulos \| `@module-federation/vite` (build) y `@module-federation/runtime` (carga en cliente)"

**Interpretação:** Nomeia a tecnologia de federação, no build e no cliente. A afirmação é corroborada.

### 112. README.md:149

**Observação:** "Proceso en producción \| systemd nativo, sin Docker (Docker solo para Postgres en desarrollo)"

**Interpretação:** Descreve como os processos rodam em produção. A afirmação é corroborada.

### 113. README.md:151-152

**Observação:** "No hay ESLint, Prettier ni CI (`.github/workflows`) configurados actualmente en el repo"

**Interpretação:** Descreve a ausência de CI. A afirmação é corroborada.

**Nota:** A 3.4.7 a corrobora pela Leitura da 3.4.6 ("Não há CI"), que não tem observação própria; por isso a linha fica sem alvo.

### 114. README.md:172

**Observação:** "`ops/` Admin-only: respaldo de base de datos y commit/push a git"

**Interpretação:** Situa `ops` só no painel. A afirmação é corroborada.

### 115. README.md:176

**Observação:** "`i18n/` Strings ES/EN compartidos por ambos shells"

**Interpretação:** Situa uma biblioteca compartilhada pelos shells. A afirmação é corroborada.

### 116. README.md:179

**Observação:** "`systemd/` Una unit file por proceso (core + cada módulo desplegable)"

**Interpretação:** Diz que cada módulo é publicado em processo próprio. A afirmação é corroborada.

### 117. README.md:244-245

**Observação:** "El `web-shell` no tiene servidor de desarrollo propio: su SSR se sirve a través del core, que carga el bundle construido"

**Interpretação:** Diz que o shell do site não roda sem o core. A afirmação é corroborada.

### 118. README.md:326

**Observação:** "deploy vía rsync + systemd" (ADR 004).

**Interpretação:** A parte do systemd confere; não há artefato de rsync no snapshot. A afirmação é parcial.

### 119. apps/admin-shell/src/federation.ts:11-12

**Observação:** "El host APORTA su React a los remotos (singleton)."

**Interpretação:** Descreve o compartilhamento do React entre o host e os remotes. A afirmação é corroborada.

### 120. apps/admin-shell/vite.config.ts:6

**Observação:** "Prefijo propio para no colisionar con /assets del web-shell en el core."

**Interpretação:** Indica que os dois shells são servidos pelo mesmo core. A afirmação é corroborada.

### 121. apps/web-shell/src/entry-server.tsx:13-15

**Observação:** "El core hace SSR únicamente del shell; los componentes remotos se emiten como placeholders de isla que el cliente carga vía Module Federation e hidrata."

**Interpretação:** Descreve a divisão entre o SSR do shell e a carga dos módulos no cliente; o HTML delegado vem do servidor do módulo, não do core. A afirmação é corroborada.

### 122. apps/web-shell/src/entry-server.tsx:179-180

**Observação:** "El runtime de islas solo se envía cuando la página tiene islas: las páginas estáticas del shell viajan sin JavaScript."

**Interpretação:** Descreve quando o runtime de ilhas vai para o cliente. A afirmação é corroborada.

### 123. apps/web-shell/vite.config.ts:4-7

**Observação:** "Dos builds: cliente: solo el runtime de islas (islands.js con nombre fijo, referenciado por bootstrapModules del SSR como /assets/islands.js); servidor: entry-server.tsx para el SSR del shell desde el core"

**Interpretação:** Descreve os dois builds do shell do site. A afirmação é corroborada.

### 124. docs/adr/004-ssr-islas-auth-y-despliegue.md:11-14

**Observação:** "Las islas NO se renderizan en servidor: el SSR emite un placeholder `data-likekiri-island` + `data-props` […] y el runtime cliente (`islands.js`) las monta con `@module-federation/runtime`."

**Interpretação:** O placeholder e a montagem conferem, mas as ilhas de `clientes` são renderizadas no servidor do módulo. A afirmação é contradita.

### 125. docs/adr/004-ssr-islas-auth-y-despliegue.md:44-45

**Observação:** "`/srv/likekiri/public/assets` = assets cliente del web-shell servidos directo por Caddy."

**Interpretação:** O Caddy serve `/assets/*` desse diretório, mas nada no snapshot copia para lá os assets do web-shell. A afirmação é parcial.

### 126. docs/adr/005-admin-por-modulos-y-submenus.md:65-67

**Observação:** "Los estáticos federados de módulos de admin se sirven por el mismo origen (`https://admin.likekiri.com/modules/<id>/` vía handle_path de Caddy), sin CORS. Los de web siguen en `https://likekiri.com/modules/<id>/`."

**Interpretação:** Vale para os módulos só de admin, mas o `hello`, que tem página no painel, só tem rota em `likekiri.com`. A afirmação é contradita.

### 127. docs/adr/005-admin-por-modulos-y-submenus.md:70-72

**Observação:** "Las pantallas de módulos usan las clases CSS del shell (panel, chip, boton…) además de los design tokens; ese acoplamiento estético está asumido y documentado en los README de los módulos."

**Interpretação:** Registra um acoplamento de estilo entre os módulos e o shell do painel. A afirmação é corroborada.

### 128. docs/adr/006-server-driven-shell-y-tipo-de-cuenta.md:31-32

**Observação:** "Circuito verificado en producción: fila en `ShellSetting` → siguiente render muestra anuncio y menú modificados; sin fila → defaults."

**Interpretação:** Afirma uma verificação em produção da configuração do site, que nenhum artefato registra. A afirmação fica sem corroboração.

### 129. docs/adr/007-ssr-delegado-al-modulo.md:20-23

**Observação:** "El módulo construye un bundle SSR aparte (`vite build --ssr`, sin federación) y su `server.mjs` expone `POST /render` → `renderToString` del componente pedido. La petición del core llega **firmada con la clave HMAC del módulo** y el módulo la verifica."

**Interpretação:** Descreve o lado do módulo no SSR delegado. A afirmação é corroborada.

### 130. docs/adr/007-ssr-delegado-al-modulo.md:31-33

**Observação:** "Verificado en producción: `/clientes/acceso` entrega el formulario completo en el HTML inicial sin ejecutar JS; con el servicio del módulo detenido, la misma URL responde 200 con el placeholder y la isla se monta en cliente."

**Interpretação:** Afirma uma verificação em produção do SSR delegado e da degradação, que nenhum artefato registra. A afirmação fica sem corroboração.

### 131. docs/adr/007-ssr-delegado-al-modulo.md:52-53

**Observação:** "Sin contexto React compartido a través de la frontera: las islas son autocontenidas por diseño."

**Interpretação:** Descreve a fronteira entre o shell e as ilhas dos módulos. A afirmação é corroborada.

### 132. docs/adr/007-ssr-delegado-al-modulo.md:54-55

**Observação:** "`modules/clientes` es el primer caso (registro, acceso y portal); `hello` y `ejemplo-web` permanecen en `\"shell\"` como referencia del modo básico."

**Interpretação:** Diz qual módulo usa o SSR delegado e quais usam o modo básico. A afirmação é corroborada.

### 133. docs/adr/008-chat-websocket-y-widgets-globales.md:29-30

**Observação:** "Verificado `wss://likekiri.com/modules/chat/ws` de punta a punta con TLS."

**Interpretação:** Afirma uma verificação em produção do WebSocket do chat, que nenhum artefato registra. A afirmação fica sem corroboração.

### 134. docs/como-integrar-un-modulo.md:8-9

**Observação:** "Otros ejemplos vivos: `modules/hello` (web + admin), `modules/cuentas` (admin con permisos consumidos), `modules/registry` (admin)."

**Interpretação:** Situa três módulos nas superfícies. A afirmação é corroborada.

### 135. docs/como-integrar-un-modulo.md:67-69

**Observação:** "El nombre expuesto (sin `./`) debe coincidir con el **nombre del export** del archivo […]. Los shells buscan `mod['MiPagina'] ?? mod.default`."

**Interpretação:** Descreve a convenção entre o nome exposto e o export que os shells procuram. A afirmação é corroborada.

### 136. docs/como-integrar-un-modulo.md:162-165

**Observação:** "**Ruta** con `surface: \"web\"` y `ssr: \"shell\"` (único modo hoy): el core renderiza en servidor el layout […] y emite tu isla como placeholder"

**Interpretação:** O modo `shell` confere, mas não é o único: `clientes` usa `ssr: 'server'`. A afirmação é contradita.

### 137. docs/como-integrar-un-modulo.md:208-210

**Observação:** "La API vive en el server del módulo, expuesta por Caddy bajo `/modules/<id>/api/...` en los orígenes que la necesiten — misma ruta relativa desde el front y desde el admin, sin CORS."

**Interpretação:** Descreve onde fica e como é exposta a API de backend de um módulo. A afirmação é corroborada.

### 138. docs/como-integrar-un-modulo.md:235-236

**Observação:** "`modules/ejemplo-web` (isla web comentada, en producción en `/ejemplo-web/demo`)"

**Interpretação:** Afirma que o módulo-modelo está publicado em produção, o que nenhum artefato mostra. A afirmação fica sem corroboração.

### 139. docs/design/design-system.md:17-19

**Observação:** "Las variables `--lk-*` actuales las consumen `admin-shell` y 9 archivos de módulos (`chat`, `clientes`, `cuentas`, `media`, `ops`, `ejemplo-web`)."

**Interpretação:** Descreve o uso das variáveis de design compartilhadas. A afirmação é corroborada.

### 140. modules/cuentas/README.md:17-19

**Observação:** "Sus pantallas hablan con las APIs del core (`/api/admin/*`, `/api/auth/*`) por el mismo origen"

**Interpretação:** Descreve a chamada das telas de um módulo às APIs do backend. A afirmação é corroborada.

### 141. modules/ejemplo-admin/README.md:16-17

**Observação:** "**Llamadas a la API del core** por el mismo origen (`/api/health` en PanelPage)"

**Interpretação:** Descreve a chamada de uma tela de módulo à API do backend. A afirmação é corroborada.

### 142. modules/ejemplo-admin/README.md:18-19

**Observação:** "Dos páginas expuestas desde un mismo remoteEntry (`./PanelPage`, `./AjustesPage`)."

**Interpretação:** Descreve os módulos expostos por um remote. A afirmação é corroborada.

### 143. modules/ejemplo-admin/vite.config.ts:5-6

**Observação:** "name = moduleId; cada expose es una página que la SPA monta cuando la ruta del manifest coincide."

**Interpretação:** Liga o nome da federação ao `moduleId` e as exposições às páginas que o painel monta. A afirmação é corroborada.

### 144. modules/ejemplo-web/README.md:18-19

**Observação:** "**Un módulo web no registra menú**: el header del sitio público es estático; `menu: []`."

**Interpretação:** A parte do menu confere, mas o header do site é desenhado a cada render pela configuração que o `sitio` edita. A afirmação é contradita.

### 145. modules/ejemplo-web/package.json:5

**Observação:** "Módulo de ejemplo de la superficie web: isla SSR + hidratación"

**Interpretação:** A ilha do `ejemplo-web` é montada só no cliente; o SSR é do layout. A afirmação é contradita.

### 146. modules/hello/README.md:9-12

**Observação:** "**Componentes React federados** (`vite.config.ts` + `@module-federation/vite`): el build produce `dist/remoteEntry.js`, que expone `./HelloIsland` y `./HelloAdminPage`. Los shells los cargan en runtime; el core jamás importa este código."

**Interpretação:** Descreve o `hello` como remote carregado pelos dois shells. A afirmação é corroborada.

### 147. modules/media/README.md:3-6

**Observação:** "Biblioteca de archivos del admin […]. Módulo independiente con API y almacenamiento propios (SQLite + disco), como `clientes`."

**Interpretação:** Situa o `media` como módulo independente do painel. A afirmação é corroborada.

### 148. modules/media/README.md:17-18

**Observação:** "**Servir**: `https://likekiri.com/modules/media/files/<id>.<ext>` (también por el origen del admin)"

**Interpretação:** Descreve onde o backend do módulo serve os arquivos enviados. A afirmação é corroborada.

### 149. modules/registry/README.md:14-15

**Observação:** "Consume la API del core `/api/admin/registry`"

**Interpretação:** Descreve a chamada de uma tela de módulo à API do backend. A afirmação é corroborada.

### 150. b8e9bb8 2026-08-09 (modules/hello); 538ba5d 2026-08-09 (modules/cuentas); 74aa201 2026-08-09 (modules/registry); ff12015 2026-08-09 (modules/ejemplo-web); d1c8ed8 2026-08-09 (modules/ejemplo-admin); b30a632 2026-08-09 (modules/clientes); e4ac6f6 2026-08-09 (modules/sitio); afbd254 2026-08-09 (modules/media); 2777b37 2026-08-09 (modules/chat); 5d7e591 2026-08-10 (modules/ops)

**Observação:** Cada módulo é criado por um commit que traz `src/index.ts`, `vite.config.ts` e `server.mjs` (o `hello` em dois passos). Os dez `src/index.ts` não mudam depois, e nenhum commit cria ou remove `index.html` ou `main.tsx` em `modules/`.

**Interpretação:** Os módulos nasceram como remotes e nunca tiveram entrada que iniciasse a UI sozinha; o `Undetermined` da estrutura não é resto de um estágio abandonado. O ponto foi esclarecido, sem mudar o valor da 3.4.3.

### 151. config/modules.example.json:3-7; .gitignore:12; apps/core/src/registry/registry-config.ts:3-7 (resolvido pelo snapshot)

**Observação:** O `config/modules.json` real, com as chaves HMAC, está no `.gitignore`, e o código do core diz que só o exemplo é versionado. O histórico não foi consultado.

**Interpretação:** O registro de exemplo é um modelo, não uma configuração ativa ou abandonada. O snapshot resolve o ponto.

### 152. 44bf4ff 2026-08-09 (apps/core/src/main.ts); 5d7e591 2026-08-10 (infra/caddy/likekiri.caddy); ac38c35 2026-08-10 (apps/core/src/shell/shell.service.ts); 4b8c5fd 2026-08-16 (README.md)

**Observação:** O `README.md` só aparece no commit do snapshot, seis dias depois das últimas mudanças do Caddy e do core. A versão do Caddy de `5d7e591` já é a do snapshot; as versões anteriores do Caddy e do `shell.service.ts` não estão disponíveis no clone.

**Interpretação:** As divergências do README não vêm de mudanças versionadas depois dele. O ponto foi esclarecido; as afirmações continuam contraditas.

### 153. c80dbce 2026-08-09 (infra); 27ebeba 2026-08-09 (docs/adr/004-ssr-islas-auth-y-despliegue.md); ccf3467 2026-08-09 (docs/adr/004-ssr-islas-auth-y-despliegue.md)

**Observação:** O ADR 004 muda só em `ccf3467`, cuja versão é a do snapshot. `infra/` recebe só unidades systemd, o Caddy e `infra/ops/`, e nenhum arquivo é removido de `infra/`, `docs/`, `config/`, `packages/`, `modules/` nem da raiz.

**Interpretação:** Nunca houve no repositório um script de rsync ou de cópia dos assets; a cópia descrita é feita fora dele. O ponto foi esclarecido.

### 154. ccf3467 2026-08-09 (docs/adr/004-ssr-islas-auth-y-despliegue.md); ae539bf 2026-08-09 (docs/como-integrar-un-modulo.md); ae16de2 2026-08-09 (packages/contract); c290788 2026-08-09 (apps/core); 8cc44af 2026-08-09 (apps/web-shell); 8ffb581 2026-08-09 (modules/clientes); 07c85d0 2026-08-09 (docs/adr/007-ssr-delegado-al-modulo.md)

**Observação:** As últimas versões do ADR 004 e do guia, iguais às do snapshot, vêm antes de `ae16de2`, que anuncia o modo `ssr` `'server'`, e da série que o implementa e documenta.

**Interpretação:** As duas frases foram escritas antes do SSR delegado e não foram atualizadas. O ponto foi esclarecido.

### 155. b8e9bb8 2026-08-09 (modules/hello); ae30ea2 2026-08-09 (infra/caddy/likekiri.caddy; modules/hello/server.mjs); f529e9b 2026-08-09 (infra/caddy/likekiri.caddy); 4334294 2026-08-09 (docs/adr/005-admin-por-modulos-y-submenus.md); 5d7e591 2026-08-10 (infra/caddy/likekiri.caddy)

**Observação:** O `HelloAdminPage.tsx` existe desde o esqueleto do módulo, e o ADR 005 é escrito depois e não muda. Todas as versões do Caddy anteriores a `5d7e591` e a do `server.mjs` do `hello` em `ae30ea2` falharam por objeto ausente.

**Interpretação:** O histórico não mostra se o domínio do painel já teve rota para o `hello`. O ponto é inconclusivo, mas a dúvida é só sobre o passado: no snapshot, o Caddy não dá essa rota.

### 156. ff12015 2026-08-09 (modules/ejemplo-web/README.md); 7e19810 2026-08-09 (apps/core/src/shell/shell.service.ts); ccafe11 2026-08-09; e4ac6f6 2026-08-09 (modules/sitio)

**Observação:** O README do `ejemplo-web` é criado em `ff12015`, já com a frase, e não muda. Depois vêm os commits que tornam o header configurável pelo back e criam o `sitio`.

**Interpretação:** A frase do header "estático" é de um estágio anterior e não foi atualizada. O ponto foi esclarecido.

### 157. ff12015 2026-08-09 (modules/ejemplo-web/package.json); ae16de2 2026-08-09 (packages/contract)

**Observação:** O `package.json` do `ejemplo-web` é criado em `ff12015`, já com a `description`, e não muda. O módulo nasce antes de `ae16de2`, que anuncia o modo `ssr` `'server'`.

**Interpretação:** A "isla SSR" não é resto de um estágio com SSR delegado, que é posterior. O ponto foi esclarecido; a afirmação continua contradita.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/admin-shell/package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #24; declara #25; declara #26; declara #27 |
| 2 | 3.4.2 (apps/web-shell/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #30; declara #31 |
| 3 | 3.4.2 (modules/chat/package.json:19) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #13 |
| 4 | 3.4.2 (modules/clientes/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #14 |
| 5 | 3.4.2 (modules/cuentas/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #15 |
| 6 | 3.4.2 (modules/ejemplo-admin/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #16 |
| 7 | 3.4.2 (modules/ejemplo-web/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #17 |
| 8 | 3.4.2 (modules/hello/package.json:17) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #18 |
| 9 | 3.4.2 (modules/media/package.json:19) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #19 |
| 10 | 3.4.2 (modules/ops/package.json:10) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #20 |
| 11 | 3.4.2 (modules/registry/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #21 |
| 12 | 3.4.2 (modules/sitio/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #22 |
| 13 | 3.4.2 (modules/chat/package.json:19, Evidência); 3.4.3 (modules/chat, Marcadores e Build); 3.4.5 #1, #10 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #21, #37 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #45; configura #58; configura #67 |
| 14 | 3.4.2 (modules/clientes/package.json:18, Evidência); 3.4.3 (modules/clientes, Marcadores e Build); 3.4.5 #2, #11 (Configuração); 3.4.6 #4 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #46; configura #59; configura #68 |
| 15 | 3.4.2 (modules/cuentas/package.json:18, Evidência); 3.4.3 (modules/cuentas, Marcadores e Build); 3.4.5 #3 (Configuração); 3.4.6 #5 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #47; configura #60 |
| 16 | 3.4.2 (modules/ejemplo-admin/package.json:18, Evidência); 3.4.3 (modules/ejemplo-admin, Marcadores e Build); 3.4.5 #4 (Configuração); 3.4.6 #6 (Artefatos); 3.4.7 #60, #61 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #48; configura #61 |
| 17 | 3.4.2 (modules/ejemplo-web/package.json:18, Evidência); 3.4.3 (modules/ejemplo-web, Marcadores e Build); 3.4.5 #12 (Configuração); 3.4.6 #7 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #49; configura #69 |
| 18 | 3.4.2 (modules/hello/package.json:17, Evidência); 3.4.3 (modules/hello, Marcadores e Build); 3.4.4 (apps/admin-shell/src/federation.ts:44; apps/web-shell/src/islands.ts:54, Observação); 3.4.5 #5, #13 (Configuração); 3.4.6 #8 (Artefatos); 3.4.7 #1, #37, #64 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #50; configura #62; configura #70 |
| 19 | 3.4.2 (modules/media/package.json:19, Evidência); 3.4.3 (modules/media, Marcadores e Build); 3.4.5 #6 (Configuração); 3.4.6 #9 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #51; configura #63 |
| 20 | 3.4.2 (modules/ops/package.json:10, Evidência); 3.4.3 (modules/ops, Marcadores e Build); 3.4.5 #7 (Configuração); 3.4.6 #10 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #52; configura #64 |
| 21 | 3.4.2 (modules/registry/package.json:18, Evidência); 3.4.3 (modules/registry, Marcadores e Build); 3.4.5 #8 (Configuração); 3.4.6 #11 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #53; configura #65 |
| 22 | 3.4.2 (modules/sitio/package.json:18, Evidência); 3.4.3 (modules/sitio, Marcadores e Build); 3.4.5 #9 (Configuração); 3.4.6 #12 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #54; configura #66 |
| 23 | 3.4.4 (config/modules.example.json:4, Arquivo:linha); 3.4.5 #5, #13 (Configuração); 3.4.6 #8 (Onde é servida); 3.4.7 #23 (Evidência) | 2 configuração | configuração | — | arquitetural | fraca | — |
| 24 | 3.4.4 (apps/admin-shell/src/federation.ts:1) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #58; implementa #59; implementa #60; implementa #61; implementa #62; implementa #63; implementa #64; implementa #65; implementa #66 |
| 25 | 3.4.4 (apps/admin-shell/src/federation.ts:40) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #58; implementa #59; implementa #60; implementa #61; implementa #62; implementa #63; implementa #64; implementa #65; implementa #66 |
| 26 | 3.4.4 (apps/admin-shell/src/federation.ts:36) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #58; implementa #59; implementa #60; implementa #61; implementa #62; implementa #63; implementa #64; implementa #65; implementa #66 |
| 27 | 3.4.4 (apps/admin-shell/src/federation.ts:44) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #58; implementa #59; implementa #60; implementa #61; implementa #62; implementa #63; implementa #64; implementa #65; implementa #66 |
| 28 | 3.4.4 (apps/admin-shell/src/views/ModulePage.tsx:48) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #58; implementa #59; implementa #60; implementa #61; implementa #62; implementa #63; implementa #64; implementa #65; implementa #66 |
| 29 | 3.4.4 (apps/admin-shell/src/api.ts:85) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #58; implementa #59; implementa #60; implementa #61; implementa #62; implementa #63; implementa #64; implementa #65; implementa #66 |
| 30 | 3.4.4 (apps/web-shell/src/islands.ts:90) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #67; implementa #68; implementa #69; implementa #70 |
| 31 | 3.4.4 (apps/web-shell/src/islands.ts:54) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #67; implementa #68; implementa #69; implementa #70 |
| 32 | 3.4.4 (apps/web-shell/src/islands.ts:65) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #67; implementa #68; implementa #69; implementa #70 |
| 33 | 3.4.4 (apps/web-shell/src/entry-server.tsx:79) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #67; implementa #68; implementa #69; implementa #70 |
| 34 | 3.4.4 (apps/web-shell/src/entry-server.tsx:96) | 3 código | código-fonte | — | tecnológica | moderada | implementa #68 |
| 35 | 3.4.4 (apps/web-shell/src/entry-server.tsx:57) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #67 |
| 36 | 3.4.4 (apps/core/src/shell/shell.service.ts:89) | 3 código | código-fonte | — | tecnológica | moderada | implementa #67; implementa #68; implementa #69; implementa #70 |
| 37 | 3.4.4 (apps/core/src/shell/shell.service.ts:147) | 3 código | código-fonte | — | tecnológica | moderada | implementa #67; implementa #68; implementa #69; implementa #70 |
| 38 | 3.4.4 (apps/core/src/registry/registry.service.ts:403) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #58; implementa #59; implementa #60; implementa #61; implementa #62; implementa #63; implementa #64; implementa #65; implementa #66; implementa #67; implementa #68; implementa #69; implementa #70 |
| 39 | 3.4.4 (apps/core/src/registry/registry.service.ts:307) | 3 código | código-fonte | — | tecnológica | moderada | implementa #68 |
| 40 | 3.4.4 (config/modules.example.json:4) | 3 código | configuração | — | arquitetural | fraca | — |
| 41 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 42 | 3.4.3 (apps/admin-shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 43 | 3.4.3 (apps/core) | 4 estrutura | diretório | — | contexto | fraca | — |
| 44 | 3.4.3 (apps/web-shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 45 | 3.4.3 (modules/chat) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 46 | 3.4.3 (modules/clientes) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 47 | 3.4.3 (modules/cuentas) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 48 | 3.4.3 (modules/ejemplo-admin) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 49 | 3.4.3 (modules/ejemplo-web) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 50 | 3.4.3 (modules/hello) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 51 | 3.4.3 (modules/media) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 52 | 3.4.3 (modules/ops) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 53 | 3.4.3 (modules/registry) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 54 | 3.4.3 (modules/sitio) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 55 | 3.4.3 (packages/contract) | 4 estrutura | diretório | — | contexto | fraca | — |
| 56 | 3.4.3 (packages/i18n) | 4 estrutura | diretório | — | contexto | fraca | — |
| 57 | 3.4.3 (packages/tokens) | 4 estrutura | diretório | — | contexto | fraca | — |
| 58 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #45 |
| 59 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #46 |
| 60 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #47 |
| 61 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #48 |
| 62 | 3.4.5 #5 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #50 |
| 63 | 3.4.5 #6 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #51 |
| 64 | 3.4.5 #7 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #52 |
| 65 | 3.4.5 #8 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #53 |
| 66 | 3.4.5 #9 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #54 |
| 67 | 3.4.5 #10 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #44; liga #45 |
| 68 | 3.4.5 #11 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #44; liga #46 |
| 69 | 3.4.5 #12 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #44; liga #49 |
| 70 | 3.4.5 #13 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #44; liga #50 |
| 71 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #42 |
| 72 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #44 |
| 73 | 3.4.6 #3 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #45 |
| 74 | 3.4.6 #4 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #46 |
| 75 | 3.4.6 #5 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #47 |
| 76 | 3.4.6 #6 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #48 |
| 77 | 3.4.6 #7 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #49 |
| 78 | 3.4.6 #8 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #50 |
| 79 | 3.4.6 #9 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #51 |
| 80 | 3.4.6 #10 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #52 |
| 81 | 3.4.6 #11 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #53 |
| 82 | 3.4.6 #12 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #54 |
| 83 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #42; corrobora #44; corrobora #18; corrobora modules/hello/server.mjs:122-123 |
| 84 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #38 |
| 85 | 3.4.7 #3 | 7 documentação | documentação | — | contexto | fraca | corrobora #55 |
| 86 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #44; corrobora #36; corrobora #37; corrobora #72; corrobora #32 |
| 87 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #29; corrobora #58; corrobora #59; corrobora #60; corrobora #61; corrobora #62; corrobora #63; corrobora #64; corrobora #65; corrobora #66 |
| 88 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #60; corrobora #65 |
| 89 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #61; corrobora #69 |
| 90 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #59; corrobora #68 |
| 91 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #66; corrobora modules/sitio/src/SitioPage.tsx:22-32; corrobora apps/core/src/shell/shell.service.ts:130-131 |
| 92 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #58; corrobora #67 |
| 93 | 3.4.7 #11 | 7 documentação | documentação | — | contexto | fraca | corrobora #57; corrobora apps/admin-shell/src/styles.ts:1; corrobora apps/web-shell/src/styles.ts:1 |
| 94 | 3.4.7 #12 | 7 documentação | documentação | — | contexto | fraca | corrobora infra/caddy/likekiri.caddy:1-3; corrobora infra/docker-compose.yml:1-3 |
| 95 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #32; corrobora apps/web-shell/src/islands.ts:69-71; corrobora apps/admin-shell/src/views/ModulePage.tsx:29-31 |
| 96 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #73; contradiz #74; contradiz #75; contradiz #76; contradiz #77; contradiz #78; contradiz #79; contradiz #80; contradiz #81; contradiz #82 |
| 97 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #71; contradiz apps/core/src/shell/shell.service.ts:100-106 |
| 98 | 3.4.7 #16 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #38; corrobora #73; corrobora #74; corrobora #75; corrobora #76; corrobora #77; corrobora #78; corrobora #79; corrobora #80; corrobora #81; corrobora #82 |
| 99 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #72; contradiz infra/caddy/likekiri.caddy:9-13 |
| 100 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #67; corrobora #68; corrobora #69; corrobora #70; corrobora apps/core/src/shell/shell.controller.ts:44-53 |
| 101 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #36; corrobora #37 |
| 102 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #39; corrobora #34; corrobora #68 |
| 103 | 3.4.7 #21 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #30; corrobora #31; corrobora #32 |
| 104 | 3.4.7 #22 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #27; corrobora #28 |
| 105 | 3.4.7 #23 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #23; corrobora apps/core/src/registry/registry-config.ts:3-19 |
| 106 | 3.4.7 #24 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #38 |
| 107 | 3.4.7 #25 | 7 documentação | documentação | — | arquitetural | fraca | corrobora apps/core/src/registry/registry.service.ts:466-499 |
| 108 | 3.4.7 #26 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #35; corrobora #67 |
| 109 | 3.4.7 #27 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #41; corrobora pnpm-workspace.yaml:1-4 |
| 110 | 3.4.7 #28 | 7 documentação | documentação | — | tecnológica | fraca | corrobora apps/admin-shell/package.json:15, 24; corrobora modules/hello/package.json:13, 22 |
| 111 | 3.4.7 #29 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4; corrobora #5; corrobora #6; corrobora #7; corrobora #8; corrobora #9; corrobora #10; corrobora #11; corrobora #12; corrobora #13; corrobora #14; corrobora #15; corrobora #16; corrobora #17; corrobora #18; corrobora #19; corrobora #20; corrobora #21; corrobora #22; corrobora #24; corrobora #30 |
| 112 | 3.4.7 #30 | 7 documentação | documentação | — | contexto | fraca | corrobora #78; corrobora infra/docker-compose.yml:1-3 |
| 113 | 3.4.7 #31 | 7 documentação | documentação | — | contexto | fraca | — |
| 114 | 3.4.7 #32 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #64; corrobora #80 |
| 115 | 3.4.7 #33 | 7 documentação | documentação | — | contexto | fraca | corrobora #56; corrobora apps/admin-shell/src/App.tsx:9; corrobora apps/web-shell/src/entry-server.tsx:9 |
| 116 | 3.4.7 #34 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #73; corrobora #74; corrobora #75; corrobora #76; corrobora #77; corrobora #78; corrobora #79; corrobora #80; corrobora #81; corrobora #82 |
| 117 | 3.4.7 #35 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #36; corrobora #72 |
| 118 | 3.4.7 #36 | 7 documentação | documentação | — | contexto | fraca | corrobora em parte #71; corrobora em parte #72 |
| 119 | 3.4.7 #37 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora #26; corrobora #18; corrobora #13 |
| 120 | 3.4.7 #38 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #71; corrobora #72 |
| 121 | 3.4.7 #39 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #33; corrobora #39 |
| 122 | 3.4.7 #40 | 7 documentação | comentário | — | tecnológica | fraca | corrobora apps/web-shell/src/entry-server.tsx:124, 148, 166, 181 |
| 123 | 3.4.7 #41 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #72 |
| 124 | 3.4.7 #42 | 7 documentação | documentação | module-federation | arquitetural | fraca | contradiz #39; contradiz #34; contradiz #68 |
| 125 | 3.4.7 #43 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #72 |
| 126 | 3.4.7 #44 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #78; contradiz #62 |
| 127 | 3.4.7 #45 | 7 documentação | documentação | — | arquitetural | fraca | corrobora apps/admin-shell/src/styles.ts:82, 94; corrobora modules/chat/src/ChatAdminPage.tsx:185, 213, 220; corrobora modules/cuentas/src/UsersPage.tsx:68 |
| 128 | 3.4.7 #46 | 7 documentação | documentação | — | contexto | fraca | — |
| 129 | 3.4.7 #47 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #4; corrobora #74; corrobora modules/clientes/server.mjs:463-466, 1095 |
| 130 | 3.4.7 #48 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 131 | 3.4.7 #49 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #32; corrobora apps/web-shell/src/islands.ts:30-32, 62-67 |
| 132 | 3.4.7 #50 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #68; corrobora #69; corrobora #70 |
| 133 | 3.4.7 #51 | 7 documentação | documentação | — | contexto | fraca | — |
| 134 | 3.4.7 #52 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #60; corrobora #62; corrobora #65; corrobora #70 |
| 135 | 3.4.7 #53 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #27; corrobora #31 |
| 136 | 3.4.7 #54 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #68; contradiz packages/contract/src/manifest.ts:44 |
| 137 | 3.4.7 #55 | 7 documentação | documentação | — | contexto | fraca | corrobora #74; corrobora modules/clientes/src/api.ts:5-9 |
| 138 | 3.4.7 #56 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 139 | 3.4.7 #57 | 7 documentação | documentação | — | contexto | fraca | corrobora apps/admin-shell/src/styles.ts:1, 10; corrobora modules/cuentas/src/UsersPage.tsx:68; corrobora modules/ops/src/OpsAdminPage.tsx:127 |
| 140 | 3.4.7 #58 | 7 documentação | documentação | — | contexto | fraca | corrobora modules/cuentas/src/api.ts:81-97; corrobora apps/core/src/auth/admin.controller.ts:36 |
| 141 | 3.4.7 #59 | 7 documentação | documentação | — | contexto | fraca | corrobora modules/ejemplo-admin/src/PanelPage.tsx:18-23; corrobora apps/core/src/health.controller.ts:8-10 |
| 142 | 3.4.7 #60 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #16; corrobora #61 |
| 143 | 3.4.7 #61 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #16; corrobora #61 |
| 144 | 3.4.7 #62 | 7 documentação | documentação | — | arquitetural | fraca | contradiz apps/web-shell/src/Document.tsx:41-44; contradiz apps/core/src/shell/shell.service.ts:130-131 |
| 145 | 3.4.7 #63 | 7 documentação | comentário | — | tecnológica | fraca | contradiz #69; contradiz apps/web-shell/src/islands.ts:67 |
| 146 | 3.4.7 #64 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #8; corrobora #18; corrobora #62; corrobora #70 |
| 147 | 3.4.7 #65 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #63; corrobora #79 |
| 148 | 3.4.7 #66 | 7 documentação | documentação | — | contexto | fraca | corrobora #79 |
| 149 | 3.4.7 #67 | 7 documentação | documentação | — | contexto | fraca | corrobora modules/registry/src/RegistryPage.tsx:12-13; corrobora apps/core/src/auth/admin.controller.ts:36, 245 |
| 150 | 3.4.8 #1 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #45; explica #46; explica #47; explica #48; explica #49; explica #50; explica #51; explica #52; explica #53; explica #54 |
| 151 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #23; explica #40 |
| 152 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #96; explica #97; explica #99 |
| 153 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #118; explica #125 |
| 154 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #124; explica #136 |
| 155 | 3.4.8 #6 | 8 histórico | histórico | — | arquitetural | fraca | explica #126; explica #78 |
| 156 | 3.4.8 #7 | 8 histórico | histórico | — | arquitetural | fraca | explica #144 |
| 157 | 3.4.8 #8 | 8 histórico | histórico | — | tecnológica | fraca | explica #145 |

## Resumo

Observações: 157. Dimensões (tecnologia: 12, configuração: 11, código: 17, estrutura: 17, composição: 13, build-deploy: 12, documentação: 67, histórico: 8). Força (forte: 13, moderada: 40, fraca: 94, ambígua: 10). Evidência (tecnológica: 47, arquitetural: 90, contexto: 20).
