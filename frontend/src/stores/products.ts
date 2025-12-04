import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../services/api'

export interface Product {
    id: number
    name: string
    price: number
    category: string
    imageUrl?: string
}

export interface ProductFilters {
    search: string
    category: string
    minPrice: number | null
    maxPrice: number | null
    sortBy: string
}

export const useProductsStore = defineStore('products', () => {
    const products = ref<Product[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchProducts = async () => {
        loading.value = true
        error.value = null
        try {
            products.value = await api.get<Product[]>('/products')
        } catch (e) {
            error.value = 'Failed to fetch products'
            console.error('Failed to fetch products:', e)
        } finally {
            loading.value = false
        }
    }

    const getFilteredProducts = (filters: ProductFilters) => {
        let filtered = products.value.filter(product => {
            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase()
                if (!product.name.toLowerCase().includes(searchLower)) {
                    return false
                }
            }

            // Category filter
            if (filters.category && product.category !== filters.category) {
                return false
            }

            // Min price filter
            if (filters.minPrice !== null && product.price < filters.minPrice) {
                return false
            }

            // Max price filter
            if (filters.maxPrice !== null && product.price > filters.maxPrice) {
                return false
            }

            return true
        })

        // Apply sorting
        if (filters.sortBy) {
            filtered = [...filtered].sort((a, b) => {
                switch (filters.sortBy) {
                    case 'price-asc':
                        return a.price - b.price
                    case 'price-desc':
                        return b.price - a.price
                    case 'name-asc':
                        return a.name.localeCompare(b.name)
                    case 'name-desc':
                        return b.name.localeCompare(a.name)
                    default:
                        return 0
                }
            })
        }

        return filtered
    }

    return {
        products,
        loading,
        error,
        fetchProducts,
        getFilteredProducts
    }
}, {
    persist: true
})
