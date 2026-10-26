// User state — framework-agnostic, plain objects only
export interface UserState {
  id: string
  name: string
  email: string
  token: string
  roles: string[]
}

// MFE descriptor used by the shell homepage
export interface MfeDescriptor {
  id: string
  name: string
  description: string
  icon: string
  route: string           // shell route, e.g. /app/checkout
  remoteUrl: string       // URL to remoteEntry.js
  remoteName: string      // MF container name
  exposedModule: string   // e.g. './App'
  framework: 'vue2' | 'vue3'
  color: string           // card accent color
}

// Contract every remote must expose via its MF module
export interface RemoteMount {
  mount(el: HTMLElement, props: RemoteMountProps): void
  unmount(el: HTMLElement): void
}

export interface RemoteMountProps {
  user: UserState
  onLogout: () => void
}
