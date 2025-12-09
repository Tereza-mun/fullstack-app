<template>
    <div class="min-h-screen flex flex-col">
        <Header />
        <main class="flex-1">
            <Container>
                <div class="max-w-md mx-auto text-center py-16">
                    <h1 class="font-serif text-[4rem] md:text-[6rem] font-bold text-primary-dark mb-4">
                        {{ error?.statusCode || 404 }}
                    </h1>
                    <h2 class="font-serif text-[1.5rem] md:text-[2rem] font-bold text-primary-dark mb-4">
                        {{ t('notFound.title') }}
                    </h2>
                    <p class="text-gray-600 mb-8">
                        {{ t('notFound.description') }}
                    </p>
                    <Button 
                        :tag="ButtonTag.NUXT_LINK" 
                        :variant="ButtonVariant.PRIMARY" 
                        to="/"
                        @click="handleError"
                    >
                        {{ t('notFound.backHome') }}
                    </Button>
                </div>
            </Container>
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Header from './components/organisms/Header.vue'
import Footer from './components/organisms/Footer.vue'
import Container from './components/molecules/Container.vue'
import Button from './components/atoms/Button.vue'
import { ButtonVariant, ButtonTag } from './types/common'

defineProps<{
    error: {
        statusCode: number
        message: string
    }
}>()

const { t } = useI18n()

useHtmlLang()

const handleError = () => clearError({ redirect: '/' })
</script>
