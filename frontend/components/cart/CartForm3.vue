<template>
    <div v-if="cartStore.items.length === 0" class="text-center py-16">
        <p class="text-xl text-gray-600 mb-6">{{ t('deliveryInfo.emptyCart') }}</p>
        <Button :variant="ButtonVariant.PRIMARY" @click="goToProducts">{{ t('cart.continueShopping') }}</Button>
    </div>

    <div v-else class="space-y-6">
        <!-- Error Alert -->
        <div v-if="errorMessage" class="bg-red-50 border-2 border-red-200 rounded-xl p-4">
            <div class="flex items-start">
                <svg class="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                    <h3 class="font-bold text-red-900 mb-1">{{ t('deliveryInfo.orderError') }}</h3>
                    <p class="text-red-800">{{ errorMessage }}</p>
                </div>
                <button @click="errorMessage = ''" class="ml-auto text-red-600 hover:text-red-800">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Order Review -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Customer Information -->
                <OrderReviewSection :title="t('deliveryInfo.customerInfo')">
                    <OrderReviewField 
                        :label="t('deliveryInfo.name')" 
                        :value="fullName" 
                    />
                    <OrderReviewField 
                        :label="t('deliveryInfo.email')" 
                        :value="cartStore.formData.customerEmail" 
                    />
                    <OrderReviewField 
                        :label="t('deliveryInfo.phone')" 
                        :value="formattedPhone" 
                    />
                </OrderReviewSection>

                <!-- Delivery Address -->
                <OrderReviewSection :title="t('deliveryInfo.addressInfo')">
                    <OrderReviewField 
                        :label="t('deliveryInfo.address')" 
                        :value="cartStore.formData.address" 
                    />
                    <OrderReviewField 
                        :label="t('deliveryInfo.city')" 
                        :value="cartStore.formData.city" 
                    />
                    <OrderReviewField 
                        :label="t('deliveryInfo.postalCode')" 
                        :value="cartStore.formData.postalCode" 
                    />
                    <OrderReviewField 
                        :label="t('deliveryInfo.country')" 
                        :value="formattedCountry" 
                    />
                </OrderReviewSection>

                <!-- Delivery & Payment Methods -->
                <OrderReviewSection :title="t('deliveryInfo.deliveryMethod')">
                    <OrderReviewField 
                        :label="t('deliveryInfo.deliveryMethod')" 
                        :value="formattedDeliveryMethod" 
                    />
                    <OrderReviewField 
                        :label="t('deliveryInfo.paymentMethod')" 
                        :value="formattedPaymentMethod" 
                    />
                </OrderReviewSection>

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
                :subtotal-price="cartStore.subtotalPrice"
                :delivery-cost="cartStore.deliveryCost"
                :total-price="cartStore.totalPrice"
                :total-items="cartStore.totalItems"
                :submit-button-text="t('deliveryInfo.placeOrder')"
                :is-submitting="isSubmitting"
                @submit="submitOrder"
                @back="goBack"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../../stores/cart'
import Button from '../atoms/Button.vue'
import OrderReviewField from '../atoms/OrderReviewField.vue'
import OrderReviewSection from '../molecules/OrderReviewSection.vue'
import CartItem from './CartItem.vue'
import OrderSummary from './OrderSummary.vue'
import { ButtonVariant } from '../../types/common'

const router = useRouter()
const { t } = useI18n()
const cartStore = useCartStore()

const isSubmitting = ref(false)
const errorMessage = ref('')

const fullName = computed(() => 
    `${cartStore.formData.firstName} ${cartStore.formData.lastName}`
)

const formattedPhone = computed(() => 
    `${cartStore.formData.phonePrefix}${cartStore.formData.phoneNumber}`
)

const formattedCountry = computed(() => 
    t(`country.${cartStore.formData.country?.toLowerCase?.()}`)
)

const formattedDeliveryMethod = computed(() => 
    cartStore.formData.deliveryMethod === 'delivery' 
        ? t('deliveryInfo.delivery') 
        : t('deliveryInfo.pickup')
)

const formattedPaymentMethod = computed(() => 
    cartStore.formData.paymentMethod === 'cash' 
        ? t('deliveryInfo.cash') 
        : t('deliveryInfo.bankTransfer')
)

const goToProducts = () => {
    router.push('/')
}

const goBack = () => {
    router.push('/cart/2')
}

const submitOrder = async () => {
    isSubmitting.value = true
    errorMessage.value = ''

    try {
        const order = await cartStore.submitOrder()
        router.push({ path: '/cart/4', query: { orderId: order.id } })
    } catch (error: any) {
        console.error('Order submission failed:', error)

        // Extract error message
        if (error.response?.data?.message) {
            if (Array.isArray(error.response.data.message)) {
                errorMessage.value = error.response.data.message.join(', ')
            } else {
                errorMessage.value = error.response.data.message
            }
        } else if (error.message) {
            errorMessage.value = error.message
        } else {
            errorMessage.value = t('deliveryInfo.error')
        }

        // Scroll to top to show error
        window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
        isSubmitting.value = false
    }
}
</script>
