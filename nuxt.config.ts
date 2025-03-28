// nuxt.config.ts
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-03-28',
  devtools: { enabled: true },
  css: [
    'vuetify/styles', // Correct path for Vuetify 3 styles
    '@mdi/font/css/materialdesignicons.css',
  ],
  vite: {
    plugins: [
      vuetify()
    ]
  },
  plugins: [
    '~/plugins/vuetify.ts', // Ensure this path is correct
  ],
  runtimeConfig: {
    public: {
      URL: process.env.URL,
      DOMAIN: process.env.DOMAIN,
      NODE_ENV: process.env.NODE_ENV,
    },
  }
})