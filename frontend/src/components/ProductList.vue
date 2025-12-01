<template>
    <div>
        <h2>Products</h2>
        <ul>
            <li v-for="p in products" :key="p.id">{{ p.name }} - {{ p.price }}€</li>
        </ul>
    </div>
</template>
    
    
<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { api } from '../services/api'
    
    interface Product {
        id: number
        name: string
        price: number
    }
    
    const products = ref<Product[]>([])
    
    onMounted(async () => {
        try {
            products.value = await api.get<Product[]>('/products')
        } catch (error) {
            console.error('Failed to fetch products:', error)
        }
    })
</script>