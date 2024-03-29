import { useStorage } from 'vue3-storage'
import urlConstants from '~~/common/urlConstants'
import { useMyPostWithoutToken } from '~~/common/utils'

export default {
  async createUser(user) {
    const url = urlConstants.endpoints.signup.base
    return await useMyPostWithoutToken(url, user)
  },

  async login(user) {
    const url = urlConstants.endpoints.login.base
    return await useMyPostWithoutToken(url, user)
  },

  logout() {
    const router = useRouter()
    useStorage().clearStorageSync()
    router.push(urlConstants.endpoints.login.base)
  },
}
