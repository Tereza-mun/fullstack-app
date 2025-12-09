<template>
    <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6 w-full max-w-md">
        <h3 class="font-serif text-lg font-bold text-primary-dark mb-4">
            {{ t('verify.resendTitle') }}
        </h3>
        <form @submit.prevent="handleResend">
            <Input
                v-model="email"
                type="email"
                :label="t('register.email')"
                :placeholder="t('register.emailPlaceholder')"
                required
            />
            <Button
                type="submit"
                :variant="ButtonVariant.PRIMARY"
                class="w-full mt-4"
                :disabled="loading"
            >
                {{ loading ? t('verify.sending') : t('verify.resendButton') }}
            </Button>
            <p v-if="resendSuccess" class="text-green-600 text-sm mt-3 text-center">
                {{ t('verify.resendSuccess') }}
            </p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import Input from '../atoms/Input.vue'
import { ButtonVariant } from '../../types/common'
import { authService } from '../../services/auth.service'

const { t } = useI18n()

const email = ref('')
const loading = ref(false)
const resendSuccess = ref(false)

const handleResend = async () => {
    loading.value = true
    resendSuccess.value = false

    try {
        await authService.resendVerificationEmail(email.value)
        resendSuccess.value = true
    } catch (err) {
        // Silent fail - don't reveal if email exists
        resendSuccess.value = true // Show success anyway for security
    } finally {
        loading.value = false
    }
}
</script>
