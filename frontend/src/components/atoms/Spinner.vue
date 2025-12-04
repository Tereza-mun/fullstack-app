<template>
    <div class="inline-block">
        <div
            :class="[
                'border-primary-dark/10 border-t-primary-dark rounded-full animate-spin',
                sizeClasses
            ]"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md'
})

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'w-6 h-6 border-2'
        case 'lg':
            return 'w-[60px] h-[60px] border-4'
        case 'md':
        default:
            return 'w-10 h-10 border-[3px]'
    }
})
</script>
