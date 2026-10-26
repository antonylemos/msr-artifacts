// Global type declarations for single-spa, SystemJS, and import-map-overrides

declare global {
  interface Window {
    /**
     * SystemJS dynamic module loader (legacy/classic single-spa)
     */
    System?: {
      import: (url: string) => Promise<any>
      register: (deps: string[], declare: Function) => void
    }

    /**
     * import-map-overrides API
     * https://github.com/single-spa/import-map-overrides
     */
    importMapOverrides?: {
      getOverrideMap: () => { imports: Record<string, string> }
      addOverride: (moduleName: string, url: string) => void
      removeOverride: (moduleName: string) => void
      resetOverrides: () => void
      getDefaultMap: () => { imports: Record<string, string> }
      isDisabled: () => boolean
    }
  }
}

export {}
