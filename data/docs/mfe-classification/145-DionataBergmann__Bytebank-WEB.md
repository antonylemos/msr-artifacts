---
schema: 1
id: 976783667
full_name: DionataBergmann/Bytebank-WEB
url: https://github.com/DionataBergmann/Bytebank-WEB
commit: 3f897860c06307eb4a3515123e722e125f1e6a45
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: undetermined, q5: undetermined }
repo_type: example
approaches: [single-spa]
ui_technologies: [react, next]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 145 — DionataBergmann/Bytebank-WEB

## Contexto

“Bytebank”: app Next.js (Pages Router) de gestão financeira do MBA em Engenharia Frontend da FIAP (`README.md:1–3`). Em julho de 2025 recebeu um bloco single-spa. No cliente, `_app.tsx` carrega SystemJS, injeta um import map com o módulo `bytebank-investments` e registra uma aplicação single-spa ativa em `/investments` (`src/pages/_app.tsx:13–19`; `src/single-spa-init.ts:1–36`). A URL desse módulo vem só da variável `NEXT_PUBLIC_MFE_INVESTMENTS_URL`, que não está definida no repositório. A unidade externa não está no snapshot. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:146` registra rank 145, ID 976783667, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:146` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:13599` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:13605` (`technology`, `pass`); os metadados de candidato trazem descrição nula.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, de busca de código com `path` `package.json`:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-package-code`: `"single-spa" filename:package.json` | `technology-single-spa-package-code#size:1000..1149` | `"single-spa" filename:package.json size:1000..1149` | 2026-10-07T22:15:19.330Z / 2026-10-08T15:58:53.357Z |

O arquivo casado é o `package.json` da raiz (1.004 bytes no SHA, dentro da faixa), que declara `"single-spa": "^6.0.3"` em `package.json:26`. O acerto não depende do README, que não menciona micro-frontends nem single-spa. O README e o SHA (2025-08-04) antecedem as coletas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 68 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Next na raiz (`package.json`, `next.config.ts`, `src/pages`, `src/components`, `src/store`, `Dockerfile`), com `yarn.lock` e `package-lock.json`. Nenhum segundo manifesto ou fonte da unidade `bytebank-investments`. | contexto |
| Código-fonte (registro single-spa) | `src/single-spa-init.ts:1–16`: no browser, carrega SystemJS de CDN e injeta `<script type="systemjs-importmap">` com `react`, `react-dom` e `'bytebank-investments': mfeUrl`, onde `mfeUrl = process.env.NEXT_PUBLIC_MFE_INVESTMENTS_URL`. `src/single-spa-init.ts:18–30`: `registerApplication({ name: 'bytebank-investments', app: () => System.import('bytebank-investments'), activeWhen: pathname startsWith '/investments' })` e `start()`. Esse módulo é importado em `src/pages/_app.tsx:16–18`. | forte |
| Configuração (localização da unidade externa) | A única fonte da URL do remoto é `NEXT_PUBLIC_MFE_INVESTMENTS_URL` (`src/single-spa-init.ts:6`), sem valor padrão. `.env.example:1` só define `NEXT_PUBLIC_API_URL`. Não há outro arquivo de configuração, README ou script que informe onde a unidade é publicada. Sem a variável, `JSON.stringify` omite a chave e o import map fica sem o módulo. | ambígua |
| Código-fonte (ponto de montagem) | `src/pages/investments.tsx:1–5` só renderiza `<div id="root" className="w-full h-full" />`. O menu leva a `/investments` (`src/components/layout/MainLayout/index.tsx:10–15`). O componente local `src/components/pages/InvestmentsPage/index.tsx:16–43` existe, mas nenhuma página o importa (`git grep InvestmentsPage`). | moderada |
| Código-fonte (código morto) | `src/microfrontends.ts:3–17` define `registerMicrofrontends` com o mesmo registro, mas nenhum arquivo importa a função (`git grep registerMicrofrontends`). | contexto |
| Código-fonte (fronteiras) | Busca por `from '../` em `src`: só imports internos (por exemplo, `src/components/ui/BalanceCard/index.tsx:4` → `store/transactionSlice`; `src/components/ui/TransactionList/index.tsx:4–5`). Nenhum código da unidade externa; a ligação é só pelo nome `bytebank-investments` no import map e no registro. | contexto |
| Tecnologia | `package.json:19–27`: `next` 15.3.1, `react`/`react-dom` 18.2.0, `single-spa` ^6.0.3 e `systemjs` ^6.15.1. `yarn.lock:2090–2091` resolve `single-spa` 6.0.3 e `yarn.lock:2168–2169` resolve `systemjs` 6.15.1. O `package-lock.json` está defasado: `react` 19.1.0 em `package-lock.json:3083–3084`. O import map aponta `react`/`react-dom` 18.2.0 de CDN (`src/single-spa-init.ts:11–12`). | contexto |
| Busca negativa | `git grep -i` no SHA (exceto lockfiles) por `micro.?front`, `federation`, `remoteEntry`, `customElements`, `<iframe`, `qiankun` e `wujie`: só o identificador `registerMicrofrontends` (`src/microfrontends.ts:3`). | ausente |

## Autoria e histórico

Clone não raso; 55 commits, 18 merges, raiz `2eb23fb` (2025-05-02, “Estrutura inicial do projeto”). Autores: `DionataBergmann <dionata.podewils@outlook.com>` (33) e `Dionata Bergmann <67449438+DionataBergmann@users.noreply.github.com>` (22), o mesmo titular. `5e2a3a8` (2025-07-27, “Implement microfrontend structure using Single SPA”) adiciona `src/microfrontends.ts` e `src/single-spa-init.ts` e altera `_app.tsx`, `investments.tsx` e `package.json` (`git log --no-renames --name-status`). Commits seguintes corrigem build e menu. Há branches remotos `feature/*` e `fix/*` correspondentes aos PRs, inclusive `origin/feature/microfrontend-init` (`5e2a3a8`); nenhum foi considerado além do SHA. Um merge registra a origem `DionataBergmann/Gerenciador-Financeiro` (`ac7e31a`), nome anterior do repositório. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades: o host Next (`src/pages/_app.tsx`) e a unidade externa `bytebank-investments`, explicitamente registrada na configuração de composição single-spa (`src/single-spa-init.ts:21–27`). |
| Q2 | Yes | O host tem entrada e build próprios (`package.json:5–12`), e a unidade externa seria carregada como módulo separado por SystemJS (`src/single-spa-init.ts:13`, `24`), sem import de código-fonte entre elas. O artefato externo não é observável. |
| Q3 | Yes | O host registra a aplicação, ativa-a em `/investments` e oferece a rota e o contêiner (`src/single-spa-init.ts:22–29`; `src/pages/investments.tsx:1–5`; `src/components/layout/MainLayout/index.tsx:13`). |
| Q4 | Undetermined | O mecanismo está configurado e é chamado em runtime (`src/pages/_app.tsx:16–18`; `src/single-spa-init.ts:18–30`), mas a localização da unidade depende de variável não definida no repositório (`src/single-spa-init.ts:6`; `.env.example:1`). Pelo critério, “a configuration whose actual use is unclear is Undetermined”. |
| Q5 | Undetermined | Nenhuma resposta No e Q4 Undetermined. |

## Motivo

- `Uncertain` pela regra “No question is No, but at least one is Undetermined”, com `status: review`.
- Próximo de 087 (host single-spa que registra remoto externo por loader), proposto como `MFE-implemented`, mas com uma diferença material. Em 087 a URL do bundle tinha valor padrão (`http://localhost:4200/main.js`) e era usada pelo loader. Aqui não há valor padrão nem documentação: a configuração de composição nomeia a unidade, mas não diz onde ela está. Também difere de 008/040, cujas configurações traziam a URL do remote.
- Não é `MFE-unit`: o host está presente e não expõe lifecycles. Não é code sharing (089/100): o registro single-spa ativa uma aplicação por rota. Diferentemente de 097, há código consumidor executado (`_app.tsx`); a dúvida é a resolubilidade do remoto.
- `approaches: [single-spa]` (com SystemJS e import map como carregamento). `ui_technologies: [react, next]`. `build_tools: []`, pela convenção de Next encapsulando o bundler. `frontend_units: 2` (host + remoto referenciado), `unit_organization: multi-repo`. `repo_type: example` (projeto de MBA, `README.md:3`).

## Notas para análise

- **RQ2:** single-spa como root config dentro de um app Next (Pages Router), carregando o remoto por SystemJS e import map injetado em runtime, com `react`/`react-dom` de CDN para o remoto.
- **RQ1 (sinais enganosos):** código morto (`src/microfrontends.ts`), componente local de investimentos não usado e `package-lock.json` defasado em relação ao `package.json`/`yarn.lock`. A entrada na amostra veio só da dependência declarada.
- **Protocolo (busca):** entrada exclusivamente por busca de código no `package.json`. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Decisão registrada

Manter **Uncertain**. O host registra e ativa a unidade externa por single-spa, mas `NEXT_PUBLIC_MFE_INVESTMENTS_URL` não possui valor, fallback ou fonte de implantação versionada. A localização e a conexão efetiva do remoto não são verificáveis no snapshot.
