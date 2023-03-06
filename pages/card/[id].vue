<template>
  <div class="pt-3 px-4 overflow-auto h-full w-full max-w-full min-w-[315px]">
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
    <div class="w-full pb-5 text-center flex flex-wrap justify-between gap-y-2">
      <div class="flex gap-x-1 items-center">
        <NuxtLink :to="'/note/1'" class="text-4xl">Note</NuxtLink>
        <div><Icon name="ep:arrow-right-bold" size="20" /></div>
        <div class="text-4xl font-bold">{{ cardName.trim().length > 0 ? cardName : 'Card' }}</div>
      </div>
      <div class="flex justify-end gap-1">
        <MyButton type="outline" @on-click="onShowEditBackground()">Background</MyButton>
        <MyButton @on-click="saveHTML()">Save</MyButton>
      </div>
    </div>
    <input
      v-model="newCardName"
      placeholder="Enter card name"
      type="text"
      class="text-4xl font-bold w-full pb-5 text-center h-16" />
    <QuillEditor id="editor" v-model:content="newCardContent" toolbar="full" theme="snow"></QuillEditor>
  </div>
</template>
<script setup>
const showEditBackground = ref(false)
const cardName = ref('')
const cardContent = ref('')
const newCardName = ref('')
const newCardContent = ref('')
const contentString = ref('')
const background = ref('')
const newBackground = ref('')

// Set background color functions
function onShowEditBackground(index) {
  newBackground.value = '#' + background.value
  showEditBackground.value = true
}

function onConfirmEditBackground() {
  background.value = newBackground.value.substring(1, 7)
  setBackground()
  showEditBackground.value = false
}

function setBackground() {
  document.getElementById('editor').style.backgroundColor = '#' + background.value
  console.log(document.getElementById('editor').style.backgroundColor)
}

// Get and set new content functions
function saveHTML() {
  contentString.value = document.getElementsByClassName('ql-editor')[0].innerHTML
}

function setHTML() {
  contentString.value = ''
  document.getElementsByClassName('ql-editor')[0].innerHTML = contentString.value
}

// function getTimestamp() {
//   return new Date().getTime()
// }

function getOldValues() {
  newCardName.value = cardName.value
  newCardContent.value = cardContent.value
  background.value = 'D1EAED'
  setBackground()
}

onMounted(() => {
  getOldValues()
  setHTML()
})
</script>
<style>
.ql-container {
  max-height: calc(100% - 182px);
}
</style>
