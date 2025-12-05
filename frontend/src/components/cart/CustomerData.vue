<template>
    <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <h3 class="text-xl font-bold text-primary-dark mb-6">{{ t('deliveryInfo.customerInfo') }}</h3>

        <div class="space-y-6">
            <!-- Customer Name -->
            <Input
                :model-value="cartStore.formData.customerName"
                @update:model-value="cartStore.updateFormData({ customerName: String($event ?? '') })"
                :label="t('deliveryInfo.name')"
                type="text"
                name="customerName"
                :placeholder="t('deliveryInfo.namePlaceholder')"
                autocomplete="name"
                required
            />

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
            <Input
                :model-value="cartStore.formData.phone"
                @update:model-value="handlePhoneUpdate"
                :label="t('deliveryInfo.phone')"
                type="tel"
                name="phone"
                :placeholder="t('deliveryInfo.phonePlaceholder')"
                autocomplete="tel"
                :error="phoneError"
                required
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../../stores/cart'
import Input from '../atoms/Input.vue'

const { t } = useI18n()
const cartStore = useCartStore()

const emailError = ref<string>('')
const phoneError = ref<string>('')

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d+]+$/
    return phoneRegex.test(phone)
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
    const phone = String(value ?? '')
    cartStore.updateFormData({ phone })

    if (phone && !validatePhone(phone)) {
        phoneError.value = t('validation.invalidPhone')
    } else {
        phoneError.value = ''
    }
}
</script>
