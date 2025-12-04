<template>
    <div class="flex items-center gap-8 p-6 border-b last:border-b-0 border-gray-100">
        <div class="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-background-light to-background-lighter">
            <img
                :src="item.imageUrl || 'https://placehold.co/400x300?text=No+Image'"
                :alt="item.name"
                class="w-full h-full object-cover"
            />
        </div>

        <div class="flex-1">
            <h3 class="font-sans text-lg font-semibold text-primary-dark mb-1">{{ item.name }}</h3>
            <p class="text-sm text-gray-500">{{ item.category }}</p>
        </div>

        <div class="flex items-center gap-2">
            <Button
                @click="handleDecreaseQuantity"
                type="counterButton"
                aria-label="Decrease quantity to {{ item.quantity - 1 }}"
            >
                -
            </Button>
            <span class="w-12 text-center font-semibold">{{ item.quantity }}</span>
            <Button
                @click="handleIncreaseQuantity"
                type="counterButton"
                aria-label="Increase quantity to {{ item.quantity + 1 }}"
            >
                +
            </Button>
        </div>

        <div class="w-24 text-right">
            <p class="font-mono text-xl font-bold text-accent">€{{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>

        <Button
            @click="handleRemove"
            type="iconButton"
            aria-label="Remove item {{ item.name }} from cart"
        >
            <Trash fill="#e63946" />
        </Button>
    </div>
</template>

<script setup lang="ts">
import Button from '../atoms/Button.vue'
import Trash from '../atoms/icons/Trash.vue'
import { useCartStore } from '../../stores/cart'

interface CartItem {
    id: number
    name: string
    price: number
    category: string
    imageUrl?: string
    quantity: number
}

interface Props {
    item: CartItem
}

const props = defineProps<Props>()
const cartStore = useCartStore()

const handleDecreaseQuantity = () => {
    cartStore.decreaseQuantity(props.item.id)
}

const handleIncreaseQuantity = () => {
    cartStore.increaseQuantity(props.item.id)
}

const handleRemove = () => {
    cartStore.removeFromCart(props.item.id)
}
</script>
