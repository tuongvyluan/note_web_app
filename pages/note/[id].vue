<template>
  <div class="pt-3 overflow-auto h-full max-w-full w-full min-w-[315px]">
    <CardModal
      v-model="showDeleteConfirmModal"
      accept-text="Delete"
      decline-text="Cancel"
      @close-modal="showEditNameModal = false"
      @decline-modal="showEditNameModal = false"
      @confirm-modal="onConfirmDelete()">
      <template #header>
        <SectionTitle title="Edit note name"></SectionTitle>
      </template>
      <template #body>
        <div class="w-full">Are you sure to delete this note?</div>
      </template>
    </CardModal>
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
    <div class="pr-2 md:px-4 w-full">
      <div>
        <div class="w-full gap-1 justify-between flex flex-wrap max-w-full">
          <div class="text-4xl font-bold flex flex-wrap w-full sm:max-w-[70%] max-w-full">
            <span class="max-w-[calc(100%-25px)] truncate">
              {{ currentNoteName }}
            </span>
            <span class="cursor-pointer">
              <Icon
                class="pb-2 hover:scale-110 transition ease-in duration-300"
                name="charm:pencil"
                size="30"
                @click="onShowEditName()" />
            </span>
          </div>
          <div class="italic pt-2 sm:py-2">{{ moment(updatedAt).format(constants.dateTimeFormat) }}</div>
        </div>
        <div class="flex justify-between flex-wrap gap-x-2 gap-y-2">
          <div class="flex gap-x-1 items-center pt-2">
            <DropdownMenu id-button="sortBtn" id-menu="sortMenu">
              <template #button>
                <div>
                  <span class="pr-2">{{ sortList.at(currentSort) }}</span>
                </div>
              </template>
              <template #menu>
                <ListGroup class="cursor-pointer w-36 max-h-48 overflow-y-auto">
                  <ListGroupItem
                    v-for="(sort, index) in sortList"
                    :key="index"
                    :class="`${currentSort === index ? 'bg-blue-50 font-bold' : ''}`"
                    class="px-6 py-1 hover:bg-blue-50"
                    @click="onOrderByChange(index)">
                    {{ sort }}</ListGroupItem
                  >
                </ListGroup>
              </template>
            </DropdownMenu>
            <div class="pb-1 cursor-pointer" @click="onSortChange()">
              <Icon size="20" :name="isAsc ? 'fa-solid:sort-amount-up-alt' : 'fa-solid:sort-amount-down'" />
            </div>
          </div>
          <div><MyButton @on-click="showDeleteConfirmModal = true">Delete</MyButton></div>
        </div>
      </div>
    </div>
    <!-- Start note section -->
    <div class="py-4 pr-2 md:px-4 w-full">
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
          :style="`background-color: #${card.color};`"
          class="cursor-pointer hover:scale-105 transition ease-in-out duration-300 relative">
          <div class="absolute" @click="() => onShowEditBackground(index)">
            <Icon name="dashicons:color-picker" size="19" class="hover:scale-125 transition ease-in-out duration-300" />
          </div>
          <NuxtLink :to="'/card/' + card.id">
            <div class="flex gap-x-2 justify-end items-center italic">
              <div>{{ moment(card.updatedAt).format(constants.dateTimeFormat) }}</div>
            </div>
            <div class="text-xl font-semibold pb-1 line-clamp-1">{{ card.title }}</div>
            <div class="h-48 w-full line-clamp-8">
              <textarea
                :value="card.rawContent"
                disabled
                class="h-full resize-none bg-transparent w-full line-clamp-8 cursor-pointer" />
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
import { ListGroup, ListGroupItem } from 'flowbite-vue'
import moment from 'moment'
import { useStorage } from 'vue3-storage'
import { useNoteStore } from '~~/stores/note'
import cardService from '~~/services/card.service'
import constants from '~~/common/constants'
import noteService from '~~/services/note.service'
import toastOption from '~~/common/toast-option'

const noteStore = useNoteStore()
const storage = useStorage()
const route = useRoute()
const router = useRouter()

const noteId = ref('')
const updatedAt = ref(new Date().getTime())
const showDeleteConfirmModal = ref(false)
const currentNoteName = ref('')
const newNoteName = ref('')
const showEditNameModal = ref(false)
const newBackground = ref('')
const currentCardId = ref('')
const showEditBackground = ref(false)
const currentCardIndex = ref(-1)
const showNewCard = ref(false)
const newCardName = ref('')
const sortList = ref(['Name', 'Last update'])
const currentSort = ref(1)
const isAsc = ref(false)

// Handle sort change
function onSortChange() {
  isAsc.value = !isAsc.value
  cardList.value = cardList.value.reverse()
}

function onOrderByChange(index) {
  currentSort.value = index
  getCardList()
}

// Handle confirm delete note modal
async function onConfirmDelete() {
  await noteService.deleteNote(noteId.value).then(async res => {
    await getNoteList()
    toastOption.toastSuccess('Delete note successfully.')
    const notes = noteStore.getNoteList()
    if (notes.length > 0) {
      noteStore.setCurrentNoteId(notes.at(0).id)
      router.push(notes.at(0).to)
    } else {
      router.push('/todo')
    }
    showDeleteConfirmModal.value = false
  })
}
// Handle create new card modal
function onShowNewCard() {
  newCardName.value = ''
  showNewCard.value = true
}

function onConfirmNewCard() {
  if (newCardName.value.trim().length === 0) {
    toastOption.toastError('Card name cannot be skipped')
  } else {
    createCard()
  }
}

// Handle edit note name modal
function onShowEditName() {
  newNoteName.value = currentNoteName.value
  showEditNameModal.value = true
}

async function onConfirmEditName() {
  if (newNoteName.value.trim().length === 0) {
    toastOption.toastError('Note name cannot be skipped')
  } else {
    currentNoteName.value = newNoteName.value
    await noteService
      .updateNote({
        title: newNoteName.value,
        userId: storage.getStorageSync('userId'),
        id: noteId.value,
      })
      .then(async res => {
        await getNoteList()
        toastOption.toastSuccess('Rename note successfully.')
      })
    showEditNameModal.value = false
  }
}

// Handle edit card background modal
function onShowEditBackground(index) {
  currentCardIndex.value = index
  currentCardId.value = cardList.value.at(index).id
  newBackground.value = '#' + cardList.value.at(index).color
  showEditBackground.value = true
}

async function onConfirmEditBackground() {
  const card = cardList.value.at(currentCardIndex.value)
  card.color = newBackground.value.substring(1, 7)
  card.key = getTimestamp()
  await cardService
    .updateCard({
      id: card.id,
      title: card.title,
      color: card.color,
      userId: storage.getStorageSync('userId'),
      noteId: noteId.value,
      content: card.content,
      rawContent: card.rawContent,
    })
    .then(res => {
      getCardList()
      toastOption.toastSuccess('Update card background successfully.')
    })
  showEditBackground.value = false
}

function getTimestamp() {
  return new Date().getTime()
}

// Random background
const backgroundList = ref(['D1EAED', 'B8F3ED', 'AAFADC', 'B2FEBE', 'CFFE97'])
function getBackground() {
  return backgroundList.value.at(Math.floor(Math.random() * 100) % 5)
}

// Dump data
const cardList = ref([])

async function getCardList() {
  await cardService
    .getCardsByNote(noteId.value, currentSort.value, isAsc.value)
    .then(res => res.json())
    .then(data => {
      currentNoteName.value = data.note.title
      updatedAt.value = new Date(data.note.updatedAt)
      cardList.value = data.note.cards.map(c => {
        c.key = getTimestamp() + Math.random()
        return c
      })
    })
}

async function createCard() {
  const card = {
    title: newCardName.value,
    color: getBackground(),
    userId: storage.getStorageSync('userId'),
    noteId: noteId.value,
    content: '',
    rawContent: '',
  }
  await cardService
    .createCard(card)
    .then(res => res.json())
    .then(data => {
      router.push('/card/' + data.cardid)
    })
}

async function getNoteList() {
  await noteService
    .getAll()
    .then(data => data.json())
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
    })
}

onMounted(() => {
  noteId.value = route.path.substring(6)
  noteStore.setCurrentNoteId(noteId.value)
  getCardList()
})
</script>
<style>
.ql-container {
  max-height: 100%;
}
</style>
