<template>
    <div class="inline-flex items-center gap-2 bg-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-700">
        <span>{{ label }}</span>
        <Button
            @click="$emit('remove')"
            :variant="ButtonVariant.CLOSE"
            :aria-label="`Remove ${label} filter`"
        >
            <Close size="sm" :stroke=IconFill.BLACK />
        </Button>
    </div>
</template>

<script setup lang="ts">
import Button from './Button.vue'
import Close from './icons/Close.vue'
import { IconFill, ButtonVariant } from '../../types/common'

interface Props {
    label: string
}

defineProps<Props>()
defineEmits<{
    remove: []
}>()
</script>
