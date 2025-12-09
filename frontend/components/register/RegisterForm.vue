<template>
    <div v-if="canAccessStep" class="flex flex-col justify-center">
        <h2 v-if="currentId !== '3'" class="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-center mb-4 md:mb-8 text-primary-dark tracking-tight">
            {{ t('register.title') }}
        </h2>

        <Steps
            :steps="steps"
            :active-step="activeStep" />

        <div class="mt-1 md:mt-6">
            <RegisterForm1 v-if="currentId === '1'" />
            <RegisterForm2 v-if="currentId === '2'" />
            <RegisterForm3 v-if="currentId === '3'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRegisterStore } from '../../stores/register'
import Steps from '../cart/Steps.vue'
import RegisterForm1 from './RegisterForm1.vue'
import RegisterForm2 from './RegisterForm2.vue'
import RegisterForm3 from './RegisterForm3.vue'

const props = defineProps<{
    id: string | string[] | ComputedRef<string>
}>()

const { t } = useI18n()
const registerStore = useRegisterStore()
const router = useRouter()

const currentId = computed(() => {
    const idValue = props.id
    if (typeof idValue === 'object' && 'value' in idValue) {
        return idValue.value
    }
    return idValue as string
})

// Check if user can access the current step
const canAccessStep = computed(() => {
    const stepId = currentId.value

    // Step 1 is always accessible
    if (stepId === '1') return true

    // Step 2 requires step 1 data
    if (stepId === '2') {
        return registerStore.isStep1Complete()
    }

    // Step 3: allow if we have step 2 data (came from form submission)
    // Middleware will redirect if trying to access directly
    if (stepId === '3') {
        return registerStore.isStep2Complete()
    }

    return true
})

// Validate step access on mount
onMounted(() => {
    const stepId = currentId.value

    // Step 2 requires step 1 data
    if (stepId === '2' && !registerStore.isStep1Complete()) {
        router.replace('/register/1')
        return
    }

    // Step 3 requires step 2 data - redirect if not available
    if (stepId === '3' && !registerStore.isStep2Complete()) {
        router.replace('/register/1')
        return
    }
})

watch(currentId, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

const activeStep = computed(() => {
    // If user can't access current step, show step 1 as active (fallback)
    return canAccessStep.value ? currentId.value : '1'
})

const steps = computed(() => [
    {
        label: t('register.steps.personalInfo'),
        link: '/register/1',
    },
    {
        label: t('register.steps.addressInfo'),
        link: '/register/2',
    },
    {
        label: t('register.steps.confirmation'),
        link: '/register/3',
    },
])
</script>
