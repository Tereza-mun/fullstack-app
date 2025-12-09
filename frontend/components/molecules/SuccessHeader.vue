<template>
    <div :class="containerClasses">
        <div class="flex-shrink-0">
            <slot name="icon">
                <CheckIcon />
            </slot>
        </div>
        <div :class="textContainerClasses">
            <h2 :class="titleClasses">
                {{ title }}
            </h2>
            <p v-if="subtitle" class="text-base text-gray-600 mt-1">
                {{ subtitle }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CheckIcon from '../atoms/CheckIcon.vue'

interface Props {
    title: string
    subtitle?: string
    layout?: 'inline' | 'centered'
}

const props = withDefaults(defineProps<Props>(), {
    layout: 'inline'
})

const containerClasses = computed(() => {
    if (props.layout === 'centered') {
        return 'flex flex-col items-center text-center'
    }
    return 'flex items-center gap-4'
})

const textContainerClasses = computed(() => {
    if (props.layout === 'centered') {
        return 'mt-4'
    }
    return 'text-left'
})

const titleClasses = computed(() => {
    return 'font-serif text-2xl md:text-3xl font-bold text-primary-dark leading-tight'
})
</script>
