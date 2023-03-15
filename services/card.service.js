import urlConstants from '~~/common/urlConstants'
import constants from '~~/common/constants'
import { useMyFetch, useMyPost, useMyPut, useMyDelete } from '~~/common/utils'

const base = urlConstants.endpoints.cards.base
const uri = urlConstants.endpoints.cards.uri

export default {
  async getCardsByNote(noteId, sortType, isAsc) {
    if (sortType !== 0 && sortType !== 1) {
      sortType = constants.default.sortTypeNote
    }
    if (typeof isAsc !== 'boolean') {
      isAsc = constants.default.isAscNote
    }
    const url = (base + uri.getByNote)
      .replace('{noteId}', noteId)
      .replace('{sortType}', sortType)
      .replace('{isAsc}', isAsc)
    return await useMyFetch(url)
  },

  async createCard(card) {
    const url = base
    return await useMyPost(url, card)
  },

  async updateCard(card) {
    const url = base
    return await useMyPut(url, card)
  },

  async getCard(cardId) {
    const url = (base + uri.getById).replace('{cardId}', cardId)
    return await useMyFetch(url)
  },

  async deleteCard(cardId) {
    const url = (base + uri.deleteCard).replace('{cardId}', cardId)
    return await useMyDelete(url)
  },
}
