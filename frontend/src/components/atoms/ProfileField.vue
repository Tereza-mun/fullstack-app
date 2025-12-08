<template>
    <div :class="fullWidth ? 'md:col-span-2' : ''">
        <label class="text-sm text-gray-600">{{ label }}</label>
        <p class="text-lg text-gray-900">{{ displayValue }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    label: string
    value?: string | null
    fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    fullWidth: false
})

const displayValue = computed(() => props.value || '-')
</script>
