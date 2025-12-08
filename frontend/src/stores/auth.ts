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

    return {
        user,
        isAuthenticated,
        initAuth,
        setUser,
        logout,
    }
})
