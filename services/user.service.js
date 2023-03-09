import urlConstants from '~~/common/urlConstants'
import { useMyPostWithoutToken } from '~~/common/utils'
import { useUserStore } from '~~/stores/user'

export default {
  async createUser(user) {
    const url = urlConstants.endpoints.users.base + urlConstants.endpoints.users.uri.CREATE
    return await useMyPostWithoutToken(`${url}`, user)
  },

  async login(user) {
    const url = urlConstants.endpoints.login.base
    return await useMyPostWithoutToken(`${url}`, user)
  },

  logout() {
    useUserStore().setToken('')
  },
}
