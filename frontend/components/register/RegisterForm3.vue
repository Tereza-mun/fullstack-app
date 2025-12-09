<template>
    <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div class="flex flex-col items-center">
                <!-- Success Header with Email Icon -->
                <SuccessHeader
                    :title="t('register.verifyEmailTitle')"
                    :subtitle="t('register.verifyEmailMessage')"
                    layout="centered"
                    class="mb-6"
                >
                    <template #icon>
                        <EmailIcon />
                    </template>
                </SuccessHeader>

                <!-- Warning Box -->
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 w-full">
                    <div class="flex items-start">
                        <WarningIcon />
                        <p class="text-sm text-yellow-800">
                            {{ t('register.checkSpamFolder') }}
                        </p>
                    </div>
                </div>

                <!-- Resend Email -->
                <div class="text-sm text-gray-600 text-center">
                    <p class="mb-4">{{ t('register.didntReceiveEmail') }}</p>
                    <Button
                        @click="registerStore.resendVerificationEmail"
                        :disabled="resendLoading || resendSuccess"
                        :variant="ButtonVariant.SECONDARY"
                    >
                        {{ resendLoading ? t('verify.sending') : resendSuccess ? t('register.emailResent') : t('register.resendEmail') }}
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useRegisterStore } from '../../stores/register'
import EmailIcon from '../atoms/EmailIcon.vue'
import WarningIcon from '../atoms/WarningIcon.vue'
import Button from '../atoms/Button.vue'
import SuccessHeader from '../molecules/SuccessHeader.vue'
import { ButtonVariant } from '../../types/common'

const { t } = useI18n()
const registerStore = useRegisterStore()
const { resendLoading, resendSuccess } = storeToRefs(registerStore)

// Clear registration data when leaving step 3
onBeforeUnmount(() => {
    registerStore.clearPersistedData()
})
</script>
