<template>
    <div class="min-h-screen bg-gradient-to-br from-background-light to-background-lighter py-8 px-4 md:px-8">
        <div class="max-w-[1200px] mx-auto">
            <!-- Back button -->
            <Button
                :variant="ButtonVariant.SECONDARY"
                class="mb-6"
                @click="goBack"
                :aria-label="t('productDetail.backToProducts')"
            >
                ← {{ t('productDetail.backToProducts') }}
            </Button>

            <!-- Loading state -->
            <div v-if="productsStore.loading" class="flex justify-center items-center py-20">
                <p class="text-lg text-gray-600">{{ t('products.loading') }}</p>
            </div>

            <!-- Error state -->
            <div v-else-if="productsStore.error" class="text-center py-20">
                <p class="text-lg text-red-500">{{ productsStore.error }}</p>
            </div>

            <!-- Product not found -->
            <div v-else-if="!product" class="text-center py-20">
                <p class="text-lg text-gray-600">{{ t('productDetail.notFound') }}</p>
            </div>

            <!-- Product details -->
            <div v-else class="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden">
                <div class="grid md:grid-cols-2 gap-0">
                    <!-- Image -->
                    <div class="relative aspect-[4/3] md:aspect-auto md:h-full bg-gradient-to-br from-background-light to-background-lighter">
                        <img
                            :src="product.imageUrl || 'https://placehold.co/600x600?text=No+Image'"
                            :alt="productName"
                            class="w-full h-full object-cover"
                        />
                    </div>

                    <!-- Details -->
                    <div class="p-6 md:p-10 flex flex-col">
                        <div class="flex-1">
                            <span class="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
                                {{ getCategoryLabel(product.category) }}
                            </span>
                            <h1 class="font-sans text-2xl md:text-3xl font-bold text-primary-dark mb-4">
                                {{ productName }}
                            </h1>
                            <p class="font-mono text-3xl md:text-4xl font-bold text-accent mb-6">
                                €{{ product.price.toFixed(2) }}
                            </p>

                            <!-- Description -->
                            <div v-if="productDescription" class="mb-6">
                                <h2 class="font-sans text-lg font-semibold text-primary-dark mb-2">
                                    {{ t('productDetail.description') }}
                                </h2>
                                <p class="text-gray-600 leading-relaxed">
                                    {{ productDescription }}
                                </p>
                            </div>

                            <!-- Technical Specifications -->
                            <div v-if="product.specifications && Object.keys(product.specifications).length > 0" class="mb-8">
                                <h2 class="font-sans text-lg font-semibold text-primary-dark mb-3">
                                    {{ t('productDetail.specifications') }}
                                </h2>
                                <div class="bg-gray-50 rounded-lg overflow-hidden">
                                    <div 
                                        v-for="(value, key) in product.specifications" 
                                        :key="key"
                                        class="flex border-b border-gray-200 last:border-b-0"
                                    >
                                        <span class="w-1/2 px-4 py-3 font-medium text-gray-700 bg-gray-100">
                                            {{ key }}
                                        </span>
                                        <span class="w-1/2 px-4 py-3 text-gray-600">
                                            {{ value }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Add to cart button -->
                        <Button
                            class="w-full"
                            :variant="isInCart ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY"
                            :aria-label="isInCart ? t('products.removeFromCartAria', { product: productName }) : t('products.addToCartAria', { product: productName })"
                            @click="handleCartClick"
                        >
                            {{ isInCart ? t('products.removeFromCart') : t('products.addToCart') }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <ScrollToTop />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from '../components/atoms/Button.vue'
import ScrollToTop from '../components/atoms/ScrollToTop.vue'
import { useProductsStore, type ProductName, type ProductDescription } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { useAlertStore } from '../stores/alert'
import { ButtonVariant } from '../types/common'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const alertStore = useAlertStore()

const product = computed(() => productsStore.currentProduct)

const productName = computed(() => {
    if (!product.value) return ''
    const lang = locale.value as keyof ProductName
    return product.value.name[lang] || product.value.name.en
})

const productDescription = computed(() => {
    if (!product.value?.description) return ''
    const lang = locale.value as keyof ProductDescription
    return product.value.description[lang] || product.value.description.en
})

const isInCart = computed(() => {
    if (!product.value) return false
    return cartStore.items.some(item => item.id === product.value!.id)
})

const getCategoryLabel = (category: string): string => {
    const categoryMap: Record<string, string> = {
        audio: t('filters.categories.audio'),
        keyboardsAndMice: t('filters.categories.keyboardsAndMice'),
        monitors: t('filters.categories.monitors'),
        accessories: t('filters.categories.accessories'),
        storage: t('filters.categories.storage'),
        cables: t('filters.categories.cables')
    }
    return categoryMap[category] || category
}

const goBack = () => {
    router.push('/')
}

const handleCartClick = () => {
    if (!product.value) return
    
    if (isInCart.value) {
        cartStore.removeFromCart(product.value.id)
        alertStore.showAlert({
            message: `${t('products.removedFromCart')} ${productName.value}`,
            bgColor: 'bg-red-500',
            textColor: 'text-white'
        })
    } else {
        cartStore.addToCart(product.value)
        alertStore.showAlert({
            message: `${t('products.addedToCart')} ${productName.value}`,
            bgColor: 'bg-green-500',
            textColor: 'text-white'
        })
    }
}

onMounted(() => {
    window.scrollTo(0, 0)
    const productId = Number(route.params.id)
    if (productId) {
        productsStore.fetchProductById(productId)
    }
})
</script>
