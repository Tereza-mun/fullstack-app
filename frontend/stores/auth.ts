import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/auth.service'
import { useCartStore } from './cart'

interface User {
    id?: number
    firstName?: string
    lastName?: string
    email?: string
    phonePrefix?: string
    phoneNumber?: string
    deliveryAddress?: string
    deliveryCity?: string
    deliveryPostalCode?: string
    deliveryCountry?: string
    billingAddress?: string
    billingCity?: string
    billingPostalCode?: string
    billingCountry?: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    const isAuthenticated = computed(() => !!user.value)

    // Email verification state
    const verifyLoading = ref(false)
    const verifySuccess = ref(false)
    const verifyError = ref(false)
    const verifyErrorMessage = ref('')

    const initAuth = () => {
        if (authService.isAuthenticated()) {
            user.value = authService.getUser()
        }
    }

    const setUser = (userData: any) => {
        user.value = userData
    }

    const logout = () => {
        authService.logout()
        user.value = null
        
        // Clear cart form data (personal info) on logout
        const cartStore = useCartStore()
        cartStore.resetFormData()
    }

    const verifyEmail = async (token: string, t: (key: string) => string) => {
        verifyLoading.value = true
        verifySuccess.value = false
        verifyError.value = false
        verifyErrorMessage.value = ''

        if (!token) {
            verifyError.value = true
            verifyErrorMessage.value = t('verify.noToken')
            verifyLoading.value = false
            return
        }

        try {
            const result = await authService.verifyEmail(token)

            if (result.success) {
                verifySuccess.value = true
                sessionStorage.setItem('emailVerified', 'true')
            } else {
                // Check if this token was already verified (reload scenario)
                const wasVerified = sessionStorage.getItem('emailVerified') === 'true'

                if (wasVerified) {
                    // Already verified, show success instead of error
                    verifySuccess.value = true
                } else {
                    verifyError.value = true
                    verifyErrorMessage.value = result.message || t('verify.invalidToken')
                }
            }
        } catch (err) {
            verifyError.value = true
            verifyErrorMessage.value = t('verify.networkError')
        } finally {
            verifyLoading.value = false
        }
    }

    return {
        user,
        isAuthenticated,
        verifyLoading,
        verifySuccess,
        verifyError,
        verifyErrorMessage,
        initAuth,
        setUser,
        logout,
        verifyEmail,
    }
})
