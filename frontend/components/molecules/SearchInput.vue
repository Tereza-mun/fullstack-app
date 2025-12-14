<template>
    <div class="relative border-b border-gray-200">
        <input
            ref="inputRef"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            :type="InputType.TEXT"
            :placeholder="placeholder"
            class="w-full px-4 py-3 pl-10 text-sm outline-none"
            @keydown.escape="$emit('escape')"
            @keydown.enter.prevent="$emit('enter')"
            @blur="$emit('blur')"
        />
        <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { InputType } from '../../types/common'

interface Props {
    modelValue: string
    placeholder: string
}

defineProps<Props>()

defineEmits<{
    'update:modelValue': [value: string]
    escape: []
    enter: []
    blur: []
}>()

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
    focus: () => inputRef.value?.focus()
})
</script>
