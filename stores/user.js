import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
  }),
  actions: {
    getToken() {
      return this.token
    },
    setToken(newToken) {
      this.token = newToken
    },
  },
})
