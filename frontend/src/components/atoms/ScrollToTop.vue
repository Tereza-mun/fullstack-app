<template>
    <Transition name="fade">
        <Button
            v-if="isVisible"
            @click="scrollToTop"
            variant="scrollToTop"
            aria-label="Scroll to top"
        >
            <ArrowUp :stroke="IconFill.WHITE" />
        </Button>
    </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ArrowUp from './icons/ArrowUp.vue'
import Button from './Button.vue'
import { IconFill } from '../../types/common'

const isVisible = ref(false)

const handleScroll = () => {
    isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
