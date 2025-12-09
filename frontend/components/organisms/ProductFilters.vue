<template>
    <!-- Mobile: Filter Button and Active Filters -->
    <div class="lg:hidden mb-8">
        <Button
            @click="openDrawer"
            :variant="ButtonVariant.SECONDARY"
            class="w-full"
        >
            {{ t('filters.openFilters') }}
        </Button>

        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-3">
            <FilterTag
                v-if="filtersStore.filters.category"
                :label="categoryLabel"
                @remove="removeFilter('category')"
            />
            <FilterTag
                v-if="filtersStore.filters.sortBy"
                :label="sortLabel"
                @remove="removeFilter('sortBy')"
            />
            <FilterTag
                v-if="filtersStore.filters.search"
                :label="`${t('filters.search')}: ${filtersStore.filters.search}`"
                @remove="removeFilter('search')"
            />
            <FilterTag
                v-if="filtersStore.filters.minPrice !== null || filtersStore.filters.maxPrice !== null"
                :label="priceRangeLabel"
                @remove="removeFilter('price')"
            />
        </div>
    </div>

    <!-- Mobile: Filter Drawer -->
    <FilterDrawer
        :is-open="isDrawerOpen"
        :filters="tempFilters"
        :category-options="categoryOptions"
        :sort-options="sortOptions"
        @close="closeDrawer"
        @apply="applyFilters"
    />

    <!-- Desktop: Original Filter Layout -->
    <div class="hidden lg:block bg-white rounded-xl p-6 mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
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
                :variant="ButtonVariant.SECONDARY"
                :aria-label="t('filters.resetFiltersLabel')"
                :disabled="filtersStore.filters.category === '' && filtersStore.filters.search === '' && filtersStore.filters.minPrice === null && filtersStore.filters.maxPrice === null && filtersStore.filters.sortBy === ''"
            >
                {{ t('filters.resetFilters') }}
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFiltersStore } from '../../stores/filters'
import Input from '../atoms/Input.vue'
import Select, { type SelectOption } from '../atoms/Select.vue'
import Button from '../atoms/Button.vue'
import FilterTag from '../atoms/FilterTag.vue'
import FilterDrawer from './FilterDrawer.vue'
import { ButtonVariant } from '../../types/common'

const isDrawerOpen = ref(false)

export interface ProductFilters {
    search: string
    category: string
    minPrice: number | null
    maxPrice: number | null
    sortBy: string
}

const { t } = useI18n()
const filtersStore = useFiltersStore()

// Temporary filters for mobile drawer
const tempFilters = ref<ProductFilters>({
    search: '',
    category: '',
    minPrice: null,
    maxPrice: null,
    sortBy: ''
})

// Initialize temp filters when drawer opens
const openDrawer = () => {
    tempFilters.value = { ...filtersStore.filters }
    isDrawerOpen.value = true
    document.body.style.overflow = 'hidden'
}

// Apply temp filters and close drawer
const applyFilters = (filters: ProductFilters) => {
    filtersStore.filters.category = filters.category
    filtersStore.filters.sortBy = filters.sortBy
    filtersStore.filters.search = filters.search
    filtersStore.filters.minPrice = filters.minPrice
    filtersStore.filters.maxPrice = filters.maxPrice
    tempFilters.value = { ...filters }
    isDrawerOpen.value = false
    document.body.style.overflow = ''
}

// Close drawer without applying
const closeDrawer = () => {
    isDrawerOpen.value = false
    document.body.style.overflow = ''
}

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

// Check if any filters are active
const hasActiveFilters = computed(() => {
    return (
        filtersStore.filters.category !== '' ||
        filtersStore.filters.sortBy !== '' ||
        filtersStore.filters.search !== '' ||
        filtersStore.filters.minPrice !== null ||
        filtersStore.filters.maxPrice !== null
    )
})

// Get human-readable labels for active filters
const categoryLabel = computed(() => {
    const option = categoryOptions.value.find(opt => opt.value === filtersStore.filters.category)
    return option ? option.label : ''
})

const sortLabel = computed(() => {
    const option = sortOptions.value.find(opt => opt.value === filtersStore.filters.sortBy)
    return option ? option.label : ''
})

const priceRangeLabel = computed(() => {
    const min = filtersStore.filters.minPrice
    const max = filtersStore.filters.maxPrice

    if (min !== null && max !== null) {
        return `€${min} - €${max}`
    } else if (min !== null) {
        return `${t('filters.minPrice')}: €${min}`
    } else if (max !== null) {
        return `${t('filters.maxPrice')}: €${max}`
    }
    return ''
})

// Remove individual filter
const removeFilter = (filterType: string) => {
    switch (filterType) {
        case 'category':
            filtersStore.filters.category = ''
            break
        case 'sortBy':
            filtersStore.filters.sortBy = ''
            break
        case 'search':
            filtersStore.filters.search = ''
            break
        case 'price':
            filtersStore.filters.minPrice = null
            filtersStore.filters.maxPrice = null
            break
    }
}
</script>

