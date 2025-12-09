<template>
    <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <h3 class="text-xl font-bold text-primary-dark mb-4">{{ title }}</h3>
        <div class="space-y-3 text-gray-700">
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
