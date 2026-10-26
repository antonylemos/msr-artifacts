# Insurance Platform Architecture Documentation

## Overview

This project implements a **Micro-Frontend Architecture** using **Module Federation** within a **Monorepo** structure. It's designed as a distributed insurance management platform where multiple independent applications work together as a unified system.

## Architecture Pattern

### 🏗️ **Micro-Frontend + Module Federation**

This is a **Micro-Frontend Architecture** that allows:
- Independent development and deployment of features
- Technology diversity across teams
- Runtime composition of applications
- Scalable team organization

### 📦 **Monorepo Structure**

The project uses a monorepo pattern with workspace management:
- Single repository containing multiple related applications
- Shared dependencies and build tools
- Centralized configuration and tooling
- Easier cross-application refactoring

## Project Structure

```
insurance-platform/
├── apps/                           # Micro-frontend applications
│   ├── shell/                      # Host application (Module Federation Host)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Layout.tsx      # Main navigation layout
│   │   │   │   ├── Dashboard.tsx   # Main dashboard
│   │   │   │   ├── SalesPortal.tsx # Remote wrapper for Sales
│   │   │   │   ├── UnderwriterPortal.tsx # Remote wrapper for Underwriter
│   │   │   │   └── ProductConfig.tsx # Remote wrapper for Product Config
│   │   │   ├── types/
│   │   │   │   └── remotes.d.ts    # TypeScript definitions for remotes
│   │   │   ├── App.tsx             # Main application with routing
│   │   │   └── main.tsx            # Application entry point
│   │   ├── vite.config.ts          # Vite + Module Federation config
│   │   └── package.json            # Dependencies and scripts
│   │
│   ├── sales-portal/               # Sales micro-frontend (Remote)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Dashboard.tsx   # Sales dashboard
│   │   │   │   ├── QuotesList.tsx  # Quotes management
│   │   │   │   └── PoliciesList.tsx # Policies management
│   │   │   ├── App.tsx             # Sales app routing
│   │   │   └── main.tsx            # Standalone entry point
│   │   ├── vite.config.ts          # Module Federation remote config
│   │   └── package.json
│   │
│   ├── underwriter-portal/         # Underwriting micro-frontend (Remote)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Dashboard.tsx   # Underwriter dashboard
│   │   │   │   ├── RiskAssessments.tsx # Risk assessment management
│   │   │   │   └── PendingApprovals.tsx # Approval workflow
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── product-config/             # Product configuration micro-frontend (Remote)
│       ├── src/
│       │   ├── components/
│       │   │   └── Dashboard.tsx   # Product management dashboard
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── vite.config.ts
│       └── package.json
│
├── packages/                       # Shared libraries
│   ├── shared-ui/                  # Common UI components
│   └── shared-types/               # Shared TypeScript types
│
├── package.json                    # Root package.json with workspace config
├── pnpm-workspace.yaml            # PNPM workspace configuration
└── pnpm-lock.yaml                 # Dependency lock file
```

## Module Federation Implementation

### 🎯 **Host Application (Shell)**

**Role**: Container/Orchestrator
- **Port**: 3000
- **Purpose**: Main entry point and navigation shell
- **Configuration**: Consumes remote modules from other applications

```typescript
// apps/shell/vite.config.ts
federation({
  name: "shell",
  remotes: {
    salesPortal: "http://localhost:3001/remoteEntry.js",
    underwriterPortal: "http://localhost:3002/remoteEntry.js",
    productConfig: "http://localhost:3004/remoteEntry.js",
  },
})
```

### 🚀 **Remote Applications**

Each portal acts as a **Module Federation Remote**:

| Application | Port | Role | Exposes |
|-------------|------|------|---------|
| Sales Portal | 3001 | Remote | `./App` component |
| Underwriter Portal | 3002 | Remote | `./App` component |
| Product Config | 3004 | Remote | `./App` component |

```typescript
// Example: apps/sales-portal/vite.config.ts
federation({
  name: "salesPortal",
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./src/App",
  },
  shared: ["react", "react-dom", "react-router-dom"],
})
```

## Key Features

### 🔄 **Runtime Integration**
- Applications are loaded dynamically at runtime
- No build-time dependencies between micro-frontends
- Independent deployments possible

### 🛡️ **Error Boundaries & Fallbacks**
- Each remote module wrapped in error boundaries
- Graceful degradation when remotes fail to load
- Fallback UI with links to standalone applications

### 🧭 **Unified Navigation**
- Shell app provides consistent navigation
- Each portal maintains its own internal routing
- Seamless transitions between applications

### 📱 **Dual Access Modes**
- **Integrated**: Access via shell app at localhost:3000
- **Standalone**: Direct access to individual portals

## Technology Stack

### 🛠️ **Build Tools & Module Federation**
- **Vite**: Build tool and dev server
- **@originjs/vite-plugin-federation**: Module Federation implementation for Vite
- **PNPM**: Package manager with workspace support

### ⚛️ **Frontend Framework**
- **React 18**: UI library
- **TypeScript**: Type safety
- **React Router**: Client-side routing

### 🎨 **Styling & UI**
- **Tailwind CSS**: Utility-first CSS framework
- **Shared UI Components**: Common component library
- **Responsive Design**: Mobile-first approach

### 🔧 **Development Tools**
- **Concurrently**: Run multiple dev servers
- **ESLint**: Code linting
- **PostCSS**: CSS processing

## Architectural Benefits

### ✅ **Team Independence**
- Each portal can be developed by separate teams
- Independent release cycles
- Technology choices per team (within React ecosystem)

### ✅ **Scalability**
- Easy to add new portals/features
- Horizontal scaling of development teams
- Modular codebase organization

### ✅ **User Experience**
- Single page application feel
- No page reloads between portals
- Consistent navigation and branding

### ✅ **Development Experience**
- Fast development builds with Vite
- Hot module replacement for all apps
- Shared component library reduces duplication

## Deployment Architecture

### 🌐 **Micro-Frontend Deployment Strategy**

```
Production Environment:
├── shell.insurance-platform.com      # Host application
├── sales.insurance-platform.com      # Sales portal
├── underwriter.insurance-platform.com # Underwriter portal
└── products.insurance-platform.com   # Product config portal
```

### 📦 **Independent Deployments**
- Each application can be deployed independently
- Module Federation loads remotes from their respective domains
- Rollback capabilities per application
- Blue-green deployments possible

## Development Workflow

### 🚀 **Getting Started**
```bash
# Install all dependencies
pnpm install

# Start all applications in development mode
pnpm run dev

# Individual application development
pnpm run dev:shell       # Shell app only
pnpm run dev:sales       # Sales portal only
pnpm run dev:underwriter # Underwriter portal only
pnpm run dev:product     # Product config only
```

### 🔄 **Development Ports**
- **Shell (Host)**: http://localhost:3000
- **Sales Portal**: http://localhost:3001  
- **Underwriter Portal**: http://localhost:3002
- **Product Config**: http://localhost:3004

## Architecture Patterns Used

### 1. **Micro-Frontend Pattern**
- Decomposition by business domain
- Independent teams and deployments
- Runtime composition

### 2. **Module Federation Pattern** 
- Dynamic imports at runtime
- Shared dependencies optimization
- Distributed architecture

### 3. **Monorepo Pattern**
- Single repository for related applications
- Shared tooling and dependencies
- Simplified cross-cutting concerns

### 4. **Shell Pattern**
- Central navigation and layout
- Route-based micro-frontend loading
- Consistent user experience

## Future Enhancements

### 🔮 **Potential Improvements**
- **Shared State Management**: Redux/Zustand for cross-app state
- **Micro-Service Integration**: Backend APIs per domain
- **Design System**: Enhanced shared component library
- **Testing Strategy**: Cross-application integration tests
- **Monitoring**: Application performance monitoring
- **CI/CD Pipeline**: Automated testing and deployment

## Summary

This architecture combines the benefits of:
- **Monorepo**: Simplified development and tooling
- **Micro-Frontends**: Team independence and scalability  
- **Module Federation**: Runtime composition and deployment flexibility

The result is a scalable, maintainable insurance platform that allows multiple teams to work independently while delivering a cohesive user experience.