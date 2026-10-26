# Module Federation Insurance Platform

A modern, scalable insurance platform built with Module Federation, enabling independent development and deployment of different business domains while providing a unified user experience.

## 🏗️ Architecture Overview

This platform uses **Module Federation** to create a microfrontend architecture where each business domain (Sales, Underwriting, Employer Services, Product Configuration, and Service Provider) operates as an independent application that can be developed, tested, and deployed separately.

### Applications Structure

```
insurance-platform/
├── 🏠 Shell App (Port 3000)          # Main container & navigation
├── 💼 Sales Portal (Port 3001)        # CRM, quotes, policies
├── 📋 Underwriter Portal (Port 3002)  # Risk assessment, approvals
├── 👥 Employer Portal (Port 3003)     # Group policies, employees
├── ⚙️ Product Config (Port 3004)      # Product setup, pricing
└── 🏥 Service Provider (Port 3005)    # Provider network, claims
```

### Shared Packages

- **@insurance/shared-ui** - Reusable UI components with shadcn/ui + Tailwind
- **@insurance/shared-types** - TypeScript definitions for all applications

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm 9+** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd insurance-platform
   ```

2. **Install all dependencies**
   ```bash
   npm install
   ```

3. **Build shared packages** (Required before first run)
   ```bash
   npm run build:packages
   ```

4. **Start the development environment**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - **Main Application:** http://localhost:3000
   - Navigate through different portals using the top navigation

## 📁 Project Structure

```
insurance-platform/
├── 📂 apps/                           # All applications
│   ├── 🏠 shell/                      # Main container (Port 3000)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Layout.tsx         # Main layout with navigation
│   │   │   │   └── Dashboard.tsx      # Landing page
│   │   │   ├── App.tsx                # Route configuration
│   │   │   └── main.tsx               # Entry point
│   │   ├── vite.config.ts             # Module Federation host config
│   │   └── package.json
│   │
│   ├── 💼 sales-portal/               # Sales & CRM (Port 3001)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Dashboard.tsx      # Sales dashboard
│   │   │   │   ├── QuotesList.tsx     # Quote management
│   │   │   │   └── PoliciesList.tsx   # Policy management
│   │   │   └── App.tsx                # Sales app entry
│   │   └── vite.config.ts             # Module Federation remote
│   │
│   ├── 📋 underwriter-portal/         # Risk Assessment (Port 3002)
│   ├── 👥 employer-portal/            # Group Policies (Port 3003)
│   ├── ⚙️ product-config/             # Product Setup (Port 3004)
│   └── 🏥 service-provider/           # Claims & Providers (Port 3005)
│
├── 📦 packages/                       # Shared libraries
│   ├── shared-ui/                     # UI components
│   │   ├── src/
│   │   │   ├── components/ui/         # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   └── input.tsx
│   │   │   ├── lib/utils.ts           # Utility functions
│   │   │   └── index.ts               # Exports
│   │   └── tailwind.config.js         # Tailwind configuration
│   │
│   └── shared-types/                  # TypeScript definitions
│       └── src/
│           └── index.ts               # All type definitions
│
├── 📋 package.json                    # Root workspace configuration
├── 📖 README.md                       # This file
├── 🏗️ ARCHITECTURE.md                # Detailed architecture docs
└── 📝 TODO.md                        # Future enhancements
```

## 🖥️ Running the Application

### Development Mode

**Start all applications:**
```bash
npm run dev
```
This starts all 6 applications simultaneously:
- Shell (3000), Sales (3001), Underwriter (3002), Employer (3003), Product (3004), Service (3005)

**Start individual applications:**
```bash
# Start just the shell application
npm run dev:shell

# Start shell + sales portal
npm run dev:shell & npm run dev:sales

# Start specific application
cd apps/sales-portal && npm run dev
```

### Production Build

**Build everything:**
```bash
npm run build
```

**Build in stages:**
```bash
# 1. Build shared packages first
npm run build:packages

# 2. Build all applications
npm run build:apps
```

**Build individual applications:**
```bash
# Build specific app
cd apps/sales-portal && npm run build

# Preview production build
cd apps/sales-portal && npm run preview
```

## 🎯 Application Features

### 🏠 Shell Application (Main Container)
- **Central Navigation:** Responsive navigation bar with active states
- **Dashboard:** Overview of all available modules with quick access
- **Module Federation Host:** Dynamically loads all microfrontends
- **Consistent Layout:** Shared layout wrapper for all applications

### 💼 Sales Portal
- **Sales Dashboard:** Metrics, KPIs, and performance indicators
- **Quote Management:** Create, edit, and track insurance quotes
- **Policy Management:** Convert quotes to policies, manage active policies
- **Customer Data:** Customer information and interaction history
- **Mock Data:** Realistic sample data for development and testing

### 📋 Underwriter Portal
- **Risk Assessment:** Review applications and assess risk levels
- **Dashboard Analytics:** Processing times, approval rates, risk scores
- **Priority Queue:** High-risk applications highlighted for review
- **Approval Workflow:** Streamlined approval and rejection process

### 👥 Employer Portal
- **Group Policy Management:** Manage company-wide insurance policies
- **Employee Administration:** Add employees, manage enrollments
- **Benefits Dashboard:** Overview of all employee benefits
- **HR Integration:** Tools for HR teams and benefits administrators

### ⚙️ Product Configuration
- **Product Management:** Create and configure insurance products
- **Pricing Rules:** Set up premium calculations and pricing models
- **Coverage Options:** Define coverage types, limits, and deductibles
- **Eligibility Rules:** Set qualification criteria for products

### 🏥 Service Provider Portal
- **Provider Network:** Manage healthcare providers and networks
- **Claims Processing:** Review, approve, and process insurance claims
- **Network Analytics:** Provider performance and network metrics
- **Claims Dashboard:** Real-time claims status and processing queue

## 🔧 Development Guide

### Working with Shared Components

**Adding a new UI component:**

1. Create the component in `packages/shared-ui/src/components/ui/`
2. Export it from `packages/shared-ui/src/index.ts`
3. Build the shared-ui package:
   ```bash
   cd packages/shared-ui && npm run build
   ```
4. Use in any application:
   ```typescript
   import { NewComponent } from '@insurance/shared-ui';
   ```

**Adding new types:**

1. Add types to `packages/shared-types/src/index.ts`
2. Build the shared-types package:
   ```bash
   cd packages/shared-types && npm run build
   ```
3. Use in any application:
   ```typescript
   import type { NewType } from '@insurance/shared-types';
   ```

### Creating a New Microfrontend

1. **Create application directory:**
   ```bash
   mkdir apps/new-portal
   cd apps/new-portal
   ```

2. **Copy configuration from existing app:**
   ```bash
   cp ../sales-portal/package.json ./
   cp ../sales-portal/vite.config.ts ./
   cp ../sales-portal/tsconfig.json ./
   ```

3. **Update configuration:**
   - Change app name and port in `package.json`
   - Update Module Federation name in `vite.config.ts`
   - Update port in `vite.config.ts`

4. **Add to shell application:**
   - Add remote reference in `apps/shell/vite.config.ts`
   - Add route in `apps/shell/src/App.tsx`
   - Add navigation item in `apps/shell/src/components/Layout.tsx`

### Module Federation Configuration

**Each microfrontend exposes its App component:**
```typescript
// vite.config.ts
federation({
  name: 'appName',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App',
  },
  shared: ['react', 'react-dom', 'react-router-dom']
})
```

**Shell application consumes all remotes:**
```typescript
federation({
  name: 'shell',
  remotes: {
    salesPortal: 'http://localhost:3001/assets/remoteEntry.js',
    // ... other remotes
  },
})
```

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Vite** | Build tool and dev server | ^5.0.0 |
| **React** | UI framework | ^18.2.0 |
| **TypeScript** | Type safety | ^5.2.2 |
| **Module Federation** | Microfrontend architecture | ^1.3.5 |
| **Tailwind CSS** | Styling framework | ^3.3.6 |
| **shadcn/ui** | UI component library | Latest |
| **React Router** | Client-side routing | ^6.20.1 |

## 🚨 Troubleshooting

### Common Issues

**1. "Module not found" errors**
```bash
# Solution: Build shared packages
npm run build:packages
```

**2. Port already in use**
```bash
# Check what's running on port
lsof -i :3000

# Kill process
kill -9 <PID>
```

**3. Module Federation loading errors**
- Ensure all required applications are running
- Check that ports match in vite.config.ts files
- Verify remoteEntry.js files are accessible

**4. TypeScript errors in shared packages**
```bash
# Rebuild shared packages
cd packages/shared-types && npm run build
cd packages/shared-ui && npm run build
```

### Development Tips

**1. Fast Development Workflow:**
```bash
# Terminal 1: Watch shared packages
cd packages/shared-ui && npm run dev

# Terminal 2: Run applications
npm run dev
```

**2. Debug Module Federation:**
- Open browser dev tools
- Check Network tab for remoteEntry.js loads
- Verify console for federation errors

**3. Hot Reloading Issues:**
- Restart dev server if hot reloading stops working
- Clear browser cache
- Check that all dependencies are properly installed

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture explanation
- **[TODO.md](./TODO.md)** - Future enhancements and features
- **[Package Documentation](./packages/)** - Individual package docs

## 🤝 Team Development

### Recommended Team Structure

| Team | Responsibility | Applications |
|------|---------------|--------------|
| **Platform Team** | Infrastructure, shared components | `shell`, `packages/*` |
| **Sales Team** | Customer acquisition, policies | `sales-portal` |
| **Underwriting Team** | Risk assessment, approvals | `underwriter-portal` |
| **HR/Benefits Team** | Group policies, employee benefits | `employer-portal` |
| **Product Team** | Product configuration, pricing | `product-config` |
| **Claims Team** | Provider network, claims processing | `service-provider` |

### Development Workflow

1. **Feature Development:**
   ```bash
   # Work on specific microfrontend
   cd apps/sales-portal
   git checkout -b feature/new-quote-flow
   npm run dev
   ```

2. **Shared Component Changes:**
   ```bash
   # Update shared components
   cd packages/shared-ui
   # Make changes
   npm run build
   ```

3. **Testing Integration:**
   ```bash
   # Test all applications together
   npm run dev
   ```

## 🚀 Deployment

### Development Deployment
```bash
# Build all applications
npm run build

# Serve static files (example with serve)
npx serve apps/shell/dist -p 3000
npx serve apps/sales-portal/dist -p 3001
# ... serve other apps
```

### Production Deployment

**Environment Variables:**
```bash
# Update remote URLs for production
VITE_SALES_PORTAL_URL=https://sales.yourcompany.com
VITE_UNDERWRITER_PORTAL_URL=https://underwriter.yourcompany.com
# ... other URLs
```

**Update Shell Configuration:**
```typescript
// apps/shell/vite.config.ts
remotes: {
  salesPortal: process.env.VITE_SALES_PORTAL_URL + '/assets/remoteEntry.js',
  // ... other production URLs
}
```

## 📞 Support

### Getting Help

1. **Check Documentation:**
   - [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
   - [TODO.md](./TODO.md) for planned features

2. **Common Solutions:**
   - Restart development server
   - Clear browser cache
   - Rebuild shared packages: `npm run build:packages`

3. **Create an Issue:**
   - Provide error messages
   - Include steps to reproduce
   - Mention your Node.js and npm versions

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request with detailed description

---

**Built with ❤️ using Module Federation and React**

For detailed architecture information, see [ARCHITECTURE.md](./ARCHITECTURE.md)  
For future enhancements, see [TODO.md](./TODO.md)# module-federation
