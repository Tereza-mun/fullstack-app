export default defineNuxtRouteMiddleware((to) => {
  const cartStore = useCartStore()
  const stepId = to.params.id as string

  // Step 2 requires Step 1 to be complete (cart must have items)
  if (stepId === '2' && !cartStore.isStep1Complete()) {
    return navigateTo('/cart/1')
  }

  // Step 3 requires Step 2 to be complete (form must be valid)
  if (stepId === '3' && !cartStore.isStep2Complete()) {
    return navigateTo('/cart/2')
  }

  // Step 4 can only be accessed from Step 3 via button click
  // If user tries to access step 4 directly, redirect to step 3
  if (stepId === '4' && !cartStore.isStep2Complete()) {
    return navigateTo('/cart/3')
  }
})
