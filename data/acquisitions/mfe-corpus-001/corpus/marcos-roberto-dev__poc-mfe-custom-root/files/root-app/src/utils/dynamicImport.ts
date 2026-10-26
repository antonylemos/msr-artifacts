/**
 * Hybrid dynamic import helper that supports both modern ESM and legacy SystemJS.
 * 
 * Strategy:
 * 1. Try native import() first (for modules in native import map)
 * 2. If that fails, try System.import() (for modules in systemjs-importmap)
 * 
 * This allows separating modern ESM modules from legacy SystemJS modules.
 */
export async function dynamicImport(url: string): Promise<any> {
  console.log('[dynamicImport] Loading module:', url);
  
  // Try native import() first
  try {
    const module = await import(/* @vite-ignore */ url);
    console.log('[dynamicImport] ✓ Loaded via native import():', url);
    return module;
  } catch (nativeError) {
    console.warn('[dynamicImport] Native import() failed, trying System.import()...', nativeError);
    
    // Fallback to System.import() for legacy modules
    if (typeof (window as any).System !== 'undefined' && (window as any).System.import) {
      try {
        const module = await (window as any).System.import(url);
        console.log('[dynamicImport] ✓ Loaded via System.import():', url);
        return module;
      } catch (systemError) {
        console.error('[dynamicImport] ✗ Both native and System.import() failed for:', url);
        console.error('  - Native error:', nativeError);
        console.error('  - System error:', systemError);
        throw new Error(`Failed to load module "${url}" with both import strategies`);
      }
    }
    
    // SystemJS not available
    console.error('[dynamicImport] ✗ Native import() failed and SystemJS not available');
    throw nativeError;
  }
}
