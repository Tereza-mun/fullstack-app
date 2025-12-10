<template>
    <svg
        :class="sizeClass"
        xmlns="http://www.w3.org/2000/svg"
        :fill="fill"
        viewBox="0 0 24 24"
        :stroke="stroke"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            :stroke-width="strokeWidth"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
</template>

<script setup lang="ts">
interface Props {
    stroke?: string
    fill?: string
    strokeWidth?: number
    size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
    stroke: 'currentColor',
    fill: 'none',
    strokeWidth: 2,
    size: 'md'
})

const sizeClass = computed(() => {
    switch (props.size) {
        case 'sm': return 'w-3 h-3'
        case 'md': return 'w-5 h-5'
        case 'lg': return 'w-6 h-6'
        default: return 'w-5 h-5'
    }
})
</script>
