export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()

  // Initialize auth from localStorage before app starts
  authStore.initAuth()
})
