---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
inputs:
  clone: data/samples/mfe-sample-001/repos/agsosa__react-next-umd-remote-modules-poc
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 203 — agsosa/react-next-umd-remote-modules-poc

## Leitura do repositório

O histórico até o snapshot tem 17 commits, todos de 2025-07-28, sem merges. O primeiro, `6d2fa15` ("Initial commit"), só cria `.gitattributes`; as duas aplicações, `mf-1` e `shell`, aparecem juntas em `b50998d` ("Init"). A maioria das mensagens é "wip".

Marcos usados nos pontos:
- **`b50998d` a `397b98c`:** o bundle do `mf-1` fica primeiro em `mf-1/public/remote-components/bundle.js` (`b50998d`); `0f9ffc9` ("wip") cria `mf-1/public/remote-modules/bundle.js` e a pasta `mf-1/src/RemoteModules/`, e `397b98c` ("wip") remove o bundle antigo.
- **`ff692cd` ("WIP"):** cria o hook `shell/src/hooks/useRemoteModule.ts` e os dois arquivos de tipos, um em cada aplicação. O hook muda depois em `a5bb370` e em `6ff5738` ("Update useRemoteModule.ts"), e a versão de `6ff5738` é a do snapshot (mesmo objeto).
- **`77ded93` ("Add env var for remote urls") e `d7937f8` ("Update next config"):** criam e ajustam `shell/next.config.js`, com a versão do snapshot desde `d7937f8`.
- **`faabb25` ("Update vite.mf.ts"):** última mudança de `mf-1/vite.mf.ts` até o snapshot.
- **`03aa81d` ("Create README.md") e `ed8c864` ("Add styled components theme, update readme, cleanup"):** criam e alteram o `README.md` da raiz, com a versão do snapshot desde `ed8c864`. O README é o último artefato a entrar: vem depois do hook, da configuração do shell e da última versão de `vite.mf.ts`.

Nenhum commit até o snapshot cria `vercel.json`, Dockerfile, workflow de CI ou manifesto de Kubernetes. Das versões antigas, só estão disponíveis no clone as que coincidem com o snapshot: `vite.mf.ts` em `faabb25`, `README.md` em `ed8c864` e `useRemoteModule.ts` em `6ff5738`. As versões de `vite.mf.ts` em `b50998d`, `406ac86` e `0f9ffc9`, a do `README.md` em `03aa81d` e as do hook em `ff692cd` e `a5bb370` faltam no clone.

As revisões 3.4.2 a 3.4.6 não deixaram ponto em aberto: nenhuma dependência de integração, nenhuma unidade ou construção `Undetermined` ou inativa, relação ativa e deploy `não observado` (não `Undetermined`). Os pontos vêm das afirmações `contradita` e `parcial` da 3.4.7. A afirmação 2 (Vercel, `sem corroboração`) não é `contradita` nem `parcial` e não vira ponto.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | O README diz que o shell "only needs a `<script>` tag", e o shell também expõe `window.React`/`window.ReactDOM` e lê `MF1_BASE_URL` | 3.4.7 #16 | estágios em conflito | 6ff5738 2025-07-28 Update useRemoteModule.ts; d7937f8 2025-07-28 Update next config; faabb25 2025-07-28 Update vite.mf.ts; 03aa81d 2025-07-28 Create README.md; ed8c864 2025-07-28 Add styled components theme, update readme, cleanup | esclarecido |
| 2 | O README fala em "shared interfaces", e os tipos são duas cópias idênticas, uma em cada unidade | 3.4.7 #18 | extração | ff692cd 2025-07-28 WIP; 397b98c 2025-07-28 wip | esclarecido |
| 3 | O comentário de `vite.mf.ts:28` diz que o bundle poderia ser publicado em outro lugar, e nenhum artefato o publica fora do `mf-1` | 3.4.7 #22 | ativo ou abandonado | b50998d 2025-07-28 Init; 0f9ffc9 2025-07-28 wip; 397b98c 2025-07-28 wip; faabb25 2025-07-28 Update vite.mf.ts | esclarecido |

## Observações

**1. O README diz que o shell "only needs a `<script>` tag", e o shell também expõe `window.React`/`window.ReactDOM` e lê `MF1_BASE_URL`.** O hook está na versão do snapshot desde `6ff5738`, `shell/next.config.js` desde `d7937f8` e `mf-1/vite.mf.ts` (com os externos `react`/`react-dom`) desde `faabb25`. Os três commits vêm antes de `03aa81d`, que cria o README, e de `ed8c864`, que lhe dá a versão do snapshot. A versão do README em `03aa81d` falta no clone, e não dá para saber se a frase já estava nela; na versão de `ed8c864` ela coexiste com o hook, a configuração e o build como estão no snapshot. A frase não é resto de um estágio anterior do código: foi escrita, ou mantida, quando o shell já fazia o que a contradiz. O histórico não diz por que o README simplifica.

**2. O README fala em "shared interfaces", e os tipos são duas cópias idênticas, uma em cada unidade.** `mf-1/src/types/remote-components.d.ts` e `shell/src/types/mf1-remote-components.d.ts` nascem no mesmo commit, `ff692cd`, com o mesmo objeto, e mudam juntos em `397b98c`, de novo para o mesmo objeto, que é o do snapshot. Nenhum outro commit toca os dois, e nenhum commit cria um arquivo de tipos num lugar comum às unidades. As interfaces foram duplicadas desde a primeira presença e mantidas iguais por cópia, nunca num módulo compartilhado. O histórico não diz em qual das duas unidades o arquivo foi escrito primeiro.

**3. O comentário de `vite.mf.ts:28` diz que o bundle poderia ser publicado em outro lugar, e nenhum artefato o publica fora do `mf-1`.** O bundle sempre esteve dentro de `mf-1/public`: em `remote-components/` desde `b50998d` e em `remote-modules/` desde `0f9ffc9`, com o antigo removido em `397b98c`. Nenhum dos 17 commits cria artefato de publicação (`vercel.json`, Dockerfile, workflow ou manifesto de Kubernetes). O comentário está na versão de `faabb25`, a do snapshot; as versões anteriores de `vite.mf.ts` faltam no clone, e não dá para saber quando ele apareceu. A possibilidade nunca virou artefato até o snapshot: é uma alternativa anotada, não um estágio abandonado.

## Comandos

```
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc rev-list --count 130ddb6f8b73b85ec0065160bc49a764c80d49ba
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc rev-list --count --merges 130ddb6f8b73b85ec0065160bc49a764c80d49ba
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --reverse --name-status --no-renames --format='== %h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree -r ff692cd -- mf-1/src/types/remote-components.d.ts shell/src/types/mf1-remote-components.d.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree -r 397b98c -- mf-1/src/types/remote-components.d.ts shell/src/types/mf1-remote-components.d.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree -r 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- mf-1/src/types/remote-components.d.ts shell/src/types/mf1-remote-components.d.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- mf-1/src/types/remote-components.d.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- shell/src/types/mf1-remote-components.d.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- shell/src/hooks/useRemoteModule.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- mf-1/vite.mf.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- README.md
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc log --format='%h %ad %s' --date=short 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- shell/next.config.js
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree b50998d -- mf-1/vite.mf.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t b50998d:mf-1/vite.mf.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree 406ac86 -- mf-1/vite.mf.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t 406ac86:mf-1/vite.mf.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree 0f9ffc9 -- mf-1/vite.mf.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t 0f9ffc9:mf-1/vite.mf.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree faabb25 -- mf-1/vite.mf.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t faabb25:mf-1/vite.mf.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t 03aa81d:README.md   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t ed8c864:README.md
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t ff692cd   # erro de citação no shell: o caminho caiu; só mostra que o objeto é um commit
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t a5bb370   # idem
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t 6ff5738   # idem
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree 130ddb6f8b73b85ec0065160bc49a764c80d49ba -- mf-1/vite.mf.ts README.md shell/src/hooks/useRemoteModule.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree ff692cd -- shell/src/hooks/useRemoteModule.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t ff692cd:shell/src/hooks/useRemoteModule.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree a5bb370 -- shell/src/hooks/useRemoteModule.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t a5bb370:shell/src/hooks/useRemoteModule.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc ls-tree 6ff5738 -- shell/src/hooks/useRemoteModule.ts
docs/mfe-history-review/tools/hist.sh agsosa__react-next-umd-remote-modules-poc cat-file -t 6ff5738:shell/src/hooks/useRemoteModule.ts
```

## Resumo

Commits até o snapshot: 17 (2025-07-28 a 2025-07-28). Pontos: 3 (esclarecido: 3, inconclusivo: 0, resolvido pelo snapshot: 0).
