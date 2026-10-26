---
schema: 1
id: 571288769
full_name: openmfe/demo-microfrontend
url: https://github.com/openmfe/demo-microfrontend
commit: 5cfca8d8d3fa2e5fbfb4e01ed23db80df22e5804
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [web-components]
ui_technologies: []
build_tools: [rollup]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 184 — openmfe/demo-microfrontend

## Contexto

“MFE Demo” (`README.md:1–3`): microfrontend de demonstração segundo a especificação OpenMFE. O frontend é um custom element `<hotel-offers>` em JavaScript puro com Shadow DOM, empacotado como IIFE pelo Rollup. Ele vem acompanhado de um manifesto OpenMFE (`frontend/src/openmfe/manifest.yaml`) que descreve tag, atributos, eventos e URLs de pré-renderização e semântica, servidas por um backend Express. A descrição do repositório o apresenta como demo e “boilerplate for new projects”. O host que incorporaria o elemento não está no repositório; `frontend/src/index.html` é só página de pré-visualização (“This is just a preview file”, `index.html:4–6`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:185` registra rank 184, ID 571288769, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:185` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:5199` e `data/discovery/mfe-round-002/candidates.csv:5204`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2022-11` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:21:42.189Z / 2026-10-08T15:36:19.819Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:05:51.315Z / 2026-10-08T15:45:56.552Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2022-11-01..2022-11-30`.

Metadados do hit:
- descrição “A demo microfrontend, used to show common patterns and as a boilerplate for new projects.”;
- sem tópicos, linguagem JavaScript, `fork: false`, tamanho 197;
- criação em 2022-11-27T18:53:12Z, push em 2026-05-31T13:36:32Z.

Grafias:
- “microfrontend”: `README.md:3` (“This is a demo of a microfrontend…”) e a descrição;
- “microfrontends”: o plural não aparece no README nem na descrição; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `914da7f` (2022-03-24), muito anterior às coletas. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 27 entradas, 25 arquivos regulares `100644` e 2 executáveis `100755` (`.env`, `dev.sh`); zero symlinks e zero gitlinks. Há `frontend/` (Rollup, `src/main.js`, `src/openmfe/`, fontes) e `backend/` (Express com `runtime`, `prerender` e `semantic`, e um cache JSON). | contexto |
| Código-fonte (unidade) | `frontend/src/main.js:1–17`, `161`: classe `HotelOffers extends HTMLElement` com Shadow DOM, `observedAttributes` `region` e `customElements.define('hotel-offers', HotelOffers)`. `:111–116`: busca dados em `__BACKEND_URL__/api`. `:131–136`: emite `CustomEvent` (`hotel-offers.add-to-wishlist`, `openmfe.analytics`). | forte |
| Configuração (manifesto OpenMFE) | `frontend/src/openmfe/manifest.yaml:1–80`: `version` da especificação, `tag: hotel-offers`, `url.frontend: ../main.js`, `url.prerender`/`url.semantic`, atributos com schema, eventos com schema e exemplos. É o contrato declarado para hosts externos. `frontend/rollup.config.js:30–46`: copia o manifesto para `dist/openmfe` substituindo as URLs. | forte |
| Build/deploy | `frontend/rollup.config.js:6–11`: saída `dist/main.js` em formato IIFE. `frontend/package.json:8–14`: `rollup`, `browser-sync`/`serve` na porta `MFE_FRONTEND_PORT`. `frontend/serve.json:1–9`: CORS `*` para ser carregado por outras origens. `backend/src/index.js:1–33`: servidor dos endpoints `api`, `prerender` e `semantic`. | moderada |
| Código-fonte (host) | `frontend/src/index.html:4–6`, `27–39`: página de pré-visualização que insere `<hotel-offers region="1197">`, carrega `/main.js` e escuta os eventos. Ela se declara arquivo de desenvolvimento, não host de composição. | contexto |
| Código-fonte (fronteiras) | `frontend/src/main.js` não importa outros módulos; a ligação com o backend é por HTTP. Não há imports `../` entre `frontend` e `backend`. | contexto |

## Autoria e histórico

Clone não raso; 13 commits, nenhum merge, todos de Alexander Günsche (`git@lxg.de` 12, `lxg@amazon.com` 1). O desenvolvimento vai de 2022-02-02 (`f0320f5`, “initial commit”) a 2022-07-28 (`0f4b12f`, “add ISC license”). O SHA `5cfca8d` (2026-05-31, “Modernise build deps for current Node (20+)”) só altera `package.json`, `package-lock.json` e `rollup.config.js` (`git diff-tree`) e mantém o `pushed_at` recente. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (`<hotel-offers>`); o manifesto descreve a própria unidade e não referencia outras. O backend não é unidade frontend. |
| Q2 | Yes (para a unidade) | Entrada e build próprios que geram `dist/main.js` (`rollup.config.js:6–11`), servidos com CORS para outras origens (`serve.json`). |
| Q3 | Undetermined | O host que incorporaria o elemento não está no repositório; `index.html` é só pré-visualização (`index.html:4–6`). |
| Q4 | Undetermined | O lado da unidade está preparado (custom element mais manifesto OpenMFE); o consumidor não é observável. |
| Q5 | No | Há uma unidade preparada para composição por host externo, não uma instância de MFE no repositório. |

## Motivo

- `MFE-unit` pela exceção do checklist: “a single frontend unit explicitly prepared to be composed by an external host…, but the composing host is not observable”. Corresponde a “repositories containing only a remote unit, without the composing host”.
- O padrão é o do final 004, em que a preparação é um custom element com Shadow DOM e entrada estável para o shell. Aqui a preparação é ainda mais explícita: há um manifesto padronizado (OpenMFE) com contrato de atributos e eventos.
- Não é “component library using Web Components”: é uma unidade de domínio (ofertas de hotel) com backend próprio e contrato de integração, não uma biblioteca de componentes. Não há plataforma de terceiros como único host (102/074/080, 037): a especificação OpenMFE é aberta e o host é qualquer aplicação.
- `approaches: [web-components]`, `ui_technologies: []` (custom element em JavaScript puro), `build_tools: [rollup]`, `frontend_units: 1`, `unit_organization: single-unit`. `repo_type: example` (“demo”, `README.md:3`); como a descrição também diz “boilerplate”, `template` seria defensável.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** micro-frontend por Web Components com manifesto declarativo OpenMFE (atributos, eventos com JSON Schema, pré-renderização e endpoint semântico) e eventos `CustomEvent` para o host, inclusive o canal `openmfe.analytics`.
- **RQ3:** a unidade inclui backend próprio (dados, pré-render HTML, semântica); o contrato com o host é inteiramente declarativo.
- **Protocolo (busca/elegibilidade):** o hit plural `microfrontends` não tem grafia literal. Elegibilidade `pass` nas duas rodadas, com o `pushed_at` mantido por uma atualização de dependências em 2026.
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-unit e Q1 No, Q2 Yes, Q3/Q4 Undetermined, Q5 No; sem incerteza arquitetural aberta (`draft`). A unidade é um custom element com Shadow DOM, build Rollup independente, manifesto OpenMFE e configuração de CORS; o `index.html` é uma prévia de desenvolvimento e não demonstra host. Divergência de metadado, sem efeito na classe: a revisora recomenda `repo_type: template` em vez de `example`, porque a descrição registrada na busca diz que o repositório serve também "as a boilerplate for new projects", enquanto o README o chama de demo (`README.md:1–3`). Os finais distinguem boilerplate genérico (014) e template de widgets (051), ambos `template`, de uma demo de custom element (004), `example`. Mantido `example` (demo executável), e a alternativa `template` é escolha de taxonomia a validar pelo pesquisador, junto com a harmonização pendente de `repo_type`.
