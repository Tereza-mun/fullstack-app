import { createI18n } from 'vue-i18n'
import en from '../i18n/en'
import cs from '../i18n/cs'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en,
      cs
    }
  })

  nuxtApp.vueApp.use(i18n)
})
