<template>
    <div class="flex flex-col justify-center">
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
import { computed, watch, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import Steps from '../cart/Steps.vue'
import RegisterForm1 from './RegisterForm1.vue'
import RegisterForm2 from './RegisterForm2.vue'
import RegisterForm3 from './RegisterForm3.vue'

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
    return '1'
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
