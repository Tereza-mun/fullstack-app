<template>
    <header class="bg-gradient-to-br from-primary-dark to-primary-darker px-4 md:px-8 py-4 md:py-6 shadow-[0_4px_20px_rgba(26,26,46,0.3)]">
        <div class="max-w-[1200px] mx-auto flex justify-between items-center">
            <Button :tag="ButtonTag.NUXT_LINK" :to="'/'" :variant="ButtonVariant.HOME">
                {{ t('header.title') }}
            </Button>
            <div class="flex items-center gap-2 md:gap-6">
                <div class="relative">
                    <Button :tag="ButtonTag.NUXT_LINK" to="/cart/1" :variant="ButtonVariant.ICON_BUTTON" :aria-label="t('header.cart')">
                        <Cart :stroke="IconFill.WHITE" />
                        <span class="hidden md:block ml-3 text-lg text-white" :class="{ 'underline': isCartActive }">{{ t('header.cartTitle') }}</span>
                        <CartBadge :count="cartStore.totalItems" />
                    </Button>
                </div>
                <div
                    v-if="!authStore.user"
                    class="flex items-center gap-2 md:gap-4"
                >
                    <Button :tag="ButtonTag.NUXT_LINK" to="/register/1" :variant="ButtonVariant.ICON_BUTTON" :aria-label="t('header.register')">
                        <UserPlus :stroke="IconFill.WHITE" />
                        <span class="hidden md:block ml-2 text-lg text-white" :class="{ 'underline': isRegisterActive }">{{ t('header.register') }}</span>
                    </Button>
                    <Button :tag="ButtonTag.NUXT_LINK" to="/login" :variant="ButtonVariant.ICON_BUTTON" :aria-label="t('header.login')">
                        <User :stroke="IconFill.WHITE" />
                        <span class="hidden md:block ml-2 text-lg text-white" :class="{ 'underline': isLoginActive }">{{ t('header.login') }}</span>
                    </Button>
                </div>
                <div
                    v-else
                    class="flex items-center gap-2 md:gap-4"
                >
                    <Button :tag="ButtonTag.NUXT_LINK" to="/profile" :variant="ButtonVariant.ICON_BUTTON" :aria-label="t('header.profile')">
                        <User :stroke="IconFill.WHITE" />
                        <span class="hidden md:block ml-2 text-lg text-white" :class="{ 'underline': isProfileActive }">{{ authStore.user.firstName }}</span>
                    </Button>
                    <Button @click="logout" :variant="ButtonVariant.ICON_BUTTON"  class="text-sm">
                        <LogOut :stroke="IconFill.WHITE" />
                        <span class="hidden md:block ml-2 text-lg text-white">{{ t('header.logout') }}</span>
                    </Button>
                </div>
               
                <Button
                    @click="toggleLocale"
                    :variant="ButtonVariant.LANGUAGE_SWITCH"
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
import { onMounted, computed } from 'vue'
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
import { IconFill, ButtonVariant, ButtonTag } from '../../types/common'

const route = useRoute()
const cartStore = useCartStore()
const authStore = useAuthStore()
const alertStore = useAlertStore()
const { t, locale } = useI18n()

const isCartActive = computed(() => route.path.startsWith('/cart'))
const isLoginActive = computed(() => route.path === '/login')
const isRegisterActive = computed(() => route.path.startsWith('/register'))
const isProfileActive = computed(() => route.path === '/profile')

onMounted(() => {
    authStore.initAuth()
})

const toggleLocale = () => {
    locale.value = locale.value === 'en' ? 'cs' : 'en'
    if (process.client) {
        localStorage.setItem('locale', locale.value)
    }
}

const logout = async () => {
    authStore.logout()
    await navigateTo('/login')
    alertStore.showAlert({
        message: t('header.logoutSuccess'),
        bgColor: 'bg-green-500',
        textColor: 'text-white'
    })
}
</script>

