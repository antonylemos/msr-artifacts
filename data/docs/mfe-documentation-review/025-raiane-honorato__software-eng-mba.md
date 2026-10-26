---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 025 — raiane-honorato/software-eng-mba

## Leitura do repositório

Repositório de TCC de MBA (em português) que implementa o mesmo app React Native (MyGym) três
vezes para comparar regimes de modularização: monolito (baseline), Turborepo (build-time) e
Re.Pack/Module Federation (runtime) (`README.md:1-8,27-39`). Há também uma spike anterior,
`apps/repack-poc/`, com um host e um remote mínimos. A documentação é extensa e didática: além do
`README.md` raiz, cada versão tem seu próprio `README.md` e, para Turborepo e Re.Pack, um
`ARCHITECTURE.md` longo que registra decisões, trade-offs e (em `apps/repack/ARCHITECTURE.md`)
uma prova empírica da fragmentação de estado sem `shared: { singleton: true }` (`:148-171`).

Cinco documentos são o boilerplate padrão gerado pelo `@react-native-community/cli`
(`apps/repack-poc/host/README.md`, `apps/repack-poc/remote/README.md`,
`apps/repack/packages/{check-in,dashboard,host}/README.md` — todos byte-idênticos, confirmado por
hash) e não trazem nenhuma afirmação sobre o projeto; não viram linha. `UX/kinetic_velocity/DESIGN.md`
é um documento de design system visual (paleta, tipografia, componentes) sem afirmação arquitetural
sobre unidades de frontend; o título da seção 2
(`:16`) embute, sem função alguma, um caminho de arquivo local (`/Users/raiane/Desktop/TCC/UX/...`)
— resíduo de edição, não uma instrução.

As ocorrências `doc-mfe-term` (`README.md:1,3`; `apps/monolith/README.md:3`;
`apps/repack/ARCHITECTURE.md:3`; `apps/repack/README.md:3`; `apps/turborepo/ARCHITECTURE.md:3`;
`apps/turborepo/README.md:3`) são todas o mesmo enquadramento de contexto do TCC ("esta é a
N-ésima das três PoCs..."), sem afirmação verificável nova; elas são registradas aqui, sem linha na tabela. Da mesma
forma, `apps/repack-poc/README.md:1,3,86` (título, nome da spike, instrução de checkpoint) e
`apps/repack/ARCHITECTURE.md:1` (título) são menção solta ou instrução de execução.

As seções de métricas quantitativas e avaliações qualitativas (`README.md:68-89`;
`apps/repack/ARCHITECTURE.md:280-323,325-331,333,397-403`; `apps/turborepo/ARCHITECTURE.md:176-214,258-266,268-269` (a linha 267 é a afirmação 31, na tabela);
grande parte de `apps/turborepo/README.md`) — tamanho de bundle, tempo de build, tamanho de chunk,
custo de onboarding — são medições e avaliações qualitativas, não afirmações verificáveis sobre
como as unidades se compõem, constroem ou implantam; ficam fora da tabela. Isso inclui a tabela
"Custos e riscos" de `apps/repack/ARCHITECTURE.md:397-403`, com as ocorrências `:400` ("Custo de
onboarding … Alto (Module Federation)", `doc-integration-technology`) e `:402` ("Classes novas de
bug … skew host×remote", `doc-host-remote`): são notas qualitativas por regime, e `:402` só lista
como risco mecanismos que já estão nas linhas 10-12, sem afirmação verificável nova. Dentro de
`apps/repack/ARCHITECTURE.md:280-336`, as linhas `:324` e `:332` são exceção: além da medição,
afirmam propriedades verificáveis de build (build isolado por mini-app, reconstrução só do módulo
alterado) e por isso viram a linha 29; `:334` afirma a ausência de container federado no build
standalone e vira a linha 30. Em `README.md:91-97` ("Principais achados"), as linhas 93, 96 e 97
são avaliações/generalizações sem propriedade nova (repetem ou interpretam as métricas); as linhas
94 e 95 fazem afirmações verificáveis sobre o mecanismo de `shared` — singleton de estado (linha
10) e os dois motivos adicionais de singleton, view nativa e lib pesada (linhas 11 e 12) — por isso
viram linha, e não ficam na Leitura. O `README.md` e o `ARCHITECTURE.md` de cada versão citam
`docs/RESULTS-WITH-SAMPLE.md`, `docs/RESULTS-REPACK.md` e `docs/RESULTS.md` como fonte dos números
completos (`README.md:70`; `apps/turborepo/ARCHITECTURE.md:178`), mas nenhum `docs/` existe no
snapshot — só `scripts/results/*.csv`; não afeta as afirmações acima, mas é uma lacuna de referência
que vale registrar. A tabela "Packages — O que é cada um e por que existe"
(`apps/turborepo/README.md:238-497`) e a tabela de times (Lei de Conway,
`apps/turborepo/README.md:160-179`) descrevem responsabilidade interna de cada package e
atribuição organizacional, não a composição entre unidades frontend; ficam fora da tabela.

Outras ocorrências `doc-*` repetem, sem propriedade verificável nova, afirmações já na tabela:
`apps/repack/ARCHITECTURE.md:179` repete a linha 7 (sem Expo); `apps/repack/README.md:1,9,12,16`
repete a definição de Module Federation das linhas 5 e 7; `apps/turborepo/ARCHITECTURE.md:13,131` e
`apps/turborepo/README.md:411` repetem as linhas 4 e 10 (bundle único / singleton automático vs. declarado). `apps/repack/ARCHITECTURE.md:62,64,290,292` são
avaliações e generalizações hipotéticas ("o remote só se justifica quando há fronteira de
repositório..."; "distinção ortogonal..."; "carga cognitiva alta"; "conclusão honesta"), não
afirmações verificáveis contra este snapshot. Em `apps/repack-poc/README.md`, as linhas 15 e 37 (títulos de seção), 28 (bloco de código que
reproduz o `rspack.config.mjs` do remote) e 68, 82, 84 (passo a passo de como os apps foram
montados) são, respectivamente, título, bloco de configuração reproduzido e instrução de execução —
sem afirmação nova. A linha 7, além da nota de status da spike, afirma como o remote é baixado e
vira a linha 13.

Mais repetições sem propriedade nova: `apps/repack/ARCHITECTURE.md:136` (composição via `props` no
Turborepo vs. `lazy import` no Re.Pack — já nas linhas 4 e 5); `:212,218` (linhas da tabela de
inventário `shared` — já nas linhas 20 e 12); `:360-361` (passo a passo de "como estender", mesma
seção procedural de `:340-365`); `apps/repack/README.md:14,25,104,126` (diagrama e texto que
repetem papel host/mini-app, portas e carregamento lazy — linhas 5, 16, 20, 11); e
`apps/turborepo/ARCHITECTURE.md:263` (tabela "Paralelo com Re.Pack", mesma comparação das linhas 4
e 5). `apps/repack/README.md:81` não é repetição do singleton JS: repete as afirmações das linhas
25 (host como único binário) e 26 (o host carrega o nativo de todos os remotes); o resto da frase
("embarca as fontes") e o passo 0a que a segue (`:83-87`) são instalação, citados no parágrafo da
linha 25.

Foram lidos os comentários de `apps/repack/packages/shared-deps/sharedDeps.mjs:1-9,25-27,37-39,42-44,49-51,61-66`,
de `apps/repack/packages/check-in/rspack.config.mjs:9-12,40-41,45,47`, de
`apps/repack/packages/dashboard/rspack.config.mjs:9-12,43,45`, de `apps/repack/packages/host/rspack.config.mjs:48,53`,
de `apps/repack/packages/host/react-native.config.js:3-4`, de `apps/repack/pnpm-workspace.yaml:4-6`,
de `apps/repack/packages/host/App.tsx:8-10` e de `apps/repack/packages/{check-in,dashboard}/App.tsx:7-10`:
eles repetem, com o mesmo mecanismo, afirmações já extraídas de `apps/repack/ARCHITECTURE.md`/`README.md`
(singleton declarado por `shared`, motivo de cada lib estar lá, `NavigationContainer` só no host,
`eager` do fornecedor e dos consumidores, versões vindas do catalog e entregues ao MF); por isso
entram nos parágrafos das
linhas 10, 11, 12, 18, 19, 20, 22, 23 e 24, não como linhas novas.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:18-21 | "`check-in` \| **Produtor** de estado \| ...; `dashboard` \| **Consumidor** de estado \| ..." | composição | corroborada | 3.4.5 #4; apps/repack/packages/check-in/src/screens/CheckInConfirmationScreen.tsx:52; apps/repack/packages/dashboard/src/screens/WorkoutFinishScreen.tsx:50-53; apps/repack/packages/store/src/checkInStore.ts:69-90 |
| 2 | README.md:23 | "`check-in` e `dashboard` **nunca se importam diretamente** — comunicam-se apenas por uma store compartilhada (`@mygym/store`, Zustand)" | composição | corroborada | 3.4.3 (linhas apps/repack/packages/check-in e apps/repack/packages/dashboard; apps/turborepo/packages/feature-check-in e apps/turborepo/packages/feature-dashboard); 3.4.5 #4; apps/turborepo/ARCHITECTURE.md:47-49 |
| 3 | README.md:31 | "**Monolito** \| baseline \| Expo + Metro \| Um projeto, sem modularização; fronteiras só por convenção de pastas \| `apps/monolith/`" | estrutura | corroborada | 3.4.3 (linha apps/monolith); apps/monolith/README.md:9-11,69-77 |
| 4 | README.md:32 | "**Turborepo** \| build-time \| ... \| Módulos em packages separados; fronteiras enforçadas por `package.json`; **fundidos num bundle único no build** \| `apps/turborepo/`" | composição | corroborada | 3.4.3 (linhas apps/turborepo/packages/feature-check-in, apps/turborepo/packages/feature-dashboard: `No`; apps/turborepo/apps/mygym: `Yes`, única unidade shippable); 3.4.6 #7; apps/turborepo/ARCHITECTURE.md:9-13,47-49 |
| 5 | README.md:33 | "**Re.Pack** \| runtime \| ... \| Host + mini-apps em **bundles separados, carregados pela rede em runtime** \| `apps/repack/`" | composição | corroborada | 3.4.5 relações #2, #3; 3.4.4 (linhas src-remote-import de CheckInTab.tsx e DashboardTab.tsx); apps/repack/ARCHITECTURE.md:9-15 |
| 6 | README.md:33 | "...; deploy independente / OTA" | build-deploy | sem corroboração | — |
| 7 | README.md:57-58,64 | "Module Federation pressupõe controle total do bundler (Rspack), incompatível com o fluxo gerenciado do Expo" — por isso o Re.Pack roda em "React Native CLI puro (bare)" | build-deploy | corroborada | 3.4.6 (linhas 2, 4-6, configuração Rspack dos três pacotes); apps/repack/packages/host/app.json:1-4 (sem campos Expo, ao contrário de apps/monolith/app.json) |
| 8 | README.md:85 | "Sustentada pelo modo standalone de cada mini-app..." | independência | corroborada | 3.4.3 (linha apps/repack/packages/check-in: "entrada standalone com `NavigationContainer`"); apps/repack/packages/check-in/App.tsx:7-21; apps/repack/packages/dashboard/App.tsx:1-22; apps/repack/README.md:136 |
| 9 | README.md:85 | "...e pelo **teste de resiliência** (derrubar um remote → `ErrorBoundary` isola o erro numa aba, sem crashar o app)" | composição | corroborada | 3.4.4 (linhas `runtime-composition` de CheckInTab.tsx:19-23 e DashboardTab.tsx:14-18) |
| 10 | README.md:94 | "No build-time o singleton da store é automático... No runtime ele precisa ser **declarado** (`shared: { singleton: true }`); omitir fragmenta o estado silenciosamente" | composição | corroborada | apps/repack/packages/shared-deps/sharedDeps.mjs:52-58,70-76 (`@mygym/store` em `LOCAL_PACKAGES`, `singleton: true` aplicado no laço de `sharedDeps`); 3.4.5 #4; apps/turborepo/ARCHITECTURE.md:111-138 |
| 11 | README.md:95 | "Libs de **view nativa** precisam ser singleton por corretude (senão o app crasha ao registrar a view duas vezes)" | composição | corroborada | apps/repack/packages/shared-deps/sharedDeps.mjs:40-41 (`react-native-linear-gradient`, `@react-native-community/blur` em `RUNTIME_LIBS`) |
| 12 | README.md:95 | "libs **comuns e pesadas** precisam ser singleton por eficiência (senão cada remote re-baixa a lib inteira — descoberto medindo os chunks: um esquecimento inflava o download em ~10 MB)" | composição | parcial | apps/repack/packages/shared-deps/sharedDeps.mjs:45 (`phosphor-react-native` em `RUNTIME_LIBS`, confirma a correção); medição de antes/depois não tem artefato no snapshot |
| 13 | apps/repack-poc/README.md:7 | "no Network tab só aparece o **manifest** (vem por `fetch`); o **bundle do remote em si não aparece** porque é baixado pelo `ScriptManager` do Re.Pack via módulo nativo, fora da camada JS de rede" | composição | parcial | apps/repack-poc/host/rspack.config.mjs:45 (remote declarado por `http://localhost:9001/${platform}/mf-manifest.json`); 3.4.5 relação #1; download do bundle pelo `ScriptManager` sem artefato no snapshot |
| 14 | apps/repack-poc/README.md:17-20 | "`host/` \| Consumidor (shell) \| ... Importa a tela do remote via `React.lazy`... `remote/` \| Produtor \| ... **expõe** `HelloScreen` como um bundle federado" | composição | corroborada | 3.4.5 relação #1; 3.4.4 (linha src-remote-import de App.tsx:26) |
| 15 | apps/repack-poc/README.md:20 | "Não roda sozinho na spike — só serve o bundle." | independência | parcial | 3.4.6 #3 (remote servido só pelo dev server); apps/repack-poc/README.md:100-101; apps/repack-poc/remote/index.js:5-9 e apps/repack-poc/remote/rspack.config.mjs:17 (entrada própria, que registra o `App` do template); apps/repack-poc/remote/App.tsx:8,31-34 (`NewAppScreen` do template, sem `HelloScreen`); uso relatado na spike sem artefato |
| 16 | apps/repack-poc/README.md:58 | "**`eager`: `true` no host, `false` no remote.** O host carrega react/react-native de imediato (fornecedor); o remote os consome do host... Garante uma única instância (`singleton`)" | composição | corroborada | apps/repack-poc/host/rspack.config.mjs:48-49 (`eager: true`); apps/repack-poc/remote/rspack.config.mjs:42-43 (`eager: false`) |
| 17 | apps/repack-poc/README.md:61 | "O `ErrorBoundary` não é opcional: é ele que evita a tela branca quando o remote está fora do ar" | composição | corroborada | apps/repack-poc/host/App.tsx:33-37 (`ErrorBoundary` envolve `Suspense`+`HelloScreen`) |
| 18 | apps/repack/ARCHITECTURE.md:21-50 | "Um package merece ser **mini-app (remote)** se responde **sim** a pelo menos uma [das três perguntas: deploy independente, time/repo isolado, roda sozinho]... Resultado: 2 mini-apps · 6 shared singletons · 3 configs de build · 1 host" | composição | corroborada | 3.4.3 (linhas apps/repack/packages/check-in, apps/repack/packages/dashboard: `Yes`; apps/repack/packages/{data,navigation,store,theme,ui,utils}: `No`); 3.4.2 (linha apps/repack/packages/shared-deps, Notas) |
| 19 | apps/repack/ARCHITECTURE.md:128 | "há **um único `NavigationContainer`**, no host" | composição | corroborada | apps/repack/packages/host/App.tsx:19-21; apps/repack/packages/check-in/rspack.config.mjs:45-46 e apps/repack/packages/dashboard/rspack.config.mjs:43-44 (expõem o stack sem `NavigationContainer`); apps/repack/packages/check-in/src/navigation/CheckInStack.tsx:8-17; apps/repack/packages/dashboard/src/navigation/DashboardStack.tsx:20-27; 3.4.5 #2, #3 |
| 20 | apps/repack/ARCHITECTURE.md:129 | "`@react-navigation/*` é **shared singleton** — host e remotes compartilham a mesma instância de navegação ao aninhar" | composição | corroborada | apps/repack/packages/shared-deps/sharedDeps.mjs:31-33; apps/repack/README.md:51; 3.4.4 (linha host-relationship RootNavigator.tsx:52) |
| 21 | apps/repack/ARCHITECTURE.md:130 | "os tipos de rota vêm de `@mygym/navigation` (shared)" | composição | corroborada | apps/repack/packages/check-in/src/navigation/CheckInStack.tsx:1; apps/repack/packages/dashboard/src/navigation/DashboardStack.tsx:1; apps/repack/packages/host/src/navigation/RootNavigator.tsx:1; apps/repack/packages/navigation/src/params.ts:1-14; apps/repack/packages/shared-deps/sharedDeps.mjs:56,75-76 (`@mygym/navigation` em `LOCAL_PACKAGES`, `singleton: true`) |
| 22 | apps/repack/ARCHITECTURE.md:192,194 | "O host tem `remotes` (consome) + `shared` eager; cada mini-app tem `exposes` (publica) + `shared` não-eager." / "**`eager: true` no host, `false` nos mini-apps** — o host embute os singletons no boot (fornecedor); os mini-apps consomem os do host." | composição | corroborada | apps/repack/packages/host/rspack.config.mjs:53-54 (`sharedDeps({ eager: true })`); apps/repack/packages/check-in/rspack.config.mjs:47-48 e apps/repack/packages/dashboard/rspack.config.mjs:45-46 (`sharedDeps({ eager: false })`); apps/repack/packages/shared-deps/sharedDeps.mjs:67-77 (`eager` repassado a cada entrada de `shared`); 3.4.5 #4 |
| 23 | apps/repack/ARCHITECTURE.md:201 | "**Fonte única de versões via `pnpm catalog`**" | composição | contradita | apps/repack/pnpm-workspace.yaml:7-17 (catalog sem `react`, `react-native` e `phosphor-react-native`); apps/repack/packages/host/package.json:25-27, apps/repack/packages/check-in/package.json:25,27-28 e apps/repack/packages/dashboard/package.json:24-26 (essas três libs com versão literal em cada pacote); apps/repack/packages/shared-deps/sharedDeps.mjs:29-30,45 (as três estão no `shared`) |
| 24 | apps/repack/ARCHITECTURE.md:201 | "o helper faz a ponte: **lê a versão instalada** de cada lib (do `package.json` em `node_modules`) e a entrega ao MF como `requiredVersion`. Resultado: ... verificação do MF funcionando" | composição | corroborada | apps/repack/packages/shared-deps/sharedDeps.mjs:19-23 (`installedVersion` lê `node_modules/<lib>/package.json`); apps/repack/packages/shared-deps/sharedDeps.mjs:70-73 (`version` e `requiredVersion` = versão instalada para cada `RUNTIME_LIBS`); apps/repack/packages/host/rspack.config.mjs:54, apps/repack/packages/check-in/rspack.config.mjs:48, apps/repack/packages/dashboard/rspack.config.mjs:46 (os três lados usam o mesmo helper) |
| 25 | apps/repack/ARCHITECTURE.md:230 | "Os remotes entregam **só JS**; rodam dentro do runtime nativo do host, que é o único binário instalado." | build-deploy | parcial | 3.4.6 #4, #5 (containers `check-in.container.js.bundle` e `dashboard.container.js.bundle`); 3.4.5 #2, #3; 3.4.3 Notas e 3.4.6 Leitura (nenhuma pasta nativa `android/`/`ios/` no snapshot); apps/repack/packages/check-in/package.json:6-7 e apps/repack/packages/dashboard/package.json:6-7 (scripts `run-android`/`run-ios` também nos remotes) |
| 26 | apps/repack/ARCHITECTURE.md:237 | "**Metade nativa → basta estar no binário do host.** ... por isso o `host/package.json` declara toda dependência nativa que qualquer remote use" | build-deploy | corroborada | apps/repack/packages/host/package.json:20,28-31 (`@react-native-community/blur`, `react-native-linear-gradient`, `react-native-safe-area-context`, `react-native-screens`, `react-native-svg`); apps/repack/packages/check-in/package.json:20,26,29-31 e apps/repack/packages/dashboard/package.json:27-29 (as libs nativas dos remotes, todas contidas na lista do host) |
| 27 | apps/repack/ARCHITECTURE.md:239 | "adicionar uma lib nativa nova num remote **exige rebuild + release do host** (não dá OTA)" | build-deploy | sem corroboração | — |
| 28 | apps/repack/ARCHITECTURE.md:273-277 | "**ScriptManager + `setStorage(AsyncStorage)`**... foi **deferido**... **CodeSigningPlugin**... documentado como obrigatório em produção real, desligado neste PoC" | build-deploy | corroborada | ausência de `ScriptManager.setStorage`/`CodeSigningPlugin` em qualquer `rspack.config.mjs` do snapshot (grep em `apps/repack/`) |
| 29 | apps/repack/ARCHITECTURE.md:324 | "cada mini-app builda independentemente (rebuildar check-in não toca host/dashboard)" | build-deploy | corroborada | 3.4.6 (linhas 4, 5, 6: build `separado` para host/check-in/dashboard, cada um com container próprio); scripts/measure-repack.sh:3-5 |
| 30 | apps/repack/ARCHITECTURE.md:334 | "o build standalone do Re.Pack não emite o container federado, só o dev server o produz" | build-deploy | sem corroboração | — |
| 31 | apps/turborepo/ARCHITECTURE.md:267 | "Complexidade de config \| ... \| Alta (webpack + MF + chunks + shared)" | composição | contradita | apps/repack/packages/host/rspack.config.mjs:16-45 (Rspack, via `Repack.defineRspackConfig`/`ModuleFederationPluginV2`); apps/repack/ARCHITECTURE.md:190-192 |

## Observações

**1. Documento (README.md:18-21).** A tabela de módulos do README descreve a responsabilidade
primária de cada módulo — `check-in` como produtor que conduz listagem, seleção e confirmação;
`dashboard` como consumidor que acompanha estado ativo/vazio, cronômetro, **finalização** e
histórico. O código confirma essa direção principal: `check-in` escreve ao confirmar o check-in
(`startCheckIn`, chamado em `apps/repack/packages/check-in/src/screens/CheckInConfirmationScreen.tsx:52`
e implementado em `apps/repack/packages/store/src/checkInStore.ts:41-48`), e `dashboard` lê o estado ativo para o
cronômetro. As escritas de `dashboard` ao finalizar o treino (`endCheckIn`/`saveRating`,
`apps/repack/packages/dashboard/src/screens/WorkoutFinishScreen.tsx:50-53`) já estão dentro da
responsabilidade que a própria tabela atribui a ele ("finalização"); do mesmo modo, a leitura de
`check-in` sobre o histórico para decidir elegibilidade (`canCheckInToday()`,
`apps/repack/packages/store/src/checkInStore.ts:85-90`) é um detalhe interno da sua
responsabilidade de "confirmação de check-in". A tabela não afirma exclusividade de papel — só a
responsabilidade primária — e nada no código a desmente; por isso `corroborada`.

**2. Documento (README.md:23).** A regra de não-importação direta, dita "mantida nas três versões",
é corroborada pela estrutura dos pacotes nas três versões: no Turborepo,
`apps/turborepo/ARCHITECTURE.md:47-49` registra que `@mygym/feature-check-in/package.json` não
declara `@mygym/feature-dashboard` como dependência, e uma tentativa de import gera erro de
TypeScript; no Re.Pack, `check-in` e `dashboard` são bundles separados que só compartilham
`@mygym/store` via `shared` (3.4.5 #4). No monolito a regra é só convenção — `apps/monolith/README.md:69-77`
("Acoplamentos conhecidos") admite que nada impede um import cruzado acidental —, mas nenhum
import cruzado real foi encontrado no snapshot (3.4.4), então a regra se sustenta de fato, embora
sem garantia estrutural nessa versão.

**3. Documento (README.md:31).** Confirmado pela revisão estrutural: `apps/monolith` é a única
unidade da versão baseline, sem workspace nem packages (3.4.3). O próprio `apps/monolith/README.md`
documenta a falta de fronteira formal com um exemplo concreto (`src/utils/gym.ts` importa
`CompletedCheckIn` da store, `:73`).

**4. Documento (README.md:32).** A revisão estrutural marca `apps/turborepo/packages/feature-check-in`
e `feature-dashboard` como `No` (não são unidades frontend; são pacotes do workspace sem entrada
própria) e `apps/turborepo/apps/mygym` como a única unidade `Yes`, que importa as features
diretamente (3.4.3). A revisão de build-deploy mostra um build único por `expo export`/`turbo run
build` para o app, sem build separado por feature (3.4.6 #7). `apps/turborepo/ARCHITECTURE.md:9-13`
reforça: o binário final é "indistinguível de um monolito em runtime".

**5. Documento (README.md:33).** As relações #2 e #3 da revisão de composição confirmam exatamente
este desenho: `apps/repack/packages/host` declara os remotes `checkin` e `dashboard` por
`mf-manifest.json`, resolvidos em `localhost:9001`/`:9002` (3.4.5). `apps/repack/ARCHITECTURE.md:9-15`
acrescenta a nuance de que, ao contrário do Turborepo, "a separação... persiste em produção, como
fronteira de rede" — não apenas em desenvolvimento.

**6. Documento (README.md:33).** A viabilidade de OTA/deploy independente é repetida ao longo da
documentação (`README.md:37,85,105,107`; `apps/repack/README.md:5,37`; `apps/repack/ARCHITECTURE.md:27,33,56,60,286,381,405`),
sempre como capacidade estrutural do regime runtime, nunca como algo implantado. A revisão de
build-deploy não encontrou nenhum artefato de publicação, assinatura ou hospedagem para nenhuma das
sete aplicações do snapshot (3.4.6, Resumo: "Deploy (não observado: 7)"); a própria
`ARCHITECTURE.md:286` concede que o ganho é "subutilizado... Ganho 'no papel'", e `README.md:105`
admite que o MyGym "por desenho, não atinge" o limiar que justificaria OTA real; `README.md:107`
fecha a conclusão pondo a "necessidade de deploy independente" entre os critérios de escolha da
abordagem, avaliação sem propriedade nova. Como nenhum
artefato do snapshot confirma nem contradiz uma capacidade de produção nunca exercitada, fica
`sem corroboração`.

**7. Documento (README.md:57-58,64).** A revisão de build-deploy mostra que os três pacotes de
`apps/repack/` e os dois de `apps/repack-poc/` usam `rspack.config.mjs` e os comandos do Re.Pack
via `react-native.config.js` (3.4.6, linhas 2–6), sem nenhuma dependência ou configuração Expo. O
`app.json` do host Re.Pack só tem `name`/`displayName` (o template padrão do RN CLI bare), ao
contrário do `app.json` do monolito, que traz ícones, splash e configuração Expo completa — a
diferença de toolchain descrita no README é visível na estrutura do próprio arquivo.

**8. Documento (README.md:85).** Confirmado diretamente: `apps/repack/packages/check-in/App.tsx:1-22`
e `apps/repack/packages/dashboard/App.tsx:1-22` são entradas standalone com `NavigationContainer`
próprio, usadas "só quando [o mini-app] roda sozinho (fora do host)" segundo o comentário em
ambos os arquivos (`:7-10`). A revisão estrutural já havia notado isso para o check-in (3.4.3, linha
apps/repack/packages/check-in); o dashboard tem a mesma estrutura, confirmada aqui diretamente no
snapshot.

**9. Documento (README.md:85).** O mecanismo de isolamento de falha é o mesmo registrado pela
revisão de código-fonte como `runtime-composition`: cada tela que carrega um remote é envolvida em
`ErrorBoundary` + `Suspense` (3.4.4, `CheckInTab.tsx:19-23`, `DashboardTab.tsx:14-18`). O mesmo
mecanismo, aplicado à spike (`apps/repack-poc/`), é uma afirmação distinta — o sujeito muda de
`check-in`/`dashboard` para `host`/`remote` — e está na linha 17.

**10. Documento (README.md:94).** Esta é a afirmação central do TCC, e a revisão de composição já a
sustenta estruturalmente: a relação de comunicação (#4) existe porque `@mygym/store` está na lista
`LOCAL_PACKAGES` de `sharedDeps.mjs` (`:52-58`), com `singleton: true` aplicado pelo laço da função
`sharedDeps` (`:70-76`), fornecida eager pelo host e consumida eager:false pelos dois mini-apps
(essa divisão de `eager` é a linha 22).
`apps/repack/ARCHITECTURE.md:148-169` repete a mesma afirmação, com a prova por instrumentação
temporária (commits `6128533`/`8a1abae`) — um relato histórico sobre uma instrumentação removida,
não verificável a partir do snapshot atual, mas o mecanismo que ela descreve (singleton declarado,
não automático) é o que o `shared` atual implementa. `apps/turborepo/ARCHITECTURE.md:111-138` relata
o lado espelhado: no Turborepo, o mesmo `@mygym/store` recebe singleton "de graça" porque o Metro
gera um único grafo de módulos — sem equivalente ao `shared` do MF.

**11. Documento (README.md:95).** `apps/repack/packages/shared-deps/sharedDeps.mjs:40-41` lista
`react-native-linear-gradient` e `@react-native-community/blur` como `RUNTIME_LIBS` singleton,
exatamente as duas libs de view nativa citadas como caso motivador. `apps/repack/ARCHITECTURE.md:241-259`
repete a mesma afirmação com o mecanismo detalhado da metade JS (o erro
`Tried to register two views with the same name BVLinearGradient` sem o `shared`). O que a mesma
seção diz da metade nativa — remotes só com JS, binário único do host, dependências nativas
declaradas no host e rebuild do host ao adicionar uma — são outros mecanismos e estão nas linhas
25, 26 e 27.

**12. Documento (README.md:95).** `apps/repack/packages/shared-deps/sharedDeps.mjs:45` confirma que
`phosphor-react-native` está na lista de singletons compartilhados, o que sustenta a parte da
afirmação sobre a correção aplicada. `apps/repack/ARCHITECTURE.md:263-271` repete a mesma afirmação
com os números: o download sob demanda do check-in caiu de "~10.16 MB para ~705 KB" ao mover
phosphor para o `shared`. Essa medição específica de antes/depois é um relato de uma instrumentação
anterior à correção; não há no snapshot um artefato de medição de chunk antes/depois para
confirmá-la ou refutá-la — só os números finais agregados em `apps/repack/ARCHITECTURE.md:310-313`
(download por aba já com a correção aplicada), que não isolam a contribuição do phosphor. Por isso
`parcial`.

**13. Documento (apps/repack-poc/README.md:7).** A nota de status da spike descreve como o host
obtém o remote: primeiro o manifesto, depois o bundle. A primeira parte se confirma: o host declara
o remote pela URL `http://localhost:9001/${platform}/mf-manifest.json`
(`apps/repack-poc/host/rspack.config.mjs:45`), o mesmo `GET .../ios/mf-manifest.json` que a nota
relata para o simulador iOS, e a revisão de composição registra essa relação (3.4.5 #1). A segunda
parte — o bundle baixado pelo `ScriptManager` por módulo nativo, fora da camada JS de rede — não tem
artefato: nenhum arquivo da spike configura ou chama o `ScriptManager` (a busca em `apps/repack-poc/`
só o encontra nesta linha do README); o host usa `Repack.RepackPlugin` e
`Repack.plugins.ModuleFederationPluginV2` (`apps/repack-poc/host/rspack.config.mjs:40-41`), e qual
camada faz o download é comportamento da biblioteca em execução, que o snapshot não registra. A
captura `poc-evidence.png` citada como evidência não está no snapshot, porque a normalização a retirou como binário (`normalization.json:86`; ela existe no commit `c569ccc`), e é só uma imagem (`apps/repack-poc/` só tem
`host/`, `remote/` e `README.md`). Por isso `parcial`. O resto da linha (status "spike concluída",
o host renderizando "Hello from Remote!") repete o critério de sucesso de `:5`.

**14. Documento (apps/repack-poc/README.md:17-20).** Corresponde exatamente à relação #1 da revisão
de composição: o host da spike declara o remote `remote@http://localhost:9001/.../mf-manifest.json`
(`apps/repack-poc/host/rspack.config.mjs:45`), que expõe `./HelloScreen`
(`apps/repack-poc/remote/rspack.config.mjs:38-40`), carregado por `React.lazy` em
`apps/repack-poc/host/App.tsx:26` (3.4.4, 3.4.5 #1). A frase seguinte da mesma linha da tabela
(`:20`, "Não roda sozinho na spike") fala de outra propriedade, a independência do remote, e é a
linha 15.

**15. Documento (apps/repack-poc/README.md:20).** A frase descreve o uso do remote na spike: ele
só serve o bundle federado e não é executado como app. Essa parte se confirma: a revisão de
build-deploy registra o remote servido só pelo dev server (3.4.6 #3), e o roteiro de execução o sobe
apenas com `react-native start --port 9001` para servir o bundle (`apps/repack-poc/README.md:100-101`).
Mas o snapshot não mostra um remote incapaz de rodar sozinho: ele tem entrada própria, que registra
um `App` no `AppRegistry` (`apps/repack-poc/remote/index.js:5-9`, entrada do build em
`apps/repack-poc/remote/rspack.config.mjs:17`; 3.4.3 marca a unidade `Yes` por isso), e scripts
`android`/`ios` (`apps/repack-poc/remote/package.json:6-7`). Esse `App` é o template do RN CLI sem
alteração (`NewAppScreen`, `apps/repack-poc/remote/App.tsx:8,31-34`), não a `HelloScreen` exposta,
o que é coerente com a spike não ter usado o remote sozinho. Como a frase é um relato de uso ("na
spike") e não uma afirmação de que a entrada não existe, a entrada própria não a contradiz; mas o
uso relatado em si não tem artefato. Por isso `parcial`.

**16. Documento (apps/repack-poc/README.md:58).** O par `eager: true`/`eager: false` está nos
próprios artefatos da spike: `apps/repack-poc/host/rspack.config.mjs:48-49` declara
`eager: true` para `react`/`react-native` (o host fornece); `apps/repack-poc/remote/rspack.config.mjs:42-43`
declara `eager: false` (o remote consome). `:31-32,49-50` (blocos de código que reproduzem essas
configurações) e `:82` (passo a passo) repetem o contraste. A mesma escolha na implementação MyGym
tem outro sujeito — o host e os mini-apps `check-in`/`dashboard` — e por isso é a linha 22.

**17. Documento (apps/repack-poc/README.md:61).** O mecanismo de isolamento de falha na spike é o
`ErrorBoundary` que envolve `Suspense` + `HelloScreen` em `apps/repack-poc/host/App.tsx:33-37`; é a
mesma ideia (lazy + Suspense + ErrorBoundary) que a versão de produção usa para `check-in`/`dashboard`
(linha 9), mas o sujeito é outro — `host`/`remote` da spike, e não as duas unidades do MyGym — por
isso linha própria, e não repetição da #9. `:5` repete a mesma afirmação como critério de
sucesso do teste.

**18. Documento (apps/repack/ARCHITECTURE.md:21-50).** O critério das três perguntas é exatamente o
que separa, na revisão estrutural, as duas unidades mini-app (`check-in`, `dashboard`, ambas `Yes`)
dos seis pacotes shared (`store`, `theme`, `ui`, `navigation`, `data`, `utils`, todos `No`, sem
entrada própria) — 3.4.3. A revisão de dependências já notara que os cinco pacotes com
`@module-federation/enhanced` configurado são justamente host e os dois mini-apps (3.4.2); os
shared singletons não declaram Module Federation, só entram pela lista de `sharedDeps.mjs`.

**19. Documento (apps/repack/ARCHITECTURE.md:128).** É a primeira das três razões que o texto dá
para a navegação cruzada entre as abas funcionar. O host monta o único `NavigationContainer` em
volta do `RootNavigator` (`apps/repack/packages/host/App.tsx:19-21`, com o comentário de `:8-10`).
Os mini-apps expõem só o stack, sem container (`apps/repack/packages/check-in/rspack.config.mjs:45-46`;
`apps/repack/packages/dashboard/rspack.config.mjs:43-44`), e os módulos expostos só criam um
`Stack.Navigator` (`apps/repack/packages/check-in/src/navigation/CheckInStack.tsx:8-17`;
`apps/repack/packages/dashboard/src/navigation/DashboardStack.tsx:20-27`), carregados dentro do
container do host (3.4.5 #2, #3). Os `App.tsx` dos mini-apps têm `NavigationContainer` próprio
(`apps/repack/packages/check-in/App.tsx:17-19`; `apps/repack/packages/dashboard/App.tsx:17-19`), mas
são a entrada standalone, fora do módulo exposto, como diz o comentário deles
(`apps/repack/packages/check-in/App.tsx:7-10`; linha 8); dentro do host continua havendo um só.
Os comentários dos dois `rspack.config.mjs` e dos dois `App.tsx` repetem a afirmação ("regra de
ouro — um único NavigationContainer, no host"). O mecanismo é outro que o da linha 20 (instância
de `@react-navigation/*` compartilhada) e o da linha 21 (tipos de rota), por isso linha própria.

**20. Documento (apps/repack/ARCHITECTURE.md:129).** `apps/repack/packages/shared-deps/sharedDeps.mjs:31-33`
lista `@react-navigation/native`, `native-stack` e `bottom-tabs` entre os `RUNTIME_LIBS`
singleton. A revisão de código-fonte já registrara que o `Tab.Navigator` único do host é quem monta
as duas abas que carregam os mini-apps (3.4.4, `RootNavigator.tsx:52`) — a navegação cruzada entre
abas depende dessa instância compartilhada, como `apps/repack/README.md:51` também afirma, repetindo
a mesma afirmação.

**21. Documento (apps/repack/ARCHITECTURE.md:130).** Os tipos de rota estão em
`apps/repack/packages/navigation/src/params.ts:1-14` (`RootTabParamList`, `CheckInStackParamList`,
`DashboardStackParamList`) e são importados pelas três unidades: os stacks expostos
(`apps/repack/packages/check-in/src/navigation/CheckInStack.tsx:1`;
`apps/repack/packages/dashboard/src/navigation/DashboardStack.tsx:1`) e o navegador do host
(`apps/repack/packages/host/src/navigation/RootNavigator.tsx:1`). O pacote está no `shared` como
singleton (`apps/repack/packages/shared-deps/sharedDeps.mjs:56`, dentro de `LOCAL_PACKAGES`, com
`singleton: true` aplicado em `:75-76`). Mais de duas unidades usam o pacote, por isso `corroborada`.
A frase seguinte (`:132`, "É isto que torna `@mygym/navigation` shared **obrigatório**") é a
conclusão do autor sobre as três razões e não vira linha. O snapshot não a sustenta por inteiro: o
pacote só exporta tipos (`apps/repack/packages/navigation/src/index.ts:1`; `params.ts:1-14`), que
não existem em runtime, de modo que nada nele depende de ser uma instância única.

**22. Documento (apps/repack/ARCHITECTURE.md:192,194).** O host MyGym é o fornecedor eager dos
singletons, e os dois mini-apps os consomem sem embutir cópia própria. Os três `rspack.config.mjs`
confirmam: `apps/repack/packages/host/rspack.config.mjs:53-54` chama `sharedDeps({ eager: true })`;
`apps/repack/packages/check-in/rspack.config.mjs:47-48` e
`apps/repack/packages/dashboard/rspack.config.mjs:45-46` chamam `sharedDeps({ eager: false })`, e o
helper repassa esse valor a cada entrada de `shared` (`apps/repack/packages/shared-deps/sharedDeps.mjs:67-77`).
A revisão de composição usa a mesma configuração como suporte da relação #4 (3.4.5). A afirmação
repete-se no diagrama (`apps/repack/ARCHITECTURE.md:73,86`, só o lado do host: "eager no host",
"eager provider"), no passo a passo de como estender (`:358`, `eager: false` no mini-app novo), em
`apps/repack/README.md:37,45,64` (o host "eager provider" que "fornece os singletons") e nos
comentários de `sharedDeps.mjs:63-64`, `host/rspack.config.mjs:53`, `check-in/rspack.config.mjs:10-11,47`
e `dashboard/rspack.config.mjs:10-11,45`. É a mesma escolha da spike (linha 16), mas com outro
sujeito.

**23. Documento (apps/repack/ARCHITECTURE.md:201).** A frase apresenta o `pnpm catalog` como fonte
única das versões das libs compartilhadas; o comentário de `apps/repack/pnpm-workspace.yaml:4-6`
diz o mesmo ("Fonte única das versões das libs compartilhadas (runtime/singleton)... garantindo que
todos exijam exatamente a mesma versão"), assim como `apps/repack/README.md:61` e
`apps/repack/ARCHITECTURE.md:363`. O catalog cobre parte delas: navegação, `safe-area`, `screens`,
`svg`, `zustand`, `linear-gradient` e `blur` (`apps/repack/pnpm-workspace.yaml:7-17`), referenciadas
como `catalog:` pelos pacotes (ex.: `apps/repack/packages/host/package.json:20,22-24,28-32`). Mas
`react`, `react-native` e `phosphor-react-native`, que estão no `shared` como singletons
(`apps/repack/packages/shared-deps/sharedDeps.mjs:29-30,45`), não estão no catalog e têm a versão
escrita à mão em cada pacote (`apps/repack/packages/host/package.json:25-27`;
`apps/repack/packages/check-in/package.json:25,27-28`; `apps/repack/packages/dashboard/package.json:24-26`).
Hoje os três pacotes declaram os mesmos valores, mas são três fontes, não uma. Como os artefatos
mostram o contrário de "fonte única" para três das libs compartilhadas, `contradita`; a parte
confirmada é a das libs referenciadas por `catalog:`. A menção do `README.md:59` ao `catalog:` como
parte do orquestrador não afirma fonte única e não vira linha.

**24. Documento (apps/repack/ARCHITECTURE.md:201).** A negociação de versão entre host e remotes:
o helper lê a versão instalada de cada lib (`apps/repack/packages/shared-deps/sharedDeps.mjs:19-23`)
e a coloca em `version` e `requiredVersion` de cada entrada de `RUNTIME_LIBS` (`:70-73`), de modo
que o MF recebe um número real em vez do texto `catalog:`. Como host, check-in e dashboard montam
o `shared` pelo mesmo helper (`apps/repack/packages/host/rspack.config.mjs:54`;
`apps/repack/packages/check-in/rspack.config.mjs:48`; `apps/repack/packages/dashboard/rspack.config.mjs:46`),
fornecedor e consumidores declaram as mesmas versões. Os comentários de `sharedDeps.mjs:5-9,25-27`
repetem a afirmação e acrescentam o efeito ("o MF consegue verificar incompatibilidade (host velho
× remote novo) e avisar no load"). O aviso em si só apareceria em execução, que o snapshot não
registra; a configuração que o habilita está presente. Os pacotes locais `@mygym/*` ficam de fora
da verificação por escolha declarada (`requiredVersion: false`, `sharedDeps.mjs:50-51,75-77`), o
que não contradiz a frase, que fala das libs com versão no catalog.

**25. Documento (apps/repack/ARCHITECTURE.md:230).** A parte de que os remotes entregam só JS se
confirma: o build de cada mini-app gera um container JS próprio (`check-in.container.js.bundle`,
`dashboard.container.js.bundle`, 3.4.6 #4, #5), carregado pelo host pela rede (3.4.5 #2, #3). A
parte do binário único não tem artefato: não há projeto nativo `android/`/`ios/` em nenhum pacote do
snapshot, nem no host (3.4.3, Notas; 3.4.6, Leitura) — o `ios/` do host "não é versionado"
(`apps/repack/README.md:83`). Além disso, os remotes também têm scripts `run-android`/`run-ios`
(`apps/repack/packages/check-in/package.json:6-7`; `apps/repack/packages/dashboard/package.json:6-7`),
que o README usa para rodar um mini-app standalone (`apps/repack/README.md:136`); isso não desmente
a afirmação, que fala do remote dentro do host, mas também não deixa o snapshot mostrar o host
como único binário. Por isso `parcial`. A afirmação se repete em `:237` ("remotes não geram
binário"), `:244`, em `apps/repack/README.md:14,45` ("a casca instalável", "Único binário
instalável") e em `apps/repack/README.md:81` ("O host é o único binário"). O resto dessa frase
("embarca as fontes") e o passo 0a são instalação: o host declara `assets: ['./assets/fonts']`
(`apps/repack/packages/host/react-native.config.js:3-5`), mas a pasta não está no snapshot: as quatro `Inter-*.ttf` existem no commit `c569ccc` e a normalização as retirou como binários (`normalization.json:91-106`).

**26. Documento (apps/repack/ARCHITECTURE.md:237).** O código nativo de que os remotes precisam
fica no host: `apps/repack/packages/host/package.json:20,28-31` declara as cinco libs com metade
nativa (`blur`, `linear-gradient`, `safe-area-context`, `screens`, `svg`), e as libs nativas dos
remotes estão todas nessa lista (`apps/repack/packages/check-in/package.json:20,26,29-31`;
`apps/repack/packages/dashboard/package.json:27-29`). Os remotes também as declaram, o que a própria
frase prevê ("O `package.json` dos remotes não participa disso"). A compilação no binário pelo
`pod install`/autolink não é observável, porque não há projeto nativo no snapshot (linha 25), mas a
propriedade afirmada — a declaração no host cobre a de todos os remotes — se confirma. Repetem a
afirmação `:256` (tabela "só o host declarar + `pod install`") e `apps/repack/README.md:81` ("ele
carrega o nativo de **todos** os remotes").

**27. Documento (apps/repack/ARCHITECTURE.md:239).** A consequência para o ciclo de entrega —
uma lib nativa nova num remote exige rebuild e release do host, sem OTA — não tem artefato que a
confirme nem a desminta: não há projeto nativo, configuração de release nem de OTA no snapshot
(3.4.6, Resumo: deploy não observado nas sete aplicações). A linha 26 mostra que as dependências
nativas ficam declaradas no host, o que é coerente com a afirmação, mas não mostra o rebuild nem o
release. O título do passo 0 em `apps/repack/README.md:79` ("uma vez, e ao mudar dep/fonte nativa")
repete a afirmação como instrução. `sem corroboração`.

**28. Documento (apps/repack/ARCHITECTURE.md:273-277).** Busquei `ScriptManager`, `setStorage` e
`CodeSigningPlugin` em todo `apps/repack/` e `apps/repack-poc/`: as únicas ocorrências estão no
próprio `ARCHITECTURE.md`, nunca num `rspack.config.mjs` real. Isso confirma que o item está de
fato "deferido"/"desligado", como a documentação diz — não há configuração no snapshot que o
contradiga.

**29. Documento (apps/repack/ARCHITECTURE.md:324).** O build isolado por mini-app é confirmado pela
revisão de build/deploy: host, check-in e dashboard têm build `separado`, cada um com seu próprio
container (`check-in.container.js.bundle`, `dashboard.container.js.bundle`, config própria de
host) — 3.4.6 (linhas 4, 5, 6). O comentário de `scripts/measure-repack.sh:3-5` registra o mesmo
mecanismo ("a granularidade está no próprio build; rebuildar check-in não toca host/dashboard").
`:332` repete a mesma afirmação ("reconstruir/re-deployar só o módulo que mudou"), sem propriedade
nova.

**30. Documento (apps/repack/ARCHITECTURE.md:334).** A afirmação de que "o build standalone do
Re.Pack não emite o container federado, só o dev server o produz" é uma propriedade de
comportamento do bundler que o snapshot não permite confirmar nem contradizer: o script que gera o
build de produção isolado (`scripts/measure-repack.sh:25-33`) roda `react-native bundle --dev false`
e descarta a saída numa pasta temporária, sem preservar o bundle para inspeção, e nenhuma outra
configuração do snapshot distingue build standalone de build servido pelo dev server quanto à
emissão do container MF. Por isso `sem corroboração`.

**31. Documento (apps/turborepo/ARCHITECTURE.md:267).** A tabela de comparação nomeia a tecnologia
do Re.Pack como "webpack + MF + chunks + shared", mas os artefatos usam Rspack, não Webpack:
`apps/repack/packages/host/rspack.config.mjs:16-45` configura `Repack.defineRspackConfig` e o
`ModuleFederationPluginV2` sobre Rspack; o próprio `apps/repack/ARCHITECTURE.md:190-192` nomeia
corretamente "Rspack substitui o Metro". Como a propriedade verificável (nome da tecnologia) diverge
do que os artefatos registram, a afirmação é `contradita`, ainda que o restante da documentação não
repita o erro.

## Resumo

Afirmações: 31 (corroborada: 22, parcial: 4, contradita: 2, sem corroboração: 3). Temas: (estrutura: 1, composição: 20, build-deploy: 8, independência: 2).
