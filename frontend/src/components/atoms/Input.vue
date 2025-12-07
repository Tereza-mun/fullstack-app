<template>
    <div class="flex flex-col gap-2">
        <label 
            v-if="label" 
            :for="inputId"
            class="font-sans text-sm font-semibold text-primary-dark uppercase tracking-wider"
        >
            {{ label }}
            <span v-if="required" class="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
            :id="inputId"
            :name="name || inputId"
            :value="modelValue"
            @input="handleInput"
            @blur="handleBlur"
            :type="type"
            :placeholder="placeholder"
            :min="min"
            :max="max"
            :step="step"
            :required="required"
            :aria-required="required"
            :aria-invalid="error ? true : undefined"
            :aria-describedby="describedBy"
            :autocomplete="autocomplete"
            class="w-full px-3 py-2 border-2 rounded-lg text-base transition-all duration-200 outline-none text-gray-900 placeholder-gray-400 focus:ring-4"
            :class="error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900/10'"
        />
        <p 
            v-if="error" 
            :id="`${inputId}-error`" 
            class="text-sm text-red-500"
            role="alert"
        >
            {{ error }}
        </p>
        <p 
            v-if="description && !error" 
            :id="`${inputId}-description`" 
            class="text-sm text-gray-500"
        >
            {{ description }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    modelValue: string | number | null
    label?: string
    name?: string
    required?: boolean
    type?: string
    placeholder?: string
    min?: string | number
    max?: string | number
    step?: string | number
    error?: string
    description?: string
    autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    required: false
})

const emit = defineEmits<{
    'update:modelValue': [value: string | number | null]
    'blur': [event: Event]
}>()

// Generate unique ID for input-label connection
const inputId = computed(() => {
    const base = props.name || props.label?.toLowerCase().replace(/\s+/g, '-') || 'input'
    return `input-${base}-${Math.random().toString(36).substring(2, 9)}`
})

// Build aria-describedby based on available descriptions
const describedBy = computed(() => {
    const ids: string[] = []
    if (props.error) ids.push(`${inputId.value}-error`)
    else if (props.description) ids.push(`${inputId.value}-description`)
    return ids.length > 0 ? ids.join(' ') : undefined
})

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const value = target.type === 'number' ? (target.value ? Number(target.value) : null) : target.value
    emit('update:modelValue', value)
}

const handleBlur = (event: Event) => {
    emit('blur', event)
}
</script>
