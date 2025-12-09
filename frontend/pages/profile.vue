<template>
    <Container>
        <div class="max-w-4xl mx-auto">
            <h2 class="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-center mb-6 md:mb-8 text-primary-dark tracking-tight">
                {{ t('profile.title') }}
            </h2>

            <div v-if="authStore.user" class="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <!-- Personal Information -->
                <ProfileSection :title="t('profile.personalInfo')">
                    <ProfileField 
                        :label="t('profile.firstName')" 
                        :value="authStore.user.firstName" 
                    />
                    <ProfileField 
                        :label="t('profile.lastName')" 
                        :value="authStore.user.lastName" 
                    />
                    <ProfileField 
                        :label="t('profile.email')" 
                        :value="authStore.user.email" 
                    />
                    <ProfileField 
                        :label="t('profile.phone')" 
                        :value="formattedPhone" 
                    />
                </ProfileSection>

                <!-- Delivery Address -->
                <ProfileSection 
                    v-if="authStore.user.deliveryAddress" 
                    :title="t('profile.deliveryAddress')"
                >
                    <ProfileField 
                        :label="t('profile.address')" 
                        :value="authStore.user.deliveryAddress" 
                        full-width 
                    />
                    <ProfileField 
                        :label="t('profile.city')" 
                        :value="authStore.user.deliveryCity" 
                    />
                    <ProfileField 
                        :label="t('profile.postalCode')" 
                        :value="authStore.user.deliveryPostalCode" 
                    />
                    <ProfileField 
                        :label="t('profile.country')" 
                        :value="formattedDeliveryCountry" 
                    />
                </ProfileSection>

                <!-- Billing Address -->
                <ProfileSection 
                    v-if="authStore.user.billingAddress" 
                    :title="t('profile.billingAddress')"
                >
                    <ProfileField 
                        :label="t('profile.address')" 
                        :value="authStore.user.billingAddress" 
                        full-width 
                    />
                    <ProfileField 
                        :label="t('profile.city')" 
                        :value="authStore.user.billingCity" 
                    />
                    <ProfileField 
                        :label="t('profile.postalCode')" 
                        :value="authStore.user.billingPostalCode" 
                    />
                    <ProfileField 
                        :label="t('profile.country')" 
                        :value="formattedBillingCountry" 
                    />
                </ProfileSection>

                <!-- Actions -->
                <div class="flex gap-4 pt-4 border-t">
                    <Button 
                        :tag="ButtonTag.NUXT_LINK" 
                        :variant="ButtonVariant.SECONDARY" 
                        to="/"
                    >
                        {{ t('profile.backToHome') }}
                    </Button>
                </div>
            </div>

            <div v-else class="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
                <p class="text-gray-600 mb-4">{{ t('profile.notLoggedIn') }}</p>
                <Button 
                    :tag="ButtonTag.NUXT_LINK" 
                    :variant="ButtonVariant.PRIMARY" 
                    to="/login"
                >
                    {{ t('profile.loginButton') }}
                </Button>
            </div>
        </div>
    </Container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Container from '../components/molecules/Container.vue'
import ProfileSection from '../components/molecules/ProfileSection.vue'
import ProfileField from '../components/atoms/ProfileField.vue'
import Button from '../components/atoms/Button.vue'
import { useAuthStore } from '../stores/auth'
import { ButtonVariant, ButtonTag } from '../types/common'

definePageMeta({
  middleware: 'auth'
})

const { t } = useI18n()
const authStore = useAuthStore()

const formattedPhone = computed(() => {
    const { phonePrefix, phoneNumber } = authStore.user || {}
    return phonePrefix && phoneNumber ? `${phonePrefix} ${phoneNumber}` : null
})

const formattedDeliveryCountry = computed(() => {
    const country = authStore.user?.deliveryCountry?.toLowerCase?.()
    return country ? t(`country.${country}`) : null
})

const formattedBillingCountry = computed(() => {
    const country = authStore.user?.billingCountry?.toLowerCase?.()
    return country ? t(`country.${country}`) : null
})

onMounted(() => {
    authStore.initAuth()
})
</script>
