<template>
    <div class="flex flex-col gap-2">
        <label v-if="label" class="font-sans text-sm font-semibold text-[#1a1a2e] uppercase tracking-wider">{{ label }}</label>
        <input
            :value="modelValue"
            @input="handleInput"
            :type="type"
            :placeholder="placeholder"
            :min="min"
            :max="max"
            :step="step"
            class="w-full px-3 py-3 border-2 rounded-lg text-base transition-all duration-200 outline-none border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10"
        />
    </div>
</template>

<script setup lang="ts">
interface Props {
    modelValue: string | number | null
    label?: string
    type?: string
    placeholder?: string
    min?: string | number
    max?: string | number
    step?: string | number
}

withDefaults(defineProps<Props>(), {
    type: 'text'
})

const emit = defineEmits<{
    'update:modelValue': [value: string | number | null]
}>()

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const value = target.type === 'number' ? (target.value ? Number(target.value) : null) : target.value
    emit('update:modelValue', value)
}
</script>

