import type { UserState } from '../types'

const AUTH_CHANGED = 'mfe:auth-changed'
const AUTH_LOGOUT  = 'mfe:auth-logout'
const TOKEN_KEY    = 'mfe_token'
const USER_KEY     = 'mfe_user'

// ─── Broadcast ───────────────────────────────────────────────────────────────

export function broadcastLogin(user: UserState): void {
  if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(TOKEN_KEY, user.token)
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
    window.dispatchEvent(new CustomEvent<UserState>(AUTH_CHANGED, { detail: user }))
  }
}

export function broadcastLogout(): void {
  if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(USER_KEY)
    window.dispatchEvent(new CustomEvent(AUTH_LOGOUT))
  }
}

// ─── Subscribe ───────────────────────────────────────────────────────────────

export function onAuthChanged(cb: (user: UserState) => void): () => void {
  if (typeof window !== 'undefined') {
    const handler = (e: Event) => cb((e as CustomEvent<UserState>).detail)
    window.addEventListener(AUTH_CHANGED, handler)
    return () => window.removeEventListener(AUTH_CHANGED, handler)
  }
  return () => {}
}

export function onAuthLogout(cb: () => void): () => void {
  if (typeof window !== 'undefined') {
    window.addEventListener(AUTH_LOGOUT, cb)
    return () => window.removeEventListener(AUTH_LOGOUT, cb)
  }
  return () => {}
}

// ─── Read current state (for initial mount) ───────────────────────────────────

export function getCurrentUser(): UserState | null {
  if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
    try {
      const raw = sessionStorage.getItem(USER_KEY)
      return raw ? (JSON.parse(raw) as UserState) : null
    } catch {
      return null
    }
  }
  return null
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return !!getToken()
}
