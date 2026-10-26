---
schema: 1
id: 1149061587
full_name: Christian-Encalada/examen-microfrontend
url: https://github.com/Christian-Encalada/examen-microfrontend
commit: 9456a399b086d78c65d167e0d08db5d2b8d31bb8
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

# 228 — Christian-Encalada/examen-microfrontend

## Contexto

“Sistema de Alertas Académicas - Arquitectura Microfrontend” (`README.md:1–12`): três aplicações React 19 + Rspack com `@module-federation/enhanced`:
- o host `appclases`, na raiz (porta 3000);
- o remoto `AlertSender`, em `alert-sender/` (porta 3001), que dispara alertas;
- o remoto `AlertDashboard`, em `alert-dashboard/` (porta 3002), que as exibe.

Os dois remotos se comunicam por `CustomEvent('academic-alert')` (`README.md:81–87`). Há também tipos gerados pela federação em `@mf-types/`. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:229` registra rank 228, ID 1149061587, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:229` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:24367` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:24374` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos seis hits em cada rodada.

Busca de código, subconsulta `technology-module-federation-package-code#size:900..999`:

| Consulta (`q`) | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `package.json` | 2026-10-07T18:30:51.097Z / 2026-10-08T15:38:47.802Z |
| idem | `alert-sender/package.json` | 2026-10-07T18:32:56.357Z / 2026-10-08T15:38:59.330Z |
| idem | `alert-dashboard/package.json` | 2026-10-07T18:35:20.768Z / 2026-10-08T15:39:11.345Z |

Os três arquivos (922, 925 e 928 bytes) declaram `"@module-federation/enhanced": "^0.8.9"` na linha 27.

Busca de repositórios, subconsulta `…#created:2026-02`, `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:47:03.321Z / 2026-10-08T15:40:58.025Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:10:42.583Z / 2026-10-08T15:48:59.289Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:22:54.184Z / 2026-10-08T16:16:59.525Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-02-01..2026-02-28`.

Metadados do hit de repositório:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 70;
- criação em 2026-02-03T17:18:22Z, push em 2026-02-03T17:18:25Z.

Grafias no README:
- “Microfrontend”: `README.md:1` (“Arquitectura Microfrontend”);
- “microfrontends”: `README.md:3` (“una arquitectura de microfrontends con Module Federation”);
- “Module Federation”: `README.md:3`, `16`.

O README vem do único commit, o SHA (2026-02-03), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 42 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há três projetos: o host na raiz (`package.json`, `rspack.config.ts`, `module-federation.config.ts`, `src/`) e os remotos `alert-sender/` e `alert-dashboard/`, cada um com `package.json`, lockfile, `rspack.config.ts`, `module-federation.config.ts` e `src/`. Há também tipos gerados em `@mf-types/` e um `.babelrc` por projeto. | contexto |
| Configuração (host) | `module-federation.config.ts:1–9`: `name: "appclases"`, `remotes: { AlertSender: "AlertSender@http://localhost:3001/remoteEntry.js", AlertDashboard: "AlertDashboard@http://localhost:3002/remoteEntry.js" }`, `shared: ["react", "react-dom"]`. `rspack.config.ts:5`, `8`, `81`: `ModuleFederationPlugin` de `@module-federation/enhanced/rspack`. | forte |
| Configuração (remotos) | `alert-sender/module-federation.config.ts:1–8`: `name: "AlertSender"`, `exposes: { "./AlertSender": "./src/components/AlertSender.tsx" }`. `alert-dashboard/module-federation.config.ts:1–8`: `name: "AlertDashboard"`, `exposes: { "./AlertDashboard": … }`. Portas e `publicPath` 3001/3002 (`alert-sender/rspack.config.ts:25`, `33`; `alert-dashboard/rspack.config.ts:25`, `33`) coincidem com o host. | forte |
| Código-fonte (composição) | `src/index.ts:1`: `import("./App")` (bootstrap assíncrono). `src/App.tsx:3–4`: `import AlertSender from "AlertSender/AlertSender"` e `import AlertDashboard from "AlertDashboard/AlertDashboard"`; `:61–68`: ambos montados lado a lado. | forte |
| Código-fonte (integração) | `alert-sender/src/components/AlertSender.tsx:71–81`: `window.dispatchEvent(new CustomEvent('academic-alert', …))`. `alert-dashboard/src/components/AlertDashboard.tsx:97–108`: escuta o mesmo evento. Cada remoto também roda isolado (`alert-sender/src/App.tsx:1–10`). | moderada |
| Código-fonte (fronteiras) | Busca por `../..` e por `../alert-*` ou `../src`: nenhuma ocorrência. Os projetos só se ligam pelos módulos federados. `src/types/federation.d.ts:1–5` declara um módulo `Footer/Footer` não usado, resíduo de template. | contexto |

## Autoria e histórico

Clone não raso; 1 commit, o SHA `9456a39` (2026-02-03), de Christian_Encalada `<cris_7715@hotmail.com>`, com mensagem longa que descreve a inicialização da arquitetura (“Initialize microfrontend architecture for academic alert system with Module Federation…”). Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades no repositório, duas referenciadas pela configuração de composição do host (`module-federation.config.ts:5–8`). |
| Q2 | Yes | Cada unidade tem `package.json`, lockfile, `rspack.config.ts`, entrada e porta próprios, sem imports de código-fonte entre elas. |
| Q3 | Yes | O host monta os dois remotos na página (`src/App.tsx:61–68`). |
| Q4 | Yes | Module Federation (enhanced/Rspack) com `remotes` no host e `exposes` nos remotos, consumido por imports federados. |
| Q5 | Yes | Q1–Q4 são Yes: host e dois remotos compostos em runtime, com comunicação por eventos. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- Os remotos expõem fatias funcionais com estado e interação próprios, integradas por `CustomEvent`, como no rascunho 209; não é compartilhamento de componentes (089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [rspack]` (como 164/181), `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example` (demonstração com mensagens fixas, `alert-sender/src/components/AlertSender.tsx:64–68`, e URLs em `localhost`).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** `@module-federation/enhanced` 0.8 em Rspack 1.2, com tipos de remotos gerados em `@mf-types/` e comunicação entre remotos por `CustomEvent` em `window`.
- **Protocolo (busca):** o repositório entra por código (três `package.json`) e por três consultas textuais. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, React/Rspack, três unidades e `monorepo`; sem decisão aberta (`draft`). A cadeia host → configuração dos remotos → exports → renderização está completa, e a comunicação entre os dois remotos usa evento e payload correspondentes. A verificação foi estática, sem execução nem comprovação de deploy. O histórico tem um único commit, sem versões anteriores a comparar, e `rev-list --objects --missing=print` não encontra objeto ausente no conjunto alcançável. Q2 deve citar os scripts dos três manifests (`:4–8`), as entradas e HTML e a busca de fronteiras; Q4, os configs, exports, imports e renderizações; Q5, a síntese das evidências.
