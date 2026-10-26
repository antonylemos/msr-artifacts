---
schema: 1
id: 1031805791
full_name: iomav91/jhipster-sample-application1
url: https://github.com/iomav91/jhipster-sample-application1
commit: ef5d7021b37ad287ffef2d8664fbc140b2c5499e
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 162 — iomav91/jhipster-sample-application1

## Contexto

Aplicação JHipster 8.11.0 do tipo `microservice` (Spring Boot + Maven, com Consul), gerada com cliente Angular configurado como microfrontend. O frontend é um remoto Module Federation que expõe módulos para um gateway JHipster (`.yo-rc.json:3`, `9`, `21`; `webpack/webpack.microfrontend.js:24–52`; `README.md:5`, `102–130`). O gateway não está no repositório. O repositório é a saída do gerador num único commit do “JHipster Bot”, sem entidades (`.yo-rc.json:17`), e os módulos expostos de rotas e navbar estão vazios. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:163` registra rank 162, ID 1031805791, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:163` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:17269` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:17273` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-08` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:50:52.808Z / 2026-10-08T15:39:00.430Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:08:46.359Z / 2026-10-08T15:47:49.789Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-08-01..2025-08-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem Java, `fork: false`, tamanho 461;
- criação em 2025-08-04T11:05:41Z, push em 2025-08-04T11:06:15Z.

Sem descrição, o acerto vem do README:
- “Microfrontend”: `README.md:102` (“### Developing Microfrontend”);
- “microfrontends”: `README.md:104`;
- “microfrontend”: `README.md:116`, `120`, `125`, `128`.

O README vem do único commit, que é o SHA (2025-08-04), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 315 entradas, 312 arquivos regulares `100644` e 3 executáveis `100755` (`.husky/pre-commit`, `mvnw`, `npmw`); zero symlinks e zero gitlinks. Há um único projeto: backend Spring Boot (`pom.xml`, `src/main/java`, `src/main/docker`) e cliente Angular em `src/main/webapp` (165 arquivos), com `angular.json` e `webpack/`. | contexto |
| Configuração (gerador) | `.yo-rc.json:2–37`: `applicationType: "microservice"`, `clientFramework: "angular"`, `entities: []`, `jhipsterVersion: "8.11.0"`, `serviceDiscoveryType: "consul"`. | contexto |
| Configuração (federação) | `webpack/webpack.microfrontend.js:24–52`: `withModuleFederationPlugin({ name: 'jhipstersampleapplication1', exposes: { './translation-module', './entity-navbar-items', './entity-routes' }, shared: … })`, sem `remotes`, com `shared` singleton de todas as dependências e de módulos internos do app (“Microfrontend api, should match across gateway and microservices”, `:3–4`). `webpack/webpack.custom.js:132–136`: aplica a configuração fora do `serve`. `angular.json:21`: builder `@angular-builders/custom-webpack:browser`. `package.json:104–105`: `@angular-architects/module-federation` 19.0.3. | forte |
| Código-fonte (conteúdo exposto) | `src/main/webapp/app/entities/entity.routes.ts:3–5`: `routes` vazio (só a marca `jhipster-needle-add-entity-route`). `src/main/webapp/app/entities/entity-navbar-items.ts:3`: `EntityNavbarItems = []`. Só o módulo de tradução tem conteúdo. `src/main/webapp/app/app.component.ts:27`: `setMicrofrontend()`. | ambígua |
| Documentação | `README.md:102–130`: o microfrontend depende de um gateway (“You must start a pre-built gateway…”) e o `build-watch` sincroniza com o frontend do gateway. `src/main/resources/static/index.html:86–87`: “Packaged microfrontends should be accessed through a JHipster gateway.” | moderada |
| Código-fonte (fronteiras) | Imports por alias `app/…` dentro de `src/main/webapp`. O `shared` mapeia `app/core/*` e `app/shared/*` para compartilhamento com o gateway, sem import de código de outra unidade no repositório. | contexto |

## Autoria e histórico

Clone não raso com um único commit, o SHA `ef5d702` (2025-08-04T11:06:14Z, “Initial application generation by JHipster”), de `JHipster Bot <jhipster-bot@jhipster.tech>` como autor e committer. Criação e push nos metadados ocorrem no mesmo minuto. Não há alteração humana registrada após a geração. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend; a configuração de composição só tem `exposes` (`webpack.microfrontend.js:27–31`) e não referencia unidades externas. |
| Q2 | Yes (para a unidade) | Entrada e build próprios do cliente Angular com federação (`angular.json:21`, `26–28`; `webpack.custom.js:132–136`). |
| Q3 | Undetermined | O gateway JHipster que comporia o microfrontend não está no repositório (`README.md:104–105`). |
| Q4 | Undetermined | O lado remoto está configurado; o consumidor não é observável. Além disso, os módulos expostos de rotas e navbar estão vazios (`entity.routes.ts:3–5`; `entity-navbar-items.ts:3`). |
| Q5 | No | Há uma unidade preparada para composição, não uma instância de MFE no repositório. |

## Motivo

- Proposta `MFE-unit` com `status: review`. Literalmente, há “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…)”, com host (gateway) não observável, como nos finais 001/050/069.
- **A revisão se justifica pelo conteúdo:** o repositório é saída intacta de gerador (único commit do JHipster Bot, `entities: []`), e o que se expõe ao gateway são rotas e itens de navbar vazios mais o módulo de tradução. A preparação é real, mas não há funcionalidade a compor. Isso pode ser lido como “MFE-related dependencies that are unused or experimental”.
- **Não é um caso de gerador como 075/081/105:** aqueles eram ferramentas geradoras, sem unidade concreta (075 é CLI para gerar e manter plugins, 081 é uma plataforma de geração e 105 uma ferramenta de projetos; 081 e 105 não são finais), e 094 é um exercício, não um gerador. Aqui há uma unidade concreta gerada.
- **Precedentes que não se aplicam:** não é plataforma de terceiros (102/074/080, 037), porque o gateway JHipster é recomendado como pre-built ou a partir do código-fonte (`README.md:104–114`), sem identificar o titular; essa inferência, portanto, não está resolvida pelo snapshot, e o final 037 trata de um componente de extensão de plataforma, o que não decide este caso. Não é code sharing (089/100), porque o contrato JHipster expõe rotas e menus.
- **Campos:** `approaches: [module-federation]`, `ui_technologies: [angular]`, `build_tools: [webpack]` (configuração webpack explícita via custom-webpack), `frontend_units: 1`, `single-unit`. `repo_type: example`: aplicação de amostra gerada; `template` também seria defensável.

## Notas para análise

- **RQ2:** microfrontends JHipster, com microsserviço Spring Boot e cliente Angular remoto em Module Federation, `shared` singleton de todas as dependências e de módulos internos (“Microfrontend api”), para composição por um gateway JHipster.
- **RQ1 (sinais enganosos):** saída de gerador sem customização traz configuração MFE completa e documentação genérica, mas nenhuma funcionalidade exposta.
- **Protocolo (busca):** as duas grafias buscadas estão literalmente no README. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Ponto para revisão conjunta

Decidir se um remoto gerado sem customização, cujos módulos expostos de rotas e navbar estão vazios, conta como MFE-unit.

- **MFE-unit (proposto):** a configuração de `exposes`, o contrato com o gateway e o build federado estão completos e prontos para uso, como em 001/050.
- **Non-MFE:** sem funcionalidade exposta e sem nenhuma alteração após a geração, a federação é estrutura não usada (“unused or experimental”), e o repositório é saída de gerador.

Não se propõe regra nova. Até a decisão, preservar `MFE-unit`/`review`.
- **Contribuição da revisão independente (Lupa):** concordância provisória com MFE-unit e `review`. A configuração Module Federation está ativa no build que não é `serve` e os caminhos expostos resolvem (`./translation-module`, `./entity-navbar-items` e `./entity-routes`, `webpack/webpack.microfrontend.js:24–34`); a dúvida real é se uma saída JHipster gerada, sem módulos de entidades e navegação funcionais, satisfaz a exceção MFE-unit ou cai em "MFE-related dependencies that are unused or experimental", e o checklist não define conteúdo funcional mínimo. Correções de citação: `README.md:5` descreve uma aplicação microservice e não é evidência de microfrontend (as evidências documentais são `README.md:102–130`); o compartilhamento de dependências está em `webpack/webpack.microfrontend.js:6–20` e o de módulos internos em `:32–50`; a busca de `../../` não foi vazia, e o achado em `alert.service.spec.ts:3` é interno e não cruza unidades; Q4 usa `src/main/webapp/app/entities/entity.routes.ts:3–7` e `src/main/webapp/app/entities/entity-navbar-items.ts:1–3`; Q2 acrescenta `package.json:17–18` e `:62–68` (scripts de build e watch); `README.md:116` é instrução genérica, não demonstrada pelo script atual (`package.json:18`), força moderada/ambígua; a árvore é inventário por `git ls-tree` do SHA e a proveniência vem das tabelas `hits` das duas bases `discovery.sqlite`, filtradas pelo ID. `repo_type: example` é razoável, com `template` como alternativa sem efeito sobre a classe. 074 (distribuição OpenMRS) e 080 (documentação) têm escopo diferente.
