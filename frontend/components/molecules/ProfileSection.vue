<template>
    <div class="mb-8">
        <div class="flex items-center justify-between mb-4 border-b pb-2">
            <h3 class="text-lg font-semibold text-primary-dark">
                {{ title }}
            </h3>
            <div class="flex gap-2">
                <Button
                    v-if="isEditing"
                    :variant="ButtonVariant.PRIMARY"
                    :tag="ButtonTag.BUTTON"
                    :type="ButtonType.BUTTON"
                    :disabled="saving"
                    :aria-label="t('profile.clickToSave', { section: t(`profile.${section}`) })"
                    class="flex items-center gap-2"
                    @click="handleSave"
                >
                    <Spinner v-if="saving" size="xs" color="white" />
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                    </svg>
                    {{ saving ? t('profile.saving') : t('profile.save') }}
                </Button>
                <Button
                    :tag="ButtonTag.BUTTON"
                    :type="ButtonType.BUTTON"
                    :variant="ButtonVariant.ICON_BUTTON"
                    :aria-label="isEditing ? t('profile.cancelEdit') : t('profile.edit', { section: t(`profile.${section}`) })"
                    @click="toggleEdit"
                >
                    <svg v-if="isEditing" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </Button>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <slot :isEditing="isEditing" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import Spinner from '../atoms/Spinner.vue'
import { ButtonVariant, ButtonTag, ButtonType } from '../../types/common'

interface Props {
    title: string
    section: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'save': [section: string]
}>()

const { t } = useI18n()
const isEditing = ref(false)
const saving = ref(false)

const toggleEdit = () => {
    isEditing.value = !isEditing.value
}

const handleSave = async () => {
    saving.value = true
    emit('save', props.section)
    // The parent will handle the actual save and call a method to reset editing state
}

// Method to be called by parent after successful save
const resetEditState = () => {
    saving.value = false
    isEditing.value = false
}

// Method to be called by parent if save fails
const setSaveError = () => {
    saving.value = false
}

defineExpose({
    resetEditState,
    setSaveError
})
</script>
