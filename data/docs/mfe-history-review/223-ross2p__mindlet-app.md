---
schema: 1
id: 1091389540
full_name: ross2p/mindlet-app
commit: 868bf9c81af85085a6befc5921bea6c01211228d
inputs:
  clone: data/samples/mfe-sample-001/repos/ross2p__mindlet-app
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 223 — ross2p/mindlet-app

## Repository overview

History up to snapshot has 45 commits, from 2026-01-29 to 2026-09-22, with 5 merges. First five (`9a1af72`, 2026-01-29, "feat: initialize main app with Next.js, Tailwind CSS, and authentication features", through `97f87ab`, 2026-02-15) maintain a single Next.js application in `apps/main/`, with submodule `libs/types`. Milestone for current structure is `404dce1` (2026-05-03, "feat: micro-frontends — submodules, nginx compose, @ross2p/shared"): it removes remainder of `apps/main/` and creates submodules `apps/auth`, `apps/dashboard`, `apps/decks`, `apps/profile`, `apps/study` and `libs/shared`, `README.md`, `compose.yml` and `infra/nginx/nginx.conf` and `infra/nginx/proxy.conf`. Superproject subsequently changes little beyond submodule pointers: `4128490` (2026-05-03) moves nginx configuration to `config/nginx/`; `2581f29` (2026-05-23) changes `compose.yml` and recreates `infra/nginx/`; `4f2dbca` (2026-05-23) and `e98db1d` (2026-08-17, "chore: bump frontend submodules and split the local compose/nginx stack.") change `compose.yml` again; `b1c17af` (2026-09-19) creates `infra/nginx/nginx.conf.local` and `start-local-dev.sh`. Other commits merge or update submodule pointers, except `77a6cf8` and `91bfed2`, changing README, and `4bfaf75`, creating `.gitignore`.

Clone reveals messages, dates, files created, changed or removed and, through `ls-tree`, object identifiers of each version. Old version contents of `compose.yml`, `README.md` and `infra/nginx/nginx.conf` are unavailable locally (`cat-file` fails with missing objects). Zone contents are never in this history: they are submodules, and superproject records only pointed-to commit. A `log --name-status` without `--no-renames` failed with missing object (rename detection needs contents) and was repeated with `--no-renames`.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Nginx configurations differ on zone prefix: compose-mounted configuration removes prefix, other two preserve it | 3.4.7 #3 | conflicting stages | 404dce1 2026-05-03 feat: micro-frontends — submodules, nginx compose, @ross2p/shared; 4128490 2026-05-03 chore: remove nginx configuration and proxy settings; 2581f29 2026-05-23 chore: bump submodules, refresh compose, and add nginx infra; e98db1d 2026-08-17 chore: bump frontend submodules and split the local compose/nginx stack.; b1c17af 2026-09-19 chore: sync local changes and update submodule pointers | clarified |
| 2 | README describes compose as `node:20-alpine` images with `npm run dev` and repository mounted, but compose builds each zone through submodule Dockerfile | 3.4.7 #7, 3.4.7 #9 | conflicting stages | 404dce1 2026-05-03 feat: micro-frontends — submodules, nginx compose, @ross2p/shared; 77a6cf8 2026-05-03 docs: npm publish instructions for @ross2p/shared; 2581f29 2026-05-23 chore: bump submodules, refresh compose, and add nginx infra; 4f2dbca 2026-05-23 chore: include API compose stack and bump frontend submodules; e98db1d 2026-08-17 chore: bump frontend submodules and split the local compose/nginx stack.; 91bfed2 2026-08-29 chore: point the auth zone at mindlet-app-auth. | inconclusive |

## Observations

**1. Nginx configurations differ on zone prefix.** In snapshot, `infra/nginx/nginx.conf`, file mounted by compose (compose.yml:115), forwards `/dashboard/` with `proxy_pass http://mindlet_dashboard/;` (infra/nginx/nginx.conf:36-37), removing prefix; `config/nginx/nginx.conf` (config/nginx/nginx.conf:38-39) and `infra/nginx/nginx.conf.local` (infra/nginx/nginx.conf.local:38-39) preserve it. History shows three files date from different moments. The `config/nginx/nginx.conf` has same object (`fd6ada3`) as `infra/nginx/nginx.conf` had in `404dce1`; `4128490`, whose message announces nginx configuration removal, creates `config/nginx/nginx.conf` and `config/nginx/proxy.conf` and removes both from `infra/nginx/`, and `config/nginx/proxy.conf` also retains object of `proxy.conf` at `404dce1` (`b7cafd2`). Neither changed afterward. Thus `config/nginx/nginx.conf` is unchanged gateway of first multi-zone version, and build and deploy review read it as "earlier version" (3.4.6, Overview). Mounted `infra/nginx/nginx.conf` was recreated in `2581f29` and changed in `e98db1d`, providing snapshot object (`4ad409d`). The `infra/nginx/nginx.conf.local` appears only in `b1c17af`, after last mounted-file adjustment. History does not show intermediate version contents, because object at `2581f29` (`892202f`) is unavailable; it also does not show when trailing slash in `proxy_pass` arrived, or zone `basePath`, residing in submodules. Conclusion limited to these files: prefix-preserving configuration in `config/nginx/` is intact remnant of first stage (`404dce1`), not mounted; mounted version comes from later stage (`2581f29`/`e98db1d`); local variant is latest (`b1c17af`). Whether prefix removal contradicts `basePath` remains unanswered here.

**2. README describes compose differently.** README.md:37 says each service runs `npm install` and `npm run dev` in `node:20-alpine` with repository mounted at `/workspace`; snapshot compose builds each zone with `build.context: apps/<zona>` and `dockerfile: Dockerfile` (compose.yml:16-18), without zone volumes. History shows README and compose originated together in `404dce1` and compose changed three times after last commit changing README before `91bfed2`: `77a6cf8` gave README object `e190e0e`, unchanged in `2581f29`, `4f2dbca` and `e98db1d`, while `compose.yml` moves from `a1e76dd` to `202315f`, `a2d42fe` and `2bda15d` (snapshot object since `e98db1d`). Message of `2581f29` announces compose "refresh", and `e98db1d` announces separation of local compose and nginx stack; `91bfed2`, only subsequent commit changing README, announces only auth zone repository replacement. This is consistent with README sentence describing earlier compose, but old `compose.yml` and `README.md` objects are unavailable locally: whether compose at `404dce1` used `node:20-alpine` with volume, or README.md:37 already existed in `404dce1`, cannot be seen. What each zone Dockerfile executes also resides in submodules. Conclusion: inconclusive; contradiction may be an earlier stage remnant, but available history does not show contents confirming it.

## Commands

```
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app rev-list --count 868bf9c81af85085a6befc5921bea6c01211228d
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app log --reverse --format='%h %ad %s' --date=short --name-status 868bf9c81af85085a6befc5921bea6c01211228d   # failed with missing object (rename detection), after first entry
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app log --reverse --format='%h %ad %s' --date=short --name-status --no-renames 868bf9c81af85085a6befc5921bea6c01211228d
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 404dce1 -- compose.yml README.md infra/nginx/nginx.conf config/nginx/nginx.conf infra/nginx/nginx.conf.local
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 2581f29 -- compose.yml README.md infra/nginx/nginx.conf config/nginx/nginx.conf infra/nginx/nginx.conf.local
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 4f2dbca -- compose.yml README.md infra/nginx/nginx.conf config/nginx/nginx.conf infra/nginx/nginx.conf.local
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree e98db1d -- compose.yml README.md infra/nginx/nginx.conf config/nginx/nginx.conf infra/nginx/nginx.conf.local
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 868bf9c81af85085a6befc5921bea6c01211228d -- compose.yml README.md infra/nginx/nginx.conf config/nginx/nginx.conf infra/nginx/nginx.conf.local
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app log --format='%h %ad %s' --date=short --no-renames 868bf9c81af85085a6befc5921bea6c01211228d -- README.md compose.yml infra/nginx/nginx.conf config/nginx/nginx.conf infra/nginx/nginx.conf.local
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app cat-file -t a1e76dd76ec48cf94aacb3a2b074129740582931   # failed: missing object
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app cat-file -t 202315f9604c909a19eb9a3624039554c8af655a   # failed: missing object
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app cat-file -t a2d42febfac0431aa0905aa968c7eef6556d79ab   # failed: missing object
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app cat-file -t 0dfbd9f3686df16fb64ac290b1e5776ab567a08a   # failed: missing object
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app cat-file -t e190e0e5c28dab469d7751ee71de4bb8c89bffe0   # failed: missing object
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app cat-file -t 892202f224da65da3d365ddc5269535b6edd074d   # failed: missing object
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 404dce1 -- infra/nginx/proxy.conf config/nginx/proxy.conf config/nginx/nginx.conf
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 4128490 -- infra/nginx/proxy.conf config/nginx/proxy.conf config/nginx/nginx.conf
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 2581f29 -- infra/nginx/proxy.conf config/nginx/proxy.conf config/nginx/nginx.conf
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 868bf9c81af85085a6befc5921bea6c01211228d -- infra/nginx/proxy.conf config/nginx/proxy.conf config/nginx/nginx.conf
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app log --format='%h %ad %s' --date=short --no-renames --diff-filter=D --name-only 868bf9c81af85085a6befc5921bea6c01211228d -- apps/main
docs/mfe-history-review/tools/hist.sh ross2p__mindlet-app ls-tree 868bf9c81af85085a6befc5921bea6c01211228d -- apps/main
```

## Summary

Commits up to the snapshot: 45 (2026-01-29 to 2026-09-22). Points: 2 (clarified: 1, inconclusive: 1, resolved by the snapshot: 0).
