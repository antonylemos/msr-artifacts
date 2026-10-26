---
schema: 1
id: 62270168
full_name: hisland/my-learn
url: https://github.com/hisland/my-learn
commit: 2efedcf3f5184328f2f86d0c11bce54ab44ee7ce
classification: Non-MFE
checklist: { q1: yes, q2: no, q3: yes, q4: yes, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 168 — hisland/my-learn

## Contexto

Repositório pessoal de experimentos de estudo, mantido desde 2013. O README diz: “这里面是我平时学习的时候做测试或者练习的一些文件”, isto é, arquivos de testes e exercícios do dia a dia (`README.md:1–7`). Há 119 diretórios de primeiro nível, cada um uma demo independente (webpack1–5, React, Vue, Deno, Rust, SQL etc.). Dois tocam micro-frontends:
- `single-spa/00.very-easy-vanilla-js/`, um root config single-spa com uma aplicação vanilla;
- `qiankun/`, testes iniciais de qiankun.

O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:169` registra rank 168, ID 62270168, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:169` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:120` e `data/discovery/mfe-round-002/candidates.csv:120`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-package-code`: `"single-spa" filename:package.json` | `…#size:200..299` | `single-spa/00.very-easy-vanilla-js/package.json` | 2026-10-07T22:13:35.821Z / 2026-10-08T15:56:59.527Z |
| `technology-single-spa-register-code`: `registerApplication singleSpa` | `…#size:0..999` | `single-spa/00.very-easy-vanilla-js/single-spa.config.js` | 2026-10-07T22:41:18.293Z / 2026-10-08T16:20:13.242Z |

Os arquivos casados existem no SHA:
- `package.json`, com 283 bytes, dentro da faixa, declara `"single-spa": "^5.6.0"` em `package.json:13`;
- `single-spa.config.js` contém `singleSpa.registerApplication` em `:15`.

Os metadados do hit de código registram só a descrição “my learn tests”, sem tópicos, linguagem nem datas. O acerto não depende do README, que não menciona micro-frontends. O README foi alterado pela última vez em `932ed95` (2018-10-02), muito antes das coletas. Os arquivos casados vêm de `f7d01f7` (2020-09-22).

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 7.543 entradas, 7.516 arquivos regulares `100644`, 25 executáveis `100755` e 2 symlinks `120000` (`vuex/vue.js` → `vue-2.5.16.js`, `vuex/vuex.js` → `vuex-3.0.1.js`, internos); zero gitlinks. São 119 diretórios de primeiro nível com demos independentes, sem workspace nem configuração comum. | contexto |
| Código-fonte (single-spa) | `single-spa/00.very-easy-vanilla-js/single-spa.config.js:2–16`: `registerApplication({ name: 'app1', app: () => import('./app1/app1.js'), activeWhen: '#/app1' })` e `start()`. `app1/app1.js:3–21`: lifecycles vanilla que escrevem “App 1 is mounted!”. `index.html:4`: carrega `single-spa.config.js` como módulo. `package.json:6–8`: sem script de build, só `test` placeholder. | moderada |
| Código-fonte (fronteira single-spa) | O root config importa o fonte de `app1` por caminho relativo (`single-spa.config.js:9`, `import('./app1/app1.js')`). Não há entrada, build ou implantação próprios de `app1`: as duas “unidades” são módulos do mesmo diretório e do mesmo carregamento. | contrária |
| Código-fonte (qiankun) | `qiankun/easy/webpack.config.js:5–43`: dois builds (`bundle` de `main.js` e `app1` como UMD). `qiankun/easy/main.js:1–2` só expõe o módulo qiankun em `window.kkk`. `qiankun/easy/main2.js:1–8` chama `loadMicroApp` para `//localhost:7100`, mas não é entrada de nenhum build nem carregado por `index.html:5`. `app1/main.js:7–31` exporta lifecycles, mas nada o registra; `app2/main.js:1` só faz `console.log(2)`. Não há composição conectada. | contrária |
| Busca | `git grep -l -i` no SHA (exceto lockfiles e `.min.js`) por `ModuleFederationPlugin`, `remoteEntry`, `registerMicroApps`, `loadMicroApp`, `registerApplication`, `single-spa`, `qiankun`, `micro.?front`, `import-map`, `importmap`, `wujie` e `micro-app`. Só acha os arquivos de `single-spa/` e `qiankun/` e `deno-api/08.Deno-import-maps/` (import maps do Deno, sem relação com frontend). | contexto |

## Autoria e histórico

Clone não raso; 1.140 commits alcançáveis a partir do SHA, nenhum merge, de 2013-07-03 (`2c18c7c`, “normal commit”) a 2026-08-21 (SHA, “add nacos-docker-compose 2.3.2”). Os autores são `hisland <hisland@qq.com>` (1.115) e duas identidades corporativas do mesmo nome, “何定良” (22) e “hedingliang” (3). A demo single-spa foi adicionada num único commit, `f7d01f7` (2020-09-22); a de qiankun em `fc9aa07` (2023-05-24). Nenhuma das duas foi alterada depois. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e a leitura ampla do histórico com `--name-status` encontra um objeto promisor ausente (`fb9e2cf…`); os logs por pasta que sustentam a cronologia relevante estão disponíveis.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Na demo single-spa, o root config e `app1` são referenciados pela configuração de composição (`registerApplication`, `single-spa.config.js:15`). |
| Q2 | No | `app1` não tem entrada nem build próprios e é importada como fonte pelo root config (`single-spa.config.js:9`): “units do not import each other's source code directly” não se cumpre. Na demo qiankun, os builds separados existem, mas nenhuma unidade é registrada (ver Q4). |
| Q3 | Yes | O root config registra e ativa `app1` por rota de hash (`single-spa.config.js:14–16`). |
| Q4 | Yes | single-spa configurado e chamado no root config (`registerApplication` + `start`). A demo qiankun não conecta unidades. |
| Q5 | No | Há uma resposta No: demo de estudo que usa a API do single-spa dentro de um único carregamento, num repositório de exercícios. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”: Q2 falha literalmente, porque as duas partes da demo single-spa não têm entradas ou builds próprios e uma importa o fonte da outra.
- O caso também corresponde a “MFE-related dependencies that are unused or experimental” (demo qiankun desconectada) e a conteúdo de estudo e exercício, como 023/094, num repositório de “monorepos containing several unrelated frontend applications”, como 028.
- Não é code sharing (089/100), plataforma de terceiros nem cadeia completa (076/084/096/106/109).
- `frontend_units: 2` conta só o par root config + `app1` referenciado pela configuração de composição (critério de Q1). As dezenas de demos independentes do repositório não são unidades de composição e não foram somadas, como em 080, em que só o alvo próprio foi contado. `unit_organization: monorepo`.
- `ui_technologies: []` (vanilla JS) e `build_tools: []` (a demo não tem build); `approaches: []`, pela convenção de Non-MFE. `repo_type: other`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** buscas de código por `"single-spa"` em `package.json` e por `registerApplication` capturam demos mínimas de estudo dentro de repositórios de exercícios. Aqui, um root config sem build que importa o fonte da aplicação.
- **Contagem:** a escolha de `frontend_units: 2` e `monorepo` diz respeito só à demo single-spa; outra leitura possível é tratar o repositório inteiro como coleção sem unidades de composição (`0`/`none`). A classe não muda.
- **Protocolo (busca):** entrada exclusivamente por busca de código, com elegibilidade `pass` nas duas rodadas. Os metadados do hit de código não trazem datas nem tópicos.

### Divergência entre analista e revisor (campos de contagem e tecnologias)

O revisor independente (Lupa) concorda com Non-MFE, Q2 No, `repo_type: other` e `draft` (a classe independe dos campos). Diverge de `frontend_units: 2`, `ui_technologies: []` e `build_tools: []`: esses campos descrevem apenas a demo single-spa (root config + `app1`) e não o repositório inteiro, que é uma coleção de experimentos com outras demos frontend (por exemplo, `00-vite4-echarts`, `01-vite4-g6`, `02-vite4-vue3-ts`, `03-vite4-react18-ts`, `04-vue3-vite5-threejs` e `svelte-test`, com Vite, React, Vue e Rollup/Svelte em `package.json:6–26`, e páginas de entrada como `03-vite4-react18-ts/index.html:10–11`). O template define `frontend_units` como unidades no repositório ou referenciadas pela configuração de composição e pede as tecnologias e os bundlers observados; o final 028 conta três apps frontend isoladas e não compostas, de modo que unidades isoladas não são descartadas do campo.

Verificado no SHA: há 99 manifestos `package.json` (muitos de experimentos de backend, como `eggjs2/`) e 667 arquivos `index.html`, e a contagem exata de demos frontend exigiria inventariar todas; essa contagem não foi feita. Mantidos `frontend_units: 2`, `ui_technologies: []` e `build_tools: []` como retrato restrito à demo single-spa, registrados como incompletos, e `monorepo` (coleção de projetos isolados). Alternativas para o pesquisador: refazer a contagem e os campos com o inventário de todas as demos, ou aplicar uma convenção para repositórios-coleção de estudo (`0`/`none`). A classe não muda. Também permanece o aviso de que os rascunhos 094 e 076 e o registro em `review` 080 citados acima não são finais.
