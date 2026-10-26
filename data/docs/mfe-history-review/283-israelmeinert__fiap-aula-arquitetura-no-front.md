---
schema: 1
id: 1408068032
full_name: israelmeinert/fiap-aula-arquitetura-no-front
commit: e1c6fb92488afd39e2c1d704ee1243ed52d862b6
inputs:
  clone: data/samples/mfe-sample-001/repos/israelmeinert__fiap-aula-arquitetura-no-front
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 283 — israelmeinert/fiap-aula-arquitetura-no-front

## Leitura do repositório

O histórico até o snapshot tem um único commit, `e1c6fb9` (2026-10-06, "material completo da aula de front com slides implementação dos exemplos para cada arquitetura com exemplos de angular e react"), que é o próprio snapshot, sem merges. Ele adiciona todos os arquivos do repositório, entre eles os slides (`conteudo/aula-arquitetura-front-end.md`), o README do bloco 10 e o shell do bloco (`exemplos/10-micro-frontends/apps/shell/`). Todos têm nesse commit a primeira presença observável; não há commit que os introduza nem versão anterior, e nenhum arquivo aparece como removido. O histórico não traz informação além do snapshot: não mostra estágios anteriores, abandonos nem onde o material foi feito antes do primeiro commit.

Das revisões anteriores, só a 3.4.7 deixou pontos. A 3.4.2 não encontrou dependência das tecnologias de MFE, a 3.4.3 não tem unidade `Undetermined`, a 3.4.4 não tem construção inativa, comentada ou `Undetermined` (as quatro ocorrências em `aula-arquitetura-front-end.html` são `none`, scripts do deck de slides), a 3.4.5 não tem relação `Undetermined` e o deploy da 3.4.6 é `não observado` nas 29 aplicações, e não `Undetermined`. Na 3.4.7, a afirmação 6 (`contradita`) vira ponto, porque a parte desmentida ("rotas") pode ser intenção ou resto de um estágio anterior do shell. A afirmação 20 (`parcial`) também vira ponto, mas o próprio snapshot a resolve: a mesma frase do README diz que o laboratório não provisiona deploy.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | A árvore dos slides atribui "descoberta, rotas, fallback" ao shell do bloco 10, mas o shell não tem roteador nem rota | 3.4.7 #6 | estágios em conflito | e1c6fb9 2026-10-06 material completo da aula de front com slides implementação dos exemplos para cada arquitetura com exemplos de angular e react | inconclusivo |
| 2 | O README do bloco 10 descreve "um caminho de publicação independente" sem artefato de deploy | 3.4.7 #20 | ativo ou abandonado | — | resolvido pelo snapshot |

## Observações

**1. "Rotas" no shell do bloco 10.** O slide (`conteudo/aula-arquitetura-front-end.md`) e os arquivos do shell (`index.html`, `package.json`, `public/remotes.json`, `src/main.ts`, `tsconfig.json`) chegam juntos no único commit e não têm outra versão até o snapshot. Nenhum arquivo de rota aparece no bloco 10 em todo o histórico; os arquivos `*.routes.ts` e `*router*` do commit são dos blocos 04, 11, 13 e 14. O histórico não diz se o shell já teve rotas antes do primeiro commit nem se o comentário do slide descreve um shell planejado, e não o implementado. A corroboração `contradita` da 3.4.7 fica como estava.

**2. Caminho de publicação independente.** O snapshot responde sem consulta. Na mesma frase em que fala do caminho de publicação, o README diz que "o laboratório não provisiona um pipeline de deploy" (`exemplos/10-micro-frontends/README.md:111`, afirmação 21 da 3.4.7, `corroborada`), e o passo a passo de publicação (`:125`) é instrução para quem quiser publicar. A publicação é descrita como possibilidade e declarada como não provisionada; não há artefato abandonado a explicar. Por consistência, a lista de arquivos do único commit não tem Dockerfile, compose, CI nem configuração de hospedagem, o que confere com a 3.4.6.

## Comandos

```
docs/mfe-history-review/tools/hist.sh israelmeinert__fiap-aula-arquitetura-no-front rev-list --count e1c6fb92488afd39e2c1d704ee1243ed52d862b6
docs/mfe-history-review/tools/hist.sh israelmeinert__fiap-aula-arquitetura-no-front log --reverse --format='%h %ad %s' --date=short e1c6fb92488afd39e2c1d704ee1243ed52d862b6
docs/mfe-history-review/tools/hist.sh israelmeinert__fiap-aula-arquitetura-no-front rev-list --count --merges e1c6fb92488afd39e2c1d704ee1243ed52d862b6
docs/mfe-history-review/tools/hist.sh israelmeinert__fiap-aula-arquitetura-no-front log --format='%h %ad' --date=short --name-status e1c6fb92488afd39e2c1d704ee1243ed52d862b6 -- conteudo/aula-arquitetura-front-end.md exemplos/10-micro-frontends/apps/shell exemplos/10-micro-frontends/README.md
docs/mfe-history-review/tools/hist.sh israelmeinert__fiap-aula-arquitetura-no-front log --format='%h %ad' --date=short --name-status e1c6fb92488afd39e2c1d704ee1243ed52d862b6   # saída filtrada por nomes de deploy, CI e rotas
docs/mfe-history-review/tools/hist.sh israelmeinert__fiap-aula-arquitetura-no-front log --format='%h %ad' --date=short --full-history --diff-filter=D e1c6fb92488afd39e2c1d704ee1243ed52d862b6   # saída vazia
```

## Resumo

Commits até o snapshot: 1 (2026-10-06 a 2026-10-06). Pontos: 2 (esclarecido: 0, inconclusivo: 1, resolvido pelo snapshot: 1).
