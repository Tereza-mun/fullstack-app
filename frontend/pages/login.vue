<template>
    <Container>
        <div class="max-w-md mx-auto">
            <h2 class="font-serif text-[1.75rem] md:text-[2.5rem] font-bold text-center mb-6 md:mb-8 text-primary-dark tracking-tight">
                {{ t('login.title') }}
            </h2>

            <AuthForm @success="onLoginSuccess" />
        </div>
    </Container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Container from '../components/molecules/Container.vue'
import AuthForm from '../components/organisms/AuthForm.vue'

const { t } = useI18n()
const router = useRouter()

const onLoginSuccess = () => {
    router.push('/')
}
</script>
