---
schema: 1
id: 334730797
full_name: rayhan999/rayhan999
url: https://github.com/rayhan999/rayhan999
commit: d692f4f8f6f5f203b5d6bcde8549c2f6174800a7
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

# 276 — rayhan999/rayhan999

## Contexto

- **Tipo de repositório:** não é projeto de software (README de perfil do GitHub).

O snapshot tem o README de apresentação, uma imagem SVG e um arquivo de workflow fora de `.github/`. Micro-frontends aparecem como interesse (“microfrontend architecture”, `README.md:12`) e como experiência profissional (“Led CRM development using **Microfrontends**”, `README.md:32`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:277` registra rank 276, ID 334730797, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:277` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:1870` e `data/discovery/mfe-round-002/candidates.csv:1870`, ambos com `terminology` e `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2021-01` | 2026-10-07T18:20:16.571Z / 2026-10-08T15:35:33.037Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2021-01` | 2026-10-07T22:05:01.240Z / 2026-10-08T15:45:10.249Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2021-01-01..2021-01-31`.

Metadados do hit (iguais nas duas rodadas, salvo contagens): descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 111, 2 forks, criação em 2021-01-31T18:47:18Z, push em 2026-09-24T13:39:33Z.

**Grafias no README do SHA:** “microfrontend” em `README.md:12` (“Clean code, microfrontend architecture, and impactful UX”) e “Microfrontends” em `README.md:32`. Elas correspondem às duas consultas.

**README posterior às buscas:** o SHA (`d692f4f`, 2026-10-09T00:35:58+03:00, isto é, 2026-10-08T21:35:58Z) e o commit anterior `38b539f` (2026-10-08T21:34:39Z) alteram o README depois das duas coletas (a última às 2026-10-08T15:45:10Z). As mensagens são “Update README to streamline GitHub stats display” e “Fix duplicate top languages image in README”.
- A versão indexada nas buscas é a de `3c80398` (2026-02-16). O commit seguinte, `a388c11` (2026-09-24, igual ao `pushed_at`), só adicionou o SVG.
- O blob dessa versão (`30e7291…`) está ausente no clone parcial, assim como o de `38b539f` (`git cat-file -e` falha com `GIT_NO_LAZY_FETCH=1`).
- Portanto, não se verificou se as linhas 12 e 32 já existiam na versão buscada. As mensagens indicam mudanças só na seção de estatísticas, mas isso é inferência.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 3 entradas, `README.md`, `profile-night-green.svg` e `workflows/update-readme.yml`, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Não há código de aplicação, manifesto nem build. | ausente |
| Documentação | `README.md:7–14`: apresentação como “Frontend-focused Software Engineer”; `README.md:12`: “microfrontend architecture” como interesse; `README.md:18–26`: tabela de tecnologias; `README.md:32`: experiência profissional com “Microfrontends” num CRM de terceiro. | fraca |
| Build/deploy | `workflows/update-readme.yml:1–16`: workflow `jamesgeorge007/github-activity-readme` para atualizar o README; fica em `workflows/` na raiz, fora de `.github/workflows`. É automação de perfil, não build de aplicação. | contexto |
| Tecnologia / Configuração / Código-fonte / Composição | Inexistentes; nenhuma configuração de federação, single-spa, import map, iframe ou Web Components. Imports relativos entre unidades não se aplicam (não há código). | ausente |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 62 commits (62 em todos os refs), nenhum merge, todos do titular com o noreply `58140227+rayhan999@users.noreply.github.com` (nomes `rayhan999`, `MD. Sadek Rayhan`, `MD. Sadek Rayhan Mahi` e `Sadek Rayhan Mahi`) e, em quase todos, committer `GitHub` (edições pela interface web), de 2021-02-01 a 2026-10-08. Pelo `git log --no-renames --name-status`:
- `25959d5` (2021-02-01, “initial commit”, committer `rayhan999`) altera o README e adiciona `workflows/update-readme.yml`;
- `a388c11` (2026-09-24) adiciona o SVG;
- todos os demais só adicionam ou modificam `README.md`. `git rev-list --objects $SHA --missing=print` lista 60 objetos ausentes, nenhum na árvore do SHA (versões anteriores do README e afins).

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend: só README, uma imagem e um workflow de perfil (inventário). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; micro-frontends são interesse e experiência profissional (`README.md:12`, `:32`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Mesmo padrão dos perfis 011/064/068/073/077/101/111; `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, arrays de tecnologia vazios.
- O fato de o README do SHA ser posterior às buscas não muda a classe: em nenhum momento o histórico tem código de aplicação (os metadados de commits mostram só README e SVG).
- Não há decisão aberta.

## Notas para análise

- **Protocolo (snapshot posterior às buscas):** o clone (2026-10-12) capturou dois commits de README feitos em 2026-10-08 depois das coletas. A versão indexada não está no clone parcial, então a linha exata que casou nas buscas não é verificável localmente. Registrar o caso para a análise de reprodutibilidade (snapshot × coleta).
- **Protocolo (busca):** o padrão `owner == name` reforça a sugestão de filtro automático registrada em 011. A elegibilidade é `pass` nas duas rodadas.
