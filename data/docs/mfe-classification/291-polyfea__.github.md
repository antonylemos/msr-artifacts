---
schema: 1
id: 741331616
full_name: polyfea/.github
url: https://github.com/polyfea/.github
commit: 93281b383833881f220884bbcc5cf63e1462e19b
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

# 291 — polyfea/.github

## Contexto

- **Tipo de repositório:** não é projeto de software. É o repositório especial `.github` de uma organização do GitHub: um `README.md` raiz e o `profile/README.md`, exibido na página da organização, que apresenta o ecossistema Polyfea (controlador Kubernetes para implantar e integrar micro-frontends), mais a licença. O código do ecossistema está em outros repositórios da organização, fora deste snapshot. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:292` registra rank 291, ID 741331616, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:292` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:7459` e `data/discovery/mfe-round-002/candidates.csv:7464`, ambos com `terminology` e `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2024-01` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2024-01-01..2024-01-31` | 2026-10-07T18:23:25.668Z / 2026-10-08T15:36:48.960Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2024-01` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2024-01-01..2024-01-31` | 2026-10-07T22:06:19.842Z / 2026-10-08T15:46:24.913Z |

Metadados do hit:
- descrição “Polyfea Organization README”, sem os termos pesquisados;
- sem tópicos, linguagem nula, licença Apache-2.0, `fork: false`, tamanho 9, 1 estrela;
- criação em 2024-01-10T07:10:11Z, push em 2025-11-26T13:47:12Z.

Sem os termos no nome nem na descrição, o acerto vem de README:
- `README.md:4` (raiz): “integration of microfrontends as a resources of the kubernetes” — grafia plural “microfrontends”; `README.md:2` traz o título com a grafia truncada “Microfronends”, que não casa.
- `profile/README.md:1` “Polyfea Microfrontends ecosystem” e `profile/README.md:3` “integration of microfrontends” e “each microfrontend” (singular).

Os hits não informam qual arquivo a API indexou como README. O plural “microfrontends” ocorre literalmente em `README.md:4`; o singular “microfrontend” isolado só ocorre em `profile/README.md:3`. Se a busca considerou apenas o README raiz, o hit singular depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração alcançável de `README.md` é `bef66fa` (2024-01-10) e a de `profile/README.md` é o próprio SHA `93281b3` (2025-11-26). Ambas antecedem as coletas de 7 e 8 de outubro de 2026; nenhum README do SHA é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 3 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks: `LICENSE`, `README.md` e `profile/README.md`. Não há manifesto, código, configuração de build nem asset. | ausente |
| Documentação | `README.md:2–4` e `profile/README.md:1–3`: o ecossistema é descrito como controlador Kubernetes para “deployment and integration of microfrontends”, com “independent release cycles for each microfrontend”; `profile/README.md:5`: link externo para a documentação (`https://polyfea.github.io/documentation/`), não seguido. | fraca |
| Tecnologia / Configuração / Código-fonte / Composição / Build/deploy | Inexistentes no snapshot; não há arquivo além dos três textos acima, portanto nem imports relativos entre unidades a buscar. | ausente |
| Contexto (organização) | Outros repositórios da organização aparecem nas rodadas, fora deste snapshot: por exemplo, `polyfea/polyfea-controller`, `polyfea/core` e `polyfea/spa-base` (`data/discovery/mfe-round-002/candidates.csv:7308`, `7441`, `7474`). Só este está na amostra (`sample.csv`, uma ocorrência de `polyfea/`); os demais não foram inspecionados. | contexto |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 7 commits alcançáveis (7 em todos os refs), nenhum merge, raiz `427afbb` (2024-01-10, “Initial commit”, `LICENSE` e `README.md`). Refs: `main`, `origin/main` e `origin/HEAD` no SHA. Autoria:
- Milan Unger, com duas identidades (`30626125+milung@users.noreply.github.com`, commits pela interface web, e um e-mail institucional), 6 commits de 2024-01-10 a 2024-05-24;
- Michal Sevcik (`99325737+SevcikMichal@users.noreply.github.com`), o SHA `93281b3` (2025-11-26, “Add link to docs”), pela interface web.

Por `git diff-tree --no-renames --name-status`, todos os commits só adicionam ou alteram `README.md`, `profile/README.md` e `LICENSE`; o histórico nunca conteve código. Nenhum blob histórico foi lido. `git rev-list --objects $SHA --missing=print` identifica 4 objetos históricos ausentes, não identificados por tipo sem busca na rede; os três blobs do SHA estão presentes e foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no repositório e nenhuma configuração de composição que referencie unidades externas; só `LICENSE`, `README.md` e `profile/README.md` (inventário). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição configurado; a integração de micro-frontends é só descrita (`profile/README.md:3`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”, como os perfis 011/064/068/073/077/101/111; aqui o perfil é de organização (`profile/README.md`), não de usuário. Na seção 3.2 do protocolo, cabe em “purely documentation without an implementation”.
- A menção não é competência pessoal, e sim a apresentação de um ecossistema MFE (controlador Kubernetes) mantido em outros repositórios. Isso aproximaria o projeto de “MFE frameworks and libraries”, mas este repositório não contém nem o framework: a classe segue só pelo conteúdo do snapshot.
- Não é `MFE-unit`: não há unidade preparada para composição. Não há cadeia parcial (097/103/104), code sharing (089/100) ou unidade de terceiros (102/074/080) a avaliar.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, arrays vazios.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** repositórios `.github` de organização (perfil em `profile/README.md`) entram pelo termo explícito no README, como os perfis de usuário (`owner == name`) de 011. O padrão `<org>/.github` sugere o mesmo tipo de filtro automático apontado em 011.
- **Protocolo (famílias):** a organização tem ao menos oito repositórios nas rodadas (`data/discovery/mfe-round-002/candidates.csv:7308`, `7309`, `7441`, `7464`, `7474`, `8586`, `11596`, `21275`); se a análise de famílias for adotada, o ecossistema precisaria ser inspecionado nesses repositórios; a autodescrição como controlador e “ecosystem of components” (`README.md:4`) não basta para decidir entre framework e instância.
- **Protocolo (busca):** o hit singular `microfrontend` só tem grafia literal isolada em `profile/README.md:3`; não está registrado qual README a busca indexou.
