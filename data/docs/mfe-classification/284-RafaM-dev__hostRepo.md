---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
url: https://github.com/RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 284 — RafaM-dev/hostRepo

## Contexto

Host React + Vite de um explorador de personagens de Rick and Morty, feito como prova técnica: “En esta prueba, evaluaremos su capacidad para construir la aplicación…” (`src/features/home/Home.tsx:26–29`). O host usa `@originjs/vite-plugin-federation` para consumir o remoto `mf-remoteDetails` (`http://localhost:5001/assets/remoteEntry.js`). Do remoto, importa o componente `DetailEpisode` e o renderiza na lista de episódios. O remoto não está neste repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:285` registra rank 284, ID 1099550821, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:285` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:21239` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:21245` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada:

| Consulta (`q`) | Endpoint / subconsulta / `path` | Coleta 001 / 002 (UTC) |
|---|---|---|
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | `code` / `…#size:1000..1149` / `package.json` | 2026-10-07T22:05:55.727Z / 2026-10-08T15:48:59.698Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `repositories` / `…#created:2025-11` / vazio | 2026-10-07T22:27:42.863Z / 2026-10-08T15:56:36.768Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `repositories` / `…#created:2025-11` / vazio | 2026-10-07T22:58:04.349Z / 2026-10-08T16:07:10.669Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `repositories` / `…#created:2025-11` / vazio | 2026-10-07T23:21:09.536Z / 2026-10-08T16:16:19.379Z |

As consultas efetivas de repositório acrescentam `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Metadados do hit de repositório:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 3.277;
- criação em 2025-11-19T06:16:10Z, push em 2025-11-19T07:00:05Z.

O `package.json` (1.034 bytes) declara `@originjs/vite-plugin-federation` em `package.json:26`.

Grafias no README:
- “micro frontends”: “micro-frontends” em `README.md:3` (“…que implementa arquitectura de micro-frontends mediante Module Federation”), `73` e `300`;
- “micro frontend”: “micro-frontend” em `README.md:40`, “Micro-frontend” em `103` e “Micro-frontend” em `347`;
- “Module Federation”: `README.md:3`, `75`, `298` e `328`, entre outras linhas.

A última alteração do README é o próprio SHA (2025-11-19), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 41 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Uma única aplicação Vite na raiz (`index.html`, `src/`, `public/`, `vite.config.ts`, configs de TS, ESLint, Tailwind e PostCSS) e um arquivo vazio `remote-root@0.0.0` (0 bytes) na raiz. | contexto |
| Configuração (host) | `vite.config.ts:3`, `8–15`: `federation({ name: "host", filename: "remoteEntry.js", remotes: { "mf-remoteDetails": "http://localhost:5001/assets/remoteEntry.js" }, shared: ["react", "react-dom"] })`. | forte |
| Consumo do remoto | `src/features/episodes_list/ListEpisodes.tsx:15`: `import DetailEpisode from "mf-remoteDetails/DetailEpisode"`. `:96–100` (no arquivo): `<DetailEpisode character={selectedCharacter} open=… onClose=… />`. `src/declare.d.ts:1–4`: declaração de tipo do módulo remoto. `src/App.tsx:10–12`: `ListEpisodes` na rota `/episodes`. | forte |
| Remoto externo | O remoto `mf-remoteDetails` (porta 5001, módulo `./DetailEpisode`) não está no repositório. Nas rodadas há outros candidatos da mesma conta (`RafaM-dev/remoteRepo`, `remote-morty`, `host-remote-rick`), fora da amostra e não inspecionados. | contexto |
| Documentação | `README.md:3`, `40–52`, `73–103`: host que integra um remoto que deve ser iniciado antes. `README.md:332–347` mostra outra configuração, `remote_root` em `localhost:5174`, divergente do `vite.config.ts` do SHA. | fraca |
| Código-fonte (fronteiras) | Os imports com `../../` e `../../../` ficam dentro de `src/` (por exemplo, `ListEpisodes.tsx:3–4` → `src/store`). Nenhum import sai do repositório. | contexto |

## Autoria e histórico

Clone não raso; 7 commits lineares, nenhum merge, todos de `RafaDev-gft`, em 2025-11-19, de `8a62219` (“first commit”, que já inclui `vite.config.ts` e `src/declare.d.ts`) ao SHA `e68ba94` (atualização do README). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | O host e um remoto externo referenciado pela configuração de composição (`vite.config.ts:11–13`). |
| Q2 | Yes | O host tem entry e build próprios; o remoto é externo e servido separadamente (`localhost:5001`), o que conta como Yes pelo critério operacional. |
| Q3 | Yes | O host importa e renderiza o componente remoto em `ListEpisodes`, montado na rota `/episodes` (`ListEpisodes.tsx:15`; `App.tsx:11`). |
| Q4 | Yes | `@originjs/vite-plugin-federation` com `remotes` coerente com o import `mf-remoteDetails/DetailEpisode`, que é usado na página. |
| Q5 | Yes | Q1–Q4 são Yes: host Module Federation que consome um remoto externo. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso “repositories containing only the host, which references external remote units”. Mesmo enquadramento do final 008 e dos rascunhos 211 e 271 (host com remoto em `localhost`).
- Ser prova técnica não muda a classe, como no final 094, onde o exercício só determinou `repo_type`. Aqui ele leva a `repo_type: example`.
- **Campos:** `frontend_units: 2` (host e remoto referenciado), `unit_organization: multi-repo`, `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** host Vite com import estático de componente remoto (`DetailEpisode`) que recebe props do host (`character`, `open`, `onClose`); só `react` e `react-dom` compartilhados.
- **Protocolo (documentação):** o README descreve outro remoto e outra porta (`remote_root`, 5174) do que a configuração efetiva (`mf-remoteDetails`, 5001). A classificação segue a configuração.
- **Protocolo (amostra):** a mesma conta tem outros três candidatos com nomes de host e remoto; só este entrou na amostra.
- **Protocolo (busca):** entrada por código (`package.json`) e por três consultas de repositório, com grafias hifenizadas no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
