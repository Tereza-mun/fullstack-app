<template>
    <Container>
        <h2 class="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-center mb-8 text-primary-dark tracking-tight">Shopping Cart</h2>

        <div v-if="cartStore.items.length === 0" class="text-center py-16">
            <p class="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <Button variant="primary" @click="goToProducts">Continue Shopping</Button>
        </div>

        <div v-else>
            <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-6">
                <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
            </div>

            <CartSummary @checkout="checkout" />
        </div>
    </Container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import Button from '../components/atoms/Button.vue'
import Container from '../components/molecules/Container.vue'
import CartItem from '../components/molecules/CartItem.vue'
import CartSummary from '../components/molecules/CartSummary.vue'

const router = useRouter()
const cartStore = useCartStore()

const goToProducts = () => {
    router.push('/')
}

const checkout = () => {
    // Implement checkout logic
    alert('Checkout functionality coming soon!')
}
</script>
