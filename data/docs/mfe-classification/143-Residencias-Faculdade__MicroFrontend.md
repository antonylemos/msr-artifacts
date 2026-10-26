---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
url: https://github.com/Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [web-components]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 143 — Residencias-Faculdade/MicroFrontend

## Contexto

Casca (“shell”) em Vite + TypeScript sem framework, com autenticação Keycloak, que lê um registro `public/microfrontends.json` e, em runtime, injeta o `main.js` de cada frontend externo e monta seu custom element (`README.md:1–3`; `README.md:28–30`; `src/main.ts:137–232`). O registro do SHA aponta para uma unidade externa, `member-manager`, implantada na Vercel por outra equipe (`public/microfrontends.json:1–8`). Só o host está no repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:144` registra rank 143, ID 1363110249, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede; a unidade externa não foi acessada.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:144` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:36985` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:36994` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos seis hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `technology-web-components-mfe-repositories`: `"web components" "micro frontends" in:readme` | sem partição | 2026-10-07T23:37:09.864Z / 2026-10-08T16:22:11.019Z |
| `technology-web-components-microfrontends-repositories`: `"web components" microfrontends in:readme` | sem partição | 2026-10-07T23:38:04.548Z / 2026-10-08T16:22:26.391Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-09` | 2026-10-07T22:42:26.531Z / 2026-10-08T16:02:06.454Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-09` | 2026-10-07T23:12:51.823Z / 2026-10-08T16:10:51.803Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-09` | 2026-10-07T22:03:36.641Z / 2026-10-08T15:44:00.702Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-09` | 2026-10-07T22:14:31.271Z / 2026-10-08T15:50:41.576Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01` e, nas terminológicas, `created:2026-09-01..2026-09-30`.

Metadados do hit:
- descrição “Casca orquestradora de Micro Frontends com Web Components. Vite + Nginx + Keycloak SSO, descoberta runtime por microfrontends.json, Shadow DOM isolado e deploy desacoplado sem rebuild da shell.”;
- sem tópicos, linguagem TypeScript, criação em 2026-09-09T19:02:57Z, push em 2026-09-30T19:44:25Z, homepage `micro-frontend-rho.vercel.app`.

Grafias no README:
- “Micro Frontends” e “Web Components”: `README.md:1`.
- “micro frontends”: `README.md:68` (“0 micro frontends disponíveis”).
- “microfrontends”, como token de `microfrontends.json`: `README.md:30`, `60` e `183`.
- “MICROFRONTEND” / “Microfrontend”, como token de nomes de arquivo: `README.md:172`, `212` e `213`.

A forma singular separada “micro frontend” não aparece no README nem na descrição; esse hit depende do processamento textual da busca do GitHub, que não está registrado. O README vem da raiz `c296e85` (2026-09-09) e não foi alterado depois, logo é anterior às coletas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 23 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há um único projeto Vite na raiz (`package.json`, `vite.config.ts`, `index.html`, `src/`, `public/`), `Dockerfile`, `Dockerfile.keycloak`, `docker-compose.yml`, `nginx.conf` e `keycloak/realm.json`. Nenhum frontend plugado está no repositório. Os documentos citados `CONEXAO-MICROFRONTEND.md`, `Requisitos-Microfrontend.md` e `Arquitetura-Visual.md` (`README.md:212–214`) não existem no inventário. | contexto |
| Configuração (registro) | `public/microfrontends.json:1–8`: entrada `{ "tag": "member-manager", "title": "Members CRUD", "url": "https://crud-member-manager.vercel.app/main.js" }`, com comentário “Projeto da equipe 2 (Member Manager)”. O exemplo do README (`posts-crud` em `localhost:4200`, `README.md:62–65`) foi removido no SHA (“fix: Exclusão do localhost project”). | forte |
| Código-fonte (composição) | `src/main.ts:138–175`: `fetch('/microfrontends.json')`; para cada entrada cria botão na sidebar e wrapper com `<${entry.tag}></${entry.tag}>`. `src/main.ts:179–215`: ao selecionar, chama `loadScript(entry.url, entry.tag)`. `src/main.ts:219–232`: se `customElements.get(tag)` ainda não existe, injeta `<script type="module" src=url>`. `index.html:24–33`: layout com `#sidebarNav` e `#microfrontends`. | forte |
| Documentação (contrato) | `README.md:89–106`: contrato obrigatório do frontend externo, com `main.js` estável que chama `customElements.define(tag, …)`, tag com hífen, CORS `*` e Shadow DOM. `README.md:153–174`: exemplos Angular/React/Vanilla e “frontend nunca `import` da casca”. `README.md:178–198`: plugar = adicionar entrada no JSON, sem rebuild da casca. | moderada |
| Código-fonte (fronteiras) | Imports de `src`: `src/main.ts:5` (`keycloak-js`) e `src/main.ts:16` (`./components/loader/box-loader`); `src/components/ui/box-loader.tsx:2` importa `./3d-box-loader-animation`. Nenhum `../` e nenhum código da unidade externa; a ligação é só pela URL e pela tag. Os componentes React em `src/components/ui/*.tsx` não são importados por `main.ts`. | contexto |
| Build/deploy | `package.json:6–10`: `vite`/`tsc && vite build` do host. `Dockerfile:1–18` e `nginx.conf:1–26` servem a casca. `docker-compose.yml:17–30` prevê o serviço `posts-crud` com contexto `../Caio/aprendendo/primeiro-projeto`, fora do repositório. `keycloak/realm.json:30–37` registra redirect URIs para 3000/4200–4202 e `https://micro-frontend-rho.vercel.app/*`. A unidade `member-manager` tem deploy próprio na Vercel (URL do registro). | moderada |
| Tecnologia | Lockfile: `keycloak-js` 26.2.4, `vite` 6.4.3 e `react` 19.2.8 (`package-lock.json:1500–1501`, `1769–1770`, `1604–1605`). React/`@vitejs/plugin-react` são declarados (`package.json:11–22`; `vite.config.ts:2`, `6`), mas o shell executado é TypeScript sem framework (`src/main.ts`). | contexto |

## Autoria e histórico

Clone não raso; 11 commits, nenhum merge, todos de `exdrama23 <alecviniciusflamengo@gmail.com>`. A raiz `c296e85` (2026-09-09, “feat: NGX shell + posts-crud + docs”) adiciona toda a casca. Os demais commits, de 2026-09-30, ajustam dependências, deploy do Keycloak no Render e o registro. Destes, `d48027b` (“registra member-manager da equipe 2 na shell”) e o SHA `5726e54` (“Exclusão do localhost project”) alteram `public/microfrontends.json` (`git log --no-renames --name-status`). A mensagem de `08f2381` menciona “modificação do opencode”, ferramenta de assistência; os metadados não permitem separar autoria intelectual. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades: o host (`index.html:34`; `src/main.ts`) e a unidade externa `member-manager`, explicitamente referenciada pela configuração de composição (`public/microfrontends.json:4–6`), como permite o critério para unidades externas. |
| Q2 | Yes | A unidade externa é implantada separadamente (URL própria na Vercel, `public/microfrontends.json:6`) e não há import de código entre host e unidade; a ligação é só por URL e tag (`src/main.ts:219–232`). |
| Q3 | Yes | O host carrega e monta a unidade na sua página (`src/main.ts:146–175`, `179–215`). |
| Q4 | Yes | Mecanismo configurado e usado: registro declarativo, injeção de `<script type="module">` e montagem do custom element (`public/microfrontends.json:1–8`; `src/main.ts:138–232`). |
| Q5 | Yes | Q1–Q4 são Yes: host que compõe em runtime uma unidade externa por Web Components. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “repositories containing only the host, which references external remote units”, como 008, 040 e 087 (finais ou propostos), e ao padrão de 043/049, com Web Components carregados de outra origem em runtime.
- Não é “component library using Web Components”: o host não define componentes, só carrega aplicações externas registradas por URL. Não é plataforma de terceiros (074/080/102): a casca e o contrato são do próprio repositório.
- `approaches: [web-components]`, por montagem de custom elements definidos pelo bundle externo, carregados por `<script type="module">`, como em 043. `frontend_units: 2` (host + `member-manager`), `unit_organization: multi-repo`. `build_tools: [vite]` (`vite.config.ts:1–14`). `ui_technologies: [react]`: React, ReactDOM e o plugin React são dependências declaradas do host, embora o loader executado não importe os componentes `.tsx`.
- `repo_type: example`: atividade acadêmica entre equipes (`package.json:2`: `atividadengx-shell`; registro “equipe 2”), com demo publicada (homepage na Vercel).
- Não há decisão aberta: a composição é por script e custom element em runtime, sem iframe, links entre aplicações ou pacotes em build time.

## Notas para análise

- **RQ2:** composição por registro JSON em runtime e injeção de script ESM que define custom elements, com contrato documentado para frontends Angular/React/Vanilla externos (`README.md:89–174`).
- **RQ3:** o host não contém nenhuma unidade plugada. A relação depende de URL externa e de documentos ausentes do repositório (`README.md:212–214`). A existência e o comportamento de `crud-member-manager.vercel.app/main.js` não foram verificados (sem rede).
- **Protocolo (busca):** seis consultas casam, inclusive as duas de Web Components + micro-frontends em `in:readme`. O hit singular `"micro frontend"` não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, duas unidades, `multi-repo`, `web-components` e `vite`; sem decisão aberta. Confirmado que o registro vigente (`public/microfrontends.json:1–8`) tem uma única entrada (`member-manager`, URL de deploy externo) e que `src/main.ts:137–232` faz `fetch` do registro, cria a tag e injeta `<script type="module">`; o conteúdo remoto não foi aberto. `docker-compose.yml:17–30` descreve um serviço `posts-crud` fora do registro vigente, não somado como unidade; `README.md:62–65` mostra uma entrada antiga que não é a configuração do SHA. `ui_technologies: [react]` registra as dependências React declaradas; os componentes React de `src/components/ui/*.tsx` não entram no grafo importado por `src/main.ts`. A consulta singular `"micro frontend"` não casa literalmente com o README nem com a descrição, o que depende do processamento textual da busca; o README (`c296e85`, 2026-09-09) é anterior às buscas. `repo_type: example` é razoável pelo nome do pacote (`atividadengx-shell`) e pelo comentário de equipe, embora o README o apresente como biblioteca de casca. Comparáveis finais: 008, 040, 087 (host com remotos externos), com 043 e 049 para a montagem de Web Components.
