import { createI18n } from 'vue-i18n'
import en from './locales/en'
import cs from './locales/cs'

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') || 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        cs
    }
})

export default i18n
