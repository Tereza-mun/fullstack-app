<template>
    <Container>
        <div class="max-w-md mx-auto text-center py-16">
            <h1 class="font-serif text-[4rem] md:text-[6rem] font-bold text-primary-dark mb-4">
                404
            </h1>
            <h2 class="font-serif text-[1.5rem] md:text-[2rem] font-bold text-primary-dark mb-4">
                {{ t('notFound.title') }}
            </h2>
            <p class="text-gray-600 mb-8">
                {{ t('notFound.description') }}
            </p>
            <Button 
                :tag="ButtonTag.ROUTER_LINK" 
                :variant="ButtonVariant.PRIMARY" 
                to="/"
            >
                {{ t('notFound.backHome') }}
            </Button>
        </div>
    </Container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Container from '../components/molecules/Container.vue'
import Button from '../components/atoms/Button.vue'
import { ButtonVariant, ButtonTag } from '../types/common'

const { t } = useI18n()
</script>
