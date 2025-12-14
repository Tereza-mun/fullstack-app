export default defineNuxtRouteMiddleware(async (to, from) => {
  // On server-side, check for auth cookie
  if (process.server) {
    const cookies = useRequestHeaders(['cookie'])
    const hasAccessToken = cookies.cookie?.includes('access_token')
    const hasRefreshToken = cookies.cookie?.includes('refresh_token')

    // Allow if either access token OR refresh token exists
    if (!hasAccessToken && !hasRefreshToken) {
      return navigateTo('/login')
    }
    return
  }

  // On client-side, check auth store (will be hydrated from localStorage)
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
