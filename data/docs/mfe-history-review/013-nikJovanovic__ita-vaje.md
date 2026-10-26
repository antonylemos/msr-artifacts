---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
inputs:
  clone: data/samples/mfe-sample-001/repos/nikJovanovic__ita-vaje
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 013 — nikJovanovic/ita-vaje

## Leitura do repositório

18 commits até o snapshot, de 2026-03-10 a 2026-05-07. O projeto começa como três microsserviços
("Init", 555f245, 2026-03-10; scaffold do `parts-service`, 8600464, 2026-03-14) com um único
`frontend/` (presença observável desde o primeiro commit; `.github/copilot-instructions.md` também
já está no "Init"). O frontend único segue sem mudança de arquitetura até 7470aff (2026-03-21,
"implement builds-service and convert parts-service to full gRPC"), o último commit que toca
`.github/copilot-instructions.md`.

Os dois BFFs são introduzidos em 1695f25 (2026-04-16, "add web-bff (Hono) and mobile-bff (Elysia)
gateways"), que também atualiza `CLAUDE.md`. A arquitetura de micro-frontend é introduzida de uma
vez em 28c49a9 (2026-04-16, "feat(mfe): add Next.js Multi-Zones micro-frontend architecture"): esse
commit remove os 21 arquivos do antigo `frontend/` (`D`, inclusive `frontend/package.json` e
`frontend/src/app/page.tsx`) e adiciona 155 arquivos novos (`A`), entre eles `shell/`, `catalog-mfe/`,
`builds-mfe/` e `auth-mfe/` completos — cada um já com seu próprio `src/components/Header.tsx`,
`src/components/Footer.tsx`, `src/lib/bff.ts` e `components.json` —, além de modificar `CLAUDE.md`,
`README.md` e `docker-compose.yml` (`M`). `999c879` (2026-04-16, "fix(mfe): resolve CI failures
across shell, auth-mfe, builds-mfe") só toca `shell/tests/header.test.tsx`. O commit do snapshot,
842a007 (2026-05-07, "feat(resilience): add circuit breaker and health check MSA patterns"), não
toca `shell/`, `CLAUDE.md` nem `.github/copilot-instructions.md` — o histórico desses caminhos
termina antes dele.

O clone permite ver mensagens, datas e, com `--name-status`, quais arquivos cada commit criou,
alterou ou removeu, e ler o conteúdo de versões antigas de um arquivo com `show <commit>:<caminho>`
quando o objeto já está disponível localmente. Uma consulta (`show 28c49a9 --name-status` sem
`--no-renames`) falhou por objeto ausente — ver "Comandos".

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `.github/copilot-instructions.md` descreve "3 backend microservices + 1 Next.js frontend" e um diretório `frontend/`, divergindo das quatro apps do snapshot | 3.4.7 #1 | estágios em conflito | 7470aff (2026-03-21, último commit que toca `.github/copilot-instructions.md`); 1695f25 (2026-04-16, adiciona os BFFs e atualiza `CLAUDE.md`, não toca `copilot-instructions.md`); 28c49a9 (2026-04-16, remove `frontend/` e adiciona `shell`/`catalog-mfe`/`builds-mfe`/`auth-mfe`, atualiza `CLAUDE.md` e `README.md`, não toca `copilot-instructions.md`) | esclarecido |
| 2 | `CLAUDE.md:32` chama de "shared" o preset shadcn (`b1t3ILnrM`) e o `src/lib/bff.ts`; `shell/README.md:3,28-29` chama `Header.tsx`/`Footer.tsx` de "shared", mas cada app tem sua própria cópia | 3.4.7 #6, #10, #14 | extração | 28c49a9 (2026-04-16, cria `shell/README.md`, `shell/src/components/Header.tsx`, `Footer.tsx`, `src/lib/bff.ts`, `components.json` e os equivalentes de `catalog-mfe`, `builds-mfe` e `auth-mfe` todos no mesmo commit, já com a redação "shared" em `CLAUDE.md:32` e `shell/README.md:3,28-29`); 999c879 (2026-04-16, não toca nenhum desses arquivos); 842a007 (não toca nenhum desses arquivos) | esclarecido |
| 3 | `CLAUDE.md:32` afirma que "every MFE fetches from `web-bff`", mas `shell/src` não chama `bffFetch`/`bffUrl` apesar de ter `src/lib/bff.ts` | 3.4.7 #9 | ativo ou abandonado | 28c49a9 (2026-04-16, cria `shell/src/lib/bff.ts` junto com o resto do `shell`); 999c879 (2026-04-16, único outro commit que toca `shell/`, só em `shell/tests/header.test.tsx`); 842a007 (não toca `shell/`) | esclarecido |

## Observações

**1. `.github/copilot-instructions.md` descreve "3 backend microservices + 1 Next.js frontend".**
O histórico mostra dois documentos que pararam em momentos diferentes: `.github/copilot-instructions.md`
não muda desde 7470aff (2026-03-21), antes dos BFFs e da divisão em zonas; `CLAUDE.md` é atualizado
nos dois commits seguintes que mudam a arquitetura (1695f25, BFFs; 28c49a9, Multi-Zones). O mesmo
commit 28c49a9 que adiciona `shell`, `catalog-mfe`, `builds-mfe` e `auth-mfe` remove, em 21 arquivos,
o `frontend/` único que `.github/copilot-instructions.md` descreve (`D frontend/package.json`,
`D frontend/src/app/page.tsx`, entre outros). O histórico esclarece a divergência registrada na
3.4.7: os dois documentos pertencem a estágios diferentes do projeto, e só um foi atualizado quando
a arquitetura mudou.

**2. `CLAUDE.md:32` e `shell/README.md:3,28-29` chamam componentes e preset de "shared".** O
commit 28c49a9 cria, de uma vez, as quatro apps com seus próprios `Header.tsx`, `Footer.tsx`,
`src/lib/bff.ts` e `components.json` (todos como `A`, sem nenhum rastro de um arquivo comum sendo
dividido ou copiado de um app para outro em commits separados) — e a mesma redação "shared" já
está em `CLAUDE.md:32` e `shell/README.md:3,28-29` nesse mesmo commit, inalterada em 999c879 e no
commit do snapshot. O histórico não mostra uma extração posterior (um app perdendo o arquivo para
outro ganhar): o texto "shared" e as cópias duplicadas nasceram juntos, no mesmo commit de scaffold
das quatro apps. Isso não decide se "shared" era a intenção do autor (um preset/lib comuns que
nunca chegaram a ser centralizados) ou um erro de descrição desde o início; o histórico só mostra
que não é resto de um estágio anterior, nem cópia feita depois.

**3. `shell/src` não chama `bffFetch`/`bffUrl` apesar de `every MFE fetches from web-bff`.**
`shell/src/lib/bff.ts` existe desde a criação do `shell` em 28c49a9. Depois desse commit, só um
outro (`999c879`) toca algo dentro de `shell/`, e apenas `shell/tests/header.test.tsx` — nenhum
arquivo de `shell/src/app` ou `shell/src/lib` muda depois da criação, e o commit do snapshot
(842a007) não toca `shell/` em nada. O histórico não mostra `shell` chamando `web-bff` em nenhum
momento e depois parando: o arquivo ficou sem uso desde que foi criado, junto com o resto do
scaffold das quatro apps. Isso esclarece, nos limites do que o histórico de `shell/` mostra, que não
é uma função removida, e sim não conectada desde a origem.

## Comandos

```
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje log 842a007f3e2690f8a521f951fc899c4af560e931 --oneline --reverse
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje rev-list 842a007f3e2690f8a521f951fc899c4af560e931 --count
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje log 842a007f3e2690f8a521f951fc899c4af560e931 --format=%H%x20%ad --date=short --reverse
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje log 842a007f3e2690f8a521f951fc899c4af560e931 --format=%H%x20%ad --date=short
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje show 28c49a9 --name-status --format=%H
  # falhou: fatal: could not fetch fc5b831b2720705b48a37a3414c1989638d6cb54 (objeto ausente no clone --filter=blob:none; detecção de renome precisaria do blob)
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje show 28c49a9 --name-status --no-renames --format=%H
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje log 842a007f3e2690f8a521f951fc899c4af560e931 --format=%h%x20%ad%x20%s --date=short -- .github/copilot-instructions.md
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje log 842a007f3e2690f8a521f951fc899c4af560e931 --format=%h%x20%ad%x20%s --date=short -- CLAUDE.md
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje show 28c49a9:CLAUDE.md
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje show 999c879:CLAUDE.md
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje show 842a007f3e2690f8a521f951fc899c4af560e931:CLAUDE.md
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje log 842a007f3e2690f8a521f951fc899c4af560e931 --format=%h%x20%ad%x20%s --date=short -- shell
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje show 999c879 --name-status --no-renames --format=%H -- shell
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje show 842a007f3e2690f8a521f951fc899c4af560e931 --name-status --no-renames --format=%H -- shell
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje log 842a007f3e2690f8a521f951fc899c4af560e931 --format=%h%x20%ad%x20%s --date=short -- shell/README.md
docs/mfe-history-review/tools/hist.sh nikJovanovic__ita-vaje show 28c49a9:shell/README.md
```

## Resumo

Commits até o snapshot: 18 (2026-03-10 a 2026-05-07). Pontos: 3 (esclarecido: 3, inconclusivo: 0, resolvido pelo snapshot: 0).
