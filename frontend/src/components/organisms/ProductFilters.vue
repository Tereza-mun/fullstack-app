<template>
    <div class="bg-white rounded-xl p-6 mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 items-end mb-4">
            <Select
                v-model="filtersStore.filters.category"
                label="Category"
                :options="categoryOptions"
            />

            <Select
                v-model="filtersStore.filters.sortBy"
                label="Sort By"
                :options="sortOptions"
            />

            <Input
                v-model="filtersStore.filters.search"
                label="Search"
                type="text"
                placeholder="Search products..."
            />

            <Input
                v-model="filtersStore.filters.minPrice"
                label="Min Price (€)"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
            />

            <Input
                v-model="filtersStore.filters.maxPrice"
                label="Max Price (€)"
                type="number"
                min="0"
                step="0.01"
                placeholder="999.99"
            />
        
        </div>

        <div class="flex justify-center">
            <Button
                @click="filtersStore.resetFilters"
                type="secondary"
                aria-label="click to reset all filters"
                :disabled="filtersStore.filters.category === '' && filtersStore.filters.search === '' && filtersStore.filters.minPrice === null && filtersStore.filters.maxPrice === null && filtersStore.filters.sortBy === ''"
            >
                Reset Filters
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFiltersStore } from '../../stores/filters'
import Input from '../atoms/Input.vue'
import Select, { type SelectOption } from '../atoms/Select.vue'
import Button from '../atoms/Button.vue'

export interface ProductFilters {
    search: string
    category: string
    minPrice: number | null
    maxPrice: number | null
    sortBy: string
}

const filtersStore = useFiltersStore()

const categoryOptions: SelectOption[] = [
    { value: '', label: 'All Categories' },
    { value: 'audio', label: 'Audio' },
    { value: 'keyboardsAndMice', label: 'Keyboards & Mice' },
    { value: 'monitors', label: 'Monitors & Displays' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'storage', label: 'Storage' },
    { value: 'cables', label: 'Cables & Adapters' }
]

const sortOptions: SelectOption[] = [
    { value: '', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
]
</script>

