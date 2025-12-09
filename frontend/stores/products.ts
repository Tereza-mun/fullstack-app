import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../services/api'

export interface ProductName {
    en: string
    cs: string
}

export interface ProductDescription {
    en: string
    cs: string
}

export interface ProductSpecifications {
    [key: string]: string | number
}

export interface Product {
    id: number
    name: ProductName
    description?: ProductDescription
    specifications?: ProductSpecifications
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
    const currentProduct = ref<Product | null>(null)
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

    const fetchProductById = async (id: number) => {
        loading.value = true
        error.value = null
        currentProduct.value = null
        try {
            currentProduct.value = await api.get<Product>(`/products/${id}`)
        } catch (e) {
            error.value = 'Failed to fetch product'
            console.error('Failed to fetch product:', e)
        } finally {
            loading.value = false
        }
    }

    const getFilteredProducts = (filters: ProductFilters, locale: string = 'en') => {
        const lang = locale as keyof ProductName
        
        let filtered = products.value.filter(product => {
            // Search filter - search in both languages
            if (filters.search) {
                const searchLower = filters.search.toLowerCase()
                const nameEn = product.name.en?.toLowerCase() || ''
                const nameCs = product.name.cs?.toLowerCase() || ''
                if (!nameEn.includes(searchLower) && !nameCs.includes(searchLower)) {
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
                const nameA = a.name[lang] || a.name.en
                const nameB = b.name[lang] || b.name.en
                switch (filters.sortBy) {
                    case 'price-asc':
                        return a.price - b.price
                    case 'price-desc':
                        return b.price - a.price
                    case 'name-asc':
                        return nameA.localeCompare(nameB)
                    case 'name-desc':
                        return nameB.localeCompare(nameA)
                    default:
                        return 0
                }
            })
        }

        return filtered
    }

    return {
        products,
        currentProduct,
        loading,
        error,
        fetchProducts,
        fetchProductById,
        getFilteredProducts
    }
}, {
    persist: true
})
