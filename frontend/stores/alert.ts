import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface AlertConfig {
    message: string
    textColor?: string
    bgColor?: string
}

export const useAlertStore = defineStore('alert', () => {
    const isVisible = ref(false)
    const message = ref('')
    const textColor = ref('text-white')
    const bgColor = ref('bg-green-500')
    let timeoutId: number | null = null

    const showAlert = (config: AlertConfig) => {
        // Clear any existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        message.value = config.message
        textColor.value = config.textColor || 'text-white'
        bgColor.value = config.bgColor || 'bg-green-500'
        isVisible.value = true

        // Auto-hide after 5 seconds
        timeoutId = setTimeout(() => {
            hideAlert()
        }, 5000) as unknown as number
    }

    const hideAlert = () => {
        isVisible.value = false
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
    }

    return {
        isVisible,
        message,
        textColor,
        bgColor,
        showAlert,
        hideAlert
    }
})
