import urlConstants from '~~/common/urlConstants'
import constants from '~~/common/constants'
import { useMyFetch, useMyPost, useMyPut, useMyDelete } from '~~/common/utils'

const base = urlConstants.endpoints.tasks.base
const uri = urlConstants.endpoints.tasks.uri

export default {
  async getTasks(orderBy, isAsc, from, to) {
    if (orderBy !== 0 && orderBy !== 1) {
      orderBy = constants.default.sortTypeTask
    }
    const url = (base + uri.getAll)
      .replace('{orderBy}', orderBy)
      .replace('{isAsc}', isAsc)
      .replace('{dateFrom}', from)
      .replace('{dateTo}', to)
    return await useMyFetch(url)
  },

  async createTask(task) {
    const url = base
    return await useMyPost(url, task)
  },

  async updateTask(task) {
    const url = base
    return await useMyPut(url, task)
  },

  async deleteTask(id) {
    const url = base + uri.delete.replace('{id}', id)
    return await useMyDelete(url)
  },
}
