# Microfrontend Learning Project

**Live Demo → [https://microfrontend-beta.vercel.app](https://microfrontend-beta.vercel.app)**

A hands-on example showing how to build a **Microfrontend architecture** with
**Webpack 5 Module Federation**. Six independent apps — one host shell and five
child apps (React, Vue, Angular, and two external apps) — all stitched together
at runtime in a single browser window.

---

## Table of Contents

1. [What Is a Microfrontend?](#1-what-is-a-microfrontend)
2. [How This Project Was Built](#2-how-this-project-was-built)
3. [Project Structure](#3-project-structure)
4. [The Host App — Purpose & Internals](#4-the-host-app--purpose--internals)
5. [How Module Federation Works](#5-how-module-federation-works)
6. [Routing in the Host](#6-routing-in-the-host)
7. [App Port Map](#7-app-port-map)
8. [Setup & Running](#8-setup--running)
9. [How to Add a New Page / Route](#9-how-to-add-a-new-page--route)
10. [Key Files to Study](#10-key-files-to-study)
11. [Live Deployment on Vercel](#11-live-deployment-on-vercel)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. What Is a Microfrontend?

A **microfrontend** splits a large frontend into smaller, independently
deployable apps ("MFEs"). Each MFE:

- Is owned by one team.
- Uses its own framework (React, Vue, Angular, etc.).
- Runs standalone on its own port.
- Is deployed on its own schedule without touching other apps.

A **host / shell app** ties them all together in one browser page at runtime —
no server-side stitching needed.

```
User Browser
    │
    ▼
┌──────────────────────────────────────┐
│  Host App  (http://localhost:3005)   │
│                                      │
│  ┌──────────┐  ┌──────────────────┐  │
│  │React MFE │  │   Angular MFE    │  │
│  │(port3001)│  │   (port 4200)    │  │
│  └──────────┘  └──────────────────┘  │
│  ┌──────────┐  ┌──────────────────┐  │
│  │React MFE2│  │    Vue MFE       │  │
│  │(port3002)│  │   (port 3003)    │  │
│  └──────────┘  └──────────────────┘  │
└──────────────────────────────────────┘
```

---

## 2. How This Project Was Built

### Step 1 — Create each app independently

Each MFE was created as a standalone app:
- `react-mfe-1` and `react-mfe-2` — plain React + Babel + Webpack.
- `vue-mfe` — Vue 3 + vue-loader + Webpack.
- `angular-mfe` — Angular CLI 16 + `@angular-architects/module-federation`.
- `host` — React + Webpack (no Angular CLI needed).

### Step 2 — Add Webpack Module Federation to each MFE

Every MFE's `webpack.config.js` was given a `ModuleFederationPlugin` block
that **exposes** a `mount` function:

```js
// react-mfe-1/webpack.config.js (simplified)
new ModuleFederationPlugin({
  name: 'reactMfe1',          // global identifier
  filename: 'remoteEntry.js', // manifest the host will fetch
  exposes: {
    './mount': './src/mount.js',  // the function the host calls
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
})
```

### Step 3 — Each MFE exports a `mount(element)` function

This is the **contract** between every MFE and the host — framework-agnostic:

```js
// react-mfe-1/src/mount.js
const mount = (element) => {
  ReactDOM.createRoot(element).render(<App />);
};
export default mount;
```

```js
// vue-mfe/src/mount.js
const mount = (element) => {
  createApp(App).mount(element);
};
export default mount;
```

```ts
// angular-mfe/src/mount.ts
export default function mount(element: HTMLElement) {
  element.appendChild(document.createElement('app-root'));
  platformBrowserDynamic().bootstrapModule(AppModule);
}
```

### Step 4 — Configure the host to consume all MFEs

`host/webpack.config.js` declares the MFEs as **remotes**:

```js
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    reactMfe1:  'reactMfe1@http://localhost:3001/remoteEntry.js',
    reactMfe2:  'reactMfe2@http://localhost:3002/remoteEntry.js',
    vueMfe:     'vueMfe@http://localhost:3003/remoteEntry.js',
    angularMfe: 'angularMfe@http://localhost:4200/remoteEntry.js',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
})
```

### Step 5 — Add React Router to the host

`react-router-dom` v6 was added to the host so each MFE (and external app) gets
its own URL route. `historyApiFallback: true` in the webpack devServer ensures
deep-link refreshes still work.

### Step 6 — Add root-level orchestration

A root `package.json` uses `concurrently` to start all five apps with a single
command:

```bash
npm run start   # runs from the root of the project
```

---

## 3. Project Structure

```
microfrontend/
├── package.json          ← Root: install:all + start all apps via concurrently
│
├── host/                 ← Shell/container (React + react-router-dom)  port 3005
│   ├── webpack.config.js ← Declares MFE remotes, historyApiFallback, CORS header
│   ├── babel.config.js
│   ├── package.json
│   └── src/
│       ├── index.js      ← Entry point (deferred import to let federation boot)
│       ├── bootstrap.js  ← Renders <App /> into #root
│       └── App.jsx       ← All routes, nav header, MfeContainer, IframeView
│
├── react-mfe-1/          ← React MFE — Counter app              port 3001
│   ├── webpack.config.js ← Exposes ./mount
│   └── src/
│       ├── mount.js      ← mount(element) contract
│       └── App.jsx
│
├── react-mfe-2/          ← React MFE — User Greeting            port 3002
│   ├── webpack.config.js
│   └── src/
│       ├── mount.js
│       └── App.jsx
│
├── vue-mfe/              ← Vue 3 MFE — Theme Switcher           port 3003
│   ├── webpack.config.js
│   └── src/
│       ├── mount.js
│       └── App.vue
│
└── angular-mfe/          ← Angular 16 MFE — Fun Facts           port 4200
    ├── webpack.config.js
    └── src/
        ├── mount.ts
        └── app/
```

---

## 4. The Host App — Purpose & Internals

The host (`host/`) is the **only app the user ever visits** directly
(http://localhost:3005). It is responsible for:

| Responsibility | Where |
|---|---|
| Rendering the persistent navigation header | `App.jsx` → `<Header>` |
| Declaring which MFEs exist and their routes | `App.jsx` → `MFE_NAV` array |
| Dynamically loading an MFE when its route is visited | `App.jsx` → `<MfeContainer>` |
| Embedding external apps as iframes | `App.jsx` → `IFRAME_NAV` + `<IframeView>` |
| Telling webpack where each MFE's `remoteEntry.js` lives | `webpack.config.js` → `remotes` |
| Sharing React so it isn't loaded twice | `webpack.config.js` → `shared` |
| Allowing cross-origin requests from MFEs | `webpack.config.js` → CORS header |
| Making deep-link refreshes work | `webpack.config.js` → `historyApiFallback: true` |

### `host/src/App.jsx` — key sections

```
MFE_NAV        — array of { label, path, loader } for each MFE child app
IFRAME_NAV     — array of { label, path, url } for external apps
<Header>       — renders NavLink for every item in both arrays
<MfeContainer> — on mount, calls loader() then calls mount(containerDiv)
<IframeView>   — renders <iframe src={url}> filling the viewport
<App>          — wraps everything in <BrowserRouter> + <Routes>/<Route>
```

### `host/webpack.config.js` — key sections

```js
devServer: {
  port: 3005,
  historyApiFallback: true,   // ← allows /react-mfe-1 to work on page refresh
  headers: { 'Access-Control-Allow-Origin': '*' }, // ← allows MFE scripts to load
},

remotes: {
  reactMfe1:  'reactMfe1@http://localhost:3001/remoteEntry.js',
  // ... one entry per MFE
},

shared: {
  react:       { singleton: true },  // ← only one copy of React in the page
  'react-dom': { singleton: true },
},
```

---

## 5. How Module Federation Works

```
Browser visits http://localhost:3005/react-mfe-1
        │
        ▼
Host webpack bundle loads
        │
        ▼  (user navigates to /react-mfe-1)
MfeContainer calls: import('reactMfe1/mount')
        │
        ▼  (webpack resolves the remote at runtime)
Fetches: http://localhost:3001/remoteEntry.js
        │
        ▼
Downloads only the chunks needed for that MFE
        │
        ▼
Calls:  mount(containerDiv)
        │
        ▼
React MFE 1 renders inside the host's <div>
```

This is **lazy loading at the module level** — the MFE code is not in the host
bundle. It is fetched from the MFE's own dev server on demand.

---

## 6. Routing in the Host

The host uses `react-router-dom` v6 `BrowserRouter`. Every route stays within
`http://localhost:3005/`:

| Route | What Renders |
|---|---|
| `/` | Welcome / landing page |
| `/react-mfe-1` | React MFE 1 (Counter) |
| `/react-mfe-2` | React MFE 2 (User Greeting) |
| `/vue-mfe` | Vue MFE (Theme Switcher) |
| `/angular-mfe` | Angular MFE (Fun Facts) |
| `/route-map` | https://route-map-five.vercel.app/ in iframe |
| `/multibank` | https://multibank-1.onrender.com/ in iframe |

---

## 7. App Port Map

| App | Port | Framework |
|---|---|---|
| **Host** | **3005** | React 18 + react-router-dom |
| React MFE 1 | 3001 | React 18 |
| React MFE 2 | 3002 | React 18 |
| Vue MFE | 3003 | Vue 3 |
| Angular MFE | 4200 | Angular 16 |

---

## 8. Setup & Running

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | 18 or later |
| npm | bundled with Node.js |
| Angular CLI | 16 (for angular-mfe only) |

```bash
npm install -g @angular/cli@16
```

### Install all dependencies at once

```bash
# from the project root
npm run install:all
```

### Start all apps (recommended)

```bash
# from the project root — starts all 5 apps via concurrently
npm run start
```

Wait for all five webpack servers to print "compiled successfully", then open:

**http://localhost:3005**

### Start apps individually (for debugging)

```bash
cd react-mfe-1  && npm start   # port 3001
cd react-mfe-2  && npm start   # port 3002
cd vue-mfe      && npm start   # port 3003
cd angular-mfe  && npm start   # port 4200
cd host         && npm start   # port 3005
```

> MFEs must be started **before** you click their route in the host. If an MFE is
> not running you will see a friendly error — the host will not crash.

---

## 9. How to Add a New Page / Route

There are three scenarios — pick the one that fits.

---

### Scenario A — Add an existing external URL (iframe)

Use this when the app is already deployed somewhere (like Vercel or Render).

**Only one file to edit:** `host/src/App.jsx`

```js
// Find this array at the top of App.jsx and add your entry:
const IFRAME_NAV = [
  { label: 'Route Map', path: '/route-map', url: 'https://route-map-five.vercel.app/' },
  { label: 'Multibank', path: '/multibank', url: 'https://multibank-1.onrender.com/'  },
  // ↓ Add your new external app here
  { label: 'My New App', path: '/my-new-app', url: 'https://my-app.example.com/' },
];
```

That's it. The `<Header>`, `<IframeView>`, and `<Route>` are all generated
automatically from the array.

---

### Scenario B — Add a new local MFE (React / Vue)

#### Step 1 — Create the new MFE folder

Copy `react-mfe-1/` or `vue-mfe/` as a starting point and pick a free port:

```bash
cp -r react-mfe-1 react-mfe-3
```

#### Step 2 — Update the new MFE's `webpack.config.js`

```js
// react-mfe-3/webpack.config.js
new ModuleFederationPlugin({
  name: 'reactMfe3',        // ← unique name
  filename: 'remoteEntry.js',
  exposes: { './mount': './src/mount.js' },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
})

devServer: { port: 3004 }   // ← pick a free port
```

#### Step 3 — Register the new MFE in the host's webpack config

```js
// host/webpack.config.js → inside ModuleFederationPlugin → remotes
remotes: {
  reactMfe1:  'reactMfe1@http://localhost:3001/remoteEntry.js',
  reactMfe2:  'reactMfe2@http://localhost:3002/remoteEntry.js',
  vueMfe:     'vueMfe@http://localhost:3003/remoteEntry.js',
  angularMfe: 'angularMfe@http://localhost:4200/remoteEntry.js',
  reactMfe3:  'reactMfe3@http://localhost:3004/remoteEntry.js',  // ← add this
},
```

#### Step 4 — Add the route in `host/src/App.jsx`

```js
const MFE_NAV = [
  { label: 'React MFE 1', path: '/react-mfe-1', loader: () => import('reactMfe1/mount') },
  { label: 'React MFE 2', path: '/react-mfe-2', loader: () => import('reactMfe2/mount') },
  { label: 'Vue MFE',     path: '/vue-mfe',     loader: () => import('vueMfe/mount')    },
  { label: 'Angular MFE', path: '/angular-mfe', loader: () => import('angularMfe/mount') },
  // ↓ Add your new MFE here
  { label: 'React MFE 3', path: '/react-mfe-3', loader: () => import('reactMfe3/mount') },
];
```

#### Step 5 — Add it to the root `npm run start` script

```json
// root package.json → scripts → start
"start": "concurrently ... \"npm start --prefix react-mfe-3\""
```

#### Step 6 — Install and start

```bash
cd react-mfe-3 && npm install && npm start
# in another terminal, restart the host:
cd host && npm start
```

---

### Scenario C — Add a new Angular MFE

Same as Scenario B, but use the Angular CLI:

```bash
ng new angular-mfe-2 --routing=false --style=css
cd angular-mfe-2
ng add @angular-architects/module-federation --project angular-mfe-2 --port 4201
```

Then follow steps 3–6 from Scenario B, using port `4201` and name `angularMfe2`.

---

## 10. Key Files to Study

| File | What it teaches |
|---|---|
| `host/webpack.config.js` | How to declare MFE remotes and share dependencies |
| `host/src/App.jsx` | BrowserRouter routing, dynamic MFE loading, iframe embedding |
| `react-mfe-1/webpack.config.js` | How an MFE exposes itself via Module Federation |
| `react-mfe-1/src/mount.js` | The `mount(element)` contract for React |
| `vue-mfe/src/mount.js` | The `mount(element)` contract for Vue |
| `angular-mfe/src/mount.ts` | The `mount(element)` contract for Angular |
| `root/package.json` | Using `concurrently` to orchestrate multiple dev servers |

---

## 11. Live Deployment on Vercel

### Hosted URL

**[https://microfrontend-beta.vercel.app](https://microfrontend-beta.vercel.app)**

### Live Routes

| Route | What you see |
|---|---|
| [/](https://microfrontend-beta.vercel.app/) | Welcome / landing page |
| [/react-mfe-1](https://microfrontend-beta.vercel.app/react-mfe-1) | React MFE 1 — Counter app |
| [/react-mfe-2](https://microfrontend-beta.vercel.app/react-mfe-2) | React MFE 2 — User Greeting |
| [/vue-mfe](https://microfrontend-beta.vercel.app/vue-mfe) | Vue MFE — Theme Switcher |
| [/angular-mfe](https://microfrontend-beta.vercel.app/angular-mfe) | Angular MFE — Fun Facts |
| [/route-map](https://microfrontend-beta.vercel.app/route-map) | External: Route Map app (iframe) |
| [/multibank](https://microfrontend-beta.vercel.app/multibank) | External: Multibank app (iframe) |

### How It Is Deployed

All five apps are built into a **single `dist/` folder** and deployed as one
Vercel project. The build pipeline (in `package.json → build:all`) is:

```
1. npm run build  inside react-mfe-1  → react-mfe-1/dist/
2. npm run build  inside react-mfe-2  → react-mfe-2/dist/
3. npm run build  inside vue-mfe      → vue-mfe/dist/
4. npm run build  inside angular-mfe  → angular-mfe/dist/angular-mfe/
5. npm run build  inside host         → host/dist/
6. copy:dist merges everything into one dist/:

dist/
  index.html          ← host shell
  *.js                ← host chunks
  react-mfe-1/
    remoteEntry.js    ← fetched at /react-mfe-1/remoteEntry.js
  react-mfe-2/
    remoteEntry.js
  vue-mfe/
    remoteEntry.js
  angular-mfe/
    remoteEntry.js
```

The host's `webpack.config.js` uses **relative URLs** in production so no
environment variables are needed:

```js
// host/webpack.config.js
remotes: isProd
  ? {
      reactMfe1:  'reactMfe1@/react-mfe-1/remoteEntry.js',
      reactMfe2:  'reactMfe2@/react-mfe-2/remoteEntry.js',
      vueMfe:     'vueMfe@/vue-mfe/remoteEntry.js',
      angularMfe: 'angularMfe@/angular-mfe/remoteEntry.js',
    }
  : { /* localhost ports for local dev */ }
```

Each MFE webpack config also sets `publicPath: 'auto'` so JavaScript chunks
load from the correct subdirectory path at runtime.

### Deploying Your Own Fork

1. Push your fork to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo.
3. Leave **Root Directory** as `/` (the root `vercel.json` handles everything).
4. Click **Deploy** — no environment variables required.

---

## 12. Troubleshooting

**MFE not loading in the host?**
- Confirm that MFE is running on its correct port (see table in §7).
- Open DevTools → Console for the exact error message.
- Hard-refresh the host: `Ctrl + Shift + R`.

**Port already in use?**
```bash
lsof -i :3001       # find process on that port
kill -9 <PID>       # free the port
```

**Angular MFE fails to start?**
```bash
ng version          # confirm Angular CLI 16 is installed
rm -rf node_modules && npm install
```

**Webpack version mismatch?**
- Each folder has its own `node_modules`. Run `npm install` inside each folder.

**External iframe app not showing?**
- Some sites block embedding via `X-Frame-Options` or `Content-Security-Policy`.
  This is a restriction set by the external site — it cannot be bypassed from
  the host. In that case, open the URL in a new tab instead.

