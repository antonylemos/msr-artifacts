---
schema: 1
id: 834236828
full_name: atulkkushwaha/atulkkushwaha.github.io
url: https://github.com/atulkkushwaha/atulkkushwaha.github.io
commit: 0061673ff7e0605d5f7dab5f9cda1acb71a70f77
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 141 — atulkkushwaha/atulkkushwaha.github.io

## Contexto

Site pessoal estático (GitHub Pages de usuário) com currículo e portfólio. Tem um README em forma de currículo e quatro páginas HTML autocontidas com CSS e JS inline (`README.md:1–7`; `index.html:1–83`). Micro-frontends e Module Federation aparecem só como competências e experiências profissionais declaradas. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:142` registra rank 141, ID 834236828, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:142` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:9240` e `data/discovery/mfe-round-002/candidates.csv:9246`, ambos com `terminology;technology` e `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos cinco hits em cada rodada, todos com subconsulta `#created:2024-07`, endpoint `repositories` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:16:23.663Z / 2026-10-08T16:13:37.605Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:19:19.247Z / 2026-10-08T15:53:20.709Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:50:20.115Z / 2026-10-08T16:05:00.025Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:24:30.406Z / 2026-10-08T15:37:00.959Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:06:33.008Z / 2026-10-08T15:46:38.663Z |

A consulta efetiva de cada linha acrescenta `pushed:>=2025-04-01 created:2024-07-01..2024-07-31`.

Metadados do hit: descrição nula, sem tópicos, linguagem HTML, `fork: false`, tamanho 13, criação em 2024-07-26T18:15:00Z, push em 2026-10-05T13:44:45Z. Sem descrição, o acerto vem do README:
- “Micro Frontend”: `README.md:20`, `76`, `113`, `119`, `133`;
- “Micro Frontends”: `README.md:246`;
- “Module Federation”: `README.md:129`;
- “microfrontend”: só dentro do nome sugerido “angular-microfrontend-demo” (`README.md:257`).

A forma unida no plural “microfrontends” não aparece no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração de `README.md` alcançável é `2d62d16` (2026-04-27T10:02:06+05:30). O SHA (2026-10-05T13:44:38Z) só adiciona páginas HTML. Ambos antecedem as coletas de 7 e 8 de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 5 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São elas `README.md`, `index.html`, `AIFocusedEngineerPortfolio.html`, `FullstackProfessionalPortfolio.html` e `vscodeDemo.html`. Não há manifesto, build, scripts externos ou assets. | contrária |
| Código-fonte (UI) | `index.html:1–83`: página de currículo com CSS inline (`index.html:6–25`) e um script inline de tema (`index.html:79–81`). As outras páginas são igualmente autocontidas, com título próprio (`AIFocusedEngineerPortfolio.html:2`; `FullstackProfessionalPortfolio.html:2`; `vscodeDemo.html:6`) e script inline de tema e animação (`vscodeDemo.html:546–575`). Nenhuma página carrega ou incorpora outra (`git grep` por `<script`, `src=`, `<link`, `.html` e `<iframe`). | contrária |
| Documentação (menções MFE) | `README.md:13–20`, `75–79`, `113–133` e `246` listam “Micro Frontend Architecture” e Module Federation como competências e experiências em projetos de terceiros (BMW UK, Siemens Healthineers). `index.html:43`, `index.html:47`, `AIFocusedEngineerPortfolio.html:37`, `FullstackProfessionalPortfolio.html:37` e `vscodeDemo.html:447–448` repetem essas menções como texto de currículo. `README.md:252–261` só sugere repositórios futuros (“angular-microfrontend-demo”). | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` em todo o SHA por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun` e `wujie`: só os textos de currículo acima, nenhum mecanismo configurado. | ausente |

## Autoria e histórico

Clone não raso; 4 commits, nenhum merge, todos de `Atulkkushwaha <atulkkushwaha@users.noreply.github.com>`. Pelo `git log --no-renames --name-status`:
- a raiz `de3800a` (2025-12-19) adiciona `README.md`;
- `2d62d16` (2026-04-27) altera o README;
- `1271d9e` (2026-10-05) adiciona `vscodeDemo.html`;
- o SHA `0061673` (2026-10-05, “portfolio sites”) adiciona `index.html` e as duas outras páginas.

O histórico não contém código de aplicação além de páginas estáticas. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Só há um site estático com páginas HTML independentes, sem entradas/builds de unidades nem configuração de composição (inventário; busca registrada). As menções a micro-frontends são texto de currículo (`README.md:20`, `129`). |
| Q2 | No | Sem unidades frontend com entrada e build próprios; as páginas não têm build. |
| Q3 | No | Nenhuma página carrega, monta ou roteia outra; nenhum host ou shell. |
| Q4 | No | Nenhum mecanismo de composição configurado (busca registrada). |
| Q5 | No | Q1–Q4 são No: currículo pessoal que menciona micro-frontends sem implementá-los. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”, como os perfis 011/064/068/073/077/101/111, em que micro-frontends são competência listada.
- Diferentemente desses perfis (só README, `frontend_units: 0`), aqui há páginas HTML publicáveis. Elas são registradas como um único site estático (`frontend_units: 1`, `single-unit`), seguindo o template estático de 129. Mesmo contadas separadamente, seriam “multiple frontend applications without explicit composition”, e a classe não mudaria.
- `repo_type: other` (site pessoal/currículo). `ui_technologies: []` e `build_tools: []`: HTML/CSS/JS inline sem biblioteca nem bundler.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** currículo profissional com repetidas menções a “Micro Frontend” e “Module Federation” em README e páginas, sem nenhum artefato correspondente. Passou nos dois rounds com elegibilidade `pass`.
- **Protocolo (busca):** cinco consultas terminológicas e de tecnologia casam o mesmo texto de currículo. O hit de `microfrontends` não tem grafia correspondente no README.

### Divergência entre analista e revisor (granularidade de unidades)

A revisora independente (Lupa) concorda com Non-MFE, Q2 a Q5 No, `other`, `approaches: []` e arrays de tecnologia vazios, e com `draft`. Diverge só de Q1 e da contagem: registraria Q1 Yes, `frontend_units: 4` e `unit_organization: monorepo`, porque o snapshot tem quatro documentos HTML completos (`index.html`, `AIFocusedEngineerPortfolio.html`, `FullstackProfessionalPortfolio.html` e `vscodeDemo.html`), cada um com `<!DOCTYPE html>`, título e corpo próprios e sem carregar os outros (verificado: cinco arquivos na árvore, sem manifesto nem build, e nenhuma referência de uma página a outra). A classe e Q2 a Q5 não mudam em nenhum dos dois cenários, pois não há build próprio nem composição.

Mantido `frontend_units: 1`/`single-unit` e Q1 No: os quatro arquivos são variantes de portfólio da mesma identidade, publicadas num único site GitHub Pages, sem entrada, build ou configuração por unidade, e o checklist não especifica a granularidade para páginas estáticas independentes. A revisora observa que, se a regra for contar variantes da mesma identidade como uma unidade por site, ela deve ser aplicada de forma uniforme, e que o caso 032 (páginas HTML de posts dentro de uma aplicação React de entrada única) não se transpõe. Decisão sobre a contagem de documentos HTML estáticos independentes fica para o pesquisador, junto com a convenção pendente de páginas renderizadas no servidor (118, 119, 125).
