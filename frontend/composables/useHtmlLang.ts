import { useI18n } from 'vue-i18n'

export const useHtmlLang = () => {
  const { locale } = useI18n()

  useHead({
    htmlAttrs: {
      lang: locale
    }
  })
}
