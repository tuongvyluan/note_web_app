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
  await checkExpire()

  const runtimeConfig = useRuntimeConfig()
  return await fetch(runtimeConfig.public.apiBase + path, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + storage.getStorageSync('token'),
    },
  })
}

export async function useMyPost(path, data) {
  await checkExpire()

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
  await checkExpire()

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
  await checkExpire()

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

export async function checkExpire() {
  if (checkEmptyStorage()) {
    userService.logout()
  } else if (new Date().getTime() >= storage.getStorageSync('expire')) {
    const user = {
      email: storage.getStorageSync('email'),
      password: storage.getStorageSync('password'),
    }
    await userService
      .login(user)
      .then(res => res.json())
      .then(data => {
        const token = data.token
        storage.setStorageSync('token', token.token, 600000)
        storage.setStorageSync('expire', new Date(token.expires).getTime(), 60000)
      })
      .catch(e => {
        userService.logout()
      })
  } else {
    storage.setStorageSync('token', storage.getStorageSync('token'), 600000)
    storage.setStorageSync('expire', storage.getStorageSync('expire'), 600000)
  }
  storage.setStorageSync('userId', storage.getStorageSync('userId'), 600000)
  storage.setStorageSync('email', storage.getStorageSync('email'), 600000)
  storage.setStorageSync('password', storage.getStorageSync('password'), 600000)
}

export function checkEmptyStorage() {
  return isEmpty(storage.getStorageSync('token'))
}
