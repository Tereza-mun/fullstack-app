<template>
    <div class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <input
            :id="inputId"
            :type="InputType.CHECKBOX"
            :checked="modelValue"
            @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
            class="mt-1 w-4 h-4 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary"
        />
        <label
            :for="inputId"
            class="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
        >
            {{ label }}
        </label>
    </div>
</template>

<script setup lang="ts">
import { InputType } from '../../types/common'

const props = defineProps<{
    modelValue: boolean
    label: string
    inputId: string
}>()

defineEmits<{
    'update:modelValue': [value: boolean]
}>()
</script>
