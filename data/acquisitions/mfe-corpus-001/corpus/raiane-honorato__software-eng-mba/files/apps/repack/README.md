# MyGym — Versão Re.Pack (Module Federation)

> **Contexto do TCC:** terceira das três PoCs do trabalho *"Abordagens de Micro Frontend em React Native: Modularização em Build-time versus Federação em Runtime"*. Enquanto a versão Turborepo demonstra **modularização em build-time** (um bundle único), esta demonstra **federação em runtime**: o app é composto por vários bundles independentes que se juntam **em runtime, pela rede**.
>
> Este README dá a **visão macro** e as **instruções para rodar**. As decisões arquiteturais detalhadas (mini-app vs. shared, singleton de estado, trade-offs) ficam no `ARCHITECTURE.md` (em construção). As lições pontuais da construção estão em `Docs/sacadas-repack.md`.

---

## O que é Re.Pack + Module Federation?

- **Re.Pack** substitui o **Metro** como bundler do React Native, usando o **Rspack** por baixo. Isso habilita *code splitting* e carregamento de código remoto.
- **Module Federation (MF)** é a técnica que permite um app **carregar módulos de outro app em runtime, pela rede**, como se fossem locais.

Na prática: em vez de um binário monolítico, o MyGym vira um **host** (a casca instalável) que baixa dois **mini-apps** (remotes) sob demanda.

> **Sem Expo:** Module Federation pressupõe controle total do bundler (Rspack), incompatível com o fluxo gerenciado do Expo. Por isso esta versão roda em **React Native CLI puro (bare)**. É uma diferença de toolchain inerente ao regime runtime — o **código de domínio** (telas, componentes, store, regras) é mantido idêntico às outras versões.

---

## Visão macro da aplicação

Três papéis, cada um um bundle separado:

```
        shared singletons (fornecidos pelo host, consumidos pelos remotes)
   ┌──────────────────────────────────────────────────────────────┐
   │ react · react-native · @react-navigation/* · zustand · svg    │
   │ screens · safe-area · linear-gradient · blur                  │
   │ @mygym/store · theme · ui · navigation · data · utils         │
   └──────────────────────────────────────────────────────────────┘
             ▲                    ▲                     ▲
             │ shared (runtime)   │                     │
   ┌─────────┴────────┐   ┌───────┴────────┐   ┌────────┴─────────┐
   │  HOST (:8081)    │   │ check-in       │   │ dashboard        │
   │  binário/loja    │   │ (:9001)        │   │ (:9002)          │
   │  Bottom Tabs     │   │ expõe          │   │ expõe            │
   │  eager provider  │   │ ./CheckInStack │   │ ./DashboardStack │
   └───────┬──────────┘   └────────────────┘   └──────────────────┘
           │  lazy import (rede, runtime)   ▲          ▲
           └────────────────────────────────┴──────────┘
```

| App | Papel | Porta | O que faz |
|-----|-------|-------|-----------|
| `host` | Shell / consumidor | 8081 | Único binário instalável. Monta as Bottom Tabs, o `NavigationContainer` único, e **fornece** os singletons. Carrega os mini-apps via `React.lazy`. |
| `check-in` | Mini-app / produtor | 9001 | Expõe `./CheckInStack` (listagem de academias + confirmação de check-in). |
| `dashboard` | Mini-app / produtor | 9002 | Expõe `./DashboardStack` (estado ativo, cronômetro, finalização, histórico). |

**Regras arquiteturais** (herdadas do Turborepo, não são do Re.Pack):
- `check-in` e `dashboard` **não se importam diretamente** — comunicam só via `@mygym/store` (singleton).
- A navegação entre abas usa o **`NavigationContainer` único do host** + os tipos de `@mygym/navigation`.

**O que muda vs. Turborepo:** a fronteira host→feature deixa de ser um `workspace:*` resolvido no install e passa a ser uma **URL de rede resolvida em runtime**; e o singleton (de graça no bundle único do Turborepo) passa a ser **declarado** via `shared: { singleton: true }`.

---

## Estrutura do workspace

```
apps/repack/
├── pnpm-workspace.yaml        # packages/* + catalog: (versões das libs shared)
├── .npmrc                     # node-linker=hoisted (exigência do RN bare)
└── packages/
    ├── host/                  # shell: Bottom Tabs, NavigationContainer, eager provider
    ├── check-in/              # MINI-APP (remote) — expõe ./CheckInStack
    ├── dashboard/             # MINI-APP (remote) — expõe ./DashboardStack
    ├── shared-deps/           # helper que monta o objeto `shared` do MF (mini-getSharedDependencies)
    ├── store/                 # SHARED singleton (Zustand) — contrato entre os mini-apps
    ├── theme/ · ui/ · navigation/ · data/ · utils/   # SHARED singletons
    └── tsconfig/ · eslint-config/ · jest-config/     # build-time (não entram em shared)
```

---

## Como rodar

Precisa de **4 terminais** (3 dev servers + 1 build), todos a partir da raiz do TCC.

### Passo 0 — Setup nativo do host (uma vez, e ao mudar dep/fonte nativa)

O host é o único binário; ele carrega o nativo de **todos** os remotes e embarca as fontes.

**0a — Linkar as fontes Inter** (o `ios/` não é versionado, então isto roda no setup):
```bash
cd apps/repack/packages/host
npx react-native-asset   # linka os .ttf de assets/fonts ao projeto nativo (Info.plist/pbxproj)
```

**0b — Pods do host:**
```bash
cd apps/repack/packages/host
bundle install                                    # gems (se ainda não)
bundle exec pod install --project-directory=ios   # ou: cd ios && pod install
```

### Passo 1 — subir os 3 dev servers (deixe rodando)

**Recomendado — um comando** (`mprocs` sobe os três juntos; `q` para sair):

```bash
cd apps/repack && pnpm start
```

As portas (check-in:9001, dashboard:9002, host:8081) estão fixadas nos scripts `start` de cada pacote e batem com o `remotes` do host.

<details><summary>Alternativa — 3 terminais à mão</summary>

```bash
cd apps/repack/packages/check-in  && pnpm start   # Terminal A (9001)
cd apps/repack/packages/dashboard && pnpm start   # Terminal B (9002)
cd apps/repack/packages/host      && pnpm start   # Terminal C (8081)
```
</details>

### Passo 2 — build + run no simulador

```bash
cd apps/repack/packages/host && pnpm react-native run-ios
```

O 1º build nativo demora alguns minutos. Se abrir pelo Xcode, use `ios/host.xcworkspace` (nunca o `.xcodeproj`).

### Fluxo esperado

1. App abre com as Bottom Tabs (**Início** / **Academias**).
2. Ao entrar numa aba, um spinner rápido → o host **baixa o container do remote pela rede** (lazy) → a tela real.
3. Academias → Iron Forge → Musculação → confirmar → aba Início com o cronômetro **ativo** (o estado cruza os dois bundles via `@mygym/store` singleton).

### Teste de resiliência (exclusivo do runtime)

Com o app aberto, **derrube o dev server do check-in** (`Ctrl+C` no Terminal A), recarregue e entre em **Academias**: o `ErrorBoundary` mostra o erro **só naquela aba**, sem crashar o app — evidência de que o carregamento é em runtime, pela rede.

### Notas

- **iOS não precisa** de `adb reverse`. No **Android**, antes do `run-android`: `adb reverse tcp:9001 tcp:9001 && adb reverse tcp:9002 tcp:9002` (o packager só faz reverse automático da 8081).
- Rodar um mini-app **standalone** (sozinho): `cd packages/dashboard && pnpm react-native run-ios` — usa o `App.tsx` com `NavigationContainer` próprio.

---

## Status

| Área | Estado |
|---|---|
| Federação host + 2 mini-apps (dev, iOS) | ✅ funcional |
| Singleton de estado federado (`@mygym/store`) | ✅ funcional · prova formal (teste `===` + destrutivo) pendente |
| Fontes Inter | ✅ `.ttf` empacotados no host (swap `expo-font`, D3) · linkar com `npx react-native-asset` no setup (Passo 0a) |
| `ARCHITECTURE.md` | ⏳ em construção |
| Coleta de métricas (chunks, build isolado, host) | ⏳ pendente |

---

## Referências

- `ARCHITECTURE.md` — decisões arquiteturais detalhadas (em construção)
- `../../Docs/sacadas-repack.md` — lições pontuais da construção (workspace, catalog↔MF, views nativas, etc.)
- `../../plans/plano-repack-module-federation.md` — plano didático e registro de decisões
- `../repack-poc/` — spike original que provou a federação em runtime
