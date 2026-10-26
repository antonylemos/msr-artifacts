# Deployment Guide: Module Federation Insurance Platform on Vercel

## Overview

This guide explains how to deploy the Module Federation Insurance Platform to Vercel. Since this is a microfrontend architecture with multiple independent applications, deployment requires special considerations to maintain the Module Federation functionality in a production environment.

## 🚨 Key Challenges

### 1. **Module Federation & Static Hosting**
- Module Federation requires applications to communicate at runtime
- Static hosting platforms like Vercel serve pre-built static files
- Remote URLs need to be known at build time but change between environments

### 2. **Cross-Origin Resource Sharing (CORS)**
- Microfrontends will be hosted on different domains
- Browser security requires proper CORS configuration
- `remoteEntry.js` files must be accessible across domains

### 3. **Build Dependencies**
- Shared packages must be built before individual applications
- Applications have interdependencies that affect build order
- Production builds may require different configurations

## 📋 Prerequisites

Before deploying, ensure you have:

1. **Vercel Account** with CLI installed
2. **Repository Access** to your insurance platform code
3. **Domain Planning** for each microfrontend
4. **Environment Variables** defined for production URLs

## 🚀 Deployment Strategies

### Strategy 1: Separate Vercel Projects (Recommended)

Deploy each microfrontend as an independent Vercel project. This approach provides maximum flexibility and follows microfrontend best practices.

#### **Step 1: Plan Your Domains**
```
Shell App:          insurance-platform.vercel.app
Sales Portal:       insurance-sales.vercel.app
Underwriter Portal: insurance-underwriter.vercel.app
Employer Portal:    insurance-employer.vercel.app
Product Config:     insurance-product.vercel.app
Service Provider:   insurance-service.vercel.app
```

#### **Step 2: Environment Variables Setup**
Create environment variables for each project:

**Shell App Environment Variables:**
```bash
VITE_SALES_PORTAL_URL=https://insurance-sales.vercel.app
VITE_UNDERWRITER_PORTAL_URL=https://insurance-underwriter.vercel.app
VITE_EMPLOYER_PORTAL_URL=https://insurance-employer.vercel.app
VITE_PRODUCT_CONFIG_URL=https://insurance-product.vercel.app
VITE_SERVICE_PROVIDER_URL=https://insurance-service.vercel.app
```

**Remote Apps Environment Variables:**
```bash
VITE_SHELL_URL=https://insurance-platform.vercel.app
NODE_ENV=production
```

#### **Step 3: Code Modifications Required**

**Update Module Federation Configuration:**
```typescript
// apps/shell/vite.config.ts
import { defineConfig } from 'vite';
import { federation } from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      name: 'shell',
      remotes: {
        salesPortal: `${process.env.VITE_SALES_PORTAL_URL}/assets/remoteEntry.js`,
        underwriterPortal: `${process.env.VITE_UNDERWRITER_PORTAL_URL}/assets/remoteEntry.js`,
        employerPortal: `${process.env.VITE_EMPLOYER_PORTAL_URL}/assets/remoteEntry.js`,
        productConfig: `${process.env.VITE_PRODUCT_CONFIG_URL}/assets/remoteEntry.js`,
        serviceProvider: `${process.env.VITE_SERVICE_PROVIDER_URL}/assets/remoteEntry.js`,
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ]
});
```

**Add CORS Headers to Remote Apps:**
```typescript
// apps/*/vite.config.ts (for each remote app)
export default defineConfig({
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  },
  // ... rest of config
});
```

**Update Build Scripts:**
```json
// package.json
{
  "scripts": {
    "build:prod": "pnpm run build:packages && NODE_ENV=production pnpm run build:apps",
    "build:shell-prod": "cd apps/shell && NODE_ENV=production pnpm run build",
    "build:sales-prod": "cd apps/sales-portal && NODE_ENV=production pnpm run build",
    "build:underwriter-prod": "cd apps/underwriter-portal && NODE_ENV=production pnpm run build",
    "build:employer-prod": "cd apps/employer-portal && NODE_ENV=production pnpm run build",
    "build:product-prod": "cd apps/product-config && NODE_ENV=production pnpm run build",
    "build:service-prod": "cd apps/service-provider && NODE_ENV=production pnpm run build"
  }
}
```

#### **Step 4: Deployment Process**

**Deploy Shared Packages First:**
```bash
# Build shared packages locally and commit
pnpm run build:packages
git add packages/*/dist
git commit -m "Build shared packages for deployment"
```

**Deploy Each Application:**
```bash
# Deploy each app as separate Vercel project
vercel --cwd apps/shell --prod
vercel --cwd apps/sales-portal --prod
vercel --cwd apps/underwriter-portal --prod
vercel --cwd apps/employer-portal --prod
vercel --cwd apps/product-config --prod
vercel --cwd apps/service-provider --prod
```

**Configure Vercel Projects:**
Each project needs a `vercel.json` configuration:
```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "framework": "vite",
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

### Strategy 2: Monorepo with Multiple Projects

Use Vercel's monorepo support to deploy all applications from a single repository while maintaining separate deployments.

#### **Step 1: Create Root Vercel Configuration**
```json
// vercel.json
{
  "projects": [
    {
      "name": "insurance-shell",
      "source": "apps/shell",
      "framework": "vite"
    },
    {
      "name": "insurance-sales",
      "source": "apps/sales-portal",
      "framework": "vite"
    },
    {
      "name": "insurance-underwriter",
      "source": "apps/underwriter-portal",
      "framework": "vite"
    },
    {
      "name": "insurance-employer",
      "source": "apps/employer-portal",
      "framework": "vite"
    },
    {
      "name": "insurance-product",
      "source": "apps/product-config",
      "framework": "vite"
    },
    {
      "name": "insurance-service",
      "source": "apps/service-provider",
      "framework": "vite"
    }
  ]
}
```

#### **Step 2: Individual Project Configurations**
Each app directory needs its own `vercel.json`:
```json
// apps/shell/vercel.json
{
  "buildCommand": "cd ../.. && pnpm run build:packages && cd apps/shell && pnpm run build",
  "outputDirectory": "dist",
  "installCommand": "cd ../.. && pnpm install",
  "framework": "vite"
}
```

#### **Step 3: Environment Variables**
Set environment variables at the project level in Vercel dashboard for each deployed project.

---

### Strategy 3: Single Deployment with Subdirectories

Deploy all applications to a single Vercel project using subdirectories. This approach is simpler but less flexible.

#### **Step 1: Modify Build Output**
```json
// vercel.json
{
  "rewrites": [
    { "source": "/sales/(.*)", "destination": "/sales-portal/$1" },
    { "source": "/underwriter/(.*)", "destination": "/underwriter-portal/$1" },
    { "source": "/employer/(.*)", "destination": "/employer-portal/$1" },
    { "source": "/product/(.*)", "destination": "/product-config/$1" },
    { "source": "/service/(.*)", "destination": "/service-provider/$1" }
  ]
}
```

#### **Step 2: Update Remote URLs**
```typescript
// Use relative paths instead of absolute URLs
remotes: {
  salesPortal: '/sales-portal/assets/remoteEntry.js',
  underwriterPortal: '/underwriter-portal/assets/remoteEntry.js',
  // ... etc
}
```

## 🔧 Technical Requirements

### 1. **Shared Package Building**
```bash
# Ensure shared packages are built before applications
pnpm run build:packages
```

### 2. **Environment Configuration**
```typescript
// Create environment-specific configurations
const config = {
  development: {
    salesPortal: 'http://localhost:3001/assets/remoteEntry.js'
  },
  production: {
    salesPortal: 'https://insurance-sales.vercel.app/assets/remoteEntry.js'
  }
}
```

### 3. **CORS Configuration**
```typescript
// Add to each remote app's configuration
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}
```

### 4. **Build Dependencies**
```json
// Ensure proper build order
"build:prod": "pnpm run build:packages && pnpm run build:apps:prod"
```

## 🚨 Common Issues & Solutions

### **Issue 1: Module Federation Loading Errors**
**Problem:** Remote modules fail to load in production
**Solution:** 
- Verify all remote URLs are accessible
- Check CORS headers are properly configured
- Ensure `remoteEntry.js` files are available at expected paths

### **Issue 2: Shared Package Dependencies**
**Problem:** Applications can't find shared packages
**Solution:**
- Build shared packages first: `pnpm run build:packages`
- Commit built packages to repository
- Verify import paths in applications

### **Issue 3: Environment Variable Issues**
**Problem:** Production URLs not resolving correctly
**Solution:**
- Set environment variables in Vercel dashboard
- Use fallback values in configuration
- Test environment variable resolution locally

### **Issue 4: Build Order Dependencies**
**Problem:** Applications fail to build due to missing dependencies
**Solution:**
- Use proper build scripts that handle dependencies
- Build shared packages before applications
- Use `pnpm` workspaces for dependency management

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] Shared packages built and committed
- [ ] Environment variables defined
- [ ] CORS headers configured
- [ ] Build scripts updated for production
- [ ] Domain names planned and available

### Deployment
- [ ] Deploy shared packages first
- [ ] Deploy remote applications
- [ ] Deploy shell application last
- [ ] Test cross-application navigation
- [ ] Verify all microfrontends load correctly

### Post-Deployment
- [ ] Monitor application performance
- [ ] Test all user workflows
- [ ] Verify Module Federation functionality
- [ ] Check browser console for errors
- [ ] Test on multiple devices/browsers

## 🎯 Best Practices

1. **Deploy Order**: Always deploy remotes before the shell
2. **Environment Management**: Use different environments for staging/production
3. **Monitoring**: Set up error tracking for each microfrontend
4. **Rollback Strategy**: Plan for rolling back individual applications
5. **Performance**: Monitor bundle sizes and loading times
6. **Security**: Implement proper CORS policies for production

## 📞 Support & Troubleshooting

### Common Commands
```bash
# Local development
pnpm run dev

# Production build
pnpm run build:prod

# Deploy to Vercel
vercel --prod

# Check build output
ls -la apps/*/dist/assets/
```

### Debug Steps
1. Check browser Network tab for failed requests
2. Verify `remoteEntry.js` files are accessible
3. Test CORS headers with browser dev tools
4. Check Vercel build logs for errors
5. Verify environment variables are set correctly

This deployment guide provides the foundation for successfully deploying your Module Federation insurance platform to Vercel while maintaining all microfrontend functionality.