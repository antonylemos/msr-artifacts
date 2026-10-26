import type { MfeDescriptor, RemoteMount, RemoteMountProps } from '@mfe/shared/types'

interface UseMfeLoader {
  mountMfe(el: HTMLElement, descriptor: MfeDescriptor, props: RemoteMountProps): Promise<void>
  unmountMfe(el: HTMLElement, descriptor: MfeDescriptor): Promise<void>
  loading: Ref<boolean>
  error: Ref<string | null>
}

// Cache of already-loaded remote mounts
const loadedRemotes = new Map<string, RemoteMount>()

async function loadRemoteModule(descriptor: MfeDescriptor): Promise<RemoteMount> {
  const cached = loadedRemotes.get(descriptor.id)
  if (cached) return cached

  // 1. Inject remoteEntry.js as a plain script tag
  await injectScript(descriptor.remoteUrl, descriptor.remoteName)

  // 2. The remote sets itself on window[remoteName] via webpack MF
  const container = (window as any)[descriptor.remoteName]
  if (!container) {
    throw new Error(
      `Remote "${descriptor.remoteName}" not found on window after loading ${descriptor.remoteUrl}`
    )
  }

  // 3. Init the remote's shared scope.
  //    Shell has no MF plugin, so we pass an empty object — each remote
  //    manages its own singleton scope internally.
  try {
    await container.init({})
  } catch {
    // Some remotes may throw if scope is already initialised — safe to ignore
  }

  // 4. Get the exposed module and extract { mount, unmount }
  const factory = await container.get(descriptor.exposedModule)
  const mod = factory()
  const remote: RemoteMount = mod?.default ?? mod

  if (typeof remote?.mount !== 'function') {
    throw new Error(
      `Remote "${descriptor.remoteName}" does not export a valid mount() function`
    )
  }

  loadedRemotes.set(descriptor.id, remote)
  return remote
}

function injectScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(`mfe-script-${id}`)
    if (existing) { resolve(); return }

    const script = document.createElement('script')
    script.id = `mfe-script-${id}`
    script.src = src
    script.type = 'text/javascript'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load remote: ${src}`))
    document.head.appendChild(script)
  })
}

export function useMfeLoader(): UseMfeLoader {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function mountMfe(
    el: HTMLElement,
    descriptor: MfeDescriptor,
    props: RemoteMountProps
  ): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const remote = await loadRemoteModule(descriptor)
      remote.mount(el, props)
    } catch (e: any) {
      error.value = e?.message ?? 'Failed to load application'
      console.error('[MFE Loader]', e)
    } finally {
      loading.value = false
    }
  }

  async function unmountMfe(el: HTMLElement, descriptor: MfeDescriptor): Promise<void> {
    const remote = loadedRemotes.get(descriptor.id)
    if (remote) remote.unmount(el)
  }

  return { mountMfe, unmountMfe, loading, error }
}
