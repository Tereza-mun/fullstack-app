<template>
    <button
        :class="buttonClasses"
        :aria-label="ariaLabel"
        :disabled="disabled"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    type?: 'primary' | 'secondary' | 'home' | 'iconButton' | 'counterButton' | 'languageSwitch'
    ariaLabel?: string
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: 'primary',
    disabled: false
})

const buttonClasses = computed(() => {
    const variantClasses = {
        primary: 'py-3 px-6 text-white border-none rounded-lg font-sans text-sm font-semibold cursor-pointer transition-all duration-200 uppercase tracking-wider whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-br from-primary-dark to-primary-darker hover:bg-gradient-to-br hover:from-accent hover:to-accent-dark',
        secondary: 'py-3 px-6 text-white border-none rounded-lg font-sans text-sm font-semibold cursor-pointer transition-all duration-200 uppercase tracking-wider whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-br from-accent to-accent-dark hover:bg-gradient-to-br hover:from-accent-dark hover:to-accent-darker',
        home: 'font-serif text-[1.75rem] font-bold text-white tracking-wide bg-transparent border-none cursor-pointer p-0 transition-all duration-200 hover:scale-110 active:scale-95',
        iconButton: 'bg-transparent border-none cursor-pointer p-2 flex items-center justify-center transition-transform duration-200 hover:scale-110',
        counterButton: 'w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer border-none',
        languageSwitch: 'py-3 px-6 text-white border-none rounded-lg font-sans text-sm font-semibold cursor-pointer transition-all duration-200 uppercase tracking-wider whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] bg-transparent border-none flex items-center gap-2'
    }

    const disabledClasses = 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100'

    return props.disabled
        ? `${variantClasses[props.type]} ${disabledClasses}`
        : variantClasses[props.type]
})
</script>
