<template>
  <SidebarSideBarSetting
    :class="isActive === -2 ? 'hidden' : 'pl-2 pb-2'"
    :id-define="'setting'"
    :activate-button="true">
    <div class="flex flex-col justify-start h-full pt-3 pl-2">
      <div class="font-semibold text-xl">Menu</div>
      <div class="flex flex-col justify-between h-full pt-2">
        <ul class="space-y-2">
          <li v-for="(tab, index) in tabList" :key="tab.name">
            <NuxtLink v-if="tab.to" :to="tab.to" @click="closeAllSubtab()">
              <a
                :class="isActive === index ? 'text-white bg-gradient-to-r from-purple-500 to-blue-500' : ''"
                class="flex items-center py-2 pr-2 pl-2 text-base font-semibold text-gray-900 rounded-lg hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 cursor-pointer">
                <Icon size="23" :name="tabList[index].icon" />
                <span class="ml-3">{{ tabList[index].name }}</span>
              </a>
            </NuxtLink>
            <div v-else class="relative">
              <div
                class="relative flex justify-start gap-x-2 items-center p-2 text-base font-semibold text-gray-900 rounded-lg hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 cursor-pointer"
                @click="showNotes(tab)">
                <div class="flex items-center">
                  <Icon size="23" :name="tabList[index].icon" />
                  <span class="ml-3">{{ tabList[index].name }}</span>
                </div>
                <div class="absolute z-50 right-2 top-1.5" @click="emits('showCreateNote')">
                  <Icon
                    class="hover:scale-125 transition ease-in-out duration-300 text-gray-50"
                    name="charm:plus"
                    size="20" />
                </div>
              </div>
              <ul v-show="tab.showList" class="pb-2 ml-2 pt-1">
                <li v-for="subtab in noteStore.getNoteList()" :key="subtab.to" class="pt-1">
                  <NuxtLink :to="subtab.to">
                    <a
                      :class="isActive === subtab.id ? 'text-white bg-gradient-to-r from-purple-500 to-blue-500' : ''"
                      class="flex py-2 pr-2 text-base font-semibold text-gray-900 rounded-lg hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 cursor-pointer">
                      <span class="ml-3">{{ subtab.name }}</span>
                    </a>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul class="space-y-2 pt-5 pb-2">
          <NuxtLink :to="'/login'">
            <li>
              <a
                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 cursor-pointer"
                @click="logout">
                <Icon size="23" name="majesticons:door-exit" />
                <span class="ml-3">Log out</span>
              </a>
            </li>
          </NuxtLink>
        </ul>
      </div>
    </div>
  </SidebarSideBarSetting>
</template>
<script setup>
import { useStorage } from 'vue3-storage'
import { useNoteStore } from '~~/stores/note'
import userService from '~~/services/user.service'
import noteService from '~~/services/note.service'
import urlConstants from '~~/common/urlConstants'
import { isEmpty } from '~~/common/utils'

// const userStore = useUserStore()
const noteStore = useNoteStore()
const storage = useStorage()
const loadNotes = ref(false)
const route = useRoute()
const router = useRouter()
const emits = defineEmits(['showCreateNote'])
const tabList = ref([
  {
    name: 'Todo',
    icon: 'ep:list',
    to: '/todo',
  },
  {
    name: 'Note',
    icon: 'nimbus:sticky-note',
    showList: true,
  },
])
const isActive = computed(() => {
  const path = route.path
  if (path.at(1) === 't') {
    return 0
  }
  if (path.at(1) === 'l' || path.at(1) === 's') {
    return -2
  }
  if (path.at(1) === 'n') {
    return path.split('/')[2]
  }
  return -1
})

function logout() {
  userService.logout()
}

function closeAllSubtab() {
  tabList.value.forEach(tab => {
    if (tab.subtabList) {
      tab.showList = false
    }
  })
}

function showNotes(tab) {
  if (!loadNotes.value) {
    getAllNotes()
  }
  tab.showList = !tab.showList
}

function getAllNotes() {
  noteService
    .getAll()
    .then(res => res.json())
    .then(data => {
      const subTabs = []
      data.forEach(note => {
        subTabs.push({
          name: note.title,
          to: '/note/' + note.id,
          id: note.id,
        })
      })
      noteStore.setNoteList(subTabs)
      loadNotes.value = true
    })
}

onMounted(() => {
  if (isActive.value !== -2) {
    // Go to other pages
    if (!storage.hasKey('token') || isEmpty(storage.getStorageSync('token'))) {
      // Without login
      storage.clearStorageSync()
      router.push(urlConstants.endpoints.login.base)
    } else {
      getAllNotes()
    }
  } else if (storage.hasKey('token') && !isEmpty(storage.getStorageSync('token'))) {
    // Already login but go to login or signup page
    router.push(urlConstants.endpoints.todo.base)
  } else {
    // Go to login or signup page when not login
    storage.clearStorageSync()
  }
})
</script>
