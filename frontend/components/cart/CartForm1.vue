<template>
    <div v-if="cartStore.items.length === 0" class="text-center py-16">
        <p class="text-xl text-gray-600 mb-6">{{ t('cart.empty') }}</p>
        <Button :tag="ButtonTag.NUXT_LINK" to="/" :variant="ButtonVariant.PRIMARY">{{ t('cart.continueShopping') }}</Button>
    </div>

    <div v-else>
        <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-6">
            <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
        </div>

        <CartSummary @checkout="goToCheckout" />
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../../stores/cart'
import Button from '../atoms/Button.vue'
import CartItem from './CartItem.vue'
import CartSummary from './CartSummary.vue'
import { ButtonVariant, ButtonTag } from '../../types/common'

const { t } = useI18n()
const cartStore = useCartStore()

const goToCheckout = async () => {
    await navigateTo('/cart/2')
}
</script>
