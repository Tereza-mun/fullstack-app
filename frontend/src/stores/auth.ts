import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/auth.service'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<{ id?: number; firstName?: string; lastName?: string; email?: string } | null>(null)

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
    }

    return {
        user,
        isAuthenticated,
        initAuth,
        setUser,
        logout,
    }
})
