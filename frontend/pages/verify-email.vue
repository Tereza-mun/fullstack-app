<template>
    <Container>
        <div class="max-w-2xl mx-auto">
            <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <VerifyLoading v-if="verifyLoading" />
                <VerifySuccess v-else-if="verifySuccess" />
                <VerifyError v-else-if="verifyError" :error-message="verifyErrorMessage" />
            </div>
        </div>
    </Container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'
import Container from '../components/molecules/Container.vue'
import VerifyLoading from '../components/verify/VerifyLoading.vue'
import VerifySuccess from '../components/verify/VerifySuccess.vue'
import VerifyError from '../components/verify/VerifyError.vue'

const route = useRoute()
const { t } = useI18n()
const authStore = useAuthStore()
const { verifyLoading, verifySuccess, verifyError, verifyErrorMessage } = storeToRefs(authStore)

onMounted(async () => {
    const token = route.query.token as string
    await authStore.verifyEmail(token, t)
})
</script>
