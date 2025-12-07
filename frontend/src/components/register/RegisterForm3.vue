<template>
    <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-6 md:p-8 text-center">
            <div class="mb-6">
                <!-- Success Icon -->
                <div class="w-16 h-16 mx-auto mb-4">
                    <CheckIcon />
                </div>

                <h2 class="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-primary-dark tracking-tight mb-4">
                    {{ t('register.successTitle') }}
                </h2>

                <p class="text-lg text-gray-700 mb-6">
                    {{ t('register.successMessage', { name: user.firstName + ' ' + user.lastName }) }}
                </p>

                <div class="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button @click="goToProducts" variant="primary" class="w-full sm:w-auto">
                        {{ t('register.startShopping') }}
                    </Button>
                    <!-- <Button @click="goToProfile" variant="secondary" class="w-full sm:w-auto">
                        {{ t('register.viewProfile') }}
                    </Button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useRegisterStore } from '../../stores/register'
import Button from '../atoms/Button.vue'
import CheckIcon from '../atoms/CheckIcon.vue'

const router = useRouter()
const { t } = useI18n()
const registerStore = useRegisterStore()

// Get user data from the register store (before it's cleared)
const user = computed(() => ({
    firstName: registerStore.formData.firstName,
    lastName: registerStore.formData.lastName,
    email: registerStore.sensitiveData.email,
    phonePrefix: registerStore.formData.phonePrefix,
    phoneNumber: registerStore.formData.phoneNumber,
}))

const goToProducts = () => {
    // Clear the form data when navigating away
    registerStore.resetForm()
    router.push('/')
}

// const goToProfile = () => {
//     // TODO: Navigate to profile page when implemented
//     router.push('/')
// }
</script>
