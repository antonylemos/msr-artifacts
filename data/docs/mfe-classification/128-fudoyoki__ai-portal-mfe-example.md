---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
url: https://github.com/fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 128 — fudoyoki/ai-portal-mfe-example

## Contexto

Monorepo npm workspaces + Turborepo (`package.json:5–11`; `turbo.json:3–7`) com duas aplicações frontend Vite/React — `apps/shell` (host) e `apps/mfe-dashboard` (remote) — ligadas por `@originjs/vite-plugin-federation`, dois pacotes compartilhados (`packages/ui-kit`, `packages/shared-types`) e um BFF NestJS (`apps/bff`). Os remotes Chat, Tools e Admin estão só previstos: comentados na configuração do host e exibidos como “Coming soon” (`apps/shell/vite.config.ts:32–35`; `apps/shell/src/App.tsx:177–178`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:129` registra rank 128, ID 1145815182, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:129` registra as estratégias `terminology;technology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:24141` e `data/discovery/mfe-round-002/candidates.csv:24148`, ambos com `terminology;technology` e elegibilidade `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, todos do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-01` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T23:22:25.187Z / 2026-10-08T16:16:50.018Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-01` | `"micro frontend" … created:2026-01-01..2026-01-31` | 2026-10-07T22:30:06.184Z / 2026-10-08T15:57:26.919Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-01` | `"micro frontends" … created:2026-01-01..2026-01-31` | 2026-10-07T22:59:35.430Z / 2026-10-08T16:07:45.338Z |

Metadados do hit: descrição “Micro-frontend architecture example with Vite + React + Module Federation + NestJS BFF”, sem tópicos, linguagem TypeScript, `fork: false`, criação em 2026-01-30T08:48:59Z, push em 2026-01-30T15:21:37Z. Como os hits não registram o campo casado, há duas fontes possíveis: a descrição e o README. `module federation` aparece em `README.md:3` (“Vite + React + Module Federation”), `README.md:70`, `README.md:111`, `README.md:148` e `README.md:279`. A grafia com hífen “Micro-Frontend”/“micro-frontend” aparece em `README.md:1` e `README.md:3`. Não há forma plural (“micro frontends”/“micro-frontends”) nem na descrição nem no README. O hit da consulta no plural depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração de `README.md` alcançável é o próprio SHA, `f1fd5b0` (2026-01-30T16:21:36+01:00), anterior às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 55 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Workspaces `apps/*` e `packages/*` (`package.json:5–8`). Duas apps frontend, cada uma com `package.json`, `index.html`, `src/main.tsx`, `vite.config.ts`, `Dockerfile` e `nginx.conf`. Há ainda dois pacotes de biblioteca e um BFF. Não há lockfile versionado. | contexto |
| Configuração (host) | `apps/shell/vite.config.ts:28–36`: `federation({ name: 'shell', remotes: { mfeDashboard: getRemoteUrl('mfeDashboard') } })`. Em desenvolvimento a URL é `http://localhost:3001/assets/remoteEntry.js` (`apps/shell/vite.config.ts:8–10`, `17–19`). `shared` declara singletons de `react`, `react-dom`, `react-router-dom` e dos dois pacotes internos (`apps/shell/vite.config.ts:39–59`). | forte |
| Configuração (remote) | `apps/mfe-dashboard/vite.config.ts:11–17`: `name: 'mfeDashboard'`, `filename: 'remoteEntry.js'`, `exposes: { './DashboardApp': './src/DashboardApp.tsx' }`. Porta 3001 com `strictPort` (`apps/mfe-dashboard/vite.config.ts:6`, `42–50`). Os `shared` espelham os do host (`apps/mfe-dashboard/vite.config.ts:20–39`). | forte |
| Código-fonte (consumo) | `apps/shell/src/App.tsx:7`: `React.lazy(() => import('mfeDashboard/DashboardApp'))`, montado na rota `/dashboard/*` com `Suspense` e error boundary, recebendo `user` e `basePath` (`apps/shell/src/App.tsx:167–176`). O especificador corresponde ao nome do remote e à chave exposta. `apps/shell/src/vite-env.d.ts:4–8` tipa o módulo com `MfeProps`. | forte |
| Código-fonte (exposição) | `apps/mfe-dashboard/src/DashboardApp.tsx:89–97`: export default `DashboardApp({ user, basePath })` com rotas internas. `MfeProps` está definido em `packages/shared-types/src/index.ts:48–51`. | forte |
| Código-fonte (fronteiras) | Busca por todos os `import`/`export … from`/`import(` em TS/TSX e por `../` em todo o texto do SHA. Shell e dashboard só importam arquivos locais (`./…`), dependências npm e `@ai-portal/ui-kit`/`@ai-portal/shared-types`, declarados como dependências de workspace (`apps/shell/package.json:14–15`; `apps/mfe-dashboard/package.json:14–15`). Os únicos `../` são `../../packages/ui-kit/src/**` no `content` do Tailwind (`apps/shell/tailwind.config.js:6`; `apps/mfe-dashboard/tailwind.config.js:6`), que leem o pacote compartilhado para gerar classes CSS. Nenhum import liga diretamente shell e dashboard. | contexto |
| Build/deploy | Cada app tem build próprio, `tsc && vite build` (`apps/shell/package.json:8`; `apps/mfe-dashboard/package.json:8`), e imagem própria nginx na porta da unidade (`apps/shell/Dockerfile:18–33`; `apps/mfe-dashboard/Dockerfile:18–33`). São serviços separados no compose (`docker-compose.yml:5–27`). `apps/mfe-dashboard/nginx.conf:6–9` declara CORS; `:21–26` escreve um bloco sem cache para `remoteEntry.js`, mas a regex genérica de `.js` (`:16–19`) vem antes e é a selecionada para `/assets/remoteEntry.js`, de modo que o bloco específico não cumpre esse propósito nesse pedido (o shell repete a ordem em `apps/shell/nginx.conf:12–20`). As diretivas estão escritas, sem comportamento comprovado. | moderada |
| Documentação (execução) | `README.md:68–105`: buildar o dashboard, rodar o shell em dev e o dashboard em `preview` na 3001, depois abrir `/dashboard` para ver o remote dentro do shell. `README.md:109–115` explica que `remoteEntry.js` só é gerado no build (`dist/assets/remoteEntry.js`), o que coincide com a URL de desenvolvimento do host. | moderada |
| Configuração (produção) | Em produção, a URL do remote é `${CDN_URL || 'https://cdn.example.com'}/mfeDashboard/remoteEntry.js` (`apps/shell/vite.config.ts:21–22`). O `apps/shell/Dockerfile:18–20` não define `CDN_URL`. O README publica em `s3://cdn/mfe-dashboard/` (`README.md:194–195`), caminho diferente de `/mfeDashboard/` e sem `assets/`. O compose de desenvolvimento roda o dashboard com `npm run dev` (`docker-compose.dev.yml:27`), contrariando `README.md:109–115`. A conexão demonstrada é a de desenvolvimento local; nos caminhos de produção/Docker o host não aponta para o remote servido. | ambígua |
| Tecnologia | `@originjs/vite-plugin-federation` `^1.3.6`, `vite` `^5.4.0`, `react`/`react-dom` `^18.3.0` declarados nas duas apps (`apps/shell/package.json:16–17`, `22`, `30`; `apps/mfe-dashboard/package.json:16–17`, `21`, `29`). Sem lockfile, as versões não estão resolvidas. | contexto |
| Documentação (inconsistências) | `README.md:205–214` cita `sonar-project.properties` em cada app e `npm run test:coverage`, mas nenhum desses arquivos existe no inventário e as apps frontend não definem `test:coverage` (`apps/shell/package.json:6–12`). Isso não afeta a composição. | contexto |
| Histórico | Ver “Autoria e histórico”: host, remote, pacotes e configuração de federação nascem juntos no commit-raiz. | contexto |

## Autoria e histórico

Clone não raso; 9 commits, nenhum merge, uma raiz `2a87116` (“Initial commit: MFE architecture with Vite + React + Module Federation”, 2026-01-30T09:48:55+01:00). Todos os commits têm autor e committer `fudoyoki <fudoyoki@fudoyokis-Mac-Pro.local>` e foram feitos em 2026-01-30, entre 09:48 e 16:21 (+01:00). `git log --no-renames --name-status` por pasta:
- `apps/shell`: arquivos adicionados em `2a87116`; Docker/nginx em `26c3601`; ajuste de workspace em `7e48df8`; `AuthProvider` movido em `d0748ce`.
- `apps/mfe-dashboard`: adicionado em `2a87116`; Docker/nginx em `26c3601`; workspace em `7e48df8`; limpeza de imports em `912587f`.
- `packages`: adicionado em `2a87116`; `./package.json` incluído em `exports` “for Vite Module Federation compatibility” em `1167458`.
- `apps/bff`: adicionado em `2a87116`, com ajustes em `3ced632` e `972a03e`.
- `README.md`: `2a87116`, `26c3601` e o SHA avaliado.

A estrutura completa aparece de uma vez no primeiro commit e depois recebe só correções curtas. Os metadados registram um único autor e não indicam a origem do código (escrita própria, gerada ou copiada). Não se encontrou referência a upstream ou template de terceiro. Refs: `main`, `origin/main` e `origin/HEAD` no SHA. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades frontend no repositório: `apps/shell` e `apps/mfe-dashboard`, cada uma com entrada própria (`apps/shell/index.html:11`; `apps/mfe-dashboard/index.html:11`). A configuração de composição referencia o dashboard (`apps/shell/vite.config.ts:30–31`). Chat, Tools e Admin estão comentados e não contam. |
| Q2 | Yes | Cada unidade tem entry point e build próprios (`apps/shell/package.json:8`; `apps/mfe-dashboard/package.json:8`; `apps/*/src/main.tsx`) e imagem/serviço próprios (`docker-compose.yml:5–27`). A busca de imports não encontrou import direto de código-fonte entre elas; compartilham só pacotes de workspace. |
| Q3 | Yes | O host monta o remote na rota `/dashboard/*` dentro do seu layout (`apps/shell/src/App.tsx:7`, `167–176`, `184–189`). |
| Q4 | Yes | Module Federation configurado nos dois lados, com nome, chave exposta e arquivo coerentes (`apps/shell/vite.config.ts:28–31`; `apps/mfe-dashboard/vite.config.ts:11–17`) e usado no código (`apps/shell/src/App.tsx:7`). A URL de desenvolvimento casa com a porta e o caminho do build servido em `preview` (`README.md:76–115`). |
| Q5 | Yes | Q1–Q4 são Yes: cadeia host → remote completa e conectável no fluxo documentado. A URL de produção com placeholder não desfaz essa conexão. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples … that actually compose frontend units”, com `repo_type: example`. É a mesma cadeia completa host/remote de 076/084/096/106/109.
- Diferentemente de 097/103/104, a configuração não é inconectável: nomes, chave exposta, `filename`, porta e caminho `assets/` fecham no fluxo de desenvolvimento documentado. Diferentemente de 089/100, a federação compõe uma unidade de UI montada em rota, não só compartilha código. Não há plataforma de terceiro (074/080/102).
- `repo_type: example`: o README se apresenta como exemplo (`README.md:1–3`); usuário e estatísticas são mock (`apps/shell/src/context/AuthContext.tsx:6–15`; `apps/mfe-dashboard/src/DashboardApp.tsx:5–10`); a URL de produção é placeholder.
- `frontend_units: 2` (shell e dashboard). `ui-kit` e `shared-types` são bibliotecas, o BFF é backend e os remotes comentados não contam. `unit_organization: monorepo`. `build_tools: [vite]` vem dos `vite.config.ts` explícitos; Turborepo e tsup orquestram ou empacotam bibliotecas e não são o bundler das unidades.

## Notas para análise

- **RQ2:** Module Federation via `@originjs/vite-plugin-federation`, com remote consumido por `React.lazy` e props tipadas por um pacote compartilhado (`MfeProps`). O README documenta a exigência de `build` + `preview` do remote nesse plugin (`README.md:109–115`).
- **RQ3:** os pacotes internos são dependências de workspace e também `shared` singleton na federação (`apps/shell/vite.config.ts:52–58`). O Tailwind das duas apps lê o código-fonte do `ui-kit` (`apps/*/tailwind.config.js:6`). Essa é uma relação de build com a biblioteca, não entre as unidades.
- **RQ1 (sinais enganosos):** a configuração de produção (`CDN_URL` com placeholder), o compose de desenvolvimento com `vite dev` no remote e a menção a SonarQube não condizem com os artefatos. Quem analisar só o Docker veria um host sem remote alcançável.
- **Protocolo (busca):** o hit da consulta no plural “micro frontends” não tem grafia plural correspondente na descrição nem no README; depende do processamento textual da busca do GitHub.
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, duas unidades e `example`; sem decisão aberta. Correção adotada: a leitura do nginx acima (verificada, as regex são avaliadas em ordem). Limites registrados: a conexão local foi examinada estaticamente, sem execução; `singleton: true` em `shared` não é atestado sem plugin instalado; `docker-compose.dev.yml:27` executa o remote com `vite dev`, em desacordo com o fluxo de preview documentado; o README e o host divergem no caminho do CDN (`/mfe-dashboard/` contra `/mfeDashboard/remoteEntry.js`), sem cadeia de produção demonstrada. Precedentes finais: 007 (par host/remote completo basta sem produção funcional), 008 (cadeia concreta basta com remote faltante) e 012 (contraste: plano sem configuração e consumo); 076/084/096/106/109 estão em draft e 097, 103, 104, 089 e 100 em draft ou review, como comparação de contexto.
