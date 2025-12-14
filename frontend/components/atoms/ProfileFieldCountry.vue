<template>
    <div :class="fullWidth ? 'md:col-span-2' : ''">
        <label class="text-sm text-gray-600">{{ label }}</label>
        <CountryAutocomplete
            v-if="isEditing"
            v-model="editValue"
            :countries="COUNTRIES"
        />
        <p v-else class="text-lg text-gray-900">{{ displayValue }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CountryAutocomplete from './CountryAutocomplete.vue'
import { COUNTRIES } from '../../constants/countries'

interface Props {
    label: string
    value?: string | null
    fullWidth?: boolean
    isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    fullWidth: false,
    isEditing: false
})

const emit = defineEmits<{
    'update:value': [value: string]
}>()

const { t } = useI18n()

const editValue = ref(props.value || '')

watch(() => props.value, (newValue) => {
    editValue.value = newValue || ''
})

watch(editValue, (newValue) => {
    emit('update:value', newValue)
})

const displayValue = computed(() => {
    if (props.value) {
        const country = props.value.toLowerCase()
        return t(`country.${country}`)
    }
    return '-'
})
</script>
