<template>
    <span
        v-if="count > 0"
        class="absolute -top-1 left-7 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
    >
        {{ count }}
    </span>
</template>

<script setup lang="ts">
interface Props {
    count: number
}

defineProps<Props>()
</script>
