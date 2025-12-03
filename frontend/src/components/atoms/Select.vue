<template>
    <div class="flex flex-col gap-2">
        <label v-if="label" class="font-sans text-sm font-semibold text-[#1a1a2e] uppercase tracking-wider">{{ label }}</label>
        <select
            :value="modelValue"
            @change="handleChange"
            class="w-full px-3 py-3 border-2 rounded-lg text-base bg-white cursor-pointer transition-all duration-200 outline-none border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10"
        >
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                class="bg-white"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
export interface SelectOption {
    value: string | number
    label: string
}

interface Props {
    modelValue: string | number
    label?: string
    options: SelectOption[]
}

defineProps<Props>()

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
}>()

const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    emit('update:modelValue', target.value)
}
</script>

