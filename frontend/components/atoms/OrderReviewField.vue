<template>
    <div class="flex justify-between">
        <span class="font-semibold">{{ label }}:</span>
        <span>{{ value }}</span>
    </div>
</template>

<script setup lang="ts">
interface Props {
    label: string
    value: string
}

defineProps<Props>()
</script>
