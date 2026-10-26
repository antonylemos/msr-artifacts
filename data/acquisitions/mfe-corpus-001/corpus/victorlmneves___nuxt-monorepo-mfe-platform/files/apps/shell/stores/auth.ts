import { defineStore } from 'pinia'
import { useAuth } from '#imports'
import { broadcastLogin, broadcastLogout } from '@mfe/shared/auth'
import type { UserState } from '@mfe/shared/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as UserState | null,
  }),

  getters: {
    isLoggedIn: (s) => !!s.user,
  },

  actions: {
    // Call this once on app start — syncs the next-auth session into your store
    async syncFromSession() {
      const { data: session, status } = useAuth()
      if (status.value === 'authenticated' && session.value?.user) {
        const user: UserState = {
          id: session.value.user.id ?? '',
          name: session.value.user.name ?? '',
          email: session.value.user.email ?? '',
          token: session.value.accessToken ?? '',
          roles: [],
        }
        this.user = user
        broadcastLogin(user)   // notifies Vue 2 + Vue 3 remotes via event bus
      }
    },

    async logout() {
      const { signOut } = useAuth()
      broadcastLogout()
      this.user = null
      await signOut({ callbackUrl: '/login' })
    },
  },
})