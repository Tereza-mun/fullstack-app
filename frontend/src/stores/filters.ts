import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ProductFilters {
    search: string
    category: string
    minPrice: number | null
    maxPrice: number | null
    sortBy: string
}

export const useFiltersStore = defineStore('filters', () => {
    const filters = ref<ProductFilters>({
        search: '',
        category: '',
        minPrice: null,
        maxPrice: null,
        sortBy: ''
    })

    const resetFilters = () => {
        filters.value = {
            search: '',
            category: '',
            minPrice: null,
            maxPrice: null,
            sortBy: ''
        }
    }

    return {
        filters,
        resetFilters
    }
}, {
    persist: true
})
