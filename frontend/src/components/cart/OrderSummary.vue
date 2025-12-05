<template>
    <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6 sticky top-6">
            <h3 class="text-xl font-bold text-primary-dark mb-4">{{ t('deliveryInfo.orderSummary') }}</h3>

            <div class="space-y-3 mb-6">
                <div v-for="item in items" :key="item.id" class="flex justify-between text-sm">
                    <span class="text-gray-600">
                        {{ item.name[$i18n.locale as 'en' | 'cs'] }} × {{ item.quantity }}
                    </span>
                    <span class="font-semibold">€{{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
            </div>

            <div class="border-t border-gray-200 pt-3 mb-3">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">{{ t('deliveryInfo.subtotal') }}</span>
                    <span class="font-semibold">€{{ subtotalPrice.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm mt-2">
                    <span class="text-gray-600">{{ t('deliveryInfo.deliveryCost') }}</span>
                    <span class="font-semibold">
                        <span v-if="deliveryCost === 0">{{ t('deliveryInfo.free') }}</span>
                        <span v-else>€{{ deliveryCost.toFixed(2) }}</span>
                    </span>
                </div>
            </div>

            <div class="border-t border-gray-200 pt-4 mb-6">
                <div class="flex justify-between items-center">
                    <span class="text-lg font-semibold text-primary-dark">{{ t('deliveryInfo.total') }}</span>
                    <span class="font-mono text-2xl font-bold text-accent">€{{ totalPrice.toFixed(2) }}</span>
                </div>
                <div class="text-sm text-gray-500 mt-2">
                    {{ t('deliveryInfo.itemsCount', { count: totalItems }) }}
                </div>
            </div>

            <!-- Submit Buttons -->
            <div class="flex flex-col gap-3">
                <Button 
                    type="primary" 
                    @click="$emit('submit')" 
                    :disabled="submitDisabled" 
                    class="w-full"
                >
                    <span v-if="isSubmitting">{{ t('deliveryInfo.processing') }}</span>
                    <span v-else>{{ submitButtonText || t('cart.continue') }}</span>
                </Button>
                <Button 
                    type="secondary" 
                    @click="$emit('back')" 
                    class="w-full"
                >
                    {{ backButtonText || t('deliveryInfo.back') }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'

export interface CartItem {
    id: number
    name: { en: string; cs: string }
    price: number
    quantity: number
}

defineProps<{
    items: CartItem[]
    subtotalPrice: number
    deliveryCost: number
    totalPrice: number
    totalItems: number
    isSubmitting?: boolean
    submitDisabled?: boolean
    submitButtonText?: string
    backButtonText?: string
}>()

defineEmits<{
    submit: []
    back: []
}>()

const { t } = useI18n()
</script>
