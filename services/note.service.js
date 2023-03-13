import urlConstants from '~~/common/urlConstants'
// import constants from '~~/common/constants'
import { useMyFetch, useMyPost } from '~~/common/utils'

const base = urlConstants.endpoints.notes.base

export default {
  async getAll() {
    const url = base
    return await useMyFetch(url)
  },
  async createNote(note) {
    const url = base
    return await useMyPost(url, note)
  },
}
