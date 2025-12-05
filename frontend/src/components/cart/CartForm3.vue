<template>
    <div v-if="cartStore.items.length === 0" class="text-center py-16">
        <p class="text-xl text-gray-600 mb-6">{{ t('deliveryInfo.emptyCart') }}</p>
        <Button variant="primary" @click="goToProducts">{{ t('cart.continueShopping') }}</Button>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Order Review -->
        <div class="lg:col-span-2 space-y-6">
            <!-- Customer Information -->
            <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
                <h3 class="text-xl font-bold text-primary-dark mb-4">{{ t('deliveryInfo.customerInfo') }}</h3>
                <div class="space-y-3 text-gray-700">
                    <div class="flex justify-between">
                        <span class="font-semibold">{{ t('deliveryInfo.name') }}:</span>
                        <span>{{ cartStore.formData.customerName }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">{{ t('deliveryInfo.email') }}:</span>
                        <span>{{ cartStore.formData.customerEmail }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">{{ t('deliveryInfo.phone') }}:</span>
                        <span>{{ cartStore.formData.phone }}</span>
                    </div>
                </div>
            </div>

            <!-- Delivery Address -->
            <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
                <h3 class="text-xl font-bold text-primary-dark mb-4">{{ t('deliveryInfo.addressInfo') }}</h3>
                <div class="space-y-3 text-gray-700">
                    <div class="flex justify-between">
                        <span class="font-semibold">{{ t('deliveryInfo.address') }}:</span>
                        <span>{{ cartStore.formData.address }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">{{ t('deliveryInfo.city') }}:</span>
                        <span>{{ cartStore.formData.city }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">{{ t('deliveryInfo.postalCode') }}:</span>
                        <span>{{ cartStore.formData.postalCode }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">{{ t('deliveryInfo.country') }}:</span>
                        <span>{{ cartStore.formData.country }}</span>
                    </div>
                </div>
            </div>

            <!-- Delivery & Payment Methods -->
            <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
                <h3 class="text-xl font-bold text-primary-dark mb-4">{{ t('deliveryInfo.deliveryMethod') }}</h3>
                <div class="space-y-3 text-gray-700">
                    <div class="flex justify-between">
                        <span class="font-semibold">{{ t('deliveryInfo.deliveryMethod') }}:</span>
                        <span>{{ cartStore.formData.deliveryMethod === 'delivery' ? t('deliveryInfo.delivery') : t('deliveryInfo.pickup') }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="font-semibold">{{ t('deliveryInfo.paymentMethod') }}:</span>
                        <span>{{ cartStore.formData.paymentMethod === 'cash' ? t('deliveryInfo.cash') : t('deliveryInfo.bankTransfer') }}</span>
                    </div>
                </div>
            </div>

            <!-- Order Notes -->
            <div v-if="cartStore.formData.notes" class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
                <h3 class="text-xl font-bold text-primary-dark mb-4">{{ t('deliveryInfo.notes') }}</h3>
                <p class="text-gray-700">{{ cartStore.formData.notes }}</p>
            </div>

            <!-- Cart Items -->
            <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                <div class="p-6 border-b">
                    <h3 class="text-xl font-bold text-primary-dark">{{ t('deliveryInfo.orderSummary') }}</h3>
                </div>
                <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" :readonly="true" />
            </div>
        </div>

        <!-- Order Summary with Actions -->
        <OrderSummary
            :items="cartStore.items"
            :total-price="cartStore.totalPrice"
            :total-items="cartStore.totalItems"
            :submit-button-text="t('deliveryInfo.placeOrder')"
            @submit="submitOrder"
            @back="goBack"
        />
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../../stores/cart'
import Button from '../atoms/Button.vue'
import CartItem from './CartItem.vue'
import OrderSummary from './OrderSummary.vue'

const router = useRouter()
const { t } = useI18n()
const cartStore = useCartStore()

const goToProducts = () => {
    router.push('/')
}

const goBack = () => {
    router.push('/cart/2')
}

const submitOrder = async () => {
    try {
        await cartStore.submitOrder()
        router.push('/cart/4')
    } catch (error) {
        console.error('Order submission failed:', error)
    }
}
</script>
