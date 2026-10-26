---
schema: 1
id: 1188729312
full_name: Chuc-Jie/vercel-chinese
url: https://github.com/Chuc-Jie/vercel-chinese
commit: 9ea36ab2ac7d98ee74ea534340f94cdc991e0425
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 099 — Chuc-Jie/vercel-chinese

## Contexto

Utilitário de tradução da interface Vercel para chinês, distribuído como userscript para gerenciadores de scripts de navegador. O propósito está em `README.md:7–20`, e a instalação/uso em `README.md:62–83`. `repo_type: production` registra essa finalidade de uso, sem afirmar que instalação ou funcionamento tenham sido testados. O script percorre e altera textos/atributos do DOM já existente; não fornece uma aplicação frontend com UI própria nem carrega outra aplicação.

O clone é `Chuc-Jie__vercel-chinese`; o SHA corresponde a `data/samples/mfe-sample-001/clones.csv:100`. Inventário integral por `git ls-tree -r 9ea36ab2ac7d98ee74ea534340f94cdc991e0425`: **3 arquivos regulares** (modo `100644`), **zero symlinks** e **zero gitlinks**. A árvore inteira contém somente `LICENSE`, `README.md` e `Vercel-Chinese.user.js`, na raiz. Não há subpastas, submódulos, `node_modules/`, manifests de aplicação, HTML de entrada ou configuração de build. `frontend_units: 0` decorre desse inventário e do código de transformação do DOM, não de falta de observabilidade. O userscript executável não é, por si, um alvo frontend independente; páginas Vercel de terceiros não contam como unidades próprias.

## Proveniência na amostra

- `data/samples/mfe-sample-001/sample.csv:100` registra rank 99, id 1188729312, `strategies: terminology` e elegibilidade `pass`. O manifesto aponta a `data/discovery/mfe-round-002` como rodada de origem (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:26961` e `data/discovery/mfe-round-002/candidates.csv:26968` registram as mesmas estratégias, descrição nula, tópicos vazios, linguagem JavaScript, licença GPL-3.0, branch padrão `master`, criação e último push em 2026-03-22. São metadados de descoberta, não classificação arquitetural.
- Consultados com `sqlite3 -readonly` os bancos `data/discovery/mfe-round-001/discovery.sqlite` e `data/discovery/mfe-round-002/discovery.sqlite`. Em ambos, `hits JOIN queries` por `query_id`, filtrando `hits.repository_id = 1188729312`, retorna dois hits: `terminology-microfrontend-repositories` e `terminology-microfrontends-repositories`, estratégia `terminology`, endpoint `repositories`, consultas `microfrontend in:name,description,readme` e `microfrontends in:name,description,readme`. Os caminhos estão vazios: não há hit de código com localização atribuída.
- **Eliminação dos campos:** `vercel-chinese` não contém os termos buscados; descrição e tópicos estão vazios. O README é o campo compatível observado, pois lista Microfrontends entre funcionalidades Vercel cujos textos são traduzidos (`README.md:48–54`). Não se infere linha ou versão exata indexada pelo GitHub a partir do banco, nem se usa o nome como evidência. A busca no código encontra os termos como chaves do dicionário, não como implementação da funcionalidade nomeada. A forma da consulta (`microfrontend(s)`, sem espaço nem hífen) casa exatamente com "Microfrontends" em `README.md:53`, a única ocorrência no README, que nomeia a funcionalidade do console Vercel cujos textos são traduzidos.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Configuração (execução do userscript) | O cabeçalho define correspondência a `*.vercel.app`, `vercel.com` e `*.vercel.com`, `@grant none`, `@noframes` e execução em `document-end` (`Vercel-Chinese.user.js:1–15`). É ativação por um gerenciador de userscripts em páginas existentes; não é configuração de composição de aplicações frontend. | contrária |
| Código-fonte (entrada) | `Vercel-Chinese.user.js:17–35` inicia uma IIFE, define seletores de áreas a ignorar e cria um Map de traduções. Não há bootstrap de UI própria, exportação de lifecycle ou interface de montagem destinada a host externo. | contrária |
| Código-fonte (conteúdo temático) | `Vercel-Chinese.user.js:190` traduz a expressão “Microfrontends Routing”, e `Vercel-Chinese.user.js:236` traduz “Microfrontends”. São pares inglês/chinês do Map, não declaração de remotes, regras de roteamento ou chamadas a um framework MFE. | contexto |
| Código-fonte (transformação de texto) | O script ordena as chaves e pré-compila regexes (`Vercel-Chinese.user.js:530–540`); percorre os termos e escreve `node.nodeValue` traduzido (`:615–637`). Os atributos também são traduzidos por substituição de string e `setAttribute` (`:640–661`). | contrária |
| Código-fonte (DOM existente) | `Vercel-Chinese.user.js:665–685` usa TreeWalker para percorrer nós de texto; `:688–718` percorre elementos/atributos. `:723–725` aplica a transformação a `document.body`. O alvo é a interface já fornecida pelo site, não uma segunda aplicação fornecida pelo repositório. | contrária |
| Código-fonte (conteúdo dinâmico) | `Vercel-Chinese.user.js:547–566` agenda a primeira tradução e observa alterações do DOM. `:568–574` limpa observadores ao descarregar; `:959–981` reage a load/cliques para reaplicar traduções. MutationObserver e eventos DOM não conectam unidades frontend independentes. | contrária |
| Documentação | `README.md:24–37` descreve tradução e tratamento de páginas dinâmicas; `README.md:53` lista cobertura de textos relativos a microfrontends. `README.md:115–133` explica TreeWalker, regexes e MutationObserver, coerente com o código. A expressão traduzida não confirma a arquitetura do tradutor ou da página de terceiros. | contexto |
| Build/deploy / Configuração (resolução) | O inventário não contém `package.json`, lockfile, builder, config de bundler ou dependência de federação para resolver. O script usa APIs DOM/navegador e não contém import/require ou diretiva `@require`. O campo `@icon` (`Vercel-Chinese.user.js:7`) aponta a uma imagem, não código frontend importado. Não se presume pacote/builder a partir do domínio Vercel ou de nomes de frameworks listados no README. | ausente |
| Estrutura / Configuração / Código-fonte (busca negativa) | Nos três arquivos do commit, procurados `ModuleFederationPlugin`, `withModuleFederation`, `remoteEntry`, `loadRemote`, `single-spa`, `registerApplication`, `qiankun`, `wujie`, `postMessage`, `iframe`, `importmap`, `customElements`, imports/exports, `require`, `@require` e `createElement`: nenhum resultado. A busca positiva `micro.?front`/`federat` encontra somente `README.md:53` e as duas chaves de tradução (`Vercel-Chinese.user.js:190`, `:236`). | ausente |
| Estrutura / Documentação (busca negativa de arquitetura) | O inventário completo não contém ADR, documento de arquitetura separado, host autoral, unidade remota, entradas HTML ou outros fontes. O README descreve o mecanismo de tradução (`README.md:115–133`), sem contrato de composição entre aplicações. | ausente |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhum alvo frontend próprio: o script percorre e traduz o DOM existente (`Vercel-Chinese.user.js:665–685`, `:723–725`). “Microfrontends” é texto do dicionário (`:190`, `:236`), não unidade configurada. |
| Q2 | No | Não existe conjunto de unidades com entradas/builds próprios nem unidade preparada para host externo. O único código executável é a IIFE de tradução (`Vercel-Chinese.user.js:17–35`) ativada por metadados de userscript (`:8–14`). |
| Q3 | No | Não há host/root autoral compondo aplicações. As correspondências a sites Vercel (`Vercel-Chinese.user.js:8–10`) selecionam páginas onde o texto é alterado, não unidades participantes de uma aplicação decomposta pelo autor. |
| Q4 | No | Ausência de mecanismo de composição na árvore e nas buscas. O mecanismo implementado é substituição de texto/atributos com observação do DOM (`Vercel-Chinese.user.js:547–566`, `:615–661`), não carregamento ou montagem de frontends. |
| Q5 | No | Utilitário de tradução de páginas de terceiros (`README.md:7`, `Vercel-Chinese.user.js:723–725`), com menções MFE como conteúdo traduzido. Q5 acompanha Q1–Q4. |

## Motivo

- Proposta `Non-MFE`, Q1–Q5 No: os termos temáticos pertencem ao conteúdo do tradutor; não existe implementação de arquitetura MFE. Os precedentes 023/028 e 075/081 impedem contar conteúdo nomeado/exibido como unidades.
- Não é MFE-unit: não há contrato de montagem/exposição de uma aplicação frontend. Ser executado em uma página externa por um gerenciador de scripts não basta para essa exceção. Por isso Q2–Q4 são No, sem Undetermined por host ausente.
- A plataforma de terceiros observada é Vercel; o meio de execução é um gerenciador de userscripts, como Tampermonkey/ScriptCat/Greasemonkey (`README.md:64–74`). O limite de plataforma do final 037 reforça que extensão de produto de terceiros não demonstra aplicação decomposta pelo autor. Aqui a exclusão já decorre da ausência de unidades/composição, sem override de Q5 ou presunção de que Vercel carregue este script por um protocolo oficial de plugin.
- `frontend_units: 0`, `unit_organization: none`, `ui_technologies: []`, `build_tools: []` e `approaches: []` descrevem o que foi inventariado. Nomes React/Next/Vue/Angular em `README.md:57–60` são exemplos de termos cobertos pela tradução, não frameworks usados para construir uma UI própria.

## Notas para análise

- **RQ1:** as duas rodadas registram hits terminológicos compatíveis com a cobertura de tradução descrita no README. O mesmo sinal aparece no código em strings de Map, demonstrando que uma ocorrência em fonte também pode ser apenas conteúdo.
- **RQ3:** cabeçalho de userscript → ativação em página existente → dicionário → regexes/TreeWalker → alteração de textos e atributos. Essa cadeia explica integralmente o código observado, sem inferir uma unidade a partir de recursos da plataforma traduzida.
- **Protocolo (famílias/templates):** `README.md:11–20` atribui a base a `liyixin21/vercel-chinese`; o cabeçalho identifica autor e autor original (`Vercel-Chinese.user.js:3–6`). A origem é declarada, não equivalência de código verificada. Buscas nas anotações por `Chuc-Jie`, `vercel-chinese`, `liyixin21`, userscript e nomes dos gerenciadores não encontraram irmão. Não foi acessado o upstream. O final 032 é paralelo por conter terminologia MFE em material textual/traduções; o final 037 fornece o limite de plugins de plataforma, sem demonstrar família compartilhada.
- **Histórico:** clone não raso; **7 commits alcançáveis**, **0 merges** e **1 commit-raiz**, `e7a99c1dfb10f2a0ebbf97d951c9c69cb8d23db2`, conferidos por `git rev-list --count`, `--count --merges` e `--max-parents=0`. Todos em 2026-03-22. O log com caminhos mostra criação do script na raiz, adição do README em `53abcb6`, alterações do script em `0252907`/`e925fef`, revisões do README em `3e9a00e`/`108f125` e adição da licença/revisão do README no SHA fixado. Não se usou o número de versões do README como contagem de commits.
- **Protocolo (branches e limites):** somente `master`, `origin/master` e `origin/HEAD`, todos no SHA fixado. A URL de instalação documentada (`README.md:72`) usa branch `main` e nome de arquivo minúsculo, enquanto o snapshot está em `master` com `Vercel-Chinese.user.js`; sua resolução externa não foi testada e não é necessária à decisão arquitetural. Nenhuma rede, submódulo, instalação ou execução do script foi feita. Nenhuma decisão aberta identificada.
