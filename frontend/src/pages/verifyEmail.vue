<template>
    <Container>
        <div class="max-w-2xl mx-auto">
            <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <VerifyLoading v-if="loading" />
                <VerifySuccess v-else-if="success" @go-to-login="goToLogin" />
                <VerifyError v-else-if="error" :error-message="errorMessage" />
            </div>
        </div>
    </Container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Container from '../components/molecules/Container.vue'
import VerifyLoading from '../components/verify/VerifyLoading.vue'
import VerifySuccess from '../components/verify/VerifySuccess.vue'
import VerifyError from '../components/verify/VerifyError.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(true)
const success = ref(false)
const error = ref(false)
const errorMessage = ref('')

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
</script>
