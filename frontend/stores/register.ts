import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '../services/auth.service'

export const useRegisterStore = defineStore('register', () => {
    // Non-sensitive form data (can be persisted)
    const formData = ref({
        firstName: '',
        lastName: '',
        phonePrefix: '+420',
        phoneNumber: '',
        billingAddress: '',
        billingCity: '',
        billingPostalCode: '',
        billingCountry: '',
        deliveryAddress: '',
        deliveryCity: '',
        deliveryPostalCode: '',
        deliveryCountry: '',
    })

    // Sensitive data - NEVER persisted to localStorage
    const sensitiveData = ref({
        email: '',
        password: '',
    })

    const differentBillingAddress = ref(false)
    const loading = ref(false)
    const error = ref('')

    // Clear sensitive data (password and email)
    const clearSensitiveData = () => {
        sensitiveData.value = {
            email: '',
            password: '',
        }
    }

    const resetForm = () => {
        formData.value = {
            firstName: '',
            lastName: '',
            phonePrefix: '+420',
            phoneNumber: '',
            billingAddress: '',
            billingCity: '',
            billingPostalCode: '',
            billingCountry: '',
            deliveryAddress: '',
            deliveryCity: '',
            deliveryPostalCode: '',
            deliveryCountry: '',
        }
        clearSensitiveData()
        differentBillingAddress.value = false
        error.value = ''
    }

    // Clear all persisted registration data from storage
    const clearPersistedData = () => {
        resetForm()
        // Remove persisted store data from localStorage
        localStorage.removeItem('register')
    }

    // Validation functions for step access control
    const isStep1Complete = () => {
        return !!(
            formData.value.firstName &&
            formData.value.lastName &&
            sensitiveData.value.email &&
            sensitiveData.value.password &&
            formData.value.phonePrefix &&
            formData.value.phoneNumber
        )
    }

    const isStep2Complete = () => {
        return !!(
            formData.value.deliveryAddress &&
            formData.value.deliveryCity &&
            formData.value.deliveryPostalCode &&
            formData.value.deliveryCountry
        )
    }

    const checkEmailExists = async (email: string): Promise<boolean> => {
        try {
            return await authService.checkEmailExists(email)
        } catch (err) {
            console.error('Failed to check email:', err)
            // If the endpoint fails, return false to allow registration to proceed
            return false
        }
    }

    const submitRegistration = async (language?: string, recaptchaToken?: string) => {
        loading.value = true
        error.value = ''

        try {
            // Normalize email to lowercase
            const normalizedEmail = sensitiveData.value.email.toLowerCase()

            // For billing address, if checkbox is not checked, use delivery address
            const billingAddress = differentBillingAddress.value
                ? formData.value.billingAddress
                : formData.value.deliveryAddress

            const billingCity = differentBillingAddress.value
                ? formData.value.billingCity
                : formData.value.deliveryCity

            const billingPostalCode = differentBillingAddress.value
                ? formData.value.billingPostalCode
                : formData.value.deliveryPostalCode

            const billingCountry = differentBillingAddress.value
                ? formData.value.billingCountry
                : formData.value.deliveryCountry

            const response = await authService.register({
                email: normalizedEmail,
                password: sensitiveData.value.password,
                firstName: formData.value.firstName,
                lastName: formData.value.lastName,
                phonePrefix: formData.value.phonePrefix,
                phoneNumber: formData.value.phoneNumber,
                deliveryAddress: formData.value.deliveryAddress,
                deliveryCity: formData.value.deliveryCity,
                deliveryPostalCode: formData.value.deliveryPostalCode,
                deliveryCountry: formData.value.deliveryCountry,
                billingAddress: billingAddress || undefined,
                billingCity: billingCity || undefined,
                billingPostalCode: billingPostalCode || undefined,
                billingCountry: billingCountry || undefined,
                language: language || 'en',
                recaptchaToken: recaptchaToken,
            })

            // Clear all persisted registration data after successful submission
            clearPersistedData()

            // Return user data for auto-login
            return { success: true, user: response.user }
        } catch (err: any) {
            error.value = err.message || 'Registration failed'
            return { success: false, error: error.value }
        } finally {
            loading.value = false
        }
    }

    // Clear sensitive data when page is about to unload (browser close, refresh, navigate away)
    if (typeof window !== 'undefined') {
        const handleBeforeUnload = () => {
            clearSensitiveData()
        }
        window.addEventListener('beforeunload', handleBeforeUnload)

        // Note: In Vue 3 with Pinia, we can't use onUnmounted in store setup
        // The beforeunload listener handles cleanup when user leaves the page
    }

    return {
        formData,
        sensitiveData,
        differentBillingAddress,
        loading,
        error,
        resetForm,
        clearPersistedData,
        clearSensitiveData,
        checkEmailExists,
        submitRegistration,
        isStep1Complete,
        isStep2Complete,
    }
}, {
    persist: {
        // Only persist non-sensitive address/name data
        // Email and password are NEVER persisted
        pick: ['formData', 'differentBillingAddress'],
    }
})
