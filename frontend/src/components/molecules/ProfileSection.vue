<template>
    <div class="mb-8">
        <h3 class="text-lg font-semibold text-primary-dark mb-4 border-b pb-2">
            {{ title }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string
}

defineProps<Props>()
</script>
