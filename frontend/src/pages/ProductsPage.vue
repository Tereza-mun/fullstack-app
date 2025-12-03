<template>
    <div class="max-w-[1200px] mx-auto px-8 py-8">
        <h2 class="font-serif text-[2.5rem] font-bold text-center mb-8 text-[#1a1a2e] tracking-tight">Our Products</h2>

        <ProductFilters v-model="filters" />

        <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
            <div v-for="p in filteredProducts" :key="p.id" class="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] group">
                <div class="relative w-full aspect-[4/3] overflow-hidden bg-linear-to-br from-[#f5f7fa] to-[#e4e8ec]">
                    <img
                        :src="p.imageUrl || 'https://placehold.co/400x300?text=No+Image'"
                        :alt="p.name"
                        class="w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.08]"
                    />
                </div>
                <div class="p-6">
                    <h3 class="font-sans text-lg font-semibold text-[#1a1a2e] mb-2 leading-tight">{{ p.name }}</h3>
                    <p class="font-mono text-xl font-bold text-[#e63946] mb-4">€{{ p.price.toFixed(2) }}</p>
                    <button 
                        class="w-full py-3.5 px-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white border-none rounded-lg font-sans text-sm font-semibold cursor-pointer transition-all duration-200 uppercase tracking-wider hover:bg-gradient-to-br hover:from-[#e63946] hover:to-[#d62839] hover:scale-[1.02] active:scale-[0.98]"
                        aria-label="Add to Cart"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
    
    
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { api } from '../services/api'
import ProductFilters, { type ProductFilters as Filters } from '../components/organisms/ProductFilters.vue'

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

