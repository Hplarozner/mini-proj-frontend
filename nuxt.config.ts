export default defineNuxtConfig({
  build: {
    transpile: ['vuetify']
  },
  vite: {
    optimizeDeps: {
      include: ['vuetify'],
    },
  }
})
