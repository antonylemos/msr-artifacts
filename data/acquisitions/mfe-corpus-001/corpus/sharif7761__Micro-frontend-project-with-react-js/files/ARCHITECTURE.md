# 🏛️ Architecture Overview

## System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      Browser                            │
│                 http://localhost:3000                   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              CORE SIMPLE (Shell App)                    │
│                    Port: 3000                           │
│  ┌────────────────────────────────────────────────┐    │
│  │  • React Router                                │    │
│  │  • Navigation                                  │    │
│  │  • Lazy Loading of Micro Frontends            │    │
│  │  • Module Federation Host                     │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
            │                           │
            │                           │
    ┌───────┘                           └─────────┐
    ▼                                             ▼
┌──────────────────────┐           ┌──────────────────────┐
│  COMMON SIMPLE       │           │  USERS SIMPLE        │
│  Port: 3001          │◄──────────│  Port: 3002          │
│                      │           │                      │
│ • Button Component   │           │ • User List          │
│ • Card Component     │           │ • API Integration    │
│                      │           │                      │
│ Exposes:             │           │ Exposes:             │
│ - Button             │           │ - UserList           │
│ - Card               │           │                      │
│                      │           │ Consumes:            │
│                      │           │ - common/Button      │
│                      │           │ - common/Card        │
└──────────────────────┘           └──────────────────────┘
```

## Module Federation Flow

### 1. Application Initialization

```
User opens http://localhost:3000
         │
         ▼
┌────────────────────┐
│   core_simple      │  Loads first
│   (Shell)          │
└────────────────────┘
         │
         ├─► Registering remotes
         │   ├─► common_simple@http://localhost:3001/remoteEntry.js
         │   └─► users_simple@http://localhost:3002/remoteEntry.js
         │
         └─► Rendering App with Router
```

### 2. Component Loading Flow

```
User clicks "Users" link
         │
         ▼
┌────────────────────────────────┐
│  Router in core_simple         │
│  Route: /users                 │
└────────────────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│  Lazy load UserList            │
│  from users_simple:3002        │
└────────────────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│  users_simple loads its deps   │
│  - Imports Button from common  │
│  - Imports Card from common    │
└────────────────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│  Fetch from JSONPlaceholder    │
│  https://jsonplaceholder       │
│       .typicode.com/users      │
└────────────────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│  Render UserList with          │
│  Button & Card components      │
└────────────────────────────────┘
```

## Data Flow

```
┌──────────────┐
│  User Action │
└──────────────┘
       │
       ▼
┌────────────────────────────┐
│  Browser Event             │
│  (onClick, etc)            │
└────────────────────────────┘
       │
       ▼
┌────────────────────────────┐
│  React Component           │
│  (Button, Card, etc)       │
└────────────────────────────┘
       │
       ▼
┌────────────────────────────┐
│  API Call (if needed)      │
│  JSONPlaceholder API       │
└────────────────────────────┘
       │
       ▼
┌────────────────────────────┐
│  State Update              │
│  (useState)                │
└────────────────────────────┘
       │
       ▼
┌────────────────────────────┐
│  Re-render                 │
└────────────────────────────┘
```

## Component Dependency Graph

```
core_simple
    ├─► common_simple/Button
    ├─► common_simple/Card
    └─► users_simple/UserList
            ├─► common_simple/Button
            └─► common_simple/Card
```

## Technology Stack

### Build & Module Federation
- **Rsbuild** - Fast build tool based on Rspack
- **@module-federation/rsbuild-plugin** - Module Federation v2 support
- **@rsbuild/plugin-react** - React support for Rsbuild

### Runtime
- **React 18** - UI library
- **React Router v7** - Client-side routing (in core_simple)
- **TypeScript** - Type safety

### External API
- **JSONPlaceholder** - Free fake REST API for testing

## Key Concepts

### 1. Remote Modules
Each micro frontend exposes modules via Module Federation:
- Exposed at runtime via `remoteEntry.js`
- Can be consumed by other apps
- Loaded on-demand

### 2. Shared Dependencies
Common dependencies are shared between apps:
- `react` and `react-dom` are singletons
- Only loaded once across all micro frontends
- Prevents version conflicts

### 3. Lazy Loading
Micro frontends are lazy loaded:
- Not loaded until needed
- Reduces initial bundle size
- Improves performance

### 4. Independent Development
Each micro frontend:
- Can run independently
- Has its own dev server
- Can be deployed separately

## File Structure

```
simple-microfrontend/
│
├── package.json                 # Root scripts for convenience
│
├── common_simple/               # Shared components
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.tsx      # Reusable button
│   │   │   └── Card.tsx        # Reusable card
│   │   ├── App.tsx             # Demo app
│   │   └── index.tsx           # Entry point
│   ├── rsbuild.config.ts       # Module Federation config
│   ├── tsconfig.json
│   └── package.json
│
├── users_simple/                # User management MFE
│   ├── src/
│   │   ├── App.tsx             # User list component
│   │   └── index.tsx           # Entry point
│   ├── rsbuild.config.ts       # Module Federation config
│   ├── tsconfig.json
│   └── package.json
│
└── core_simple/                 # Shell application
    ├── src/
    │   ├── App.tsx             # Main app with routing
    │   └── index.tsx           # Entry point
    ├── rsbuild.config.ts       # Module Federation config
    ├── tsconfig.json
    └── package.json
```

## Development Workflow

1. **Start common_simple** (Port 3001)
   - Makes Button and Card available for remote consumption

2. **Start users_simple** (Port 3002)
   - Consumes common_simple components
   - Exposes UserList component

3. **Start core_simple** (Port 3000)
   - Consumes all remote modules
   - Provides navigation and routing

## Runtime Module Loading

When `core_simple` imports a remote module:

```typescript
// This triggers runtime module loading
const UserList = lazy(() => import('users_simple/UserList'));
```

Behind the scenes:
1. Rsbuild loads `remoteEntry.js` from `http://localhost:3002`
2. Fetches the UserList module
3. UserList imports from `common_simple`
4. Rsbuild checks if common components are already loaded (singleton)
5. Renders the component

## Performance Considerations

- **Code Splitting:** Each micro frontend is a separate bundle
- **Lazy Loading:** Micro frontends loaded only when needed
- **Shared Dependencies:** React loaded once, shared across all apps
- **Parallel Loading:** Multiple remotes can load in parallel

## Benefits of This Architecture

1. **Independent Development:** Teams can work on separate micro frontends
2. **Independent Deployment:** Deploy each app separately
3. **Technology Agnostic:** Each app can use different versions (carefully)
4. **Scalability:** Easy to add new micro frontends
5. **Maintainability:** Clear separation of concerns

## Limitations

1. **Complexity:** More complex than a monolith
2. **Network Overhead:** Multiple requests for remote modules
3. **Shared State:** Requires careful management across boundaries
4. **Version Management:** Dependency versions must be compatible
5. **Error Handling:** Failures in one MFE can affect others
