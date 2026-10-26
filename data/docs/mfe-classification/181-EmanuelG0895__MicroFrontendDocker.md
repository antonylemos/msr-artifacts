---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
url: https://github.com/EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 181 — EmanuelG0895/MicroFrontendDocker

## Contexto

“Prueba Técnica - Microfrontends con Module Federation” (`README.md:1–12`): teste técnico com três aplicações React + TypeScript em Rspack, usando `@module-federation/enhanced`, empacotadas com Docker Compose e Nginx.
- `MF-Shell` é o host e consome `MF_CharacterDetail/View` e `MF_Characters/Vista`.
- `MF-CharacterDetail` expõe a lista de personagens.
- `MF-Characters` expõe a tela de detalhe.

O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:182` registra rank 181, ID 1009817207, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:182` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:15729` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:15733` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-06` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:37:52.559Z / 2026-10-08T15:38:14.867Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:07:57.374Z / 2026-10-08T15:47:25.710Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:22:18.917Z / 2026-10-08T15:54:28.552Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:17:55.163Z / 2026-10-08T16:14:22.984Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-06-01..2025-06-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 126;
- criação em 2025-06-27T19:04:41Z, push em 2025-08-19T18:51:17Z.

Grafias no README:
- “Microfrontends”: `README.md:1`;
- “microfrontends”: `README.md:3`, `7`;
- “Microfrontend”: `README.md:201`, `206`;
- “Module Federation”: `README.md:1`, `3`, `108`, `222`.

A forma separada “micro frontend” não aparece no README nem na descrição; esse hit depende do processamento textual da busca do GitHub (ou do campo `name`), que não está registrado.

A última alteração do README é `feccf9f` (2025-06-27). O SHA (2025-08-19) não altera o README (`git diff-tree`). Ambos são anteriores às coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 88 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há três projetos, `MF-Shell/`, `MF-Characters/` e `MF-CharacterDetail/`, cada um com `package.json`, `rspack.config.ts`, `module-federation.config.ts` e `src/`. Na raiz há `Dockerfile` (do shell), `docker-compose.yml`, `nginx.conf` e scripts de validação. `MF-Characters` e `MF-CharacterDetail` também têm `webpack.config.js` não usados pelos scripts (`package.json:4–9`, que usam `rspack`). | contexto |
| Configuração (host) | `MF-Shell/module-federation.config.ts:1–12`: `remotes` `MF_CharacterDetail@http://localhost:3003/remoteEntry.js` e `MF_Characters@http://localhost:3002/remoteEntry.js`, com `shared` react e react-dom singleton. `MF-Shell/rspack.config.ts:5`, `24`, `98`: `ModuleFederationPlugin` de `@module-federation/enhanced/rspack`, porta 3000. | forte |
| Configuração (remotos) | `MF-CharacterDetail/module-federation.config.ts:1–10`: `exposes` `./View` e `./CharacterInfo` (`./src/components/view.tsx`). `MF-CharacterDetail/rspack.config.ts:25`, `38`: porta 3003. `MF-Characters/module-federation.config.ts:1–8`: `exposes` `./Vista`. `MF-Characters/rspack.config.ts:25`, `33`: porta 3002. As portas de desenvolvimento coincidem com as `remotes` do host. | forte |
| Código-fonte (consumo) | `MF-Shell/src/App.tsx:6–8`, `25–40`: `React.lazy(() => import("MF_CharacterDetail/View"))` na rota `/` e `Details` em `/details/:id`. `MF-Shell/src/app/details.tsx:3`, `13`: `React.lazy(() => import("MF_Characters/Vista"))`. `MF-CharacterDetail/src/components/view.tsx:7–27`: `onCharacterClick` repassado pelo host. `MF-Shell/src/index.ts:1`: bootstrap assíncrono. `MF-Shell/@mf-types/`: tipos gerados dos remotos. | forte |
| Código-fonte (fronteiras) | A busca por imports `../../` no SHA não retorna nada. Os imports entre projetos são só os federados. | contexto |
| Build/deploy | `docker-compose.yml:1–60`: serviços `nginx`, `mf-shell`, `mf-characters` e `mf-character-detail`, cada um com imagem própria. `nginx.conf:6–53`: upstreams e rotas por serviço. Em produção, `start:prod` usa as portas 3000/3001/3002 (`MF-*/package.json:9`), diferentes das URLs de `remotes` (3002/3003), e o README registra esse tipo de problema (“Los puertos de Module Federation no coinciden…”, `README.md:157`). A cadeia é coerente no modo de desenvolvimento. | moderada |

## Autoria e histórico

Clone não raso; 18 commits, nenhum merge, todos de `EmanuelG0895` (noreply).
- **Desenvolvimento:** quase todos em 2025-06-27, de `4f9653f` (“Initial commit”) a `feccf9f` (“README”), passando pelas mensagens “micrfrontend con buscador…”, “ruta creada y funcionando” e por commits de Docker.
- **SHA:** `137ba29` (2025-08-19, “Update ports, module federation, and type definitions”) altera `MF-Shell/module-federation.config.ts`, os `webpack.config.js`, os tipos em `@mf-types` e `api.ts` (`git diff-tree`).

Nenhum blob histórico foi lido. O clone é parcial (`blob:none`): o `git log --name-status` de `MF-Shell` interrompe com `lazy fetching disabled` ao pedir o objeto `140fae5…`, que `git cat-file` confirma indisponível; os históricos de `MF-Characters` e `MF-CharacterDetail` chegam às suas adições iniciais. A árvore avaliada é integral e os 18 commits visíveis têm a mesma autoria registrada, mas não se certifica toda a lista histórica de mudanças de `MF-Shell`.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades no repositório, referenciadas pela configuração de composição do shell (`MF-Shell/module-federation.config.ts:3–6`). |
| Q2 | Yes | Cada unidade tem entrada, build, porta e imagem Docker próprias (`MF-*/rspack.config.ts`; `docker-compose.yml`), sem imports de código-fonte entre elas. |
| Q3 | Yes | O shell monta as duas telas remotas por rota (`MF-Shell/src/App.tsx:25–40`; `src/app/details.tsx:13`). |
| Q4 | Yes | Module Federation configurado no host e nos remotos e consumido por `import()` federado. As portas de dev coincidem (`MF-Shell/module-federation.config.ts:4–5`; `MF-Characters/rspack.config.ts:25`; `MF-CharacterDetail/rspack.config.ts:25`). |
| Q5 | Yes | Q1–Q4 são Yes: shell com dois remotos em Rspack e Module Federation. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”.
- A cadeia está completa no snapshot em desenvolvimento, como em 076/084/096/106/109. Os remotos expõem telas de domínio montadas por rota, não componentes genéricos (089/100).
- A divergência de portas na configuração Docker de produção é defeito operacional e não retira a composição configurada e consumida.
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [rspack]` (os `webpack.config.js` são resíduos não usados), `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example` (teste técnico).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** Module Federation com Rspack e `@module-federation/enhanced`, tipos remotos gerados (`@mf-types`) e Docker Compose com Nginx como proxy por unidade.
- **RQ3:** inconsistência de portas entre dev (3002/3003) e prod (3001/3002) nas URLs de `remotes`, apontada no próprio README como problema conhecido. Os nomes dos módulos também não correspondem ao conteúdo: `MF_CharacterDetail` expõe a lista, `MF_Characters` expõe o detalhe.
- **Protocolo (busca):** quatro consultas casam; o hit `"micro frontend"` (separado) não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented e Q1–Q5 Yes (`draft`), sem decisão metodológica aberta. Três aplicações React independentes, cada uma com pacote, entrada e build Rspack; o shell aplica Module Federation na configuração usada pelos scripts (`MF-Shell/module-federation.config.ts:4–5`), declara dois remotos e importa suas exposições por nomes que coincidem com os módulos e exports. Ressalva material, verificada no SHA: a composição está demonstrada para desenvolvimento (os remotos em `localhost:3002` e `3003`, `MF-Characters/rspack.config.ts:25,33` e `MF-CharacterDetail/rspack.config.ts:25,38`); o perfil Docker/Nginx de produção escuta em 3001 e 3002 (`start:prod`, `EXPOSE`, `README.md:10–11`) e o Nginx não roteia `/remoteEntry.js` nem os chunks pelas URLs esperadas, de modo que a coerência da cadeia vale para desenvolvimento, e não para o deploy em produção (como no final 007, onde o caminho de desenvolvimento basta). `shared-hooks` é configuração extra sem resolução nem uso. A origem do acerto "micro frontend" é provavelmente o nome CamelCase `MicroFrontendDocker`, hipótese e não campo provado. "Prueba Técnica" (`README.md:1–3`) sustenta `example`.
