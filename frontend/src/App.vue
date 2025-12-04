<template>
    <div class="min-h-screen">
        <Header />
        <main class="py-8 px-4">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import Header from './components/organisms/Header.vue'
</script>
