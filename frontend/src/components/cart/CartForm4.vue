<template>
    <div class="flex flex-col items-center justify-center px-4">
        <!-- Success Header -->
        <SuccessHeader
            :title="t('confirmation.title')"
            :subtitle="t('confirmation.thankYou')"
            class="mb-8"
        />

        <!-- Order Number -->
        <div v-if="orderId" class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6 mb-8 w-full max-w-md">
            <div class="flex flex-col items-center">
                <span class="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    {{ t('confirmation.orderNumber') }}
                </span>
                <span class="font-mono text-2xl font-bold text-primary-dark">
                    #{{ orderId }}
                </span>
            </div>
        </div>

        <!-- Demo Notice -->
        <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-8 w-full max-w-2xl">
            <div class="flex items-start">
                <svg class="w-6 h-6 text-gray-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                    <h3 class="font-bold text-primary-dark mb-2">
                        {{ t('confirmation.demoNotice') }}
                    </h3>
                    <p class="text-gray-700 leading-relaxed">
                        {{ t('confirmation.demoMessage') }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Back to Shopping Button -->
        <Button variant="primary" @click="goToProducts" class="px-8">
            {{ t('confirmation.backToShopping') }}
        </Button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import SuccessHeader from '../molecules/SuccessHeader.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const orderId = computed(() => route.query.orderId as string | undefined)

const goToProducts = () => {
    router.push('/')
}
</script>
