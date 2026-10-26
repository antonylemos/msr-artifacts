---
schema: 1
id: 808731653
full_name: dynamic-framework/dynamic-business-team-members-template
url: https://github.com/dynamic-framework/dynamic-business-team-members-template
commit: dc47b11d17f7b48c20539ec4c1e6092aeb866fc6
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 153 — dynamic-framework/dynamic-business-team-members-template

## Contexto

Template de widget “Team members” para a plataforma Modyo, um CMS e plataforma digital comercial de terceiros, construído com o design system `@dynamic-framework/ui-react`. Instala-se por `npx @modyo/cli@latest get …` (`README.md:8–15`) e publica-se no site Modyo por `@modyo/cli push --publish` (`package.json:84–86`; `README.md:23–50`). O bundle é uma aplicação React comum que se monta no elemento `#teamMembers` (`src/index.tsx:27`). Ela lê variáveis Liquid que a plataforma resolve na página (`src/config/widgetConfig.ts:4–23`). Não há host, `exposes`, lifecycles nem custom element. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:154` registra rank 153, ID 808731653, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:154` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:8664` e `data/discovery/mfe-round-002/candidates.csv:8670`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2024-05` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:24:26.868Z / 2026-10-08T15:36:57.317Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:06:27.976Z / 2026-10-08T15:46:35.370Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:19:06.663Z / 2026-10-08T15:53:16.104Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:50:06.381Z / 2026-10-08T16:04:55.845Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2024-05-01..2024-05-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, `is_template: false`, tamanho 1.606;
- criação em 2024-05-31T17:37:37Z, push em 2025-12-22T07:26:49Z.

Sem descrição, o acerto vem do README:
- “micro frontend”: `README.md:32` e `README.md:42`, em comentários do bloco de `.env`;
- “Micro Frontend”: `README.md:45`;
- “microfrontends”: `README.md:53`.

As grafias “microfrontend”, no singular junto, e “micro frontends”, no plural separado, não aparecem no README. Esses dois hits dependem do processamento textual da busca do GitHub, que não está registrado, como em 143/149/150.

A última alteração do README é `0f5e566` (2024-05-31), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 117 entradas, 116 arquivos regulares `100644` e 1 executável `100755` (`.husky/commit-msg`); zero symlinks e zero gitlinks. Há um único projeto webpack na raiz (`.config/webpack.js`, `public/index.html`, `src/`), sem segundo frontend nem host. | contexto |
| Build | `package.json:78`, `87`: `webpack build`/`webpack serve` com `.config/webpack.js`. `.config/webpack.js:44`: entrada única `src/index.tsx`. `.config/getOutput.js:3–21`: saída `build/[name].js`, sem `library` nem formato de módulo. `.config/getPlugins.js:7–62`: HTML, CSS e `asset-manifest.json`, sem `ModuleFederationPlugin`. | contrária |
| Código-fonte (montagem) | `src/index.tsx:27–49`: `createRoot(document.getElementById('teamMembers'))` e `render` imediato. `public/index.html:35`: `<div id="teamMembers">`. `README.md:17–21`: o id raiz deve ser único no site. Não há `mount`/`unmount`, `customElements.define` nem export para um host. | contrária |
| Configuração (plataforma) | `src/config/widgetConfig.ts:4–23`: variáveis `{{site.*}}`/`{{vars.*}}` resolvidas pelo Liquid da página Modyo. `src/config/liquidConfig.ts:5–9` e `src/config/liquid.json:1–16`: só em desenvolvimento os valores vêm do JSON local e do `liquidjs`. `.env.example:9–29` e `README.md:26–50`: conta, site, token e `WIDGET_NAME` para o `push` à Modyo. `.config/webpack.js:27–31`: `allowedHosts` inclui `.modyo.cloud` para o preview da CLI. | moderada |
| Documentação / licença | `README.md:32`, `42`, `45`, `53` chamam o widget de “micro frontend”. `LICENSE.md:1–3`: acordo de licença Modyo. `LICENSE.md:43`, `95`: “Micro Frontend or Widget Software” e “Micro Frontend Template Software” como produtos Modyo. | fraca |
| Código-fonte (fronteiras) / busca | Os imports relativos ficam dentro de `src`, por exemplo `src/config/widgetConfig.ts:1–2`. A busca por `../../../` em `src` não retorna nada. `git grep -i` no SHA (exceto `package-lock.json`) por `micro.?front`, `federation`, `single-spa`, `customElements`, `registerApplication` e `exposes` só acha texto em `README.md`, `.env.example` e `LICENSE.md`. | ausente |
| Tecnologia | `package.json:5–21`: React ^18.3.1, `@dynamic-framework/ui-react` ^1.36.2, Redux Toolkit, Formik, `liquidjs`. `package.json:72–75`: `webpack` ^5.89.0 e `webpack-dev-server` ^5.2.2. | contexto |

## Autoria e histórico

Clone não raso.
- **Commits alcançáveis a partir do SHA:** 21, dos quais 4 são merges de PR; 25 em todos os refs.
- **Autores:** Eduard Baron, com `@modyo.com` e noreply, 9 commits e autor da raiz `2652330` (2024-05-31, “Initial commit”) e da base do widget `0f5e566`. Também Johann Felipe Rojas (7), Luis Nazarit (3), Abê (1) e `dependabot[bot]` (1). Vários usam e-mail `@modyo.com`: é um template mantido pela própria Modyo.
- **Workflows:** usam workflows reutilizáveis da organização (`.github/workflows/use-build-catalog.yml:9–11`, `use-build-demo.yml:9–11`, `use-checks.yml:10–12`).
- **Refs fora do snapshot:** `build/dynamic-catalog`, `build/dynamic-demo`, `feat/template`, `chore/*` e `dependabot/*` (com `c14c49d`, 2025-12-22) não foram considerados.

Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e há blobs históricos indisponíveis sem rede (a revisora contou 125 objetos faltantes por `git rev-list --objects --missing=print`); com `GIT_NO_LAZY_FETCH=1`, `git log --name-status` falha em `src` e `.github`. O snapshot do SHA foi lido integralmente, mas o histórico por pasta é incompleto e não se afirma completude em `src`.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend, sem configuração de composição que referencie outras unidades. |
| Q2 | Yes (para a unidade) | Entrada e build próprios (`.config/webpack.js:44`; `package.json:78`), publicados separadamente na plataforma (`package.json:86`). |
| Q3 | Undetermined | A página Modyo que inseriria o widget não está no repositório. Só o id único e as variáveis Liquid indicam convivência com outros widgets (`README.md:21`; `src/config/widgetConfig.ts:4–23`). |
| Q4 | Undetermined | O mecanismo de inserção é o da plataforma Modyo, não observável. No repositório há só o bundle autônomo e o `push` da CLI. |
| Q5 | No | A unidade só se destina ao mecanismo de widgets de uma plataforma de terceiros; não há instância de MFE no repositório. |

## Motivo

- Proposta `Non-MFE`, com `status: review`. É o mesmo vetor e o mesmo raciocínio do final 037 (ioBroker Admin): a unidade tem como único host uma plataforma de terceiros, e o mecanismo é o de extensão dessa plataforma. A decisão dos pesquisadores em 037 foi `Non-MFE`, apesar da leitura literal `MFE-unit`.
- Aqui a preparação para o host é mais fraca que em 037 e nos MFE-unit finais 001/004/050/058/069. Não há `exposes`, lifecycles single-spa nem custom element; só um bundle que se monta em um `div` com id fixo e lê variáveis Liquid. Por isso a exceção “explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`, exported single-spa lifecycles)” também não se encaixa diretamente.
- A questão de terceiros (102/074/080) é a mesma: a composição real acontece na plataforma Modyo. O caráter de template distribuído pela CLI da plataforma aproxima-se dos casos de gerador e template (075/081/094/105).
- `repo_type: template` (`README.md:8–21`; `LICENSE.md:95`), embora os metadados registrem `is_template: false`. `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, conforme a convenção de Non-MFE.

## Notas para análise

- **RQ1 (sinais enganosos):** “micro frontend” é o nome comercial que a plataforma dá aos widgets (`README.md:32–45`; `LICENSE.md:43`, `95`). O vocabulário MFE vem do produto, não de um mecanismo de composição no repositório.
- **RQ2:** composição por CMS (widget inserido em página, configuração por Liquid, deploy por CLI da plataforma), fora do repositório.
- **Protocolo (amostra):** outros templates de widget da mesma plataforma podem estar na amostra (não verificado) e devem ser tratados de forma consistente.
- **Protocolo (busca):** quatro consultas terminológicas, duas sem grafia literal correspondente. Elegibilidade `pass` nas duas rodadas.

## Ponto para revisão conjunta

Decidir se um widget de plataforma CMS de terceiros (Modyo), sem mecanismo MFE próprio no repositório, segue o precedente 037.

- **Non-MFE (proposto):** segue 037, em que o único host é o mecanismo de extensão de uma plataforma de terceiros. Além disso, não há preparação explícita do tipo exemplificado na exceção MFE-unit.
- **MFE-unit:** o widget é uma unidade com build e deploy próprios, preparada para convivência na página (id único, variáveis Liquid) e descrita como “micro frontend” pela plataforma. Se o mecanismo de widgets Modyo for aceito como composição, ficaria `MFE-unit` com `approaches` a nomear, por exemplo `runtime-script`, como em 002.

Não se propõe regra nova. Até a decisão, preservar `Non-MFE`/`review`.

A decisão aberta é o alcance da regra de plataforma de terceiros (037, 010, 035, 022) para widgets CMS/CLI Modyo sem configuração visível do host; a política para plugins de plataforma já foi decidida nesses precedentes. Se o pesquisador entender que esta família está coberta por eles, o registro pode ser promovido a `final` como `Non-MFE`.
- **Contribuição da revisão independente (Lupa):** concordância com Non-MFE e `review`. Correção adotada: a afirmação de que não faltavam objetos históricos foi retirada (ver autoria). Suporte para Q4: `README.md:23–50` e `package.json:84–86` mostram preparação e publicação como widget Modyo, mas a página host não está no repositório; para o override de Q5: `README.md:8–21,23–50`, `LICENSE.md:43,95` e as decisões 037, 035 e 010 (regra de plataforma de terceiros). O contraste útil é o final 002, que tem duas unidades, script injetado pelo host, contrato `mount`/`unmount` e ligação de deploy, evidências ausentes aqui. `repo_type: template` descreve o artefato e não contradiz `is_template: false` do GitHub, que é outra propriedade.
