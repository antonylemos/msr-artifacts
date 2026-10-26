---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
url: https://github.com/hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 7
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 060 — hscale/adx-core-k

## Contexto

- **Abordagem de implementação:** Module Federation (Vite federation) com shell React e seis remotes de domínio
- **Tipo de repositório:** example/proof of concept (plataforma "ADX CORE" gerada com o agente Kiro: `.kiro/specs/`, `.kiro/steering/`, dezenas de relatórios de sincronização na raiz)
- **Classificação:** MFE-implemented (com ressalva de completude: projeto gerado por agente de IA, vários remotes incompletos)

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Documentação | `README.md:17` "Frontend Microservices: Domain-aligned micro-frontends with Module Federation"; `:31-36` shell React + Vite MF + micro-frontends Auth, Tenant, File, User, Workflow; `.kiro/specs/frontend-microservices/*.md`, `.kiro/steering/frontend-microservices.md` | fraca |
| Estrutura | `adx-core/apps/`: `shell`, `auth`, `tenant`, `file`, `user`, `workflow`, `module`, cada um com `package.json` e `vite.config.ts`; backend Rust (`adx-core/Cargo.toml`, serviços) | forte |
| Configuração (host) | `adx-core/apps/shell/vite.config.ts:10-17`: `name: 'shell'`, `remotes` para `auth_app` (3001), `tenant_app` (3002), `file_app` (3003), `user_app` (3004), `workflow_app` (3005), `module_app` (3006) | forte |
| Configuração (remotes) | `adx-core/apps/<app>/vite.config.ts:9-17`: `name: '<app>_app'`, `filename: 'remoteEntry.js'`, `exposes` com `./App` e componentes de domínio | forte |
| Código-fonte (composição) | `adx-core/apps/shell/src/App.tsx:16-21`: `React.lazy(() => import('auth_app/App'))` e os demais remotes; `:47-54`: rotas `/auth/*`, `/tenant/*`, `/files/*`, `/users/*`, `/workflows/*`, `/modules/*` | forte |
| Build/deploy | `.github/workflows/deploy-microfrontends.yml:6,74-139`: detecção de apps alteradas, matriz de build por app, verificação de `remoteEntry.js` por remote | forte |
| Estrutura (lacunas) | 13 módulos expostos não existem no repositório (ex.: `file/src/components/FileUpload.tsx`, `user/src/components/UserProfile.tsx`, `workflow/src/components/WorkflowList.tsx`, `tenant/src/components/TenantSwitcher.tsx`); `file`, `user` e `workflow` têm só `package.json`, `vite.config.ts` e `src/App.tsx`. Só `auth` tem todos os módulos expostos presentes | ambígua |

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `shell` + seis remotes; pelo menos o par `shell` + `auth` está completo |
| Q2 | Yes | `vite.config.ts` e build próprios por app; workflow de deploy por app; sem import de código-fonte entre apps |
| Q3 | Yes | O shell roteia e monta os remotes (`App.tsx:47-54`) |
| Q4 | Yes | `remotes`/`exposes` configurados e usados via `import('<remote>/App')` (`App.tsx:16-21`) |
| Q5 | Yes, com ressalva | A configuração de composição é completa e coerente; a implementação de vários remotes está incompleta (exposes apontando para arquivos ausentes) |

## Motivo

- Q1–Q4 são Yes e a composição é explícita (config, código, roteamento e CI por app), o que leva a MFE-implemented.
- Corresponde a "monorepos containing a host and its remotes".

## Notas para análise

- **RQ1:** a configuração de composição (remotes, exposes, CI por app) é mais completa que o código das unidades; artefatos de configuração sozinhos superestimam a implementação.

## Ponto para revisão conjunta

- **Completude:** o build de `file`, `user`, `workflow`, `tenant` e `module` deve falhar, porque os `exposes` apontam para arquivos inexistentes. O par `shell` + `auth` é o que sustenta a classificação. Se o estudo exigir que a composição seja executável no snapshot, vale verificar o build do `auth`.
- **Código gerado por IA:** o repositório é produto de um agente (Kiro), com muita documentação de processo e implementação parcial. Isso pode ser registrado como um tipo de repositório próprio, pois a arquitetura declarada excede o que foi implementado.
