<template>
  <div class="pt-3 px-4 overflow-auto h-full w-full max-w-full min-w-[315px]">
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
        <NuxtLink :to="'/note/1'" class="text-4xl truncate w-full max-w-[calc(50%-34px)] md:max-w-[200px]">
          {{ noteName }}
        </NuxtLink>
        <div><Icon name="ep:arrow-right-bold" size="20" /></div>
        <div class="text-4xl font-bold text-left truncate w-full max-w-[50%] md:max-w-[300px] lg:max-w-[60%]">
          {{ cardName.trim().length > 0 ? cardName : 'CardCardCardCard' }}
        </div>
      </div>
    </div>
    <div class="flex justify-end flex-wrap pb-2">
      <div class="flex justify-end gap-2">
        <MyButton type="outline" @on-click="onShowSetting()">Background</MyButton>
        <MyButton @on-click="saveHTML()">Save</MyButton>
      </div>
    </div>
    <input
      v-model="newCardName"
      placeholder="Enter card name"
      type="text"
      class="text-4xl font-bold w-full pb-5 text-center h-16" />
    <QuillEditor id="editor" v-model:content="newCardContent" toolbar="essential" theme="snow"></QuillEditor>
  </div>
</template>
<script setup>
const showSetting = ref(false)
const noteName = ref('PRN221PRN221PRN221PRN221PRN221PRN221PRN221')
const cardName = ref('')
const newCardName = ref('')
const cardContent = ref('')
const newCardContent = ref('')
const contentString = ref('')
const background = ref('')
const newBackground = ref('')

// Set background color functions
function onShowSetting(index) {
  newBackground.value = '#' + background.value
  newCardName.value = cardName.value
  showSetting.value = true
}

function onConfirmSetting() {
  background.value = newBackground.value.substring(1, 7)
  setBackground()
  showSetting.value = false
}

function setBackground() {
  document.getElementById('editor').style.backgroundColor = '#' + background.value
}

// Get and set new content functions
function saveHTML() {
  contentString.value = document.getElementsByClassName('ql-editor')[0].innerHTML
}

function setHTML() {
  contentString.value = ''
  document.getElementsByClassName('ql-editor')[0].innerHTML = contentString.value
}

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
  max-height: calc(100% - 230px);
}
</style>
