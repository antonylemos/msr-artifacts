# MyGym — Monolito

> **Contexto do TCC:** Esta é a primeira versão de três PoCs que compõem o trabalho *"Abordagens de Micro Frontend em React Native: Modularização em Build-time versus Federação em Runtime"*. O monolito serve de **baseline** — uma implementação sem modularização formal, usada como referência para comparar métricas e complexidade arquitetural com as versões Turborepo e Re.Pack.

---

## O que é esta versão?

Um app React Native convencional: um único `package.json`, um único `node_modules`, todas as telas e lógica em `src/`. Não há orquestrador de build, não há separação de packages, não há fronteiras enforçadas entre módulos.

A separação entre `check-in` e `dashboard` existe apenas como convenção de pastas — nada impede um import cruzado acidental entre eles.

---

## Estrutura

```
src/
├── components/       # Componentes de UI compartilhados (Button, GymCard, etc.)
├── data/             # Dados mockados (academias, atividades)
├── modules/
│   ├── check-in/     # Listagem de academias e confirmação de check-in
│   └── dashboard/    # Acompanhamento de treino, cronômetro e histórico
├── navigation/       # RootNavigator, stacks e tipos de rota
├── store/            # Estado global com Zustand (checkInStore)
├── theme/            # Cores e tipografia (Kinetic Editorial)
└── utils/            # Funções utilitárias (ícones, calorias, datas)
```

---

## Como rodar

```bash
yarn install
yarn start       # Expo dev server
yarn android     # Android
yarn ios         # iOS
```

---

## Comandos de verificação e medição

```bash
yarn typecheck       # Verificação de tipos (projeto inteiro)
yarn lint            # ESLint (src/)
yarn lint:fix        # ESLint com correção automática
yarn test            # Testes unitários (21 cenários)
yarn build           # expo export --platform android
yarn build:measure   # Mesmo que build, com time para medir duração
```

---

## Testes

21 testes unitários cobrindo a lógica de negócio pura:

| Arquivo | Cenários |
|---|---|
| `src/__tests__/utils/gym.test.ts` | 15 — `activityIcon`, `resolveFirstActivityName`, `resolveActivityNames` |
| `src/__tests__/store/checkInStore.test.ts` | 9 — estado inicial, `startCheckIn`, `endCheckIn`, `saveRating`, `canCheckInToday` |

Os testes espelham os mesmos cenários da versão Turborepo, permitindo comparação direta. A diferença mais visível está em `resolveFirstActivityName`: no monolito, a função recebe o objeto `CompletedCheckIn` completo (acoplada ao shape da store); no Turborepo, recebe apenas `{ gymId, activityIds }` (desacoplada). Essa diferença é um achado arquitetural explícito da comparação.

---

## Acoplamentos conhecidos

Pontos onde a falta de fronteiras formais gera acoplamento implícito:

- `src/utils/gym.ts` importa `CompletedCheckIn` de `src/store/checkInStore.ts` — uma função utilitária que conhece o shape do estado global
- Qualquer tela pode importar qualquer outra via caminho relativo — não há erro de TypeScript ou lint que impeça isso
- Uma mudança em `src/theme/` revalida o projeto inteiro no typecheck — não há granularidade por módulo

Esses pontos são intencionalmente mantidos para fins de contraste com a versão Turborepo, onde cada um foi eliminado por imposição estrutural dos packages.
