/* global useRuntimeConfig */
import { useStorage } from 'vue3-storage'
import userService from '~~/services/user.service'

const storage = useStorage()

export async function useMyPostWithoutToken(path, data) {
  const runtimeConfig = useRuntimeConfig()
  return await fetch(runtimeConfig.public.apiBase + path, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function useMyFetch(path) {
  if (isEmpty(storage.getStorageSync('token')) || isEmpty(storage.getStorageSync('userId'))) {
    userService.logout()
  } else {
    storage.setStorageSync('token', storage.getStorageSync('token'), 600000)
    storage.setStorageSync('userId', storage.getStorageSync('userId'), 600000)
  }
  const runtimeConfig = useRuntimeConfig()
  return await fetch(runtimeConfig.public.apiBase + path, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + storage.getStorageSync('token'),
    },
  })
}

export async function useMyPost(path, data) {
  if (isEmpty(storage.getStorageSync('token')) || isEmpty(storage.getStorageSync('userId'))) {
    userService.logout()
  } else {
    storage.setStorageSync('token', storage.getStorageSync('token'), 600000)
    storage.setStorageSync('userId', storage.getStorageSync('userId'), 600000)
  }
  const runtimeConfig = useRuntimeConfig()
  return await fetch(runtimeConfig.public.apiBase + path, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + storage.getStorageSync('token'),
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function useMyPut(path, data) {
  if (isEmpty(storage.getStorageSync('token')) || isEmpty(storage.getStorageSync('userId'))) {
    userService.logout()
  } else {
    storage.setStorageSync('token', storage.getStorageSync('token'), 600000)
    storage.setStorageSync('userId', storage.getStorageSync('userId'), 600000)
  }
  const runtimeConfig = useRuntimeConfig()
  return await fetch(runtimeConfig.public.apiBase + path, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + storage.getStorageSync('token'),
    },
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function useMyDelete(path) {
  if (isEmpty(storage.getStorageSync('token')) || isEmpty(storage.getStorageSync('userId'))) {
    userService.logout()
  } else {
    storage.setStorageSync('token', storage.getStorageSync('token'), 600000)
    storage.setStorageSync('userId', storage.getStorageSync('userId'), 600000)
  }
  const runtimeConfig = useRuntimeConfig()
  return await fetch(runtimeConfig.public.apiBase + path, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + storage.getStorageSync('token'),
    },
    method: 'DELETE',
  })
}

export function isNumeric(str) {
  if (typeof str != 'string') return false
  return !isNaN(str) && !isNaN(parseInt(str))
}

export function substractDate(dateTimestamp, numOfDate) {
  return new Date().setDate(new Date(dateTimestamp).getDate() - numOfDate)
}

export function setYearFilter(start, end) {
  const years = []
  let i = start
  for (i; i <= end; i++) {
    years.push({
      label: i,
      start_time: new Date(i, 0, 1).getTime(),
      end_time: new Date(i + 1, 0, 1).getTime(),
    })
  }
  return years
}

export function isEmpty(text) {
  return typeof text === 'undefined' || text.trim() === ''
}
