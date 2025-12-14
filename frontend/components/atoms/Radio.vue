<template>
    <label
        :for="inputId"
        class="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        :class="isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'"
        role="radio"
        :aria-checked="isSelected"
        :aria-label="description ? `${label}: ${description}` : label"
        tabindex="0"
        @keydown.enter.prevent="$emit('update:modelValue', value)"
        @keydown.space.prevent="$emit('update:modelValue', value)"
    >
        <input
            :id="inputId"
            :type="InputType.RADIO"
            :name="name"
            :value="value"
            :checked="isSelected"
            :aria-checked="isSelected"
            @change="$emit('update:modelValue', value)"
            class="radio-input"
            tabindex="-1"
        />
        <div class="flex-1">
            <div class="font-semibold text-gray-900">{{ label }}</div>
            <div v-if="description" class="text-sm text-gray-600" aria-hidden="true">{{ description }}</div>
        </div>
    </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { InputType } from '../../types/common'

const props = defineProps<{
    modelValue: string
    value: string
    name: string
    label: string
    description?: string
}>()

defineEmits<{
    'update:modelValue': [value: string]
}>()

const inputId = computed(() => `${props.name}-${props.value}`)
const isSelected = computed(() => props.modelValue === props.value)
</script>

<style scoped>
.radio-input {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 2px solid #d1d5db;
    border-radius: 50%;
    background-color: white;
    transition: all 0.2s ease;
}

.radio-input:checked {
    border-color: #3b82f6;
    background-color: white;
    position: relative;
}

.radio-input:checked::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #3b82f6;
}

.radio-input:focus,
.radio-input:focus-visible,
.radio-input:active {
    outline: none !important;
    outline-offset: 0 !important;
}
</style>
