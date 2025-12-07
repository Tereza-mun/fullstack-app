<template>
    <Container>
        <div class="max-w-md mx-auto mt-8 md:mt-16">
            <h2 class="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-center mb-6 md:mb-8 text-primary-dark tracking-tight">
                {{ t('login.title') }}
            </h2>

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

                        <Button variant="primary" type="submit" class="w-full">
                            <span v-if="loading">{{ t('login.loading') }}</span>
                            <span v-else>{{ t('login.submit') }}</span>
                        </Button>

                        <div class="text-center text-sm text-gray-600">
                            {{ t('login.noAccount') }}
                            <a href="#" @click.prevent="goToRegister" class="text-primary hover:text-primary-dark hover:underline font-medium">
                                {{ t('login.register') }}
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Container from '../components/molecules/Container.vue'
import Button from '../components/atoms/Button.vue'
import Input from '../components/atoms/Input.vue'
import { authService } from '../services/auth.service'
import { useAlertStore } from '../stores/alert'
import { useAuthStore } from '../stores/auth'

const { t } = useI18n()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const alertStore = useAlertStore()
const authStore = useAuthStore()

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

        alertStore.showAlert({
            message: t('login.success'),
            bgColor: 'bg-green-500',
            textColor: 'text-white'
        })
        // After successful login, redirect to home
        router.push('/')
    } catch (err: any) {
        // Only show rate limiting error in the form
        if (err.message === 'TOO_MANY_REQUESTS') {
            error.value = t('login.rateLimitError')
        }
        // Show all errors in alert
        const alertMessage = err.message === 'TOO_MANY_REQUESTS'
            ? t('login.rateLimitError')
            : t('login.error')

        alertStore.showAlert({
            message: alertMessage,
            bgColor: 'bg-red-500',
            textColor: 'text-white'
        })
    } finally {
        loading.value = false
    }
}

const goToRegister = () => {
    router.push('/register/1')
}
</script>
