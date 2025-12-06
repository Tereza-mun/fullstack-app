<template>
    <header class="bg-gradient-to-br from-primary-dark to-primary-darker px-4 md:px-8 py-4 md:py-6 shadow-[0_4px_20px_rgba(26,26,46,0.3)]">
        <div class="max-w-[1200px] mx-auto flex justify-between items-center">
            <Button @click="goToHome" variant="home">
                {{ t('header.title') }}
            </Button>
            <div class="flex items-center gap-2 md:gap-6">
                <Button @click="goToLogin" variant="iconButton" :aria-label="t('header.login')">
                    <User stroke="#ffffff" />
                </Button>
                <div class="relative">
                    <Button @click="goToCart" variant="iconButton" :aria-label="t('header.cart')">
                        <Cart stroke="#ffffff" />
                    </Button>
                    <CartBadge :count="cartStore.totalItems" />
                </div>
                <Button
                    @click="toggleLocale"
                    variant="languageSwitch"
                    :aria-label="t('header.switchLanguage', { language: locale === 'en' ? 'Čeština' : 'English' })"
                >
                    <img
                        :src="locale === 'en' ? flagCz : flagEn"
                        :alt="locale === 'en' ? 'Czech flag' : 'English flag'"
                        class="w-5 h-5 rounded-sm object-cover"
                    />
                    <span class="text-lg font-semibold">{{ locale === 'en' ? 'CS' : 'EN' }}</span>
                </Button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import Cart from '../atoms/icons/Cart.vue'
import User from '../atoms/icons/User.vue'
import CartBadge from '../atoms/CartBadge.vue'
import { useCartStore } from '../../stores/cart'
import flagCz from '../../assets/images/flag-cz.svg'
import flagEn from '../../assets/images/flag-en.svg'

const router = useRouter()
const cartStore = useCartStore()
const { t, locale } = useI18n()

const goToHome = () => {
    router.push('/')
}

const goToLogin = () => {
    router.push('/login')
}

const goToCart = () => {
    router.push('/cart/1')
}

const toggleLocale = () => {
    locale.value = locale.value === 'en' ? 'cs' : 'en'
    localStorage.setItem('locale', locale.value)
}
</script>

