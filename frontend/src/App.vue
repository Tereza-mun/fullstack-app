<template>
    <div class="min-h-screen">
        <Alert />
        <Header />
        <main>
            <router-view />
        </main>
    </div>
</template>

<script setup>
import Header from './components/organisms/Header.vue'
import Alert from './components/molecules/Alert.vue'
</script>
