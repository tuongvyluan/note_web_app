import { resolve } from 'path'
export default defineNuxtConfig({
  alias: {
    images: resolve(__dirname, './assets/images'),
    layouts: resolve(__dirname, './layouts'),
    components: resolve(__dirname, './components'),
    stores: resolve(__dirname, './stores'),
    pages: resolve(__dirname, './pages'),
    common: resolve(__dirname, './common'),
  },
  modules: [['vue3-notion/nuxt', { css: true }], '@nuxtjs/tailwindcss', 'nuxt-icon'],
  plugins: ['~/plugins/vue-datepicker.js', '~/plugins/vue3-colorpicker.js', '~/plugins/vue-quill.js'],
  css: ['~/assets/css/style.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Easy Note',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
  tailwindcss: {
    exposeConfig: true,
  },
  build: {
    transpile: ['@heroicons/vue', '@headlessui/vue'],
  },
  ssr: false,
})