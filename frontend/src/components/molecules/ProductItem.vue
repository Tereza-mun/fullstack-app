<template>
    <div class="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] group">
        <div class="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-background-light to-background-lighter">
            <img
                :src="product.imageUrl || 'https://placehold.co/400x300?text=No+Image'"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.08]"
            />
        </div>
        <div class="p-6">
            <h3 class="font-sans text-lg font-semibold text-primary-dark mb-2 leading-tight">{{ product.name }}</h3>
            <p class="font-mono text-xl font-bold text-accent mb-4">€{{ product.price.toFixed(2) }}</p>
            <Button
                class="w-full"
                :type="isInCart ? 'secondary' : 'primary'"
                :aria-label="isInCart ? t('products.removeFromCartAria', { product: product.name }) : t('products.addToCartAria', { product: product.name })"
                @click="handleButtonClick"
            >
                {{ isInCart ? t('products.removeFromCart') : t('products.addToCart') }}
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import { useCartStore } from '../../stores/cart'

interface Product {
    id: number
    name: string
    price: number
    category: string
    imageUrl?: string
}

interface Props {
    product: Product
}

const props = defineProps<Props>()
const { t } = useI18n()
const cartStore = useCartStore()

const isInCart = computed(() => {
    return cartStore.items.some(item => item.id === props.product.id)
})

const handleButtonClick = () => {
    if (isInCart.value) {
        cartStore.removeFromCart(props.product.id)
    } else {
        cartStore.addToCart(props.product)
    }
}
</script>
