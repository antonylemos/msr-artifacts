---
schema: 1
id: 1073549332
full_name: jwbqfck95434TaraWong/hub
url: https://github.com/jwbqfck95434TaraWong/hub
commit: 0d6b0a0179c05654fa019a5267df7b9527ce0aa0
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 122 — jwbqfck95434TaraWong/hub

## Context

Declared copy of Alby Hub, a Lightning wallet/node application with React frontend and Go backend, available in HTTP and Wails desktop modes (`README.md:5–15`; `README.md:584–586`). UI includes Bitrefill through iframe and receives a payment-intent event, opening confirmation and using local API. This concrete connection differs from NWC connections with other wallets/apps and internal pages compiled into the same bundle.

Classification remains under review for two boundaries: accepting iframe integration with an external service as frontend-unit composition, and treatment of a host inherited entirely from a third-party product. Original authorship is not presumed from owner name or recorded commit author.

ID and SHA checked in `data/samples/mfe-sample-001/clones.csv:123`, status `cloned`; HEAD matches front-matter commit. All clone Git commands used `GIT_NO_LAZY_FETCH=1`. Read-only inspection, without installation, code execution, network or access to alternative-branch content.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:123` records rank 122, strategy `broader` and eligibility `pass`; manifest points to round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). Candidate appears in `data/discovery/mfe-round-001/candidates.csv:19753`, with eligibility `unknown`, and `data/discovery/mfe-round-002/candidates.csv:19759`, with `pass`.

Both record description **“Forked from https://github.com/getAlby/hub.git”**, empty topics, TypeScript language, Apache-2.0 license, `fork: false`, creation at 2025-10-10T09:18:07Z and push at 2025-10-27T19:22:09Z. Technical indicator `fork: false` neither invalidates origin declaration nor proves original authorship.

`sqlite3 -readonly` queries of tables `hits`, `queries` and `subqueries` in `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, by ID 1073549332, show one hit in each round:

- Query `broader-micro-apps`, strategy `broader`, text **`"micro apps" frontend in:name,description,readme`**: space-separated plural phrase accompanied by `frontend`.
- Subquery `broader-micro-apps#created:2025-Q4`.
- Effective query `"micro apps" frontend in:name,description,readme pushed:>=2025-04-01 created:2025-10-01..2025-12-31`.
- Collections: 2026-10-07T23:49:15.211Z in round 001 and 2026-10-08T16:26:55.548Z in round 002; empty `path`, without matched field/line.

By elimination, name and description lack searched phrase and no topics exist. `README.md:604` contains exactly **“micro apps”**, referring to apps connected to Hub through NIP-47; `README.md:57` and `README.md:584–586` contain **“Frontend”/“frontend”**. These are observed compatible lines, not API-reported locations. README was last changed in reachable commit `8b1aacd26b957b217c8fa9b0b2c554083798b68e`, from 2025-09-04T11:53:22+07:00, so it predates October 2026 searches and creation of this repository itself. No text added after searches was considered. Candidate name is not MFE evidence.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` at the SHA: 629 regular files `100644`, zero symlinks and zero gitlinks. One frontend manifest (`frontend/package.json`), one Vite config, Go backend, documentation and Wails configuration exist. No second local frontend project, submodule or versioned `node_modules`. Counted external target is referenced by iframe implementation, not inferred from folder names or dependencies. | context |
| Source code (host) | `frontend/index.html:12–14` loads `src/main.tsx`; `frontend/src/main.tsx:1–17` mounts `App` in one React root. `frontend/src/App.tsx:10–19` chooses HTTP or desktop router using the same routes list. These modes are variants of the same target, not two units. | moderate |
| Source code (routing) | `frontend/src/routes.tsx:36` imports Bitrefill and `frontend/src/routes.tsx:338–341` associates component with path `bitrefill`. `frontend/src/screens/internal-apps/Bitrefill.tsx:84–96` renders iframe for `https://embed.bitrefill.com/`, with Lightning payment parameters. There is a concrete reference to a UI deployed at another origin. | strong |
| Source code (iframe contract) | `frontend/src/screens/internal-apps/Bitrefill.tsx:24–47` registers `message` listener, checks origin `https://embed.bitrefill.com`, decodes JSON and handles event `payment_intent` with `paymentAddress`, opening payment dialog and constructing Invoice. This is not merely a map, video or documentary link. | strong |
| Source code (functional integration) | `frontend/src/screens/internal-apps/Bitrefill.tsx:49–81` forwards payment to local API and handles result; `frontend/src/screens/internal-apps/Bitrefill.tsx:98–129` offers confirmation/cancellation in host UI. This connects external-UI action to local flow. Remote code and actual event emission are absent from this snapshot. | strong |
| Configuration / Build/deploy | `frontend/package.json:6–12` defines HTTP and Wails builds, both using TypeScript/Vite and copying platform adapters. `wails.json:5–8` calls the same frontend scripts. `frontend/vite.config.ts:1–13` configures React SWC, Tailwind, paths and PWA; `frontend/vite.config.ts:68–87` configures aliases/build/base. Local screens have no second own entry/build. | moderate |
| Configuration (resolution) | Config imports match packages declared in `frontend/package.json:93–114`. Lock resolves Vite 5.4.19 (`frontend/yarn.lock:6162–6164`), React SWC 3.11.0 (`frontend/yarn.lock:2638–2640`), Tailwind Vite 4.1.11 (`frontend/yarn.lock:2405–2407`), PWA 0.20.5 (`frontend/yarn.lock:6142–6144`) and paths 4.3.2 (`frontend/yarn.lock:6153–6155`). Configuration and packages are statically identifiable; installation/build was not run and execution success is not asserted. | moderate |
| Source code (boundaries) | Active literal search for `../../` and `../../../` in all TS/TSX/JS under `frontend` returns only `frontend/src/screens/apps/NewApp.tsx:44–45`: both paths resolve to components within `frontend/src/components`. They do not cross an application boundary. Bitrefill is consumed through iframe URL, not source import. Absence of other occurrences does not turn local screens into independent units. | context |
| Technology / Composition (searches) | Search across entire `frontend` tree and README for `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage`, `iframe`, `customElements`, `import.?map` and `micro.?frontend` identifies Bitrefill integration and NWC flow, without MF/single-spa/qiankun/wujie/import-map or custom-element configuration. Iframe/messages were analyzed through their consumer, not considered alone. | context |
| Source code / Documentation (other postMessage) | `frontend/src/screens/apps/NewApp.tsx:263–289` emits `nwc:success` to window opening authorization and may redirect to `returnTo`; `README.md:352–355` documents flow. This authorizes an NWC client connection; it does not itself identify another frontend unit mounted in Hub. It was not added to count. | context |
| Documentation / History (origin) | `go.mod:1` identifies `github.com/getAlby/hub`; `wails.json:9–15` retains Alby author/company; `README.md:5–8` identifies Alby Hub. These artifacts corroborate upstream-copy description and prevent presuming owner of this clone created architecture. | context |

## Authorship and history

Metadata from `git rev-list`: **2.923 commits, 467 merges and 1 root commit**, root `2e63fcf4830ebf9994d35340a77507b39420c46a`, from 2023-03-21T18:01:09+01:00, message `open-source`. Non-shallow clone. Evaluated SHA has author and committer `jwbqfck95434TaraWong`, date 2025-10-12T10:09:27+08:00, message `Regular update`.

`git shortlog -sn` attributes all 2.923 commits to the same identity. Many commits predate this repository’s creation, and discovery metadata declare copying `getAlby/hub`. Thus recorded identity proves neither original code nor composition authorship; no mechanism producing this history is asserted and no external verification is performed.

`git log --no-renames --name-status` was queried for `frontend`, `frontend/src/screens/internal-apps` and `frontend/platform_specific`: respectively 1.113, 44 and 9 commit-history entries in those path queries. Frontend appears since `09a4438` (2023-12-14); Bitrefill is added in `1873fb9` (2025-03-18, `feat: bitrefill (#1195)`) and modified in `7a5be8b`, `bf8394f` and `e56f3a3` during August 2025. These events predate clone creation on GitHub and record inherited lineage, without proving local owner contribution to integration. Historical blobs were not read; no missing object was found.

Local references, for record only: `master`, `origin/master` and `origin/HEAD` point to pinned SHA. Ten other remote refs `origin/dependabot/...` exist for Go/npm updates, without content inspection. Classification incorporates none of these branches. Inventory identifies no ADR/architecture/design file; architectural documentation read is in README, including Frontend section (`README.md:584–586`).

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Local React host and external Bitrefill UI explicitly referenced by iframe implementation (`frontend/src/main.tsx:1–17`; `frontend/src/screens/internal-apps/Bitrefill.tsx:91–96`). Acceptance of this pair as units of the phenomenon, given inherited origin and third-party service, is review decision. |
| Q2 | Yes | Host has its own entry/build (`frontend/index.html:12–14`; `frontend/package.json:6–12`); Bitrefill target is deployed at separate origin and consumed through URL, without direct source import (`frontend/src/screens/internal-apps/Bitrefill.tsx:91–96`). Both deep relative-import occurrences stay within same local target. |
| Q3 | Yes | Bitrefill route mounts iframe in host layout and payment-intent event triggers local dialog/API (`frontend/src/routes.tsx:338–341`; `frontend/src/screens/internal-apps/Bitrefill.tsx:24–47` and `frontend/src/screens/internal-apps/Bitrefill.tsx:49–81`). |
| Q4 | No | Iframe integrates `embed.bitrefill.com`, an external payment service, and its messaging contract does not turn service into a Hub frontend unit. |
| Q5 | No | Architecture and integration were inherited from `getAlby/hub`; this candidate is a declared copy of upstream product. |

## Rationale

- Rule `Non-MFE` applies: iframe integrates an external payment service and architecture comes from declared upstream copy, not candidate MFE composition.
- `frontend_units: 2` records complete host adopted by repository and external UI explicitly referenced by composition. It counts neither Bitrefill as local own source nor every upstream library/file as unit. Acceptance of these targets in phenomenon remains open, as in distinction between complete distribution and vendored code discussed in 102/074/080. `0` or `null` is not used to hide two identifiable applications; eventual external-service exclusion would reduce count to one local target.
- `unit_organization: multi-repo` describes relationship with external UI; HTTP and Wails use same application and do not increase count. `repo_type: production` describes deployable wallet product, not fork originality.
- React and Vite are demonstrated by entry, explicit configuration and lockfile. `next-themes` is a utility dependency and does not demonstrate a Next application. PWA and Go APIs are also not other frontend units.
- Textual finding “micro apps” in `README.md:604` concerns NWC clients connecting to Hub, not demonstrated UI decomposition. Bitrefill integration was discovered and verified in sources independently of that selection signal.

## Analysis notes

- **Protocol (family):** annotation search for `Alby`, `Bitrefill`, `getAlby` and `jwbqfck` found no previously annotated sibling. Origin `getAlby/hub` is declared in metadata and code namespaces; it was not inferred only from candidate name.
- **Checklist:** 031, still `review`, has iframe with explicit contract; 121 is also under review for iframe sufficiency, but has a simpler URL/route contract. Here a payment-intent event has checked origin and local functional consequence. This is stronger than map embed in 119, without automatically resolving methodological decision.
- **Protocol (third parties):** 102/074 discuss distribution/inherited platform host; 080 distinguishes vendored source from own target. Final rule of 037 concerns unit whose sole host is a third-party platform; here complete host is in candidate and embeds external service, a situation not automatically equivalent to a plugin or declared original merely for source presence.
- **RQ1:** history attributed to a single author predates repository creation and contradicts a naive authorship reading based on `git log`. Upstream architectural credit is not transferred to owner.

## Point for joint review

- **Iframe and external service:** decide whether Bitrefill UI, with its own origin, event `payment_intent`, `paymentAddress` and host payment flow, counts as composed frontend unit or service/widget integration. If it counts, evidence supports Q4=Yes; otherwise Q1/Q4/Q5 may become No, `frontend_units` become 1 and class become `Non-MFE`. No general rule is proposed for every iframe or payment service.
- **Inherited host:** description declares copying `getAlby/hub`, and artifacts retain Alby identity. Decide whether adoption of complete product counts as candidate architectural instance, even without demonstrated local composition contribution, or should be excluded as third-party code. If iframe is accepted but host origin remains open, Q4 may be Yes and Q5 remain Undetermined, with explicit divergence justification. If both are accepted, alternative is `MFE-implemented`; if origin determines exclusion, record `Non-MFE` rationale without presuming `fork: false` proves authorship.

### Analyst–reviewer disagreement (for joint review)

Independent reviewer (Prisma) agrees with facts and citations but disagrees on class: proposes Non-MFE with Q1 No, `frontend_units: 1`, `single-unit`, `approaches: []`, on two independent grounds. Draft was retained as Uncertain/`review` because both depend on researcher criterion.

- **Ground A (third-party service iframe):** iframe points to `embed.bitrefill.com` with affiliate `ref` and `utm_source=alby_hub` (`frontend/src/screens/internal-apps/Bitrefill.tsx:94`); host merely pays received Lightning invoice. This would be same pattern as Stripe Elements in 110 and Google Maps in 119 (third-party service is not own unit). These precedents are still `draft`, and open decision in `docs/mfe-classification-checklist.md:72` (iframe as mechanism) is unresolved. Bitrefill coexists in `internal-apps/` with screens of the same bundle.
- **Ground B (inherited host):** `go.mod:1` is `github.com/getAlby/hub`, repository description is "Forked from getAlby/hub" and entire upstream history, including Bitrefill integration (`1873fb9`, 2025-03-18, upstream PR #1195), predates clone creation (2025-10-10). Single authorship in 2.923 commits is compatible with authorship rewriting; mechanism is not asserted. This redistributes a third-party product, a topic still open (074, 080, 102).
- **Recorded alternative:** if researcher accepts A or B, class becomes Non-MFE (Q1 No, `frontend_units: 1`, `single-unit`, `approaches: []`). Reviewer suggests deciding 122 alongside 110 and 119 (third-party widgets), rather than 121, 078 and 031 (iframe between own targets), to avoid mixing criteria; ground B is independent of iframe rule.
