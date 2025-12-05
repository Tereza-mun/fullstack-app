<template>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 p-4 md:p-6 border-b last:border-b-0 border-gray-100">
        <div class="flex items-center gap-4">
            <div class="w-24 h-16 md:w-32 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-background-light to-background-lighter">
                <img
                    :src="item.imageUrl || 'https://placehold.co/400x300?text=No+Image'"
                    :alt="itemName"
                    class="w-full h-full object-cover"
                />
            </div>

            <div class="flex-1">
                <h3 class="font-sans text-lg font-semibold text-primary-dark mb-1">{{ itemName }}</h3>
                <p class="text-sm text-gray-500">{{ categoryName }}</p>
            </div>
        </div>
        <div class="flex items-center max-sm:justify-between gap-2 md:gap-4">
            <div class="flex items-center gap-1">
                <Button
                    @click="handleDecreaseQuantity"
                    type="counterButton"
                    :aria-label="`${t('cart.decreaseQuantity')} ${item.quantity - 1}`"
                >
                    -
                </Button>
                <span class="w-12 text-center font-semibold">{{ item.quantity }}</span>
                <Button
                    @click="handleIncreaseQuantity"
                    type="counterButton"
                    :aria-label="`${t('cart.increaseQuantity')} ${item.quantity + 1}`"
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
                :aria-label="`${t('cart.removeItem')} ${itemName}`"
            >
                <Trash fill="#e63946" />
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import Trash from '../atoms/icons/Trash.vue'
import { useCartStore } from '../../stores/cart'
import { useAlertStore } from '../../stores/alert'

interface ItemName {
    en: string
    cs: string
}

interface CartItem {
    id: number
    name: ItemName
    price: number
    category: string
    imageUrl?: string
    quantity: number
}

interface Props {
    item: CartItem
}

const props = defineProps<Props>()
const { t, locale } = useI18n()
const cartStore = useCartStore()
const alertStore = useAlertStore()

const itemName = computed(() => {
    const lang = locale.value as keyof ItemName
    return props.item.name[lang] || props.item.name.en
})

const categoryName = computed(() => {
    return t(`filters.categories.${props.item.category}`)
})

const handleDecreaseQuantity = () => {
    cartStore.decreaseQuantity(props.item.id)
}

const handleIncreaseQuantity = () => {
    cartStore.increaseQuantity(props.item.id)
}

const handleRemove = () => {
    cartStore.removeFromCart(props.item.id)
    alertStore.showAlert({
        message: `${t('products.removedFromCart')} ${itemName.value}`,
        bgColor: 'bg-red-500',
        textColor: 'text-white'
    })
}
</script>
