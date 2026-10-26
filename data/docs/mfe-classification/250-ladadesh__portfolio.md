---
schema: 1
id: 1341747340
full_name: ladadesh/portfolio
url: https://github.com/ladadesh/portfolio
commit: 18a17260b26812306ebd3f1f60778c0283d3cf61
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

# 250 — ladadesh/portfolio

## Contexto

Portfólio pessoal de desenvolvedor, com tema de Deadpool: uma única SPA React 19 + Vite publicada na Vercel (`README.md:1–7`; `package.json:6–23`; `vercel.json:1–11`). Module Federation e micro-frontends aparecem só como competências e como projeto profissional descrito em texto. O próprio site diz que o código desses projetos é de clientes e fica “behind a corporate firewall” (`src/components/Projects.tsx:12–16`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:251` registra rank 250, ID 1341747340, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:251` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:35796` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:35801` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-08` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-08-01..2026-08-31` | 2026-10-07T23:30:30.768Z / 2026-10-08T16:19:25.793Z |

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 3372, homepage `https://deadpool-portfolio.vercel.app`, criação em 2026-08-21T11:43:04Z, push em 2026-08-21T13:32:49Z.

Sem descrição, o acerto vem do README. A grafia “Module Federation” aparece em `README.md:16` (lista de destaques do portfólio), `README.md:204` (papel atual) e `README.md:1172` (áreas de foco).

A última alteração do README é `c977feb` (2026-08-21T18:25:44+05:30). O SHA (2026-08-21T18:54:59+05:30) altera só componentes e estilos. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 69 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São um `package.json`, um `index.html`, um `vite.config.ts` e `src/` (componentes, dados, hooks, estilos e assets de imagem), além de `public/` (currículo PDF, ícones, `_redirects`, `sitemap.xml`), dois scripts Python de ajuste de imagem e `vercel.json`. | contrária |
| Configuração / Build | `package.json:6–11`: `dev`, `build` (`tsc -b && vite build`) e `preview`; `:12–23`: só React, React DOM, Vite e tooling, sem pacotes de federação. `vite.config.ts:5–7`: só `react()`. `vercel.json:2` e `public/_redirects:1`: fallback de SPA para `/index.html`. | contrária |
| Código-fonte | `index.html:79`, `:91` → `src/main.tsx:11–15` → `src/App.tsx:13–31`, `:84–103`: uma árvore React que importa estaticamente todas as seções (Hero, About, Experience, Projects etc.) e easter eggs. O roteamento é por `location.pathname` só para a página 404 (`src/App.tsx:36`, `:69`, `:77–78`). | contrária |
| Código-fonte (fronteiras) | Busca ativa `git grep -E '\.\./'` em `src`: todos os `../` e `../../` partem de `src/components/*` para `src/data/portfolio`, `src/hooks` e `src/assets`, dentro da mesma aplicação (por exemplo, `src/components/easter-eggs/Forbidden.tsx:2–6`). | contexto |
| Documentação / Código-fonte (menções MFE) | `README.md:16`, `:204`, `:1172`: Module Federation como competência e foco profissional. `index.html:22`, `:31`, `:45`, `:68–69`: metadados SEO e JSON-LD (`knowsAbout`: “Module Federation”, “Micro Frontends”). `src/data/portfolio.ts:68–71`: experiência na Impressico; `:177–186`: projeto “Micro-Frontend Platform” descrito em texto (remotes Module Federation, Webpack 5); `:266–267`: “Micro Frontends” e “Module Federation” na lista de habilidades. `src/components/ui/MissionGraphic.tsx:62–66`: ilustração SVG com rótulo “HOST” para esse projeto. Tudo é conteúdo exibido, não configuração. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto `package-lock.json` e `README.md`, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie` e `registerApplication`: só os textos e a ilustração acima. Nenhum mecanismo de composição configurado. | ausente |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 3 commits (3 em todos os refs), nenhum merge:
- a raiz `e4b920f` (2026-08-21T17:12:55+05:30), de `adesh <ladadesh@gmail.com>`, adiciona todo o projeto em bloco;
- `c977feb` (2026-08-21T18:25:44+05:30), de `Adesh Lad <68003659+ladadesh@users.noreply.github.com>` com committer `GitHub`, altera só o README (edição pela interface web);
- o SHA `18a1726` (2026-08-21T18:54:59+05:30), de `adesh <ladadesh@gmail.com>`, ajusta `Hero.tsx`, `Whisper.tsx` e dois CSS.

A identidade é a do titular da conta, e o portfólio descreve a mesma pessoa (`index.html:12`, `:48`). `.claude/launch.json` indica uso de assistente de código; os metadados não separam autoria intelectual.

`git rev-list --objects $SHA --missing=print` lista 5 objetos ausentes, nenhum na árvore do SHA (versões anteriores dos arquivos alterados). Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend: uma SPA com um `index.html`, um entry (`src/main.tsx:11–15`) e um build (`package.json:8`; `vite.config.ts:5–7`). Nenhuma configuração de composição referencia unidades externas (busca registrada). |
| Q2 | No | Não há duas unidades a avaliar; todas as seções são importadas estaticamente pela mesma árvore (`src/App.tsx:13–31`). |
| Q3 | No | Não há host, shell nem root config que carregue unidades; o roteamento só alterna a página 404 (`src/App.tsx:69`, `:77–78`). |
| Q4 | No | Nenhum mecanismo de composição configurado; Module Federation e micro-frontends são texto de currículo (`README.md:16`; `src/data/portfolio.ts:177–186`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Corresponde a “repositories mentioning micro-frontends without implementing them” e a “conventional frontend monoliths”.
- Mesmo padrão dos perfis 011/064/068/073/077/101/111: micro-frontends como competência listada. Diferentemente desses perfis, que só têm README (`frontend_units: 0`), aqui há uma aplicação implementada, registrada como `frontend_units: 1` e `single-unit`, como no portfólio estático de 141 (rascunho).
- O projeto “Micro-Frontend Platform” é experiência profissional descrita, não código do repositório (`src/components/Projects.tsx:12–16`).
- `repo_type: other` (portfólio pessoal); `ui_technologies: [react]` e `build_tools: [vite]` pela configuração observada.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** além do README, o código-fonte contém “Module Federation”, “Micro Frontends” e uma ilustração com “HOST” (`src/data/portfolio.ts:177–186`, `:266–267`; `src/components/ui/MissionGraphic.tsx:62–66`; `index.html:68–69`). Buscas de código por esses termos dariam falso positivo, e o repositório passou na elegibilidade da rodada 002.
- **Protocolo (busca):** entrada só pela consulta de tecnologia `"module federation"` no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
