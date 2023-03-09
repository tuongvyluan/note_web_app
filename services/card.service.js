import urlConstants from '~~/common/urlConstants'
import constants from '~~/common/constants'
import { useMyFetch } from '~~/common/utils'

const base = urlConstants.endpoints.cards.base

export default {
  async getCardsByNote(noteId, sortType, isAsc) {
    if (sortType !== 0 && sortType !== 1) {
      sortType = constants.default.sortTypeNote
    }
    if (typeof isAsc !== 'boolean') {
      isAsc = constants.default.isAscNote
    }
    const url = (base + urlConstants.endpoints.cards.uri.getByNote)
      .replace('{noteId}', noteId)
      .replace('{sortType}', sortType)
      .replace('{isAsc}', isAsc)
    return await useMyFetch(`${url}`)
  },
}
