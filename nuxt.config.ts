export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    'vuetify/styles', // ✅ Correct for Vuetify 3
    "@mdi/font/css/materialdesignicons.css",
  ],
  build: {
    transpile: ['vuetify']
  },
  runtimeConfig: {
    public: {
      NODE_ENV : process.env.NODE_ENV,
      DOMAIN   : process.env.DOMAIN,
      PROD     : process.env.PROD
    }
  }
})
