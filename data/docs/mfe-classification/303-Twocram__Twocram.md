---
schema: 1
id: 1320881755
full_name: Twocram/Twocram
url: https://github.com/Twocram/Twocram
commit: 6138b959b30039c8d0c65965f81d93f2a8974c98
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

# 303 — Twocram/Twocram

## Contexto

Repositório de perfil do GitHub: um único `README.md` com um bloco TypeScript ilustrativo que apresenta o autor, sua stack e contatos (`README.md:1–23`). Module Federation aparece só como item da lista de ferramentas (`README.md:13`). Não há código executável nem aplicação. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:304` registra rank 303, ID 1320881755, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede. Os dados de contato pessoal do README não são reproduzidos.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:304` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:34651` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:34657` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um único hit em cada rodada. Ele vem do endpoint `repositories`, consulta `technology-module-federation-repositories` (`"module federation" in:name,description,readme`), subconsulta `…#created:2026-08`, com `path` vazio. As coletas são 2026-10-07T23:30:05.892Z (001) e 2026-10-08T16:19:18.549Z (002). A consulta efetiva acrescenta `pushed:>=2025-04-01 created:2026-08-01..2026-08-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 0;
- criação em 2026-08-02T22:37:10Z, push em 2026-08-02T22:39:54Z.

A grafia literal está em `README.md:13` (`tooling: ["Vite", "Module Federation", "Vitest", "Jest", "Docker"]`). O README é do único commit (2026-08-03), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, arquivo regular `100644` (`README.md`, 610 bytes); zero symlinks e zero gitlinks. | contrária |
| Documentação | `README.md:1–23`: bloco de código ilustrativo com nome, função, stack e contatos; `README.md:13` lista “Module Federation” entre as ferramentas. | fraca |

## Autoria e histórico

Clone não raso; um único commit, `6138b95` (2026-08-03, “feat: initial commit”), de Artem Maslov. Só há o branch `main`. Não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só um README. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; Module Federation só citado em `README.md:13`. |
| Q5 | No | Q1–Q4 são No: repositório de perfil. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Mesmo enquadramento dos finais de perfil 011/064/068/073/077/101/111 e do rascunho 285.
- **Campos:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** Module Federation citado como ferramenta num README de perfil casa a consulta tecnológica de repositórios.
- **Protocolo (busca):** grafia literal no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
