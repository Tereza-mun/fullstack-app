<template>
    <div class="bg-white rounded-xl p-6 mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 items-end">
        <Select
            v-model="localFilters.category"
            @update:modelValue="emitFilters"
            label="Category"
            :options="categoryOptions"
        />

        <Input
            v-model="localFilters.search"
            @update:modelValue="emitFilters"
            label="Search"
            type="text"
            placeholder="Search products..."
        />

        <Input
            v-model="localFilters.minPrice"
            @update:modelValue="emitFilters"
            label="Min Price (€)"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
        />

        <Input
            v-model="localFilters.maxPrice"
            @update:modelValue="emitFilters"
            label="Max Price (€)"
            type="number"
            min="0"
            step="0.01"
            placeholder="999.99"
        />

        <button @click="handleReset" class="py-3 px-6 bg-gradient-to-br from-[#e63946] to-[#d62839] text-white border-none rounded-lg font-sans text-sm font-semibold cursor-pointer transition-all duration-200 uppercase tracking-wider whitespace-nowrap hover:bg-gradient-to-br hover:from-[#d62839] hover:to-[#c91f2b] hover:scale-[1.02] active:scale-[0.98]">Reset Filters</button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Input from '../atoms/Input.vue'
import Select, { type SelectOption } from '../atoms/Select.vue'

export interface ProductFilters {
    search: string
    category: string
    minPrice: number | null
    maxPrice: number | null
}

interface Props {
    modelValue?: ProductFilters
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: () => ({
        search: '',
        category: '',
        minPrice: null,
        maxPrice: null
    })
})

const categoryOptions: SelectOption[] = [
    { value: '', label: 'All Categories' },
    { value: 'audio', label: 'Audio' },
    { value: 'keyboardsAndMice', label: 'Keyboards & Mice' },
    { value: 'monitors', label: 'Monitors & Displays' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'storage', label: 'Storage' },
    { value: 'cables', label: 'Cables & Adapters' }
]

const emit = defineEmits<{
    'update:modelValue': [value: ProductFilters]
}>()

const localFilters = ref<ProductFilters>({ ...props.modelValue })

watch(() => props.modelValue, (newValue) => {
    localFilters.value = { ...newValue }
}, { deep: true })

const emitFilters = () => {
    emit('update:modelValue', { ...localFilters.value })
}

const handleReset = () => {
    localFilters.value = {
        search: '',
        category: '',
        minPrice: null,
        maxPrice: null
    }
    emitFilters()
}
</script>

