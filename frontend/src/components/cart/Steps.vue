<template>
    <div class="flex gap-2 sm:gap-3 md:gap-4 p-3 md:p-4 font-medium text-gray-500 bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.08)] mb-6">
        <div
            v-for="(step, index) in steps"
            :key="index"
            :class="`flex gap-2 md:gap-4 ${step.link ? 'cursor-pointer' : ''}`"
        >
            <div
                :class="[
                    'flex gap-2 sm:gap-3 md:gap-4 justify-center items-center text-gray-500',
                    index + 1 === parseInt(activeStep) && 'text-primary-dark cursor-pointer'
                ]"
                @click="navigateTo(step.link ?? '', index)"
            >
                <div
                    :class="[
                        'flex items-center justify-center p-2 w-4 h-4 text-xs border-2 border-solid border-gray-400 rounded-full',
                        index + 1 === parseInt(activeStep) && 'border-primary-dark'
                    ]"
                >
                    {{ index + 1 }}
                </div>
                <div
                    v-if="isDesktop || parseInt(activeStep) === index + 1"
                    class="text-sm leading-5 md:text-base"
                    v-html="step.label"
                />
            </div>
            <div
                v-if="index < steps.length - 1"
                class="flex items-center justify-center rotate-180"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    :class="[
                        'w-4 h-4 text-gray-400',
                        index + 1 === parseInt(activeStep) && 'text-primary-dark'
                    ]"
                >
                    <path fill-rule="evenodd" d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
    steps: Array<{
        label: string
        link?: string
    }>
    activeStep: string
}>()

const isDesktop = ref(false)

const checkScreenSize = () => {
    isDesktop.value = window.innerWidth >= 768
}

onMounted(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
})

const navigateTo = (link: string, index: number) => {
    if (link) {
        // Only allow navigation to previous steps
        if (index < parseInt(props.activeStep) - 1) {
            router.push(link)
        }
    }
}
</script>
