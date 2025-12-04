<template>
    <div class="bg-white rounded-xl p-6 mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 items-end mb-4">
            <Select
                v-model="filtersStore.filters.category"
                :label="t('filters.category')"
                :options="categoryOptions"
            />

            <Select
                v-model="filtersStore.filters.sortBy"
                :label="t('filters.sortBy')"
                :options="sortOptions"
            />

            <Input
                v-model="filtersStore.filters.search"
                :label="t('filters.search')"
                type="text"
                :placeholder="t('filters.searchPlaceholder')"
            />

            <Input
                v-model="filtersStore.filters.minPrice"
                :label="t('filters.minPrice')"
                type="number"
                min="0"
                step="0.01"
                :placeholder="t('filters.minPricePlaceholder')"
            />

            <Input
                v-model="filtersStore.filters.maxPrice"
                :label="t('filters.maxPrice')"
                type="number"
                min="0"
                step="0.01"
                :placeholder="t('filters.maxPricePlaceholder')"
            />
        
        </div>

        <div class="flex justify-center">
            <Button
                @click="filtersStore.resetFilters"
                type="secondary"
                :aria-label="t('filters.resetFiltersLabel')"
                :disabled="filtersStore.filters.category === '' && filtersStore.filters.search === '' && filtersStore.filters.minPrice === null && filtersStore.filters.maxPrice === null && filtersStore.filters.sortBy === ''"
            >
                {{ t('filters.resetFilters') }}
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
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

const { t } = useI18n()
const filtersStore = useFiltersStore()

const categoryOptions = computed<SelectOption[]>(() => [
    { value: '', label: t('filters.categories.all') },
    { value: 'audio', label: t('filters.categories.audio') },
    { value: 'keyboardsAndMice', label: t('filters.categories.keyboardsAndMice') },
    { value: 'monitors', label: t('filters.categories.monitors') },
    { value: 'accessories', label: t('filters.categories.accessories') },
    { value: 'storage', label: t('filters.categories.storage') },
    { value: 'cables', label: t('filters.categories.cables') }
])

const sortOptions = computed<SelectOption[]>(() => [
    { value: '', label: t('filters.sort.default') },
    { value: 'price-asc', label: t('filters.sort.priceAsc') },
    { value: 'price-desc', label: t('filters.sort.priceDesc') },
    { value: 'name-asc', label: t('filters.sort.nameAsc') },
    { value: 'name-desc', label: t('filters.sort.nameDesc') }
])
</script>

