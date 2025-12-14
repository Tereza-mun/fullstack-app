<template>
    <Container>
        <div class="max-w-4xl mx-auto">
            <h2 class="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-center mb-6 md:mb-8 text-primary-dark tracking-tight">
                {{ t('profile.title') }}
            </h2>

            <ClientOnly>
                <div v-if="authStore.user" class="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <!-- Personal Information -->
                    <ProfileSection
                        ref="personalInfoSection"
                        :title="t('profile.personalInfo')"
                        section="personalInfo"
                        @save="handleSave"
                    >
                        <template #default="{ isEditing }">
                            <ProfileField
                                :label="t('profile.firstName')"
                                :value="profileData.firstName"
                                :isEditing="isEditing"
                                @update:value="profileData.firstName = $event"
                            />
                            <ProfileField
                                :label="t('profile.lastName')"
                                :value="profileData.lastName"
                                :isEditing="isEditing"
                                @update:value="profileData.lastName = $event"
                            />
                            <ProfileField
                                :label="t('profile.email')"
                                :value="authStore.user.email"
                                :isEditing="false"
                            />
                            <ProfileFieldPrefix
                                :label="t('profile.phone')"
                                :prefix="profileData.phonePrefix"
                                :number="profileData.phoneNumber"
                                :isEditing="isEditing"
                                @update:prefix="profileData.phonePrefix = $event"
                                @update:number="profileData.phoneNumber = $event"
                            />
                        </template>
                    </ProfileSection>

                    <!-- Delivery Address -->
                    <ProfileSection
                        v-if="authStore.user.deliveryAddress"
                        ref="deliveryAddressSection"
                        :title="t('profile.deliveryAddress')"
                        section="deliveryAddress"
                        @save="handleSave"
                    >
                        <template #default="{ isEditing }">
                            <ProfileField
                                :label="t('profile.address')"
                                :value="profileData.deliveryAddress"
                                :isEditing="isEditing"
                                @update:value="profileData.deliveryAddress = $event"
                            />
                            <ProfileField
                                :label="t('profile.city')"
                                :value="profileData.deliveryCity"
                                :isEditing="isEditing"
                                @update:value="profileData.deliveryCity = $event"
                            />
                            <ProfileField
                                :label="t('profile.postalCode')"
                                :value="profileData.deliveryPostalCode"
                                :isEditing="isEditing"
                                @update:value="profileData.deliveryPostalCode = $event"
                            />
                            <ProfileFieldCountry
                                :label="t('profile.country')"
                                :value="profileData.deliveryCountry"
                                :isEditing="isEditing"
                                @update:value="profileData.deliveryCountry = $event"
                            />
                        </template>
                    </ProfileSection>

                    <!-- Billing Address -->
                    <ProfileSection
                        v-if="authStore.user.billingAddress"
                        ref="billingAddressSection"
                        :title="t('profile.billingAddress')"
                        section="billingAddress"
                        @save="handleSave"
                    >
                        <template #default="{ isEditing }">
                            <ProfileField
                                :label="t('profile.address')"
                                :value="profileData.billingAddress"
                                :isEditing="isEditing"
                                @update:value="profileData.billingAddress = $event"
                            />
                            <ProfileField
                                :label="t('profile.city')"
                                :value="profileData.billingCity"
                                :isEditing="isEditing"
                                @update:value="profileData.billingCity = $event"
                            />
                            <ProfileField
                                :label="t('profile.postalCode')"
                                :value="profileData.billingPostalCode"
                                :isEditing="isEditing"
                                @update:value="profileData.billingPostalCode = $event"
                            />
                            <ProfileFieldCountry
                                :label="t('profile.country')"
                                :value="profileData.billingCountry"
                                :isEditing="isEditing"
                                @update:value="profileData.billingCountry = $event"
                            />
                        </template>
                    </ProfileSection>

                    <!-- Actions -->
                    <div class="flex gap-4 pt-4 border-t">
                        <Button 
                            :tag="ButtonTag.NUXT_LINK" 
                            :variant="ButtonVariant.SECONDARY" 
                            to="/"
                            :aria-label="t('profile.clickToReturnHome')"
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
                        :aria-label="t('profile.clickToLogin')"
                    >
                        {{ t('profile.loginButton') }}
                    </Button>
                </div>
            </ClientOnly>
        </div>
    </Container>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Container from '../components/molecules/Container.vue'
import ProfileSection from '../components/molecules/ProfileSection.vue'
import ProfileField from '../components/atoms/ProfileField.vue'
import ProfileFieldPrefix from '../components/atoms/ProfileFieldPrefix.vue'
import ProfileFieldCountry from '../components/atoms/ProfileFieldCountry.vue'
import Button from '../components/atoms/Button.vue'
import { useAuthStore } from '../stores/auth'
import { useAlertStore } from '../stores/alert'
import { ButtonVariant, ButtonTag } from '../types/common'

definePageMeta({
  middleware: 'auth'
})

const { t } = useI18n()
const authStore = useAuthStore()
const alertStore = useAlertStore()

const personalInfoSection = ref<InstanceType<typeof ProfileSection> | null>(null)
const deliveryAddressSection = ref<InstanceType<typeof ProfileSection> | null>(null)
const billingAddressSection = ref<InstanceType<typeof ProfileSection> | null>(null)

// Edit data state
const profileData = ref({
    firstName: '',
    lastName: '',
    phonePrefix: '',
    phoneNumber: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryPostalCode: '',
    deliveryCountry: '',
    billingAddress: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
})

// Initialize edit data when user changes
watch(() => authStore.user, (user) => {
    if (user) {
        profileData.value = {
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            phonePrefix: user.phonePrefix || '',
            phoneNumber: user.phoneNumber || '',
            deliveryAddress: user.deliveryAddress || '',
            deliveryCity: user.deliveryCity || '',
            deliveryPostalCode: user.deliveryPostalCode || '',
            deliveryCountry: user.deliveryCountry || '',
            billingAddress: user.billingAddress || '',
            billingCity: user.billingCity || '',
            billingPostalCode: user.billingPostalCode || '',
            billingCountry: user.billingCountry || '',
        }
    }
}, { immediate: true })

const handleSave = async (section: string) => {
    let updateData: any = {}
    let sectionRef: any = null

    if (section === 'personalInfo') {
        updateData = {
            firstName: profileData.value.firstName,
            lastName: profileData.value.lastName,
            phonePrefix: profileData.value.phonePrefix,
            phoneNumber: profileData.value.phoneNumber,
        }
        sectionRef = personalInfoSection.value
    } else if (section === 'deliveryAddress') {
        updateData = {
            deliveryAddress: profileData.value.deliveryAddress,
            deliveryCity: profileData.value.deliveryCity,
            deliveryPostalCode: profileData.value.deliveryPostalCode,
            deliveryCountry: profileData.value.deliveryCountry,
        }
        sectionRef = deliveryAddressSection.value
    } else if (section === 'billingAddress') {
        updateData = {
            billingAddress: profileData.value.billingAddress,
            billingCity: profileData.value.billingCity,
            billingPostalCode: profileData.value.billingPostalCode,
            billingCountry: profileData.value.billingCountry,
        }
        sectionRef = billingAddressSection.value
    }

    const result = await authStore.updateUser(updateData)

    if (result.success) {
        sectionRef?.resetEditState()
        alertStore.showAlert({
            message: t('profile.updateSuccess'),
            bgColor: 'bg-green-500',
            textColor: 'text-white'
        })
    } else {
        sectionRef?.setSaveError()
        alertStore.showAlert({
            message: result.error || t('profile.updateError'),
            bgColor: 'bg-red-500',
            textColor: 'text-white'
        })
    }
}

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
</script>
