<template>
    <Container>
        <div class="max-w-4xl mx-auto mt-8 md:mt-16">
            <h2 class="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-center mb-6 md:mb-8 text-primary-dark tracking-tight">
                {{ t('profile.title') }}
            </h2>

            <div v-if="authStore.user" class="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <!-- Personal Information -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold text-primary-dark mb-4 border-b pb-2">
                        {{ t('profile.personalInfo') }}
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm text-gray-600">{{ t('profile.firstName') }}</label>
                            <p class="text-lg text-gray-900">{{ authStore.user.firstName || '-' }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">{{ t('profile.lastName') }}</label>
                            <p class="text-lg text-gray-900">{{ authStore.user.lastName || '-' }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">{{ t('profile.email') }}</label>
                            <p class="text-lg text-gray-900">{{ authStore.user.email || '-' }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">{{ t('profile.phone') }}</label>
                            <p class="text-lg text-gray-900">
                                {{ authStore.user.phonePrefix && authStore.user.phoneNumber
                                    ? `${authStore.user.phonePrefix} ${authStore.user.phoneNumber}`
                                    : '-' }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Delivery Address -->
                <div v-if="authStore.user.deliveryAddress" class="mb-8">
                    <h3 class="text-lg font-semibold text-primary-dark mb-4 border-b pb-2">
                        {{ t('profile.deliveryAddress') }}
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-2">
                            <label class="text-sm text-gray-600">{{ t('profile.address') }}</label>
                            <p class="text-lg text-gray-900">{{ authStore.user.deliveryAddress || '-' }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">{{ t('profile.city') }}</label>
                            <p class="text-lg text-gray-900">{{ authStore.user.deliveryCity || '-' }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">{{ t('profile.postalCode') }}</label>
                            <p class="text-lg text-gray-900">{{ authStore.user.deliveryPostalCode || '-' }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">{{ t('profile.country') }}</label>
                            <p class="text-lg text-gray-900">{{ t(`country.${authStore.user.deliveryCountry?.toLowerCase?.()}`) || '-' }}</p>
                        </div>
                    </div>
                </div>

                <!-- Billing Address -->
                <div v-if="authStore.user.billingAddress" class="mb-8">
                    <h3 class="text-lg font-semibold text-primary-dark mb-4 border-b pb-2">
                        {{ t('profile.billingAddress') }}
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="md:col-span-2">
                            <label class="text-sm text-gray-600">{{ t('profile.address') }}</label>
                            <p class="text-lg text-gray-900">{{ authStore.user.billingAddress || '-' }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">{{ t('profile.city') }}</label>
                            <p class="text-lg text-gray-900">{{ authStore.user.billingCity || '-' }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">{{ t('profile.postalCode') }}</label>
                            <p class="text-lg text-gray-900">{{ authStore.user.billingPostalCode || '-' }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-gray-600">{{ t('profile.country') }}</label>
                            <p class="text-lg text-gray-900">{{ t(`country.${authStore.user.billingCountry?.toLowerCase?.()}`) || '-' }}</p>
                        </div>
                    </div>
                </div>
                

                <!-- Actions -->
                <div class="flex gap-4 pt-4 border-t">
                    <Button @click="goToHome" variant="secondary">
                        {{ t('profile.backToHome') }}
                    </Button>
                </div>
            </div>

            <div v-else class="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
                <p class="text-gray-600 mb-4">{{ t('profile.notLoggedIn') }}</p>
                <Button @click="goToLogin" variant="primary">
                    {{ t('profile.loginButton') }}
                </Button>
            </div>
        </div>
    </Container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Container from '../components/molecules/Container.vue'
import Button from '../components/atoms/Button.vue'
import { useAuthStore } from '../stores/auth'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const goToHome = () => {
    router.push('/')
}

const goToLogin = () => {
    router.push('/login')
}

onMounted(() => {
    authStore.initAuth()
})
</script>
