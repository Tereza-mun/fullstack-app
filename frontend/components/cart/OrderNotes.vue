<template>
    <div class="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6">
        <div class="space-y-6">
            <div class="flex flex-col gap-2">
                <label 
                    for="orderNotes"
                    class="font-sans text-sm font-semibold text-primary-dark uppercase tracking-wider"
                >
                    {{ t('deliveryInfo.notes') }}
                </label>
                <textarea
                    id="orderNotes"
                    name="notes"
                    :value="cartStore.formData.notes"
                    @input="cartStore.updateFormData({ notes: ($event.target as HTMLTextAreaElement).value })"
                    :placeholder="t('deliveryInfo.notesPlaceholder')"
                    rows="4"
                    class="w-full px-3 py-2 border-2 rounded-lg text-base transition-all duration-200 outline-none border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCartStore } from '../../stores/cart'

const { t } = useI18n()
const cartStore = useCartStore()
</script>
