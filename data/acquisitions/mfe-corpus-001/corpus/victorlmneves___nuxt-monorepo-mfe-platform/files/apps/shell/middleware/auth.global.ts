import { useAuthStore } from '~/stores/auth'
import { useAuth } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path.startsWith('/api/auth')) return

  const { status } = useAuth()
  const auth = useAuthStore()

  if (status.value === 'authenticated') {
    await auth.syncFromSession()
  }

  const publicRoutes = ['/login']
  if (status.value !== 'authenticated' && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }
  if (status.value === 'authenticated' && to.path === '/login') {
    return navigateTo('/')
  }
})