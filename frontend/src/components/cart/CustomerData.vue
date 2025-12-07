<template>
    <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <h3 class="text-xl font-bold text-primary-dark mb-6">{{ t('deliveryInfo.customerInfo') }}</h3>

        <div class="space-y-6">
            <!-- Customer Name -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    :model-value="cartStore.formData.firstName"
                    @update:model-value="cartStore.updateFormData({ firstName: String($event ?? '') })"
                    :label="t('deliveryInfo.firstName')"
                    type="text"
                    name="firstName"
                    :placeholder="t('deliveryInfo.firstNamePlaceholder')"
                    autocomplete="given-name"
                    required
                />

                <Input
                    :model-value="cartStore.formData.lastName"
                    @update:model-value="cartStore.updateFormData({ lastName: String($event ?? '') })"
                    :label="t('deliveryInfo.lastName')"
                    type="text"
                    name="lastName"
                    :placeholder="t('deliveryInfo.lastNamePlaceholder')"
                    autocomplete="family-name"
                    required
                />
            </div>

            <!-- Email -->
            <Input
                :model-value="cartStore.formData.customerEmail"
                @update:model-value="handleEmailUpdate"
                :label="t('deliveryInfo.email')"
                type="email"
                name="customerEmail"
                :placeholder="t('deliveryInfo.emailPlaceholder')"
                autocomplete="email"
                :error="emailError"
                required
            />

            <!-- Phone -->
            <div>
                <label class="font-sans text-sm font-semibold text-primary-dark uppercase tracking-wider mb-2 block">
                    {{ t('deliveryInfo.phone') }}
                    <span class="text-red-500" aria-hidden="true">*</span>
                </label>
                <div class="grid grid-cols-[130px_1fr] gap-3">
                    <PhonePrefixAutocomplete
                        :model-value="cartStore.formData.phonePrefix"
                        @update:model-value="cartStore.updateFormData({ phonePrefix: String($event ?? '') })"
                        :options="PHONE_PREFIXES"
                    />
                    <Input
                        :model-value="cartStore.formData.phoneNumber"
                        @update:model-value="handlePhoneUpdate"
                        type="tel"
                        name="phoneNumber"
                        :placeholder="t('deliveryInfo.phoneNumberPlaceholder')"
                        autocomplete="tel"
                        :error="phoneError"
                        required
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../../stores/cart'
import { PHONE_PREFIXES } from '../../constants/phonePrefixes'
import Input from '../atoms/Input.vue'
import PhonePrefixAutocomplete from '../atoms/PhonePrefixAutocomplete.vue'

const { t } = useI18n()
const cartStore = useCartStore()

const emailError = ref<string>('')
const phoneError = ref<string>('')

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const validatePhoneNumber = (phoneNumber: string): boolean => {
    // Allow only digits
    const phoneRegex = /^\d+$/
    if (!phoneRegex.test(phoneNumber)) {
        return false
    }
    // Check if it has between 6-15 digits
    return phoneNumber.length >= 6 && phoneNumber.length <= 15
}

const handleEmailUpdate = (value: string | number | null) => {
    const email = String(value ?? '')
    cartStore.updateFormData({ customerEmail: email })

    if (email && !validateEmail(email)) {
        emailError.value = t('validation.invalidEmail')
    } else {
        emailError.value = ''
    }
}

const handlePhoneUpdate = (value: string | number | null) => {
    const phoneNumber = String(value ?? '')
    cartStore.updateFormData({ phoneNumber })

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
        phoneError.value = t('validation.invalidPhoneNumber')
    } else {
        phoneError.value = ''
    }
}
</script>
