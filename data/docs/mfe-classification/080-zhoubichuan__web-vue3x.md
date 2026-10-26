---
schema: 1
id: 657625625
full_name: zhoubichuan/web-vue3x
url: https://github.com/zhoubichuan/web-vue3x
commit: 0051112ec3e6390ff34520ccabfcbbb8fc82ede3
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 080 — zhoubichuan/web-vue3x

## Contexto

Site de notas técnicas sobre Vue, construído com VitePress, acompanhado de biblioteca de componentes e fontes do framework Vue. O snapshot contém também ferramentas/exemplos executáveis do framework. O conteúdo sobre single-spa e qiankun está em artigos Markdown; esses trechos precisam ser distinguidos de uma aplicação composta implementada.

Clone conferido em `data/samples/mfe-sample-001/repos/zhoubichuan__web-vue3x/`. Rank, ID e SHA correspondem à linha `cloned` de `data/samples/mfe-sample-001/clones.csv:81`. `git rev-parse HEAD` retornou o SHA do front matter e `git cat-file -t` confirmou um commit. Inventário completo de 813 arquivos por `git ls-tree -r -z --name-only`, incluindo 577 arquivos em `vue/` e 174 em `src/`. Fontes e citações foram inspecionados por `git show` e buscas por `git grep` no SHA fixado, sem instalar dependências, executar builds ou abrir o site publicado.

**Branches, somente para registro:** `master`, `origin/master` e `origin/HEAD` apontam ao SHA avaliado. Outras referências locais disponíveis: `origin/dependabot/npm_and_yarn/vitepress-1.6.3` → `0244a5b01f1b7afd4b92f35e84b3faff974a7078`; `origin/gh-pages` → `0dbf644f7122fdca0449678632b8cf2eede5b095`; `origin/template-mobile-vite` → `368e64a247570cb9a4065e68037b1630075d4ad9`; `origin/template-pc-vite` → `b80ca021fc67200b3cb3c5913d023b0bf9756198`. Seus inventários têm, respectivamente, 796, 348, 31 e 47 arquivos. `gh-pages` contém HTML/assets publicados; os dois branches de template têm árvores próprias com `src/`, manifesto e configuração Vite. Alguns blobs de manifesto desses templates não estão disponíveis no clone parcial: a leitura tentou obtê-los do promisor remote e falhou por resolução de rede. O registro desses branches se limita às referências e árvores disponíveis; seus conteúdos não sustentam Q1–Q5 e não foram incorporados ao snapshot.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Configuração / Build/deploy (site) | `package.json:29–33` define `vitepress dev src`, `vitepress build src` e build de componentes. `src/.vitepress/config.ts:10–17` configura um site com base `/web-vue3x/`, saída própria e exclusão de fontes; `:24–30` configura Vite. `.github/workflows/gh-pages.yml:24–37` constrói e publica o diretório `web-vue3x`. Trata-se do alvo principal de documentação, não de um shell MFE demonstrado. | contexto |
| Código-fonte / Configuração (componentes) | `src/.vitepress/theme/index.ts:1–16` estende o tema padrão, importa diretamente `../../../components/index.ts` e instala `VueUI`/preview na mesma aplicação. `components/index.ts:12`, `:24`, `:30`, `:48`, `:70` importa componentes locais; `:196–199` os registra com `app.component`. É uma biblioteca de componentes consumida estaticamente, sem aplicações independentes compondo a UI. | contrária |
| Estrutura / Código-fonte (framework) | `vue/README.md:1–5` identifica o conteúdo como `vuejs/core`; `vue/package.json:3–9` registra versão 3.2.31 e builds do framework. O inventário contém compiler, runtime, reactivity e seus testes; esses pacotes não são contados como aplicações frontend. | contexto |
| Configuração / Código-fonte / Build/deploy (playground) | `vue/packages/sfc-playground/package.json:5–8` define dev/build próprios; `vue/packages/sfc-playground/src/main.ts:1–10` monta a aplicação Vue; `vue/packages/sfc-playground/src/App.vue:30–40` renderiza Header e REPL. `vue/packages/sfc-playground/vite.config.ts:9–18` configura Vite, e `:20–38` copia o runtime Vue, não outra aplicação frontend. É um alvo executável separado do site de notas. | moderada |
| Configuração / Código-fonte / Build/deploy (explorer) | `vue/packages/template-explorer/index.html:5–19` contém os editores e carrega o bundle próprio; `vue/packages/template-explorer/src/index.ts:1–12`, `:37–41` usa bibliotecas de compilação/runtime e inicializa o editor. `vue/packages/template-explorer/package.json:2–11` define o alvo global; `vue/scripts/build.js:74–108` constrói um pacote escolhido com Rollup. `vue/package.json:20–24` expõe comandos próprios de desenvolvimento/acesso. | moderada |
| Configuração / Código-fonte / Build/deploy (size-check) | `vue/packages/size-check/package.json:5–6` define build Vite; `vue/packages/size-check/vite.config.js:2–9` define a entrada; `vue/packages/size-check/src/index.ts:1–6` monta uma aplicação mínima de renderização. É um alvo auxiliar de medição/teste, sem integração ao site de notas ou aos dois editores. | contexto |
| Documentação (single-spa/qiankun) | `src/senior/1.micro/1.singlespa.md:22–35`, `:98–113` apresenta código em fences, incluindo lifecycles e `registerApplication`. `src/senior/1.micro/2.qiankun.md:19–24` mostra uma árvore fictícia `micro/base/sub1/sub2`; `:30–70` contém a inicialização qiankun em fence; `:74–105` inicia a configuração dos filhos em outro fence. Esses caminhos/aplicações não estão na árvore como projetos executáveis. | fraca |
| Composição / Documentação (iframe) | `src/senior/1.micro/2.qiankun.md:321–325` fecha o bloco de código e inclui um `<iframe ... src="./base"/>` fora da fence, na seção de resultado. Pode ser renderizado como parte da página de documentação; o destino relativo não possui artefato correspondente em `src/senior/1.micro/base/`. Não se verificou uma aplicação filha efetivamente disponível nesse endereço. A aceitação de iframe como mecanismo MFE continua aberta. | ambígua |
| Tecnologia / Configuração / Código-fonte | Busca em toda a árvore, excluindo Markdown e lockfiles, por `registerMicroApps`, `loadMicroApp`, `registerApplication`, `single-spa`, `qiankun`, `ModuleFederationPlugin`, `remoteEntry`, `<iframe` e `micro-app`: somente os rótulos/links de artigos qiankun em `src/.vitepress/sidebar.ts:215–220` ocorreram. Não foi encontrada inicialização MFE nos fontes/configurações executáveis. A busca complementar em Markdown encontrou os exemplos acima, não arquivos de entrada de host/remotes. | ausente |
| Estrutura / Composição | Procurados no inventário completo os diretórios de demonstração `micro/`, `base/`, `sub1/`, `sub2/`, o arquivo `micro-app.js` e o alvo `src/senior/1.micro/base/`: ausentes. O diretório real `src/base/` contém capítulos e componentes de documentação; não é a aplicação `base` do exemplo de `src/senior/1.micro/2.qiankun.md:19–24`. Não há configuração que reúna site, playground, explorer e size-check na mesma aplicação. | ausente |
| Código-fonte (template de exportação) | `vue/packages/sfc-playground/src/download/download.ts:3–7` importa os arquivos starter como texto bruto; `:17–29` grava esses arquivos e os componentes do estado do editor em um ZIP. O `main.js` do starter importa `App.vue` (`vue/packages/sfc-playground/src/download/template/main.js:1–4`), mas esse componente é fornecido pelo estado exportado, não pelo diretório de template versionado. Não se conta o starter de download como outra unidade instanciada. | contexto |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Os alvos executáveis do snapshot (site VitePress, `package.json:30–31`; SFC Playground, `vue/packages/sfc-playground/src/main.ts:1–10`; Template Explorer, `vue/packages/template-explorer/index.html:5–19`; size-check, `vue/packages/size-check/src/index.ts:1–6`) não formam unidades de uma mesma aplicação, e nenhuma configuração de composição referencia outras unidades. Os três alvos de `vue/` são ferramentas de uma cópia do `vuejs/core` (`vue/README.md:1`; `vue/package.json:3`), excluída do build do site (`src/.vitepress/config.ts:13`). Os nomes base/sub1/sub2 dos artigos não entram. O critério acompanha o precedente 028 (apps sem relação de composição: Q1 No) e as exclusões do checklist. |
| Q2 | No | Não há unidades candidatas a compor uma aplicação. Os alvos têm entradas e builds separados, mas sem relação entre si: o tema importa uma biblioteca de componentes (`src/.vitepress/theme/index.ts:4–16`) e os editores/teste usam bibliotecas do framework (`vue/packages/template-explorer/src/index.ts:1–12`; `vue/packages/size-check/src/index.ts:1–6`). Independência de builds não é evidência de composição. |
| Q3 | No | Não há host montando/roteando esses quatro alvos na mesma aplicação. A configuração do site organiza documentação e previews locais (`src/.vitepress/config.ts:10–17`, `:41–45`; `src/.vitepress/theme/index.ts:13–16`). O iframe isolado (`src/senior/1.micro/2.qiankun.md:325`) aponta para outro alvo não demonstrado, não para playground/explorer/size-check. |
| Q4 | No | Nenhuma composição executável por single-spa/qiankun foi encontrada fora do Markdown; as chamadas documentadas estão em fences (`src/senior/1.micro/2.qiankun.md:30–70`; `src/senior/1.micro/1.singlespa.md:98–113`). O iframe fora da fence (`src/senior/1.micro/2.qiankun.md:325`) aponta para `./base`, que não existe no snapshot, e não conecta nenhuma das unidades de Q1. A ausência do alvo foi verificada no inventário, então o uso não é incerto. |
| Q5 | No | A evidência mostra documentação sobre MFE e alvos auxiliares sem composição comum; Q3 é No. Os trechos qiankun/single-spa são conteúdo didático, e o iframe sem alvo verificável não confirma arquitetura (`src/senior/1.micro/2.qiankun.md:19–24`, `:30–70`, `:325`). O julgamento acompanha a regra de haver uma resposta No, sem override. |

## Motivo

- Propõe-se `Non-MFE`: Q1 a Q5 são No e não se aplica `MFE-unit`. Corresponde a documentação que menciona microfrontends sem implementação observável e a alvos frontend sem composição entre si (exclusões do checklist; precedentes 028 e 023). A biblioteca de componentes e os pacotes do framework não são unidades MFE.
- `frontend_units: 1` conta só o site VitePress, o alvo próprio do repositório. Os alvos de `vue/` (SFC Playground, Template Explorer, size-check) são ferramentas de uma cópia do `vuejs/core` 3.2.31 mantida para estudo do código-fonte (`vue/README.md:1`; `vue/package.json:3`) e excluída do build do site (`src/.vitepress/config.ts:13`); não foram somados. Fixtures HTML, componentes isolados, código em fences e o starter de exportação também não.
- `repo_type: other` descreve notas técnicas com biblioteca e código de terceiros vendorizado; `unit_organization: single-unit`. `build_tools: [vite]`: o Vite do site (`src/.vitepress/config.ts:24–30`); Rollup só aparece no código vendorizado (`vue/scripts/build.js:74–108`) e gulp é task runner da biblioteca de componentes. `approaches: []` segue a convenção de Non-MFE: single-spa/qiankun aparecem como conteúdo, e o iframe não constitui mecanismo MFE.
- O consumo estático da biblioteca pelo tema não foi reinterpretado como composição em build time de aplicações: `components/index.ts:196–199` registra componentes comuns, e não unidades com entradas/deploys próprios. A questão metodológica efetivamente aberta neste caso é o iframe no artigo.

## Notas para análise

- **RQ1:** buscas por nomes de APIs retornam exemplos em Markdown; é necessário conferir fences e caminhos reais. O iframe em `src/senior/1.micro/2.qiankun.md:325` está fora da fence e, portanto, tem natureza diferente dos exemplos de registro.
- **Protocolo (famílias/templates):** a busca nas anotações existentes por `zhoubichuan`, `web-vue`, `vuejs`, `sfc-playground` e `template-explorer` não identificou família/template compartilhado já anotado. O caso 023 (`023-arunkumarsubburaj__mfe_slide_dev.md`) é apenas análogo quanto a código MFE como conteúdo didático; não há evidência de linhagem comum. Os branches `template-mobile-vite` e `template-pc-vite` pertencem a este repositório, mas não ao snapshot avaliado. A atribuição de `vue/` ao framework se apoia nos seus próprios README/manifesto; não foi feita deduplicação externa.

## Ponto para revisão conjunta

- **Divergência entre analista e revisor, resolvida na consolidação:** a primeira versão tinha Q1=Yes, Q2=Yes e Q4=Undetermined, contando quatro alvos (`frontend_units: 4`, `monorepo`). A revisão independente recomendou Q1, Q2 e Q4 = No e `frontend_units: 1`, seguindo o precedente final 028 (apps sem relação de composição: Q1 No) e as exclusões do checklist. Adotei a segunda leitura. A classe `Non-MFE` é a mesma nas duas. Confirmar se esse critério vale para este caso, em particular o tratamento de `vue/` como código de terceiros vendorizado (alternativa: `frontend_units: 0` e `none`, como em 023, tratando o site de documentação como não-unidade).
- **Iframe:** `src/senior/1.micro/2.qiankun.md:325` aponta para `./base`, ausente no snapshot. Foi tratado como sinal enganoso (RQ1), com Q4 No pela ausência verificada do alvo. Se algum dia houver artefato que atenda `./base`, reaplicar Q1–Q5. Não há decisão que altere a classe; a anotação segue em `review` apenas por causa da escolha de contagem acima.
