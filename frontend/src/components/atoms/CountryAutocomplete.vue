<template>
    <FlagAutocomplete
        :model-value="modelValue"
        :label="label"
        :options="mappedOptions"
        :placeholder="placeholder || t('country.select')"
        :search-placeholder="t('country.search')"
        :no-results-text="t('country.noResults')"
        :error="error"
        :disabled="disabled"
        :required="required"
        :normalize-search="true"
        @update:model-value="$emit('update:modelValue', $event)"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import FlagAutocomplete, { type FlagOption } from './FlagAutocomplete.vue'
import type { Country } from '../../constants/countries'

interface Props {
    modelValue: string
    label?: string
    countries: Country[]
    error?: string
    disabled?: boolean
    required?: boolean
    placeholder?: string
}

const props = defineProps<Props>()
const { t } = useI18n()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

// Map countries to FlagOption format
const mappedOptions = computed<FlagOption[]>(() => {
    return props.countries.map(country => ({
        value: country.code,
        displayText: country.name,
        flagCode: country.code,
        searchableText: `${country.name} ${country.code}`
    }))
})
</script>
