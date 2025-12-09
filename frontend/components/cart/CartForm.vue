<template>
    <div v-if="canAccessStep" class="flex flex-col justify-center">
        <h2 v-if="currentId !== '4'" class="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-center mb-4 md:mb-8 text-primary-dark tracking-tight">
            {{ t('cart.title') }}
        </h2>

        <Steps
            :steps="steps"
            :active-step="activeStep" />

        <div class="mt-1 md:mt-6">
            <CartForm1 v-if="currentId === '1'" />
            <CartForm2 v-if="currentId === '2'" />
            <CartForm3 v-if="currentId === '3'" />
            <CartForm4 v-if="currentId === '4'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../../stores/cart'
import Steps from './Steps.vue'
import CartForm1 from './CartForm1.vue'
import CartForm2 from './CartForm2.vue'
import CartForm3 from './CartForm3.vue'
import CartForm4 from './CartForm4.vue'

const props = defineProps<{
    id: string | string[] | ComputedRef<string>
}>()

const { t } = useI18n()
const cartStore = useCartStore()
const router = useRouter()
const route = useRoute()

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

    // Step 2 requires items in cart
    if (stepId === '2') {
        return cartStore.isStep1Complete()
    }

    // Step 3 requires valid form
    if (stepId === '3') {
        return cartStore.isStep2Complete()
    }

    // Step 4 (confirmation) is accessible only with valid orderId from submission
    if (stepId === '4') {
        const orderId = route.query.orderId
        // Check if orderId exists and is a valid number
        return !!(orderId && !isNaN(Number(orderId)))
    }

    return true
})

// Validate step access on mount
onMounted(() => {
    const stepId = currentId.value

    // Step 2 requires items in cart
    if (stepId === '2' && !cartStore.isStep1Complete()) {
        router.replace('/cart/1')
        return
    }

    // Step 3 requires valid form
    if (stepId === '3' && !cartStore.isStep2Complete()) {
        router.replace('/cart/1')
        return
    }

    // Step 4 (confirmation) requires valid orderId
    if (stepId === '4') {
        const orderId = route.query.orderId
        if (!orderId || isNaN(Number(orderId))) {
            router.replace('/cart/1')
            return
        }
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
        label: t('cart.steps.cart'),
        link: '/cart/1',
    },
    {
        label: t('cart.steps.deliveryInformation'),
        link: '/cart/2',
    },
    {
        label: t('cart.steps.summary'),
        link: '/cart/3',
    },
    {
        label: t('cart.steps.confirmation'),
        link: '/cart/4',
    },
])
</script>
