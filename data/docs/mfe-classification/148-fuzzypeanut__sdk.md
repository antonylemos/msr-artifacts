---
schema: 1
id: 1163143966
full_name: fuzzypeanut/sdk
url: https://github.com/fuzzypeanut/sdk
commit: a304cf31195aac6f7ba374f478215f8332c42951
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 148 — fuzzypeanut/sdk

## Contexto

Pacote npm `@fuzzypeanut/sdk`: tipos TypeScript, a interface `FuzzyPeanutSDK` e helpers de runtime que definem o contrato entre o shell “FuzzyPeanut” e seus módulos (`README.md:1–10`; `package.json:2–13`). O shell e os módulos não estão no repositório. O pacote só declara os tipos que eles usariam, como `ModuleManifest`, com `remoteEntry`, e `FPModule`, com `mount`/`unmount` (`src/index.ts:52–88`), além de um singleton compartilhado por `window` (`src/index.ts:308–343`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:149` registra rank 148, ID 1163143966, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:149` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:25205` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:25212` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-02` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T23:23:27.609Z / 2026-10-08T16:17:10.891Z |

Metadados do hit:
- descrição “TypeScript SDK — the FuzzyPeanut module contract (@fuzzypeanut/sdk)”, sem “module federation”;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 13;
- criação em 2026-02-21T06:46:28Z, push em 2026-02-21T10:30:42Z.

Como a descrição não tem a frase, o acerto vem de `README.md:14`, “…declared as a shared singleton in Vite module federation config…”, em minúsculas e única ocorrência no README.

O README foi criado na raiz `0dfd15f` (2026-02-21) e não foi alterado depois. Ele é anterior às coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 7 entradas, todas arquivos regulares `100644`: `.gitignore`, `LICENSE`, `README.md`, `package.json`, `package-lock.json`, `src/index.ts` e `tsconfig.json`. Zero symlinks e zero gitlinks. Não há HTML de entrada, componentes de UI, configuração de bundler ou `manifest.json` de módulo. | contrária |
| Build | `package.json:14–19`: `build: tsc`, `dev: tsc --watch` e só `typescript` como devDependency. `tsconfig.json:2–15`: compila `src` para `dist` com declarações. `package-lock.json` resolve apenas `typescript` 5.9.3. É um pacote de biblioteca publicado por `exports` (`package.json:8–13`), não uma aplicação. | contrária |
| Código-fonte (contrato) | `src/index.ts:37–71`: tipos `ModuleInfo`/`ModuleManifest` com `remoteEntry`. `src/index.ts:73–88`: interface `FPModule`, “The interface every module's remoteEntry.js must export as default”. `src/index.ts:189–304`: mapa de eventos e interface `FuzzyPeanutSDK`. São só declarações de tipo; nada no repositório as implementa ou carrega. | fraca |
| Código-fonte (runtime) | `src/index.ts:308–343`: `initSDK` grava a instância em `window.__fuzzyPeanutSDK` e `getSDK` a lê como fallback para “modules loaded as separate ES bundles”. `src/index.ts:347–392`: acessores `use*` e constantes `Events`. É um singleton de serviço compartilhado, sem carregar ou montar unidades. | contexto |
| Documentação | `README.md:12–14`: o shell chama `initSDK` e os módulos chamam `getSDK`, com o pacote “declared as a shared singleton in Vite module federation config”. `README.md:34–52`: exemplo de `manifest.json` que “every module repo ships”. Descreve a configuração de outros repositórios, não presente aqui. | fraca |
| Código-fonte (fronteiras) / Composição (busca) | `src/index.ts` é o único arquivo de código e não tem `import`. `git grep -i` no SHA, em `src` e `package.json`, por `import`, `from`, `federation`, `remoteEntry`, `window`, `customElements`, `iframe` e `single-spa`. Só acha os tipos com `remoteEntry` e o acesso a `window` já citados. Não há `remotes`, `exposes`, `registerApplication`, import map nem plugin de federação. | ausente |

## Autoria e histórico

Clone não raso. Há 8 commits, nenhum merge, todos de `trollboy <trollboy@gmail.com>` em 2026-02-21, entre 01:51 e 05:30 (−05:00). A raiz `0dfd15f` (“feat: initial SDK — types, FuzzyPeanutSDK interface, runtime helpers, standard events”) adiciona todos os arquivos, exceto `LICENSE`, que entra em `fcd6431`. Os demais commits só alteram `src/index.ts` (`git log --no-renames --name-status`):
- `383fa3d` adiciona o fallback por `window`;
- `b682c87` expande o contrato;
- `010e381`, `6f9043c`, `e86447f` e o SHA `a304cf3` ajustam eventos.

O dono é uma organização (`fuzzypeanut`). Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no repositório, que é só um pacote de tipos e helpers (inventário; `package.json:14–19`). Nenhuma configuração de composição referencia unidades externas: o shell e os módulos do README (`README.md:14`, `36`) não estão referenciados por `remotes`, registro ou import map. |
| Q2 | No | Sem unidades, não há entradas ou builds de unidades. O único build é `tsc` da biblioteca (`package.json:15`). |
| Q3 | No | Não há host, shell ou configuração raiz. `initSDK` só injeta um serviço (`src/index.ts:318–323`); não carrega, monta nem roteia unidades. |
| Q4 | No | Nenhum mecanismo configurado. Module Federation é só mencionado em `README.md:14`, e `remoteEntry` só aparece como campo de tipo (`src/index.ts:41`, `56`, `74`). |
| Q5 | No | Q1–Q4 são No: biblioteca de contrato de uma plataforma modular cujos shell e módulos estão em outros repositórios. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)” e a “repositories mentioning micro-frontends without implementing them”.
- Precedente final 015: biblioteca compartilhada de um ecossistema MFE em outros repositórios, `repo_type: library`, 0 unidades, `none`. A exceção MFE-unit não se aplica: o pacote não é uma unidade preparada para ser composta (sem `exposes`, lifecycles exportados nem custom element). `FPModule` só tipa o que os módulos externos deveriam exportar.
- Diferentemente de 097/103/104, não há host ou remoto deste repositório cuja conectividade precise ser interpretada. Diferentemente de 089/100, não há configuração de federação a julgar como code sharing; o `shared` citado no README está fora do repositório.
- `ui_technologies: []`: não há UI. O tipo do manifesto do README cita `./src/index.svelte` como exemplo, mas isso não é observado aqui. `build_tools: []`: só `tsc`, que não é bundler de unidades.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** pacote de contrato e tipos de uma plataforma de módulos, com vocabulário de federação (`remoteEntry`, “shared singleton”, módulos carregados como bundles separados), sem nenhuma unidade nem configuração de composição.
- **RQ3:** o pacote resolve o compartilhamento de estado entre bundles por variável global em `window`, além do `shared` da federação, como reforço (`src/index.ts:312–343`; commit `383fa3d`). Isso só é observável como intenção; os repositórios do shell e dos módulos não fazem parte do snapshot.
- **Protocolo (busca):** o acerto vem de uma única ocorrência em minúsculas no README (`README.md:14`). A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `library` e zero unidades; sem decisão aberta. O pacote `@fuzzypeanut/sdk` tem sete arquivos e um único arquivo de código (`src/index.ts`): `FPModule` tipa `mount`/`unmount` (`src/index.ts:73–88`), mas é só contrato para o `remoteEntry.js` de cada módulo externo (`README.md:36–45`); o pacote não é esse remoto, não implementa UI nem exporta ciclos de vida de unidade própria, e por isso a exceção MFE-unit não se aplica. O singleton em `window.__fuzzyPeanutSDK` (`src/index.ts:308–343`) é serviço compartilhado, não mecanismo que carregue unidades. Comparável final mais direto: 015 (biblioteca para consumidores MFE, Non-MFE), com este SDK ainda mais estreito, só interfaces e helpers de runtime.
