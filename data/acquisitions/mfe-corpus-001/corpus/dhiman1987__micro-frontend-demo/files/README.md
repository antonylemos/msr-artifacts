# 🧩 micro-frontend-demo

A modular microfrontend playground with 3 independently deployed apps:

- `app1` – Vanilla JS component
- `app2` – Another Vanilla JS component
- `app3` – A React component wrapped in Shadow DOM
- `app-shell` – The main UI that brings it all together, styled and responsive

```bash
micro-frontend-demo/
├── app-shell/
│   ├── index.html           # Hosts all microfrontends
│   └── style.css            # Updated from shell.css → style.css
├── app1/
│   ├── index.html           # Standalone entry point for app1
│   └── app.js               # Vanilla JS custom element
├── app2/
│   ├── index.html           # Standalone entry point for app2
│   └── app.js               # Another vanilla JS component
├── app3/
│   ├── dist/
│   │   └── my-counter-app.iife.js  # Self-contained React bundle
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── MyCounterElement.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md (optional)
└── README.md                # Root readme for project instructions

```

Each app runs on its own port and is dropped into the shell via `<script>` and custom elements, simulating real-world frontend autonomy.

## ⚡ Prerequisite

This demo uses [`http-server`](https://www.npmjs.com/package/http-server) to serve static assets locally:

```bash
npm install -g http-server
```

## ▶️ Quick Start (open each in a separate terminal)
1. 🧼 App Shell (port 3000)
```bash
cd app-shell
http-server -p 3000 --cors
```

2. 🔸 App 1: Vanilla Component (port 3001)
```bash
cd app1
http-server -p 3001 --cors
```

3. 🔹 App 2: Vanilla Component (port 3002)
```bash
cd app2
http-server -p 3002 --cors
```

4. 🔳 App 3: React + Shadow DOM (port 3003)
```bash
cd app3
npm install
npm run build
http-server -p 3003 --cors
```

Then visit: http://localhost:3000

## 🛠 CORS Troubleshooting

If your browser blocks scripts due to CORS policies:

- Make sure you're using --cors with http-server
- Try refreshing in incognito/private mode to avoid cache issues
- Ensure browser extensions like ad blockers aren’t interfering
- Some browsers may require you to access all ports via localhost, not IP

## ✨ Features

- Shadow DOM–scoped React component with injected CSS
- Responsive layout using Flexbox with max-height constraints
- Light gray emoji background for subtle texture
- Plug-and-play architecture with zero global style bleed

## 💡 Use Case

Ideal for learning, prototyping, or showcasing microfrontend architecture without any tooling overhead.