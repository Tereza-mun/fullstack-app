<template>
    <div class="flex flex-col items-center justify-center px-4">
        <!-- Success Header -->
        <SuccessHeader
            :title="t('verify.success')"
            :subtitle="t('verify.successMessage')"
            class="mb-8"
        />

        <!-- Info Box -->
        <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-8 w-full max-w-md">
            <div class="flex items-start">
                <svg class="w-6 h-6 text-gray-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                    <p class="text-gray-700 leading-relaxed">
                        {{ t('verify.canNowLogin') }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Go to Login Button -->
        <Button 
            :tag="ButtonTag.NUXT_LINK"
            to="/login"
            :variant="ButtonVariant.PRIMARY" 
            class="px-8">
            {{ t('verify.goToLogin') }}
        </Button>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import SuccessHeader from '../molecules/SuccessHeader.vue'
import { ButtonVariant, ButtonTag } from '../../types/common'

const { t } = useI18n()
</script>
