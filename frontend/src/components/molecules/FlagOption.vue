<template>
    <div
        @click="$emit('select')"
        class="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors duration-150 flex items-center gap-3"
        :class="{ 'bg-gray-50': isSelected }"
    >
        <img
            :src="`/country-flags/svg/${flagCode.toLowerCase()}.svg`"
            :alt="`${flagCode} flag`"
            class="w-5 h-4 object-cover rounded-sm shrink-0"
            loading="lazy"
            @error="handleFlagError"
        />
        <span class="flex-1">{{ displayText }}</span>
        <svg
            v-if="isSelected"
            class="w-5 h-5 text-gray-900 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
    </div>
</template>

<script setup lang="ts">
interface Props {
    flagCode: string
    displayText: string
    isSelected?: boolean
}

defineProps<Props>()

defineEmits<{
    select: []
}>()

const handleFlagError = (event: Event) => {
    const img = event.target as HTMLImageElement
    img.style.display = 'none'
}
</script>
