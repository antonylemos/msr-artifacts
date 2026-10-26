---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
inputs:
  clone: data/samples/mfe-sample-001/repos/lmedhub__zephyr-microfrontends
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 324 — lmedhub/zephyr-microfrontends

## Repository overview

History up to snapshot has 16 commits, from 2025-05-26 to 2025-06-04, of which 5 are pull request merges (`51414d3`, `5d3cba4`, `b860c50`, `7e4bc22` and snapshot itself `c6e6a9f`). First, `35e664c` (2025-05-26, "Initial commit"), creates only `README.md`. Second, `87ab32c` (2025-05-26, "zephyr config"), creates single application at root: `package.json`, `rspack.config.ts`, `module-federation.config.ts`, `index.html`, `tsconfig.json` and `src/`. The `dc92890` (2025-05-27, "integration done") removes `module-federation.config.ts`, `rspack.config.ts` and `src/` from root and creates `apps/host`, `apps/remote-header` and `apps/remote-footer`, each with `package.json` and `rspack.config.ts`; this is observable introduction of three applications and federation among them. The `8dc93d9` (2025-05-27, "package json changes") and `a9f8005` (2025-05-27, "deleted files") change root `package.json`, and latter also removes application `tsconfig.json` files. The `8b5da15` (2025-06-02, "golang monorepo config") moves everything to `frontend/` and creates Go backend: `frontend/package.json` at this commit is same object (`364ec6b`) as root `package.json` in `a9f8005`, meaning moved unchanged. The `a9a4033` (2025-06-04, "url shortener implemented") creates `frontend/apps/url-shortener`, and `be7d3bc` (2025-06-04, "vue app functional") replaces its React files with Vue, creates host `VueShortener.tsx` and changes `frontend/package.json` for last time (object `1223d14` matches snapshot). Following commits touch only backend.

Clone lacks old manifest and configuration contents: `show` of `package.json`, `rspack.config.ts` and `module-federation.config.ts` at `87ab32c`, root `package.json` in `a9f8005`, `frontend/package.json` in `8b5da15` and `a9a4033` and host `package.json` and `rspack.config.ts` in `dc92890` fails with missing objects. Visible evidence consists of messages, dates, created, changed and removed paths and object identifiers of each version.

Of previous reviews, 3.4.2 has one unused dependency, `@module-federation/enhanced`, becoming point 1. 3.4.3 has no `Undetermined` unit, 3.4.4 has no inactive, commented-out or `Undetermined` construct, 3.4.5 has no `Undetermined` relationship, 3.4.6 has no `Undetermined` deploy and 3.4.7 has no `contradicted` or `partial` claim.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@module-federation/enhanced` is declared in `frontend/package.json` without import or require, and four applications use Rspack `ModuleFederationPlugin` | 3.4.2 (frontend/package.json:59) | dependency use | 87ab32c 2025-05-26 zephyr config; dc92890 2025-05-27 integration done; a9f8005 2025-05-27 deleted files; 8b5da15 2025-06-02 golang monorepo config; be7d3bc 2025-06-04 vue app functional | inconclusive |

## Observations

**1. `@module-federation/enhanced` declared and unused.** History shows manifest lineage: snapshot `frontend/package.json` descends from root `package.json` created in `87ab32c`, when repository was single application with root `module-federation.config.ts`; this file was removed in `dc92890`, when applications moved to `apps/` with a `rspack.config.ts` each. Manifest changed in `8dc93d9` and `a9f8005`, moved unchanged to `frontend/` in `8b5da15` and changed afterward in `a9a4033` and `be7d3bc`, last version before snapshot. History does not show which version introduced dependency into manifest or whether root `module-federation.config.ts` or first application configurations imported it, because these objects are unavailable. Knowing a federation configuration was removed alone does not prove it used package. Conclusion: inconclusive; dependency remains `No`.

## Commands

```sh
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends rev-list --count c6e6a9f7d59a3b422002af26c57617d6c486a532
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends log --merges --format=%h c6e6a9f7d59a3b422002af26c57617d6c486a532
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends log --format='%h %ad %s' --date=short c6e6a9f7d59a3b422002af26c57617d6c486a532
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends log --name-status --no-renames --format='@@ %h %ad %s' --date=short c6e6a9f7d59a3b422002af26c57617d6c486a532
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show 87ab32c:package.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show 87ab32c:module-federation.config.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show 87ab32c:rspack.config.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree 87ab32c -- package.json module-federation.config.ts rspack.config.ts
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends log --format='%h %ad %s' --date=short c6e6a9f7d59a3b422002af26c57617d6c486a532 -- package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends log --format='%h %ad %s' --date=short c6e6a9f7d59a3b422002af26c57617d6c486a532 -- frontend/package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree dc92890 -- package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree 8dc93d9 -- package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree a9f8005 -- package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree 8b5da15 -- frontend/package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree a9a4033 -- frontend/package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree be7d3bc -- frontend/package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends ls-tree c6e6a9f7d59a3b422002af26c57617d6c486a532 -- frontend/package.json
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show 8b5da15:frontend/package.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show a9a4033:frontend/package.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show a9f8005:package.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show dc92890:apps/host/rspack.config.ts   # failed: missing object
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show dc92890:apps/host/package.json   # failed: missing object
docs/mfe-history-review/tools/hist.sh lmedhub__zephyr-microfrontends show 87ab32c:src/index.ts
```

## Summary

Commits up to the snapshot: 16 (2025-05-26 to 2025-06-04). Points: 1 (clarified: 0, inconclusive: 1, resolved by the snapshot: 0).
