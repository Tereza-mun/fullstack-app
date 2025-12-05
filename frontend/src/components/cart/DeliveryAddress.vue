<template>
    <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <h3 class="text-xl font-bold text-primary-dark mb-6">{{ t('deliveryInfo.addressInfo') }}</h3>

        <div class="space-y-6">
            <!-- Address -->
            <Input
                :model-value="cartStore.formData.address"
                @update:model-value="cartStore.updateFormData({ address: String($event ?? '') })"
                :label="t('deliveryInfo.address')"
                type="text"
                name="address"
                :placeholder="t('deliveryInfo.addressPlaceholder')"
                autocomplete="street-address"
                required
            />

            <!-- City and Postal Code -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    :model-value="cartStore.formData.city"
                    @update:model-value="cartStore.updateFormData({ city: String($event ?? '') })"
                    :label="t('deliveryInfo.city')"
                    type="text"
                    name="city"
                    :placeholder="t('deliveryInfo.cityPlaceholder')"
                    autocomplete="address-level2"
                    required
                />

                <Input
                    :model-value="cartStore.formData.postalCode"
                    @update:model-value="cartStore.updateFormData({ postalCode: String($event ?? '') })"
                    :label="t('deliveryInfo.postalCode')"
                    type="text"
                    name="postalCode"
                    :placeholder="t('deliveryInfo.postalCodePlaceholder')"
                    autocomplete="postal-code"
                    required
                />
            </div>

            <!-- Country -->
            <Input
                :model-value="cartStore.formData.country"
                @update:model-value="cartStore.updateFormData({ country: String($event ?? '') })"
                :label="t('deliveryInfo.country')"
                type="text"
                name="country"
                :placeholder="t('deliveryInfo.countryPlaceholder')"
                autocomplete="country-name"
                required
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../../stores/cart'
import Input from '../atoms/Input.vue'

const { t } = useI18n()
const cartStore = useCartStore()
</script>
