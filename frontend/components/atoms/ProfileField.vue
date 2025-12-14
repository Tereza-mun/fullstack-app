<template>
    <div :class="fullWidth ? 'md:col-span-2' : ''">
        <label class="text-sm text-gray-600">{{ label }}</label>
        <Input
            v-if="isEditing"
            v-model="editValue"
            :type="type"
            :placeholder="label"
        />
        <p v-else class="text-lg text-gray-900 h-[48px]">{{ displayValue }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import Input from './Input.vue'
import { InputType } from '../../types/common'

interface Props {
    label: string
    value?: string | null
    fullWidth?: boolean
    isEditing?: boolean
    type?: string
}

const props = withDefaults(defineProps<Props>(), {
    fullWidth: false,
    isEditing: false,
    type: InputType.TEXT
})

const emit = defineEmits<{
    'update:value': [value: string]
}>()

const editValue = ref(props.value || '')

watch(() => props.value, (newValue) => {
    editValue.value = newValue || ''
})

watch(editValue, (newValue) => {
    emit('update:value', newValue)
})

const displayValue = computed(() => props.value || '-')
</script>
