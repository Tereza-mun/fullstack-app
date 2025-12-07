<template>
    <div class="flex flex-col gap-2">
        <label v-if="label" class="font-sans text-sm font-semibold text-primary-dark uppercase tracking-wider">{{ label }}</label>
        <div class="relative" ref="selectRef">
            <button
                type="button"
                @click="toggleDropdown"
                class="w-full px-4 py-2 border-2 rounded-lg text-base bg-white cursor-pointer transition-all duration-200 outline-none border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 text-left flex items-center justify-between"
            >
                <span>{{ selectedLabel }}</span>
                <svg
                    class="w-5 h-5 transition-transform duration-200"
                    :class="{ 'rotate-180': isOpen }"
                    fill="none"
                    :stroke="IconFill.BLACK"
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
            >
                <div
                    v-if="isOpen"
                    class="absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                >
                    <div
                        v-for="option in options"
                        :key="option.value"
                        @click="selectOption(option)"
                        class="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors duration-150 flex items-center justify-between"
                        :class="{ 'bg-gray-50': option.value === modelValue }"
                    >
                        <span>{{ option.label }}</span>
                        <svg
                            v-if="option.value === modelValue"
                            class="w-5 h-5 text-gray-900"
                            fill="none"
                            :stroke="IconFill.BLACK"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { IconFill } from '../../types/common'

export interface SelectOption {
    value: string | number
    label: string
}

interface Props {
    modelValue: string | number
    label?: string
    options: SelectOption[]
}

const props = defineProps<Props>()
const { t } = useI18n()

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
}>()

const isOpen = ref(false)
const selectRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
    const selected = props.options.find(opt => opt.value === props.modelValue)
    return selected ? selected.label : t('common.selectOption')
})

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const selectOption = (option: SelectOption) => {
    emit('update:modelValue', option.value)
    isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

