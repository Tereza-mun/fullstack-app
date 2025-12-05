<template>
    <div v-if="cartStore.items.length === 0" class="text-center py-16">
        <p class="text-xl text-gray-600 mb-6">{{ t('cart.empty') }}</p>
        <Button variant="primary" @click="goToProducts">{{ t('cart.continueShopping') }}</Button>
    </div>

    <div v-else>
        <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-6">
            <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
        </div>

        <CartSummary @checkout="goToCheckout" />
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../../stores/cart'
import Button from '../atoms/Button.vue'
import CartItem from './CartItem.vue'
import CartSummary from './CartSummary.vue'

const router = useRouter()
const { t } = useI18n()
const cartStore = useCartStore()

const goToProducts = () => {
    router.push('/')
}

const goToCheckout = () => {
    router.push('/cart/2')
}
</script>
