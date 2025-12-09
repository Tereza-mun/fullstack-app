<template>
    <div class="min-h-screen flex flex-col">
        <Alert />
        <Header />
        <main class="flex-1">
            <NuxtPage />
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from './components/organisms/Header.vue'
import Footer from './components/organisms/Footer.vue'
import Alert from './components/molecules/Alert.vue'

useHtmlLang()
</script>
