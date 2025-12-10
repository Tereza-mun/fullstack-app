<template>
    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
    >
        <div
            v-if="alertStore.isVisible"
            :class="[
                'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
                'px-6 py-4 rounded-lg shadow-lg',
                'flex items-center gap-3',
                'min-w-[300px] max-w-[500px]',
                alertStore.bgColor,
                alertStore.textColor
            ]"
        >
            <span class="flex-1 font-medium">{{ alertStore.message }}</span>
            <Button
                @click="alertStore.hideAlert"
                :variant="ButtonVariant.CLOSE"
                :aria-label="t('common.closeAlert')"
                :class="alertStore.textColor"
            >
                <Close :stroke="alertStore.textColor === 'text-white' ? '#ffffff' : 'currentColor'" />
            </Button>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAlertStore } from '../../stores/alert'
import Button from '../atoms/Button.vue'
import Close from '../atoms/icons/Close.vue'
import { ButtonVariant } from '../../types/common'

const { t } = useI18n()
const alertStore = useAlertStore()
</script>
