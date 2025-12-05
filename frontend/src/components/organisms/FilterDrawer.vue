<template>
    <Transition name="drawer">
        <div
            v-if="isOpen"
            class="fixed inset-0 z-50 lg:hidden"
            @click.self="$emit('close')"
        >
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/50" @click="$emit('close')"></div>

            <!-- Drawer Content -->
            <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto shadow-xl">
                <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h3 class="text-lg font-bold text-primary-dark">{{ t('filters.openFilters') }}</h3>
                    <button
                        @click="$emit('close')"
                        class="text-gray-500 hover:text-gray-700"
                        aria-label="Close filters"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="p-6 space-y-6">
                    <Select
                        v-model="localFilters.category"
                        :label="t('filters.category')"
                        :options="categoryOptions"
                    />

                    <Select
                        v-model="localFilters.sortBy"
                        :label="t('filters.sortBy')"
                        :options="sortOptions"
                    />

                    <Input
                        v-model="localFilters.search"
                        :label="t('filters.search')"
                        type="text"
                        :placeholder="t('filters.searchPlaceholder')"
                    />

                    <div class="grid grid-cols-2 gap-3">
                        <Input
                            v-model="localFilters.minPrice"
                            :label="t('filters.minPrice')"
                            type="number"
                            min="0"
                            step="0.01"
                            :placeholder="t('filters.minPricePlaceholder')"
                        />

                        <Input
                            v-model="localFilters.maxPrice"
                            :label="t('filters.maxPrice')"
                            type="number"
                            min="0"
                            step="0.01"
                            :placeholder="t('filters.maxPricePlaceholder')"
                        />
                    </div>

                    <div class="flex gap-3">
                        <Button
                            @click="handleReset"
                            type="secondary"
                            class="flex-1"
                            :aria-label="t('filters.resetFiltersLabel')"
                            :disabled="localFilters.category === '' && localFilters.search === '' && localFilters.minPrice === null && localFilters.maxPrice === null && localFilters.sortBy === ''"
                        >
                            {{ t('filters.resetFilters') }}
                        </Button>
                        <Button
                            @click="$emit('apply', localFilters)"
                            type="primary"
                            class="flex-1"
                        >
                            {{ t('filters.applyFilters') }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Input from '../atoms/Input.vue'
import Select, { type SelectOption } from '../atoms/Select.vue'
import Button from '../atoms/Button.vue'

interface ProductFilters {
    search: string
    category: string
    minPrice: number | null
    maxPrice: number | null
    sortBy: string
}

interface Props {
    isOpen: boolean
    filters: ProductFilters
    categoryOptions: SelectOption[]
    sortOptions: SelectOption[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
    close: []
    apply: [filters: ProductFilters]
}>()

const { t } = useI18n()

const localFilters = ref<ProductFilters>({ ...props.filters })

// Update local filters when props change (when drawer opens)
watch(() => props.filters, (newFilters) => {
    localFilters.value = { ...newFilters }
}, { deep: true })

const handleReset = () => {
    localFilters.value = {
        search: '',
        category: '',
        minPrice: null,
        maxPrice: null,
        sortBy: ''
    }
}
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
    transition: opacity 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
    opacity: 0;
}

.drawer-enter-active .absolute.bottom-0,
.drawer-leave-active .absolute.bottom-0 {
    transition: transform 0.3s ease;
}

.drawer-enter-from .absolute.bottom-0,
.drawer-leave-to .absolute.bottom-0 {
    transform: translateY(100%);
}
</style>
