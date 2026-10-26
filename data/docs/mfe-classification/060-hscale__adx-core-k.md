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

## Context

- **Implementation approach:** Module Federation (Vite federation) with a React shell and six domain remotes
- **Repository type:** example/proof of concept ("ADX CORE" platform generated with the Kiro agent: `.kiro/specs/`, `.kiro/steering/`, dozens of synchronization reports at the root)
- **Classification:** MFE-implemented (with a completeness caveat: AI-agent-generated project, several incomplete remotes)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:17` "Frontend Microservices: Domain-aligned micro-frontends with Module Federation"; `:31-36` React shell + Vite MF + Auth, Tenant, File, User, Workflow micro-frontends; `.kiro/specs/frontend-microservices/*.md`, `.kiro/steering/frontend-microservices.md` | weak |
| Structure | `adx-core/apps/`: `shell`, `auth`, `tenant`, `file`, `user`, `workflow`, `module`, each with `package.json` and `vite.config.ts`; Rust backend (`adx-core/Cargo.toml`, services) | strong |
| Configuration (host) | `adx-core/apps/shell/vite.config.ts:10-17`: `name: 'shell'`, `remotes` for `auth_app` (3001), `tenant_app` (3002), `file_app` (3003), `user_app` (3004), `workflow_app` (3005), `module_app` (3006) | strong |
| Configuration (remotes) | `adx-core/apps/<app>/vite.config.ts:9-17`: `name: '<app>_app'`, `filename: 'remoteEntry.js'`, `exposes` with `./App` and domain components | strong |
| Source code (composition) | `adx-core/apps/shell/src/App.tsx:16-21`: `React.lazy(() => import('auth_app/App'))` and other remotes; `:47-54`: routes `/auth/*`, `/tenant/*`, `/files/*`, `/users/*`, `/workflows/*`, `/modules/*` | strong |
| Build/deploy | `.github/workflows/deploy-microfrontends.yml:6,74-139`: changed-app detection, per-app build matrix, `remoteEntry.js` verification per remote | strong |
| Structure (gaps) | 13 exposed modules do not exist in the repository (e.g., `file/src/components/FileUpload.tsx`, `user/src/components/UserProfile.tsx`, `workflow/src/components/WorkflowList.tsx`, `tenant/src/components/TenantSwitcher.tsx`); `file`, `user` and `workflow` have only `package.json`, `vite.config.ts` and `src/App.tsx`. Only `auth` has all exposed modules present | ambiguous |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `shell` + six remotes; at least the `shell` + `auth` pair is complete |
| Q2 | Yes | Each app has its own `vite.config.ts` and build; per-app deployment workflow; no source code imports between apps |
| Q3 | Yes | The shell routes to and mounts remotes (`App.tsx:47-54`) |
| Q4 | Yes | `remotes`/`exposes` configured and used through `import('<remote>/App')` (`App.tsx:16-21`) |
| Q5 | Yes, with caveat | Composition configuration is complete and coherent; several remote implementations are incomplete (exposes pointing to missing files) |

## Rationale

- Q1–Q4 are Yes and composition is explicit (config, code, routing and CI per app), leading to MFE-implemented.
- Matches "monorepos containing a host and its remotes".

## Analysis notes

- **RQ1:** composition configuration (remotes, exposes, CI per app) is more complete than unit code; configuration artifacts alone overestimate implementation.

## Point for joint review

- **Completeness:** builds for `file`, `user`, `workflow`, `tenant` and `module` should fail because `exposes` points to nonexistent files. The `shell` + `auth` pair supports classification. If the study requires composition to be executable in the snapshot, the `auth` build should be checked.
- **AI-generated code:** the repository is an agent's product (Kiro), with extensive process documentation and partial implementation. This could be recorded as its own repository type, since declared architecture exceeds what was implemented.
