// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-03-28',
  devtools: { enabled: true },
  css: [
    'vuetify/styles', // Correct path for Vuetify 3 styles
    '@mdi/font/css/materialdesignicons.css',
  ],
  build: {
    transpile: ['vuetify'], // Ensure Vuetify is transpiled
  },
  plugins: [
    '~/plugins/vuetify.ts', // Ensure this path is correct
  ],
  runtimeConfig: {
    public: {
      PROD: process.env.PROD,
      DOMAIN: process.env.DOMAIN,
      NODE_ENV: process.env.NODE_ENV,
    },
  }
})