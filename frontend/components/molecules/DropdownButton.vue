<template>
    <button
        type="button"
        @click="$emit('click')"
        :disabled="disabled"
        class="w-full px-4 py-2 border-2 rounded-lg text-base bg-white cursor-pointer transition-all duration-200 outline-none border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 text-left flex items-center justify-between"
        :class="{
            'border-red-500 focus:border-red-500 focus:ring-red-500/10': error,
            'opacity-50 cursor-not-allowed': disabled
        }"
    >
        <slot name="display">
            <span class="text-gray-500">{{ placeholder }}</span>
        </slot>

        <svg
            class="w-5 h-5 transition-transform duration-200 shrink-0"
            :class="{ 'rotate-180': isOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
    </button>
</template>

<script setup lang="ts">
interface Props {
    placeholder?: string
    disabled?: boolean
    error?: boolean
    isOpen?: boolean
}

defineProps<Props>()

defineEmits<{
    click: []
}>()
</script>
