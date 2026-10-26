# repack-poc — Spike de Module Federation em runtime

Prova de conceito da **PoC 3 (Re.Pack)** do TCC. Objetivo estreito: provar que **um app host carrega, em runtime, um componente que veio de outro bundle pela rede** — o mecanismo de Module Federation v2 em React Native bare (sem Expo).

Critério de sucesso: o host renderiza **"Hello from Remote!"**, vindo de um bundle servido em `localhost:9001`. Derrubar o remote e recarregar deve mostrar o fallback do `ErrorBoundary`, não um crash — é isso que prova que o carregamento é em runtime.

> **Status: spike concluída ✅** — evidência em [`poc-evidence.png`](./poc-evidence.png): o host renderizando "Hello from Remote!" no simulador iOS, com o DevTools mostrando o `GET http://localhost:9001/ios/mf-manifest.json` → 200. Detalhe interessante: no Network tab só aparece o **manifest** (vem por `fetch`); o **bundle do remote em si não aparece** porque é baixado pelo `ScriptManager` do Re.Pack via módulo nativo, fora da camada JS de rede.

## Stack

- React Native **0.84.1** bare (RN CLI, sem Expo)
- Re.Pack **5.2.5** + Rspack como bundler
- `@module-federation/enhanced` **2.6.0** (base obrigatória que o `ModuleFederationPluginV2` estende)

## Host e remote — os papéis

| App | Papel | Porta | O que faz |
|-----|-------|-------|-----------|
| `host/` | Consumidor (shell) | 8081 | App que roda no simulador. Importa a tela do remote via `React.lazy` e a renderiza. **Fornece** react/react-native. |
| `remote/` | Produtor | 9001 | Dev server que **expõe** `HelloScreen` como um bundle federado. Não roda sozinho na spike — só serve o bundle. |

## Configs principais

**`remote/rspack.config.mjs`** — expõe a tela:
```js
new Repack.plugins.ModuleFederationPluginV2({
  name: 'remote',
  filename: 'remote.container.bundle',
  exposes: { './HelloScreen': './src/HelloScreen.tsx' },
  shared: {
    react: { singleton: true, eager: false },        // consome, não fornece
    'react-native': { singleton: true, eager: false },
  },
})
```

**`host/rspack.config.mjs`** — consome o remote pelo manifest:
```js
Repack.defineRspackConfig((env) => {
  const { mode, platform } = env;   // vêm do build do Re.Pack
  return {
    // ...
    plugins: [new Repack.plugins.ModuleFederationPluginV2({
      name: 'host',
      remotes: {
        remote: `remote@http://localhost:9001/${platform}/mf-manifest.json`,
      },
      shared: {
        react: { singleton: true, eager: true },        // fornece react/react-native
        'react-native': { singleton: true, eager: true },
      },
    })],
  };
})
```

Pontos que importam:
- **`eager`: `true` no host, `false` no remote.** O host carrega react/react-native de imediato (fornecedor); o remote os consome do host em vez de empacotar os seus. Garante uma única instância (`singleton`).
- **Referência por manifest** (`mf-manifest.json`), não pelo container bundle direto. É a forma MF2-nativa, a mesma do `super-app-showcase`. O runtime lê o manifest e a partir dele resolve o container.
- **`${platform}` vem do `env`** que o Re.Pack injeta na config (`/android/` ou `/ios/`) — não é string fixa. Por isso a config do host é uma função `(env) => config`, e não um objeto literal.
- **`host/App.tsx`** usa o trio `React.lazy` + `Suspense` + `ErrorBoundary`. O `ErrorBoundary` não é opcional: é ele que evita a tela branca quando o remote está fora do ar.
- **`HelloScreen` precisa de `export default`** — `React.lazy` resolve `module.default`. Sem o default, o lazy renderiza `undefined` e cai no ErrorBoundary mesmo com o remote no ar (falso negativo).

## Como os apps foram criados (do zero)

Passo a passo macro que foi seguido para montar a PoC, seguindo o [quick-start oficial do Re.Pack](https://re-pack.dev/docs/getting-started/quick-start#installation). Útil pra reproduzir ou explicar no TCC.

1. **Dois apps RN bare**, dentro de `apps/repack-poc/` (`host` e `remote`) — base padrão do RN CLI.

2. **Re.Pack em cada app**, via o init oficial (rodado dentro de cada projeto):
   ```bash
   pnpm dlx @callstack/repack-init
   ```
   Os defaults do quick-start já servem (bundler `rspack`, config em `.mjs`) — não foi preciso passar flags. Ele troca o Metro pelo Rspack, gera o `rspack.config.mjs`, ajusta o `react-native.config.js` (aponta os comandos para o `@callstack/repack/commands/rspack`) e os scripts.

3. **Base obrigatória do MF2** em cada app:
   ```bash
   pnpm add @module-federation/enhanced
   ```
   É infraestrutura de build (o `ModuleFederationPluginV2` a estende) — **não** entra em `shared`.

4. **Configurar a federação** nos dois `rspack.config.mjs` — `exposes` no remote, `remotes` no host, com o contraste de `eager` (ver seção "Configs principais").

5. **Escrever o mínimo de código:** `remote/src/HelloScreen.tsx` (a tela exposta, com `export default`) e o `host/App.tsx` com o trio `lazy` + `Suspense` + `ErrorBoundary`.

6. **Checkpoint antes da federação:** rodar o host com `run-ios`/`run-android` *antes* de mexer em MF, pra isolar "RN bare roda" de "federação roda". Se quebrar aqui, é ambiente nativo, não Module Federation.

## Como rodar

Pré-requisito iOS: instalar os Pods uma vez (e sempre que mudar deps nativas):
```bash
cd host
bundle install
bundle exec pod install --project-directory=ios
```

Depois, **três terminais**:

```bash
# 1 — remote (serve o bundle federado na 9001)
cd remote && pnpm react-native start --port 9001

# 2 — host (Metro/dev server na 8081)
cd host && pnpm react-native start

# 3 — build + run no simulador
cd host && pnpm react-native run-ios      # ou run-android
```

### Notas que aprendemos

- **Android e porta custom:** o packager só faz `adb reverse` automático da 8081. Como o remote serve na 9001, antes do `run-android` rode:
  ```bash
  adb reverse tcp:9001 tcp:9001
  ```
  No **iOS não precisa** — `localhost:9001` alcança a máquina direto do simulador.
- **iOS, erro `Unable to load contents of file list: '…Pods-host-frameworks-…xcfilelist'`:** é `pod install` faltando/desatualizado. Rode o `bundle exec pod install` acima e abra sempre o `ios/host.xcworkspace` (nunca o `.xcodeproj`).
- A porta 9001 do remote vem do flag `--port` na CLI, não do config — o `start` no `package.json` é o `react-native start` padrão.
