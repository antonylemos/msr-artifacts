---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Leitura do repositório

Plataforma de demonstração num monorepo pnpm: `apps/shell` é o host Nuxt 3 e quatro aplicações Vue com webpack são remotes de Module Federation, duas em Vue 2 (checkout e admin) e duas em Vue 3 (profile e dashboard). Cada remote expõe um único módulo `./App`, que é o seu `bootstrap.js` com as funções `mount` e `unmount` (por exemplo apps/mfe-vue2-checkout/webpack.config.js:66-69 e apps/mfe-vue2-checkout/src/bootstrap.js:32-55). O shell não usa o `ModuleFederationPlugin`, como diz o comentário de apps/shell/nuxt.config.ts:64-66. Em vez disso, ele faz à mão o protocolo de consumo de containers: lê os quatro descritores de `MFE_REGISTRY` (packages/shared/src/registry.ts:12-61), injeta o `remoteEntry.js` do descritor por `<script>` (apps/shell/composables/useMfeLoader.ts:18, :52-64), pega o container em `window[remoteName]`, chama `container.init({})` e `container.get('./App')` (apps/shell/composables/useMfeLoader.ts:21-40) e por fim chama `mount(el, props)` (apps/shell/composables/useMfeLoader.ts:79-80). Por isso o mecanismo das quatro relações de carga é `module-federation`; a injeção de script é só o transporte do `remoteEntry.js`.

A escolha do remote é feita pela rota: a página catch-all apps/shell/pages/app/[...mfe].vue procura no registro o descritor cuja `route` é prefixo do caminho (apps/shell/pages/app/[...mfe].vue:40-42), monta-o no `div` de apps/shell/pages/app/[...mfe].vue:24 ao abrir a página (:44-50) e o desmonta ao sair ou no logout (:52-62). O cabeçalho fica com o shell (apps/shell/pages/app/[...mfe].vue:3). A página inicial só gera um `NuxtLink` para cada rota do registro (apps/shell/pages/index.vue:13-15, :42); a carga acontece na página catch-all. O registro e o contrato `RemoteMount` (packages/shared/src/types/index.ts:24-33) ficam em `packages/shared`, que não é unidade na revisão estrutural.

Há também comunicação por eventos de janela, que virou uma relação `communication` por remote. O shell envia `mfe:auth-changed` e `mfe:auth-logout` pelas funções `broadcastLogin` e `broadcastLogout` do pacote compartilhado (packages/shared/src/auth/index.ts:3-4, :10-24), chamadas pela store de autenticação (apps/shell/stores/auth.ts:28, :34). Os quatro remotes só escutam, por `onAuthChanged` e `onAuthLogout` (packages/shared/src/auth/index.ts:28-43), dentro do próprio `mount`. Nenhum remote envia esses eventos.

O que não virou relação: o `import('./bootstrap')` e a chamada `mount` de cada `src/index.js` são a execução standalone de cada remote, interna a ele (por exemplo apps/mfe-vue2-checkout/src/index.js:1-18). As props `user` e `onLogout` que o shell passa no `mount` (apps/shell/pages/app/[...mfe].vue:46-49) são callbacks trocados entre unidades; os remotes declaram `onLogout` como prop (por exemplo apps/mfe-vue2-admin/src/App.vue:74), mas no snapshot nenhum deles a chama. Cada remote declara `vue` como `shared` singleton (por exemplo apps/mfe-vue2-checkout/webpack.config.js:70-72), mas o shell inicia os containers com escopo vazio (apps/shell/composables/useMfeLoader.ts:28-32), então não há compartilhamento declarado entre host e remotes. Como limitação de implantação já registrada na classificação, os remotes fixam `output.publicPath` em `http://localhost:300x/` (por exemplo apps/mfe-vue2-checkout/webpack.config.js:14), enquanto o registro permite trocar só a URL do `remoteEntry.js` por variável de ambiente (packages/shared/src/registry.ts:5-9).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/mfe-vue2-admin | host → remote | origem → destino | module-federation | Yes | Yes | packages/shared/src/registry.ts:26-35 (descritor `admin`: rota `/app/admin`, `remoteName: 'mfe_admin'`, `exposedModule: './App'`); packages/shared/src/registry.ts:5-9 (URL `localhost:3002/remoteEntry.js` sem variável de ambiente); apps/mfe-vue2-admin/webpack.config.js:64-67 (`name: 'mfe_admin'`, `filename: 'remoteEntry.js'`, expõe `./App`); apps/mfe-vue2-admin/webpack.config.js:14 (`publicPath` `http://localhost:3002/`); apps/mfe-vue2-admin/webpack.config.js:75 (porta 3002) | apps/shell/composables/useMfeLoader.ts:13; apps/shell/composables/useMfeLoader.ts:79; apps/mfe-vue2-admin/src/bootstrap.js:24; apps/mfe-vue2-admin/src/bootstrap.js:41; apps/shell/composables/useMfeLoader.ts:80; apps/shell/composables/useMfeLoader.ts:91; apps/shell/composables/useMfeLoader.ts:57; apps/shell/pages/app/[...mfe].vue:46; packages/shared/src/registry.ts:12 |
| 2 | apps/shell | apps/mfe-vue2-checkout | host → remote | origem → destino | module-federation | Yes | Yes | packages/shared/src/registry.ts:14-23 (descritor `checkout`: rota `/app/checkout`, `remoteName: 'mfe_checkout'`, `exposedModule: './App'`); packages/shared/src/registry.ts:5-9 (URL `localhost:3001/remoteEntry.js` sem variável de ambiente); apps/mfe-vue2-checkout/webpack.config.js:66-69 (`name: 'mfe_checkout'`, `filename: 'remoteEntry.js'`, expõe `./App`); apps/mfe-vue2-checkout/webpack.config.js:14 (`publicPath` `http://localhost:3001/`); apps/mfe-vue2-checkout/webpack.config.js:77 (porta 3001) | apps/shell/composables/useMfeLoader.ts:13; apps/shell/composables/useMfeLoader.ts:79; apps/mfe-vue2-checkout/src/bootstrap.js:32; apps/mfe-vue2-checkout/src/bootstrap.js:49; apps/shell/composables/useMfeLoader.ts:80; apps/shell/composables/useMfeLoader.ts:91; apps/shell/composables/useMfeLoader.ts:57; apps/shell/pages/app/[...mfe].vue:46; packages/shared/src/registry.ts:12 |
| 3 | apps/shell | apps/mfe-vue3-dashboard | host → remote | origem → destino | module-federation | Yes | Yes | packages/shared/src/registry.ts:50-59 (descritor `dashboard`: rota `/app/dashboard`, `remoteName: 'mfe_dashboard'`, `exposedModule: './App'`); packages/shared/src/registry.ts:5-9 (URL `localhost:3004/remoteEntry.js` sem variável de ambiente); apps/mfe-vue3-dashboard/webpack.config.js:53-56 (`name: 'mfe_dashboard'`, `filename: 'remoteEntry.js'`, expõe `./App`); apps/mfe-vue3-dashboard/webpack.config.js:13 (`publicPath` `http://localhost:3004/`); apps/mfe-vue3-dashboard/webpack.config.js:65 (porta 3004) | apps/shell/composables/useMfeLoader.ts:13; apps/shell/composables/useMfeLoader.ts:79; apps/mfe-vue3-dashboard/src/bootstrap.js:26; apps/mfe-vue3-dashboard/src/bootstrap.js:36; apps/shell/composables/useMfeLoader.ts:80; apps/shell/composables/useMfeLoader.ts:91; apps/shell/composables/useMfeLoader.ts:57; apps/shell/pages/app/[...mfe].vue:46; packages/shared/src/registry.ts:12 |
| 4 | apps/shell | apps/mfe-vue3-profile | host → remote | origem → destino | module-federation | Yes | Yes | packages/shared/src/registry.ts:38-47 (descritor `profile`: rota `/app/profile`, `remoteName: 'mfe_profile'`, `exposedModule: './App'`); packages/shared/src/registry.ts:5-9 (URL `localhost:3003/remoteEntry.js` sem variável de ambiente); apps/mfe-vue3-profile/webpack.config.js:53-56 (`name: 'mfe_profile'`, `filename: 'remoteEntry.js'`, expõe `./App`); apps/mfe-vue3-profile/webpack.config.js:13 (`publicPath` `http://localhost:3003/`); apps/mfe-vue3-profile/webpack.config.js:65 (porta 3003) | apps/shell/composables/useMfeLoader.ts:13; apps/shell/composables/useMfeLoader.ts:79; apps/mfe-vue3-profile/src/bootstrap.js:28; apps/mfe-vue3-profile/src/bootstrap.js:43; apps/shell/composables/useMfeLoader.ts:80; apps/shell/composables/useMfeLoader.ts:91; apps/shell/composables/useMfeLoader.ts:57; apps/shell/pages/app/[...mfe].vue:46; packages/shared/src/registry.ts:12 |
| 5 | apps/shell | apps/mfe-vue2-admin | communication | origem → destino | events | Yes | Yes | — | packages/shared/src/auth/index.ts:14; packages/shared/src/auth/index.ts:22 |
| 6 | apps/shell | apps/mfe-vue2-checkout | communication | origem → destino | events | Yes | Yes | — | packages/shared/src/auth/index.ts:14; packages/shared/src/auth/index.ts:22 |
| 7 | apps/shell | apps/mfe-vue3-dashboard | communication | origem → destino | events | Yes | Yes | — | packages/shared/src/auth/index.ts:14; packages/shared/src/auth/index.ts:22 |
| 8 | apps/shell | apps/mfe-vue3-profile | communication | origem → destino | events | Yes | Yes | — | packages/shared/src/auth/index.ts:14; packages/shared/src/auth/index.ts:22 |

## Observações

**1. apps/shell → apps/mfe-vue2-admin.** O descritor `admin` (packages/shared/src/registry.ts:26-35) pede o container `mfe_admin` e o módulo `./App`, que correspondem ao `name: 'mfe_admin'` e ao `exposes` de apps/mfe-vue2-admin/webpack.config.js:64-67; a URL padrão `http://localhost:3002/remoteEntry.js` (packages/shared/src/registry.ts:31, :9) bate com o `filename`, o `publicPath` (apps/mfe-vue2-admin/webpack.config.js:14) e a porta do `devServer` (apps/mfe-vue2-admin/webpack.config.js:75), que só corroboram. O shell não importa nada do remote pelo nome: as linhas genéricas do loader (apps/shell/composables/useMfeLoader.ts:13, :57, :79, :80, :91), da página (apps/shell/pages/app/[...mfe].vue:46) e do registro (packages/shared/src/registry.ts:12) valem para os quatro remotes e por isso aparecem nas relações 1 a 4; o que é próprio desta relação são o descritor e o `mount`/`unmount` de apps/mfe-vue2-admin/src/bootstrap.js:24 e :41. Essas duas linhas aparecem duas vezes na revisão de código-fonte (`src-mount-export` e `src-mount-call`) e entram uma vez aqui. A relação é ativa: a rota `/app/admin` leva à página que chama `mountMfe` com o descritor encontrado (apps/shell/pages/app/[...mfe].vue:40-49).

**2. apps/shell → apps/mfe-vue2-checkout.** Mesma forma da relação 1: descritor `checkout` com `mfe_checkout` e `./App` (packages/shared/src/registry.ts:14-23), resolvido por apps/mfe-vue2-checkout/webpack.config.js:66-69, com `publicPath` e porta 3001 (apps/mfe-vue2-checkout/webpack.config.js:14, :77). O `mount` e o `unmount` exportados ficam em apps/mfe-vue2-checkout/src/bootstrap.js:32 e :49; o `mount` cria a instância Vue 2 com Vuetify e renderiza o `App.vue` do checkout no elemento do shell (apps/mfe-vue2-checkout/src/bootstrap.js:40-46).

**3. apps/shell → apps/mfe-vue3-dashboard.** Descritor `dashboard` com `mfe_dashboard` e `./App` (packages/shared/src/registry.ts:50-59), resolvido por apps/mfe-vue3-dashboard/webpack.config.js:53-56, com `publicPath` e porta 3004 (apps/mfe-vue3-dashboard/webpack.config.js:13, :65). `mount` e `unmount` em apps/mfe-vue3-dashboard/src/bootstrap.js:26 e :36; aqui o `mount` usa `createApp` do Vue 3 (apps/mfe-vue3-dashboard/src/bootstrap.js:31-33). O shell trata remotes Vue 2 e Vue 3 do mesmo jeito, só pelo contrato `RemoteMount` (packages/shared/src/types/index.ts:25-28).

**4. apps/shell → apps/mfe-vue3-profile.** Descritor `profile` com `mfe_profile` e `./App` (packages/shared/src/registry.ts:38-47), resolvido por apps/mfe-vue3-profile/webpack.config.js:53-56, com `publicPath` e porta 3003 (apps/mfe-vue3-profile/webpack.config.js:13, :65). `mount` e `unmount` em apps/mfe-vue3-profile/src/bootstrap.js:28 e :43, com `createApp` em :38-40.

**5. apps/shell → apps/mfe-vue2-admin (communication).** As duas linhas da revisão de código-fonte estão em `packages/shared`, que não é unidade; quem envia é o shell, que chama `broadcastLogin` ao sincronizar a sessão (apps/shell/stores/auth.ts:28, chamado a cada navegação autenticada por apps/shell/middleware/auth.global.ts:10-11) e `broadcastLogout` no logout (apps/shell/stores/auth.ts:34). O admin recebe ao assinar `onAuthChanged` e `onAuthLogout` no seu `mount` (apps/mfe-vue2-admin/src/bootstrap.js:27-30): o primeiro atualiza o usuário da instância, o segundo desmonta o próprio remote. O admin não envia eventos, então a direção é `origem → destino`. O canal está todo no código, com os nomes dos eventos em packages/shared/src/auth/index.ts:3-4, e não há declaração de configuração que ligue as duas unidades por ele; por isso Configuração é `—`.

**6. apps/shell → apps/mfe-vue2-checkout (communication).** Igual à relação 5: o checkout assina os dois eventos em apps/mfe-vue2-checkout/src/bootstrap.js:35-38 e só recebe.

**7. apps/shell → apps/mfe-vue3-dashboard (communication).** Igual à relação 5: o dashboard assina os dois eventos em apps/mfe-vue3-dashboard/src/bootstrap.js:29-30, atualizando o `ref` do usuário, e só recebe.

**8. apps/shell → apps/mfe-vue3-profile (communication).** Igual à relação 5: o profile assina os dois eventos em apps/mfe-vue3-profile/src/bootstrap.js:33-36 e só recebe.

## Resumo

Relações: 8 (host → remote: 4, communication: 4). Ativas: 8. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.
