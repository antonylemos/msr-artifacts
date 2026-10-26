---
schema: 1
id: 953923333
full_name: MetaGrenade/laravel-vue
url: https://github.com/MetaGrenade/laravel-vue
commit: 4863e02a377a775631e7131a037db0cd5a238288
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 110 — MetaGrenade/laravel-vue

## Contexto

MetaForge é um boilerplate Laravel/Vue/Inertia para SaaS, comércio e comunidade. Fórum, blog, suporte, loja e administração são módulos funcionais de uma única aplicação, com páginas Vue locais e entradas cliente/SSR do mesmo frontend (`README.md:3`; `README.md:11`; `README.md:17–28`; `vite.config.ts:11–14`). `repo_type: template` registra a finalidade explícita de starter kit/boilerplate, sem presumir que o conjunto seja apenas scaffold vazio (`composer.json:3–12`).

## Proveniência na amostra

- Rank 110, ID, identidade e estratégia `technology`: `data/samples/mfe-sample-001/sample.csv:111`. Clone, branch `main` e SHA conferidos em `data/samples/mfe-sample-001/clones.csv:111`. Origem da amostra na rodada 002: `data/samples/mfe-sample-001/manifest.json:2–5`.
- `data/discovery/mfe-round-001/candidates.csv:12331` registra elegibilidade `unknown`; `data/discovery/mfe-round-002/candidates.csv:12336`, `pass`. Ambas descrevem starter kit Laravel/Vue e “Single Page Applications (SPA)”, com tópicos incluindo `single-page-app`, linguagem PHP, licença MIT e `fork: false`. Os últimos pushes registrados nos exports são 07/10 e 08/10/2026; o SHA de clones é posterior, de 09/10/2026. Não se misturam os snapshots.
- Consulta `sqlite3 -readonly`, unindo `hits` e `queries` e filtrando `repository_id=953923333`, nos bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`: ambas têm um hit `technology-single-spa-repositories`, estratégia `technology`, endpoint `repositories`, consulta exata `"single-spa" in:name,description,readme`, sem caminho de arquivo. Identificador SQLite, sem linha textual artificial.
- A grafia literal `single-spa` não aparece no README do SHA avaliado. O trecho exato mais próximo é “theme initialization in a single SPA shell” (`README.md:11`). O nome não contém o termo; descrição/tópicos falam de SPA e `single-page-app`. Não é possível atribuir por eliminação um campo único, uma normalização ou um trecho histórico ao hit. Os registros de busca não fornecem essa localização. O README do SHA é posterior às buscas (modificado em `73ebe70`, 2026-10-09, depois das buscas de 2026-10-07 e 2026-10-08), e o blob vigente nas buscas não está no clone parcial (histórico indisponível, sem busca de objetos). Por eliminação, o README é o único campo consultado em que "single" fica adjacente a "spa" no snapshot, mas a atribuição não é demonstrável. A consulta que trouxe o candidato é `technology-single-spa-repositories` (subconsulta `#created:2025-Q1`, compatível com a raiz de 2025-03-24). A recuperação pode refletir aproximação terminológica ou estado anterior; isso permanece uma limitação da proveniência, não evidência de single-spa implementado. Nome e dependências isoladas não confirmam arquitetura.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | Inventário integral por `git ls-tree -r` do SHA: 1.187 arquivos regulares, todos modo 100644; zero symlinks e zero gitlinks. São 407 em `app/`, 387 em `resources/`, 154 em `database/`, 145 em `tests/`, 27 em `config/`, 11 em `.github/`, dez em `storage/`, sete em `routes/`, seis em `public/`, três em `bootstrap/`, três em `docs/`, dois em `lang/` e 25 na raiz. Não há `node_modules` ou `vendor` versionado, submódulo ou segundo manifesto npm. Contagens da árvore Git, sem linhas textuais artificiais. | contexto |
| Configuração / Build/deploy | Um manifesto npm e um Vite config. Scripts `build`, `build:ssr` e `dev` usam o mesmo Vite (`package.json:5–13`). O plugin Laravel aponta a CSS/app cliente e SSR (`vite.config.ts:11–14`), seguido dos plugins Inertia/Vue (`vite.config.ts:23–32`). Não há target/build próprio para fórum, blog, ACP ou loja. | contrária |
| Código-fonte (entrada cliente) | `resources/js/app.ts:1–5` importa Inertia e utilitários locais; `createInertiaApp` resolve `pages: './pages'`, registra Ziggy e inicializa comportamento global (`resources/js/app.ts:11–28`). O bootstrap é compartilhado pelas páginas, sem registro de aplicações independentes. | contrária |
| Código-fonte (SSR) | `resources/js/ssr.ts:1–22` usa o mesmo `createInertiaApp`, pasta `./pages` e Ziggy. A entrada server-side renderiza a mesma UI; não é uma segunda unidade frontend composta ao cliente. | contrária |
| Código-fonte / Composição | A Blade raiz carrega CSS, bootstrap e a página Vue pelo mesmo pipeline Vite, e apresenta o app Inertia (`resources/views/app.blade.php:42–57`). O controller do dashboard seleciona a página local `Dashboard` com props (`app/Http/Controllers/DashboardController.php:24–36`), que importa layout/componentes da mesma árvore (`resources/js/pages/Dashboard.vue:1–9`). Navegação entre páginas Inertia não equivale a composição entre aplicações com builds independentes. | contrária |
| Configuração / Código-fonte | Alias `@` aponta a `resources/js`; `ziggy-js` aponta ao pacote Composer instalado sob `vendor/tightenco/ziggy` (`vite.config.ts:34–38`), declarado em `composer.json:15–26`. A ausência de vendor no snapshot é condição normal de instalação de dependências, não um remote frontend. A configuração `codeSplitting` cria chunk de runtime Vue/Inertia, sem segunda unidade (`vite.config.ts:40–49`). | contexto |
| Código-fonte (busca completa de fronteiras) | Executado `git grep -n -F -e '../../' -e '../../../'` no SHA sobre todo `resources/js`, e repetido em todos os arquivos `*.vue`, `*.ts` e `*.js` do repositório: um único resultado, `resources/js/pages/Welcome.vue:43`, glob de `../../images/tech-icons/*.svg`. O arquivo explica que são SVGs incorporados no build (`resources/js/pages/Welcome.vue:39–43`). O caminho sai de `js/pages` para assets da mesma aplicação, sem cruzar fronteira de outra unidade. Não se generaliza ausência a partir de amostra de arquivos. | contexto |
| Tecnologia / Resolução | Vue, Inertia, Vite e plugins estão declarados (`package.json:15–16`; `package.json:39–48`; `package.json:54–64`). Lockfile fixa Vue 3.5.43 (`package-lock.json:6336–6340`), Vite 8.3.2 (`package-lock.json:6002–6006`), plugin Vue 6.0.9 (`package-lock.json:2461–2465`), Inertia Vite/Vue 3.8.0 (`package-lock.json:530–547`) e plugin Laravel 3.2.0 (`package-lock.json:4286–4290`). Peers registrados admitem as versões Vite/Vue utilizadas. Resolução estática básica verificada; não foram instaladas dependências ou executados builds. | contexto |
| Tecnologia / Configuração / Composição | Busca textual no SHA, excluindo `package-lock.json`/`composer.lock`, por `ModuleFederation`, `remoteEntry`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements.define`, `postMessage`, `iframe`, `loadRemote`, `microfrontend`, `micro-frontend` e `micro frontend`: sem composição MF/single-spa ou preparação de unidade para host externo. Hits `iframe` são sanitização/testes e comentário de Stripe Elements, não loaders de aplicações próprias. Inventário/configurações não fornecem cadeia remotes ↔ exposes ↔ consumo, import map ou ciclos de vida MFE. | ausente |
| Código-fonte (terceiros) | Billing carrega Stripe.js da URL do fornecedor (`resources/js/pages/settings/Billing.vue:79–99`) e cria/monta seu Payment Element (`resources/js/pages/settings/Billing.vue:159–186`). O comentário sobre iframe trata da aparência desse widget (`resources/js/lib/stripeAppearance.ts:4–8`). Isso identifica integração de pagamento terceirizada, não um segundo alvo frontend próprio do candidato. A documentação de comércio também descreve redirecionamento ao checkout do provedor (`docs/commerce.md:7–16`), sem composição de aplicações frontend próprias por links. | contexto |
| Estrutura / Código-fonte (terceiros) | A página de documentação de API usa Swagger UI de CDN (`resources/views/api/docs.blade.php:7–20`), ferramenta de visualização de API; não é unidade de produto independente ou remote configurado para composição da SPA. Assets SVG, bibliotecas UI/editor e scripts de fornecedores não são somados a `frontend_units`. | contexto |
| Documentação | O README identifica uma única SPA shell e descreve entradas cliente/SSR e módulos de negócio (`README.md:11`; `README.md:36–47`; `README.md:219–222`). Os três arquivos de `docs/` são roadmap, comércio e i18n; não há ADR/documento de arquitetura MFE no inventário. `docs/commerce.md:5–16` documenta fluxo funcional de compra, não independência frontend. | contexto |

## Autoria e histórico

Metadados no SHA: 529 commits alcançáveis, 127 merges, um commit-raiz `02684523887f0515e53900ac45e6ae345934f51f`, clone não shallow. O raiz é de 24/03/2025, autor `MetaGrenade`; HEAD é de 09/10/2026, autor `Caleb Harrod`, sobre cupons/checkout. Pares autor/committer: 240 `Caleb Harrod`/`Caleb Harrod`, 181 `Caleb Harrod`/`GitHub`, 104 `MetaGrenade`/`MetaGrenade`, dois `dependabot[bot]`/`GitHub` e dois `Snow`/`Snow`. Não se presume equivalência entre identidades nem autoria intelectual integral a partir desses registros.

`git log --no-renames --name-status` por `resources/js`, `resources/views` e `vite.config.ts`, sempre com `GIT_NO_LAZY_FETCH=1`, mostra fontes de páginas/layouts e bootstraps adicionadas no histórico inicial, e evolução continuada da aplicação. O raiz acrescenta Vite config e a Blade; `108d2d2fa8115ef3562651623ffbe96d4402daf0` (Caleb Harrod) altera ambos na atualização da stack, e `3ff2ddc280895b5a26b7981b7765ced1ff6b5a4d` os altera na modernização do design. No HEAD há adições/modificações de componentes e páginas de comércio, tipos, layout ACP e cupons em `resources/js`. Não houve objeto ausente nessas consultas; nenhum blob histórico foi necessário.

O manifesto Composer identifica base `laravel/vue-starter-kit` (`composer.json:3–12`). Isso registra origem/framework de scaffold, sem transformar toda a implementação em código terceiro vendorizado ou atribuir ao titular a autoria do starter kit. O histórico evidencia trabalho no alvo próprio, mas não prova originalidade de cada componente. Foram apenas registradas refs `main`/`origin/main`/`origin/HEAD` no SHA, outras branches de features e `origin/metagrenade.com`; nenhum conteúdo dessas branches entrou na análise.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um frontend Vue/Inertia, com entrada cliente e SSR para as mesmas páginas (`vite.config.ts:11–14`; `resources/js/app.ts:11–25`; `resources/js/ssr.ts:6–22`). Módulos de negócio, widgets e documentação API não são unidades próprias adicionais. |
| Q2 | No | Não há conjunto de unidades com entradas/builds próprios. Páginas e componentes compartilham o pipeline e fontes locais (`package.json:5–8`; `resources/views/app.blade.php:42–57`; `resources/js/pages/Dashboard.vue:1–9`). A busca completa de `../../`/`../../../` encontra somente glob de assets (`resources/js/pages/Welcome.vue:43`), sem estabelecer segunda unidade independente. |
| Q3 | No | Inertia resolve páginas de uma aplicação; a Blade apresenta esse mesmo app, não host que monta/roteia unidades distintas (`resources/js/app.ts:11–25`; `resources/views/app.blade.php:42–57`). |
| Q4 | No | Configuração Vite/Inertia convencional, sem mecanismo configurado e usado para conectar unidades frontend (`vite.config.ts:9–38`; `resources/js/app.ts:11–25`). A busca single-spa/MF não revela cadeia de integração. |
| Q5 | No | Boilerplate de aplicação única; presença do termo SPA na recuperação e integrações de fornecedores não fornecem evidência de arquitetura MFE ou MFE-unit. |

## Motivo

- `Non-MFE`, com Q1–Q5 No. `frontend_units: 1` resulta do inventário completo e das entradas cliente/SSR do mesmo aplicativo. Não é MFE-unit: nenhum alvo está preparado para host externo; Q2–Q4 ficam No.
- Aplicados literalmente Q1/Q2: múltiplas áreas funcionais ou bundles cliente/SSR não são múltiplas aplicações com entradas/builds relativamente independentes. O grep de caminhos relativos foi executado em todo o escopo de fontes indicado, sem extrapolação de ausência a partir de amostra.
- Q4 exige mecanismo e uso efetivo de composição. Single SPA na descrição da aplicação não significa a biblioteca single-spa; alias, code splitting e resolução de páginas Inertia não criam remotes/exposes. Não há integração configurada porém não conectável, como em 097/103/104, nem federação efetiva para arbitrar code sharing como em 089/100.
- Diferentemente das cadeias host/remotes em 076/084/096/106/109 e do final 007, aqui os módulos compartilham bootstrap, manifesto e build. Não se reavalia nem se presume independência do candidato 109 para classificar este snapshot.
- A origem de starter kit e a presença de fornecedores são explicitadas, como exige a cautela de 074/102/080, sem confundir este projeto com distribuição integral de plataforma ou plugin cujo único host seja terceiro. Stripe Elements/Checkout e Swagger UI são integrações de pagamento/documentação; não há segunda unidade frontend própria que dependa de resolver o critério geral de links/iframes.
- Não é somente conteúdo didático/gerador/exercício: existe aplicação implementada. Os precedentes 023/075/081/094 impedem contar instruções, resultados gerados ou componentes comuns como unidades extras, sem excluir o alvo real.
- `repo_type: template` segue a finalidade boilerplate declarada e o manifesto. `ui_technologies: [vue]`; Laravel/Inertia são stack de backend/adaptação, sem outra UI independente. `build_tools: [vite]` apoia-se na configuração explícita; não se acrescenta bundler separado apenas por dependência subjacente.

## Notas para análise

- **RQ1 (famílias):** buscas por `MetaGrenade`, `MetaForge`, `laravel-vue` e `inertia` nas anotações disponíveis não localizaram irmão/template já anotado. A base Laravel é explícita, mas não foi investigada por rede ou comparação de blobs históricos.
- **RQ1 (sinal enganoso):** hit de `"single-spa"` em busca de repositórios não equivale a dependência/configuração single-spa. A descrição SPA e o trecho `README.md:11` são semanticamente distintos; o README do snapshot não contém a grafia literal da consulta.
- **RQ3:** a cadeia observada é controller → página Inertia local → bootstrap/layout Vue comum, com build cliente/SSR do mesmo conjunto. A única ocorrência de `../../` nos fontes JS/TS/Vue é acesso a SVG local; a evidência negativa tem escopo integral declarado.
- **Protocolo:** a atribuição exata do hit permanece não demonstrada, pois o banco não identifica campo/trecho e o snapshot é posterior aos exports. Essa limitação de recuperação não é uma decisão classificatória aberta sobre a arquitetura, que é observável no SHA fixado.
- **RQ1 (ligação com 124):** o mesmo padrão ("single SPA" no README, mesma consulta `technology-single-spa-repositories`) ocorre em 124 (`README.md:542`).
