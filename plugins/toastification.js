import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

/* global defineNuxtPlugin */
export default defineNuxtPlugin(nuxtApp => {
  const options = {
    position: 'bottom-right',
    hideProgressBar: true,
  }
  nuxtApp.vueApp.use(Toast, options)
})
