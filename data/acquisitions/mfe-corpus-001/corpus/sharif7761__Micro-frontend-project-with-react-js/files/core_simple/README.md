# Core Simple - Shell Application

Port: **3000**

## Purpose

This is the shell application that orchestrates all micro frontends. It provides:
- Main navigation
- Routing between different micro frontends
- Lazy loading of remote modules

## Features

- **Home Page** - Overview of the project
- **Users Page** - Lazy loaded from users_simple micro frontend
- **Navigation Bar** - Links between pages
- Uses Button and Card components from common_simple

## Module Federation Configuration

**Consumes:**
```typescript
remotes: {
  common_simple: 'common_simple@http://localhost:3001/remoteEntry.js',
  users_simple: 'users_simple@http://localhost:3002/remoteEntry.js',
}
```

## Running the App

```bash
npm run dev
```

**Prerequisites:** Make sure these are running first:
1. common_simple (port 3001)
2. users_simple (port 3002)

Visit: http://localhost:3000

## Routes

- `/` - Home page with project overview
- `/users` - User list (lazy loaded from users_simple)

## Architecture

```
Browser
  ↓
core_simple (routing)
  ↓
  ├─→ common_simple/Button
  ├─→ common_simple/Card
  └─→ users_simple/UserList
        ├─→ common_simple/Button
        └─→ common_simple/Card
```

## Development

This is the main entry point for the application. Start this last after starting the other two apps.

## Adding New Micro Frontends

1. Add the remote to `rsbuild.config.ts`
2. Import and lazy load the component
3. Add a route in `App.tsx`
