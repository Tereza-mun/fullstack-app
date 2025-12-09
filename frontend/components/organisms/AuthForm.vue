<template>
    <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <form @submit.prevent="handleSubmit">
            <div class="space-y-6">
                <Input
                    v-model="email"
                    :label="t('login.email')"
                    type="email"
                    required
                    :placeholder="t('login.emailPlaceholder')"
                    autocomplete="email"
                />

                <Input
                    v-model="password"
                    :label="t('login.password')"
                    type="password"
                    required
                    :placeholder="t('login.passwordPlaceholder')"
                    autocomplete="current-password"
                />

                <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {{ error }}
                </div>

                <Button 
                    :variant="ButtonVariant.PRIMARY" 
                    type="submit" 
                    class="w-full">
                    <span v-if="loading">{{ t('login.loading') }}</span>
                    <span v-else>{{ t('login.submit') }}</span>
                </Button>

                <div class="text-center text-sm text-gray-600">
                    {{ t('login.noAccount') }}
                    <Button 
                        :tag="ButtonTag.NUXT_LINK" 
                        :variant="ButtonVariant.LINK" 
                        to="/register/1">
                        {{ t('login.register') }}
                    </Button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import Input from '../atoms/Input.vue'
import { authService } from '../../services/auth.service'
import { useAlertStore } from '../../stores/alert'
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'
import { ButtonVariant, ButtonTag } from '../../types/common'

const emit = defineEmits<{
    success: []
}>()

const { t } = useI18n()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const alertStore = useAlertStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

const handleSubmit = async () => {
    loading.value = true
    error.value = ''

    try {
        const response = await authService.login({
            email: email.value,
            password: password.value
        })

        // Update auth store with user data
        authStore.setUser(response.user)

        // Prefill cart form with user data
        cartStore.prefillFromUserData(response.user)

        alertStore.showAlert({
            message: t('login.success'),
            bgColor: 'bg-green-500',
            textColor: 'text-white'
        })

        emit('success')
    } catch (err: any) {
        // Handle different error types
        let alertMessage = t('login.error')

        if (err.message === 'TOO_MANY_REQUESTS') {
            error.value = t('login.rateLimitError')
            alertMessage = t('login.rateLimitError')
        } else if (err.message?.includes('verify your email')) {
            error.value = t('login.emailNotVerified')
            alertMessage = t('login.emailNotVerified')
        } else {
            error.value = t('login.error')
        }

        alertStore.showAlert({
            message: alertMessage,
            bgColor: 'bg-red-500',
            textColor: 'text-white'
        })
    } finally {
        loading.value = false
    }
}
</script>
