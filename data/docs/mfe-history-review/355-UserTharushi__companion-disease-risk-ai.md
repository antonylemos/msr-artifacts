---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
inputs:
  clone: data/samples/mfe-sample-001/repos/UserTharushi__companion-disease-risk-ai
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 355 — UserTharushi/companion-disease-risk-ai

## Repository overview

Reachable history up to snapshot has 65 commits, from 2026-03-06 (`f3cfb0e`, “Initial commit”) to 2026-08-03 (`373de0e`, “Resolve a clinic's position from its address on save”). Query with `--full-history` includes merged branches: `1d5c716` (2026-03-25, “project setup”) adds shell configuration and code, while `f1531e1` (2026-04-09, “chore: initial project commit”) incorporates another initial tree later merged. Second addition record should not be interpreted as mechanism birth in entire project.

Shell federated configuration has same object in March, April and snapshot; its App differs between March and April, but April object matches snapshot. This delineates auth redirect persistence since April incorporation, without reading March stage. In July, `3d48ece` (2026-07-18, “feat(web): credentials-only login, trilingual UX fixes, explainability panel”) adds pet-profile and admin API clients and modifies listing page; three objects at this commit match snapshot. File record proves milestones, but not operational usage, abandonment or application extraction.

Clone supports reading metadata and trees. Attempts to open March App and April and July CLAUDE.md versions failed due to unavailable historical contents, without fetching objects. Snapshot already explains current redirect behavior and direct service access, but does not resolve historical documentary claim origins or earlier Turbo usage. Conclusions of steps 3.4.2–3.4.7 remain as recorded.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Turbo is configured, but no automation usage is observed. | 3.4.2 (package.json:20, turbo `Undetermined`); 3.4.7 #15 | dependency use | 1d5c716, 2026-03-25, “project setup”; f1531e1, 2026-04-09, “chore: initial project commit” | inconclusive |
| 2 | Shell configures auth as remote, but reaches it through redirect. | 3.4.4 (Notes, apps/shell/vite.config.ts:12 and apps/shell/src/App.tsx:8-15); 3.4.5 #7; 3.4.7 #13 | active or abandoned | 1d5c716, 2026-03-25, “project setup”; f1531e1, 2026-04-09, “chore: initial project commit” | clarified |
| 3 | Documentation presents auth as entire frontend in use and shell as inert. | 3.4.7 #2 and #6 | active or abandoned | f1531e1, 2026-04-09, “chore: initial project commit”; 46d7f21, 2026-07-18, “docs: validation methodology, ML reports, verification guide, config”; 869945f, 2026-07-26, “Add relationship-based access control; remove hardcoded/fabricated data”; dcd3623, 2026-07-29, “Bounded inquiry threads, and scope inquiries to the vet they were sent to” | inconclusive |
| 4 | Description of shell and other MFEs as empty conflicts with routes and API access. | 3.4.7 #4 | conflicting stages | f1531e1, 2026-04-09, “chore: initial project commit”; 3d48ece, 2026-07-18, “feat(web): credentials-only login, trilingual UX fixes, explainability panel”; 46d7f21, 2026-07-18, “docs: validation methodology, ML reports, verification guide, config” | inconclusive |
| 5 | shared-utils is described as shared, but has no observed consumers. | 3.4.7 #8 | active or abandoned | 1d5c716, 2026-03-25, “project setup”; f1531e1, 2026-04-09, “chore: initial project commit”; 9ac4ff2, 2026-07-18, “feat(backend): auth enforcement, profile fields, prediction persistence, agent chat, ML validation” | inconclusive |
| 6 | Generalization of gateway access with Bearer conflicts with direct pet-profile and admin clients. | 3.4.7 #9 | conflicting stages | 3d48ece, 2026-07-18, “feat(web): credentials-only login, trilingual UX fixes, explainability panel”; 46d7f21, 2026-07-18, “docs: validation methodology, ML reports, verification guide, config” | inconclusive |

## Observations

**1. Turbo usage.** The `package.json` has same object in March, April and snapshot; `turbo.json` changes between March and April and has same object from April to snapshot. Complete path history of `.github`, `scripts`, frontend Dockerfiles and Cloud Build records no workflow in `.github`; scripts added in July concern ontology, demonstration data, icons and documents. This demonstrates neither Turbo automation execution nor whether integration was removed at another path. Persistent configuration is insufficient to decide usage or abandonment: inconclusive result, retaining `Undetermined` in 3.4.2.

**2. Auth configured without federated consumption.** Shell federated map is same object in `1d5c716`, `f1531e1` and snapshot. March App has another object and reading failed; how auth was consumed then cannot be asserted. App incorporated in `f1531e1` is exactly current object, whose contents were read in snapshot (apps/shell/src/App.tsx:8-15,44): redirects to auth and imports six other remotes. Thus absence of federated auth consumption persists since April incorporation, without later change to this file. Point is clarified within limit: this is not configuration left without consumer after a later App change in July. This proves neither auth never federated before April nor abandonment; relationship remains `Active: No` in 3.4.5.

**3. Actual usage concentrated in auth.** CLAUDE.md is added in `f1531e1` and modified in `46d7f21`, `869945f` and `dcd3623`. Reading April and July 18 versions failed. Metadata cannot attribute sentence about frontend in use to any commit or confirm shell stopped being used. Persistent shell code demonstrates existence, rather than operation. Commit messages announce documentary, access-control and conversation changes without proving operational frontend state. Result is inconclusive.

**4. Scaffolds described as empty.** Identifiers show shell already had current App with routes and imports in April. In `3d48ece`, pet-profile and admin API clients are added and PetListPage modified; objects match snapshot, where PetListPage fetches data and handles loading/error (apps/mfe-pet-profile/src/pages/PetListPage.tsx:19-39; apps/mfe-pet-profile/src/lib/api.ts:24-51). Message announces web adjustments without itself detailing implementations. CLAUDE.md from April or `46d7f21` could not be read; thus whether sentence “empty scaffolds” preceded features or was written already conflicting with them cannot be established. Code milestones are observable, but conflict explanation remains inconclusive; snapshot contradiction remains.

**5. Library without observed consumers.** Path history of shared-utils records manifest and code in `1d5c716` and incorporation `f1531e1`; in `9ac4ff2`, package tsconfig is added. Presence and compilation preparation do not demonstrate consumption by other units. Nor does queried history trace all possible old consumers. No basis infers abandoned library or earlier sharing; inconclusive result, retaining absence of corroboration in 3.4.7 #8.

**6. Gateway and direct clients.** Pet-profile and admin clients are added in `3d48ece`, with same objects as snapshot: first defaults to port 4002, second to 4003, both without Bearer inclusion in request helper (apps/mfe-pet-profile/src/lib/api.ts:3-18; apps/mfe-admin/src/lib/api.ts:3-9). This proves direct clients persist since July. However, old CLAUDE.md versions could not be read; when gateway generalization appeared or whether it described only auth in earlier stage is unknown. Conflict cannot be explained as outdated documentation, intention or copying: inconclusive result without changing snapshot contradiction.

## Commands

All historical revisions below are snapshot or ancestors shown by log starting there. Three `show` queries failed with `fatal: bad object`: paths exist in trees, but historical contents were unavailable. First attempts at `rev-list` and first two `log` commands were blocked by sandbox when recording commands.log; repeated with permission before any script access to Git.

```sh
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai rev-list --count 373de0e6083b86b2707913da037735130c8f5503
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai log --format='%h %ad %s' --date=short 373de0e6083b86b2707913da037735130c8f5503
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai log --format='%h %ad %s' --date=short --name-status --no-renames 373de0e6083b86b2707913da037735130c8f5503 -- package.json turbo.json apps/shell/src/App.tsx apps/shell/vite.config.ts apps/shell/src/federation.d.ts apps/mfe-auth/vite.config.ts apps/mfe-pet-profile/src/pages/PetListPage.tsx apps/mfe-pet-profile/src/lib/api.ts apps/mfe-admin/src/lib/api.ts CLAUDE.md README.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai log --full-history --format='%h %ad %s' --date=short --name-status --no-renames 373de0e6083b86b2707913da037735130c8f5503 -- package.json turbo.json apps/shell/src/App.tsx apps/shell/vite.config.ts apps/shell/src/federation.d.ts apps/mfe-auth/vite.config.ts apps/mfe-pet-profile/src/pages/PetListPage.tsx apps/mfe-pet-profile/src/lib/api.ts apps/mfe-admin/src/lib/api.ts CLAUDE.md README.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai ls-tree -r 1d5c716 -- package.json turbo.json apps/shell/src/App.tsx apps/shell/vite.config.ts apps/mfe-pet-profile/src/pages/PetListPage.tsx CLAUDE.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai show 46d7f21:CLAUDE.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai show 1d5c716:apps/shell/src/App.tsx
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai ls-tree -r 373de0e6083b86b2707913da037735130c8f5503 -- package.json turbo.json apps/shell/src/App.tsx apps/shell/vite.config.ts apps/mfe-pet-profile/src/pages/PetListPage.tsx apps/mfe-pet-profile/src/lib/api.ts apps/mfe-admin/src/lib/api.ts CLAUDE.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai log --full-history --format='%h %ad %s' --date=short --name-status --no-renames 373de0e6083b86b2707913da037735130c8f5503 -- .github scripts infra/gcp/cloudbuild.yaml apps/shell/Dockerfile apps/mfe-auth/Dockerfile packages/shared-utils
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai ls-tree -r f1531e1 -- package.json turbo.json apps/shell/src/App.tsx apps/shell/vite.config.ts CLAUDE.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai show f1531e1:CLAUDE.md
docs/mfe-history-review/tools/hist.sh UserTharushi__companion-disease-risk-ai ls-tree -r 3d48ece -- apps/mfe-pet-profile/src/pages/PetListPage.tsx apps/mfe-pet-profile/src/lib/api.ts apps/mfe-admin/src/lib/api.ts
```

Comparison below was performed before and after queries, matching reference on both occasions:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Summary

Commits up to the snapshot: 65 (2026-03-06 to 2026-08-03). Points: 6 (clarified: 1, inconclusive: 5, resolved by the snapshot: 0).
