import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
    id: number
    name: string
    price: number
    category: string
    imageUrl?: string
    quantity: number
}

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([])

    const totalItems = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity, 0)
    })

    const totalPrice = computed(() => {
        return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    const addToCart = (product: { id: number; name: string; price: number; category: string; imageUrl?: string }) => {
        const existingItem = items.value.find(item => item.id === product.id)

        if (existingItem) {
            existingItem.quantity++
        } else {
            items.value.push({
                ...product,
                quantity: 1
            })
        }
    }

    const removeFromCart = (itemId: number) => {
        const index = items.value.findIndex(item => item.id === itemId)
        if (index !== -1) {
            items.value.splice(index, 1)
        }
    }

    const increaseQuantity = (itemId: number) => {
        const item = items.value.find(i => i.id === itemId)
        if (item) {
            item.quantity++
        }
    }

    const decreaseQuantity = (itemId: number) => {
        const item = items.value.find(i => i.id === itemId)
        if (item && item.quantity > 1) {
            item.quantity--
        }
    }

    const clearCart = () => {
        items.value = []
    }

    return {
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
    }
})
