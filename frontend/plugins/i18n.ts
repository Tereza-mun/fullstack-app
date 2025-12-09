import { createI18n } from 'vue-i18n'
import en from '../i18n/en'
import cs from '../i18n/cs'

export default defineNuxtPlugin((nuxtApp) => {
  const localeCookie = useCookie('locale', { 
    maxAge: 60 * 60 * 24 * 365, // 1 year
    default: () => 'en'
  })
  
  const validLocales = ['en', 'cs']
  const initialLocale = validLocales.includes(localeCookie.value) ? localeCookie.value : 'en'

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: initialLocale,
    fallbackLocale: 'en',
    messages: {
      en,
      cs
    }
  })

  nuxtApp.vueApp.use(i18n)
})
