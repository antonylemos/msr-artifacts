---
schema: 1
id: 1131809149
full_name: sattasundar/SwiftSuper
url: https://github.com/sattasundar/SwiftSuper
commit: a779c4541bce1bae898e1e41cbf5e1b42435ac8c
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [swiftui, react-native]
build_tools: []
frontend_units: 4
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 159 — sattasundar/SwiftSuper

## Contexto

“Swift SuperApp”: app **iOS nativo** (SwiftUI) apresentado como “demonstrating a micro-frontend architecture for native iOS development” (`README.md:3`). O repositório contém só o host. Os “Mini Apps” são registrados em `MiniAppManager` e exibidos em abas de um `TabView`:
- `Books` e `PrayerTime`, pacotes Swift remotos de outros repositórios, integrados por Swift Package Manager;
- `Oblation`, um mini-app React Native carregado por `RCTRootViewFactory` a partir de um bundle JS servido pelo Metro ou embutido no app.

O contrato `MiniApp` vem do pacote remoto `Core`. O código dos mini-apps, inclusive `Packages/Oblation`, não está no repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:160` registra rank 159, ID 1131809149, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede; os pacotes remotos não foram acessados.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:160` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:23139` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:23146` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-01` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:30:54.687Z / 2026-10-08T15:57:44.440Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:59:58.776Z / 2026-10-08T16:07:54.827Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem Swift, `fork: false`, tamanho 68;
- criação em 2026-01-10T18:28:35Z, push em 2026-01-13T22:31:02Z.

Sem descrição, o acerto vem de `README.md:3`, “…demonstrating a micro-frontend architecture…”, com grafia hifenizada e única ocorrência. O plural “micro frontends” não aparece no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `6564d15` (2026-01-14), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 24 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um projeto Xcode (`SwiftSuper.xcodeproj`, `SwiftSuper.xcworkspace`), fontes Swift em `SwiftSuper/`, `Podfile` e `package.json` de React Native. Não há `Packages/` nem `index.js`, embora o README os cite (`README.md:64`, `81`, `205–207`). `.gitignore:1–6` só ignora `node_modules`, `build`, `Pods` e lockfiles. | contexto |
| Configuração (pacotes) | `SwiftSuper.xcodeproj/project.pbxproj:149–151`, `509–534`: `XCRemoteSwiftPackageReference` para `Core`, `Books` e `PrayerTime` (`github.com/sattasundar/...`). `SwiftSuper.xcworkspace/xcshareddata/swiftpm/Package.resolved:4–30`: as três dependências fixadas no branch `master`. São integradas em build time ao binário do host. | moderada |
| Código-fonte (registro e montagem) | `SwiftSuper/MiniAppManager.swift:1–25`: importa `Core`, `PrayerTime` e `Books` e registra `PrayerTimeMiniApp()`, `BooksMiniApp()` e `OblationMiniApp()`. `SwiftSuper/ContentView.swift:16–61`: uma aba por mini-app, com `MiniAppWrapper` chamando `makeRootViewController`. | forte |
| Código-fonte (React Native) | `SwiftSuper/OblationMiniApp.swift:11–37`: `rootViewFactory().view(withModuleName: "Oblation", …)` com bundle de `http://localhost:8081/index.bundle?platform=ios` em debug ou `main.jsbundle` em release. `SwiftSuper/AppDelegate.swift:5–46`: `RCTAppDelegate`, `sourceURL` preferindo bundle OTA local. `SwiftSuper/BundleManager.swift:31–78`: download OTA simulado (“MOCK”). `Podfile:7–22`, `package.json:8–11`: React Native 0.83.1. | moderada |
| Documentação | `README.md:7–45`: host e “Mini Apps” (`Books`, `PrayerTime`, `Oblation`). `README.md:101–147`: vários mini-apps RN agregados num único `index.js` e bundle pelo Metro. `README.md:156–175`: estratégia de atualização OTA. | moderada |
| Código-fonte (fronteiras) | O host importa os mini-apps como módulos Swift (`MiniAppManager.swift:2–4`), isto é, código-fonte de pacotes compilado junto. Não há imports relativos para fora do projeto. O `Oblation` só é ligado pelo nome de módulo RN e pela URL do bundle. | contexto |

## Autoria e histórico

Clone não raso; 11 commits, 1 merge (`dbc27cc`), todos do mesmo titular. São 10 de `sundarsatta@outlook.com` (9 como “sattasundar”, 1 via GitHub) e a raiz `1d45b1d` (2026-01-10, “Initialize SwiftSuper project structure…”) de `Sattasundar.Parida <sattasundar.parida@gordian.com>`. Pelo `git log --no-renames --name-status`:
- `8c729e4` adiciona as referências de pacote remoto;
- `7d725a4` (2026-01-14, “Implement to load react native mini app inside swift superapp”) adiciona `AppDelegate.swift`, `OblationMiniApp.swift`, `Podfile` e `package.json`;
- `dcbda1e` adiciona `BundleManager.swift`;
- o SHA só altera `project.pbxproj`.

Os repositórios `Core`, `Books` e `PrayerTime` não foram consultados. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects --missing=print` reporta 13 objetos promisor ausentes na história alcançável; os blobs do snapshot foram lidos localmente, sem rede, e as conclusões históricas que dependessem deles ficam restritas.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Host mais três unidades referenciadas pela configuração do host: `Books` e `PrayerTime` (`project.pbxproj:509–534`; `Package.resolved:4–30`) e `Oblation`, módulo RN carregado por nome e URL de bundle (`OblationMiniApp.swift:16–31`). |
| Q2 | Undetermined | `Books` e `PrayerTime` vivem em repositórios próprios, mas são compilados no binário do host (`MiniAppManager.swift:2–4`): é a decisão aberta “Build-time composition… is independent deployment required?”. O `Oblation` tem bundle JS próprio com atualização OTA prevista, mas seu fonte e build não são observáveis (`README.md:79–96`, `101–147`). |
| Q3 | Yes | O host registra e monta os mini-apps em abas (`MiniAppManager.swift:17–22`; `ContentView.swift:16–46`). |
| Q4 | Undetermined | A ligação é por SPM em build time (decisão aberta) e por `RCTRootViewFactory` em runtime para um bundle cujo fonte não está no repositório (`OblationMiniApp.swift:15–31`). O uso real não é verificável no snapshot. |
| Q5 | No | O caso é um super-app iOS nativo com mini-apps Swift/React Native, fora do escopo de frontends web do estudo. |

## Motivo

- Aplica-se a regra `Non-MFE`: o estudo é restrito a frontends web, enquanto o host é SwiftUI nativo e as unidades são Swift/React Native.
- **Build-time:** os mini-apps Swift são pacotes integrados em build time, o caso previsto da decisão aberta sobre composição em build time (`approaches: [build-time-packages]`, slug previsto no template).
- **Mecanismo RN:** o carregamento do bundle RN por `RCTRootViewFactory` em runtime não tem slug no template; fica registrado nas Notas.
- **Precedentes que não se aplicam:** não é code sharing (089/100) nem plataforma de terceiros (102/074/080). A cadeia não está completa no snapshot (076/084/096/106/109), porque os mini-apps estão fora.
- **Campos:** `frontend_units: 4` (host, `Books`, `PrayerTime`, `Oblation`), `unit_organization: multi-repo`. `ui_technologies: [swiftui, react-native]`. `build_tools: []`: o bundler do mini-app RN não é declarado separadamente e a entrada JS de `Oblation` (`index.js`) está ausente do snapshot, o que impede comprovar um bundle de unidade; há, porém, referência a Metro como toolchain (`@react-native/metro-config` e o script `react-native start`, `package.json:5–6,17–21`) e um `.xcodeproj` de host com `Podfile`, de modo que a ausência de configuração explícita seria impreciso. Decisão do campo (registrar Metro ou apenas bundlers de unidade construída no snapshot) fica para a convenção do estudo. `repo_type: example`, pela demonstração com OTA simulado (`BundleManager.swift:31–78`).

## Notas para análise

- **RQ2:** super-app nativo com mini-apps por três vias: pacotes Swift (build time), bundle React Native carregado por nome de módulo (runtime) e estratégia OTA documentada (`README.md:156–175`). Isso amplia o vocabulário além das abordagens web do catálogo.
- **RQ3:** a documentação descreve `Packages/` locais (`README.md:205–207`) que não estão no repositório; as unidades efetivas são remotas.
- **Protocolo (escopo):** terceiro caso mobile ou nativo (após 025 e 057). Convém fixar a regra de escopo no checklist.
- **Protocolo (busca):** o hit plural não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Ponto para revisão conjunta

1. **Escopo nativo e mobile:** unidades de app iOS nativo (SwiftUI e React Native) entram no estudo? Se não, a classe é `Non-MFE` (fora do escopo), como previsto em 025/057.
2. **Se entrarem:**
   - **Build time:** os pacotes Swift integrados em build time satisfazem Q2/Q4?
   - **Oblation:** o carregamento do bundle RN, cujo fonte está fora do snapshot, basta para Q4?
   - **Desfecho:** com as duas respostas positivas, a classe seria `MFE-implemented`, com host que referencia unidades externas, como 008/040/087.

Não se propõe regra nova. Até a decisão, preservar `Uncertain`/`review`.
- **Contribuição da revisão independente (Lupa):** concordância com `Uncertain`/`review`. Diverge de Q4: propõe Q4 = Yes para a via SwiftPM, porque os pacotes `Core`, `Books` e `PrayerTime` estão referenciados por URL e revisão no Xcode (`project.pbxproj`; `Package.resolved`), seus nomes são importados e instanciados e o host os registra e monta (`MiniAppManager.swift:17–24`; `ContentView.swift:16–46`), isto é, conexão em build/link e execução do protocolo, e não só dependência declarada; para `Oblation`, faltam registro, entrada JS e bundle demonstrável. Mantido Q4 Undetermined, pois essa via é precisamente a composição em build time cuja suficiência está em aberto no checklist (`docs/mfe-classification-checklist.md:69–72`), e Q2 e Q5 seguem Undetermined; a alternativa fica registrada para a decisão conjunta (Q4 Yes para SwiftPM, com a dúvida normativa deslocada para Q2). Os precedentes 025 e 057 mantêm em revisão o escopo mobile/nativo; se o protocolo for apenas web, o resultado seria Non-MFE por escopo. A limitação de fontes remotas não deve virar conclusão favorável por documentação.
