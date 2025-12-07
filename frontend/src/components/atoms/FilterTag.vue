<template>
    <div class="inline-flex items-center gap-2 bg-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700">
        <span>{{ label }}</span>
        <button
            @click="$emit('remove')"
            class="flex items-center justify-center w-4 h-4 rounded-full hover:bg-gray-300 transition-colors"
            :aria-label="`Remove ${label} filter`"
        >
            <svg class="w-3 h-3" fill="none" :stroke="IconFill.BLACK" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { IconFill } from '../../types/common'

interface Props {
    label: string
}

defineProps<Props>()
defineEmits<{
    remove: []
}>()
</script>
