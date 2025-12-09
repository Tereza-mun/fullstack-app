export default defineNuxtRouteMiddleware((to) => {
  const registerStore = useRegisterStore()
  const stepId = to.params.id as string

  // Step 2 requires Step 1 to be complete
  if (stepId === '2' && !registerStore.isStep1Complete()) {
    return navigateTo('/register/1')
  }

  // Step 3 can only be accessed from Step 2 (no direct navigation)
  // This is enforced by only navigating to step 3 via button in RegisterForm2
  // If user tries to access step 3 directly, redirect to step 2
  if (stepId === '3' && !registerStore.isStep2Complete()) {
    return navigateTo('/register/2')
  }
})
