<template>
    <header class="bg-gradient-to-br from-primary-dark to-primary-darker px-4 md:px-8 py-4 md:py-6 shadow-[0_4px_20px_rgba(26,26,46,0.3)]">
        <div class="max-w-[1200px] mx-auto flex justify-between items-center">
            <Button @click="goToHome" variant="home">
                {{ t('header.title') }}
            </Button>
            <div class="flex items-center gap-2 md:gap-6">
                <div class="relative">
                    <Button @click="goToCart" variant="iconButton" :aria-label="t('header.cart')">
                        <Cart :stroke="IconFill.WHITE" />
                        <span class="hidden md:block ml-3 text-lg text-white">{{ t('header.cartTitle') }}</span>
                        <CartBadge :count="cartStore.totalItems" />
                    </Button>
                </div>
                <div
                    v-if="!authStore.user"
                    class="flex items-center gap-2 md:gap-4"
                >
                    <Button @click="goToRegister" variant="iconButton" :aria-label="t('header.register')">
                        <UserPlus :stroke="IconFill.WHITE" />
                        <span class="hidden md:block ml-2 text-lg text-white">{{ t('header.register') }}</span>
                    </Button>
                    <Button @click="goToLogin" variant="iconButton" :aria-label="t('header.login')">
                        <User :stroke="IconFill.WHITE" />
                        <span class="hidden md:block ml-2 text-lg text-white">{{ t('header.login') }}</span>
                    </Button>
                </div>
                <div
                    v-else
                    class="flex items-center gap-2 md:gap-4"
                >
                    <Button @click="goToProfile" variant="iconButton" :aria-label="t('header.profile')">
                        <User :stroke="IconFill.WHITE" />
                        <span class="hidden md:block ml-2 text-lg text-white">{{ authStore.user.firstName }}</span>
                    </Button>
                    <Button @click="logout" variant="iconButton" class="text-sm">
                        <LogOut :stroke="IconFill.WHITE" />
                        <span class="hidden md:block ml-2 text-lg text-white">{{ t('header.logout') }}</span>
                    </Button>
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

                 <!-- <span v-if="user" class="hidden md:block text-white font-medium text-sm">
                        {{ user.firstName }} {{ user.lastName }}
                    </span>
                    <Button v-if="user" @click="logout" variant="secondary" class="text-sm">
                        {{ t('header.logout') }}
                    </Button> -->
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from '../atoms/Button.vue'
import Cart from '../atoms/icons/Cart.vue'
import User from '../atoms/icons/User.vue'
import UserPlus from '../atoms/icons/UserPlus.vue'
import LogOut from '../atoms/icons/LogOut.vue'
import CartBadge from '../atoms/CartBadge.vue'
import { useCartStore } from '../../stores/cart'
import { useAuthStore } from '../../stores/auth'
import { useAlertStore } from '../../stores/alert'
import flagCz from '../../assets/images/flag-cz.svg'
import flagEn from '../../assets/images/flag-en.svg'
import { IconFill } from '../../types/common'


const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()
const alertStore = useAlertStore()
const { t, locale } = useI18n()

onMounted(() => {
    authStore.initAuth()
})

const goToHome = () => {
    router.push('/')
}

const goToLogin = () => {
    router.push('/login')
}

const goToRegister = () => {
    router.push('/register/1')
}

const goToCart = () => {
    router.push('/cart/1')
}

const goToProfile = () => {
    router.push('/profile')
}

const toggleLocale = () => {
    locale.value = locale.value === 'en' ? 'cs' : 'en'
    localStorage.setItem('locale', locale.value)
}

const logout = () => {
    authStore.logout()
    router.push('/login')
    alertStore.showAlert({
        message: t('header.logoutSuccess'),
        bgColor: 'bg-green-500',
        textColor: 'text-white'
    })
}
</script>

