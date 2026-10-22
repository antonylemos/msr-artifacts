---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
url: https://github.com/Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [native-federation]
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 059 — Efraim0601/union-portal

## Contexto

- **Abordagem de implementação:** Native Federation (`@angular-architects/native-federation`, Angular 21, esbuild) com manifesto
- **Tipo de repositório:** production-oriented (portal de banco "Afriland Union": app de staff e onboarding de clientes da diáspora; deploy em servidor com nginx e Docker; 37 commits)
- **Commit avaliado:** `b11a3e3` (branch padrão `master`)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:1-30`: "Monorepo Angular CLI 21… host + remotes via module federation"; diagrama `shell (host, :4200) ──loadRemoteModule──► promote (:4201) / diaspora (:4202)`; libs `@union/design-system` e `@union/auth` (SSO por `localStorage`); "reproduz a arquitetura de `portal-client-firstpay`" do banco | moderada |
| Estrutura | `projects/shell` (host), `projects/promote` e `projects/diaspora` (remotes), cada um com `federation.config.js`, `src/main.ts`, `src/bootstrap.ts`, proxy próprio; libs `projects/design-system` e `projects/auth` | forte |
| Configuração (host) | `projects/shell/federation.config.js:3-9`: `withNativeFederation({ name: 'shell', shared: shareAll(singleton) })`; `projects/shell/public/federation.manifest.json:1-4`: `promote` → `http://localhost:4201/remoteEntry.json`, `diaspora` → `:4202`; `deploy/federation.manifest.prod.json:1-4`: em produção, `/remotes/promote/remoteEntry.json` e `/remotes/diaspora/remoteEntry.json` | forte |
| Configuração (remotes) | `projects/promote/federation.config.js:3-10` e `projects/diaspora/federation.config.js:8-9`: `exposes: { './Routes': '…/remote.routes.ts' }` | forte |
| Código-fonte (composição) | `projects/shell/src/main.ts:1-5`: `initFederation('federation.manifest.json')` antes do bootstrap; `projects/shell/src/app/app.routes.ts:2,11-18`: rotas `promote` e `diaspora` com `loadRemoteModule('<remote>', './Routes')` | forte |
| Código-fonte | Nenhum import de código-fonte entre `shell`, `promote` e `diaspora`; as libs comuns entram por path mapping e `shareAll` (sustenta a independência das unidades) | ausente |
| Build/deploy | `Dockerfile:20-22`: três `ng build` separados (`shell`, `promote` com `--base-href /remotes/promote/`, `diaspora` com `/remotes/diaspora/`); `deploy/nginx.conf:29-38`: cada remote servido sob `/remotes/<app>/`; `deploy/server/deploy.sh`: deploy em servidor (builds separados, imagem única) | moderada |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `shell`, `promote` e `diaspora` |
| Q2 | Yes | Entry, `federation.config.js` e build próprios por app (`Dockerfile:20-22`); sem import de código-fonte entre apps |
| Q3 | Yes | O shell roteia e carrega os remotes (`app.routes.ts:11-18`) |
| Q4 | Yes | Native Federation configurada (manifesto dev/prod) e usada via `initFederation` + `loadRemoteModule` |
| Q5 | Yes | Q1–Q4 convergem; ver nota sobre deploy |

## Motivo

- Q1–Q5 são todos Yes, o que satisfaz a regra de MFE-implemented.
- Corresponde a "monorepos containing a host and its remotes", com composição em runtime por manifesto.

## Notas para análise

- **Checklist (critério de deploy do repositório 042):** as três apps são empacotadas na **mesma imagem Docker** e implantadas juntas. Diferente do repositório 042, não há acoplamento de build: cada app tem `ng build` próprio e o shell carrega os remotes em runtime pelo manifesto; um remote pode ser recompilado e substituído em `/remotes/<app>/` sem recompilar o shell. O empacotamento conjunto é uma escolha de deploy, não uma dependência de build. Se a regra de "dependência de deploy" for interpretada como exigência de deploy separado, o caso merece revisão.
- **RQ2:** Native Federation (variante esbuild/ESM do MF para Angular), primeira ocorrência na amostra.
- **RQ3:** manifestos distintos por ambiente (`public/federation.manifest.json` dev × `deploy/federation.manifest.prod.json` prod), SSO entre MFEs por `localStorage` compartilhado (`@union/auth`).
