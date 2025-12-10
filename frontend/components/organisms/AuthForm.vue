<template>
    <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <form @submit.prevent="handleSubmit">
            <div class="space-y-6">
                <Input
                    v-model="email"
                    :label="t('login.email')"
                    type="text"
                    :placeholder="t('login.emailPlaceholder')"
                    :error="emailError"
                    autocomplete="email"
                    @input="emailError = ''"
                />

                <div class="relative">
                    <Input
                        v-model="password"
                        :label="t('login.password')"
                        :type="showPassword ? 'text' : 'password'"
                        :placeholder="t('login.passwordPlaceholder')"
                        :error="passwordError"
                        autocomplete="current-password"
                        @input="passwordError = ''"
                    />
                    <Button
                        :variant="ButtonVariant.EYE_ICON"
                        :type="ButtonType.BUTTON"
                        @click="showPassword = !showPassword"
                        :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    >
                        <Eye v-if="showPassword" />
                        <EyeSlash v-else />
                    </Button>
                </div>

                <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {{ error }}
                </div>

                <Button
                    :variant="ButtonVariant.PRIMARY"
                    :tag="ButtonTag.BUTTON"
                    :type="ButtonType.SUBMIT"
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
import Eye from '../icons/Eye.vue'
import EyeSlash from '../icons/EyeSlash.vue'
import { authService } from '../../services/auth.service'
import { useAlertStore } from '../../stores/alert'
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'
import { validateEmail } from '../../utils/validators'
import { ButtonVariant, ButtonTag, ButtonType } from '../../types/common'

const emit = defineEmits<{
    success: []
}>()

const { t } = useI18n()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const emailError = ref('')
const passwordError = ref('')
const showPassword = ref(false)
const alertStore = useAlertStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

const handleSubmit = async () => {
    loading.value = true
    error.value = ''
    emailError.value = ''
    passwordError.value = ''

    // Validate required fields
    let hasErrors = false

    if (!email.value) {
        emailError.value = t('validation.required')
        hasErrors = true
    } else {
        // Validate email format
        const emailValidation = validateEmail(email.value)
        if (!emailValidation.isValid) {
            emailError.value = t('validation.invalidEmail')
            hasErrors = true
        }
    }

    if (!password.value) {
        passwordError.value = t('validation.required')
        hasErrors = true
    }

    if (hasErrors) {
        loading.value = false
        return
    }

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
