<template>
    <div v-if="totalPages > 1" class="flex justify-center items-center gap-3 mt-10">
        <Button 
            :variant="ButtonVariant.PAGINATION_BUTTON"
            @click="previousPage" 
            :disabled="modelValue === 1"
        >
            {{ t('pagination.previous') }}
        </Button>
        
        <span class="px-4 py-2 text-gray-600 font-medium">
            {{ t('pagination.page', { current: modelValue, total: totalPages }) }}
        </span>
        
        <Button 
            :variant="ButtonVariant.PAGINATION_BUTTON"
            @click="nextPage"
            :disabled="modelValue === totalPages"
        >
            {{ t('pagination.next') }}
        </Button>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import { ButtonVariant } from '../../types/common'

interface Props {
    modelValue: number
    totalPages: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'update:modelValue': [value: number]
}>()

const { t } = useI18n()

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const previousPage = () => {
    if (props.modelValue > 1) {
        emit('update:modelValue', props.modelValue - 1)
        scrollToTop()
    }
}

const nextPage = () => {
    if (props.modelValue < props.totalPages) {
        emit('update:modelValue', props.modelValue + 1)
        scrollToTop()
    }
}
</script>

