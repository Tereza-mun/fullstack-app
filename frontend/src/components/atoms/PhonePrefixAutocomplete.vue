<template>
    <div class="flex flex-col gap-2">
        <label
            v-if="label"
            class="font-sans text-sm font-semibold text-primary-dark uppercase tracking-wider"
            :class="{ 'text-red-600': error }"
        >
            {{ label }}
            <sup v-if="required" class="text-red-600">*</sup>
        </label>

        <div class="relative" ref="containerRef">
            <button
                type="button"
                @click="toggleDropdown"
                :disabled="disabled"
                class="w-full px-4 py-2 border-2 rounded-lg text-base bg-white cursor-pointer transition-all duration-200 outline-none border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10 text-left flex items-center justify-between"
                :class="{
                    'border-red-500 focus:border-red-500 focus:ring-red-500/10': error,
                    'opacity-50 cursor-not-allowed': disabled
                }"
            >
                <span v-if="selectedPrefix" class="flex items-center gap-2">
                    <img
                        :src="`/country-flags/svg/${selectedPrefix.country.toLowerCase()}.svg`"
                        :alt="`${selectedPrefix.country} flag`"
                        class="w-5 h-4 object-cover rounded-sm"
                        loading="lazy"
                        @error="handleFlagError"
                    />
                    {{ selectedPrefix.value }}
                </span>
                <span v-else class="text-gray-500">
                    {{ t('phonePrefix.select') }}
                </span>

                <svg
                    class="w-5 h-5 transition-transform duration-200 shrink-0"
                    :class="{ 'rotate-180': isOpen }"
                    fill="none"
                    stroke="currentColor"
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
                    class="absolute z-50 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden"
                >
                    <!-- Search input -->
                    <div class="relative border-b border-gray-200">
                        <input
                            ref="searchInputRef"
                            v-model="searchValue"
                            type="text"
                            :placeholder="t('phonePrefix.search')"
                            class="w-full px-4 py-3 pl-10 text-sm outline-none"
                            @keydown.escape="closeDropdown"
                            @keydown.enter.prevent="selectFirstResult"
                        />
                        <svg
                            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <!-- Options list -->
                    <div class="max-h-60 overflow-auto" ref="listRef">
                        <div v-if="filteredOptions.length === 0" class="px-4 py-3 text-sm text-gray-500">
                            {{ t('phonePrefix.noResults') }}
                        </div>

                        <div
                            v-for="option in paginatedOptions"
                            :key="option.value"
                            @click="selectOption(option)"
                            class="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors duration-150 flex items-center gap-3"
                            :class="{ 'bg-gray-50': option.value === modelValue }"
                        >
                            <img
                                :src="`/country-flags/svg/${option.country.toLowerCase()}.svg`"
                                :alt="`${option.country} flag`"
                                class="w-5 h-4 object-cover rounded-sm shrink-0"
                                loading="lazy"
                                @error="handleFlagError"
                            />
                            <span class="flex-1">{{ option.value }}</span>
                            <svg
                                v-if="option.value === modelValue"
                                class="w-5 h-5 text-gray-900 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <!-- Load more trigger for virtual scrolling -->
                        <div
                            v-if="hasMoreItems"
                            ref="loadMoreTrigger"
                            class="h-1"
                        />
                    </div>
                </div>
            </transition>
        </div>

        <p v-if="error" class="text-xs text-red-500">
            {{ error }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

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

// State
const isOpen = ref(false)
const searchValue = ref('')
const containerRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const loadMoreTrigger = ref<HTMLElement | null>(null)

// Virtual scrolling state
const itemsPerPage = 50
const currentPage = ref(1)

// Selected prefix object
const selectedPrefix = computed(() => {
    return props.options.find(opt => opt.value === props.modelValue)
})

// Filter options based on search (only by number)
const filteredOptions = computed(() => {
    if (!searchValue.value) {
        return props.options
    }

    const search = searchValue.value.toLowerCase().replace(/\s/g, '')

    return props.options.filter((option) => {
        return option.value.replace(/\s/g, '').includes(search)
    })
})

// Paginated options for virtual scrolling
const paginatedOptions = computed(() => {
    return filteredOptions.value.slice(0, currentPage.value * itemsPerPage)
})

const hasMoreItems = computed(() => {
    return paginatedOptions.value.length < filteredOptions.value.length
})

// Dropdown actions
const toggleDropdown = () => {
    if (props.disabled) return
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        currentPage.value = 1
        searchValue.value = ''
        nextTick(() => {
            searchInputRef.value?.focus()
        })
    }
}

const closeDropdown = () => {
    isOpen.value = false
}

const selectOption = (option: PhonePrefixOption) => {
    emit('update:modelValue', option.value)
    closeDropdown()
}

const selectFirstResult = () => {
    if (filteredOptions.value.length > 0) {
        selectOption(filteredOptions.value[0])
    }
}

// Handle flag loading errors
const handleFlagError = (event: Event) => {
    const img = event.target as HTMLImageElement
    img.style.display = 'none'
}

// Click outside handler
const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
        closeDropdown()
    }
}

// Intersection observer for infinite scroll
let observer: IntersectionObserver | null = null

const setupIntersectionObserver = () => {
    if (observer) {
        observer.disconnect()
    }

    observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && hasMoreItems.value) {
                currentPage.value++
            }
        },
        { threshold: 0.1 }
    )

    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value)
    }
}

// Reset pagination when search changes
watch(searchValue, () => {
    currentPage.value = 1
})

// Setup observer when dropdown opens
watch(isOpen, (newValue) => {
    if (newValue) {
        currentPage.value = 1
        nextTick(() => {
            setupIntersectionObserver()
        })
    }
})

// Watch for loadMoreTrigger ref changes
watch(loadMoreTrigger, (newRef) => {
    if (newRef && observer) {
        observer.observe(newRef)
    }
})

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    if (observer) {
        observer.disconnect()
    }
})
</script>
