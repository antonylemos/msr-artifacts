---
schema: 1
id: 1329274714
full_name: pmiguras/likekiri-website
commit: 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
inputs:
  clone: data/samples/mfe-sample-001/repos/pmiguras__likekiri-website
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 084 — pmiguras/likekiri-website

## Leitura do repositório

O histórico até o snapshot tem 111 commits, sem merges, de 2026-08-09 a 2026-08-16. O primeiro é
`1570afc` (2026-08-09, "Inicializa workspace pnpm con configuración base"), que cria só os arquivos
da raiz (`package.json`, `pnpm-workspace.yaml`, `CLAUDE.md`, `.gitignore`, `.env.example`,
`tsconfig.base.json`). A plataforma é construída quase toda num dia: 74 commits são de 2026-08-09,
8 de 2026-08-10, e os de 2026-08-13 a 2026-08-16 tratam sobretudo de `clientes` e do visual do site. Os marcos
que importam aos pontos são todos introduções observáveis, isto é, commits que criam os artefatos:
`c80dbce` cria os modelos de `infra/` (Caddy, systemd, docker-compose); `b8e9bb8` cria o
esqueleto do `hello`, federado em `ae30ea2`; `27ebeba` cria o ADR 004, alterado só em `ccf3467`;
`4334294` cria o ADR 005; `c17840a` cria o guia de integração, alterado em `bfabf90` e `ae539bf`;
`ff12015` cria o `ejemplo-web`; `7e19810` e `ccafe11` tornam o header do site configurável pelo
back, e `e4ac6f6` cria o módulo `sitio`; a série `ae16de2` ("Contrato v0.3: modo ssr 'server' para
SSR delegado al módulo"), `c290788`, `8cc44af`, `8ffb581` e `07c85d0` (ADR 007) introduz o SSR
delegado; `5d7e591` (2026-08-10) é a última mudança do Caddy. O snapshot é `4b8c5fd` (2026-08-16,
"Docs: incorpora el README del repositorio"), o único commit que toca o `README.md`: o README tem
aí a sua primeira presença observável, e a mensagem anuncia que ele foi incorporado, sem dizer onde
foi escrito.

O clone guarda as árvores e as versões iguais às do snapshot, mas não o conteúdo antigo dos
arquivos que mudaram depois. `show` falhou por objeto ausente para todas as versões do Caddy
anteriores a `5d7e591`, para o ADR 004 em `27ebeba`, para o `shell.service.ts` do core em `8194a3a`
e `7e19810`, para o `manifest.ts` do contrato em `4005fb5` e `0958b41` e para os `server.mjs` de
`ejemplo-web` (`ff12015`) e `hello` (`ae30ea2`). O `log --name-status` do repositório inteiro, e o
restrito a `apps`, falham depois de `8194a3a` por um objeto ausente (`8fb6ee9`); os restritos a
`modules`, `packages`, `docs`, `config`, `infra` e aos arquivos da raiz vão até o primeiro commit.

Das revisões anteriores, a 3.4.2 não tem dependência sem uso (as doze linhas são `Yes`), a 3.4.5
não tem relação `Undetermined` e a 3.4.6 não tem deploy `Undetermined`. A dúvida das dez unidades
`Undetermined` da 3.4.3 é um ponto, e a única construção inativa da 3.4.4, outro, resolvido pelo
snapshot: o `config/modules.json` real está no `.gitignore` (.gitignore:12), e o código do core diz
que só o exemplo é versionado (apps/core/src/registry/registry-config.ts:3-7). Das dez afirmações
`contradita` ou `parcial` da 3.4.7, as três do README sobre o roteamento e a carga dos shells (#14,
#15, #17) viraram um ponto, as duas sobre a cópia para o servidor (#36, #43) outro, e as duas que
ficaram para trás do SSR delegado (#42, #54) outro; #44, #62 e #63 são pontos próprios. As
afirmações `sem corroboração` (#46, #48, #51, #56) afirmam verificações em produção, que o
histórico do repositório não registra, e não viraram ponto.

## Pontos

| # | Ponto | Origem | Pergunta | Commits | Resultado |
|---|---|---|---|---|---|
| 1 | Os dez `modules/*` têm build federado, mas a entrada `src/index.ts` só reexporta componentes e não há `index.html` | 3.4.3 (modules/chat, clientes, cuentas, ejemplo-admin, ejemplo-web, hello, media, ops, registry, sitio `Undetermined`) | ativo ou abandonado | b8e9bb8 2026-08-09 Añade esqueleto del módulo de ejemplo hello; 538ba5d 2026-08-09 Añade módulo cuentas: usuarios, invitaciones y contraseña federados; 74aa201 2026-08-09 Añade módulo registry como micro-frontend de plataforma; ff12015 2026-08-09 Añade módulo ejemplo-web: plantilla de isla para la superficie pública; d1c8ed8 2026-08-09 Añade módulo ejemplo-admin: plantilla con submenú toggle y permiso propio; b30a632 2026-08-09 Añade módulo clientes: registro, portal, planes y facturación con API propia; e4ac6f6 2026-08-09 Añade módulo sitio: edición del front desde el admin; afbd254 2026-08-09 Añade módulo media: gestor multimedia con recorte y fondo transparente; 2777b37 2026-08-09 Añade módulo chat: WebSocket en vivo, widget y panel de agente; 5d7e591 2026-08-10 Añade módulo ops: respaldo de BD y commit/push a GitHub desde el admin | esclarecido |
| 2 | O registro de exemplo do core (`hello` em `127.0.0.1:4001`) não é lido por nenhum build nem pelo runtime | 3.4.4 (config/modules.example.json:4) | ativo ou abandonado | — | resolvido pelo snapshot |
| 3 | O README põe `/modules/<id>/*` atrás do core, carrega o admin-shell por `import()` e diz que tudo vai ao core salvo os estáticos federados, e o Caddy e o core fazem diferente | 3.4.7 #14, #15, #17 | estágios em conflito | 44bf4ff 2026-08-09 Añade autenticación: argon2id, sesiones opacas, invitaciones y auditoría; 5d7e591 2026-08-10 Añade módulo ops: respaldo de BD y commit/push a GitHub desde el admin; ac38c35 2026-08-10 Añade i18n ES/EN: selector de idioma, sitio y chrome del admin traducidos, idioma recordado por la cuenta; 4b8c5fd 2026-08-16 Docs: incorpora el README del repositorio | esclarecido |
| 4 | A cópia por rsync para `/srv/likekiri/app` e a dos assets do web-shell para `/srv/likekiri/public` não têm artefato | 3.4.7 #36, #43 | ativo ou abandonado | c80dbce 2026-08-09 Añade plantillas de infraestructura: Caddy, systemd y docker-compose; 27ebeba 2026-08-09 Documenta SSR de islas, auth y despliegue (ADR 004); ccf3467 2026-08-09 Corrige el layout de assets públicos en el ADR 004 | esclarecido |
| 5 | O ADR 004 diz que as ilhas não são renderizadas no servidor, e o guia diz que `ssr: "shell"` é o único modo, mas `clientes` usa o SSR delegado | 3.4.7 #42, #54 | estágios em conflito | ccf3467 2026-08-09 Corrige el layout de assets públicos en el ADR 004; ae539bf 2026-08-09 Registra el módulo clientes en infra y documenta el patrón de dominio propio; ae16de2 2026-08-09 Contrato v0.3: modo ssr 'server' para SSR delegado al módulo; c290788 2026-08-09 Añade renderRemote firmado con timeout y degradación a shell; 8cc44af 2026-08-09 Incrusta HTML delegado en las islas e hidrata en cliente; corrige nombre del equipo; 8ffb581 2026-08-09 Añade bundle SSR y endpoint /render firmado al módulo clientes; 07c85d0 2026-08-09 Documenta el SSR delegado al módulo (ADR 007) | esclarecido |
| 6 | O ADR 005 diz que os estáticos dos módulos de admin saem pelo domínio do painel, e o Caddy não dá rota ao `hello`, que tem página de admin, em `admin.likekiri.com` | 3.4.7 #44 | estágios em conflito | b8e9bb8 2026-08-09 Añade esqueleto del módulo de ejemplo hello; ae30ea2 2026-08-09 Federa el módulo hello y añade su servidor de manifest firmado; f529e9b 2026-08-09 Añade infra de los módulos cuentas y registry; 4334294 2026-08-09 Documenta el admin por módulos y los submenús del contrato (ADR 005); 5d7e591 2026-08-10 Añade módulo ops: respaldo de BD y commit/push a GitHub desde el admin | inconclusivo |
| 7 | O README do `ejemplo-web` diz que o header do site é estático, e o header é desenhado a partir da configuração que o `sitio` edita | 3.4.7 #62 | estágios em conflito | ff12015 2026-08-09 Añade módulo ejemplo-web: plantilla de isla para la superficie pública; 7e19810 2026-08-09 Añade configuración server-driven del shell editable desde el admin; ccafe11 2026-08-09 Renderiza header, pie y anuncio del sitio desde la config del back; e4ac6f6 2026-08-09 Añade módulo sitio: edición del front desde el admin | esclarecido |
| 8 | A `description` do `ejemplo-web` fala em "isla SSR", e a ilha do módulo é montada só no cliente | 3.4.7 #63 | estágios em conflito | ff12015 2026-08-09 Añade módulo ejemplo-web: plantilla de isla para la superficie pública; ae16de2 2026-08-09 Contrato v0.3: modo ssr 'server' para SSR delegado al módulo | esclarecido |

## Observações

**1. Os dez módulos sem entrada própria.** Cada módulo é introduzido por um commit que cria, de uma
vez, o `src/index.ts`, o `vite.config.ts` e o `server.mjs` (o `hello` em dois passos: `b8e9bb8`
cria o esqueleto com `src/index.ts` e `vite.config.ts`, e `ae30ea2`, "Federa el módulo hello…",
acrescenta o `server.mjs`). Os dez `src/index.ts` não mudaram desde o commit que os criou (um único
commit no `log` de cada um; no `hello`, o identificador do objeto em `b8e9bb8` é o mesmo do
snapshot). Nenhum commit até o snapshot cria ou remove um `index.html` ou um `main.tsx` em
`modules/`, e nada foi removido de `modules/`. Conclusão, delimitada a esses arquivos: os módulos
nunca tiveram uma entrada que iniciasse a UI sozinha, então o `Undetermined` não é resto de um
estágio abandonado; eles foram criados como remotes. Isso não muda o `Undetermined` da 3.4.3.

**2. O registro de exemplo do core.** O próprio snapshot explica: o core lê o arquivo apontado por
`MODULE_REGISTRY_CONFIG`, o arquivo real (`config/modules.json`) leva as chaves HMAC e está no
`.gitignore` (.gitignore:12), e só o exemplo é versionado
(apps/core/src/registry/registry-config.ts:3-7). O arquivo é um modelo, não uma configuração ativa
ou abandonada; o histórico não foi consultado para este ponto.

**3. O README contra o Caddy e o core.** O `README.md` só aparece no commit do snapshot, `4b8c5fd`
(2026-08-16), e nenhum commit anterior o cria ou remove. A última mudança do Caddy é `5d7e591`
(2026-08-10), e essa versão, legível no clone, é a do snapshot: já tem o `handle /assets/*` com
`root * /srv/likekiri/public`, um `handle_path /modules/<id>/*` para a porta de cada módulo e o
`handle` final para o core. As últimas mudanças do `shell.service.ts` e do `main.ts` do core são
`ac38c35` (2026-08-10) e `44bf4ff` (2026-08-09). Assim, no repositório, o README nunca conviveu com
outra versão desses arquivos: entrou ao menos seis dias depois da última mudança de cada um, e as
divergências não são de um README que ficou para trás de mudanças versionadas depois dele. O
histórico não mostra se o texto foi escrito antes, fora do repositório, a partir de um desenho
anterior, porque as versões antigas do Caddy (de `c80dbce` a `5a0cd35`) e do `shell.service.ts`
(`8194a3a`, `7e19810`) não estão disponíveis. As afirmações continuam `contradita`.

**4. A cópia para o servidor sem artefato.** O ADR 004 é criado em `27ebeba` e muda só em
`ccf3467` ("Corrige el layout de assets públicos en el ADR 004"), cuja versão é a do snapshot e já
traz a seção de despliegue com a cópia rsync para `/srv/likekiri/app` e os assets em
`/srv/likekiri/public/assets`; a versão de `27ebeba` não está disponível, então a mensagem anuncia
uma correção do layout dos assets, sem que o conteúdo anterior possa ser comparado. `infra/` é
criado em `c80dbce` e só recebe unidades systemd, o Caddy e o `infra/ops/`; nenhum arquivo foi
removido de `infra/`, `docs/`, `config/`, `packages/`, `modules/` nem da raiz, e as remoções em
`apps/` observáveis até `8194a3a` são vistas antigas do admin-shell (`efbee41`) e fontes e uma
prévia do web-shell (`c7b2df4`). Conclusão, delimitada a essas pastas: nunca houve no repositório
um script de deploy, de rsync ou de cópia dos assets que depois tenha sido removido; a cópia
descrita é uma operação feita fora do repositório. O histórico não mostra se ela foi feita.

**5. O texto anterior ao SSR delegado.** O ADR 004 não muda depois de `ccf3467`, e o guia de
integração não muda depois de `ae539bf`; as duas versões estão disponíveis e são as do snapshot,
com "Las islas NO se renderizan en servidor" e "`ssr: \"shell\"` (único modo hoy)". Os dois commits
vêm antes de `ae16de2`, cuja mensagem anuncia o modo `ssr` `'server'` no contrato, e da série que
o implementa no core, no shell e em `clientes` (`c290788`, `8cc44af`, `8ffb581`) e o documenta no
ADR 007 (`07c85d0`). As versões antigas do `manifest.ts` não estão disponíveis (`4005fb5`,
`0958b41`), então a ausência do modo `server` antes de `ae16de2` vem da mensagem. Conclusão: as
duas frases foram escritas num estágio anterior ao SSR delegado e não foram atualizadas quando ele
entrou; descreviam o modo que havia então.

**6. O `hello` fora do domínio do painel.** O `HelloAdminPage.tsx` existe desde o esqueleto do
módulo (`b8e9bb8`) com o mesmo identificador de objeto do snapshot, e o ADR 005 (`4334294`) é
escrito depois dele e não muda até o snapshot. O Caddy muda em `ae30ea2`, quando o `hello` é
federado, em `f529e9b`, que traz a infra de `cuentas` e `registry`, e em mais seis commits até
`5d7e591`, cuja versão é a do snapshot. Todas as versões anteriores a `5d7e591` falharam por objeto
ausente, e a de `ae30ea2` do `server.mjs` do `hello` também. O histórico não mostra se o bloco
`admin.likekiri.com` alguma vez teve rota para o `hello` nem desde quando o manifest do `hello`
declara a rota `admin`. Inconclusivo.

**7. O header "estático".** O `README.md` do `ejemplo-web` é criado em `ff12015` e não muda até o
snapshot (a versão de `ff12015`, disponível, já traz a frase). Depois dele vêm `7e19810` (2026-08-09,
"Añade configuración server-driven del shell editable desde el admin"), `ccafe11` ("Renderiza
header, pie y anuncio del sitio desde la config del back") e `e4ac6f6`, que cria o módulo `sitio`.
Conclusão, delimitada a esse arquivo: a frase foi escrita antes de o header passar a vir da
configuração e não foi atualizada; é texto de um estágio anterior. O histórico não mostra o
conteúdo do header antes de `ccafe11`, só a mensagem.

**8. A "isla SSR" do `ejemplo-web`.** O `package.json` do módulo é criado em `ff12015` e não muda
até o snapshot; a versão de `ff12015`, disponível, já traz a `description`. O módulo nasce antes de
`ae16de2`, cuja mensagem anuncia o modo `ssr` `'server'`. A versão de `ff12015` do `server.mjs`
(modificado depois em `a356ba4`) não está disponível, então o modo da rota naquele commit não pôde
ser lido. Conclusão, delimitada a esse arquivo: a `description` não é resto de um estágio em que a
ilha do `ejemplo-web` tivesse SSR delegado, porque ela é anterior ao próprio modo; o "SSR" do texto
não foi alterado depois que o modo `server` entrou. A afirmação continua `contradita`.

## Comandos

```sh
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website rev-list --count 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --format='%h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --format='%ad' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --merges --format='%h' 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --name-status --format='@@ %h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3      # falhou depois de 8194a3a: objeto ausente 8fb6ee9
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --name-status --format='@@ %h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3 -- apps      # falhou depois de 8194a3a: objeto ausente 8fb6ee9
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --name-status --format='@@ %h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3 -- infra
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --name-status --format='@@ %h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3 -- .env.example .gitignore CLAUDE.md README.md package.json pnpm-workspace.yaml tsconfig.base.json
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --diff-filter=D --name-status --format='@@ %h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3      # falhou depois de 8194a3a: objeto ausente 8fb6ee9
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --diff-filter=D --name-only --format='@@ %h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3 -- apps      # falhou depois de 8194a3a: objeto ausente 8fb6ee9
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --diff-filter=D --name-only --format='@@ %h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3 -- <p>      # <p> = packages, modules, docs, config, infra
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --diff-filter=A --name-only --format='@@ %h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3 -- modules
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website ls-tree --name-only 4b8c5fd5053751aba70fcd4859a38fd33062c8d3
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show --name-status --format='%h %ad %s' --date=short 4b8c5fd
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show --name-status --format='%h %ad %s' --date=short b8e9bb8
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website ls-tree b8e9bb8:modules/hello/src
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website ls-tree 4b8c5fd5053751aba70fcd4859a38fd33062c8d3:modules/hello/src
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --format='%h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3 -- modules/hello/server.mjs modules/hello/vite.config.ts
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --format='%h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3 -- modules/<m>/src/index.ts      # <m> = chat, clientes, cuentas, ejemplo-admin, ejemplo-web, hello, media, ops, registry, sitio
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --format='%h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3 -- infra/caddy/likekiri.caddy
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show <c>:infra/caddy/likekiri.caddy      # <c> = c80dbce, ae30ea2, f529e9b, bfabf90, ae539bf, 788ce2a, 75aa759, 5a0cd35: falharam, objeto ausente
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show 5d7e591:infra/caddy/likekiri.caddy
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --format='%h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3 -- docs/adr/004-ssr-islas-auth-y-despliegue.md
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show 27ebeba:docs/adr/004-ssr-islas-auth-y-despliegue.md      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show ccf3467:docs/adr/004-ssr-islas-auth-y-despliegue.md
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website ls-tree 27ebeba:docs/adr
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website ls-tree ccf3467:docs/adr
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website ls-tree 4b8c5fd5053751aba70fcd4859a38fd33062c8d3:docs/adr
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website log --format='%h %ad %s' --date=short 4b8c5fd5053751aba70fcd4859a38fd33062c8d3 -- <f>      # <f> = docs/como-integrar-un-modulo.md, modules/ejemplo-web/package.json, modules/ejemplo-web/README.md, modules/ejemplo-web/server.mjs, docs/adr/005-admin-por-modulos-y-submenus.md, apps/core/src/shell/shell.service.ts, apps/core/src/main.ts, packages/contract/src/manifest.ts, modules/hello/README.md
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show 8194a3a:apps/core/src/shell/shell.service.ts      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show 7e19810:apps/core/src/shell/shell.service.ts      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show 0958b41:packages/contract/src/manifest.ts      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show 4005fb5:packages/contract/src/manifest.ts      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show ff12015:modules/ejemplo-web/server.mjs      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show ae30ea2:modules/hello/server.mjs      # falhou: objeto ausente
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show ae539bf:docs/como-integrar-un-modulo.md
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show ff12015:modules/ejemplo-web/README.md
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show ff12015:modules/ejemplo-web/package.json
docs/mfe-history-review/tools/hist.sh pmiguras__likekiri-website show 4334294:docs/adr/005-admin-por-modulos-y-submenus.md
```

## Resumo

Commits até o snapshot: 111 (2026-08-09 a 2026-08-16). Pontos: 8 (esclarecido: 6, inconclusivo: 1, resolvido pelo snapshot: 1).
