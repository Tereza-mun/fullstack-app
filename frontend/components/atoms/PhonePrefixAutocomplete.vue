<template>
    <FlagAutocomplete
        :model-value="modelValue"
        :label="label"
        :options="mappedOptions"
        :placeholder="t('phonePrefix.select')"
        :search-placeholder="t('phonePrefix.search')"
        :no-results-text="t('phonePrefix.noResults')"
        :error="error"
        :disabled="disabled"
        :required="required"
        @update:model-value="$emit('update:modelValue', $event)"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FlagAutocomplete, { type FlagOption } from './FlagAutocomplete.vue'

export interface PhonePrefixOption {
    value: string
    country: string
}

interface Props {
    modelValue: string
    label?: string
    options: PhonePrefixOption[]
    error?: string
    disabled?: boolean
    required?: boolean
}

const props = defineProps<Props>()
const { t } = useI18n()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

// Map phone prefix options to FlagOption format
const mappedOptions = computed<FlagOption[]>(() => {
    return props.options.map(option => ({
        value: option.value,
        displayText: option.value,
        flagCode: option.country,
        searchableText: option.value
    }))
})
</script>
