<template>
    <!-- Mobile: horizontal compact layout -->
    <div class="md:hidden flex bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-300 active:scale-[0.98] group">
        <div class="relative w-28 h-20 flex-shrink-0 overflow-hidden bg-gradient-to-br from-background-light to-background-lighter">
            <img
                :src="product.imageUrl || 'https://placehold.co/400x300?text=No+Image'"
                :alt="productName"
                class="w-full h-full object-cover"
            />
        </div>
        <div class="flex-1 flex flex-col justify-center px-3 py-2 min-w-0">
            <div>
                <h3 class="font-sans text-sm font-semibold text-primary-dark leading-tight line-clamp-2">{{ productName }}</h3>
            </div>
            <div class="flex items-center justify-between">
                <p class="font-mono text-base font-bold text-accent">€{{ product.price.toFixed(2) }}</p>
                <Button
                    :type="isInCart ? 'removeFromCart' : 'addToCart'"
                    :aria-label="isInCart ? t('products.removeFromCartAria', { product: productName }) : t('products.addToCartAria', { product: productName })"
                    @click="handleButtonClick"
                >
                    <Cart class="!w-4 !h-4" stroke="currentColor" />
                    <span class="text-sm font-bold">{{ isInCart ? '−' : '+' }}</span>
                </Button>
            </div>
        </div>
    </div>

    <!-- Desktop: vertical card layout -->
    <div class="hidden md:flex h-full flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] group">
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
import Cart from '../atoms/icons/Cart.vue'
import { useCartStore } from '../../stores/cart'
import { useAlertStore } from '../../stores/alert'

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
const alertStore = useAlertStore()

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
        alertStore.showAlert({
            message: `${t('products.removedFromCart')} ${productName.value} `,
            bgColor: 'bg-red-500',
            textColor: 'text-white'
        })
    } else {
        cartStore.addToCart(props.product)
        alertStore.showAlert({
            message: `${t('products.addedToCart')} ${productName.value}`,
            bgColor: 'bg-green-500',
            textColor: 'text-white'
        })
    }
}
</script>
