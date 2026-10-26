---
schema: 1
id: 917305220
full_name: UDI-ENCB/UDI-ENCB
url: https://github.com/UDI-ENCB/UDI-ENCB
commit: 28d311607500d409b68324f572c2fd908dcffba2
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

# 344 — UDI-ENCB/UDI-ENCB

## Contexto

Repositório de documentação de um sistema administrativo (descrição “Config files for my GitHub profile.”, tópicos `config` e `github-config`). Contém só três arquivos: um `README.md` com a arquitetura geral, um diagrama SVG e o `nginx.conf` do gateway das APIs. O README descreve um “microfrontend”: um contenedor principal noutro repositório (`UDI-FRONT`) que instala cada aplicação como componente React via npm/GitHub e as mostra por `react-router` (`README.md:34`, `203`). Nenhum desses frontends está neste repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:345` registra rank 344, ID 917305220, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede. Os valores de exemplo de segredos no README não são reproduzidos.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:345` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:11430` e `data/discovery/mfe-round-002/candidates.csv:11436`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-01` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:25:45.558Z / 2026-10-08T15:37:14.194Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:06:50.848Z / 2026-10-08T15:46:51.097Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-01-01..2025-01-31`.

Metadados do hit:
- descrição “Config files for my GitHub profile.”, tópicos `config` e `github-config`, linguagem nula, `fork: false`, tamanho 22;
- criação em 2025-01-15T18:27:54Z, push em 2026-04-13T16:42:49Z.

A grafia “microfrontend” está em `README.md:34` (“…se opto por un sistema de "microfrontend".”). O plural não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. O README é do único commit (2026-04-13), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 3 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks: `README.md`, `Diagramas/ArquitecturaPrincipal.svg` e `nginx.conf`. Não há código frontend. | contrária |
| Documentação | `README.md:34`: contenedor principal em `UDI-FRONT`; cada app “se sirve como un componente, este componente es descargado por el contenedor principal y mostrado mediante react router”. `README.md:52–80`: lista de apps e repositórios (`UDI-ADMIN-COMUNIDAD`, `ADMIN-CUENTAS-FRONT`, `FRON-APARTADO-AULAS`). `README.md:203–205`: cada app é um componente React instalado via GitHub/npm, em repositórios privados. | fraca |
| Configuração | `nginx.conf:3–55`: `upstream`s e `location /api/...` para três APIs e `location /` servindo `/var/www/html`. É o gateway do backend e do build estático do contenedor, não um mecanismo de composição frontend. | contexto |

## Autoria e histórico

Clone não raso; um único commit, `28d3116` (2026-04-13, “add documentation”), de “Tzintzun”. Só há o branch `main`. Não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no repositório; as unidades só são citadas na documentação, e não há configuração de composição que as referencie. |
| Q2 | No | Sem unidades no snapshot, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz de composição no repositório; o contenedor está em `UDI-FRONT`. |
| Q4 | No | Nenhum mecanismo de composição configurado; a integração descrita (pacotes npm em build) não está no snapshot. |
| Q5 | No | Q1–Q4 são No: repositório de documentação da arquitetura. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Como nos finais 023 e 097, diagramas e descrições documentais não contam como unidades. A composição descrita (componentes React instalados via npm) ficaria perto da decisão em aberto sobre composição em build-time, mas não há código nem configuração neste snapshot para avaliá-la.
- **Campos:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** a arquitetura documentada (contenedor `UDI-FRONT` + apps como pacotes npm privados roteados por `react-router`) seria composição em build-time. Nenhum outro repositório `UDI-ENCB/*` aparece nos `candidates.csv` das duas rodadas; os repositórios citados não foram inspecionados.
- **Protocolo (busca):** o hit plural não tem grafia literal. Elegibilidade `pass` nas duas rodadas.
