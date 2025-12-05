<template>
    <div class="flex flex-col justify-center py-8">
        <h2 class="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-center mb-8 text-primary-dark tracking-tight">
            {{ t('cart.title') }}
        </h2>

        <Steps :steps="steps" :active-step="activeStep" />

        <div class="mt-6">
            <CartForm1 v-if="currentId === '1'" />
            <CartForm2 v-if="currentId === '2'" />
            <CartForm3 v-if="currentId === '3'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import Steps from './Steps.vue'
import CartForm1 from './CartForm1.vue'
import CartForm2 from './CartForm2.vue'
import CartForm3 from './CartForm3.vue'

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

const activeStep = computed(() => {
    if (currentId.value === '1') return '1'
    if (currentId.value === '2') return '2'
    if (currentId.value === '3') return '3'
    return '1'
})

const steps = ref([
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
