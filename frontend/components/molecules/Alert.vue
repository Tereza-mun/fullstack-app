<template>
    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
    >
        <div
            v-if="alertStore.isVisible"
            :class="[
                'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
                'px-6 py-4 rounded-lg shadow-lg',
                'flex items-center gap-3',
                'min-w-[300px] max-w-[500px]',
                alertStore.bgColor,
                alertStore.textColor
            ]"
        >
            <span class="flex-1 font-medium">{{ alertStore.message }}</span>
            <button
                @click="alertStore.hideAlert"
                :class="['hover:opacity-75 transition-opacity', alertStore.textColor]"
                aria-label="Close alert"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { useAlertStore } from '../../stores/alert'

const alertStore = useAlertStore()
</script>
