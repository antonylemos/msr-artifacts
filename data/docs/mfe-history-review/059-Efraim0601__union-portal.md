---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
inputs:
  clone: data/samples/mfe-sample-001/repos/Efraim0601__union-portal
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 059 — Efraim0601/union-portal

## Leitura do repositório

O histórico até o snapshot tem 37 commits em seis dias, de 2026-07-11 a 2026-07-16, com dois merges de branches de funcionalidade.

A composição por Native Federation já está presente no primeiro commit observado, `012b229` (2026-07-11, "Portail unifié Afriland : shell + promote + diaspora (Native Federation)"). Esse commit tem 103 arquivos em `projects/`, e as rotas do shell já chamam `loadRemoteModule` para os dois remotes. O histórico disponível não mostra uma preparação anterior. O README declara que as páginas do promote foram "migrées de `promoteApp/frontend`" (README.md:28), mas este histórico não permite verificar uma extração de aplicação.

O clone permite ver mensagens, datas, arquivos tocados por commit e os identificadores dos objetos de cada versão. O conteúdo de versões antigas só pode ser lido quando o objeto está disponível localmente. Aqui, `012b229:package.json` e `81b1158:deploy/nginx.conf` não estão; `cd974b8:package.json` e `1cea70e:projects/diaspora/src/app/core/admin-auth.ts` estão.

Não virou ponto o "module federation" da abertura do README (afirmação 8 da revisão de documentação). O próprio README nomeia a tecnologia certa na linha 17, e a dúvida é só de nome.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | `@softarc/native-federation-node` declarada e sem uso | 3.4.2 (package.json:28) | uso de dependência | cd974b8 2026-07-14 feat(diaspora): parcours d'ouverture de compte particulier complet; 012b229 2026-07-11 Portail unifié Afriland : shell + promote + diaspora (Native Federation) | inconclusivo |
| 2 | O iframe do fluxo legado conta com um reverse proxy que o nginx do snapshot não tem | 3.4.4 (projects/diaspora/src/app/pages/legacy-onboarding.ts:31); 3.4.5 #3; 3.4.7 #22, #24 | estágios em conflito | 1e8d9fb 2026-07-15 feat(diaspora): route optionnelle « onboarding-legacy » (iframe FastAPI); 81b1158 2026-07-15 feat(deploy): exposer le back-office diaspora via le gateway du portail; 092eff1 2026-07-16 fix(gateway): servir /mediapipe à la racine pour la capture selfie en fédération; bf7d95d 2026-07-16 merge(deploy): exposer le back-office diaspora via le gateway (feat/backoffice-gateway) | inconclusivo |
| 3 | `@union/auth` existe e nenhuma aplicação a usa, apesar do SSO documentado | 3.4.4 (projects/auth/src/lib/client-auth-store.ts:71); 3.4.7 #3, #11, #12 | ativo ou abandonado | 012b229 2026-07-11 Portail unifié Afriland : shell + promote + diaspora (Native Federation); 77c7b4f 2026-07-12 fix(promote): attache le JWT en fédération (403 sur tout l'espace authentifié); 1cea70e 2026-07-15 Nouveau maj | inconclusivo |
| 4 | Os componentes do design-system não são usados, e o README fala em adoção "progressive" | 3.4.7 #18 | ativo ou abandonado | 012b229 2026-07-11 Portail unifié Afriland : shell + promote + diaspora (Native Federation) | inconclusivo |
| 5 | O shell "provisionne" o `ClientAuthStore` no bootstrap, segundo o comentário, mas não o faz | 3.4.7 #26 | ativo ou abandonado | 012b229 2026-07-11 Portail unifié Afriland : shell + promote + diaspora (Native Federation) | esclarecido |

## Observações

**1. `@softarc/native-federation-node` declarada e sem uso.** O `package.json` mudou só duas vezes: no commit inicial e em `cd974b8`. Pelas mensagens e pelos arquivos tocados, `cd974b8` também cria o servidor `server/diaspora-otp`. A versão de `cd974b8` já declara a dependência, mas a do commit inicial não está disponível. Não dá para saber se ela entrou no início ou junto com o servidor, nem se algum arquivo a usou antes. A dependência continua `No` no snapshot.

**2. O iframe do fluxo legado conta com um reverse proxy que o nginx do snapshot não tem.** O commit que cria o iframe, `1e8d9fb`, alterou só `projects/diaspora/src/app/app.routes.ts` e criou `legacy-onboarding.ts`, sem tocar no deploy. As mensagens dos commits seguintes no `deploy/nginx.conf` anunciam o back-office e o MediaPipe. A versão do nginx em `81b1158` não está disponível, e não dá para saber se alguma versão anterior teve rota para `/open-account-flow-test`. O comentário pode se referir a um proxy fora do repositório.

**3. `@union/auth` existe e nenhuma aplicação a usa, apesar do SSO documentado.** A biblioteca (`client-auth-store.ts` e `public-api.ts`) aparece no commit inicial e não muda até o snapshot. Do lado das aplicações:
- o `auth.ts` do promote mudou em `77c7b4f`, cuja mensagem anuncia uma correção no envio do JWT em federação;
- o `admin-auth.ts` do diaspora é criado em `1cea70e` (2026-07-15), e a versão desse commit, disponível no clone, já traz o comentário de que `@union/auth` "n'est branché nulle part".

A versão inicial de `projects/promote/src/app/core/auth.ts` não está disponível, e não dá para excluir que as aplicações tenham usado a biblioteca antes. O que o histórico confirma é que a biblioteca nunca mudou e que, de 2026-07-15 até o snapshot, ela está documentada como não conectada.

**4. Os componentes do design-system não são usados, e o README fala em adoção "progressive".** A pasta `projects/design-system` aparece no commit inicial e não muda até o snapshot. Não dá para saber, pelo histórico disponível, se alguma aplicação usou os componentes antes e deixou de usar, ou se nunca usou. "Progressive" não tem confirmação nem desmentido.

**5. O shell "provisionne" o `ClientAuthStore` no bootstrap, segundo o comentário, mas não o faz.** `bootstrap.ts`, `main.ts`, `app.config.ts` e `app.ts` do shell aparecem no commit inicial com os mesmos identificadores de objeto que têm no snapshot, e nenhum commit os altera. O provisionamento anunciado no comentário (projects/shell/src/app/app.ts:7) está ausente desse bootstrap desde o primeiro commit observado, e não houve remoção nesses arquivos. O histórico não diz por que o comentário anuncia algo que o código nunca fez.

## Comandos

```
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal rev-list --count b11a3e3aa55aff8195e0cde0026ccbd45245266d
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad %s' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --merges --format=%h b11a3e3aa55aff8195e0cde0026ccbd45245266d
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal ls-tree -r --name-only 012b229
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show 012b229:projects/shell/src/app/app.routes.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad %s' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- package.json
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show 012b229:package.json   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show cd974b8:package.json
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show --name-status --format='%h %ad %s' --date=short cd974b8
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show --name-status --format='%h %ad %s' 1e8d9fb
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad %s' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- deploy/nginx.conf docker-compose.yml
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show 81b1158:deploy/nginx.conf   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/auth/src/lib/client-auth-store.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/auth/src/public-api.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad %s' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/promote/src/app/core/auth.ts projects/diaspora/src/app/core/admin-auth.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show 012b229:projects/promote/src/app/core/auth.ts   # falha: objeto ausente
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show --name-status --format='%h %ad %s' --date=short 1cea70e
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal show 1cea70e:projects/diaspora/src/app/core/admin-auth.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad %s' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/design-system
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/shell/src/bootstrap.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/shell/src/main.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/shell/src/app/app.config.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal log --format='%h %ad' --date=short b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/shell/src/app/app.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal ls-tree 012b229 -- projects/shell/src/bootstrap.ts projects/shell/src/main.ts projects/shell/src/app/app.config.ts projects/shell/src/app/app.ts
docs/mfe-history-review/tools/hist.sh Efraim0601__union-portal ls-tree b11a3e3aa55aff8195e0cde0026ccbd45245266d -- projects/shell/src/bootstrap.ts projects/shell/src/main.ts projects/shell/src/app/app.config.ts projects/shell/src/app/app.ts
```

## Resumo

Commits até o snapshot: 37 (2026-07-11 a 2026-07-16). Pontos: 5 (esclarecido: 1, inconclusivo: 4, resolvido pelo snapshot: 0).
