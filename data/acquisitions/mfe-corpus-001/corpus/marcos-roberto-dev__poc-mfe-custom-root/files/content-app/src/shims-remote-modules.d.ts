// Allow importing arbitrary remote URLs (Vite dev server / System.import of remote modules)
declare module 'http://*'
declare module 'http://*/*'
declare module 'https://*'
declare module 'https://*/*'

// Fallback for other remote-like imports
declare module '*?url'
