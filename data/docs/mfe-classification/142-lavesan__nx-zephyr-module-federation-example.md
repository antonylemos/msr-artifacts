---
schema: 1
id: 999205690
full_name: lavesan/nx-zephyr-module-federation-example
url: https://github.com/lavesan/nx-zephyr-module-federation-example
commit: 766b6a2c04c1ef39201ad05ed1b5970d4cb10436
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rsbuild]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 142 — lavesan/nx-zephyr-module-federation-example

## Contexto

Exemplo de micro-frontends com Module Federation em monorepo Nx e pnpm (`pnpm-workspace.yaml:1–3`; `README.md:1–29`). São três aplicações React/Rsbuild: `apps/shell` (host, porta 3000), `apps/courses` (remote, 3001) e `apps/profile` (remote, 3002), mais um plugin local `packages/zephyr-rsbuild-plugin` que envolve o build com Zephyr Cloud. Cada app tem `vercel.json` próprio para deploy separado (`README.md:95–101`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:143` registra rank 142, ID 999205690, branch `master`, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:143` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14938` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:14944` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2025-06` | 2026-10-07T23:17:55.163Z / 2026-10-08T16:14:22.984Z |
| `technology-topic-module-federation`: `topic:module-federation` | sem partição | 2026-10-07T23:13:42.957Z / 2026-10-08T16:11:12.560Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-06` | 2026-10-07T22:22:33.626Z / 2026-10-08T15:54:38.038Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-06` | 2026-10-07T22:54:08.850Z / 2026-10-08T16:05:53.214Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01` e, nas particionadas, `created:2025-06-01..2025-06-30`.

Metadados do hit:
- descrição “Simple example using React, Module Federation, NX, zephyr, RsBuild and Vercel”;
- tópicos `module-federation`, `nx`, `react`, `rsbuild`, `typescript`, `vercel` e `zephyr`;
- linguagem TypeScript, `fork: false`, criação em 2025-06-09T22:50:18Z, push em 2025-06-11T01:11:05Z, homepage na Vercel.

Origem de cada hit:
- `topic:module-federation` vem do tópico literal.
- `"module federation"` pode vir da descrição ou de `README.md:3` (“using Module Federation”).
- `"micro frontend"` corresponde à grafia hifenizada “micro-frontend” em `README.md:3`, `47` e `83`.
- Não há forma plural no README nem na descrição; o hit de `"micro frontends"` depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `f9593dc` (2025-06-10T15:29:11-03:00), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 65 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Workspaces `packages/*` e `apps/*` (`pnpm-workspace.yaml:1–3`); três apps com `package.json`, `project.json`, `rsbuild.config.ts`, `module-federation.config.ts`, `src/` e `vercel.json` (o do shell fica na raiz), mais o pacote `zephyr-rsbuild-plugin`. | contexto |
| Configuração (host) | `apps/shell/module-federation.config.ts:17–24`: `name: "shell"` e `remotes` `courses@${COURSES_URL}/remoteEntry.js` e `profile@${PROFILE_URL}/remoteEntry.js`. Em desenvolvimento, as URLs são `http://localhost:3001` e `http://localhost:3002`; em produção, variáveis `VITE_*` ou URLs padrão na Vercel (`apps/shell/module-federation.config.ts:4–15`). `react`/`react-dom` são singletons `eager` (`apps/shell/module-federation.config.ts:25–37`). A configuração entra no Rsbuild via `moduleFederation.options` (`apps/shell/rsbuild.config.ts:31–33`). | forte |
| Configuração (remotes) | `apps/courses/module-federation.config.ts:4–9` e `apps/profile/module-federation.config.ts:4–9`: `name` `courses`/`profile`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App" }`. Portas 3001 e 3002 (`apps/courses/rsbuild.config.ts:7–9`; `apps/profile/rsbuild.config.ts:7–9`), coerentes com as URLs de dev do host. | forte |
| Código-fonte (consumo) | `apps/shell/src/App.tsx:6–7`: `lazy(() => import("courses/App"))` e `lazy(() => import("profile/App"))`, montados nas rotas `/courses*` e `/profile*` dentro de `Suspense` (`apps/shell/src/App.tsx:17–23`), com navegação no `Header` (`apps/shell/src/components/Header.tsx:16–43`). `apps/shell/src/remotes.d.ts:3–11` tipa os módulos. Os remotes exportam `App` por padrão (`apps/courses/src/App.tsx:111`; `apps/profile/src/App.tsx:100`). | forte |
| Código-fonte (fronteiras) | Busca por `from '../` e `import('../` em `apps` e `packages`: nenhuma ocorrência. Os apps dependem do plugin local só como pacote de build (`zephyr-rsbuild-plugin: workspace:*`, por exemplo em `apps/shell/package.json:18`), e o host acessa os remotes só pelos especificadores federados. | contexto |
| Build/deploy | Builds e servidores separados: cada app roda `rsbuild build`/`rsbuild dev` (`apps/shell/package.json:6–12`; `apps/courses/package.json:6–12`; `apps/profile/package.json:6–12`), com targets Nx próprios (`apps/courses/project.json:6–20`). Deploy separado na Vercel: `vercel.json:2–3` para o shell, `apps/courses/vercel.json:2–3` e `apps/profile/vercel.json:2–3`. `package.json:5–9` orquestra `dev`/`build` dos três. | moderada |
| Tecnologia | `pnpm-lock.yaml:33–37` e `pnpm-lock.yaml:67–71` resolvem `@rsbuild/core` 0.4.15 para `courses` e `profile`. `pnpm-lock.yaml:125–127` resolve 1.3.22 para `shell`. Os remotes declaram `@rsbuild/core` `^0.4.5` (`apps/courses/package.json:14`; `apps/profile/package.json:14`). O plugin Zephyr envolve a configuração com `withZephyr()` antes de criar o compilador (`packages/zephyr-rsbuild-plugin/src/index.ts:4–10`). | ambígua |
| Documentação | `README.md:9–29`: shell host e dois remotes. `README.md:81–93`: diagrama Shell → Courses/Profile. `README.md:117–127`: `pnpm dev` sobe 3000/3001/3002. `README.md:95–101`: deploys separados na Vercel. | moderada |

## Autoria e histórico

Clone não raso; 13 commits, nenhum merge, todos de Valdery Alves `<valdery.jur@gmail.com>`, de 2025-06-09 a 2025-06-10. Por caminho (`git log --no-renames`): `apps/shell` 9 commits, `apps/courses` 5, `apps/profile` 6, `packages` 2. Pelo `git log --name-status`:
- a raiz `5a52004` adiciona `shell` e `profile` com configurações de federação e o plugin Zephyr;
- `78c42b1` (“divides microfrontends between two page…”) adiciona `courses/module-federation.config.ts`;
- `9b23a4f` passa as URLs para variáveis de ambiente;
- o SHA `766b6a2` ajusta o plugin Zephyr.

O histórico mostra a evolução incremental de uma composição host/remotes por um único autor, sem código de terceiros além das dependências. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades frontend no repositório, `shell`, `courses` e `profile`, com entradas próprias (`apps/*/src/index.tsx`). O host referencia os dois remotes na configuração de federação (`apps/shell/module-federation.config.ts:20–23`). |
| Q2 | Yes | Cada unidade tem `package.json`, `rsbuild.config.ts`, porta, target Nx e `vercel.json` próprios. Nenhum import de código-fonte entre elas (busca por `../` sem ocorrências); o host usa só `courses/App` e `profile/App`. |
| Q3 | Yes | O shell roteia e monta os remotes (`apps/shell/src/App.tsx:6–7`, `17–23`). |
| Q4 | Yes | Module Federation configurado nos dois lados, com nomes, `filename`, chave `./App` e portas de dev coerentes (`apps/shell/module-federation.config.ts:7–23`; `apps/courses/module-federation.config.ts:4–9`; `apps/profile/module-federation.config.ts:4–9`; `apps/*/rsbuild.config.ts:7–9`, `31–33`) e consumido em código (`apps/shell/src/App.tsx:6–7`). |
| Q5 | Yes | Q1–Q4 são Yes: cadeia host → dois remotes completa no fluxo de desenvolvimento documentado. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples … that actually compose frontend units”, com `repo_type: example` (descrição “Simple example…”; `README.md:3`: “demonstration”). É a mesma cadeia completa de 076/084/096/106/109.
- Diferentemente de 089/100, cada remote expõe a aplicação inteira, montada como rota do host. Diferentemente de 097/103/104, nomes, portas e exposes fecham.
- Zephyr Cloud é plataforma de build/deploy envolvendo o Rspack, não host de terceiros que compõe as unidades. Não se aplica o caso 074/080/102.
- `approaches: [module-federation]`, `ui_technologies: [react]`. `build_tools: [rsbuild]`, como em 029, pelas configurações explícitas (`apps/*/rsbuild.config.ts`). `frontend_units: 3`, sem contar o plugin de build. `unit_organization: monorepo` (pnpm workspaces + Nx).
- Não há decisão aberta: composição runtime por Module Federation, sem iframe, links entre aplicações ou pacotes em build time.

## Notas para análise

- **RQ2:** Module Federation pela opção nativa `moduleFederation.options` do Rsbuild, com URLs de remotes por ambiente e deploy de cada unidade como projeto Vercel separado.
- **RQ1 (operabilidade não verificada):** a linha `ambígua` registra que os remotes usam `@rsbuild/core` 0.4.15 e o host 1.3.22, e que o plugin Zephyr altera a configuração em todo build/dev. Isso pode afetar a execução, que não foi feita, mas não altera a coerência da configuração lida. A demo publicada (`README.md:5`) não foi acessada.
- **Protocolo (busca):** o hit no plural não tem grafia correspondente no README nem na descrição. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, três unidades, `module-federation` e `rsbuild`; sem decisão aberta. Ressalva de resolução, verificada no SHA: o plugin local declara `@rsbuild/plugin-react: ^0.4.5` e `@rsbuild/shared: ^0.4.5` (`packages/zephyr-rsbuild-plugin/package.json:22–38`), mas o importer correspondente do `pnpm-lock.yaml:141–158` registra `^1.2.0` e `^0.7.10`. O lockfile não representa as especificações atuais do manifesto, de modo que uma instalação congelada não é demonstravelmente reproduzível; os deploys usam `pnpm install --no-frozen-lockfile` (`vercel.json:2`; `apps/courses/vercel.json:2`; `apps/profile/vercel.json:2`). O host resolve Rsbuild 1.3.22 e os dois remotes 0.4.15 (`pnpm-lock.yaml:101–130`, `:33–40`, `:67–74`). Cautela de operabilidade, sem efeito na classe: a configuração e o consumo dos remotes por Module Federation estão no snapshot. Comparáveis finais: 029 (React/Rsbuild em monorepo, MFE-implemented) e 059 (host e remotes, mecanismo diferente).
