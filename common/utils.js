/* global useRuntimeConfig */
import { useUserStore } from '~~/stores/user'

const userStore = useUserStore()

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
  const runtimeConfig = useRuntimeConfig()
  return await fetch(runtimeConfig.public.apiBase + path, {
    headers: {
      'Content-Type': 'application/json',
      Authentication: userStore.getToken(),
    },
  })
}

export async function useMyPost(path, data) {
  const runtimeConfig = useRuntimeConfig()
  return await fetch(runtimeConfig.public.apiBase + path, {
    headers: {
      'Content-Type': 'application/json',
      Authentication: userStore.getToken(),
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function useMyPut(path, data) {
  const runtimeConfig = useRuntimeConfig()
  return await fetch(runtimeConfig.public.apiBase + path, {
    headers: {
      'Content-Type': 'application/json',
      Authentication: userStore.getToken(),
    },
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function useMyDelete(path) {
  const runtimeConfig = useRuntimeConfig()
  return await fetch(runtimeConfig.public.apiBase + path, {
    headers: {
      'Content-Type': 'application/json',
      Authentication: userStore.getToken(),
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
