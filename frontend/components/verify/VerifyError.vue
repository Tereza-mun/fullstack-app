<template>
    <div class="flex flex-col items-center justify-center px-4">
        <!-- Error Header -->
        <div class="flex items-center gap-4 mb-8">
            <div class="flex-shrink-0">
                <ErrorIcon />
            </div>
            <div class="text-left">
                <h2 class="font-serif text-2xl md:text-3xl font-bold text-red-600 leading-tight">
                    {{ t('verify.error') }}
                </h2>
                <p class="text-base text-gray-600 mt-1">
                    {{ errorMessage }}
                </p>
            </div>
        </div>

        <!-- Resend Form -->
        <ResendVerificationForm />
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ErrorIcon from '../atoms/ErrorIcon.vue'
import ResendVerificationForm from './ResendVerificationForm.vue'

defineProps<{
    errorMessage: string
}>()

const { t } = useI18n()
</script>
