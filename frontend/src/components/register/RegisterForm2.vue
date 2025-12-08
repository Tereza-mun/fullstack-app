<template>
    <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <form @submit.prevent="handleSubmit">
                <div class="space-y-6">
                    <!-- Delivery Address -->
                    <div>
                        <h3 class="text-lg font-semibold text-primary-dark mb-4">{{ t('register.deliveryAddress') }}</h3>

                        <div class="space-y-4">
                            <Input
                                v-model="registerStore.formData.deliveryAddress"
                                :label="t('register.address')"
                                type="text"
                                :placeholder="t('register.addressPlaceholder')"
                                autocomplete="shipping street-address"
                                required
                            />

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    v-model="registerStore.formData.deliveryCity"
                                    :label="t('register.city')"
                                    type="text"
                                    :placeholder="t('register.cityPlaceholder')"
                                    autocomplete="shipping address-level2"
                                    required
                                />

                                <Input
                                    v-model="registerStore.formData.deliveryPostalCode"
                                    :label="t('register.postalCode')"
                                    type="text"
                                    :placeholder="t('register.postalCodePlaceholder')"
                                    autocomplete="shipping postal-code"
                                    required
                                />
                            </div>

                            <CountryAutocomplete
                                v-model="registerStore.formData.deliveryCountry"
                                :label="t('register.country')"
                                :countries="countryOptions"
                                :placeholder="t('register.countryPlaceholder')"
                                required
                            />
                        </div>
                    </div>

                    <!-- Different Billing Address Checkbox -->
                    <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <input
                            id="differentBillingAddress"
                            v-model="registerStore.differentBillingAddress"
                            type="checkbox"
                            class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                        />
                        <label for="differentBillingAddress" class="text-sm text-gray-700 cursor-pointer">
                            {{ t('register.differentBillingAddress') }}
                        </label>
                    </div>

                    <!-- Billing Address (shown when checkbox is checked) -->
                    <div v-if="registerStore.differentBillingAddress" class="border-t pt-6">
                        <h3 class="text-lg font-semibold text-primary-dark mb-4">{{ t('register.billingAddress') }}</h3>

                        <div class="space-y-4">
                            <Input
                                v-model="registerStore.formData.billingAddress"
                                :label="t('register.address')"
                                type="text"
                                :placeholder="t('register.addressPlaceholder')"
                                autocomplete="billing street-address"
                            />

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    v-model="registerStore.formData.billingCity"
                                    :label="t('register.city')"
                                    type="text"
                                    :placeholder="t('register.cityPlaceholder')"
                                    autocomplete="billing address-level2"
                                />

                                <Input
                                    v-model="registerStore.formData.billingPostalCode"
                                    :label="t('register.postalCode')"
                                    type="text"
                                    :placeholder="t('register.postalCodePlaceholder')"
                                    autocomplete="billing postal-code"
                                />
                            </div>

                            <CountryAutocomplete
                                v-model="registerStore.formData.billingCountry"
                                :label="t('register.country')"
                                :countries="countryOptions"
                                :placeholder="t('register.countryPlaceholder')"
                            />
                        </div>
                    </div>

                    <div v-if="registerStore.error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {{ registerStore.error }}
                    </div>

                    <div class="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button @click="goBack" variant="secondary" class="w-full sm:w-auto order-2 sm:order-1">
                            {{ t('register.back') }}
                        </Button>
                        <Button type="submit" :disabled="formIncomplete" class="w-full sm:flex-1 order-1 sm:order-2">
                            <span v-if="registerStore.loading">{{ t('register.creating') }}</span>
                            <span v-else>{{ t('register.createAccount') }}</span>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useRegisterStore } from '../../stores/register'
import { useAlertStore } from '../../stores/alert'
import Input from '../atoms/Input.vue'
import Button from '../atoms/Button.vue'
import CountryAutocomplete from '../atoms/CountryAutocomplete.vue'
import { COUNTRIES } from '../../constants/countries'

const router = useRouter()
const { t } = useI18n()
const registerStore = useRegisterStore()
const alertStore = useAlertStore()

const countryOptions = COUNTRIES

// Check if delivery address fields are filled
const isDeliveryAddressComplete = computed(() => {
    return !!(
        registerStore.formData.deliveryAddress &&
        registerStore.formData.deliveryCity &&
        registerStore.formData.deliveryPostalCode &&
        registerStore.formData.deliveryCountry
    )
})

// Check if billing address fields are filled (when checkbox is checked)
const isBillingAddressComplete = computed(() => {
    if (!registerStore.differentBillingAddress) {
        return true // Not required if checkbox is unchecked
    }
    return !!(
        registerStore.formData.billingAddress &&
        registerStore.formData.billingCity &&
        registerStore.formData.billingPostalCode &&
        registerStore.formData.billingCountry
    )
})

// Form is incomplete if delivery address is not complete or billing address is not complete (when required)
const formIncomplete = computed(() => {
    return !isDeliveryAddressComplete.value || !isBillingAddressComplete.value || registerStore.loading
})

const goBack = () => {
    router.push('/register/1')
}

const handleSubmit = async () => {
    const result = await registerStore.submitRegistration()

    if (result.success) {
        // Don't auto-login - user must verify email first
        router.push('/register/3')
    } else {
        alertStore.showAlert({
            message: result.error || t('register.error'),
            bgColor: 'bg-red-500',
            textColor: 'text-white'
        })
    }
}
</script>
