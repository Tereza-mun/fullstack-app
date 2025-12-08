<template>
    <div class="flex flex-col items-center justify-center px-4">
        <div class="flex items-center gap-4 mb-8">
            <div class="flex-shrink-0">
                <Spinner size="lg" />
            </div>
            <div class="text-left">
                <h2 class="font-serif text-2xl md:text-3xl font-bold text-primary-dark leading-tight">
                    {{ t('verify.verifying') }}
                </h2>
                <p class="text-base text-gray-600 mt-1">
                    {{ t('verify.pleaseWait') }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Spinner from '../atoms/Spinner.vue'

const { t } = useI18n()
</script>
