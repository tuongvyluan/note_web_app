<template>
  <div class="pt-3 pr-2 sm:px-4 overflow-auto h-full w-full max-w-full min-w-[315px]">
    <CardModal
      v-model="showConfirmDelete"
      accept-text="Delete"
      decline-text="Cancel"
      @close-modal="showConfirmDelete = false"
      @decline-modal="showConfirmDelete = false"
      @confirm-modal="onConfirmDelete()">
      <template #header>
        <SectionTitle title="Confirm delete card"></SectionTitle>
      </template>
      <template #body>
        <div>Are you sure to delete this card?</div>
      </template>
    </CardModal>
    <CardModal
      v-model="showSetting"
      accept-text="Save"
      decline-text="Cancel"
      @close-modal="showSetting = false"
      @decline-modal="showSetting = false"
      @confirm-modal="onConfirmSetting()">
      <template #header>
        <SectionTitle title="Setting"></SectionTitle>
      </template>
      <template #body>
        <div class="w-fit mx-auto">
          <VueColorPicker v-model:pure-color="newBackground" is-widget="" format="hex" />
        </div>
      </template>
    </CardModal>
    <div class="w-full pb-2 text-center flex flex-wrap justify-between gap-y-2">
      <div class="flex gap-x-1 items-center w-full">
        <NuxtLink
          :to="'/note/' + noteId"
          class="text-4xl text-left truncate w-fit max-w-[calc(50%-34px)] md:max-w-[200px]">
          {{ noteName }}
        </NuxtLink>
        <div><Icon name="ep:arrow-right-bold" size="20" /></div>
        <div class="text-4xl font-bold text-left truncate w-full max-w-[50%] md:max-w-[300px] lg:max-w-[60%]">
          {{ cardName.trim().length > 0 ? cardName : 'Card' }}
        </div>
      </div>
    </div>
    <div class="flex justify-between flex-wrap pb-2">
      <MyButton type="outline" @on-click="onShowSetting()">Background</MyButton>
      <div class="flex justify-end gap-2">
        <MyButton @on-click="showConfirmDelete = true">Delete</MyButton>
        <MyButton :disabled="!checkNotSaved" @on-click="onConfirmSave()">Save</MyButton>
      </div>
    </div>
    <input
      v-model="newCardName"
      placeholder="Enter card name"
      type="text"
      class="text-4xl font-bold w-full pb-5 text-center h-16" />
    <div class="max-h-[calc(100%-230px)] h-full">
      <QuillEditor
        id="editor"
        ref="quill"
        v-model:content="newCardContent"
        toolbar="full"
        theme="snow"
        @text-change="setExpire(), debounceWatchTextChange()"></QuillEditor>
    </div>
  </div>
</template>
<script setup>
import debounce from 'lodash.debounce'
import { useStorage } from 'vue3-storage'
import toastOption from '~~/common/toast-option'
import cardService from '~~/services/card.service'

const storage = useStorage()
const route = useRoute()
const router = useRouter()

const quill = ref(null)
const showSaveReminder = ref(false)
const showConfirmDelete = ref(false)
const hasSaved = ref(true)
const showSetting = ref(false)
const cardId = ref('')
const noteId = ref('')
const noteName = ref('')
const cardName = ref('')
const newCardName = ref('')
const contentString = ref('')
const newCardContent = ref('')
const background = ref('')
const newBackground = ref('')

const debounceWatchTextChange = debounce(() => {
  hasSaved.value = false
}, 1000)

const setExpire = debounce(() => {
  storage.setStorageSync('token', storage.getStorageSync('token'), 600000)
  storage.setStorageSync('expire', storage.getStorageSync('expire'), 600000)
  storage.setStorageSync('userId', storage.getStorageSync('userId'), 600000)
  storage.setStorageSync('email', storage.getStorageSync('email'), 600000)
  storage.setStorageSync('password', storage.getStorageSync('password'), 600000)
}, 120000)

async function onConfirmDelete() {
  await cardService.deleteCard(cardId.value).then(res => {
    toastOption.toastSuccess('Delete card successfully.')
    router.push('/note/' + noteId.value)
  })
}

// Set background color functions
function onShowSetting(index) {
  newBackground.value = '#' + background.value
  newCardName.value = cardName.value
  showSetting.value = true
}

function onConfirmSetting() {
  background.value = newBackground.value.substring(1, 7)
  setBackground()
  hasSaved.value = false
  showSetting.value = false
}

function setBackground() {
  document.getElementById('editor').style.backgroundColor = '#' + background.value
}

// Remind save card
async function onConfirmSave() {
  const contentHtml = saveHTML()
  const card = {
    id: cardId.value,
    noteId: noteId.value,
    content: contentHtml,
    title: newCardName.value,
    color: background.value,
    rawContent: quill.value.getText(0),
  }
  await cardService
    .updateCard(card)
    .then(res => res.json())
    .then(data => {
      toastOption.toastSuccess('Save card successfully.')
      cardName.value = newCardName.value
    })
}

// Get and set new content functions
function saveHTML() {
  return document.getElementsByClassName('ql-editor')[0].innerHTML
}

function setHTML() {
  document.getElementsByClassName('ql-editor')[0].innerHTML = contentString.value
}

function getOldValues() {
  newCardName.value = cardName.value
  setBackground()
}

async function getCard() {
  cardId.value = route.path.substring(6)
  await cardService
    .getCard(cardId.value)
    .then(res => res.json())
    .then(data => {
      const card = data.card
      if (typeof card !== 'undefined') {
        noteId.value = card.noteId
        noteName.value = card.noteTitle
        cardName.value = card.title
        newCardName.value = card.title
        // newCardContent.value = card.content
        contentString.value = card.content
        background.value = card.color
      }
    })
}

const checkNotSaved = computed(() => {
  return !hasSaved.value || cardName.value !== newCardName.value
})

onMounted(async () => {
  await getCard()
  getOldValues()
  setHTML()
})

onUnmounted(() => {
  if (!checkNotSaved) {
    showSaveReminder.value = true
  }
})
</script>
