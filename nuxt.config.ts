// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  css: [
    'primeicons/primeicons.css',
    '~/assets/css/style.css'
  ],
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss'
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})