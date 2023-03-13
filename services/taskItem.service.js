import urlConstants from '~~/common/urlConstants'
import { useMyPost, useMyPut, useMyDelete } from '~~/common/utils'

const base = urlConstants.endpoints.taskItems.base
const uri = urlConstants.endpoints.taskItems.uri

export default {
  async createTaskItem(taskItem) {
    const url = base
    return await useMyPost(url, taskItem)
  },

  async updateTaskItem(taskItem) {
    const url = base
    return await useMyPut(url, taskItem)
  },

  async deleteTaskItem(id) {
    const url = base + uri.delete.replace('{id}', id)
    return await useMyDelete(url)
  },
}
