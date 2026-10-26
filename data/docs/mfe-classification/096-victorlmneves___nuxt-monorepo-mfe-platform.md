---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
url: https://github.com/victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [vue, nuxt]
build_tools: [webpack]
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Contexto

Plataforma de demonstração com shell Nuxt 3 e quatro remotes: checkout/admin em Vue 2 e profile/dashboard em Vue 3. Há código de UI e montagem em cada remote, não apenas configurações ou exemplos de código exibidos. O shell resolve uma rota no registro, injeta o remoteEntry correspondente, obtém o módulo exposto e monta a aplicação no elemento de sua página. O registro e o consumidor são implementados em `packages/shared/src/registry.ts:12–61`, `apps/shell/pages/app/[...mfe].vue:29–55` e `apps/shell/composables/useMfeLoader.ts:13–49`.

O nome exato do clone e do arquivo contém **três underscores** após `victorlmneves`: `victorlmneves___nuxt-monorepo-mfe-platform`. O SHA corresponde a `data/samples/mfe-sample-001/clones.csv:97`. O inventário integral por `git ls-tree -r 84ffc2429b311b3c7565ffd35de4de48dafd5929` contém **59 arquivos regulares** (modo `100644`), **zero symlinks** e **zero gitlinks**. Não há `node_modules/` versionado. Os cinco alvos próprios ficam sob `apps/`; `packages/shared` fornece registro, tipos e eventos de autenticação e não é uma sexta unidade frontend. Nenhum submódulo foi acessado.

## Proveniência na amostra

- `data/samples/mfe-sample-001/sample.csv:97` registra rank 96, id 1253620135, `strategies: terminology;technology` e elegibilidade `pass`. A rodada de origem é `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-002/candidates.csv:30920` registra as mesmas estratégias, descrição nula, tópicos vazios, linguagem Vue, licença nula, branch padrão `main`, criação em 2026-05-29 e último push em 2026-08-12. Esses metadados não classificam o snapshot.
- Consulta somente leitura com `sqlite3 -readonly` ao `data/discovery/mfe-round-002/discovery.sqlite`, relacionando `hits` e `queries` por `query_id` e filtrando `hits.repository_id = 1253620135`: três hits de endpoint `repositories`, com `path` vazio, nas consultas `terminology-micro-frontend-repositories`, `terminology-micro-frontends-repositories` e `technology-module-federation-repositories`. Seus textos buscam respectivamente `"micro frontend"`, `"micro frontends"` e `"module federation"` em `name,description,readme`.
- **Eliminação de campos:** o nome contém `mfe`, mas não as expressões completas dessas consultas; descrição e tópicos estão vazios. O README contém micro-frontend e Module Federation (`README.md:3–5`, `:44–46`). É o campo temático compatível observado, sem afirmar qual versão indexada ou linha o GitHub usou. O nome não é evidência de arquitetura.
- Há também hit de endpoint `code` em `technology-module-federation-plugin-ts-code`, consulta `ModuleFederationPlugin remotes extension:ts`, caminho `apps/shell/nuxt.config.ts`. No snapshot, os termos aparecem nos **comentários** de `apps/shell/nuxt.config.ts:64–66`, que explicam a ausência do plugin no shell e o uso de carregamento runtime. Esse hit não prova configuração do plugin nesse arquivo; a evidência efetiva está nos quatro remotes e no loader consumidor.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura / Configuração | O registro define quatro descritores com rota, URL, nome de container e `./App`: checkout (`packages/shared/src/registry.ts:14–23`), admin (`:26–35`), profile (`:38–47`) e dashboard (`:50–59`). As URLs locais apontam a portas 3001–3004 e terminam em `remoteEntry.js` (`:5–9`). Esses valores correspondem aos produtores presentes no monorepo. | forte |
| Configuração (Vue 2) | `apps/mfe-vue2-checkout/webpack.config.js:66–73` configura `mfe_checkout` e expõe `./App` → `./src/bootstrap.js`; `apps/mfe-vue2-admin/webpack.config.js:64–71` faz o mesmo para `mfe_admin`. Os dev servers usam portas 3001 e 3002 (`apps/mfe-vue2-checkout/webpack.config.js:76–79`, `apps/mfe-vue2-admin/webpack.config.js:74–77`). | forte |
| Configuração (Vue 3) | `apps/mfe-vue3-profile/webpack.config.js:53–61` e `apps/mfe-vue3-dashboard/webpack.config.js:53–61` configuram `mfe_profile`/`mfe_dashboard`, `remoteEntry.js` e `./App` → bootstrap próprio. As portas são 3003 e 3004 (`apps/mfe-vue3-profile/webpack.config.js:64–67`, `apps/mfe-vue3-dashboard/webpack.config.js:64–67`). | forte |
| Código-fonte (consumo dos containers) | O loader injeta o script do descritor, consulta `window[remoteName]`, executa `container.init({})`, obtém `container.get(exposedModule)` e resolve o módulo com `factory()` (`apps/shell/composables/useMfeLoader.ts:13–49`). `:52–64` implementa a injeção DOM. `:71–91` chama os métodos de montagem/desmontagem. Há consumidor concreto do mecanismo de federação, mesmo sem plugin no shell. | forte |
| Composição (página host) | `apps/shell/pages/app/[...mfe].vue:23–24` fornece o mount point; `:30–42` importa registro/loader e resolve a rota; `:44–55` monta e desmonta a unidade selecionada, passando usuário e callback de logout. O shell mantém o cabeçalho (`:2–3`). Não se limita a oferecer links para aplicações independentes. | forte |
| Código-fonte (montagem Vue 2) | Checkout exporta `mount`, cria sua instância Vue, renderiza App local e faz `$mount(el)` (`apps/mfe-vue2-checkout/src/bootstrap.js:32–46`); limpa instância/assinaturas e exporta o contrato (`:49–55`). Admin faz o equivalente (`apps/mfe-vue2-admin/src/bootstrap.js:24–47`). As UIs de checkout e administração existem em `apps/mfe-vue2-checkout/src/App.vue:1–15` e `apps/mfe-vue2-admin/src/App.vue:1–15`. | forte |
| Código-fonte (montagem Vue 3) | Profile cria App próprio e monta no elemento recebido (`apps/mfe-vue3-profile/src/bootstrap.js:28–40`), com limpeza/export em `:43–49`. Dashboard implementa o mesmo contrato (`apps/mfe-vue3-dashboard/src/bootstrap.js:26–42`). Suas UIs são observáveis em `apps/mfe-vue3-profile/src/App.vue:1–13` e `apps/mfe-vue3-dashboard/src/App.vue:1–12`. Portanto não se trata apenas de compartilhamento de funções ou de um componente utilitário. | forte |
| Build/deploy | O shell possui build Nuxt próprio (`apps/shell/package.json:5–8`). Cada remote usa seu arquivo Webpack nos scripts dev/build: `apps/mfe-vue2-checkout/package.json:5–8`, `apps/mfe-vue2-admin/package.json:5–8`, `apps/mfe-vue3-profile/package.json:5–8`, `apps/mfe-vue3-dashboard/package.json:5–8`. Os outputs são `dist` de cada projeto (`apps/mfe-vue2-checkout/webpack.config.js:9–15`, `apps/mfe-vue3-profile/webpack.config.js:8–14`). O root permite servir cada dist separadamente (`package.json:26–30`), e o servidor fornece arquivos com CORS (`scripts/dev-remote-server.js:32–51`). | forte |
| Código-fonte / Configuração (contrato compartilhado) | `packages/shared/src/types/index.ts:24–33` define `RemoteMount` e props. Os aliases compartilhados apontam a tipos/auth locais (`scripts/webpack.aliases.js:7–17`), não ao código de outras aplicações. O pacote exporta somente entrada compartilhada, auth e tipos (`packages/shared/package.json:5–10`). O estado é comunicado via eventos explícitos (`packages/shared/src/auth/index.ts:10–22`, `:28–40`), recebidos pelos bootstraps dos remotes. Isso complementa a composição runtime, não a substitui por integração em build time. | moderada |
| Tecnologia / Configuração | Vue é usado nos bootstraps e Nuxt fornece o shell (`apps/shell/app.vue:1–4`, `apps/shell/package.json:16–19`). Webpack tem configuração explícita e instâncias de ModuleFederationPlugin nos quatro remotes. `apps/shell/nuxt.config.ts:64–66` documenta que o shell não usa o plugin; não se infere seu bundler por dependências. Registra-se `ui_technologies: [vue, nuxt]` e `build_tools: [webpack]`, este pelos remotes. | moderada |
| Documentação de arquitetura | O README descreve shell e remotes (`README.md:9–35`), isolamento de frameworks (`:42–46`), eventos de autenticação (`:52–58`) e contrato de montagem (`:60–62`). As afirmações sobre singleton/compartilhamento devem ser lidas junto do loader: este inicializa containers com escopo vazio, sem plugin de federação no shell (`apps/shell/composables/useMfeLoader.ts:28–32`). Não se afirma compartilhamento efetivo da instância Vue do shell com os remotes. | contexto |
| Estrutura / Código-fonte (buscas negativas) | No inventário procurados ADRs, documentos adicionais de arquitetura, dependências vendorizadas e gitlinks: não encontrados; a arquitetura está no README. Em todos os textos do commit, excluído `pnpm-lock.yaml`, procurados `iframe`, `postMessage`, `single-spa`, `registerApplication` e imports diretos de fontes `mfe-vue*`: nenhum resultado. O acesso aos remotes observado usa descritores/containers, não imports dos fontes de outra aplicação. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Cinco unidades próprias: shell mais quatro remotes concretos. O registro nomeia quatro containers (`packages/shared/src/registry.ts:12–61`), e as quatro configurações os expõem (`apps/mfe-vue2-checkout/webpack.config.js:66–73`, `apps/mfe-vue2-admin/webpack.config.js:64–71`, `apps/mfe-vue3-profile/webpack.config.js:53–61`, `apps/mfe-vue3-dashboard/webpack.config.js:53–61`). |
| Q2 | Yes | Shell e quatro remotes têm builds próprios (`apps/shell/package.json:5–8` e os quatro `package.json:5–8` dos remotes). O host consome URLs/containers (`apps/shell/composables/useMfeLoader.ts:18–40`), sem importar fontes dos remotes. `packages/shared` contém contrato e utilitários comuns, não uma fusão das entradas das aplicações. |
| Q3 | Yes | A página host resolve o descritor pela rota e monta a unidade no seu DOM sob cabeçalho comum (`apps/shell/pages/app/[...mfe].vue:2–24`, `:39–55`). As quatro unidades participam da aplicação orquestrada pelo shell. |
| Q4 | Yes | Cadeia configurada e usada no código: registro → URL/remoteName → script/container/init/get → mount → App Vue. Consumidor em `apps/shell/composables/useMfeLoader.ts:13–49`, `:71–91`; montagem real da UI nos bootstraps Vue 2 (`apps/mfe-vue2-checkout/src/bootstrap.js:32–46`) e Vue 3 (`apps/mfe-vue3-profile/src/bootstrap.js:28–40`). Não depende de inferência a partir de uma dependência ou do hit de busca. |
| Q5 | Yes | Host e quatro unidades relativamente independentes, produtores e consumidor compatíveis e montagem de UIs no shell. A cadeia satisfaz Q1–Q4; enquadra-se no caso monorepo host + remotes implementados, como 076/084. |

## Motivo

- Proposta `MFE-implemented`, com Q1–Q5 Yes: monorepo com host e quatro remotes ligados por Module Federation e contrato de montagem. A inspeção estática verifica as chamadas de integração; não afirma execução bem-sucedida do ambiente.
- Não é MFE-unit, porque o host está presente e consome os remotes. Não é somente code sharing: o módulo exposto monta aplicações com UI própria, diferentemente da dúvida registrada em 089. Não é composição por links/iframe: os links internos selecionam uma rota cuja página carrega e monta o remote no DOM.
- `repo_type: example` registra a plataforma demonstrativa extensível, com orientações para copiar um remote e substituir autenticação (`README.md:107–133`). O pacote compartilhado não é contado como unidade, e não transforma a composição em uma solução somente de build time.

## Notas para análise

- **RQ1:** o hit de código em `apps/shell/nuxt.config.ts:64–66` é um exemplo de resultado textual em comentário. A confirmação arquitetural vem da relação entre configuração do produtor, registro, loader e montagem, não da busca ou do nome.
- **RQ2:** abordagem `module-federation`, com host que implementa o protocolo de consumo de containers por script/init/get sem plugin de federação próprio. A injeção de script é o transporte do remoteEntry de federação; não se registra separadamente uma abordagem independente de runtime-script.
- **Protocolo (famílias/templates):** `README.md:5` atribui a base a `victorlmneves/nuxt-mf-monorepo`, e `README.md:109–113` ensina a copiar os remotes. Procurados `victorlmneves`, `nuxt-monorepo`, `nuxt-mf-monorepo` e `nuxt` nas anotações existentes, sem irmão anotado. A origem declarada foi registrada, sem acessar outro repositório/rede nem presumir equivalência de snapshots. 076/084 são precedentes de composição completa, não filiação demonstrada.
- **Histórico:** clone não raso; `git rev-list --count` a partir do SHA retorna **4 commits**, `--count --merges` retorna **0**, e `--max-parents=0` retorna **um commit-raiz**, `da1cfb09c4aa461c79d6b297feb8e70051a980d3`. Todos têm data 2026-05-29: raiz “first commit”, `74f5247` “Initial commit”, `8606169` “Add apps folder and its contents” e o SHA avaliado “Fix: add apps/ and all subfolders as regular files (remove submodule)”. Árvores conferidas com `git ls-tree -r`: a raiz tem 1 arquivo regular; `74f5247`, 18; `8606169`, 18 regulares e um gitlink `apps` para `cb1c03abe02b536d52cdc5aa31d29c616a8558ce`; o snapshot avaliado tem 59 regulares e nenhum gitlink. Não se entrou no gitlink antigo nem se buscaram seus objetos.
- **Protocolo (branches):** `main`, `origin/main` e `origin/HEAD` apontam ao SHA fixado. Também existem referências `origin/feature/mfe-auth` e cinco branches Dependabot (apps/shell/webpack, nuxt, nuxt/webpack-builder, postcss e webpack-dev-server). Foram registradas apenas as referências, sem usar conteúdo de outro branch para completar ou corrigir o snapshot.
- **Checklist (limites):** nenhuma rede, instalação, build, teste ou aplicação executados. O README inclui instruções de autenticação ilustrativas; elas não foram tomadas como validação do login atual. Não foi identificada decisão aberta necessária para reconhecer a cadeia de composição no código avaliado.
- **Implantação (limitação, sem efeito em Q4):** os quatro remotes fixam `output.publicPath` em `http://localhost:300x/` (checkout e admin em `webpack.config.js:14`; profile e dashboard em `:13`). O registro permite trocar a URL do `remoteEntry.js` por variável de ambiente (`packages/shared/src/registry.ts:5–9`), mas os chunks continuariam sendo pedidos a localhost. É limitação de implantação, não da cadeia de composição.
- **Build do shell:** `@nuxt/webpack-builder` aparece apenas como devDependency (`apps/shell/package.json:22`) e `nuxt.config.ts` não seleciona `builder: 'webpack'`; o shell usa o bundler padrão encapsulado do Nuxt e essa dependência não foi contada em `build_tools`. O `[webpack]` vem dos quatro `webpack.config.js` explícitos dos remotes.
- **Descoberta:** a rodada 001 registra os mesmos quatro acertos da rodada 002 (consulta de código `ModuleFederationPlugin remotes extension:ts` em `apps/shell/nuxt.config.ts`, mais as consultas de repositório de tecnologia e terminologia).
