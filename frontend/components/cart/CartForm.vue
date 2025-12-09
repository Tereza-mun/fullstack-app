<template>
    <div class="flex flex-col justify-center">
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
import { computed, watch, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import Steps from './Steps.vue'
import CartForm1 from './CartForm1.vue'
import CartForm2 from './CartForm2.vue'
import CartForm3 from './CartForm3.vue'
import CartForm4 from './CartForm4.vue'

const props = defineProps<{
    id: string | string[] | ComputedRef<string>
}>()

const { t } = useI18n()

const currentId = computed(() => {
    const idValue = props.id
    if (typeof idValue === 'object' && 'value' in idValue) {
        return idValue.value
    }
    return idValue as string
})

watch(currentId, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

const activeStep = computed(() => {
    if (currentId.value === '1') return '1'
    if (currentId.value === '2') return '2'
    if (currentId.value === '3') return '3'
    if (currentId.value === '4') return '4'
    return '1'
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
