<template>
    <FormField :label="label" :error="error" :required="required">
        <div class="relative" ref="containerRef">
            <DropdownButton
                :placeholder="placeholder"
                :disabled="disabled"
                :error="!!error"
                :is-open="isOpen"
                @click="toggleDropdown"
            >
                <template #display>
                    <span v-if="selectedOption" class="flex items-center gap-2">
                        <img
                            :src="`/country-flags/svg/${selectedOption.flagCode.toLowerCase()}.svg`"
                            :alt="`${selectedOption.flagCode} flag`"
                            class="w-5 h-4 object-cover rounded-sm"
                            loading="lazy"
                            @error="handleFlagError"
                        />
                        {{ selectedOption.displayText }}
                    </span>
                </template>
            </DropdownButton>

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
                    <SearchInput
                        ref="searchInputRef"
                        v-model="searchValue"
                        :placeholder="searchPlaceholder"
                        @escape="closeDropdown"
                        @enter="selectFirstResult"
                    />

                    <div class="max-h-60 overflow-auto" ref="listRef">
                        <div v-if="filteredOptions.length === 0" class="px-4 py-3 text-sm text-gray-500">
                            {{ noResultsText }}
                        </div>

                        <FlagOptionItem
                            v-for="option in paginatedOptions"
                            :key="option.value"
                            :flag-code="option.flagCode"
                            :display-text="option.displayText"
                            :is-selected="option.value === modelValue"
                            @select="selectOption(option)"
                        />

                        <div
                            v-if="hasMoreItems"
                            ref="loadMoreTrigger"
                            class="h-1"
                        />
                    </div>
                </div>
            </transition>
        </div>
    </FormField>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import FormField from '../molecules/FormField.vue'
import DropdownButton from '../molecules/DropdownButton.vue'
import SearchInput from '../molecules/SearchInput.vue'
import FlagOptionItem from '../molecules/FlagOption.vue'

export interface FlagOption {
    value: string
    displayText: string
    flagCode: string
    searchableText: string
}

interface Props {
    modelValue: string
    label?: string
    options: FlagOption[]
    placeholder: string
    searchPlaceholder: string
    noResultsText: string
    error?: string
    disabled?: boolean
    required?: boolean
    normalizeSearch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    normalizeSearch: false
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

// State
const isOpen = ref(false)
const searchValue = ref('')
const containerRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<InstanceType<typeof SearchInput> | null>(null)
const listRef = ref<HTMLElement | null>(null)
const loadMoreTrigger = ref<HTMLElement | null>(null)

// Virtual scrolling state
const itemsPerPage = 50
const currentPage = ref(1)

// Cache for normalized strings
const normalizedCache = new Map<string, string>()

// Selected option object
const selectedOption = computed(() => {
    return props.options.find(opt => opt.value === props.modelValue)
})

// Normalize string for search with caching (only if normalizeSearch is true)
const normalizeString = (str: string): string => {
    if (!props.normalizeSearch) {
        return str.toLowerCase()
    }

    if (normalizedCache.has(str)) {
        return normalizedCache.get(str)!
    }

    const normalized = str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

    normalizedCache.set(str, normalized)
    return normalized
}

// Filter options based on search
const filteredOptions = computed(() => {
    if (!searchValue.value) {
        return props.options
    }

    const search = normalizeString(searchValue.value).replace(/\s/g, '')

    return props.options.filter((option) => {
        const searchable = normalizeString(option.searchableText).replace(/\s/g, '')
        return searchable.includes(search)
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
            if (searchInputRef.value && 'focus' in searchInputRef.value) {
                (searchInputRef.value as any).focus()
            }
        })
    }
}

const closeDropdown = () => {
    isOpen.value = false
}

const selectOption = (option: FlagOption) => {
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
    normalizedCache.clear()
})
</script>
