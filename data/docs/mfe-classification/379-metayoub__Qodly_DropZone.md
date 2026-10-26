---
schema: 1
id: 864279586
full_name: metayoub/Qodly_DropZone
url: https://github.com/metayoub/Qodly_DropZone
commit: fef8994e8aad0a3e96f7eccd678856f0ad046037
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: library
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

# 379 — metayoub/Qodly_DropZone

## Contexto

Componente personalizado (“DropZone”, upload de arquivos) para o Qodly Studio, uma plataforma low-code de terceiros (`README.md:1–12`). O projeto segue o modelo da plataforma: `package.json` com `app_id` e autor “Qodly Team” (`package.json:2–11`) e build pela CLI `qodly build` (`:14`). Em produção, o `vite.config.ts` publica `./components` como remoto Module Federation (`@module-federation/vite`, `filename: 'components.js'`), que o Qodly Studio carrega. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:380` registra rank 379, ID 864279586, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:380` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:10114` e `data/discovery/mfe-round-002/candidates.csv:10120`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um único hit em cada rodada. Ele vem do endpoint `code`, consulta `technology-module-federation-package-code` (`"@module-federation" filename:package.json`), subconsulta `…#size:1600..1799`, `path` `package.json`. As coletas são 2026-10-07T19:26:03.130Z (001) e 2026-10-08T15:42:01.160Z (002).

O arquivo tem 1.717 bytes no SHA e declara `"@module-federation/vite": "^1.9.4"` (`package.json:31`). Os metadados do hit de código não trazem descrição, tópicos nem datas. A entrada é só por código; o README não menciona micro-frontends nem Module Federation.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 34 entradas, 33 arquivos regulares `100644` e 1 executável `100755` (`public/monaco_theme.json`); zero symlinks e zero gitlinks. Um projeto Vite com o componente `src/components/DropZone/` (`build`, `config`, `render`, `settings`) e o ambiente de desenvolvimento do editor Qodly. | contexto |
| Remoto MF | `vite.config.ts:11–13`, `40–76`: `federation({ name: app_id, filename: 'components.js', exposes: { './components': './src/components/index.tsx' }, library: { type: 'var' }, shared: { react, react-dom, react/jsx-runtime, @ws-ui/* } })`, só no build de produção. `src/components/index.tsx`: exporta `{ DropZone }`. | forte |
| Plataforma | `package.json:2–11`, `14–15`: `app_id`, autor “Qodly Team”, `qodly build`/`qodly new component`. Dependências `@ws-ui/*` do editor Qodly (`:20–23`, `47–51`). O host que carrega `components.js` é o Qodly Studio, fora do repositório. | contexto |
| Família | Nas rodadas há 16 candidatos `metayoub/*`, quase todos componentes Qodly (`qodly_chart`, `qodly_datagrid`, `qodly-calendar` etc.). Só este está na amostra; os demais não foram inspecionados. | contexto |

## Autoria e histórico

Clone não raso; 31 commits em todos os refs, 2 merges, de 2024-09-27 a 2026-05-19 (SHA `fef8994`, “support i18n”). Os autores são Ayoub METWALLI (26) e Tihouna Nasrallah (5, dois pela interface do GitHub). Os branches `dev` e `feat/compressPicture` não foram considerados. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade, preparada como remoto; o host (Qodly Studio) não está no repositório nem é referenciado. |
| Q2 | Yes | O componente tem build próprio e é publicado separadamente (`qodly build`; `vite.config.ts:40–76`). |
| Q3 | Undetermined | O host que carrega `components.js` não é observável. |
| Q4 | Undetermined | Há `exposes`, mas a composição pelo host não é observável. |
| Q5 | No | O MF é o mecanismo oficial de extensão de uma plataforma de terceiros (Qodly), não uma decomposição do autor, como nos finais 037 e 010. |

## Motivo

- `Non-MFE` pelo vetor do final 037 (q1 no, q2 yes, q3/q4 undetermined, q5 no), que trata como `Non-MFE` remotos que servem de extensão oficial de uma plataforma. O final 010, também do ecossistema Qodly, ficou `Non-MFE` porque os sinais de MF vinham de artefatos da plataforma.
- Pela letra do checklist seria `MFE-unit` (remoto com `exposes`), mas o override de Q5 dos precedentes de plataforma se aplica.
- **Campos:**
  - `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`;
  - `frontend_units: 1`, `unit_organization: single-unit`;
  - `repo_type: library` (componente reutilizável para a plataforma).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** plataforma low-code que usa Module Federation (`library.type: 'var'`, singletons `@ws-ui/*`) como formato de plugins de componentes de terceiros.
- **Protocolo (amostra):** uma família de 16 componentes Qodly do mesmo autor está nas rodadas.
- **Protocolo (busca):** entrada só por dependência declarada em `package.json`. Elegibilidade `pass` nas duas rodadas.
