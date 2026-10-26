---
schema: 1
id: 1104672701
full_name: vinnywesker/vinnywesker
url: https://github.com/vinnywesker/vinnywesker
commit: 4a65a709b3553a6bc11d9c1a6019ad01d59c3200
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

# 219 — vinnywesker/vinnywesker

## Contexto

Repositório de perfil pessoal do GitHub: um único `readme.md` (79 linhas) com apresentação profissional de engenheiro mobile/fullstack, badges de tecnologias e links de contato. Micro-frontends aparecem como foco declarado de trabalho: “Arquitetura de Microfrontends e Superapps com React Native” (`readme.md:17`). Não há código. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:220` registra rank 219, ID 1104672701, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:220` registra a estratégia `terminology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:21519` e `data/discovery/mfe-round-002/candidates.csv:21525`, ambos com `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-11` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:25:47.089Z / 2026-10-08T15:40:08.457Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:09:45.099Z / 2026-10-08T15:48:26.230Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 3;
- criação em 2025-11-26T14:27:35Z, push em 2025-11-26T15:00:35Z.

O acerto vem de `readme.md:17`, “🔭 **Foco Atual:** Arquitetura de Microfrontends e Superapps com React Native.”, única ocorrência. O singular “microfrontend” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O `readme.md` foi alterado pela última vez no próprio SHA (2025-11-26), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, `readme.md` (`100644`, 4.187 bytes); zero symlinks e zero gitlinks. Não há código, manifesto nem configuração. | contrária |
| Documentação | `readme.md:11–20`: apresentação pessoal; `:17` declara o foco em “Arquitetura de Microfrontends e Superapps com React Native”. `readme.md:24–57`: badges de tecnologias. É uma competência declarada, sem projeto descrito. | fraca |
| Busca | Com o inventário reduzido a um arquivo, a busca por `micro.?front`, `federation` e `single.?spa` acha só `readme.md:17`. Nenhum mecanismo. | ausente |

## Autoria e histórico

Clone não raso; 4 commits lineares, nenhum merge, todos de Vinicius Rodrigues com e-mail corporativo e com a mesma mensagem “first commit”, em 2025-11-26 entre 11:39 e 12:00 (-03:00). O primeiro (`db67a07`) adiciona `readme.md`, e os demais o editam. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o inventário é só `readme.md`. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; micro-frontends só aparecem como foco profissional (`readme.md:17`). |
| Q5 | No | Q1–Q4 são No: README de perfil pessoal. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Repositório de perfil sem implementação, como os finais 011/064/068/073/077/101/111 e os rascunhos 158/166/173/179/182/188/195/198: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** foco profissional em “Microfrontends e Superapps com React Native” num README de perfil.
- **Protocolo (busca):** o hit singular `microfrontend` não tem grafia literal. Elegibilidade `unknown` nas duas rodadas; o repositório entrou na amostra com `unknown`.
- **Protocolo (inventário):** o arquivo é `readme.md` em minúsculas; num sistema de arquivos sem distinção de caixa, `README.md` resolve no disco mas não no objeto Git.
