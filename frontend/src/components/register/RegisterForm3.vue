<template>
    <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
            <div class="mb-6">
                <!-- Email Icon -->
                <EmailIcon class="mb-4" />

                <h2 class="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-primary-dark tracking-tight mb-4">
                    {{ t('register.verifyEmailTitle') }}
                </h2>

                <p class="text-lg text-gray-700 mb-4">
                    {{ t('register.verifyEmailMessage') }}
                </p>

                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div class="flex items-start">
                        <WarningIcon />
                        <p class="text-sm text-yellow-800">
                            {{ t('register.checkSpamFolder') }}
                        </p>
                    </div>
                </div>

                <div class="text-sm text-gray-600 mb-6">
                    <p class="mb-4">{{ t('register.didntReceiveEmail') }}</p>
                    <Button
                        @click="resendEmail"
                        :disabled="resendLoading || resendSuccess"
                        variant="secondary"
                    >
                        {{ resendLoading ? t('verify.sending') : resendSuccess ? t('register.emailResent') : t('register.resendEmail') }}
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRegisterStore } from '../../stores/register'
import EmailIcon from '../atoms/EmailIcon.vue'
import WarningIcon from '../atoms/WarningIcon.vue'
import Button from '../atoms/Button.vue'

const { t } = useI18n()
const registerStore = useRegisterStore()

const resendLoading = ref(false)
const resendSuccess = ref(false)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Get user data from the register store (before it's cleared)
const user = computed(() => ({
    firstName: registerStore.formData.firstName,
    lastName: registerStore.formData.lastName,
    email: registerStore.sensitiveData.email,
    phonePrefix: registerStore.formData.phonePrefix,
    phoneNumber: registerStore.formData.phoneNumber,
}))

const resendEmail = async () => {
    resendLoading.value = true
    resendSuccess.value = false

    try {
        await fetch(`${API_URL}/auth/resend-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.value.email }),
        })
        resendSuccess.value = true
    } catch (err) {
        // Silent fail - don't reveal if email exists
        resendSuccess.value = true // Show success anyway for security
    } finally {
        resendLoading.value = false
    }
}
</script>
