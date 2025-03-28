// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-03-28',
  devtools: { enabled: true },
  css: [
    'vuetify/lib/styles/main.sass',
    "@mdi/font/css/materialdesignicons.css",
  ],
  build: {
    transpile: ['vuetify']
  },
  runtimeConfig: {
    public: {
      PROD: process.env.PROD,
      DOMAIN: process.env.DOMAIN,
      NODE_ENV: process.env.NODE_ENV,

    },
  }
})
