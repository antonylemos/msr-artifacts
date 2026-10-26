# Running the Module Federation App

This is a monorepo with multiple microfrontends using Module Federation. All remote apps must be running before the shell (host) app can load them.

## Quick Start

### Option 1: Run All Apps Together (Recommended)

From the root directory:

```bash
pnpm dev
```

This will start all microfrontends simultaneously using Turbo.

### Option 2: Run Apps Individually

If you need to run apps separately, open multiple terminals:

**Terminal 1 - Auth Microfrontend (Port 3001):**
```bash
cd apps/auth-mf
pnpm dev
```

**Terminal 2 - Dashboard Microfrontend (Port 3002):**
```bash
cd apps/dashboard-mf
pnpm dev
```

**Terminal 3 - Admin Microfrontend (Port 3003):**
```bash
cd apps/admin-mf
pnpm dev
```

**Terminal 4 - Messaging Microfrontend (Port 3004):**
```bash
cd apps/messaging-mf
pnpm dev
```

**Terminal 5 - Shell (Host) App (Port 3000):**
```bash
cd apps/shell
pnpm dev
```

## Port Configuration

- **Shell (Host):** http://localhost:3000
- **Auth MF:** http://localhost:3001
- **Dashboard MF:** http://localhost:3002
- **Admin MF:** http://localhost:3003
- **Messaging MF:** http://localhost:3004

## Troubleshooting

### Error: "Failed to fetch dynamically imported module"

This error occurs when a remote microfrontend is not running. Solutions:

1. **Make sure all apps are running** - Use `pnpm dev` from the root to start all apps
2. **Check the ports** - Ensure no other applications are using ports 3000-3004
3. **Wait for all apps to build** - The first build can take a moment; wait until you see "ready" messages
4. **Clear browser cache** - Sometimes cached module entries cause issues

### Error Boundaries

The shell app now includes error boundaries that will show a friendly message if a remote module fails to load. You can click "Retry" once the remote app is running.

### Module Not Loading After Starting

If a module still doesn't load after starting:

1. Refresh the browser (Ctrl+R or Cmd+R)
2. Clear browser cache and hard reload (Ctrl+Shift+R or Cmd+Shift+R)
3. Check the browser console for specific errors
4. Verify the remote app is accessible at its URL (e.g., http://localhost:3001/assets/remoteEntry.js)

## Development Workflow

1. Start all apps with `pnpm dev` from the root
2. Navigate to http://localhost:3000
3. Use the navigation links to access different microfrontends
4. Changes in any app will hot-reload automatically

## Building for Production

```bash
pnpm build
```

This will build all apps in the correct order using Turbo's dependency graph.
