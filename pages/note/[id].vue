<template>
  <div class="pt-3 overflow-auto h-full max-w-full min-w-[315px]">
    <CardModal
      v-model="showEditNameModal"
      accept-text="Save"
      decline-text="Cancel"
      :disable-accept="newNoteName.trim().length === 0"
      @close-modal="showEditNameModal = false"
      @decline-modal="showEditNameModal = false"
      @confirm-modal="onConfirmEditName()">
      <template #header>
        <SectionTitle title="Edit note name"></SectionTitle>
      </template>
      <template #body>
        <div class="flex gap-2 items-center w-full">
          <label>Note name</label>
          <MyInput v-model="newNoteName" w="w-[300px]" type="text" />
        </div>
      </template>
    </CardModal>
    <CardModal
      v-model="showNewCard"
      accept-text="Create"
      decline-text="Cancel"
      :disable-accept="newCardName.trim().length === 0"
      @close-modal="showNewCard = false"
      @decline-modal="showNewCard = false"
      @confirm-modal="onConfirmNewCard()">
      <template #header>
        <SectionTitle title="Create new card"></SectionTitle>
      </template>
      <template #body>
        <div class="flex gap-2 items-center w-full">
          <label>Card name</label>
          <MyInput v-model="newCardName" w="w-[300px]" type="text" />
        </div>
      </template>
    </CardModal>
    <CardModal
      v-model="showEditBackground"
      accept-text="Save"
      decline-text="Cancel"
      @close-modal="showEditBackground = false"
      @decline-modal="showEditBackground = false"
      @confirm-modal="onConfirmEditBackground()">
      <template #header>
        <SectionTitle title="Edit background color"></SectionTitle>
      </template>
      <template #body>
        <div class="w-fit mx-auto">
          <VueColorPicker v-model:pure-color="newBackground" is-widget="" format="hex" />
        </div>
      </template>
    </CardModal>
    <div class="px-4 w-full">
      <div>
        <div class="w-fit max-w-full">
          <div class="max-w-full text-4xl font-bold flex flex-wrap">
            <span class="max-w-[calc(100%-25px)] truncate">
              {{ currentNoteName }}
            </span>
            <span class="cursor-pointer">
              <Icon
                class="pb-2 hover:scale-110 transition ease-in duration-300"
                name="charm:pencil"
                size="24"
                @click="onShowEditName()" />
            </span>
          </div>
        </div>
        <div class="italic">Updated at: {{ moment(today).format(constants.dateTimeFormat) }}</div>
      </div>
    </div>
    <!-- Start note section -->
    <div class="py-4 px-4">
      <!-- Start card list -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-1">
        <CardBox
          class="cursor-pointer bg-gray-50 hover:scale-105 transition ease-in-out duration-300 relative"
          @click="onShowNewCard()">
          <div class="h-[248px] flex flex-col justify-center">
            <Icon name="charm:plus" size="50" class="text-gray-700 self-center" />
          </div>
        </CardBox>
        <CardBox
          v-for="(card, index) in cardList"
          :key="card.key"
          :style="`background-color: #${card.background};`"
          class="cursor-pointer hover:scale-105 transition ease-in-out duration-300 relative">
          <div class="absolute" @click="() => onShowEditBackground(index)">
            <Icon name="dashicons:color-picker" size="19" class="hover:scale-125 transition ease-in-out duration-300" />
          </div>
          <NuxtLink :to="'/card/1'">
            <div class="flex gap-x-2 justify-end items-center italic">
              <div>{{ moment(card.updatedAt).format(constants.dateTimeFormat) }}</div>
            </div>
            <div class="text-xl font-semibold pb-1 line-clamp-1">{{ card.name }}</div>
            <div class="h-48 line-clamp-8 text-justify">
              {{ card.content }}
            </div>
          </NuxtLink>
        </CardBox>
      </div>
      <!-- End card list -->
    </div>
    <!-- End note section -->
  </div>
</template>
<script setup>
import moment from 'moment'
import constants from '~~/common/constants'
const today = ref(new Date().getTime())
const currentNoteName = ref('PRN221PRN221PRN221PRN221PRN221PRN221PRN221')
const newNoteName = ref('')
const showEditNameModal = ref(false)
const newBackground = ref('')
const currentCardId = ref('')
const showEditBackground = ref(false)
const currentCardIndex = ref(-1)
const showNewCard = ref(false)
const newCardName = ref('')

function onShowNewCard() {
  newCardName.value = ''
  showNewCard.value = true
}

function onConfirmNewCard() {
  showNewCard.value = false
}

function onShowEditName() {
  newNoteName.value = currentNoteName.value
  showEditNameModal.value = true
}

function onConfirmEditName() {
  currentNoteName.value = newNoteName.value
  showEditNameModal.value = false
}

function onShowEditBackground(index) {
  currentCardIndex.value = index
  currentCardId.value = cardList.value.at(index).id
  newBackground.value = '#' + cardList.value.at(index).background
  showEditBackground.value = true
}

function onConfirmEditBackground() {
  cardList.value.at(currentCardIndex.value).background = newBackground.value.substring(1, 7)
  cardList.value.at(currentCardIndex.value).key = getTimestamp()
  showEditBackground.value = false
}

function getTimestamp() {
  return new Date().getTime()
}

// Dump data
const cardList = ref([
  {
    id: '1',
    name: 'ASP.NET Core Razor Page 1 ASP.NET Core Razor Page 1',
    content:
      'Building Website using ASP.NET Core Razor Page. Building Website using ASP.NET Core Razor Page. Building Website using ASP.NET Core Razor Page. Building Website using ASP.NET Core Razor Page. Building Website using ASP.NET Core Razor Page. Building Website using ASP.NET Core Razor Page. Building Website using ASP.NET Core Razor Page. Building Website using ASP.NET Core Razor Page.',
    background: 'D1EAED',
    updatedAt: today.value,
    key: getTimestamp() + 1,
  },
  {
    id: '2',
    name: 'ASP.NET Core Razor Page 2',
    content: 'Building Website using ASP.NET Core Razor Page. Building Website using ASP.NET Core Razor Page.',
    background: 'B8F3ED',
    updatedAt: today.value,
    key: getTimestamp() + 2,
  },
  {
    id: '3',
    name: 'ASP.NET Core Razor Page 3',
    content: 'Building Website using ASP.NET Core Razor Page. Building Website using ASP.NET Core Razor Page.',
    background: 'AAFADC',
    updatedAt: today.value,
    key: getTimestamp() + 3,
  },
  {
    id: '4',
    name: 'ASP.NET Core Razor Page 4',
    content: 'Building Website using ASP.NET Core Razor Page. Building Website using ASP.NET Core Razor Page.',
    background: 'B2FEBE',
    updatedAt: today.value,
    key: getTimestamp() + 4,
  },
  {
    id: '4',
    name: 'ASP.NET Core Razor Page 4',
    content: 'Building Website using ASP.NET Core Razor Page. Building Website using ASP.NET Core Razor Page.',
    background: 'CFFE97',
    updatedAt: today.value,
    key: getTimestamp() + 5,
  },
])
</script>
