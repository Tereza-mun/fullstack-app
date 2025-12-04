<template>
    <Container>
        <h2 class="font-serif text-[2.5rem] font-bold text-center mb-8 text-[#1a1a2e] tracking-tight">Our Products</h2>

        <ProductFilters v-model="filters" />

        <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
            <ProductItem 
                v-for="product in filteredProducts" 
                :key="product.id" 
                :product="product" 
            />
        </div>
    </Container>
</template>
    
    
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { api } from '../services/api'
import ProductFilters, { type ProductFilters as Filters } from '../components/organisms/ProductFilters.vue'
import ProductItem from '../components/molecules/ProductItem.vue'
import Container from '../components/molecules/Container.vue'

interface Product {
    id: number
    name: string
    price: number
    category: string
    imageUrl?: string
}

const products = ref<Product[]>([])

const filters = ref<Filters>({
    search: '',
    category: '',
    minPrice: null,
    maxPrice: null
})

const filteredProducts = computed(() => {
    return products.value.filter(product => {
        // Search filter
        if (filters.value.search) {
            const searchLower = filters.value.search.toLowerCase()
            if (!product.name.toLowerCase().includes(searchLower)) {
                return false
            }
        }

        // Category filter
        if (filters.value.category && product.category !== filters.value.category) {
            return false
        }

        // Min price filter
        if (filters.value.minPrice !== null && product.price < filters.value.minPrice) {
            return false
        }

        // Max price filter
        if (filters.value.maxPrice !== null && product.price > filters.value.maxPrice) {
            return false
        }

        return true
    })
})

onMounted(async () => {
    try {
        products.value = await api.get<Product[]>('/products')
    } catch (error) {
        console.error('Failed to fetch products:', error)
    }
})
</script>

