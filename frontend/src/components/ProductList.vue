<template>
    <div class="products-container">
        <h2 class="products-title">Our Products</h2>
        <div class="products-grid">
            <div v-for="p in products" :key="p.id" class="product-card">
                <div class="product-image-wrapper">
                    <img 
                        :src="p.imageUrl || 'https://placehold.co/400x300?text=No+Image'" 
                        :alt="p.name"
                        class="product-image"
                    />
                </div>
                <div class="product-info">
                    <h3 class="product-name">{{ p.name }}</h3>
                    <p class="product-price">€{{ p.price.toFixed(2) }}</p>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
</template>
    
    
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '../services/api'

interface Product {
    id: number
    name: string
    price: number
    imageUrl?: string
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

<style scoped>
.products-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.products-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    color: #1a1a2e;
    letter-spacing: -0.02em;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}

.product-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.product-card:hover .product-image {
    transform: scale(1.08);
}

.product-info {
    padding: 1.5rem;
}

.product-name {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0 0 0.5rem 0;
    line-height: 1.3;
}

.product-price {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.25rem;
    font-weight: 700;
    color: #e63946;
    margin: 0 0 1rem 0;
}

.add-to-cart-btn {
    width: 100%;
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.add-to-cart-btn:hover {
    background: linear-gradient(135deg, #e63946 0%, #d62839 100%);
    transform: scale(1.02);
}

.add-to-cart-btn:active {
    transform: scale(0.98);
}
</style>