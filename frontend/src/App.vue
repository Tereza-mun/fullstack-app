<template>
    <div class="min-h-screen">
        <Alert />
        <Header />
        <main>
            <router-view />
        </main>
        <Footer />
    </div>
</template>

<script setup>
import Header from './components/organisms/Header.vue'
import Footer from './components/organisms/Footer.vue'
import Alert from './components/molecules/Alert.vue'
</script>
