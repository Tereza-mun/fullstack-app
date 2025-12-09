<template>
    <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Checkout Form -->
        <form @submit.prevent="goToNextStep" class="lg:col-span-2 space-y-6">
            <CustomerData />
            <DeliveryAddress />
            <DeliveryOptions />
            <PaymentOptions />
            <OrderNotes />
        </form>

        <!-- Order Summary -->
        <OrderSummary
            :items="cartStore.items"
            :subtotal-price="cartStore.subtotalPrice"
            :delivery-cost="cartStore.deliveryCost"
            :total-price="cartStore.totalPrice"
            :total-items="cartStore.totalItems"
            :submit-disabled="!cartStore.isFormValid"
            @submit="goToNextStep"
            @back="goToCart"
        />
    </div>

    <ClientOnly>
        <div v-if="cartStore.items.length === 0" class="text-center py-16">
            <p class="text-xl text-gray-600 mb-6">{{ t('deliveryInfo.emptyCart') }}</p>
            <Button :tag="ButtonTag.NUXT_LINK" to="/" :variant="ButtonVariant.PRIMARY">{{ t('cart.continueShopping') }}</Button>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../../stores/cart'
import Button from '../atoms/Button.vue'
import CustomerData from './CustomerData.vue'
import DeliveryAddress from './DeliveryAddress.vue'
import DeliveryOptions from './DeliveryOptions.vue'
import PaymentOptions from './PaymentOptions.vue'
import OrderNotes from './OrderNotes.vue'
import OrderSummary from './OrderSummary.vue'
import { ButtonVariant, ButtonTag } from '../../types/common'

const { t } = useI18n()
const cartStore = useCartStore()

const goToCart = async () => {
    await navigateTo('/cart/1')
}

const goToNextStep = async () => {
    if (cartStore.isFormValid) {
        await navigateTo('/cart/3')
    }
}
</script>
