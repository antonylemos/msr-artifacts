# Simple Micro Frontend Project

A minimal micro frontend architecture to understand Module Federation structure.

## 📁 Project Structure

```
simple-microfrontend/
├── common_simple/    # Shared component library (Port 3001)
├── core_simple/      # Shell application (Port 3000)
├── users_simple/     # User management micro frontend (Port 3002)
└── package.json      # Root package.json with scripts
```

## 🏗️ Architecture Overview

### 1. **common_simple** (Port 3001)
Shared component library that exposes:
- **Button** - A reusable button component with primary/secondary variants
- **Card** - A card component for displaying content

**Exposes:**
- `./Button` → `./src/components/Button.tsx`
- `./Card` → `./src/components/Card.tsx`

### 2. **users_simple** (Port 3002)
User management micro frontend that:
- Displays a list of users from JSONPlaceholder API
- Uses Button and Card components from common_simple
- Can run independently or be consumed by core_simple

**Exposes:**
- `./UserList` → `./src/App.tsx`

**Consumes:**
- `common_simple/Button`
- `common_simple/Card`

### 3. **core_simple** (Port 3000)
Shell application that:
- Provides routing and navigation
- Lazy loads micro frontends
- Orchestrates the entire application

**Consumes:**
- `common_simple/Button`
- `common_simple/Card`
- `users_simple/UserList`

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm

### Installation

```bash
# Navigate to project root
cd simple-microfrontend

# Install all dependencies
npm run install:all
```

Or install individually:

```bash
# Common UI
cd common_simple && npm install

# Users UI
cd ../users_simple && npm install

# Core UI
cd ../core_simple && npm install
```

### Development

**IMPORTANT:** Start applications in this order (in separate terminals):

```bash
# Terminal 1 - Start common_simple first (Port 3001)
cd common_simple
npm run dev

# Terminal 2 - Start users_simple (Port 3002)
cd users_simple
npm run dev

# Terminal 3 - Start core_simple (Port 3000)
cd core_simple
npm run dev
```

### Access the Application

- **Core Simple (Main App):** http://localhost:3000
- **Common Simple:** http://localhost:3001
- **Users Simple:** http://localhost:3002

## 🔍 Understanding Module Federation

### How It Works

1. **common_simple** exposes Button and Card components via Module Federation
2. **users_simple** imports components from common_simple and exposes UserList
3. **core_simple** imports components from both and provides routing

### Key Configuration Files

#### rsbuild.config.ts

Each app has a configuration file:

```typescript
pluginModuleFederation({
  name: 'app_name',           // Unique name
  filename: 'remoteEntry.js', // Entry point
  exposes: {                  // What this app shares
    './Component': './src/Component.tsx'
  },
  remotes: {                  // What this app consumes
    remote_app: 'remote_app@http://localhost:port/remoteEntry.js'
  },
  shared: {                   // Shared dependencies
    react: { singleton: true }
  }
})
```

## 📚 Learning Path

1. Start with **common_simple** to see how components are exposed
2. Explore **users_simple** to understand remote consumption
3. Study **core_simple** to see how shell apps orchestrate everything

## 🛠️ Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Rsbuild** - Build tool
- **Module Federation** - Micro frontend architecture
- **React Router** - Routing in core_simple
- **JSONPlaceholder** - Free fake API for user data

## 📝 Notes

- Each micro frontend can run independently
- Shared dependencies (React, React-DOM) are loaded only once
- The shell app (core_simple) lazy loads micro frontends for better performance
- Components from common_simple are eagerly loaded for better performance

## 🚧 Common Issues

### Port Already in Use
If ports 3000, 3001, or 3002 are in use, modify the port in respective `rsbuild.config.ts` files.

### Remote Load Error
Make sure all apps are running. The shell app (core_simple) needs other apps to be running first.

### Module Not Found
Run `npm install` in each directory individually if `npm run install:all` fails.

## 🎯 Next Steps

To extend this project:
1. Add more components to common_simple
2. Create additional micro frontends (e.g., posts_simple, todos_simple)
3. Add state management (Zustand, Redux)
4. Add authentication
5. Implement error boundaries
6. Add testing

## 📖 Further Reading

- [Module Federation Documentation](https://module-federation.io/)
- [Rsbuild Documentation](https://rsbuild.dev/)
- [Micro Frontend Architecture](https://micro-frontends.org/)
