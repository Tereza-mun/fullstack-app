<template>
    <div class="min-h-screen">
        <Header />
        <main>
            <router-view />
        </main>
    </div>
</template>

<script setup>
import Header from './components/organisms/Header.vue'
</script>
