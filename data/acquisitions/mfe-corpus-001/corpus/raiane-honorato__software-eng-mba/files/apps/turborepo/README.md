# MyGym — Versão Turborepo

> **Contexto do TCC:** Esta é a segunda versão de três PoCs que compõem o trabalho *"Abordagens de Micro Frontend em React Native: Modularização em Build-time versus Federação em Runtime"*. O objetivo é demonstrar **modularização em build-time** usando Turborepo como orquestrador de monorepo, e contrastar com a versão monolítica (baseline) e a versão Re.Pack/Module Federation (runtime).

---

## O que é Turborepo?

[Turborepo](https://turborepo.dev) é um **orquestrador de tarefas para monorepos**. Ele não instala dependências (isso é trabalho do pnpm), não compila TypeScript (isso é trabalho do tsc/Metro) e não faz bundling (isso é trabalho do Metro). O que ele faz é entender o **grafo de dependências entre packages** e usar esse conhecimento para:

- Executar tarefas na **ordem correta** (typecheck de `@mygym/ui` antes de `@mygym/feature-check-in`)
- Rodar tarefas **em paralelo** quando não há dependência entre elas (lint de todos os packages ao mesmo tempo)
- **Cachear resultados**: se o código de um package não mudou, o Turbo pula a tarefa e restaura o output do cache

### Por que usar em um app mobile?

Em um monolito, qualquer mudança dispara o typecheck e lint do projeto inteiro. Em um monorepo com Turbo, mudar `packages/ui/` só ativa as tarefas desse package e dos que dependem dele — `feature-check-in`, `feature-dashboard` e `apps/mygym`. Os packages `theme`, `data`, `utils` e `store` ficam no cache.

O ganho real não é no bundle final (o Metro ainda gera um único arquivo), mas em **velocidade de feedback durante o desenvolvimento** e na **clareza de fronteiras entre módulos**.

---

## `turbo.json` — O Pipeline de Tarefas

O `turbo.json` é onde o Turborepo aprende **como** executar as tarefas do monorepo. Cada chave dentro de `"tasks"` corresponde a um script que pode existir nos `package.json` dos packages.

```json
{
  "tasks": {
    "build":     { "dependsOn": ["^build"],     "outputs": ["dist/**"]                          },
    "typecheck": { "dependsOn": ["^typecheck"],  "outputs": []                                  },
    "lint":      {                               "outputs": []                                  },
    "lint:fix":  {                               "outputs": [], "cache": false                  },
    "test":      {                               "outputs": [], "inputs": ["src/**", "**/__tests__/**", "jest.config.*"] },
    "dev":       { "persistent": true,           "cache": false                                 }
  }
}
```

### O `^` em `dependsOn` — ordem topológica

O `^` é o operador mais importante do Turborepo. Ele instrui o Turbo a olhar para o **grafo de dependências do workspace** (lido dos `package.json`) antes de executar uma tarefa.

```
"dependsOn": ["^typecheck"]
```

Tradução: *"antes de rodar `typecheck` neste package, garanta que `typecheck` já terminou em todos os packages dos quais este depende".*

Sem o `^`, Turbo rodaria todos os typechecks em paralelo ao mesmo tempo — e `feature-check-in` poderia falhar com erros de tipos provenientes de `@mygym/store` que ainda nem havia sido verificado.

Com o `^`, a ordem é respeitada automaticamente:

```
Rodam em paralelo (sem deps entre si):
  @mygym/theme  @mygym/data  @mygym/utils  @mygym/navigation  @mygym/store
                              ↓
                        @mygym/ui
                              ↓
  @mygym/feature-check-in  ←→  @mygym/feature-dashboard  (paralelo entre si)
                              ↓
                          apps/mygym
```

Sem `^` (exemplo de `lint`): todos os packages rodam lint simultaneamente, pois lint não depende de nada ter sido verificado antes.

### `outputs: []` — o que cachear

O `outputs` diz ao Turbo quais arquivos salvar no cache após a execução:

| `outputs` | Significado | Quando usar |
|---|---|---|
| `["dist/**"]` | Salva e restaura a pasta `dist/` | `build` — gera arquivos |
| `[]` | Salva só o exit code e logs | `typecheck`, `lint` — só produzem saída no terminal |
| Omitido | Turbo não sabe o que cachear — **re-executa sempre** | Nunca omitir intencionalmente |

Para `typecheck` e `lint`, nenhum arquivo é gerado — o resultado é simplesmente "passou" ou "falhou". Com `outputs: []`, o Turbo guarda esse resultado. Na segunda execução sem mudanças no código, ele restaura o resultado do cache e exibe `>>> FULL TURBO` em vez de recompilar.

### `persistent: true` e `cache: false`

O `dev` tem comportamento especial:

- `persistent: true` — avisa o Turbo que essa task nunca termina (é um servidor de desenvolvimento). O Turbo não espera ela finalizar para considerar o pipeline completo.
- `cache: false` — o estado de um servidor em execução não faz sentido ser cacheado. Sem isso, o Turbo tentaria salvar o "output" de um processo que nunca terminou.

`lint:fix` também tem `cache: false`, mas por razão diferente: ele **modifica arquivos**. Se fosse cacheado, uma segunda execução retornaria "cache hit" e não tocaria nos arquivos — mesmo que novos problemas tivessem sido introduzidos desde o último fix. Tarefas que alteram o estado do disco não devem ser cacheadas.

---

## Desacoplamento em relação ao Monolito

Esta seção documenta as diferenças concretas de acoplamento entre as duas versões e por que elas importam em um contexto de times trabalhando em paralelo.

### O problema do monolito: fronteiras frágeis

No monolito (`apps/monolith/`), a separação entre módulos é apenas uma convenção de pastas. Não há nada que impeça o seguinte:

```
src/modules/check-in/screens/CheckInConfirmationScreen.tsx
  └── import { DashboardActiveScreen } from '../../dashboard/screens/...'  // válido!
```

Não há erro de TypeScript, não há erro de lint. O import compila. A fronteira existe só na cabeça de quem escreveu — e deixa de existir no momento em que alguém faz um `../../` a mais sem perceber.

Esse problema se manifesta concretamente no próprio código do monolito. O arquivo `src/utils/gym.ts` importa `CompletedCheckIn` da store:

```ts
// apps/monolith/src/utils/gym.ts
import type { CompletedCheckIn } from '../store/checkInStore'

export function resolveFirstActivityName(checkIn: CompletedCheckIn): string { ... }
```

Uma **função utilitária** conhece o shape do **estado global**. Isso significa que qualquer mudança na interface `CompletedCheckIn` — que pertence ao módulo `dashboard` (consumidor de dados) — pode quebrar `utils` — que é infraestrutura compartilhada. O acoplamento é invisível na estrutura de pastas, mas real no grafo de dependências.

### O que o monorepo torna explícito

No monorepo, dependências são declaradas em `package.json`. Um package só enxerga o que declara. Quando `utils` foi extraído para `@mygym/utils`, o acoplamento com a store ficou **estruturalmente impossível** — `@mygym/utils` não declara `@mygym/store` como dependência. Isso forçou a refatoração da função:

```ts
// Monolito — recebe o objeto inteiro (acoplado ao shape da store)
resolveFirstActivityName(checkIn: CompletedCheckIn): string

// Turborepo — recebe só o que precisa (desacoplado)
resolveFirstActivityName({ gymId, activityIds }: { gymId: string; activityIds?: string[] }): string
```

A diferença não é cosmética. No monolito, a função de utils depende de um tipo definido na store — quem mantém a store também precisa entender o impacto em utils. No turborepo, a função recebe dados primitivos: quem chama decide o que passar, sem importar de onde vieram.

Os testes tornam essa diferença visível. No monolito, testar `resolveFirstActivityName` exige construir um objeto `CompletedCheckIn` completo:

```ts
// Monolito — mais setup, acoplado ao shape
const makeCheckIn = (gymId: string, activityIds?: string[]): CompletedCheckIn => ({
  id: '1', gymId, gymName: 'Test Gym', activityIds,
  startTime: new Date().toISOString(), endTime: new Date().toISOString(), durationMs: 3600000,
})
resolveFirstActivityName(makeCheckIn('iron-forge', ['musculacao']))

// Turborepo — só o que a função precisa
resolveFirstActivityName({ gymId: 'iron-forge', activityIds: ['musculacao'] })
```

### O contrato formal entre módulos

No monolito, `check-in` e `dashboard` se comunicam implicitamente — dashboard lê da store e espera que check-in tenha escrito no formato certo. Não há nenhum artefato de código que documente esse contrato.

No turborepo, `@mygym/store` é esse artefato. É um package com:
- Tipos exportados (`CompletedCheckIn`, `CheckInRating`)
- Ações com assinatura tipada (`startCheckIn`, `endCheckIn`, `saveRating`)
- Testes que verificam o comportamento (9 cenários)

Qualquer mudança no contrato é uma mudança nesse package — visível em code review, com histórico de git isolado, com typecheck que falha em quem depende dele se o contrato quebrar.

```
feature-check-in  →  @mygym/store  ←  feature-dashboard
   (producer)       (formal contract)     (consumer)
```

### Lei de Conway e times separados

A [Lei de Conway](https://en.wikipedia.org/wiki/Conway%27s_law) diz que sistemas tendem a espelhar a estrutura de comunicação da organização que os produz. O inverso também é explorado em engenharia de software — você pode usar a **arquitetura para moldar como os times interagem** (chamado de *Inverse Conway Maneuver*).

Num time que cresce além de uma ou duas pessoas, cada package do turborepo pode ser de responsabilidade de um time ou engenheiro diferente:

| Package | Time / papel |
|---|---|
| `@mygym/store` | Time de plataforma — define o contrato; ninguém muda sem revisão cruzada |
| `@mygym/ui` | Time de design system — independente de domínio |
| `@mygym/feature-check-in` | Time de produto A — não precisa saber o que o time B está fazendo |
| `@mygym/feature-dashboard` | Time de produto B — consome o contrato, não a implementação |

Com a estrutura do monolito, times trabalhando em paralelo em `check-in` e `dashboard` geram conflitos frequentes: ambos editam `utils`, ambos importam da mesma store sem contrato formal, qualquer mudança de um pode quebrar silenciosamente o outro.

Com a estrutura do monorepo:
- **Desenvolvimento paralelo sem conflito:** cada feature é um package com seu próprio `package.json`. Nenhum arquivo compartilhado é editado no fluxo normal de trabalho de cada time.
- **Feedback localizado:** se o time de check-in quebrar um tipo, o `pnpm turbo run typecheck --filter=@mygym/feature-check-in` falha — sem ruído de outros packages.
- **Onboarding reduzido:** um novo engenheiro no time de dashboard precisa entender `feature-dashboard` e o contrato do `@mygym/store`. Não precisa entender check-in.
- **CI granular:** um PR que toca só `feature-check-in` não re-valida `feature-dashboard` — typecheck, lint e testes do dashboard ficam no cache.

### Limitação honesta

Para o MyGym com dois módulos e um único desenvolvedor, o custo de configuração (9 `package.json`, Metro config, peerDependencies) supera o ganho de autonomia de time. O valor arquitetural se manifesta **a partir do momento em que dois ou mais engenheiros trabalham em paralelo** em features diferentes, ou quando o número de módulos cresce a ponto de o typecheck do projeto inteiro se tornar lento o suficiente para atrapalhar o desenvolvimento.

A PoC demonstra que a estrutura está pronta para escalar — não que o escalonamento seja necessário agora.

---

## Estrutura do Workspace

```
apps/turborepo/
├── apps/
│   └── mygym/                     # Único app shippable (binário Android/iOS)
└── packages/
    ├── tsconfig/                  # Configuração TypeScript compartilhada
    ├── eslint-config/             # Configuração ESLint compartilhada
    ├── jest-config/               # Configuração Jest compartilhada
    ├── theme/                     # Tokens de design (cores, tipografia)
    ├── utils/                     # Funções utilitárias puras
    ├── data/                      # Dados mockados e consultas de domínio
    ├── store/                     # Estado global compartilhado (Zustand)
    ├── navigation/                # Tipos de rotas de navegação
    ├── ui/                        # Componentes de interface reutilizáveis
    ├── feature-check-in/          # Módulo de check-in em academias
    └── feature-dashboard/         # Módulo de acompanhamento de treino
```

---

## Grafo de Dependências

Leia as setas como "depende de":

```
apps/mygym
├── @mygym/feature-check-in
│   ├── @mygym/ui
│   │   ├── @mygym/theme
│   │   ├── @mygym/data
│   │   └── @mygym/utils
│   ├── @mygym/store
│   ├── @mygym/data
│   ├── @mygym/utils
│   └── @mygym/navigation
└── @mygym/feature-dashboard
    ├── @mygym/ui          (mesmos sub-packages acima)
    ├── @mygym/store
    ├── @mygym/data
    ├── @mygym/utils
    └── @mygym/navigation
```

**Regra fundamental:** `feature-check-in` e `feature-dashboard` **nunca se importam diretamente**. A comunicação entre eles é mediada pelo `@mygym/store`.

---

## Packages — O que é cada um e por que existe

### `@mygym/tsconfig`

Configuração TypeScript base compartilhada por todos os packages. Sem ele, cada package teria seu próprio `tsconfig.json` autônomo e qualquer mudança global (ex: ativar um novo `strict` flag) precisaria ser replicada em 8 lugares.

```json
// Qualquer package estende assim:
{ "extends": "@mygym/tsconfig/base.json" }
```

**Por que é um package?** Para ser consumido via `workspace:*` como qualquer outro package do monorepo. O pnpm cria um symlink, o TypeScript resolve o `extends` pelo caminho linkado.

---

### `@mygym/eslint-config`

Config ESLint base compartilhada — o espelho do `@mygym/tsconfig`, mas para linting. Centraliza as regras em `index.js` e cada package as estende via `.eslintrc.js` local:

```js
// packages/ui/.eslintrc.js
module.exports = {
  root: true,
  extends: ['@mygym/eslint-config'],
}
```

**Conteúdo da config base:**
- `@typescript-eslint/parser` — parser TypeScript para o ESLint
- `@typescript-eslint/recommended` — regras de TypeScript (tipos não usados, `any` explícito, etc.)
- `eslint:recommended` — regras básicas de JavaScript
- `react/recommended` + `react-hooks/recommended` — boas práticas de React e hooks

**Dependências como `dependencies` (não `devDependencies`):** os plugins ESLint precisam estar disponíveis quando a config é carregada por outros packages. Se fossem `devDependencies`, o pnpm poderia não os instalar em certos contextos. O `eslint` em si é `peerDependency` — instalado uma única vez na raiz do workspace via hoisting.

**`@typescript-eslint` v8 e TypeScript 5.9+:** a v7 da biblioteca suportava TypeScript apenas até `5.5.x`. Com TypeScript `5.9.x` no projeto, o upgrade para v8 foi necessário — a regra é sempre atualizar a ferramenta auxiliar, nunca regredir o compilador.

**Cada package tem dois scripts de lint:**

```json
"scripts": {
  "lint":     "eslint src/",
  "lint:fix": "eslint src/ --fix"
}
```

`lint` apenas reporta erros (cacheável pelo Turbo). `lint:fix` corrige automaticamente e tem `cache: false` no `turbo.json` porque modifica arquivos — cachear uma operação destrutiva produziria falsos "cache hits" em execuções subsequentes.

---

### `@mygym/jest-config`

Configuração Jest base compartilhada — o terceiro da tríade de configs centralizadas junto com `@mygym/tsconfig` e `@mygym/eslint-config`. Cada package com testes estende via `jest.config.js` local:

```js
// packages/store/jest.config.js
const base = require('@mygym/jest-config/base')
module.exports = { ...base }
```

**Conteúdo da config base:**
- `preset: 'jest-expo'` — preset oficial do Expo, que configura transforms, mocks de módulos nativos e ambiente de teste compatível com React Native
- `transformIgnorePatterns` estendido — por padrão o Jest não transforma `node_modules`. O preset precisa ser ajustado para incluir libs ESM que não são pré-compiladas, como `phosphor-react-native`

**Por que `jest-expo` para packages sem RN?** Por consistência e para evitar duas configurações base diferentes. O preset lida bem com TypeScript puro — os mocks de módulos nativos simplesmente não são exercitados nos testes de `utils` e `data`.

**`inputs` no `turbo.json`:** a task `test` declara explicitamente quais arquivos invalidam o cache:

```json
"test": {
  "outputs": [],
  "inputs": ["src/**", "**/__tests__/**", "jest.config.*"]
}
```

Sem `inputs`, qualquer mudança no package (incluindo `README`, `package.json`) invalidaria o cache de testes. Com `inputs` definido, só mudanças no código-fonte e nos próprios testes invalidam — mudar uma dependência não relacionada não re-roda os testes.

**`tsconfig.json` em packages com testes:** além de adicionar `jest.config.js`, cada package testado precisa de dois ajustes no `tsconfig.json`:

```json
{
  "include": ["src", "__tests__"],
  "compilerOptions": {
    "types": ["jest"]
  }
}
```

- `include`: sem `"__tests__"` na lista, o TypeScript ignora os arquivos de teste — o language server do VS Code não resolve `describe`, `it`, `expect`
- `"types": ["jest"]`: aponta explicitamente para os tipos do Jest, necessário porque `@types/jest` chega como dependência transitiva de `@mygym/jest-config` e não do `package.json` do próprio package

---

### `@mygym/theme`

Tokens de design do sistema Kinetic Editorial: paleta de cores e escala tipográfica. É o package **mais baixo do grafo** — não depende de nenhum outro package interno.

```ts
import { colors } from '@mygym/theme'
// colors.primary, colors.surface, colors.tertiaryFixed...
```

**Por que separar do código de UI?** Tokens mudam em ritmo diferente de componentes. Uma atualização de paleta não deve forçar rebuild de toda a UI — com Turbo, só `theme` e seus dependentes seriam reprocessados.

**Sem peerDependencies:** tokens são dados estáticos, sem imports de React ou React Native.

---

### `@mygym/utils`

Funções utilitárias puras sem efeitos colaterais:

- `estimateCalories(activityIds, elapsedMs)` — estimativa calórica por atividade
- `formatDuration(ms)` — formata milissegundos como `HH:MM:SS`
- `formatRelativeDate(isoString)` — "Hoje", "Ontem" ou data formatada
- `activityIcon(activityId)` — retorna o componente de ícone Phosphor correspondente

A função `activityIcon` retorna um componente React, portanto `react` e `phosphor-react-native` são declarados como `peerDependencies`.

**Decisão de design:** as funções `resolveActivityNames` e `resolveFirstActivityName` — que fazem lookup no array de academias — foram movidas para `@mygym/data`. Isso evitaria que `utils` dependesse de `data`, mantendo `utils` como package verdadeiramente agnóstico.

---

### `@mygym/data`

Dados mockados do domínio e funções de consulta sobre eles:

```ts
// Dados
export const gyms: Gym[]         // 4 academias com atividades
export type Gym, Activity        // contratos de domínio

// Consultas
export function resolveActivityNames(gymId, activityIds)
export function resolveFirstActivityName(gymId, activityIds?)
```

**Sem peerDependencies:** dados e funções de consulta são JavaScript puro, sem React.

**Por que as funções de lookup estão aqui e não em `utils`?** Porque dependem do array `gyms`. Colocá-las em `utils` criaria uma dependência `utils → data`, que depois se tornaria um ciclo quando `data` precisasse de tipos de `utils`. Funções vivem junto com os dados que consultam.

---

### `@mygym/store`

Estado global da aplicação, implementado com Zustand:

```ts
// O que expõe:
useCheckInStore()         // hook de acesso ao estado
CompletedCheckIn          // tipo público (usado pelo dashboard)
CheckInRating             // tipo público

// Estado gerenciado:
isActive, activeGymId, activeGymName, activeActivityIds, startTime
history: CompletedCheckIn[]

// Ações:
startCheckIn(gymId, gymName, activityIds?)
endCheckIn(caloriesBurned?)
saveRating(checkInId, rating)
canCheckInToday()
```

**Por que é um package separado?** É o **contrato formal** entre `feature-check-in` (produtor) e `feature-dashboard` (consumidor). Sem ele, dashboard precisaria importar de check-in — criando acoplamento direto — ou cada feature teria sua própria store — e o estado nunca seria compartilhado.

```
feature-check-in  →  @mygym/store  ←  feature-dashboard
     (escreve)      (contrato neutro)      (lê)
```

**`peerDependencies: { zustand }`** — Zustand precisa ser **singleton**: uma única instância no bundle. Se `@mygym/store` instalasse sua própria cópia, haveria duas instâncias de Zustand — duas stores separadas — e o dashboard nunca veria o check-in ativo. Declarando como `peerDep`, a responsabilidade de instalar o Zustand cabe a `apps/mygym`, que provê uma cópia única para todos.

> **Contraste com Re.Pack:** em Module Federation, o singleton do Zustand precisa ser declarado explicitamente como `shared: { zustand: { singleton: true } }`. Em Turborepo, o hoisting garante o singleton por construção — é estruturalmente impossível ter duplicatas enquanto não houver conflito de versão.

---

### `@mygym/navigation`

Package **exclusivamente de tipos TypeScript** — zero código que executa em runtime:

```ts
export type RootTabParamList = { Home: undefined; FindGyms: undefined }
export type CheckInStackParamList = { GymList: undefined; CheckInConfirmation: { gymId: string } }
export type DashboardStackParamList = { DashboardHome: undefined; WorkoutFinish: undefined }
```

**Por que existe?** Resolve dois problemas ao mesmo tempo:

1. **Dependência de feature para app:** `CheckInConfirmationScreen` precisa navegar para a aba `Home` após um check-in. Esse tipo (`RootTabParamList`) só pode existir em um package *abaixo* das features no grafo. Se ficasse em `apps/mygym`, teríamos `feature-check-in → apps/mygym` — uma feature dependendo do app que a consome (ciclo).

2. **Dependência entre features:** sem um package neutro de tipos, a feature que precisasse de um tipo de rota da outra seria forçada a importar diretamente dela.

**Sem peerDependencies:** tipos são apagados pelo compilador TypeScript. Em runtime, os nomes de rota são strings gerenciadas pelo React Navigation — este package não gera nenhum byte no bundle final.

---

### `@mygym/ui`

Biblioteca de componentes reutilizáveis do design system Kinetic Editorial:

| Componente | Responsabilidade |
|---|---|
| `Button` | Gradiente primário, variantes secondary e outline |
| `AppText` | Sistema tipográfico (display, headline, body, label, caption) |
| `Chip` | Seleção de atividade (ativo/inativo) |
| `GymCard` | Card de academia com foto, rating, tags e CTA |
| `TopAppBar` | Barra superior com logo |
| `StatCard` | Cartão de estatística (ícone + valor + label) |
| `ActivityBadge` | Badge de atividade selecionada |
| `TimerDisplay` | Cronômetro em tipografia display |
| `StarRating` | Avaliação pós-treino com 5 estrelas |

**Dependências internas:** `@mygym/theme` (tokens), `@mygym/data` (tipo `Gym` usado em `GymCard`), `@mygym/utils` (`formatDuration` usado em `TimerDisplay`).

**peerDependencies:** `react`, `react-native`, `expo-linear-gradient`, `phosphor-react-native`, `react-native-safe-area-context` — todos precisam ser singleton no bundle.

---

### `@mygym/feature-check-in`

Módulo de domínio responsável por todo o fluxo de entrada em uma academia:

```
GymListScreen              → lista academias, respeita limite diário
CheckInConfirmationScreen  → seleciona atividades, dispara startCheckIn()
CheckInStack               → stack navigator interno do módulo
```

**Comunicação com dashboard:** apenas via `@mygym/store`. Ao confirmar o check-in, chama `startCheckIn()` e navega para a aba `Home` via `RootTabParamList`. O dashboard detecta `isActive: true` e exibe o cronômetro — sem saber que check-in existiu.

---

### `@mygym/feature-dashboard`

Módulo de domínio responsável por acompanhar e finalizar treinos:

```
DashboardEmptyScreen       → estado inicial (pode fazer check-in)
DashboardActiveScreen      → treino em andamento, cronômetro ao vivo
WorkoutFinishScreen        → finalização, avaliação pós-treino
DashboardPostWorkoutScreen → histórico das últimas sessões
DashboardStack             → stack navigator + lógica de qual tela exibir
```

A lógica de qual tela mostrar vive no `DashboardStack`, que lê `isActive` e `canCheckInToday()` da store para renderizar a tela correta. Isso centraliza a decisão no módulo que a executa, sem que o app integrador precise conhecê-la.

---

### `apps/mygym`

O único app shippable do workspace. É o **integrador**: não tem lógica de negócio, só composição.

**Responsabilidades exclusivas:**
- Registrar as fontes Inter via `@expo-google-fonts/inter`
- Prover `SafeAreaProvider` e `NavigationContainer`
- Montar o `RootNavigator` (tabs Home e FindGyms)
- Declarar como `dependencies` reais todos os packages que os features declaram como `peerDependencies` (react, react-native, zustand, expo-blur, etc.)

**Por que o app é quem instala as peerDeps?** Porque o app é o ponto de convergência — é ele que vai gerar o bundle final. Quando o Metro começa a bundlar, precisa encontrar uma única cópia de cada lib. O app garante isso sendo o único a instalar versões concretas.

---

## Como os Packages se Comunicam

### Via estado compartilhado (canal principal)

```
CheckInConfirmationScreen
  └── useCheckInStore().startCheckIn(gymId, gymName, activityIds)
                              ↓
                     @mygym/store (Zustand)
                              ↓
DashboardStack
  └── useCheckInStore().isActive → renderiza DashboardActiveScreen
DashboardActiveScreen
  └── useCheckInStore().activeGymId, activeActivityIds, startTime
WorkoutFinishScreen
  └── useCheckInStore().endCheckIn(), saveRating()
```

### Via tipos de navegação (canal de roteamento)

```
CheckInConfirmationScreen
  └── navigation.getParent<BottomTabNavigationProp<RootTabParamList>>()
       .navigate('Home')     ← tipo vem de @mygym/navigation
```

### Via props (canal do integrador)

O `RootNavigator` em `apps/mygym` compõe os dois stacks em tabs. É o único ponto que conhece ambas as features simultaneamente — mas não as conecta diretamente, apenas as posiciona em abas separadas.

---

## Conceitos Técnicos Chave

### `workspace:*`

Sintaxe do pnpm para referenciar packages do próprio monorepo:

```json
"dependencies": {
  "@mygym/ui": "workspace:*"
}
```

O `*` significa "qualquer versão" — como todos os packages são `private: true` e `version: "0.0.0"`, isso equivale a "use o que está aqui". O pnpm cria um symlink em `node_modules/@mygym/ui` apontando para `packages/ui/`.

### `node-linker=hoisted`

Por padrão o pnpm isola cada package — cada um tem seu `node_modules/` próprio com symlinks. O Metro não entende essa estrutura (ele busca módulos subindo a hierarquia de pastas). Com `node-linker=hoisted`, o pnpm cria um único `node_modules/` plano na raiz do workspace, compatível com a resolução hierárquica do Metro.

### `peerDependencies`

Mecanismo que evita múltiplas cópias de libs críticas no bundle:

- **Sem peerDep:** `@mygym/ui` instala seu próprio `react` → dois Reacts no bundle → `Invalid Hook Call`
- **Com peerDep:** `@mygym/ui` declara que precisa de `react` mas não o instala → `apps/mygym` instala uma cópia → todos compartilham

### Cache do Turborepo

O Turbo calcula um hash dos inputs de cada task (arquivos fonte, variáveis de ambiente, deps). Se o hash não mudou desde a última execução, o resultado é restaurado do cache sem rodar novamente. Na segunda execução de qualquer task (`typecheck`, `build`, `lint`), você verá `>>> FULL TURBO` — todas as tasks puladas, resultado instantâneo.

---

## Testes Unitários

Três packages possuem testes unitários, cobrindo a lógica de negócio pura da aplicação:

| Package | Arquivo | Cenários |
|---|---|---|
| `@mygym/utils` | `gym.test.ts` | 5 — mapeamento de ícones por `activityId`, incluindo fallback para atividades desconhecidas |
| `@mygym/data` | `resolvers.test.ts` | 7 — resolução de nomes de atividades (gym válido, gym inexistente, lista vazia, `undefined`) |
| `@mygym/store` | `checkInStore.test.ts` | 9 — estado inicial, `startCheckIn`, `endCheckIn` com calorias, `canCheckInToday` nas três situações, `saveRating` |

**Por que esses três packages?** São os que contêm **lógica testável de forma isolada** — funções puras e estado gerenciado. Os packages `ui` e `feature-*` teriam testes de renderização de componentes, que exigem setup mais elaborado e ficam fora do escopo desta PoC.

**Resetando o estado da store entre testes:** Zustand mantém o estado no módulo JS entre chamadas. O `beforeEach` reseta manualmente os campos de dados (preservando as funções):

```ts
beforeEach(() => {
  useCheckInStore.setState({
    isActive: false,
    activeGymId: null,
    history: [],
    // ...
  })
})
```

**Cache de testes em ação:**

```bash
# Primeira execução — cache frio (~15s entre os 3 packages)
pnpm turbo run test

# Segunda execução sem mudanças — cache quente
pnpm turbo run test
# → Tasks: 3 successful, 3 total
# → Cached: 3 cached, 3 total
# → Time: 42ms >>> FULL TURBO
```

O Turbo cacheia o resultado (passou/falhou) de cada package individualmente. Se apenas `@mygym/store` mudar, só os testes do store são re-executados — `utils` e `data` permanecem no cache.

---

## Build

### `build` vs `build:measure`

`apps/mygym` tem dois scripts relacionados a build:

```json
"build":         "expo export --platform android",
"build:measure": "time npx expo export --platform android"
```

| Script | Propósito | Cache do Turbo |
|---|---|---|
| `build` | Task padrão orquestrada pelo Turbo | Sim — output `dist/` é cacheado |
| `build:measure` | Medição direta para o TCC (ignora o Turbo) | Não — bypassa o Turbo completamente |

**Por que packages não têm `build`?** Packages internos são consumidos diretamente como código-fonte TypeScript pelo Metro. Não existe step de compilação intermediário — Metro transforma os `.tsx` durante o bundling do app. Um `tsc` em `@mygym/ui` para gerar `dist/` seria ignorado, porque o campo `main` de cada package aponta para `src/index.ts`.

**O que o cache do Turbo faz no `build`:** na primeira execução, o Metro roda o `expo export` completo e o Turbo guarda o `dist/` no cache. Na segunda execução sem mudanças em nenhum arquivo de entrada, o Turbo restaura o `dist/` do cache sem invocar o Metro.

```bash
# Cache frio — Metro bundla tudo (~30–60s)
pnpm turbo run build --filter=mygym --force

# Cache quente — Turbo restaura dist/ instantaneamente
pnpm turbo run build --filter=mygym
```

**O que o cache não faz:** se qualquer arquivo do workspace mudar, o cache do build do app é invalidado integralmente — o Metro re-bundla tudo. Diferente de `typecheck` e `test`, onde packages não afetados continuam cacheados, o build final é atômico (Metro gera um único bundle com tudo). Isso é um dado relevante para o TCC: a granularidade do cache Turborepo se manifesta em `typecheck`, `lint` e `test`, mas não no bundle final.

### Medindo para o TCC

```bash
# Comparar build com e sem cache
time pnpm turbo run build --filter=mygym --force   # cache frio
time pnpm turbo run build --filter=mygym           # cache quente

# Typecheck isolado por módulo
time pnpm turbo run typecheck --filter=@mygym/feature-check-in --force
time pnpm turbo run typecheck --filter=@mygym/feature-check-in  # cache quente

# Testes com e sem cache
time pnpm turbo run test --force   # cache frio
time pnpm turbo run test           # cache quente

# Tamanho do bundle gerado
ls -lh apps/mygym/dist/bundles/
```

---

## Como Rodar

```bash
# 1. Na raiz do monorepo — instalar e linkar todos os packages
cd apps/turborepo
pnpm install

# 2. Verificar singleton de deps críticas (ver seção abaixo)
pnpm why react --recursive
pnpm why zustand --recursive

# 3. Checar tipos em todos os packages (na ordem correta do grafo)
pnpm turbo run typecheck

# 4. Rodar o app
cd apps/mygym
pnpm start
```

### Validando singletons com `pnpm why --recursive`

`pnpm why <pacote>` mostra por que um pacote está instalado e quem o referencia. A flag `--recursive` é obrigatória em monorepos — sem ela, o pnpm inspeciona apenas o package do diretório atual e não encontra nada se a dep não estiver declarada localmente.

O output de `pnpm why react --recursive` mostra o grafo completo de quem depende de `react`. A linha mais importante está no final:

```
Found 1 version of react
```

Uma única cópia em todo o workspace — confirmação de que `peerDependencies` + hoisting funcionou. Ao longo do output, a palavra `[deduped]` aparece após praticamente toda lib:

```
├── react-native-safe-area-context@5.7.0 [deduped]
├── phosphor-react-native@3.0.6 [deduped]
├── expo-linear-gradient@15.0.8 [deduped]
```

`[deduped]` significa "já resolvida acima, esta não é uma nova cópia" — prova visual do hoisting: uma única instância de cada lib compartilhada por todos os packages que a referenciaram.

Os packages internos (`@mygym/feature-check-in`, `@mygym/feature-dashboard`, `@mygym/ui`, `@mygym/utils`) aparecem como **consumidores** de `react`, não como instaladores. Eles chegam ao mesmo `react@19.1.0` via `peerDependencies` — exatamente o comportamento esperado.

**Exceção esperada — `expo-font` com duas versões:**

```
expo-font@14.0.11   ← dependência interna do expo (não controlada por nós)
expo-font@55.0.6    ← instalada por apps/mygym
```

Não é problema. `expo-font` não guarda estado compartilhado entre packages — diferente de `react` e `zustand`, que quebrariam com duplicação. Libs de registro de fontes, utilitários e formatadores podem coexistir em múltiplas versões sem efeito colateral.

---

## Métricas Coletadas

| Métrica | Comando | Cache frio → quente |
|---|---|---|
| Build full (bundle Android) | `time pnpm turbo run build --filter=mygym --force` vs sem `--force` | ~30–60s → <1s |
| Build Metro puro (sem cache Turbo) | `time pnpm run build:measure` em `apps/mygym` | referência para comparar com monolito |
| Typecheck isolado por módulo | `time pnpm turbo run typecheck --filter=@mygym/feature-check-in --force` vs sem `--force` | ~2–5s → <100ms |
| Testes unitários | `time pnpm turbo run test --force` vs sem `--force` | ~15s → ~42ms |
| Tamanho do bundle | `ls -lh apps/mygym/dist/bundles/` após build | — |

---

## Limitações e Custos

| Custo | Descrição |
|---|---|
| Config do Metro | Necessário configurar `watchFolders` e `nodeModulesPaths` manualmente |
| `node-linker=hoisted` | Perde o isolamento estrito do pnpm; deps não declaradas podem vazar via hoisting |
| Overhead de configuração | 9 `package.json`, 9 `tsconfig.json` vs 1 de cada no monolito |
| Bundle final idêntico | O Metro gera um único bundle — o ganho é em DX e segurança de tipos, não em tamanho de bundle |
| Singleton não garantido em conflito | Se dois packages exigirem versões incompatíveis de zustand, o pnpm instala duas cópias — o estado some silenciosamente |
