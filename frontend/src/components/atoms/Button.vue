<template>
    <button
        :class="buttonClasses"
        :aria-label="ariaLabel"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    type?: 'primary' | 'secondary'
    ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'primary'
})

const buttonClasses = computed(() => {
    const baseClasses = 'py-3 px-6 text-white border-none rounded-lg font-sans text-sm font-semibold cursor-pointer transition-all duration-200 uppercase tracking-wider whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]'

    const variantClasses = {
        primary: 'bg-gradient-to-br from-[#1a1a2e] to-[#16213e] hover:bg-gradient-to-br hover:from-[#e63946] hover:to-[#d62839]',
        secondary: 'bg-gradient-to-br from-[#e63946] to-[#d62839] hover:bg-gradient-to-br hover:from-[#d62839] hover:to-[#c91f2b]'
    }

    return `${baseClasses} ${variantClasses[props.type]}`
})
</script>
