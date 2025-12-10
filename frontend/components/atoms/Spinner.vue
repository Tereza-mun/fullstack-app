<template>
    <div class="inline-block">
        <div
            :class="[
                'rounded-full animate-spin',
                sizeClasses,
                colorClasses
            ]"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    size?: 'xs' | 'sm' | 'md' | 'lg'
    color?: 'primary' | 'white'
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    color: 'primary'
})

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'xs':
            return 'w-4 h-4 border-2'
        case 'sm':
            return 'w-6 h-6 border-2'
        case 'lg':
            return 'w-[60px] h-[60px] border-4'
        case 'md':
        default:
            return 'w-10 h-10 border-[3px]'
    }
})

const colorClasses = computed(() => {
    switch (props.color) {
        case 'white':
            return 'border-white/20 border-t-white'
        case 'primary':
        default:
            return 'border-primary-dark/10 border-t-primary-dark'
    }
})
</script>
