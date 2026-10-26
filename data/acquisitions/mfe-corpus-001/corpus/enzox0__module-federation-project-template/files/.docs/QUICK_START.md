# Quick Start Guide

## First Time Setup

```bash
# Install dependencies
pnpm install

# Check if ports are available
pnpm check-ports

# Start all apps
pnpm dev
```

## Daily Development

```bash
# Start everything
pnpm dev

# Open browser
http://localhost:3000
```

## Common Issues

### "Failed to fetch dynamically imported module"
**Cause:** A remote microfrontend isn't running  
**Fix:** Make sure all apps are running with `pnpm dev`

### Port Already in Use
**Check:** Run `pnpm check-ports`  
**Fix:** Stop the conflicting process or change the port in `vite.config.ts`

### Module Not Loading After Starting
**Fix:** 
1. Check the Remote Status indicator (bottom-right corner)
2. Click "Retry" on the error message
3. Hard refresh browser (Ctrl+Shift+R)

## Port Reference

| App | Port | URL |
|-----|------|-----|
| Shell (Host) | 3000 | http://localhost:3000 |
| Auth MF | 3001 | http://localhost:3001 |
| Dashboard MF | 3002 | http://localhost:3002 |
| Admin MF | 3003 | http://localhost:3003 |
| Messaging MF | 3004 | http://localhost:3004 |

## Useful Commands

```bash
# Check port availability
pnpm check-ports

# Start all apps
pnpm dev

# Build all apps
pnpm build

# Lint all apps
pnpm lint

# Format code
pnpm format

# Clean build artifacts
pnpm clean
```

## Features

✅ **Error Boundaries** - Graceful error handling  
✅ **Remote Health Check** - Real-time status monitoring  
✅ **Auto Retry** - Click retry when remotes become available  
✅ **Port Checker** - Verify ports before starting  

## Need More Help?

- Detailed guide: [RUNNING.md](./RUNNING.md)
- Technical details: [FIXES_APPLIED.md](./FIXES_APPLIED.md)
- Full documentation: [README.md](./README.md)
