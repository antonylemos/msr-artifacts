---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 013 — nikJovanovic/ita-vaje

## Repository overview

The repository has English documentation in two coding agent instruction files (`.github/copilot-instructions.md` and `CLAUDE.md`), a short `README.md` per application and a root `README.md`. `artifacts.csv` does not mark `.github/copilot-instructions.md` as type `documentation` (column `artifact_types` is empty), but the file is prose about the project as a whole, so it was read in full and enters the table like the others. It describes an architecture older than the current snapshot: "3 backend microservices + 1 Next.js frontend" (.github/copilot-instructions.md:7), with a single `frontend/` directory (:13-18, :83-88, :93, :118-119) — no `frontend/` exists in the snapshot, which has `shell/`, `catalog-mfe/`, `builds-mfe/` and `auth-mfe/`. `CLAUDE.md` is the densest and most current text: it describes the full architecture — 3 microservices, 2 BFFs and a "4-zone Next.js micro-frontend" (CLAUDE.md:11) —, lists all four zones with port and `assetPrefix` (CLAUDE.md:25-30), and has a paragraph (CLAUDE.md:32) concentrating several claims about zones: independence, shared design preset, navigation only through `<a>`, JWT cookie session and common `web-bff` use. Root `README.md` repeats the same overview in prose and an ASCII diagram (README.md:11, 13-44, 60-69), adds that `mobile-bff` is not connected to zones (README.md:46) and zones are "deployed independently" (README.md:69), and ends with an annotated folder tree (README.md:93-108). The four `README.md` files in `auth-mfe/`, `builds-mfe/`, `catalog-mfe/` and `shell/` are short texts, each describing its own zone; most repeat what `CLAUDE.md`/`README.md` already claim (owned route, JWT cookie dependency, `web-bff` calls), with more detail per zone, except `shell/README.md`, which adds a claim about "shared header/footer" (shell/README.md:3, 28-29). `README.md` files in `builds-service/`, `mobile-bff/`, `parts-service/`, `users-service/` and `web-bff/` were read in full; they describe each service independently (framework, endpoints, environment variables) and its calls to other backends, without any claim about frontend units as a whole — they did not enter the table.

`doc-*` occurrences that did not become rows, being titles, isolated mentions or infrastructure details without architectural claims: CLAUDE.md:23 and README.md:60 (title "Micro-frontends (Next.js Multi-Zones)"); CLAUDE.md:72, README.md:75-81 and .github/copilot-instructions.md:27,30 (tech stack tables, runtime/framework rather than composition); README.md:24-25 (ASCII diagram, repeating the same shell→zones→web-bff composition already claimed in CLAUDE.md:25-30, without a new property); README.md:103-105 (folder tree comments describing only each zone's business function: "browse
components", "manage builds", "register / login / profile"); README.md:106 (comment "all MFE
zones" in `docker-compose.yml`, already covered by the build and deployment review); auth-mfe/README.md:1, builds-mfe/README.md:1 and catalog-mfe/README.md:1 (titles "# auth-mfe" etc.). In CLAUDE.md:11, sentence "**BFFs and MFEs have no database** — they compose upstream calls" did not become a row: it is an internal unit detail (absence of a database), rather than a frontend inter-unit relationship. Sections "Inter-Service Communication" (CLAUDE.md:59-66), "BFFs (Backends-for-Frontends)" (CLAUDE.md:34-45) and equivalent sections in `.github/copilot-instructions.md` ("Key rules", "Service Responsibilities", "Database") describe only relationships between backends and BFFs, or internal unit rules, without mentioning frontend zones.

Configuration or code artifacts cited by previous reviews (`next.config.ts`, `docker-compose.yml`, `Header.tsx`, `auth-client.ts`) have no comment with architectural content; they lack explanatory comments.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | .github/copilot-instructions.md:7,13-18 | "Architecture: 3 backend microservices + 1 Next.js frontend." / "frontend/ # Next.js UI consuming all three services" | structure | contradicted | 3.4.3 (auth-mfe, builds-mfe, catalog-mfe, shell = `Yes`, four frontend units; no `frontend/` directory in the snapshot); classification inputs (`frontend_units: 4`) |
| 2 | .github/copilot-instructions.md:138 | "Do not create shared packages/libs between services — keep them fully independent" | independence | corroborated | 3.4.4 (Header.tsx, Footer.tsx and src/lib/{auth,auth-client,bff,jwt}.ts duplicated in each app; no app imports source code from another); CLAUDE.md:117 (same rule, "fully independent") |
| 3 | CLAUDE.md:11 | "4-zone Next.js micro-frontend" | structure | corroborated | 3.4.3 (auth-mfe, builds-mfe, catalog-mfe, shell = `Yes`, four frontend units); CLAUDE.md:25-30 |
| 4 | CLAUDE.md:25-30 | "`shell` ... landing + rewrites"; "`catalog-mfe` ... `/catalog-static` ... `/catalog/*`" (and equivalent lines for `builds-mfe` and `auth-mfe`) | composition | corroborated | 3.4.4 (shell/next.config.ts:6, host-relationship); 3.4.5 #1-#3; shell/next.config.ts:6-30; docker-compose.yml:209-211; README.md:17-20,62-69; auth-mfe/README.md:3; builds-mfe/README.md:3; catalog-mfe/README.md:3; shell/README.md:3,19-21 |
| 5 | CLAUDE.md:32 | "All zones are independent Next.js 16 apps." | independence | corroborated | 3.4.3 (auth-mfe, builds-mfe, catalog-mfe, shell: own manifest, entry point and build); 3.4.6 #1-#4 (own CI per app, without joint orchestration) |
| 6 | CLAUDE.md:32 | "Each uses shadcn/ui with the shared preset `b1t3ILnrM` for consistent design tokens." | composition | partial | shell/components.json:3 (`"style": "radix-lyra"`); catalog-mfe/components.json:3; builds-mfe/components.json:3; auth-mfe/components.json:3 (same `style`, `baseColor`, `aliases` in all four); README.md:69 ("so they look like one app") |
| 7 | CLAUDE.md:32 | "Cross-zone navigation uses plain `<a>` tags (never `next/link`)." | composition | corroborated | 3.4.4 (search for `import(`, `React.lazy`, `loadRemote*` etc. without results in all four apps); shell/src/components/Header.tsx:28-56; catalog-mfe/src/components/Header.tsx:28-56; builds-mfe/src/components/Header.tsx:28-56; auth-mfe/src/components/Header.tsx:28-56 |
| 8 | CLAUDE.md:32 | "Shared auth = `jwt` cookie on the shared origin; each zone has both server-side ... and client-side ... helpers." | composition | corroborated | 3.4.4 (auth-mfe/src/lib/auth-client.ts:20); 3.4.5 #4-#6; auth-mfe/README.md:3; builds-mfe/README.md:3; shell/README.md:30 |
| 9 | CLAUDE.md:32 | "Every MFE fetches from `web-bff`" | composition | partial | catalog-mfe/src/app/catalog/page.tsx:8,38; builds-mfe/src/app/builds/page.tsx:9,29; auth-mfe/src/app/auth/me/page.tsx:10,34; catalog-mfe/README.md:3; shell/src/lib/bff.ts (present, without a `bffFetch`/`bffUrl` call in `shell/src`) |
| 10 | CLAUDE.md:32 | "the shared `src/lib/bff.ts`" | composition | contradicted | shell/src/lib/bff.ts; catalog-mfe/src/lib/bff.ts; builds-mfe/src/lib/bff.ts; auth-mfe/src/lib/bff.ts |
| 11 | README.md:11 | "Each zone is its own Next.js app, own Dockerfile, own CI pipeline." | build-deploy | corroborated | 3.4.3 (auth-mfe, builds-mfe, catalog-mfe, shell with own Dockerfile and manifest); 3.4.6 #1-#4 (separate build and deployment, own CI per app without deployment) |
| 12 | README.md:46 | "`mobile-bff` ... not wired into the micro-frontend zones" | composition | corroborated | search for "mobile" and port 4005 without results in shell/src, catalog-mfe/src, builds-mfe/src and auth-mfe/src; docker-compose.yml:129-130 (`mobile-bff` without an environment variable read by any zone) |
| 13 | README.md:69 | "despite being deployed independently" | build-deploy | corroborated | 3.4.6 #1-#4 (build and deployment always `separate` per app, without a release or joint deployment artifact) |
| 14 | shell/README.md:3,28-29 | "shared header/footer" / "[Header.tsx] — shared nav..." / "[Footer.tsx] — shared footer" | composition | contradicted | shell/src/app/layout.tsx:3-4; catalog-mfe/src/app/layout.tsx:3-4; builds-mfe/src/app/layout.tsx:3-4; auth-mfe/src/app/layout.tsx:3-4 (each zone imports local `@/components/Header` and `@/components/Footer`); shell/src/components/{Header,Footer}.tsx byte-identical to those in catalog-mfe, builds-mfe and auth-mfe, but in separate files |

## Observations

**1. .github/copilot-instructions.md:7,13-18.** This document describes an earlier project stage: a single `frontend/` consuming all three backend services, without BFFs or zones. The current snapshot has no `frontend/` directory; it has four Next.js apps (`shell`, `catalog-mfe`, `builds-mfe`, `auth-mfe`), confirmed by the structural review and classification (`frontend_units:
4`). The same assumption of a single `frontend/` repeats in `.github/copilot-instructions.md:83-88` ("### frontend — Next.js App Router"), `:93` ("`biome.json` in `frontend/`") and `:118-119` ("cd
frontend && bun run dev"). The claim is `contradicted`: the artifact shows the opposite of the document's description.

**2. .github/copilot-instructions.md:138.** The rule applies to both backend services and frontend zones: the source review found `Header.tsx`, `Footer.tsx` and `src/lib/{auth,auth-client,bff,jwt}.ts` copied into each of the four apps, without any app importing another's source code — "fully independent" through duplication, rather than a common library. The same rule, with nearly identical wording, reappears in `CLAUDE.md:117` ("Do not create shared
packages/libs between services — fully independent").

**3. CLAUDE.md:11.** The "4-zone" count matches the structural review: `shell`, `catalog-mfe`, `builds-mfe` and `auth-mfe` are the snapshot's four frontend units. The same count reappears in the table at CLAUDE.md:25-30 and the equivalent table at README.md:60-67.

**4. CLAUDE.md:25-30.** The table names all four zones, each one's port and `assetPrefix`, and column "Owns" repeats the routing relationship already found by source and composition reviews in `shell/next.config.ts`: `shell` rewrites `/catalog`, `/builds` and `/auth` to `catalog-mfe`, `builds-mfe` and `auth-mfe`, each responding under its own `assetPrefix`. The same information repeats, with more detail per zone, in README.md:17-20 and 62-69, the ASCII diagram at README.md:13-44, and all four zone `README.md` files ("owns `/auth/...`", "owns `/builds/...`", "owns
`/catalog/...`", "forwards path-prefixed requests to the other zones via `rewrites`").

**5. CLAUDE.md:32.** "Independent" is the same conclusion reached by the structural review (each app with its own `package.json`, build and entry point) and build and deployment review (own CI per app, without a joint release orchestration artifact). This claim does not mention deployment; the deployment claim ("deployed independently", README.md:69) is handled in its own row (#13), as another property.

**6. CLAUDE.md:32.** Identifier `b1t3ILnrM` appears in no snapshot artifact — neither `components.json`, `tailwind.config` nor source code — only in CLAUDE.md and README.md text. The verifiable portion, "consistent design tokens", is confirmed: all four `components.json` files have the same `style` (`radix-lyra`), `baseColor` and `aliases`, and each zone has its own `globals.css`. But "shared" is unsupported: there is no shared preset as a common file or package — each zone has its own identical configuration copy, following the same duplication pattern already recorded by the source review for `Header.tsx`/`Footer.tsx`. The claim is `partial`: tokens are indeed consistent across all four zones, but through duplicated configuration rather than an identifiable shared preset.

**7. CLAUDE.md:32.** Confirms what the source review already found: full-page links (`<a href="/catalog">` etc.) in all four identical `Header.tsx` files, and no occurrence of `import('next/link')` or `<Link>` in code of all four apps — the only "next/link" mention in the snapshot is a test name in `shell/tests/header.test.tsx:49` ("exposes cross-zone nav links as
`<a>` (not next/link)"), describing the tested behavior itself.

**8. CLAUDE.md:32.** The same mechanism found by source and composition reviews: `auth-mfe` writes cookie `jwt` (`path=/`) after login/registration, and `shell`, `catalog-mfe` and `builds-mfe` read it in their own `Header.tsx` (`readJwtFromDocument`). `README.md` files in `auth-mfe` and `builds-mfe` repeat the dependency ("every other zone reads that cookie"; "Create +
delete require a JWT cookie (set by auth-mfe)"), and the `README.md` of `shell` lists cookie helpers in `src/lib/auth.ts`/`auth-client.ts`.

**9. CLAUDE.md:32.** `catalog-mfe`, `builds-mfe` and `auth-mfe` do import `bffFetch`/`bffUrl` from `src/lib/bff.ts` and call `web-bff` (e.g.: catalog-mfe/src/app/catalog/page.tsx:38, builds-mfe/src/app/
builds/page.tsx:29, auth-mfe/src/app/auth/me/page.tsx:34); `catalog-mfe/README.md:3` confirms this ("Fetches from web-bff"). `shell` has the same `src/lib/bff.ts` file, but no call to `bffFetch` or `bffUrl` appears in `shell/src` — claim "every MFE" is unsupported for `shell`, hence `partial`.

**10. CLAUDE.md:32.** All four `src/lib/bff.ts` files (`shell`, `catalog-mfe`, `builds-mfe`, `auth-mfe`) are byte-identical in logic (same constants, same `bffUrl`, same `bffFetch`), but are four separate files, each inside its own app — the same duplication pattern recorded by the source review for `Header.tsx`/`Footer.tsx`/`auth-client.ts`. No common module or package is imported by all four zones; "shared" is contradicted by the artifact.

**11. README.md:11.** Confirms what the structural and build and deployment reviews already showed: each of the four apps has its own `Dockerfile` (e.g.: auth-mfe/Dockerfile:10) and CI workflow triggered by `paths` (e.g.: .github/workflows/auth-mfe.yml:5-7), without automated deployment in any of them.

**12. README.md:46.** No snapshot artifact connects `mobile-bff` to micro-frontend zones: the service exists in `docker-compose.yml:129-130`, but no environment variable in `shell` or zones references it, and no file in `shell/src`, `catalog-mfe/src`, `builds-mfe/src` or `auth-mfe/src` mentions `mobile-bff` or port `4005`. The README claim is confirmed.

**13. README.md:69.** Each zone's separate deployment is exactly what the build and deployment review recorded: own build, image and CI per app, without a release or joint deployment artifact (3.4.6 #1-#4). This is distinct from "independent apps" (#5): here the document explicitly refers to deployment, hence its own row and theme (build-deploy), as in step 3 of INSTRUCTIONS.md.

**14. shell/README.md:3,28-29.** `shell/README.md` calls `Header.tsx` and `Footer.tsx` "shared" twice. In the snapshot, each of the four apps imports its own `@/components/Header` and `@/components/Footer` (shell/src/app/layout.tsx:3-4; catalog-mfe/src/app/layout.tsx:3-4; builds-mfe/src/app/layout.tsx:3-4; auth-mfe/src/app/layout.tsx:3-4) — all four files are byte-identical, but no common component or package is imported by more than one unit: this is duplication rather than sharing. The claim is `contradicted`, following the pattern already seen in `src/lib/bff.ts` (#10) and the design preset (#6).

## Summary

Claims: 14 (corroborated: 9, partial: 2, contradicted: 3, uncorroborated: 0). Themes: (structure: 2, composition: 8, build-deploy: 2, independence: 2).
