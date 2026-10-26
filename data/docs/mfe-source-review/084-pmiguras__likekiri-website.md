---
schema: 1
id: 1329274714
full_name: pmiguras/likekiri-website
commit: 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 084 — pmiguras/likekiri-website

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-load-remote | apps/admin-shell/src/federation.ts:1 | apps/admin-shell | remote-resolution | Yes | Importa `init`, `loadRemote` e `registerRemotes` de `@module-federation/runtime`; os três usos estão em apps/admin-shell/src/federation.ts:36, :40 e :44, todos Yes |
| src-load-remote | apps/admin-shell/src/federation.ts:40 | apps/admin-shell | remote-resolution | Yes | `registerRemotes([remote])` registra um módulo remoto já descoberto (`{ name: route.moduleId, entry: route.remoteEntry, type: 'module' }` em apps/admin-shell/src/federation.ts:34) quando o runtime já foi inicializado; `route` vem do manifesto do core (apps/admin-shell/src/api.ts:85) e nomeia um dos `modules/*` (ex.: `hello`, modules/hello/server.mjs:23,34,38) |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | apps/admin-shell/src/federation.ts:36 | apps/admin-shell | remote-resolution | Yes | `init({ name: 'likekiri_admin', remotes: [remote], shared: hostShared })` registra o primeiro remoto do painel e compartilha o React do host (apps/admin-shell/src/federation.ts:13-26); é o outro braço do mesmo `if` de apps/admin-shell/src/federation.ts:35-42, e o padrão `src-load-remote` não casa `init(` |
| manual | apps/admin-shell/src/federation.ts:44 | apps/admin-shell | remote-resolution | Yes | ``loadRemote<Record<string, unknown>>(`${route.moduleId}/${exposed}`)`` (apps/admin-shell/src/federation.ts:44-46) resolve o componente exposto pela outra unidade (`exposed` normalizado em :43, ex.: `hello/HelloAdminPage`, modules/hello/vite.config.ts:11,14-16) e o devolve ao painel; o padrão `src-load-remote` não casou a linha porque a chamada traz parâmetro de tipo
| manual | apps/admin-shell/src/views/ModulePage.tsx:48 | apps/admin-shell | runtime-composition | Yes | `createElement(state.Component, params)` monta no painel o componente carregado da outra unidade; o carregamento é disparado em apps/admin-shell/src/views/ModulePage.tsx:25 (`loadRemoteComponent(route)`, importado em :4) e o `ModulePage` é renderizado pela rota de módulo em apps/admin-shell/src/App.tsx:226 |
| manual | apps/admin-shell/src/api.ts:85 | apps/admin-shell | remote-resolution | Yes | `request<ShellManifest>('/api/shell/manifest?surface=admin')` resolve pelo manifesto do core a tabela de rotas com `moduleId`, `component` e `remoteEntry` de cada módulo (apps/admin-shell/src/api.ts:9-15,37-42); chamado em apps/admin-shell/src/App.tsx:148 e consumido em :214 (`matchModuleRoute(manifest.routes, path)`); não é pego pelos padrões porque usa `fetch` (apps/admin-shell/src/api.ts:54) |
| manual | apps/web-shell/src/islands.ts:90 | apps/web-shell | remote-resolution | Yes | `init({ name: 'likekiri_web', remotes, shared: { react, react-dom } })` registra os remotos coletados dos placeholders de ilha (apps/web-shell/src/islands.ts:80-87, a partir de `data-remote` lido em :28) e aporta o React do host; `boot()` roda no carregamento do bundle (apps/web-shell/src/islands.ts:113), que o SSR injeta como `bootstrapModules` (apps/web-shell/src/entry-server.tsx:181); `init` e `loadRemote` são importados em apps/web-shell/src/islands.ts:1 |
| manual | apps/web-shell/src/islands.ts:54 | apps/web-shell | remote-resolution | Yes | ``loadRemote<Record<string, unknown>>(`${spec.moduleId}/${spec.exposed}`)`` resolve o componente exposto pela outra unidade (ex.: `hello/HelloIsland`, modules/hello/vite.config.ts:11,14-16); o padrão `src-load-remote` não casou a linha porque a chamada traz parâmetro de tipo |
| manual | apps/web-shell/src/islands.ts:65 | apps/web-shell | runtime-composition | Yes | `hydrateRoot(spec.el, element)` monta no buraco da ilha o componente da outra unidade (`element` criado em apps/web-shell/src/islands.ts:62); quando o módulo não pré-renderizou (`data-hydrate` ausente), o mesmo mecanismo monta por `createRoot(spec.el).render(element)` em apps/web-shell/src/islands.ts:67; falha de uma ilha degrada só o seu buraco (:71) |
| manual | apps/web-shell/src/entry-server.tsx:79 | apps/web-shell | host-relationship | Yes | ``'data-likekiri-island': `${island.moduleId}/${island.component}` `` e `'data-remote': island.remoteEntry` (:80) declaram, no HTML do shell, qual módulo ocupa aquele lugar da página e de onde vem o seu bundle; é o contrato que apps/web-shell/src/islands.ts:23-28 lê; o descritor chega do core em apps/core/src/shell/shell.service.ts:138-144 |
| manual | apps/web-shell/src/entry-server.tsx:96 | apps/web-shell | other | Yes | `dangerouslySetInnerHTML={{ __html: island.html as string }}` insere no HTML do shell o markup que o servidor da própria outra unidade pré-renderizou (`html` descrito em apps/web-shell/src/entry-server.tsx:23-27, produzido pelo `/render` do módulo via apps/core/src/registry/registry.service.ts:307-317); composição no servidor, que não cabe em `embedding` nem em `custom-element` |
| manual | apps/web-shell/src/entry-server.tsx:57 | apps/web-shell | host-relationship | Yes | ``data-likekiri-island={`${w.moduleId}/${w.component}`}`` e `data-remote={w.remoteEntry}` (:58) declaram as ilhas flutuantes globais (ex.: chat) que o shell monta em toda página; a lista vem de `registry.webWidgets()` (apps/core/src/registry/registry.service.ts:346-355) pelo render em apps/core/src/shell/shell.controller.ts:53, e `Widgets` é renderizado em apps/web-shell/src/entry-server.tsx:132 |
| manual | apps/core/src/shell/shell.service.ts:89 | — | dynamic-loading | Yes | `import(pathToFileURL(entryPath).href)` carrega em runtime o bundle SSR de outra unidade, o `server/entry-server.js` do web-shell (caminho montado em apps/core/src/shell/shell.service.ts:83-87 a partir de `webDistDir`); o arquivo está em apps/core, julgado `No` pela revisão estrutural, por isso a unidade é `—` |
| manual | apps/core/src/shell/shell.service.ts:147 | — | runtime-composition | Yes | `entry.render(request, { onReady, onError })` executa o render do web-shell no processo do core, passando o descritor da ilha do módulo casado (apps/core/src/shell/shell.service.ts:135-145) e os widgets globais; é o passo de montagem que usa o módulo carregado em apps/core/src/shell/shell.service.ts:89, e é acionado por apps/core/src/shell/shell.controller.ts:53 |
| manual | apps/core/src/registry/registry.service.ts:403 | — | remote-resolution | Yes | `fetch(url, { headers, signal })` resolve o manifesto de cada módulo em `/.well-known/module-manifest` (URL montada em apps/core/src/registry/registry.service.ts:401 a partir do `baseUrl` registrado), de onde saem `remoteEntry` e as rotas que alimentam a tabela compilada (:471-485) servida aos shells; o módulo responde com o manifesto assinado (modules/hello/server.mjs:87-95) |
| manual | apps/core/src/registry/registry.service.ts:307 | — | other | Yes | `fetch(new URL('/render', synced.registration.baseUrl), { method: 'POST', ... })` (:307-315) pede ao servidor da outra unidade que pré-renderize o componente e devolva o HTML (`data.html`, :317-318), usado como `islandHtml` em apps/core/src/shell/shell.controller.ts:46-49 e inserido na página em apps/web-shell/src/entry-server.tsx:96; mecanismo de composição no servidor fora das categorias listadas |
| manual | config/modules.example.json:4 | — | host-relationship | No | `"moduleId": "hello"` e `"baseUrl": "http://127.0.0.1:4001"` (:5) declaram qual aplicação de módulo o core usa e onde; é arquivo de exemplo e não é lido por nenhum build nem pelo runtime — o registro real vem de `MODULE_REGISTRY_CONFIG`, gitignored (apps/core/src/registry/registry-config.ts:4-7) |

## Resumo

Construções com composição: 16 (remote-resolution: 8, runtime-composition: 3, host-relationship: 2, other: 2, dynamic-loading: 1).

## Notas

- O `matches.csv` traz só duas ocorrências `src-*`, ambas em apps/admin-shell/src/federation.ts, embora a composição apareça em quatro lugares. O padrão `src-load-remote` casa `loadRemote(` e não casou `loadRemote<Record<string, unknown>>(` (apps/admin-shell/src/federation.ts:44, apps/web-shell/src/islands.ts:54) nem `init(` (apps/admin-shell/src/federation.ts:36, apps/web-shell/src/islands.ts:90); as resoluções por `fetch` do core e do painel também ficaram fora.
- Os `server.mjs` dos dez `modules/*` declaram `remoteEntry`, `exposes`, `routes` e `menu` do próprio módulo (ex.: modules/hello/server.mjs:32-62), isto é, em que superfície e rota cada componente entra. Não viraram linha porque a lista do passo 4 prevê a declaração **no host**, e aqui a declaração é do módulo sobre si mesmo; a relação completa entre unidades é assunto da revisão de composição (seção 3.4.5 do protocolo). O que o host declara em código é o registro de módulos (config/modules.example.json:4-5), já na tabela.
- As unidades alvo das resoluções remotas são os `modules/*` do próprio snapshot, mas sempre por dados de runtime (`moduleId`, `remoteEntry` do manifesto): nenhuma linha de código dos shells nomeia um módulo literalmente.
- `apps/core/src/shell/shell.service.ts:103-104` (`readFile` do `index.html` do admin-shell) serve o shell de administração já construído; é entrega de uma unidade, não composição entre unidades, e por isso não virou linha.
- Nada no snapshot define ou consome custom element, `<iframe>`, `postMessage`, `BroadcastChannel` ou `CustomEvent`. As props e o HTML passados às ilhas (apps/web-shell/src/islands.ts:19,32) são dados do carregamento já registrado, não mecanismo próprio de comunicação. `packages/contract` cuida da assinatura HMAC entre core e módulos (packages/contract/package.json:1-31), não de comunicação entre unidades frontend.
- Falsos positivos descartados na busca do passo 4: `import('react').CSSProperties` em modules/chat/src/ChatAdminPage.tsx:313,316 e modules/clientes/src/PortalIsland.tsx:162 (import de tipo), `await import(...)` em apps/core/test/shell.test.ts:69-70 (teste) e as menções a `import()` e `loadRemote` em README.md:55,71,89 e docs/adr/004-ssr-islas-auth-y-despliegue.md:9 (documentação).
