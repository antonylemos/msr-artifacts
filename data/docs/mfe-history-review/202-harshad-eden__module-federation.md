---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
inputs:
  clone: data/samples/mfe-sample-001/repos/harshad-eden__module-federation
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 202 — harshad-eden/module-federation

## Leitura do repositório

O histórico até o snapshot tem 2 commits, ambos de 2025-07-07, sem merges:

- `ac5fbbc` (2025-07-07, "mono repo with single deployement"), o primeiro, cria de uma vez todo o repositório: as quatro aplicações de `apps/` (shell, sales-portal, underwriter-portal e product-config, com `vite.config.ts`, fontes e wrappers), os pacotes `packages/shared-types` e `packages/shared-ui`, o `package.json` e o `pnpm-workspace.yaml` da raiz, o `.gitignore` e os seis documentos Markdown (`ARCHITECTURE_DOCUMENTATION.md`, `DEPLOYMENT_GUIDE.md`, `NAVIGATION_AND_EMBEDDING.md`, `README.md`, `TODO.md` e `context.md`);
- `dde74e6` (2025-07-07, "first commit"), o commit do snapshot, só altera o `README.md`. A versão anterior do README (objeto `f6de22a`, listado por `ls-tree ac5fbbc`) não está no clone, então não dá para ver o que mudou.

Nenhum commit remove arquivo. Tudo o que as revisões anteriores citam, exceto o README, tem primeira presença observável em `ac5fbbc` e não muda depois. Como o primeiro commit já traz o projeto inteiro, o histórico não mostra como nem onde o código e a documentação foram feitos antes. Ele também não distingue a ordem em que cada artefato foi escrito.

As revisões 3.4.2 a 3.4.6 não deixaram ponto ambíguo: as dependências de federação são todas configuradas, as quatro unidades são `Yes`, as construções e relações são todas ativas e o deploy é `não observado`, sem `Undetermined`. Os pontos vêm das afirmações `parcial` e `contradita` da 3.4.7.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | A documentação descreve deploy independente por aplicação e domínios de produção, mas o snapshot não tem artefato de deploy e as URLs dos remotes são de `localhost`. | 3.4.7 #2; 3.4.7 #4; 3.4.7 #20 | ativo ou abandonado | ac5fbbc 2025-07-07 mono repo with single deployement; dde74e6 2025-07-07 first commit | esclarecido |
| 2 | As quatro aplicações declaram `@insurance/shared-types`, mas só o sales-portal o importa. | 3.4.7 #11 | ativo ou abandonado | ac5fbbc 2025-07-07 mono repo with single deployement | esclarecido |
| 3 | A documentação dá o remote em `http://localhost:3001/remoteEntry.js`, e a configuração do shell usa `/dist/assets/remoteEntry.js`. | 3.4.7 #26 | estágios em conflito | ac5fbbc 2025-07-07 mono repo with single deployement | esclarecido |
| 4 | A documentação descreve login no shell com sessão compartilhada, que nenhuma unidade implementa. | 3.4.7 #29 | ativo ou abandonado | — | resolvido pelo snapshot |
| 5 | A documentação descreve seis aplicações, com `employer-portal` e `service-provider`, que não existem no snapshot. | 3.4.7 #32; 3.4.7 #33 | estágios em conflito | ac5fbbc 2025-07-07 mono repo with single deployement; dde74e6 2025-07-07 first commit | esclarecido |

## Observações

**1. Deploy independente sem artefato de deploy.** Nenhum dos dois commits cria ou remove `vercel.json`, workflow, Dockerfile ou outro arquivo de deploy, e nenhum commit remove arquivo. `DEPLOYMENT_GUIDE.md`, `ARCHITECTURE_DOCUMENTATION.md`, `NAVIGATION_AND_EMBEDDING.md` e `apps/shell/vite.config.ts` aparecem juntos em `ac5fbbc` e não mudam depois. O histórico não registra, portanto, um estágio com deploy configurado que tenha sido abandonado: no repositório, as URLs de `localhost` e os planos de publicação na Vercel coexistem desde a primeira presença observável. A mensagem de `ac5fbbc` anuncia um "single deployement", sem artefato correspondente. O `.gitignore` do snapshot ignora `.vercel` (`.gitignore:223-224`), a pasta local da ferramenta, e não arquivos de configuração de deploy; o histórico não mostra se houve publicação fora do repositório.

**2. `shared-types` importado só pelo sales-portal.** Os `package.json` das quatro aplicações, os fontes de `apps/` e `packages/shared-types/src/index.ts` são criados em `ac5fbbc` e não mudam depois. Não há, no histórico, import de `@insurance/shared-types` removido das outras três aplicações: a declaração sem import já está na primeira presença observável. O histórico não mostra se o pacote foi pensado para as quatro, nem como o código estava antes do primeiro commit.

**3. Endereço do `remoteEntry.js`.** `NAVIGATION_AND_EMBEDDING.md` e `apps/shell/vite.config.ts` são criados no mesmo commit, `ac5fbbc`, e nenhum dos dois muda depois. Não há, no histórico, uma versão da configuração com o caminho que o documento cita: os dois caminhos coexistem desde a primeira presença observável. O histórico não mostra de onde veio o caminho do documento.

**4. Login com sessão compartilhada.** O próprio snapshot responde: `TODO.md:8-13` lista a autenticação JWT e o "Token sharing across microfrontends" como itens por fazer (`- [ ]`), o que situa a sessão compartilhada como plano, não como algo implementado e depois retirado. O histórico não foi consultado para este ponto além do contexto, que também não registra remoção de arquivo.

**5. Seis aplicações documentadas, quatro no snapshot.** Nenhum commit cria ou remove arquivo em `apps/employer-portal` ou `apps/service-provider`: as únicas aplicações que o histórico registra são as quatro criadas em `ac5fbbc`. `context.md`, que lista as seis (`context.md:10-16`) e os cinco remotes (`context.md:48-57`), também é criado em `ac5fbbc` e não muda. O `README.md`, de onde vêm as afirmações (`README.md:7`, `119-120`), é alterado em `dde74e6`, e a versão anterior não está no clone (`cat-file` falhou por objeto ausente). Por isso não dá para saber se essas linhas já estavam no primeiro commit. A conclusão não depende disso: as duas aplicações nunca existiram no histórico do repositório, e não houve estágio com seis aplicações que tenha sido reduzido a quatro. O histórico não mostra se elas existiram fora do repositório.

## Comandos

```
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation rev-list --count dde74e678a749ccbf3951e173bf980649034c5d4
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation rev-list --count --merges dde74e678a749ccbf3951e173bf980649034c5d4
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation log --format='%h %ad %s' --date=short --name-status --no-renames dde74e678a749ccbf3951e173bf980649034c5d4
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation log --format='%h %ad %s' --date=short --name-status --no-renames --diff-filter=D dde74e678a749ccbf3951e173bf980649034c5d4
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation ls-tree ac5fbbc -- README.md
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation ls-tree dde74e678a749ccbf3951e173bf980649034c5d4 -- README.md
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation cat-file -t f6de22abc14059ae6679d4a342f762acf5a9a00d   # falhou: objeto ausente ("could not get object info")
docs/mfe-history-review/tools/hist.sh harshad-eden__module-federation cat-file -s bb87069080c489d5d790b0679cd02d645b913a78
```

## Resumo

Commits até o snapshot: 2 (2025-07-07 a 2025-07-07). Pontos: 5 (esclarecido: 4, inconclusivo: 0, resolvido pelo snapshot: 1).
