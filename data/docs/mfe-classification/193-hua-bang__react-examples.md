---
schema: 1
id: 896760362
full_name: hua-bang/react-examples
url: https://github.com/hua-bang/react-examples
commit: 856dc30ae9a02b536f699b920ea99e96d7f1e330
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: undetermined, q5: undetermined }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rsbuild]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 193 — hua-bang/react-examples

## Contexto

Repositório de exemplos de React (“A repo about react examples.”, `README.md:1–2`) com três demos independentes: `react-16-demo/` e `react-18-demo/` (Vite, sem relação entre si) e `mf-demo/`. O `mf-demo` é um exemplo de Module Federation 2.0 com Rsbuild: `mf_consumer` consome `provider` de `mf_provider`, que expõe um componente via `mf-manifest.json` (`mf-demo/*/module-federation.config.ts`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:194` registra rank 193, ID 896760362, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:194` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:10963` e `data/discovery/mfe-round-002/candidates.csv:10969`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `…#size:500..599` | `mf-demo/mf_consumer/package.json` | 2026-10-07T18:19:32.021Z / 2026-10-08T15:35:23.527Z |
| idem | idem | `mf-demo/mf_provider/package.json` | 2026-10-07T18:19:47.047Z / 2026-10-08T15:35:28.807Z |

Os dois arquivos casados têm 505 bytes no SHA, dentro da faixa, e declaram `"@module-federation/rsbuild-plugin": "^0.21.6"` (`mf-demo/mf_consumer/package.json:20`; `mf-demo/mf_provider/package.json:20`). Os metadados do hit de código registram só a descrição “A repo about react examples.”. O acerto não depende do README, que não menciona Module Federation; ele vem do commit-raiz `d5c67bf` (2024-12-01) e não foi alterado depois.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 73 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há `react-16-demo/` e `react-18-demo/` (apps Vite independentes), `mf-demo/mf_consumer/` e `mf-demo/mf_provider/`, cada um com `package.json`, `rsbuild.config.ts`, `module-federation.config.ts` e `src/` com `index.tsx` → `bootstrap.tsx`, além de `react.drawio`. | contexto |
| Configuração (consumer) | `mf-demo/mf_consumer/module-federation.config.ts:3–13`: `name: 'mf_consumer'`, `remotes: { 'provider': 'rslib_provider@http://localhost:3001/mf-manifest.json' }`, `shareStrategy: 'loaded-first'`, `shared` react/react-dom singleton. `mf-demo/mf_consumer/rsbuild.config.ts:6–8`: `pluginModuleFederation`. | forte |
| Configuração (provider) | `mf-demo/mf_provider/module-federation.config.ts:3–12`: `name: 'mf_provider'`, `exposes: { '.': './src/components/ProviderComponent.tsx' }`. `mf-demo/mf_provider/rsbuild.config.ts:6–11`: `pluginModuleFederation`, porta 3001, que coincide com a URL do consumer. | forte |
| Código-fonte (consumo) | `mf-demo/mf_consumer/src/App.tsx:2`, `8`: `import Provider from "provider"` e `<Provider />`. `mf-demo/mf_consumer/@mf-types/provider/*.d.ts` e `@mf-types/index.d.ts:1–22`: tipos do remoto gerados pelo plugin de federação e versionados, o que indica que o consumer já obteve tipos do provider. `tsconfig.json:21–23` mapeia esses tipos. | forte |
| Configuração (divergência de nome) | O consumer declara a entrada como `rslib_provider@…/mf-manifest.json`, mas o provider se chama `mf_provider`. Não foi verificado se o runtime do MF 2.0 com manifesto aceita a divergência; o tipo gerado em `@mf-types/provider/apis.d.ts:2–3` sugere que a resolução funcionou ao menos para tipos. | ambígua |
| Código-fonte (fronteiras) | A busca por imports `../../` no SHA não retorna nada. O consumer só referencia o provider pelo módulo federado `provider`. | contexto |

## Autoria e histórico

Clone não raso; 12 commits alcançáveis (15 em todos os refs), 3 merges de PR, todos do mesmo titular com dois e-mails: “Jasper” `<huabang001124@gmail.com>` e “huahua” `<huabang001124@gmail.comm>`. A raiz é `d5c67bf` (2024-12-01). O `mf-demo` inteiro entrou em `42a8301` (2025-11-26, “feat: module federation demo”), integrado pelo merge do PR #3, que é o SHA `856dc30`. Os branches `feature-*` remotos correspondem aos PRs e não foram considerados. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades no `mf-demo`, referenciadas pela configuração de composição (`mf_consumer/module-federation.config.ts:5–7`; `mf_provider/module-federation.config.ts:5–7`). |
| Q2 | Yes | Consumer e provider têm entrada, build e servidor próprios (`rsbuild.config.ts` de cada um), sem imports de código-fonte entre eles. |
| Q3 | Yes | O consumer renderiza o componente remoto na sua página (`mf_consumer/src/App.tsx:8`). |
| Q4 | Undetermined | Module Federation está configurado nos dois lados e consumido por import federado, e a porta coincide, mas o identificador antes de `@` na URL do consumer (`rslib_provider`, `mf-demo/mf_consumer/module-federation.config.ts:6`) difere do `name` publicado pelo provider (`mf_provider`, `mf-demo/mf_provider/module-federation.config.ts:4`), e nenhum artefato versionado resolve se o runtime conecta os dois (não há `mf-manifest.json` para comparar os nomes). Os tipos remotos (`@mf-types`) foram adicionados num único commit junto com todo o `mf-demo` e não demonstram resolução efetiva. É configuração cujo uso efetivo é incerto. |
| Q5 | Undetermined | Não há resposta No; Q5 acompanha Q4, e permanece a questão de o remoto expor um único componente de demonstração ser composição ou code sharing (089/100). |

## Motivo

- Proposta `MFE-implemented` com `status: review`. Corresponde a “examples… that actually compose frontend units”.
- **A revisão se justifica por dois pontos:**
  - **Nome divergente:** o consumer usa `rslib_provider` na entrada do remoto e o provider se chama `mf_provider`. Se isso impedir a conexão, o caso se aproxima de 103 (cadeia inconsistente, `Uncertain`).
  - **Code sharing:** o módulo exposto é um único componente de saudação (“Hello Module Federation 2.0”), o que evoca a dúvida de 089/100.
- Os demos `react-16-demo` e `react-18-demo` são aplicações independentes sem relação de composição. Não foram contados, como na leitura de 168. `frontend_units: 2` (consumer e provider), `unit_organization: monorepo`. `ui_technologies: [react]`, `build_tools: [rsbuild]` (como em 029), `approaches: [module-federation]`, `repo_type: example`.

## Notas para análise

- **RQ2:** Module Federation 2.0 com `@module-federation/rsbuild-plugin`, remoto por `mf-manifest.json`, `shareStrategy: 'loaded-first'` e tipos remotos gerados automaticamente (`@mf-types`).
- **Protocolo (busca):** entrada só por busca de código nos dois `package.json` do demo, na faixa `size:500..599`. Elegibilidade `pass` nas duas rodadas.

## Decisão registrada

Mantido como `Uncertain`. Embora o consumer importe e renderize o componente federado, o alias do remoto (`rslib_provider`) diverge do nome publicado pelo provider (`mf_provider`) e o snapshot não demonstra que a ligação funciona em runtime. Além disso, a exposição de um único componente demonstrativo não permite distinguir com segurança composição de microfrontends de simples compartilhamento de código.
