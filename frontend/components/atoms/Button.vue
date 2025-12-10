<template>
    <component
        :is="componentTag"
        :class="buttonClasses"
        :aria-label="ariaLabel"
        :disabled="tag === 'button' ? disabled : undefined"
        :href="tag === 'a' ? href : undefined"
        :to="tag === 'NuxtLink' ? to : undefined"
        :target="tag === 'a' ? target : undefined"
        :rel="tag === 'a' && target === '_blank' ? 'noopener noreferrer' : undefined"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import { ButtonVariant, ButtonTag } from '../../types/common'

export interface ButtonProps {
    variant?: ButtonVariant
    tag?: ButtonTag
    ariaLabel?: string
    disabled?: boolean
    href?: string
    to?: string | object
    target?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
    variant: ButtonVariant.PRIMARY,
    tag: ButtonTag.BUTTON,
    disabled: false
})

const componentTag = computed(() => {
    if (props.tag === 'NuxtLink') {
        return resolveComponent('NuxtLink')
    }
    return props.tag
})

const buttonClasses = computed(() => {
    const baseClasses = 'transition-all duration-200'
    const disabledClasses = props.tag === 'button' ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''

    const variantClasses = {
        primary: `py-3 px-6 text-white border-none rounded-lg font-sans text-sm font-semibold uppercase tracking-wider whitespace-nowrap bg-gradient-to-br from-primary-dark to-primary-darker ${baseClasses} ${disabledClasses} ${!props.disabled ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:from-accent hover:to-accent-dark' : ''}`,
        secondary: `py-3 px-6 text-white border-none rounded-lg font-sans text-sm font-semibold uppercase tracking-wider whitespace-nowrap bg-gradient-to-br from-accent to-accent-dark ${baseClasses} ${disabledClasses} ${!props.disabled ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:from-accent-dark hover:to-accent-darker' : ''}`,
        home: `font-serif text-[1.25rem] md:text-[1.75rem] font-bold text-white tracking-wide bg-transparent border-none p-0 ${baseClasses} ${disabledClasses} ${!props.disabled ? 'cursor-pointer hover:scale-110 active:scale-95' : ''}`,
        iconButton: `bg-transparent border-none p-2 flex items-center justify-center transition-transform duration-200 ${disabledClasses} ${!props.disabled ? 'cursor-pointer hover:scale-110' : ''}`,
        counterButton: `w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 border-none transition-colors ${disabledClasses} ${!props.disabled ? 'cursor-pointer hover:bg-gray-200' : ''}`,
        languageSwitch: `pl-2 md:pl-4 py-2 text-white border-none rounded-lg font-sans text-sm font-semibold tracking-wider whitespace-nowrap bg-transparent flex items-center gap-2 ${baseClasses} ${disabledClasses} ${!props.disabled ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''}`,
        paginationButton: `px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white font-medium transition-colors ${disabledClasses} ${!props.disabled ? 'hover:bg-gray-50 hover:border-gray-400' : ''}`,
        scrollToTop: `fixed bottom-6 right-6 z-40 w-12 h-12 bg-gradient-to-br bg-gradient-to-br from-accent to-accent-dark text-white rounded-full shadow-lg flex items-center justify-center ${baseClasses} ${disabledClasses} ${!props.disabled ? 'cursor-pointer hover:scale-110 active:scale-95 hover:shadow-xl' : ''}`,
        addToCart: `flex items-center gap-1 px-2 py-1 rounded-lg text-white text-xs font-semibold bg-gradient-to-br from-primary-dark to-primary-darker ${baseClasses} ${disabledClasses} ${!props.disabled ? 'cursor-pointer active:scale-95' : ''}`,
        removeFromCart: `flex items-center gap-1 px-2 py-1 rounded-lg text-white text-xs font-semibold bg-gradient-to-br from-accent to-accent-dark ${baseClasses} ${disabledClasses} ${!props.disabled ? 'cursor-pointer active:scale-95' : ''}`,
        link: `bg-transparent border-none p-0 text-primary font-medium ${baseClasses} hover:text-primary-dark hover:underline cursor-pointer`,
        close: `bg-transparent border-none p-0 ${baseClasses} hover:opacity-75 cursor-pointer`,
        eyeIcon: `absolute top-10 right-3 text-gray-500 bg-transparent border-none p-0 ${baseClasses} ${!props.disabled ? 'cursor-pointer hover:text-gray-700' : ''}`
    }

    return variantClasses[props.variant]
})
</script>
