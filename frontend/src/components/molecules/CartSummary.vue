<template>
    <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold text-primary-dark">{{ t('cart.subtotal') }}</span>
            <span class="font-mono text-2xl font-bold text-accent">€{{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="flex flex-col sm:flex-row justify-center sm:justify-between gap-4">
            <Button type="secondary" @click="handleClearCart">{{ t('cart.clearCart') }}</Button>
            <Button type="primary" @click="handleCheckout">{{ t('cart.checkout') }}</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import { useCartStore } from '../../stores/cart'

const { t } = useI18n()

const cartStore = useCartStore()

const totalPrice = computed(() => cartStore.totalPrice)

const handleClearCart = () => {
    cartStore.clearCart()
}

const emit = defineEmits<{
    checkout: []
}>()

const handleCheckout = () => {
    emit('checkout')
}
</script>
