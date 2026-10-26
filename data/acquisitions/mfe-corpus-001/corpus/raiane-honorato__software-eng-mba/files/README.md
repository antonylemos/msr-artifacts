# TCC — MyGym: Micro Frontends em React Native

**Título:** Abordagens de Micro Frontend em React Native: Modularização em Build-time versus Federação em Runtime
**Autora:** Raiane Silva Honorato · **Orientador:** Ariel Da Silva Dias · **Curso:** MBA Engenharia de Software

Este trabalho avalia comparativamente estratégias de modularização em React Native construindo **o mesmo aplicativo três vezes**, cada uma com um regime de integração diferente, e medindo os trade-offs. O app de prova de conceito é o **MyGym**, uma plataforma de acesso a academias.

A pergunta central: *quando vale a pena modularizar, e em qual regime — build-time ou runtime?*

---

## O app: MyGym

Aplicativo mobile onde o usuário encontra academias parceiras, faz check-in, acompanha o treino em tempo real e consulta o histórico. Sem backend — os dados são mockados em TypeScript.

O que importa para a pesquisa é que o app tem **dois módulos de domínio** com uma relação produtor/consumidor clara, ligados por estado compartilhado:

| Módulo | Papel | Responsabilidade |
|---|---|---|
| `check-in` | **Produtor** de estado | Listagem de academias, seleção de atividades, confirmação de check-in |
| `dashboard` | **Consumidor** de estado | Estado ativo/vazio, cronômetro, finalização, histórico |

**Regra fundamental (mantida nas três versões):** `check-in` e `dashboard` **nunca se importam diretamente** — comunicam-se apenas por uma store compartilhada (`@mygym/store`, Zustand). É essa fronteira que cada abordagem trata de um jeito diferente, e o que a pesquisa mede.

---

## As três abordagens

| Versão | Regime | Ferramenta-chave | Ideia central | Localização |
|---|---|---|---|---|
| **Monolito** | baseline | Expo + Metro | Um projeto, sem modularização; fronteiras só por convenção de pastas | `apps/monolith/` |
| **Turborepo** | **build-time** | Turborepo + pnpm workspaces | Módulos em packages separados; fronteiras enforçadas por `package.json`; **fundidos num bundle único no build** | `apps/turborepo/` |
| **Re.Pack** | **runtime** | Re.Pack + Module Federation | Host + mini-apps em **bundles separados, carregados pela rede em runtime**; deploy independente / OTA | `apps/repack/` |

- **Monolito** — o ponto de partida. Modularização zero; qualquer arquivo importa qualquer outro. Serve de baseline para medir o custo/ganho das outras duas.
- **Turborepo** — modularização **em tempo de build**. Os módulos viram packages (`@mygym/*`) com dependências declaradas; o Turborepo orquestra tarefas (typecheck/lint/test/build) com cache granular. Mas o Metro ainda gera **um bundle único** — em runtime é indistinguível do monolito.
- **Re.Pack** — modularização **em tempo de runtime** (Module Federation). Um **host** (a casca instalável) baixa os mini-apps `check-in` e `dashboard` como bundles independentes, pela rede, quando o usuário abre cada aba. A separação **persiste em produção**, como fronteira de rede — habilitando deploy independente e OTA, ao custo de configuração alta.

Cada versão tem seu próprio `README.md` e (Turborepo/Re.Pack) um `ARCHITECTURE.md` detalhado.

---

## Tecnologias

**Comum às três versões** (o código de domínio é mantido idêntico, para isolar a variável "regime de integração"):

- **Linguagem:** TypeScript estrito
- **Navegação:** React Navigation v7 (Native Stack + Bottom Tabs)
- **Estado global:** Zustand (store compartilhada entre os módulos)
- **Ícones:** `phosphor-react-native` (sobre `react-native-svg`)
- **Fontes:** Inter

**Diferenças de toolchain por versão:**

| | Monolito | Turborepo | Re.Pack |
|---|---|---|---|
| Runtime/CLI | Expo (bare) | Expo (bare) | **RN CLI puro (bare, sem Expo)** |
| Bundler | Metro | Metro | **Rspack** (via Re.Pack) |
| Orquestrador | — | **Turborepo** | — (pnpm workspace + `catalog:`) |
| Integração de módulos | — | `workspace:*` (build-time) | `shared` + `exposes`/`remotes` (runtime) |
| Fontes | `@expo-google-fonts/inter` | idem | `.ttf` empacotados (swap do `expo-font`) |
| Gradiente/blur | `expo-linear-gradient`/`expo-blur` | idem | `react-native-linear-gradient` / `@react-native-community/blur` |

> **Por que o Re.Pack larga o Expo:** Module Federation pressupõe controle total do bundler (Rspack), incompatível com o fluxo gerenciado do Expo. É uma diferença de toolchain **inerente ao regime runtime** — o código de domínio permanece idêntico.

---

## Métricas e resultados

Medições em Apple Silicon / macOS, N=10 para tempos (média/desvio/CV% com remoção de outliers IQR). Automação em `scripts/measure.sh`, `scripts/measure-repack.sh` e `scripts/analyze.py`. Resultados completos e o **comando de cada métrica** em `docs/RESULTS-WITH-SAMPLE.md` (mono/turbo) e `docs/RESULTS-REPACK.md` (repack).

### Quantitativas

| Métrica | Monolito | Turborepo | Re.Pack |
|---|---|---|---|
| Bundle instalado (bytecode Hermes) | 9.38 MB | 9.39 MB | **7.91 MB** (host) |
| Download sob demanda | — | — | ~705–757 KB por aba (dev) |
| Build (frio) | ~18s | ~18s | — |
| Build com cache | ~18s | **<1s** (`FULL TURBO`) | — |
| Build isolado por módulo | — | — | **~5s por mini-app** |
| Granularidade | nenhuma | dev pipeline (typecheck/lint/test) | **build por mini-app** |

### Qualitativas

- **Viabilidade de OTA / deploy independente** — só o Re.Pack. Sustentada pelo modo standalone de cada mini-app e pelo **teste de resiliência** (derrubar um remote → `ErrorBoundary` isola o erro numa aba, sem crashar o app).
- **Carga cognitiva** — cresce do monolito ao Re.Pack. O runtime adiciona peças (manifesto MF, ScriptManager, `shared`/`eager`, `Suspense`/`ErrorBoundary` por remote) e **classes novas de bug** inexistentes no build-time (singleton de estado fragmentado, colisão de view nativa, download duplicado de lib pesada, skew host×remote).
- **Integridade de tipos** — no Turborepo os contratos são enforçados por `package.json`; no Re.Pack os tipos dos módulos federados são declarados à mão (`remotes.d.ts`).

---

## Principais achados

- **Turborepo não muda o bundle final** — o ganho é em **feedback de desenvolvimento** (cache granular de typecheck/lint/test) e em **fronteiras enforçadas**, não em tamanho ou runtime. Em runtime é idêntico ao monolito.
- **Singleton de estado: grátis vs. declarado.** No build-time o singleton da store é automático (um grafo de módulos). No runtime ele precisa ser **declarado** (`shared: { singleton: true }`); omitir fragmenta o estado silenciosamente — provado empiricamente (o mesmo fluxo funciona com a flag e quebra sem ela).
- **No runtime, "compartilhar" tem custos além do estado.** Libs de **view nativa** precisam ser singleton por corretude (senão o app crasha ao registrar a view duas vezes); libs **comuns e pesadas** precisam ser singleton por eficiência (senão cada remote re-baixa a lib inteira — descoberto medindo os chunks: um esquecimento inflava o download em ~10 MB).
- **O overhead fixo da federação domina em app pequeno.** O download sob demanda por aba é dominado pelo container do Module Federation (~615 KB), não pelo código de domínio (32–88 KB).
- **Cache de pipeline é do orquestrador, não do regime.** Turborepo e Re.Pack são ortogonais (orquestrador vs bundler) — dá para usar os dois juntos. A comparação build-time × runtime é sobre *como os módulos se integram*, não sobre a ferramenta de cache.

## Conclusão

As três versões, juntas, sustentam empiricamente uma tese simples: **cada regime só se paga quando o problema que ele resolve existe de fato.**

- Para um app pequeno, com um desenvolvedor, o **monolito** é suficiente.
- A partir de **dois ou mais desenvolvedores em paralelo** (ou quando o typecheck do projeto inteiro fica lento), o **Turborepo** adiciona fronteiras e cache com custo moderado.
- O **Re.Pack** entrega binário menor, deploy independente e OTA — mas ao custo de configuração alta e novas classes de bug. Só compensa **acima de um limiar de escala/organização** (times/repos independentes, necessidade real de OTA) que o MyGym, por desenho, não atinge.

Não há "melhor abordagem" absoluta; há a abordagem adequada ao tamanho do time, à necessidade de deploy independente e à tolerância a complexidade.

---

## Estrutura do repositório

```
apps/
├── monolith/      # baseline (Expo bare)
├── turborepo/     # build-time — ARCHITECTURE.md + README.md
├── repack/        # runtime (MF) — ARCHITECTURE.md + README.md
└── repack-poc/    # spike que provou a federação em runtime
scripts/           # measure.sh, measure-repack.sh, analyze.py (+ results/)
docs/              # RESULTS-WITH-SAMPLE.md, RESULTS-REPACK.md, documento do TCC
```

**Para rodar cada versão** e reproduzir as medições, ver o `README.md` da respectiva pasta em `apps/`.
