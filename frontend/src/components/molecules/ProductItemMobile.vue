<template>
    <div class="md:hidden flex bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-300 active:scale-[0.98] group">
        <div 
            class="relative w-28 h-20 flex-shrink-0 overflow-hidden bg-gradient-to-br from-background-light to-background-lighter cursor-pointer"
            @click="$emit('navigate')"
        >
            <img
                :src="imageUrl"
                :alt="productName"
                class="w-full h-full object-cover"
            />
        </div>
        <div class="flex-1 flex flex-col justify-center px-3 py-2 min-w-0">
            <div>
                <h3 class="font-sans text-sm font-semibold text-primary-dark leading-tight line-clamp-2">{{ productName }}</h3>
            </div>
            <div class="flex items-center justify-between">
                <p class="font-mono text-base font-bold text-accent">€{{ formattedPrice }}</p>
                <Button
                    :variant="isInCart ? ButtonVariant.REMOVE_FROM_CART : ButtonVariant.ADD_TO_CART"
                    :aria-label="buttonAriaLabel"
                    @click="$emit('cartAction')"
                >
                    <Cart class="!w-4 !h-4" :stroke="IconFill.WHITE" />
                    <span class="text-sm font-bold">{{ isInCart ? '−' : '+' }}</span>
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '../atoms/Button.vue'
import Cart from '../atoms/icons/Cart.vue'
import { IconFill, ButtonVariant } from '../../types/common'

interface Props {
    productName: string
    formattedPrice: string
    imageUrl: string
    isInCart: boolean
    buttonAriaLabel: string
}

defineProps<Props>()
defineEmits<{
    navigate: []
    cartAction: []
}>()
</script>
