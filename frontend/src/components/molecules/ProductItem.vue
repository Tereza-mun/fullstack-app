<template>
    <div class="h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] group">
        <div class="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-background-light to-background-lighter">
            <img
                :src="product.imageUrl || 'https://placehold.co/400x300?text=No+Image'"
                :alt="productName"
                class="w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.08]"
            />
        </div>
        <div class="flex-1 flex flex-col justify-between p-6">
            <h3 class="font-sans text-lg font-semibold text-primary-dark mb-2 leading-tight">{{ productName }}</h3>
            <div>
                <p class="font-mono text-xl font-bold text-accent mb-4">€{{ product.price.toFixed(2) }}</p>
                <Button
                    class="w-full"
                    :type="isInCart ? 'secondary' : 'primary'"
                    :aria-label="isInCart ? t('products.removeFromCartAria', { product: productName }) : t('products.addToCartAria', { product: productName })"
                    @click="handleButtonClick"
                >
                    {{ isInCart ? t('products.removeFromCart') : t('products.addToCart') }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import { useCartStore } from '../../stores/cart'

interface ProductName {
    en: string
    cs: string
}

interface Product {
    id: number
    name: ProductName
    price: number
    category: string
    imageUrl?: string
}

interface Props {
    product: Product
}

const props = defineProps<Props>()
const { t, locale } = useI18n()
const cartStore = useCartStore()

const productName = computed(() => {
    const lang = locale.value as keyof ProductName
    return props.product.name[lang] || props.product.name.en
})

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
