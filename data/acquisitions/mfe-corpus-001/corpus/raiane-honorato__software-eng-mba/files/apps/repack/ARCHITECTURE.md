# Arquitetura — MyGym Re.Pack (Module Federation)

> Documento de referência para o capítulo comparativo do TCC _"Abordagens de Micro Frontend em React Native: Modularização em Build-time versus Federação em Runtime"_. Descreve as decisões arquiteturais da versão Re.Pack, o grafo de dependências e os trade-offs em relação ao monolito e à versão Turborepo. É o par simétrico de [`apps/turborepo/ARCHITECTURE.md`](../turborepo/ARCHITECTURE.md).

---

## Princípio norteador

**Um host, mini-apps federados em runtime.**

O app entregue ao usuário é um **host** — a única casca instalável — que carrega os módulos de domínio (`check-in`, `dashboard`) como **bundles separados, baixados pela rede em runtime** via Module Federation. A separação entre módulos não existe só em desenvolvimento: ela **persiste em produção**, como fronteira de rede.

Isso contrasta diretamente com a versão Turborepo, onde o Metro funde tudo num **único bundle** e a separação some no build. Lá a modularização é uma propriedade de tempo de build; aqui é uma propriedade de runtime.

O que se mantém **idêntico** entre as duas versões é o **código de domínio** (telas, componentes, store, navegação, regras de negócio). O que muda é o **regime de integração** — e é essa a variável isolada que o TCC compara.

---

## A decisão central: mini-app vs. serviço compartilhado

Esta é a decisão arquitetural que define a versão Re.Pack, e o coração deste documento. Cada package do Turborepo precisou ser classificado: vira um **mini-app (remote)**, carregado em runtime, ou um **serviço compartilhado (shared)**, unificado como singleton?

### O critério — três perguntas

Um package merece ser **mini-app (remote)** se responde **sim** a pelo menos uma:

1. **Deploy independente importa?** Quero atualizar este código via OTA, sem release na loja?
2. **Time/repo isolado importa?** Este código seria desenvolvido por outro time, possivelmente em outro repositório?
3. **Roda sozinho faz sentido?** Este pedaço se sustentaria como um app standalone?

Três "não" → **serviço compartilhado** (`shared` singleton). As peças móveis do runtime (download, ScriptManager, manifesto, latência, code signing) só se pagam quando há um motivo de runtime; sem motivo, é complexidade pura.

Eixo ortogonal: **infraestrutura que precisa ser singleton** (framework, design system, tipos, contrato de estado) é **sempre** shared — independente das três perguntas. Não se OTA-iza o React; ele é o chão.

### Classificação aplicada ao MyGym

| Package (no Turborepo)                   | Natureza                          | Decisão              | Por quê                                                          |
| ---------------------------------------- | --------------------------------- | -------------------- | ---------------------------------------------------------------- |
| `feature-check-in`                       | Vertical de domínio (produtor)    | **MINI-APP**         | Candidato natural a OTA / time isolado; é uma "loja" do shopping |
| `feature-dashboard`                      | Vertical de domínio (consumidor)  | **MINI-APP**         | Idem; e roda standalone (mostra estado vazio)                    |
| `@mygym/store`                           | Contrato de estado (Zustand)      | **SHARED singleton** | Serviço/contrato puro, sem UI — ver abaixo                       |
| `@mygym/theme`                           | Design system (cores, tipografia) | **SHARED singleton** | Infraestrutura estável; consistência entre remotes               |
| `@mygym/ui`                              | Componentes visuais               | **SHARED singleton** | Biblioteca de UI estável; consumida por ambas as features        |
| `@mygym/navigation`                      | Tipos de rota                     | **SHARED singleton** | Contrato de navegação; `@react-navigation` precisa ser singleton |
| `@mygym/data`                            | Mock + tipos de domínio           | **SHARED singleton** | Contrato de domínio centralizado                                 |
| `@mygym/utils`                           | Funções puras                     | **SHARED**           | Sem estado, sem UI                                               |
| `tsconfig`/`eslint-config`/`jest-config` | Config de build                   | **build-time (dev)** | Não é runtime; não entra em `shared`                             |
| `host` (novo)                            | Shell orquestrador                | **HOST**             | Substitui o papel de `apps/mygym`                                |

**Resultado:** 2 mini-apps · 6 shared singletons · 3 configs de build · 1 host.

### Por que `@mygym/store` NÃO é remote (e no showcase o `auth` é)

Este é o ponto de decisão mais rico. No `super-app-showcase` da Callstack, o `auth` (estado + serviço) é um **remote**. Pela analogia direta, o `store` também poderia ser. Mas o `store` é serviço/contrato **puro, sem interface** — e é aí que diverge. Pelas três perguntas:

1. **Deploy independente?** Não. O `store` é o **contrato** entre check-in e dashboard. Mudar o shape de `CompletedCheckIn` quebra o contrato: ambos os consumidores recompilam de qualquer jeito. OTA não salva de mudança de contrato.
2. **Time/repo isolado?** Não. É minúsculo e central; ninguém o desenvolveria isolado.
3. **Roda sozinho?** Não — é uma store, não um app.

Três "não" → **shared singleton**. O showcase fez `auth` ser remote por dois motivos que o MyGym **não** tem: (a) o alvo real são times/repos independentes (o `news` vive em outro repo e **não consegue** dar `import` num pacote local, mas **consegue** consumir `auth` como remote); (b) o objetivo didático de _demonstrar_ que dá para compartilhar estado via MF.

**Achado:** _compartilhar estado em runtime via remote é possível, mas para um app de monorepo único o estado-contrato é melhor servido como shared singleton — o remote só se justifica quando há fronteira de repositório ou deploy independente do próprio estado._

> **Distinção ortogonal:** "ser shared" ≠ "ficar no monorepo". Distribuição (build-time: package local ou publicado no npm) e unificação de instância (runtime: shared singleton) são eixos independentes. Num cenário com repo de catálogo separado, `ui`/`theme`/`data` virariam _published packages_, e o `store` seria _publicado E shared singleton_ ao mesmo tempo.

---

## Grafo de dependências

Setas indicam "depende de". Nenhuma seta aponta para cima.

```
                 shared singletons (build-time; eager no host)
   ┌───────────────────────────────────────────────────────────┐
   │  react · react-native · @react-navigation/* · zustand      │
   │  react-native-svg · screens · safe-area · linear-gradient  │
   │  @mygym/theme · @mygym/ui · @mygym/navigation              │
   │  @mygym/data · @mygym/utils · @mygym/store                 │
   └───────────────────────────────────────────────────────────┘
                 ▲                ▲                ▲
                 │  consumidos via "shared" (resolução em runtime)
                 │                │                │
        ┌────────┴───────┐   ┌────┴─────────┐   ┌──┴──────────────┐
        │  HOST (shell)  │   │  check-in    │   │  dashboard      │
        │  binário/loja  │   │  (REMOTE)    │   │  (REMOTE)       │
        │  eager provider│   │  expõe       │   │  expõe          │
        │  Bottom Tabs   │   │  ./CheckIn   │   │  ./Dashboard    │
        └───────┬────────┘   │  Stack       │   │  Stack          │
                │            └──────────────┘   └─────────────────┘
                │  lazy import (rede, runtime)      ▲
                └───────────────────────────────────┘
```

**Regras que sobrevivem do Turborepo** (são arquiteturais, não do Re.Pack):

- `check-in` e `dashboard` **não se importam diretamente** — comunicam só pelo `@mygym/store`.
- Setas de dependência só apontam para baixo.

**O que muda em relação ao Turborepo:** a fronteira host→feature deixa de ser um `workspace:*` resolvido no install e passa a ser uma **URL de rede resolvida em runtime** (`check-in@http://localhost:9001/ios/mf-manifest.json`).

---

## Duas camadas de resolução (a chave do regime)

O mesmo `@mygym/store` é resolvido por **duas camadas** que convivem:

| Camada                  | Onde                | O que faz                                                          |
| ----------------------- | ------------------- | ------------------------------------------------------------------ |
| `workspace:*`           | `package.json`      | resolve o import localmente, em build-time (o _onde_)              |
| `shared: { singleton }` | `rspack.config.mjs` | garante instância única entre bundles, em runtime (a _identidade_) |

No Turborepo só existe a primeira camada. Como o Metro funde tudo num bundle, o singleton é consequência automática. No Re.Pack, cada bundle tem seu próprio grafo de módulos — o `workspace:*` faz o import compilar, mas **não** garante instância única em runtime. Isso exige a segunda camada, explícita. É por isso que o singleton, gratuito no build-time, precisa ser **declarado** no runtime.

---

## Comunicação entre features

Idêntica em intenção ao Turborepo; diferente em mecanismo.

### 1. Estado compartilhado — canal principal

`check-in` escreve (`startCheckIn`), `dashboard` lê (`isActive`, `history`). Nenhum sabe do outro. A diferença: o `@mygym/store` é o **mesmo módulo** nos dois bundles porque está declarado `shared: { singleton: true }` — não porque o Metro os fundiu.

### 2. Navegação cruzada — canal de roteamento

Ao confirmar o check-in, o app navega da aba Academias para a aba Início — cruzando a fronteira **de um remote para o outro**. Isso funciona porque:

- há **um único `NavigationContainer`**, no host;
- `@react-navigation/*` é **shared singleton** — host e remotes compartilham a mesma instância de navegação ao aninhar;
- os tipos de rota vêm de `@mygym/navigation` (shared).

É isto que torna `@mygym/navigation` shared **obrigatório**, não opcional.

### 3. Composição — de props para lazy import

No Turborepo, o `RootNavigator` recebia os stacks como **props** (injeção em build-time). No Re.Pack, o host **lazy-importa** os stacks de cada remote (injeção em runtime):

```tsx
const CheckInStack = React.lazy(() =>
  import("checkin/CheckInStack").then((m) => ({ default: m.CheckInStack })),
);
```

Mesma intenção (host não conhece o interior das features), mecanismo diferente — e a diferença é puramente atribuível ao regime.

---

## Preservação de estado — provada empiricamente

O experimento que fecha o arco "build-time versus runtime". No Turborepo o singleton da store é **gratuito**; aqui foi **declarado e provado** que sobrevive à fronteira de bundles.

### O mecanismo

`@mygym/store` está em `shared: { '@mygym/store': { singleton: true } }`. Quando check-in chama `startCheckIn()` e dashboard lê `isActive`, ambos falam com **a mesma store** — mesmo morando em bundles diferentes, baixados em momentos diferentes.

Nuance: **`zustand` ser singleton não basta.** O módulo `@mygym/store` é quem chama `create()`. Se ele for duplicado, são dois `create()` → duas stores, mesmo com uma única cópia de `zustand`. O que precisa ser singleton é o **contrato de estado** (o módulo da store), não só a biblioteca de baixo.

### A prova (com e sem `singleton`)

Instrumentação temporária guardou a referência de `useCheckInStore` num global dentro de cada mini-app:

|             | `shared: singleton` | `===` no console | Comportamento                                        | Commit reproduzível |
| ----------- | ------------------- | ---------------- | ---------------------------------------------------- | ------------------- |
| **Prova 1** | com                 | `true`           | estado compartilhado (cronômetro ativo no dashboard) | `6128533`           |
| **Prova 2** | sem                 | `false`          | estado partido (check-in confirma, dashboard vazio)  | `8a1abae`           |

**Achado consolidado:**

> Build-time (Turborepo) entrega o singleton de estado **gratuitamente**, como propriedade do grafo de módulos único. Runtime (Re.Pack/MF) exige **declará-lo explicitamente**; quando omitido, o estado se **fragmenta silenciosamente** — um bug que não existe no regime build-time.

Este é, provavelmente, o resultado mais forte do TCC.

---

## Decisões técnicas

### Sem Expo — React Native CLI puro (bare)

Module Federation pressupõe controle total do bundler (Rspack via Re.Pack), incompatível com o fluxo gerenciado do Expo. Decisão: bare RN CLI. É uma diferença de toolchain **inerente ao regime runtime** (MF só existe no Rspack) — não uma escolha arbitrária. O código de domínio é mantido idêntico.

**Swaps de plataforma (do Expo para bare):**

| Expo (monolito/Turborepo)                | Bare (Re.Pack)                               | Nota                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `expo-font` + `@expo-google-fonts/inter` | `.ttf` linkados via `react-native.config.js` | iOS casa `fontFamily` pelo nome **PostScript** (`Inter-SemiBold`), não pelo arquivo — o tema teve de mudar de `Inter_600SemiBold` para `Inter-SemiBold` |
| `expo-linear-gradient`                   | `react-native-linear-gradient`               | export default; e **não dimensiona pelo conteúdo** na nova arquitetura → gradiente vira `absoluteFill` atrás de uma `View`                              |
| `expo-blur`                              | `@react-native-community/blur`               | props diferentes (`blurType`/`blurAmount`)                                                                                                              |
| `expo-status-bar`                        | `StatusBar` do `react-native`                | —                                                                                                                                                       |

### Rspack + Module Federation V2

Re.Pack substitui o Metro pelo Rspack. `ModuleFederationPluginV2` (que estende `@module-federation/enhanced`) declara a federação. O host tem `remotes` (consome) + `shared` eager; cada mini-app tem `exposes` (publica) + `shared` não-eager.

- **`eager: true` no host, `false` nos mini-apps** — o host embute os singletons no boot (fornecedor); os mini-apps consomem os do host.
- **`name` do container é um identificador JS global** → sem hífen. O container do check-in é `checkin` (a pasta/pacote continua `check-in`).

### `shared-deps` — um mini-`getSharedDependencies`

Um helper único (`packages/shared-deps/sharedDeps.mjs`) monta o objeto `shared`, parametrizado por `{ eager }`. Evita repetir a lista de singletons nos três `rspack.config`.

**Fonte única de versões via `pnpm catalog`**, não o SDK do showcase. Mas o Module Federation **não lê `catalog:`** (ele veria o texto literal e desligaria a verificação de versão). Então o helper faz a ponte: **lê a versão instalada** de cada lib (do `package.json` em `node_modules`) e a entrega ao MF como `requiredVersion`. Resultado: catalog como fonte única **e** verificação do MF funcionando, com ~15 linhas — sem `rnx-kit/align-deps` nem publicação no npm.

> O aparato pesado do showcase (SDK + align-deps + publicação) é **acidental** — função dos repos separados. O **essencial** (uma fonte única que sirva build-time e runtime) cabe num helper minúsculo quando o repo é único.

### O inventário completo de `shared` — o que é singleton e por quê

O `shared` não é só os `@mygym/*` internos. Ele inclui libs **externas** que precisam ser instância única no super app inteiro. Cada uma está lá por um motivo distinto — e agrupá-las por motivo deixa claro que "singleton" não é uma categoria só:

| Lib                                                       | Categoria                  | Por que precisa ser singleton                                                                                                                           |
| --------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react`, `react-native`                                   | **Framework**              | Duas cópias → "two Reacts" → `Invalid Hook Call`. É o chão.                                                                                             |
| `@react-navigation/native`, `native-stack`, `bottom-tabs` | **Navegação**              | Uma única instância de navegação para a navegação cruzada entre abas funcionar (aninhar host + remotes no mesmo `NavigationContainer`).                 |
| `react-native-safe-area-context`                          | **Contexto + view nativa** | Um único provider de insets; além disso registra view nativa.                                                                                           |
| `react-native-screens`                                    | **View nativa**            | Registra views nativas de tela; dupla no super app quebra o registro.                                                                                   |
| `react-native-svg`                                        | **View nativa**            | Registra views; é a base do `phosphor-react-native`.                                                                                                    |
| `react-native-linear-gradient`                            | **View nativa**            | Registra a view `BVLinearGradient` — a descoberta abaixo.                                                                                               |
| `@react-native-community/blur`                            | **View nativa**            | Registra a view de blur.                                                                                                                                |
| `phosphor-react-native`                                   | **Lib comum pesada**       | Usada por host + ambos os remotes. Não registra view nativa (é JS sobre svg), mas sem singleton cada remote baixa a lib de ícones inteira (ver abaixo). |
| `zustand`                                                 | **Estado (engine)**        | Motor da store; instância única.                                                                                                                        |
| `@mygym/store`                                            | **Estado (contrato)**      | A store em si (o `create()` que precisa rodar uma única vez).                                                                                           |
| `@mygym/theme`, `ui`, `navigation`, `data`, `utils`       | **Domínio / design**       | Contrato e instância consistentes entre os remotes.                                                                                                     |

Há duas categorias que a documentação de MF quase não menciona, e foram as que mais custaram a descobrir — cada uma por um mecanismo diferente:

- **View nativa** (por corretude): é a evidência de que a disciplina de singleton **se estende às libs nativas**. Sem singleton, dois bundles registram a mesma view e o app **crasha** (ver "Módulos nativos" abaixo).
- **Lib comum pesada** (por eficiência): não quebra nada, mas **encarece silenciosamente** — sem singleton, cada remote re-baixa a lib inteira (ver "Compartilhar libs pesadas" abaixo).

### Módulos nativos não se federam — e "compartilhar" tem dois níveis

Os remotes entregam **só JS**; rodam dentro do runtime nativo do host, que é o único binário instalado. Para entender o que isso exige, é preciso ver que uma lib nativa (ex.: `react-native-linear-gradient`) tem **duas metades**:

- **Metade nativa** — o código Obj-C/Kotlin que desenha a view (a _view manager_ `BVLinearGradient`). Vira código de máquina, compilado no binário.
- **Metade JS** — o pacote npm: o componente React `<LinearGradient>` **e** a chamada `requireNativeComponent('BVLinearGradient')`, que **registra** um descritor de view sob esse nome no lado JS.

Cada metade se "compartilha" por um mecanismo diferente:

**Metade nativa → basta estar no binário do host.** Código nativo não se federa nem se OTA-iza — não pode ser baixado. Ele precisa já ter sido compilado no host, e por isso o `host/package.json` declara toda dependência nativa que qualquer remote use (o `pod install`/autolink compila no binário). O compartilhamento é **automático**: como só existe **um runtime nativo**, o JS de qualquer remote que renderize `<LinearGradient>` acaba dirigindo essa **única** view manager. O `package.json` dos remotes não participa disso — remotes não geram binário.

> Falha se faltar: `native module not found` / `Unimplemented component`. E: adicionar uma lib nativa nova num remote **exige rebuild + release do host** (não dá OTA) — um limite concreto do runtime.

**Metade JS → precisa ser `shared: singleton`.** Aqui está a sutileza. O remote **importa e usa** `<LinearGradient>`, então o bundle dele carrega **sua própria cópia da metade JS** — inclusive a chamada `requireNativeComponent('BVLinearGradient')`. Se a lib não estiver no `shared`, há duas cópias do JS, e cada uma tenta registrar o descritor:

```
metade NATIVA:  1 no binário do host  ✅ (uma view manager, inerentemente única)

metade JS:      host bundle     → registra descritor "BVLinearGradient"   (1ª vez)
                check-in bundle → registra descritor "BVLinearGradient"   (2ª vez) ❌
```

O RN aborta: `Tried to register two views with the same name BVLinearGradient`. Repare que o **nativo estar único não impede isso** — a duplicação é na camada JS. O container do check-in quebra ao avaliar, e o `React.lazy` recebe `undefined` (foi o bug real caçado durante a construção). O fix é `shared: { 'react-native-linear-gradient': { singleton: true } }`: uma cópia só do JS (a do host, eager), o remote consome ela, e o registro roda **uma vez**.

Ou seja, para uma lib de view nativa são necessárias **as duas** coisas, em camadas independentes:

| Metade                          | Como se compartilha                | Onde resolvemos     | Falha se faltar                |
| ------------------------------- | ---------------------------------- | ------------------- | ------------------------------ |
| **Nativa** (compila no binário) | só o host declarar + `pod install` | `host/package.json` | `native module not found`      |
| **JS** (registra o descritor)   | `shared: { singleton: true }`      | `sharedDeps.mjs`    | `two views with the same name` |

Uma pergunta responde "o código nativo existe?"; a outra, "o JS que registra roda uma vez?". O dashboard não usa gradiente/blur → nunca dispara a segunda → carregava normal; o check-in usa → precisou das duas.

Este é um modo de falha **inexistente no build-time** (um bundle único registra cada view uma vez, sempre), sem detecção automática — só aparece em runtime, ao abrir a aba do remote afetado, e como um erro obscuro. Uma decisão de dependência dentro de um mini-app pode quebrar outro; gerenciar deps deixa de ser decisão local e passa a exigir raciocínio sobre o ecossistema inteiro. É carga cognitiva e superfície de erro inerentes ao regime runtime.

### Compartilhar libs pesadas — o contrapeso do "mantenha o `shared` enxuto"

O princípio geral é manter o `shared` enxuto (cada singleton força recompilar todo mundo ao subir de versão). Mas há um **contrapeso**: uma lib **comum e pesada** que não está no `shared` faz **cada remote empacotar sua própria cópia inteira** — e o usuário a baixa uma vez por remote.

Foi o caso do `phosphor-react-native` (biblioteca de ícones), usado pelo host e pelos dois remotes. Fora do `shared`, ele **não quebrava nada** — diferente do `linear-gradient`, phosphor é JS sobre `react-native-svg` e não registra view nativa. Só **desperdiçava download**: o usuário baixava phosphor **três vezes** (host + check-in + dashboard). É um bug **silencioso e invisível** sem instrumentação — foi a **métrica de tamanho de chunk** que o revelou (ao decompor o `mf-manifest.json` de um remote, phosphor aparecia como ~10 MB de um download que deveria ser de centenas de KB).

Colocando phosphor no `shared`, o download sob demanda do check-in caiu de **~10.16 MB para ~705 KB** (dev), e o host **não cresceu** (já usava phosphor no `RootNavigator`, então a lib já estava no binário; o `shared` só marcou essa cópia como a canônica).

**A lição:** decidir o `shared` é um **equilíbrio**, não uma regra única. Ao critério "precisa ser singleton por corretude" (framework, estado, view nativa) soma-se "vale compartilhar por eficiência" (libs comuns e pesadas). E esse segundo custo **não existe no build-time** — o bundle único do Metro inclui cada lib uma vez, sempre. É mais uma classe de decisão que o regime runtime transfere para o desenvolvedor.

### ScriptManager e code signing (produção — configurados como escopo)

- **ScriptManager + `setStorage(AsyncStorage)`** (cache offline de bundles em produção) foi **deferido**: exige dep nativa e só rende em release real. A federação roda em dev sem ele (o ScriptManager resolve scripts pelo manifest automaticamente).
- **CodeSigningPlugin** (assinatura dos bundles remotos em produção): documentado como obrigatório em produção real, desligado neste PoC.

---

## Ganhos e custos reais

Para o MyGym específico (2 módulos, 1 dev, monorepo único, sem backend):

| Dimensão                  | Avaliação                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Deploy independente / OTA | Existe e é demonstrável, mas **subutilizado** — não há times nem repos separados que o justifiquem. Ganho "no papel".                           |
| Download sob demanda      | Baixo (2 chunks pequenos), mas a métrica de chunks mostra o **mecanismo** que escalaria num super app real.                                     |
| Custo de configuração     | **Alto** — Rspack, MF, shared deps explícitas, Suspense/ErrorBoundary por remote, migração para bare (swaps do Expo). Muito acima do Turborepo. |
| Classe nova de bugs       | Singleton fragmentado, colisão de view nativa, incompatibilidade host-velho × remote-novo — riscos que **não existem** no build-time.           |
| Carga cognitiva           | Alta para 1 dev; o payoff só vem com times/repos independentes e OTA real.                                                                      |

**Conclusão honesta:** para um app único que só precisa de organização de times, o **Turborepo já entrega ganho suficiente sem a complexidade do Re.Pack**. O Re.Pack brilha quando os módulos são **mini-apps que se sustentariam sozinhos** e se quer **deploy independente / OTA** — exatamente o cenário que o showcase existe para mostrar e que o MyGym, deliberadamente, **não** é. É uma indicação preliminar sustentada pela construção das duas PoCs, não veredito universal.

### Métricas quantitativas

**Tamanho do bundle instalado** — o que o usuário baixa da loja. Medido como **bytecode Hermes** (a mesma unidade das três: o `expo export` do mono/turbo já gera `.hbc`; o JS do Re.Pack foi compilado com o mesmo `hermesc -O`), Android, produção:

| Abordagem          | Bundle instalado | O que carrega                                    |
| ------------------ | ---------------- | ------------------------------------------------ |
| Monolito           | 9.38 MB          | app inteiro                                      |
| Turborepo          | 9.39 MB          | app inteiro (bundle único)                       |
| **Re.Pack (host)** | **7.91 MB**      | só shell + shared; features baixadas sob demanda |

O host ship ~1.5 MB (≈16%) a menos — o miolo das features não vai no binário.

**Download sob demanda** (Re.Pack, por aba) — o que o host baixa ao abrir cada feature. Medição em **dev** (inflada vs. produção; ver caveat).

_Como o número é obtido:_ o host, para carregar um remote, busca o `mf-manifest.json` dele — o índice que lista os arquivos JS necessários: o **container** (`metaData.remoteEntry`) e os **chunks do módulo exposto** (`exposes[].assets.js`). O total é a **soma do tamanho de cada arquivo**, medido baixando-o do dev server (`curl -s -o /dev/null -w '%{size_download}'`). O manifesto lista os **nomes**; o **tamanho** vem do download.

| Aba       | Total   | Container MF           | Código de domínio        | Vendors |
| --------- | ------- | ---------------------- | ------------------------ | ------- |
| check-in  | ~705 KB | 616 KB (`remoteEntry`) | 32 KB (`CheckInStack`)   | ~57 KB  |
| dashboard | ~757 KB | 614 KB (`remoteEntry`) | 88 KB (`DashboardStack`) | ~55 KB  |

**Total** = soma de todos os arquivos do manifesto; **Container** e **Domínio** são dois arquivos específicos dessa soma; **Vendors** são chunks de deps auxiliares fora do `shared`.

Entendendo a diferença entre os valores:

- **Container (~615 KB) vs domínio (32–88 KB):** o container é o **encanamento fixo** do MF (registra o remote, resolve os `shared`) — por isso ~igual nos dois remotes. O domínio é o **código das telas**, que varia.
- **check-in (705) vs dashboard (757):** os ~52 KB de diferença estão quase todos no **domínio** (88 vs 32 KB), porque o container é constante — o `dashboard` tem mais telas (4 vs 2).

Leitura: o download por aba é **dominado pelo overhead fixo do container MF (~615 KB)**, não pelo conteúdo de domínio (32–88 KB). Num app pequeno, a federação carrega mais "encanamento" que conteúdo — evidência de que o runtime só compensa acima de um limiar de escala.

**Build isolado por mini-app** (N=10, wall clock, produção Android) — o análogo runtime da granularidade do Turborepo: cada mini-app builda independentemente (rebuildar check-in não toca host/dashboard).

| Mini-app  | Média         | CV%  |
| --------- | ------------- | ---- |
| host      | 5.07s ± 0.20s | 4.0% |
| check-in  | 4.99s ± 0.09s | 1.9% |
| dashboard | 5.15s ± 0.13s | 2.5% |

No Turborepo o build é **atômico** (~18s do app inteiro; qualquer mudança rebuilda tudo). O ganho aqui é a **granularidade** — reconstruir/re-deployar só o módulo que mudou. (Caveat: os ~5s vs ~18s misturam granularidade e bundler — rspack vs Metro+Hermes; o ponto é a independência, não o tempo absoluto.)

> **Caveats metodológicos.** (1) Instalação em bytecode Hermes produção; download sob demanda em JS de dev server (maior que produção) — porque o build standalone do Re.Pack não emite o container federado, só o dev server o produz. (2) Comparar tamanho de binário completo (`.apk` release) seria o número "puro" de download, mas o nativo é ~constante nas três; a camada JS isolada é onde a arquitetura difere.

Resultados completos, comandos de cada métrica e as métricas qualitativas em [`docs/RESULTS-REPACK.md`](../../docs/RESULTS-REPACK.md).

---

## Como rodar

Ver [`README.md`](./README.md) para o passo a passo completo. Resumo:

```bash
cd apps/repack && pnpm install
cd packages/host && npx react-native-asset        # linka as fontes (ios/ não versionado)
cd packages/host && bundle exec pod install --project-directory=ios
cd apps/repack && pnpm start                       # mprocs: host + check-in + dashboard
cd packages/host && pnpm react-native run-ios
```

**Teste de resiliência (exclusivo do runtime):** derrube o dev server de um remote e entre na aba — o `ErrorBoundary` mostra o erro só naquela aba, sem crashar o app. Não tem paralelo no Turborepo.

## Como estender

**Adicionar um novo mini-app (remote):**

1. Criar `packages/feature-nova/` como app RN bare com `rspack.config.mjs` (`exposes`, `eager: false`).
2. Expor o Stack (sem `NavigationContainer`); container fica no host.
3. Adicionar ao `remotes` do host + uma tela-invólucro (`lazy` + `Suspense` + `ErrorBoundary`) + uma aba.
4. Declarar no host qualquer módulo nativo novo que o remote use.

**Adicionar um shared singleton:** incluir na lista do `sharedDeps.mjs` (e no `catalog` se for lib externa). Lembrar: só vai pro `shared` o que precisa mesmo ser singleton — cada singleton força recompilar todo mundo ao subir de versão.

---

## Tabela comparativa final — as três versões

O fechamento do TCC: o mesmo app de domínio (MyGym) em três abordagens — monolito (baseline), modularização em **build-time** (Turborepo) e federação em **runtime** (Re.Pack). Cada linha é uma frase potencial da Discussão.

### Arquitetura e integração

| Dimensão                    | Monolito              | Turborepo (build-time)              | Re.Pack + MF (runtime)                  |
| --------------------------- | --------------------- | ----------------------------------- | --------------------------------------- |
| Bundler                     | Metro                 | Metro                               | **Rspack** (via Re.Pack)                |
| Toolchain                   | Expo                  | Expo                                | **Bare RN CLI** (sem Expo)              |
| Fronteira entre módulos     | Convenção de pastas   | `package.json` (enforçada em build) | **URL de rede** (enforçada em runtime)  |
| Quantos bundles             | Um                    | Um                                  | **Vários** (host + um por mini-app)     |
| Quando os módulos se juntam | —                     | No build                            | **Em runtime, pela rede**               |
| Singleton de estado         | Automático (um grafo) | Automático (um grafo)               | **Declarado** (`shared: { singleton }`) |
| Deploy independente / OTA   | Não                   | Não                                 | **Sim** (estrutural)                    |

### Métricas (Android, produção; detalhes em `RESULTS-*.md`)

| Métrica                       | Monolito     | Turborepo                                        | Re.Pack                          |
| ----------------------------- | ------------ | ------------------------------------------------ | -------------------------------- |
| Bundle instalado (Hermes)     | 9.38 MB      | 9.39 MB                                          | **7.91 MB** (host)               |
| Download sob demanda          | —            | —                                                | ~705–757 KB/aba (dev)            |
| Build                         | atômico ~18s | atômico ~18s frio / **<1s quente** (cache Turbo) | **isolado ~5s/módulo**           |
| Granularidade de re-validação | nenhuma      | dev pipeline (typecheck/lint/test)               | **build por mini-app**           |
| Cache de tarefas              | não          | **sim** (Turbo, orquestrador)                    | não (workspace sem orquestrador) |

> O cache de pipeline é ganho do **Turborepo como orquestrador**, disponível também a um workspace Re.Pack — é eixo ortogonal ao build-time vs runtime (ver `RESULTS-REPACK.md`).

### Custos e riscos

| Dimensão                          | Monolito | Turborepo                       | Re.Pack                                                                                              |
| --------------------------------- | -------- | ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Custo de configuração             | Baixo    | Médio (Metro, hoisting)         | **Alto** (MF, ScriptManager, shared, bare, code signing)                                             |
| Custo de onboarding               | Baixo    | Médio (workspaces)              | Alto (Module Federation)                                                                             |
| Rastreabilidade de bugs           | Alta     | Alta (bundle único)             | Média (múltiplos contextos; falhas só em runtime)                                                    |
| Classes novas de bug              | —        | Singleton em conflito de versão | Singleton fragmentado · colisão de view nativa · download duplicado de lib pesada · skew host×remote |
| Autonomia de time / repo separado | Nenhuma  | Boa (packages isolados)         | **Máxima** (mini-apps deployáveis)                                                                   |

**Síntese:** o monolito é o mais simples e suficiente para um app pequeno; o Turborepo adiciona fronteiras enforçadas e cache de pipeline com custo moderado, valendo a partir de dois ou mais desenvolvedores em paralelo; o Re.Pack entrega binário menor, deploy independente e OTA, mas ao custo de configuração alta e novas classes de bug — vantajoso **apenas acima de um limiar de escala/organização** (times/repos independentes, necessidade real de OTA) que o MyGym, por desenho, não atinge. A tese que as três versões sustentam empiricamente: **cada regime só se paga quando o problema que ele resolve existe de fato.**
