---
schema: 1
id: 1111710824
full_name: holon521/-AI-
url: https://github.com/holon521/-AI-
commit: 80b484c59142c072cacb93c44afc610c24394815
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

# 338 — holon521/-AI-

## Contexto

“ZIA: Holon World”, uma SPA React + Vite que funciona como agente de IA no navegador (Gemini), com memória, agentes e integração com Google Drive (`README.md:1–15`). Os “micro-apps” do README são HTML/JS gerado pelo modelo em tempo de execução e exibido num `<iframe srcDoc>` com sandbox (`README.md:43`; `components/features/ArtifactCanvas.tsx:113–121`). O repositório traz ainda uma cópia de um projeto Python (`muvera-py-master/`), documentos de especificação e uma pasta de arquivos descartados (`z99_delet_folder/`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:339` registra rank 338, ID 1111710824, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:339` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:21894` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:21900` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um único hit em cada rodada. Ele vem do endpoint `repositories`, consulta `broader-micro-apps` (`"micro apps" frontend in:name,description,readme`), subconsulta `…#created:2025-Q4`, com `path` vazio. As coletas são 2026-10-07T23:49:08.888Z (001) e 2026-10-08T16:26:54.278Z (002). A consulta efetiva acrescenta `pushed:>=2025-04-01 created:2025-10-01..2025-12-31`.

Metadados do hit:
- descrição em coreano sobre os objetivos do projeto, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 2.206;
- criação em 2025-12-07T13:48:04Z, push em 2025-12-12T21:44:37Z.

Grafias no README:
- “micro-apps”: `README.md:43` (“ZIA can generate, render, and execute its own HTML/JS micro-apps (`ArtifactCanvas`) within a secure iframe…”), com hífen; a forma literal “micro apps” não aparece;
- “Frontend”: `README.md:120` (“**Frontend:** React 18, TypeScript, Tailwind CSS”).

A última alteração do README é `c1ead68` (2025-12-12), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 82 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há uma única SPA na raiz (`index.html`, `index.tsx`, `components/`, `hooks/`, `vite.config.ts`, `package.json`), módulos TS de lógica (`00_HQ`…`04_NERVES`), `specs/`, documentos de submissão, `muvera-py-master/` (Python) e `z99_delet_folder/`. | contrária |
| Frontend | `vite.config.ts:1–23`: só `@vitejs/plugin-react`. `index.html:59–68`: import map que aponta `react`, `react-dom` e `@google/genai` para a CDN do AI Studio, e `:73`: um único entry `index.tsx`. O import map resolve dependências, não unidades frontend. | contrária |
| “Micro-apps” | `components/features/ArtifactCanvas.tsx:113–121`: `<iframe srcDoc={getSandboxedSrc(visualArtifact.html)} sandbox=…>`, com HTML gerado pelo LLM e uma ponte `postMessage` (`:28`, `50–52`). É conteúdo gerado em runtime, não uma unidade frontend do repositório. | contrária |
| Busca de mecanismos | `git grep` no SHA, fora de `muvera-py-master/`, por `micro.?app`, `federation`, `remoteEntry`, `single-spa`, `import-map` e `importmap`: só o “micro-app” do sandbox e o `importmap` de dependências. | ausente |

## Autoria e histórico

Clone não raso; 13 commits lineares, nenhum merge, todos de `holon521`, de 2025-12-07 (`b7b967a`, “Initial commit”, criado pelo GitHub) a 2025-12-13 (SHA `80b484c`, “feat: Implement landing view and initialization flow”). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; os “micro-apps” são HTML gerado em runtime e exibido em sandbox, não unidades do repositório. |
| Q2 | No | Sem duas unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz que componha unidades. |
| Q4 | No | Nenhum mecanismo de composição entre unidades; o iframe exibe conteúdo gerado e o import map resolve bibliotecas. |
| Q5 | No | Q1–Q4 são No: SPA convencional de IA. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”.
- Como em 075/081 (código frontend apenas gerado ou exibido), os “micro-apps” produzidos pelo modelo não contam como unidades. Mesmo enquadramento de 268, que entrou pela consulta `"micro apps" frontend` por uso não relacionado do termo.
- **Campos:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: other` (protótipo pessoal de competição, `README.md:7`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “micro-apps” para artefatos HTML gerados por LLM em iframe com sandbox, e “Frontend” noutra linha, casam a consulta ampla.
- **Protocolo (busca):** a forma literal “micro apps” não aparece. A elegibilidade muda de `unknown` (001) para `pass` (002).
