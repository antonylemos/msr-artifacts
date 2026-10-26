---
schema: 1
id: 1239974847
full_name: tserom/k-project
url: https://github.com/tserom/k-project
commit: d185434a0251651028b02445c78ea27e6feb3f71
classification: Uncertain
checklist: { q1: undetermined, q2: yes, q3: undetermined, q4: undetermined, q5: undetermined }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: null
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 038 — tserom/k-project

## Context

Workspace meta-repository: documentation, Docker orchestration and gateway. It physically brings together several independent repositories (`README.md:3`), but `apps/` and `vendor/` directories are **explicitly ignored** (`.gitignore`: "根仓库只跟踪工作区元文件；各应用在各自目录内单独 git" [English translation: "The root repository tracks only workspace meta-files; each application has its own Git repository in its directory"]). No app code (host, sub-apps, backend) is in the repository.

The **declared** approach is wujie (无界 [English translation of the name: "boundless"], iframe/Web Components-based micro-frontend) with a `wujie-react` host, but it is not observable here. The default branch is `cursor/workspace-meta-docs`.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Only docs (`docs/*.md`), `infra/docker/docker-compose.yml`, `infra/gateway/*` (nginx), scripts and agent files (`.cursor/`, `.claude/`, `openspec/`); `/apps/` and `/vendor/` in `.gitignore`. No frontend unit in the repository. | absent |
| Documentation | `README.md:9-15`: `apps/host` (父应用 [English translation: "parent application"], wujie host, React 17 + Vite + `wujie-react`), `apps/user-front` and `apps/hello-front` (子应用 [English translation: "child applications"], sub-apps), `apps/user-backend` (Go); `docs/MICROFRONTEND.md:3-20`: host/sub-app roles, `/micro/hello/` and `/micro/user/` entries, shared token in `localStorage` | moderate |
| Build/deploy | `infra/docker/docker-compose.yml:63-84`: services `inventory-front`, `hello-front`, `user-front` and `host`, each with `build.context: ../../apps/<app>` (directories absent from the repository); separate units by reference | moderate |
| Configuration (gateway) | `infra/gateway/nginx.docker.conf:42-78`: `location /micro/hello/`, `/micro/user/`, `/micro/inventory/` → sub-app upstreams; `location /` → host upstream (same origin, `k-project.com`). Same-origin routing, not composition itself. | ambiguous |
| Composition | The declared mechanism (wujie in `apps/host`) is not observable: host code is not tracked here | absent |
| History | `main` (`525adb1`) also has only meta-files (docs, `.cursor/`, `Makefile`) | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Undetermined | Host and sub-apps are referenced by compose and the gateway, but not by wujie's composition configuration, which is in the absent host |
| Q2 | Yes | External units with their own build and service (`docker-compose.yml:63-84`) |
| Q3 | Undetermined | The host mounting the sub-apps is referenced but not observable |
| Q4 | Undetermined | wujie declared in documentation; no composition configuration or code in the repository |
| Q5 | Undetermined | Documentation and infrastructure are consistent with a real MFE, but the mechanism is not observable |

## Rationale

- No answer is No, but Q1, Q3 and Q4 are Undetermined, leading to **Uncertain**.
- It is not MFE-unit: the repository contains no frontend units, only orchestration and documentation for a system whose code is in other repositories.
- Additional inspection does not resolve the uncertainty within the repository because code is external by explicit decision (`.gitignore`). Under the protocol, the case must remain Uncertain and be excluded.

## Analysis notes

- **Protocol (multi-repository ecosystem):** a clear distributed MFE case (protocol section 5.1) whose meta-repository describes the architecture without containing the units.
- **RQ2:** wujie (无界 [English translation of the name: "boundless"]) is an approach not initially envisaged (common in the Chinese ecosystem, alongside qiankun in repository 029).

## Recorded decision

Retain **Uncertain**. The repository documents a Wujie architecture and the infrastructure serving it, but explicitly excludes applications and vendor from the tracked tree. Without host or sub-application code, composition is not verifiable in this snapshot.
