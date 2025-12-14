<template>
    <div>
        <label class="text-sm text-gray-600">{{ label }}</label>
        <div v-if="isEditing" class="grid grid-cols-2 gap-2">
            <PhonePrefixAutocomplete
                v-model="editPrefix"
                :options="PHONE_PREFIXES"
            />
            <Input
                v-model="editNumber"
                :type="InputType.TEL"
                :placeholder="t('profile.phoneNumber')"
            />
        </div>
        <p v-else class="text-lg text-gray-900">{{ displayValue }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Input from './Input.vue'
import PhonePrefixAutocomplete from './PhonePrefixAutocomplete.vue'
import { PHONE_PREFIXES } from '../../constants/phonePrefixes'
import { InputType } from '../../types/common'

interface Props {
    label: string
    prefix?: string | null
    number?: string | null
    isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isEditing: false
})

const emit = defineEmits<{
    'update:prefix': [value: string]
    'update:number': [value: string]
}>()

const { t } = useI18n()

const editPrefix = ref(props.prefix || '')
const editNumber = ref(props.number || '')

watch(() => props.prefix, (newValue) => {
    editPrefix.value = newValue || ''
})

watch(() => props.number, (newValue) => {
    editNumber.value = newValue || ''
})

watch(editPrefix, (newValue) => {
    emit('update:prefix', newValue)
})

watch(editNumber, (newValue) => {
    emit('update:number', newValue)
})

const displayValue = computed(() => {
    if (props.prefix && props.number) {
        return `${props.prefix} ${props.number}`
    }
    return '-'
})
</script>
