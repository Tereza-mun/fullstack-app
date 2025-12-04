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
import { useProductsStore } from '../stores/products'
import ProductFilters, { type ProductFilters as Filters } from '../components/organisms/ProductFilters.vue'
import ProductItem from '../components/molecules/ProductItem.vue'
import Container from '../components/molecules/Container.vue'

const productsStore = useProductsStore()

const filters = ref<Filters>({
    search: '',
    category: '',
    minPrice: null,
    maxPrice: null,
    sortBy: ''
})

const filteredProducts = computed(() => {
    return productsStore.getFilteredProducts(filters.value)
})

onMounted(() => {
    productsStore.fetchProducts()
})
</script>

