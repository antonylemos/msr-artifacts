---
schema: 1
id: 1054066324
full_name: Irehan/mfe-registry
url: https://github.com/Irehan/mfe-registry
commit: f90aef8f6db5c4ec49a0913476636124721f986d
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 282 — Irehan/mfe-registry

## Contexto

Serviço backend de registro de micro-frontends, um “Local Plugin Registry (Express)” (`README.md:1`):
- `server.js` (Express local, porta 4000);
- `api/registry.js` (função serverless para Vercel).

Os dois mantêm em memória uma lista `microFrontends` com `scope`, `url` do `remoteEntry.js`, rotas, papéis e módulo. Expõem `GET /registry` para o host consultar e `POST /registry` para os remotos se registrarem. O repositório não contém nenhuma unidade frontend; o host e os remotos que usariam o registro estão em outros repositórios. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:283` registra rank 282, ID 1054066324, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:283` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:18647` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:18653` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-09` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:02:49.821Z / 2026-10-08T15:39:32.098Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:09:04.609Z / 2026-10-08T15:48:01.833Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-09-01..2025-09-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 729;
- criação em 2025-09-10T10:12:43Z, push em 2025-09-13T10:54:28Z.

A grafia “microFrontends”, em camelCase, está em `README.md:19` (“**GET /registry** → `{ microFrontends: [], updatedAt }`”). O singular não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é o próprio SHA (2025-09-13), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 7 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks: `.gitignore`, `README.md`, `api/registry.js`, `package.json`, `package-lock.json`, `server.js` e `vercel.json`. Não há HTML, componentes, bundler nem código de UI. | contrária |
| Código-fonte | `server.js:1–40`: Express com `GET`/`POST /registry` e upsert por `scope`. `api/registry.js:1–50`: o mesmo contrato como handler serverless, com CORS aberto. `package.json:5–13`: só `express` e `cors`. | contrária |
| Documentação | `README.md:11–33`: o registro “mirrors the Vercel serverless contract so Host doesn’t change code”, com exemplo de payload de um remoto (`url: http://localhost:3002/remoteEntry.js`, `module: ./BookingList`). `README.md:35–64`: comandos PowerShell para registrar `auth-app`, `booking-app` e `reporting-app` em URLs Vercel de outros repositórios. | contexto |
| Repositórios relacionados | Nas rodadas há outros candidatos da mesma conta: `Irehan/mfe-host`, `mfe-auth`, `mfe-booking` e `mfe-reporting` (`data/discovery/mfe-round-002/candidates.csv`), fora da amostra e não inspecionados. | contexto |

## Autoria e histórico

Clone não raso; 7 commits lineares, nenhum merge, todos de Ali Rehan Haider, de 2025-09-10 (`8653d73`, “Initial commit”) a 2025-09-13 (SHA `f90aef8`, “added Read Me”). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no repositório; o serviço não contém nem referencia remotos por configuração de composição, só armazena entradas enviadas em runtime. |
| Q2 | No | Sem unidades frontend, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz; o host que consultaria o registro está em outro repositório. |
| Q4 | No | O repositório não configura composição entre unidades; é a API de descoberta que um host usaria. |
| Q5 | No | Q1–Q4 são No: serviço backend de apoio a uma arquitetura MFE. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. É infraestrutura de apoio, um registro de descoberta de remotos, sem frontend.
- O enquadramento é próximo de 249 (GitHub Action para o `import-map-deployer`) e de “MFE frameworks and libraries”: ferramenta do ecossistema MFE que não implementa unidades. Aqui é um serviço específico da própria arquitetura do autor, por isso `repo_type: other`, não `library`.
- **Campos:** `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** a arquitetura do autor usa um registro em runtime (`GET /registry`) para o host descobrir `scope`, `url` do `remoteEntry.js`, rotas e papéis de cada remoto. O host e os remotos estão em repositórios separados, fora da amostra.
- **Protocolo (amostra):** a família `Irehan/mfe-*` tem cinco candidatos na rodada 002; só o registro entrou na amostra.
- **Protocolo (busca):** só a grafia camelCase `microFrontends` está no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
