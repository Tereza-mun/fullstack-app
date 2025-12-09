<template>
    <div class="hidden md:flex h-full flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] group">
        <div 
            class="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-background-light to-background-lighter cursor-pointer"
            @click="$emit('navigate')"
        >
            <img
                :src="imageUrl"
                :alt="productName"
                class="w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.08]"
            />
        </div>
        <div class="flex-1 flex flex-col justify-between p-6">
            <h3 class="font-sans text-lg font-semibold text-primary-dark mb-2 leading-tight">{{ productName }}</h3>
            <div>
                <p class="font-mono text-xl font-bold text-accent mb-4">€{{ formattedPrice }}</p>
                <Button
                    class="w-full"
                    :variant="isInCart ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY"
                    :aria-label="buttonAriaLabel"
                    @click="$emit('cartAction')"
                >
                    {{ buttonText }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '../atoms/Button.vue'
import { ButtonVariant } from '../../types/common'

interface Props {
    productName: string
    formattedPrice: string
    imageUrl: string
    isInCart: boolean
    buttonAriaLabel: string
    buttonText: string
}

defineProps<Props>()
defineEmits<{
    navigate: []
    cartAction: []
}>()
</script>
