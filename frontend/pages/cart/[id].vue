<template>
    <Container>
        <CartForm :id="id" />
    </Container>
</template>

<script setup lang="ts">
import Container from '../../components/molecules/Container.vue'
import CartForm from '../../components/cart/CartForm.vue'

const route = useRoute()
const id = computed(() => route.params.id as string)
</script>
