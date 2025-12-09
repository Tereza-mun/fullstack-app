<template>
    <footer class="bg-gradient-to-br from-primary-dark to-primary-darker px-4 md:px-8 py-6">
        <div class="max-w-[1200px] mx-auto text-center">
            <p class="text-white text-sm">
                TechStore © {{ getCurrentYear() }}
            </p>
        </div>
    </footer>
</template>

<script setup lang="ts">
const getCurrentYear = (): number => {
    return new Date().getFullYear()
}
</script>
