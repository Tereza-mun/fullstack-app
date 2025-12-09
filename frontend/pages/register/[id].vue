<template>
    <Container>
        <RegisterForm :id="id" />
    </Container>
</template>

<script setup lang="ts">
import Container from '../../components/molecules/Container.vue'
import RegisterForm from '../../components/register/RegisterForm.vue'

definePageMeta({
  middleware: 'register-step'
})

const route = useRoute()
const id = computed(() => route.params.id as string)
</script>
