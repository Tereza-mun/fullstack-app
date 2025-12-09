// https://nuxt.com/docs/api/configuration/nuxt-config
import vue from '@vitejs/plugin-vue';

export default defineNuxtConfig({
  compatibilityDate: '2024-12-09',

  ssr: true,

  devtools: {
    enabled: process.env.NODE_ENV === 'development'
  },

  typescript: {
    strict: true,
    typeCheck: false, // Disable runtime type checking (use `nuxi typecheck` in CI instead)
  },

  modules: [
    '@pinia/nuxt',
  ],

  css: ['~/style.css'],

  runtimeConfig: {
    public: {
      recaptchaSiteKey: process.env.VITE_RECAPTCHA_SITE_KEY || '',
      apiBaseUrl: process.env.VITE_API_URL || 'http://localhost:3002',
      environment: process.env.NODE_ENV || 'development',
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3002',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    optimizeDeps: {
      include: ['axios']
    },
    resolve: {
      alias: {
        'form-data': 'form-data/lib/form_data.js'
      }
    }
  },

  nitro: {
      rollupConfig: {
        plugins: [vue() as any],
    },
    alias: {
      'form-data': 'unenv/runtime/mock/empty'
    }
  },

  pinia: {
    storesDirs: ['./stores/**']
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      title: 'TechStore',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'format-detection', content: 'telephone=no' },

        // SEO Meta Tags
        { name: 'description', content: 'TechStore - Your one-stop shop for premium tech accessories, audio equipment, monitors, keyboards, and more.' },
        { name: 'keywords', content: 'tech store, electronics, audio, keyboards, monitors, accessories, gaming' },
        { name: 'author', content: 'TechStore' },
        { name: 'robots', content: 'index, follow' },

        // Theme Color
        { name: 'theme-color', content: '#1d3557' },
        { name: 'msapplication-TileColor', content: '#1d3557' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://techstore-vue.netlify.app/' },
        { property: 'og:title', content: 'TechStore - Premium Tech Accessories' },
        { property: 'og:description', content: 'Your one-stop shop for premium tech accessories, audio equipment, monitors, keyboards, and more.' },
        { property: 'og:image', content: '/images/techstore.png' },
        { property: 'og:site_name', content: 'TechStore' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://techstore-vue.netlify.app/' },
        { name: 'twitter:title', content: 'TechStore - Premium Tech Accessories' },
        { name: 'twitter:description', content: 'Your one-stop shop for premium tech accessories, audio equipment, monitors, keyboards, and more.' },
        { name: 'twitter:image', content: '/images/techstore.png' },
      ],
      link: [
        // Favicons
        { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
      ],
    }
  },

  routeRules: {
    '/verify-email': { ssr: false }
  }
})
