---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
inputs:
  clone: data/samples/mfe-sample-001/repos/bank20baht__poc-angular-native-federation-tailwindcss
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Leitura do repositório

O histórico alcançável até o snapshot tem 11 commits, de 2025-09-04 a 2025-09-19. A primeira presença observável dos dois manifestos e das configurações de federação é `bb8b5ac` (2025-09-04, "feat: module federation with native federation in angular 20"), o primeiro commit; isso não informa onde esses artefatos foram desenvolvidos antes. O snapshot é `d2f9722` (2025-09-19, "Merge branch 'feature/tailwindcss@4' of github.com:bank20baht/poc-angular-native-federation"). Entre eles, as mensagens anunciam experimentos de estilo: `f61b3c0` (2025-09-13, "feat: can render style from remote but tailwindcss host must scan remote first (tailwindcss.config.js)") e `bf201ac` (2025-09-17, "feat: using tailwindcss@4 and daysiui@5 in this project"). Essas mensagens não substituem a leitura do conteúdo das mudanças.

O snapshot confirma a ausência de uso direto de `@softarc/native-federation-node` nos dois pacotes e a ausência de consumo de `remote/Styles?inline`; não explica a origem dessas sobras. As consultas de nomes e estados dos arquivos situam as alterações, mas as quatro tentativas de ler conteúdos antigos falharam por objeto ausente. Assim, não é possível concluir que houve abandono de uso anterior, nem que os artefatos foram apenas planejados ou copiados. Não há unidade ou relação `Undetermined`, deploy `Undetermined` nem afirmação documental parcial ou contradita que acrescente ponto. O detalhe da porta no README do remote já foi resolvido pelo snapshot e ficou fora da tabela documental; não gera ponto histórico.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@softarc/native-federation-node` está declarado nos dois pacotes sem uso direto observado; houve uso anterior? | 3.4.2 (host/package.json:31; remote/package.json:31) | uso de dependência | bb8b5ac, 2025-09-04, feat: module federation with native federation in angular 20; f61b3c0, 2025-09-13, feat: can render style from remote but tailwindcss host must scan remote first (tailwindcss.config.js); bf201ac, 2025-09-17, feat: using tailwindcss@4 and daysiui@5 in this project | inconclusivo |
| 2 | A declaração `remote/Styles?inline` sem consumidor corresponde a uma composição de estilos abandonada? | 3.4.4, Notas (host/src/remote.d.ts:1); 3.4.5, Leitura do repositório (mesmo artefato) | ativo ou abandonado | f61b3c0, 2025-09-13, feat: can render style from remote but tailwindcss host must scan remote first (tailwindcss.config.js); 3c1e13e, 2025-09-14, feat: import remote routes to host, and create fallback components, fallback routes | inconclusivo |

## Observações

**1. Dependência sem uso direto.** No snapshot, a busca literal por `@softarc`, excluídos os lockfiles, retorna apenas host/package.json:31 e remote/package.json:31; as entradas e configurações usam `@angular-architects/native-federation`. O log dos caminhos mostra a criação dos manifestos em `bb8b5ac` e alterações em `f61b3c0`, `82481eb` (2025-09-13, "feat: use daysiui@4 in project but require import class in safelist") e `bf201ac`. Os conteúdos dos dois manifestos em `bb8b5ac` não estão disponíveis: ambas as consultas falharam. A criação e as alterações desses arquivos não demonstram quando a dependência entrou nem se já foi usada. O histórico consultado não permite atribuir o `No` do snapshot a abandono, intenção ou cópia; o resultado é inconclusivo e o julgamento de 3.4.2 permanece explicado apenas pelas evidências do snapshot.

**2. Declaração de estilos sem consumidor.** O snapshot contém a declaração em host/src/remote.d.ts:1, sem import correspondente e sem exposição `./Styles` em remote/federation.config.js:7-10; o estilo atual vem da varredura do código do remote por host/src/styles.css:2-5. O log com `--full-history` mostra que `f61b3c0` adiciona o arquivo de declaração e modifica a tabela de rotas do host e a configuração de federação do remote. Não registra alteração posterior da declaração até o snapshot. A mensagem desse commit anuncia a necessidade de varredura do remote pelo Tailwind do host; não afirma uso de `remote/Styles?inline`. As tentativas de ler as rotas e a configuração do remote nessa versão falharam por objeto ausente. O log também registra alterações posteriores desses caminhos, incluindo `3c1e13e`, cuja mensagem anuncia rotas e fallbacks. Saber quando a declaração apareceu não prova que ela chegou a ser conectada ou que foi abandonada. A origem do resíduo continua inconclusiva, sem mudar a leitura da composição ativa no snapshot.

## Comandos

As consultas abaixo foram limitadas ao snapshot ou a commits encontrados no histórico alcançável dele. As quatro consultas `show` falharam com `fatal: bad object` por conteúdo ausente, sem busca de objetos.

```sh
docs/mfe-history-review/tools/hist.sh bank20baht__poc-angular-native-federation-tailwindcss log --format='%h %ad %s' --date=short d2f9722e77b754318c831138d54aebbfd093ee1e
docs/mfe-history-review/tools/hist.sh bank20baht__poc-angular-native-federation-tailwindcss log --full-history --reverse --format='%h %ad %s' --date=short --name-status d2f9722e77b754318c831138d54aebbfd093ee1e -- host/package.json remote/package.json host/src/remote.d.ts host/src/main.ts host/src/app/app.routes.ts host/federation.config.js remote/federation.config.js
docs/mfe-history-review/tools/hist.sh bank20baht__poc-angular-native-federation-tailwindcss show bb8b5ac:host/package.json
docs/mfe-history-review/tools/hist.sh bank20baht__poc-angular-native-federation-tailwindcss show bb8b5ac:remote/package.json
docs/mfe-history-review/tools/hist.sh bank20baht__poc-angular-native-federation-tailwindcss show f61b3c0:host/src/app/app.routes.ts
docs/mfe-history-review/tools/hist.sh bank20baht__poc-angular-native-federation-tailwindcss show f61b3c0:remote/federation.config.js
```

Antes e depois das consultas, a comparação abaixo terminou com código 0, sem diferenças:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Resumo

Commits até o snapshot: 11 (2025-09-04 a 2025-09-19). Pontos: 2 (esclarecido: 0, inconclusivo: 2, resolvido pelo snapshot: 0).
