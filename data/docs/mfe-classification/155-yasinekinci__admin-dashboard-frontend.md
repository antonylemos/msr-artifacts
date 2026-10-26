---
schema: 1
id: 977898028
full_name: yasinekinci/admin-dashboard-frontend
url: https://github.com/yasinekinci/admin-dashboard-frontend
commit: 3d2dcd7b46b3a1ad3e048a96d7cd5e33203179dc
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 155 — yasinekinci/admin-dashboard-frontend

## Contexto

Projeto Vite + React + TypeScript recém-criado, com o código padrão do scaffold (contador e logos em `src/App.tsx:6–33`), e workflow de deploy para Azure Static Web Apps. O README é uma lista de tópicos a estudar ou aplicar (React, Redux, autenticação, estilos, testes, CI/CD etc.), entre os quais “Micro Frontend” (`README.md:3–7`). Não há implementação além do scaffold. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:156` registra rank 155, ID 977898028, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:156` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:13655` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:13661` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-05` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:21:59.654Z / 2026-10-08T15:54:21.435Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:53:14.512Z / 2026-10-08T16:05:40.430Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-05-01..2025-05-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem CSS, `fork: false`, tamanho 48;
- criação em 2025-05-05T06:35:03Z, push em 2025-05-07T10:54:27Z;
- homepage `lemon-hill-09b3ffd10.6.azurestaticapps.net`.

Sem descrição, o acerto vem de `README.md:4`, “Micro Frontend”, única ocorrência. A forma plural “micro frontends” não aparece no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA, `3d2dcd7` (2025-05-05), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 18 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Vite na raiz (`package.json`, `vite.config.ts`, `index.html`, `src/` com `App.tsx`, `main.tsx`, CSS e `assets/react.svg`) e um workflow. | contrária |
| Código-fonte | `src/main.tsx:6–10` monta `App`. `src/App.tsx:1–35` é o template padrão do Vite (contador, logos). Os imports são internos. | contrária |
| Configuração / Build/deploy | `vite.config.ts:5–7`: só `react()`. `package.json:6–27`: `tsc -b && vite build`, dependências só `react`/`react-dom`. `.github/workflows/azure-static-web-apps-lemon-hill-09b3ffd10.yml:22–33`: deploy único de `dist` na Azure. | contrária |
| Documentação | `README.md:1–61`: lista de tópicos (“React / Micro Frontend / Function vs Class Components / Hooks / formik”, Redux, Auth, Ant Design etc.), sem descrição de arquitetura implementada. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA (exceto `package-lock.json`) por `micro.?front`, `federation`, `single-spa`, `remoteEntry`, `customElements` e `iframe`: só `README.md:4`. | ausente |

## Autoria e histórico

Clone não raso. O SHA tem 6 commits, nenhum merge, todos de Yasin Ekinci com dois e-mails, `@dzdtech.com` e `@yandex.com`, em 2025-05-05. Pelo `git log --no-renames --name-status`:
- a raiz `9149e56` (“Initial commit”, via GitHub) adiciona `.gitignore` e `README.md`;
- `b46c245` (“create react vite app”) adiciona o scaffold;
- `81fa867` e `e6f7db0` tratam do workflow da Azure;
- `973f7f9` e o SHA `3d2dcd7` alteram só o README.

O branch `origin/first` (`e917bcd`, 2025-05-07) descende do SHA e tem commits de teste (“deneme”, “deneme2”, “deneme3”) de Ali Yurtsever, mais um merge de PR. O `pushed_at` corresponde a ele. Esse branch não foi considerado. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects --missing=print` no SHA reporta cinco blobs promisor ausentes; as árvores, os metadados dos seis commits e os arquivos do snapshot foram lidos localmente, sem rede.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação (scaffold Vite); nenhuma configuração de composição referencia outras unidades. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades. |
| Q4 | No | Nenhum mecanismo de composição configurado (`vite.config.ts:5–7`; busca registrada). |
| Q5 | No | Q1–Q4 são No: scaffold com lista de tópicos que cita micro-frontends. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them” e a “conventional frontend monoliths”, aqui em estado de scaffold.
- O termo é conteúdo de lista de estudo, como em 023. Há uma aplicação mínima real, por isso `frontend_units: 1` e `single-unit`, e não 0 como nos perfis sem implementação (011/064/068/073/077/101/111).
- `repo_type: other`: repositório inicial de estudo ou planejamento sem caráter de exemplo de MFE, template ou produto. `ui_technologies: [react]`, `build_tools: [vite]`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README em forma de lista de tópicos de estudo, com “Micro Frontend” como item, sobre um scaffold Vite.
- **Protocolo (busca):** o hit plural `"micro frontends"` não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, uma unidade (`index.html` → `src/main.tsx` → `src/App.tsx`), `single-unit` e `other`; sem decisão aberta. Correção adotada: a frase de que não havia objeto ausente foi substituída (cinco blobs promisor ausentes, verificado). O ramo `origin/first` descende do SHA, com commits `deneme` em `src/App.css` e um merge, e só altera `App.css` e README; não faz parte do snapshot avaliado.
