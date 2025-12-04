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
    type?: 'primary' | 'secondary' | 'home' | 'navLink'
    ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'primary'
})

const buttonClasses = computed(() => {
    const variantClasses = {
        primary: 'py-3 px-6 text-white border-none rounded-lg font-sans text-sm font-semibold cursor-pointer transition-all duration-200 uppercase tracking-wider whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] hover:bg-gradient-to-br hover:from-[#e63946] hover:to-[#d62839]',
        secondary: 'py-3 px-6 text-white border-none rounded-lg font-sans text-sm font-semibold cursor-pointer transition-all duration-200 uppercase tracking-wider whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-br from-[#e63946] to-[#d62839] hover:bg-gradient-to-br hover:from-[#d62839] hover:to-[#c91f2b]',
        home: 'font-serif text-[1.75rem] font-bold text-white tracking-wide bg-transparent border-none cursor-pointer p-0 transition-all duration-200 hover:scale-110 active:scale-95',
        navLink: 'bg-transparent border-none cursor-pointer p-2 flex items-center justify-center transition-transform duration-200 hover:scale-110'
    }

    return variantClasses[props.type]
})
</script>
