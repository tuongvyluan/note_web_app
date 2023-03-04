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
                class="flex items-center p-2 text-base font-semibold text-gray-900 rounded-lg hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 cursor-pointer">
                <Icon size="23" :name="tabList[index].icon" />
                <span class="ml-3">{{ tabList[index].name }}</span>
              </a>
            </NuxtLink>
            <div v-else>
              <div
                class="flex justify-between items-center p-2 text-base font-semibold text-gray-900 rounded-lg hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 cursor-pointer"
                @click="tab.showList = !tab.showList">
                <div class="flex items-center">
                  <Icon size="23" :name="tabList[index].icon" />
                  <span class="ml-3">{{ tabList[index].name }}</span>
                </div>
                <div>
                  <Icon v-show="tab.showList === false" name="mi:chevron-down" size="23" />
                  <Icon v-show="tab.showList === true" name="mi:chevron-up" size="23" />
                </div>
              </div>
              <ul v-show="tab.showList" class="py-2 ml-2">
                <li v-for="subtab in tab.subtabList" :key="subtab.to" class="pt-1">
                  <NuxtLink :to="subtab.to">
                    <a
                      :class="isActive === subtab.id ? 'text-white bg-gradient-to-r from-purple-500 to-blue-500' : ''"
                      class="flex p-2 text-base font-semibold text-gray-900 rounded-lg hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 cursor-pointer">
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
            </li></NuxtLink
          >
        </ul>
      </div>
    </div>
  </SidebarSideBarSetting>
</template>
<script setup>
const route = useRoute()
const tabList = ref([
  {
    name: 'Todo',
    icon: 'ep:list',
    to: '/todo',
  },
  {
    name: 'Note',
    icon: 'nimbus:sticky-note',
    showList: false,
    subtabList: [
      {
        name: 'PRN',
        to: '/note/1',
        id: '1',
      },
      {
        name: 'PRN',
        to: '/note/2',
        id: '2',
      },
      {
        name: 'PRN',
        to: '/note/3',
        id: '3',
      },
      {
        name: 'PRN',
        to: '/note/4',
        id: '4',
      },
      {
        name: 'PRN',
        to: '/note/5',
        id: '5',
      },
      {
        name: 'PRN',
        to: '/note/6',
        id: '6',
      },
      {
        name: 'PRN',
        to: '/note/7',
        id: '7',
      },
      {
        name: 'PRN',
        to: '/note/8',
        id: '8',
      },
    ],
  },
])
const isActive = computed(() => {
  const path = route.path
  if (path.at(1) === 't') {
    return 0
  }
  if (path.at(1) === 'l') {
    return -2
  }
  if (path.at(1) === 'n') {
    return path.split('/')[2]
  }
  return -1
})
const isLogout = ref(false)

function logout() {
  isLogout.value = true
}

function closeAllSubtab() {
  tabList.value.forEach(tab => {
    if (tab.subtabList) {
      tab.showList = false
    }
  })
}
</script>
