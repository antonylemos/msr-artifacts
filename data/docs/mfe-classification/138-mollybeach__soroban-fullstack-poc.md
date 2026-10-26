---
schema: 1
id: 1231078343
full_name: mollybeach/soroban-fullstack-poc
url: https://github.com/mollybeach/soroban-fullstack-poc
commit: d5b366a499b3b7e0a41c5a2436dfc6d2347c0e3d
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 138 — mollybeach/soroban-fullstack-poc

## Contexto

Prova de conceito de um smart contract Soroban (Rust) com um único frontend Next.js para ler e gravar o contrato na testnet Stellar, conectar carteiras e exibir resultados de testes (`README.md:1–3`; `README.md:358–366`). O acerto da busca vem de um item da lista de expansões futuras do README, “frontend orchestration flows”. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:139` registra rank 138, ID 1231078343, branch `master`, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:139` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:29651` (`broader`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:29657` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q2` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:44:19.637Z / 2026-10-08T16:24:59.268Z |

Metadados do hit: descrição “A lightweight end-to-end Soroban smart contract proof-of-concept built with Rust, Soroban SDK, React, and Stellar testnet tooling.”, tópicos `soroban` e `stellar`, linguagem TypeScript, `fork: false`, criação em 2026-05-06T15:51:04Z, push em 2026-05-30T03:52:45Z, homepage `https://soroban-fullstack-poc.vercel.app/`. A descrição não contém o termo. Por eliminação, o acerto vem de `README.md:522`, “- frontend orchestration flows”, com a frase literal, na seção “Future Expansion” (`README.md:513–524`).

A última alteração de `README.md` alcançável é `f240465` (2026-05-29T16:44:40-04:00), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 925 entradas, 922 arquivos regulares `100644` e 3 executáveis `100755` (`scripts/deploy-testnet.sh`, `scripts/reencode-demo-video.sh`, `scripts/setup-testnet-identity.sh`); zero symlinks e zero gitlinks. São 835 entradas em `contracts/basic-storage` (Rust, fuzz e mais de 800 snapshots de teste JSON), um único projeto `frontend/` (Next), `docs/` e `scripts/`. Os únicos manifestos JS são `frontend/package.json` e `frontend/lib/basic-storage-bindings/package.json`. | contrária |
| Código-fonte (UI) | `frontend/app/layout.tsx:15–27`: layout raiz que envolve as páginas em `AppShell`. `frontend/components/AppShell.tsx:7–17`: provider de carteira, `SiteHeader` e `main`. As rotas `frontend/app/page.tsx`, `bindings`, `demo`, `docs` e `tests` são páginas do mesmo App Router. | contrária |
| Código-fonte (bindings) | `frontend/lib/basic-storage-bindings/package.json:1–17` é um cliente TypeScript gerado para o contrato (`frontend/lib/basic-storage-bindings/README.md:1–3`; `README.md:231`). No código de UI de `frontend`, a busca por `basic-storage-bindings` acha uma menção de texto em `frontend/app/bindings/bindings-explorer.tsx:174`; a busca literal em todo `frontend` também retorna o próprio diretório do pacote (`README.md` e `package.json:3`). O pacote não é unidade de UI. | contexto |
| Código-fonte (fronteiras) | Busca por `from '../` e `import('../` em `frontend` (exceto lockfile): uma ocorrência, `frontend/app/tests/[section]/page.tsx:3` (`../page`), dentro do mesmo App Router. Os demais imports usam o alias `@/`. Não há segunda unidade cuja fronteira pudesse ser atravessada. | contexto |
| Configuração / Build/deploy | `frontend/package.json:5–13`: um ciclo `next dev`/`next build`/`next start` e scripts de exportação de testes. `frontend/next.config.ts:3–8` só tem `transpilePackages`, sem `rewrites`, zones ou federação. Next 15.5.18 e React/ReactDOM 19.2.6 estão resolvidos em `frontend/package-lock.json:11361–11362`, `12251–12252` e `12261–12262`. `README.md:31` cita uma implantação de exemplo na Vercel. | contrária |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfiles e snapshots, por `orchestrat`, `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `rewrites` e `zones`. Os acertos são `README.md:522`, “orchestration” no sentido financeiro/blockchain em `docs/DTCC-Digital-Assets-Tokenization-Synthesis.md` (por exemplo, linhas 13 e 36), “Makefile orchestration” em `docs/POC_WORKSTREAM_TRACKING.md:160` e caminhos `@stellar/stellar-sdk/lib/federation/` (Stellar federation, protocolo de endereços) dentro de `frontend/tsconfig.tsbuildinfo`. O lockfile do frontend não contém `federation` de Module Federation nem `single-spa`. | ausente |
| Documentação | `README.md:358–366`: “The frontend is intentionally lightweight and integration-focused.” `README.md:513–524`: “frontend orchestration flows” como expansão futura potencial, ao lado de contratos ERC20 e CI/CD. | fraca |

## Autoria e histórico

Clone não raso. `git rev-list` no SHA: 73 commits, 4 merges, uma raiz `6f589eb` (2026-05-06, “docs(README): add Soroban fullstack POC guide”). Todos os commits têm autor e committer Molly Beach `<mollyjbeach@gmail.com>`. O frontend surge em `f966a2f` (2026-05-06, “feat(frontend): add Next.js testnet contract read and write flow”) e tem 39 commits por caminho (`git log --no-renames`). Há duas linhas paralelas de commits com mensagens e horários idênticos (15 mensagens duplicadas), reunidas por merges (`c258ab2`, `b9b2aaf` e o SHA), compatível com histórico reescrito ou empurrado duas vezes. Em toda a história alcançável só existem os manifestos `frontend/package.json`, `frontend/lib/basic-storage-bindings/package.json` e `frontend/next.config.ts`; nunca houve segunda unidade frontend. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend, o app Next de `frontend/` (`frontend/package.json:5–13`; `frontend/app/layout.tsx:15–27`). O pacote de bindings é cliente do contrato. Não existe configuração de composição que referencie unidades externas (busca registrada). |
| Q2 | No | Sem duas unidades, não há entradas ou builds independentes; as rotas compartilham o mesmo build e o `AppShell` (`frontend/components/AppShell.tsx:7–17`). |
| Q3 | No | O layout raiz envolve rotas do mesmo App Router, sem host ou shell montando unidades distintas. |
| Q4 | No | `frontend/next.config.ts:3–8` não configura composição, e nenhum mecanismo foi encontrado (busca registrada). |
| Q5 | No | Q1–Q4 são No: POC de smart contract com frontend Next monolítico. “Frontend orchestration flows” é item de roadmap. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”. Não há preparo para host externo, então `MFE-unit` não se aplica.
- Mesmo padrão lexical de 066/130/132/135 para `"frontend orchestration"`: aqui a frase é literal, mas está numa lista de expansões futuras (`README.md:513–524`), sem implementação.
- `repo_type: example`: a descrição e o README se apresentam como proof-of-concept (`README.md:3`; `README.md:37`), com implantação de exemplo (`README.md:31`). `ui_technologies: [react, next]`. `build_tools: []`, pela convenção de Next encapsulando o bundler. `frontend_units: 1` / `single-unit`.
- Não há decisão aberta: nenhum iframe, link entre aplicações ou composição em build time.

## Notas para análise

- **RQ1 (sinais enganosos):** “frontend orchestration” como item de roadmap e “federation” do protocolo Stellar (`@stellar/stellar-sdk/lib/federation`) são homônimos que buscas textuais confundiriam com sinais de MFE.
- **Protocolo (busca):** quinto caso observado da consulta `"frontend orchestration"` sem composição de frontend (066, 130, 132, 135 e este). A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `example`, `[react, next]`, uma unidade e `single-unit`; sem decisão aberta. Correção adotada: a busca literal por `basic-storage-bindings` em `frontend` retorna também o próprio pacote (`frontend/lib/basic-storage-bindings/README.md` e `package.json:3`), e não só a menção de `bindings-explorer.tsx:174`. O pacote é cliente TypeScript gerado para o contrato Soroban, sem UI. Histórico: 73 commits e 4 merges, 39 commits em `frontend/`, todos da mesma autora; os commits paralelos de mensagem repetida, reunidos por merges, não revelam outra unidade frontend.
