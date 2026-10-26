---
schema: 1
id: 984418769
full_name: Alex18gr/react-ng-vite-systemjs-spa-app
commit: 1fe831db68f3ee26779b7c411b39326eed40198f
inputs:
  clone: data/samples/mfe-sample-001/repos/Alex18gr__react-ng-vite-systemjs-spa-app
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Leitura do repositório

O histórico até o snapshot tem dois commits, ambos de 2025-05-16. A raiz `8a9367e` (2025-05-16, “initial commit”) adiciona todos os projetos; `1fe831d` (2025-05-16, “Readme improvements”) altera somente `README.md`. Assim, os manifestos, configurações e fontes envolvidos nos pontos abaixo não mudaram entre a primeira presença observável e o snapshot. A listagem da árvore inicial confirma a presença dos arquivos de React, React/Vite e root config consultados. Não é uma sequência de introdução gradual da composição: ela já aparece pronta no primeiro estado versionado.

O esclarecimento histórico fica limitado à continuidade desses artefatos nos dois commits. Não prova que dependências tenham sido usadas antes, que os trechos comentados tenham sido executados, nem que tenham sido abandonados. Tampouco permite separar a origem do código em relação ao exemplo externo mencionado em README.md:2. Os conteúdos relevantes do snapshot são os mesmos arquivos adicionados na raiz, pois a única alteração posterior é no README; não foi necessário solicitar conteúdo antigo nem objeto ausente. As revisões estrutural e de composição não têm valores `Undetermined`, a de build/deploy não tem deploy `Undetermined`, e as três afirmações da documentação são corroboradas.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@types/systemjs` está declarado em react-app sem referência explícita | 3.4.2 (react-app/package.json:60) | uso de dependência | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | esclarecido |
| 2 | O uso de `ts-config-single-spa` pelo build da react-app é indeterminado | 3.4.2 (react-app/package.json:45) | uso de dependência | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | esclarecido |
| 3 | `webpack-config-single-spa-react` é declarado, mas a configuração usa outro preset | 3.4.2 (react-app/package.json:49) | uso de dependência | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | esclarecido |
| 4 | `webpack-config-single-spa-ts` é declarado na react-app sem uso nessa unidade | 3.4.2 (react-app/package.json:51) | uso de dependência | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | esclarecido |
| 5 | A react-vite-app declara `systemjs` e contém um carregamento dinâmico de styleguide comentado | 3.4.2 (react-vite-app/package.json:19); 3.4.4 (react-vite-app/src/App.tsx:26) | uso de dependência | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | esclarecido |
| 6 | O root config declara `systemjs`, mas carrega o SystemJS pela CDN | 3.4.2 (root-config/package.json:48) | uso de dependência | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | esclarecido |
| 7 | O uso dos tipos `@types/systemjs` pelo build do root config é indeterminado | 3.4.2 (root-config/package.json:23) | uso de dependência | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | esclarecido |
| 8 | O uso de `ts-config-single-spa` pelo build do root config é indeterminado | 3.4.2 (root-config/package.json:36) | uso de dependência | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | esclarecido |
| 9 | As instruções e a meta de restrição de import-map-overrides estão comentadas | 3.4.4 (root-config/src/index.ejs:22-24) | ativo ou abandonado | — | resolvido pelo snapshot |
| 10 | O mapa de produção está comentado, enquanto o mapa das unidades só existe no modo local | 3.4.4 (root-config/src/index.ejs:60); 3.4.5, Leitura; 3.4.6, Leitura e observação 4 | ativo ou abandonado | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | esclarecido |
| 11 | Há uma chamada comentada de importação do próprio root config | 3.4.4 (root-config/src/index.ejs:197) | ativo ou abandonado | — | resolvido pelo snapshot |
| 12 | O script de ZoneJS na página do root config está comentado | 3.4.4 (root-config/src/index.ejs:91) | ativo ou abandonado | — | resolvido pelo snapshot |

## Observações

**1. Tipos SystemJS na react-app.** O manifesto, o tsconfig, as declarações e as fontes da unidade são adicionados em `8a9367e` e não mudam até `1fe831d`. O histórico esclarece que a declaração sem referência explícita já acompanha o primeiro estado observável; não há uma remoção de uso registrada entre esses estados. Não explica por que a dependência foi declarada nem demonstra uso implícito pelo compilador. O `No` do snapshot permanece.

**2. ts-config-single-spa na react-app.** A extensão do tsconfig e o build com Babel/preset webpack já coexistem na raiz e não mudam depois. O resultado esclarece essa continuidade, sem resolver a leitura interna do tsconfig pelo preset instalado, que está fora dos artefatos disponíveis. O `Undetermined` de 3.4.2 permanece; não se infere intenção nem abandono.

**3. Preset React sem TypeScript.** A declaração de `webpack-config-single-spa-react` e o uso direto de `webpack-config-single-spa-react-ts` já estão juntos no primeiro estado e permanecem iguais. Não há troca de um pelo outro registrada neste histórico. Isso delimita a ausência de um estágio anterior observável com uso direto do primeiro, sem provar sua origem ou motivação. O `No` permanece.

**4. Preset TypeScript na react-app.** O manifesto da react-app e seu webpack são adicionados na raiz, sem alteração posterior. O uso de `webpack-config-single-spa-ts` em outro projeto, root-config, também já está presente nesse estado; não há transferência registrada entre as unidades. A conclusão é só a continuidade da declaração sem uso direto nessa unidade, mantendo o `No`.

**5. SystemJS e importação de styleguide na react-vite-app.** O manifesto, App.tsx e vite.config.ts são adicionados na raiz e não mudam. Logo, o import estático de styleguide (react-vite-app/src/App.tsx:6) já coexistia com o bloco dinâmico comentado (:20-34), em vez de uma substituição aparecer entre os commits disponíveis. O import estático é usado no JSX (:83-89); o trecho comentado usaria o global `System`, sem demonstrar uso da cópia de `systemjs` declarada no manifesto. O histórico esclarece a coexistência desde o primeiro estado, mas não permite dizer se houve experimento anterior, cópia ou abandono. O `No` da dependência e da construção permanece.

**6. SystemJS no root config.** package.json e index.ejs são adicionados na raiz e não mudam: a dependência declarada já coexistia com o carregamento de CDN (root-config/src/index.ejs:95-99). Não há migração registrada entre pacote instalado e CDN. Essa é a conclusão histórica delimitada; não comprova uso da dependência instalada, e o `Undetermined` permanece.

**7. Tipos SystemJS no root config.** Manifesto, tsconfig, declarações e fontes são os mesmos desde o primeiro commit. A inclusão genérica de tipos e os acessos ao global `System` não pertencem a estágios diferentes do histórico disponível. Isso esclarece a continuidade, mas não verifica a checagem de tipos interna do preset; o `Undetermined` permanece.

**8. ts-config-single-spa no root config.** O tsconfig que estende o pacote e o build com Babel/preset webpack já coexistem no primeiro estado e não mudam. Não há uma mudança histórica de ferramenta que explique a declaração. O esclarecimento é limitado à continuidade desses arquivos; a leitura interna pelo preset continua fora do snapshot e o `Undetermined` permanece.

**9. Configuração opcional de import-map-overrides.** O snapshot resolve o ponto: root-config/src/index.ejs:22 manda descomentar a linha para restringir ambientes; :24 traz `denylist:prod.example.com`, ainda dentro de comentário HTML. A biblioteca continua carregada em :93 e o painel declarado em :199. É uma opção de configuração apresentada pelo template, não evidência de um ambiente de produção abandonado. Não foi necessária consulta histórica específica.

**10. Mapa de produção.** index.ejs e os scripts do root config já estão na raiz e não mudam até o snapshot. Assim, o mapa de produção comentado (:59-60) e o mapa das unidades condicionado a `isLocal` (:62-85) já coexistem na primeira presença observável. Não há remoção de mapa ativo nem artefato de deploy acrescentado ou retirado entre os dois commits. Isso esclarece o recorte versionado, mas não comprova planejamento, abandono ou publicação externa. O deploy continua `não observado`.

**11. Importação duplicada do root config.** O próprio snapshot contém a chamada ativa `System.import('@org1/root-config')` em root-config/src/index.ejs:135 e a repetição comentada em :197. Portanto, o comentário não significa que o carregamento do root tenha sido desativado. A leitura se resolve por essa coexistência, sem precisar atribuir uma causa histórica ao comentário.

**12. Script de ZoneJS.** O próprio snapshot tem `import 'zone.js/dist/zone'` em angular-app/src/main.single-spa.ts:14, a entrada configurada em angular-app/angular.json:25. Também declara src/polyfills.ts em angular.json:26, cujo :60 importa `zone.js`. O script de CDN comentado no host não demonstra ausência de ZoneJS na aplicação. Isso resolve a aparente lacuna sem inferir quando ou por que o script foi comentado.

## Comandos

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
docs/mfe-history-review/tools/hist.sh Alex18gr__react-ng-vite-systemjs-spa-app log --reverse --format='%H %ad %s' --date=short --name-status 1fe831db68f3ee26779b7c411b39326eed40198f
docs/mfe-history-review/tools/hist.sh Alex18gr__react-ng-vite-systemjs-spa-app rev-list --count 1fe831db68f3ee26779b7c411b39326eed40198f
docs/mfe-history-review/tools/hist.sh Alex18gr__react-ng-vite-systemjs-spa-app ls-tree -r 8a9367e8cf74242209cff0dd485377744809cc67 -- react-app root-config react-vite-app
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

A primeira tentativa do comando `log` foi bloqueada antes da consulta, porque o sandbox não permitia gravar o registro obrigatório em tools/commands.log. O mesmo comando foi repetido com autorização e executado com sucesso. As duas comparações de fingerprint terminaram com código 0, sem diferenças. Nenhuma consulta falhou por objeto ausente.

## Resumo

Commits até o snapshot: 2 (2025-05-16 a 2025-05-16). Pontos: 12 (esclarecido: 9, inconclusivo: 0, resolvido pelo snapshot: 3).
