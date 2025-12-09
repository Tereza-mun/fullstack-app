<template>
    <FlagAutocomplete
        :model-value="modelValue"
        :label="label"
        :options="mappedOptions"
        :placeholder="placeholder || t('countrySelect.select')"
        :search-placeholder="t('countrySelect.search')"
        :no-results-text="t('countrySelect.noResults')"
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
const { t, locale } = useI18n()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

// Map countries to FlagOption format with translated names
const mappedOptions = computed<FlagOption[]>(() => {
    // Access locale.value to make this computed reactive to language changes
    void locale.value
    
    return props.countries.map(country => {
        const translatedName = t(`country.${country.code.toLowerCase()}`)
        return {
            value: country.code,
            displayText: translatedName,
            flagCode: country.code,
            // Include both translated name and English name for better search
            searchableText: `${translatedName} ${country.name} ${country.code}`
        }
    })
})
</script>
