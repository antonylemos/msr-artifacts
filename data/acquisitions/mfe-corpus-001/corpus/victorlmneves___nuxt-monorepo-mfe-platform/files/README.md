# MFE Platform

Micro-frontend monorepo supporting **Vue 2 + Vuetify 2** and **Vue 3 + Vuetify 3** remotes side-by-side, orchestrated by a **Nuxt 3 shell**.

Built on top of [nuxt-mf-monorepo](https://github.com/victorlmneves/nuxt-mf-monorepo) with Webpack Module Federation, Turborepo and pnpm workspaces.

---

## Architecture

```
mfe-platform/
├── apps/
│   ├── shell/                  ← Nuxt 3 host (port 3000)
│   │   ├── pages/
│   │   │   ├── login.vue       ← Login page (plug in your auth service)
│   │   │   ├── index.vue       ← Homepage / MFE selector grid
│   │   │   └── app/[...mfe].vue ← Dynamic MFE container
│   │   ├── components/
│   │   │   └── ShellHeader.vue ← Shared header (only shared UI element)
│   │   ├── composables/
│   │   │   └── useMfeLoader.ts ← Dynamic remote loader
│   │   └── stores/auth.ts      ← Pinia auth store
│   │
│   ├── mfe-vue2-checkout/      ← Vue 2 + Vuetify 2 (port 3001)
│   ├── mfe-vue2-admin/         ← Vue 2 + Vuetify 2 (port 3002)
│   ├── mfe-vue3-profile/       ← Vue 3 + Vuetify 3 (port 3003)
│   └── mfe-vue3-dashboard/     ← Vue 3 + Vuetify 3 (port 3004)
│
└── packages/
    └── shared/                 ← @mfe/shared: types, auth bus, MFE registry
        └── src/
            ├── types/          ← UserState, MfeDescriptor, RemoteMount
            ├── auth/           ← CustomEvent auth bus (framework-agnostic)
            └── registry.ts     ← List of all MFEs shown on the homepage
```

---

## How it works

### Framework isolation

Each Vue 2 remote is a **plain Webpack 5 app** — no Nuxt. This is necessary because Nuxt 3 only supports Vue 3. Each remote brings its own isolated Vue 2 + Vuetify 2 instance via Module Federation's `singleton` scope, completely isolated from the shell's Vue 3.

Vue 3 remotes are also standalone Webpack apps (simpler than Nuxt for remotes) and share Vue 3 with the shell via MF's singleton scope.

### The only shared thing: the header

`ShellHeader.vue` lives in the shell and is rendered by every page. Remotes do **not** render their own header — the shell injects it above the remote's mount point. Remotes only receive `user` and `onLogout` as props.

### Auth state sharing

Auth state crosses framework boundaries via a **framework-agnostic CustomEvent bus** in `packages/shared/src/auth`:

- Shell logs in → calls `broadcastLogin(user)` → stores user in `sessionStorage` + fires `mfe:auth-changed`
- Each remote subscribes to `mfe:auth-changed` on mount and updates its internal user ref
- On logout, shell fires `mfe:auth-logout` → remotes unmount themselves

### Remote mount contract

Every remote must export `{ mount(el, props), unmount(el) }` from its `bootstrap.js`. This is the `RemoteMount` interface defined in `@mfe/shared`. The shell's `useMfeLoader` composable calls this interface — it never knows whether it's talking to a Vue 2 or Vue 3 app.

---

## Getting started

### Prerequisites

- Node.js 20+
- pnpm 9+ (`npm i -g pnpm`)

### Install

```bash
pnpm install
```

### Development (all apps)

```bash
pnpm dev:local
# or
bash scripts/start-local.sh
```

Individual apps:

```bash
pnpm dev:shell      # shell only
pnpm dev:checkout   # Vue 2 checkout
pnpm dev:admin      # Vue 2 admin
pnpm dev:profile    # Vue 3 profile
pnpm dev:dashboard  # Vue 3 dashboard
```

Open http://localhost:3000 and log in with any email + password.

### Build

```bash
pnpm build:all
```

---

## Adding a new MFE

1. Copy `apps/mfe-vue3-profile` (for Vue 3) or `apps/mfe-vue2-checkout` (for Vue 2).
2. Update `name`, `port`, and `remoteName` in `package.json` and `webpack.config.js`.
3. Implement your app in `src/App.vue`.
4. Add an entry to `packages/shared/src/registry.ts`.
5. Add `dev:mymfe` and `build:mymfe` scripts to the root `package.json`.

---

## Connecting a real auth service

Replace the body of `auth.login()` in `apps/shell/stores/auth.ts`:

```ts
// Example: replace mock with a real call
const response = await $fetch('https://your-auth-api.com/login', {
  method: 'POST',
  body: { email, password },
})
this.setUser({
  id: response.userId,
  name: response.displayName,
  email,
  token: response.accessToken,
  roles: response.roles,
})
```

---

## Port map

| App               | Port | Framework          |
|-------------------|------|--------------------|
| shell             | 3000 | Nuxt 3 / Vue 3     |
| mfe-vue2-checkout | 3001 | Vue 2 + Vuetify 2  |
| mfe-vue2-admin    | 3002 | Vue 2 + Vuetify 2  |
| mfe-vue3-profile  | 3003 | Vue 3 + Vuetify 3  |
| mfe-vue3-dashboard| 3004 | Vue 3 + Vuetify 3  |
