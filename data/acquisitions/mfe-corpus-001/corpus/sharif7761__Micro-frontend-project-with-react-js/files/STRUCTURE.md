# 📦 Project Structure

## Complete File Tree

```
simple-microfrontend/
│
├── 📄 package.json                      # Root package with convenience scripts
├── 📄 README.md                         # Main documentation
├── 📄 ARCHITECTURE.md                   # Architecture deep dive
├── 📄 QUICK_START.md                    # 5-minute setup guide
├── 📄 .gitignore                        # Git ignore rules
│
├── 📁 common_simple/                    # Shared Component Library (Port 3001)
│   ├── 📄 package.json
│   ├── 📄 README.md
│   ├── 📄 rsbuild.config.ts            # Module Federation: exposes Button, Card
│   ├── 📄 tsconfig.json
│   ├── 📁 public/
│   │   └── 📄 index.html
│   └── 📁 src/
│       ├── 📄 index.tsx                # Entry point
│       ├── 📄 App.tsx                  # Demo app
│       └── 📁 components/
│           ├── 📄 Button.tsx           # ⭐ Exposed component
│           └── 📄 Card.tsx             # ⭐ Exposed component
│
├── 📁 users_simple/                     # User Management MFE (Port 3002)
│   ├── 📄 package.json
│   ├── 📄 README.md
│   ├── 📄 rsbuild.config.ts            # Module Federation: exposes UserList, consumes common
│   ├── 📄 tsconfig.json
│   ├── 📁 public/
│   │   └── 📄 index.html
│   └── 📁 src/
│       ├── 📄 index.tsx                # Entry point
│       └── 📄 App.tsx                  # ⭐ Exposed as UserList (uses Button, Card)
│
└── 📁 core_simple/                      # Shell Application (Port 3000)
    ├── 📄 package.json
    ├── 📄 README.md
    ├── 📄 rsbuild.config.ts            # Module Federation: consumes all remotes
    ├── 📄 tsconfig.json
    ├── 📁 public/
    │   └── 📄 index.html
    └── 📁 src/
        ├── 📄 index.tsx                # Entry point
        └── 📄 App.tsx                  # Main app with routing (uses all remotes)
```

## Module Federation Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                    common_simple (Port 3001)                │
│                                                             │
│  Exposes:                                                   │
│    • common_simple/Button                                   │
│    • common_simple/Card                                     │
│                                                             │
│  Files: 2 components                                        │
└─────────────────────────────────────────────────────────────┘
                    ▲                           ▲
                    │                           │
        ┌───────────┘                           └──────────────┐
        │                                                      │
        │                                                      │
┌───────────────────────────┐         ┌──────────────────────────────┐
│ users_simple (Port 3002)  │         │  core_simple (Port 3000)     │
│                           │         │                              │
│  Consumes:                │         │  Consumes:                   │
│    • common_simple/Button │         │    • common_simple/Button    │
│    • common_simple/Card   │         │    • common_simple/Card      │
│                           │         │    • users_simple/UserList   │
│  Exposes:                 │         │                              │
│    • users_simple/UserList│◄────────┤  Features:                   │
│                           │         │    • React Router            │
│  Features:                │         │    • Lazy loading            │
│    • JSONPlaceholder API  │         │    • Navigation              │
│    • User list display    │         │                              │
└───────────────────────────┘         └──────────────────────────────┘
```

## Component Count

| App            | Components | Exposes | Consumes | Lines of Code (approx) |
|----------------|------------|---------|----------|------------------------|
| common_simple  | 2          | 2       | 0        | ~100                   |
| users_simple   | 1          | 1       | 2        | ~80                    |
| core_simple    | 1          | 0       | 3        | ~100                   |
| **Total**      | **4**      | **3**   | **5**    | **~280**               |

## Technology Stack

| Technology          | Version | Purpose                        |
|---------------------|---------|--------------------------------|
| React               | 18.3.1  | UI library                     |
| TypeScript          | 5.7.3   | Type safety                    |
| Rsbuild             | 1.2.17  | Build tool                     |
| Module Federation   | 0.8.12  | Micro frontend architecture    |
| React Router        | 7.1.5   | Routing (core only)            |
| JSONPlaceholder API | -       | Free fake REST API             |

## Ports

| Application   | Port | URL                       |
|--------------|------|---------------------------|
| core_simple  | 3000 | http://localhost:3000     |
| common_simple| 3001 | http://localhost:3001     |
| users_simple | 3002 | http://localhost:3002     |

## Key Configuration Files

### common_simple/rsbuild.config.ts
```typescript
exposes: {
  './Button': './src/components/Button.tsx',
  './Card': './src/components/Card.tsx',
}
```

### users_simple/rsbuild.config.ts
```typescript
exposes: {
  './UserList': './src/App.tsx',
},
remotes: {
  common_simple: 'common_simple@http://localhost:3001/remoteEntry.js',
}
```

### core_simple/rsbuild.config.ts
```typescript
remotes: {
  common_simple: 'common_simple@http://localhost:3001/remoteEntry.js',
  users_simple: 'users_simple@http://localhost:3002/remoteEntry.js',
}
```

## Build Output Structure

After running `npm run build:all`, each app produces:

```
<app-name>/
└── dist/
    ├── index.html
    ├── remoteEntry.js          # Module Federation entry point
    ├── static/
    │   ├── js/
    │   │   ├── async/          # Lazy loaded chunks
    │   │   └── *.js            # Main bundles
    │   └── css/                # Styles (if any)
    └── ...
```

## Startup Sequence

1. **Start common_simple** (Port 3001)
   ```bash
   cd common_simple && npm run dev
   ```
   ⏱️ Wait until ready (~10-20 seconds)

2. **Start users_simple** (Port 3002)
   ```bash
   cd users_simple && npm run dev
   ```
   ⏱️ Wait until ready (~10-20 seconds)

3. **Start core_simple** (Port 3000)
   ```bash
   cd core_simple && npm run dev
   ```
   ⏱️ Wait until ready (~10-20 seconds)

4. **Open browser**: http://localhost:3000

## API Integration

### JSONPlaceholder API
- **URL**: https://jsonplaceholder.typicode.com
- **Endpoint Used**: `/users`
- **Response**: Array of 10 user objects
- **Fields Used**: `id`, `name`, `email`, `phone`

## Learning Objectives

After exploring this project, you should understand:

✅ How Module Federation works  
✅ How to expose components from one app  
✅ How to consume remote components  
✅ How to set up a shell application  
✅ How to lazy load micro frontends  
✅ How to share dependencies (React)  
✅ How micro frontends can run independently  
✅ How routing works in a shell app  
✅ How to integrate external APIs  

## Next Steps

1. ✏️ Modify an existing component
2. ➕ Add a new component to common_simple
3. 🔧 Create a new micro frontend (e.g., posts_simple)
4. 🎨 Add styling (CSS modules, styled-components)
5. 📊 Add state management (Zustand, Redux)
6. 🔐 Add authentication
7. 🧪 Add testing (Jest, React Testing Library)
8. 🚀 Deploy to production

## Documentation Files

| File               | Purpose                                    |
|--------------------|--------------------------------------------|
| README.md          | Main documentation and overview            |
| ARCHITECTURE.md    | Deep dive into architecture and data flow  |
| QUICK_START.md     | 5-minute getting started guide             |
| STRUCTURE.md       | This file - visual project structure       |
| common_simple/README.md | Common library documentation          |
| users_simple/README.md  | Users MFE documentation               |
| core_simple/README.md   | Shell app documentation               |

## Comparison with Original Project

| Feature                  | Original (Complex)  | Simple Version      |
|--------------------------|---------------------|---------------------|
| Number of apps           | 3                   | 3                   |
| Components in common     | 20+                 | 2                   |
| Micro frontends          | 1 (client)          | 1 (users)           |
| Dependencies             | Many (MUI, etc)     | Minimal             |
| State management         | Zustand             | None (useState)     |
| API integration          | Custom backend      | JSONPlaceholder     |
| Authentication           | Azure MSAL          | None                |
| Styling                  | MUI + Emotion       | Inline styles       |
| Testing                  | Jest + RTL          | None (can be added) |
| Lines of code            | ~5000+              | ~280                |
| Complexity               | Production ready    | Learning focused    |

---

**🎯 This simplified project is designed purely for learning the micro frontend architecture!**
