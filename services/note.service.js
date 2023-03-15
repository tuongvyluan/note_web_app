import urlConstants from '~~/common/urlConstants'
// import constants from '~~/common/constants'
import { useMyFetch, useMyPost, useMyPut, useMyDelete } from '~~/common/utils'

const base = urlConstants.endpoints.notes.base
const uri = urlConstants.endpoints.notes.uri

export default {
  async getAll() {
    const url = base
    return await useMyFetch(url)
  },
  async createNote(note) {
    const url = base
    return await useMyPost(url, note)
  },
  async updateNote(note) {
    const url = base
    return await useMyPut(url, note)
  },
  async deleteNote(noteId) {
    const url = (base + uri.delete).replace('{id}', noteId)
    return await useMyDelete(url)
  },
}
