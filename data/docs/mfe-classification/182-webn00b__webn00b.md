---
schema: 1
id: 1389131816
full_name: webn00b/webn00b
url: https://github.com/webn00b/webn00b
commit: e096c973353b6d741ba9210f6d33a4f245ada3f9
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

# 182 — webn00b/webn00b

## Contexto

Repositório de perfil pessoal: um `README.md` de 29 linhas com apresentação de um desenvolvedor fullstack (Vue 3, TypeScript, Go) e uma imagem SVG animada de terminal (`README.md:1–10`; `assets/terminal.svg`). “micro-frontends” aparece numa lista de áreas de atuação (`README.md:11`). Não há código. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:183` registra rank 182, ID 1389131816, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:183` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:37945` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:37977` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-09` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:42:59.653Z / 2026-10-08T16:02:15.900Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:12:35.014Z / 2026-10-08T16:10:44.980Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-09-01..2026-09-30`.

Metadados do hit:
- descrição “Profile README”, sem os termos;
- sem tópicos, linguagem nula, `fork: false`, tamanho 2;
- criação em 2026-09-26T12:00:10Z, push em 2026-09-26T12:00:16Z.

O acerto vem de `README.md:11`, “- 🧩 Frontend architecture: micro-frontends, Feature-Sliced Design, design systems”, com grafia hifenizada e única ocorrência. A busca de frase trata o hífen como separador. A forma singular “micro frontend” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O README vem do único commit, que é o SHA (2026-09-26), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 2 entradas, `README.md` e `assets/terminal.svg` (4.700 bytes), ambas `100644`; zero symlinks e zero gitlinks. Não há código, manifesto ou configuração. | contrária |
| Documentação | `README.md:1–10`: imagem do terminal, “Hi, I'm Fedor”, apresentação profissional e áreas de experiência. `README.md:11`: “micro-frontends” entre áreas de arquitetura de frontend. É competência declarada, sem projeto descrito. | fraca |
| Tecnologia / Configuração / Composição (busca) | `grep -i` no README e no SVG por `micro.?front` e `federation`: só `README.md:11`; o SVG não contém os termos. Nenhum mecanismo. | ausente |

## Autoria e histórico

Clone não raso com um único commit, o SHA `e096c97` (2026-09-26, “Add profile README with animated terminal”), de `f.savin <fedsavin@gmail.com>` como autor e committer. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o inventário é só o README e uma imagem. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; “micro-frontends” só aparece na lista de competências (`README.md:11`). |
| Q5 | No | Q1–Q4 são No: README de perfil pessoal. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Repositório sem implementação, como os perfis 011/064/068/073/077/101/111 (e os rascunhos 158/166/173/179): `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** competência “micro-frontends” em README de perfil.
- **Protocolo (busca):** o hit singular `"micro frontend"` não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `other`, zero unidades e `none`; sem decisão aberta (`draft`). O SHA contém só `README.md` e `assets/terminal.svg` (4.700 bytes, markup, estilo e animação de uma ilustração de terminal, sem referência a MFE); a menção a "micro-frontends" (`README.md:11`, junto de Feature-Sliced Design e design systems) é competência declarada. Proveniência: por eliminação o README é a origem dos dois hits, e a normalização de hífen e plural que explicaria a consulta singular é plausível, mas o mecanismo interno do GitHub não está gravado, e não se atribui uma regra de stemming como fato. A elegibilidade `unknown` da rodada 001 (`recent-human-commit`, `activity_incomplete`) é de coleta de atividade incompleta, e na rodada 002 há `qualifying_commit`; isso não altera a interpretação temática. As tecnologias do README (Vue 3, TypeScript, Go) e do SVG descrevem competências, e por isso `ui_technologies` e `build_tools` ficam vazios.
