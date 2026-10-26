---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
url: https://github.com/enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: template
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 208 — enzox0/module-federation-project-template

## Contexto

“Module Federation App Template” (`README.md:1–5`): template de monorepo pnpm/Turbo (`pnpm-workspace.yaml:1–3`; `turbo.json:1–20`) com cinco aplicações React/Vite em `apps/`, todas com `@originjs/vite-plugin-federation`:
- `shell` (host, porta 3000);
- quatro remotos, `auth-mf` (3001), `dashboard-mf` (3002), `admin-mf` (3003) e `messaging-mf` (3004).

Há também pacotes de workspace (`packages/ui`, `shared`, `sdk`, `types`, `config`) e infraestrutura em grande parte placeholder (Kubernetes, Terraform, CD que só imprime “Deploying...”). Os remotos são stubs: `admin-mf`, `dashboard-mf` e `messaging-mf` renderizam só um título, e `auth-mf` um formulário de login com `alert`. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:209` registra rank 208, ID 1253360837, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:209` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:30903` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:30911` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos seis hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-topic-microfrontends`: `topic:microfrontends` | `terminology-topic-microfrontends` | 2026-10-07T18:18:39.946Z / 2026-10-08T15:34:24.726Z |
| `terminology-topic-micro-frontends`: `topic:micro-frontends` | `terminology-topic-micro-frontends` | 2026-10-07T18:18:55.202Z / 2026-10-08T15:34:40.023Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-05` | 2026-10-07T21:13:18.648Z / 2026-10-08T15:42:32.629Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-05` | 2026-10-07T22:12:42.392Z / 2026-10-08T15:49:48.534Z |
| `technology-topic-module-federation`: `topic:module-federation` | `technology-topic-module-federation` | 2026-10-07T23:13:33.138Z / 2026-10-08T16:11:08.769Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T23:25:52.495Z / 2026-10-08T16:18:01.374Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01` e, nas buscas textuais, `created:2026-05-01..2026-05-31`.

Metadados do hit:
- descrição “Production-ready Module Federation monorepo with React, Vite, TypeScript & Turbo. Build scalable microfrontend architectures with independent deployment, shared packages, and real-time health monitoring.”;
- tópicos `micro-frontends`, `microfrontends` e `module-federation`, entre outros; linguagem TypeScript, `fork: false`, tamanho 104;
- criação em 2026-05-29T11:37:16Z, push em 2026-05-29T14:05:57Z.

Grafias no README:
- “microfrontend”: `README.md:3` (“a complete microfrontend architecture”);
- “Microfrontends”/“microfrontends”: `README.md:13`, `27`, `100`;
- “Module Federation”: `README.md:1`, `3`, `98`.

O README vem de `76d4857` (2026-05-29) e não foi alterado depois. É anterior às coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 174 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Cada app tem `package.json`, `index.html`, `vite.config.ts`, `module-federation.config.ts`, `src/` e `Dockerfile` próprios. Também estão versionados os `.js` e `.d.ts` compilados de `vite.config` e `module-federation.config` em cada app. | contexto |
| Configuração (host) | `apps/shell/module-federation.config.ts:1–11`: `name: 'shell'`, `remotes` `authMf`, `dashboardMf`, `adminMf` e `messagingMf` em `http://localhost:3001…3004/dist/assets/remoteEntry.js`, com `shared` de `react`, `react-dom` e `react-router-dom`. `apps/shell/vite.config.ts:1–7`: `federation(mfConfig)`. | forte |
| Configuração (remotos) | `apps/auth-mf/module-federation.config.ts:1–8`: `name: 'authMf'`, `exposes: { './App': './src/exposes.tsx' }`. `admin-mf`, `dashboard-mf` e `messaging-mf` seguem o mesmo padrão (`adminMf`, `dashboardMf`, `messagingMf`). As portas dos `vite.config.ts` (3001–3004) e dos scripts `dev` coincidem com as do host. | forte |
| Código-fonte (composição) | `apps/shell/src/App.tsx:7–10`: `lazy(() => import('authMf/App'))` e os outros três. `:36–75`: rotas `/auth`, `/admin`, `/dashboard` e `/messaging` com `ErrorBoundary` e `Suspense`. `apps/shell/src/vite-env.d.ts:3–21` declara os módulos. `apps/shell/src/components/RemoteHealthCheck.tsx:11–16` verifica os quatro `remoteEntry.js`. | forte |
| Código-fonte (fronteiras) | Busca por `../..`, `import('../..` e `apps/` em `apps` e `packages`: só os `COPY` dos Dockerfiles. Os apps não importam código uns dos outros. Os pacotes `@mf/*` são declarados no shell (`apps/shell/package.json:18–21`), mas nenhum `src/` de app os importa. | contexto |
| Configuração (inconsistência) | `apps/shell/module-federation.config.js:1–11`, versionado junto do `.ts`, aponta os remotos para `localhost:3004…3007/assets/remoteEntry.js`, portas que não coincidem com as dos remotos. `vite.config.ts` e `vite.config.js` importam `./module-federation.config` sem extensão. Qual dos dois arquivos é resolvido: a revisão independente verificou, para o fluxo padrão dos scripts versionados (Vite 5.4.21 do lockfile, que tem `vite.config.js` antes de `vite.config.ts` em `DEFAULT_CONFIG_FILES`, de modo que os scripts sem `--config` escolhem `apps/shell/vite.config.js`), que o empacotamento em memória desse arquivo com esbuild 0.21.5 inclui `apps/shell/module-federation.config.ts` e os endpoints 3001 a 3004 com `/dist/assets/remoteEntry.js`; o `.js` obsoleto (3004 a 3007) não governa o import do shell nesse fluxo. Os nomes de remoto e de módulo são os mesmos nos dois. | ambígua |
| Build/deploy | Builds por app (`apps/*/package.json:6–11`, `tsc && vite build`), orquestrados por `turbo run build` (`package.json:11–12`). `apps/shell/Dockerfile:1–12` (e análogos) gera uma imagem nginx por app. Kubernetes e Terraform são placeholders (`infrastructure/kubernetes/shell/index.yaml:1`), e o CD só imprime “Deploying...” (`.github/workflows/cd.yml:14–15`). | moderada |

## Autoria e histórico

Clone não raso; 60 commits lineares, nenhum merge, todos de renzsiguenza `<renzsiguenza0000@gmail.com>`. Todos são de 2026-05-29, entre 21:46 (`d503356`, “chore: initialize project with root package configuration”) e 22:05 (SHA `b3c96cb`, “docs: add Quick Start and Running guides…”). Cada commit adiciona uma parte do template com mensagem convencional, padrão de publicação de um projeto já pronto em passos. A descrição do README credita “enzox0” (`README.md:5`), a conta dona do repositório. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects --all --missing=print` identifica um objeto ausente (`47ef22b…`, uma versão histórica de `.gitignore`); nenhuma evidência arquitetural atual depende dele.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Cinco unidades no repositório, quatro delas referenciadas pela configuração de composição do shell (`apps/shell/module-federation.config.ts:4–9`). |
| Q2 | Yes | Cada app tem entrada, `vite.config` e build próprios, além de Dockerfile próprio, sem imports de código-fonte entre apps. |
| Q3 | Yes | O shell monta os quatro remotos por rota (`apps/shell/src/App.tsx:36–75`). |
| Q4 | Yes | Module Federation configurado no host (`remotes`) e nos remotos (`exposes`), consumido por `import('authMf/App')` e equivalentes. |
| Q5 | Yes | Q1–Q4 são Yes: template com shell e quatro remotos compostos em runtime. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “templates… that actually compose frontend units”. A cadeia está completa no snapshot, como em 076/084/096/106/109 e no rascunho 202, que usa o mesmo plugin e o mesmo padrão `…/dist/assets/remoteEntry.js`.
- Os remotos expõem aplicações montadas por rota, ainda que sejam stubs; não é compartilhamento de componentes (089/100). O conteúdo mínimo dos remotos é coerente com `repo_type: template` e não reduz o caso a conteúdo didático (023/094), pois a composição está configurada e consumida.
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 5` (shell e quatro remotos; os pacotes `@mf/*` não são unidades frontend), `unit_organization: monorepo`.
- A divergência de portas em `module-federation.config.js` fica registrada como nota e não muda as respostas: os nomes de remoto e de módulo e o consumo no código são os mesmos nos dois arquivos.

## Notas para análise

- **RQ2:** `@originjs/vite-plugin-federation` com host e quatro remotos, `ErrorBoundary`/`Suspense` por rota e um verificador de disponibilidade dos `remoteEntry.js`.
- **RQ1 (sinais enganosos):** a descrição “Production-ready” contrasta com remotos stub e infraestrutura placeholder.
- **Protocolo (busca):** o repositório entra por seis consultas (três tópicos e três textuais). A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Protocolo (snapshot):** os `.js`/`.d.ts` compilados versionados ao lado dos `.ts` divergem nas portas dos remotos do shell. É um caso a observar na mineração de artefatos de configuração.
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `template`, `module-federation`, React/Vite, cinco unidades e `monorepo`; sem decisão aberta (`draft`). A ambiguidade de qual `module-federation.config` o shell usa foi resolvida offline: com o Vite 5.4.21 do lockfile, `vite.config.js` precede `vite.config.ts` na ordem padrão, e o empacotamento em memória (esbuild 0.21.5 do cache local, sem gerar arquivos no clone) mostra o `module-federation.config.ts` com as portas 3001 a 3004; o `.js` obsoleto (3004 a 3007) é artefato compilado divergente que não governa o fluxo padrão. Correções adotadas: o relato das buscas negativas e da completude histórica (um objeto ausente, verificado). As linhas Q2, Q4 e Q5 devem citar manifests, entries, imports e configs.
