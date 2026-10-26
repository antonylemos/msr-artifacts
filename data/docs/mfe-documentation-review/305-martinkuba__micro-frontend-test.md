---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 305 — martinkuba/micro-frontend-test

## Leitura do repositório

O único documento `documentation` é o README, em inglês, lido inteiro. Ele apresenta uma aplicação de teste do Grafana Faro com shell e main-content, composta em runtime por Webpack Module Federation (README.md:3-10). As revisões 3.4.2 a 3.4.6 estão `final`, com o mesmo commit da classificação e da aquisição. A composição ativa confirma a descrição do README (3.4.5 #1); o terceiro pacote, sidebar, está fora dessa composição (packages/shell/webpack.config.js:36; packages/shell/src/App.tsx:7,206-214).

Todas as ocorrências `doc-*` estão em README.md:1,3,7,8,10,23. O título em README.md:1 é menção sem afirmação e não virou linha; as demais estão na tabela, incluindo os três padrões sobrepostos em README.md:10 e os dois em README.md:7. Os comandos e o endereço de execução local (README.md:14-19), a orientação de ajustar o coletor (README.md:23) e os botões de teste de telemetria (README.md:25) são contexto operacional, sem afirmação adicional sobre a arquitetura. Não há documento de template ou de terceiros listado.

Foram lidos os manifestos da raiz e dos três pacotes, as três configurações webpack e os fontes citados pelas revisões anteriores: packages/shell/src/App.tsx, packages/shell/src/index.tsx, packages/shell/src/bootstrap.tsx, packages/shell/src/remotes.d.ts, os três src/faro.ts, packages/main-content/src/MainContent.tsx e as entradas dos remotes. Também foi lido packages/sidebar/src/Sidebar.tsx. A descrição da raiz (package.json:4) repete as afirmações 1 e 4. Os comentários de inicialização do Faro (packages/main-content/src/MainContent.tsx:107; packages/main-content/src/faro.ts:28; packages/sidebar/src/Sidebar.tsx:87; packages/sidebar/src/faro.ts:28) retomam o contexto da afirmação 5; o de bootstrap do shell apenas informa a ordem local da inicialização (packages/shell/src/bootstrap.tsx:6-7). A declaração de tipos (packages/shell/src/remotes.d.ts:1-10) não afirma que ambos os remotes estejam ativos. As linhas de import e configuração comentadas são código, não novas afirmações documentais. Os textos explicativos da interface também foram confrontados: a descrição de carregamento do main-content corresponde ao consumo ativo, mas a mensagem do sidebar não corresponde à composição atual (packages/main-content/src/MainContent.tsx:159-160; packages/sidebar/src/Sidebar.tsx:158).

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "A simple micro frontend application" | estrutura | corroborada | 3.4.5 #1; packages/shell/src/App.tsx:6,199-203 |
| 2 | README.md:7 | "Shell [...] Host application that loads remote micro frontends" | estrutura | corroborada | 3.4.5 #1; packages/shell/webpack.config.js:32-35; packages/shell/src/App.tsx:6,201 |
| 3 | README.md:8 | "Main Content [...] Remote micro frontend with its own Faro instance" | estrutura | corroborada | 3.4.5 #1; packages/main-content/webpack.config.js:31-36; packages/main-content/src/MainContent.tsx:108-110; packages/main-content/src/faro.ts:9-28 |
| 4 | README.md:10 | "Uses Webpack Module Federation to dynamically load micro frontends at runtime." | composição | corroborada | 3.4.5 #1; packages/shell/webpack.config.js:32-35; packages/shell/src/App.tsx:6,201 |
| 5 | README.md:23 | "Each micro frontend initializes its own Faro instance in `src/faro.ts`." | outro | corroborada | packages/shell/src/bootstrap.tsx:3-7; packages/shell/src/faro.ts:10-32; packages/main-content/src/MainContent.tsx:108-110; packages/main-content/src/faro.ts:9-28; packages/sidebar/src/Sidebar.tsx:87-90; packages/sidebar/src/faro.ts:8-28 |
| 6 | packages/main-content/src/MainContent.tsx:159-160 | "This component is loaded from the [...] main-content [...] micro frontend via Module Federation." | composição | corroborada | 3.4.5 #1; packages/main-content/webpack.config.js:34-36; packages/shell/src/App.tsx:6,201 |
| 7 | packages/main-content/src/MainContent.tsx:160 | "It runs independently" | independência | sem corroboração | — |
| 8 | packages/main-content/src/MainContent.tsx:160 | "shares React with the shell" | composição | corroborada | packages/main-content/src/MainContent.tsx:1; packages/shell/src/App.tsx:1; packages/main-content/webpack.config.js:37-39; packages/shell/webpack.config.js:38-40 |
| 9 | packages/main-content/src/MainContent.tsx:218-219 | "Each micro frontend is built as a separate bundle" | build-deploy | corroborada | 3.4.6 #1, #2, #3; packages/main-content/webpack.config.js:8-10; packages/shell/webpack.config.js:9-11; packages/sidebar/webpack.config.js:8-10 |
| 10 | packages/shell/src/App.tsx:206 | "Sidebar hidden for now" | estrutura | corroborada | packages/shell/src/App.tsx:7,206-214; packages/shell/webpack.config.js:36 |
| 11 | packages/shell/src/index.tsx:1 | "Dynamic import to ensure shared dependencies are loaded first" | composição | corroborada | packages/shell/src/index.tsx:2; packages/shell/src/bootstrap.tsx:1-4,14-19; packages/shell/webpack.config.js:38-42 |
| 12 | packages/sidebar/src/Sidebar.tsx:158 | "✓ Loaded via Module Federation" | composição | contradita | packages/shell/webpack.config.js:36; packages/shell/src/App.tsx:7,206-214 |
| 13 | packages/sidebar/webpack.config.js:40 | "Faro SDK is NOT shared - this micro frontend has its own bundle" | composição | corroborada | packages/sidebar/webpack.config.js:31-41; packages/sidebar/src/faro.ts:1-6,15-28; 3.4.6 #3 |

## Observações

**1. README.md.** A apresentação do projeto como aplicação de micro-frontends tem suporte na cadeia entre host e remote, configurada e renderizada no snapshot (3.4.5 #1; packages/shell/src/App.tsx:6,199-203). A descrição em package.json:4 repete essa caracterização, acrescentando a tecnologia da afirmação 4. O propósito de teste do Faro é contexto do projeto.

**2. README.md.** O shell é o host, declara mainContent e o renderiza (packages/shell/webpack.config.js:32-35; packages/shell/src/App.tsx:6,201). O plural genérico não enumera outros remotes ativos: a lista documental contém somente shell e main-content (README.md:7-8). O sidebar está desabilitado no host (packages/shell/webpack.config.js:36).

**3. README.md.** Main-content expõe MainContent por um remoteEntry próprio e é consumido pelo shell (packages/main-content/webpack.config.js:31-36; packages/shell/src/App.tsx:6). Também chama initFaro ao montar e mantém sua instância em variável local, com isolate habilitado (packages/main-content/src/MainContent.tsx:108-110; packages/main-content/src/faro.ts:9-28). O papel de remote não implica execução autônoma da UI, que a revisão 3.4.3 deixou Undetermined.

**4. README.md.** O mecanismo nomeado coincide com o ModuleFederationPlugin do webpack e o import dinâmico do host (packages/shell/webpack.config.js:3,32-35; packages/shell/src/App.tsx:6,201). A mesma propriedade geral reaparece na descrição da raiz (package.json:4), no comentário de carregamento do host (packages/shell/src/App.tsx:5) e na explicação da interface (packages/main-content/src/MainContent.tsx:217-218); não gera outras linhas por repetição.

**5. README.md.** Shell e main-content inicializam o Faro por caminhos próprios (packages/shell/src/bootstrap.tsx:3-7; packages/main-content/src/MainContent.tsx:108-110), com variáveis locais em seus faro.ts (packages/shell/src/faro.ts:10-17; packages/main-content/src/faro.ts:9-16). O sidebar contém o mesmo padrão, embora seu componente não esteja montado no host (packages/sidebar/src/Sidebar.tsx:87-90; packages/sidebar/src/faro.ts:8-15; packages/shell/src/App.tsx:206-214). A afirmação se confirma para a composição ativa; o terceiro pacote só preserva a implementação. Compartilhar o SDK como singleton não significa compartilhar a instância criada: main-content usa isolate: true (packages/main-content/src/faro.ts:28).

**6. packages/main-content/src/MainContent.tsx.** A frase identifica especificamente a origem do componente exibido: o módulo ./MainContent aponta para esse fonte e é importado e renderizado pelo shell (packages/main-content/webpack.config.js:34-36; packages/shell/src/App.tsx:6,201). É verificável além da menção geral ao mecanismo na afirmação 4.

**7. packages/main-content/src/MainContent.tsx.** A independência de execução não está demonstrada. A entrada do pacote apenas reexporta o componente (packages/main-content/src/index.ts:1), enquanto a montagem observada ocorre no shell (packages/shell/src/bootstrap.tsx:14-19; packages/shell/src/App.tsx:201). O build e o servidor próprios (packages/main-content/package.json:6-7) não comprovam uma UI autônoma. Como na revisão 3.4.3, a ausência de uma entrada que monte essa UI deixa a propriedade sem confirmação, sem demonstrar que seria impossível executá-la em outro contexto.

**8. packages/main-content/src/MainContent.tsx.** React é efetivamente usado pelos dois lados (packages/main-content/src/MainContent.tsx:1; packages/shell/src/App.tsx:1) e declarado singleton em ambas as configurações federadas (packages/main-content/webpack.config.js:37-39; packages/shell/webpack.config.js:38-40). A generalização posterior sobre dependências comuns, exemplificadas por React (packages/main-content/src/MainContent.tsx:219), repete essa propriedade. A ausência de duplicação é a finalidade declarada da configuração, sem medição de bundles executados.

**9. packages/main-content/src/MainContent.tsx.** Cada pacote possui configuração, entrada e diretório dist próprios (packages/main-content/webpack.config.js:8-10; packages/shell/webpack.config.js:9-11; packages/sidebar/webpack.config.js:8-10), coerentes com os três builds separados em 3.4.6. A frase não afirma deploy independente.

**10. packages/shell/src/App.tsx.** O comentário descreve a retirada temporária do sidebar da interface. O bloco inteiro de montagem está comentado, assim como o import e a declaração do remote (packages/shell/src/App.tsx:7,206-214; packages/shell/webpack.config.js:36). Portanto, corresponde ao estado do snapshot.

**11. packages/shell/src/index.tsx.** O comentário descreve a fronteira assíncrona antes do bootstrap: a entrada faz import('./bootstrap'), e o bootstrap importa React, React DOM e App antes da montagem (packages/shell/src/index.tsx:2; packages/shell/src/bootstrap.tsx:1-4,14-19). As dependências compartilhadas estão declaradas no host (packages/shell/webpack.config.js:38-42). A corroboração é estática, sem execução do carregamento.

**12. packages/sidebar/src/Sidebar.tsx.** A mensagem de status afirma um carregamento que não ocorre na composição presente: o shell comenta a referência federada, o import e a montagem (packages/shell/webpack.config.js:36; packages/shell/src/App.tsx:7,206-214). O sidebar tem configuração de exposição (packages/sidebar/webpack.config.js:31-36), mas isso não confirma a mensagem de que já foi carregado. A contradição é do texto da interface com o snapshot, sem alterar as revisões anteriores.

**13. packages/sidebar/webpack.config.js.** O comentário diferencia o empacotamento do SDK no sidebar. O pacote importa Faro diretamente (packages/sidebar/src/faro.ts:1-6), mas seu shared contém apenas React e React DOM (packages/sidebar/webpack.config.js:37-41). Isso sustenta o bundle próprio do SDK, em contraste com a configuração compartilhada de shell e main-content (packages/shell/webpack.config.js:41; packages/main-content/webpack.config.js:40), conforme 3.4.6 #3.

## Resumo

Afirmações: 13 (corroborada: 11, parcial: 0, contradita: 1, sem corroboração: 1). Temas: (estrutura: 4, composição: 6, build-deploy: 1, independência: 1, outro: 1).
