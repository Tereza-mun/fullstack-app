<template>
    <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <div class="space-y-3">
            <label class="font-sans text-sm font-semibold text-primary-dark uppercase tracking-wider">
                {{ t('deliveryInfo.paymentMethod') }}
            </label>

            <div class="space-y-3">
                <Radio
                    :model-value="cartStore.formData.paymentMethod"
                    @update:model-value="cartStore.updateFormData({ paymentMethod: $event as PaymentMethod })"
                    value="cash"
                    name="paymentMethod"
                    :label="t('deliveryInfo.cash')"
                    :description="t('deliveryInfo.cashDescription')"
                />

                <Radio
                    :model-value="cartStore.formData.paymentMethod"
                    @update:model-value="cartStore.updateFormData({ paymentMethod: $event as PaymentMethod })"
                    value="bank_transfer"
                    name="paymentMethod"
                    :label="t('deliveryInfo.bankTransfer')"
                    :description="t('deliveryInfo.bankTransferDescription')"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../../stores/cart'
import Radio from '../atoms/Radio.vue'

export type PaymentMethod = 'cash' | 'bank_transfer'

const { t } = useI18n()
const cartStore = useCartStore()
</script>
