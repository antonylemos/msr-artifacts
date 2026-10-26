# Arquitetura — MyGym Turborepo

> Documento de referência para o capítulo comparativo do TCC *"Abordagens de Micro Frontend em React Native: Modularização em Build-time versus Federação em Runtime"*. Descreve as decisões arquiteturais da versão Turborepo, o grafo de dependências e os trade-offs em relação ao monolito e à versão Re.Pack.

---

## Princípio norteador

**Um binário, módulos em build-time.**

O app entregue ao usuário é um único arquivo JavaScript gerado pelo Metro — indistinguível de um monolito em runtime. A modularização existe exclusivamente em tempo de desenvolvimento e build: packages separados, fronteiras enforçadas por `package.json`, cache granular por unidade de trabalho.

Isso contrasta diretamente com a versão Re.Pack, onde a separação é mantida em runtime via Module Federation: múltiplos bundles JS carregados dinamicamente.

---

## Grafo de dependências

Setas indicam "depende de". Nenhuma seta aponta para cima.

```
                    ┌─────────────────────────────────────┐
                    │           apps/mygym                │
                    └──┬──────────────────────────┬───────┘
                       │                          │
          ┌────────────▼─────────┐   ┌────────────▼──────────┐
          │ @mygym/feature-      │   │ @mygym/feature-       │
          │    check-in          │   │    dashboard          │
          └──┬──┬──┬──┬──────────┘   └──┬──┬──┬──┬──────────┘
             │  │  │  │                 │  │  │  │
             │  │  │  └─────────────────┘  │  │  │
             │  │  │        @mygym/navigation  │  │
             │  │  │                          │  │
             │  │  └──────────────────────────┘  │
             │  │           @mygym/store          │
             │  │                                 │
             │  └─────────────────────────────────┘
             │              @mygym/ui
             │               ├── @mygym/theme
             │               ├── @mygym/data
             │               └── @mygym/utils
             │
             └── @mygym/data
             └── @mygym/utils
```

**Regra inviolável:** `feature-check-in` e `feature-dashboard` nunca se importam diretamente. A comunicação é mediada exclusivamente por `@mygym/store`.

Esta regra não é apenas uma convenção — é estruturalmente enforçada: `@mygym/feature-check-in/package.json` não declara `@mygym/feature-dashboard` como dependência. Uma tentativa de import gera erro de TypeScript imediatamente.

---

## Packages — responsabilidade e justificativa

| Package | Camada | Responsabilidade | Por que existe |
|---|---|---|---|
| `@mygym/tsconfig` | Config | TypeScript base compartilhado | Centraliza flags — mudança em um lugar afeta todos |
| `@mygym/eslint-config` | Config | ESLint base compartilhado | Mesmo padrão em todos os packages |
| `@mygym/jest-config` | Config | Jest base compartilhado | Cache granular por package de teste |
| `@mygym/theme` | Foundation | Cores e tipografia | Muda em ritmo diferente do código — cache isolado |
| `@mygym/data` | Foundation | Dados mockados e resolvers de domínio | Encapsula a decisão de onde vivem os dados |
| `@mygym/utils` | Foundation | Funções puras (calorias, datas, ícones) | Sem identidade de domínio — reusável em qualquer contexto |
| `@mygym/store` | Contract | Estado global Zustand | **Contrato formal** entre as features |
| `@mygym/navigation` | Contract | Tipos de rota TypeScript | Previne dependência circular feature → app → feature |
| `@mygym/ui` | UI | Componentes do design system | Reutilizável, agnóstico de domínio |
| `@mygym/feature-check-in` | Feature | Fluxo de seleção e confirmação de check-in | Domínio isolado: produz estado |
| `@mygym/feature-dashboard` | Feature | Acompanhamento e histórico de treino | Domínio isolado: consome estado |
| `apps/mygym` | App | Composição e bootstrap | Único ponto de integração |

---

## Comunicação entre features

Features não se comunicam diretamente. Existem três canais formais:

### 1. Estado compartilhado — canal principal

```
CheckInConfirmationScreen
  └── useCheckInStore().startCheckIn(gymId, gymName, activityIds)
                            │
                     @mygym/store
                            │
DashboardStack              │
  └── useCheckInStore().isActive ──► qual tela renderizar
DashboardActiveScreen
  └── useCheckInStore().activeGymId, activeActivityIds, startTime
WorkoutFinishScreen
  └── useCheckInStore().endCheckIn(), saveRating()
```

`check-in` escreve. `dashboard` lê. Nenhum sabe da existência do outro.

### 2. Tipos de navegação — canal de roteamento

`CheckInConfirmationScreen` precisa navegar para a aba `Home` após confirmar um check-in. Isso requer `RootTabParamList`, que pertence ao app — mas features não podem depender do app (criaria ciclo). O package `@mygym/navigation` resolve: define os tipos numa camada neutra que ambas as features podem importar.

```ts
// feature-check-in, sem depender de apps/mygym
navigation
  .getParent<BottomTabNavigationProp<RootTabParamList>>()
  .navigate('Home')
```

### 3. Composição — canal do integrador

`apps/mygym` é o único ponto que conhece ambas as features simultaneamente. Importa `CheckInStack` e `DashboardStack`, monta as tabs. Não há lógica de negócio aqui — só composição.

---

## Preservação de estado entre features

Este é o mecanismo central que diferencia Turborepo de Re.Pack em termos de complexidade de configuração.

### Como funciona em Turborepo

Metro gera **um único bundle JS** com **um único grafo de módulos**. Quando dois arquivos importam `@mygym/store`, Metro resolve ambos para o mesmo arquivo físico e usa o mesmo identificador de módulo:

```js
// Runtime do bundle (pseudocódigo)
function require(moduleId) {
  if (cache[moduleId]) return cache[moduleId].exports  // ← retorna a mesma referência
  // ... primeira vez: executa o módulo e cacheia
}
```

`create(...)` do Zustand é executado **uma única vez**, na primeira importação. Todas as features recebem a mesma instância de store. O singleton é **automático** — a linguagem garante.

### Como isso seria diferente em Re.Pack

Re.Pack com Module Federation gera **múltiplos bundles**, um por remote. Cada bundle tem seu próprio grafo de módulos. `@mygym/store` seria importado e executado separadamente em cada remote — duas stores, estado não compartilhado.

A solução em Re.Pack é declarar explicitamente:
```js
shared: { '@mygym/store': { singleton: true, eager: true } }
```

O que no Turborepo é gratuito, em Re.Pack é configuração explícita e uma classe nova de bugs silenciosos se esquecida.

---

## Decisões técnicas

### pnpm com `node-linker=hoisted`

pnpm por padrão isola cada package em seu próprio `node_modules/` com symlinks. O Metro não entende essa estrutura — ele resolve módulos subindo a hierarquia de diretórios. `node-linker=hoisted` força pnpm a criar um `node_modules/` plano na raiz do workspace, compatível com a resolução hierárquica do Metro.

Custo: perde-se o isolamento estrito do pnpm (deps não declaradas podem vazar via hoisting). A disciplina de `peerDependencies` nos packages internos compensa parcialmente.

### `peerDependencies` para libs de estado e UI

`react`, `react-native` e `zustand` são declarados como `peerDependencies` nos packages internos — não como `dependencies`. Isso garante que apenas `apps/mygym` instala versões concretas, e o hoisting coloca uma única cópia em `node_modules/`. Duas cópias de `react` causam `Invalid Hook Call`; duas cópias de `zustand` causam estado silenciosamente perdido entre features.

### Metro com `watchFolders` e `nodeModulesPaths`

```js
config.watchFolders = [workspaceRoot]           // Metro vigia mudanças fora de apps/mygym
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),  // resolve deps hoisted na raiz
]
```

Sem isso, editar `@mygym/ui` não seria detectado pelo Metro, e deps hoisted não seriam encontradas.

### `workspace:*` como referência interna

```json
"dependencies": { "@mygym/ui": "workspace:*" }
```

pnpm cria um symlink em `node_modules/@mygym/ui` apontando para `packages/ui/`. `main: "./src/index.ts"` nos packages internos faz Metro consumir o código-fonte diretamente — sem step de compilação intermediário.

---

## Ganhos mensuráveis

Medições em Apple Silicon, macOS Darwin 24.6.0. Detalhes completos em [`/docs/RESULTS.md`](/docs/RESULTS.md).

### Cache quente (sem mudanças de código)

| Comando | Monolito | Turborepo | Ganho |
|---|---|---|---|
| `typecheck` | 1.4s | 35ms | **40x** |
| `lint` | 1.5s | 31ms | **48x** |
| `test` | 4.2s | 31ms | **135x** |
| `build` (expo export) | 18.4s | 57ms¹ | **320x** |

¹ Cache hit restaura `dist/` sem invocar Metro. Cache frio do Turborepo: 11.8s (vs 18.4s do monolito).

### Pós-alteração isolada (time de feature-check-in)

Mesma mudança aplicada em `GymListScreen.tsx` dos dois projetos:

| Comando | Monolito | Turborepo | Packages re-validados |
|---|---|---|---|
| `typecheck` | 1.3s | 3.1s² | 2 de 9 |
| `lint` | 1.3s | 1.2s | 1 de 9 |
| `test` | 4.4s | 34ms | 0 de 3 |

² Typecheck do turborepo é mais lento que o monolito neste cenário específico porque o projeto é pequeno. Em projetos com 10+ features, o monolito cresceria linearmente; o Turborepo manteria o escopo limitado ao que mudou.

---

## Custos reais

| Custo | Impacto |
|---|---|
| Configuração do Metro | `watchFolders` + `nodeModulesPaths` — necessário, não trivial para quem não conhece o Metro |
| `node-linker=hoisted` | Perde isolamento estrito; deps não declaradas podem ser importadas acidentalmente |
| Overhead de arquivos | 11 `package.json`, 9 `tsconfig.json`, 9 `.eslintrc.js`, 3 `jest.config.js` vs 1 de cada no monolito |
| Cache frio mais lento | 13s vs 7s — o Turborepo é mais lento na primeira execução |
| Singleton não garantido em conflito de versão | Se dois packages exigirem versões incompatíveis de zustand, pnpm instala duas cópias silenciosamente |
| Valor real para 1 desenvolvedor | Baixo — o overhead de config supera o ganho de autonomia de time para projetos solo |

---

## Como rodar

```bash
cd apps/turborepo
pnpm install

# Verificar singletons
pnpm why react --recursive
pnpm why zustand --recursive

# Validar todo o workspace
pnpm turbo run typecheck
pnpm turbo run lint
pnpm turbo run test

# Rodar o app
cd apps/mygym && pnpm start

# Medir build
pnpm turbo run build --filter=mygym --force   # cache frio
pnpm turbo run build --filter=mygym           # cache quente
```

## Como estender

**Adicionar uma nova feature:**
1. Criar `packages/feature-nova/` com `package.json`, `tsconfig.json`, `.eslintrc.js`
2. Declarar dependências de `@mygym/ui`, `@mygym/store`, `@mygym/navigation`
3. Exportar o Stack navigator
4. Importar em `apps/mygym/src/navigation/RootNavigator.tsx`
5. Rodar `pnpm install` na raiz

A feature nasce isolada — não tem acesso a outras features a não ser que seja declarado explicitamente.

**Adicionar um novo package de dados:**
1. Criar `packages/novo-dominio/` com `main: "./src/index.ts"`
2. Nenhum package existente é afetado — o Turborepo só re-valida quem depender dele

---

## Paralelo com Re.Pack

| Aspecto | Turborepo | Re.Pack + MF |
|---|---|---|
| Quando a separação existe | Build-time | Runtime |
| Bundle final | Um único JS | Múltiplos JS (host + remotes) |
| Singleton de estado | Automático (um bundle, um módulo) | Explícito (`shared: { singleton: true }`) |
| Atualização OTA | Não — exige nova versão na loja | Sim — remotes podem ser atualizados via HTTP |
| Desenvolvimento paralelo | Sim — packages isolados | Sim — remotes isolados |
| Complexidade de config | Média (Metro + pnpm) | Alta (webpack + MF + chunks + shared) |
| Rastreabilidade de bugs | Alta — bundle único, stack traces claros | Média — múltiplos contextos de execução |
| Custo de onboarding | Médio — requer entender workspaces | Alto — requer entender Module Federation |
