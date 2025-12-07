import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useRegisterStore } from '../stores/register'
import { useCartStore } from '../stores/cart'

/**
 * Route guard for registration flow
 * Ensures users complete steps in order: 1 -> 2 -> 3
 */
export const registerGuard = (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const registerStore = useRegisterStore()
    const stepId = to.params.id as string

    // Step 1 is always accessible
    if (stepId === '1') {
        next()
        return
    }

    // Step 2 requires step 1 to be complete
    if (stepId === '2') {
        if (registerStore.isStep1Complete()) {
            next()
        } else {
            next('/register/1')
        }
        return
    }

    // Step 3 requires both step 1 and step 2 to be complete
    if (stepId === '3') {
        if (registerStore.isStep1Complete() && registerStore.isStep2Complete()) {
            next()
        } else if (registerStore.isStep1Complete()) {
            next('/register/2')
        } else {
            next('/register/1')
        }
        return
    }

    // Invalid step ID, redirect to step 1
    next('/register/1')
}

/**
 * Route guard for cart/checkout flow
 * Ensures users complete steps in order and have required data
 * Step 1: Cart items
 * Step 2: Delivery information
 * Step 3: Order summary
 * Step 4: Order confirmation
 */
export const cartGuard = (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const cartStore = useCartStore()
    const stepId = to.params.id as string

    // Step 1 and 2 are always accessible
    if (stepId === '1' || stepId === '2') {
        next()
        return
    }

    // Step 3 (summary) requires cart items and valid delivery form
    if (stepId === '3') {
        if (cartStore.isStep1Complete() && cartStore.isStep2Complete()) {
            next()
        } else if (cartStore.isStep1Complete()) {
            // Cart has items but form is not valid
            next('/cart/2')
        } else {
            // Cart is empty
            next('/cart/1')
        }
        return
    }

    // Step 4 (confirmation) requires all previous steps to be complete
    if (stepId === '4') {
        if (cartStore.isStep1Complete() && cartStore.isStep2Complete()) {
            next()
        } else if (cartStore.isStep1Complete()) {
            next('/cart/2')
        } else {
            next('/cart/1')
        }
        return
    }

    // Invalid step ID, redirect to step 1
    next('/cart/1')
}
