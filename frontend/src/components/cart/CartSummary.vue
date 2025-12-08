<template>
    <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold text-primary-dark">{{ t('cart.subtotal') }}</span>
            <span class="font-mono text-2xl font-bold text-accent">€{{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="flex flex-col sm:flex-row justify-center sm:justify-between gap-4">
            <Button :variant="ButtonVariant.SECONDARY" @click="handleClearCart">{{ t('cart.clearCart') }}</Button>
            <Button :variant="ButtonVariant.PRIMARY" @click="handleCheckout">{{ t('cart.continue') }}</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import { useCartStore } from '../../stores/cart'
import { useAlertStore } from '../../stores/alert'
import { ButtonVariant } from '../../types/common'

const { t } = useI18n()

const cartStore = useCartStore()
const alertStore = useAlertStore()

const totalPrice = computed(() => cartStore.totalPrice)

const handleClearCart = () => {
    cartStore.clearCart()
    alertStore.showAlert({
        message: `${t('cart.clearedCart')}`,
        bgColor: 'bg-red-500',
        textColor: 'text-white'
    })
}

const emit = defineEmits<{
    checkout: []
}>()

const handleCheckout = () => {
    emit('checkout')
}
</script>
