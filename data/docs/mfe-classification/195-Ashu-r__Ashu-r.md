---
schema: 1
id: 295169734
full_name: Ashu-r/Ashu-r
url: https://github.com/Ashu-r/Ashu-r
commit: ae2750dcd0c4a7eab8276093d319573f6e087e8e
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

# 195 — Ashu-r/Ashu-r

## Contexto

Repositório de perfil pessoal: um `README.md` de 44 linhas com apresentação profissional (“Hi, I'm Ashutosh Randive”, `README.md:1–5`), ícones SVG de redes sociais em `static/icons/` e um workflow que gera a animação “snake” do perfil. O README cita experiência profissional com single-spa: uma migração de frontend Vue.js para React/Vite “via single-spa parcels” (`README.md:21`). Não há código de aplicação. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:196` registra rank 195, ID 295169734, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:196` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:1391` e `data/discovery/mfe-round-002/candidates.csv:1392`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2020-Q3` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2020-07-01..2020-09-30` | 2026-10-07T23:32:36.867Z / 2026-10-08T16:20:18.974Z |

Metadados do hit:
- descrição “Heya it's me”, sem o termo;
- sem tópicos, linguagem nula, `fork: false`, tamanho 31;
- criação em 2020-09-13T14:34:43Z, push em 2026-10-08T04:02:55Z, compatível com as atualizações automáticas do branch `output` da animação (`origin/output`, `90af8eb`, de `github-actions[bot]`, “Deploy to GitHub pages”, já em 2026-10-11).

O acerto vem de `README.md:21`, “…migration of a legacy Vue.js frontend to a modular React/Vite architecture via single-spa parcels…”, com a grafia literal “single-spa”. A última alteração do README é o próprio SHA, `ae2750d` (2026-07-25), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 9 entradas, todas arquivos regulares `100644`: `README.md`, `.github/workflows/snake_animation.yml` e 7 ícones SVG; zero symlinks e zero gitlinks. Não há código de aplicação, manifesto nem configuração de build. | contrária |
| Documentação | `README.md:1–5`: apresentação profissional. `README.md:21`: experiência com migração via “single-spa parcels” num empregador. É descrição de currículo, sem implementação no repositório. | fraca |
| Tecnologia / Configuração / Composição (busca) | Com o inventário reduzido a README, ícones e workflow, `grep -i` por `micro.?front`, `federation` e `single.?spa` só acha `README.md:21`. Nenhum mecanismo. | ausente |

## Autoria e histórico

Clone não raso; 25 commits em todos os refs, 1 merge, do titular (`Ashu-r`, “Ashutosh”, “Ashutosh Randive”, com `randiveashutosh@gmail.com` e noreply) e 1 de `github-actions[bot]` (animação, no branch `output`). A raiz é `3450eab` (2020-09-13); o SHA é `ae2750d` (2026-07-25, “Revise README content for clarity and detail”). O branch `origin/output` não foi considerado. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o inventário é README, ícones e workflow. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; single-spa só aparece em texto de currículo (`README.md:21`). |
| Q5 | No | Q1–Q4 são No: README de perfil pessoal. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Repositório sem implementação, como os perfis 011/064/068/073/077/101/111 (e os rascunhos 158/166/173/179/182/188): `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** experiência profissional com single-spa descrita em README de perfil casa a consulta de tecnologia `"single-spa"` com grafia literal.
- **Protocolo (busca/elegibilidade):** elegibilidade `pass` nas duas rodadas, mantida pela atualização automática da animação de perfil.
