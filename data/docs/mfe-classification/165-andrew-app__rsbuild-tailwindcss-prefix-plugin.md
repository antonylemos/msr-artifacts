---
schema: 1
id: 1083487955
full_name: andrew-app/rsbuild-tailwindcss-prefix-plugin
url: https://github.com/andrew-app/rsbuild-tailwindcss-prefix-plugin
commit: 2738626a9e5ff7261b03d3fc73a20766e00898b8
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

# 165 — andrew-app/rsbuild-tailwindcss-prefix-plugin

## Contexto

Pacote npm `rsbuild-tailwindcss-prefix-plugin`: um plugin Rsbuild que, em build time, acrescenta um prefixo às classes Tailwind de `className` em arquivos JSX/TSX (`README.md:1–7`; `package.json:2–9`; `src/index.ts:8–104`). O README justifica o uso para isolar estilos “when building microfrontends with module federation” (`README.md:7`). O repositório não contém aplicação, unidade frontend nem configuração de composição. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:166` registra rank 165, ID 1083487955, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:166` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:20314` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:20320` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-10` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:17:10.281Z / 2026-10-08T15:39:48.464Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:09:30.932Z / 2026-10-08T15:48:17.782Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:20:46.338Z / 2026-10-08T16:16:09.053Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-10-01..2025-10-31`.

Metadados do hit:
- descrição “TailwindCSS prefix plugin for Rsbuild”, sem os termos;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 15;
- criação em 2025-10-26T05:49:52Z, push em 2025-10-26T07:11:49Z.

O acerto vem de `README.md:7` (“This is useful when building microfrontends with module federation…”), que traz “microfrontends” e “module federation”. A forma singular “microfrontend” não aparece no README nem na descrição; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `b5fcb42` (2025-10-26), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 9 entradas, todas arquivos regulares `100644` (`.gitignore`, `LICENSE`, `README.md`, `biome.json`, `package.json`, `pnpm-lock.yaml`, `rslib.config.ts`, `src/index.ts`, `tsconfig.json`); zero symlinks e zero gitlinks. Não há HTML de entrada, componentes ou aplicação. | contrária |
| Build | `package.json:11–28`: biblioteca com `exports` ESM/CJS, `build: rslib build`, `peerDependencies` `@rsbuild/core 1.x`. `rslib.config.ts:3–15`: saídas ESM e CJS para Node 18. | contrária |
| Código-fonte | `src/index.ts:8–16`: `pluginTailwindPrefix` devolve um `RsbuildPlugin` que registra `api.transform` para `.jsx`/`.tsx`. `src/index.ts:56–101`: reescreve `className` com prefixo. É ferramenta de build, sem mecanismo de composição. | contrária |
| Documentação | `README.md:7`: motivação em micro-frontends com Module Federation (evitar conflito de classes). `README.md:22–23`, `31–33`, `62`: exemplos com prefixos `app1-` e `iss-remote-`. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA (exceto lockfile) por `micro.?front`, `federation`, `remoteEntry`, `exposes`, `remotes` e `single-spa`: só `README.md:7`. | ausente |

## Autoria e histórico

Clone não raso; 6 commits, nenhum merge, todos de `andrew-app`: 5 com `<andrew.appuhamy@gmail.com>` e 1 via noreply. Todos são de 2025-10-26, de `27a1a48` (“Initial commit”) a `2738626` (SHA, “Publish v1.0.1 with update documentation”). `b3c443a` adiciona o código; a tag `v1.0.0` aponta para `e293b4e` (“Create LICENSE”). Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects --missing=print` reporta quatro objetos promisor ausentes; com `GIT_NO_LAZY_FETCH=1`, a varredura global de `git log --name-status` falha ao pedir um blob histórico (`7d91006…`), embora os logs por caminho dos arquivos atuais relevantes tenham concluído. O snapshot do SHA foi lido integralmente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no repositório; nenhuma configuração de composição. |
| Q2 | No | Sem unidades, não há entradas ou builds de unidades; o build é o da biblioteca (`package.json:24`). |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; Module Federation só aparece como motivação no README (`README.md:7`). |
| Q5 | No | Q1–Q4 são No: plugin de build para Tailwind usado por terceiros, possivelmente em projetos MFE. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde, por analogia, a “MFE frameworks and libraries (e.g., … federation plugins)” e a “repositories mentioning micro-frontends without implementing them”.
- Precedente final 015: biblioteca de apoio a um ecossistema MFE, com `repo_type: library`, 0 unidades e `none`. A exceção MFE-unit não se aplica: o pacote não é unidade preparada para composição.
- `ui_technologies: []` e `build_tools: []`: não há unidades frontend. Rsbuild e Rslib são o alvo e a ferramenta de empacotamento do plugin, não bundlers de unidades.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** biblioteca de build que cita “microfrontends with module federation” como caso de uso bate em consultas terminológicas e de tecnologia sem conter composição.
- **RQ2 (contexto):** o isolamento de CSS por prefixo de classes Tailwind em build time aparece como prática auxiliar de MFE; o prefixo de exemplo `iss-remote-` (`README.md:31–33`, `62`) sugere origem num remoto real, não observável aqui.
- **Protocolo (busca):** o hit singular `microfrontend` não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `library`, zero unidades e nenhuma abordagem; sem decisão aberta (`draft`). O README descreve o uso em microfrontends com Module Federation, mas o código implementa só um plugin Rsbuild que reescreve classes Tailwind. Correções: (1) `package.json:11–28,36–38` (a peer dependency está em `:36–38`); (2) o inventário estrutural de nove caminhos é resultado de comando, não citação de arquivo; (3) proveniência do hit singular: o README contém o plural `microfrontends` (`README.md:7`), e por eliminação ele é a origem provável, sem que a tokenização esteja registrada nas bases; (4) Rsbuild e Rslib não entram em `build_tools`, campo dos bundlers das unidades, e não há unidades; (5) Q1 a Q3 devem citar artefatos e localizadores, além do inventário Git para as afirmações estruturais negativas. A classificação depende do escopo do artefato e não do nome, mesmo que o pacote seja útil em projetos MFE.
