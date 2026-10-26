---
schema: 1
id: 1048736095
full_name: lucasspanholo/micro-frontend-whale
url: https://github.com/lucasspanholo/micro-frontend-whale
commit: b4decbb258cbc5108da343c2f757678dc232b1e0
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

# 220 — lucasspanholo/micro-frontend-whale

## Contexto

Uma única aplicação React/Vite, “Gerenciador de Criptomoedas”, na pasta `Gerenciador de Criptomoedas/`, exportada do Figma Make. O README interno diz “This is a code bundle for Gerenciador de Criptomoedas. The original project is available at https://www.figma.com/design/…” (`Gerenciador de Criptomoedas/README.md:2–4`), e `src/Attributions.md:1` diz “This Figma Make file includes components from shadcn/ui”. A aplicação alterna duas páginas (mercado e portfólio) por estado (`src/App.tsx:8–23`) com dados fictícios.

O `README.md` da raiz tem uma só linha, `# micro-frontend-whale` (`README.md:1`), que repete o nome do repositório. Nenhum outro arquivo menciona micro-frontends. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:221` registra rank 220, ID 1048736095, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:221` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:18323` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:18328` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-09` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:25:35.331Z / 2026-10-08T15:55:44.505Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:56:44.152Z / 2026-10-08T16:06:40.848Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-09-01..2025-09-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 73;
- criação em 2025-09-02T00:18:41Z, push em 2025-09-02T00:28:33Z.

O acerto vem do nome do repositório e do título do README, `README.md:1`, “# micro-frontend-whale”, que é o nome repetido. A busca de frase trata o hífen como separador. O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O `README.md` da raiz vem do commit-raiz `b7f499c` (2025-09-01) e não foi alterado depois. É anterior às coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 75 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Na raiz só há `README.md`. Há um único projeto em `Gerenciador de Criptomoedas/` (`index.html`, `package.json`, `vite.config.ts`, `src/` com 11 componentes de domínio, 48 arquivos shadcn/ui em `src/components/ui/`, dados fictícios e estilos), mais dois `.DS_Store`. | contrária |
| Código-fonte | `Gerenciador de Criptomoedas/src/App.tsx:1–23`: componente raiz com imports estáticos e troca de página por `useState`. `src/main.tsx:2–6`: `createRoot(...).render(<App />)`. | contrária |
| Configuração / Build | `Gerenciador de Criptomoedas/vite.config.ts:2–7`: só `@vitejs/plugin-react-swc` e aliases de versões. `package.json:6–45`: Radix UI, React e afins, sem dependência de composição. | contrária |
| Busca | `git grep -i` no SHA por `micro.?front`, `federation`, `single.?spa` e `remoteEntry`: só `README.md:1`. | ausente |

## Autoria e histórico

Clone não raso; 2 commits, nenhum merge, de lucas.spanholo `<lucasspanholo@gmail.com>`, em 2025-09-01 (-03:00): `b7f499c` (“first commit”, só `README.md`) e o SHA `b4decbb` (“add project”, os 74 arquivos da aplicação). Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; nenhuma configuração referencia outra unidade. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades; as páginas são componentes locais (`src/App.tsx:18`). |
| Q4 | No | Nenhum mecanismo de composição (`vite.config.ts:2–7`; busca registrada). |
| Q5 | No | Q1–Q4 são No: aplicação única gerada pelo Figma Make, num repositório cujo título repete o nome. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”.
- O código veio de um gerador (Figma Make), como os casos de gerador 075/081/094/105. A classificação, porém, decorre de não haver composição.
- O único sinal de micro-frontend é o título do README, igual ao nome do repositório.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: other`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** título de README que repete o nome do repositório casa as consultas terminológicas, sem nenhum outro uso do termo.
- **Protocolo (busca):** o hit plural `"micro frontends"` não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
