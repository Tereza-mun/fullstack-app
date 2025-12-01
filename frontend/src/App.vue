<template>
    <div class="app">
        <header class="app-header">
            <h1 class="app-title">TechStore</h1>
        </header>
        <main class="app-main">
            <router-view />
        </main>
    </div>
</template>
    
    
<script setup>
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Playfair+Display:wght@700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: linear-gradient(180deg, #f8f9fc 0%, #eef1f5 100%);
    min-height: 100vh;
    color: #1a1a2e;
}

.app {
    min-height: 100vh;
}

.app-header {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    padding: 1.5rem 2rem;
    box-shadow: 0 4px 20px rgba(26, 26, 46, 0.3);
}

.app-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
    text-align: center;
    letter-spacing: 0.02em;
}

.app-main {
    padding: 2rem 1rem;
}
</style>