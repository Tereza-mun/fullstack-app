<template>
    <svg
        class="w-7 h-7"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        :stroke="stroke"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 8v6m3-3h-6"
        />
    </svg>
</template>

<script setup lang="ts">
interface Props {
    stroke?: string;
}

withDefaults(defineProps<Props>(), {
    stroke: '#1a1a2e'
});
</script>
