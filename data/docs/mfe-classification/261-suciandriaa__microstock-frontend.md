---
schema: 1
id: 1320260293
full_name: suciandriaa/microstock-frontend
url: https://github.com/suciandriaa/microstock-frontend
commit: 798d8c8738526c0b29f3a40966f05a2f935c5d97
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 261 — suciandriaa/microstock-frontend

## Contexto

Página HTML única de um gerador de metadados para fotos e vídeos de bancos de imagem (“Microstock AI Metadata Bulk Generator”, `index.html:6`), com Tailwind por CDN, script inline e chamadas a um backend separado na Vercel (`index.html:7–9`, `:79–81`). O README contém só o título `# microstock-frontend` (`README.md:1`). “Microstock” designa o mercado de bancos de imagens, não micro-frontends. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:262` registra rank 261, ID 1320260293, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede (backend e CDNs não foram consultados).

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:262` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:34633` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:34639` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-08` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-08-01..2026-08-31` | 2026-10-07T22:40:50.062Z / 2026-10-08T16:01:32.208Z |

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem HTML, `fork: false`, tamanho 15, homepage `https://microstock-frontend.vercel.app`, criação em 2026-08-02T14:25:53Z, push em 2026-08-02T14:37:32Z.

**Grafia:** nem o nome, nem a descrição (nula), nem o README (`README.md:1`, `# microstock-frontend`, 21 bytes) contêm a frase “micro frontend”. O único texto próximo é `microstock-frontend`, em que “micro” é prefixo de “microstock”. O acerto depende do processamento textual da busca do GitHub, que não está registrado; não se atribui uma linha casada que a API não informou.

O README só foi criado no commit-raiz `b609b2f` (2026-08-02T21:25:54+07:00) e não foi alterado depois. O SHA (2026-08-02T21:37:32+07:00, isto é, 14:37:32Z) coincide com o `pushed_at` e antecede as coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 2 entradas, `README.md` e `index.html`, ambas arquivos regulares `100644`; zero symlinks e zero gitlinks. Não há manifesto, build ou outros scripts. | contrária |
| Código-fonte | `index.html:1–228`: página única com HTML, Tailwind por CDN (`:7`), Font Awesome (`:8`) e script inline (`:79–225`) para upload de até 10 arquivos, geração de metadados por `fetch` ao backend (`:135–139`), exportação CSV (`:187–206`) e compra de créditos (`:208–225`). | contrária |
| Código-fonte (serviços externos) | `index.html:9`: script do Midtrans Snap (sandbox), com chave de cliente substituível (`MASUKKAN_MIDTRANS_CLIENT_KEY_ANDA`), usado por `window.snap.pay` (`:217`); `index.html:81`: `BACKEND_URL` do backend na Vercel. São um widget de pagamento e uma API, não unidades frontend compostas. | contexto |
| Tecnologia / Configuração / Composição (busca) | A página inteira foi lida: nenhuma referência a federação, single-spa, import map, iframe, custom elements ou carga de outra aplicação. Não há imports (a página não tem módulos), então não há fronteiras a cruzar. | ausente |
| Documentação | `README.md:1`: só o título; nenhuma menção a micro-frontends. | ausente |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 4 commits (4 em todos os refs), nenhum merge, todos com autor `suciandriaa <suciandriani996@gmail.com>` e committer `GitHub` (edição e upload pela interface web), em 2026-08-02:
- `b609b2f` (“Initial commit”) cria o README;
- `f619421` (“Add files via upload”) adiciona `index.html`;
- `d52b533` e o SHA `798d8c8` trocam a URL do backend.

`git rev-list --objects $SHA --missing=print` lista 2 objetos ausentes, nenhum na árvore do SHA (versões anteriores de `index.html`). Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única página HTML (`index.html`), sem outra unidade e sem configuração de composição (inventário). |
| Q2 | No | Não há duas unidades a avaliar. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; os scripts externos são Tailwind, Font Awesome e o widget de pagamento Midtrans (`index.html:7–9`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”: um front estático de página única que consome um backend.
- O termo de busca não está no repositório: o hit vem de `microstock-frontend` por processamento da busca. Não se trata nem de menção textual a micro-frontends.
- `frontend_units: 1`, `single-unit`, como as páginas estáticas de 141 (rascunho) e 250 (rascunho). `ui_technologies: []` e `build_tools: []`: HTML/JS inline com Tailwind por CDN, sem framework de UI nem bundler.
- `repo_type: example`: protótipo com chave de pagamento sandbox de placeholder (`index.html:9`) e usuário fictício (`index.html:82`, `user_demo_123`), embora publicado na Vercel. A classe não depende desse campo.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos) / Protocolo (busca):** falso positivo puramente lexical. “microstock-frontend” casou `"micro frontend"` sem grafia correspondente em nome, descrição ou README. Sugere verificar se a busca do GitHub trata prefixos (“micro” em “microstock”) como termos; outros compostos com “micro” podem gerar o mesmo ruído.
- **Protocolo:** a elegibilidade muda de `unknown` (001) para `pass` (002).
