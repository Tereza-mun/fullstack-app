<template>
    <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <form @submit.prevent="goToNextStep">
                <div class="space-y-6">
                    <h3 class="text-lg font-semibold text-primary-dark mb-4">{{ t('register.personalInfo') }}</h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            v-model="registerStore.formData.firstName"
                            :label="t('register.firstName')"
                            type="text"
                            required
                            :placeholder="t('register.firstNamePlaceholder')"
                            autocomplete="given-name"
                        />

                        <Input
                            v-model="registerStore.formData.lastName"
                            :label="t('register.lastName')"
                            type="text"
                            required
                            :placeholder="t('register.lastNamePlaceholder')"
                            autocomplete="family-name"
                        />
                    </div>

                    <Input
                        v-model="registerStore.sensitiveData.email"
                        :label="t('register.email')"
                        type="email"
                        required
                        :placeholder="t('register.emailPlaceholder')"
                        :error="emailError"
                        :description="t('register.emailHint')"
                        autocomplete="email"
                        @blur="validateEmailField"
                    />

                    <div>
                        <label class="font-sans text-sm font-semibold text-primary-dark uppercase tracking-wider mb-2 block">
                            {{ t('register.phone') }}
                            <span class="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <div class="grid grid-cols-[130px_1fr] gap-3">
                            <PhonePrefixAutocomplete
                                v-model="registerStore.formData.phonePrefix"
                                :options="phonePrefixOptions"
                                required
                            />
                            <Input
                                v-model="registerStore.formData.phoneNumber"
                                type="tel"
                                :placeholder="t('register.phoneNumberPlaceholder')"
                                :error="phoneError"
                                autocomplete="tel"
                                required
                                @blur="validatePhoneField"
                            />
                        </div>
                    </div>

                    <h3 class="text-lg font-semibold text-primary-dark mb-4 pt-4">{{ t('register.security') }}</h3>

                    <div>
                        <Input
                            v-model="registerStore.sensitiveData.password"
                            :label="t('register.password')"
                            type="password"
                            required
                            :placeholder="t('register.passwordPlaceholder')"
                            :error="passwordValidationError"
                            autocomplete="new-password"
                            @blur="validatePasswordField"
                        />
                        <div class="mt-2 text-xs text-gray-600 space-y-1">
                            <p class="font-medium">{{ t('register.passwordRequirements') }}</p>
                            <ul class="list-disc list-inside space-y-0.5 ml-2">
                                <li :class="passwordChecks.length ? 'text-green-600' : ''">{{ t('register.passwordReq1') }}</li>
                                <li :class="passwordChecks.uppercase ? 'text-green-600' : ''">{{ t('register.passwordReq2') }}</li>
                                <li :class="passwordChecks.number ? 'text-green-600' : ''">{{ t('register.passwordReq3') }}</li>
                                <li :class="passwordChecks.special ? 'text-green-600' : ''">{{ t('register.passwordReq4') }}</li>
                            </ul>
                        </div>
                    </div>

                    <Input
                        v-model="confirmPassword"
                        :label="t('register.confirmPassword')"
                        type="password"
                        required
                        :placeholder="t('register.confirmPasswordPlaceholder')"
                        :error="confirmPasswordError"
                        autocomplete="new-password"
                        @blur="validateConfirmPasswordField"
                    />

                    <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {{ error }}
                    </div>

                    <div class="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button @click="goToLogin" variant="secondary" class="w-full sm:w-auto order-2 sm:order-1">
                            {{ t('register.backToLogin') }}
                        </Button>
                        <Button 
                            variant="primary"
                            type="submit" 
                            class="w-full sm:flex-1 order-1 sm:order-2"
                            :disabled="formIncomplete">
                            {{ t('register.continue') }}
                        </Button>
                    </div>

                    <!-- <div class="text-center text-sm text-gray-600 pt-2">
                        {{ t('register.haveAccount') }}
                        <a href="#" @click.prevent="goToLogin" class="text-primary hover:text-primary-dark font-medium">
                            {{ t('register.login') }}
                        </a>
                    </div> -->
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useRegisterStore } from '../../stores/register'
import { validateEmail, validatePhoneNumber, validatePassword } from '../../utils/validators'
import { PHONE_PREFIXES } from '../../constants/phonePrefixes'
import Input from '../atoms/Input.vue'
import PhonePrefixAutocomplete from '../atoms/PhonePrefixAutocomplete.vue'
import Button from '../atoms/Button.vue'

const router = useRouter()
const { t } = useI18n()
const registerStore = useRegisterStore()

const phonePrefixOptions = PHONE_PREFIXES

const confirmPassword = ref('')
const error = ref('')
const emailError = ref('')
const phoneError = ref('')
const passwordValidationError = ref('')
const confirmPasswordError = ref('')

// Password requirement checks (for visual feedback)
const passwordChecks = computed(() => ({
    length: registerStore.sensitiveData.password.length >= 8,
    uppercase: /[A-Z]/.test(registerStore.sensitiveData.password),
    number: /\d/.test(registerStore.sensitiveData.password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(registerStore.sensitiveData.password)
}))

const formIncomplete = computed(() => {
    return !registerStore.formData.firstName
    || !registerStore.formData.lastName
    || !registerStore.sensitiveData.email
    || !registerStore.sensitiveData.password
    || !registerStore.formData.phonePrefix
    || !registerStore.formData.phoneNumber
    || !confirmPassword.value
    || !!emailError.value
    || !!phoneError.value
    || !!passwordValidationError.value
    || !!confirmPasswordError.value
})

const validateEmailField = () => {
    if (!registerStore.sensitiveData.email) {
        emailError.value = ''
        return
    }
    const result = validateEmail(registerStore.sensitiveData.email)
    if (!result.isValid) {
        emailError.value = t('validation.invalidEmail')
    } else {
        emailError.value = ''
    }
}

const validatePhoneField = () => {
    if (!registerStore.formData.phoneNumber) {
        phoneError.value = ''
        return
    }
    const result = validatePhoneNumber(registerStore.formData.phoneNumber, false)
    if (!result.isValid) {
        phoneError.value = t('validation.invalidPhoneNumber')
    } else {
        phoneError.value = ''
    }
}

const validatePasswordField = () => {
    if (!registerStore.sensitiveData.password) {
        passwordValidationError.value = ''
        return
    }
    const result = validatePassword(registerStore.sensitiveData.password)
    if (!result.isValid) {
        // Map specific password errors to translations
        if (result.error?.includes('8 characters')) {
            passwordValidationError.value = t('validation.passwordTooShort')
        } else if (result.error?.includes('uppercase')) {
            passwordValidationError.value = t('validation.passwordNoUppercase')
        } else if (result.error?.includes('number')) {
            passwordValidationError.value = t('validation.passwordNoNumber')
        } else if (result.error?.includes('special character')) {
            passwordValidationError.value = t('validation.passwordNoSpecial')
        } else {
            passwordValidationError.value = t('validation.passwordInvalid')
        }
    } else {
        passwordValidationError.value = ''
    }
}

const validateConfirmPasswordField = () => {
    if (!confirmPassword.value) {
        confirmPasswordError.value = ''
        return
    }
    if (registerStore.sensitiveData.password !== confirmPassword.value) {
        confirmPasswordError.value = t('register.passwordMismatch')
    } else {
        confirmPasswordError.value = ''
    }
}

const goToLogin = () => {
    router.push('/login')
}

const goToNextStep = async () => {
    error.value = ''

    // Clear all previous errors
    emailError.value = ''
    phoneError.value = ''
    passwordValidationError.value = ''
    confirmPasswordError.value = ''

    // Validate required fields
    if (!registerStore.formData.firstName || !registerStore.formData.lastName || !registerStore.sensitiveData.email || !registerStore.sensitiveData.password || !registerStore.formData.phonePrefix || !registerStore.formData.phoneNumber) {
        error.value = t('register.fillRequired')
        return
    }

    // Validate email
    const emailValidation = validateEmail(registerStore.sensitiveData.email)
    if (!emailValidation.isValid) {
        emailError.value = t('validation.invalidEmail')
        error.value = t('validation.invalidEmail')
        return
    }

    // Check if email already exists
    const emailExists = await registerStore.checkEmailExists(registerStore.sensitiveData.email)
    if (emailExists) {
        emailError.value = t('register.emailAlreadyExists')
        error.value = t('register.emailAlreadyExists')
        return
    }

    // Validate phone
    const phoneValidation = validatePhoneNumber(registerStore.formData.phoneNumber, false)
    if (!phoneValidation.isValid) {
        phoneError.value = t('validation.invalidPhoneNumber')
        error.value = t('validation.invalidPhoneNumber')
        return
    }

    // Validate password
    const passwordValidation = validatePassword(registerStore.sensitiveData.password)
    if (!passwordValidation.isValid) {
        if (passwordValidation.error?.includes('8 characters')) {
            passwordValidationError.value = t('validation.passwordTooShort')
            error.value = t('validation.passwordTooShort')
        } else if (passwordValidation.error?.includes('uppercase')) {
            passwordValidationError.value = t('validation.passwordNoUppercase')
            error.value = t('validation.passwordNoUppercase')
        } else if (passwordValidation.error?.includes('number')) {
            passwordValidationError.value = t('validation.passwordNoNumber')
            error.value = t('validation.passwordNoNumber')
        } else if (passwordValidation.error?.includes('special character')) {
            passwordValidationError.value = t('validation.passwordNoSpecial')
            error.value = t('validation.passwordNoSpecial')
        } else {
            passwordValidationError.value = t('validation.passwordInvalid')
            error.value = t('validation.passwordInvalid')
        }
        return
    }

    // Validate passwords match
    if (registerStore.sensitiveData.password !== confirmPassword.value) {
        confirmPasswordError.value = t('register.passwordMismatch')
        error.value = t('register.passwordMismatch')
        return
    }

    router.push('/register/2')
}
</script>
