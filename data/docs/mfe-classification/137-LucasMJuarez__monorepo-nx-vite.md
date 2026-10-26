---
schema: 1
id: 1082162546
full_name: LucasMJuarez/monorepo-nx-vite
url: https://github.com/LucasMJuarez/monorepo-nx-vite
commit: c298b28bab0af47ef32f442a5ab560105b72e4af
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 137 — LucasMJuarez/monorepo-nx-vite

## Contexto

Workspace Nx com duas aplicações React/Vite, `apps/host` (porta 4200) e `apps/remote` (porta 4201), ligadas por `@originjs/vite-plugin-federation`, além da biblioteca `apps/my-utils`, gerada e não usada (`README-MODULE-FEDERATION.md:1–27`). O host consome só o componente `Button` exposto pelo remote; o remote também expõe `./App`, que nenhum consumidor usa. O `README.md` da raiz é o texto padrão do gerador Nx. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:138` registra rank 137, ID 1082162546, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:138` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:20232` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:20238` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, de busca de código com `path` `package.json`:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | `technology-vite-federation-package-code#size:1800..1999` | `"@originjs/vite-plugin-federation" filename:package.json size:1800..1999` | 2026-10-07T22:07:29.627Z / 2026-10-08T15:50:41.268Z |

O arquivo casado é o `package.json` da raiz (1.872 bytes no SHA, dentro da faixa), cuja linha `package.json:24` declara `"@originjs/vite-plugin-federation": "^1.4.1"`. Os metadados do hit trazem a descrição “monorepo de react usando nx con vite de bundler”, sem tópicos, linguagem ou datas preenchidos. O acerto não depende do README. O `README.md` da raiz não menciona federação nem micro-frontends; `README-MODULE-FEDERATION.md:1` e `README-MODULE-FEDERATION.md:162` mencionam “Module Federation” e “micro-frontends”, mas não são o README. O `package.json` e os READMEs são do SHA (2025-10-23), anterior às coletas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 57 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há três projetos em `apps/`: `host` e `remote`, cada um com `index.html`, `src/main.tsx`, `vite.config.ts`, `package.json` e tsconfigs próprios, e `my-utils`, uma biblioteca Vite em modo `lib` (`apps/my-utils/vite.config.ts:23–42`). Há também `nx.json`, `package.json` e `package-lock.json` na raiz e um `packages/.gitkeep`. | contexto |
| Configuração (host) | `apps/host/vite.config.ts:17–26`: `federation({ name: 'host', remotes: { remote: 'http://localhost:4201/assets/remoteEntry.js' }, shared: ['react', 'react-dom'] })`. Servidor e preview na porta 4200 (`apps/host/vite.config.ts:9–16`). | forte |
| Configuração (remote) | `apps/remote/vite.config.ts:16–27`: `name: 'remote'`, `filename: 'remoteEntry.js'`, `exposes: { './Button': './src/components/Button', './App': './src/app/app' }`. Servidor e preview na porta 4201 (`apps/remote/vite.config.ts:8–15`). Os dois caminhos expostos existem (`apps/remote/src/components/Button.tsx:10–25`; `apps/remote/src/app/app.tsx:8–60`). | forte |
| Código-fonte (consumo) | `apps/host/src/components/RemoteButtonWrapper.tsx:3`: `React.lazy(() => import('remote/Button'))`, renderizado com props em `Suspense` (`apps/host/src/components/RemoteButtonWrapper.tsx:7–13`) e usado na rota `/` do host (`apps/host/src/app/app.tsx:4`, `30–40`). `apps/host/src/types/remotes.d.ts:1–13` tipa `remote/Button` e `remote/App`, mas só `remote/Button` é importado. | forte |
| Código-fonte (fronteiras) | Busca por `from '../` e `import('../` em `apps`: `apps/host/src/app/app.tsx:4` (`../components/RemoteButtonWrapper`) e `apps/remote/src/app/app.tsx:4` (`../components/Button`) ficam dentro de cada app. Os `eslint.config.mjs` importam `../eslint.config.mjs` (`apps/host/eslint.config.mjs:2`; `apps/remote/eslint.config.mjs:2`), de configuração de lint. Nenhum import de código entre `host` e `remote` nem de `my-utils`; o host acessa o remote só pelo módulo federado. `tsconfig.app.json` do host estende a base comum (`apps/host/tsconfig.app.json:2`). | contexto |
| Build/deploy | Cada app tem `vite.config.ts` com `outDir` próprio (`apps/host/vite.config.ts:31–38`; `apps/remote/vite.config.ts:32–38`), com targets inferidos pelo plugin `@nx/vite` (`nx.json:37–49`). Scripts da raiz: `start:host`/`start:remote` (`nx serve …`), `start:all` em paralelo e `build:host`/`build:remote`/`build:all` (`package.json:5–12`). | moderada |
| Configuração (operabilidade) | A raiz declara `workspaces` `["packages/*", "host", "remote", "my-utils"]` (`package.json:56–61`), e o lockfile registra links para `host`, `remote` e `my-utils` na raiz (`package-lock.json:11–16`, `65–72`, `4529–4540`, `19374–19377`). Esses diretórios não existem no SHA, que tem `apps/host`, `apps/remote` e `apps/my-utils`. `README-MODULE-FEDERATION.md:7–13` também descreve `host/` e `remote/` na raiz. Os `package.json` dos apps se chamam `@org-gcba/host` e `@org-gcba/remote` (`apps/host/package.json:2`; `apps/remote/package.json:2`), enquanto os scripts chamam `nx serve host`/`remote`. O fluxo documentado (`README-MODULE-FEDERATION.md:59–68`, `149–152`) serve os dois apps em modo dev, mas o host aponta para `assets/remoteEntry.js`, artefato de build do remote. A cadeia de configuração fecha; o caminho de execução documentado não foi demonstrado e não foi executado. | ambígua |
| Tecnologia | Lockfile: `@originjs/vite-plugin-federation` 1.4.1, `vite` 7.1.12, `react`/`react-dom` 19.2.0 e `nx` 22.0.1 (`package-lock.json:4541–4542`, `18694–18695`, `16281–16282`, `16290–16291`, `14469–14470`). | contexto |
| Documentação | `README-MODULE-FEDERATION.md:29–55` reproduz as configurações remote/host; `README-MODULE-FEDERATION.md:104–124` documenta o consumo de `remote/Button`; `README-MODULE-FEDERATION.md:158–163` lista vantagens de Module Federation e “arquitecturas de micro-frontends”. `README.md:1–90` é o texto padrão do workspace Nx. | contexto |

## Autoria e histórico

Clone não raso; 2 commits, nenhum merge, ambos de “lucas juarez `<lujuarez@emeal.nttdata.com>`” em 2025-10-23. A raiz `20e3b2a` (“Initial commit”, 16:23) cria o workspace Nx vazio (`nx.json`, `package.json`, lockfile, `README.md`, `packages/.gitkeep`). O SHA `c298b28` (“monorepo config vite + nx + module-federations”, 17:34) adiciona `apps/host`, `apps/remote`, `apps/my-utils`, `README-MODULE-FEDERATION.md` e `vitest.workspace.ts` e modifica `package.json`, `package-lock.json`, `nx.json` e `tsconfig.json` (`git log --no-renames --name-status`). Como host e remote entram no mesmo commit, o histórico não registra evolução separada das unidades.

O ref `origin/feature/add-host-components-shared` (`cf86e9d`, 2025-10-24, “add header inside host and shared in remote”) descende do SHA; seu conteúdo não foi considerado. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades frontend no repositório, `apps/host` e `apps/remote`, cada uma com entrada própria (`apps/host/index.html:13–14`; `apps/remote/src/main.tsx:6–16`). A configuração do host referencia o remote (`apps/host/vite.config.ts:21–23`). `my-utils` é biblioteca, não unidade. |
| Q2 | Yes | Cada unidade tem entry point, `vite.config.ts`, porta e `outDir` próprios (`apps/host/vite.config.ts:9–38`; `apps/remote/vite.config.ts:8–38`). Nenhum import direto de código-fonte entre elas (busca registrada); o host usa só `remote/Button`. |
| Q3 | Yes | O host carrega e renderiza o componente remoto na sua rota `/` (`apps/host/src/components/RemoteButtonWrapper.tsx:3–13`; `apps/host/src/app/app.tsx:30–40`). |
| Q4 | Yes | Module Federation configurado nos dois lados, com nome, chave exposta, `filename`, porta e caminho `assets/` coerentes (`apps/host/vite.config.ts:19–25`; `apps/remote/vite.config.ts:18–26`), e consumido em código (`apps/host/src/components/RemoteButtonWrapper.tsx:3`). As inconsistências de workspace/script estão registradas como `ambígua` e no ponto de revisão. |
| Q5 | No | O único módulo remoto consumido é um botão reutilizável; o App completo exposto pelo remote não é carregado. |

## Justificativa do Q5

Q1–Q4 Yes indicariam Q5 Yes. A divergência se apoia em dois pontos:

1. **Code sharing:** a única integração efetiva é um `Button` de apresentação exposto pelo remote e renderizado pelo host (`apps/host/src/components/RemoteButtonWrapper.tsx:3–13`; `apps/remote/src/components/Button.tsx:10–25`). O `./App` exposto (`apps/remote/vite.config.ts:23`) não é consumido. É o mesmo limite entre composição de unidade e “Module Federation used only for code sharing” deixado em aberto em 089 (par de botões e hook) e 100 (MovieCard), ambos `Uncertain`/`review`.
2. **Operabilidade:** os workspaces e o lockfile apontam para diretórios inexistentes, os scripts usam nomes de projeto diferentes dos nomes de pacote, e o fluxo documentado serve o remote em modo dev, enquanto a URL do host aponta para o artefato de build (linha “Configuração (operabilidade)”). A configuração do Vite fecha, mas o caminho documentado não demonstra a conexão.

Nenhum dos pontos produz um No conclusivo, e nenhum se resolve sem juízo sobre critério ainda aberto ou sem execução.

## Motivo

- Aplica-se a exclusão de Module Federation usado apenas para compartilhamento de código: a única integração efetiva é um botão reutilizável.
- Não é `MFE-unit`: host e remote estão no snapshot. Não há plataforma de terceiros (074/080/102) nem composição por iframe, links ou pacotes em build time.
- Diferentemente de 097/103/104, a cadeia de configuração é coerente e resolúvel nos arquivos lidos. A dúvida de operabilidade está nos scripts, workspaces e documentação, não em nomes ou exposes inexistentes. Diferentemente de 128, onde o fluxo documentado (build + preview do remote) fechava a cadeia, aqui o fluxo documentado usa dev serve nos dois lados.
- `repo_type: example` (`README-MODULE-FEDERATION.md:3`: “Este proyecto demuestra…”). `approaches: [module-federation]` registra o mecanismo observado. `ui_technologies: [react]`, `build_tools: [vite]` (`apps/*/vite.config.ts`). `frontend_units: 2`: `host` e `remote`, sem contar `my-utils` (lib não usada). `unit_organization: monorepo` (workspace Nx).

## Notas para análise

- **RQ2:** `@originjs/vite-plugin-federation` em workspace Nx com targets inferidos por `@nx/vite`, `shared` como lista simples e remote expondo um componente e o app inteiro.
- **RQ1 (sinais enganosos):** documentação e workspaces descrevem uma estrutura (`host/`, `remote/` na raiz) diferente da versionada (`apps/…`), o que sugere uma movimentação de diretórios sem atualizar `package.json`, lockfile e README.
- **Protocolo (busca):** entrada exclusivamente por busca de código no `package.json` da raiz, sem depender de README ou descrição.

## Ponto para revisão conjunta

1. **Code sharing (principal, mesmo ponto de 089/100):** decidir se o `Button` remoto renderizado no host basta como contribuição de unidade frontend.
   - **Aceitar como composição:** Q5 Yes e `MFE-implemented`.
   - **Aplicar a exclusão de code sharing:** `Non-MFE`, `approaches: []`, reavaliando Q1–Q4 conforme a decisão tomada para 089/100.
   - Recomenda-se decidir junto com 089/100 para manter consistência.
2. **Operabilidade (secundário):** decidir se a coerência da configuração do Vite basta para Q4/Q5, como em 128, ou se a divergência entre workspaces/lockfile/scripts/README e a estrutura `apps/` exige rebaixar Q4 para Undetermined. Isso não mudaria a classe atual (`Uncertain`), mas pesa se o ponto 1 for resolvido a favor da composição.

Até a decisão, preservar `Uncertain`/`review`.

### Divergência entre analista e revisor (para a revisão conjunta)

A revisora independente (Lupa) concorda com Q1 a Q4 Yes e com `review`, mas recomenda Q5 No e Non-MFE, com `approaches: []`. Fundamento: a única integração consumida é um botão genérico, `remote/Button` (`apps/host/src/components/RemoteButtonWrapper.tsx:3`), apresentado como "componente de botão reutilizável" (`README-MODULE-FEDERATION.md:25–27`); o `remote/App` ("aplicação completa"), também exposto (`apps/remote/vite.config.ts:23`) e tipado em `apps/host/src/types/remotes.d.ts:10–13`, não é importado pelo host. A revisora considera o caso mais próximo da exclusão de Module Federation usado só para compartilhar código. Os finais 040 (`ModalRegister`) e 052 (`Header` e `Products`) mostram composição em nível de componente, mas com módulos que representam uma função ou feature da aplicação. 089 e 100 seguem em `review` e não resolvem o caso.

Mantido `Uncertain`/`review`, pois Q5 diverge de Q1 a Q4 e exige decisão conjunta. Alternativas: Q5 No (override justificado) e Non-MFE com `approaches: []`; ou considerar o Button uma unidade de UI composta, com MFE-implemented e todas as respostas Yes. Esta decisão deve ser tomada junto com 089 e 100. A incoerência de workspaces (`package.json:56–61` declara `host`, `remote` e `my-utils` na raiz, mas os projetos estão em `apps/`) é achado de operabilidade, não motivo independente para rebaixar Q4. Não se executou nada.
