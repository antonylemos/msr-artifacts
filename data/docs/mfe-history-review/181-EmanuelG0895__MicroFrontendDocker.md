---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
inputs:
  clone: data/samples/mfe-sample-001/repos/EmanuelG0895__MicroFrontendDocker
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 181 — EmanuelG0895/MicroFrontendDocker

## Leitura do repositório

O histórico até o snapshot tem 18 commits, sem merges, de 2025-06-27 a 2025-08-19. Dezessete são de 2025-06-27: `4f9653f` ("Initial commit") adiciona só o `.gitattributes`, e `c228808` ("incio de proyecto") introduz as três pastas, `MF-Shell/`, `MF-Characters/` e `MF-CharacterDetail/`, cada uma com `package.json`, `rspack.config.ts`, `module-federation.config.ts` e `src/`. Seguem os commits das telas (`63e9550` "micrfrontend con buscador y tajeta ordenada", `7c93dbc` "creacion de componente falta conectar", `411b8a1` "ruta creada y funcionando"), os do Docker (`0608a73` "doker", que adiciona o Dockerfile da raiz, os Dockerfiles dos remotes, docker-compose.yml, nginx.conf, start.sh e README-Docker.md, até `05a3ca8` "doker"), `6d5fdab` ("puertos") e `feccf9f` ("README"), que adiciona o README.md. O único commit posterior é o próprio snapshot, `137ba29` (2025-08-19, "Update ports, module federation, and type definitions"), que altera `MF-Shell/module-federation.config.ts`, os dois `webpack.config.js`, `MF-CharacterDetail/src/services/api.ts`, `MF-Shell/@mf-types/MF_CharacterDetail/apis.d.ts` e remove `MF-Shell/@mf-types/MF_Characters/apis.d.ts`. O README.md e o README-Docker.md não mudam depois de criados.

O clone é parcial e só tem o conteúdo das versões do snapshot. As versões antigas dos arquivos consultados (o `module-federation.config.ts` do host antes de `137ba29`, os `package.json`, os `webpack.config.js`, o `docker-compose.yml` e o `CharacterInfo.tsx` iniciais) não estão disponíveis: o histórico mostra quais arquivos cada commit criou, alterou ou removeu, e, por `ls-tree`, quando um arquivo ainda tem o mesmo objeto do snapshot, mas não o que as versões anteriores diziam. O `log --name-status` com detecção de renomeação para em `7c93dbc` ao pedir um objeto ausente; a lista completa foi obtida com `--no-renames`.

Pontos levantados: da 3.4.2 e da 3.4.3 (Notas), os `webpack.config.js` não usados; da 3.4.5 (Leitura), a troca entre os nomes dos remotes e o conteúdo, retomada nas afirmações 5 e 6 da 3.4.7, e o `shared-hooks` do host sem pacote nem uso; da 3.4.6 (Leitura), o descompasso de portas entre a composição e o perfil Docker, retomado na afirmação 10 da 3.4.7; e da 3.4.7, as afirmações 2 (`parcial`) e 11 (`contradita`). A 3.4.2 não tem dependência sem uso, a 3.4.3 não tem unidade `Undetermined`, a 3.4.4 não tem construção inativa, comentada ou `Undetermined` (as três linhas de `MF-Shell/@mf-types/` são declarações de tipo, `none`), a 3.4.5 não tem relação `Undetermined` e a 3.4.6 não tem deploy `Undetermined`. A nota da 3.4.4 sobre `MF-Shell/@mf-types/index.d.ts:2`, que importa um `./MF_Characters/apis.d.ts` ausente, não virou ponto: é detalhe de tipos gerados, sem dúvida sobre a composição; o histórico mostra que esse arquivo foi adicionado em `411b8a1` e removido em `137ba29`. O snapshot não resolve nenhum dos pontos.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `MF-Characters/webpack.config.js` e `MF-CharacterDetail/webpack.config.js` não são usados por nenhum script, que só chamam `rspack` | 3.4.2 (Notas); 3.4.3 (Notas); 3.4.6 (Leitura) | ativo ou abandonado | c228808 2025-06-27 incio de proyecto; 7c93dbc 2025-06-27 creacion de componente falta conectar; 411b8a1 2025-06-27 ruta creada y funcionando; 8850753 2025-06-27 parche de error de configuracion; 137ba29 2025-08-19 Update ports, module federation, and type definitions | inconclusivo |
| 2 | Os nomes dos remotes não correspondem ao conteúdo: `MF-CharacterDetail` expõe a lista e `MF-Characters` o detalhe, e a documentação diz o contrário | 3.4.5 (Leitura); 3.4.7 #5, #6 | estágios em conflito | c228808 2025-06-27 incio de proyecto; 63e9550 2025-06-27 micrfrontend con buscador y tajeta ordenada; 7c93dbc 2025-06-27 creacion de componente falta conectar; 0608a73 2025-06-27 doker; feccf9f 2025-06-27 README | esclarecido |
| 3 | O host compartilha `shared-hooks` como singleton, sem pacote nem uso correspondente | 3.4.5 (Leitura); 3.4.7 (Leitura) | ativo ou abandonado | 137ba29 2025-08-19 Update ports, module federation, and type definitions | inconclusivo |
| 4 | As URLs dos remotes no host usam as portas de desenvolvimento (3003/3002), e a documentação e o perfil Docker usam 3001/3002 | 3.4.6 (Leitura); 3.4.7 #10 | estágios em conflito | 411b8a1 2025-06-27 ruta creada y funcionando; 8850753 2025-06-27 parche de error de configuracion; 6d5fdab 2025-06-27 puertos; feccf9f 2025-06-27 README; 137ba29 2025-08-19 Update ports, module federation, and type definitions | inconclusivo |
| 5 | "cuando accedas a cualquier URL, se levantan automáticamente TODOS los servicios" não tem artefato que inicie contêineres por requisição | 3.4.7 #2 | estágios em conflito | 0608a73 2025-06-27 doker; 4473fa3 2025-06-27 parche doker | inconclusivo |
| 6 | A árvore do README põe um Dockerfile em `MF-Shell/`, que não existe; a imagem do shell vem do Dockerfile da raiz | 3.4.7 #11 | estágios em conflito | 0608a73 2025-06-27 doker; feccf9f 2025-06-27 README | esclarecido |

## Observações

**1. `webpack.config.js` não usados.** `MF-Characters/webpack.config.js` já está em `c228808`, o commit que cria as três pastas. `7c93dbc` adiciona `MF-CharacterDetail/webpack.config.js` e um `MF-Shell/webpack.config.js`, e `411b8a1` remove o do shell. Os dois que restam são alterados no snapshot, `137ba29`, cuja mensagem anuncia atualização de portas e de Module Federation. Os `package.json` dos remotes, onde estão os scripts, só mudam em `c228808` e `8850753` ("parche de error de configuracion"), e as versões anteriores de todos esses arquivos não estão no clone. O histórico não mostra se algum script chamou webpack em algum momento, nem por que os arquivos continuam sendo editados; que tenham sido mexidos em `137ba29` não prova uso. O ponto fica sem resposta.

**2. Nomes dos remotes trocados.** O histórico de `MF-CharacterDetail/src/components` e `MF-Characters/src/components` mostra que `view.tsx`, o componente da lista que o host monta em `/`, é adicionado em `MF-CharacterDetail` por `63e9550` (a mensagem anuncia "micrfrontend con buscador y tajeta ordenada"), e que `vista.tsx` e `detalles-personaje.tsx`, a tela de detalhe, são adicionados em `MF-Characters` por `7c93dbc`. Nenhum arquivo dessas pastas é removido ou passa de uma para a outra até o snapshot. O README-Docker.md (`0608a73`) e o README.md (`feccf9f`) são escritos depois, e não mudam mais. Delimitado a esses caminhos, o histórico esclarece que a divisão descrita pela documentação não corresponde a um estágio anterior dos arquivos: a lista esteve em `MF-CharacterDetail` e o detalhe em `MF-Characters` desde que foram criados. O `CharacterInfo.tsx`, presente em `MF-CharacterDetail` desde `c228808`, tem nome de detalhe, mas o seu conteúdo inicial não está disponível, e o histórico não diz se a pasta foi pensada para o detalhe antes de receber a lista. Os valores da 3.4.7 ficam como estão.

**3. `shared-hooks`.** `MF-Shell/module-federation.config.ts` muda em sete dos dezoito commits, o último deles o snapshot (`137ba29`), e nenhuma versão anterior está disponível. Nenhum commit até o snapshot cria um caminho com `shared-hooks`. O histórico não mostra quando a entrada apareceu na configuração nem se havia um pacote planejado; não distingue configuração planejada e nunca conectada de configuração abandonada. O ponto fica sem resposta.

**4. Portas.** `MF-CharacterDetail/rspack.config.ts` tem o objeto do snapshot desde `411b8a1` e `MF-Characters/rspack.config.ts` desde `6d5fdab` ("puertos"); os `package.json` dos remotes, com as portas de `start:prod`, desde `8850753`. Todos são anteriores a `feccf9f`, que adiciona o README.md. Ou seja: quando o README foi escrito, as portas de desenvolvimento dos remotes (3003 e 3002) e as do perfil Docker (3001 e 3002) já eram as do snapshot, e a tabela de portas não descreve um estágio anterior dos remotes. O único arquivo do ponto que muda depois do README é a configuração do host, alterada em `feccf9f` e de novo em `137ba29`, cuja mensagem anuncia "Update ports, module federation". Como a versão de `feccf9f` não está no clone, o histórico não mostra se o bloco do README com `MF_CharacterDetail@http://localhost:3002` e `MF_Characters@http://localhost:3001` (README.md:113-118) reproduzia a configuração do host naquele dia. A pergunta, se a documentação e a composição pertencem a estágios diferentes, fica sem resposta.

**5. Serviços que sobem "ao acessar qualquer URL".** O README-Docker.md é adicionado em `0608a73` e não muda mais. O `docker-compose.yml` nasce no mesmo commit e muda uma vez, em `4473fa3` ("parche doker"); a versão de `0608a73` não está no clone. O histórico não mostra se o compose ou outro artefato já teve algum mecanismo de início por requisição, nem se a frase é intenção ou descrição livre do `up` com `depends_on`. O ponto fica sem resposta, e a corroboração `parcial` da 3.4.7 fica como está.

**6. Dockerfile em `MF-Shell/`.** A consulta de `MF-Shell/Dockerfile` com `--full-history` volta vazia: o arquivo nunca existiu até o snapshot. O Dockerfile da raiz é adicionado em `0608a73`, junto com os de `MF-Characters/` e `MF-CharacterDetail/`, e o README.md, com a árvore de pastas, só em `feccf9f`, depois. O histórico esclarece que a árvore não descreve um estágio anterior do repositório: a imagem do shell sempre veio do Dockerfile da raiz.

## Comandos

```
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker rev-list --count 137ba29996f64553efd3401f8ad619646d8a78e5
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker rev-list --count --merges 137ba29996f64553efd3401f8ad619646d8a78e5
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --reverse --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --reverse --format='%h %ad %s' --date=short --name-status 137ba29996f64553efd3401f8ad619646d8a78e5   # falhou em 7c93dbc: objeto 140fae5… ausente (lazy fetching disabled)
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --reverse --no-renames --format='%h %ad %s' --date=short --name-status 137ba29996f64553efd3401f8ad619646d8a78e5
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree 6d5fdab MF-Shell/module-federation.config.ts ...   # recusado pelo script (caminho como argumento); o mesmo para feccf9f e 137ba29
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r c228808
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 7c93dbc
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 411b8a1
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 0608a73
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 4473fa3
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 8850753
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 6d5fdab
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r feccf9f
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker ls-tree -r 137ba29996f64553efd3401f8ad619646d8a78e5
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t feccf9f:MF-Shell/module-federation.config.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 6d5fdab:MF-Shell/module-federation.config.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 8850753:MF-Shell/module-federation.config.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t c228808:MF-Characters/package.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 0608a73:MF-Characters/package.json   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t c228808:MF-Characters/webpack.config.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 7c93dbc:MF-CharacterDetail/webpack.config.js   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 0608a73:docker-compose.yml   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t c228808:MF-CharacterDetail/src/components/CharacterInfo.tsx   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 6d5fdab:MF-Characters/rspack.config.ts   # blob (o mesmo objeto do snapshot)
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker cat-file -t 8850753:MF-Characters/rspack.config.ts   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-Shell/Dockerfile   # saída vazia
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- README.md
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- README-Docker.md
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- docker-compose.yml
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-Shell/module-federation.config.ts
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-Characters/rspack.config.ts
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-CharacterDetail/rspack.config.ts
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-Characters/package.json
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-CharacterDetail/package.json
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short --name-status 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-Characters/webpack.config.js MF-CharacterDetail/webpack.config.js MF-Shell/webpack.config.js
docs/mfe-history-review/tools/hist.sh EmanuelG0895__MicroFrontendDocker log --full-history --no-renames --format='%h %ad %s' --date=short --name-status 137ba29996f64553efd3401f8ad619646d8a78e5 -- MF-CharacterDetail/src/components MF-Characters/src/components
```

## Resumo

Commits até o snapshot: 18 (2025-06-27 a 2025-08-19). Pontos: 6 (esclarecido: 2, inconclusivo: 4, resolvido pelo snapshot: 0).
