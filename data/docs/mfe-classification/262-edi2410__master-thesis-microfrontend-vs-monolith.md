---
schema: 1
id: 1223459154
full_name: edi2410/master-thesis-microfrontend-vs-monolith
url: https://github.com/edi2410/master-thesis-microfrontend-vs-monolith
commit: d2b979da2eacd9f7c365c3cb437de43b272b4d15
classification: Uncertain
checklist: { q1: yes, q2: undetermined, q3: undetermined, q4: undetermined, q5: undetermined }
repo_type: other
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 7
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 262 — edi2410/master-thesis-microfrontend-vs-monolith

## Contexto

Repositório-raiz de uma dissertação de mestrado sobre a migração da plataforma eSUSTAV de um monólito React/Vite para Webpack 5 Module Federation num monorepo Nx (`README.md:1–5`, `13`). O próprio README o descreve como “thesis root”, que referencia o monólito e o projeto MFE como submódulos (`README.md:73`, `87–88`).

No snapshot há só o texto da dissertação (PDF), o tema submetido, o README e artefatos de medição: logs de build e relatórios Lighthouse. O código das duas aplicações está apenas nos gitlinks, cujos commits não estão no clone; os submódulos não foram inicializados e seu código é declarado proprietário (`README.md:194`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:263` registra rank 262, ID 1223459154, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Os JSON do Lighthouse foram lidos em memória a partir dos blobs. Não houve instalação, build, execução, inicialização de submódulos ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:263` registra as estratégias `terminology;technology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:29186` e `data/discovery/mfe-round-002/candidates.csv:29192`, ambos com `unknown`. As regras registram `push_since_threshold` e `activity_incomplete`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos cinco hits em cada rodada, todos do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-topic-microfrontends`: `topic:microfrontends` | (sem partição) | 2026-10-07T18:18:43.496Z / 2026-10-08T15:34:28.993Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-04` | 2026-10-07T20:32:59.442Z / 2026-10-08T15:42:01.187Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-04` | 2026-10-07T22:12:18.488Z / 2026-10-08T15:49:34.133Z |
| `technology-topic-module-federation`: `topic:module-federation` | (sem partição) | 2026-10-07T23:13:42.957Z / 2026-10-08T16:11:12.560Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-04` | 2026-10-07T23:25:04.169Z / 2026-10-08T16:17:43.049Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01`; as particionadas também acrescentam `created:2026-04-01..2026-04-30`.

Metadados do hit:
- a descrição repete `README.md:5`;
- 14 tópicos, entre eles `microfrontends`, `module-federation`, `nx-monorepo`, `webpack-5` e `react`;
- linguagem nula, `fork: false`, tamanho 3.582;
- criação em 2026-04-28T10:47:03Z, push em 2026-04-29T13:50:50Z.

Grafias:
- **Tópicos:** `microfrontends` e `module-federation` estão nos tópicos.
- **`microfrontend`:** está em `README.md:5` (“…Webpack 5 Module Federation microfrontend architecture using an Nx monorepo”) e `README.md:13`, além da descrição.
- **`"module federation"`:** está em `README.md:5`, `13` e `115`, além da descrição.
- **`microfrontends`:** o plural não aparece literalmente no README nem na descrição. Esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O README entrou em `6f13ac2` (2026-04-28) e não mudou no SHA, que só altera o PDF. O README é anterior às coletas de outubro de 2026, portanto o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 19 entradas, 17 arquivos regulares `100644`, zero symlinks e dois gitlinks `160000`: `dev-esustav-mfe` (`0dc0f71`) e `dev-esustav-public` (`5b8edcc`), declarados em `.gitmodules:1–6` com URLs SSH de outros repositórios do autor. Os commits dos gitlinks não estão no clone (`git cat-file` falha) e os diretórios estão vazios. Não há `package.json`, configuração de build nem código-fonte no snapshot. Os dois `blog_post_*.md` listados em `README.md:84–85` não existem no tree. | contexto |
| Documentação (arquitetura) | `README.md:42–52`: shell em 3000 e seis remotos (portas 3001–3006), cada um expondo `./App` via Module Federation. `README.md:128–131`: decisões sobre `BrowserRouter` só no shell e `@esustav/shared`, `react`, `react-dom` e `react-router-dom` compartilhados como singletons. É descrição, não configuração. | fraca |
| Artefato de build | `measurements/build_mfe_cold_1.log:2`, `286`: `nx` executa `build` em 8 projetos (shared, shell e seis remotos). Cada remoto emite `remoteEntry.js` (`:30`, `109`, `149`, `185`, `224`, `259`), com `webpack 5.105.4` (`:53`). | moderada |
| Artefato de runtime | `measurements/lighthouse_mfe_run{1,2,3}.json` (leitura do audit `network-requests`): página `http://localhost:5173/` (2026-03-28) que requisita `remoteEntry.js` em `localhost:3001` a `3006`, além de chunks de `3006`. `lighthouse_monolith_run1.json` (`localhost:4173`) não tem `remoteEntry`. | moderada |
| Procedimento | `measurements/measurement_guide.md:546–560`: sobe shell (5173) e remotos (3001–3006). `:690–709`: implantação independente via `docker-compose` reconstruindo só o container `esustav_einfo`. `measurements/baseline_results.md:67–78`, `98–102`: tamanho de `remoteEntry.js` por remoto e H4 “PASS”. São relatos do autor sobre código ausente do snapshot. | fraca |

## Autoria e histórico

Clone não raso; 3 commits lineares, nenhum merge, todos de Edi Graovac:
- `e463915` (2026-04-28, “first commit”): `.gitmodules`, gitlinks, `measurements/` e `topic_description.md`;
- `6f13ac2` (“readme”): README e PDF;
- o SHA `d2b979d` (2026-04-29, “readme”): altera só o PDF.

Só existe o branch `main`. Nenhum objeto dos submódulos está disponível. Nada foi buscado; nenhum blob histórico foi lido além do tree do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | O repositório referencia, por gitlink, o projeto MFE (`.gitmodules:4–6`). Os artefatos registram 7 aplicações (shell e seis remotos) e uma biblioteca compartilhada (`build_mfe_cold_1.log:2`). |
| Q2 | Undetermined | Builds separados por projeto (`nx run <app>:build`) e containers próprios são relatados, mas o código e a configuração das unidades não estão no snapshot para verificar separação ou imports entre unidades. |
| Q3 | Undetermined | O registro Lighthouse mostra uma página que busca os `remoteEntry.js` dos seis remotos, mas o código do host não está no snapshot. |
| Q4 | Undetermined | Module Federation aparece em logs de build e de rede, não em configuração observável. Pelo critério, “a declared dependency alone is No” e “a configuration whose actual use is unclear is Undetermined”; aqui não há configuração no snapshot, só artefatos. |
| Q5 | Undetermined | Nenhuma resposta No; Q2–Q4 dependem de código em submódulos indisponíveis. |

## Motivo

- `Uncertain` pela regra “No question is No, but at least one is Undetermined”, com `status: review`.
- **Comparação:** como em 223 (gitlinks sem objetos no clone) e 103 (configuração não resolvível no snapshot), a implementação está fora do que pode ser lido. Diferentemente dos perfis 011/064/068/073/077/101/111 e do conteúdo 023/075/081/094/105, porém, há artefatos de build e de runtime produzidos por uma composição Module Federation. Não chega a ser cadeia completa como em 076/084/096/106/109, porque nada da configuração está no snapshot.
- **Campos:** derivados dos artefatos e da descrição. `approaches: [module-federation]`, `ui_technologies: [react]` (`README.md:62`), `build_tools: [webpack]` (`build_mfe_cold_1.log:26`, `53`), `frontend_units: 7` (shell e seis remotos; a biblioteca `shared` não é contada), `unit_organization: monorepo` (Nx dentro do submódulo MFE, `README.md:61`), `repo_type: other` (repositório-raiz de dissertação com dados de medição).

## Notas para análise

- **RQ2:** migração documentada de monólito Vite para Module Federation com Nx, shell com roteamento único e pacote compartilhado singleton (`README.md:128–131`), com medições de build, Lighthouse e memória (`baseline_results.md:106–117`).
- **Protocolo (snapshot):** a implementação está em submódulos privados ou proprietários e não pode ser lida no snapshot. Só há evidência indireta, por artefatos de medição.
- **Protocolo (busca):** o hit plural não tem grafia literal. Elegibilidade `unknown` nas duas rodadas (`activity_incomplete`).

## Decisão registrada

Mantido como `Uncertain`. Os logs de build e os registros de rede indicam uma composição de Module Federation, mas o código e a configuração dos submódulos não estão disponíveis no snapshot. A evidência indireta não permite confirmar os critérios de independência, composição e uso efetivo da configuração.
