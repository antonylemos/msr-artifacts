---
schema: 1
id: 1101963462
full_name: MFE-Orchestrator-Sandbox/devfestalps-design-system
url: https://github.com/MFE-Orchestrator-Sandbox/devfestalps-design-system
commit: fec8551c39a17b7a53ca6bfc9613b79e64f9bf53
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 149 — MFE-Orchestrator-Sandbox/devfestalps-design-system

## Contexto

Remoto Vite + React gerado do template “template-vite-remote”, cuja descrição é “Template for MFE orchestator Vite remote microfrontend” (`README.md:1–2`). Ele expõe por Module Federation um único componente, `./Button` (`vite.config.js:9–16`). O workflow publica o `dist` na plataforma externa “MFE Orchestrator”, com o slug `devfestalps-design-system` (`.github/workflows/build-and-deploy.yml:63–70`). O host que consumiria o remoto não está no repositório. O nome do repositório e o do dono não são usados como evidência.

`data/samples/mfe-sample-001/clones.csv:150` registra rank 149, ID 1101963462, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:150` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:21371` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:21377` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-11` | 2026-10-07T19:17:25.775Z / 2026-10-08T15:40:03.503Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2025-11` | 2026-10-07T22:09:51.233Z / 2026-10-08T15:48:26.230Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem CSS, `fork: false`, tamanho 78;
- criação em 2025-11-22T15:10:11Z e push em 2026-02-16T22:17:36Z, este dos branches do Dependabot.

Sem descrição, o acerto vem do README, cuja única grafia é “microfrontend”, no singular, em `README.md:2`. A forma plural “microfrontends” não aparece no README nem na descrição. Esse hit depende do processamento textual da busca do GitHub, que não está registrado, como em 143.

O README vem da raiz `c4148d8` (2025-11-22) e não foi alterado depois. É anterior às coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 17 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Vite na raiz (`package.json`, `vite.config.js`, `index.html`, `src/`, `public/`, `pnpm-lock.yaml`) e workflows em `.github/`. Não há host nem segunda aplicação. | contexto |
| Configuração (federação) | `vite.config.js:9–16`: `federation({ name: "remote_app", filename: "remoteEntry.js", exposes: { './Button': './src/components/Button' }, shared: ['react','react-dom'] })`. Não há `remotes`. `vite.config.js:18–23`: `modulePreload: false`, `target: 'esnext'` e `cssCodeSplit: false`, ajustes usuais de remoto com esse plugin. | moderada |
| Código-fonte (módulo exposto) | `src/components/Button.jsx:6–20`: componente `Button` com estado local de contador e rótulo “DevFest Alps II {state}”, exportado nomeado e como default. `src/main.jsx:6–10` e `src/App.jsx:5`, `22`: app standalone de demonstração que renderiza o próprio `Button`. | moderada |
| Código-fonte (fronteiras) | Os imports de `src` são todos internos (`./App`, `./components/Button`, `./Button.css`, `./assets/react.svg`). A busca por `../`, `remotes`, `registerApplication`, `customElements` e `iframe` em `src`, `vite.config.js` e `index.html` não retorna nada. | contexto |
| Build/deploy | `package.json:6–9`: `vite`/`vite build`. `.github/workflows/build-and-deploy.yml:3–13`: o workflow dispara em tags ou manualmente. `.github/workflows/build-and-deploy.yml:60–70`: roda `pnpm build` e chama `mfe-orchestrator-hub/github-action@0.0.29` com `microfrontend-slug: devfestalps-design-system`, `domain: https://console.mfe-orchestrator.dev` e `file-path: './dist'`. Há a tag `1.3.0` no SHA. Os caches citam `host/node_modules` e `remote/node_modules` (`:48–51`), diretórios inexistentes no repositório, herdados do template. | moderada |
| Tecnologia | `package.json:10–20`: `react`/`react-dom` ^19.2.0, `@originjs/vite-plugin-federation` ^1.4.1, `@vitejs/plugin-react` e `vite` ^7.1.12. `pnpm-lock.yaml:291`, `548` e `578` resolvem `@originjs/vite-plugin-federation` 1.4.1, `react` 19.2.0 e `vite` 7.1.12. | contexto |

## Autoria e histórico

Clone não raso; 7 commits em todos os refs, nenhum merge.
- **Raiz:** `c4148d8` (2025-11-22T15:10:13Z, “Initial commit”) de `MFE Orchestrator Bot <bot@mfe-orchestrator.dev>` adiciona os 17 arquivos. `LICENSE:3` traz “Copyright (c) 2025 MFE Orchestrator Hub”.
- **Autor humano:** Lorenzo De Francesco `<lorenzo.defrancesco@step4business.com>` faz `bbddfc5` (“first commit”) e o SHA `fec8551` (“DEV FEST ALPS 2”). Os dois só alteram `src/components/Button.jsx` (`git log --no-renames --name-status`).
- **Dependabot:** `49d14d8` está no histórico de `main`. Os bumps posteriores (`270b9c1`, `8fc3dd7`, `9f3b90e`) ficam em branches `origin/dependabot/*` e não foram considerados.

Configuração, workflow e app vêm todos do commit gerado pelo bot; a contribuição autoral se limita ao conteúdo do botão. O diff histórico de `Button.jsx` não foi lido: o blob `9f6ea764…` falta no clone parcial e não foi buscado. O clone ficou inalterado.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade. A configuração de composição só tem `exposes` (`vite.config.js:12–14`) e não referencia unidades externas. |
| Q2 | Yes (para a unidade) | Entrada e build próprios que geram `remoteEntry.js` (`vite.config.js:11`; `package.json:8`), publicados separadamente (`.github/workflows/build-and-deploy.yml:63–70`). |
| Q3 | Undetermined | O host não está no repositório. A plataforma de destino só aparece como alvo de publicação no workflow. |
| Q4 | Undetermined | O lado remoto está configurado; o consumidor não é observável. |
| Q5 | No | A evidência mostra uma unidade preparada para composição, não uma instância de MFE no repositório. |

## Motivo

- Proposta `MFE-unit` com `status: review`. Q1 é No, mas a exceção do checklist se aplica literalmente: “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”.
- O padrão é o mesmo dos finais 050 (Vite + `@originjs/vite-plugin-federation`, um `exposes`, `shared` React e sem `remotes`) e 001. Repete-se o mesmo vetor de checklist.
- A revisão é necessária pelo que é exposto. Em 001/050 os módulos expostos eram widgets ou telas de aplicação (`ChartWidget`, `TaskDashboard`). Aqui é um único `Button` genérico, e o checklist exclui “Module Federation used only for code sharing, not for composing frontend units”, como discutido em 089/100.
- Há ainda uma plataforma de terceiros como destino (MFE Orchestrator), em linha com a questão de 102/074/080, e um repositório gerado por template de plataforma, em linha com os casos de gerador e template 075/081/094/105.
- `repo_type: template`: o repositório é instância de um template de plataforma (`README.md:1–2`; commit-raiz do bot), com conteúdo de demonstração de evento (“DevFest Alps II”). `example` também seria defensável. `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react]`, `build_tools: [vite]`, `approaches: [module-federation]`.

## Notas para análise

- **RQ2:** remoto Module Federation para Vite publicado em um orquestrador de MFEs hospedado (SaaS) por GitHub Action, com versão vinda da tag Git. O host e o registro ficam na plataforma, fora do repositório.
- **RQ1 (sinais enganosos):** o caráter de “design system” só aparece no nome; o snapshot expõe um botão de demonstração. O nome não foi usado como evidência.
- **Protocolo (busca):** o hit plural `microfrontends` não tem grafia correspondente no README nem na descrição. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Protocolo (amostra):** o dono parece hospedar vários repositórios gerados pelo mesmo template de sandbox. Nenhum outro foi consultado.

## Ponto para revisão conjunta

Decidir se um remoto cujo único módulo exposto é um componente genérico (`./Button`), publicado em plataforma de orquestração de terceiros e gerado por template dessa plataforma, conta como “frontend unit explicitly prepared to be composed”.

- **Aceitar:** a configuração é idêntica à de 050, e o checklist não fixa tamanho mínimo do módulo exposto. Fica `MFE-unit`.
- **Não aceitar:** expor um componente de UI isolado configura “Module Federation used only for code sharing”, como na dúvida de 089/100. A classe passa a `Non-MFE`, com `approaches: []`.

Não se propõe regra nova. Até a decisão, preservar `MFE-unit`/`review`.
- **Contribuição da revisão independente (Lupa):** concordância com MFE-unit e `review`, com ressalva interpretativa real: a distinção entre unidade remota e compartilhamento de componente quando o único export é um botão genérico (`./Button`). Os finais comparáveis mais próximos são 001 (export `ChartWidget`) e 050 (`TaskDashboard`), ambos com uma unidade remota, `exposes`, sem host no repositório e checklist No/Yes/Undetermined/Undetermined/No, finalizados como MFE-unit; aqui a fronteira funcional do export parece mais próxima de code sharing, o que justifica não aplicar o precedente automaticamente. 089 e 100 (`Uncertain`/`review`) servem de comparadores da mesma questão, sem resolvê-la. Q3 e Q4 Undetermined são inevitáveis com o host e o consumidor fora do snapshot. `repo_type: template` é defensável pela origem automatizada e pelo README, e `example` também caberia ao app de demonstração configurado para deploy; escolha secundária, sem efeito na classe.
