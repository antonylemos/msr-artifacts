---
schema: 1
id: 1303822970
full_name: Cloudscaile-Experience/patient-management-portal-b32c1776
url: https://github.com/Cloudscaile-Experience/patient-management-portal-b32c1776
commit: b8a9112f70efaa4ed2cd4f3e47ed5581d1381939
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 161 — Cloudscaile-Experience/patient-management-portal-b32c1776

## Contexto

“Patient Management Portal”: extensão para uma plataforma (tenant `cloudscaile`) composta de uma API Fastify (`js/`) e de um micro-frontend React (`web/`) que, por Module Federation, expõe `./PatientManagement` e `./PatientDetail` para um host (`README.md:1–8`, `43`; `manifest.json:1–30`). O host não está no repositório. O remoto depende de uma ponte de host (`@cloudscaile-eng/web-ext-utils`) para axios, store Redux, tema, i18n e toasts. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:162` registra rank 161, ID 1303822970, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:162` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:33696` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:33703` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-07` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:35.473Z / 2026-10-08T16:00:43.513Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:08:31.860Z / 2026-10-08T16:09:50.872Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:28:59.650Z / 2026-10-08T16:18:56.800Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-07-01..2026-07-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 239;
- criação em 2026-07-17T09:37:36Z, push em 2026-07-17T09:37:39Z.

Grafias no README:
- “micro-frontend”: `README.md:3` (“React micro-frontend”), `8`, `35`, `43`, `52`;
- “Micro-frontend”: `README.md:77`;
- “Module Federation”: `README.md:8` (“Module Federation component consumed by the host”).

Hipótese de indexação, não demonstrada pelos dados locais: a busca de frase poderia tratar o hífen como separador. A forma plural “micro frontends” não aparece no README nem na descrição; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O README vem do único commit, que é o SHA (2026-07-17), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 141 entradas, 138 arquivos regulares `100644` e 3 executáveis `100755` (`js/entrypoint.sh`, `js/scripts/migrate.sh`, `js/scripts/seed-if-new-db.sh`); zero symlinks e zero gitlinks. Há `js/` (API Fastify + Drizzle/PostgreSQL), `web/` (único projeto frontend), `manifest.json` e `lefthook.yml` na raiz, e `.claude/` com skills e `CLAUDE.md` em ambos os pacotes. | contexto |
| Configuração (federação) | `web/webpack/webpack.common.cjs:45–65`: `ModuleFederationPlugin({ name: 'remote', filename: 'remoteEntry.js', exposes: { './PatientManagement', './PatientDetail' }, shared: react, react-dom, react-router, i18next, react-i18next singleton })`, sem `remotes`. `web/webpack/webpack.prod.cjs:11–16`: `publicPath: 'auto'`. `web/src/index.tsx:1`: bootstrap assíncrono. | forte |
| Configuração (registro) | `manifest.json:2–24`: `tenant`, `extensionName` e `web.scope: "remote"`, `remoteFileName: "remoteEntry.js"`, módulos `./PatientManagement` e `./PatientDetail` com tamanhos de grade. É a declaração do remoto para o host da plataforma. | moderada |
| Código-fonte (contrato com host) | `web/src/utils/extension.ts:1–78`: `getExtension(tenant, name)`, `getExtAxios`, `getReduxStore`, `injectReducers`, `getTheme`, `registerTranslation`, `toast`, `getEventBus` e `getUser`, de `@cloudscaile-eng/web-ext-utils` (`web/package.json:17`). `web/src/containers/PatientManagementContainer.tsx:9–26` e `PatientDetailContainer.tsx`: registram traduções no host e recebem props de rota. `web/README.md:3` e `web/.claude/skills/micro-frontend-integration/SKILL.md:7–61`: “never standalone in production”; o host controla rotas, store e tema. | moderada |
| Código-fonte (fronteiras) | `web/` usa o alias `@` → `web/src` (`webpack.common.cjs:13–15`) e não importa nada de `js/`. A busca por imports `../../` em `web` e `js` não retorna nada. A comunicação com a API é por HTTP via axios do host. | contexto |
| Build/deploy | `web/package.json:4–12`: `webpack` com configurações dev e prod. `js/Dockerfile`, `js/docker-compose*.yml`: API e banco. Não há host, shell nem configuração de `remotes`. | contexto |

## Autoria e histórico

Clone não raso com um único commit, o SHA `b8a9112` (2026-07-17T09:37:36Z, “Initial commit”), de `Cloudscaile-Experience <dev@cloudscaile.com>`. Criação e push nos metadados ocorrem no mesmo segundo do commit. Os arquivos `.claude/` e `CLAUDE.md` indicam projeto organizado para assistente de código; os metadados não permitem separar autoria intelectual nem dizer se o repositório foi gerado automaticamente. A amostra contém outro repositório da mesma organização com o mesmo prefixo de nome (rank 376, `patient-management-portal-a7df64e7`, `data/samples/mfe-sample-001/sample.csv:377`), não inspecionado aqui. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`web/`); a configuração de composição só tem `exposes` (`webpack.common.cjs:48–51`) e não referencia unidades externas. A API `js/` não é unidade frontend. |
| Q2 | Yes (para a unidade) | Entrada e build próprios que geram `remoteEntry.js` (`webpack.common.cjs:10`, `46–47`; `web/package.json:6`). |
| Q3 | Undetermined | O host da plataforma não está no repositório; só aparece pelo contrato da ponte (`extension.ts`) e pelo `manifest.json`. |
| Q4 | Undetermined | O lado remoto está configurado; o consumidor não é observável. |
| Q5 | No | Há uma unidade preparada para composição, não uma instância de MFE no repositório. |

## Motivo

- Proposta `MFE-unit` com `status: review`. A exceção do checklist se aplica literalmente: “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”. O padrão é o dos finais 001/050/069, com contrato de host mais rico (store, tema, i18n, axios, event bus).
- **A revisão se justifica pela questão de plataforma:** o host é uma plataforma de extensões (`manifest.json` com `tenant`/`extensionName`; SDK `@cloudscaile-eng/web-ext-utils`). O final 037 (ioBroker Admin) classificou como `Non-MFE` uma unidade cujo único host é o mecanismo de extensão de uma plataforma de terceiros, e a questão também é a de 102/074/080.
- **Diferença em relação a 037:** aqui o repositório pertence à própria organização da plataforma (`tenant: "cloudscaile"`, conta `Cloudscaile-Experience`), o que o aproxima de uma unidade de primeira parte, como discutido em 152.
- **Origem do repositório:** commit único de conta organizacional e repositório-irmão quase homônimo na amostra são compatíveis com geração por ferramenta da plataforma, mas isso não está demonstrado, e o par não foi inspecionado; não se usa o paralelo com casos de gerador (075 é ferramenta; 081 e 105 não são finais; 094 é exercício/aplicação) para classificar este candidato.
- **Campos:** `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 1`, `unit_organization: single-unit`. `repo_type: example`: extensão de demonstração de clínica, sem indício de uso em produção; `production` também seria defensável.

## Notas para análise

- **RQ2:** remoto Module Federation de plataforma de extensões multi-tenant, com manifesto declarativo (`manifest.json`: módulos, tamanhos de grade) e SDK de ponte que entrega serviços do host (axios autenticado, injeção de reducers, tema MUI, i18n, toasts, event bus).
- **RQ1 (sinais enganosos):** nenhum; o vocabulário MFE corresponde a configuração real.
- **Protocolo (amostra):** o rank 376 é da mesma organização, com o mesmo prefixo de nome. Convém classificar os dois de forma consistente e verificar se são variantes geradas.
- **Protocolo (busca):** o hit plural não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Ponto para revisão conjunta

Decidir se um remoto Module Federation preparado para o host de uma plataforma de extensões, com manifesto e SDK próprios da plataforma e mantido pela organização da plataforma, conta como MFE-unit ou segue o precedente 037.

- **MFE-unit (proposto):** `exposes`, `remoteEntry.js`, `shared` singleton e contrato explícito com o host, como em 001/050/069. A plataforma não é de terceiros em relação ao titular do repositório.
- **Non-MFE:** segue 037, porque o único host é o mecanismo de extensão de uma plataforma e o repositório é uma extensão dela, possivelmente gerada.

Não se propõe regra nova. Até a decisão, preservar `MFE-unit`/`review`.
- **Contribuição da revisão independente (Lupa):** concordância provisória com MFE-unit e `review`; a fronteira entre remoto MFE de primeira parte e extensão de plataforma segue uma decisão real, pois o host não está incluído e o final 037 tratou como Non-MFE um remote de extensão para host de plataforma terceira. Aqui o tenant e a organização titular coincidem (`manifest.json:3–4`), o que enfraquece a analogia, mas não demonstra que o host consumidor seja parte deste produto; 074, 102 e 080 não resolvem o caso. Q3 e Q4 seguem Undetermined, e `repo_type: example` é a leitura mais provável (`README.md:22–43`; `web/README.md:92–99`), com `production` como alternativa que não muda a classe. Localizações a completar nas citações: contrato de exportação em `web/src/containers/PatientDetailContainer.tsx:24–27,67–88`; `web/webpack/webpack.common.cjs:13–15` e `:48–51` (com o prefixo `web/`); chamadas HTTP/axios em `web/src/api/calls/patients.ts:16–28` e a ponte `web/src/utils/extension.ts:33–35`; `js/Dockerfile:1–32`, `js/docker-compose.yml:1–35` e `js/docker-compose.dev.yml:1–26` (PostgreSQL local); `web/package.json:4–12`. A estrutura é inventário por `git ls-tree` do SHA, e não citação de arquivo; `.claude/` não é frontend. A coincidência de prefixo com outro candidato da mesma organização (`sample.csv:377`) é sinal de família, não prova de geração.
