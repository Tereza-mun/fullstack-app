<template>
    <header class="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] px-8 py-6 shadow-[0_4px_20px_rgba(26,26,46,0.3)]">
        <div class="max-w-[1200px] mx-auto flex justify-between items-center">
            <Button @click="goToHome" type="home">
                TechStore
            </Button>
            <Button @click="goToCart" type="navLink" aria-label="Go to cart">
                <Cart stroke="#ffffff" />
            </Button>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '../atoms/Button.vue'
import Cart from '../atoms/icons/Cart.vue'

const router = useRouter()

const goToHome = () => {
    router.push('/')
}

const goToCart = () => {
    router.push('/cart')
}
</script>

