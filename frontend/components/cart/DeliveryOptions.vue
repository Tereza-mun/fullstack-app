<template>
    <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <div class="space-y-3">
            <label class="font-sans text-sm font-semibold text-primary-dark uppercase tracking-wider">
                {{ t('deliveryInfo.deliveryMethod') }}
            </label>

            <div class="space-y-3">
                <Radio
                    :model-value="cartStore.formData.deliveryMethod"
                    @update:model-value="cartStore.updateFormData({ deliveryMethod: $event as DeliveryMethod })"
                    value="delivery"
                    name="deliveryMethod"
                    :label="t('deliveryInfo.delivery')"
                    :description="t('deliveryInfo.deliveryDescription')"
                />

                <Radio
                    :model-value="cartStore.formData.deliveryMethod"
                    @update:model-value="cartStore.updateFormData({ deliveryMethod: $event as DeliveryMethod })"
                    value="pickup"
                    name="deliveryMethod"
                    :label="t('deliveryInfo.pickup')"
                    :description="t('deliveryInfo.pickupDescription')"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../../stores/cart'
import Radio from '../atoms/Radio.vue'

export type DeliveryMethod = 'delivery' | 'pickup'

const { t } = useI18n()
const cartStore = useCartStore()
</script>
