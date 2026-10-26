import type { MfeDescriptor } from '../types'

// Remote URLs fall back to localhost for local dev.
// In production set CHECKOUT_REMOTE_URL etc. in your environment.
function remoteUrl(envKey: string, localPort: number): string {
  if (typeof process !== 'undefined' && process.env[envKey]) {
    return process.env[envKey] as string
  }
  return `http://localhost:${localPort}/remoteEntry.js`
}

export const MFE_REGISTRY: MfeDescriptor[] = [
  {
    id: 'checkout',
    name: 'Checkout',
    description: 'Order and payment flow',
    icon: '🛒',
    route: '/app/checkout',
    remoteUrl: remoteUrl('CHECKOUT_REMOTE_URL', 3001),
    remoteName: 'mfe_checkout',
    exposedModule: './App',
    framework: 'vue2',
    color: '#1976D2',
  },
  {
    id: 'admin',
    name: 'Admin panel',
    description: 'Back-office management',
    icon: '🔧',
    route: '/app/admin',
    remoteUrl: remoteUrl('ADMIN_REMOTE_URL', 3002),
    remoteName: 'mfe_admin',
    exposedModule: './App',
    framework: 'vue2',
    color: '#388E3C',
  },
  {
    id: 'profile',
    name: 'Profile',
    description: 'User account & settings',
    icon: '👤',
    route: '/app/profile',
    remoteUrl: remoteUrl('PROFILE_REMOTE_URL', 3003),
    remoteName: 'mfe_profile',
    exposedModule: './App',
    framework: 'vue3',
    color: '#7B1FA2',
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Analytics & reports',
    icon: '📊',
    route: '/app/dashboard',
    remoteUrl: remoteUrl('DASHBOARD_REMOTE_URL', 3004),
    remoteName: 'mfe_dashboard',
    exposedModule: './App',
    framework: 'vue3',
    color: '#F57C00',
  },
]
