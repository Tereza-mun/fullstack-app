<template>
    <Container>
        <div class="max-w-md mx-auto">
            <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <!-- Loading State -->
                <div v-if="loading" class="text-center">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <p class="text-gray-600">{{ t('verify.verifying') }}</p>
                </div>

                <!-- Success State -->
                <div v-else-if="success" class="text-center">
                    <div class="w-16 h-16 mx-auto mb-4">
                        <CheckIcon />
                    </div>
                    <h2 class="text-2xl font-bold text-primary-dark mb-2">{{ t('verify.success') }}</h2>
                    <p class="text-gray-600 mb-6">{{ t('verify.successMessage') }}</p>
                    <Button @click="goToLogin" variant="primary" class="w-full">
                        {{ t('verify.goToLogin') }}
                    </Button>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="text-center">
                    <ErrorIcon class="mb-4" />
                    <h2 class="text-2xl font-bold text-red-600 mb-2">{{ t('verify.error') }}</h2>
                    <p class="text-gray-600 mb-6">{{ errorMessage }}</p>
                    <div class="space-y-3">
                        <Button @click="showResendForm = true" variant="secondary" class="w-full">
                            {{ t('verify.resendLink') }}
                        </Button>
                    </div>
                </div>

                <!-- Resend Form -->
                <div v-if="showResendForm" class="mt-6 pt-6 border-t">
                    <h3 class="text-lg font-semibold mb-4">{{ t('verify.resendTitle') }}</h3>
                    <form @submit.prevent="resendVerification">
                        <Input
                            v-model="resendEmail"
                            type="email"
                            :label="t('register.email')"
                            :placeholder="t('register.emailPlaceholder')"
                            required
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            class="w-full mt-4"
                            :disabled="resendLoading"
                        >
                            {{ resendLoading ? t('verify.sending') : t('verify.resendButton') }}
                        </Button>
                        <p v-if="resendSuccess" class="text-green-600 text-sm mt-2">
                            {{ t('verify.resendSuccess') }}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </Container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Container from '../components/molecules/Container.vue'
import CheckIcon from '../components/atoms/CheckIcon.vue'
import ErrorIcon from '../components/atoms/ErrorIcon.vue'
import Button from '../components/atoms/Button.vue'
import Input from '../components/atoms/Input.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(true)
const success = ref(false)
const error = ref(false)
const errorMessage = ref('')
const showResendForm = ref(false)
const resendEmail = ref('')
const resendLoading = ref(false)
const resendSuccess = ref(false)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

onMounted(async () => {
    const token = route.query.token as string

    if (!token) {
        error.value = true
        errorMessage.value = t('verify.noToken')
        loading.value = false
        return
    }

    try {
        const response = await fetch(`${API_URL}/auth/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })

        if (response.ok) {
            success.value = true
            // Store success in sessionStorage so reload doesn't show error
            sessionStorage.setItem('emailVerified', 'true')
        } else {
            const data = await response.json()

            // Check if this token was already verified (reload scenario)
            const wasVerified = sessionStorage.getItem('emailVerified') === 'true'

            if (wasVerified) {
                // Already verified, show success instead of error
                success.value = true
            } else {
                error.value = true
                errorMessage.value = data.message || t('verify.invalidToken')
            }
        }
    } catch (err) {
        error.value = true
        errorMessage.value = t('verify.networkError')
    } finally {
        loading.value = false
    }
})

const goToLogin = () => {
    router.push('/login')
}

const resendVerification = async () => {
    resendLoading.value = true
    resendSuccess.value = false

    try {
        const response = await fetch(`${API_URL}/auth/resend-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: resendEmail.value }),
        })

        if (response.ok) {
            resendSuccess.value = true
            setTimeout(() => {
                showResendForm.value = false
            }, 3000)
        }
    } catch (err) {
        // Silent fail - don't reveal if email exists
    } finally {
        resendLoading.value = false
    }
}
</script>
