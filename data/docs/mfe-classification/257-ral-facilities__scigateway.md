---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
url: https://github.com/ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [single-spa]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 257 — ral-facilities/scigateway

## Contexto

SciGateway, “a ReactJs based parent application within a micro-front end architecture” (`README.md:5–7`), é a aplicação-mãe de um conjunto de plugins para acesso a dados e computação de grandes instalações científicas. É uma aplicação React + Vite com autenticação, notificações, páginas de administração e ajuda.

Os plugins não ficam neste repositório. São declarados num `settings.json` de runtime (lista `plugins` com `name`, `src`, `enable`), carregados por `<script>` e registrados no single-spa com rota ativada pelo próprio plugin (`src/state/actions/loadMicroFrontends.tsx:7–85`). O repositório inclui, para testes e2e, o build do plugin de demonstração (`server/e2e-plugin/main.js`), que o README do servidor diz ser o artefato de outro repositório da organização (`server/README.md`). O nome do repositório e o da organização não são usados como evidência.

`data/samples/mfe-sample-001/clones.csv:258` registra rank 257, ID 175218500, status `cloned`, branch `develop` e o commit do front matter, que é o HEAD do clone e de `origin/develop`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:258` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:458` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:458` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, ambos do endpoint `code`:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-package-code`: `"single-spa" filename:package.json` | `…#size:4000..5999` | `package.json` | 2026-10-07T22:21:12.074Z / 2026-10-08T16:03:41.991Z |
| `technology-single-spa-register-code`: `registerApplication singleSpa` | `…#size:2000..2999` | `src/state/actions/loadMicroFrontends.tsx` | 2026-10-07T22:42:13.781Z / 2026-10-08T16:20:51.190Z |

Os arquivos têm 4.656 e 2.873 bytes no SHA. `package.json:50` declara `"single-spa": "6.0.3"`, e `loadMicroFrontends.tsx:2`, `31` importa o single-spa e chama `singleSpa.registerApplication`. Os metadados do hit de código trazem só a descrição, “SciGateway is the parent application for several plugins providing access to data and compute tools for large Science Facilities”. A entrada é só por código.

Nas duas rodadas, a mesma organização tem outros candidatos, entre eles `ral-facilities/scigateway-demo-plugin`, `datagateway`, `operationsgateway` e `inventory-management-system` (`data/discovery/mfe-round-002/candidates.csv`). Só este está na amostra (`sample.csv:258`); os demais não foram inspecionados.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 203 entradas, 199 arquivos regulares `100644` e 4 executáveis `100755` (`.yarn/releases/yarn-4.16.0.cjs`, `docker/docker-entrypoint.sh` e dois SVGs de logotipo); zero symlinks e zero gitlinks. Uma única aplicação Vite (`index.html`, `src/`, `vite.config.ts`), mais `server/` (servidores de teste e plugin e2e), `micro-frontend-tools/`, `cypress/`, `docker/`, `demos/` e workflows. | contexto |
| Mecanismo de composição | `src/state/actions/loadMicroFrontends.tsx:7–17`: injeta `<script src=url>`. `:19–23`: lê o plugin de `window[name]`. `:27–50`: `singleSpa.registerApplication(name, () => loadReactApp(name), activeWhen)`, com rotas registradas pelo plugin (`singleSpaPluginRoutes`; `src/state/reducers/scigateway.reducer.tsx:140–144`). `:52–85`: carrega todos os plugins habilitados e notifica falhas. | forte |
| Configuração (unidades referenciadas) | `src/state/actions/scigateway.actions.tsx:361–365`: chama `loadMicroFrontends.init(settings.plugins)`. `public/settings.example.json:15–22`: `demo_plugin` em `http://localhost:5001/main.js`, `enable: false`. `server/e2e-settings.json:7–14`: o mesmo `demo_plugin` em `/plugins/e2e-plugin/main.js`, `enable: true`, servido por `server/e2e-test-server.js` (`/settings.json` e `/plugins/*`). Os `settings.json` reais ficam fora do Git (`.gitignore:34–35`). | forte |
| Unidade externa | `server/e2e-plugin/main.js` (49.578 bytes): bundle UMD que define `demo_plugin` no global e expõe `bootstrap`/`mount`/`unmount`. `server/README.md`: “simply the build artifacts from the demo plugin (https://github.com/ral-facilities/scigateway-demo-plugin)”, copiados do build daquele repositório. | forte |
| Ferramentas | `micro-frontend-tools/serve-plugins.js:1–30` (localização de settings) e `:37–59` (início do servidor do plugin) e `micro-frontend-tools/dev-plugin-settings.example.json:1–14` (o arquivo não está na raiz): script de desenvolvimento para servir builds de plugins locais em portas próprias. | moderada |
| Código-fonte (fronteiras) | O host só conhece os plugins por URL e nome global; não há import de código de plugin no `src/`. O plugin e2e é artefato compilado, não fonte. | contexto |

## Autoria e histórico

Clone não raso; `HEAD` tem 2.957 commits e 1.095 merges, desde 2019-03-12 (`fcc61a6`, “Initial commit”). Os maiores autores são Louise Davies (855), bots de dependências (renovate 329, dependabot-preview 315, dependabot 145), Joel Davies (276), Viktor Bozhinov (181) e Sam Glendenning (143). O SHA `fadb600` (2026-10-07, merge de PR do Dependabot) é o HEAD de `develop`, o branch padrão; há outros 62 branches remotos, não considerados. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e `git rev-list --objects $SHA --missing=print` enumera 5.996 objetos históricos ausentes; os arquivos atuais necessários foram legíveis e não houve tentativa de fetch.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | O host e uma unidade externa referenciada pela configuração de composição (`demo_plugin` em `public/settings.example.json:15–22` e `server/e2e-settings.json:7–14`). |
| Q2 | Yes | O plugin é construído e versionado em outro repositório e servido separadamente; o host só o carrega por URL. |
| Q3 | Yes | O host registra e ativa os plugins por rota no single-spa (`loadMicroFrontends.tsx:31–49`). |
| Q4 | Yes | single-spa com carga por `<script>` e registro via `registerApplication`, alimentado pela lista `plugins` do `settings.json` e exercitado pelo servidor e2e. |
| Q5 | Yes | Q1–Q4 são Yes: aplicação-mãe que compõe plugins externos em runtime. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso “repositories containing only the host, which references external remote units”, como 087 (host single-spa com remoto externo carregado por script).
- A URL das unidades vem de um arquivo de configuração de runtime, mas, diferentemente de 145 (variável indefinida), o snapshot traz configurações concretas: o exemplo com `demo_plugin` e a configuração e2e, que habilita o plugin e o serve. A organização mantém esses plugins em repositórios próprios; não é plataforma de terceiros (102/074/080).
- `approaches: [single-spa]` (o single-spa gere o ciclo de vida; a carga é por `<script>` UMD). `ui_technologies: [react]`, `build_tools: [vite]`. `frontend_units: 2` (o host e o plugin referenciado), `unit_organization: multi-repo`. `repo_type: production`: projeto institucional com CI, Docker, Jenkins e changelog.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** host React que lê a lista de micro-frontends de `settings.json` em runtime, carrega bundles UMD por `<script>` e delega ativação por rota a single-spa, com os próprios plugins registrando suas rotas por evento.
- **Protocolo (amostra):** outros repositórios da mesma arquitetura (plugins da organização) estão nas rodadas, fora da amostra.
- **Protocolo (busca):** entrada só por busca de código. A elegibilidade muda de `unknown` (001) para `pass` (002). O branch padrão é `develop`.
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `single-spa`, React/Vite, duas unidades no sentido operacional de Q1, `multi-repo` e `production`; sem decisão aberta (`draft`). O host tem consumidor real, configuração e2e habilitada, bundle remoto acessível na árvore (`server/e2e-plugin/main.js`, arquivo de uma linha que atribui o global `demo_plugin` e exporta `bootstrap`/`mount`/`unmount`; citar `:1`) e contrato de ativação e montagem: o plugin dispara eventos `scigateway:api:register_route` com as rotas `/plugin1`, `/plugin1/analysis` e `/plugin2`, o reducer as grava em `singleSpaPluginRoutes` e `activeWhen` compara `pathname` com os prefixos. `scigateway.actions.tsx:361–365` carrega `settings.plugins`, e `start` é chamado depois do carregamento (`:391/:401/:408`); o host carrega React 18 e ReactDOM 18 UMD no `index.html`, o que fecha a dependência de globals do plugin. Correções: 5.996 objetos ausentes; o caminho de `dev-plugin-settings.example.json`; e a localização do servidor em `serve-plugins.js:37–59`. Nada foi executado (build, e2e, deploy).
