---
schema: 1
id: 679332000
full_name: Priyammondal/portfolio
url: https://github.com/Priyammondal/portfolio
commit: 8db2d68c9318419ef669e69a701ffad351bc7907
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 353 — Priyammondal/portfolio

## Contexto

Portfólio pessoal de desenvolvedor: uma SPA React 18 + Vite publicada no GitHub Pages (`README.md:1–6`; `package.json:2`, `:7–16`; `vite.config.js:4–7`). Micro-frontends e Module Federation aparecem só na descrição de um projeto listado, “Shop.”, mantido em outro repositório (`README.md:29`; `src/assets/data.js:244–253`), e como habilidade (`README.md:51`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:354` registra rank 353, ID 679332000, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:354` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:6467` e `data/discovery/mfe-round-002/candidates.csv:6471`, ambos com `terminology;technology` e `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2023-08` | 2026-10-07T22:18:25.429Z / 2026-10-08T15:52:56.191Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2023-08` | 2026-10-07T22:49:06.423Z / 2026-10-08T16:04:37.289Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2023-08` | 2026-10-07T23:15:58.300Z / 2026-10-08T16:13:13.439Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2023-08-01..2023-08-31`.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 40378, criação em 2023-08-16T15:49:07Z, push em 2026-09-23T18:33:33Z.

Correspondências no README do SHA:
- **“micro frontend” e “module federation”:** `README.md:29` (“**Shop.** – Micro-frontend e-commerce app using Module Federation”);
- **“micro frontends”:** `README.md:51` (“Modular architecture & micro-frontends”).

A última alteração do README é `526ab8f` (2026-01-20). O SHA (2026-09-23T23:55:44+05:30, “Updated Resume”) coincide com o `pushed_at`. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 102 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único projeto Vite: `index.html`, `package.json`, `vite.config.js`, `src/` (páginas, seções, componentes, dados e imagens), `public/` (ícones, `404.html`, foto). | contrária |
| Configuração / Build | `package.json:7–16`: `vite`, `vite build` e deploy em `gh-pages`; `:17–31`: React, MUI, Bootstrap, React Router e formulários, sem pacotes de federação. `vite.config.js:4–37`: `react()`, `base` do GitHub Pages e `manualChunks` de React; nenhuma federação. | contrária |
| Código-fonte | `src/main.jsx:1–15`: `createRoot` com `HashRouter` e `App`. As páginas e seções de `src/pages/` são componentes da mesma aplicação, importados por caminhos internos (por exemplo, `src/Layout/MainLayout/index.jsx:1–2`, `../../components/…`). | contrária |
| Documentação / dados (menções MFE) | `README.md:29`, `:51`; `src/assets/data.js:244–253`: card do projeto “Shop.” com descrição de “microfrontend architecture and module federation”, URL na Netlify e repositório `Priyammondal/e-commerce-micro-frontend-react-application`. É conteúdo exibido pelo portfólio. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfile e PDF, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map` e `<iframe`: só as menções acima. | ausente |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 80 commits alcançáveis a partir do SHA (157 em todos os refs, incluindo `origin/gh-pages` com builds publicados), nenhum merge, todos do titular com o e-mail `priyammondal096@gmail.com`, exceto um commit com e-mail corporativo local `priyam.mondal@RebelFoods-6.local`. Os registros vão de 2023-08-16 (`2b85079`, “first push”) ao SHA (2026-09-23, “Updated Resume”). `git rev-list --objects $SHA --missing=print` lista 436 objetos ausentes, nenhum na árvore do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única SPA com um entry e um build (`src/main.jsx:1–15`; `vite.config.js:4–37`); nenhuma configuração de composição. |
| Q2 | No | Não há duas unidades; seções e páginas são componentes da mesma aplicação. |
| Q3 | No | Não há host que carregue unidades; o `HashRouter` roteia páginas internas. |
| Q4 | No | Nenhum mecanismo de composição; Module Federation é citado como tecnologia de outro projeto (`README.md:29`; `src/assets/data.js:248`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them” e a “conventional frontend monoliths”.
- Mesmo padrão de 250 (rascunho, portfólio com MF como projeto profissional descrito) e, pela menção a micro-frontends como habilidade, dos perfis 011/064/068/073/077/101/111.
- O projeto MFE citado está em outro repositório; não é avaliado aqui.
- `frontend_units: 1`, `single-unit`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: other` (portfólio pessoal).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** portfólios que listam projetos de micro-frontends (README e dados exibidos) entram pelas três consultas terminológicas e de tecnologia sem conter a implementação.
- **Protocolo (famílias):** o projeto citado, `Priyammondal/e-commerce-micro-frontend-react-application`, está nas rodadas (`data/discovery/mfe-round-002/candidates.csv:9149`), fora da amostra e não inspecionado.
- **Protocolo:** a elegibilidade é `pass` nas duas rodadas.
