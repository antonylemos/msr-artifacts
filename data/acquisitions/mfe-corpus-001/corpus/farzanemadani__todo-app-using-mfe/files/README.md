# Todo App Using Micro Frontends

A small React micro-frontend project built with Webpack Module Federation.

This repository splits a todo application into three separate apps:

- `host-app`: the shell application and router
- `todoForm-app`: the remote responsible for adding and editing tasks
- `todoList-app`: the remote responsible for listing and deleting tasks

The apps communicate through Module Federation and share todo data through `localStorage`.

## Features

- Micro-frontend architecture with a host and two remotes
- Lazy-loaded remote modules using `React.lazy` and `Suspense`
- Add, edit, list, and delete todo items
- Client-side routing with `react-router-dom`
- Toast notifications with `react-hot-toast`
- Separate development and production webpack configs for each app

## Tech Stack

- React 19
- Webpack 5
- Module Federation
- Babel
- CSS
- `react-router-dom`
- `react-hot-toast`

## Project Structure

```text
.
├── host-app
├── todoForm-app
└── todoList-app
```

## How It Works

The `host-app` runs on port `3000` and loads two remote applications:

- `todoForm_app` from `http://localhost:3001/remoteEntry.js`
- `todoList_app` from `http://localhost:3002/remoteEntry.js`

Routes in the host:

- `/`: shows the todo list remote
- `/add`: opens the add-task form remote
- `/edit/:id`: opens the edit-task form remote

Todo data is stored in the browser using `localStorage` under the key `todos`.

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install dependencies

Install dependencies inside each app:

```bash
cd host-app && npm install
cd ../todoForm-app && npm install
cd ../todoList-app && npm install
```

### Run locally

Start each app in a separate terminal:

```bash
cd host-app && npm start
```

```bash
cd todoForm-app && npm start
```

```bash
cd todoList-app && npm start
```

Then open:

```text
http://localhost:3000
```

### Build for production

Build each app separately:

```bash
cd host-app && npm run build
cd ../todoForm-app && npm run build
cd ../todoList-app && npm run build
```

Production bundles are generated in each app's `build/` directory.

## Ports

- `host-app`: `3000`
- `todoForm-app`: `3001`
- `todoList-app`: `3002`

## Module Federation Setup

### Host remotes

- `todoForm_app/TodoForm`
- `todoList_app/todoList`

### Exposed modules

- `todoForm-app` exposes `./TodoForm`
- `todoList-app` exposes `./todoList`

## Notes

- There is no root `package.json`, so dependencies are installed per app.
- The production config in `host-app` currently points to remotes on `localhost`, so deployment would need updated remote URLs.
- Todo data is browser-local only and is not backed by an API or database.