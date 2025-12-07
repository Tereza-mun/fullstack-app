<template>
    <div class="flex flex-col gap-2">
        <label
            v-if="label"
            class="font-sans text-sm font-semibold text-primary-dark uppercase tracking-wider"
            :class="{ 'text-red-600': error }"
        >
            {{ label }}
            <sup v-if="required" class="text-red-600">*</sup>
        </label>

        <slot />

        <p v-if="error" class="text-xs text-red-500">
            {{ error }}
        </p>
    </div>
</template>

<script setup lang="ts">
interface Props {
    label?: string
    error?: string
    required?: boolean
}

defineProps<Props>()
</script>
