# Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### Step 1: Install Dependencies

```bash
cd h:\pro work\simple-microfrontend
npm run install:all
```

This will install dependencies for all three apps.

### Step 2: Start Applications (in order)

Open **3 separate terminals** and run:

#### Terminal 1 - Common Simple
```bash
cd h:\pro work\simple-microfrontend\common_simple
npm run dev
```

Wait until you see:
```
> Local:    http://localhost:3001
```

#### Terminal 2 - Users Simple
```bash
cd h:\pro work\simple-microfrontend\users_simple
npm run dev
```

Wait until you see:
```
> Local:    http://localhost:3002
```

#### Terminal 3 - Core Simple
```bash
cd h:\pro work\simple-microfrontend\core_simple
npm run dev
```

Wait until you see:
```
> Local:    http://localhost:3000
```

### Step 3: Open Browser

Navigate to: **http://localhost:3000**

You should see the Core Simple app with:
- A navigation bar
- A home page
- A "Users" link to see the user list from JSONPlaceholder API

## 🎯 What to Explore

1. **Home Page** - Shows project overview using Card component from common_simple
2. **Users Page** - Shows user list from JSONPlaceholder API using Button and Card from common_simple
3. **Individual Apps:**
   - http://localhost:3001 - See shared components in isolation
   - http://localhost:3002 - See users app running independently

## 🔍 Understanding the Flow

1. **common_simple** provides Button and Card components
2. **users_simple** uses those components and fetches users from API
3. **core_simple** brings everything together with routing

## 📁 Key Files to Review

### Module Federation Configurations
- [common_simple/rsbuild.config.ts](h:\pro work\simple-microfrontend\common_simple\rsbuild.config.ts)
- [users_simple/rsbuild.config.ts](h:\pro work\simple-microfrontend\users_simple\rsbuild.config.ts)
- [core_simple/rsbuild.config.ts](h:\pro work\simple-microfrontend\core_simple\rsbuild.config.ts)

### Components
- [common_simple/src/components/Button.tsx](h:\pro work\simple-microfrontend\common_simple\src\components\Button.tsx)
- [common_simple/src/components/Card.tsx](h:\pro work\simple-microfrontend\common_simple\src\components\Card.tsx)
- [users_simple/src/App.tsx](h:\pro work\simple-microfrontend\users_simple\src\App.tsx)
- [core_simple/src/App.tsx](h:\pro work\simple-microfrontend\core_simple\src\App.tsx)

## 🛠️ Troubleshooting

### "Failed to fetch remote entry"
- Make sure all apps are running
- Start them in order: common_simple → users_simple → core_simple

### "Port already in use"
- Change port in respective `rsbuild.config.ts` file
- Update remote URLs in other configs accordingly

### Modules not found
```bash
cd <app-directory>
npm install
```

## 💡 Next Experiments

Try these to learn more:

1. **Modify Button Component**
   - Edit `common_simple/src/components/Button.tsx`
   - See changes reflect in both users_simple and core_simple

2. **Add a New Component**
   - Create `common_simple/src/components/Input.tsx`
   - Expose it in `common_simple/rsbuild.config.ts`
   - Use it in users_simple

3. **Change API Endpoint**
   - In `users_simple/src/App.tsx`, change the API to `/posts`
   - See different data from JSONPlaceholder

4. **Add Routing**
   - Add a new route in `core_simple/src/App.tsx`
   - Create a new page component

## 📚 Documentation

- [README.md](h:\pro work\simple-microfrontend\README.md) - Full documentation
- [ARCHITECTURE.md](h:\pro work\simple-microfrontend\ARCHITECTURE.md) - Architecture details
