<template>
    <ProductItemMobile
        :product-name="productName"
        :formatted-price="formattedPrice"
        :image-url="imageUrl"
        :is-in-cart="isInCart"
        :button-aria-label="buttonAriaLabel"
        @navigate="goToProductDetail"
        @cart-action="handleButtonClick"
    />
    <ProductItemDesktop
        :product-name="productName"
        :formatted-price="formattedPrice"
        :image-url="imageUrl"
        :is-in-cart="isInCart"
        :button-aria-label="buttonAriaLabel"
        :button-text="buttonText"
        @navigate="goToProductDetail"
        @cart-action="handleButtonClick"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ProductItemMobile from './ProductItemMobile.vue'
import ProductItemDesktop from './ProductItemDesktop.vue'
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
const router = useRouter()
const { t, locale } = useI18n()
const cartStore = useCartStore()
const alertStore = useAlertStore()

const productName = computed(() => {
    const lang = locale.value as keyof ProductName
    return props.product.name[lang] || props.product.name.en
})

const formattedPrice = computed(() => props.product.price.toFixed(2))

const imageUrl = computed(() => 
    props.product.imageUrl || 'https://placehold.co/400x300?text=No+Image'
)

const isInCart = computed(() => 
    cartStore.items.some(item => item.id === props.product.id)
)

const buttonAriaLabel = computed(() => 
    isInCart.value 
        ? t('products.removeFromCartAria', { product: productName.value })
        : t('products.addToCartAria', { product: productName.value })
)

const buttonText = computed(() => 
    isInCart.value ? t('products.removeFromCart') : t('products.addToCart')
)

const goToProductDetail = () => {
    router.push(`/product/${props.product.id}`)
}

const handleButtonClick = () => {
    if (isInCart.value) {
        cartStore.removeFromCart(props.product.id)
        alertStore.showAlert({
            message: `${t('products.removedFromCart')} ${productName.value}`,
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
