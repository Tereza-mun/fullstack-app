<template>
    <Container>
        <h2 class="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-center mb-4 md:mb-8 text-primary-dark tracking-tight">{{ t('products.title') }}</h2>

        <ProductFilters v-model="filtersStore.filters" />

        <div v-if="productsStore.loading" class="flex flex-col justify-center items-center py-10 md:py-20 gap-4">
            <Spinner size="md" />
            <p class="text-gray-600">{{ t('products.loading') }}</p>
        </div>

        <div v-else>
            <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3 md:gap-8">
                <ProductItem
                    v-for="product in paginatedProducts"
                    :key="product.id"
                    :product="product"
                />
            </div>

            <Pagination v-model="currentPage" :totalPages="totalPages" />
        </div>

        <ScrollToTop />
    </Container>
</template>
    
    
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProductsStore } from '../stores/products'
import { useFiltersStore } from '../stores/filters'
import ProductFilters from '../components/organisms/ProductFilters.vue'
import ProductItem from '../components/molecules/ProductItem.vue'
import Container from '../components/molecules/Container.vue'
import Pagination from '../components/molecules/Pagination.vue'
import Spinner from '../components/atoms/Spinner.vue'
import ScrollToTop from '../components/atoms/ScrollToTop.vue'

const { t, locale } = useI18n()
const productsStore = useProductsStore()
const filtersStore = useFiltersStore()

const ITEMS_PER_PAGE = 16
const currentPage = ref(1)

const filteredProducts = computed(() => {
    return productsStore.getFilteredProducts(filtersStore.filters, locale.value)
})

const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / ITEMS_PER_PAGE)
})

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredProducts.value.slice(start, end)
})

// Reset to page 1 when filters change
watch(() => filtersStore.filters, () => {
    currentPage.value = 1
}, { deep: true })

onMounted(() => {
    productsStore.fetchProducts()
})

onBeforeRouteLeave(() => {
    filtersStore.resetFilters()
})
</script>
