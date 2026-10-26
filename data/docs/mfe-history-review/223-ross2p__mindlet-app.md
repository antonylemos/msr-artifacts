---
schema: 1
id: 1091389540
full_name: ross2p/mindlet-app
commit: 868bf9c81af85085a6befc5921bea6c01211228d
inputs:
  clone: data/samples/mfe-sample-001/repos/ross2p__mindlet-app
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 223 — ross2p/mindlet-app

## Leitura do repositório

O histórico até o snapshot tem 45 commits, de 2026-01-29 a 2026-09-22, com 5 merges. Os cinco primeiros (`9a1af72`, 2026-01-29, "feat: initialize main app with Next.js, Tailwind CSS, and authentication features", até `97f87ab`, 2026-02-15) mantêm uma única aplicação Next.js em `apps/main/`, com o submódulo `libs/types`. O marco da estrutura atual é `404dce1` (2026-05-03, "feat: micro-frontends — submodules, nginx compose, @ross2p/shared"): ele remove o que restava de `apps/main/` e cria os submódulos `apps/auth`, `apps/dashboard`, `apps/decks`, `apps/profile`, `apps/study` e `libs/shared`, o `README.md`, o `compose.yml` e `infra/nginx/nginx.conf` e `infra/nginx/proxy.conf`. Depois disso o superprojeto muda pouco além dos ponteiros dos submódulos: `4128490` (2026-05-03) move a configuração de nginx para `config/nginx/`; `2581f29` (2026-05-23) altera o `compose.yml` e recria `infra/nginx/`; `4f2dbca` (2026-05-23) e `e98db1d` (2026-08-17, "chore: bump frontend submodules and split the local compose/nginx stack.") alteram de novo o `compose.yml`; `b1c17af` (2026-09-19) cria `infra/nginx/nginx.conf.local` e `start-local-dev.sh`. Os demais commits são merges ou atualizam ponteiros de submódulos, salvo `77a6cf8` e `91bfed2`, que alteram o README, e `4bfaf75`, que cria o `.gitignore`.

O que o clone permite ver: mensagens, datas, os arquivos criados, alterados ou removidos e, por `ls-tree`, os identificadores dos objetos de cada versão. O conteúdo das versões antigas de `compose.yml`, `README.md` e `infra/nginx/nginx.conf` não está disponível localmente (`cat-file` falha por objeto ausente). O conteúdo das zonas nunca está neste histórico: são submódulos, e o superprojeto registra só o commit apontado. Um `log --name-status` sem `--no-renames` falhou por objeto ausente (a detecção de renomeação precisa do conteúdo) e foi repetido com `--no-renames`.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | As configurações de nginx divergem quanto ao prefixo da zona: a montada pelo compose remove o prefixo, as outras duas o preservam | 3.4.7 #3 | estágios em conflito | 404dce1 2026-05-03 feat: micro-frontends — submodules, nginx compose, @ross2p/shared; 4128490 2026-05-03 chore: remove nginx configuration and proxy settings; 2581f29 2026-05-23 chore: bump submodules, refresh compose, and add nginx infra; e98db1d 2026-08-17 chore: bump frontend submodules and split the local compose/nginx stack.; b1c17af 2026-09-19 chore: sync local changes and update submodule pointers | esclarecido |
| 2 | O README descreve o compose como imagens `node:20-alpine` com `npm run dev` e o repositório montado, mas o compose constrói cada zona pelo Dockerfile do submódulo | 3.4.7 #7, 3.4.7 #9 | estágios em conflito | 404dce1 2026-05-03 feat: micro-frontends — submodules, nginx compose, @ross2p/shared; 77a6cf8 2026-05-03 docs: npm publish instructions for @ross2p/shared; 2581f29 2026-05-23 chore: bump submodules, refresh compose, and add nginx infra; 4f2dbca 2026-05-23 chore: include API compose stack and bump frontend submodules; e98db1d 2026-08-17 chore: bump frontend submodules and split the local compose/nginx stack.; 91bfed2 2026-08-29 chore: point the auth zone at mindlet-app-auth. | inconclusivo |

## Observações

**1. As configurações de nginx divergem quanto ao prefixo da zona.** No snapshot, `infra/nginx/nginx.conf`, o arquivo que o compose monta (compose.yml:115), repassa `/dashboard/` com `proxy_pass http://mindlet_dashboard/;` (infra/nginx/nginx.conf:36-37), removendo o prefixo; `config/nginx/nginx.conf` (config/nginx/nginx.conf:38-39) e `infra/nginx/nginx.conf.local` (infra/nginx/nginx.conf.local:38-39) o preservam. O histórico mostra que os três arquivos são de momentos diferentes. `config/nginx/nginx.conf` tem o mesmo objeto (`fd6ada3`) que `infra/nginx/nginx.conf` tinha em `404dce1`; `4128490`, cuja mensagem anuncia a remoção da configuração de nginx, cria `config/nginx/nginx.conf` e `config/nginx/proxy.conf` e remove os dois de `infra/nginx/`, e `config/nginx/proxy.conf` também mantém o objeto do `proxy.conf` de `404dce1` (`b7cafd2`). Desde então nenhum dos dois mudou. Ou seja, `config/nginx/nginx.conf` é, sem alteração, o gateway da primeira versão multi-zonas, e a revisão de build e deploy o lia como "versão anterior" (3.4.6, Leitura). O `infra/nginx/nginx.conf` montado foi recriado em `2581f29` e alterado em `e98db1d`, que dá o objeto do snapshot (`4ad409d`). `infra/nginx/nginx.conf.local` só aparece em `b1c17af`, depois do último ajuste do arquivo montado. O histórico não mostra o conteúdo das versões intermediárias, porque o objeto de `2581f29` (`892202f`) não está disponível; também não mostra quando a barra final do `proxy_pass` entrou, nem o `basePath` das zonas, que fica nos submódulos. Conclusão, delimitada a estes arquivos: a configuração que preserva o prefixo em `config/nginx/` é um resto intacto do primeiro estágio (`404dce1`), não montado; a montada vem de um estágio posterior (`2581f29`/`e98db1d`); e a variante local é a mais recente (`b1c17af`). Se a remoção do prefixo contradiz o `basePath` continua sem resposta aqui.

**2. O README descreve o compose de outra forma.** README.md:37 diz que cada serviço roda `npm install` e `npm run dev` em `node:20-alpine` com o repositório montado em `/workspace`; o compose do snapshot constrói cada zona com `build.context: apps/<zona>` e `dockerfile: Dockerfile` (compose.yml:16-18), sem volume nas zonas. O histórico mostra que o README e o compose nasceram juntos em `404dce1` e que o compose mudou três vezes depois do último commit que alterou o README antes de `91bfed2`: `77a6cf8` deu ao README o objeto `e190e0e`, que fica igual em `2581f29`, `4f2dbca` e `e98db1d`, enquanto o `compose.yml` passa de `a1e76dd` a `202315f`, `a2d42fe` e `2bda15d` (o do snapshot, desde `e98db1d`). A mensagem de `2581f29` anuncia um "refresh" do compose, e a de `e98db1d`, a separação da pilha local de compose e nginx; `91bfed2`, o único commit posterior que altera o README, anuncia só a troca do repositório da zona auth. Isso é compatível com a frase do README descrever um compose anterior, mas os objetos antigos do `compose.yml` e do `README.md` não estão disponíveis localmente: não dá para ver se o compose de `404dce1` usava `node:20-alpine` com volume, nem se README.md:37 já existia em `404dce1`. O que cada Dockerfile das zonas executa também fica nos submódulos. Conclusão: inconclusivo; a contradição pode ser resto de um estágio anterior, mas o histórico disponível não mostra o conteúdo que o confirmaria.

## Comandos

```
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app rev-list --count 868bf9c81af85085a6befc5921bea6c01211228d
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app log --reverse --format='%h %ad %s' --date=short --name-status 868bf9c81af85085a6befc5921bea6c01211228d   # falhou por objeto ausente (detecção de renomeação), depois da primeira entrada
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app log --reverse --format='%h %ad %s' --date=short --name-status --no-renames 868bf9c81af85085a6befc5921bea6c01211228d
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 404dce1 -- compose.yml README.md infra/nginx/nginx.conf config/nginx/nginx.conf infra/nginx/nginx.conf.local
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 2581f29 -- compose.yml README.md infra/nginx/nginx.conf config/nginx/nginx.conf infra/nginx/nginx.conf.local
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 4f2dbca -- compose.yml README.md infra/nginx/nginx.conf config/nginx/nginx.conf infra/nginx/nginx.conf.local
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree e98db1d -- compose.yml README.md infra/nginx/nginx.conf config/nginx/nginx.conf infra/nginx/nginx.conf.local
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 868bf9c81af85085a6befc5921bea6c01211228d -- compose.yml README.md infra/nginx/nginx.conf config/nginx/nginx.conf infra/nginx/nginx.conf.local
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app log --format='%h %ad %s' --date=short --no-renames 868bf9c81af85085a6befc5921bea6c01211228d -- README.md compose.yml infra/nginx/nginx.conf config/nginx/nginx.conf infra/nginx/nginx.conf.local
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app cat-file -t a1e76dd76ec48cf94aacb3a2b074129740582931   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app cat-file -t 202315f9604c909a19eb9a3624039554c8af655a   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app cat-file -t a2d42febfac0431aa0905aa968c7eef6556d79ab   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app cat-file -t 0dfbd9f3686df16fb64ac290b1e5776ab567a08a   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app cat-file -t e190e0e5c28dab469d7751ee71de4bb8c89bffe0   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app cat-file -t 892202f224da65da3d365ddc5269535b6edd074d   # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 404dce1 -- infra/nginx/proxy.conf config/nginx/proxy.conf config/nginx/nginx.conf
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 4128490 -- infra/nginx/proxy.conf config/nginx/proxy.conf config/nginx/nginx.conf
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 2581f29 -- infra/nginx/proxy.conf config/nginx/proxy.conf config/nginx/nginx.conf
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 868bf9c81af85085a6befc5921bea6c01211228d -- infra/nginx/proxy.conf config/nginx/proxy.conf config/nginx/nginx.conf
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app log --format='%h %ad %s' --date=short --no-renames --diff-filter=D --name-only 868bf9c81af85085a6befc5921bea6c01211228d -- apps/main
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 868bf9c81af85085a6befc5921bea6c01211228d -- apps/main
```

## Resumo

Commits até o snapshot: 45 (2026-01-29 a 2026-09-22). Pontos: 2 (esclarecido: 1, inconclusivo: 1, resolvido pelo snapshot: 0).
