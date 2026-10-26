---
schema: 1
id: 1131427099
full_name: SmitArole/UX221-LAB-1
url: https://github.com/SmitArole/UX221-LAB-1
commit: 9e71a6d1827768b7c186b21bb8fd06017e7e8996
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
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

# 333 — SmitArole/UX221-LAB-1

## Contexto

Repositório criado a partir do template `cd-wordpress` (“continuous deployment wordpress”), sem conteúdo de site: só o README, o `package.json` que delega tudo à ferramenta externa `wp-pwa`, a configuração de devcontainer, o workflow de publicação e a licença (`README.md:1–11`; `package.json:1–11`). O README do template diz que o site seria “a consumer of microfrontends” e cita um exemplo PayPal em outro repositório (`README.md:13–15`). O snapshot é idêntico em estrutura ao rascunho 079. A descrição (“test my ability to use Wordpress”) e o nome indicam um laboratório de curso. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:334` registra rank 333, ID 1131427099, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:334` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:23117` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:23124` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-01` | 2026-10-07T19:35:58.148Z / 2026-10-08T15:40:38.870Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-01` | 2026-10-07T22:10:28.465Z / 2026-10-08T15:48:46.710Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Metadados do hit (iguais nas duas rodadas): descrição “The goal of this site is to test my ability to use Wordpress ”, sem tópicos, linguagem nula, licença MIT, `fork: false`, tamanho 2, criação em 2026-01-10T01:54:08Z, push em 2026-01-10T01:54:10Z.

**Grafias:** ambas aparecem em `README.md:13` do template:
- “microfrontends” em “a consumer of microfrontends”;
- “microfrontend” em “an example microfrontend for paypal standard”.

O README só existe no commit único, que é o SHA (2026-01-09T20:54:10-05:00, isto é, 2026-01-10T01:54:10Z), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 6 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São `.devcontainer/devcontainer.json`, `.github/workflows/main.yml`, `.gitignore`, `LICENSE.txt`, `README.md` e `package.json`. Não há `wp-content`, páginas, temas ou código de site; `.gitignore:5` ignora `.wordpress`. | contrária |
| Configuração | `package.json:1–11`: só a dependência `wp-pwa` e scripts `dev`/`start`/`preview`/`build` que a invocam. `.github/workflows/main.yml:28–32`: publicação por `diy-pwa/npm-build-2-gh-pages@v1.11`. | contrária |
| Documentação | `README.md:11–15`: publicação contínua em gh-pages e “The idea of this is as a consumer of microfrontends. There is an example microfrontend for paypal standard here.” O exemplo está em outro repositório (`diy-pwa/paypal-microfrontend`), e nada no snapshot o consome. | fraca |
| Tecnologia / Configuração / Composição | Inventário integral lido: nenhuma configuração de composição, referência a remote ou código que monte unidades. Imports relativos entre unidades não se aplicam (não há código). | ausente |

## Autoria e histórico

Clone não raso. Há 1 commit (1 em todos os refs), sem merges: `9e71a6d` (2026-01-09T20:54:10-05:00), autor `SmitArole <arolem8@gmail.com>`, committer `GitHub`, “Initial commit”. É o padrão de repositório gerado de template pela interface do GitHub; o conteúdo é o do template `cd-wordpress`, sem alteração posterior. `git rev-list --objects $SHA --missing=print` não lista objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no inventário; o exemplo PayPal só aparece no README (`README.md:13`). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host carregando unidades; não há sequer conteúdo de site versionado. |
| Q4 | No | Nenhum mecanismo de composição configurado (`package.json:1–11`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”: a menção é texto herdado do template.
- Mesmo caso do rascunho 079 (template `cd-wordpress` sem conteúdo, Non-MFE, `template`, 0 unidades). Diferente de 119 e 125 (rascunhos), em que o site WordPress foi versionado e contado como uma unidade.
- `repo_type: template`, `frontend_units: 0`, `unit_organization: none`, arrays de tecnologia vazios.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** o README do template `cd-wordpress` (“a consumer of microfrontends”, `README.md:13`) é replicado em cada repositório de laboratório criado a partir dele. Na amostra, a família já inclui 079, 119 e 125 (rascunhos) e agora este.
- **Protocolo (famílias/duplicatas):** repositórios de exercícios de curso (UX221/UX308) gerados do mesmo template entram pelas consultas terminológicas; um filtro por conteúdo idêntico ao template evitaria a reavaliação manual.
- **Protocolo:** a elegibilidade muda de `unknown` (001) para `pass` (002).
